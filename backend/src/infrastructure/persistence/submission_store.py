"""Stockage partagé (en base, donc entre processus) des clés d'idempotence et anti-doublons.

L'insertion d'une clé est atomique (clé primaire) : de deux envois simultanés, un seul passe.
"""

import random
from dataclasses import dataclass
from datetime import UTC, datetime

from sqlalchemy import delete, select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from src.infrastructure.persistence.models import SubmissionRecordModel


@dataclass(frozen=True)
class SubmissionRecord:
    key: str
    fingerprint: str
    status_code: int | None
    content_type: str | None
    body: str | None
    created_at: datetime


def _aware(value: datetime) -> datetime:
    return value.replace(tzinfo=value.tzinfo or UTC)


class SubmissionStore:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, key: str, now: datetime) -> SubmissionRecord | None:
        model = self.db.get(SubmissionRecordModel, key)
        if model is None:
            return None
        if _aware(model.expires_at) <= now:
            self.delete(key)
            return None
        return SubmissionRecord(
            key=model.key,
            fingerprint=model.fingerprint,
            status_code=model.status_code,
            content_type=model.content_type,
            body=model.body,
            created_at=_aware(model.created_at),
        )

    def try_reserve(
        self, key: str, kind: str, fingerprint: str, now: datetime, expires_at: datetime
    ) -> bool:
        """Réserve la clé (état « en cours »). False si elle existe déjà et n'a pas expiré."""
        if random.random() < 0.02:  # ménage occasionnel, sans tâche planifiée
            self.db.execute(
                delete(SubmissionRecordModel).where(SubmissionRecordModel.expires_at <= now)
            )
            self.db.commit()
        existing = self.db.get(SubmissionRecordModel, key)
        if existing is not None:
            if _aware(existing.expires_at) > now:
                return False
            self.db.delete(existing)
            self.db.commit()
        self.db.add(
            SubmissionRecordModel(
                key=key,
                kind=kind,
                fingerprint=fingerprint,
                created_at=now,
                expires_at=expires_at,
            )
        )
        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            return False
        return True

    def complete(
        self, key: str, status_code: int, content_type: str | None, body: str | None
    ) -> None:
        self.db.execute(
            update(SubmissionRecordModel)
            .where(SubmissionRecordModel.key == key)
            .values(status_code=status_code, content_type=content_type, body=body)
        )
        self.db.commit()

    def delete(self, key: str) -> None:
        self.db.execute(delete(SubmissionRecordModel).where(SubmissionRecordModel.key == key))
        self.db.commit()

    def exists(self, key: str) -> bool:
        return self.db.scalar(
            select(SubmissionRecordModel.key).where(SubmissionRecordModel.key == key)
        ) is not None
