
from __future__ import annotations

from fastapi import APIRouter, Depends, Header, HTTPException, Query, status
from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import params
from app.db import get_session
from app.enums import StatutConversation, StatutSuivi
from app.knowledge import fiches
from app.models import CompteRendu, Conversation, Prospect, Trou
from app.schemas import (
    FicheIn,
    FicheOut,
    MajStatutSuivi,
    ProspectOut,
    TrouOut,
)
from app.services import (
    alertes_de,
    compte_rendu_de,
    messages_conversation,
    rendre_compte_rendu_texte,
)


async def verifier_admin(x_admin_token: str = Header(default="")) -> None:
    if not params.ADMIN_TOKEN or x_admin_token != params.ADMIN_TOKEN:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Jeton invalide.")


router = APIRouter(
    prefix="/admin", tags=["admin"], dependencies=[Depends(verifier_admin)]
)


# --- Fiches (RG-F02) ------------------------------------------------------


@router.get("/fiches", response_model=list[FicheOut])
async def lister_fiches() -> list[FicheOut]:
    return [
        FicheOut(
            code=f.code, titre=f.titre, contenu=f.contenu, a_completer=f.a_completer
        )
        for f in fiches.toutes()
    ]


@router.get("/fiches/{code}", response_model=FicheOut)
async def lire_fiche(code: str) -> FicheOut:
    f = fiches.obtenir(code)
    if f is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Fiche {code} inconnue.")
    return FicheOut(
        code=f.code, titre=f.titre, contenu=f.contenu, a_completer=f.a_completer
    )


@router.put("/fiches/{code}", response_model=FicheOut)
async def editer_fiche(code: str, corps: FicheIn) -> FicheOut:
    """Prise en compte immédiate : la réponse suivante de Laura en tient
    compte, sans redéploiement."""
    try:
        f = fiches.ecrire(code, corps.titre, corps.contenu, corps.a_completer)
    except KeyError:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, f"Fiche {code} inconnue."
        ) from None
    return FicheOut(
        code=f.code, titre=f.titre, contenu=f.contenu, a_completer=f.a_completer
    )


# --- Tableau de suivi (RG-R04, RG-S01) -----------------------------------


@router.get("/prospects", response_model=list[ProspectOut])
async def lister_prospects(
    statut: StatutSuivi | None = Query(default=None),
    limite: int = Query(default=100, le=500),
    session: AsyncSession = Depends(get_session),
) -> list[ProspectOut]:
    requete = select(Prospect).order_by(desc(Prospect.date_dernier_contact))
    if statut:
        requete = requete.where(Prospect.statut_suivi == statut)
    prospects = (await session.scalars(requete.limit(limite))).all()

    sortie: list[ProspectOut] = []
    for p in prospects:
        # Dernier compte rendu connu pour ce prospect
        dernier = await session.scalar(
            select(CompteRendu)
            .join(Conversation, Conversation.id == CompteRendu.conversation_id)
            .where(Conversation.prospect_id == p.id)
            .order_by(desc(CompteRendu.date_creation))
            .limit(1)
        )
        sortie.append(
            ProspectOut(
                id=p.id,
                nom=p.nom,
                entreprise=p.entreprise,
                email=p.email,
                telephone=p.telephone,
                pays=p.pays,
                secteur=p.secteur,
                statut_suivi=StatutSuivi(p.statut_suivi),
                temperature=dernier.temperature if dernier else None,
                score=dernier.score if dernier else 0,
                date_creation=p.date_creation,
                nb_conversations=await session.scalar(
                    select(func.count(Conversation.id)).where(
                        Conversation.prospect_id == p.id
                    )
                )
                or 0,
            )
        )
    return sortie


@router.patch("/prospects/{prospect_id}")
async def changer_statut(
    prospect_id: str,
    corps: MajStatutSuivi,
    session: AsyncSession = Depends(get_session),
) -> dict:
    p = await session.get(Prospect, prospect_id)
    if p is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Prospect inconnu.")
    p.statut_suivi = corps.statut_suivi
    await session.commit()
    return {"id": p.id, "statut_suivi": p.statut_suivi}


@router.get("/conversations/{conversation_id}")
async def detail_conversation(
    conversation_id: str, session: AsyncSession = Depends(get_session)
) -> dict:
    conv = await session.get(Conversation, conversation_id)
    if conv is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Conversation inconnue.")
    cr = await compte_rendu_de(session, conv.id)
    alertes = await alertes_de(session, cr.id) if cr else []
    return {
        "conversation_id": conv.id,
        "canal": conv.canal,
        "statut": conv.statut,
        "page_url": conv.page_url,
        "referrer": conv.referrer,
        "date_creation": conv.date_creation,
        "messages": [
            {"role": m.role, "contenu": m.contenu, "horodatage": m.horodatage}
            for m in await messages_conversation(session, conv.id)
        ],
        "compte_rendu": rendre_compte_rendu_texte(cr, alertes) if cr else None,
        "score": cr.score if cr else None,
        "temperature": cr.temperature if cr else None,
    }


# --- Trous : la liste de travail (RG-T04) --------------------------------


@router.get("/trous", response_model=list[TrouOut])
async def lister_trous(
    inclure_resolus: bool = Query(default=False),
    session: AsyncSession = Depends(get_session),
) -> list[TrouOut]:
    """Classés par fréquence : ce que les prospects réclament le plus."""
    requete = select(Trou).order_by(desc(Trou.occurrences), desc(Trou.date_creation))
    if not inclure_resolus:
        requete = requete.where(Trou.resolu_le.is_(None))
    return [
        TrouOut(
            id=t.id,
            question=t.question,
            sujet=t.sujet,
            fiche_code=t.fiche_code,
            occurrences=t.occurrences,
            resolu=t.est_resolu(),
        )
        for t in (await session.scalars(requete)).all()
    ]


@router.post("/trous/{trou_id}/resoudre")
async def resoudre_trou(
    trou_id: str, session: AsyncSession = Depends(get_session)
) -> dict:
    from datetime import UTC, datetime

    t = await session.get(Trou, trou_id)
    if t is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Trou inconnu.")
    t.resolu_le = datetime.now(UTC)
    await session.commit()
    return {"id": t.id, "resolu": True}


# --- Statistiques --------------------------------------------------------


@router.get("/statistiques")
async def statistiques(session: AsyncSession = Depends(get_session)) -> dict:
    """Base du bilan hebdomadaire du lundi 7h (RG-N05)."""
    total_conv = await session.scalar(select(func.count(Conversation.id))) or 0
    terminees = (
        await session.scalar(
            select(func.count(Conversation.id)).where(
                Conversation.statut == StatutConversation.TERMINEE
            )
        )
        or 0
    )
    abandonnees = (
        await session.scalar(
            select(func.count(Conversation.id)).where(
                Conversation.statut == StatutConversation.ABANDONNEE
            )
        )
        or 0
    )

    par_temperature = dict(
        (
            await session.execute(
                select(CompteRendu.temperature, func.count(CompteRendu.id)).group_by(
                    CompteRendu.temperature
                )
            )
        ).all()
    )
    pages = (
        await session.execute(
            select(Conversation.page_url, func.count(Conversation.id))
            .where(Conversation.page_url != "")
            .group_by(Conversation.page_url)
            .order_by(desc(func.count(Conversation.id)))
            .limit(10)
        )
    ).all()
    trous_ouverts = (
        await session.scalar(
            select(func.count(Trou.id)).where(Trou.resolu_le.is_(None))
        )
        or 0
    )

    return {
        "conversations": total_conv,
        "terminees": terminees,
        "abandonnees": abandonnees,
        "taux_abandon": round(abandonnees / total_conv * 100, 1) if total_conv else 0.0,
        "par_temperature": par_temperature,
        "pages_entree": [{"page": p, "conversations": n} for p, n in pages],
        "trous_ouverts": trous_ouverts,
        "fiches_a_completer": fiches.codes_a_completer(),
    }
