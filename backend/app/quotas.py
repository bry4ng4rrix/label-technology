"""Garde-fous — RG-X01 à RG-X05.

Un endpoint public sans limite, c'est une facture. Fenêtre glissante en
mémoire, suffisante pour un seul processus ; à déporter dans Redis si tu passes
à plusieurs workers.
"""

from __future__ import annotations

import time
from collections import defaultdict, deque
from dataclasses import dataclass

from app.config import params


@dataclass(frozen=True, slots=True)
class Refus:
    code: str
    message: str


_messages_par_ip: dict[str, deque[float]] = defaultdict(deque)
_conversations_par_ip: dict[str, deque[float]] = defaultdict(deque)

FENETRE_MESSAGES = 10.0  # secondes
FENETRE_JOUR = 86_400.0


def _purger(file: deque[float], fenetre: float, maintenant: float) -> None:
    while file and maintenant - file[0] > fenetre:
        file.popleft()


def verifier_message(ip_hash: str, contenu: str, nb_messages: int) -> Refus | None:
    """Appelé avant chaque message entrant."""
    if not contenu.strip():
        return Refus("message_vide", "Message vide.")

    if len(contenu) > params.MAX_CHARS_PAR_MESSAGE:
        return Refus(
            "message_trop_long",
            f"Message limité à {params.MAX_CHARS_PAR_MESSAGE} caractères.",
        )

    if nb_messages >= params.MAX_MESSAGES_PAR_CONVERSATION:
        return Refus(
            "conversation_pleine",
            "Cet échange a atteint sa limite. L'équipe prend le relais : "
            "écrivez à contact@labeltechnology.mg.",
        )

    maintenant = time.monotonic()
    file = _messages_par_ip[ip_hash]
    _purger(file, FENETRE_MESSAGES, maintenant)
    if len(file) >= params.MAX_MESSAGES_PAR_10S:
        return Refus("trop_rapide", "Un instant — laissez-moi le temps de répondre.")
    file.append(maintenant)
    return None


def verifier_nouvelle_conversation(ip_hash: str) -> Refus | None:
    maintenant = time.monotonic()
    file = _conversations_par_ip[ip_hash]
    _purger(file, FENETRE_JOUR, maintenant)
    if len(file) >= params.MAX_CONVERSATIONS_PAR_IP_JOUR:
        return Refus(
            "trop_de_conversations",
            "Trop d'échanges ouverts aujourd'hui. Écrivez à "
            "contact@labeltechnology.mg.",
        )
    file.append(maintenant)
    return None


def ip_client(request_ou_ws) -> str:
    """IP réelle derrière Nginx — X-Forwarded-For en priorité."""
    entetes = request_ou_ws.headers
    if xff := entetes.get("x-forwarded-for"):
        return xff.split(",")[0].strip()
    if reel := entetes.get("x-real-ip"):
        return reel.strip()
    client = getattr(request_ou_ws, "client", None)
    return client.host if client else "0.0.0.0"
