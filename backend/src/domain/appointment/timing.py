"""Dates sans ambiguïté et génération de séries de créneaux, dans le fuseau de la mairie.

Les créneaux sont stockés en UTC mais pensés en heure locale : « tous les mardis à 9 h »
reste 9 h locales. Les libellés sont écrits en toutes lettres (« lundi 5 octobre 2026 »)
et précisent toujours le fuseau, pour qu'aucun habitant ne se trompe d'heure.
"""

from dataclasses import dataclass
from datetime import UTC, date, datetime, time, timedelta, tzinfo

from src.domain.appointment.exceptions import InvalidSlotError

WEEKDAYS = ("lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche")
MONTHS = (
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
)

MIN_DURATION_MINUTES = 5
MAX_DURATION_MINUTES = 8 * 60
MAX_SERIES_DAYS = 92
MAX_SERIES_SLOTS = 400


def day_label(day: date) -> str:
    """« jeudi 1er octobre 2026 »."""
    number = "1er" if day.day == 1 else str(day.day)
    return f"{WEEKDAYS[day.weekday()]} {number} {MONTHS[day.month - 1]} {day.year}"


def utc_offset_label(moment: datetime, tz: tzinfo) -> str:
    """« UTC+3 », « UTC+5:30 », « UTC »."""
    offset = moment.astimezone(tz).utcoffset() or timedelta(0)
    minutes = int(offset.total_seconds() // 60)
    if minutes == 0:
        return "UTC"
    sign = "+" if minutes > 0 else "-"
    hours, rest = divmod(abs(minutes), 60)
    return f"UTC{sign}{hours}" + (f":{rest:02d}" if rest else "")


def timezone_label(tz_name: str, moment: datetime, tz: tzinfo) -> str:
    """« heure de la mairie (Indian/Antananarivo, UTC+3) »."""
    return f"heure de la mairie ({tz_name}, {utc_offset_label(moment, tz)})"


@dataclass(frozen=True)
class SlotTime:
    day: date  # jour local
    day_label: str
    start_time: str  # « 09:30 », heure locale
    end_time: str
    utc_offset: str
    duration_minutes: int

    @property
    def full_label(self) -> str:
        return (
            f"{self.day_label} de {self.start_time} à {self.end_time} "
            f"({self.utc_offset}, durée {duration_label(self.duration_minutes)})"
        )


def duration_label(minutes: int) -> str:
    hours, rest = divmod(minutes, 60)
    if hours and rest:
        return f"{hours} h {rest:02d}"
    if hours:
        return f"{hours} h"
    return f"{rest} min"


def describe(starts_at: datetime, ends_at: datetime, tz: tzinfo) -> SlotTime:
    local_start = starts_at.astimezone(tz)
    local_end = ends_at.astimezone(tz)
    return SlotTime(
        day=local_start.date(),
        day_label=day_label(local_start.date()),
        start_time=f"{local_start:%H:%M}",
        end_time=f"{local_end:%H:%M}",
        utc_offset=utc_offset_label(starts_at, tz),
        duration_minutes=int((ends_at - starts_at).total_seconds() // 60),
    )


def local_to_utc(day: date, at: time, tz: tzinfo) -> datetime:
    return datetime.combine(day, at, tzinfo=tz).astimezone(UTC)


def local_day_bounds(day: date, tz: tzinfo) -> tuple[datetime, datetime]:
    """[début, fin[ d'un jour local, en UTC."""
    start = local_to_utc(day, time(0, 0), tz)
    end = local_to_utc(day + timedelta(days=1), time(0, 0), tz)
    return start, end


def check_duration(minutes: int) -> None:
    if not MIN_DURATION_MINUTES <= minutes <= MAX_DURATION_MINUTES:
        raise InvalidSlotError(
            f"Slot duration must be between {MIN_DURATION_MINUTES} and {MAX_DURATION_MINUTES} minutes"
        )


@dataclass(frozen=True)
class SlotSeries:
    """« Du 5 au 30 octobre, les lundis et jeudis, de 9 h à 12 h, créneaux de 30 min. »"""

    first_day: date
    last_day: date
    weekdays: frozenset[int]  # 0 = lundi … 6 = dimanche
    day_start: time
    day_end: time
    duration_minutes: int
    break_minutes: int = 0


def series_times(series: SlotSeries, tz: tzinfo) -> list[tuple[datetime, datetime]]:
    """Début et fin (UTC) de chaque créneau de la série, dans l'ordre chronologique."""
    check_duration(series.duration_minutes)
    if series.last_day < series.first_day:
        raise InvalidSlotError("The last day must be on or after the first day")
    if (series.last_day - series.first_day).days >= MAX_SERIES_DAYS:
        raise InvalidSlotError(f"A series cannot span more than {MAX_SERIES_DAYS} days")
    if not series.weekdays or not series.weekdays <= set(range(7)):
        raise InvalidSlotError("Choose at least one valid weekday")
    if series.day_end <= series.day_start:
        raise InvalidSlotError("The end time must be after the start time")
    if series.break_minutes < 0:
        raise InvalidSlotError("The break cannot be negative")

    step = timedelta(minutes=series.duration_minutes + series.break_minutes)
    length = timedelta(minutes=series.duration_minutes)
    times: list[tuple[datetime, datetime]] = []
    day = series.first_day
    while day <= series.last_day:
        if day.weekday() in series.weekdays:
            cursor = datetime.combine(day, series.day_start, tzinfo=tz)
            day_end = datetime.combine(day, series.day_end, tzinfo=tz)
            while cursor + length <= day_end:
                times.append((cursor.astimezone(UTC), (cursor + length).astimezone(UTC)))
                cursor += step
        day += timedelta(days=1)

    if not times:
        raise InvalidSlotError("This series produces no time slot")
    if len(times) > MAX_SERIES_SLOTS:
        raise InvalidSlotError(f"A series cannot create more than {MAX_SERIES_SLOTS} slots")
    return times
