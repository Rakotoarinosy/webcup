"""Profils agents : création à partir d'un compte, périmètre du manager, fiche de l'agent."""

import pytest

from tests.e2e.api.conftest import API, PASSWORD, Platform

pytestmark = pytest.mark.anyio

AGENTS = f"{API}/agents"


async def test_agent_profile_reads_identity_from_user(platform: Platform) -> None:
    response = await platform.client.get(
        f"{AGENTS}/{platform.agents['a1']}", headers=platform.as_("admin")
    )
    body = response.json()
    assert body["user_id"] == platform.users["ua1"]
    assert body["name"] == "Nom ua1" and body["email"] == "ua1@test.mg"
    assert body["institut_name"] == "Voirie"

    me = await platform.client.get(f"{AGENTS}/me", headers=platform.as_("ua1"))
    assert me.json()["id"] == platform.agents["a1"]
    assert (
        await platform.client.get(f"{AGENTS}/me", headers=platform.as_("c1"))
    ).status_code == 404


async def test_login_profile_exposes_derived_links(platform: Platform) -> None:
    agent = (await platform.client.get(f"{API}/auth/me", headers=platform.as_("ua1"))).json()
    assert agent["agent_id"] == platform.agents["a1"]
    assert agent["institut_id"] == platform.instituts["voirie"]
    manager = (await platform.client.get(f"{API}/auth/me", headers=platform.as_("m2"))).json()
    assert manager["agent_id"] is None and manager["institut_id"] == platform.instituts["eau"]


async def test_listing_scope(platform: Platform) -> None:
    async def names(key: str) -> list[str]:
        response = await platform.client.get(AGENTS, headers=platform.as_(key))
        assert response.status_code == 200, response.text
        return [agent["name"] for agent in response.json()]

    assert await names("admin") == ["Nom ua1", "Nom ua2"]
    assert await names("m1") == ["Nom ua1"]
    assert await names("m3") == []
    assert (await platform.client.get(AGENTS, headers=platform.as_("ua1"))).status_code == 403
    assert (await platform.client.get(AGENTS, headers=platform.as_("c1"))).status_code == 403


async def test_profile_creation_rules(platform: Platform) -> None:
    client = platform.client
    account = await client.post(
        f"{API}/users",
        headers=platform.admin,
        json={"email": "ua3@test.mg", "name": "Nom ua3", "password": PASSWORD, "role": "agent"},
    )
    user_id = account.json()["id"]

    # Le manager crée dans son institut, quel que soit l'institut demandé.
    created = await client.post(
        AGENTS,
        headers=platform.as_("m1"),
        json={"user_id": user_id, "institut_id": platform.instituts["eau"]},
    )
    assert created.status_code == 201, created.text
    assert created.json()["institut_id"] == platform.instituts["voirie"]

    duplicate = await client.post(
        AGENTS,
        headers=platform.admin,
        json={"user_id": user_id, "institut_id": platform.instituts["voirie"]},
    )
    assert duplicate.status_code == 409
    citizen = await client.post(
        AGENTS,
        headers=platform.admin,
        json={"user_id": platform.users["c1"], "institut_id": platform.instituts["voirie"]},
    )
    assert citizen.status_code == 400
    assert (
        await client.post(AGENTS, headers=platform.as_("m3"), json={"user_id": user_id})
    ).status_code == 403


async def test_activation_status_and_move(platform: Platform) -> None:
    client = platform.client
    a1 = f"{AGENTS}/{platform.agents['a1']}"

    assert (
        await client.patch(
            f"{a1}/status", headers=platform.as_("ua1"), json={"status": "unavailable"}
        )
    ).json()["status"] == "unavailable"
    assert (
        await client.patch(
            f"{a1}/status", headers=platform.as_("ua2"), json={"status": "available"}
        )
    ).status_code == 403

    assert (await client.post(f"{a1}/deactivate", headers=platform.as_("m2"))).status_code == 403
    assert (await client.post(f"{a1}/deactivate", headers=platform.as_("m1"))).json()[
        "is_active"
    ] is False
    # Profil désactivé : l'agent ne voit plus rien.
    assert (await client.get(f"{API}/requests", headers=platform.as_("ua1"))).json()["total"] == 0
    await client.post(f"{a1}/activate", headers=platform.as_("m1"))

    move = {"institut_id": platform.instituts["eau"]}
    assert (
        await client.post(f"{a1}/move", headers=platform.as_("m1"), json=move)
    ).status_code == 403
    assert (await client.post(f"{a1}/move", headers=platform.admin, json=move)).json()[
        "institut_name"
    ] == "Eau"


async def test_interventions_visibility(platform: Platform) -> None:
    request_id = (await platform.submit()).json()["id"]
    await platform.client.post(
        f"{API}/requests/{request_id}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )
    url = f"{AGENTS}/{platform.agents['a1']}/interventions"

    for key, expected in [("ua1", 200), ("m1", 200), ("admin", 200), ("ua2", 403), ("m2", 403)]:
        assert (await platform.client.get(url, headers=platform.as_(key))).status_code == expected
    items = (await platform.client.get(url, headers=platform.as_("ua1"))).json()
    assert [item["id"] for item in items] == [request_id]
