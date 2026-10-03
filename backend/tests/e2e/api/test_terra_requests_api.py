from collections.abc import Iterator
from datetime import UTC, datetime

import httpx
import pytest

from src.domain.user import Role, User
from src.features.terra_request.router import get_terra_feed
from src.infrastructure.security.deps import get_current_user
from src.main import app
from tests.fakes_terra import FakeTerraFeed, make_request

pytestmark = pytest.mark.anyio

TERRA = "/api/v1/terra-requests"


def _user(role: Role) -> User:
    return User(
        id=f"{role.value}-id",
        email=f"{role.value}@test.mg",
        name=role.value,
        created_at=datetime.now(UTC),
        password_hash="",
        role=role,
    )


@pytest.fixture
def feed() -> Iterator[FakeTerraFeed]:
    fake = FakeTerraFeed()
    fake.requests = [
        make_request("D01", xp_total=250, difficulty_level=1),
        make_request("D19", xp_total=750, difficulty_level=3),
    ]
    app.dependency_overrides[get_terra_feed] = lambda: fake
    app.dependency_overrides[get_current_user] = lambda: _user(Role.AGENT)
    yield fake
    app.dependency_overrides.pop(get_terra_feed, None)
    app.dependency_overrides.pop(get_current_user, None)


async def test_session_read_syncs_then_requests_are_listed(
    client: httpx.AsyncClient, feed: FakeTerraFeed
) -> None:
    response = await client.get(f"{TERRA}/session")
    assert response.status_code == 200
    body = response.json()
    assert body["session"]["status"] == "active"
    assert body["session"]["api_ok"] is True
    assert body["session"]["next_wave_eta"] is not None
    assert body["sync_interval_seconds"] == 30

    # Lecture rapprochée : pas de nouvel appel à l'API.
    await client.get(f"{TERRA}/session")
    assert feed.calls == 1

    listed = (await client.get(TERRA)).json()
    assert [r["request_code"] for r in listed] == ["D19", "D01"]
    assert listed[0]["status"] == "todo"
    assert listed[0]["wave"] == 0


async def test_manual_sync_detects_new_request_and_status_flow(
    client: httpx.AsyncClient, feed: FakeTerraFeed
) -> None:
    await client.post(f"{TERRA}/sync")
    feed.requests.append(make_request("F30", is_initial=False, wave_number=1))

    report = (await client.post(f"{TERRA}/sync")).json()
    assert report == {"new_codes": ["F30"], "updated_codes": []}

    response = await client.patch(f"{TERRA}/F30/status", json={"status": "in_progress"})
    assert response.status_code == 200
    assert response.json()["status"] == "in_progress"
    assert (await client.get(f"{TERRA}/F30")).json()["status"] == "in_progress"

    pipeline = (await client.get(f"{TERRA}/pipeline")).json()
    assert [c["status"] for c in pipeline] == ["todo", "in_progress", "validation", "done"]
    assert [r["request_code"] for r in pipeline[1]["requests"]] == ["F30"]

    assert (await client.patch(f"{TERRA}/F30/status", json={"status": "x"})).status_code == 422
    assert (await client.get(f"{TERRA}/NOPE")).status_code == 404


async def test_notifications_read_flow(client: httpx.AsyncClient, feed: FakeTerraFeed) -> None:
    await client.post(f"{TERRA}/sync")

    body = (await client.get(f"{TERRA}/notifications")).json()
    assert body["unread_count"] == 2

    assert (await client.post(f"{TERRA}/notifications/D19/read")).status_code == 204
    assert (await client.get(f"{TERRA}/notifications")).json()["unread_count"] == 1

    assert (await client.post(f"{TERRA}/notifications/read-all")).status_code == 204
    body = (await client.get(f"{TERRA}/notifications?unread_only=true")).json()
    assert body == {"items": [], "unread_count": 0}


async def test_api_failure_returns_503_and_is_exposed_in_session(
    client: httpx.AsyncClient, feed: FakeTerraFeed
) -> None:
    feed.fail = "Clé API Terra Nova refusée (403)"

    response = await client.post(f"{TERRA}/sync")
    assert response.status_code == 503

    session = (await client.get(f"{TERRA}/session")).json()["session"]
    assert session["api_ok"] is False
    assert session["last_sync_error"] == "Clé API Terra Nova refusée (403)"


async def test_citizens_cannot_access(client: httpx.AsyncClient, feed: FakeTerraFeed) -> None:
    app.dependency_overrides[get_current_user] = lambda: _user(Role.CITIZEN)

    assert (await client.get(TERRA)).status_code == 403
    assert (await client.get(f"{TERRA}/notifications")).status_code == 403
