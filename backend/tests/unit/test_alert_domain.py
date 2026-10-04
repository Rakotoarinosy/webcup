"""Règles des alertes, de la référence des demandes et de l'envoi des emails d'alerte."""

from datetime import UTC, datetime, timedelta

import pytest

from src.domain.alert import (
    Alert,
    AlertAlreadyEndedError,
    AlertAudience,
    AlertLevel,
    AlertMailer,
    AlertStatus,
    AlertZoneRequiredError,
    InvalidAlertPeriodError,
)
from src.domain.citizen_request import id_prefix_from_reference, request_reference
from src.features.alert.use_cases import send_alert_emails

NOW = datetime(2026, 10, 4, 12, 0, tzinfo=UTC)


def _alert(**overrides: object) -> Alert:
    fields: dict[str, object] = {
        "id": "a1",
        "title": "Vague de chaleur",
        "message": "Températures extrêmes attendues.",
        "level": AlertLevel.ATTENTION,
        "audience": AlertAudience.VULNERABLE,
        "issuer": "Haut Conseil de la Ville",
        "starts_at": NOW - timedelta(hours=1),
        "author_id": "u1",
        "author_name": "Admin",
        "created_at": NOW,
        "updated_at": NOW,
    }
    fields.update(overrides)
    return Alert(**fields)  # type: ignore[arg-type]


def test_status_follows_the_display_period() -> None:
    assert _alert().status(NOW) is AlertStatus.ACTIVE
    assert _alert(starts_at=NOW + timedelta(hours=1)).status(NOW) is AlertStatus.SCHEDULED
    expired = _alert(ends_at=NOW - timedelta(minutes=1), starts_at=NOW - timedelta(hours=2))
    assert expired.status(NOW) is AlertStatus.ENDED


def test_end_is_final() -> None:
    alert = _alert()
    alert.end(NOW)
    assert alert.status(NOW) is AlertStatus.ENDED
    assert alert.finished_at() == NOW
    with pytest.raises(AlertAlreadyEndedError):
        alert.end(NOW)


def test_invalid_alerts() -> None:
    with pytest.raises(InvalidAlertPeriodError):
        _alert(ends_at=NOW - timedelta(hours=2))
    with pytest.raises(AlertZoneRequiredError):
        _alert(audience=AlertAudience.NEIGHBOURHOOD, zone=" ")
    assert _alert(audience=AlertAudience.NEIGHBOURHOOD, zone="Quartier sud").zone == "Quartier sud"


def test_request_reference_round_trip() -> None:
    request_id = "1a2b3c4d-0000-4000-8000-000000000000"
    reference = request_reference(request_id, NOW)
    assert reference == "TN-2026-1A2B3C4D"
    assert id_prefix_from_reference(reference) == "1a2b3c4d"
    assert id_prefix_from_reference(" tn-2026-1a2b3c4d ") == "1a2b3c4d"
    assert id_prefix_from_reference("#1A2B3C4D") == "1a2b3c4d"
    assert id_prefix_from_reference("nid de poule") is None
    assert id_prefix_from_reference("TN-2026-XYZ") is None


class _FlakyMailer(AlertMailer):
    def __init__(self) -> None:
        self.sent: list[str] = []

    def send_alert(self, to: str, name: str, alert: Alert) -> None:
        if to.startswith("down"):
            raise ConnectionError("SMTP unreachable")
        self.sent.append(to)


def test_email_failures_do_not_stop_the_broadcast() -> None:
    mailer = _FlakyMailer()
    recipients = [("a@x.mg", "A"), ("down@x.mg", "B"), ("c@x.mg", "C")]
    assert send_alert_emails(_alert(), recipients, mailer) == 2
    assert mailer.sent == ["a@x.mg", "c@x.mg"]
