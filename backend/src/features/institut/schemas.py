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
