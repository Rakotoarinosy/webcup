"""Le dashboard sert tous les rôles, chacun dans son périmètre (« Mon espace » pour un citoyen)."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

DASHBOARD = f"{API}/dashboard"


async def test_dashboard_is_scoped_by_role(platform: Platform) -> None:
    roads = (await platform.submit("c1")).json()["id"]
    await platform.submit("c1", category="Éclairage public")
    await platform.submit("c2", category="Eau")
    await platform.client.post(
        f"{API}/requests/{roads}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )
    await platform.client.post(
        f"{API}/requests/{roads}/status",
        headers=platform.as_("ua1"),
        json={"status": "Résolu"},
    )

    async def stats(key: str) -> dict:
        response = await platform.client.get(DASHBOARD, headers=platform.as_(key))
        assert response.status_code == 200, response.text
        return response.json()

    admin = await stats("admin")
    assert admin["total"] == 3
    assert admin["resolved"] == 1 and admin["resolved_today"] == 1
    assert admin["pending_count"] == 2
    assert admin["by_category"]["Eau"] == 1
    assert len(admin["daily"]) == 7
    assert admin["daily"][-1]["created"] == 3 and admin["daily"][-1]["resolved"] == 1

    assert (await stats("m1"))["total"] == 2
    assert (await stats("m2"))["total"] == 1
    assert (await stats("m3"))["total"] == 0
    assert (await stats("ua1"))["total"] == 1
    assert (await stats("c1"))["total"] == 2
    assert (await stats("c2"))["open"] == 1


async def test_dashboard_days_parameter(platform: Platform) -> None:
    response = await platform.client.get(
        DASHBOARD, headers=platform.as_("admin"), params={"days": 14}
    )
    assert len(response.json()["daily"]) == 14
    assert (
        await platform.client.get(DASHBOARD, headers=platform.as_("admin"), params={"days": 60})
    ).status_code == 422
