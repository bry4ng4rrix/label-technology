"""Session de /setting : `<expiration>.<signature>`, signée avec ADMIN_TOKEN.

Le site la garde dans un cookie httpOnly et la renvoie telle quelle : il ne
détient aucun secret. Changer ADMIN_TOKEN invalide toutes les sessions.
"""

from __future__ import annotations

import hashlib
import hmac
import time

from app.config import params

DUREE_SECONDES = 7 * 24 * 3600


def _signer(expiration: str) -> str:
    return hmac.new(params.ADMIN_TOKEN.encode(), expiration.encode(), hashlib.sha256).hexdigest()


def creer_session() -> str:
    expiration = str(int(time.time()) + DUREE_SECONDES)
    return f"{expiration}.{_signer(expiration)}"


def session_valide(jeton: str) -> bool:
    expiration, _, signature = jeton.partition(".")
    return (
        bool(params.ADMIN_TOKEN)
        and expiration.isdecimal()
        and hmac.compare_digest(signature.encode(), _signer(expiration).encode())
        and int(expiration) > time.time()
    )
