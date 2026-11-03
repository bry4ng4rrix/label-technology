"""Couche modèle — isolée pour pouvoir changer de fournisseur.

Trois usages :
  - `streamer_reponse`  : la conversation, en flux (WebSocket) ;
  - `generer_compte_rendu` : sortie JSON contrainte par schéma (RG-R05) ;
  - `detecter_trou`     : classification asynchrone du tour (RG-T03).

Sans clé API, l'application démarre quand même en mode dégradé (RG-X07).
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import AsyncIterator

from app.config import params
from app.enums import Canal
from app.prompts import (
    MODE_DEGRADE,
    PROMPT_COMPTE_RENDU,
    prompt_trou,
    construire_systeme,
)
from app.schemas import CompteRenduData, TrouData

log = logging.getLogger("laura.llm")

_client = None
if params.llm_disponible:
    try:
        from google import genai

        _client = genai.Client(api_key=params.GEMINI_API_KEY)
    except Exception as exc:  # pragma: no cover
        log.error("Client Gemini indisponible, mode dégradé : %s", exc)


def disponible() -> bool:
    return _client is not None


def _config(**extra):
    from google.genai import types

    return types.GenerateContentConfig(**extra)


#: Codes qui valent la peine d'être réessayés. Un 400 ou un 403 ne guérira pas
#: tout seul ; un 503 « high demand » disparaît en général en une seconde.
CODES_TRANSITOIRES = {429, 500, 502, 503, 504}


def _est_transitoire(exc: Exception) -> bool:
    code = getattr(exc, "code", None) or getattr(exc, "status_code", None)
    return code in CODES_TRANSITOIRES


def _sequence_modeles() -> list[str]:
    """Deux essais sur le modèle principal, puis bascule sur le secours.

    Une saturation dure rarement plus de quelques secondes, mais quand elle
    dure, changer de famille de modèle est plus efficace que d'attendre.
    """
    sequence = [params.GEMINI_MODEL, params.GEMINI_MODEL]
    if params.GEMINI_MODEL_SECOURS:
        sequence.append(params.GEMINI_MODEL_SECOURS)
    return sequence


async def streamer_reponse(
    canal: Canal, historique: list[dict[str, str]]
) -> AsyncIterator[str]:
    """Flux de la réponse de Laura.

    `historique` : [{"role": "user"|"model", "text": "..."}], déjà tronqué aux
    N derniers tours par l'appelant (RG-C05).

    Reprise sur erreur transitoire, mais UNIQUEMENT tant qu'aucun fragment
    n'est parti : une fois que le visiteur a commencé à lire, relancer la
    génération lui afficherait deux débuts de réponse collés. Dans ce cas on
    laisse remonter l'erreur, et le panneau propose le relais humain.
    """
    if _client is None:
        yield MODE_DEGRADE
        return

    from google.genai import types

    contents = [{"role": h["role"], "parts": [{"text": h["text"]}]} for h in historique]
    config = _config(
        system_instruction=construire_systeme(canal),
        temperature=0.4,  # bas : fidélité aux fiches avant style
        max_output_tokens=params.MAX_TOKENS_SORTIE,
        # Les tokens de réflexion sont décomptés de max_output_tokens : sur
        # gemini-3.5-flash, 574 tokens de réflexion pour 22 de réponse, donc
        # une phrase coupée en plein milieu. Laura récite des fiches, elle n'a
        # rien à raisonner — on coupe, et on économise 550 tokens par message.
        thinking_config=types.ThinkingConfig(thinking_budget=0),
    )

    sequence = _sequence_modeles()
    derniere: Exception | None = None

    for tentative, modele in enumerate(sequence):
        emis = False
        try:
            flux = await _client.aio.models.generate_content_stream(
                model=modele, contents=contents, config=config
            )
            async for morceau in flux:
                if morceau.text:
                    emis = True
                    yield morceau.text
            if modele != params.GEMINI_MODEL:
                log.info("Réponse servie par le modèle de secours %s", modele)
            return
        except Exception as exc:
            derniere = exc
            if emis:
                log.error("Flux coupé après émission : %s", exc)
                raise ErreurModele(str(exc)) from exc
            if not _est_transitoire(exc) or tentative == len(sequence) - 1:
                log.error("Streaming impossible (%s) : %s", modele, exc)
                raise ErreurModele(str(exc)) from exc
            attente = 1.5 * 2**tentative
            log.warning(
                "%s indisponible (essai %d/%d), reprise dans %.1fs : %s",
                modele,
                tentative + 1,
                len(sequence),
                attente,
                exc,
            )
            await asyncio.sleep(attente)

    raise ErreurModele(str(derniere))


async def generer_compte_rendu(transcription: str) -> CompteRenduData:
    """Sortie contrainte par schéma. 3 tentatives puis échec (RG-R06).

    Ici la réflexion est conservée, contrairement au chat : extraire les faits,
    juger si un motif d'alerte s'applique et ordonner les étapes de
    contractualisation gagne à être raisonné. Aucun `max_output_tokens` n'est
    fixé, donc pas de risque de troncature.
    """
    if _client is None:
        raise ErreurModele("Modèle indisponible")

    sequence = _sequence_modeles()
    derniere: Exception | None = None
    for tentative, modele in enumerate(sequence):
        try:
            reponse = await _client.aio.models.generate_content(
                model=modele,
                contents=transcription,
                config=_config(
                    system_instruction=PROMPT_COMPTE_RENDU,
                    temperature=0.2,
                    response_mime_type="application/json",
                    response_schema=CompteRenduData,
                ),
            )
            if reponse.parsed is None:
                raise ErreurModele("Schéma non respecté")
            return reponse.parsed
        except Exception as exc:
            derniere = exc
            log.warning(
                "Compte rendu, essai %d/%d sur %s : %s",
                tentative + 1, len(sequence), modele, exc,
            )
            await asyncio.sleep(2**tentative)
    raise ErreurModele(f"Compte rendu impossible après {len(sequence)} essais : {derniere}")


async def detecter_trou(question: str, reponse: str) -> TrouData:
    """Tourne en tâche de fond : ne retarde jamais le visiteur (RG-T03)."""
    if _client is None:
        return TrouData()
    try:
        r = await _client.aio.models.generate_content(
            model=params.GEMINI_MODEL_SECOURS or params.GEMINI_MODEL,
            contents=f"Visiteur : {question}\n\nLaura : {reponse}",
            config=_config(
                system_instruction=prompt_trou(),
                temperature=0.0,
                response_mime_type="application/json",
                response_schema=TrouData,
            ),
        )
        return r.parsed or TrouData()
    except Exception as exc:
        log.warning("Détection de trou échouée : %s", exc)
        return TrouData()


class ErreurModele(RuntimeError):
    pass
