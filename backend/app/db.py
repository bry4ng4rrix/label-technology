"""Accès base — SQLAlchemy 2.0 asynchrone.

PostgreSQL en production (asyncpg), SQLite possible en développement : le
choix se fait uniquement par DATABASE_URL.
"""

from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import params


class Base(DeclarativeBase):
    pass


# pool_pre_ping : une connexion Postgres coupée (redémarrage du conteneur db)
# est remplacée au lieu de faire échouer la requête suivante.
moteur = create_async_engine(
    params.DATABASE_URL, echo=False, future=True, pool_pre_ping=True
)
Session = async_sessionmaker(moteur, expire_on_commit=False, class_=AsyncSession)


async def creer_tables() -> None:
    from app import models, site_models  # noqa: F401 — enregistre les tables

    async with moteur.begin() as cx:
        await cx.run_sync(Base.metadata.create_all)


async def get_session() -> AsyncIterator[AsyncSession]:
    """Dépendance FastAPI."""
    async with Session() as session:
        yield session
