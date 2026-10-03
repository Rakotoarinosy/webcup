"""Entités du domaine terra_request : demandes du concours publiées par l'API Terra Nova.

Une demande est identifiée par son `request_code` (stable entre deux synchronisations).
Les valeurs XP sont reprises telles quelles de l'API, jamais recalculées.
"""

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import StrEnum
from typing import Any

# minutes_until_next_wave est à la minute près : on garde l'échéance estimée stable
# tant que l'API ne s'en écarte pas de plus de cette marge (évite un compte à rebours qui saute).
ETA_TOLERANCE = timedelta(seconds=90)


class PipelineStatus(StrEnum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    VALIDATION = "validation"
    DONE = "done"


@dataclass
class TerraRequest:
    request_code: str
    api_id: int | None
    requester_name: str
    requester_type: str
    message_public: str
    difficulty: str
    difficulty_level: int
    xp_base: int
    xp_time_bonus: int
    xp_total: int
    xp_available: int
    is_initial: bool
    visible_since_wave: int | None
    arrival_type: str
    wave_number: int | None
    arrival_time: str
    is_ai_related: bool
    is_ai_request: bool
    group_name: str
    sort_order: int
    # Payload brut : les champs ajoutés plus tard par l'organisation ne sont pas perdus.
    raw: dict[str, Any] = field(default_factory=dict)
    status: PipelineStatus = PipelineStatus.TODO
    first_seen_at: datetime | None = None
    updated_at: datetime | None = None

    @property
    def wave(self) -> int:
        """Vague d'apparition : 0 pour une demande initiale."""
        if self.is_initial:
            return 0
        return self.wave_number or self.visible_since_wave or 0

    def same_content(self, other: "TerraRequest") -> bool:
        return self.raw == other.raw

    def refresh_from(self, other: "TerraRequest", now: datetime) -> None:
        """Reprend les données API d'une version plus récente, sans toucher au statut du pipeline."""
        for name in TerraRequest.__dataclass_fields__:
            if name not in ("request_code", "status", "first_seen_at", "updated_at"):
                setattr(self, name, getattr(other, name))
        self.updated_at = now


@dataclass
class TerraSession:
    """Dernier état connu de la session du concours, et santé de la synchronisation."""

    status: str = "none"
    is_running: bool = False
    current_wave: int = 0
    elapsed_minutes: int = 0
    visible_requests_count: int = 0
    initial_requests_count: int = 0
    wave_requests_count: int = 0
    next_wave_number: int = 0
    minutes_until_next_wave: int = 0
    # Échéance estimée de la prochaine vague : affichage uniquement, ne pilote jamais la synchro.
    next_wave_eta: datetime | None = None
    updated_at: datetime | None = None

    last_sync_attempt_at: datetime | None = None
    last_sync_success_at: datetime | None = None
    last_sync_error: str | None = None

    @property
    def api_ok(self) -> bool:
        return self.last_sync_success_at is not None and self.last_sync_error is None

    def apply_snapshot(self, snapshot: "TerraSession", now: datetime) -> None:
        """Remplace l'état de session par celui de l'API en stabilisant l'échéance de la vague."""
        previous_wave, previous_eta = self.next_wave_number, self.next_wave_eta
        for name in (
            "status",
            "is_running",
            "current_wave",
            "elapsed_minutes",
            "visible_requests_count",
            "initial_requests_count",
            "wave_requests_count",
            "next_wave_number",
            "minutes_until_next_wave",
        ):
            setattr(self, name, getattr(snapshot, name))
        self.updated_at = now

        if self.next_wave_number <= 0:
            self.next_wave_eta = None
            return
        fresh_eta = now + timedelta(minutes=self.minutes_until_next_wave)
        if (
            previous_eta is None
            or previous_wave != self.next_wave_number
            or abs(previous_eta - fresh_eta) > ETA_TOLERANCE
        ):
            self.next_wave_eta = fresh_eta

    def is_stale(self, now: datetime, max_age: timedelta) -> bool:
        return self.last_sync_attempt_at is None or now - self.last_sync_attempt_at >= max_age


@dataclass(frozen=True)
class FeedSnapshot:
    """Réponse de l'API Terra Nova à un instant donné."""

    session: TerraSession
    requests: list[TerraRequest]


@dataclass(frozen=True)
class SyncReport:
    new_codes: list[str]
    updated_codes: list[str]


@dataclass(frozen=True, slots=True)
class TerraNotification:
    """Notification dérivée des demandes : une par nouvelle demande, une par vague diffusée."""

    key: str
    kind: str  # new_request | new_wave
    title: str
    message: str
    request_code: str | None
    created_at: datetime
    is_read: bool = False
