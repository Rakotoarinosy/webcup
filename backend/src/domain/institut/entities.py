"""Entité Institut : service qui reçoit et traite les demandes de certaines catégories.

Distinct de MunicipalService, qui reste le catalogue public affiché aux citoyens.
"""

from dataclasses import dataclass
from datetime import datetime

from src.domain.citizen_request.entities import RequestCategory


@dataclass
class Institut:
    id: str
    name: str
    # Catégories de demandes reçues. Une catégorie n'est couverte que par un seul institut actif.
    categories: frozenset[RequestCategory]
    created_at: datetime
    description: str = ""
    # Utilisateur MANAGER responsable ; un manager ne gère qu'un seul institut.
    manager_id: str | None = None
    is_active: bool = True

    def handles(self, category: RequestCategory) -> bool:
        return self.is_active and category in self.categories


@dataclass(frozen=True)
class RequestMetrics:
    """Compteurs opérationnels calculés, jamais saisis par le client."""

    received: int = 0
    in_progress: int = 0
    resolved: int = 0


@dataclass(frozen=True)
class InstitutService:
    """Service rattaché à un institut, enrichi pour le pilotage administratif."""

    id: str
    institut_id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    request_category: RequestCategory | None
    responsible_agent_id: str | None = None
    responsible_agent_name: str | None = None
    associated_agents: int = 0
    metrics: RequestMetrics = RequestMetrics()


@dataclass(frozen=True)
class InstitutDashboard:
    institut: Institut
    manager_name: str | None
    associated_agents: int
    metrics: RequestMetrics
    services: tuple[InstitutService, ...]


@dataclass(frozen=True)
class CitizenInstitutService:
    """Vue d'un service destinée au citoyen.

    Les compteurs ne portent que sur ses propres demandes ; aucune donnée
    d'organisation (agents, responsable) n'est divulguée.
    """

    id: str
    institut_id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    request_category: RequestCategory | None
    metrics: RequestMetrics = RequestMetrics()


@dataclass(frozen=True)
class CitizenInstitutDashboard:
    """Présentation d'un institut adaptée au titulaire des demandes."""

    institut: Institut
    metrics: RequestMetrics
    services: tuple[CitizenInstitutService, ...]


def overlapping_categories(
    candidate: Institut, others: list[Institut]
) -> frozenset[RequestCategory]:
    """Catégories du candidat déjà couvertes par un autre institut actif (vide = pas de conflit)."""
    if not candidate.is_active:
        return frozenset()

    taken: set[RequestCategory] = set()
    for other in others:
        if other.id != candidate.id and other.is_active:
            taken |= other.categories

    return candidate.categories & taken
