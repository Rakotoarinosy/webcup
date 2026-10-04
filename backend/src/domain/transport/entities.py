"""Transports municipaux (F36) : lignes, arrêts principaux, horaires théoriques et état.

Les horaires sont exprimés en heure locale de la ville (premier départ, dernier départ,
fréquence) : le prochain passage à un arrêt se déduit du temps de trajet depuis le terminus.
"""

from dataclasses import dataclass, replace
from datetime import datetime, time, timedelta
from enum import StrEnum

from src.domain.transport.exceptions import LineStatusMessageRequiredError


class TransportMode(StrEnum):
    BUS = "bus"
    MINIBUS = "minibus"  # taxi-be
    SHUTTLE = "shuttle"  # navette municipale


class LineStatus(StrEnum):
    NORMAL = "normal"
    DISRUPTED = "disrupted"  # retards, arrêts non desservis, déviation
    INTERRUPTED = "interrupted"  # aucune circulation

    @property
    def severity(self) -> int:
        """Ordre d'affichage : les interruptions d'abord, puis les perturbations."""
        return {LineStatus.INTERRUPTED: 0, LineStatus.DISRUPTED: 1, LineStatus.NORMAL: 2}[self]


@dataclass(frozen=True)
class TransportStop:
    id: str
    name: str
    position: int
    minutes_from_start: int
    latitude: float | None = None
    longitude: float | None = None


@dataclass(frozen=True)
class TransportLine:
    id: str
    code: str
    name: str
    mode: TransportMode
    first_departure: time
    last_departure: time
    frequency_minutes: int
    days_label: str
    stops: tuple[TransportStop, ...] = ()
    status: LineStatus = LineStatus.NORMAL
    status_message: str | None = None
    status_updated_at: datetime | None = None
    display_order: int = 0

    def change_status(
        self, status: LineStatus, *, now: datetime, message: str | None = None
    ) -> "TransportLine":
        if status is LineStatus.NORMAL:
            return replace(self, status=status, status_message=None, status_updated_at=now)
        if not (message and message.strip()):
            raise LineStatusMessageRequiredError()
        return replace(self, status=status, status_message=message.strip(), status_updated_at=now)

    def next_passages(
        self, minutes_from_start: int, now: datetime, count: int = 2
    ) -> list[datetime]:
        """Prochains passages théoriques à un arrêt, à partir de `now` (heure locale, avec fuseau).

        Aucun passage annoncé quand la ligne est interrompue : mieux vaut ne rien promettre.
        Après le dernier départ, les passages du lendemain matin sont proposés.
        """
        if self.status is LineStatus.INTERRUPTED or self.frequency_minutes <= 0:
            return []
        step = timedelta(minutes=self.frequency_minutes)
        offset = timedelta(minutes=minutes_from_start)
        passages: list[datetime] = []
        for day_offset in (0, 1):
            day = (now + timedelta(days=day_offset)).date()
            departure = datetime.combine(day, self.first_departure, tzinfo=now.tzinfo)
            last = datetime.combine(day, self.last_departure, tzinfo=now.tzinfo)
            if departure + offset < now <= last + offset:
                # Saute directement au premier départ utile plutôt que de parcourir la journée.
                skipped = (now - offset - departure) // step
                departure += skipped * step
            while departure <= last:
                passage = departure + offset
                if passage >= now:
                    passages.append(passage)
                    if len(passages) == count:
                        return passages
                departure += step
        return passages
