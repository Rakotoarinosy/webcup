from datetime import UTC, datetime, timedelta

import pytest

from src.domain.terra_request import (
    PipelineStatus,
    TerraFeedUnavailableError,
    TerraRequestNotFoundError,
)
from src.features.terra_request.schemas import UpdateTerraStatusIn
from src.features.terra_request.use_cases import (
    get_terra_pipeline,
    list_terra_notifications,
    list_terra_requests,
    mark_all_terra_notifications_read,
    mark_terra_notification_read,
    refresh_terra_if_stale,
    sync_terra_requests,
    update_terra_request_status,
)
from tests.fakes_terra import (
    FakeTerraFeed,
    FakeTerraRequestRepository,
    make_request,
    make_session,
)

T0 = datetime(2026, 10, 3, 8, 0, tzinfo=UTC)


@pytest.fixture
def feed() -> FakeTerraFeed:
    fake = FakeTerraFeed()
    fake.requests = [make_request("D01"), make_request("D19", xp_total=750, difficulty_level=3)]
    return fake


@pytest.fixture
def repo() -> FakeTerraRequestRepository:
    return FakeTerraRequestRepository()


def test_first_sync_adds_every_request_as_todo(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    report = sync_terra_requests(feed, repo, T0)

    assert sorted(report.new_codes) == ["D01", "D19"]
    assert all(r.status is PipelineStatus.TODO for r in repo.list_all())
    assert all(r.first_seen_at == T0 for r in repo.list_all())


def test_resync_never_duplicates_and_detects_new_codes(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    sync_terra_requests(feed, repo, T0)
    feed.requests.append(make_request("F30", is_initial=False, wave_number=1, xp_total=1410))

    report = sync_terra_requests(feed, repo, T0 + timedelta(seconds=30))

    assert report.new_codes == ["F30"]
    assert report.updated_codes == []
    assert len(repo.list_all()) == 3


def test_update_from_api_keeps_pipeline_status(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    sync_terra_requests(feed, repo, T0)
    repo.set_status("D01", PipelineStatus.IN_PROGRESS, T0)
    feed.requests[0] = make_request("D01", message_public="Texte corrigé")

    report = sync_terra_requests(feed, repo, T0 + timedelta(minutes=1))

    assert report.updated_codes == ["D01"]
    d01 = repo.get_by_code("D01")
    assert d01 is not None
    assert d01.message_public == "Texte corrigé"
    assert d01.status is PipelineStatus.IN_PROGRESS
    assert d01.first_seen_at == T0


def test_api_failure_is_recorded_then_raised(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    sync_terra_requests(feed, repo, T0)
    feed.fail = "Clé API Terra Nova refusée (403)"

    with pytest.raises(TerraFeedUnavailableError):
        sync_terra_requests(feed, repo, T0 + timedelta(seconds=30))

    session = repo.get_session()
    assert session.api_ok is False
    assert session.last_sync_error == "Clé API Terra Nova refusée (403)"
    assert session.last_sync_success_at == T0
    assert len(repo.list_all()) == 2  # les données connues restent disponibles


def test_next_wave_eta_stays_stable_between_syncs(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    sync_terra_requests(feed, repo, T0)
    first_eta = repo.get_session().next_wave_eta
    assert first_eta == T0 + timedelta(minutes=60)

    # 30 s plus tard l'API arrondit encore à 60 min : l'échéance ne doit pas reculer.
    sync_terra_requests(feed, repo, T0 + timedelta(seconds=30))
    assert repo.get_session().next_wave_eta == first_eta

    # Plus de vague planifiée : plus d'échéance.
    feed.session = make_session(next_wave_number=0, minutes_until_next_wave=0)
    sync_terra_requests(feed, repo, T0 + timedelta(minutes=1))
    assert repo.get_session().next_wave_eta is None


def test_refresh_if_stale_respects_interval_and_swallows_errors(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    interval = timedelta(seconds=30)
    refresh_terra_if_stale(feed, repo, T0, interval)
    refresh_terra_if_stale(feed, repo, T0 + timedelta(seconds=10), interval)
    assert feed.calls == 1

    feed.fail = "API Terra Nova injoignable"
    refresh_terra_if_stale(feed, repo, T0 + timedelta(seconds=31), interval)  # ne lève pas
    assert feed.calls == 2
    assert repo.get_session().last_sync_error == "API Terra Nova injoignable"


def test_status_update_and_pipeline(feed: FakeTerraFeed, repo: FakeTerraRequestRepository) -> None:
    sync_terra_requests(feed, repo, T0)

    updated = update_terra_request_status(
        "D19", UpdateTerraStatusIn(status=PipelineStatus.DONE), repo, T0
    )

    assert updated.status is PipelineStatus.DONE
    columns = dict(get_terra_pipeline(repo))
    assert [r.request_code for r in columns[PipelineStatus.DONE]] == ["D19"]
    assert [r.request_code for r in columns[PipelineStatus.TODO]] == ["D01"]
    with pytest.raises(TerraRequestNotFoundError):
        update_terra_request_status(
            "NOPE", UpdateTerraStatusIn(status=PipelineStatus.DONE), repo, T0
        )


def test_requests_are_sorted_by_xp(feed: FakeTerraFeed, repo: FakeTerraRequestRepository) -> None:
    sync_terra_requests(feed, repo, T0)

    assert [r.request_code for r in list_terra_requests(repo)] == ["D19", "D01"]


def test_notifications_per_request_and_per_wave_with_read_state_per_user(
    feed: FakeTerraFeed, repo: FakeTerraRequestRepository
) -> None:
    sync_terra_requests(feed, repo, T0)
    feed.requests.append(make_request("F30", is_initial=False, wave_number=1))
    sync_terra_requests(feed, repo, T0 + timedelta(hours=2))

    items, unread = list_terra_notifications("alice", repo)
    assert unread == 4  # D01, D19, F30 + « Vague 1 diffusée »
    assert {item.key for item in items} == {"D01", "D19", "F30", "wave:1"}
    assert items[0].created_at == T0 + timedelta(hours=2)

    mark_terra_notification_read("alice", "F30", repo, T0)
    assert list_terra_notifications("alice", repo)[1] == 3
    assert list_terra_notifications("bob", repo)[1] == 4  # lecture propre à chaque utilisateur

    assert mark_all_terra_notifications_read("alice", repo, T0) == 3
    assert list_terra_notifications("alice", repo, unread_only=True) == ([], 0)
