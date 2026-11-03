"""Canaux WebSocket — publication/abonnement en mémoire.

Deux familles de canaux :

  conv:<id>   une conversation. Abonnés : le visiteur, et tout membre de
              l'équipe qui regarde l'échange en direct.
  equipe      le fil d'alertes interne. Abonnés : les tableaux de bord ouverts.
              Reçoit prospects chauds, alertes et incidents (RG-N02, RG-N04).

À ne pas confondre avec les *canaux métier* de l'énumération `Canal`
(site / formulaire / whatsapp), qui décrivent par où arrive le visiteur.

Limite assumée : état en mémoire, donc un seul processus. Avec plusieurs
workers uvicorn, un visiteur abonné au worker A ne recevrait pas ce que publie
le worker B. Pour passer à l'échelle : remplacer `_abonnes` par du Redis
pub/sub, l'interface publique ne change pas.
"""

from __future__ import annotations

import asyncio
import logging
from collections import defaultdict
from datetime import UTC, datetime
from typing import Any

from fastapi import WebSocket

log = logging.getLogger("laura.channels")

CANAL_EQUIPE = "equipe"


def canal_conversation(conversation_id: str) -> str:
    return f"conv:{conversation_id}"


class Hub:
    def __init__(self) -> None:
        self._abonnes: dict[str, set[WebSocket]] = defaultdict(set)
        self._verrou = asyncio.Lock()

    async def abonner(self, canal: str, ws: WebSocket) -> None:
        async with self._verrou:
            self._abonnes[canal].add(ws)
        log.debug("abonnement %s (%d abonnés)", canal, len(self._abonnes[canal]))

    async def desabonner(self, canal: str, ws: WebSocket) -> None:
        async with self._verrou:
            self._abonnes[canal].discard(ws)
            if not self._abonnes[canal]:
                del self._abonnes[canal]

    async def desabonner_partout(self, ws: WebSocket) -> None:
        async with self._verrou:
            for canal in list(self._abonnes):
                self._abonnes[canal].discard(ws)
                if not self._abonnes[canal]:
                    del self._abonnes[canal]

    async def publier(
        self, canal: str, charge: dict[str, Any], sauf: WebSocket | None = None
    ) -> int:
        """Diffuse à tous les abonnés. Retourne le nombre de destinataires.

        Les sockets mortes sont retirées au passage : un onglet fermé ne doit
        pas faire échouer la diffusion aux autres.
        """
        async with self._verrou:
            cibles = [ws for ws in self._abonnes.get(canal, set()) if ws is not sauf]

        message = {"horodatage": datetime.now(UTC).isoformat(), **charge}
        mortes: list[WebSocket] = []
        envoyes = 0
        for ws in cibles:
            try:
                await ws.send_json(message)
                envoyes += 1
            except Exception:
                mortes.append(ws)
        for ws in mortes:
            await self.desabonner_partout(ws)
        return envoyes

    def nb_abonnes(self, canal: str) -> int:
        return len(self._abonnes.get(canal, set()))

    def etat(self) -> dict[str, int]:
        return {canal: len(ws) for canal, ws in self._abonnes.items()}


hub = Hub()
