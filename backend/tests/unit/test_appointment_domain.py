"""Règles métier des rendez-vous (F39) et logique « quels rappels envoyer maintenant » (F40)."""

from datetime import UTC, date, datetime, time, timedelta
from zoneinfo import ZoneInfo

import pytest

from src.domain.appointment import (
    Appointment,
    AppointmentModality,
    AppointmentNotCancellableError,
    AppointmentNotice,
    AppointmentStatus,
    AttendanceTooEarlyError,
    CancellationTooLateError,
    InvalidSlotError,
    NoticeChannel,
    NoticeKind,
    NoticeStatus,
    ReminderDelay,
    Slot,
    SlotAlreadyBookedConflictError,
    SlotClosedError,
    SlotInPastError,
)
from src.domain.appointment.messages import reminder_message, to_ics
from src.domain.appointment.reminders import (
    DeliveryPolicy,
    channels_for,
    reminder_to_send,
    should_attempt,
    still_relevant,
)
from src.domain.appointment.timing import SlotSeries, day_label, describe, series_times

TANA = ZoneInfo("Indian/Antananarivo")
START = datetime(2026, 10, 12, 6, 30, tzinfo=UTC)  # lundi 12 octobre 2026, 09:30 à Tana


def make_slot(**overrides) -> Slot:
    values = {
        "id": "slot-1",
        "institut_id": "inst-1",
        "starts_at": START,
        "ends_at": START + timedelta(minutes=30),
        "modality": AppointmentModality.IN_PERSON,
        "location": "Hôtel de ville, guichet 2",
        "created_at": START - timedelta(days=10),
        "institut_name": "État civil",
        "agent_name": "Rado",
        "preparation": "Carte d'identité",
    }
    return Slot(**{**values, **overrides})


def make_appointment(**overrides) -> Appointment:
    values = {
        "id": "appt-1",
        "reference": "RDV-20261012-ABC123",
        "citizen_id": "c1",
        "slot": make_slot(),
        "reason": "Acte de naissance",
        "created_at": START - timedelta(days=5),
        "updated_at": START - timedelta(days=5),
    }
    return Appointment(**{**values, **overrides})


# ─── dates sans ambiguïté ───


def test_slot_is_described_in_city_time_with_words_and_offset() -> None:
    when = describe(START, START + timedelta(minutes=30), TANA)
    assert when.day_label == "lundi 12 octobre 2026"
    assert (when.start_time, when.end_time, when.utc_offset) == ("09:30", "10:00", "UTC+3")
    assert when.full_label == "lundi 12 octobre 2026 de 09:30 à 10:00 (UTC+3, durée 30 min)"
    assert day_label(date(2026, 10, 1)) == "jeudi 1er octobre 2026"


def test_series_generates_local_slots_on_chosen_weekdays() -> None:
    series = SlotSeries(
        first_day=date(2026, 10, 12),
        last_day=date(2026, 10, 18),
        weekdays=frozenset({0, 3}),  # lundi, jeudi
        day_start=time(9, 0),
        day_end=time(10, 0),
        duration_minutes=20,
        break_minutes=10,
    )
    times = series_times(series, TANA)
    local = [start.astimezone(TANA).strftime("%a %H:%M") for start, _ in times]
    assert local == ["Mon 09:00", "Mon 09:30", "Thu 09:00", "Thu 09:30"]
    assert all(end - start == timedelta(minutes=20) for start, end in times)


@pytest.mark.parametrize(
    "change",
    [
        {"day_end": time(8, 0)},
        {"weekdays": frozenset()},
        {"last_day": date(2026, 10, 1)},
        {"duration_minutes": 2},
        {"weekdays": frozenset({6}), "last_day": date(2026, 10, 13)},  # aucun dimanche
    ],
)
def test_invalid_series_is_rejected(change: dict) -> None:
    base = {
        "first_day": date(2026, 10, 12),
        "last_day": date(2026, 10, 18),
        "weekdays": frozenset({0}),
        "day_start": time(9, 0),
        "day_end": time(12, 0),
        "duration_minutes": 30,
    }
    with pytest.raises(InvalidSlotError):
        series_times(SlotSeries(**{**base, **change}), TANA)


# ─── réservation, annulation, présence ───


def test_slot_must_be_open_free_and_in_the_future() -> None:
    now = START - timedelta(days=1)
    make_slot().ensure_bookable(now)
    with pytest.raises(SlotClosedError):
        make_slot(is_open=False).ensure_bookable(now)
    with pytest.raises(SlotAlreadyBookedConflictError):
        make_slot(is_booked=True).ensure_bookable(now)
    with pytest.raises(SlotInPastError):
        make_slot().ensure_bookable(START)


def test_citizen_can_cancel_until_the_notice_period() -> None:
    notice = timedelta(hours=2)
    appointment = make_appointment()
    with pytest.raises(CancellationTooLateError):
        appointment.cancel_by_citizen(START - timedelta(hours=1), notice)
    appointment.cancel_by_citizen(START - timedelta(hours=3), notice)
    assert appointment.status is AppointmentStatus.CANCELLED_BY_CITIZEN
    assert not appointment.occupies_slot
    with pytest.raises(AppointmentNotCancellableError):
        appointment.cancel_by_citizen(START - timedelta(hours=3), notice)


def test_city_cancellation_keeps_the_reason() -> None:
    appointment = make_appointment()
    appointment.cancel_by_city("Agent absent", START - timedelta(hours=1))
    assert appointment.status is AppointmentStatus.CANCELLED_BY_CITY
    assert appointment.cancel_reason == "Agent absent"


def test_attendance_only_once_started() -> None:
    appointment = make_appointment()
    with pytest.raises(AttendanceTooEarlyError):
        appointment.record_attendance(AppointmentStatus.HONORED, START - timedelta(minutes=5))
    appointment.record_attendance(AppointmentStatus.NO_SHOW, START + timedelta(minutes=40))
    assert appointment.status is AppointmentStatus.NO_SHOW
    assert appointment.occupies_slot  # un absent n'ouvre pas le créneau passé


# ─── quels rappels envoyer maintenant ───


def test_no_reminder_before_its_time() -> None:
    assert reminder_to_send(make_appointment(), START - timedelta(hours=25)) is None


def test_day_before_reminder_is_due_after_its_time() -> None:
    assert (
        reminder_to_send(make_appointment(), START - timedelta(hours=23)) is ReminderDelay.ONE_DAY
    )


def test_closest_reminder_supersedes_older_ones() -> None:
    # Serveur arrêté : 24 h et 1 h sont arrivés ensemble, seul le rappel 1 h part.
    assert (
        reminder_to_send(make_appointment(), START - timedelta(minutes=30))
        is ReminderDelay.ONE_HOUR
    )


def test_reminder_older_than_the_booking_is_not_sent() -> None:
    late_booking = make_appointment(created_at=START - timedelta(hours=5))
    assert reminder_to_send(late_booking, START - timedelta(hours=4)) is None
    assert reminder_to_send(late_booking, START - timedelta(minutes=50)) is ReminderDelay.ONE_HOUR


def test_no_reminder_when_cancelled_started_or_none_chosen() -> None:
    now = START - timedelta(minutes=30)
    cancelled = make_appointment(status=AppointmentStatus.CANCELLED_BY_CITIZEN)
    assert reminder_to_send(cancelled, now) is None
    assert reminder_to_send(make_appointment(), START + timedelta(minutes=1)) is None
    assert reminder_to_send(make_appointment(reminders=()), now) is None


def test_channels_follow_the_confirmed_contacts_of_the_account() -> None:
    assert channels_for(email="a@b.mg", email_verified=True, phone=None, phone_verified=False) == [
        NoticeChannel.IN_APP,
        NoticeChannel.EMAIL,
    ]
    assert channels_for(
        email="a@b.mg", email_verified=False, phone="+261340000000", phone_verified=True
    ) == [NoticeChannel.IN_APP, NoticeChannel.SMS]


def make_notice(**overrides) -> AppointmentNotice:
    values = {
        "id": "n1",
        "appointment_id": "appt-1",
        "user_id": "c1",
        "kind": NoticeKind.REMINDER,
        "channel": NoticeChannel.EMAIL,
        "delay": "24h",
        "title": "Rappel",
        "message": "…",
        "created_at": START - timedelta(hours=24),
    }
    return AppointmentNotice(**{**values, **overrides})


def test_failed_delivery_is_retried_later_a_limited_number_of_times() -> None:
    policy = DeliveryPolicy(max_attempts=3, retry_after=timedelta(minutes=2))
    now = START - timedelta(hours=20)
    assert should_attempt(make_notice(), now, policy)
    failed = make_notice(status=NoticeStatus.FAILED, attempts=1, last_attempt_at=now)
    assert not should_attempt(failed, now + timedelta(minutes=1), policy)
    assert should_attempt(failed, now + timedelta(minutes=3), policy)
    exhausted = make_notice(status=NoticeStatus.FAILED, attempts=3, last_attempt_at=now)
    assert not should_attempt(exhausted, now + timedelta(hours=1), policy)
    assert not should_attempt(make_notice(status=NoticeStatus.SENT), now, policy)


def test_interrupted_delivery_is_resumed_only_when_stale() -> None:
    policy = DeliveryPolicy(stale_after=timedelta(minutes=10))
    now = START - timedelta(hours=20)
    sending = make_notice(status=NoticeStatus.SENDING, attempts=1, last_attempt_at=now)
    assert not should_attempt(sending, now + timedelta(minutes=5), policy)
    assert should_attempt(sending, now + timedelta(minutes=11), policy)


def test_pending_reminder_becomes_irrelevant_after_cancellation() -> None:
    now = START - timedelta(hours=2)
    assert still_relevant(make_notice(), make_appointment(), now)
    cancelled = make_appointment(status=AppointmentStatus.CANCELLED_BY_CITY)
    assert not still_relevant(make_notice(), cancelled, now)
    cancel_notice = make_notice(kind=NoticeKind.CANCELLED_BY_CITY, delay="-")
    assert still_relevant(cancel_notice, cancelled, now)


# ─── messages ───


def test_reminder_and_calendar_contain_everything_needed() -> None:
    appointment = make_appointment()
    message = reminder_message(appointment, ReminderDelay.ONE_DAY, TANA)
    assert "lundi 12 octobre 2026 à 09:30" in message.title
    for expected in ("RDV-20261012-ABC123", "Hôtel de ville", "Carte d'identité", "UTC+3"):
        assert expected in message.text
    assert "RDV-20261012-ABC123" in message.sms

    ics = to_ics(appointment, TANA, START - timedelta(days=1))
    assert "DTSTART:20261012T063000Z" in ics
    assert "DTEND:20261012T070000Z" in ics
    assert all(len(line.encode()) <= 75 for line in ics.split("\r\n"))
