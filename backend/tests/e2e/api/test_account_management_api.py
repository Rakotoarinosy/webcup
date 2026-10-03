"""Gestion de tous les comptes par l'admin, avec des rattachements toujours cohérents."""

import pytest

from tests.e2e.api.conftest import API, PASSWORD, Platform, login

pytestmark = pytest.mark.anyio

MANAGE = f"{API}/users/manage"


async def test_admin_lists_every_role_with_filters(platform: Platform) -> None:
    client = platform.client
    everyone = await client.get(MANAGE, headers=platform.admin)
    assert {u["role"] for u in everyone.json()} == {"admin", "citizen", "manager", "agent"}

    managers = await client.get(MANAGE, headers=platform.admin, params={"role": "manager"})
    assert {u["email"] for u in managers.json()} == {"m1@test.mg", "m2@test.mg", "m3@test.mg"}
    found = await client.get(MANAGE, headers=platform.admin, params={"search": "NOM UA1"})
    assert [u["email"] for u in found.json()] == ["ua1@test.mg"]

    for key in ("m1", "ua1", "c1"):
        assert (await client.get(MANAGE, headers=platform.as_(key))).status_code == 403


async def test_admin_edits_role_password_and_activation(platform: Platform) -> None:
    client = platform.client
    url = f"{MANAGE}/{platform.users['c2']}"

    promoted = await client.patch(
        url, headers=platform.admin, json={"role": "manager", "password": "Nouveau1234"}
    )
    assert promoted.status_code == 200, promoted.text
    assert promoted.json()["role"] == "manager"
    response = await client.post(
        f"{API}/auth/login", json={"email": "c2@test.mg", "password": "Nouveau1234"}
    )
    assert response.status_code == 200

    weak = await client.patch(url, headers=platform.admin, json={"password": "court"})
    assert weak.status_code == 422
    assert (
        await client.patch(url, headers=platform.as_("m1"), json={"role": "admin"})
    ).status_code == 403


async def test_demoted_manager_releases_institut(platform: Platform) -> None:
    client = platform.client
    response = await client.patch(
        f"{MANAGE}/{platform.users['m1']}", headers=platform.admin, json={"role": "citizen"}
    )
    assert response.status_code == 200
    voirie = await client.get(
        f"{API}/instituts/{platform.instituts['voirie']}", headers=platform.admin
    )
    assert voirie.json()["manager_id"] is None

    # L'institut libéré peut recevoir un nouveau responsable.
    assigned = await client.put(
        f"{API}/instituts/{platform.instituts['voirie']}/manager",
        headers=platform.admin,
        json={"manager_id": platform.users["m3"]},
    )
    assert assigned.status_code == 200
    m3 = await client.get(f"{API}/auth/me", headers=await login(client, "m3@test.mg"))
    assert m3.json()["institut_id"] == platform.instituts["voirie"]


async def test_demoted_or_disabled_agent_cannot_receive_requests(platform: Platform) -> None:
    client = platform.client
    request_id = (await platform.submit()).json()["id"]
    await client.patch(
        f"{MANAGE}/{platform.users['ua1']}", headers=platform.admin, json={"is_active": False}
    )

    profile = await client.get(f"{API}/agents/{platform.agents['a1']}", headers=platform.admin)
    assert profile.json()["is_active"] is False
    refused = await client.post(
        f"{API}/requests/{request_id}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )
    assert refused.status_code == 400


async def test_last_admin_is_protected(platform: Platform) -> None:
    me = await platform.client.get(f"{API}/auth/me", headers=platform.admin)
    response = await platform.client.patch(
        f"{MANAGE}/{me.json()['id']}", headers=platform.admin, json={"role": "citizen"}
    )
    assert response.status_code == 400


async def test_admin_creates_accounts_of_any_role(platform: Platform) -> None:
    response = await platform.client.post(
        f"{API}/users",
        headers=platform.admin,
        json={"email": "new@test.mg", "name": "Nouveau", "password": PASSWORD, "role": "manager"},
    )
    assert response.status_code == 201 and response.json()["role"] == "manager"
