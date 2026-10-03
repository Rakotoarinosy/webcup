"""Écriture du journal d'audit depuis les use cases d'administration.

Les use cases reçoivent un AuditTrail optionnel (None dans les tests unitaires qui ne
s'intéressent pas à la trace) : l'auteur de l'opération y est déjà résolu.
"""

import uuid
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any

from src.domain.audit import AuditAction, AuditEntry, AuditLog, AuditTarget
from src.domain.user import User


@dataclass(frozen=True)
class AuditTrail:
    log: AuditLog
    author: User

    def record(
        self,
        action: AuditAction,
        target_type: AuditTarget,
        target_id: str,
        target_label: str,
        *,
        institut_id: str | None = None,
        details: dict[str, Any] | None = None,
        now: datetime | None = None,
    ) -> AuditEntry:
        return self.log.record(
            AuditEntry(
                id=str(uuid.uuid4()),
                action=action,
                occurred_at=now or datetime.now(UTC),
                target_type=target_type,
                target_id=target_id,
                target_label=target_label,
                actor_id=self.author.id,
                actor_name=self.author.name,
                actor_role=self.author.role.value,
                institut_id=institut_id,
                details=details or {},
            )
        )


def record(
    trail: "AuditTrail | None",
    action: AuditAction,
    target_type: AuditTarget,
    target_id: str,
    target_label: str,
    **extra: Any,
) -> None:
    """Raccourci : ne fait rien quand aucun journal n'est branché."""
    if trail is not None:
        trail.record(action, target_type, target_id, target_label, **extra)


def field_changes(before: object, after: object, fields: tuple[str, ...]) -> dict[str, Any]:
    """Avant / après des seuls champs modifiés, en valeurs JSON (enums → texte)."""

    def plain(value: object) -> object:
        if isinstance(value, frozenset | set):
            return sorted(plain(item) for item in value)  # type: ignore[type-var]
        return getattr(value, "value", value)

    diff: dict[str, Any] = {}
    for name in fields:
        old, new = getattr(before, name), getattr(after, name)
        if old != new:
            diff[name] = {"from": plain(old), "to": plain(new)}
    return diff
