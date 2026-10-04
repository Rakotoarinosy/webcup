"""Quels rappels envoyer maintenant (F40) : logique pure, testée sans base ni horloge.

Règles :
- seul un rendez-vous confirmé et pas encore commencé reçoit des rappels ;
- un rappel est « arrivé » quand son heure (début moins délai) est passée ;
- un rappel dont l'heure précédait la réservation n'a pas de sens (réservé 3 h avant :
  pas de rappel « 24 h avant ») ;
- si plusieurs rappels sont arrivés en même temps (serveur arrêté, réservation tardive),
  seul le plus proche du rendez-vous est envoyé : les autres sont dépassés ;
- chaque canal d'un rappel n'est envoyé qu'une fois ; un échec est retenté après un délai,
  un nombre limité de fois.
"""

from dataclasses import dataclass
from datetime import datetime, timedelta

from src.domain.appointment.entities import (
    REMINDER_MINUTES,
    Appointment,
    AppointmentNotice,
    AppointmentStatus,
    NoticeChannel,
    NoticeKind,
    NoticeStatus,
    ReminderDelay,
)


@dataclass(frozen=True)
class DeliveryPolicy:
    max_attempts: int = 3
    retry_after: timedelta = timedelta(minutes=2)
    # Un envoi resté « en cours » plus longtemps est considéré comme interrompu.
    stale_after: timedelta = timedelta(minutes=10)


def reminder_due_at(appointment: Appointment, delay: ReminderDelay) -> datetime:
    return appointment.slot.starts_at - timedelta(minutes=REMINDER_MINUTES[delay])


def reminder_to_send(appointment: Appointment, now: datetime) -> ReminderDelay | None:
    """Le rappel dont c'est le moment, ou None. Toujours le même tant qu'un plus proche
    n'arrive pas : la mémorisation par canal garantit qu'il n'est envoyé qu'une fois."""
    if appointment.status is not AppointmentStatus.CONFIRMED:
        return None
    if appointment.slot.starts_at <= now:
        return None
    arrived = [
        delay
        for delay in appointment.reminders
        if appointment.created_at <= reminder_due_at(appointment, delay) <= now
    ]
    if not arrived:
        return None
    return min(arrived, key=lambda delay: REMINDER_MINUTES[delay])


def channels_for(
    *, email: str | None, email_verified: bool, phone: str | None, phone_verified: bool
) -> list[NoticeChannel]:
    """Toujours dans l'application ; par email et/ou SMS selon les contacts confirmés du compte."""
    channels = [NoticeChannel.IN_APP]
    if email and email_verified:
        channels.append(NoticeChannel.EMAIL)
    if phone and phone_verified:
        channels.append(NoticeChannel.SMS)
    return channels


def should_attempt(notice: AppointmentNotice, now: datetime, policy: DeliveryPolicy) -> bool:
    """Un message mémorisé doit-il être (re)tenté maintenant ?"""
    match notice.status:
        case NoticeStatus.PENDING:
            return True
        case NoticeStatus.FAILED:
            return notice.attempts < policy.max_attempts and (
                notice.last_attempt_at is None or notice.last_attempt_at + policy.retry_after <= now
            )
        case NoticeStatus.SENDING:
            return (
                notice.attempts < policy.max_attempts
                and notice.last_attempt_at is not None
                and notice.last_attempt_at + policy.stale_after <= now
            )
        case _:
            return False


def still_relevant(notice: AppointmentNotice, appointment: Appointment, now: datetime) -> bool:
    """Un rappel en attente devient sans objet si le rendez-vous est annulé ou commencé."""
    if notice.kind is NoticeKind.REMINDER:
        return appointment.status is AppointmentStatus.CONFIRMED and appointment.starts_at > now
    return True
