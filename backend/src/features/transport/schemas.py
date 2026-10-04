from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from src.domain.transport import LineStatus, TransportMode


class TransportStopOut(BaseModel):
    id: str
    name: str
    position: int
    minutes_from_start: int
    latitude: float | None
    longitude: float | None
    # Prochains passages théoriques, calculés à partir des horaires (vide si ligne interrompue).
    next_passages: list[datetime]
    # L'arrêt correspond à la recherche de l'habitant.
    matches_search: bool = False


class TransportLineOut(BaseModel):
    id: str
    code: str
    name: str
    mode: TransportMode
    first_departure: str  # HH:MM, heure locale
    last_departure: str
    frequency_minutes: int
    days_label: str
    status: LineStatus
    status_message: str | None
    status_updated_at: datetime | None
    stops: list[TransportStopOut]
    # Instant du calcul, pour que l'affichage « dans 5 min » reste juste côté client.
    computed_at: datetime


class UpdateLineStatusIn(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    status: LineStatus
    message: str | None = Field(default=None, max_length=1000)
