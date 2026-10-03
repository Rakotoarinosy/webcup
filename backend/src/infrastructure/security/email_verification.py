"""Dépendances FastAPI propres à la confirmation par email et à la connexion Google."""

from functools import lru_cache

from fastapi import Depends
from sqlalchemy.orm import Session

from src.domain.user.ports import (
    CodeHasher,
    EmailSender,
    GoogleIdentityVerifier,
    VerificationPolicy,
)
from src.domain.user.repository import VerificationCodeRepository
from src.features.auth.verification import EmailVerifier
from src.infrastructure.config import get_settings
from src.infrastructure.external.email_sender import ConsoleEmailSender, SmtpEmailSender
from src.infrastructure.external.google_identity import GoogleIdTokenVerifier
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.verification_code_repository import (
    SqlAlchemyVerificationCodeRepository,
)
from src.infrastructure.security.code_hasher import HmacCodeHasher


def get_verification_code_repo(db: Session = Depends(get_db)) -> VerificationCodeRepository:
    return SqlAlchemyVerificationCodeRepository(db)


@lru_cache
def get_code_hasher() -> CodeHasher:
    return HmacCodeHasher(get_settings().secret_key)


@lru_cache
def get_email_sender() -> EmailSender:
    settings = get_settings()
    if settings.smtp_host:
        return SmtpEmailSender(
            host=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_username,
            password=settings.smtp_password,
            sender=settings.smtp_from,
            use_ssl=settings.smtp_use_ssl,
            timeout=settings.smtp_timeout_seconds,
        )

    return ConsoleEmailSender(allow_logging_code=False)


@lru_cache
def get_google_verifier() -> GoogleIdentityVerifier:
    return GoogleIdTokenVerifier(get_settings().google_client_id)


def get_verification_policy() -> VerificationPolicy:
    settings = get_settings()

    return VerificationPolicy(
        code_ttl_minutes=settings.verification_code_ttl_minutes,
        max_attempts=settings.verification_max_attempts,
        resend_cooldown_seconds=settings.verification_resend_cooldown_seconds,
    )


def get_email_verifier(
    codes: VerificationCodeRepository = Depends(get_verification_code_repo),
    hasher: CodeHasher = Depends(get_code_hasher),
    sender: EmailSender = Depends(get_email_sender),
    policy: VerificationPolicy = Depends(get_verification_policy),
) -> EmailVerifier:
    return EmailVerifier(codes, hasher, sender, policy)
