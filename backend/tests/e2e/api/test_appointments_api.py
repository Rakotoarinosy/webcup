"""F39 : prise de rendez-vous avec un agent ; F40 : rappels avant le rendez-vous."""

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

import pytest
from sqlalchemy.orm import Session

from src.domain.appointment import AppointmentMessenger, NoticeChannel, NoticeStatus
from src.features.appointment.reminders import run_reminder_cycle
from src.features.appointment.use_cases import AppointmentPolicy
from src.infrastructure.persistence.appointment_repository import (
    SqlAlchemyAppointmentRepository,
)
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from tests.e2e.api.conftest import API, Platform

pytestmark = pytest.mark.anyio

APPTS = f"{API}/appointments"
TANA = ZoneInfo("Indian/Antananarivo")


def in_days(days: int) -> date:
    return datetime.now(TANA).date() + timedelta(days=days)


async def create_slot(
    platform: Platform, key: str = "ua1", day: date | None = None, start: str = "09:30", **extra
) -> dict:
    payload = {
        "day": (day or in_days(3)).isoformat(),
        "start_time": start,
        "duration_minutes": 30,
        "modality": "in_person",
        "location": "Hôtel de ville, guichet 2",
        "preparation": "Carte d'identité, justificatif de domicile",
        **extra,
    }
    response = await platform.client.post(f"{APPTS}/slots", headers=platform.as_(key), json=payload)
    assert response.status_code == 201, response.text
    return response.json()


async def book(platform: Platform, slot_id: str, key: str = "c1", **extra):
    payload = {"slot_id": slot_id, "reason": "Renouvellement de carte", **extra}
    return await platform.client.post(APPTS, headers=platform.as_(key), json=payload)


async def test_citizen_books_without_ambiguity(platform: Platform) -> None:
    client = platform.client
    slot = await create_slot(platform)
    # Le créneau est décrit en heure de la mairie, jour en toutes lettres, fuseau explicite.
    assert slot["time"]["start_time"] == "09:30"
    assert slot["time"]["timezone"] == "Indian/Antananarivo"
    assert slot["time"]["utc_offset"] == "UTC+3"
    assert slot["agent_name"] == "Nom ua1" and slot["institut_name"] == "Voirie"
    assert slot["capacity"] == 1

    services = (await client.get(f"{APPTS}/services", headers=platform.as_("c1"))).json()
    voirie = next(item for item in services if item["name"] == "Voirie")
    assert voirie["available_slots"] == 1
    institut_id = voirie["institut_id"]

    days = (
        await client.get(f"{APPTS}/services/{institut_id}/days", headers=platform.as_("c1"))
    ).json()
    assert [item["day"] for item in days] == [in_days(3).isoformat()]
    slots = (
        await client.get(
            f"{APPTS}/services/{institut_id}/slots",
            headers=platform.as_("c1"),
            params={"day": in_days(3).isoformat()},
        )
    ).json()
    assert [item["id"] for item in slots] == [slot["id"]]

    booked = await book(platform, slot["id"], reminders=["24h", "3h"])
    assert booked.status_code == 201, booked.text
    appointment = booked.json()
    assert appointment["reference"].startswith("RDV-")
    assert appointment["status"] == "confirmed"
    assert appointment["reminders"] == ["24h", "3h"]
    assert appointment["slot"]["preparation"].startswith("Carte d'identité")
    assert appointment["slot"]["directions_url"].startswith("https://www.google.com/maps")
    assert appointment["can_cancel"] is True

    # Plus de créneau libre ; pas de double réservation.
    again = await book(platform, slot["id"], key="c2")
    assert again.status_code == 409
    assert (await client.get(f"{APPTS}/services", headers=platform.as_("c2"))).json()[0][
        "available_slots"
    ] == 0

    # Chacun ne voit que ses rendez-vous.
    assert len((await client.get(f"{APPTS}/mine", headers=platform.as_("c1"))).json()) == 1
    assert (await client.get(f"{APPTS}/mine", headers=platform.as_("c2"))).json() == []
    forbidden = await client.get(f"{APPTS}/{appointment['id']}", headers=platform.as_("c2"))
    assert forbidden.status_code == 403

    ics = await client.get(f"{APPTS}/{appointment['id']}/calendar.ics", headers=platform.as_("c1"))
    assert ics.status_code == 200
    assert ics.headers["content-type"].startswith("text/calendar")
    assert "BEGIN:VEVENT" in ics.text and appointment["reference"] in ics.text


async def test_citizen_cancels_and_frees_the_slot(platform: Platform) -> None:
    slot = await create_slot(platform)
    appointment = (await book(platform, slot["id"])).json()
    cancelled = await platform.client.post(
        f"{APPTS}/{appointment['id']}/cancel", headers=platform.as_("c1"), json={}
    )
    assert cancelled.status_code == 200, cancelled.text
    assert cancelled.json()["status"] == "cancelled_by_citizen"
    # Le créneau est de nouveau proposé.
    rebooked = await book(platform, slot["id"], key="c2")
    assert rebooked.status_code == 201, rebooked.text


async def test_staff_cancels_with_reason_and_citizen_is_informed(
    platform: Platform, db_session: Session
) -> None:
    client = platform.client
    slot = await create_slot(platform)
    appointment = (await book(platform, slot["id"])).json()

    no_reason = await client.post(
        f"{APPTS}/{appointment['id']}/cancel", headers=platform.as_("ua1"), json={}
    )
    assert no_reason.status_code == 400
    outsider = await client.post(
        f"{APPTS}/{appointment['id']}/cancel",
        headers=platform.as_("m2"),
        json={"reason": "Pas mon institut"},
    )
    assert outsider.status_code == 403

    cancelled = await client.post(
        f"{APPTS}/{appointment['id']}/cancel",
        headers=platform.as_("m1"),
        json={"reason": "Agent en intervention d'urgence"},
    )
    assert cancelled.status_code == 200, cancelled.text
    assert cancelled.json()["status"] == "cancelled_by_city"
    assert cancelled.json()["citizen_name"] == "Nom c1"

    notifications = (await client.get(f"{API}/notifications", headers=platform.as_("c1"))).json()
    kinds = [item["kind"] for item in notifications["items"]]
    assert "appointment_cancelled" in kinds
    assert notifications["unread_count"] >= 1

    # L'email part par la tâche de fond.
    messenger = FakeMessenger()
    report = run_reminder_cycle(
        SqlAlchemyAppointmentRepository(db_session),
        SqlAlchemyUserRepository(db_session),
        messenger,
        AppointmentPolicy(tz=TANA, tz_name="Indian/Antananarivo"),
    )
    assert report.sent == 1
    assert messenger.emails[0][0] == "c1@test.mg"
    assert "annulé" in messenger.emails[0][1]

    audit = (
        await client.get(
            f"{API}/audit", headers=platform.admin, params={"action": "appointment_cancelled"}
        )
    ).json()
    assert audit["total"] == 1


async def test_series_planning_attendance_and_scope(platform: Platform) -> None:
    client = platform.client
    first = in_days(7)
    series = await client.post(
        f"{APPTS}/slots/series",
        headers=platform.as_("m1"),
        json={
            "agent_id": platform.agents["a1"],
            "first_day": first.isoformat(),
            "last_day": (first + timedelta(days=6)).isoformat(),
            "weekdays": [first.weekday()],
            "day_start": "08:00",
            "day_end": "09:00",
            "duration_minutes": 30,
            "modality": "phone",
            "location": "L'agent vous appelle",
        },
    )
    assert series.status_code == 201, series.text
    assert series.json()["created"] == 2

    # L'agent ne peut pas avoir deux créneaux qui se chevauchent.
    overlap = await client.post(
        f"{APPTS}/slots",
        headers=platform.as_("ua1"),
        json={
            "day": first.isoformat(),
            "start_time": "08:15",
            "duration_minutes": 30,
            "modality": "in_person",
            "location": "Bureau 3",
        },
    )
    assert overlap.status_code == 409

    params = {"from_day": first.isoformat(), "to_day": first.isoformat()}
    planning = (
        await client.get(f"{APPTS}/slots", headers=platform.as_("ua1"), params=params)
    ).json()
    assert len(planning) == 2 and planning[0]["appointment"] is None
    assert (
        await client.get(f"{APPTS}/slots", headers=platform.as_("m2"), params=params)
    ).json() == []
    assert (
        len((await client.get(f"{APPTS}/slots", headers=platform.admin, params=params)).json()) == 2
    )
    citizen = await client.get(f"{APPTS}/slots", headers=platform.as_("c1"), params=params)
    assert citizen.status_code == 403

    # Téléphone : un numéro est nécessaire.
    no_phone = await book(platform, planning[0]["id"])
    assert no_phone.status_code == 400
    booked = await book(platform, planning[0]["id"], contact_phone="+261340000001")
    assert booked.status_code == 201, booked.text

    planning = (
        await client.get(f"{APPTS}/slots", headers=platform.as_("ua1"), params=params)
    ).json()
    assert planning[0]["appointment"]["citizen_name"] == "Nom c1"
    # Trop tôt pour noter la présence.
    early = await client.post(
        f"{APPTS}/{booked.json()['id']}/attendance",
        headers=platform.as_("ua1"),
        json={"status": "honored"},
    )
    assert early.status_code == 400

    # Un créneau réservé ne se ferme pas ; un créneau libre, oui.
    closed_booked = await client.post(
        f"{APPTS}/slots/{planning[0]['id']}/close", headers=platform.as_("ua1")
    )
    assert closed_booked.status_code == 409
    closed = await client.post(
        f"{APPTS}/slots/{planning[1]['id']}/close", headers=platform.as_("ua1")
    )
    assert closed.status_code == 200 and closed.json()["is_open"] is False

    audit = (
        await client.get(
            f"{API}/audit",
            headers=platform.as_("m1"),
            params={"action": "appointment_slots_created"},
        )
    ).json()
    assert audit["total"] == 1


async def test_past_slot_cannot_be_created(platform: Platform) -> None:
    response = await platform.client.post(
        f"{APPTS}/slots",
        headers=platform.as_("ua1"),
        json={
            "day": in_days(-1).isoformat(),
            "start_time": "09:00",
            "duration_minutes": 30,
            "modality": "video",
            "location": "https://visio.example/salle",
        },
    )
    assert response.status_code == 400


class FakeMessenger(AppointmentMessenger):
    def __init__(self, fail: bool = False) -> None:
        self.fail = fail
        self.emails: list[tuple[str, str, str]] = []
        self.sms: list[tuple[str, str]] = []

    def send_email(self, to: str, name: str, subject: str, text: str) -> None:
        if self.fail:
            raise RuntimeError("smtp down")
        self.emails.append((to, subject, text))

    def send_sms(self, to: str, text: str) -> None:
        if self.fail:
            raise RuntimeError("gateway down")
        self.sms.append((to, text))


async def test_reminders_are_sent_once_and_retried_after_failure(
    platform: Platform, db_session: Session
) -> None:
    slot = await create_slot(platform)
    appointment = (await book(platform, slot["id"])).json()
    starts_at = datetime.fromisoformat(appointment["slot"]["time"]["starts_at"])
    repo = SqlAlchemyAppointmentRepository(db_session)
    users = SqlAlchemyUserRepository(db_session)
    policy = AppointmentPolicy(tz=TANA, tz_name="Indian/Antananarivo")

    # Trop tôt : rien.
    quiet = FakeMessenger()
    report = run_reminder_cycle(repo, users, quiet, policy, starts_at - timedelta(hours=30))
    assert report.scheduled == 0 and quiet.emails == []

    # 23 h avant : le rappel 24 h est planifié, mais l'envoi échoue.
    down = FakeMessenger(fail=True)
    now = starts_at - timedelta(hours=23)
    report = run_reminder_cycle(repo, users, down, policy, now)
    assert (report.scheduled, report.sent, report.failed) == (1, 0, 1)

    # Nouvel essai au tour suivant (après le délai) : envoyé, une seule fois.
    up = FakeMessenger()
    run_reminder_cycle(repo, users, up, policy, now + timedelta(minutes=5))
    run_reminder_cycle(repo, users, up, policy, now + timedelta(minutes=10))
    assert len(up.emails) == 1
    assert "Rappel" in up.emails[0][1] and appointment["reference"] in up.emails[0][2]

    notices = repo.list_notices([appointment["id"]])
    assert {(n.channel, n.status) for n in notices} == {
        (NoticeChannel.IN_APP, NoticeStatus.SENT),
        (NoticeChannel.EMAIL, NoticeStatus.SENT),
    }
    notifications = (
        await platform.client.get(f"{API}/notifications", headers=platform.as_("c1"))
    ).json()
    assert any(item["kind"] == "appointment_reminder" for item in notifications["items"])

    # 1 h avant : second rappel ; puis plus rien.
    later = FakeMessenger()
    run_reminder_cycle(repo, users, later, policy, starts_at - timedelta(minutes=50))
    run_reminder_cycle(repo, users, later, policy, starts_at - timedelta(minutes=40))
    assert len(later.emails) == 1
