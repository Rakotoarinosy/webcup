"""Implémentation SQLAlchemy de KnownDeviceRepository."""

from datetime import UTC, datetime

from sqlalchemy import delete, func, select, update
from sqlalchemy.orm import Session

from src.domain.account_security import DeviceKind, KnownDevice, KnownDeviceRepository
from src.infrastructure.persistence.models import (
    DeviceSessionModel,
    KnownDeviceModel,
    RefreshTokenModel,
)


def _aware(value: datetime) -> datetime:
    return value.replace(tzinfo=value.tzinfo or UTC)


def _to_entity(model: KnownDeviceModel, active_sessions: int = 0) -> KnownDevice:
    try:
        kind = DeviceKind(model.kind)
    except ValueError:
        kind = DeviceKind.UNKNOWN
    return KnownDevice(
        id=model.id,
        user_id=model.user_id,
        token_hash=model.token_hash,
        fingerprint=model.fingerprint,
        label=model.label,
        kind=kind,
        network=model.network,
        location=model.location,
        first_seen_at=_aware(model.first_seen_at),
        last_seen_at=_aware(model.last_seen_at),
        acknowledged=model.acknowledged,
        active_sessions=active_sessions,
    )


class SqlAlchemyKnownDeviceRepository(KnownDeviceRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def _active_families(self, now: datetime):  # type: ignore[no-untyped-def]
        return (
            select(RefreshTokenModel.family_id)
            .where(RefreshTokenModel.revoked_at.is_(None), RefreshTokenModel.expires_at > now)
            .distinct()
        )

    def list_for_user(self, user_id: str, now: datetime) -> list[KnownDevice]:
        counts = dict(
            self.db.execute(
                select(DeviceSessionModel.device_id, func.count())
                .where(
                    DeviceSessionModel.user_id == user_id,
                    DeviceSessionModel.family_id.in_(self._active_families(now)),
                )
                .group_by(DeviceSessionModel.device_id)
            ).all()
        )
        models = self.db.scalars(
            select(KnownDeviceModel)
            .where(KnownDeviceModel.user_id == user_id)
            .order_by(KnownDeviceModel.last_seen_at.desc())
        ).all()
        return [_to_entity(model, counts.get(model.id, 0)) for model in models]

    def get(self, user_id: str, device_id: str) -> KnownDevice | None:
        model = self.db.get(KnownDeviceModel, device_id)
        return _to_entity(model) if model is not None and model.user_id == user_id else None

    def find_by_token(self, user_id: str, token_hash: str) -> KnownDevice | None:
        model = self.db.scalar(
            select(KnownDeviceModel)
            .where(KnownDeviceModel.user_id == user_id, KnownDeviceModel.token_hash == token_hash)
            .limit(1)
        )
        return _to_entity(model) if model else None

    def find_by_fingerprint(self, user_id: str, fingerprint: str) -> KnownDevice | None:
        model = self.db.scalar(
            select(KnownDeviceModel)
            .where(
                KnownDeviceModel.user_id == user_id, KnownDeviceModel.fingerprint == fingerprint
            )
            .order_by(KnownDeviceModel.last_seen_at.desc())
            .limit(1)
        )
        return _to_entity(model) if model else None

    def count_for_user(self, user_id: str) -> int:
        return self.db.scalar(
            select(func.count()).select_from(KnownDeviceModel).where(
                KnownDeviceModel.user_id == user_id
            )
        ) or 0

    def add(self, device: KnownDevice) -> KnownDevice:
        self.db.add(
            KnownDeviceModel(
                id=device.id,
                user_id=device.user_id,
                token_hash=device.token_hash,
                fingerprint=device.fingerprint,
                label=device.label[:120],
                kind=device.kind.value,
                network=device.network,
                location=(device.location or None) and device.location[:120],
                first_seen_at=device.first_seen_at,
                last_seen_at=device.last_seen_at,
                acknowledged=device.acknowledged,
            )
        )
        self.db.commit()
        return device

    def update(self, device: KnownDevice) -> KnownDevice:
        self.db.execute(
            update(KnownDeviceModel)
            .where(KnownDeviceModel.id == device.id)
            .values(
                token_hash=device.token_hash,
                fingerprint=device.fingerprint,
                label=device.label[:120],
                kind=device.kind.value,
                network=device.network,
                location=(device.location or None) and device.location[:120],
                last_seen_at=device.last_seen_at,
                acknowledged=device.acknowledged,
            )
        )
        self.db.commit()
        return device

    def delete(self, device_id: str) -> None:
        self.db.execute(delete(DeviceSessionModel).where(DeviceSessionModel.device_id == device_id))
        self.db.execute(delete(KnownDeviceModel).where(KnownDeviceModel.id == device_id))
        self.db.commit()

    def link_session(self, device_id: str, user_id: str, family_id: str, now: datetime) -> None:
        existing = self.db.get(DeviceSessionModel, family_id)
        if existing is None:
            self.db.add(
                DeviceSessionModel(
                    family_id=family_id, device_id=device_id, user_id=user_id, created_at=now
                )
            )
        else:
            existing.device_id = device_id
        # Sessions dont plus aucun refresh token n'existe (expirés puis purgés) : on les oublie.
        self.db.execute(
            delete(DeviceSessionModel).where(
                DeviceSessionModel.user_id == user_id,
                DeviceSessionModel.family_id != family_id,
                DeviceSessionModel.family_id.not_in(
                    select(RefreshTokenModel.family_id).where(RefreshTokenModel.user_id == user_id)
                ),
            )
        )
        self.db.commit()

    def device_for_session(self, family_id: str) -> str | None:
        return self.db.scalar(
            select(DeviceSessionModel.device_id).where(DeviceSessionModel.family_id == family_id)
        )

    def session_families(self, device_id: str) -> list[str]:
        return list(
            self.db.scalars(
                select(DeviceSessionModel.family_id).where(
                    DeviceSessionModel.device_id == device_id
                )
            ).all()
        )

    def revoke_sessions_except(
        self, user_id: str, keep_family_id: str | None, now: datetime
    ) -> int:
        condition = [
            RefreshTokenModel.user_id == user_id,
            RefreshTokenModel.revoked_at.is_(None),
            RefreshTokenModel.expires_at > now,
        ]
        if keep_family_id is not None:
            condition.append(RefreshTokenModel.family_id != keep_family_id)
        families = self.db.scalar(
            select(func.count(func.distinct(RefreshTokenModel.family_id))).where(*condition)
        )
        revoke = [RefreshTokenModel.user_id == user_id, RefreshTokenModel.revoked_at.is_(None)]
        if keep_family_id is not None:
            revoke.append(RefreshTokenModel.family_id != keep_family_id)
        self.db.execute(update(RefreshTokenModel).where(*revoke).values(revoked_at=now))
        self.db.commit()
        return families or 0

    def prune(self, user_id: str, keep: int) -> None:
        stale = self.db.scalars(
            select(KnownDeviceModel.id)
            .where(KnownDeviceModel.user_id == user_id)
            .order_by(KnownDeviceModel.last_seen_at.desc())
            .offset(keep)
        ).all()
        if stale:
            self.db.execute(
                delete(DeviceSessionModel).where(DeviceSessionModel.device_id.in_(stale))
            )
            self.db.execute(delete(KnownDeviceModel).where(KnownDeviceModel.id.in_(stale)))
            self.db.commit()
