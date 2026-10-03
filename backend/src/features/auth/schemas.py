"""Schémas Pydantic du domaine auth.

Aucun champ `role` dans RegisterIn : un rôle envoyé par le client est ignoré (pas de mass-assignment).
"""

from datetime import datetime
from typing import Annotated, Self

from pydantic import (
    AfterValidator,
    AliasChoices,
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
    model_validator,
)

from src.domain.user.rules import normalize_identifier
from src.shared.validation import Email, Name, OptionalEmail, OptionalPhone, Password

# 6 chiffres exactement ; les espaces autour (copier-coller depuis l'email / le SMS) sont retirés.
SixDigitCode = Annotated[str, StringConstraints(strip_whitespace=True, pattern=r"^[0-9]{6}$")]


class RegisterIn(BaseModel):
    """Inscription avec un email OU un numéro de téléphone (exactement un des deux)."""

    email: OptionalEmail = None
    phone: OptionalPhone = None
    name: Name
    password: Password

    @model_validator(mode="after")
    def require_exactly_one_contact(self) -> Self:
        if (self.email is None) == (self.phone is None):
            raise ValueError("Provide either an email or a phone number")

        return self


class LoginIn(BaseModel):
    # Email ou téléphone. Les anciens clients qui envoient `email` continuent de fonctionner.
    identifier: Annotated[
        str,
        Field(
            min_length=3,
            max_length=320,
            validation_alias=AliasChoices("identifier", "email", "phone"),
        ),
        AfterValidator(normalize_identifier),
    ]
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
    channel: str  # "email" | "sms"
    destination: str  # email, ou numéro masqué (+261•••••••67)
    email: str | None = None  # compatibilité : renseigné seulement pour le canal email
    expires_in: int
    resend_after: int


class ChangePasswordIn(BaseModel):
    current_password: str = Field(min_length=1, max_length=128)
    new_password: Password


class UpdateProfileIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Name
    email: Email | None = None  # absent = inchangé (un compte par téléphone peut en ajouter un)
    current_password: str = Field(min_length=1, max_length=128)


class DeleteAccountIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    current_password: str = Field(min_length=1, max_length=128)


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str | None = None
    phone: str | None = None
    name: str
    role: str
    agent_id: str | None = None
    institut_id: str | None = None
    created_at: datetime
    email_verified: bool
    phone_verified: bool = False
    avatar_url: str | None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: ProfileOut
