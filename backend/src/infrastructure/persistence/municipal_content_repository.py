"""Persistance SQLAlchemy du contenu municipal public."""

from datetime import UTC, datetime

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from src.domain.municipal_content import (
    ContactMessage,
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalPublicationComment,
    MunicipalService,
    ServiceStatus,
)
from src.infrastructure.persistence.models import (
    ContactMessageModel,
    MunicipalPublicationCommentModel,
    MunicipalPublicationLikeModel,
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

    def list_featured_services(self) -> list[MunicipalService]:
        rows = self.db.scalars(
            select(MunicipalServiceModel)
            .where(
                MunicipalServiceModel.is_active.is_(True),
                MunicipalServiceModel.is_featured.is_(True),
            )
            .order_by(
                MunicipalServiceModel.display_order.asc(),
                MunicipalServiceModel.usage_count.desc(),
            )
        )
        return [self._service(row) for row in rows]

    def list_popular_services(self, limit: int) -> list[MunicipalService]:
        rows = self.db.scalars(
            select(MunicipalServiceModel)
            .where(
                MunicipalServiceModel.is_active.is_(True),
                MunicipalServiceModel.usage_count > 0,
            )
            .order_by(
                MunicipalServiceModel.usage_count.desc(),
                MunicipalServiceModel.name.asc(),
                MunicipalServiceModel.id.asc(),
            )
            .limit(limit)
        )
        return [self._service(row) for row in rows]

    def get_service(self, service_id: str) -> MunicipalService | None:
        row = self.db.get(MunicipalServiceModel, service_id)
        return self._service(row) if row and row.is_active else None

    def increment_service_usage(self, service_id: str) -> MunicipalService | None:
        statement = (
            update(MunicipalServiceModel)
            .where(
                MunicipalServiceModel.id == service_id,
                MunicipalServiceModel.is_active.is_(True),
            )
            .values(usage_count=MunicipalServiceModel.usage_count + 1)
            .returning(MunicipalServiceModel)
        )
        row = self.db.scalars(statement).one_or_none()
        self.db.commit()
        return self._service(row) if row is not None else None

    def update_service_catalog(
        self,
        service_id: str,
        *,
        is_featured: bool | None = None,
        display_order: int | None = None,
    ) -> MunicipalService | None:
        row = self.db.get(MunicipalServiceModel, service_id)
        if row is None:
            return None
        if is_featured is not None:
            row.is_featured = is_featured
        if display_order is not None:
            row.display_order = display_order
        self.db.commit()
        self.db.refresh(row)
        return self._service(row)

    def update_service_location(
        self,
        service_id: str,
        *,
        address: str | None,
        latitude: float | None,
        longitude: float | None,
    ) -> MunicipalService | None:
        row = self.db.get(MunicipalServiceModel, service_id)
        if row is None:
            return None
        row.address, row.latitude, row.longitude = address, latitude, longitude
        self.db.commit()
        self.db.refresh(row)
        return self._service(row)

    def save_service_status(self, service: MunicipalService) -> MunicipalService | None:
        row = self.db.get(MunicipalServiceModel, service.id)
        if row is None:
            return None
        row.status = service.status.value
        row.status_message = service.status_message
        row.status_expected_back_at = service.status_expected_back_at
        row.status_alternative = service.status_alternative
        row.alternative_service_id = service.alternative_service_id
        row.status_updated_at = service.status_updated_at
        self.db.commit()
        self.db.refresh(row)
        return self._service(row)

    def list_publications(self, category: str | None, limit: int) -> list[MunicipalPublication]:
        statement = (
            select(MunicipalPublicationModel)
            .where(
                MunicipalPublicationModel.is_published.is_(True),
                MunicipalPublicationModel.published_at <= datetime.now(UTC),
            )
            .order_by(MunicipalPublicationModel.published_at.desc())
            .limit(limit)
        )
        if category:
            statement = statement.where(MunicipalPublicationModel.category == category.strip())
        return [self._publication(row) for row in self.db.scalars(statement)]

    def get_publication(self, publication_id: str) -> MunicipalPublication | None:
        row = self.db.get(MunicipalPublicationModel, publication_id)
        return (
            self._publication(row)
            if row and row.is_published and self._utc(row.published_at) <= datetime.now(UTC)
            else None
        )

    def list_publications_for_management(self) -> list[MunicipalPublication]:
        statement = select(MunicipalPublicationModel).order_by(
            MunicipalPublicationModel.published_at.desc()
        )
        return [self._publication(row) for row in self.db.scalars(statement)]

    def get_publication_for_management(self, publication_id: str) -> MunicipalPublication | None:
        row = self.db.get(MunicipalPublicationModel, publication_id)
        return self._publication(row) if row else None

    def add_publication(self, publication: MunicipalPublication) -> MunicipalPublication:
        row = MunicipalPublicationModel(
            id=publication.id,
            title=publication.title,
            summary=publication.summary,
            content=publication.content,
            category=publication.category,
            published_at=publication.published_at,
            is_published=publication.is_published,
            image_url=publication.image_url,
            view_count=publication.view_count,
            like_count=publication.like_count,
        )
        self.db.add(row)
        self.db.commit()
        self.db.refresh(row)
        return self._publication(row)

    def update_publication(
        self,
        publication_id: str,
        *,
        title: str | None = None,
        summary: str | None = None,
        content: str | None = None,
        category: str | None = None,
        published_at: datetime | None = None,
        is_published: bool | None = None,
        image_url: str | None = None,
    ) -> MunicipalPublication | None:
        row = self.db.get(MunicipalPublicationModel, publication_id)
        if row is None:
            return None
        for field, value in {
            "title": title,
            "summary": summary,
            "content": content,
            "category": category,
            "published_at": published_at,
            "is_published": is_published,
            "image_url": image_url,
        }.items():
            if value is not None:
                setattr(row, field, value)
        self.db.commit()
        self.db.refresh(row)
        return self._publication(row)

    def increment_publication_views(self, publication_id: str) -> MunicipalPublication | None:
        statement = (
            update(MunicipalPublicationModel)
            .where(
                MunicipalPublicationModel.id == publication_id,
                MunicipalPublicationModel.is_published.is_(True),
                MunicipalPublicationModel.published_at <= datetime.now(UTC),
            )
            .values(view_count=MunicipalPublicationModel.view_count + 1)
            .returning(MunicipalPublicationModel)
        )
        row = self.db.scalars(statement).one_or_none()
        self.db.commit()
        return self._publication(row) if row else None

    def increment_publication_likes(self, publication_id: str) -> MunicipalPublication | None:
        statement = (
            update(MunicipalPublicationModel)
            .where(
                MunicipalPublicationModel.id == publication_id,
                MunicipalPublicationModel.is_published.is_(True),
                MunicipalPublicationModel.published_at <= datetime.now(UTC),
            )
            .values(like_count=MunicipalPublicationModel.like_count + 1)
            .returning(MunicipalPublicationModel)
        )
        row = self.db.scalars(statement).one_or_none()
        self.db.commit()
        return self._publication(row) if row else None

    def toggle_publication_like(
        self, publication_id: str, user_id: str
    ) -> tuple[MunicipalPublication, bool] | None:
        publication = self.get_publication(publication_id)
        if publication is None:
            return None
        existing = self.db.get(MunicipalPublicationLikeModel, (publication_id, user_id))
        row = self.db.get(MunicipalPublicationModel, publication_id)
        if row is None:
            return None
        if existing:
            self.db.delete(existing)
            row.like_count = max(0, row.like_count - 1)
            liked = False
        else:
            self.db.add(
                MunicipalPublicationLikeModel(publication_id=publication_id, user_id=user_id)
            )
            row.like_count += 1
            liked = True
        self.db.commit()
        self.db.refresh(row)
        return self._publication(row), liked

    def list_publication_comments(self, publication_id: str) -> list[MunicipalPublicationComment]:
        rows = self.db.scalars(
            select(MunicipalPublicationCommentModel)
            .where(MunicipalPublicationCommentModel.publication_id == publication_id)
            .order_by(MunicipalPublicationCommentModel.created_at.desc())
        )
        return [self._comment(row) for row in rows]

    def add_publication_comment(
        self, comment: MunicipalPublicationComment
    ) -> MunicipalPublicationComment | None:
        if self.get_publication(comment.publication_id) is None:
            return None
        self.db.add(
            MunicipalPublicationCommentModel(
                id=comment.id,
                publication_id=comment.publication_id,
                user_id=comment.user_id,
                author_name=comment.author_name,
                content=comment.content,
                created_at=comment.created_at,
            )
        )
        self.db.commit()
        return comment

    def delete_publication(self, publication_id: str) -> bool:
        row = self.db.get(MunicipalPublicationModel, publication_id)
        if row is None:
            return False
        self.db.delete(row)
        self.db.commit()
        return True

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
            row.category,
            row.description,
            row.contact_details,
            row.opening_hours,
            row.icon,
            row.display_order,
            row.is_featured,
            row.usage_count,
            row.is_active,
            row.address,
            row.latitude,
            row.longitude,
            status=ServiceStatus(row.status or ServiceStatus.AVAILABLE),
            status_message=row.status_message,
            status_expected_back_at=(
                self._utc(row.status_expected_back_at) if row.status_expected_back_at else None
            ),
            status_alternative=row.status_alternative,
            alternative_service_id=row.alternative_service_id,
            status_updated_at=(self._utc(row.status_updated_at) if row.status_updated_at else None),
            open_24_7=bool(row.open_24_7),
            emergency_care=bool(row.emergency_care),
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
            row.image_url,
            row.view_count,
            row.like_count,
        )

    def _comment(self, row: MunicipalPublicationCommentModel) -> MunicipalPublicationComment:
        return MunicipalPublicationComment(
            row.id,
            row.publication_id,
            row.user_id,
            row.author_name,
            row.content,
            self._utc(row.created_at),
        )
