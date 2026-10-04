"""Envoi des SMS de confirmation via httpSMS (httpsms.com) ; console en développement.

POST https://api.httpsms.com/v1/messages/send, en-tête `x-api-key`, corps JSON {content, from, to}.
L'API répond 202 : le message est mis en file puis envoyé par l'app Android installée sur le téléphone.
"""

import logging

import httpx

from src.domain.user.exceptions import SmsDeliveryUnavailableError
from src.domain.user.ports import SmsSender

logger = logging.getLogger(__name__)

APP_NAME = "Kotrana"


def _text(code: str, ttl_minutes: int) -> str:
    # ASCII uniquement : un accent bascule le SMS en UCS-2 (70 caractères au lieu de 160).
    return f"{APP_NAME}: votre code est {code}. Valable {ttl_minutes} min. Ne le partagez avec personne."


class HttpSmsSender(SmsSender):
    def __init__(self, url: str, api_key: str, from_number: str, timeout: float) -> None:
        self._url = url
        self._api_key = api_key
        self._from = from_number
        self._timeout = timeout

    def send_verification_code(self, to: str, code: str, ttl_minutes: int) -> None:
        try:
            response = httpx.post(
                self._url,
                headers={"x-api-key": self._api_key},
                json={"content": _text(code, ttl_minutes), "from": self._from, "to": to},
                timeout=self._timeout,
            )
            response.raise_for_status()
        except httpx.HTTPError as exc:
            # Ni le numéro ni le code ne sont journalisés.
            logger.error("verification sms failed: %s", type(exc).__name__)
            raise SmsDeliveryUnavailableError() from exc


class ConsoleSmsSender(SmsSender):
    """Sans gateway configuré : affiche le code dans les logs (développement uniquement)."""

    def __init__(self, allow_logging_code: bool) -> None:
        self._allow = allow_logging_code

    def send_verification_code(self, to: str, code: str, ttl_minutes: int) -> None:
        if not self._allow:
            logger.error(
                "SMS_GATEWAY_API_KEY / SMS_GATEWAY_FROM not configured: sms cannot be sent"
            )
            raise SmsDeliveryUnavailableError()
        logger.warning("DEV ONLY - verification code for %s: %s", to, code)
