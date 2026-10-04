"""Journal d'événements d'une demande : source unique pour la timeline, les notifications et le mode incident.

Chaque action métier sur une demande écrit un événement.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from typing import Any

from src.domain.citizen_request.analytics import RequestScope
from src.domain.citizen_request.entities import RequestStatus


class RequestEventType(StrEnum):
    CREATED = "created"
    UPDATED = "updated"
    PRIORITY_CHANGED = "priority_changed"
    STATUS_CHANGED = "status_changed"
    ASSIGNED = "assigned"
    RESOLVED = "resolved"
    REJECTED = "rejected"
    # Réservés pour l'étape « interventions » (démarrage / fin d'intervention).
    INTERVENTION_STARTED = "intervention_started"
    INTERVENTION_FINISHED = "intervention_finished"
    # Participation des habitants (F52) : l'identité du soutien n'est jamais montrée à l'auteur.
    SUPPORTED = "supported"
    UNSUPPORTED = "unsupported"
    # Regroupement des doublons (F75) : écrit sur la demande doublon et sur la principale.
    MARKED_DUPLICATE = "marked_duplicate"
    # Fil de messages (F84). La note interne n'est jamais visible du citoyen.
    MESSAGE_POSTED = "message_posted"
    INTERNAL_NOTE_ADDED = "internal_note_added"


# Événements réservés aux agents et gestionnaires : jamais montrés à un citoyen.
STAFF_ONLY_EVENTS = frozenset({RequestEventType.INTERNAL_NOTE_ADDED})
# Événements dont l'auteur reste anonyme pour un citoyen (un soutien est une participation privée).
ANONYMOUS_FOR_CITIZENS = frozenset({RequestEventType.SUPPORTED, RequestEventType.UNSUPPORTED})


@dataclass
class CitizenRequestEvent:
    id: str
    request_id: str
    type: RequestEventType
    created_at: datetime
    # Instantané du nom au moment de l'action : l'historique reste lisible si l'utilisateur est renommé.
    actor_id: str | None = None
    actor_name: str | None = None
    # Doit rester sérialisable en JSON (str, nombres, bool, listes, dicts) : pas de datetime brut.
    payload: dict[str, Any] = field(default_factory=dict)


class CitizenRequestEventRepository(ABC):
    @abstractmethod
    def add(self, event: CitizenRequestEvent) -> CitizenRequestEvent: ...

    @abstractmethod
    def list_for_request(self, request_id: str) -> list[CitizenRequestEvent]:
        """Événements d'une demande, du plus ancien au plus récent."""


@dataclass(frozen=True)
class ActivityQuery:
    """Filtres du journal d'activité (toutes demandes du périmètre confondues)."""

    types: frozenset[RequestEventType] = frozenset()
    exclude_types: frozenset[RequestEventType] = frozenset()
    since: datetime | None = None
    until: datetime | None = None
    search: str | None = None  # titre de la demande ou auteur de l'action
    page: int = 1
    page_size: int = 20


@dataclass
class RequestActivity:
    """Un événement replacé dans son contexte : de quelle demande s'agit-il, où en est-elle ?"""

    event: CitizenRequestEvent
    request_title: str
    request_status: RequestStatus


class RequestActivityLog(ABC):
    @abstractmethod
    def list_activity(
        self, scope: RequestScope, query: ActivityQuery
    ) -> tuple[list[RequestActivity], int]:
        """Du plus récent au plus ancien, limité au périmètre ; avec le total filtré."""
