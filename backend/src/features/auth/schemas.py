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


class UpdateProfileIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Name
    email: Email
    current_password: str = Field(min_length=1, max_length=128)


class DeleteAccountIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    current_password: str = Field(min_length=1, max_length=128)


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    name: str
    role: str
    created_at: datetime
    # Dérivés du profil (jamais stockés sur le compte) : profil agent, institut de l'agent ou géré.
    agent_id: str | None = None
    institut_id: str | None = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: ProfileOut
