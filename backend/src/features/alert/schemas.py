"""Schémas Pydantic des alertes et messages officiels."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.alert import DEFAULT_ISSUER, AlertAudience, AlertLevel, AlertStatus


class AlertIn(BaseModel):
    """Création ou remplacement complet d'une alerte (le formulaire renvoie tous les champs)."""

    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=3, max_length=5_000)
    instructions: str = Field(default="", max_length=5_000)
    level: AlertLevel = AlertLevel.INFO
    audience: AlertAudience = AlertAudience.EVERYONE
    zone: str | None = Field(default=None, max_length=200)
    issuer: str = Field(default=DEFAULT_ISSUER, min_length=2, max_length=200)
    starts_at: datetime | None = None  # None : immédiatement
    ends_at: datetime | None = None  # None : jusqu'à ce qu'elle soit terminée


class CreateAlertIn(AlertIn):
    # Prévenir aussi les habitants par email (en plus du bandeau et de la notification).
    notify_by_email: bool = False


class RecommendationIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=3, max_length=5_000)
    level: AlertLevel = AlertLevel.INFO
    audience: AlertAudience = AlertAudience.VULNERABLE
    zone: str | None = Field(default=None, max_length=200)


class RecommendationOut(BaseModel):
    recommendations: str


class AlertOut(BaseModel):
    """Vue publique : ce que tout habitant voit, sans identifiant interne de l'auteur."""

    id: str
    title: str
    message: str
    instructions: str
    level: AlertLevel
    audience: AlertAudience
    zone: str | None
    issuer: str
    starts_at: datetime
    ends_at: datetime | None
    ended_at: datetime | None
    status: AlertStatus
    created_at: datetime
    updated_at: datetime


class AlertAdminOut(AlertOut):
    author_id: str | None
    author_name: str
    can_manage: bool


class CreatedAlertOut(AlertAdminOut):
    # Nombre d'habitants à qui l'email est en cours d'envoi (0 si l'option n'est pas cochée).
    email_recipients: int
