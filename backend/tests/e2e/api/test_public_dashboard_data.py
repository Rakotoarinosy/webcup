"""Public indicators use the configured local calendar without exposing identities."""

from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
from unittest.mock import patch
from zoneinfo import ZoneInfo

import pytest
from httpx import AsyncClient
from sqlalchemy.orm import Session

from src.domain.citizen_request import RequestStatus
from src.features.citizen_request import router
from src.infrastructure.persistence.models import CitizenRequestModel, UserModel

pytestmark = pytest.mark.anyio


@pytest.mark.parametrize(
    ("zone", "day"),
    [
        ("Indian/Antananarivo", "2026-10-04"),
        ("Europe/Paris", "2026-03-29"),
        ("Europe/Paris", "2026-10-25"),
    ],
)
async def test_public_dashboard_counts_local_days_and_dst_boundaries(
    client: AsyncClient,
    db_session: Session,
    monkeypatch: pytest.MonkeyPatch,
    zone: str,
    day: str,
) -> None:
    start = datetime.fromisoformat(day).replace(tzinfo=ZoneInfo(zone))
    end = start + timedelta(days=1)
    instants = [start - timedelta(microseconds=1), start, end - timedelta(microseconds=1), end]
    db_session.add(
        UserModel(id="private-citizen", name="Private identity", email="private@test.mg")
    )
    db_session.add_all(
        [
            CitizenRequestModel(
                id=f"request-{index}",
                title="Private title",
                description="Private description",
                category="Autre",
                priority="Normale",
                status=RequestStatus.RESOLVED.value,
                citizen_id="private-citizen",
                location="Private address",
                created_at=instant.astimezone(UTC),
                resolved_at=instant.astimezone(UTC),
            )
            for index, instant in enumerate(instants)
        ]
    )
    db_session.commit()
    monkeypatch.setattr(router, "get_settings", lambda: SimpleNamespace(app_timezone=zone))
    with patch("src.features.citizen_request.use_cases.datetime", wraps=datetime) as clock:
        clock.now.return_value = (start + timedelta(hours=12)).astimezone(UTC)
        response = await client.get("/api/v1/dashboard")

    assert response.status_code == 200
    body = response.json()
    assert body["resolved_requests"] == 4
    assert body["today_interventions"] == 2
    days = body["requests_last_7_days"]
    assert len(days) == 7
    assert days[-2] == {"date": (start - timedelta(days=1)).date().isoformat(), "count": 1}
    assert days[-1] == {"date": day, "count": 2}
    assert sum(item["count"] for item in days) == 3
    assert "Private" not in response.text
    assert "private-citizen" not in response.text
