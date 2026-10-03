from pydantic import BaseModel, Field

from src.domain.preferences import FontFamily, FontSize, Theme


class PreferencesOut(BaseModel):
    theme: Theme
    font_size: FontSize
    font_family: FontFamily


class PreferencesIn(PreferencesOut):
    model_config = {"extra": "forbid"}
    theme: Theme = Field(default="system")
    font_size: FontSize = Field(default="medium")
    font_family: FontFamily = Field(default="system")
