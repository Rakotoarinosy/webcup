"""D16, F83 : confirmation immédiate et accusé de réception avec une référence identifiable."""

import re

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

REQUESTS = f"{API}/requests"


async def test_reference_is_the_same_everywhere(platform: Platform) -> None:
    created = (await platform.submit("c1")).json()
    reference = created["reference"]
    year = created["created_at"][:4]
    assert re.fullmatch(rf"TN-{year}-[0-9A-F]{{8}}", reference)
    assert reference.endswith(created["id"][:8].upper())

    detail = (
        await platform.client.get(f"{REQUESTS}/{created['id']}", headers=platform.as_("c1"))
    ).json()
    listed = (await platform.client.get(REQUESTS, headers=platform.as_("c1"))).json()["items"]
    receipt = (
        await platform.client.get(f"{REQUESTS}/{created['id']}/receipt", headers=platform.as_("c1"))
    ).json()
    assert detail["reference"] == listed[0]["reference"] == receipt["reference"] == reference


async def test_receipt_names_the_receiving_service(platform: Platform) -> None:
    created = (await platform.submit("c1")).json()
    response = await platform.client.get(
        f"{REQUESTS}/{created['id']}/receipt", headers=platform.as_("c1")
    )
    assert response.status_code == 200
    receipt = response.json()
    assert receipt["service"] == "Voirie"
    assert receipt["received_at"] == created["created_at"]
    assert receipt["citizen_name"] == "Nom c1"
    assert receipt["title"] == "Nid de poule"
    assert receipt["status"] == "Nouveau"

    # « Déchets » n'est couverte par aucun institut : l'administration la reçoit.
    waste = (await platform.submit("c1", category="Déchets")).json()
    unrouted = await platform.client.get(
        f"{REQUESTS}/{waste['id']}/receipt", headers=platform.as_("c1")
    )
    assert unrouted.json()["service"] == "Administration de la ville de Terra Nova"


async def test_receipt_is_reserved_to_the_owner_and_authorised_staff(platform: Platform) -> None:
    created = (await platform.submit("c1")).json()
    url = f"{REQUESTS}/{created['id']}/receipt"
    for key, expected in [("c2", 403), ("m2", 403), ("ua2", 403), ("m1", 200), ("admin", 200)]:
        assert (await platform.client.get(url, headers=platform.as_(key))).status_code == expected
    assert (
        await platform.client.get(f"{REQUESTS}/inconnue/receipt", headers=platform.as_("c1"))
    ).status_code == 404


async def test_a_request_can_be_found_by_its_reference(platform: Platform) -> None:
    created = (
        await platform.submit("c1", title="Lampadaire cassé", category="Éclairage public")
    ).json()
    await platform.submit("c1", title="Autre demande")
    await platform.submit("c2")

    for search in (created["reference"], created["reference"].lower(), f"#{created['id'][:8]}"):
        found = (
            await platform.client.get(
                REQUESTS, headers=platform.as_("c1"), params={"search": search}
            )
        ).json()
        assert [item["id"] for item in found["items"]] == [created["id"]], search

    # La référence ne donne jamais accès aux demandes d'un autre habitant.
    other = (
        await platform.client.get(
            REQUESTS, headers=platform.as_("c2"), params={"search": created["reference"]}
        )
    ).json()
    assert other["items"] == []
