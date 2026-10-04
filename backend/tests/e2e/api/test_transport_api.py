"""F36 : horaires et état des transports municipaux, perturbations en premier."""

from datetime import datetime

import pytest
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import TransportLineModel, TransportStopModel
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

LINES = f"{API}/transport/lines"


@pytest.fixture
def lines(db_session: Session) -> None:
    for line_id, code, name, order, status, stops in [
        ("l1", "D1", "Hôtel de ville ↔ Gare", 1, "normal", ["Hôtel de ville", "Gare routière"]),
        ("l2", "D2", "Hôpital ↔ Quartier Est", 2, "disrupted", ["Hôpital", "Lycée municipal"]),
    ]:
        db_session.add(
            TransportLineModel(
                id=line_id,
                code=code,
                name=name,
                mode="bus",
                first_departure="00:00",
                last_departure="23:59",
                frequency_minutes=10,
                days_label="Tous les jours",
                status=status,
                status_message="Arrêt Lycée non desservi" if status == "disrupted" else None,
                display_order=order,
            )
        )
        db_session.flush()
        for position, stop in enumerate(stops):
            db_session.add(
                TransportStopModel(
                    id=f"{line_id}-s{position}",
                    line_id=line_id,
                    position=position,
                    name=stop,
                    minutes_from_start=position * 7,
                )
            )
    db_session.commit()


async def test_public_lines_show_disruptions_first_with_next_passages(
    platform: Platform, lines: None
) -> None:
    response = await platform.client.get(LINES, headers={"Authorization": ""})

    assert response.status_code == 200
    body = response.json()
    assert [line["code"] for line in body] == ["D2", "D1"]
    assert body[0]["status_message"] == "Arrêt Lycée non desservi"
    first_stop = body[1]["stops"][0]
    assert len(first_stop["next_passages"]) == 2
    passage = datetime.fromisoformat(first_stop["next_passages"][0])
    assert passage >= datetime.fromisoformat(body[1]["computed_at"])
    assert body[1]["first_departure"] == "00:00"


async def test_search_by_stop_name_ignores_accents_and_flags_the_stop(
    platform: Platform, lines: None
) -> None:
    body = (await platform.client.get(LINES, params={"q": "lycee"})).json()

    assert [line["code"] for line in body] == ["D2"]
    assert [stop["matches_search"] for stop in body[0]["stops"]] == [False, True]
    assert (await platform.client.get(LINES, params={"q": "d1"})).json()[0]["code"] == "D1"
    assert (await platform.client.get(LINES, params={"q": "inconnu"})).json() == []


async def test_manager_interrupts_a_line_and_it_is_journaled(
    platform: Platform, lines: None
) -> None:
    client = platform.client
    interrupted = await client.patch(
        f"{LINES}/l1/status",
        headers=platform.as_("m1"),
        json={"status": "interrupted", "message": "Manifestation en centre-ville."},
    )

    assert interrupted.status_code == 200, interrupted.text
    assert interrupted.json()["status"] == "interrupted"
    # Aucune promesse de passage tant que la ligne est interrompue.
    assert all(stop["next_passages"] == [] for stop in interrupted.json()["stops"])
    assert [line["code"] for line in (await client.get(LINES)).json()] == ["D1", "D2"]

    audit = (
        await client.get(
            f"{API}/audit",
            headers=platform.admin,
            params={"action": "transport_line_status_changed"},
        )
    ).json()["items"]
    assert audit[0]["target_label"] == "D1 — Hôtel de ville ↔ Gare"

    no_message = await client.patch(
        f"{LINES}/l1/status", headers=platform.admin, json={"status": "disrupted"}
    )
    assert no_message.status_code == 400
    citizen = await client.patch(
        f"{LINES}/l1/status", headers=platform.as_("c1"), json={"status": "normal"}
    )
    assert citizen.status_code == 403
    assert (await client.get(f"{LINES}/missing")).status_code == 404
