from datetime import UTC, datetime, timedelta

from sqlalchemy.orm import Session

from src.domain.terra_request import PipelineStatus
from src.infrastructure.external.terra_nova_feed import _to_request, _to_session
from src.infrastructure.persistence.terra_request_repository import (
    SqlAlchemyTerraRequestRepository,
)
from tests.fakes_terra import make_request, make_session

T0 = datetime(2026, 10, 3, 8, 0, tzinfo=UTC)


def test_save_sync_round_trip_with_aware_dates(db_session: Session) -> None:
    repo = SqlAlchemyTerraRequestRepository(db_session)
    request = make_request("D01", first_seen_at=T0, updated_at=T0)
    session = make_session(last_sync_attempt_at=T0, last_sync_success_at=T0)
    session.apply_snapshot(make_session(), T0)

    repo.save_sync([request], [], session)

    loaded = repo.get_by_code("D01")
    assert loaded is not None
    assert loaded.first_seen_at == T0
    assert loaded.first_seen_at.tzinfo is not None
    assert loaded.raw == request.raw
    stored = repo.get_session()
    assert stored.next_wave_eta == T0 + timedelta(minutes=60)
    assert stored.api_ok is True


def test_update_keeps_status_and_first_seen(db_session: Session) -> None:
    repo = SqlAlchemyTerraRequestRepository(db_session)
    repo.save_sync([make_request("D01", first_seen_at=T0, updated_at=T0)], [], make_session())
    repo.set_status("D01", PipelineStatus.VALIDATION, T0)

    changed = make_request("D01", message_public="v2", updated_at=T0 + timedelta(minutes=1))
    repo.save_sync([], [changed], make_session())

    loaded = repo.get_by_code("D01")
    assert loaded is not None
    assert loaded.message_public == "v2"
    assert loaded.status is PipelineStatus.VALIDATION
    assert loaded.first_seen_at == T0


def test_read_keys_are_idempotent(db_session: Session) -> None:
    repo = SqlAlchemyTerraRequestRepository(db_session)

    repo.mark_read("u1", ["D01", "D01", "wave:1"], T0)
    repo.mark_read("u1", ["D01"], T0)

    assert repo.read_keys("u1") == {"D01", "wave:1"}
    assert repo.read_keys("u2") == set()


def test_feed_parsing_normalises_api_types() -> None:
    # Extrait réel de l'API : wave_number null, is_ai_related entier, arrival_time vide.
    item = {
        "id": 1,
        "request_code": "D01",
        "requester_name": "Haut Conseil de la Ville",
        "requester_type": "Institution",
        "message_public": "Créer un compte",
        "difficulty": "Facile",
        "xp_base": 250,
        "xp_time_bonus": 0,
        "xp_total": 250,
        "is_ai_related": 0,
        "arrival_type": "debut",
        "wave_number": None,
        "arrival_time": "",
        "group_name": "Socle",
        "sort_order": 1,
        "is_initial": True,
        "is_ai_request": False,
        "difficulty_level": 1,
        "xp_available": 250,
        "visible_since_wave": 0,
    }

    request = _to_request(item)

    assert request.wave_number is None
    assert request.is_ai_related is False
    assert request.wave == 0
    assert request.raw == item
    session = _to_session({"status": "active", "is_running": True, "current_wave": "2"})
    assert session.current_wave == 2
    assert session.next_wave_number == 0
