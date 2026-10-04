"""Préférences d'affichage indépendantes des frameworks."""

from dataclasses import dataclass
from enum import StrEnum

from src.domain.i18n import DEFAULT_LANGUAGE, Language


class Theme(StrEnum):
    LIGHT = "light"
    DARK = "dark"
    SYSTEM = "system"


class FontSize(StrEnum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class FontFamily(StrEnum):
    SYSTEM = "system"
    INTER = "inter"
    POPPINS = "poppins"
    MANROPE = "manrope"
    SOURCE = "source"
    SERIF = "serif"
    MONO = "mono"


@dataclass(frozen=True, slots=True)
class UserPreferences:
    user_id: str
    theme: Theme = Theme.SYSTEM
    font_size: FontSize = FontSize.MEDIUM
    font_family: FontFamily = FontFamily.SYSTEM
    # None tant que l'utilisateur n'a pas choisi : l'interface reste en français (D14).
    language: Language | None = None

    @property
    def effective_language(self) -> Language:
        return self.language or DEFAULT_LANGUAGE
