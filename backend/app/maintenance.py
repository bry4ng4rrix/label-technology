"""Tâches périodiques — RG-C06, RG-P03.

Lancées par la boucle de fond de l'application. Pour une production sérieuse,
les déporter dans un cron système : si le processus redémarre, la boucle repart
de zéro.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import UTC, datetime, timedelta

from sqlalchemy import select, update

from app.config import params
from app.db import Session
from app.enums import StatutConversation
from app.models import Conversation, Message, Prospect

log = logging.getLogger("laura.maintenance")

INTERVALLE_BALAYAGE = 300  # 5 minutes
RETENTION_CONVERSATION_JOURS = 90  # RG-P03
RETENTION_PROSPECT_JOURS = 365 * 3  # 3 ans après le dernier contact (CNIL)


async def marquer_abandonnees() -> int:
    """RG-C06 : 30 minutes sans message → abandonnée."""
    seuil = datetime.now(UTC) - timedelta(minutes=params.DELAI_ABANDON_MINUTES)
    async with Session() as session:
        resultat = await session.execute(
            update(Conversation)
            .where(
                Conversation.statut == StatutConversation.ACTIVE,
                Conversation.date_dernier_message < seuil,
            )
            .values(statut=StatutConversation.ABANDONNEE)
        )
        await session.commit()
        return resultat.rowcount or 0


async def purger() -> dict[str, int]:
    """RG-P03 et RG-P04 : on anonymise, on n'efface pas — les statistiques
    restent exploitables."""
    maintenant = datetime.now(UTC)
    seuil_conv = maintenant - timedelta(days=RETENTION_CONVERSATION_JOURS)
    seuil_prospect = maintenant - timedelta(days=RETENTION_PROSPECT_JOURS)

    async with Session() as session:
        # Conversations anonymes expirées : contenu des messages effacé
        a_purger = (
            await session.scalars(
                select(Conversation).where(
                    Conversation.date_dernier_message < seuil_conv,
                    Conversation.statut != StatutConversation.ANONYMISEE,
                    Conversation.prospect_id.is_(None),
                )
            )
        ).all()
        for conv in a_purger:
            await session.execute(
                update(Message)
                .where(Message.conversation_id == conv.id)
                .values(contenu="[purgé]")
            )
            conv.statut = StatutConversation.ANONYMISEE
            conv.ip_hash = ""
            conv.referrer = ""

        prospects = (
            await session.scalars(
                select(Prospect).where(
                    Prospect.date_dernier_contact < seuil_prospect,
                    Prospect.email != "",
                )
            )
        ).all()
        for p in prospects:
            p.nom = "[anonymisé]"
            p.email = ""
            p.telephone = ""

        await session.commit()
        return {"conversations": len(a_purger), "prospects": len(prospects)}


async def boucle_entretien() -> None:
    while True:
        try:
            nb = await marquer_abandonnees()
            if nb:
                log.info("%d conversation(s) passée(s) en abandonnée", nb)
        except Exception:
            log.exception("Balayage en échec")
        await asyncio.sleep(INTERVALLE_BALAYAGE)
