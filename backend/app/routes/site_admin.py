"""REST d'administration du site — remplace les écritures Supabase de /setting.

Protégé par la session ouverte sur POST /api/site/session, que le site renvoie
en `Authorization: Bearer`, ou par le `X-Admin-Token` de /admin pour
l'exploitation.

Les cinq contenus éditables (services, projets, offres, articles,
témoignages) ont exactement le même cycle de vie, d'où `_crud`.

Pas de `from __future__ import annotations` ici : FastAPI doit pouvoir
évaluer `corps: entree`, une variable locale de `_crud`.
"""

from collections.abc import Awaitable, Callable
from datetime import UTC, datetime
from typing import Any

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Response, status
from pydantic import BaseModel
from sqlalchemy import func, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import Base, get_session
from app.routes.admin import verifier_admin
from app.session import session_valide
from app.site_models import (
    BlogPost,
    JobApplication,
    JobOffer,
    Project,
    Service,
    Setting,
    Testimonial,
)
from app.site_schemas import (
    BlogPostIn,
    BlogPostOut,
    JobApplicationOut,
    JobOfferIn,
    JobOfferOut,
    MajStatutCandidature,
    ProjectIn,
    ProjectOut,
    ServiceIn,
    ServiceOut,
    StatistiquesSite,
    TestimonialIn,
    TestimonialOut,
)



async def verifier_site(
    authorization: str = Header(default=""), x_admin_token: str = Header(default="")
) -> None:
    if not session_valide(authorization.removeprefix("Bearer ")):
        await verifier_admin(x_admin_token)


router = APIRouter(
    prefix="/admin/site", tags=["admin site"], dependencies=[Depends(verifier_site)]
)


@router.get("/session", status_code=204)
async def controler_session() -> Response:
    """Le site vérifie ainsi son cookie : les dépendances du routeur ont tout fait."""
    return Response(status_code=status.HTTP_204_NO_CONTENT)


def _donnees(corps: BaseModel) -> dict[str, Any]:
    d = corps.model_dump()
    # `order` absent du formulaire des services : on ne l'écrase pas.
    if "order" in d and d["order"] is None:
        del d["order"]
    if "published_at" in d and d["published_at"] is None:
        d["published_at"] = datetime.now(UTC)
    return d


def _crud(
    chemin: str,
    modele: type[Base],
    entree: type[BaseModel],
    sortie: type[BaseModel],
    tri: list,
    doublon: str = "Une erreur est survenue lors de l'enregistrement.",
    avant_suppression: Callable[[AsyncSession, str], Awaitable[None]] | None = None,
) -> None:
    """Liste, lecture, création, mise à jour, suppression d'une table."""
    nom = modele.__tablename__

    async def lister(session: AsyncSession = Depends(get_session)) -> list:
        return list(await session.scalars(select(modele).order_by(*tri)))

    async def lire(id: str, session: AsyncSession = Depends(get_session)):
        obj = await session.get(modele, id)
        if obj is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Introuvable.")
        return obj

    async def creer(corps: entree, session: AsyncSession = Depends(get_session)):  # type: ignore[valid-type]
        obj = modele(**_donnees(corps))
        session.add(obj)
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise HTTPException(status.HTTP_409_CONFLICT, doublon) from None
        await session.refresh(obj)
        return obj

    async def modifier(
        id: str,
        corps: entree,  # type: ignore[valid-type]
        session: AsyncSession = Depends(get_session),
    ):
        obj = await session.get(modele, id)
        if obj is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Introuvable.")
        for champ, valeur in _donnees(corps).items():
            setattr(obj, champ, valeur)
        try:
            await session.commit()
        except IntegrityError:
            await session.rollback()
            raise HTTPException(status.HTTP_409_CONFLICT, doublon) from None
        await session.refresh(obj)
        return obj

    async def supprimer(id: str, session: AsyncSession = Depends(get_session)) -> Response:
        obj = await session.get(modele, id)
        if obj is not None:
            if avant_suppression:
                await avant_suppression(session, id)
            await session.delete(obj)
            await session.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    router.add_api_route(
        f"/{chemin}", lister, methods=["GET"], response_model=list[sortie],
        name=f"lister_{nom}",
    )
    router.add_api_route(
        f"/{chemin}/{{id}}", lire, methods=["GET"], response_model=sortie,
        name=f"lire_{nom}",
    )
    router.add_api_route(
        f"/{chemin}", creer, methods=["POST"], response_model=sortie,
        status_code=201, name=f"creer_{nom}",
    )
    router.add_api_route(
        f"/{chemin}/{{id}}", modifier, methods=["PUT"], response_model=sortie,
        name=f"modifier_{nom}",
    )
    router.add_api_route(
        f"/{chemin}/{{id}}", supprimer, methods=["DELETE"], status_code=204,
        name=f"supprimer_{nom}",
    )


async def _detacher_candidatures(session: AsyncSession, offre_id: str) -> None:
    """Le `on delete set null` de Postgres, que SQLite n'applique pas ici."""
    await session.execute(
        update(JobApplication)
        .where(JobApplication.job_offer_id == offre_id)
        .values(job_offer_id=None)
    )


# --- Tableau de bord (/setting) --------------------------------------------


@router.get("/statistiques", response_model=StatistiquesSite)
async def statistiques(session: AsyncSession = Depends(get_session)) -> StatistiquesSite:
    async def compter(modele, *filtres) -> int:
        return await session.scalar(select(func.count()).select_from(modele).where(*filtres)) or 0

    dernieres = await session.scalars(
        select(JobApplication).order_by(JobApplication.created_at.desc()).limit(5)
    )
    return StatistiquesSite(
        services=await compter(Service),
        projects=await compter(Project),
        job_offers=await compter(JobOffer),
        blog_posts=await compter(BlogPost),
        testimonials=await compter(Testimonial),
        job_applications=await compter(JobApplication),
        settings=await compter(Setting),
        candidatures_nouvelles=await compter(
            JobApplication, JobApplication.status == "nouveau"
        ),
        dernieres_candidatures=[JobApplicationOut.model_validate(c) for c in dernieres],
    )


# --- Contenus --------------------------------------------------------------

_crud(
    "services", Service, ServiceIn, ServiceOut,
    tri=[Service.order],
    doublon="Ce slug est déjà utilisé par un autre service.",
)
_crud(
    "projects", Project, ProjectIn, ProjectOut,
    tri=[Project.order],
)
_crud(
    "job-offers", JobOffer, JobOfferIn, JobOfferOut,
    tri=[JobOffer.order],
    avant_suppression=_detacher_candidatures,
)
_crud(
    "blog-posts", BlogPost, BlogPostIn, BlogPostOut,
    tri=[BlogPost.published_at.desc()],
    doublon="Ce slug est déjà utilisé par un autre article.",
)
_crud(
    "testimonials", Testimonial, TestimonialIn, TestimonialOut,
    tri=[Testimonial.context, Testimonial.order],
)


# --- Candidatures (/setting/jobs/candidatures) -----------------------------


@router.get("/job-applications", response_model=list[JobApplicationOut])
async def lister_candidatures(
    status_: str | None = Query(default=None, alias="status"),
    session: AsyncSession = Depends(get_session),
) -> list[JobApplication]:
    requete = select(JobApplication).order_by(JobApplication.created_at.desc())
    if status_:
        requete = requete.where(JobApplication.status == status_)
    return list(await session.scalars(requete))


@router.patch("/job-applications/{id}", response_model=JobApplicationOut)
async def changer_statut_candidature(
    id: str,
    corps: MajStatutCandidature,
    session: AsyncSession = Depends(get_session),
) -> JobApplication:
    c = await session.get(JobApplication, id)
    if c is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Candidature introuvable.")
    c.status = corps.status
    await session.commit()
    return c


@router.delete("/job-applications/{id}", status_code=204)
async def supprimer_candidature(
    id: str, session: AsyncSession = Depends(get_session)
) -> Response:
    c = await session.get(JobApplication, id)
    if c is not None:
        await session.delete(c)
        await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
