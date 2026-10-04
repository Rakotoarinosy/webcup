from datetime import datetime

from pydantic import BaseModel, Field

from src.domain.account_security import DeviceKind


class DeviceOut(BaseModel):
    id: str
    label: str
    kind: DeviceKind
    network: str | None
    location: str | None
    first_seen_at: datetime
    last_seen_at: datetime
    acknowledged: bool
    active_sessions: int
    current: bool


class SecurityOverviewOut(BaseModel):
    devices: list[DeviceOut]
    # Connexions depuis un nouvel appareil à confirmer (« C'était moi » / « Ce n'était pas moi »).
    alerts: list[DeviceOut]
    current_device_id: str | None


class NotMeIn(BaseModel):
    device_id: str | None = Field(default=None, max_length=36)


class SessionsClosedOut(BaseModel):
    sessions_closed: int
    password_change_recommended: bool = False
    message: str


class FormTokenOut(BaseModel):
    token: str
    min_delay_seconds: float
