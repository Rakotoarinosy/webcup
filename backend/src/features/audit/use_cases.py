"""Consultation du journal d'audit : l'admin voit tout, un manager les opérations de son institut."""

from dataclasses import replace

from src.domain.audit import AuditEntry, AuditLog, AuditQuery
from src.domain.citizen_request import Actor
from src.domain.user import ForbiddenError, Role


def search_audit(actor: Actor, log: AuditLog, query: AuditQuery) -> tuple[list[AuditEntry], int]:
    if actor.role is Role.ADMIN:
        return log.search(query)
    if actor.role is Role.MANAGER:
        if actor.institut_id is None:
            return [], 0
        return log.search(replace(query, institut_id=actor.institut_id))

    raise ForbiddenError()
