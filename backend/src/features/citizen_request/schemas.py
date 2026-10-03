"""Schémas HTTP des demandes citoyennes, de leur journal, de la priorisation et du dashboard."""

from datetime import date, datetime
from typing import Any, Self

from pydantic import BaseModel, ConfigDict, Field, model_validator

from src.domain.agent import AgentStatus
from src.domain.citizen_request import (
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestStatus,
)
from src.domain.citizen_request.priority import DEFAULT_URGENCY, URGENCY_MAX, URGENCY_MIN

# ─── Entrées ────────────────────────────────────────────────────────


class SubmitRequestIn(BaseModel):
    """Statut, priorité, institut et agent ne sont jamais choisis à la soumission."""

    title: str = Field(min_length=1, max_length=255)
    description: str = Field(min_length=1, max_length=10_000)
    category: RequestCategory
    location: str = Field(min_length=1, max_length=500)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    # Saisie pour le compte d'un citoyen (manager, admin) ; ignoré pour un citoyen.
    citizen_id: str | None = Field(default=None, min_length=1, max_length=36)
    urgency: int = Field(default=DEFAULT_URGENCY, ge=URGENCY_MIN, le=URGENCY_MAX)
    affected_citizens: int = Field(default=1, ge=1, le=1_000_000)


class EditRequestIn(BaseModel):
    """Mise à jour partielle. `category` et `priority` sont réservés au gestionnaire."""

    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, min_length=1, max_length=10_000)
    location: str | None = Field(default=None, min_length=1, max_length=500)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    category: RequestCategory | None = None
    priority: RequestPriority | None = None


class AssignRequestIn(BaseModel):
    agent_id: str = Field(min_length=1, max_length=36)
    scheduled_at: datetime | None = None


class ChangeStatusIn(BaseModel):
    status: RequestStatus


class PriorityInputsIn(BaseModel):
    urgency: int | None = Field(default=None, ge=URGENCY_MIN, le=URGENCY_MAX)
    affected_citizens: int | None = Field(default=None, ge=1, le=1_000_000)

    @model_validator(mode="after")
    def at_least_one(self) -> Self:
        if self.urgency is None and self.affected_citizens is None:
            raise ValueError("Provide urgency and/or affected_citizens")

        return self


# ─── Sorties ────────────────────────────────────────────────────────


class CitizenRequestOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    description: str
    category: RequestCategory
    priority: RequestPriority
    status: RequestStatus
    citizen_id: str
    institut_id: str | None
    assigned_agent_id: str | None
    location: str
    latitude: float | None
    longitude: float | None
    urgency: int
    affected_citizens: int
    priority_score: int
    created_at: datetime
    updated_at: datetime
    scheduled_at: datetime | None
    resolved_at: datetime | None


class CitizenRequestPageOut(BaseModel):
    items: list[CitizenRequestOut]
    total: int
    page: int
    page_size: int
    total_pages: int


class RequestEventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    request_id: str
    type: RequestEventType
    actor_id: str | None
    actor_name: str | None
    payload: dict[str, Any]
    created_at: datetime


class RequestActivityOut(BaseModel):
    """Un événement du journal, avec la demande qu'il concerne."""

    event: RequestEventOut
    request_title: str
    request_status: RequestStatus


class RequestActivityPageOut(BaseModel):
    items: list[RequestActivityOut]
    total: int
    page: int
    page_size: int
    total_pages: int


class PriorityItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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


class PriorityQueueOut(BaseModel):
    items: list[PriorityItemOut]
    total: int
    page: int
    page_size: int


class MapPointOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    category: RequestCategory
    priority: RequestPriority
    status: RequestStatus
    latitude: float
    longitude: float
    created_at: datetime
    location: str
    assigned_agent_id: str | None
    agent_name: str | None


class DailyCountOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    day: date
    created: int
    resolved: int


class DashboardStatsOut(BaseModel):
    """Même forme pour tous les rôles ; les chiffres ne couvrent que le périmètre de l'appelant."""

    model_config = ConfigDict(from_attributes=True)

    total: int
    open: int
    in_progress: int
    resolved: int
    rejected: int
    resolution_rate: float
    interventions_today: int
    resolved_today: int
    pending_count: int
    by_status: dict[RequestStatus, int]
    by_category: dict[RequestCategory, int]
    by_priority: dict[RequestPriority, int]
    daily: list[DailyCountOut]


class PublicDashboardOut(BaseModel):
    """Compteurs de toute la ville, sans connexion : aucune demande ni identité exposée."""

    model_config = ConfigDict(from_attributes=True)

    total: int
    open: int
    in_progress: int
    resolved: int


class RecommendedAgentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    institut_name: str
    status: AgentStatus
    interventions: int


class RequestAnalysisOut(BaseModel):
    """Suggestion de l'IA : à valider par un humain avant d'être appliquée à la demande."""

    category: RequestCategory
    priority: RequestPriority
    summary: str
    reason: str
    recommended_agent: RecommendedAgentOut | None
