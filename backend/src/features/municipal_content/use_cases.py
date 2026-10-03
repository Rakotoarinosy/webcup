import uuid
from datetime import UTC, datetime

from src.domain.municipal_content import (
    ContactMessage,
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalPublicationComment,
    MunicipalPublicationNotFoundError,
    MunicipalService,
    MunicipalServiceNotFoundError,
)
from src.features.municipal_content.schemas import (
    CreateContactMessageIn,
    CreateMunicipalPublicationIn,
    UpdateMunicipalPublicationIn,
    UpdateMunicipalServiceCatalogIn,
    UpdateServiceLocationIn,
)


def list_municipal_services(repo: MunicipalContentRepository) -> list[MunicipalService]:
    return repo.list_services()


def list_featured_municipal_services(repo: MunicipalContentRepository) -> list[MunicipalService]:
    return repo.list_featured_services()


def list_popular_municipal_services(
    limit: int, repo: MunicipalContentRepository
) -> list[MunicipalService]:
    return repo.list_popular_services(limit)


def start_municipal_service(service_id: str, repo: MunicipalContentRepository) -> MunicipalService:
    service = repo.increment_service_usage(service_id)
    if service is None:
        raise MunicipalServiceNotFoundError(service_id)
    return service


def update_municipal_service_catalog(
    service_id: str,
    dto: UpdateMunicipalServiceCatalogIn,
    repo: MunicipalContentRepository,
) -> MunicipalService:
    updated = repo.update_service_catalog(
        service_id,
        **dto.model_dump(exclude_unset=True),
    )
    if updated is None:
        raise MunicipalServiceNotFoundError(service_id)
    return updated


def update_municipal_service_location(
    service_id: str, dto: UpdateServiceLocationIn, repo: MunicipalContentRepository
) -> MunicipalService:
    updated = repo.update_service_location(
        service_id, address=dto.address, latitude=dto.latitude, longitude=dto.longitude
    )
    if updated is None:
        raise MunicipalServiceNotFoundError(service_id)
    return updated


def list_municipal_publications(
    category: str | None, limit: int, repo: MunicipalContentRepository
) -> list[MunicipalPublication]:
    return repo.list_publications(category, limit)


def get_municipal_publication(
    publication_id: str, repo: MunicipalContentRepository
) -> MunicipalPublication:
    publication = repo.get_publication(publication_id)
    if publication is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return publication


def list_publications_for_management(
    repo: MunicipalContentRepository,
) -> list[MunicipalPublication]:
    return repo.list_publications_for_management()


def create_municipal_publication(
    dto: CreateMunicipalPublicationIn, repo: MunicipalContentRepository
) -> MunicipalPublication:
    return repo.add_publication(
        MunicipalPublication(
            id=str(uuid.uuid4()),
            title=dto.title,
            summary=dto.summary,
            content=dto.content,
            category=dto.category,
            published_at=dto.published_at,
            is_published=dto.is_published,
            image_url=dto.image_url,
        )
    )


def update_municipal_publication(
    publication_id: str,
    dto: UpdateMunicipalPublicationIn,
    repo: MunicipalContentRepository,
) -> MunicipalPublication:
    publication = repo.update_publication(publication_id, **dto.model_dump(exclude_unset=True))
    if publication is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return publication


def delete_municipal_publication(publication_id: str, repo: MunicipalContentRepository) -> None:
    if not repo.delete_publication(publication_id):
        raise MunicipalPublicationNotFoundError(publication_id)


def register_publication_view(
    publication_id: str, repo: MunicipalContentRepository
) -> MunicipalPublication:
    publication = repo.increment_publication_views(publication_id)
    if publication is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return publication


def toggle_publication_like(
    publication_id: str, user_id: str, repo: MunicipalContentRepository
) -> tuple[MunicipalPublication, bool]:
    result = repo.toggle_publication_like(publication_id, user_id)
    if result is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return result


def list_publication_comments(
    publication_id: str, repo: MunicipalContentRepository
) -> list[MunicipalPublicationComment]:
    if repo.get_publication(publication_id) is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return repo.list_publication_comments(publication_id)


def create_publication_comment(
    publication_id: str, user_id: str, author_name: str, content: str, repo: MunicipalContentRepository
) -> MunicipalPublicationComment:
    comment = MunicipalPublicationComment(
        id=str(uuid.uuid4()),
        publication_id=publication_id,
        user_id=user_id,
        author_name=author_name,
        content=content.strip(),
        created_at=datetime.now(UTC),
    )
    created = repo.add_publication_comment(comment)
    if created is None:
        raise MunicipalPublicationNotFoundError(publication_id)
    return created


def send_contact_message(
    dto: CreateContactMessageIn, repo: MunicipalContentRepository
) -> ContactMessage:
    if dto.service_id is not None and not any(
        service.id == dto.service_id for service in repo.list_services()
    ):
        raise MunicipalServiceNotFoundError(dto.service_id)
    now = datetime.now(UTC)
    message = ContactMessage(
        id=str(uuid.uuid4()),
        receipt_number=f"MC-{now:%Y%m%d}-{uuid.uuid4().hex[:8].upper()}",
        service_id=dto.service_id,
        sender_name=dto.sender_name.strip(),
        sender_email=str(dto.sender_email),
        subject=dto.subject.strip(),
        message=dto.message.strip(),
        created_at=now,
    )
    return repo.add_contact_message(message)
