import httpx
import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session
from unittest.mock import Mock

from src.domain.user.exceptions import SmsDeliveryUnavailableError
from src.domain.user.ports import SmsSender
from src.infrastructure.persistence.models import UserModel, VerificationCodeModel
from src.infrastructure.security.email_verification import get_email_verifier, get_sms_sender
from src.main import app

pytestmark = pytest.mark.anyio
AUTH = "/api/v1/auth"
PHONE = "+261341234567"
PAYLOAD = {"name": "Rina", "phone": "034 12 345 67", "password": "Motdepasse123"}


class CapturingSms(SmsSender):
    def __init__(self) -> None:
        self.sent: list[tuple[str, str]] = []

    def send_verification_code(self, to: str, code: str, ttl_minutes: int) -> None:
        self.sent.append((to, code))


@pytest.fixture
async def sms(client: httpx.AsyncClient) -> CapturingSms:
    sender = CapturingSms()
    app.dependency_overrides.pop(get_email_verifier, None)  # vrai vérificateur (voir conftest)
    app.dependency_overrides[get_sms_sender] = lambda: sender
    return sender


async def test_phone_registration_then_login_by_phone(
    client: httpx.AsyncClient, db_session: Session, sms: CapturingSms
) -> None:
    response = await client.post(f"{AUTH}/register", json=PAYLOAD)
    assert response.status_code == 201, response.text
    pending = response.json()
    assert pending["channel"] == "sms" and pending["email"] is None
    assert PHONE[4:-2] not in pending["destination"]  # numéro masqué
    assert sms.sent[-1][0] == PHONE  # « 034 12 345 67 » normalisé en E.164

    user = db_session.scalar(select(UserModel).where(UserModel.phone == PHONE))
    assert user is not None and user.email is None and not user.phone_verified

    data = {"challenge_id": pending["challenge_id"], "code": sms.sent[-1][1]}
    verified = await client.post(f"{AUTH}/verify-code", json=data)
    assert verified.status_code == 200, verified.text
    body = verified.json()["user"]
    assert body["phone"] == PHONE and body["phone_verified"] and body["email"] is None
    assert body["role"] == "citizen"

    await client.post(f"{AUTH}/logout")
    login = await client.post(
        f"{AUTH}/login", json={"identifier": PHONE, "password": PAYLOAD["password"]}
    )
    assert login.status_code == 202 and login.json()["channel"] == "sms"
    assert len(sms.sent) == 2
    again = {"challenge_id": login.json()["challenge_id"], "code": sms.sent[-1][1]}
    assert (await client.post(f"{AUTH}/verify-code", json=again)).status_code == 200


async def test_register_needs_exactly_one_contact(client: httpx.AsyncClient, sms: CapturingSms) -> None:
    base = {"name": "Rina", "password": "Motdepasse123"}
    assert (await client.post(f"{AUTH}/register", json=base)).status_code == 422
    both = {**base, "phone": PHONE, "email": "a@test.mg"}
    assert (await client.post(f"{AUTH}/register", json=both)).status_code == 422
    assert (await client.post(f"{AUTH}/register", json={**base, "phone": "12"})).status_code == 422
    assert sms.sent == []


async def test_confirmed_phone_cannot_be_registered_twice(
    client: httpx.AsyncClient, sms: CapturingSms
) -> None:
    pending = (await client.post(f"{AUTH}/register", json=PAYLOAD)).json()
    data = {"challenge_id": pending["challenge_id"], "code": sms.sent[-1][1]}
    assert (await client.post(f"{AUTH}/verify-code", json=data)).status_code == 200
    assert (await client.post(f"{AUTH}/register", json=PAYLOAD)).status_code == 409


async def test_resend_uses_the_sms_channel(
    client: httpx.AsyncClient, db_session: Session, sms: CapturingSms
) -> None:
    from datetime import UTC, datetime, timedelta

    pending = (await client.post(f"{AUTH}/register", json=PAYLOAD)).json()
    stored = db_session.get(VerificationCodeModel, pending["challenge_id"])
    assert stored is not None and stored.channel == "sms"
    stored.created_at = datetime.now(UTC) - timedelta(seconds=120)
    db_session.commit()
    resent = await client.post(f"{AUTH}/resend-code", json={"challenge_id": pending["challenge_id"]})
    assert resent.status_code == 200 and resent.json()["channel"] == "sms"
    assert len(sms.sent) == 2


async def test_gateway_failure_does_not_open_session(
    client: httpx.AsyncClient, db_session: Session, sms: CapturingSms
) -> None:
    failing = Mock(spec=SmsSender)
    failing.send_verification_code.side_effect = SmsDeliveryUnavailableError()
    app.dependency_overrides[get_sms_sender] = lambda: failing
    response = await client.post(f"{AUTH}/register", json=PAYLOAD)
    assert response.status_code == 503
    assert "set-cookie" not in response.headers
    assert db_session.scalar(select(VerificationCodeModel)) is None
