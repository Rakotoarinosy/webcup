"""Transports municipaux (F36) : consultation publique, état des lignes géré par la mairie."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.domain.transport import TransportRepository
from src.domain.user import Role, User
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.transport.schemas import TransportLineOut, UpdateLineStatusIn
from src.features.transport.use_cases import (
    change_line_status,
    get_transport_line,
    list_transport_lines,
)
from src.infrastructure.config import Settings, get_settings
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.transport_repository import SqlAlchemyTransportRepository
from src.infrastructure.security.deps import require_roles
from src.shared.timezone import resolve_timezone

router = APIRouter(prefix="/transport", tags=["transport"])


def get_transport_repo(db: Session = Depends(get_db)) -> TransportRepository:
    return SqlAlchemyTransportRepository(db)


@router.get("/lines", response_model=list[TransportLineOut])
def list_lines_endpoint(
    q: str | None = Query(default=None, max_length=80, description="Ligne ou arrêt"),
    repo: TransportRepository = Depends(get_transport_repo),
    settings: Settings = Depends(get_settings),
) -> list[TransportLineOut]:
    return list_transport_lines(repo, resolve_timezone(settings.app_timezone), q)


@router.get("/lines/{line_id}", response_model=TransportLineOut)
def get_line_endpoint(
    line_id: str,
    repo: TransportRepository = Depends(get_transport_repo),
    settings: Settings = Depends(get_settings),
) -> TransportLineOut:
    return get_transport_line(line_id, repo, resolve_timezone(settings.app_timezone))


@router.patch("/lines/{line_id}/status", response_model=TransportLineOut)
def update_line_status_endpoint(
    line_id: str,
    payload: UpdateLineStatusIn,
    repo: TransportRepository = Depends(get_transport_repo),
    settings: Settings = Depends(get_settings),
    _: User = Depends(require_roles(Role.ADMIN, Role.MANAGER)),
    audit: AuditTrail = Depends(get_audit_trail),
) -> TransportLineOut:
    return change_line_status(
        line_id, payload, repo, resolve_timezone(settings.app_timezone), audit=audit
    )
