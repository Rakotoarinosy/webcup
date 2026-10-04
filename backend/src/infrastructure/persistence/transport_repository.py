"""Implémentation SQLAlchemy de TransportRepository. Le mapping Model ↔ Entity reste privé ici."""

from datetime import UTC, time

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.transport import (
    LineStatus,
    TransportLine,
    TransportMode,
    TransportRepository,
    TransportStop,
)
from src.infrastructure.persistence.models import TransportLineModel, TransportStopModel


class SqlAlchemyTransportRepository(TransportRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_lines(self) -> list[TransportLine]:
        lines = list(self.db.scalars(select(TransportLineModel)))
        stops = self._stops_by_line([line.id for line in lines])
        return [_to_entity(line, stops.get(line.id, [])) for line in lines]

    def get_line(self, line_id: str) -> TransportLine | None:
        model = self.db.get(TransportLineModel, line_id)
        if model is None:
            return None
        return _to_entity(model, self._stops_by_line([line_id]).get(line_id, []))

    def save_status(self, line: TransportLine) -> TransportLine | None:
        model = self.db.get(TransportLineModel, line.id)
        if model is None:
            return None
        model.status = line.status.value
        model.status_message = line.status_message
        model.status_updated_at = line.status_updated_at
        self.db.commit()
        self.db.refresh(model)
        return self.get_line(line.id)

    def _stops_by_line(self, line_ids: list[str]) -> dict[str, list[TransportStopModel]]:
        if not line_ids:
            return {}
        rows = self.db.scalars(
            select(TransportStopModel)
            .where(TransportStopModel.line_id.in_(line_ids))
            .order_by(TransportStopModel.line_id, TransportStopModel.position)
        )
        grouped: dict[str, list[TransportStopModel]] = {}
        for row in rows:
            grouped.setdefault(row.line_id, []).append(row)
        return grouped


def _hhmm(value: str) -> time:
    hours, minutes = value.split(":")
    return time(int(hours), int(minutes))


def _to_entity(model: TransportLineModel, stops: list[TransportStopModel]) -> TransportLine:
    updated = model.status_updated_at
    return TransportLine(
        id=model.id,
        code=model.code,
        name=model.name,
        mode=TransportMode(model.mode),
        first_departure=_hhmm(model.first_departure),
        last_departure=_hhmm(model.last_departure),
        frequency_minutes=model.frequency_minutes,
        days_label=model.days_label,
        stops=tuple(
            TransportStop(
                id=stop.id,
                name=stop.name,
                position=stop.position,
                minutes_from_start=stop.minutes_from_start,
                latitude=stop.latitude,
                longitude=stop.longitude,
            )
            for stop in stops
        ),
        status=LineStatus(model.status),
        status_message=model.status_message,
        status_updated_at=(updated.replace(tzinfo=updated.tzinfo or UTC) if updated else None),
        display_order=model.display_order,
    )
