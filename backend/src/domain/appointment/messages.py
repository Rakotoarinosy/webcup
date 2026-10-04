"""Textes envoyés à l'habitant (rappel, annulation) et fichier agenda (.ics). Python pur."""

from dataclasses import dataclass
from datetime import datetime, tzinfo

from src.domain.appointment.entities import (
    MODALITY_INSTRUCTIONS,
    MODALITY_LABELS,
    REMINDER_LABELS,
    Appointment,
    ReminderDelay,
)
from src.domain.appointment.timing import describe

APP_NAME = "Terra Nova"


@dataclass(frozen=True)
class NoticeMessage:
    title: str  # objet de l'email, titre de la notification
    text: str  # corps complet (email, notification)
    sms: str  # version courte


def _who(appointment: Appointment) -> str:
    slot = appointment.slot
    return f"{slot.agent_name} ({slot.institut_name})" if slot.agent_name else slot.institut_name


def _details(appointment: Appointment, tz: tzinfo) -> list[str]:
    slot = appointment.slot
    when = describe(slot.starts_at, slot.ends_at, tz)
    lines = [
        f"Référence : {appointment.reference}",
        f"Quand : {when.full_label}",
        f"Avec : {_who(appointment)}",
        f"Modalité : {MODALITY_LABELS[slot.modality]}",
        f"Lieu : {slot.location}",
        f"Motif : {appointment.reason}",
    ]
    if slot.preparation:
        lines.append(f"À apporter / préparer : {slot.preparation}")
    lines.append(MODALITY_INSTRUCTIONS[slot.modality])
    return lines


def reminder_message(appointment: Appointment, delay: ReminderDelay, tz: tzinfo) -> NoticeMessage:
    when = describe(appointment.slot.starts_at, appointment.slot.ends_at, tz)
    title = f"Rappel : rendez-vous le {when.day_label} à {when.start_time}"
    text = "\n".join(
        [
            f"Rappel ({REMINDER_LABELS[delay]}) de votre rendez-vous {APP_NAME}.",
            "",
            *_details(appointment, tz),
            "",
            "Vous ne pouvez pas venir ? Annulez depuis « Mes rendez-vous » pour libérer le créneau.",
        ]
    )
    sms = (
        f"{APP_NAME}: rappel RDV {appointment.reference} le {when.day:%d/%m/%Y} a "
        f"{when.start_time} ({when.utc_offset}), {appointment.slot.location}."
    )
    return NoticeMessage(title=title, text=text, sms=sms)


def cancellation_message(appointment: Appointment, tz: tzinfo) -> NoticeMessage:
    when = describe(appointment.slot.starts_at, appointment.slot.ends_at, tz)
    title = f"Rendez-vous du {when.day_label} annulé par la mairie"
    text = "\n".join(
        [
            f"La mairie a annulé votre rendez-vous {appointment.reference} "
            f"du {when.day_label} à {when.start_time} ({when.utc_offset}).",
            f"Motif : {appointment.cancel_reason or 'non précisé'}",
            "",
            "Vous pouvez reprendre un rendez-vous depuis « Prendre rendez-vous ».",
        ]
    )
    sms = (
        f"{APP_NAME}: votre RDV {appointment.reference} du {when.day:%d/%m/%Y} a "
        f"{when.start_time} est annule par la mairie. Motif: {appointment.cancel_reason or '-'}"
    )
    return NoticeMessage(title=title, text=text, sms=sms[:300])


def _ics_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def _ics_time(moment: datetime) -> str:
    return f"{moment:%Y%m%dT%H%M%SZ}"


def _fold(line: str) -> str:
    """Lignes de 75 octets au plus (RFC 5545)."""
    out: list[str] = []
    current = ""
    for char in line:
        if len((current + char).encode("utf-8")) > 75:
            out.append(current)
            current = " " + char
        else:
            current += char
    out.append(current)
    return "\r\n".join(out)


def to_ics(appointment: Appointment, tz: tzinfo, now: datetime) -> str:
    """Événement agenda : horaires en UTC (aucune ambiguïté de fuseau), rappel 1 h avant."""
    slot = appointment.slot
    description = "\n".join(_details(appointment, tz))
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        f"PRODID:-//{APP_NAME}//Rendez-vous//FR",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        f"UID:{appointment.id}@terra-nova",
        f"DTSTAMP:{_ics_time(now)}",
        f"DTSTART:{_ics_time(slot.starts_at)}",
        f"DTEND:{_ics_time(slot.ends_at)}",
        f"SUMMARY:{_ics_escape(f'Rendez-vous {slot.institut_name} ({appointment.reference})')}",
        f"LOCATION:{_ics_escape(slot.location)}",
        f"DESCRIPTION:{_ics_escape(description)}",
        "STATUS:CONFIRMED",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        "TRIGGER:-PT1H",
        f"DESCRIPTION:{_ics_escape('Rendez-vous dans 1 heure')}",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
    ]
    return "\r\n".join(_fold(line) for line in lines) + "\r\n"
