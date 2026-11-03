"""WebSocket — deux points d'entrée.

  /ws/chat    le visiteur. Crée ou reprend une conversation, streame les
              réponses de Laura, génère le compte rendu à la fin.
  /ws/equipe  le tableau de bord interne. Reçoit les alertes en direct et peut
              observer une conversation en cours.

Protocole : JSON, champ `type` dans les deux sens.

  visiteur → serveur     serveur → visiteur
  ------------------     ------------------------------------------
  message                pret        ouverture, id + jeton de reprise
  terminer               fragment    morceau de réponse (streaming)
  reclamer               fin_message message complet enregistré
  ping                   compte_rendu
                         erreur      {code, message}
                         pong
"""

from __future__ import annotations

import asyncio
import contextlib
import logging

from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect, status

from app import llm, quotas, services
from app.channels import CANAL_EQUIPE, canal_conversation, hub
from app.config import params
from app.db import Session
from app.enums import Canal, Role
from app.models import hacher_ip

log = logging.getLogger("laura.ws")
router = APIRouter(tags=["websocket"])


def origine_refusee(ws: WebSocket) -> bool:
    """Contrôle de l'en-tête Origin sur la poignée de main (RG-X05).

    Le CORSMiddleware ne s'applique PAS aux WebSocket : la négociation n'est
    pas une requête soumise à la politique d'origine. Sans ce contrôle,
    n'importe quel site pourrait intégrer Laura et consommer le quota Gemini
    de Label, alors que la règle RG-X05 annonce l'inverse.

    Une origine absente est tolérée : les navigateurs en envoient toujours une,
    mais pas les clients serveur ni les scripts de test. Et comme un script
    peut de toute façon forger l'en-tête, refuser son absence n'ajouterait
    aucune sécurité tout en cassant l'outillage. Ce contrôle vise l'intégration
    par un tiers depuis un navigateur, pas l'authentification — celle-ci repose
    sur les quotas par IP et, pour /ws/equipe, sur le jeton d'administration.
    """
    origine = ws.headers.get("origin")
    if origine is None or origine in params.origines:
        return False
    log.warning(
        "Poignée de main refusée, origine « %s » absente de ALLOWED_ORIGINS (%s)",
        origine,
        ", ".join(params.origines),
    )
    return True


@router.websocket("/ws/chat")
async def ws_chat(
    ws: WebSocket,
    conversation_id: str | None = Query(default=None),
    token: str | None = Query(default=None),
    canal: Canal = Query(default=Canal.SITE),
    page_url: str = Query(default=""),
    referrer: str = Query(default=""),
    langue: str = Query(default="fr"),
) -> None:
    if origine_refusee(ws):
        await ws.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await ws.accept()
    ip = quotas.ip_client(ws)
    ip_h = hacher_ip(ip)
    tache_trou: asyncio.Task | None = None

    async with Session() as session:
        # --- Ouverture : reprise ou création -----------------------------
        if conversation_id:
            conv = await services.charger_conversation(session, conversation_id, token)
            if conv is None:
                await ws.send_json(
                    {
                        "type": "erreur",
                        "code": "introuvable",
                        "message": "Conversation introuvable ou jeton invalide.",
                    }
                )
                await ws.close(code=status.WS_1008_POLICY_VIOLATION)
                return
        else:
            if refus := quotas.verifier_nouvelle_conversation(ip_h):
                await ws.send_json(
                    {"type": "erreur", "code": refus.code, "message": refus.message}
                )
                await ws.close(code=status.WS_1008_POLICY_VIOLATION)
                return
            conv = await services.creer_conversation(
                session,
                canal=canal,
                ip=ip,
                page_url=page_url,
                referrer=referrer,
                langue=langue,
            )

        sujet = canal_conversation(conv.id)
        await hub.abonner(sujet, ws)

        historique = [
            {"role": m.role, "contenu": m.contenu, "horodatage": m.horodatage.isoformat()}
            for m in await services.messages_conversation(session, conv.id)
        ]
        await ws.send_json(
            {
                "type": "pret",
                "conversation_id": conv.id,
                "resume_token": conv.resume_token,
                "canal": conv.canal,
                "statut": conv.statut,
                "historique": historique,
                "mode_degrade": not llm.disponible(),
            }
        )

        # --- Boucle de messages ------------------------------------------
        try:
            while True:
                recu = await ws.receive_json()
                type_message = recu.get("type")

                if type_message == "ping":
                    await ws.send_json({"type": "pong"})
                    continue

                if type_message == "terminer":
                    # On ne ferme jamais le socket ici, dans les deux cas :
                    # après un succès, le visiteur doit encore pouvoir demander
                    # sa copie par email (le formulaire n'apparaît qu'une fois
                    # le résumé affiché) ; après un échec, il doit pouvoir
                    # réessayer. La conversation passe en TERMINEE, ce qui
                    # suffit à refuser tout nouveau message (RG-C08).
                    await _terminer(ws, session, conv, sujet)
                    continue

                if type_message == "reclamer":
                    await _reclamer(ws, session, conv, recu)
                    continue

                if type_message != "message":
                    await ws.send_json(
                        {
                            "type": "erreur",
                            "code": "type_inconnu",
                            "message": f"Type de message inconnu : {type_message}",
                        }
                    )
                    continue

                await session.refresh(conv)
                if not conv.accepte_message():
                    await ws.send_json(
                        {
                            "type": "erreur",
                            "code": "conversation_terminee",
                            "message": "Cet échange est clos.",
                        }
                    )
                    continue

                contenu = (recu.get("contenu") or "").strip()
                nb = await services.compter_messages_visiteur(session, conv.id)
                if refus := quotas.verifier_message(ip_h, contenu, nb):
                    await ws.send_json(
                        {"type": "erreur", "code": refus.code, "message": refus.message}
                    )
                    continue

                await services.enregistrer_message(
                    session, conv, Role.VISITEUR, contenu
                )
                # L'équipe qui observe voit le message du visiteur arriver.
                await hub.publier(
                    sujet,
                    {"type": "message_visiteur", "contenu": contenu},
                    sauf=ws,
                )

                reponse = await _streamer(ws, session, conv, sujet)

                if reponse and llm.disponible():
                    # RG-T03 : détection de trou en tâche de fond.
                    tache_trou = asyncio.create_task(
                        _detecter_trou_isole(conv.id, contenu, reponse)
                    )

        except WebSocketDisconnect:
            log.info("Visiteur déconnecté (%s)", conv.id)
        except Exception:
            log.exception("Erreur WebSocket (%s)", conv.id)
            with contextlib.suppress(Exception):
                await ws.send_json(
                    {
                        "type": "erreur",
                        "code": "interne",
                        "message": "Incident technique. L'équipe a été prévenue.",
                    }
                )
        finally:
            await hub.desabonner(sujet, ws)
            if tache_trou and not tache_trou.done():
                with contextlib.suppress(asyncio.CancelledError):
                    await asyncio.wait_for(tache_trou, timeout=15)


async def _streamer(ws: WebSocket, session, conv, sujet: str) -> str:
    """Streame la réponse de Laura puis l'enregistre."""
    historique = await services.historique_modele(session, conv.id)
    morceaux: list[str] = []
    try:
        async for fragment in llm.streamer_reponse(Canal(conv.canal), historique):
            morceaux.append(fragment)
            await ws.send_json({"type": "fragment", "texte": fragment})
    except llm.ErreurModele as exc:
        log.error("Modèle en échec : %s", exc)
        await ws.send_json(
            {
                "type": "erreur",
                "code": "modele_indisponible",
                "message": (
                    "Je ne peux pas répondre à l'instant. Laissez-nous votre "
                    "email et l'équipe vous recontacte."
                ),
            }
        )
        return ""

    reponse = "".join(morceaux).strip()
    if not reponse:
        return ""

    msg = await services.enregistrer_message(session, conv, Role.LAURA, reponse)
    await ws.send_json(
        {"type": "fin_message", "message_id": msg.id, "contenu": reponse}
    )
    await hub.publier(
        sujet, {"type": "message_laura", "contenu": reponse}, sauf=ws
    )
    return reponse


async def _terminer(ws: WebSocket, session, conv, sujet: str) -> bool:
    """RG-C09 : génération du compte rendu. Retourne vrai si elle a abouti."""
    await ws.send_json({"type": "compte_rendu_en_cours"})
    try:
        cr = await services.terminer_conversation(session, conv)
    except Exception:
        log.exception("Compte rendu impossible (%s)", conv.id)
        # Une transaction en échec laisse la session inutilisable : sans ce
        # rollback, toute requête suivante lève PendingRollbackError et fait
        # tomber le socket — l'erreur initiale devient une déconnexion.
        await session.rollback()
        await ws.send_json(
            {
                "type": "erreur",
                "code": "compte_rendu_echec",
                "message": (
                    "Je n'ai pas pu rédiger le résumé. L'équipe a bien reçu "
                    "l'échange : laissez-nous votre email, ou réessayez."
                ),
            }
        )
        return False

    # Le visiteur ne reçoit QUE ce qui le concerne. La température et le score
    # sont de la donnée commerciale interne : les envoyer sur le socket du
    # visiteur les exposerait dans l'onglet réseau de son navigateur — « score
    # 35/100, froid » n'a pas à être lisible par le prospect.
    await ws.send_json(
        {
            "type": "compte_rendu",
            "objet": cr.objet,
            "resume": cr.resume,
            "prochaine_action": cr.prochaine_action,
        }
    )
    # La notation part sur le canal équipe, qui exige le jeton d'admin.
    await hub.publier(
        sujet,
        {
            "type": "conversation_terminee",
            "score": cr.score,
            "temperature": cr.temperature,
        },
        sauf=ws,
    )
    return True


async def _reclamer(ws: WebSocket, session, conv, recu: dict) -> None:
    """Le visiteur demande une copie — nom + email, sans compte (RG-A03)."""
    nom = (recu.get("nom") or "").strip()
    email = (recu.get("email") or "").strip()
    consentement = bool(recu.get("consentement"))

    if not (nom and email):
        await ws.send_json(
            {
                "type": "erreur",
                "code": "champs_manquants",
                "message": "Nom et email sont nécessaires.",
            }
        )
        return
    if not consentement:
        # RG-P01 : pas de stockage d'email sans case cochée.
        await ws.send_json(
            {
                "type": "erreur",
                "code": "consentement_requis",
                "message": "Merci de cocher la case d'accord avant l'envoi.",
            }
        )
        return

    from app.services import reclamer_conversation

    lien = await reclamer_conversation(session, conv, nom=nom, email=email)
    await ws.send_json({"type": "reclamee", "lien_reprise": lien})


async def _detecter_trou_isole(conversation_id: str, question: str, reponse: str) -> None:
    """Session dédiée : la tâche de fond ne doit pas toucher à celle du WS."""
    try:
        async with Session() as session:
            await services.traiter_trou(session, conversation_id, question, reponse)
    except Exception:
        log.exception("Détection de trou en échec")


# --------------------------------------------------------------------------
# Canal équipe
# --------------------------------------------------------------------------


@router.websocket("/ws/equipe")
async def ws_equipe(
    ws: WebSocket,
    token: str = Query(...),
    observer: str | None = Query(default=None, description="conversation à suivre"),
) -> None:
    """Fil d'alertes interne (RG-X06 : jeton d'administration obligatoire)."""
    if origine_refusee(ws) or token != params.ADMIN_TOKEN:
        await ws.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await ws.accept()
    await hub.abonner(CANAL_EQUIPE, ws)
    if observer:
        await hub.abonner(canal_conversation(observer), ws)

    await ws.send_json(
        {"type": "pret", "canaux": hub.etat(), "observe": observer}
    )

    try:
        while True:
            recu = await ws.receive_json()
            if recu.get("type") == "ping":
                await ws.send_json({"type": "pong"})
            elif recu.get("type") == "observer":
                if cible := recu.get("conversation_id"):
                    await hub.abonner(canal_conversation(cible), ws)
                    await ws.send_json({"type": "observe", "conversation_id": cible})
    except WebSocketDisconnect:
        pass
    finally:
        await hub.desabonner_partout(ws)
