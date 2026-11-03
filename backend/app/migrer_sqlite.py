"""Copie une base SQLite de Laura vers la base PostgreSQL configurée.

    python -m app.migrer_sqlite sqlite+aiosqlite:////data/laura.db

La cible est DATABASE_URL. Toutes les tables (Laura et site) sont copiées dans
l'ordre des clés étrangères. Une ligne déjà présente dans la cible (même clé
primaire) est laissée telle quelle : on peut relancer la copie, et les
conversations ouvertes entre-temps sur PostgreSQL ne sont pas écrasées.

La base SQLite n'est pas modifiée.

En Docker, après le premier démarrage sur PostgreSQL :
    docker compose exec laura python -m app.migrer_sqlite sqlite+aiosqlite:////data/laura.db
"""

from __future__ import annotations

import asyncio
import sys
from datetime import UTC, datetime

from sqlalchemy import inspect, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import create_async_engine

from app import models, site_models  # noqa: F401 — enregistre les tables
from app.config import params
from app.db import Base, creer_tables, moteur

LOT = 500


def _utc(ligne: dict) -> dict:
    """SQLite rend les dates sans fuseau ; elles ont toujours été écrites en UTC."""
    return {
        k: v.replace(tzinfo=UTC) if isinstance(v, datetime) and v.tzinfo is None else v
        for k, v in ligne.items()
    }


async def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].startswith("sqlite"):
        sys.exit("Usage : python -m app.migrer_sqlite sqlite+aiosqlite:///chemin/laura.db")
    if moteur.dialect.name != "postgresql":
        sys.exit(f"DATABASE_URL doit viser PostgreSQL (actuellement : {params.DATABASE_URL}).")

    source = create_async_engine(sys.argv[1])
    await creer_tables()

    async with source.connect() as src:
        presentes = set(await src.run_sync(lambda cx: inspect(cx).get_table_names()))
        for table in Base.metadata.sorted_tables:
            if table.name not in presentes:
                print(f"  {table.name:<18} absente de la source")
                continue
            # Colonnes communes : une base SQLite ancienne peut en avoir moins.
            colonnes_src = {
                c["name"]
                for c in await src.run_sync(
                    lambda cx, t=table.name: inspect(cx).get_columns(t)
                )
            }
            colonnes = [c for c in table.columns if c.name in colonnes_src]
            lignes = [
                _utc(dict(r._mapping))
                for r in await src.execute(select(*colonnes))
            ]
            copiees = 0
            async with moteur.begin() as dst:
                for i in range(0, len(lignes), LOT):
                    res = await dst.execute(
                        insert(table)
                        .values(lignes[i : i + LOT])
                        .on_conflict_do_nothing()
                    )
                    copiees += res.rowcount or 0
            print(f"  {table.name:<18} {copiees}/{len(lignes)} ligne(s) copiée(s)")

    await source.dispose()
    print("Migration terminée.")


if __name__ == "__main__":
    asyncio.run(main())
