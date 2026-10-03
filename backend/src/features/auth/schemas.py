"""Schémas Pydantic du domaine auth.

Aucun champ `role` dans RegisterIn : un rôle envoyé par le client est ignoré (pas de mass-assignment).
"""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.shared.validation import Email, Name, Password


class RegisterIn(BaseModel):
    email: Email
    name: Name
    password: Password


class LoginIn(BaseModel):
    email: Email
    # Pas de politique ici : on ne valide que la taille, le hash fait le reste.
    password: str = Field(min_length=1, max_length=128)


class ChangePasswordIn(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: Password


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    name: str
    role: str
    agent_id: str | None
    created_at: datetime


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: ProfileOut
