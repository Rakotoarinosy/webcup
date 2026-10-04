"""Entités du contenu municipal, indépendantes de HTTP et de la base de données."""

from dataclasses import dataclass, replace
from datetime import datetime
from enum import StrEnum

from src.domain.municipal_content.exceptions import (
    InvalidAlternativeServiceError,
    InvalidExpectedReturnError,
    ServiceStatusMessageRequiredError,
)


class ServiceStatus(StrEnum):
    """État de fonctionnement d'un service, affiché avant toute démarche (F38, F63, F64)."""

    AVAILABLE = "available"  # fonctionne normalement
    DISRUPTED = "disrupted"  # fonctionne, mais avec des délais ou un accueil réduit
    MAINTENANCE = "maintenance"  # interruption prévue par la ville
    OUT_OF_SERVICE = "out_of_service"  # interruption imprévue (incident, panne)

    @property
    def can_start(self) -> bool:
        """Une démarche peut-elle être commencée ? Non pendant une maintenance ou une panne."""
        return self in (ServiceStatus.AVAILABLE, ServiceStatus.DISRUPTED)


@dataclass(frozen=True)
class MunicipalService:
    id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    display_order: int
    is_featured: bool
    usage_count: int
    is_active: bool
    # Accueil physique : None tant que la mairie ne l'a pas renseigné.
    address: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    # État actuel (F38/F63/F64) : explication, retour prévu et « que faire à la place ».
    status: ServiceStatus = ServiceStatus.AVAILABLE
    status_message: str | None = None
    status_expected_back_at: datetime | None = None
    status_alternative: str | None = None
    alternative_service_id: str | None = None
    status_updated_at: datetime | None = None
    # Santé et urgences (F46) : accueil sans interruption et prise en charge des urgences.
    open_24_7: bool = False
    emergency_care: bool = False

    def change_status(
        self,
        status: ServiceStatus,
        *,
        now: datetime,
        message: str | None = None,
        expected_back_at: datetime | None = None,
        alternative: str | None = None,
        alternative_service_id: str | None = None,
    ) -> "MunicipalService":
        """Nouvel état du service. Remis en service, il n'affiche plus d'explication périmée."""
        if status is ServiceStatus.AVAILABLE:
            return replace(
                self,
                status=status,
                status_message=None,
                status_expected_back_at=None,
                status_alternative=None,
                alternative_service_id=None,
                status_updated_at=now,
            )
        if not (message and message.strip()):
            raise ServiceStatusMessageRequiredError()
        if alternative_service_id == self.id:
            raise InvalidAlternativeServiceError()
        if expected_back_at is not None and expected_back_at <= now:
            raise InvalidExpectedReturnError()
        return replace(
            self,
            status=status,
            status_message=message.strip(),
            status_expected_back_at=expected_back_at,
            status_alternative=(alternative or "").strip() or None,
            alternative_service_id=alternative_service_id,
            status_updated_at=now,
        )


@dataclass(frozen=True)
class MunicipalPublication:
    id: str
    title: str
    summary: str
    content: str
    category: str
    published_at: datetime
    is_published: bool
    image_url: str | None = None
    view_count: int = 0
    like_count: int = 0


@dataclass(frozen=True)
class MunicipalPublicationComment:
    id: str
    publication_id: str
    user_id: str
    author_name: str
    content: str
    created_at: datetime


@dataclass(frozen=True)
class ContactMessage:
    id: str
    receipt_number: str
    service_id: str | None
    sender_name: str
    sender_email: str
    subject: str
    message: str
    created_at: datetime
