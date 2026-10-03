from datetime import datetime

from pydantic import BaseModel, ConfigDict

from src.domain.terra_request import PipelineStatus, TerraNotificationKind


class TerraRequestOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    request_code: str
    api_id: int | None
    requester_name: str
    requester_type: str
    message_public: str
    difficulty: str
    difficulty_level: int
    xp_base: int
    xp_time_bonus: int
    xp_total: int
    xp_available: int
    is_initial: bool
    visible_since_wave: int | None
    arrival_type: str
    wave_number: int | None
    arrival_time: str
    is_ai_related: bool
    is_ai_request: bool
    group_name: str
    sort_order: int
    wave: int
    status: PipelineStatus
    first_seen_at: datetime | None
    updated_at: datetime | None


class UpdateTerraStatusIn(BaseModel):
    status: PipelineStatus


class TerraSessionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    status: str
    is_running: bool
    current_wave: int
    elapsed_minutes: int
    visible_requests_count: int
    initial_requests_count: int
    wave_requests_count: int
    next_wave_number: int
    minutes_until_next_wave: int
    next_wave_eta: datetime | None
    updated_at: datetime | None
    api_ok: bool
    last_sync_attempt_at: datetime | None
    last_sync_success_at: datetime | None
    last_sync_error: str | None


class TerraOverviewOut(BaseModel):
    session: TerraSessionOut
    # Horloge serveur : le front corrige son compte à rebours si l'horloge locale dérive.
    server_time: datetime
    sync_interval_seconds: int


class SyncReportOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    new_codes: list[str]
    updated_codes: list[str]


class TerraNotificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    key: str
    kind: TerraNotificationKind
    title: str
    message: str
    request_code: str | None
    created_at: datetime
    is_read: bool


class TerraNotificationListOut(BaseModel):
    items: list[TerraNotificationOut]
    unread_count: int


class PipelineColumnOut(BaseModel):
    status: PipelineStatus
    requests: list[TerraRequestOut]
