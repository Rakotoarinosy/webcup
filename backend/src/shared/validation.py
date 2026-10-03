"""Types Pydantic réutilisables (email normalisé, mot de passe conforme à la politique)."""

from typing import Annotated

from pydantic import AfterValidator, BeforeValidator, EmailStr, Field

from src.domain.user.rules import normalize_email, normalize_name, validate_password_strength

Email = Annotated[EmailStr, AfterValidator(normalize_email)]
Password = Annotated[str, AfterValidator(validate_password_strength)]

Name = Annotated[str, BeforeValidator(normalize_name), Field(min_length=1, max_length=255)]
