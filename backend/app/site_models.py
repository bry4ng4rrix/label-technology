"""Tables du CMS du site labeltechnology.mg — reprise de supabase/schema.sql.

Les noms de tables et de colonnes sont ceux de Supabase, à l'identique : les
types TypeScript de `lib/supabase.ts` côté site restent valables tels quels.

Sous PostgreSQL, les types sont compatibles colonne à colonne avec Supabase
(`text`, `text[]`, `timestamptz`) : un `pg_dump --data-only` de Supabase se
recharge directement (deploy/supabase-export.sql). Seules différences :
  - uuid      → varchar(36) : accepte le texte d'un uuid tel quel ;
  - tag_kind  → text.
Sous SQLite (développement), `text[]` devient une liste JSON.
"""

from __future__ import annotations

import uuid
from datetime import UTC, datetime

from sqlalchemy import (
    JSON,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    TypeDecorator,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base

#: `text[]` sous PostgreSQL, liste JSON ailleurs.
ListeTexte = JSON().with_variant(ARRAY(Text), "postgresql")


def _uuid() -> str:
    return str(uuid.uuid4())


def _maintenant() -> datetime:
    return datetime.now(UTC)


class UTCDateTime(TypeDecorator):
    """`timestamptz` toujours renvoyé avec son fuseau.

    Sans effet sous PostgreSQL. Sous SQLite, qui ne garde pas le fuseau, on
    stocke en UTC et on le recolle à la lecture — sinon le JSON sortirait sans
    « Z » et `new Date()` l'interpréterait en heure locale.
    """

    impl = DateTime(timezone=True)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        if value.tzinfo is None:
            value = value.replace(tzinfo=UTC)
        return value.astimezone(UTC)

    def process_result_value(self, value, dialect):
        if value is not None and value.tzinfo is None:
            value = value.replace(tzinfo=UTC)
        return value


class _Horodate:
    created_at: Mapped[datetime] = mapped_column(UTCDateTime, default=_maintenant)
    updated_at: Mapped[datetime] = mapped_column(
        UTCDateTime, default=_maintenant, onupdate=_maintenant
    )


class Service(_Horodate, Base):
    __tablename__ = "services"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    slug: Mapped[str] = mapped_column(Text, unique=True)
    order: Mapped[int] = mapped_column(Integer, default=0)
    tag: Mapped[str] = mapped_column(Text)
    headline: Mapped[str] = mapped_column(Text)
    headline_accent: Mapped[str] = mapped_column(Text, default="")
    desc: Mapped[str] = mapped_column(Text)
    items: Mapped[list] = mapped_column(ListeTexte, default=list)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    badge: Mapped[str | None] = mapped_column(Text, default=None)
    color: Mapped[str] = mapped_column(Text)
    icon: Mapped[str] = mapped_column(Text)
    image_url: Mapped[str] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class Project(_Horodate, Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tag: Mapped[str] = mapped_column(Text)
    title: Mapped[str] = mapped_column(Text)
    desc: Mapped[str] = mapped_column(Text)
    metrics: Mapped[list] = mapped_column(ListeTexte, default=list)
    order: Mapped[int] = mapped_column(Integer, default=0)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class JobOffer(_Horodate, Base):
    __tablename__ = "job_offers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    tag: Mapped[str] = mapped_column(Text)
    title: Mapped[str] = mapped_column(Text)
    contrat: Mapped[str] = mapped_column(Text)
    lieu: Mapped[str] = mapped_column(Text)
    niveau: Mapped[str] = mapped_column(Text)
    desc: Mapped[str] = mapped_column(Text)
    missions: Mapped[list] = mapped_column(ListeTexte, default=list)
    urgent: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=0)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class BlogPost(_Horodate, Base):
    __tablename__ = "blog_posts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    slug: Mapped[str] = mapped_column(Text, unique=True)
    tag: Mapped[str] = mapped_column(Text)
    published_at: Mapped[datetime] = mapped_column(
        UTCDateTime, default=_maintenant, index=True
    )
    title: Mapped[str] = mapped_column(Text)
    excerpt: Mapped[str] = mapped_column(Text)
    body: Mapped[str | None] = mapped_column(Text, default=None)
    readtime: Mapped[str] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class Testimonial(_Horodate, Base):
    __tablename__ = "testimonials"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    quote: Mapped[str] = mapped_column(Text)
    author: Mapped[str] = mapped_column(Text)
    role: Mapped[str] = mapped_column(Text)
    company: Mapped[str] = mapped_column(Text)
    tag: Mapped[str | None] = mapped_column(Text, default=None)
    color: Mapped[str | None] = mapped_column(Text, default=None)
    gradient_color: Mapped[str | None] = mapped_column(Text, default=None)
    context: Mapped[str] = mapped_column(Text, default="home", index=True)
    order: Mapped[int] = mapped_column(Integer, default=0)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class TagMeta(Base):
    """Présente dans le schéma Supabase mais lue nulle part sur le site : reprise
    pour ne rien perdre à l'import."""

    __tablename__ = "tag_meta"
    __table_args__ = (UniqueConstraint("kind", "name"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    kind: Mapped[str] = mapped_column(Text)  # PROJECT | JOB
    name: Mapped[str] = mapped_column(Text)
    color: Mapped[str] = mapped_column(Text)
    bg: Mapped[str] = mapped_column(Text)
    border: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=0)


class Setting(_Horodate, Base):
    __tablename__ = "settings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    key: Mapped[str] = mapped_column(Text, unique=True)
    group: Mapped[str] = mapped_column(Text)
    label: Mapped[str] = mapped_column(Text)
    value: Mapped[dict | list | str | int | float | bool | None] = mapped_column(JSON)


class JobApplication(Base):
    """Candidature reçue depuis /recru/postuler/[id].

    `job_title` est une copie : la candidature reste lisible si l'offre est
    modifiée ou supprimée. La suppression d'une offre détache aussi ses
    candidatures à la main (routes/site_admin.py), pour SQLite qui n'applique
    pas le `on delete set null` sans PRAGMA foreign_keys.
    """

    __tablename__ = "job_applications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    job_offer_id: Mapped[str | None] = mapped_column(
        ForeignKey("job_offers.id", ondelete="SET NULL"), default=None, index=True
    )
    job_title: Mapped[str] = mapped_column(Text)
    full_name: Mapped[str] = mapped_column(Text)
    email: Mapped[str] = mapped_column(Text)
    phone: Mapped[str | None] = mapped_column(Text, default=None)
    cv_url: Mapped[str | None] = mapped_column(Text, default=None)
    message: Mapped[str | None] = mapped_column(Text, default=None)
    status: Mapped[str] = mapped_column(Text, default="nouveau", index=True)
    created_at: Mapped[datetime] = mapped_column(
        UTCDateTime, default=_maintenant, index=True
    )
