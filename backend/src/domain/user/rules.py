"""Règles métier pures : politique de mot de passe, normalisation d'email et de téléphone."""

import re

PASSWORD_MIN_LENGTH = 10
PASSWORD_MAX_LENGTH = 128  # borne haute : évite de faire hacher des payloads géants


def validate_password_strength(value: str) -> str:
    if not PASSWORD_MIN_LENGTH <= len(value) <= PASSWORD_MAX_LENGTH:
        raise ValueError(
            f"Password must be between {PASSWORD_MIN_LENGTH} and {PASSWORD_MAX_LENGTH} characters"
        )
    if not (re.search(r"[a-z]", value) and re.search(r"[A-Z]", value) and re.search(r"\d", value)):
        raise ValueError(
            "Password must contain a lowercase letter, an uppercase letter and a digit"
        )

    return value


def normalize_email(value: str) -> str:
    return value.strip().lower()


def normalize_name(value: object) -> str:
    if not isinstance(value, str):
        raise ValueError("Name must be a string")
    value = value.strip()
    if not value:
        raise ValueError("Name must not be blank")
    return value


DEFAULT_COUNTRY_CODE = "261"  # Madagascar : « 034 12 345 67 » devient « +261341234567 »
_E164 = re.compile(r"\+[1-9][0-9]{7,14}")


def normalize_phone(value: str) -> str:
    """Normalise en E.164. Accepte +261…, 00261… et le format national 0xx…"""
    raw = re.sub(r"[\s().-]", "", value.strip())
    if raw.startswith("00"):
        raw = "+" + raw[2:]
    elif raw.startswith("0"):
        raw = f"+{DEFAULT_COUNTRY_CODE}{raw[1:]}"
    if not _E164.fullmatch(raw):
        raise ValueError("Phone number must look like +261341234567 or 034 12 345 67")

    return raw


def is_email_identifier(value: str) -> bool:
    return "@" in value


def normalize_identifier(value: str) -> str:
    """Identifiant de connexion : un email (normalisé) ou un numéro de téléphone (E.164)."""
    return normalize_email(value) if is_email_identifier(value) else normalize_phone(value)


def mask_phone(value: str) -> str:
    """+261341234567 -> +261•••••••67 : assez pour reconnaître son numéro, pas pour le deviner."""
    return value[:4] + "•" * max(0, len(value) - 6) + value[-2:]
