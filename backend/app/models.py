"""Tables — implémentation du diagramme de classes (docs/regles-de-gestion.md § 2.2)."""

from __future__ import annotations

import hashlib
import secrets
import uuid
from datetime import UTC, datetime

from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import params
from app.db import Base
from app.enums import Canal, Role, StatutConversation, StatutSuivi


def _uuid() -> str:
    return str(uuid.uuid4())


def _maintenant() -> datetime:
    return datetime.now(UTC)


def jeton_reprise() -> str:
    """32 octets aléatoires — jamais séquentiel (RG-A02)."""
    return secrets.token_urlsafe(32)


def hacher_ip(ip: str) -> str:
    """L'IP n'est jamais stockée en clair (RG-C04)."""
    return hashlib.sha256((params.IP_SALT + ip).encode()).hexdigest()[:32]


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    resume_token: Mapped[str] = mapped_column(
        String(64), default=jeton_reprise, index=True
    )
    canal: Mapped[str] = mapped_column(String(16), default=Canal.SITE)
    langue: Mapped[str] = mapped_column(String(8), default="fr")

    # Provenance (RG-C03) — alimente le bilan hebdomadaire
    page_url: Mapped[str] = mapped_column(String(500), default="")
    referrer: Mapped[str] = mapped_column(String(500), default="")
    ip_hash: Mapped[str] = mapped_column(String(32), default="", index=True)

    statut: Mapped[str] = mapped_column(
        String(16), default=StatutConversation.ACTIVE, index=True
    )
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )
    date_dernier_message: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant, index=True
    )

    messages: Mapped[list[Message]] = relationship(
        back_populates="conversation",
        cascade="all, delete-orphan",
        order_by="Message.horodatage",
        lazy="selectin",
    )
    compte_rendu: Mapped[CompteRendu | None] = relationship(
        back_populates="conversation", cascade="all, delete-orphan", lazy="selectin"
    )
    prospect_id: Mapped[str | None] = mapped_column(
        ForeignKey("prospects.id"), default=None
    )
    prospect: Mapped[Prospect | None] = relationship(
        back_populates="conversations", lazy="selectin"
    )

    def est_expiree(self, delai_minutes: int) -> bool:
        """RG-C06 : 30 minutes sans message → abandonnée."""
        ecart = _maintenant() - self.date_dernier_message
        return ecart.total_seconds() > delai_minutes * 60

    def accepte_message(self) -> bool:
        """RG-C08 : une conversation terminée n'accepte plus de message."""
        return self.statut in (StatutConversation.ACTIVE, StatutConversation.ABANDONNEE)


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    conversation_id: Mapped[str] = mapped_column(
        ForeignKey("conversations.id"), index=True
    )
    role: Mapped[str] = mapped_column(String(16))
    contenu: Mapped[str] = mapped_column(Text)
    horodatage: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )
    tokens_entree: Mapped[int] = mapped_column(Integer, default=0)
    tokens_sortie: Mapped[int] = mapped_column(Integer, default=0)

    conversation: Mapped[Conversation] = relationship(back_populates="messages")

    def vers_role_modele(self) -> str:
        return "user" if self.role == Role.VISITEUR else "model"


class Prospect(Base):
    __tablename__ = "prospects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    nom: Mapped[str] = mapped_column(String(200), default="")
    entreprise: Mapped[str] = mapped_column(String(200), default="")
    email: Mapped[str] = mapped_column(String(200), default="", index=True)
    telephone: Mapped[str] = mapped_column(String(50), default="")
    pays: Mapped[str] = mapped_column(String(100), default="")
    secteur: Mapped[str] = mapped_column(String(100), default="")

    statut_suivi: Mapped[str] = mapped_column(
        String(20), default=StatutSuivi.NOUVEAU, index=True
    )
    consentement_le: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None
    )
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )
    date_dernier_contact: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )

    # RG-S04 : plusieurs conversations pour un même email
    conversations: Mapped[list[Conversation]] = relationship(
        back_populates="prospect", lazy="selectin"
    )

    def est_identifie(self) -> bool:
        """RG-L11 : nom + entreprise + (email ou téléphone)."""
        return bool(self.nom and self.entreprise and (self.email or self.telephone))


class CompteRendu(Base):
    __tablename__ = "comptes_rendus"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    conversation_id: Mapped[str] = mapped_column(
        ForeignKey("conversations.id"), unique=True, index=True
    )

    objet: Mapped[str] = mapped_column(String(300), default="")
    resume: Mapped[str] = mapped_column(Text, default="")

    activite: Mapped[str] = mapped_column(String(200), default="")
    marche: Mapped[str] = mapped_column(String(50), default="")
    service_concerne: Mapped[str] = mapped_column(String(200), default="")

    # Les 9 rubriques obligatoires (RG-R01) : le détail en JSON, l'essentiel
    # en colonnes pour pouvoir trier et filtrer le tableau de suivi.
    besoins: Mapped[list] = mapped_column(JSON, default=list)
    questions: Mapped[list] = mapped_column(JSON, default=list)
    infos_recueillies: Mapped[list] = mapped_column(JSON, default=list)
    infos_manquantes: Mapped[list] = mapped_column(JSON, default=list)
    etapes_contractualisation: Mapped[list] = mapped_column(JSON, default=list)
    qualification: Mapped[dict] = mapped_column(JSON, default=dict)

    temperature: Mapped[str] = mapped_column(String(10), default="", index=True)
    score: Mapped[int] = mapped_column(Integer, default=0, index=True)
    justification_score: Mapped[str] = mapped_column(Text, default="")

    prochaine_action: Mapped[str] = mapped_column(Text, default="")
    echeance_jours: Mapped[int] = mapped_column(Integer, default=0)

    envoye_le: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None
    )
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )

    conversation: Mapped[Conversation] = relationship(back_populates="compte_rendu")
    alertes: Mapped[list[Alerte]] = relationship(
        back_populates="compte_rendu", cascade="all, delete-orphan", lazy="selectin"
    )


class Alerte(Base):
    __tablename__ = "alertes"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    compte_rendu_id: Mapped[str] = mapped_column(
        ForeignKey("comptes_rendus.id"), index=True
    )
    motif: Mapped[str] = mapped_column(String(30))
    justification: Mapped[str] = mapped_column(Text, default="")
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )

    compte_rendu: Mapped[CompteRendu] = relationship(back_populates="alertes")


class Trou(Base):
    """Information manquante détectée pendant un échange (RG-T02).

    C'est la boucle d'apprentissage : Laura ne se réentraîne pas, l'équipe
    complète les fiches que les prospects réclament le plus.
    """

    __tablename__ = "trous"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    conversation_id: Mapped[str | None] = mapped_column(
        ForeignKey("conversations.id"), default=None, index=True
    )
    question: Mapped[str] = mapped_column(Text)
    sujet: Mapped[str] = mapped_column(String(200), default="", index=True)
    fiche_code: Mapped[str] = mapped_column(String(10), default="", index=True)
    occurrences: Mapped[int] = mapped_column(Integer, default=1)
    resolu_le: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None
    )
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )

    def est_resolu(self) -> bool:
        return self.resolu_le is not None


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    conversation_id: Mapped[str | None] = mapped_column(
        ForeignKey("conversations.id"), default=None, index=True
    )
    type: Mapped[str] = mapped_column(String(30), index=True)
    gravite: Mapped[str] = mapped_column(String(16))
    canal: Mapped[str] = mapped_column(String(16))
    charge: Mapped[dict] = mapped_column(JSON, default=dict)
    tentatives: Mapped[int] = mapped_column(Integer, default=0)
    delivree: Mapped[bool] = mapped_column(Boolean, default=False)
    delivree_le: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None
    )
    erreur: Mapped[str] = mapped_column(Text, default="")
    date_creation: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_maintenant
    )
