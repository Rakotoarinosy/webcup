from datetime import UTC, datetime

import httpx
import pytest
from sqlalchemy.orm import Session

from src.domain.user import Role, User
from src.infrastructure.persistence.models import AgentModel, DemandeModel, UserModel
from src.infrastructure.security.deps import get_current_user
from src.main import app

pytestmark = pytest.mark.anyio

DASHBOARD_STATS = "/api/v1/dashboard/stats"


async def test_dashboard_stats_pending_count_is_scoped_for_agents_and_global_for_managers_and_admins(
    client: httpx.AsyncClient, db_session: Session
) -> None:
    now = datetime.now(UTC)
    db_session.add_all(
        [
            AgentModel(id="agent-1", email="agent-1@test.mg", name="Agent 1", department="Voirie"),
            AgentModel(id="agent-2", email="agent-2@test.mg", name="Agent 2", department="Eau"),
            UserModel(id="citizen-1", email="citizen@test.mg", name="Citizen"),
            *[
                DemandeModel(
                    id=f"d-{index}",
                    title="Demande",
                    description="Description",
                    category="voirie",
                    priority="moyenne",
                    status=status,
                    citizen_id="citizen-1",
                    agent_id=agent_id,
                    created_at=now,
                    updated_at=now,
                )
                for index, (status, agent_id) in enumerate(
                    [
                        ("nouveau", "agent-1"),
                        ("en_attente", "agent-1"),
                        ("nouveau", "agent-2"),
                        ("en_attente", None),
                        ("en_cours", "agent-1"),
                        ("resolu", "agent-2"),
                    ]
                )
            ],
        ]
    )
    db_session.commit()

    user = User(
        id="user-agent-1",
        email="agent-1@test.mg",
        name="Agent 1",
        created_at=now,
        password_hash="",
        role=Role.AGENT,
        agent_id="agent-1",
    )
    app.dependency_overrides[get_current_user] = lambda: user

    agent_response = await client.get(DASHBOARD_STATS)

    assert agent_response.status_code == 200
    assert agent_response.json()["pending_count"] == 2

    app.dependency_overrides[get_current_user] = lambda: User(
        id="manager",
        email="manager@test.mg",
        name="Manager",
        created_at=now,
        password_hash="",
        role=Role.MANAGER,
    )
    manager_response = await client.get(DASHBOARD_STATS)

    assert manager_response.status_code == 200
    assert manager_response.json()["pending_count"] == 4

    app.dependency_overrides[get_current_user] = lambda: User(
        id="admin",
        email="admin@test.mg",
        name="Admin",
        created_at=now,
        password_hash="",
        role=Role.ADMIN,
    )
    admin_response = await client.get(DASHBOARD_STATS)

    assert admin_response.status_code == 200
    assert admin_response.json()["pending_count"] == 4


async def test_citizen_cannot_access_dashboard_stats(
    client: httpx.AsyncClient,
) -> None:
    app.dependency_overrides[get_current_user] = lambda: User(
        id="citizen",
        email="citizen@test.mg",
        name="Citizen",
        created_at=datetime.now(UTC),
        password_hash="",
        role=Role.CITIZEN,
    )

    response = await client.get(DASHBOARD_STATS)

    assert response.status_code == 403
