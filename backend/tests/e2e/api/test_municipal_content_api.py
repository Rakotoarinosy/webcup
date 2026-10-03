"""Scénarios publics de consultation et de contact municipal."""

from datetime import UTC, datetime

import pytest
from httpx import AsyncClient

from src.infrastructure.persistence.models import MunicipalPublicationModel, MunicipalServiceModel

pytestmark = pytest.mark.anyio


async def test_lists_public_services_and_publications(client: AsyncClient, db_session) -> None:
    db_session.add(
        MunicipalServiceModel(
            id="service-1",
            name="État civil",
            description="Documents",
            contact_details="Mairie",
            opening_hours="8h-16h",
            icon="pi-id-card",
            display_order=1,
            is_active=True,
        )
    )
    db_session.add(
        MunicipalPublicationModel(
            id="publication-1",
            title="Information",
            summary="Résumé",
            content="Contenu complet",
            category="Information pratique",
            published_at=datetime.now(UTC),
            is_published=True,
        )
    )
    db_session.commit()

    services = await client.get("/api/v1/municipal/services")
    publications = await client.get("/api/v1/municipal/publications")

    assert services.status_code == 200
    assert services.json()[0]["name"] == "État civil"
    assert publications.status_code == 200
    assert publications.json()[0]["title"] == "Information"


async def test_contact_returns_receipt_and_persists_message(
    client: AsyncClient, db_session
) -> None:
    response = await client.post(
        "/api/v1/municipal/contact",
        json={
            "sender_name": "Ada Lovelace",
            "sender_email": "ada@example.com",
            "subject": "Question voirie",
            "message": "Je souhaite connaître la date des travaux de voirie.",
        },
    )

    assert response.status_code == 201
    body = response.json()
    assert body["receipt_number"].startswith("MC-")
    assert "bien été envoyé" in body["message"]


async def test_unknown_publication_is_not_exposed(client: AsyncClient) -> None:
    response = await client.get("/api/v1/municipal/publications/missing")

    assert response.status_code == 404
