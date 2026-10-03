"""Service applicatif de confirmation par email : émission et validation des codes à 6 chiffres.

Un « challenge » = un code envoyé + un `challenge_id` secret remis au client qui l'a déclenché.
Valider ou renvoyer un code exige ce challenge_id : connaître l'email d'un autre ne permet donc
ni de deviner son code, ni de lui en faire envoyer en boucle.
"""

import hmac
import secrets
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from src.domain.user.entities import User, VerificationCode
from src.domain.user.exceptions import (
    CodeResendLockedError,
    EmailDeliveryUnavailableError,
    InvalidVerificationCodeError,
    VerificationCodeLockedError,
)
from src.domain.user.ports import CodeHasher, EmailSender, VerificationPolicy
from src.domain.user.repository import VerificationCodeRepository

_PURGE_AFTER = timedelta(days=1)


@dataclass(frozen=True)
class VerificationChallenge:
    challenge_id: str
    email: str
    expires_in: int  # secondes avant expiration du code
    resend_after: int  # secondes avant qu'un nouveau code puisse être demandé


class EmailVerifier:
    def __init__(
        self,
        codes: VerificationCodeRepository,
        hasher: CodeHasher,
        sender: EmailSender,
        policy: VerificationPolicy,
    ) -> None:
        self._codes = codes
        self._hasher = hasher
        self._sender = sender
        self._policy = policy

    def start(self, user: User, *, strict: bool = False) -> VerificationChallenge:
        """Envoie un code à l'utilisateur.

        Pendant le délai anti-spam : `strict=False` renvoie le challenge en cours sans renvoyer
        d'email (double clic) ; `strict=True` lève CodeResendLockedError (renvoi explicite).
        """
        now = datetime.now(UTC)
        existing = self._codes.get_for_user(user.id)
        if existing is not None:
            remaining = self._cooldown_remaining(existing, now)
            if remaining > 0:
                if strict:
                    raise CodeResendLockedError(remaining)
                return self._challenge(existing, user.email, now)

        self._codes.delete_created_before(now - _PURGE_AFTER)

        raw = f"{secrets.randbelow(10**6):06d}"
        code = VerificationCode(
            id=secrets.token_urlsafe(32),
            user_id=user.id,
            code_hash=self._hasher.hash(user.id, raw),
            expires_at=now + timedelta(minutes=self._policy.code_ttl_minutes),
            created_at=now,
        )
        self._codes.replace_for_user(code)
        try:
            self._sender.send_verification_code(
                user.email, user.name, raw, self._policy.code_ttl_minutes
            )
        except EmailDeliveryUnavailableError:
            # Pas de code orphelin : sinon le délai anti-spam bloquerait un nouvel essai.
            self._codes.delete_for_user(user.id)
            raise

        return self._challenge(code, user.email, now)

    def owner_of(self, challenge_id: str) -> str:
        """Id de l'utilisateur à qui appartient ce challenge (pour un renvoi de code)."""
        stored = self._codes.get_by_id(challenge_id)
        if stored is None:
            raise InvalidVerificationCodeError()

        return stored.user_id

    def check(self, challenge_id: str, code: str) -> str:
        """Valide le code et le consomme. Retourne l'id de l'utilisateur confirmé."""
        now = datetime.now(UTC)
        stored = self._codes.get_by_id(challenge_id)
        if stored is None or stored.expires_at <= now:
            raise InvalidVerificationCodeError()

        # L'essai est compté AVANT la comparaison, de façon atomique : pas de course possible.
        if not self._codes.consume_attempt(stored.id, self._policy.max_attempts):
            raise VerificationCodeLockedError()

        expected = stored.code_hash
        if not hmac.compare_digest(expected, self._hasher.hash(stored.user_id, code)):
            raise InvalidVerificationCodeError()

        if not self._codes.consume_verified(stored.id, expected, now):
            raise InvalidVerificationCodeError()

        return stored.user_id

    # ─── Interne ────────────────────────────────────────────────────

    def _cooldown_remaining(self, code: VerificationCode, now: datetime) -> int:
        elapsed = (now - code.created_at).total_seconds()

        return max(0, int(self._policy.resend_cooldown_seconds - elapsed + 0.999))

    def _challenge(
        self, code: VerificationCode, email: str, now: datetime
    ) -> VerificationChallenge:
        return VerificationChallenge(
            challenge_id=code.id,
            email=email,
            expires_in=max(0, int((code.expires_at - now).total_seconds())),
            resend_after=self._cooldown_remaining(code, now),
        )
