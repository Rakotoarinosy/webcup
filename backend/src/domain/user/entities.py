"""Entités métier du domaine user. Python pur : aucune dépendance à un framework."""

from dataclasses import dataclass, replace
from datetime import datetime
from enum import StrEnum

from src.domain.user.exceptions import ForbiddenError


class Role(StrEnum):
    ADMIN = "admin"
    MANAGER = "manager"
    AGENT = "agent"
    CITIZEN = "citizen"


@dataclass
class User:
    id: str
    email: str
    name: str
    created_at: datetime
    password_hash: str
    role: Role = Role.CITIZEN
    is_active: bool = True
    failed_login_attempts: int = 0
    locked_until: datetime | None = None

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
