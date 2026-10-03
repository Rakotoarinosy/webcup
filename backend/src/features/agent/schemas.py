"""Schémas Pydantic du domaine agent : entrées (In) validées par l'API, sortie (Out) renvoyée au client."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.agent import AgentStatus


class CreateAgentProfileIn(BaseModel):
    """Profil agent d'un compte existant (rôle AGENT). Un manager crée toujours dans son institut."""

    user_id: str = Field(min_length=1, max_length=36)
    institut_id: str | None = Field(default=None, min_length=1, max_length=36)
    status: AgentStatus = AgentStatus.AVAILABLE


class AgentStatusIn(BaseModel):
    status: AgentStatus


class MoveAgentIn(BaseModel):
    institut_id: str = Field(min_length=1, max_length=36)


class AgentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    name: str
    email: str
    institut_id: str
    institut_name: str
    status: AgentStatus
    is_active: bool
    interventions: int
    created_at: datetime
