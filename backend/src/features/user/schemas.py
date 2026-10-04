"""Pydantic schemas for user and citizen-account operations."""

from datetime import datetime
from typing import Self

from pydantic import BaseModel, ConfigDict, model_validator

from src.domain.user import Role
from src.shared.validation import Name, OptionalEmail, OptionalPhone, Password


class CreateUserIn(BaseModel):
    email: OptionalEmail = None
    phone: OptionalPhone = None
    name: Name
    password: Password
    role: Role = Role.CITIZEN

    @model_validator(mode="after")
    def require_a_contact(self) -> Self:
        if self.email is None and self.phone is None:
            raise ValueError("Provide an email or a phone number")

        return self


class UpdateUserIn(BaseModel):
    """Mise à jour partielle : null ou absent signifie « ne pas toucher »."""

    email: OptionalEmail = None
    phone: OptionalPhone = None
    name: Name | None = None
    role: Role | None = None
    is_active: bool | None = None
    password: Password | None = None  # réinitialisation par un admin


class UpdateCitizenAccountIn(BaseModel):
    """Champs modifiables par les équipes de gestion des comptes citoyens."""

    model_config = ConfigDict(extra="forbid")

    email: OptionalEmail = None
    phone: OptionalPhone = None
    name: Name | None = None
    is_active: bool | None = None


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str | None = None
    phone: str | None = None
    name: str
    role: Role
    is_active: bool
    created_at: datetime
