"""Import des données du site depuis Supabase, vers la base de Laura.

Deux sources possibles :

1. Un fichier JSON produit par deploy/supabase-export.sql (SQL Editor de
   Supabase) — aucune clé à fournir :

       python -m app.site_import supabase-export.json

2. L'API REST de Supabase, avec la clé service_role
   (Project Settings → API) :

       SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=... \\
           python -m app.site_import

   Ou, pour seulement récupérer les données dans un fichier :

       python -m app.site_import --exporter supabase-export.json

Les `id` de Supabase sont conservés : relancer l'import met à jour les lignes
au lieu de les dupliquer. Les lignes créées depuis dans Laura ne sont pas
touchées.

En Docker : docker compose exec -T laura python -m app.site_import - < supabase-export.json
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from datetime import datetime

import httpx
from sqlalchemy import DateTime

from app.db import Session, creer_tables
from app.site_models import (
    BlogPost,
    JobApplication,
    JobOffer,
    Project,
    Service,
    Setting,
    TagMeta,
    Testimonial,
    UTCDateTime,
)

# Les offres avant les candidatures (clé étrangère).
TABLES = [Service, Project, JobOffer, BlogPost, Testimonial, TagMeta, Setting, JobApplication]
PAGE = 1000


async def lire_table(client: httpx.AsyncClient, table: str) -> list[dict]:
    lignes: list[dict] = []
    while True:
        r = await client.get(
            f"/rest/v1/{table}",
            params={"select": "*"},
            headers={"Range": f"{len(lignes)}-{len(lignes) + PAGE - 1}"},
        )
        r.raise_for_status()
        lot = r.json()
        lignes.extend(lot)
        if len(lot) < PAGE:
            return lignes


async def lire_api() -> dict[str, list[dict] | None]:
    url = os.environ.get("SUPABASE_URL", "").rstrip("/")
    cle = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not (url and cle):
        sys.exit(
            "Donner un fichier JSON (deploy/supabase-export.sql), ou définir "
            "SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY."
        )
    donnees: dict[str, list[dict] | None] = {}
    entetes = {"apikey": cle}
    # Ancienne clé service_role (JWT « eyJ… ») : aussi en Bearer. Les nouvelles
    # clés « sb_secret_… » ne passent que par l'en-tête apikey.
    if cle.startswith("eyJ"):
        entetes["Authorization"] = f"Bearer {cle}"
    async with httpx.AsyncClient(base_url=url, headers=entetes, timeout=30) as client:
        for modele in TABLES:
            try:
                donnees[modele.__tablename__] = await lire_table(
                    client, modele.__tablename__
                )
            except httpx.HTTPStatusError as e:
                # tag_meta / settings peuvent ne pas exister sur une base ancienne.
                print(f"  {modele.__tablename__:<18} ignorée ({e.response.status_code})")
                donnees[modele.__tablename__] = None
    return donnees


def lire_fichier(chemin: str) -> dict:
    texte = sys.stdin.read() if chemin == "-" else open(chemin, encoding="utf-8").read()
    donnees = json.loads(texte)
    # Selon la façon de copier depuis le SQL Editor : l'objet seul,
    # {"export": {...}} ou [{"export": {...}}].
    if isinstance(donnees, list) and len(donnees) == 1:
        donnees = donnees[0]
    if isinstance(donnees, dict) and set(donnees) == {"export"}:
        donnees = donnees["export"]
    if isinstance(donnees, str):  # cellule copiée en tant que chaîne JSON
        donnees = json.loads(donnees)
    if not isinstance(donnees, dict) or "services" not in donnees:
        sys.exit(f"{chemin} : format inattendu, attendu le résultat de supabase-export.sql.")
    return donnees


def convertir(modele, ligne: dict) -> dict:
    """Garde les colonnes connues, convertit les dates ISO de Postgres."""
    sortie = {}
    for col in modele.__table__.columns:
        if col.name not in ligne:
            continue
        valeur = ligne[col.name]
        if isinstance(valeur, str) and isinstance(col.type, (UTCDateTime, DateTime)):
            valeur = datetime.fromisoformat(valeur)
        sortie[col.key] = valeur
    return sortie


async def importer(donnees: dict) -> None:
    await creer_tables()
    async with Session() as session:
        for modele in TABLES:
            lignes = donnees.get(modele.__tablename__)
            if lignes is None:
                continue
            for ligne in lignes:
                await session.merge(modele(**convertir(modele, ligne)))
            await session.commit()
            print(f"  {modele.__tablename__:<18} {len(lignes)} ligne(s)")
    print("Import terminé.")


async def exporter(chemin: str) -> None:
    """API Supabase → fichier JSON, sans toucher à aucune base. Le fichier se
    réimporte ensuite avec `python -m app.site_import <fichier>`."""
    donnees = await lire_api()
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(donnees, f, ensure_ascii=False, indent=1)
    for table, lignes in donnees.items():
        print(f"  {table:<18} {len(lignes) if lignes is not None else 'absente'}")
    print(f"Exporté dans {chemin}.")


async def main() -> None:
    if len(sys.argv) == 3 and sys.argv[1] == "--exporter":
        await exporter(sys.argv[2])
    elif len(sys.argv) > 1:
        await importer(lire_fichier(sys.argv[1]))
    else:
        await importer(await lire_api())


if __name__ == "__main__":
    asyncio.run(main())
