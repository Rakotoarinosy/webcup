"""Préférences d'affichage indépendantes des frameworks."""

from dataclasses import dataclass
from typing import Literal

Theme = Literal["light", "dark", "system"]
FontSize = Literal["small", "medium", "large"]
FontFamily = Literal["system", "inter", "poppins", "manrope", "source", "serif", "mono"]


@dataclass(frozen=True, slots=True)
class UserPreferences:
    user_id: str
    theme: Theme = "system"
    font_size: FontSize = "medium"
    font_family: FontFamily = "system"
