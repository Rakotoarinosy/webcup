"""Contrôle du périmètre des endpoints de suivi agent du domaine moderne."""

from datetime import UTC, datetime

import httpx
import pytest
from sqlalchemy.orm import Session

from src.domain.user import Role, User
from src.infrastructure.persistence.models import AgentModel, DemandeModel, UserModel
from src.infrastructure.security.deps import get_current_user
from src.main import app

pytestmark = pytest.mark.anyio

DEMANDES = "/api/v1/demandes"


async def test_agent_workspace_lists_only_assigned_demandes_and_summary(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    now = datetime.now(UTC)
    agent = AgentModel(id="agent-1", email="agent@mairie.mg", name="Agent", department="Voirie")
    other_agent = AgentModel(
        id="agent-2", email="other@mairie.mg", name="Autre agent", department="Eau"
    )
    db_session.add_all(
        [
            agent,
            other_agent,
            UserModel(id="citizen-1", email="citizen@mairie.mg", name="Habitant"),
            DemandeModel(
                id="d-1", title="Lampadaire", description="Panne", category="eclairage_public",
                priority="haute", status="en_cours", citizen_id="citizen-1", agent_id="agent-1",
                created_at=now, updated_at=now,
            ),
            DemandeModel(
                id="d-2", title="Fuite", description="Eau", category="eau", priority="moyenne",
                status="resolu", citizen_id="citizen-1", agent_id="agent-1",
                created_at=now, updated_at=now,
            ),
            DemandeModel(
                id="d-3", title="Voirie", description="Route", category="voirie", priority="faible",
                status="en_cours", citizen_id="citizen-1", agent_id="agent-2",
                created_at=now, updated_at=now,
            ),
        ]
    )
    db_session.commit()
    agent_user = User(
        id="user-agent-1", email="agent@mairie.mg", name="Agent", created_at=now,
        password_hash="", role=Role.AGENT, agent_id="agent-1",
    )
    app.dependency_overrides[get_current_user] = lambda: agent_user

    response = await client.get(DEMANDES)
    summary = await client.get(f"{DEMANDES}/agent/summary")

    assert response.status_code == 200
    assert {item["id"] for item in response.json()["items"]} == {"d-1", "d-2"}
    assert summary.status_code == 200
    assert summary.json() == {
        "total": 2, "nouveau": 0, "en_cours": 1, "en_attente": 0, "resolu": 1, "rejete": 0,
    }


async def test_agent_can_resolve_own_demande_but_not_another_agents(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    now = datetime.now(UTC)
    db_session.add_all(
        [
            AgentModel(id="agent-1", email="agent@mairie.mg", name="Agent", department="Voirie"),
            AgentModel(id="agent-2", email="other@mairie.mg", name="Autre", department="Eau"),
            UserModel(id="citizen-1", email="citizen@mairie.mg", name="Habitant"),
            *[
                DemandeModel(
                    id=f"d-{agent_id}", title="Demande", description="Description",
                    category="voirie", priority="moyenne", status="en_cours",
                    citizen_id="citizen-1", agent_id=agent_id, created_at=now, updated_at=now,
                )
                for agent_id in ("agent-1", "agent-2")
            ],
        ]
    )
    db_session.commit()
    agent_user = User(
        id="user-agent-1", email="agent@mairie.mg", name="Agent", created_at=now,
        password_hash="", role=Role.AGENT, agent_id="agent-1",
    )
    app.dependency_overrides[get_current_user] = lambda: agent_user

    own = await client.post(f"{DEMANDES}/d-agent-1/resolve")
    other = await client.post(f"{DEMANDES}/d-agent-2/resolve")

    assert own.status_code == 200
    assert own.json()["status"] == "resolu"
    assert other.status_code == 403
