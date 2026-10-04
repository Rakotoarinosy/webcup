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
        f"Votre code de vérification pour {APP_NAME} est : {code}\n\n"
        f"Il expire dans {ttl_minutes} minutes. Ne le communiquez à personne.\n\n"
        "Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message.\n"
    )

    html = f"""\
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
    
    <!-- En-tête -->
    <div style="background-color: #111827; padding: 24px; text-align: center;">
      <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: 1px;">
        {APP_NAME}
      </h2>
    </div>

    <!-- Corps de l'email -->
    <div style="padding: 32px 24px; color: #374151; line-height: 1.6; font-size: 16px;">
      <p style="margin-top: 0;">Bonjour <strong>{escape(name)}</strong>,</p>
      <p>Vous avez demandé à vous connecter ou à vérifier votre compte. Voici votre code de sécurité :</p>
      
      <!-- Bloc du code -->
      <div style="margin: 32px 0; padding: 20px; background-color: #f9fafb; border: 1px dashed #d1d5db; border-radius: 6px; text-align: center;">
        <p style="margin: 0; font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #111827;">
          {code}
        </p>
      </div>

      <p style="margin: 0;">Ce code expirera dans <strong>{ttl_minutes} minutes</strong>.</p>
      <p style="margin-top: 8px; color: #ef4444; font-size: 14px; font-weight: 500;">
        ⚠️ Ne partagez ce code avec personne.
      </p>
    </div>

    <!-- Pied de page -->
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
        Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail en toute sécurité.<br>
        Quelqu'un a peut-être saisi votre adresse par erreur.
      </p>
    </div>

  </div>
</body>
</html>"""

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
        message = EmailMessage()
        message["Subject"] = f"{code} est votre code de vérification {APP_NAME}"
        message["From"] = self._sender
        message["To"] = to
        message.set_content(text)
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
            logger.exception("verification email failed", extra={"smtp_host": self._host})
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
