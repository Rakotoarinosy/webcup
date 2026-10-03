"""Pydantic schemas for user and citizen-account operations."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.user import Role
from src.shared.validation import Email, Password


class CreateUserIn(BaseModel):
    email: Email
    name: str = Field(min_length=1, max_length=255)
    password: Password
    role: Role = Role.CITIZEN


class UpdateUserIn(BaseModel):
    """Mise à jour partielle : null ou absent signifie « ne pas toucher »."""

    email: Email | None = None
    name: str | None = Field(default=None, min_length=1, max_length=255)
    role: Role | None = None
    is_active: bool | None = None
    password: Password | None = None  # réinitialisation par un admin


class UpdateCitizenAccountIn(BaseModel):
    """Champs modifiables par les équipes de gestion des comptes citoyens."""

    model_config = ConfigDict(extra="forbid")

    email: Email | None = None
    name: str | None = Field(default=None, min_length=1, max_length=255)
    is_active: bool | None = None


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    name: str
    role: Role
    is_active: bool
    created_at: datetime
