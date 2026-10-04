"""Règles métier pures : prochains passages (F36) et état d'un service (F38/F63)."""

from datetime import UTC, datetime, time, timedelta
from zoneinfo import ZoneInfo

import pytest

from src.domain.municipal_content import (
    InvalidExpectedReturnError,
    MunicipalService,
    ServiceStatus,
    ServiceStatusMessageRequiredError,
)
from src.domain.transport import LineStatus, LineStatusMessageRequiredError, TransportLine
from src.domain.transport.entities import TransportMode

TZ = ZoneInfo("Indian/Antananarivo")


def line(**extra: object) -> TransportLine:
    return TransportLine(
        id="l1",
        code="D1",
        name="Ligne",
        mode=TransportMode.BUS,
        first_departure=time(6, 0),
        last_departure=time(20, 0),
        frequency_minutes=15,
        days_label="Tous les jours",
        **extra,  # type: ignore[arg-type]
    )


def at(hour: int, minute: int, day: int = 4) -> datetime:
    return datetime(2026, 10, day, hour, minute, tzinfo=TZ)


def test_next_passages_follow_frequency_and_stop_offset() -> None:
    assert line().next_passages(0, at(8, 1)) == [at(8, 15), at(8, 30)]
    # Arrêt à 7 minutes du terminus : départs 8h00 → 8h07, 8h15 → 8h22.
    assert line().next_passages(7, at(8, 1)) == [at(8, 7), at(8, 22)]
    assert line().next_passages(0, at(8, 15), count=1) == [at(8, 15)]


def test_before_first_and_after_last_departure() -> None:
    assert line().next_passages(0, at(4, 0)) == [at(6, 0), at(6, 15)]
    # Après le dernier départ : les premiers passages du lendemain.
    assert line().next_passages(0, at(20, 30)) == [at(6, 0, day=5), at(6, 15, day=5)]
    assert line().next_passages(0, at(19, 50)) == [at(20, 0), at(6, 0, day=5)]


def test_interrupted_line_announces_nothing_and_needs_a_message() -> None:
    now = datetime.now(UTC)
    interrupted = line().change_status(LineStatus.INTERRUPTED, now=now, message=" Grève ")
    assert interrupted.status_message == "Grève"
    assert interrupted.next_passages(0, at(8, 0)) == []
    with pytest.raises(LineStatusMessageRequiredError):
        line().change_status(LineStatus.DISRUPTED, now=now, message="  ")
    assert interrupted.change_status(LineStatus.NORMAL, now=now).status_message is None


def service() -> MunicipalService:
    return MunicipalService(
        "s1", "État civil", "Admin", "", "", "", "pi-id-card", 1, False, 0, True
    )


def test_service_status_rules() -> None:
    now = datetime.now(UTC)
    assert ServiceStatus.DISRUPTED.can_start
    assert not ServiceStatus.MAINTENANCE.can_start
    assert not ServiceStatus.OUT_OF_SERVICE.can_start

    down = service().change_status(
        ServiceStatus.OUT_OF_SERVICE,
        now=now,
        message="Panne",
        expected_back_at=now + timedelta(hours=2),
        alternative="  ",
    )
    assert down.status_alternative is None
    assert down.status_updated_at == now
    back = down.change_status(ServiceStatus.AVAILABLE, now=now)
    assert (back.status_message, back.status_expected_back_at) == (None, None)

    with pytest.raises(ServiceStatusMessageRequiredError):
        service().change_status(ServiceStatus.MAINTENANCE, now=now)
    with pytest.raises(InvalidExpectedReturnError):
        service().change_status(
            ServiceStatus.MAINTENANCE, now=now, message="x", expected_back_at=now
        )
