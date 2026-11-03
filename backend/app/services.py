"""Logique métier — là où les règles de gestion s'appliquent vraiment."""

from __future__ import annotations

import logging
from datetime import UTC, datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app import llm, scoring
from app.config import params
from app.enums import (
    Canal,
    Gravite,
    Role,
    StatutConversation,
    StatutSuivi,
    Temperature,
    TypeEvenement,
)
from app.models import (
    Alerte,
    CompteRendu,
    Conversation,
    Message,
    Prospect,
    Trou,
    hacher_ip,
)
from app.notifications import formater_alerte_prospect, notifier
from app.prompts import ACCUEIL
from app.schemas import CompteRenduData

log = logging.getLogger("laura.services")


# --------------------------------------------------------------------------
# Conversations
# --------------------------------------------------------------------------


async def creer_conversation(
    session: AsyncSession,
    *,
    canal: Canal,
    ip: str,
    page_url: str = "",
    referrer: str = "",
    langue: str = "fr",
) -> Conversation:
    """RG-C01 : créée dès le premier contact, sans authentification."""
    conv = Conversation(
        canal=canal,
        langue=langue,
        page_url=page_url[:500],
        referrer=referrer[:500],
        ip_hash=hacher_ip(ip),
    )
    session.add(conv)
    await session.commit()

    # Le message d'accueil fait partie de l'historique : Laura se présente
    # systématiquement (RG-L01).
    await enregistrer_message(session, conv, Role.LAURA, ACCUEIL[canal])
    return conv


async def charger_conversation(
    session: AsyncSession, conversation_id: str, resume_token: str | None = None
) -> Conversation | None:
    """RG-A02 : sans jeton valide, la conversation n'est jamais servie."""
    conv = await session.get(Conversation, conversation_id)
    if conv is None:
        return None
    if resume_token is not None and conv.resume_token != resume_token:
        return None
    return conv


async def enregistrer_message(
    session: AsyncSession,
    conv: Conversation,
    role: Role,
    contenu: str,
    tokens_entree: int = 0,
    tokens_sortie: int = 0,
) -> Message:
    msg = Message(
        conversation_id=conv.id,
        role=role,
        contenu=contenu,
        tokens_entree=tokens_entree,
        tokens_sortie=tokens_sortie,
    )
    session.add(msg)
    conv.date_dernier_message = datetime.now(UTC)
    if conv.statut == StatutConversation.ABANDONNEE:
        conv.statut = StatutConversation.ACTIVE  # RG-C07
    await session.commit()
    return msg


async def messages_conversation(
    session: AsyncSession, conversation_id: str
) -> list[Message]:
    """Requête explicite plutôt que `conv.messages`.

    En asyncio, le chargement paresseux d'une relation lève MissingGreenlet dès
    que l'objet n'a pas été chargé par une requête (cas d'un objet qu'on vient
    de créer). On interroge donc toujours explicitement.
    """
    lignes = await session.scalars(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.horodatage)
    )
    return list(lignes.all())


async def compte_rendu_de(
    session: AsyncSession, conversation_id: str
) -> CompteRendu | None:
    return await session.scalar(
        select(CompteRendu).where(CompteRendu.conversation_id == conversation_id)
    )


async def alertes_de(session: AsyncSession, compte_rendu_id: str) -> list[Alerte]:
    lignes = await session.scalars(
        select(Alerte).where(Alerte.compte_rendu_id == compte_rendu_id)
    )
    return list(lignes.all())


async def compter_messages_visiteur(session: AsyncSession, conversation_id: str) -> int:
    total = await session.scalar(
        select(func.count(Message.id)).where(
            Message.conversation_id == conversation_id,
            Message.role == Role.VISITEUR,
        )
    )
    return total or 0


async def historique_modele(
    session: AsyncSession, conversation_id: str
) -> list[dict[str, str]]:
    """Les N derniers tours, au format attendu par le modèle (RG-C05)."""
    limite = params.TOURS_HISTORIQUE * 2
    lignes = (
        await session.scalars(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.horodatage.desc())
            .limit(limite)
        )
    ).all()
    return [
        {"role": m.vers_role_modele(), "text": m.contenu} for m in reversed(list(lignes))
    ]


async def transcription(session: AsyncSession, conversation_id: str) -> str:
    lignes = await messages_conversation(session, conversation_id)
    return "\n\n".join(
        f"{'Visiteur' if m.role == Role.VISITEUR else 'Laura'} : {m.contenu}"
        for m in lignes
    )


# --------------------------------------------------------------------------
# Trous — la boucle d'apprentissage (RG-T02 à RG-T05)
# --------------------------------------------------------------------------


async def traiter_trou(
    session: AsyncSession, conversation_id: str, question: str, reponse: str
) -> Trou | None:
    """Tâche de fond : ne bloque jamais la réponse au visiteur."""
    data = await llm.detecter_trou(question, reponse)
    if not data.trou_detecte or not data.sujet:
        return None

    # Même sujet déjà signalé → on incrémente plutôt que de dupliquer : c'est
    # la fréquence qui donne l'ordre de priorité à l'équipe (RG-T04).
    existant = await session.scalar(
        select(Trou).where(
            func.lower(Trou.sujet) == data.sujet.lower().strip(),
            Trou.resolu_le.is_(None),
        )
    )
    if existant:
        existant.occurrences += 1
        await session.commit()
        return existant

    trou = Trou(
        conversation_id=conversation_id,
        question=question[:2000],
        sujet=data.sujet.strip()[:200],
        fiche_code=data.fiche_code.strip()[:10],
    )
    session.add(trou)
    await session.commit()
    log.info("Nouveau trou : %s (fiche %s)", trou.sujet, trou.fiche_code)
    return trou


# --------------------------------------------------------------------------
# Fin de conversation et compte rendu
# --------------------------------------------------------------------------


async def _rattacher_prospect(
    session: AsyncSession, conv: Conversation, data: CompteRenduData
) -> Prospect | None:
    """RG-S04 : deux conversations avec le même email = un seul prospect."""
    p = data.prospect
    if not (p.email or p.telephone or p.nom):
        return None

    prospect: Prospect | None = None
    if p.email:
        prospect = await session.scalar(
            select(Prospect).where(func.lower(Prospect.email) == p.email.lower().strip())
        )

    if prospect is None:
        prospect = Prospect()
        session.add(prospect)
        await session.flush()

    # On ne remplace jamais une valeur connue par du vide.
    # Tronqué à la taille de la colonne : PostgreSQL refuse ce qui dépasse.
    for champ in ("nom", "entreprise", "email", "telephone", "pays", "secteur"):
        if valeur := getattr(p, champ, "").strip():
            setattr(prospect, champ, valeur[: Prospect.__table__.c[champ].type.length])
    prospect.date_dernier_contact = datetime.now(UTC)

    conv.prospect_id = prospect.id
    await session.commit()
    return prospect


async def reclamer_conversation(
    session: AsyncSession, conv: Conversation, *, nom: str, email: str
) -> str:
    """Le visiteur réclame sa conversation avec un email — pas de compte.

    Le lien signé renvoyé EST l'authentification : seul le propriétaire de
    l'adresse le reçoit (RG-A01, RG-A03).
    """
    prospect = (
        await session.get(Prospect, conv.prospect_id) if conv.prospect_id else None
    )
    if prospect is None and email:
        prospect = await session.scalar(
            select(Prospect).where(func.lower(Prospect.email) == email.lower().strip())
        )
    if prospect is None:
        prospect = Prospect()
        session.add(prospect)
        await session.flush()
    conv.prospect_id = prospect.id

    prospect.nom = nom.strip()[:200] or prospect.nom
    prospect.email = email.strip().lower()[:200]
    prospect.consentement_le = datetime.now(UTC)  # RG-P01
    prospect.date_dernier_contact = datetime.now(UTC)
    await session.commit()

    lien = f"{params.BASE_URL}/echange/{conv.id}?t={conv.resume_token}"
    cr = await compte_rendu_de(session, conv.id)
    resume = ""
    if cr is not None:
        resume = (
            f"Objet : {cr.objet}\n\n{cr.resume}"
            + (
                f"\n\nProchaine étape : {cr.prochaine_action}"
                if cr.prochaine_action
                else ""
            )
        )

    await notifier(
        session,
        type_evenement=TypeEvenement.COMPTE_RENDU,
        gravite=Gravite.NORMALE,
        titre="Label Technology",
        corps=(
            f"Bonjour {prospect.nom},\n\n"
            "Voici le résumé de notre échange :\n\n"
            f"{resume or 'Résumé indisponible.'}\n\n"
            "Voici également la copie de notre échange et le lien pour le relire "
            f"ou le poursuivre :\n{lien}\n\n"
            f"{await transcription(session, conv.id)}\n\n"
            "--\nLaura, assistante virtuelle de Label Technology\n\n"
            "Vous recevez cet email parce que vous l'avez demandé pendant notre "
            "échange sur labeltechnology.mg. Pour ne plus être contacté, "
            "répondez simplement STOP."  # RG-P02
        ),
        conversation_id=conv.id,
        destinataire_email=prospect.email,
    )
    return lien


async def terminer_conversation(
    session: AsyncSession, conv: Conversation
) -> CompteRendu:
    """RG-C09 : la fin déclenche obligatoirement un compte rendu.

    Enchaîne : génération contrainte → score déterministe → prospect →
    alertes → notifications.
    """
    if (existant := await compte_rendu_de(session, conv.id)) is not None:
        return existant  # RG-C08 : idempotent

    texte = await transcription(session, conv.id)

    try:
        data = await llm.generer_compte_rendu(texte)
    except llm.ErreurModele as exc:
        # RG-R06 : échec après 3 tentatives → alerte technique avec le brut
        await notifier(
            session,
            type_evenement=TypeEvenement.INCIDENT_TECHNIQUE,
            gravite=Gravite.IMMEDIATE,
            titre="⚠️ Compte rendu impossible",
            corps=f"Conversation {conv.id}\n{exc}\n\n---\n{texte[:3000]}",
            conversation_id=conv.id,
        )
        raise

    score, temperature, justification = scoring.calculer(data.prospect, data.qualification)

    cr = CompteRendu(
        conversation_id=conv.id,
        objet=data.objet[:300],
        resume=data.resume,
        activite=data.qualification.activite[:200],
        marche=data.qualification.marche[:50],
        service_concerne=data.qualification.service_concerne[:200],
        besoins=data.qualification.besoins,
        questions=[q.model_dump() for q in data.questions],
        infos_recueillies=data.infos_recueillies,
        infos_manquantes=data.infos_manquantes,
        etapes_contractualisation=data.etapes_contractualisation,
        qualification=data.qualification.model_dump(),
        temperature=temperature,
        score=score,
        justification_score=justification,
        prochaine_action=data.prochaine_action,
        echeance_jours=data.echeance_jours,
    )
    session.add(cr)
    # `CompteRendu.id` vient d'un `default=` Python, appliqué à l'INSERT : sans
    # ce flush, `cr.id` vaut None et chaque Alerte viole la contrainte NOT NULL.
    # Le symptôme était vicieux — seuls les comptes rendus AVEC alerte
    # échouaient, c'est-à-dire précisément les prospects à ne pas rater.
    await session.flush()

    for a in data.alertes:
        session.add(
            Alerte(
                compte_rendu_id=cr.id,
                motif=a.motif.strip().lower()[:30],
                justification=a.justification,
            )
        )

    conv.statut = StatutConversation.TERMINEE
    await session.commit()

    prospect = await _rattacher_prospect(session, conv, data)
    if prospect and prospect.statut_suivi == "":
        prospect.statut_suivi = StatutSuivi.NOUVEAU
        await session.commit()

    # RG-N03 : compte rendu par email, quelle que soit la température.
    await notifier(
        session,
        type_evenement=TypeEvenement.COMPTE_RENDU,
        gravite=Gravite.NORMALE,
        titre=f"[Laura] {cr.objet or 'Nouvel échange'}",
        corps=rendre_compte_rendu_texte(cr, await alertes_de(session, cr.id)),
        charge={"score": cr.score, "temperature": cr.temperature},
        conversation_id=conv.id,
    )

    # RG-N02 : prospect chaud ou alerte → notification immédiate.
    if temperature is Temperature.CHAUD or data.alertes:
        titre, corps = formater_alerte_prospect(cr, conv.id)
        if data.alertes:
            motifs = ", ".join(a.motif for a in data.alertes)
            titre = f"🚨 Alerte équipe — {motifs}"
            corps = (
                "\n".join(f"• {a.motif} : {a.justification}" for a in data.alertes)
                + "\n\n"
                + corps
            )
        await notifier(
            session,
            type_evenement=(
                TypeEvenement.ALERTE_EQUIPE
                if data.alertes
                else TypeEvenement.PROSPECT_CHAUD
            ),
            gravite=Gravite.IMMEDIATE,
            titre=titre,
            corps=corps,
            charge={"score": cr.score, "temperature": cr.temperature},
            conversation_id=conv.id,
        )

    return cr


def rendre_compte_rendu_texte(
    cr: CompteRendu, alertes: list[Alerte] | None = None
) -> str:
    """Les 9 rubriques, en texte lisible pour l'email (RG-R01)."""

    def liste(titre: str, items) -> str:
        if not items:
            return ""
        return f"\n{titre}\n" + "\n".join(f"  - {i}" for i in items)

    parties = [
        f"OBJET : {cr.objet}",
        f"\nTEMPÉRATURE : {cr.temperature.upper()} — {cr.score}/100",
        f"  {cr.justification_score}",
        f"\nACTIVITÉ : {cr.activite or '—'}"
        f"\nMARCHÉ : {cr.marche or '—'}"
        f"\nSERVICE : {cr.service_concerne or '—'}",
        f"\nRÉSUMÉ\n  {cr.resume}",
        liste("BESOINS", cr.besoins),
        liste("INFOS RECUEILLIES", cr.infos_recueillies),
        liste("INFOS MANQUANTES", cr.infos_manquantes),
    ]

    if cr.questions:
        parties.append("\nQUESTIONS POSÉES")
        for q in cr.questions:
            parties.append(f"  Q : {q.get('question', '')}\n  R : {q.get('reponse', '')}")

    if alertes:
        parties.append("\nALERTES")
        parties.extend(f"  ⚠ {a.motif} : {a.justification}" for a in alertes)

    if cr.etapes_contractualisation:
        parties.append("\nPOUR CONTRACTUALISER")
        parties.extend(
            f"  {i}. {e}" for i, e in enumerate(cr.etapes_contractualisation, 1)
        )

    if cr.prochaine_action:
        echeance = f" (sous {cr.echeance_jours} jours)" if cr.echeance_jours else ""
        parties.append(f"\nPROCHAINE ACTION{echeance}\n  {cr.prochaine_action}")

    parties.append("\n--\nLaura, assistante virtuelle de Label Technology")
    return "\n".join(p for p in parties if p)
