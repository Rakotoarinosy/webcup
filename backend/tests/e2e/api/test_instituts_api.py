"""Instituts : paramétrage par l'admin, lecture par son manager, routage des nouvelles demandes."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

INSTITUTS = f"{API}/instituts"


async def test_only_admin_configures_instituts(platform: Platform) -> None:
    payload = {"name": "Propreté", "categories": ["Déchets"]}
    assert (
        await platform.client.post(INSTITUTS, headers=platform.as_("m1"), json=payload)
    ).status_code == 403

    created = await platform.client.post(INSTITUTS, headers=platform.admin, json=payload)
    assert created.status_code == 201, created.text
    # Les nouvelles demandes « Déchets » partent désormais à cet institut.
    request = (await platform.submit(category="Déchets")).json()
    assert request["institut_id"] == created.json()["id"]


async def test_institut_invariants(platform: Platform) -> None:
    client = platform.client
    taken = await client.post(
        INSTITUTS, headers=platform.admin, json={"name": "Routes", "categories": ["Voirie"]}
    )
    assert taken.status_code == 409  # catégorie déjà couverte
    same_name = await client.post(
        INSTITUTS, headers=platform.admin, json={"name": "voirie", "categories": ["Autre"]}
    )
    assert same_name.status_code == 409
    busy_manager = await client.post(
        INSTITUTS,
        headers=platform.admin,
        json={"name": "Autre", "categories": ["Autre"], "manager_id": platform.users["m1"]},
    )
    assert busy_manager.status_code == 409
    not_manager = await client.post(
        INSTITUTS,
        headers=platform.admin,
        json={"name": "Autre", "categories": ["Autre"], "manager_id": platform.users["c1"]},
    )
    assert not_manager.status_code == 400


async def test_manager_reads_own_institut_and_loses_access_when_deactivated(
    platform: Platform,
) -> None:
    client = platform.client
    voirie = f"{INSTITUTS}/{platform.instituts['voirie']}"

    own = await client.get(INSTITUTS, headers=platform.as_("m1"))
    assert [i["name"] for i in own.json()] == ["Voirie"]
    assert own.json()[0]["categories"] == ["Voirie", "Éclairage public"]
    assert (
        await client.get(f"{INSTITUTS}/{platform.instituts['eau']}", headers=platform.as_("m1"))
    ).status_code == 403
    citizen_instituts = (await client.get(INSTITUTS, headers=platform.as_("c1"))).json()
    assert {institut["id"] for institut in citizen_instituts} == set(platform.instituts.values())
    citizen_dashboard = await client.get(
        f"{voirie}/citizen-dashboard", headers=platform.as_("c1")
    )
    assert citizen_dashboard.status_code == 200
    assert "manager_name" not in citizen_dashboard.json()
    assert "associated_agents" not in citizen_dashboard.json()

    await platform.submit()
    assert (await client.patch(voirie, headers=platform.admin, json={"is_active": False})).json()[
        "is_active"
    ] is False
    assert (await client.get(f"{API}/requests", headers=platform.as_("m1"))).json()["total"] == 0
    # Les nouvelles demandes de voirie reviennent à l'administration.
    assert (await platform.submit()).json()["institut_id"] is None


async def test_change_manager(platform: Platform) -> None:
    url = f"{INSTITUTS}/{platform.instituts['voirie']}/manager"
    response = await platform.client.put(
        url, headers=platform.admin, json={"manager_id": platform.users["m3"]}
    )
    assert response.json()["manager_id"] == platform.users["m3"]
    assert [
        i["name"] for i in (await platform.client.get(INSTITUTS, headers=platform.as_("m3"))).json()
    ] == ["Voirie"]
    assert (await platform.client.get(INSTITUTS, headers=platform.as_("m1"))).json() == []
