from datetime import UTC, datetime, timedelta
from unittest.mock import Mock

import httpx
import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.user.ports import EmailSender, GoogleProfile
from src.infrastructure.config.settings import get_settings
from src.infrastructure.persistence.models import UserModel, VerificationCodeModel
from src.infrastructure.security.email_verification import (
    get_email_sender,
    get_email_verifier,
    get_google_verifier,
)
from src.main import app

pytestmark = pytest.mark.anyio
AUTH = "/api/v1/auth"
PAYLOAD = {
    "name": "Rina",
    "email": "verified@test.mg",
    "password": "Motdepasse123",
    "role": "admin",
}


class CapturingSender(EmailSender):
    def __init__(self) -> None:
        self.codes: list[str] = []

    def send_verification_code(self, to: str, name: str, code: str, ttl_minutes: int) -> None:
        self.codes.append(code)


@pytest.fixture
async def verification(client: httpx.AsyncClient) -> CapturingSender:
    sender = CapturingSender()
    app.dependency_overrides.pop(get_email_verifier, None)  # vrai vérificateur (voir conftest)
    settings = get_settings().model_copy(update={"email_verification_required": True})
    app.dependency_overrides[get_settings] = lambda: settings
    app.dependency_overrides[get_email_sender] = lambda: sender
    return sender


async def challenge(client: httpx.AsyncClient) -> dict[str, object]:
    response = await client.post(f"{AUTH}/register", json=PAYLOAD)
    assert response.status_code == 201, response.text
    body = response.json()
    assert body["channel"] == "email"
    assert body["destination"] == PAYLOAD["email"]
    assert set(body) == {"challenge_id", "channel", "destination", "email", "expires_in", "resend_after"}
    assert "set-cookie" not in response.headers
    assert response.headers["cache-control"] == "no-store"
    return body


async def test_registration_requires_code_then_opens_usable_citizen_session(
    client: httpx.AsyncClient,
    db_session: Session,
    verification: CapturingSender,
) -> None:
    pending = await challenge(client)
    user = db_session.scalar(select(UserModel).where(UserModel.email == PAYLOAD["email"]))
    assert user is not None and user.role == "citizen" and not user.email_verified
    stored = db_session.get(VerificationCodeModel, pending["challenge_id"])
    assert stored is not None and stored.code_hash != verification.codes[-1]
    login = await client.post(f"{AUTH}/login", json=PAYLOAD)
    assert login.status_code == 202 and login.json()["challenge_id"] == pending["challenge_id"]
    assert len(verification.codes) == 1
    data = {"challenge_id": pending["challenge_id"], "code": verification.codes[-1]}
    verified = await client.post(f"{AUTH}/verify-code", json=data)
    assert verified.status_code == 200, verified.text
    body = verified.json()
    assert body["user"]["email_verified"] and body["user"]["role"] == "citizen"
    assert body["user"]["agent_id"] is None and body["user"]["institut_id"] is None
    assert "httponly" in verified.headers["set-cookie"].lower()
    headers = {"Authorization": f"Bearer {body['access_token']}"}
    assert (await client.get(f"{AUTH}/me", headers=headers)).json() == body["user"]
    assert (await client.get("/api/v1/agents", headers=headers)).status_code == 403
    assert (await client.post(f"{AUTH}/refresh")).status_code == 200
    assert (await client.post(f"{AUTH}/verify-code", json=data)).status_code == 400
    await client.post(f"{AUTH}/logout")
    login = await client.post(f"{AUTH}/login", json=PAYLOAD)
    assert login.status_code == 202
    assert "access_token" not in login.json()
    assert "set-cookie" not in login.headers
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401
    assert len(verification.codes) == 2
    verified_again = await client.post(
        f"{AUTH}/verify-code",
        json={"challenge_id": login.json()["challenge_id"], "code": verification.codes[-1]},
    )
    assert verified_again.status_code == 200
    assert "access_token" in verified_again.json()


async def test_wrong_codes_are_limited_and_do_not_issue_a_session(
    client: httpx.AsyncClient,
    verification: CapturingSender,
) -> None:
    pending = await challenge(client)
    wrong = "000000" if verification.codes[-1] != "000000" else "999999"
    data = {"challenge_id": pending["challenge_id"], "code": wrong}
    for _ in range(5):
        assert (await client.post(f"{AUTH}/verify-code", json=data)).status_code == 400
    assert (
        await client.post(f"{AUTH}/verify-code", json={**data, "code": verification.codes[-1]})
    ).status_code == 429
    assert client.cookies.get("refresh_token") is None


async def test_expiry_resend_cooldown_and_old_challenge_invalidation(
    client: httpx.AsyncClient,
    db_session: Session,
    verification: CapturingSender,
) -> None:
    pending = await challenge(client)
    data = {"challenge_id": pending["challenge_id"]}
    assert (await client.post(f"{AUTH}/resend-code", json=data)).status_code == 429
    stored = db_session.get(VerificationCodeModel, pending["challenge_id"])
    assert stored is not None
    stored.expires_at = datetime.now(UTC) - timedelta(seconds=1)
    stored.created_at = datetime.now(UTC) - timedelta(seconds=120)
    db_session.commit()
    assert (
        await client.post(f"{AUTH}/verify-code", json={**data, "code": verification.codes[-1]})
    ).status_code == 400
    resent = await client.post(f"{AUTH}/resend-code", json=data)
    assert resent.status_code == 200, resent.text
    assert resent.json()["challenge_id"] != pending["challenge_id"]
    assert (
        await client.post(f"{AUTH}/verify-code", json={**data, "code": verification.codes[-1]})
    ).status_code == 400
    assert (
        await client.post(
            f"{AUTH}/verify-code",
            json={"challenge_id": resent.json()["challenge_id"], "code": verification.codes[-1]},
        )
    ).status_code == 200


async def test_resuming_signup_cannot_overwrite_password_during_cooldown(
    client: httpx.AsyncClient,
    db_session: Session,
    verification: CapturingSender,
) -> None:
    await challenge(client)
    user = db_session.scalar(select(UserModel).where(UserModel.email == PAYLOAD["email"]))
    assert user is not None
    original = user.password_hash
    changed = {**PAYLOAD, "password": "AutreMotdepasse123"}
    assert (await client.post(f"{AUTH}/register", json=changed)).status_code == 429
    db_session.refresh(user)
    assert user.password_hash == original


async def test_google_pending_signup_discards_untrusted_password_and_confirms_citizen(
    client: httpx.AsyncClient,
    db_session: Session,
    verification: CapturingSender,
) -> None:
    await challenge(client)
    verifier = Mock()
    verifier.verify.return_value = GoogleProfile("google-sub", PAYLOAD["email"], True, "Rina", None)
    app.dependency_overrides[get_google_verifier] = lambda: verifier
    result = await client.post(f"{AUTH}/google", json={"credential": "test-credential-long-enough"})
    assert result.status_code == 200, result.text
    user = db_session.scalar(select(UserModel).where(UserModel.email == PAYLOAD["email"]))
    assert user is not None
    db_session.refresh(user)
    assert user.google_id == "google-sub" and not user.password_hash
    data = {"challenge_id": result.json()["challenge_id"], "code": verification.codes[-1]}
    verified = await client.post(f"{AUTH}/verify-code", json=data)
    assert verified.status_code == 200 and verified.json()["user"]["role"] == "citizen"
    assert (await client.post(f"{AUTH}/login", json=PAYLOAD)).status_code == 401

    await client.post(f"{AUTH}/logout")
    again = await client.post(f"{AUTH}/google", json={"credential": "test-credential-long-enough"})
    assert again.status_code == 200
    assert "access_token" not in again.json()
    assert "set-cookie" not in again.headers
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401
    assert len(verification.codes) == 2
    assert (
        await client.post(
            f"{AUTH}/verify-code",
            json={"challenge_id": again.json()["challenge_id"], "code": verification.codes[-1]},
        )
    ).status_code == 200


async def test_registration_cannot_skip_verification_with_legacy_setting(
    client: httpx.AsyncClient, verification: CapturingSender,
) -> None:
    settings = get_settings().model_copy(update={"email_verification_required": False})
    app.dependency_overrides[get_settings] = lambda: settings
    await challenge(client)
    assert len(verification.codes) == 1
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401


async def test_email_delivery_failure_does_not_open_session(
    client: httpx.AsyncClient, db_session: Session, verification: CapturingSender,
) -> None:
    from src.domain.user.exceptions import EmailDeliveryUnavailableError

    sender = Mock(spec=EmailSender)
    sender.send_verification_code.side_effect = EmailDeliveryUnavailableError()
    app.dependency_overrides[get_email_sender] = lambda: sender
    response = await client.post(f"{AUTH}/register", json=PAYLOAD)
    assert response.status_code == 503
    assert "set-cookie" not in response.headers
    assert "access_token" not in response.json()
    assert db_session.scalar(select(VerificationCodeModel)) is None
    assert (await client.post(f"{AUTH}/refresh")).status_code == 401


async def test_public_config_exposes_only_google_client_id(client: httpx.AsyncClient) -> None:
    settings = get_settings().model_copy(update={"google_client_id": "example.apps.googleusercontent.com"})
    app.dependency_overrides[get_settings] = lambda: settings
    response = await client.get(f"{AUTH}/config")
    assert response.status_code == 200
    assert response.json() == {"google_client_id": settings.google_client_id}
    assert response.headers["cache-control"] == "no-store"
