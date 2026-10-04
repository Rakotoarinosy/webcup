"""Endpoints HTTP des signalements sur les données personnelles (F51)."""

from fastapi import APIRouter, Depends
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.data_concern import ConcernStatus, DataConcern, DataConcernRepository
from src.domain.user import User, UserRepository
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.data_concern.schemas import (
    AnswerConcernIn,
    DataConcernAdminOut,
    DataConcernOut,
    SubmitConcernIn,
)
from src.features.data_concern.use_cases import (
    answer_concern,
    list_concerns,
    list_my_concerns,
    start_review,
    submit_concern,
)
from src.infrastructure.persistence.data_concern_repository import SqlAlchemyDataConcernRepository
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/data-concerns", tags=["data concerns"])


def get_concern_repo(db: Session = Depends(get_db)) -> DataConcernRepository:
    return SqlAlchemyDataConcernRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


@router.post("", response_model=DataConcernOut, status_code=http_status.HTTP_201_CREATED)
def submit_concern_endpoint(
    payload: SubmitConcernIn,
    user: User = Depends(get_current_user),
    repo: DataConcernRepository = Depends(get_concern_repo),
) -> DataConcern:
    return submit_concern(user, payload, repo)


@router.get("/mine", response_model=list[DataConcernOut])
def my_concerns_endpoint(
    user: User = Depends(get_current_user),
    repo: DataConcernRepository = Depends(get_concern_repo),
) -> list[DataConcern]:
    return list_my_concerns(user, repo)


@router.get("", response_model=list[DataConcernAdminOut])
def list_concerns_endpoint(
    status: ConcernStatus | None = None,
    user: User = Depends(get_current_user),
    repo: DataConcernRepository = Depends(get_concern_repo),
    users: UserRepository = Depends(get_users_repo),
) -> list[DataConcernAdminOut]:
    return [_admin_out(concern, users) for concern in list_concerns(user, repo, status)]


@router.post("/{concern_id}/review", response_model=DataConcernAdminOut)
def review_concern_endpoint(
    concern_id: str,
    user: User = Depends(get_current_user),
    repo: DataConcernRepository = Depends(get_concern_repo),
    users: UserRepository = Depends(get_users_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> DataConcernAdminOut:
    return _admin_out(start_review(concern_id, user, repo, audit=audit), users)


@router.post("/{concern_id}/answer", response_model=DataConcernAdminOut)
def answer_concern_endpoint(
    concern_id: str,
    payload: AnswerConcernIn,
    user: User = Depends(get_current_user),
    repo: DataConcernRepository = Depends(get_concern_repo),
    users: UserRepository = Depends(get_users_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> DataConcernAdminOut:
    return _admin_out(answer_concern(concern_id, payload, user, repo, audit=audit), users)


def _admin_out(concern: DataConcern, users: UserRepository) -> DataConcernAdminOut:
    author = users.get_by_id(concern.user_id)
    return DataConcernAdminOut(
        **DataConcernOut.model_validate(concern).model_dump(),
        user_id=concern.user_id,
        user_name=author.name if author else "Compte supprimé",
        user_email=(author.email or author.phone or "") if author else "",
    )
