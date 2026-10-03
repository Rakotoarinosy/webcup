"""Ports : ce dont le domaine user a besoin côté sécurité. L'infrastructure les implémente."""

from abc import ABC, abstractmethod
from dataclasses import dataclass


class PasswordHasher(ABC):
    @abstractmethod
    def hash(self, password: str) -> str: ...

    @abstractmethod
    def verify(self, password: str, password_hash: str) -> bool: ...

    @abstractmethod
    def needs_rehash(self, password_hash: str) -> bool: ...


@dataclass(frozen=True)
class AccessToken:
    value: str
    expires_in: int  # secondes


class AccessTokenService(ABC):
    @abstractmethod
    def create(self, user_id: str) -> AccessToken: ...

    @abstractmethod
    def decode(self, token: str) -> str:
        """Retourne l'id utilisateur ou lève InvalidTokenError."""


@dataclass(frozen=True)
class AuthPolicy:
    max_failed_attempts: int = 5
    lockout_minutes: int = 15
    refresh_ttl_days: int = 7


# ─── Confirmation par email ─────────────────────────────────────────


@dataclass(frozen=True)
class VerificationPolicy:
    code_ttl_minutes: int = 10
    max_attempts: int = 5  # essais par code ; ensuite il faut en demander un nouveau
    resend_cooldown_seconds: int = 60


class CodeHasher(ABC):
    """Hachage d'un code à 6 chiffres. Doit être keyé (HMAC) : 10^6 valeurs se cassent en une seconde."""

    @abstractmethod
    def hash(self, user_id: str, code: str) -> str: ...


class EmailSender(ABC):
    @abstractmethod
    def send_verification_code(self, to: str, name: str, code: str, ttl_minutes: int) -> None:
        """Envoie le code. Lève EmailDeliveryUnavailableError en cas d'échec."""


# ─── Google ─────────────────────────────────────────────────────────


@dataclass(frozen=True)
class GoogleProfile:
    subject: str  # claim « sub » : identifiant stable du compte Google
    email: str
    email_verified: bool
    name: str | None
    picture: str | None


class GoogleIdentityVerifier(ABC):
    @abstractmethod
    def verify(self, credential: str) -> GoogleProfile:
        """Valide un ID token Google (signature, audience, expiration) et retourne le profil.

        Lève InvalidGoogleTokenError si le jeton est invalide, GoogleSignInUnavailableError si
        Google n'est pas configuré ou injoignable.
        """
