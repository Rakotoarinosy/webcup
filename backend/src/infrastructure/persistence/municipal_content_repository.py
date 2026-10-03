"""Persistance SQLAlchemy du contenu municipal public."""

from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.domain.municipal_content import (
    ContactMessage,
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalService,
)
from src.infrastructure.persistence.models import (
    ContactMessageModel,
    MunicipalPublicationModel,
    MunicipalServiceModel,
)


class SqlAlchemyMunicipalContentRepository(MunicipalContentRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_services(self) -> list[MunicipalService]:
        rows = self.db.scalars(
            select(MunicipalServiceModel)
            .where(MunicipalServiceModel.is_active.is_(True))
            .order_by(MunicipalServiceModel.display_order, MunicipalServiceModel.name)
        )
        return [self._service(row) for row in rows]

    def get_service(self, service_id: str) -> MunicipalService | None:
        row = self.db.get(MunicipalServiceModel, service_id)
        return self._service(row) if row and row.is_active else None

    def list_publications(self, category: str | None, limit: int) -> list[MunicipalPublication]:
        statement = (
            select(MunicipalPublicationModel)
            .where(MunicipalPublicationModel.is_published.is_(True))
            .order_by(MunicipalPublicationModel.published_at.desc())
            .limit(limit)
        )
        if category:
            statement = statement.where(MunicipalPublicationModel.category == category.strip())
        return [self._publication(row) for row in self.db.scalars(statement)]

    def get_publication(self, publication_id: str) -> MunicipalPublication | None:
        row = self.db.get(MunicipalPublicationModel, publication_id)
        return self._publication(row) if row and row.is_published else None

    def add_contact_message(self, message: ContactMessage) -> ContactMessage:
        self.db.add(
            ContactMessageModel(
                id=message.id,
                receipt_number=message.receipt_number,
                service_id=message.service_id,
                sender_name=message.sender_name,
                sender_email=message.sender_email,
                subject=message.subject,
                message=message.message,
                created_at=message.created_at,
            )
        )
        self.db.commit()
        return message

    @staticmethod
    def _utc(value: datetime) -> datetime:
        return value.replace(tzinfo=value.tzinfo or UTC)

    def _service(self, row: MunicipalServiceModel) -> MunicipalService:
        return MunicipalService(
            row.id,
            row.name,
            row.description,
            row.contact_details,
            row.opening_hours,
            row.icon,
            row.display_order,
            row.is_active,
        )

    def _publication(self, row: MunicipalPublicationModel) -> MunicipalPublication:
        return MunicipalPublication(
            row.id,
            row.title,
            row.summary,
            row.content,
            row.category,
            self._utc(row.published_at),
            row.is_published,
        )
