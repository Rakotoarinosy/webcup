"""Rappels de rendez-vous (F40), exécutés par la tâche de fond (voir src/bootstrap.py).

Un cycle :
1. planifie les rappels dont c'est le moment : la notification dans l'application est créée
   tout de suite, l'email et le SMS sont mémorisés « en attente » ;
2. envoie les emails / SMS en attente (ou à retenter), un par un, réservés au préalable
   pour qu'un message ne parte jamais deux fois, même avec plusieurs workers.
Un échec d'envoi n'interrompt jamais le cycle : le message est retenté plus tard.
"""

import logging
import uuid
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from src.domain.appointment import (
    REMINDER_MINUTES,
    AppointmentMessenger,
    AppointmentNotice,
    AppointmentQuery,
    AppointmentRepository,
    AppointmentStatus,
    NoticeChannel,
    NoticeKind,
    NoticeStatus,
)
from src.domain.appointment.messages import reminder_message
from src.domain.appointment.reminders import (
    DeliveryPolicy,
    channels_for,
    reminder_to_send,
    should_attempt,
    still_relevant,
)
from src.domain.user import UserRepository
from src.features.appointment.use_cases import AppointmentPolicy

logger = logging.getLogger(__name__)

# Plus long délai de rappel proposé : au-delà, aucun rendez-vous n'a de rappel dû.
_LOOKAHEAD = timedelta(minutes=max(REMINDER_MINUTES.values()))


@dataclass
class ReminderReport:
    scheduled: int = 0  # rappels planifiés (un par rendez-vous)
    sent: int = 0  # emails / SMS envoyés
    failed: int = 0  # échecs (retentés plus tard)
    skipped: int = 0  # devenus sans objet


def schedule_due_reminders(
    repo: AppointmentRepository,
    users: UserRepository,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> int:
    now = now or datetime.now(UTC)
    upcoming = repo.list_appointments(
        AppointmentQuery(
            since=now,
            until=now + _LOOKAHEAD + timedelta(minutes=1),
            statuses=frozenset({AppointmentStatus.CONFIRMED}),
        )
    )
    scheduled = 0
    for appointment in upcoming:
        delay = reminder_to_send(appointment, now)
        if delay is None:
            continue
        citizen = users.get_by_id(appointment.citizen_id)
        if citizen is None or not citizen.is_active:
            continue
        message = reminder_message(appointment, delay, policy.tz)
        created = False
        for channel in channels_for(
            email=citizen.email,
            email_verified=citizen.email_verified,
            phone=citizen.phone,
            phone_verified=citizen.phone_verified,
        ):
            in_app = channel is NoticeChannel.IN_APP
            created |= repo.add_notice_if_absent(
                AppointmentNotice(
                    id=str(uuid.uuid4()),
                    appointment_id=appointment.id,
                    user_id=citizen.id,
                    kind=NoticeKind.REMINDER,
                    channel=channel,
                    delay=delay.value,
                    title=message.title,
                    message=message.sms if channel is NoticeChannel.SMS else message.text,
                    created_at=now,
                    status=NoticeStatus.SENT if in_app else NoticeStatus.PENDING,
                    sent_at=now if in_app else None,
                )
            )
        scheduled += int(created)
    return scheduled


def deliver_pending(
    repo: AppointmentRepository,
    users: UserRepository,
    messenger: AppointmentMessenger,
    now: datetime | None = None,
    delivery: DeliveryPolicy | None = None,
    limit: int = 100,
) -> ReminderReport:
    now = now or datetime.now(UTC)
    delivery = delivery or DeliveryPolicy()
    report = ReminderReport()
    for notice in repo.deliverable_notices(limit, delivery.max_attempts):
        if not should_attempt(notice, now, delivery):
            continue
        appointment = repo.get_appointment(notice.appointment_id)
        citizen = users.get_by_id(notice.user_id)
        contact = None
        if citizen is not None and citizen.is_active:
            contact = citizen.email if notice.channel is NoticeChannel.EMAIL else citizen.phone
        if appointment is None or contact is None or not still_relevant(notice, appointment, now):
            notice.status = NoticeStatus.SKIPPED
            repo.save_notice(notice)
            report.skipped += 1
            continue
        if not repo.claim_notice(notice, now):
            continue  # pris par un autre worker
        try:
            if notice.channel is NoticeChannel.EMAIL:
                messenger.send_email(contact, citizen.name, notice.title, notice.message)  # type: ignore[union-attr]
            else:
                messenger.send_sms(contact, notice.message)
        except Exception as exc:  # un échec ne doit jamais arrêter le cycle
            notice.status = NoticeStatus.FAILED
            notice.last_error = type(exc).__name__
            report.failed += 1
            logger.warning(
                "appointment notice failed",
                extra={"notice_id": notice.id, "channel": notice.channel.value},
            )
        else:
            notice.status = NoticeStatus.SENT
            notice.sent_at = now
            notice.last_error = None
            report.sent += 1
        repo.save_notice(notice)
    return report


def run_reminder_cycle(
    repo: AppointmentRepository,
    users: UserRepository,
    messenger: AppointmentMessenger,
    policy: AppointmentPolicy,
    now: datetime | None = None,
) -> ReminderReport:
    now = now or datetime.now(UTC)
    scheduled = schedule_due_reminders(repo, users, policy, now)
    report = deliver_pending(repo, users, messenger, now)
    report.scheduled = scheduled
    return report
