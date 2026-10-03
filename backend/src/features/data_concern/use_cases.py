"""Use cases des signalements sur les données.

Tout compte connecté peut signaler une inquiétude et suivre les siennes ;
seul l'administrateur (responsable des données de la plateforme) les traite.
"""

import uuid
from datetime import UTC, datetime

from src.domain.audit import AuditAction, AuditTarget
from src.domain.data_concern import (
    ConcernNotFoundError,
    ConcernStatus,
    DataConcern,
    DataConcernRepository,
)
from src.domain.user import ForbiddenError, Role, User
from src.features.audit.recording import AuditTrail, record
from src.features.data_concern.schemas import AnswerConcernIn, SubmitConcernIn


def submit_concern(
    user: User, dto: SubmitConcernIn, repo: DataConcernRepository, now: datetime | None = None
) -> DataConcern:
    now = now or datetime.now(UTC)
    concern_id = str(uuid.uuid4())
    concern = DataConcern(
        id=concern_id,
        reference=f"DC-{now:%Y%m%d}-{concern_id[:8].upper()}",
        user_id=user.id,
        topic=dto.topic,
        message=dto.message.strip(),
        created_at=now,
        updated_at=now,
    )
    return repo.add(concern)


def list_my_concerns(user: User, repo: DataConcernRepository) -> list[DataConcern]:
    return repo.list_for_user(user.id)


def list_concerns(
    user: User, repo: DataConcernRepository, status: ConcernStatus | None = None
) -> list[DataConcern]:
    _ensure_admin(user)
    return repo.list(status)


def start_review(
    concern_id: str,
    user: User,
    repo: DataConcernRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> DataConcern:
    _ensure_admin(user)
    concern = _load(concern_id, repo)
    was = concern.status
    concern.start_review(now or datetime.now(UTC))
    saved = repo.update(concern)
    if saved.status is not was:
        record(
            audit,
            AuditAction.DATA_CONCERN_REVIEWED,
            AuditTarget.DATA_CONCERN,
            saved.id,
            saved.reference,
        )
    return saved


def answer_concern(
    concern_id: str,
    dto: AnswerConcernIn,
    user: User,
    repo: DataConcernRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> DataConcern:
    _ensure_admin(user)
    concern = _load(concern_id, repo)
    concern.answer(dto.response.strip(), user.name, now or datetime.now(UTC))
    saved = repo.update(concern)
    record(
        audit,
        AuditAction.DATA_CONCERN_ANSWERED,
        AuditTarget.DATA_CONCERN,
        saved.id,
        saved.reference,
        details={"topic": saved.topic.value},
    )
    return saved


def _load(concern_id: str, repo: DataConcernRepository) -> DataConcern:
    concern = repo.get_by_id(concern_id)
    if concern is None:
        raise ConcernNotFoundError(concern_id)
    return concern


def _ensure_admin(user: User) -> None:
    if not (user.is_active and user.role is Role.ADMIN):
        raise ForbiddenError()
