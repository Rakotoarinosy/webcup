"""Anti-robots sans CAPTCHA : jeton de formulaire signé + délai minimal + pot de miel.

Le frontend demande un jeton à l'ouverture du formulaire (GET /security/form-token) et le
renvoie à l'envoi dans l'en-tête X-Form-Token. Un envoi plus rapide que le délai minimal
(robot) ou avec le champ invisible rempli (en-tête X-Form-Trap) est refusé discrètement.
"""

import base64
import hashlib
import hmac
import secrets
import time
from dataclasses import dataclass
from enum import StrEnum

FORM_TOKEN_HEADER = "x-form-token"
FORM_TRAP_HEADER = "x-form-trap"


class FormCheck(StrEnum):
    OK = "ok"
    MISSING = "missing"
    INVALID = "invalid"
    EXPIRED = "expired"
    TOO_FAST = "too_fast"
    TRAPPED = "trapped"


@dataclass(frozen=True)
class FormTokenSigner:
    secret_key: str
    min_fill_seconds: float = 2.0
    max_age_seconds: int = 24 * 3600

    def _sign(self, payload: str) -> str:
        key = self.secret_key.encode()
        digest = hmac.new(key, f"form-token:{payload}".encode(), hashlib.sha256).digest()
        return base64.urlsafe_b64encode(digest[:18]).decode().rstrip("=")

    def issue(self, now: float | None = None) -> str:
        issued = f"{(now if now is not None else time.time()):.3f}"
        payload = f"{issued}.{secrets.token_urlsafe(9)}"
        return f"{payload}.{self._sign(payload)}"

    def check(self, token: str | None, trap: str | None, now: float | None = None) -> FormCheck:
        if trap:
            return FormCheck.TRAPPED
        if not token:
            return FormCheck.MISSING
        parts = token.split(".")
        if len(parts) != 4 or len(token) > 200:
            return FormCheck.INVALID
        payload = ".".join(parts[:3])
        if not hmac.compare_digest(self._sign(payload), parts[3]):
            return FormCheck.INVALID
        try:
            issued = float(f"{parts[0]}.{parts[1]}")
        except ValueError:
            return FormCheck.INVALID
        age = (now if now is not None else time.time()) - issued
        if age < self.min_fill_seconds:
            return FormCheck.TOO_FAST
        if age > self.max_age_seconds:
            return FormCheck.EXPIRED
        return FormCheck.OK
