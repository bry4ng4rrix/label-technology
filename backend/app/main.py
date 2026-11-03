"""Laura — API FastAPI de l'assistante virtuelle de Label Technology.

Règles de gestion et UML : docs/regles-de-gestion.md
"""

from __future__ import annotations

import asyncio
import contextlib
import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app import llm
from app.channels import hub
from app.config import params
from app.db import creer_tables
from app.knowledge import fiches
from app.maintenance import boucle_entretien
from app.routes import admin, sessions, site, site_admin, ws

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-7s %(name)s — %(message)s",
)
log = logging.getLogger("laura")

STATIC = Path(__file__).resolve().parent.parent / "static"


@asynccontextmanager
async def cycle_de_vie(app: FastAPI) -> AsyncIterator[None]:
    await creer_tables()
    nb = len(fiches.toutes())
    log.info("%d fiches chargées, à compléter : %s", nb, fiches.codes_a_completer())
    if not llm.disponible():
        log.warning("GEMINI_API_KEY absente — Laura démarre en MODE DÉGRADÉ")

    tache = asyncio.create_task(boucle_entretien())
    try:
        yield
    finally:
        tache.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await tache


app = FastAPI(
    title="Laura — Label Technology",
    description="Assistante virtuelle : chat du site, formulaire, WhatsApp.",
    version="1.0.0",
    lifespan=cycle_de_vie,
)

# RG-X05 : seules les origines déclarées peuvent appeler l'API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=params.origines,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

app.include_router(ws.router)
app.include_router(sessions.router)
app.include_router(admin.router)
app.include_router(site.router)
app.include_router(site_admin.router)

if STATIC.is_dir():
    app.mount("/static", StaticFiles(directory=STATIC), name="static")


@app.get("/sante", tags=["technique"])
async def sante() -> dict:
    return {
        "statut": "ok",
        "modele": params.GEMINI_MODEL if llm.disponible() else "mode_degrade",
        "fiches": len(fiches.toutes()),
        "fiches_a_completer": fiches.codes_a_completer(),
        "canaux_ws": hub.etat(),
    }


@app.get("/", include_in_schema=False, response_model=None)
async def accueil() -> FileResponse | dict:
    page = STATIC / "test.html"
    if page.is_file():
        return FileResponse(page)
    return {"laura": "en ligne", "docs": "/docs"}
