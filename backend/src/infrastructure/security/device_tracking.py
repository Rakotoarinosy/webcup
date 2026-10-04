"""Dépendances FastAPI du suivi des appareils (alertes de nouvelle connexion)."""

from fastapi import Depends, Request, Response
from sqlalchemy.orm import Session

from src.domain.account_security import KnownDeviceRepository, LoginContext, SecurityAlertSender
from src.domain.user.ports import EmailSender, SmsSender
from src.infrastructure.config import get_settings
from src.infrastructure.config.settings import Settings
from src.infrastructure.external.security_alerts import NewDeviceAlertSender
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.known_device_repository import (
    SqlAlchemyKnownDeviceRepository,
)
from src.infrastructure.security.client import approximate_location, client_ip
from src.infrastructure.security.email_verification import get_email_sender, get_sms_sender

DEVICE_COOKIE = "device_id"
DEVICE_COOKIE_PATH = "/api/v1/auth"
DEVICE_COOKIE_MAX_AGE = 400 * 86400  # plafond des navigateurs


def get_device_repo(db: Session = Depends(get_db)) -> KnownDeviceRepository:
    return SqlAlchemyKnownDeviceRepository(db)


def get_security_alerts(
    email: EmailSender = Depends(get_email_sender),
    sms: SmsSender = Depends(get_sms_sender),
) -> SecurityAlertSender:
    settings = get_settings()
    return NewDeviceAlertSender(email, sms, settings.public_frontend_url, settings.app_timezone)


def login_context(request: Request) -> LoginContext:
    settings = get_settings()
    token = request.cookies.get(DEVICE_COOKIE)
    return LoginContext(
        user_agent=request.headers.get("user-agent", "")[:512],
        ip=client_ip(request, settings.trust_forwarded_for),
        device_token=token if token and 20 <= len(token) <= 100 else None,
        location=approximate_location(request.headers),
    )


def set_device_cookie(response: Response, token: str, settings: Settings) -> None:
    response.set_cookie(
        key=DEVICE_COOKIE,
        value=token,
        max_age=DEVICE_COOKIE_MAX_AGE,
        httponly=True,
        secure=settings.cookie_secure,
        samesite=settings.cookie_samesite,
        path=DEVICE_COOKIE_PATH,
    )
