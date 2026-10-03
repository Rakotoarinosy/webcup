"""Enregistrement des événements d'une demande.

Point d'accroche unique : toute action métier passe par `record_event`. Les notifications et la
timeline sont dérivées de ce journal, sans retoucher les use cases.
"""

import uuid
from datetime import datetime
from typing import Any

from src.domain.citizen_request import (
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    RequestEventType,
)
from src.domain.user import User


def record_event(
    events: CitizenRequestEventRepository,
    request_id: str,
    type_: RequestEventType,
    actor: User | None,
    now: datetime,
    payload: dict[str, Any] | None = None,
) -> CitizenRequestEvent:
    """`payload` doit être sérialisable en JSON (str, nombres, bool, listes, dicts) : pas de datetime brut."""
    return events.add(
        CitizenRequestEvent(
            id=str(uuid.uuid4()),
            request_id=request_id,
            type=type_,
            created_at=now,
            actor_id=actor.id if actor else None,
            actor_name=actor.name if actor else None,
            payload=payload or {},
        )
    )
