"""Rendez-vous avec un agent de la mairie (F39) et rappels (F40).

Un créneau (Slot) est proposé par un service (institut), éventuellement au nom d'un agent ;
il accueille une seule personne. Un rendez-vous (Appointment) est la réservation d'un créneau
par un habitant, avec une référence lisible et un statut qui garde la trace de ce qui s'est passé.
Toutes les dates sont en UTC ; l'affichage se fait dans le fuseau de la mairie.
"""

from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import StrEnum

from src.domain.appointment.exceptions import (
    AppointmentNotCancellableError,
    AttendanceNotRecordableError,
    AttendanceTooEarlyError,
    CancellationTooLateError,
    SlotAlreadyBookedConflictError,
    SlotClosedError,
    SlotInPastError,
)

SLOT_CAPACITY = 1  # un créneau = une personne reçue


class AppointmentModality(StrEnum):
    IN_PERSON = "in_person"
    PHONE = "phone"
    VIDEO = "video"


MODALITY_LABELS: dict[AppointmentModality, str] = {
    AppointmentModality.IN_PERSON: "Sur place",
    AppointmentModality.PHONE: "Par téléphone",
    AppointmentModality.VIDEO: "En visio",
}

# Ce que l'habitant doit savoir pour se préparer, selon la modalité.
MODALITY_INSTRUCTIONS: dict[AppointmentModality, str] = {
    AppointmentModality.IN_PERSON: (
        "Présentez-vous 10 minutes avant l'heure à l'adresse indiquée, avec une pièce d'identité."
    ),
    AppointmentModality.PHONE: (
        "L'agent vous appelle à l'heure du rendez-vous au numéro indiqué. Restez joignable."
    ),
    AppointmentModality.VIDEO: (
        "Connectez-vous quelques minutes avant l'heure avec le lien indiqué "
        "(ordinateur ou téléphone avec caméra et micro)."
    ),
}


class AppointmentStatus(StrEnum):
    CONFIRMED = "confirmed"
    CANCELLED_BY_CITIZEN = "cancelled_by_citizen"
    CANCELLED_BY_CITY = "cancelled_by_city"
    HONORED = "honored"
    NO_SHOW = "no_show"


STATUS_LABELS: dict[AppointmentStatus, str] = {
    AppointmentStatus.CONFIRMED: "Confirmé",
    AppointmentStatus.CANCELLED_BY_CITIZEN: "Annulé par vous",
    AppointmentStatus.CANCELLED_BY_CITY: "Annulé par la mairie",
    AppointmentStatus.HONORED: "Honoré",
    AppointmentStatus.NO_SHOW: "Absent",
}

# Statuts qui occupent le créneau (un rendez-vous annulé le libère).
OCCUPYING_STATUSES = frozenset(
    {AppointmentStatus.CONFIRMED, AppointmentStatus.HONORED, AppointmentStatus.NO_SHOW}
)
ATTENDANCE_STATUSES = frozenset({AppointmentStatus.HONORED, AppointmentStatus.NO_SHOW})


class ReminderDelay(StrEnum):
    """Délais de rappel proposés à l'habitant au moment de la réservation."""

    TWO_DAYS = "2d"
    ONE_DAY = "24h"
    THREE_HOURS = "3h"
    ONE_HOUR = "1h"


REMINDER_MINUTES: dict[ReminderDelay, int] = {
    ReminderDelay.TWO_DAYS: 2 * 24 * 60,
    ReminderDelay.ONE_DAY: 24 * 60,
    ReminderDelay.THREE_HOURS: 3 * 60,
    ReminderDelay.ONE_HOUR: 60,
}
REMINDER_LABELS: dict[ReminderDelay, str] = {
    ReminderDelay.TWO_DAYS: "2 jours avant",
    ReminderDelay.ONE_DAY: "24 heures avant",
    ReminderDelay.THREE_HOURS: "3 heures avant",
    ReminderDelay.ONE_HOUR: "1 heure avant",
}
DEFAULT_REMINDERS: tuple[ReminderDelay, ...] = (ReminderDelay.ONE_DAY, ReminderDelay.ONE_HOUR)


class NoticeKind(StrEnum):
    REMINDER = "reminder"
    CANCELLED_BY_CITY = "cancelled_by_city"


class NoticeChannel(StrEnum):
    IN_APP = "in_app"
    EMAIL = "email"
    SMS = "sms"


class NoticeStatus(StrEnum):
    PENDING = "pending"  # à envoyer par la tâche de fond
    SENDING = "sending"  # réservé par un envoi en cours (évite les doublons entre workers)
    SENT = "sent"
    FAILED = "failed"  # nouvel essai plus tard, jusqu'au nombre maximal d'essais
    SKIPPED = "skipped"  # devenu sans objet (rendez-vous annulé ou passé)


@dataclass
class Slot:
    id: str
    institut_id: str
    starts_at: datetime
    ends_at: datetime
    modality: AppointmentModality
    # Sur place : adresse ; téléphone / visio : instructions ou lien de connexion.
    location: str
    created_at: datetime
    created_by: str | None = None
    agent_id: str | None = None
    # Pièces à apporter et autres consignes du service.
    preparation: str = ""
    is_open: bool = True
    # Lus à la lecture, jamais stockés ici.
    institut_name: str = ""
    agent_name: str = ""
    is_booked: bool = False

    @property
    def capacity(self) -> int:
        return SLOT_CAPACITY

    @property
    def duration_minutes(self) -> int:
        return int((self.ends_at - self.starts_at).total_seconds() // 60)

    def overlaps(self, starts_at: datetime, ends_at: datetime) -> bool:
        return self.starts_at < ends_at and starts_at < self.ends_at

    def is_available(self, now: datetime) -> bool:
        return self.is_open and not self.is_booked and self.starts_at > now

    def ensure_bookable(self, now: datetime) -> None:
        if not self.is_open:
            raise SlotClosedError(self.id)
        if self.starts_at <= now:
            raise SlotInPastError()
        if self.is_booked:
            raise SlotAlreadyBookedConflictError(self.id)


@dataclass
class Appointment:
    id: str
    reference: str  # communiquée à l'habitant, ex. RDV-20261005-1A2B3C
    citizen_id: str
    slot: Slot
    reason: str
    created_at: datetime
    updated_at: datetime
    status: AppointmentStatus = AppointmentStatus.CONFIRMED
    reminders: tuple[ReminderDelay, ...] = DEFAULT_REMINDERS
    contact_phone: str | None = None
    cancelled_at: datetime | None = None
    cancel_reason: str | None = None
    attendance_recorded_at: datetime | None = None
    # Lus à la lecture (jointure users), pour le planning des agents.
    citizen_name: str = ""
    citizen_email: str | None = None
    citizen_phone: str | None = None

    @property
    def starts_at(self) -> datetime:
        return self.slot.starts_at

    @property
    def occupies_slot(self) -> bool:
        return self.status in OCCUPYING_STATUSES

    def is_upcoming(self, now: datetime) -> bool:
        return self.status is AppointmentStatus.CONFIRMED and self.slot.ends_at > now

    def cancellation_deadline(self, notice: timedelta) -> datetime:
        return self.slot.starts_at - notice

    def can_be_cancelled_by_citizen(self, now: datetime, notice: timedelta) -> bool:
        return self.status is AppointmentStatus.CONFIRMED and now <= self.cancellation_deadline(
            notice
        )

    def cancel_by_citizen(self, now: datetime, notice: timedelta) -> None:
        if self.status is not AppointmentStatus.CONFIRMED:
            raise AppointmentNotCancellableError(self.reference)
        if now > self.cancellation_deadline(notice):
            raise CancellationTooLateError(int(notice.total_seconds() // 3600))
        self.status = AppointmentStatus.CANCELLED_BY_CITIZEN
        self.cancelled_at = now
        self.updated_at = now

    def cancel_by_city(self, reason: str, now: datetime) -> None:
        """La mairie peut annuler un rendez-vous confirmé tant qu'il n'a pas eu lieu."""
        if self.status is not AppointmentStatus.CONFIRMED or self.slot.ends_at <= now:
            raise AppointmentNotCancellableError(self.reference)
        self.status = AppointmentStatus.CANCELLED_BY_CITY
        self.cancel_reason = reason
        self.cancelled_at = now
        self.updated_at = now

    def record_attendance(self, status: AppointmentStatus, now: datetime) -> None:
        """Honoré ou absent, une fois l'heure du rendez-vous arrivée (corrigeable ensuite)."""
        if status not in ATTENDANCE_STATUSES:
            raise ValueError(f"{status} is not an attendance status")
        if self.status not in OCCUPYING_STATUSES:
            raise AttendanceNotRecordableError(self.reference)
        if now < self.slot.starts_at:
            raise AttendanceTooEarlyError()
        self.status = status
        self.attendance_recorded_at = now
        self.updated_at = now


@dataclass
class AppointmentNotice:
    """Un message à l'habitant sur un canal : rappel ou annulation. Mémorisé pour ne jamais
    être envoyé deux fois (clé unique : rendez-vous, nature, délai, canal)."""

    id: str
    appointment_id: str
    user_id: str
    kind: NoticeKind
    channel: NoticeChannel
    # Délai du rappel (valeur de ReminderDelay) ; « - » pour une annulation.
    delay: str
    title: str
    message: str
    created_at: datetime
    status: NoticeStatus = NoticeStatus.PENDING
    attempts: int = 0
    last_attempt_at: datetime | None = None
    sent_at: datetime | None = None
    last_error: str | None = None
