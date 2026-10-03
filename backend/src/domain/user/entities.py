"""Entités métier du domaine user. Python pur : aucune dépendance à un framework."""

from dataclasses import dataclass, replace
from datetime import datetime
from enum import StrEnum

from src.domain.user.exceptions import ForbiddenError


class Channel(StrEnum):
    """Canal d'envoi du code de confirmation."""

    EMAIL = "email"
    SMS = "sms"


class Role(StrEnum):
    ADMIN = "admin"
    MANAGER = "manager"
    AGENT = "agent"
    CITIZEN = "citizen"


@dataclass
class User:
    id: str
    email: str | None  # None pour un compte créé avec un numéro de téléphone seul
    name: str
    created_at: datetime
    password_hash: str
    role: Role = Role.CITIZEN
    is_active: bool = True
    # Pour un utilisateur AGENT : lien vers sa fiche agent (« Mes interventions »).
    agent_id: str | None = None
    failed_login_attempts: int = 0
    locked_until: datetime | None = None
    # True par défaut : les comptes existants et ceux créés par un admin n'ont pas à confirmer.
    # Seules l'inscription publique (register) et la 1re connexion Google démarrent à False.
    email_verified: bool = True
    # Identifiant stable « sub » de Google (jamais l'email, qui peut changer).
    google_id: str | None = None
    avatar_url: str | None = None
    # Numéro au format E.164 (+261341234567), unique. Au moins un de email / phone est renseigné.
    phone: str | None = None
    phone_verified: bool = False

    @property
    def has_verified_contact(self) -> bool:
        return (self.email is not None and self.email_verified) or (
            self.phone is not None and self.phone_verified
        )

    def has_role(self, *roles: Role) -> bool:
        """Active administrators can access every role-protected operation."""
        return self.is_active and (self.role is Role.ADMIN or self.role in roles)

    def require_personal_account_deletion(self) -> None:
        if not self.is_active or self.role is not Role.CITIZEN:
            raise ForbiddenError("Only citizens can delete their own account")

    def archived_identity(self, archive_id: str) -> "User":
        """Identity kept for municipal records, with no credentials or personal details."""
        return replace(
            self,
            id=archive_id,
            email=f"deleted-{archive_id}@accounts.invalid",
            name="Compte supprimé",
            password_hash="",
            is_active=False,
            failed_login_attempts=0,
            locked_until=None,
            google_id=None,  # unique : l'archive coexiste avec le compte avant sa suppression
            avatar_url=None,
            phone=None,  # unique : même raison que google_id
            phone_verified=False,
        )

    def is_locked(self, now: datetime) -> bool:
        return self.locked_until is not None and self.locked_until > now


@dataclass
class RefreshToken:
    """Refresh token stocké sous forme de hash. Une « famille » = une session de connexion."""

    id: str
    user_id: str
    family_id: str
    token_hash: str
    expires_at: datetime
    created_at: datetime
    revoked_at: datetime | None = None


@dataclass
class VerificationCode:
    """Code de confirmation (6 chiffres, par email ou SMS), stocké haché.

    `id` est le « challenge_id » : un secret opaque renvoyé au client qui a déclenché l'envoi.
    Il faut le posséder pour valider ou renvoyer le code, donc connaître l'email ne suffit pas.
    """

    id: str
    user_id: str
    code_hash: str
    expires_at: datetime
    created_at: datetime
    attempts: int = 0
    channel: Channel = Channel.EMAIL
