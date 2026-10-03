"""Journal d'événements d'une demande : source unique pour la timeline, les notifications et le mode incident.

Chaque action métier sur une demande écrit un événement.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from typing import Any


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
