"""Entités métier du domaine user. Python pur : aucune dépendance à un framework."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


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
    # Pour un utilisateur AGENT : lien vers sa fiche agent (« Mes interventions »).
    agent_id: str | None = None
    failed_login_attempts: int = 0
    locked_until: datetime | None = None

    def has_role(self, *roles: Role) -> bool:
        """Active administrators can access every role-protected operation."""
        return self.is_active and (self.role is Role.ADMIN or self.role in roles)

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
