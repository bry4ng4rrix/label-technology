"""Notifications — RG-N01 à RG-N07.

Routage par gravité :
  IMMEDIATE  Telegram + canal WebSocket `equipe`   (prospect chaud, alerte,
                                                    incident technique)
  NORMALE    email à l'équipe                      (chaque compte rendu)
  DIFFEREE   accumulée pour le bilan du lundi 7h

Telegram et pas WhatsApp pour l'interne : l'API WhatsApp Cloud interdit
d'écrire hors de la fenêtre de 24h sans template pré-approuvé par Meta, ce qui
est incompatible avec des alertes imprévisibles (RG-N06).
"""

from __future__ import annotations

import asyncio
import logging
from datetime import UTC, datetime
from email.message import EmailMessage
from typing import Any

import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from app.channels import CANAL_EQUIPE, hub
from app.config import params
from app.enums import CanalNotification, Gravite, TypeEvenement
from app.models import Notification

log = logging.getLogger("laura.notifications")

MAX_TENTATIVES = 3


async def _telegram(texte: str) -> None:
    if not (params.TELEGRAM_BOT_TOKEN and params.TELEGRAM_CHAT_ID):
        log.info("[telegram non configuré] %s", texte)
        return
    url = f"https://api.telegram.org/bot{params.TELEGRAM_BOT_TOKEN}/sendMessage"
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(
            url,
            json={
                "chat_id": params.TELEGRAM_CHAT_ID,
                "text": texte,
                "parse_mode": "HTML",
                "disable_web_page_preview": True,
            },
        )
        r.raise_for_status()


async def _email(sujet: str, corps: str, destinataire: str | None = None) -> None:
    destinataire = destinataire or params.EMAIL_EQUIPE
    if not params.SMTP_HOST:
        log.info("[smtp non configuré] à %s — %s", destinataire, sujet)
        return
    import aiosmtplib

    msg = EmailMessage()
    msg["From"] = params.EMAIL_EXPEDITEUR
    msg["To"] = destinataire
    msg["Subject"] = sujet
    msg.set_content(corps)
    await aiosmtplib.send(
        msg,
        hostname=params.SMTP_HOST,
        port=params.SMTP_PORT,
        username=params.SMTP_USER or None,
        password=params.SMTP_PASSWORD or None,
        start_tls=params.SMTP_PORT == 587,
    )


async def _avec_reprises(coro_factory, notif: Notification) -> None:
    """3 tentatives en recul exponentiel (RG-N07)."""
    for tentative in range(MAX_TENTATIVES):
        notif.tentatives = tentative + 1
        try:
            await coro_factory()
            notif.delivree = True
            notif.delivree_le = datetime.now(UTC)
            return
        except Exception as exc:
            notif.erreur = str(exc)[:500]
            log.warning(
                "Notification %s, tentative %d/%d : %s",
                notif.type,
                tentative + 1,
                MAX_TENTATIVES,
                exc,
            )
            if tentative < MAX_TENTATIVES - 1:
                await asyncio.sleep(2**tentative)


async def notifier(
    session: AsyncSession,
    *,
    type_evenement: TypeEvenement,
    gravite: Gravite,
    titre: str,
    corps: str,
    charge: dict[str, Any] | None = None,
    conversation_id: str | None = None,
    destinataire_email: str | None = None,
) -> Notification:
    """Trace la notification en base puis la route selon sa gravité."""
    canal = (
        CanalNotification.TELEGRAM
        if gravite is Gravite.IMMEDIATE
        else CanalNotification.EMAIL
    )
    notif = Notification(
        conversation_id=conversation_id,
        type=type_evenement,
        gravite=gravite,
        canal=canal,
        charge=charge or {},
    )
    session.add(notif)

    # Le tableau de bord de l'équipe reçoit tout, immédiatement.
    await hub.publier(
        CANAL_EQUIPE,
        {
            "type": "notification",
            "evenement": str(type_evenement),
            "gravite": str(gravite),
            "titre": titre,
            "corps": corps,
            "conversation_id": conversation_id,
            "charge": charge or {},
        },
    )

    if gravite is Gravite.IMMEDIATE:
        await _avec_reprises(lambda: _telegram(f"<b>{titre}</b>\n{corps}"), notif)
    elif gravite is Gravite.NORMALE:
        await _avec_reprises(
            lambda: _email(titre, corps, destinataire_email), notif
        )
    else:
        notif.delivree = True  # sera reprise dans le bilan hebdomadaire
        notif.delivree_le = datetime.now(UTC)

    await session.commit()
    return notif


def formater_alerte_prospect(cr, conversation_id: str) -> tuple[str, str]:
    """Message Telegram court et actionnable pour un prospect chaud."""
    titre = f"🔥 Prospect {cr.temperature} — score {cr.score}/100"
    lignes = [
        f"Objet : {cr.objet}",
        f"Service : {cr.service_concerne or '—'} ({cr.marche or '—'})",
        f"Prochaine action : {cr.prochaine_action or '—'}"
        + (f" — sous {cr.echeance_jours} j" if cr.echeance_jours else ""),
        f"{params.BASE_URL}/admin/conversations/{conversation_id}",
    ]
    return titre, "\n".join(lignes)
