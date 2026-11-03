"""REST public du site labeltechnology.mg — remplace les lectures Supabase.

Uniquement le contenu publié (`published = true`), avec les mêmes tris que
les pages du site. Plus les deux formulaires publics : contact et
candidature.
"""

from __future__ import annotations

import logging

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.notifications import _email
from app.site_models import BlogPost, JobApplication, JobOffer, Project, Service, Testimonial
from app.site_schemas import (
    BlogPostOut,
    Confirmation,
    ContactIn,
    JobApplicationIn,
    JobOfferOut,
    ProjectOut,
    ServiceOut,
    TestimonialOut,
)

log = logging.getLogger("laura.site")

router = APIRouter(prefix="/api/site", tags=["site"])


# --- Contenu publié --------------------------------------------------------


@router.get("/services", response_model=list[ServiceOut])
async def lister_services(session: AsyncSession = Depends(get_session)) -> list[Service]:
    """components/home/ServicesGrid.tsx"""
    requete = select(Service).where(Service.published.is_(True)).order_by(Service.order)
    return list(await session.scalars(requete))


@router.get("/projects", response_model=list[ProjectOut])
async def lister_projets(session: AsyncSession = Depends(get_session)) -> list[Project]:
    """/projets"""
    requete = select(Project).where(Project.published.is_(True)).order_by(Project.order)
    return list(await session.scalars(requete))


@router.get("/job-offers", response_model=list[JobOfferOut])
async def lister_offres(session: AsyncSession = Depends(get_session)) -> list[JobOffer]:
    """/recru"""
    requete = (
        select(JobOffer).where(JobOffer.published.is_(True)).order_by(JobOffer.order)
    )
    return list(await session.scalars(requete))


@router.get("/job-offers/{offre_id}", response_model=JobOfferOut)
async def lire_offre(
    offre_id: str, session: AsyncSession = Depends(get_session)
) -> JobOffer:
    """/recru/postuler/[id]"""
    offre = await session.get(JobOffer, offre_id)
    if offre is None or not offre.published:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Offre introuvable.")
    return offre


@router.get("/blog-posts", response_model=list[BlogPostOut])
async def lister_articles(session: AsyncSession = Depends(get_session)) -> list[BlogPost]:
    """/blog et sitemap.ts — du plus récent au plus ancien."""
    requete = (
        select(BlogPost)
        .where(BlogPost.published.is_(True))
        .order_by(BlogPost.published_at.desc())
    )
    return list(await session.scalars(requete))


@router.get("/blog-posts/{slug}", response_model=BlogPostOut)
async def lire_article(slug: str, session: AsyncSession = Depends(get_session)) -> BlogPost:
    """/blog/[slug]"""
    article = await session.scalar(
        select(BlogPost).where(BlogPost.slug == slug, BlogPost.published.is_(True))
    )
    if article is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Article introuvable.")
    return article


@router.get("/testimonials", response_model=list[TestimonialOut])
async def lister_temoignages(
    context: str = Query(default="home", description="home | about"),
    session: AsyncSession = Depends(get_session),
) -> list[Testimonial]:
    """components/home/Testimonials.tsx (home) et /about (about)."""
    requete = (
        select(Testimonial)
        .where(Testimonial.context == context, Testimonial.published.is_(True))
        .order_by(Testimonial.order)
    )
    return list(await session.scalars(requete))


# --- Formulaires publics ---------------------------------------------------


async def _notifier_candidature(c: JobApplication) -> None:
    """Best-effort : la candidature est déjà en base."""
    try:
        await _email(
            f"Nouvelle candidature — {c.job_title}",
            f"Candidat: {c.full_name}\nEmail: {c.email}\n"
            f"Téléphone: {c.phone or '—'}\nCV: {c.cv_url or '—'}\n"
            f"Offre: {c.job_title}\n\n{c.message or ''}",
        )
    except Exception:
        log.exception("Email de candidature non envoyé (%s)", c.id)


@router.post("/job-applications", response_model=Confirmation, status_code=201)
async def postuler(
    corps: JobApplicationIn,
    taches: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
) -> Confirmation:
    """/recru/postuler/[id] — remplace submitJobApplication."""
    job_title = corps.job_title
    if corps.job_offer_id:
        offre = await session.get(JobOffer, corps.job_offer_id)
        if offre is None or not offre.published:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Offre introuvable.")
        job_title = offre.title
    elif not job_title:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_CONTENT,
            "Veuillez remplir tous les champs obligatoires.",
        )

    candidature = JobApplication(
        job_offer_id=corps.job_offer_id or None,
        job_title=job_title,
        full_name=corps.full_name,
        email=corps.email,
        phone=corps.phone,
        cv_url=corps.cv_url,
        message=corps.message,
        status="nouveau",
    )
    session.add(candidature)
    await session.commit()

    taches.add_task(_notifier_candidature, candidature)
    return Confirmation(
        message="Votre candidature a bien été envoyée. Nous revenons vers vous sous 72h."
    )


@router.post("/contact", response_model=Confirmation)
async def contacter(corps: ContactIn) -> Confirmation:
    """/contact — remplace sendContact. Rien n'est stocké : un email à l'équipe."""
    try:
        await _email(
            f"Nouveau message de {corps.name} — {corps.service or 'Non précisé'}",
            f"Nom: {corps.name}\nEntreprise: {corps.company}\nEmail: {corps.email}\n"
            f"Service: {corps.service}\n\n{corps.message}",
        )
    except Exception:
        log.exception("Email de contact non envoyé")
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            "Erreur lors de l'envoi. Veuillez réessayer ou nous appeler directement.",
        ) from None
    return Confirmation(
        message="Votre message a bien été envoyé. Un expert vous répond sous 24h."
    )
