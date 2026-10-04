"""F90 : POST /assistant/simplify, branché sur un faux simplificateur."""

import httpx
import pytest

from src.domain.virtual_assistant import GlossaryTerm, PlainExplanation
from src.features.virtual_assistant.router import get_text_simplifier
from src.main import app

PASSAGE = "Le dossier de demande d'aide sociale doit être déposé auprès du CCAS de la commune."


class FakeSimplifier:
    def simplify(self, passage: str) -> PlainExplanation:
        return PlainExplanation(
            summary="Pour demander une aide, déposez votre dossier au CCAS.",
            key_points=("Préparez votre dossier.",),
            terms=(GlossaryTerm("CCAS", "Le service social de la mairie."),),
        )


class BrokenSimplifier:
    def simplify(self, passage: str) -> PlainExplanation:
        raise RuntimeError("IA indisponible")


@pytest.mark.anyio
async def test_explains_a_passage_simply(client: httpx.AsyncClient) -> None:
    app.dependency_overrides[get_text_simplifier] = FakeSimplifier
    response = await client.post("/api/v1/assistant/simplify", json={"text": PASSAGE})

    assert response.status_code == 200
    assert response.json() == {
        "summary": "Pour demander une aide, déposez votre dossier au CCAS.",
        "key_points": ["Préparez votre dossier."],
        "terms": [{"term": "CCAS", "definition": "Le service social de la mairie."}],
    }


@pytest.mark.anyio
async def test_rejects_a_too_short_passage(client: httpx.AsyncClient) -> None:
    app.dependency_overrides[get_text_simplifier] = FakeSimplifier
    response = await client.post("/api/v1/assistant/simplify", json={"text": "Trop court."})

    assert response.status_code == 422


@pytest.mark.anyio
async def test_reports_an_unavailable_ai_cleanly(client: httpx.AsyncClient) -> None:
    app.dependency_overrides[get_text_simplifier] = BrokenSimplifier
    response = await client.post("/api/v1/assistant/simplify", json={"text": PASSAGE})

    assert response.status_code == 502
    assert "indisponible" in response.json()["detail"]
