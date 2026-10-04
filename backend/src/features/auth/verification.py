"""Service applicatif de confirmation : émission et validation des codes à 6 chiffres (email ou SMS).

Un « challenge » = un code envoyé + un `challenge_id` secret remis au client qui l'a déclenché.
Valider ou renvoyer un code exige ce challenge_id : connaître l'email ou le numéro d'un autre ne
permet donc ni de deviner son code, ni de lui en faire envoyer en boucle.
Le canal (email / sms) est mémorisé avec le code : un renvoi repart par le même canal.
"""

import hmac
import secrets
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta

from src.domain.user.entities import Channel, User, VerificationCode
from src.domain.user.exceptions import (
    CodeResendLockedError,
    EmailDeliveryUnavailableError,
    InvalidVerificationCodeError,
    MissingContactError,
    SmsDeliveryUnavailableError,
    VerificationCodeLockedError,
)
from src.domain.user.ports import CodeHasher, EmailSender, SmsSender, VerificationPolicy
from src.domain.user.repository import VerificationCodeRepository
from src.domain.user.rules import mask_phone

_PURGE_AFTER = timedelta(days=1)


@dataclass(frozen=True)
class VerificationChallenge:
    challenge_id: str
    channel: Channel
    destination: str  # email, ou numéro masqué pour un SMS
    expires_in: int  # secondes avant expiration du code
    resend_after: int  # secondes avant qu'un nouveau code puisse être demandé


@dataclass(frozen=True)
class VerifiedChallenge:
    user_id: str
    channel: Channel


class EmailVerifier:
    """Nom conservé pour compatibilité ; gère les deux canaux."""

    def __init__(
        self,
        codes: VerificationCodeRepository,
        hasher: CodeHasher,
        email_sender: EmailSender,
        sms_sender: SmsSender,
        policy: VerificationPolicy,
    ) -> None:
        self._codes = codes
        self._hasher = hasher
        self._email_sender = email_sender
        self._sms_sender = sms_sender
        self._policy = policy

    def start(
        self, user: User, channel: Channel = Channel.EMAIL, *, strict: bool = False
    ) -> VerificationChallenge:
        """Envoie un code à l'utilisateur par `channel`.

        Pendant le délai anti-spam : `strict=False` renvoie le challenge en cours sans renvoyer
        de message (double clic) ; `strict=True` lève CodeResendLockedError (renvoi explicite).
        """
        self._contact(user, channel)  # échoue tôt si l'utilisateur n'a pas ce moyen de contact
        now = datetime.now(UTC)
        existing = self._codes.get_for_user(user.id)
        if existing is not None:
            remaining = self._cooldown_remaining(existing, now)
            if remaining > 0:
                # Autre canal que le code en cours (ex. email puis téléphone) : on ne peut pas
                # renvoyer ce challenge, il n'a pas été envoyé par le canal demandé.
                if strict or existing.channel is not channel:
                    raise CodeResendLockedError(remaining)
                return self._challenge(existing, user, now)

        self._codes.delete_created_before(now - _PURGE_AFTER)

        raw = f"{secrets.randbelow(10**6):06d}"
        code = VerificationCode(
            id=secrets.token_urlsafe(32),
            user_id=user.id,
            code_hash=self._hasher.hash(user.id, raw),
            expires_at=now + timedelta(minutes=self._policy.code_ttl_minutes),
            created_at=now,
            channel=channel,
        )
        self._codes.replace_for_user(code)
        try:
            self._send(user, channel, raw)
        except (EmailDeliveryUnavailableError, SmsDeliveryUnavailableError):
            # Pas de code orphelin : sinon le délai anti-spam bloquerait un nouvel essai.
            self._codes.delete_for_user(user.id)
            raise

        return self._challenge(code, user, now)

    def get_challenge(self, challenge_id: str) -> VerificationCode:
        """Le code stocké (propriétaire + canal), pour un renvoi."""
        stored = self._codes.get_by_id(challenge_id)
        if stored is None:
            raise InvalidVerificationCodeError()

        return stored

    def check(self, challenge_id: str, code: str) -> VerifiedChallenge:
        """Valide le code et le consomme. Retourne l'utilisateur confirmé et le canal utilisé."""
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

        return VerifiedChallenge(stored.user_id, stored.channel)

    # ─── Interne ────────────────────────────────────────────────────

    @staticmethod
    def _contact(user: User, channel: Channel) -> str:
        value = user.email if channel is Channel.EMAIL else user.phone
        if not value:
            raise MissingContactError()

        return value

    def _send(self, user: User, channel: Channel, code: str) -> None:
        to = self._contact(user, channel)
        ttl = self._policy.code_ttl_minutes
        if channel is Channel.SMS:
            self._sms_sender.send_verification_code(to, code, ttl)
        else:
            self._email_sender.send_verification_code(to, user.name, code, ttl)

    def _cooldown_remaining(self, code: VerificationCode, now: datetime) -> int:
        elapsed = (now - code.created_at).total_seconds()

        return max(0, int(self._policy.resend_cooldown_seconds - elapsed + 0.999))

    def _challenge(
        self, code: VerificationCode, user: User, now: datetime
    ) -> VerificationChallenge:
        contact = self._contact(user, code.channel)

        return VerificationChallenge(
            challenge_id=code.id,
            channel=code.channel,
            destination=mask_phone(contact) if code.channel is Channel.SMS else contact,
            expires_in=max(0, int((code.expires_at - datetime.now(UTC)).total_seconds())),
            resend_after=self._cooldown_remaining(code, now),
        )
