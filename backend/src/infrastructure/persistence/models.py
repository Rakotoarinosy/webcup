"""Modèles SQLAlchemy de tous les domaines.

Règle : uniquement des types portables (String, Integer, Boolean, DateTime, Text, JSON)
pour que le même code tourne sur SQLite (dev) et PostgreSQL (prod).
Après tout ajout ou modification : `make revision m="..."` puis `make migrate`.
"""

import uuid
from datetime import UTC, datetime
from typing import Any

from sqlalchemy import (
    JSON,
    Boolean,
    CheckConstraint,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    false,
    true,
)
from sqlalchemy.orm import Mapped, mapped_column

from src.infrastructure.persistence.database import Base

# ─── helpers ────────────────────────────────────────────────────────


def new_id() -> str:
    return str(uuid.uuid4())


def utc_now() -> datetime:
    return datetime.now(UTC)


# ─── user ───────────────────────────────────────────────────────────


class UserModel(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint("email IS NOT NULL OR phone IS NOT NULL", name="ck_users_contact"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    # NULL autorisé : un compte peut n'avoir qu'un numéro de téléphone (unicité ignorée pour NULL).
    email: Mapped[str | None] = mapped_column(String(320), unique=True, index=True, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), unique=True, index=True, nullable=True)
    phone_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default=false())
    name: Mapped[str] = mapped_column(String(255))
    password_hash: Mapped[str] = mapped_column(String(255), default="", server_default="")
    role: Mapped[str] = mapped_column(
        String(20), index=True, default="citizen", server_default="citizen"
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default=true())
    failed_login_attempts: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    locked_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # server_default true : les comptes existants sont considérés comme déjà confirmés.
    email_verified: Mapped[bool] = mapped_column(Boolean, default=True, server_default=true())
    google_id: Mapped[str | None] = mapped_column(
        String(64), unique=True, index=True, nullable=True
    )
    avatar_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)


class RefreshTokenModel(Base):
    __tablename__ = "refresh_tokens"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    family_id: Mapped[str] = mapped_column(String(36), index=True)
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


# ─── institut ───────────────────────────────────────────────────────


class VerificationCodeModel(Base):
    __tablename__ = "verification_codes"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True
    )
    code_hash: Mapped[str] = mapped_column(String(64))
    channel: Mapped[str] = mapped_column(String(10), default="email", server_default="email")
    attempts: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class InstitutModel(Base):
    __tablename__ = "instituts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(255), unique=True)
    description: Mapped[str] = mapped_column(Text, default="", server_default="")
    # Valeurs de RequestCategory. L'unicité entre instituts actifs est vérifiée par le use case.
    categories: Mapped[list[str]] = mapped_column(JSON, default=list)
    manager_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, unique=True
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default=true())
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class UserPreferenceModel(Base):
    __tablename__ = "user_preferences"

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    theme: Mapped[str] = mapped_column(
        String(10), nullable=False, default="system", server_default="system"
    )
    font_size: Mapped[str] = mapped_column(
        String(10), nullable=False, default="medium", server_default="medium"
    )
    font_family: Mapped[str] = mapped_column(
        String(10), nullable=False, default="system", server_default="system"
    )


# ─── agent ──────────────────────────────────────────────────────────


class AgentModel(Base):
    """Profil agent : l'identité (nom, email) vit sur users."""

    __tablename__ = "agents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    institut_id: Mapped[str] = mapped_column(String(36), ForeignKey("instituts.id"), index=True)
    status: Mapped[str] = mapped_column(String(32), default="available", index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


# ─── demandes citoyennes ─────────────────────────────────────────────


class CitizenRequestModel(Base):
    __tablename__ = "citizen_requests"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    priority: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    citizen_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), nullable=False, index=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    location: Mapped[str] = mapped_column(String(500), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    assigned_agent_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("agents.id", ondelete="SET NULL"), nullable=True, index=True
    )
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    urgency: Mapped[int] = mapped_column(Integer, default=3, server_default="3")
    affected_citizens: Mapped[int] = mapped_column(Integer, default=1, server_default="1")
    priority_score: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    institut_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("instituts.id", ondelete="SET NULL"), nullable=True, index=True
    )
    # F52 : nombre de soutiens (dénormalisé, tenu à jour avec citizen_request_supports).
    support_count: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    # F75 : demande principale dont celle-ci est le doublon.
    duplicate_of_id: Mapped[str | None] = mapped_column(
        String(36),
        ForeignKey(
            "citizen_requests.id", ondelete="SET NULL", name="fk_citizen_requests_duplicate_of"
        ),
        nullable=True,
        index=True,
    )
    # F84 : état du fil de messages (ConversationState) et date du dernier message public.
    conversation_state: Mapped[str] = mapped_column(
        String(20), default="none", server_default="none", index=True
    )
    last_message_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    __table_args__ = (Index("ix_citizen_requests_status_created_at", "status", "created_at"),)


class CitizenRequestSupportModel(Base):
    """Soutien d'une demande par un autre habitant (F52) : un par habitant et par demande."""

    __tablename__ = "citizen_request_supports"

    request_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("citizen_requests.id", ondelete="CASCADE"), primary_key=True
    )
    citizen_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True, index=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class CitizenRequestMessageModel(Base):
    """Fil de messages d'une demande (F84) : réponses publiques et notes internes."""

    __tablename__ = "citizen_request_messages"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    request_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("citizen_requests.id", ondelete="CASCADE"), nullable=False
    )
    author_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    author_name: Mapped[str] = mapped_column(String(255), nullable=False)
    author_role: Mapped[str] = mapped_column(String(20), nullable=False)
    visibility: Mapped[str] = mapped_column(String(20), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        Index("ix_citizen_request_messages_request_created", "request_id", "created_at"),
    )


class CitizenRequestEventModel(Base):
    """Journal d'événements des demandes : timeline, notifications, historique."""

    __tablename__ = "citizen_request_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    request_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("citizen_requests.id", ondelete="CASCADE")
    )
    type: Mapped[str] = mapped_column(String(40), index=True)
    # Pas de FK sur l'acteur : l'historique survit à la suppression d'un utilisateur.
    actor_id: Mapped[str | None] = mapped_column(String(36), nullable=True, index=True)
    actor_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        Index("ix_citizen_request_events_request_created", "request_id", "created_at"),
    )


# ─── notifications ───────────────────────────────────────────────────


class NotificationReadModel(Base):
    """Notifications déjà lues, par utilisateur.

    Les notifications sont dérivées des événements de demandes : seule la clé de
    la notification (`key`) est mémorisée ici, pour savoir si elle est lue.
    """

    __tablename__ = "notification_reads"

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    key: Mapped[str] = mapped_column(String(80), primary_key=True)
    read_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


# ─── contenu municipal ──────────────────────────────────────────────


class MunicipalServiceModel(Base):
    __tablename__ = "municipal_services"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(
        String(80), nullable=False, default="Autres", server_default="Autres"
    )
    description: Mapped[str] = mapped_column(Text, nullable=False)
    contact_details: Mapped[str] = mapped_column(String(500), nullable=False)
    opening_hours: Mapped[str] = mapped_column(String(255), nullable=False)
    icon: Mapped[str] = mapped_column(String(80), nullable=False, default="pi-building")
    display_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    is_featured: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False, server_default=false()
    )
    usage_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True, server_default=true()
    )
    # Accueil physique (F45) : adresse lisible et position pour la carte et l'itinéraire.
    address: Mapped[str | None] = mapped_column(String(255), nullable=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)


class MunicipalPublicationModel(Base):
    __tablename__ = "municipal_publications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    published_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, index=True
    )
    is_published: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True, server_default=true()
    )
    image_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)
    view_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")
    like_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")


class MunicipalPublicationLikeModel(Base):
    __tablename__ = "municipal_publication_likes"

    publication_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("municipal_publications.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class MunicipalPublicationCommentModel(Base):
    __tablename__ = "municipal_publication_comments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    publication_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("municipal_publications.id", ondelete="CASCADE"), index=True
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    author_name: Mapped[str] = mapped_column(String(255), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, index=True
    )


class DataConcernModel(Base):
    """Signalement d'un habitant sur l'usage de ses données, avec la trace de son traitement."""

    __tablename__ = "data_concerns"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    reference: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    # Conservé à la suppression du compte : rattaché à l'identité archivée (voir UserRepository).
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    topic: Mapped[str] = mapped_column(String(60))
    message: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(30), index=True)
    response: Mapped[str | None] = mapped_column(Text, nullable=True)
    answered_by: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    answered_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class AuditEntryModel(Base):
    """Journal d'audit des opérations d'administration : ajout uniquement."""

    __tablename__ = "audit_entries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    action: Mapped[str] = mapped_column(String(40), index=True)
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    target_type: Mapped[str] = mapped_column(String(30), index=True)
    target_id: Mapped[str] = mapped_column(String(36), index=True)
    target_label: Mapped[str] = mapped_column(String(255))
    # Pas de clé étrangère : la trace survit à la suppression de l'auteur ou de l'objet.
    actor_id: Mapped[str | None] = mapped_column(String(36), nullable=True, index=True)
    actor_name: Mapped[str] = mapped_column(String(255))
    actor_role: Mapped[str] = mapped_column(String(20))
    institut_id: Mapped[str | None] = mapped_column(String(36), nullable=True, index=True)
    details: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)

    __table_args__ = (Index("ix_audit_entries_occurred_at", "occurred_at"),)


class ContactMessageModel(Base):
    __tablename__ = "contact_messages"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    receipt_number: Mapped[str] = mapped_column(String(32), nullable=False, unique=True, index=True)
    service_id: Mapped[str | None] = mapped_column(
        String(36),
        ForeignKey("municipal_services.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    sender_name: Mapped[str] = mapped_column(String(255), nullable=False)
    sender_email: Mapped[str] = mapped_column(String(320), nullable=False)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=utc_now
    )


# ─── terra_request (demandes du concours, API Terra Nova) ────────────


class TerraRequestModel(Base):
    __tablename__ = "terra_requests"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_id)
    # Identifiant métier stable fourni par l'API : garantit l'absence de doublon.
    request_code: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    api_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    requester_name: Mapped[str] = mapped_column(String(255), default="")
    requester_type: Mapped[str] = mapped_column(String(100), default="")
    message_public: Mapped[str] = mapped_column(Text, default="")
    difficulty: Mapped[str] = mapped_column(String(40), default="")
    difficulty_level: Mapped[int] = mapped_column(Integer, default=0)
    xp_base: Mapped[int] = mapped_column(Integer, default=0)
    xp_time_bonus: Mapped[int] = mapped_column(Integer, default=0)
    xp_total: Mapped[int] = mapped_column(Integer, default=0)
    xp_available: Mapped[int] = mapped_column(Integer, default=0)
    is_initial: Mapped[bool] = mapped_column(Boolean, default=False)
    visible_since_wave: Mapped[int | None] = mapped_column(Integer, nullable=True)
    arrival_type: Mapped[str] = mapped_column(String(40), default="")
    wave_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    arrival_time: Mapped[str] = mapped_column(String(20), default="")
    is_ai_related: Mapped[bool] = mapped_column(Boolean, default=False)
    is_ai_request: Mapped[bool] = mapped_column(Boolean, default=False)
    group_name: Mapped[str] = mapped_column(String(100), default="")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    raw: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    status: Mapped[str] = mapped_column(String(20), default="todo", index=True)
    first_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)


class TerraSessionModel(Base):
    """Dernier état connu de la session du concours (une seule ligne, id = 1)."""

    __tablename__ = "terra_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    status: Mapped[str] = mapped_column(String(40), default="none")
    is_running: Mapped[bool] = mapped_column(Boolean, default=False)
    current_wave: Mapped[int] = mapped_column(Integer, default=0)
    elapsed_minutes: Mapped[int] = mapped_column(Integer, default=0)
    visible_requests_count: Mapped[int] = mapped_column(Integer, default=0)
    initial_requests_count: Mapped[int] = mapped_column(Integer, default=0)
    wave_requests_count: Mapped[int] = mapped_column(Integer, default=0)
    next_wave_number: Mapped[int] = mapped_column(Integer, default=0)
    minutes_until_next_wave: Mapped[int] = mapped_column(Integer, default=0)
    next_wave_eta: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_sync_attempt_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    last_sync_success_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    last_sync_error: Mapped[str | None] = mapped_column(String(500), nullable=True)


class TerraRequestReadModel(Base):
    """Notifications Terra Nova déjà lues, par utilisateur (clé = request_code ou « wave:<n> »)."""

    __tablename__ = "terra_request_reads"

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    key: Mapped[str] = mapped_column(String(80), primary_key=True)
    read_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
