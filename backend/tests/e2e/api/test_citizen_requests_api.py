"""Parcours complet des demandes par l'API : soumission, périmètres par rôle, cycle de vie, journal."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

REQUESTS = f"{API}/requests"


async def test_submission_is_routed_and_logged(platform: Platform) -> None:
    response = await platform.submit(
        "c1", citizen_id=platform.users["c2"], urgency=5, affected_citizens=50
    )

    assert response.status_code == 201, response.text
    body = response.json()
    assert body["citizen_id"] == platform.users["c1"]  # citizen_id ignoré pour un citoyen
    assert body["status"] == "Nouveau"
    assert body["institut_id"] == platform.instituts["voirie"]
    assert body["assigned_agent_id"] is None
    assert body["priority"] == "Haute"

    events = await platform.client.get(
        f"{REQUESTS}/{body['id']}/events", headers=platform.as_("c1")
    )
    assert [e["type"] for e in events.json()] == ["created"]


async def test_status_and_agent_cannot_be_chosen_at_submission(platform: Platform) -> None:
    response = await platform.submit(status="Résolu", assigned_agent_id=platform.agents["a1"])
    assert response.json()["status"] == "Nouveau"
    assert response.json()["assigned_agent_id"] is None


async def test_manager_submits_for_a_citizen_and_agent_cannot(platform: Platform) -> None:
    created = await platform.submit("m1", citizen_id=platform.users["c2"])
    assert created.status_code == 201 and created.json()["citizen_id"] == platform.users["c2"]
    assert (await platform.submit("m1")).status_code == 400  # citizen_id manquant
    assert (await platform.submit("m1", citizen_id=platform.users["ua1"])).status_code == 400
    assert (await platform.submit("ua1", citizen_id=platform.users["c1"])).status_code == 403


async def test_each_role_lists_only_its_scope(platform: Platform) -> None:
    roads = (await platform.submit("c1")).json()["id"]
    water = (await platform.submit("c2", category="Eau")).json()["id"]
    orphan = (await platform.submit("c2", category="Déchets")).json()["id"]
    await platform.client.post(
        f"{REQUESTS}/{roads}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )

    async def visible(key: str) -> set[str]:
        response = await platform.client.get(REQUESTS, headers=platform.as_(key))
        assert response.status_code == 200, response.text
        return {item["id"] for item in response.json()["items"]}

    assert await visible("c1") == {roads}
    assert await visible("c2") == {water, orphan}
    assert await visible("ua1") == {roads}
    assert await visible("ua2") == set()
    assert await visible("m1") == {roads}
    assert await visible("m2") == {water}
    assert await visible("m3") == set()
    assert await visible("admin") == {roads, water, orphan}

    for key, expected in [("c2", 403), ("ua2", 403), ("m2", 403), ("m1", 200), ("admin", 200)]:
        response = await platform.client.get(f"{REQUESTS}/{roads}", headers=platform.as_(key))
        assert response.status_code == expected, key


async def test_lifecycle_through_the_api(platform: Platform) -> None:
    request_id = (await platform.submit()).json()["id"]
    url = f"{REQUESTS}/{request_id}"

    # Pas de résolution sans prise en charge.
    response = await platform.client.post(
        f"{url}/status", headers=platform.as_("m1"), json={"status": "Résolu"}
    )
    assert response.status_code == 400

    # Un agent d'un autre institut est refusé ; le manager d'un autre institut aussi.
    other = await platform.client.post(
        f"{url}/assign", headers=platform.as_("m1"), json={"agent_id": platform.agents["a2"]}
    )
    assert other.status_code == 400
    foreign = await platform.client.post(
        f"{url}/assign", headers=platform.as_("m2"), json={"agent_id": platform.agents["a1"]}
    )
    assert foreign.status_code == 403

    assigned = await platform.client.post(
        f"{url}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"], "scheduled_at": "2026-10-05T09:00:00"},
    )
    assert assigned.status_code == 200, assigned.text
    assert assigned.json()["status"] == "En cours"
    assert assigned.json()["scheduled_at"].startswith("2026-10-05T09:00:00")

    # L'agent ne rejette pas, mais résout ce qui lui est confié.
    reject = await platform.client.post(
        f"{url}/status", headers=platform.as_("ua1"), json={"status": "Rejeté"}
    )
    assert reject.status_code == 403
    resolved = await platform.client.post(
        f"{url}/status", headers=platform.as_("ua1"), json={"status": "Résolu"}
    )
    assert resolved.status_code == 200
    assert resolved.json()["resolved_at"] is not None

    # État final : plus de retour en arrière, plus d'attribution.
    back = await platform.client.post(
        f"{url}/status", headers=platform.as_("admin"), json={"status": "En cours"}
    )
    assert back.status_code == 400
    again = await platform.client.post(
        f"{url}/assign", headers=platform.as_("admin"), json={"agent_id": platform.agents["a1"]}
    )
    assert again.status_code == 400

    events = await platform.client.get(f"{url}/events", headers=platform.as_("c1"))
    assert [e["type"] for e in events.json()] == ["created", "assigned", "resolved"]
    assert events.json()[1]["payload"]["agent_name"] == "Nom ua1"


async def test_edit_and_delete_rights(platform: Platform) -> None:
    request_id = (await platform.submit()).json()["id"]
    url = f"{REQUESTS}/{request_id}"
    client = platform.client

    assert (
        await client.patch(url, headers=platform.as_("c1"), json={"title": "Plus précis"})
    ).json()["title"] == "Plus précis"
    assert (
        await client.patch(url, headers=platform.as_("c1"), json={"priority": "Urgente"})
    ).status_code == 403
    assert (
        await client.patch(url, headers=platform.as_("c2"), json={"title": "x"})
    ).status_code == 403

    # Changement de catégorie par le manager : la demande part à l'institut « eau ».
    moved = await client.patch(url, headers=platform.as_("m1"), json={"category": "Eau"})
    assert moved.json()["institut_id"] == platform.instituts["eau"]
    assert (await client.get(url, headers=platform.as_("m1"))).status_code == 403
    assert (await client.get(url, headers=platform.as_("m2"))).status_code == 200

    assert (await client.delete(url, headers=platform.as_("c2"))).status_code == 403
    assert (await client.delete(url, headers=platform.as_("c1"))).status_code == 204
    assert (await client.get(url, headers=platform.as_("admin"))).status_code == 404


async def test_priority_inputs_and_queue(platform: Platform) -> None:
    low = (await platform.submit(urgency=1)).json()
    high = (await platform.submit(urgency=5, affected_citizens=100)).json()
    client = platform.client

    updated = await client.patch(
        f"{REQUESTS}/{low['id']}/priority-inputs",
        headers=platform.as_("c1"),
        json={"urgency": 5, "affected_citizens": 100},
    )
    assert updated.status_code == 200
    assert updated.json()["priority_score"] > low["priority_score"]

    queue = await client.get(f"{REQUESTS}/queue", headers=platform.as_("m1"))
    assert queue.status_code == 200
    assert {item["id"] for item in queue.json()["items"]} == {low["id"], high["id"]}
    assert (await client.get(f"{REQUESTS}/queue", headers=platform.as_("m2"))).json()["total"] == 0

    refresh = await client.post(f"{REQUESTS}/queue/refresh", headers=platform.as_("m1"))
    assert refresh.status_code == 403
    assert (
        await client.post(f"{REQUESTS}/queue/refresh", headers=platform.as_("admin"))
    ).status_code == 200


async def test_map_points_are_scoped(platform: Platform) -> None:
    await platform.submit(latitude=-18.9, longitude=47.5)
    await platform.submit("c2", category="Eau", latitude=-18.91, longitude=47.51)
    await platform.submit("c2", category="Eau")  # sans coordonnées : absente de la carte

    async def count(key: str) -> int:
        response = await platform.client.get(f"{REQUESTS}/map", headers=platform.as_(key))
        assert response.status_code == 200, response.text
        return len(response.json())

    assert await count("admin") == 2
    assert await count("m1") == 1
    assert await count("c2") == 1
    assert await count("ua2") == 0


async def test_anonymous_access_is_rejected(platform: Platform) -> None:
    for path in ("/requests", "/dashboard", "/instituts", "/agents"):
        assert (
            await platform.client.get(API + path, headers={"Authorization": ""})
        ).status_code == 401


async def test_citizen_search_filters_and_pagination_stay_owner_scoped(platform: Platform) -> None:
    for index in range(3):
        await platform.submit("c1", title=f"Canalisation bouchée {index}", category="Eau")
    await platform.submit("c1", title="Lampadaire éteint", category="Éclairage public")
    await platform.submit("c2", title="Canalisation du voisin", category="Eau")

    async def page(**params) -> dict:
        response = await platform.client.get(REQUESTS, headers=platform.as_("c1"), params=params)
        assert response.status_code == 200, response.text
        return response.json()

    found = await page(search="canalisation", page_size=2)
    assert found["total"] == 3 and found["total_pages"] == 2 and len(found["items"]) == 2
    assert (await page(search="canalisation", page_size=2, page=2))["items"][0][
        "citizen_id"
    ] == platform.users["c1"]
    assert (await page(category="Éclairage public"))["total"] == 1
    assert (await page(status="Résolu"))["total"] == 0
