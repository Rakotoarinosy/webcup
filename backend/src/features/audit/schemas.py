"""Schémas Pydantic du journal d'audit (lecture seule)."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict

from src.domain.audit import AuditAction, AuditTarget


class AuditEntryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    action: AuditAction
    occurred_at: datetime
    target_type: AuditTarget
    target_id: str
    target_label: str
    actor_id: str | None
    actor_name: str
    actor_role: str
    institut_id: str | None
    details: dict[str, Any]


class AuditPageOut(BaseModel):
    items: list[AuditEntryOut]
    total: int
    page: int
    page_size: int
    total_pages: int
