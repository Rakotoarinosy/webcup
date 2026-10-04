"""Schémas Pydantic des rendez-vous (F39) et rappels (F40).

Les horaires sont donnés en UTC (ISO 8601) ET déjà décrits dans le fuseau de la mairie
(jour en toutes lettres, heure, décalage UTC) : le client n'a aucune conversion à faire.
"""

from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, Field, field_validator

from src.domain.appointment import (
    AppointmentModality,
    AppointmentStatus,
    ReminderDelay,
)
from src.shared.validation import OptionalPhone

# ─── entrées ───


class SlotFields(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # Admin : institut obligatoire ; manager / agent : toujours le leur (valeur ignorée).
    institut_id: str | None = Field(default=None, max_length=36)
    # Manager / admin : agent de l'institut (facultatif) ; agent : toujours lui-même.
    agent_id: str | None = Field(default=None, max_length=36)
    modality: AppointmentModality
    location: str = Field(min_length=3, max_length=500)
    preparation: str = Field(default="", max_length=2_000)


class CreateSlotIn(SlotFields):
    """Un créneau, en heure locale de la mairie."""

    day: date
    start_time: time
    duration_minutes: int = Field(ge=5, le=480)


class CreateSeriesIn(SlotFields):
    """Une série : du premier au dernier jour, certains jours de la semaine, en heure locale."""

    first_day: date
    last_day: date
    weekdays: list[int] = Field(min_length=1, max_length=7)  # 0 = lundi … 6 = dimanche
    day_start: time
    day_end: time
    duration_minutes: int = Field(ge=5, le=480)
    break_minutes: int = Field(default=0, ge=0, le=240)

    @field_validator("weekdays")
    @classmethod
    def valid_weekdays(cls, value: list[int]) -> list[int]:
        if any(day < 0 or day > 6 for day in value):
            raise ValueError("Weekdays go from 0 (Monday) to 6 (Sunday)")
        return sorted(set(value))


class BookIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slot_id: str = Field(max_length=36)
    reason: str = Field(min_length=5, max_length=1_000)
    # Rappels choisis par l'habitant ; liste vide = aucun rappel.
    reminders: list[ReminderDelay] = Field(
        default_factory=lambda: [ReminderDelay.ONE_DAY, ReminderDelay.ONE_HOUR], max_length=4
    )
    # Rendez-vous par téléphone : numéro à appeler (par défaut celui du compte).
    contact_phone: OptionalPhone = None


class CancelIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # Obligatoire quand la mairie annule (communiqué à l'habitant) ; facultatif pour l'habitant.
    reason: str | None = Field(default=None, max_length=1_000)


class AttendanceIn(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: AppointmentStatus


# ─── sorties ───


class SlotTimeOut(BaseModel):
    starts_at: datetime  # UTC
    ends_at: datetime  # UTC
    day: date  # jour local
    day_label: str  # « lundi 5 octobre 2026 »
    start_time: str  # « 09:30 », heure de la mairie
    end_time: str
    utc_offset: str  # « UTC+3 »
    timezone: str  # « Indian/Antananarivo »
    duration_minutes: int
    label: str  # phrase complète, sans ambiguïté


class SlotOut(BaseModel):
    id: str
    institut_id: str
    institut_name: str
    agent_id: str | None
    agent_name: str
    modality: AppointmentModality
    modality_label: str
    location: str
    preparation: str
    instructions: str
    directions_url: str | None
    capacity: int
    is_open: bool
    is_booked: bool
    time: SlotTimeOut


class AppointmentOut(BaseModel):
    id: str
    reference: str
    status: AppointmentStatus
    status_label: str
    reason: str
    reminders: list[ReminderDelay]
    reminder_labels: list[str]
    contact_phone: str | None
    created_at: datetime
    cancelled_at: datetime | None
    cancel_reason: str | None
    attendance_recorded_at: datetime | None
    is_upcoming: bool
    can_cancel: bool
    cancellation_deadline: datetime
    slot: SlotOut


class AppointmentStaffOut(AppointmentOut):
    citizen_id: str
    citizen_name: str
    citizen_email: str | None
    citizen_phone: str | None


class PlanningSlotOut(SlotOut):
    appointment: AppointmentStaffOut | None


class SeriesCreatedOut(BaseModel):
    created: int
    slots: list[SlotOut]


class ServiceOut(BaseModel):
    institut_id: str
    name: str
    description: str
    available_slots: int
    next_available: SlotTimeOut | None


class DayOut(BaseModel):
    day: date
    day_label: str
    available_slots: int


class ReminderOptionOut(BaseModel):
    value: ReminderDelay
    label: str
    minutes: int
    is_default: bool


class PolicyOut(BaseModel):
    timezone: str
    timezone_label: str
    cancellation_notice_hours: int
    booking_horizon_days: int
    reminder_options: list[ReminderOptionOut]
