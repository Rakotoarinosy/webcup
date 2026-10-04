"""Schémas Pydantic du domaine institut : entrées (In) validées par l'API, sortie (Out) renvoyée au client."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.citizen_request import RequestCategory


class CreateInstitutIn(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: str = Field(default="", max_length=2_000)
    categories: set[RequestCategory] = Field(min_length=1)
    manager_id: str | None = Field(default=None, min_length=1, max_length=36)


class UpdateInstitutIn(BaseModel):
    """Mise à jour partielle : seuls les champs fournis sont modifiés. Le manager a sa propre action."""

    name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=2_000)
    categories: set[RequestCategory] | None = Field(default=None, min_length=1)
    is_active: bool | None = None


class SetManagerIn(BaseModel):
    manager_id: str | None = Field(default=None, min_length=1, max_length=36)  # None = retirer


class InstitutOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    description: str
    categories: list[RequestCategory]
    manager_id: str | None
    is_active: bool
    created_at: datetime


class RequestMetricsOut(BaseModel):
    received: int
    in_progress: int
    resolved: int


class InstitutServiceOut(BaseModel):
    id: str
    institut_id: str
    name: str
    category: str
    description: str
    contact_details: str
    opening_hours: str
    icon: str
    request_category: RequestCategory | None
    responsible_agent_id: str | None
    responsible_agent_name: str | None
    associated_agents: int
    metrics: RequestMetricsOut


class InstitutDashboardOut(BaseModel):
    institut: InstitutOut
    manager_name: str | None
    associated_agents: int
    metrics: RequestMetricsOut
    services: list[InstitutServiceOut]


class CreateInstitutServiceIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=255)
    category: str = Field(min_length=2, max_length=80)
    description: str = Field(min_length=3, max_length=2_000)
    contact_details: str = Field(min_length=2, max_length=500)
    opening_hours: str = Field(min_length=2, max_length=255)
    icon: str = Field(default="pi-building", min_length=2, max_length=80)
    request_category: RequestCategory | None = None
    responsible_agent_id: str | None = Field(default=None, min_length=1, max_length=36)
    agent_ids: set[str] = Field(default_factory=set)


class SetServiceResponsibleIn(BaseModel):
    model_config = ConfigDict(extra="forbid")
    agent_id: str | None = Field(default=None, min_length=1, max_length=36)


class SetServiceAgentsIn(BaseModel):
    model_config = ConfigDict(extra="forbid")
    agent_ids: set[str] = Field(default_factory=set)
