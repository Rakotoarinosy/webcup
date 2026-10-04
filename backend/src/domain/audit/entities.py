"""Journal d'audit des opérations d'administration (comptes, instituts, agents, données).

Les actions sur les demandes ont leur propre journal (citizen_request.events) ; celui-ci couvre
le reste. Les entrées sont uniquement ajoutées, jamais modifiées ni supprimées : la ville peut
justifier qui a fait quoi, quand, et sur quoi.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import StrEnum
from typing import Any

from src.domain.user.entities import Role


class AuditAction(StrEnum):
    ACCOUNT_CREATED = "account_created"
    ACCOUNT_UPDATED = "account_updated"
    ACCOUNT_ROLE_CHANGED = "account_role_changed"
    ACCOUNT_PASSWORD_RESET = "account_password_reset"
    ACCOUNT_DEACTIVATED = "account_deactivated"
    ACCOUNT_REACTIVATED = "account_reactivated"
    ACCOUNT_DELETED = "account_deleted"
    INSTITUT_CREATED = "institut_created"
    INSTITUT_UPDATED = "institut_updated"
    INSTITUT_MANAGER_CHANGED = "institut_manager_changed"
    AGENT_CREATED = "agent_created"
    AGENT_MOVED = "agent_moved"
    AGENT_ACTIVATED = "agent_activated"
    AGENT_DEACTIVATED = "agent_deactivated"
    AGENT_STATUS_CHANGED = "agent_status_changed"
    DATA_CONCERN_REVIEWED = "data_concern_reviewed"
    DATA_CONCERN_ANSWERED = "data_concern_answered"
    ALERT_PUBLISHED = "alert_published"
    ALERT_UPDATED = "alert_updated"
    ALERT_ENDED = "alert_ended"
    ALERT_DELETED = "alert_deleted"


class AuditTarget(StrEnum):
    ACCOUNT = "account"
    INSTITUT = "institut"
    AGENT = "agent"
    DATA_CONCERN = "data_concern"
    ALERT = "alert"


@dataclass(frozen=True)
class AuditEntry:
    id: str
    action: AuditAction
    occurred_at: datetime
    target_type: AuditTarget
    target_id: str
    # Instantanés au moment de l'action : l'entrée reste lisible si l'objet est renommé ou supprimé.
    target_label: str
    actor_id: str | None
    actor_name: str
    actor_role: Role
    # Institut concerné : permet au manager de consulter les opérations de son institut.
    institut_id: str | None = None
    # Avant / après des champs modifiés. Sérialisable en JSON, jamais de mot de passe.
    details: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class AuditQuery:
    actions: frozenset[AuditAction] = frozenset()
    target_type: AuditTarget | None = None
    target_id: str | None = None
    institut_id: str | None = None
    since: datetime | None = None
    until: datetime | None = None
    search: str | None = None  # auteur ou objet
    page: int = 1
    page_size: int = 20
