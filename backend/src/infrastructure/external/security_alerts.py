"""Alertes « nouvelle connexion » par email et/ou SMS.

Un échec d'envoi n'empêche jamais la connexion : il est journalisé, et l'alerte reste visible
dans l'application (bandeau et page « Sécurité du compte »).
"""

import logging
from datetime import datetime
from html import escape
from zoneinfo import ZoneInfo

from src.domain.account_security import KnownDevice, SecurityAlertSender
from src.domain.user import User
from src.domain.user.ports import EmailSender, SmsSender

logger = logging.getLogger("security")

APP_NAME = "Terra Nova"


def _ascii(value: str) -> str:
    # Un accent bascule le SMS en UCS-2 (70 caractères au lieu de 160).
    table = str.maketrans("àâäéèêëîïôöùûüçÀÂÉÈÊÎÔÙÛÇ’", "aaaeeeeiioouuucAAEEEIOUUC'")
    return value.translate(table).encode("ascii", "ignore").decode()


class NewDeviceAlertSender(SecurityAlertSender):
    def __init__(
        self, email: EmailSender, sms: SmsSender, frontend_url: str, timezone: str
    ) -> None:
        self._email = email
        self._sms = sms
        self._security_url = f"{frontend_url}/home/security" if frontend_url else ""
        try:
            self._tz = ZoneInfo(timezone)
        except (KeyError, ValueError):
            self._tz = ZoneInfo("UTC")

    def _when(self, moment: datetime) -> str:
        return moment.astimezone(self._tz).strftime("%d/%m/%Y à %H:%M")

    def new_device_login(self, user: User, device: KnownDevice) -> list[str]:
        channels: list[str] = []
        if user.email:
            try:
                self._email.send_notice(user.email, *self._email_content(user, device))
                channels.append("email")
            except Exception:  # noqa: BLE001 — une alerte ne doit jamais bloquer la connexion
                logger.warning("new device alert email failed", extra={"user_id": user.id})
        if user.phone and (not channels or user.phone_verified):
            try:
                self._sms.send_text(user.phone, self._sms_content(device))
                channels.append("sms")
            except Exception:  # noqa: BLE001
                logger.warning("new device alert sms failed", extra={"user_id": user.id})
        return channels

    def _email_content(self, user: User, device: KnownDevice) -> tuple[str, str, str]:
        subject = f"Nouvelle connexion à votre compte {APP_NAME}"
        where = device.location or (f"réseau {device.network}" if device.network else "inconnu")
        when = self._when(device.first_seen_at)
        link = (
            f"\nOuvrez « Sécurité du compte » : {self._security_url}\n" if self._security_url else ""
        )
        text = (
            f"Bonjour {user.name},\n\n"
            f"Une connexion à votre compte {APP_NAME} vient d'avoir lieu depuis un nouvel appareil.\n\n"
            f"  Date : {when}\n  Appareil : {device.label}\n  Lieu approximatif : {where}\n\n"
            "C'était vous ? Vous n'avez rien à faire.\n\n"
            "Ce n'était pas vous ? Dans Terra Nova, ouvrez « Sécurité du compte », cliquez sur "
            "« Ce n'était pas moi » : toutes les autres sessions seront fermées. "
            "Changez ensuite votre mot de passe.\n"
            f"{link}"
        )
        button = (
            f'<p><a href="{escape(self._security_url)}" style="background:#047857;color:#fff;'
            'padding:10px 16px;border-radius:6px;text-decoration:none">Vérifier mes connexions</a></p>'
            if self._security_url
            else ""
        )
        html = f"""\
<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#1f2937">
  <h2 style="margin:0 0 16px">{APP_NAME}</h2>
  <p>Bonjour {escape(user.name)},</p>
  <p><strong>Une connexion à votre compte vient d'avoir lieu depuis un nouvel appareil.</strong></p>
  <ul>
    <li>Date : {escape(when)}</li>
    <li>Appareil : {escape(device.label)}</li>
    <li>Lieu approximatif : {escape(where)}</li>
  </ul>
  <p><strong>C'était vous ?</strong> Vous n'avez rien à faire.</p>
  <p><strong>Ce n'était pas vous ?</strong> Ouvrez « Sécurité du compte » et choisissez
  « Ce n'était pas moi » : les autres sessions seront fermées. Changez ensuite votre mot de passe.</p>
  {button}
</div>"""
        return subject, text, html

    def _sms_content(self, device: KnownDevice) -> str:
        when = device.first_seen_at.astimezone(self._tz).strftime("%d/%m %H:%M")
        return _ascii(
            f"{APP_NAME}: nouvelle connexion le {when} ({device.label}). "
            "Pas vous ? Ouvrez Securite du compte puis changez votre mot de passe."
        )[:300]
