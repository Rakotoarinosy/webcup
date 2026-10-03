"""F51 : un habitant signale une inquiétude sur ses données et suit sa prise en compte."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

CONCERNS = f"{API}/data-concerns"
CONCERN = {"topic": "Utilisation", "message": "À quoi sert ma position GPS ?"}


async def test_citizen_follows_the_handling_of_their_concern(platform: Platform) -> None:
    client = platform.client
    created = await client.post(CONCERNS, headers=platform.as_("c1"), json=CONCERN)
    assert created.status_code == 201, created.text
    concern = created.json()
    assert concern["reference"].startswith("DC-")
    assert concern["status"] == "Reçu"

    reviewed = await client.post(f"{CONCERNS}/{concern['id']}/review", headers=platform.admin)
    assert reviewed.status_code == 200, reviewed.text
    assert reviewed.json()["status"] == "En cours d'examen"
    assert reviewed.json()["user_email"] == "c1@test.mg"

    answer = {"response": "Elle sert uniquement à placer votre demande sur la carte."}
    answered = await client.post(
        f"{CONCERNS}/{concern['id']}/answer", headers=platform.admin, json=answer
    )
    assert answered.status_code == 200, answered.text

    mine = (await client.get(f"{CONCERNS}/mine", headers=platform.as_("c1"))).json()
    assert [item["reference"] for item in mine] == [concern["reference"]]
    assert mine[0]["status"] == "Répondu"
    assert mine[0]["response"] == answer["response"]
    assert mine[0]["answered_at"] is not None and mine[0]["reviewed_at"] is not None

    # La réponse est définitive : elle reste telle que l'habitant l'a lue.
    again = await client.post(
        f"{CONCERNS}/{concern['id']}/answer", headers=platform.admin, json=answer
    )
    assert again.status_code == 400


async def test_concerns_are_private_and_handled_by_admin_only(platform: Platform) -> None:
    client = platform.client
    concern = (await client.post(CONCERNS, headers=platform.as_("c1"), json=CONCERN)).json()

    assert (await client.get(f"{CONCERNS}/mine", headers=platform.as_("c2"))).json() == []
    for key in ("c1", "m1", "ua1"):
        assert (await client.get(CONCERNS, headers=platform.as_(key))).status_code == 403
        review = await client.post(f"{CONCERNS}/{concern['id']}/review", headers=platform.as_(key))
        assert review.status_code == 403

    listed = await client.get(CONCERNS, headers=platform.admin, params={"status": "Reçu"})
    assert [item["id"] for item in listed.json()] == [concern["id"]]


async def test_concern_input_is_validated(platform: Platform) -> None:
    client = platform.client
    too_short = await client.post(
        CONCERNS, headers=platform.as_("c1"), json={"topic": "Autre", "message": "court"}
    )
    assert too_short.status_code == 422
    unknown = await client.post(
        CONCERNS, headers=platform.as_("c1"), json={**CONCERN, "user_id": "someone-else"}
    )
    assert unknown.status_code == 422
    anonymous = platform.client.headers.pop("Authorization")
    assert (await client.post(CONCERNS, json=CONCERN)).status_code == 401
    platform.client.headers["Authorization"] = anonymous
