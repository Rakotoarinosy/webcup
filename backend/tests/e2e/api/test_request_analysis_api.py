from collections.abc import Iterator

import pytest

from src.domain.agent import Agent
from src.domain.citizen_request import (
    AnalysisUnavailableError,
    CitizenRequest,
    RequestAnalysis,
    RequestAnalyzer,
    RequestCategory,
    RequestPriority,
)
from src.features.citizen_request.router import get_request_analyzer
from src.main import app
from tests.e2e.api.conftest import API, PASSWORD, Platform

pytestmark = pytest.mark.anyio

REQUESTS = f"{API}/requests"


class FakeAnalyzer(RequestAnalyzer):
    """Recommande le premier agent candidat, ou l'id imposé par le test."""

    def __init__(self) -> None:
        self.forced_agent_id: str | None = None
        self.fail = False
        self.seen_candidates: list[Agent] = []

    def analyze(self, request: CitizenRequest, candidates: list[Agent]) -> RequestAnalysis:
        if self.fail:
            raise AnalysisUnavailableError()
        self.seen_candidates = candidates

        return RequestAnalysis(
            category=RequestCategory.PUBLIC_LIGHTING,
            priority=RequestPriority.HIGH,
            summary="Panne généralisée de l'éclairage dans la rue.",
            recommended_agent_id=self.forced_agent_id or (candidates[0].id if candidates else None),
            reason="Plusieurs foyers touchés depuis plus de 12 heures.",
        )


@pytest.fixture
def analyzer() -> Iterator[FakeAnalyzer]:
    fake = FakeAnalyzer()
    app.dependency_overrides[get_request_analyzer] = lambda: fake
    yield fake
    app.dependency_overrides.pop(get_request_analyzer, None)


async def _lighting_request(platform: Platform) -> tuple[str, str]:
    """Demande d'éclairage (institut voirie) et un agent voirie désactivé."""
    client = platform.client
    account = await client.post(
        f"{API}/users",
        headers=platform.admin,
        json={"email": "off@test.mg", "name": "Hery", "password": PASSWORD, "role": "agent"},
    )
    off = await client.post(
        f"{API}/agents",
        headers=platform.admin,
        json={"user_id": account.json()["id"], "institut_id": platform.instituts["voirie"]},
    )
    await client.post(f"{API}/agents/{off.json()['id']}/deactivate", headers=platform.admin)
    request = await platform.submit(title="Rue dans le noir", category="Éclairage public")

    return request.json()["id"], off.json()["id"]


async def test_analyze_returns_suggestion_without_modifying_request(
    platform: Platform, analyzer: FakeAnalyzer
) -> None:
    request_id, _off = await _lighting_request(platform)

    response = await platform.client.post(
        f"{REQUESTS}/{request_id}/analyze", headers=platform.as_("m1")
    )

    assert response.status_code == 200, response.text
    body = response.json()
    assert body["priority"] == "Haute"
    assert body["summary"] and body["reason"]
    assert body["recommended_agent"]["id"] == platform.agents["a1"]
    assert body["recommended_agent"]["name"] == "Nom ua1"
    assert body["recommended_agent"]["institut_name"] == "Voirie"
    # Seuls les agents actifs de l'institut de la demande sont proposés à l'IA.
    assert [a.id for a in analyzer.seen_candidates] == [platform.agents["a1"]]
    # Simple suggestion : la demande n'est pas modifiée.
    stored = await platform.client.get(f"{REQUESTS}/{request_id}", headers=platform.as_("m1"))
    assert stored.json()["priority"] != "Haute" or stored.json()["urgency"] == 3


async def test_hallucinated_or_ineligible_agent_is_dropped(
    platform: Platform, analyzer: FakeAnalyzer
) -> None:
    request_id, off = await _lighting_request(platform)

    for invented_id in ("agent-inexistant", off, platform.agents["a2"]):
        analyzer.forced_agent_id = invented_id
        body = (
            await platform.client.post(
                f"{REQUESTS}/{request_id}/analyze", headers=platform.as_("m1")
            )
        ).json()
        assert body["recommended_agent"] is None


async def test_ai_failure_returns_503(platform: Platform, analyzer: FakeAnalyzer) -> None:
    request_id, _ = await _lighting_request(platform)
    analyzer.fail = True

    response = await platform.client.post(
        f"{REQUESTS}/{request_id}/analyze", headers=platform.as_("m1")
    )

    assert response.status_code == 503
    assert response.json()["error"] == "AnalysisUnavailableError"


async def test_only_the_manager_of_the_request_analyzes(
    platform: Platform, analyzer: FakeAnalyzer
) -> None:
    request_id, _ = await _lighting_request(platform)
    url = f"{REQUESTS}/{request_id}/analyze"

    for key, expected in [("c1", 403), ("ua1", 403), ("m2", 403), ("admin", 200)]:
        assert (await platform.client.post(url, headers=platform.as_(key))).status_code == expected
    assert (
        await platform.client.post(f"{REQUESTS}/absent/analyze", headers=platform.admin)
    ).status_code == 404


async def test_missing_api_key_returns_503(
    platform: Platform, monkeypatch: pytest.MonkeyPatch
) -> None:
    from src.infrastructure.config import get_settings

    monkeypatch.setattr(get_settings(), "gemini_api_key", None)
    response = await platform.client.post(f"{REQUESTS}/x/analyze", headers=platform.admin)

    assert response.status_code == 503
    assert "GEMINI_API_KEY" in response.json()["detail"]
