"""Entités → réponses : chaque horaire est décrit dans le fuseau de la mairie."""

from datetime import datetime
from urllib.parse import quote

from src.domain.appointment import (
    MODALITY_INSTRUCTIONS,
    MODALITY_LABELS,
    REMINDER_LABELS,
    STATUS_LABELS,
    Appointment,
    AppointmentModality,
    Slot,
)
from src.domain.appointment.timing import describe
from src.features.appointment.schemas import (
    AppointmentOut,
    AppointmentStaffOut,
    SlotOut,
    SlotTimeOut,
)
from src.features.appointment.use_cases import AppointmentPolicy


def time_out(starts_at: datetime, ends_at: datetime, policy: AppointmentPolicy) -> SlotTimeOut:
    when = describe(starts_at, ends_at, policy.tz)
    return SlotTimeOut(
        starts_at=starts_at,
        ends_at=ends_at,
        day=when.day,
        day_label=when.day_label,
        start_time=when.start_time,
        end_time=when.end_time,
        utc_offset=when.utc_offset,
        timezone=policy.tz_name,
        duration_minutes=when.duration_minutes,
        label=when.full_label,
    )


def directions_url(slot: Slot) -> str | None:
    if slot.modality is not AppointmentModality.IN_PERSON:
        return None
    return "https://www.google.com/maps/dir/?api=1&destination=" + quote(slot.location)


def slot_out(slot: Slot, policy: AppointmentPolicy) -> SlotOut:
    return SlotOut(
        id=slot.id,
        institut_id=slot.institut_id,
        institut_name=slot.institut_name,
        agent_id=slot.agent_id,
        agent_name=slot.agent_name,
        modality=slot.modality,
        modality_label=MODALITY_LABELS[slot.modality],
        location=slot.location,
        preparation=slot.preparation,
        instructions=MODALITY_INSTRUCTIONS[slot.modality],
        directions_url=directions_url(slot),
        capacity=slot.capacity,
        is_open=slot.is_open,
        is_booked=slot.is_booked,
        time=time_out(slot.starts_at, slot.ends_at, policy),
    )


def appointment_out(
    appointment: Appointment, policy: AppointmentPolicy, now: datetime
) -> AppointmentOut:
    return AppointmentOut(**_fields(appointment, policy, now))


def appointment_staff_out(
    appointment: Appointment, policy: AppointmentPolicy, now: datetime
) -> AppointmentStaffOut:
    return AppointmentStaffOut(
        **_fields(appointment, policy, now),
        citizen_id=appointment.citizen_id,
        citizen_name=appointment.citizen_name,
        citizen_email=appointment.citizen_email,
        citizen_phone=appointment.citizen_phone,
    )


def _fields(appointment: Appointment, policy: AppointmentPolicy, now: datetime) -> dict:  # type: ignore[type-arg]
    return {
        "id": appointment.id,
        "reference": appointment.reference,
        "status": appointment.status,
        "status_label": STATUS_LABELS[appointment.status],
        "reason": appointment.reason,
        "reminders": list(appointment.reminders),
        "reminder_labels": [REMINDER_LABELS[delay] for delay in appointment.reminders],
        "contact_phone": appointment.contact_phone,
        "created_at": appointment.created_at,
        "cancelled_at": appointment.cancelled_at,
        "cancel_reason": appointment.cancel_reason,
        "attendance_recorded_at": appointment.attendance_recorded_at,
        "is_upcoming": appointment.is_upcoming(now),
        "can_cancel": appointment.can_be_cancelled_by_citizen(now, policy.cancellation_notice),
        "cancellation_deadline": appointment.cancellation_deadline(policy.cancellation_notice),
        "slot": slot_out(appointment.slot, policy),
    }
