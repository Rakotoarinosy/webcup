"""Le dashboard découpe les jours selon le calendrier local, y compris aux changements d'heure."""

from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest
from sqlalchemy.orm import Session

from src.domain.citizen_request import Actor, RequestStatus
from src.domain.user import Role
from src.features.citizen_request.use_cases import get_dashboard
from src.infrastructure.persistence.citizen_request_analytics import (
    SqlAlchemyCitizenRequestAnalytics,
)
from src.infrastructure.persistence.models import CitizenRequestModel, UserModel


@pytest.mark.parametrize(
    ("zone", "day"),
    [
        ("Indian/Antananarivo", "2026-10-04"),
        ("Europe/Paris", "2026-03-29"),
        ("Europe/Paris", "2026-10-25"),
    ],
)
def test_dashboard_counts_local_days_and_dst_boundaries(
    db_session: Session, zone: str, day: str
) -> None:
    tz = ZoneInfo(zone)
    start = datetime.fromisoformat(day).replace(tzinfo=tz)
    end = (start + timedelta(days=1)).replace(tzinfo=tz)
    instants = [start - timedelta(microseconds=1), start, end - timedelta(microseconds=1), end]
    db_session.add(UserModel(id="citizen", name="Rina", email="rina@test.mg"))
    db_session.add_all(
        [
            CitizenRequestModel(
                id=f"request-{index}",
                title="Dossier",
                description="Description",
                category="Autre",
                priority="Normale",
                status=RequestStatus.RESOLVED.value,
                citizen_id="citizen",
                location="Rue",
                created_at=instant.astimezone(UTC),
                updated_at=instant.astimezone(UTC),
                resolved_at=instant.astimezone(UTC),
            )
            for index, instant in enumerate(instants)
        ]
    )
    db_session.commit()

    stats = get_dashboard(
        Actor(user_id="admin", role=Role.ADMIN),
        SqlAlchemyCitizenRequestAnalytics(db_session),
        tz,
        now=(start + timedelta(hours=12)).astimezone(UTC),
    )

    assert stats.resolved == 4
    assert stats.resolved_today == 2
    assert len(stats.daily) == 7
    yesterday, today = stats.daily[-2], stats.daily[-1]
    assert yesterday.day == (start - timedelta(days=1)).date() and yesterday.created == 1
    assert today.day == start.date() and today.created == 2
    assert sum(item.created for item in stats.daily) == 3
