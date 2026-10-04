"""Envoi des emails de confirmation : SMTP en production, console en développement."""

import logging
import smtplib
import ssl
from email.message import EmailMessage
from html import escape

from src.domain.user.exceptions import EmailDeliveryUnavailableError
from src.domain.user.ports import EmailSender

logger = logging.getLogger(__name__)

APP_NAME = "Terra Nova"


def _render(name: str, code: str, ttl_minutes: int) -> tuple[str, str]:
    text = (
        f"Bonjour {name},\n\n"
        f"Votre code de vérification {APP_NAME} est : {code}\n\n"
        f"Il expire dans {ttl_minutes} minutes. Ne le communiquez à personne.\n"
        "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.\n"
    )
    html = f"""\
<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#1f2937">
  <h2 style="margin:0 0 16px">{APP_NAME}</h2>
  <p>Bonjour {escape(name)},</p>
  <p>Votre code de vérification est :</p>
  <p style="font-size:32px;letter-spacing:8px;font-weight:bold;margin:24px 0">{code}</p>
  <p>Il expire dans {ttl_minutes} minutes. Ne le communiquez à personne.</p>
  <p style="color:#6b7280;font-size:13px">
    Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.
  </p>
</div>"""

    return text, html


class SmtpEmailSender(EmailSender):
    def __init__(
        self,
        host: str,
        port: int,
        username: str | None,
        password: str | None,
        sender: str,
        use_ssl: bool,
        timeout: float,
    ) -> None:
        self._host = host
        self._port = port
        self._username = username
        self._password = password
        self._sender = sender
        self._use_ssl = use_ssl
        self._timeout = timeout

    def send_verification_code(self, to: str, name: str, code: str, ttl_minutes: int) -> None:
        text, html = _render(name, code, ttl_minutes)
        self.send_message(to, f"{code} est votre code de vérification {APP_NAME}", text, html)

    def send_message(self, to: str, subject: str, text: str, html: str | None = None) -> None:
        """Envoi générique (rappels de rendez-vous…). Lève EmailDeliveryUnavailableError."""
        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = self._sender
        message["To"] = to
        message.set_content(text)
        if html is not None:
            message.add_alternative(html, subtype="html")

        context = ssl.create_default_context()
        try:
            if self._use_ssl:  # port 465 : TLS dès la connexion
                with smtplib.SMTP_SSL(
                    self._host, self._port, timeout=self._timeout, context=context
                ) as smtp:
                    self._deliver(smtp, message)
            else:  # port 587 : STARTTLS
                with smtplib.SMTP(self._host, self._port, timeout=self._timeout) as smtp:
                    smtp.starttls(context=context)
                    self._deliver(smtp, message)
        except (smtplib.SMTPException, OSError) as exc:
            logger.exception("email delivery failed", extra={"smtp_host": self._host})
            raise EmailDeliveryUnavailableError() from exc

    def _deliver(self, smtp: smtplib.SMTP, message: EmailMessage) -> None:
        if self._username and self._password:
            smtp.login(self._username, self._password)
        smtp.send_message(message)


class ConsoleEmailSender(EmailSender):
    """Sans SMTP configuré : affiche le code dans les logs (développement uniquement)."""

    def __init__(self, allow_logging_code: bool) -> None:
        self._allow = allow_logging_code

    def send_verification_code(self, to: str, name: str, code: str, ttl_minutes: int) -> None:
        if not self._allow:
            logger.error("SMTP_HOST is not configured: verification emails cannot be sent")
            raise EmailDeliveryUnavailableError()
        logger.warning("DEV ONLY - verification code for %s: %s", to, code)

    def send_message(self, to: str, subject: str, text: str, html: str | None = None) -> None:
        if not self._allow:
            logger.error("SMTP_HOST is not configured: emails cannot be sent")
            raise EmailDeliveryUnavailableError()
        logger.warning("DEV ONLY - email to %s: %s", to, subject)


def render_notice_html(name: str, title: str, text: str) -> str:
    """Email simple et lisible : le texte du message, paragraphe par paragraphe."""
    paragraphs = "".join(
        f'<p style="margin:0 0 8px">{escape(line)}</p>' if line else "<br>"
        for line in text.split("\n")
    )
    return f"""\
<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#1f2937">
  <h2 style="margin:0 0 16px">{APP_NAME}</h2>
  <p>Bonjour {escape(name)},</p>
  <h3 style="margin:16px 0">{escape(title)}</h3>
  {paragraphs}
</div>"""
