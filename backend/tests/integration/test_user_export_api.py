import io
import zipfile

import httpx
import pytest

from tests.integration.test_auth_api import signin, signup

pytestmark = pytest.mark.anyio


@pytest.mark.parametrize(
    ("export_format", "media_type", "signature"),
    [
        ("csv", "text/csv", b"\xef\xbb\xbfRubrique"),
        ("excel", "spreadsheetml.sheet", b"PK"),
        ("word", "application/msword", b"<!doctype html>"),
        ("pdf", "application/pdf", b"%PDF-1.4"),
    ],
)
async def test_authenticated_user_can_export_only_own_data(
    client: httpx.AsyncClient, export_format: str, media_type: str, signature: bytes
) -> None:
    _, payload = await signup(client, "owner@test.mg")
    headers = await signin(client, payload)
    own = await client.post(
        "/api/v1/requests",
        headers=headers,
        json={
            "title": "Ma demande exportée",
            "description": "Cette demande doit figurer dans mon export personnel.",
            "category": "Eau",
            "location": "Rue principale",
        },
    )
    assert own.status_code == 201
    _, other_payload = await signup(client, "other@test.mg")
    other_headers = await signin(client, other_payload)
    created = await client.post(
        "/api/v1/requests",
        headers=other_headers,
        json={
            "title": "Demande confidentielle",
            "description": "Ce contenu ne doit jamais être exporté par un autre compte.",
            "category": "Voirie",
            "location": "Rue privée",
        },
    )
    assert created.status_code == 201

    response = await client.get(f"/api/v1/exports/me?format={export_format}", headers=headers)

    assert response.status_code == 200, response.text
    assert media_type in response.headers["content-type"]
    assert "attachment;" in response.headers["content-disposition"]
    assert response.headers["cache-control"] == "no-store"
    assert response.content.startswith(signature)
    if export_format == "excel":
        with zipfile.ZipFile(io.BytesIO(response.content)) as file:
            assert "xl/worksheets/sheet1.xml" in file.namelist()
            content = file.read("xl/worksheets/sheet1.xml")
            assert b"Ma demande exportee" in content.replace("é".encode(), b"e")
            assert b"Demande confidentielle" not in content
    else:
        assert b"Ma demande export" in response.content
        assert b"Demande confidentielle" not in response.content


async def test_export_requires_login_and_rejects_unknown_format(client: httpx.AsyncClient) -> None:
    assert (await client.get("/api/v1/exports/me?format=csv")).status_code == 401
    _, payload = await signup(client)
    headers = await signin(client, payload)
    assert (await client.get("/api/v1/exports/me?format=json", headers=headers)).status_code == 422
