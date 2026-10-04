"""Use cases des transports municipaux (F36).

Consultation publique : recherche d'une ligne ou d'un arrêt, prochains passages calculés à partir
des horaires théoriques, perturbations en premier. Gestion : mise à jour de l'état d'une ligne
par un administrateur ou un manager, tracée dans le journal d'audit.
"""

import unicodedata
from datetime import UTC, datetime, tzinfo

from src.domain.audit import AuditAction, AuditTarget
from src.domain.transport import (
    TransportLine,
    TransportLineNotFoundError,
    TransportRepository,
)
from src.features.audit.recording import AuditTrail, record
from src.features.transport.schemas import TransportLineOut, TransportStopOut, UpdateLineStatusIn


def _normalize(text: str) -> str:
    decomposed = unicodedata.normalize("NFD", text)
    return "".join(c for c in decomposed if unicodedata.category(c) != "Mn").casefold().strip()


def _line_out(line: TransportLine, now: datetime, query: str = "") -> TransportLineOut:
    return TransportLineOut(
        id=line.id,
        code=line.code,
        name=line.name,
        mode=line.mode,
        first_departure=line.first_departure.strftime("%H:%M"),
        last_departure=line.last_departure.strftime("%H:%M"),
        frequency_minutes=line.frequency_minutes,
        days_label=line.days_label,
        status=line.status,
        status_message=line.status_message,
        status_updated_at=line.status_updated_at,
        stops=[
            TransportStopOut(
                id=stop.id,
                name=stop.name,
                position=stop.position,
                minutes_from_start=stop.minutes_from_start,
                latitude=stop.latitude,
                longitude=stop.longitude,
                next_passages=line.next_passages(stop.minutes_from_start, now),
                matches_search=bool(query) and query in _normalize(stop.name),
            )
            for stop in line.stops
        ],
        computed_at=now,
    )


def _matches(line: TransportLine, query: str) -> bool:
    haystack = [line.code, line.name, *(stop.name for stop in line.stops)]
    return any(query in _normalize(text) for text in haystack)


def list_transport_lines(
    repo: TransportRepository, timezone: tzinfo, query: str | None = None
) -> list[TransportLineOut]:
    now = datetime.now(timezone)
    wanted = _normalize(query or "")
    lines = [line for line in repo.list_lines() if not wanted or _matches(line, wanted)]
    lines.sort(key=lambda line: (line.status.severity, line.display_order, line.code))
    return [_line_out(line, now, wanted) for line in lines]


def get_transport_line(
    line_id: str, repo: TransportRepository, timezone: tzinfo
) -> TransportLineOut:
    line = repo.get_line(line_id)
    if line is None:
        raise TransportLineNotFoundError(line_id)
    return _line_out(line, datetime.now(timezone))


def change_line_status(
    line_id: str,
    dto: UpdateLineStatusIn,
    repo: TransportRepository,
    timezone: tzinfo,
    audit: AuditTrail | None = None,
) -> TransportLineOut:
    line = repo.get_line(line_id)
    if line is None:
        raise TransportLineNotFoundError(line_id)
    changed = line.change_status(dto.status, now=datetime.now(UTC), message=dto.message)
    saved = repo.save_status(changed)
    if saved is None:
        raise TransportLineNotFoundError(line_id)
    if (line.status, line.status_message) != (saved.status, saved.status_message):
        record(
            audit,
            AuditAction.TRANSPORT_LINE_STATUS_CHANGED,
            AuditTarget.TRANSPORT_LINE,
            saved.id,
            f"{saved.code} — {saved.name}",
            details={
                "status": {"from": line.status.value, "to": saved.status.value},
                "status_message": {"from": line.status_message, "to": saved.status_message},
            },
        )
    return _line_out(saved, datetime.now(timezone))
