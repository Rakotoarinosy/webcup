"""Endpoint HTTP du journal d'audit (F47) et dépendance d'écriture partagée par les routers."""

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.domain.audit import AuditAction, AuditLog, AuditQuery, AuditTarget
from src.domain.citizen_request import Actor
from src.domain.user import User
from src.features.audit.recording import AuditTrail
from src.features.audit.schemas import AuditEntryOut, AuditPageOut
from src.features.audit.use_cases import search_audit
from src.infrastructure.persistence.audit_repository import SqlAlchemyAuditLog
from src.infrastructure.persistence.database import get_db
from src.infrastructure.security.deps import get_current_actor, get_current_user

router = APIRouter(prefix="/audit", tags=["audit"])


def get_audit_log(db: Session = Depends(get_db)) -> AuditLog:
    return SqlAlchemyAuditLog(db)


def get_audit_trail(
    user: User = Depends(get_current_user), log: AuditLog = Depends(get_audit_log)
) -> AuditTrail:
    return AuditTrail(log=log, author=user)


@router.get("", response_model=AuditPageOut)
def search_audit_endpoint(
    action: list[AuditAction] = Query(default=[]),
    target_type: AuditTarget | None = None,
    target_id: str | None = Query(default=None, max_length=36),
    since: datetime | None = None,
    until: datetime | None = None,
    search: str | None = Query(default=None, max_length=100),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    actor: Actor = Depends(get_current_actor),
    log: AuditLog = Depends(get_audit_log),
) -> AuditPageOut:
    query = AuditQuery(
        actions=frozenset(action),
        target_type=target_type,
        target_id=target_id,
        since=since,
        until=until,
        search=search,
        page=page,
        page_size=page_size,
    )
    items, total = search_audit(actor, log, query)
    return AuditPageOut(
        items=[AuditEntryOut.model_validate(item) for item in items],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size,
    )
