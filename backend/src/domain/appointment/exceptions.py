"""Exceptions métier des rendez-vous (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class SlotNotFoundError(DomainError):
    def __init__(self, slot_id: str) -> None:
        super().__init__(f"Appointment slot '{slot_id}' not found")


class AppointmentNotFoundError(DomainError):
    def __init__(self, appointment_id: str) -> None:
        super().__init__(f"Appointment '{appointment_id}' not found")


class SlotAlreadyBookedConflictError(DomainError):  # → 409
    def __init__(self, slot_id: str) -> None:
        super().__init__(f"Appointment slot '{slot_id}' is already booked")


class SlotClosedError(DomainError):  # → 400
    def __init__(self, slot_id: str) -> None:
        super().__init__(f"Appointment slot '{slot_id}' is no longer offered")


class SlotInPastError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("This time slot has already started or is in the past")


class SlotOverlapConflictError(DomainError):  # → 409
    def __init__(self, agent_id: str) -> None:
        super().__init__(f"Agent '{agent_id}' already has a time slot overlapping this one")


class CitizenOverlapConflictError(DomainError):  # → 409
    def __init__(self) -> None:
        super().__init__("You already have an appointment at an overlapping time")


class InvalidSlotError(DomainError):  # → 400
    def __init__(self, message: str) -> None:
        super().__init__(message)


class CancellationTooLateError(DomainError):  # → 400
    def __init__(self, hours: int) -> None:
        super().__init__(f"Appointments can only be cancelled online up to {hours} hours before")


class AppointmentNotCancellableError(DomainError):  # → 400
    def __init__(self, reference: str) -> None:
        super().__init__(f"Appointment '{reference}' can no longer be cancelled")


class AttendanceTooEarlyError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("Attendance can only be recorded once the appointment has started")


class AttendanceNotRecordableError(DomainError):  # → 400
    def __init__(self, reference: str) -> None:
        super().__init__(f"Attendance cannot be recorded for cancelled appointment '{reference}'")


class ContactPhoneRequiredError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__("A phone number is required for a phone appointment")
