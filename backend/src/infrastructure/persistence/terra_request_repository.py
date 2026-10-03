"""Implémentation SQLAlchemy de TerraRequestRepository. Le mapping Model ↔ Entity reste privé ici."""

import logging
from dataclasses import fields
from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.domain.terra_request import (
    PipelineStatus,
    TerraRequest,
    TerraRequestRepository,
    TerraSession,
)
from src.infrastructure.persistence.models import (
    TerraRequestModel,
    TerraRequestReadModel,
    TerraSessionModel,
)

logger = logging.getLogger(__name__)

SESSION_ID = 1
_SESSION_FIELDS = [f.name for f in fields(TerraSession)]


def _aware(value: datetime | None) -> datetime | None:
    # SQLite perd le fuseau : toutes les dates stockées sont en UTC.
    return value.replace(tzinfo=UTC) if value is not None and value.tzinfo is None else value


class SqlAlchemyTerraRequestRepository(TerraRequestRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_all(self) -> list[TerraRequest]:
        return [self._to_entity(m) for m in self.db.scalars(select(TerraRequestModel))]

    def get_by_code(self, request_code: str) -> TerraRequest | None:
        model = self._model_by_code(request_code)
        return self._to_entity(model) if model else None

    def save_sync(
        self, added: list[TerraRequest], updated: list[TerraRequest], session: TerraSession
    ) -> None:
        for request in updated:
            model = self._model_by_code(request.request_code)
            if model is not None:
                self._copy_api_fields(request, model)
        for request in added:
            self.db.add(self._to_model(request))
        self._write_session(session)
        try:
            self.db.commit()
        except IntegrityError:
            # Un autre processus a inséré les mêmes demandes entre-temps : on garde les siennes.
            self.db.rollback()
            logger.info("terra sync race: requests already inserted by another worker")
            self._write_session(session)
            self.db.commit()

    def set_status(self, request_code: str, status: PipelineStatus, now: datetime) -> None:
        model = self._model_by_code(request_code)
        if model is None:
            return
        model.status = status.value
        model.updated_at = now
        self.db.commit()

    def get_session(self) -> TerraSession:
        model = self.db.get(TerraSessionModel, SESSION_ID)
        if model is None:
            return TerraSession()
        values = {name: getattr(model, name) for name in _SESSION_FIELDS}
        for name, value in values.items():
            if isinstance(value, datetime):
                values[name] = _aware(value)
        return TerraSession(**values)

    def save_session(self, session: TerraSession) -> None:
        self._write_session(session)
        self.db.commit()

    def read_keys(self, user_id: str) -> set[str]:
        return set(
            self.db.scalars(
                select(TerraRequestReadModel.key).where(TerraRequestReadModel.user_id == user_id)
            )
        )

    def mark_read(self, user_id: str, keys: list[str], now: datetime) -> None:
        already = self.read_keys(user_id)
        for key in dict.fromkeys(keys):
            if key not in already:
                self.db.add(TerraRequestReadModel(user_id=user_id, key=key, read_at=now))
        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()  # double clic concurrent : déjà marquée comme lue

    # ─── mapping ─────────────────────────────────────────────────────

    def _model_by_code(self, request_code: str) -> TerraRequestModel | None:
        return self.db.scalar(
            select(TerraRequestModel).where(TerraRequestModel.request_code == request_code)
        )

    def _write_session(self, session: TerraSession) -> None:
        model = self.db.get(TerraSessionModel, SESSION_ID) or TerraSessionModel(id=SESSION_ID)
        for name in _SESSION_FIELDS:
            setattr(model, name, getattr(session, name))
        self.db.add(model)

    @staticmethod
    def _copy_api_fields(request: TerraRequest, model: TerraRequestModel) -> None:
        for f in fields(TerraRequest):
            if f.name not in ("request_code", "status", "first_seen_at"):
                setattr(model, f.name, getattr(request, f.name))

    def _to_model(self, request: TerraRequest) -> TerraRequestModel:
        model = TerraRequestModel(
            request_code=request.request_code,
            status=request.status.value,
            first_seen_at=request.first_seen_at,
        )
        self._copy_api_fields(request, model)
        return model

    @staticmethod
    def _to_entity(model: TerraRequestModel) -> TerraRequest:
        values = {f.name: getattr(model, f.name) for f in fields(TerraRequest)}
        values["status"] = PipelineStatus(model.status)
        values["raw"] = dict(model.raw or {})
        values["first_seen_at"] = _aware(model.first_seen_at)
        values["updated_at"] = _aware(model.updated_at)
        return TerraRequest(**values)
