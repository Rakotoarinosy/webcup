"""Envoi des rappels et annulations de rendez-vous : réutilise l'email SMTP et le SMS httpSMS.

Sans SMTP / passerelle SMS configurés, les messages sont écrits dans les logs en développement
et échouent ailleurs (ils seront retentés, puis abandonnés après le nombre maximal d'essais).
"""

import unicodedata

from src.domain.appointment import AppointmentMessenger
from src.infrastructure.config import Settings
from src.infrastructure.external.email_sender import (
    ConsoleEmailSender,
    SmtpEmailSender,
    render_notice_html,
)
from src.infrastructure.external.sms_sender import ConsoleSmsSender, HttpSmsSender


def sms_safe(text: str, limit: int = 300) -> str:
    """ASCII uniquement : un accent bascule le SMS en UCS-2 (70 caractères au lieu de 160)."""
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return ascii_text[:limit]


class SenderAppointmentMessenger(AppointmentMessenger):
    def __init__(
        self,
        email: SmtpEmailSender | ConsoleEmailSender,
        sms: HttpSmsSender | ConsoleSmsSender,
    ) -> None:
        self._email = email
        self._sms = sms

    @classmethod
    def from_settings(cls, settings: Settings) -> "SenderAppointmentMessenger":
        is_dev = settings.environment == "development"
        email: SmtpEmailSender | ConsoleEmailSender
        if settings.smtp_host:
            email = SmtpEmailSender(
                host=settings.smtp_host,
                port=settings.smtp_port,
                username=settings.smtp_username,
                password=settings.smtp_password,
                sender=settings.smtp_from,
                use_ssl=settings.smtp_use_ssl,
                timeout=settings.smtp_timeout_seconds,
            )
        else:
            email = ConsoleEmailSender(allow_logging_code=is_dev)
        sms: HttpSmsSender | ConsoleSmsSender
        if settings.sms_gateway_api_key and settings.sms_gateway_from:
            sms = HttpSmsSender(
                url=settings.sms_gateway_url,
                api_key=settings.sms_gateway_api_key,
                from_number=settings.sms_gateway_from,
                timeout=settings.sms_gateway_timeout_seconds,
            )
        else:
            sms = ConsoleSmsSender(allow_logging_code=is_dev)
        return cls(email, sms)

    def send_email(self, to: str, name: str, subject: str, text: str) -> None:
        self._email.send_message(to, subject, text, render_notice_html(name, subject, text))

    def send_sms(self, to: str, text: str) -> None:
        self._sms.send_text(to, sms_safe(text))
