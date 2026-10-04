"""Contrats des adaptateurs Groq : aucune requête réseau réelle dans ces tests."""

from datetime import UTC, datetime

from src.domain.agent import Agent, AgentStatus
from src.domain.citizen_request import (
    CitizenRequest,
    RequestCategory,
    RequestPriority,
    RequestStatus,
)
from src.domain.virtual_assistant import AssistantQuery
from src.infrastructure.external import groq_analyzer, groq_assistant


class _FakeResponse:
    def __init__(self, payload: dict[str, object]) -> None:
        self._payload = payload

    def raise_for_status(self) -> None:
        pass

    def json(self) -> dict[str, object]:
        return self._payload


class _FakeClient:
    def __init__(self, response: _FakeResponse) -> None:
        self.response = response
        self.url = ""
        self.payload: dict[str, object] = {}

    def post(self, url: str, *, json: dict[str, object]) -> _FakeResponse:
        self.url = url
        self.payload = json
        return self.response


def test_groq_request_analyzer_sends_structured_chat_request(
    monkeypatch,  # type: ignore[no-untyped-def]
) -> None:
    client = _FakeClient(
        _FakeResponse(
            {
                "choices": [
                    {
                        "message": {
                            "content": (
                                '{"category":"Éclairage public","priority":"Haute",'
                                '"summary":"Panne eclairage.",'
                                '"recommended_agent_id":"agent-1",'
                                '"reason":"La rue est dans le noir."}'
                            )
                        }
                    }
                ]
            }
        )
    )
    monkeypatch.setattr(groq_analyzer.httpx, "Client", lambda **_: client)
    now = datetime.now(UTC)
    request = CitizenRequest(
        id="request-1",
        title="Lampadaire en panne",
        description="La rue est sombre.",
        category=RequestCategory.OTHER,
        priority=RequestPriority.NORMAL,
        status=RequestStatus.NEW,
        citizen_id="citizen-1",
        created_at=now,
        updated_at=now,
        location="Ankorondrano",
    )
    agent = Agent(
        id="agent-1",
        user_id="user-1",
        institut_id="institut-1",
        created_at=now,
        status=AgentStatus.AVAILABLE,
    )

    result = groq_analyzer.GroqRequestAnalyzer("test-key", "groq-test").analyze(request, [agent])

    assert result.category is RequestCategory.PUBLIC_LIGHTING
    assert result.recommended_agent_id == "agent-1"
    assert client.url == groq_analyzer.GROQ_CHAT_COMPLETIONS_URL
    assert client.payload["model"] == "groq-test"
    assert client.payload["response_format"] == {"type": "json_object"}


def test_groq_assistant_returns_the_validated_structured_reply(
    monkeypatch,  # type: ignore[no-untyped-def]
) -> None:
    client = _FakeClient(
        _FakeResponse(
            {
                "choices": [
                    {
                        "message": {
                            "content": (
                                '{"format":"steps","title":"Déposer une demande",'
                                '"message":"Voici comment faire.","steps":["Ouvrez Demandes"],'
                                '"notes":[],"follow_up":"", "service_ids":[]}'
                            )
                        }
                    }
                ]
            }
        )
    )
    monkeypatch.setattr(groq_assistant.httpx, "Client", lambda **_: client)

    result = groq_assistant.GroqAssistantResponder("test-key", "groq-test").respond(
        AssistantQuery(message="Comment déposer une demande ?")
    )

    assert result.title == "Déposer une demande"
    assert result.steps == ("Ouvrez Demandes",)
    assert client.url == groq_assistant.GROQ_CHAT_COMPLETIONS_URL
    assert client.payload["response_format"] == {"type": "json_object"}
