"""Suivi des demandes du concours publiées par l'API Terra Nova (espace des services municipaux).

  GET   /terra-requests                          demandes connues (synchronisées en base)
  GET   /terra-requests/session                  session du concours + état de la synchro
  POST  /terra-requests/sync                     synchronisation manuelle
  GET   /terra-requests/pipeline                 demandes groupées par colonne Kanban
  GET   /terra-requests/notifications            nouvelles demandes / vagues + non lues
  POST  /terra-requests/notifications/read-all   tout marquer comme lu
  POST  /terra-requests/notifications/{key}/read marquer une notification comme lue
  GET   /terra-requests/{code}                   détail
  PATCH /terra-requests/{code}/status            déplacer dans le pipeline

Réservé au personnel municipal (agent, gestionnaire ; l'admin est toujours autorisé).
"""

from datetime import UTC, datetime, timedelta

from fastapi import APIRouter, Depends, Path
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.terra_request import TerraFeed, TerraRequest, TerraRequestRepository
from src.domain.user import Role, User
from src.features.terra_request.schemas import (
    PipelineColumnOut,
    SyncReportOut,
    TerraNotificationListOut,
    TerraNotificationOut,
    TerraOverviewOut,
    TerraRequestOut,
    TerraSessionOut,
    UpdateTerraStatusIn,
)
from src.features.terra_request.use_cases import (
    get_terra_pipeline,
    get_terra_request,
    get_terra_session,
    list_terra_notifications,
    list_terra_requests,
    mark_all_terra_notifications_read,
    mark_terra_notification_read,
    trigger_terra_sync,
    update_terra_request_status,
)
from src.infrastructure.config import get_settings
from src.infrastructure.external.terra_nova_feed import HttpTerraFeed
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.terra_request_repository import (
    SqlAlchemyTerraRequestRepository,
)
from src.infrastructure.security.deps import require_roles

router = APIRouter(prefix="/terra-requests", tags=["terra-requests"])

staff = require_roles(Role.MANAGER, Role.AGENT)


def get_terra_repo(db: Session = Depends(get_db)) -> TerraRequestRepository:
    return SqlAlchemyTerraRequestRepository(db)


def get_terra_feed() -> TerraFeed:
    return HttpTerraFeed.from_settings(get_settings())


def _now() -> datetime:
    return datetime.now(UTC)


@router.get("", response_model=list[TerraRequestOut], dependencies=[Depends(staff)])
def list_terra_requests_endpoint(
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> list[TerraRequest]:
    return list_terra_requests(repo)


@router.get("/session", response_model=TerraOverviewOut, dependencies=[Depends(staff)])
def get_terra_session_endpoint(
    repo: TerraRequestRepository = Depends(get_terra_repo),
    feed: TerraFeed = Depends(get_terra_feed),
) -> TerraOverviewOut:
    interval = get_settings().terra_nova_sync_seconds
    now = _now()
    session = get_terra_session(feed, repo, now, timedelta(seconds=interval))

    return TerraOverviewOut(
        session=TerraSessionOut.model_validate(session),
        server_time=now,
        sync_interval_seconds=interval,
    )


@router.post("/sync", response_model=SyncReportOut, dependencies=[Depends(staff)])
def trigger_terra_sync_endpoint(
    repo: TerraRequestRepository = Depends(get_terra_repo),
    feed: TerraFeed = Depends(get_terra_feed),
) -> SyncReportOut:
    return SyncReportOut.model_validate(trigger_terra_sync(feed, repo, _now()))


@router.get("/pipeline", response_model=list[PipelineColumnOut], dependencies=[Depends(staff)])
def get_terra_pipeline_endpoint(
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> list[PipelineColumnOut]:
    return [
        PipelineColumnOut(
            status=status, requests=[TerraRequestOut.model_validate(r) for r in requests]
        )
        for status, requests in get_terra_pipeline(repo)
    ]


@router.get("/notifications", response_model=TerraNotificationListOut)
def list_terra_notifications_endpoint(
    unread_only: bool = False,
    user: User = Depends(staff),
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> TerraNotificationListOut:
    items, unread_count = list_terra_notifications(user.id, repo, unread_only=unread_only)

    return TerraNotificationListOut(
        items=[TerraNotificationOut.model_validate(item) for item in items],
        unread_count=unread_count,
    )


# Route fixe avant la route paramétrée.
@router.post("/notifications/read-all", status_code=http_status.HTTP_204_NO_CONTENT)
def mark_all_terra_notifications_read_endpoint(
    user: User = Depends(staff),
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> None:
    mark_all_terra_notifications_read(user.id, repo, _now())


@router.post("/notifications/{key}/read", status_code=http_status.HTTP_204_NO_CONTENT)
def mark_terra_notification_read_endpoint(
    key: str = Path(min_length=1, max_length=80),
    user: User = Depends(staff),
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> None:
    mark_terra_notification_read(user.id, key, repo, _now())


@router.get("/{request_code}", response_model=TerraRequestOut, dependencies=[Depends(staff)])
def get_terra_request_endpoint(
    request_code: str,
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> TerraRequest:
    return get_terra_request(request_code, repo)


@router.patch(
    "/{request_code}/status", response_model=TerraRequestOut, dependencies=[Depends(staff)]
)
def update_terra_request_status_endpoint(
    request_code: str,
    payload: UpdateTerraStatusIn,
    repo: TerraRequestRepository = Depends(get_terra_repo),
) -> TerraRequest:
    return update_terra_request_status(request_code, payload, repo, _now())
