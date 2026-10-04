from pydantic import BaseModel, model_validator

from src.domain.i18n import Language
from src.domain.preferences import FontFamily, FontSize, Theme


class PreferencesOut(BaseModel):
    theme: Theme
    font_size: FontSize
    font_family: FontFamily
    # null : jamais choisie (l'interface est alors en français).
    language: Language | None = None


class PreferencesIn(BaseModel):
    """Remplacement des préférences d'affichage. `language` absent ou null : inchangée."""

    model_config = {"extra": "forbid"}
    theme: Theme = Theme.SYSTEM
    font_size: FontSize = FontSize.MEDIUM
    font_family: FontFamily = FontFamily.SYSTEM
    language: Language | None = None


class PreferencesPatch(BaseModel):
    """Modification partielle (ex. sélecteur de langue) : seuls les champs fournis changent."""

    model_config = {"extra": "forbid"}
    theme: Theme | None = None
    font_size: FontSize | None = None
    font_family: FontFamily | None = None
    language: Language | None = None

    @model_validator(mode="after")
    def require_a_field(self) -> "PreferencesPatch":
        if not any(
            value is not None
            for value in (self.theme, self.font_size, self.font_family, self.language)
        ):
            raise ValueError("At least one preference must be provided")
        return self
