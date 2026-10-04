"""D18, F29, F31, F73, F30 : alertes et messages officiels diffusés à tous les habitants."""

from collections.abc import Iterator
from datetime import UTC, datetime, timedelta

import httpx
import pytest

from src.domain.alert import (
    Alert,
    AlertMailer,
    AlertRecommender,
    RecommendationRequest,
    RecommendationUnavailableError,
)
from src.features.alert.router import get_alert_mailer, get_alert_recommender
from src.main import app
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

ALERTS = f"{API}/alerts"

FLOOD = {
    "title": "Montée des eaux dans le quartier sud",
    "message": "Une montée inhabituelle du niveau de l'eau est observée dans le quartier sud.",
    "instructions": "Éloignez-vous des berges. Montez à l'étage si l'eau entre chez vous.",
    "level": "Urgence",
    "audience": "Habitants du quartier concerné",
    "zone": "Quartier sud",
    "issuer": "Centre de surveillance environnementale",
}


class FakeMailer(AlertMailer):
    def __init__(self) -> None:
        self.sent: list[tuple[str, str]] = []
        self.fail_for: set[str] = set()

    def send_alert(self, to: str, name: str, alert: Alert) -> None:
        if to in self.fail_for:
            raise OSError("SMTP down")
        self.sent.append((to, alert.title))


class FakeRecommender(AlertRecommender):
    def __init__(self) -> None:
        self.fail = False
        self.seen: RecommendationRequest | None = None

    def recommend(self, request: RecommendationRequest) -> str:
        if self.fail:
            raise RecommendationUnavailableError()
        self.seen = request
        return "- Buvez de l'eau régulièrement.\n- Prenez des nouvelles de vos voisins âgés."


@pytest.fixture
def mailer() -> Iterator[FakeMailer]:
    fake = FakeMailer()
    app.dependency_overrides[get_alert_mailer] = lambda: fake
    yield fake
    app.dependency_overrides.pop(get_alert_mailer, None)


@pytest.fixture
def recommender() -> Iterator[FakeRecommender]:
    fake = FakeRecommender()
    app.dependency_overrides[get_alert_recommender] = lambda: fake
    yield fake
    app.dependency_overrides.pop(get_alert_recommender, None)


async def _publish(platform: Platform, key: str = "admin", **overrides: object) -> httpx.Response:
    return await platform.client.post(
        ALERTS, headers=platform.as_(key), json={**FLOOD, **overrides}
    )


async def _public_get(platform: Platform, path: str) -> httpx.Response:
    # Sans en-tête d'authentification : le bandeau est visible sans connexion.
    return await platform.client.get(path, headers={"Authorization": ""})


async def test_published_alert_is_visible_to_everyone_without_login(platform: Platform) -> None:
    created = await _publish(platform)
    assert created.status_code == 201, created.text
    body = created.json()
    assert body["status"] == "En cours"
    assert body["author_name"] == "Admin"
    assert body["email_recipients"] == 0

    current = await _public_get(platform, f"{ALERTS}/current")
    assert current.status_code == 200
    [alert] = current.json()
    assert alert["title"] == FLOOD["title"]
    assert alert["level"] == "Urgence"
    assert alert["instructions"].startswith("Éloignez-vous")
    assert alert["zone"] == "Quartier sud"
    assert alert["issuer"] == "Centre de surveillance environnementale"
    assert "author_id" not in alert  # vue publique


async def test_most_severe_alert_comes_first(platform: Platform) -> None:
    await _publish(
        platform,
        title="Information générale",
        level="Information",
        audience="Tous les habitants",
        zone=None,
    )
    await _publish(
        platform,
        title="Vigilance chaleur",
        level="Attention",
        audience="Personnes vulnérables",
        zone=None,
    )
    await _publish(platform)

    titles = [alert["title"] for alert in (await _public_get(platform, f"{ALERTS}/current")).json()]
    assert titles == [FLOOD["title"], "Vigilance chaleur", "Information générale"]


async def test_only_admin_and_managers_publish(platform: Platform) -> None:
    assert (await _publish(platform, "c1")).status_code == 403
    assert (await _publish(platform, "ua1")).status_code == 403
    assert (await _public_get(platform, ALERTS)).status_code == 401
    assert (await _publish(platform, "m1")).status_code == 201


async def test_invalid_alerts_are_rejected(platform: Platform) -> None:
    no_zone = await _publish(platform, zone="  ")
    assert no_zone.status_code == 400
    assert no_zone.json()["error"] == "AlertZoneRequiredError"

    now = datetime.now(UTC)
    backwards = await _publish(
        platform,
        starts_at=(now + timedelta(hours=2)).isoformat(),
        ends_at=(now + timedelta(hours=1)).isoformat(),
    )
    assert backwards.status_code == 400
    assert (await _publish(platform, level="Rouge")).status_code == 422


async def test_scheduled_and_ended_alerts(platform: Platform) -> None:
    later = (datetime.now(UTC) + timedelta(days=1)).isoformat()
    scheduled = (await _publish(platform, title="Coupure programmée", starts_at=later)).json()
    assert scheduled["status"] == "Programmée"
    current = (await _publish(platform)).json()

    assert [a["id"] for a in (await _public_get(platform, f"{ALERTS}/current")).json()] == [
        current["id"]
    ]

    ended = await platform.client.post(f"{ALERTS}/{current['id']}/end", headers=platform.admin)
    assert ended.status_code == 200
    assert ended.json()["status"] == "Terminée"
    assert (await _public_get(platform, f"{ALERTS}/current")).json() == []
    again = await platform.client.post(f"{ALERTS}/{current['id']}/end", headers=platform.admin)
    assert again.status_code == 400

    history = (await _public_get(platform, f"{ALERTS}/history")).json()
    assert [(a["id"], a["status"]) for a in history] == [(current["id"], "Terminée")]

    staff = (await platform.client.get(ALERTS, headers=platform.admin)).json()
    assert {a["id"] for a in staff} == {scheduled["id"], current["id"]}


async def test_managers_manage_only_their_own_alerts(platform: Platform) -> None:
    alert = (await _publish(platform, "m1")).json()
    url = f"{ALERTS}/{alert['id']}"
    edited = {**FLOOD, "title": "Montée des eaux : quartier sud et berges"}

    assert (
        await platform.client.put(url, headers=platform.as_("m2"), json=edited)
    ).status_code == 403
    assert (await platform.client.post(f"{url}/end", headers=platform.as_("m2"))).status_code == 403
    listed = (await platform.client.get(ALERTS, headers=platform.as_("m2"))).json()
    assert listed[0]["can_manage"] is False

    updated = await platform.client.put(url, headers=platform.as_("m1"), json=edited)
    assert updated.status_code == 200
    assert updated.json()["title"] == edited["title"]

    assert (await platform.client.delete(url, headers=platform.as_("m1"))).status_code == 403
    assert (await platform.client.delete(url, headers=platform.admin)).status_code == 204
    assert (await platform.client.post(f"{url}/end", headers=platform.admin)).status_code == 404


async def test_alert_operations_are_journaled(platform: Platform) -> None:
    alert = (await _publish(platform, "m1")).json()
    url = f"{ALERTS}/{alert['id']}"
    await platform.client.put(url, headers=platform.as_("m1"), json={**FLOOD, "level": "Attention"})
    await platform.client.post(f"{url}/end", headers=platform.as_("m1"))

    entries = (
        await platform.client.get(
            f"{API}/audit", headers=platform.admin, params={"target_type": "alert"}
        )
    ).json()["items"]
    assert [entry["action"] for entry in entries] == [
        "alert_ended",
        "alert_updated",
        "alert_published",
    ]
    assert entries[1]["details"]["level"] == {"from": "Urgence", "to": "Attention"}
    assert entries[2]["actor_name"] == "Nom m1"


async def test_citizens_are_notified_of_a_new_alert(platform: Platform) -> None:
    alert = (await _publish(platform, "m1")).json()

    response = await platform.client.get(f"{API}/notifications", headers=platform.as_("c1"))
    body = response.json()
    [notification] = [item for item in body["items"] if item["kind"] == "alert"]
    assert notification["alert_id"] == alert["id"]
    assert notification["request_id"] is None
    assert notification["title"] == f"Urgence : {FLOOD['title']}"
    assert notification["is_read"] is False
    assert body["unread_count"] >= 1

    read = await platform.client.post(
        f"{API}/notifications/{notification['key']}/read", headers=platform.as_("c1")
    )
    assert read.status_code == 204
    after = (await platform.client.get(f"{API}/notifications", headers=platform.as_("c1"))).json()
    assert [i["is_read"] for i in after["items"] if i["kind"] == "alert"] == [True]

    # L'auteur n'est pas notifié de sa propre publication ; un manager sans institut l'est.
    own = (await platform.client.get(f"{API}/notifications", headers=platform.as_("m1"))).json()
    assert not [i for i in own["items"] if i["kind"] == "alert"]
    other = (await platform.client.get(f"{API}/notifications", headers=platform.as_("m3"))).json()
    assert [i["kind"] for i in other["items"]] == ["alert"]


async def test_email_is_optional_and_never_blocks_publication(
    platform: Platform, mailer: FakeMailer
) -> None:
    await _publish(platform)
    assert mailer.sent == []

    mailer.fail_for = {"c1@test.mg"}
    created = await _publish(platform, notify_by_email=True)
    assert created.status_code == 201
    assert created.json()["email_recipients"] == 2  # c1 et c2, citoyens uniquement
    assert mailer.sent == [("c2@test.mg", FLOOD["title"])]


async def test_ai_recommendations_for_vulnerable_people(
    platform: Platform, recommender: FakeRecommender
) -> None:
    payload = {
        "title": "Vague de chaleur extrême",
        "message": "Une vague de chaleur extrême touche plusieurs secteurs de la ville.",
        "level": "Attention",
        "audience": "Personnes vulnérables",
    }
    url = f"{ALERTS}/recommendations"
    assert (
        await platform.client.post(url, headers=platform.as_("c1"), json=payload)
    ).status_code == 403

    response = await platform.client.post(url, headers=platform.admin, json=payload)
    assert response.status_code == 200
    assert "Buvez de l'eau" in response.json()["recommendations"]
    assert recommender.seen is not None and recommender.seen.title == payload["title"]

    recommender.fail = True
    unavailable = await platform.client.post(url, headers=platform.admin, json=payload)
    assert unavailable.status_code == 503
    assert unavailable.json()["error"] == "RecommendationUnavailableError"
