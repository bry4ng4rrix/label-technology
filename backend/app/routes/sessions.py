"""REST — ouverture de session, reprise, canal formulaire.

Le WebSocket crée déjà la conversation ; ces routes servent pour les clients
qui ne peuvent pas ouvrir de socket (formulaire HTML classique, webhook) et
pour la page de relecture d'un échange.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app import quotas, services
from app.db import get_session
from app.enums import Role
from app.models import hacher_ip
from app.prompts import ACCUEIL
from app.schemas import CreationSession, ReclamationSession, SessionCreee

router = APIRouter(prefix="/api", tags=["sessions"])


@router.post("/sessions", response_model=SessionCreee, status_code=201)
async def ouvrir_session(
    corps: CreationSession,
    request: Request,
    session: AsyncSession = Depends(get_session),
) -> SessionCreee:
    ip = quotas.ip_client(request)
    if refus := quotas.verifier_nouvelle_conversation(hacher_ip(ip)):
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, refus.message)

    conv = await services.creer_conversation(
        session,
        canal=corps.canal,
        ip=ip,
        page_url=corps.page_url,
        referrer=corps.referrer,
        langue=corps.langue,
    )
    return SessionCreee(
        conversation_id=conv.id,
        resume_token=conv.resume_token,
        canal=corps.canal,
        message_accueil=ACCUEIL[corps.canal],
    )


@router.get("/conversations/{conversation_id}")
async def relire(
    conversation_id: str,
    t: str = Query(..., description="jeton de reprise"),
    session: AsyncSession = Depends(get_session),
) -> dict:
    """RG-A02 : sans jeton valide, rien n'est affiché. RG-A04 : lecture seule."""
    conv = await services.charger_conversation(session, conversation_id, t)
    if conv is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Échange introuvable.")
    return {
        "conversation_id": conv.id,
        "canal": conv.canal,
        "statut": conv.statut,
        "date_creation": conv.date_creation,
        "messages": [
            {
                "role": m.role,
                "auteur": "Vous" if m.role == Role.VISITEUR else "Laura",
                "contenu": m.contenu,
                "horodatage": m.horodatage,
            }
            for m in await services.messages_conversation(session, conv.id)
        ],
    }


@router.post("/conversations/{conversation_id}/reclamer")
async def reclamer(
    conversation_id: str,
    corps: ReclamationSession,
    t: str = Query(...),
    session: AsyncSession = Depends(get_session),
) -> dict:
    if not corps.consentement:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Accord nécessaire avant tout enregistrement de votre email.",
        )
    conv = await services.charger_conversation(session, conversation_id, t)
    if conv is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Échange introuvable.")
    lien = await services.reclamer_conversation(
        session, conv, nom=corps.nom, email=corps.email
    )
    return {"envoye": True, "lien_reprise": lien}


@router.post("/conversations/{conversation_id}/terminer")
async def terminer(
    conversation_id: str,
    t: str = Query(...),
    session: AsyncSession = Depends(get_session),
) -> dict:
    conv = await services.charger_conversation(session, conversation_id, t)
    if conv is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Échange introuvable.")
    cr = await services.terminer_conversation(session, conv)
    return {
        "objet": cr.objet,
        "resume": cr.resume,
        "temperature": cr.temperature,
        "score": cr.score,
        "justification_score": cr.justification_score,
        "prochaine_action": cr.prochaine_action,
    }
