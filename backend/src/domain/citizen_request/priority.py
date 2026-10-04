"""Priorisation automatique et règles de retard.

Score sur 100 = urgence (30) + citoyens concernés (25) + ancienneté (20) + criticité (25).
Citoyens concernés = estimation de l'auteur + soutiens d'autres habitants (F52).
Niveaux : >= 70 URGENTE, >= 50 HAUTE, >= 30 NORMALE, sinon BASSE.
Fonctions pures, sans base de données : faciles à tester et à ajuster.
"""

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from math import log10
from typing import Protocol

from src.domain.citizen_request.analytics import RequestScope
from src.domain.citizen_request.entities import (
    RequestCategory,
    RequestPriority,
    RequestStatus,
)

URGENCY_MIN = 1
URGENCY_MAX = 5
DEFAULT_URGENCY = 3

WEIGHT_URGENCY = 30
WEIGHT_AFFECTED = 25
WEIGHT_AGE = 20
WEIGHT_CRITICALITY = 25

AFFECTED_SATURATION = 100  # à partir de 100 citoyens concernés, la composante est au maximum
AGE_SATURATION_DAYS = 10  # à partir de 10 jours d'ancienneté, idem

# Criticité par catégorie (0 à 1).
_CATEGORY_CRITICALITY: dict[RequestCategory, float] = {
    RequestCategory.SAFETY: 1.0,
    RequestCategory.WATER: 0.9,
    RequestCategory.PUBLIC_LIGHTING: 0.7,
    RequestCategory.ROADS: 0.6,
    RequestCategory.WASTE: 0.4,
    RequestCategory.GREEN_SPACES: 0.2,
    RequestCategory.OTHER: 0.1,
}

# Retards : délais au-delà desquels une demande est considérée « en retard ».
NEW_MAX_AGE = timedelta(days=3)  # « Nouveau » non traité
WAITING_MAX_AGE = timedelta(days=7)  # « En attente » sans mouvement

_LEVEL_THRESHOLDS = (
    (70, RequestPriority.URGENT),
    (50, RequestPriority.HIGH),
    (30, RequestPriority.NORMAL),
)


@dataclass(frozen=True, slots=True)
class ScoreBreakdown:
    urgency: int
    affected: int
    age: int
    criticality: int

    @property
    def total(self) -> int:
        return self.urgency + self.affected + self.age + self.criticality


def as_utc(value: datetime) -> datetime:
    # SQLite renvoie des datetimes sans fuseau : on les considère comme UTC.
    return value.replace(tzinfo=UTC) if value.tzinfo is None else value.astimezone(UTC)


def compute_score(
    *,
    urgency: int,
    affected_citizens: int,
    created_at: datetime,
    category: RequestCategory,
    now: datetime | None = None,
    supporters: int = 0,
) -> ScoreBreakdown:
    now = as_utc(now) if now else datetime.now(UTC)
    urgency = min(max(urgency, URGENCY_MIN), URGENCY_MAX)
    affected = max(affected_citizens, 1) + max(supporters, 0)
    age_days = max((now - as_utc(created_at)).total_seconds() / 86400, 0.0)

    return ScoreBreakdown(
        urgency=round(WEIGHT_URGENCY * (urgency - URGENCY_MIN) / (URGENCY_MAX - URGENCY_MIN)),
        affected=round(WEIGHT_AFFECTED * min(log10(affected) / log10(AFFECTED_SATURATION), 1.0)),
        age=round(WEIGHT_AGE * min(age_days / AGE_SATURATION_DAYS, 1.0)),
        criticality=round(WEIGHT_CRITICALITY * _CATEGORY_CRITICALITY[category]),
    )


def priority_for(score: int) -> RequestPriority:
    for threshold, level in _LEVEL_THRESHOLDS:
        if score >= threshold:
            return level

    return RequestPriority.LOW


def late_since(
    status: RequestStatus,
    *,
    created_at: datetime,
    scheduled_at: datetime | None,
    updated_at: datetime,
) -> datetime | None:
    """Date à partir de laquelle la demande est en retard (None : pas de règle de retard)."""
    if status is RequestStatus.NEW:
        return as_utc(created_at) + NEW_MAX_AGE
    if status is RequestStatus.IN_PROGRESS:
        return as_utc(scheduled_at) if scheduled_at else None
    if status is RequestStatus.PENDING:
        return as_utc(updated_at) + WAITING_MAX_AGE

    return None


def is_late(
    status: RequestStatus,
    *,
    created_at: datetime,
    scheduled_at: datetime | None,
    updated_at: datetime,
    now: datetime | None = None,
) -> bool:
    deadline = late_since(
        status, created_at=created_at, scheduled_at=scheduled_at, updated_at=updated_at
    )

    return deadline is not None and deadline <= (as_utc(now) if now else datetime.now(UTC))


@dataclass(frozen=True, slots=True)
class PriorityItem:
    """Une demande dans la file priorisée."""

    id: str
    title: str
    category: RequestCategory
    status: RequestStatus
    priority: RequestPriority
    priority_score: int
    urgency: int
    affected_citizens: int
    created_at: datetime
    assigned_agent_id: str | None
    location: str
    is_late: bool
    support_count: int = 0


class PriorityRepository(Protocol):
    def refresh_scores(self, *, request_id: str | None = None, now: datetime | None = None) -> int:
        """Recalcule score et priorité des demandes ouvertes ; renvoie le nombre de changements de niveau."""
        ...

    def get_item(self, request_id: str) -> PriorityItem | None: ...

    def ranked(
        self,
        *,
        scope: RequestScope,
        status: RequestStatus | None,
        include_closed: bool,
        page: int,
        page_size: int,
    ) -> tuple[list[PriorityItem], int]: ...
