"""Alertes et messages officiels diffusés à tous les habitants (D18, F29, F31, F73).

Une alerte est visible sur toutes les pages pendant sa période d'affichage : du début
(`starts_at`) jusqu'à la fin prévue (`ends_at`) ou jusqu'à ce qu'elle soit terminée
(`ended_at`). Elle reste ensuite consultable dans l'historique.
"""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum

from src.domain.alert.exceptions import (
    AlertAlreadyEndedError,
    AlertZoneRequiredError,
    InvalidAlertPeriodError,
)


class AlertLevel(StrEnum):
    INFO = "Information"
    ATTENTION = "Attention"
    URGENT = "Urgence"


class AlertAudience(StrEnum):
    EVERYONE = "Tous les habitants"
    VULNERABLE = "Personnes vulnérables"
    NEIGHBOURHOOD = "Habitants du quartier concerné"


class AlertStatus(StrEnum):
    """Calculé à partir des dates : jamais stocké."""

    SCHEDULED = "Programmée"
    ACTIVE = "En cours"
    ENDED = "Terminée"


# Émetteurs proposés dans le formulaire (le champ reste libre).
DEFAULT_ISSUER = "Haut Conseil de la Ville"

# Ordre d'affichage : la plus grave d'abord.
LEVEL_RANK = {AlertLevel.URGENT: 0, AlertLevel.ATTENTION: 1, AlertLevel.INFO: 2}


@dataclass
class Alert:
    id: str
    title: str
    message: str
    level: AlertLevel
    audience: AlertAudience
    issuer: str
    starts_at: datetime
    author_id: str | None
    author_name: str
    created_at: datetime
    updated_at: datetime
    instructions: str = ""  # « Que faire ? » : consignes concrètes pour les habitants
    zone: str | None = None  # quartier ou secteur concerné
    ends_at: datetime | None = None  # None : jusqu'à ce qu'elle soit terminée
    ended_at: datetime | None = None

    def __post_init__(self) -> None:
        self.validate()

    def validate(self) -> None:
        if self.ends_at is not None and self.ends_at <= self.starts_at:
            raise InvalidAlertPeriodError()
        if self.audience is AlertAudience.NEIGHBOURHOOD and not (self.zone or "").strip():
            raise AlertZoneRequiredError()

    def status(self, now: datetime) -> AlertStatus:
        if self.ended_at is not None and self.ended_at <= now:
            return AlertStatus.ENDED
        if self.ends_at is not None and self.ends_at <= now:
            return AlertStatus.ENDED
        if self.starts_at > now:
            return AlertStatus.SCHEDULED
        return AlertStatus.ACTIVE

    def is_active(self, now: datetime) -> bool:
        return self.status(now) is AlertStatus.ACTIVE

    def finished_at(self) -> datetime | None:
        """Moment où l'alerte a cessé (ou cessera) d'être affichée."""
        if self.ended_at is not None and self.ends_at is not None:
            return min(self.ended_at, self.ends_at)
        return self.ended_at or self.ends_at

    def end(self, now: datetime) -> None:
        if self.status(now) is AlertStatus.ENDED:
            raise AlertAlreadyEndedError(self.id)
        self.ended_at = now
        self.updated_at = now
