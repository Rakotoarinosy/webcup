"""Types Pydantic réutilisables (email / téléphone normalisés, mot de passe conforme à la politique)."""

from typing import Annotated

from pydantic import AfterValidator, BeforeValidator, EmailStr, Field

from src.domain.user.rules import (
    normalize_email,
    normalize_name,
    normalize_phone,
    validate_password_strength,
)

Email = Annotated[EmailStr, AfterValidator(normalize_email)]
Phone = Annotated[str, AfterValidator(normalize_phone)]
Password = Annotated[str, AfterValidator(validate_password_strength)]

Name = Annotated[str, BeforeValidator(normalize_name), Field(min_length=1, max_length=255)]


def _blank_to_none(value: object) -> object:
    return None if isinstance(value, str) and not value.strip() else value


# Un champ vide envoyé par le formulaire (« ») équivaut à « non renseigné ».
OptionalEmail = Annotated[Email | None, BeforeValidator(_blank_to_none)]
OptionalPhone = Annotated[Phone | None, BeforeValidator(_blank_to_none)]
