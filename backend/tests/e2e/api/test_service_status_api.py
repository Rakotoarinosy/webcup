"""F38, F63, F64 : état d'un service visible avant toute démarche, mise hors service rapide."""

from datetime import UTC, datetime, timedelta

import pytest
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import MunicipalServiceModel
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

SERVICES = f"{API}/municipal/services"


def _service(service_id: str, name: str, order: int, **extra: object) -> MunicipalServiceModel:
    return MunicipalServiceModel(
        id=service_id,
        name=name,
        category="Administration",
        description="Description",
        contact_details="Mairie",
        opening_hours="8h-16h",
        icon="pi-id-card",
        display_order=order,
        is_active=True,
        **extra,
    )


@pytest.fixture
def services(db_session: Session) -> None:
    db_session.add_all(
        [
            _service("civil", "État civil", 1),
            _service("annexe", "Mairie annexe", 2),
            _service("water", "Eau", 3),
        ]
    )
    db_session.commit()


async def test_admin_takes_a_service_out_and_residents_see_why_and_what_to_do(
    platform: Platform, services: None
) -> None:
    client = platform.client
    back = datetime.now(UTC) + timedelta(hours=4)

    response = await client.patch(
        f"{SERVICES}/civil/status",
        headers=platform.admin,
        json={
            "status": "maintenance",
            "message": "Mise à jour du logiciel des actes.",
            "expected_back_at": back.isoformat(),
            "alternative": "Les actes urgents sont délivrés à la mairie annexe.",
            "alternative_service_id": "annexe",
        },
    )

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["status"] == "maintenance"
    assert body["status_message"] == "Mise à jour du logiciel des actes."
    assert body["alternative_service_id"] == "annexe"
    assert body["status_updated_at"] is not None

    # Public, sans connexion : la fiche, la liste et les interruptions affichent l'état.
    detail = await client.get(f"{SERVICES}/civil", headers={"Authorization": ""})
    assert detail.status_code == 200
    assert detail.json()["status"] == "maintenance"
    assert detail.json()["status_alternative"].startswith("Les actes urgents")

    interruptions = (await client.get(f"{SERVICES}/interruptions")).json()
    assert [item["id"] for item in interruptions] == ["civil"]

    available = (await client.get(SERVICES, params={"available_only": True})).json()
    assert [item["id"] for item in available] == ["annexe", "water"]
    everything = (await client.get(SERVICES)).json()
    assert [item["id"] for item in everything] == ["civil", "annexe", "water"]

    # Journal d'audit : qui a mis le service hors service, avec avant / après.
    audit = (
        await client.get(
            f"{API}/audit", headers=platform.admin, params={"action": "service_status_changed"}
        )
    ).json()["items"]
    assert audit[0]["target_label"] == "État civil"
    assert audit[0]["target_type"] == "municipal_service"
    assert audit[0]["details"]["status"] == {"from": "available", "to": "maintenance"}


async def test_starting_an_interrupted_service_is_refused_until_it_is_back(
    platform: Platform, services: None
) -> None:
    client = platform.client
    await client.patch(
        f"{SERVICES}/water/status",
        headers=platform.as_("m1"),
        json={"status": "out_of_service", "message": "Panne du serveur."},
    )

    refused = await client.post(f"{SERVICES}/water/start")
    assert refused.status_code == 409
    assert "interrompu" in refused.json()["detail"]

    contact = {
        "service_id": "water",
        "sender_name": "Jean Rakoto",
        "sender_email": "jean@example.mg",
        "subject": "Coupure",
        "message": "Quand l'eau revient-elle ?",
    }
    assert (await client.post(f"{API}/municipal/contact", json=contact)).status_code == 409
    confirmed = await client.post(
        f"{API}/municipal/contact", json={**contact, "acknowledge_interruption": True}
    )
    assert confirmed.status_code == 201

    restored = await client.patch(
        f"{SERVICES}/water/status", headers=platform.admin, json={"status": "available"}
    )
    assert restored.json()["status_message"] is None
    assert (await client.post(f"{SERVICES}/water/start")).status_code == 200


async def test_disrupted_service_stays_usable(platform: Platform, services: None) -> None:
    client = platform.client
    await client.patch(
        f"{SERVICES}/annexe/status",
        headers=platform.admin,
        json={"status": "disrupted", "message": "Un seul guichet ouvert, attente prolongée."},
    )
    assert (await client.post(f"{SERVICES}/annexe/start")).status_code == 200
    available = (await client.get(SERVICES, params={"available_only": True})).json()
    assert "annexe" in [item["id"] for item in available]


async def test_status_change_rules(platform: Platform, services: None) -> None:
    client = platform.client
    url = f"{SERVICES}/civil/status"

    no_reason = await client.patch(url, headers=platform.admin, json={"status": "maintenance"})
    assert no_reason.status_code == 400

    past = (datetime.now(UTC) - timedelta(hours=1)).isoformat()
    in_past = await client.patch(
        url,
        headers=platform.admin,
        json={"status": "maintenance", "message": "Travaux", "expected_back_at": past},
    )
    assert in_past.status_code == 400

    itself = await client.patch(
        url,
        headers=platform.admin,
        json={"status": "maintenance", "message": "Travaux", "alternative_service_id": "civil"},
    )
    assert itself.status_code == 400

    await client.patch(
        f"{SERVICES}/water/status",
        headers=platform.admin,
        json={"status": "out_of_service", "message": "Panne"},
    )
    interrupted_alternative = await client.patch(
        url,
        headers=platform.admin,
        json={"status": "maintenance", "message": "Travaux", "alternative_service_id": "water"},
    )
    assert interrupted_alternative.status_code == 400

    for role in ("c1", "ua1"):
        forbidden = await client.patch(
            url, headers=platform.as_(role), json={"status": "maintenance", "message": "x"}
        )
        assert forbidden.status_code == 403

    missing = await client.patch(
        f"{SERVICES}/nope/status", headers=platform.admin, json={"status": "available"}
    )
    assert missing.status_code == 404
    assert (await client.get(f"{SERVICES}/nope")).status_code == 404
