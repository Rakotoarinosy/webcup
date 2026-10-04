"""Langues de l'interface et des contenus (D14, F27). Python pur."""

from enum import StrEnum


class Language(StrEnum):
    """Langues proposées. Le français est la langue de référence des contenus."""

    FR = "fr"
    EN = "en"
    MG = "mg"


DEFAULT_LANGUAGE = Language.FR


def parse_language(value: str | None) -> Language | None:
    """« en », « EN », « en-GB » → Language.EN ; valeur inconnue → None."""
    if not value:
        return None
    primary = value.strip().split("-")[0].split("_")[0].lower()
    try:
        return Language(primary)
    except ValueError:
        return None


def parse_accept_language(header: str | None) -> Language | None:
    """Meilleure langue proposée d'un en-tête Accept-Language (« mg, fr;q=0.8 »)."""
    if not header:
        return None
    ranked: list[tuple[float, int, Language]] = []
    for position, part in enumerate(header.split(",")):
        tag, _, params = part.strip().partition(";")
        quality = 1.0
        if params.strip().startswith("q="):
            try:
                quality = float(params.strip()[2:])
            except ValueError:
                quality = 0.0
        language = parse_language(tag)
        if language is not None and quality > 0:
            ranked.append((-quality, position, language))
    return min(ranked)[2] if ranked else None


def resolve_language(explicit: str | None, accept_language: str | None) -> Language:
    """Paramètre explicite (`lang`), sinon en-tête Accept-Language, sinon français."""
    return parse_language(explicit) or parse_accept_language(accept_language) or DEFAULT_LANGUAGE
