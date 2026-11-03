"""Rapport quotidien à l'équipe : candidatures et conversations de la veille.

Envoyé chaque matin à 7h (heure de Madagascar) à EMAIL_EQUIPE, pour la journée
complète de la veille : aucune candidature ne tombe entre deux rapports.

Les CV sont des liens saisis par les candidats (souvent Google Drive) : ils
figurent en lien, jamais téléchargés par le serveur.

Un seul essai par jour (3 tentatives SMTP) : un échec reste visible dans la
table notifications. Aperçu ou envoi à la main :

    docker compose exec laura python -m app.rapport [AAAA-MM-JJ] [--envoyer]
"""

from __future__ import annotations

import asyncio
import logging
import sys
from datetime import UTC, date, datetime, time, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import params
from app.db import Session
from app.enums import Gravite, Role, TypeEvenement
from app.models import Conversation, Notification
from app.notifications import notifier
from app.site_models import JobApplication

log = logging.getLogger("laura.rapport")

MADAGASCAR = timezone(timedelta(hours=3))  # pas d'heure d'été
HEURE_ENVOI = 7


def _heure(d: datetime) -> str:
    return d.astimezone(MADAGASCAR).strftime("%H:%M")


def _bloc(texte: str, retrait: str = "   ") -> str:
    return "\n".join(retrait + ligne for ligne in texte.strip().splitlines())


async def construire(session: AsyncSession, jour: date) -> tuple[str, str]:
    debut = datetime.combine(jour, time(), MADAGASCAR)
    fin = debut + timedelta(days=1)

    candidatures = (
        await session.scalars(
            select(JobApplication)
            .where(JobApplication.created_at >= debut, JobApplication.created_at < fin)
            .order_by(JobApplication.created_at)
        )
    ).all()
    conversations = (
        await session.scalars(
            select(Conversation)
            .where(Conversation.date_creation >= debut, Conversation.date_creation < fin)
            .order_by(Conversation.date_creation)
        )
    ).all()

    jour_fr = jour.strftime("%d/%m/%Y")
    sujet = (
        f"Rapport du {jour_fr} — {len(candidatures)} candidature(s), "
        f"{len(conversations)} conversation(s)"
    )
    lignes = [
        f"Rapport du {jour_fr} (heure de Madagascar)",
        "",
        f"Candidatures reçues : {len(candidatures)}",
        f"Conversations avec Laura : {len(conversations)}",
        "",
        f"CANDIDATURES ({len(candidatures)})",
        "=" * 40,
    ]
    if not candidatures:
        lignes.append("Aucune candidature ce jour-là.")
    for i, c in enumerate(candidatures, 1):
        lignes += [
            "",
            f"{i}. {c.full_name} — {c.job_title} (reçue à {_heure(c.created_at)})",
            f"   Email : {c.email}",
            f"   Téléphone : {c.phone or '—'}",
            f"   CV : {c.cv_url or 'aucun CV fourni'}",
        ]
        if c.message:
            lignes += ["   Message :", _bloc(c.message, "     ")]

    lignes += ["", "", f"CONVERSATIONS ({len(conversations)})", "=" * 40]
    if not conversations:
        lignes.append("Aucune conversation ce jour-là.")
    for i, conv in enumerate(conversations, 1):
        lignes += [
            "",
            f"{i}. {_heure(conv.date_creation)} — canal {conv.canal}, {conv.statut}"
            + (f", page {conv.page_url}" if conv.page_url else ""),
            f"   {params.BASE_URL}/admin/conversations/{conv.id}",
        ]
        if cr := conv.compte_rendu:
            lignes += [
                f"   Objet : {cr.objet or '—'}",
                f"   Prospect : {cr.temperature or '—'}, score {cr.score}/100",
            ]
            if cr.resume:
                lignes += ["   Résumé :", _bloc(cr.resume, "     ")]
            if cr.prochaine_action:
                lignes.append(f"   Prochaine action : {cr.prochaine_action}")
        lignes.append("   Échange :")
        for m in conv.messages:
            qui = "Visiteur" if m.role == Role.VISITEUR else "Laura"
            lignes.append(f"     [{_heure(m.horodatage)}] {qui} : {m.contenu.strip()}")

    return sujet, "\n".join(lignes) + "\n"


async def envoyer(session: AsyncSession, jour: date) -> Notification:
    sujet, corps = await construire(session, jour)
    return await notifier(
        session,
        type_evenement=TypeEvenement.RAPPORT_QUOTIDIEN,
        gravite=Gravite.NORMALE,
        titre=sujet,
        corps=corps,
        charge={"jour": jour.isoformat()},
    )


async def envoyer_si_du(maintenant: datetime | None = None) -> bool:
    """Appelée par la boucle d'entretien : envoie le rapport de la veille une
    fois 7h passées, si aucun essai n'a encore eu lieu pour ce jour."""
    maintenant = (maintenant or datetime.now(UTC)).astimezone(MADAGASCAR)
    if maintenant.hour < HEURE_ENVOI:
        return False
    jour = maintenant.date() - timedelta(days=1)
    async with Session() as session:
        recents = await session.scalars(
            select(Notification)
            .where(Notification.type == TypeEvenement.RAPPORT_QUOTIDIEN)
            .order_by(Notification.date_creation.desc())
            .limit(7)
        )
        if any(n.charge.get("jour") == jour.isoformat() for n in recents):
            return False
        notif = await envoyer(session, jour)
    if not notif.delivree:
        log.error("Rapport du %s non envoyé : %s", jour, notif.erreur)
    return True


async def _main(args: list[str]) -> None:
    dates = [a for a in args if not a.startswith("--")]
    jour = (
        date.fromisoformat(dates[0])
        if dates
        else datetime.now(MADAGASCAR).date() - timedelta(days=1)
    )
    async with Session() as session:
        if "--envoyer" in args:
            notif = await envoyer(session, jour)
            print("envoyé" if notif.delivree else f"échec : {notif.erreur}")
        else:
            sujet, corps = await construire(session, jour)
            print(f"Sujet : {sujet}\n\n{corps}")


if __name__ == "__main__":
    asyncio.run(_main(sys.argv[1:]))
