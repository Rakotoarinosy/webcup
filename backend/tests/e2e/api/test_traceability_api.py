"""F47 : les opérations restent consultables et traçables, chacun dans son périmètre."""

import pytest

from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

AUDIT = f"{API}/audit"
ACTIVITY = f"{API}/requests/activity"


async def test_administration_operations_are_journaled(platform: Platform) -> None:
    client = platform.client
    account = f"{API}/users/manage/{platform.users['c1']}"
    assert (
        await client.patch(account, headers=platform.admin, json={"is_active": False})
    ).is_success
    await client.post(
        f"{API}/agents/{platform.agents['a1']}/deactivate", headers=platform.as_("m1")
    )

    entries = (await client.get(AUDIT, headers=platform.admin, params={"page_size": 100})).json()
    actions = [item["action"] for item in entries["items"]]
    # Plus récent d'abord ; la mise en place du fixture est elle aussi tracée.
    assert actions[:2] == ["agent_deactivated", "account_deactivated"]
    assert {"institut_created", "agent_created", "account_created"} <= set(actions)
    deactivation = entries["items"][0]
    assert deactivation["actor_name"] == "Nom m1"
    assert deactivation["actor_role"] == "manager"
    assert deactivation["target_label"] == "Nom ua1"
    assert deactivation["institut_id"] == platform.instituts["voirie"]

    filtered = await client.get(
        AUDIT, headers=platform.admin, params={"action": "account_deactivated"}
    )
    assert [item["target_id"] for item in filtered.json()["items"]] == [platform.users["c1"]]


async def test_audit_is_scoped_to_the_managers_institut(platform: Platform) -> None:
    client = platform.client
    await client.post(
        f"{API}/agents/{platform.agents['a1']}/deactivate", headers=platform.as_("m1")
    )
    await client.post(
        f"{API}/agents/{platform.agents['a2']}/deactivate", headers=platform.as_("m2")
    )

    seen_by_m1 = (await client.get(AUDIT, headers=platform.as_("m1"))).json()["items"]
    assert seen_by_m1 and all(i["institut_id"] == platform.instituts["voirie"] for i in seen_by_m1)
    assert (await client.get(AUDIT, headers=platform.as_("m3"))).json()["items"] == []
    for key in ("c1", "ua1"):
        assert (await client.get(AUDIT, headers=platform.as_(key))).status_code == 403


async def test_agent_finds_the_activity_of_their_interventions(platform: Platform) -> None:
    client = platform.client
    mine = (await platform.submit("c1", title="Lampadaire cassé")).json()["id"]
    await platform.submit("c2", category="Eau", title="Fuite rue B")
    await client.post(
        f"{API}/requests/{mine}/assign",
        headers=platform.as_("m1"),
        json={"agent_id": platform.agents["a1"]},
    )
    await client.post(
        f"{API}/requests/{mine}/status", headers=platform.as_("ua1"), json={"status": "Résolu"}
    )

    page = (await client.get(ACTIVITY, headers=platform.as_("ua1"))).json()
    assert {item["request_title"] for item in page["items"]} == {"Lampadaire cassé"}
    newest = page["items"][0]
    assert newest["event"]["actor_name"] == "Nom ua1"
    assert newest["request_status"] == "Résolu"
    assigned = next(i for i in page["items"] if i["event"]["type"] == "assigned")
    assert assigned["event"]["payload"]["agent_name"] == "Nom ua1"

    only_created = await client.get(ACTIVITY, headers=platform.admin, params={"type": "created"})
    assert only_created.json()["total"] == 2
    search = await client.get(ACTIVITY, headers=platform.admin, params={"search": "fuite"})
    assert {i["request_title"] for i in search.json()["items"]} == {"Fuite rue B"}
    assert (await client.get(ACTIVITY, headers=platform.as_("m3"))).json()["total"] == 0
