"""Schémas Pydantic du CMS du site.

Entrées : mêmes champs que les server actions du site (`readXxxFormData`),
mêmes règles — texte rogné, champs obligatoires non vides, listes sans
élément vide. Sorties : une ligne de table telle que Supabase la renvoyait.
"""

from __future__ import annotations

import re
from datetime import datetime
from typing import Annotated, Literal

from pydantic import (
    AfterValidator,
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
)

Requis = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
Texte = Annotated[str, StringConstraints(strip_whitespace=True)]


def _vide_vers_none(v: str | None) -> str | None:
    if v is None:
        return None
    v = v.strip()
    return v or None


def _nettoyer_liste(v: list[str]) -> list[str]:
    return [s.strip() for s in v if s and s.strip()]


Optionnel = Annotated[str | None, AfterValidator(_vide_vers_none)]
Liste = Annotated[list[str], AfterValidator(_nettoyer_liste)]

# Même expression que le site (contact.ts, postuler/actions.ts).
_EMAIL = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _verifier_email(v: str) -> str:
    if not _EMAIL.match(v):
        raise ValueError("Adresse email invalide.")
    return v


Email = Annotated[Requis, AfterValidator(_verifier_email)]

STATUTS_CANDIDATURE = ("nouveau", "contacté", "entretien", "accepté", "refusé")
StatutCandidature = Literal["nouveau", "contacté", "entretien", "accepté", "refusé"]


class _Sortie(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# --- Services --------------------------------------------------------------


class ServiceIn(BaseModel):
    slug: Requis
    tag: Requis
    headline: Requis
    headline_accent: Texte = ""
    desc: Requis
    color: Requis
    icon: Requis
    image_url: Requis
    badge: Optionnel = None
    items: Liste = Field(default_factory=list)
    featured: bool = False
    published: bool = True
    # Absent du formulaire d'admin : à la création, 0 comme Supabase ; à la
    # mise à jour, laissé tel quel s'il n'est pas envoyé.
    order: int | None = None


class ServiceOut(_Sortie):
    id: str
    slug: str
    order: int
    tag: str
    headline: str
    headline_accent: str
    desc: str
    items: list[str]
    featured: bool
    badge: str | None
    color: str
    icon: str
    image_url: str
    published: bool
    created_at: datetime
    updated_at: datetime


# --- Projets ---------------------------------------------------------------


class ProjectIn(BaseModel):
    tag: Requis
    title: Requis
    desc: Requis
    order: int = 0
    metrics: Liste = Field(default_factory=list)
    published: bool = True


class ProjectOut(_Sortie):
    id: str
    tag: str
    title: str
    desc: str
    metrics: list[str]
    order: int
    published: bool
    created_at: datetime
    updated_at: datetime


# --- Offres d'emploi -------------------------------------------------------


class JobOfferIn(BaseModel):
    tag: Requis
    title: Requis
    contrat: Requis
    lieu: Requis
    niveau: Requis
    desc: Requis
    order: int = 0
    missions: Liste = Field(default_factory=list)
    urgent: bool = False
    published: bool = True


class JobOfferOut(_Sortie):
    id: str
    tag: str
    title: str
    contrat: str
    lieu: str
    niveau: str
    desc: str
    missions: list[str]
    urgent: bool
    order: int
    published: bool
    created_at: datetime
    updated_at: datetime


# --- Blog ------------------------------------------------------------------


class BlogPostIn(BaseModel):
    slug: Requis
    tag: Requis
    title: Requis
    excerpt: Requis
    readtime: Requis
    body: Optionnel = None
    #: Vide → maintenant, comme le site.
    published_at: datetime | None = None
    published: bool = True


class BlogPostOut(_Sortie):
    id: str
    slug: str
    tag: str
    published_at: datetime
    title: str
    excerpt: str
    body: str | None
    readtime: str
    published: bool
    created_at: datetime
    updated_at: datetime


# --- Témoignages -----------------------------------------------------------


class TestimonialIn(BaseModel):
    quote: Requis
    author: Requis
    role: Requis
    company: Requis
    tag: Optionnel = None
    color: Optionnel = None
    gradient_color: Optionnel = None
    context: Texte = "home"
    order: int = 0
    published: bool = True


class TestimonialOut(_Sortie):
    id: str
    quote: str
    author: str
    role: str
    company: str
    tag: str | None
    color: str | None
    gradient_color: str | None
    context: str
    order: int
    published: bool
    created_at: datetime
    updated_at: datetime


# --- Candidatures ----------------------------------------------------------


class JobApplicationIn(BaseModel):
    """Formulaire public « Postuler ».

    Avec `job_offer_id`, l'intitulé est repris de l'offre en base : le client
    ne peut pas l'inventer. Sans, c'est une candidature spontanée et
    `job_title` est obligatoire.
    """

    job_offer_id: str | None = None
    job_title: Texte = ""
    full_name: Requis
    email: Email
    phone: Optionnel = None
    cv_url: Optionnel = None
    message: Optionnel = None


class JobApplicationOut(_Sortie):
    id: str
    job_offer_id: str | None
    job_title: str
    full_name: str
    email: str
    phone: str | None
    cv_url: str | None
    message: str | None
    status: str
    created_at: datetime


class MajStatutCandidature(BaseModel):
    status: StatutCandidature


# --- Contact ---------------------------------------------------------------


class ContactIn(BaseModel):
    name: Requis
    email: Email
    message: Requis
    company: Texte = ""
    service: Texte = ""


class Confirmation(BaseModel):
    message: str


# --- Tableau de bord -------------------------------------------------------


class StatistiquesSite(BaseModel):
    services: int
    projects: int
    job_offers: int
    blog_posts: int
    testimonials: int
    job_applications: int
    settings: int
    candidatures_nouvelles: int
    dernieres_candidatures: list[JobApplicationOut]
