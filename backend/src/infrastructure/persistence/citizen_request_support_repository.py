"""Implémentation SQLAlchemy des soutiens (F52) et du fil de messages (F84) des demandes."""

from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.domain.citizen_request import (
    AlreadySupportedConflictError,
    MessageVisibility,
    RequestMessage,
    RequestMessageRepository,
)
from src.domain.citizen_request.support import RequestSupport, SupportRepository
from src.domain.user import Role
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import (
    CitizenRequestMessageModel,
    CitizenRequestSupportModel,
)


class SqlAlchemySupportRepository(SupportRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def add(self, support: RequestSupport) -> None:
        self.db.add(
            CitizenRequestSupportModel(
                request_id=support.request_id,
                citizen_id=support.citizen_id,
                created_at=support.created_at,
            )
        )
        try:
            self.db.commit()
        except IntegrityError as error:  # double clic ou deux onglets : même résultat
            self.db.rollback()
            raise AlreadySupportedConflictError(support.request_id) from error

    def remove(self, request_id: str, citizen_id: str) -> bool:
        result = self.db.execute(
            delete(CitizenRequestSupportModel).where(
                CitizenRequestSupportModel.request_id == request_id,
                CitizenRequestSupportModel.citizen_id == citizen_id,
            )
        )
        self.db.commit()
        return bool(getattr(result, "rowcount", 0))

    def get(self, request_id: str, citizen_id: str) -> RequestSupport | None:
        model = self.db.get(CitizenRequestSupportModel, (request_id, citizen_id))
        return _support(model) if model else None

    def count_for(self, request_id: str) -> int:
        return (
            self.db.scalar(
                select(func.count())
                .select_from(CitizenRequestSupportModel)
                .where(CitizenRequestSupportModel.request_id == request_id)
            )
            or 0
        )

    def supporter_ids(self, request_id: str) -> list[str]:
        return list(
            self.db.scalars(
                select(CitizenRequestSupportModel.citizen_id).where(
                    CitizenRequestSupportModel.request_id == request_id
                )
            )
        )

    def supported_by(self, citizen_id: str, request_ids: list[str]) -> set[str]:
        if not request_ids:
            return set()
        return set(
            self.db.scalars(
                select(CitizenRequestSupportModel.request_id).where(
                    CitizenRequestSupportModel.citizen_id == citizen_id,
                    CitizenRequestSupportModel.request_id.in_(request_ids),
                )
            )
        )

    def list_for_citizen(self, citizen_id: str) -> list[RequestSupport]:
        models = self.db.scalars(
            select(CitizenRequestSupportModel)
            .where(CitizenRequestSupportModel.citizen_id == citizen_id)
            .order_by(CitizenRequestSupportModel.created_at.desc())
        )
        return [_support(model) for model in models]


class SqlAlchemyRequestMessageRepository(RequestMessageRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def add(self, message: RequestMessage) -> RequestMessage:
        self.db.add(
            CitizenRequestMessageModel(
                id=message.id,
                request_id=message.request_id,
                author_id=message.author_id,
                author_name=message.author_name,
                author_role=message.author_role.value,
                visibility=message.visibility.value,
                body=message.body,
                created_at=message.created_at,
            )
        )
        self.db.commit()
        return message

    def list_for_request(self, request_id: str, *, include_internal: bool) -> list[RequestMessage]:
        stmt = select(CitizenRequestMessageModel).where(
            CitizenRequestMessageModel.request_id == request_id
        )
        if not include_internal:
            stmt = stmt.where(
                CitizenRequestMessageModel.visibility == MessageVisibility.PUBLIC.value
            )
        models = self.db.scalars(
            stmt.order_by(CitizenRequestMessageModel.created_at, CitizenRequestMessageModel.id)
        )
        return [_message(model) for model in models]


def _support(model: CitizenRequestSupportModel) -> RequestSupport:
    return RequestSupport(
        request_id=model.request_id,
        citizen_id=model.citizen_id,
        created_at=as_utc(model.created_at),
    )


def _message(model: CitizenRequestMessageModel) -> RequestMessage:
    return RequestMessage(
        id=model.id,
        request_id=model.request_id,
        visibility=MessageVisibility(model.visibility),
        body=model.body,
        created_at=as_utc(model.created_at),
        author_id=model.author_id,
        author_name=model.author_name,
        author_role=Role(model.author_role),
    )
