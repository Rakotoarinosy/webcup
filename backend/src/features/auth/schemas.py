"""Schémas Pydantic du domaine auth.

Aucun champ `role` dans RegisterIn : un rôle envoyé par le client est ignoré (pas de mass-assignment).
"""

from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, StringConstraints

from src.domain.user import Role
from src.shared.validation import Email, Name, Password

# 6 chiffres exactement ; les espaces autour (copier-coller depuis l'email) sont retirés.
SixDigitCode = Annotated[str, StringConstraints(strip_whitespace=True, pattern=r"^[0-9]{6}$")]


class RegisterIn(BaseModel):
    email: Email
    name: Name
    password: Password


class LoginIn(BaseModel):
    email: Email
    # Pas de politique ici : on ne valide que la taille, le hash fait le reste.
    password: str = Field(min_length=1, max_length=128)


class GoogleLoginIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # ID token (JWT) fourni par Google Identity Services côté front (champ `credential`).
    credential: str = Field(min_length=20, max_length=8192)


class VerifyCodeIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    challenge_id: str = Field(min_length=20, max_length=128)
    code: SixDigitCode


class ResendCodeIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    challenge_id: str = Field(min_length=20, max_length=128)


class ChallengeOut(BaseModel):
    """Un code vient d'être envoyé : le front affiche l'écran de saisie et garde `challenge_id`."""

    challenge_id: str
    email: str
    expires_in: int
    resend_after: int


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
    role: Role
    agent_id: str | None = None
    institut_id: str | None = None
    created_at: datetime
    email_verified: bool
    avatar_url: str | None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: ProfileOut
