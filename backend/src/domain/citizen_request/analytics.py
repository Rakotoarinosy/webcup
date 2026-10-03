"""Lectures agrégées (dashboard, carte). Modèles de lecture + port implémenté par l'infrastructure."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import date, datetime, tzinfo

from src.domain.citizen_request.entities import RequestCategory, RequestPriority, RequestStatus


@dataclass(frozen=True)
class RequestScope:
    """Périmètre de lecture imposé par le rôle : None = pas de restriction sur ce critère."""

    citizen_id: str | None = None
    agent_id: str | None = None
    institut_id: str | None = None
    # Vrai pour un agent ou manager non rattaché : aucun résultat, à ne pas confondre avec « pas de filtre ».
    is_empty: bool = False


@dataclass(frozen=True)
class MapPoint:
    id: str
    title: str
    category: RequestCategory
    priority: RequestPriority
    status: RequestStatus
    latitude: float
    longitude: float
    created_at: datetime
    location: str
    assigned_agent_id: str | None = None
    agent_name: str | None = None


@dataclass(frozen=True)
class DailyCount:
    day: date
    created: int
    resolved: int


@dataclass(frozen=True)
class DashboardStats:
    total: int
    open: int  # non clôturées : nouveau + en cours + en attente
    in_progress: int
    resolved: int
    rejected: int
    resolution_rate: float  # % de demandes résolues sur le total (0 si aucune demande)
    interventions_today: int  # demandes attribuées à un agent et planifiées aujourd'hui
    resolved_today: int
    pending_count: int  # demandes « Nouveau » en attente de prise en charge, dans le périmètre
    by_status: dict[RequestStatus, int]
    by_category: dict[RequestCategory, int]
    by_priority: dict[RequestPriority, int]
    daily: list[DailyCount]  # un élément par jour, du plus ancien à aujourd'hui


class CitizenRequestAnalytics(ABC):
    @abstractmethod
    def dashboard_stats(
        self, scope: RequestScope, now: datetime, tz: tzinfo, days: int
    ) -> DashboardStats: ...

    @abstractmethod
    def map_points(
        self,
        scope: RequestScope,
        *,
        status: RequestStatus | None,
        category: RequestCategory | None,
        active_only: bool,
        limit: int,
    ) -> list[MapPoint]:
        """Demandes géolocalisées. Si `status` est absent et `active_only`, exclut résolues/rejetées."""
