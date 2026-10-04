from pydantic import BaseModel

from src.domain.preferences import FontFamily, FontSize, Theme


class PreferencesOut(BaseModel):
    theme: Theme
    font_size: FontSize
    font_family: FontFamily


class PreferencesIn(PreferencesOut):
    model_config = {"extra": "forbid"}
    theme: Theme = Theme.SYSTEM
    font_size: FontSize = FontSize.MEDIUM
    font_family: FontFamily = FontFamily.SYSTEM
