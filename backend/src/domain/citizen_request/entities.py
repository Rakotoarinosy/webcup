"""Entités métier et valeurs du domaine des demandes citoyennes."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum

from src.domain.citizen_request.exceptions import (
    InvalidDuplicateError,
    InvalidStatusTransitionError,
    RequestClosedError,
)


class RequestCategory(StrEnum):
    PUBLIC_LIGHTING = "Éclairage public"
    ROADS = "Voirie"
    WATER = "Eau"
    WASTE = "Déchets"
    SAFETY = "Sécurité"
    GREEN_SPACES = "Espaces verts"
    OTHER = "Autre"


class RequestPriority(StrEnum):
    LOW = "Basse"
    NORMAL = "Normale"
    HIGH = "Haute"
    URGENT = "Urgente"


class RequestStatus(StrEnum):
    NEW = "Nouveau"
    IN_PROGRESS = "En cours"
    PENDING = "En attente"
    RESOLVED = "Résolu"
    REJECTED = "Rejeté"


_ALLOWED_TRANSITIONS: dict[RequestStatus, frozenset[RequestStatus]] = {
    RequestStatus.NEW: frozenset({RequestStatus.IN_PROGRESS, RequestStatus.REJECTED}),
    RequestStatus.IN_PROGRESS: frozenset(
        {RequestStatus.PENDING, RequestStatus.RESOLVED, RequestStatus.REJECTED}
    ),
    RequestStatus.PENDING: frozenset({RequestStatus.IN_PROGRESS, RequestStatus.REJECTED}),
    RequestStatus.RESOLVED: frozenset(),  # état final
    RequestStatus.REJECTED: frozenset(),  # état final
}

# Demandes non clôturées : comptées comme « ouvertes » et soumises aux règles de retard.
OPEN_STATUSES = frozenset({RequestStatus.NEW, RequestStatus.IN_PROGRESS, RequestStatus.PENDING})


def can_transition(current: RequestStatus, target: RequestStatus) -> bool:
    return target in _ALLOWED_TRANSITIONS[current]


def ensure_transition(current: RequestStatus, target: RequestStatus) -> None:
    if not can_transition(current, target):
        raise InvalidStatusTransitionError(current.value, target.value)


class ConversationState(StrEnum):
    """Où en est le fil de messages d'une demande (voir messages.py)."""

    NONE = "none"  # aucun échange public
    AWAITING_STAFF = "awaiting_staff"  # le citoyen a écrit en dernier : réponse attendue des agents
    ANSWERED = "answered"  # la mairie a répondu en dernier


class RequestSortBy(StrEnum):
    CREATED_AT = "created_at"
    TITLE = "title"
    CATEGORY = "category"
    PRIORITY = "priority"
    STATUS = "status"


class PublicRequestSort(StrEnum):
    """Tri de la liste publique des demandes (F52)."""

    RECENT = "recent"
    MOST_SUPPORTED = "most_supported"


class SortOrder(StrEnum):
    ASC = "asc"
    DESC = "desc"


@dataclass
class CitizenRequest:
    id: str
    title: str
    description: str
    category: RequestCategory
    priority: RequestPriority
    status: RequestStatus
    citizen_id: str
    created_at: datetime
    location: str
    updated_at: datetime
    assigned_agent_id: str | None = None
    resolved_at: datetime | None = None
    # Coordonnées GPS facultatives, pour placer la demande sur la carte du dashboard.
    latitude: float | None = None
    longitude: float | None = None
    # Planification de l'intervention et critères de la priorisation automatique.
    scheduled_at: datetime | None = None
    urgency: int = 3  # 1 à 5, voir priority.py
    affected_citizens: int = 1
    priority_score: int = 0
    # Institut destinataire, déduit de la catégorie (None : traitée par l'administration).
    institut_id: str | None = None
    # Soutiens d'autres habitants (F52) : compteur dénormalisé, tenu par le use case de soutien.
    support_count: int = 0
    # Doublon rattaché à une demande principale (F75) : la demande est alors close.
    duplicate_of_id: str | None = None
    # Fil de messages (F84) : sert l'indicateur « réponse attendue ».
    conversation_state: ConversationState = ConversationState.NONE
    last_message_at: datetime | None = None

    @property
    def is_duplicate(self) -> bool:
        return self.duplicate_of_id is not None

    @property
    def is_open(self) -> bool:
        return self.status in OPEN_STATUSES

    def change_status(self, target: RequestStatus, now: datetime) -> None:
        """Seule porte d'entrée d'un changement de statut : `resolved_at` reste cohérent."""
        ensure_transition(self.status, target)
        self.status = target
        self.updated_at = now
        if target is RequestStatus.RESOLVED:
            self.resolved_at = now

    def assign_to(self, agent_id: str | None, now: datetime) -> None:
        """Attribue (ou retire, avec None) l'agent. L'existence et l'activité de l'agent sont
        vérifiées par le use case, qui seul a accès au repository des agents."""
        if not self.is_open:
            raise RequestClosedError(self.id)
        self.assigned_agent_id = agent_id
        self.updated_at = now

    def mark_duplicate_of(self, principal: "CitizenRequest", now: datetime) -> None:
        """Regroupement logique : la demande est rattachée à la principale puis close (« Rejeté »).

        Le rattachement reste visible (duplicate_of_id) : ce n'est pas un refus sur le fond."""
        if principal.id == self.id:
            raise InvalidDuplicateError("A request cannot be a duplicate of itself")
        if principal.is_duplicate:
            raise InvalidDuplicateError("The main request is itself marked as a duplicate")
        if not self.is_open:
            raise RequestClosedError(self.id)
        self.duplicate_of_id = principal.id
        self.change_status(RequestStatus.REJECTED, now)
