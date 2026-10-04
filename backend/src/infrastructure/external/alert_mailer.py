"""Envoi des alertes par email : SMTP (même configuration que les codes de vérification),
ou journal en développement. Un échec n'est jamais propagé à la publication de l'alerte."""

import logging
import smtplib
import ssl
from email.message import EmailMessage
from html import escape

from src.domain.alert import Alert, AlertMailer
from src.infrastructure.external.email_sender import APP_NAME

logger = logging.getLogger(__name__)


def render_alert(name: str, alert: Alert) -> tuple[str, str, str]:
    """Sujet, texte brut et HTML. Le niveau est écrit en toutes lettres (pas seulement une couleur)."""
    subject = f"[{APP_NAME}] {alert.level.value} : {alert.title}"
    zone = f"Zone concernée : {alert.zone}\n" if alert.zone else ""
    instructions = f"\nQue faire ?\n{alert.instructions}\n" if alert.instructions else ""
    text = (
        f"Bonjour {name},\n\n"
        f"{alert.issuer} publie un message officiel ({alert.level.value}).\n\n"
        f"{alert.title}\n\n{alert.message}\n{zone}{instructions}\n"
        f"Retrouvez toutes les alertes en cours sur {APP_NAME}.\n"
    )
    zone_html = (
        f"<p><strong>Zone concernée :</strong> {escape(alert.zone)}</p>" if alert.zone else ""
    )
    instructions_html = (
        f'<h3 style="margin:16px 0 4px">Que faire ?</h3>'
        f'<p style="white-space:pre-line">{escape(alert.instructions)}</p>'
        if alert.instructions
        else ""
    )
    html = f"""\
<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#1f2937">
  <p style="margin:0 0 8px;font-weight:bold">{APP_NAME} · {escape(alert.issuer)}</p>
  <p style="margin:0 0 16px;font-size:14px">Niveau : <strong>{escape(alert.level.value)}</strong></p>
  <h2 style="margin:0 0 12px">{escape(alert.title)}</h2>
  <p>Bonjour {escape(name)},</p>
  <p style="white-space:pre-line">{escape(alert.message)}</p>
  {zone_html}
  {instructions_html}
</div>"""
    return subject, text, html


class SmtpAlertMailer(AlertMailer):
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

    def send_alert(self, to: str, name: str, alert: Alert) -> None:
        subject, text, html = render_alert(name, alert)
        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = self._sender
        message["To"] = to
        message.set_content(text)
        message.add_alternative(html, subtype="html")

        context = ssl.create_default_context()
        if self._use_ssl:
            with smtplib.SMTP_SSL(
                self._host, self._port, timeout=self._timeout, context=context
            ) as smtp:
                self._deliver(smtp, message)
        else:
            with smtplib.SMTP(self._host, self._port, timeout=self._timeout) as smtp:
                smtp.starttls(context=context)
                self._deliver(smtp, message)

    def _deliver(self, smtp: smtplib.SMTP, message: EmailMessage) -> None:
        if self._username and self._password:
            smtp.login(self._username, self._password)
        smtp.send_message(message)


class LoggingAlertMailer(AlertMailer):
    """Sans SMTP configuré : l'envoi est seulement journalisé (aucune donnée personnelle)."""

    def send_alert(self, to: str, name: str, alert: Alert) -> None:
        logger.info("alert email not sent (SMTP not configured)", extra={"alert_id": alert.id})
