import uuid
from datetime import UTC, datetime

from src.domain.municipal_content import (
    ContactMessage,
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalPublicationNotFoundError,
    MunicipalService,
    MunicipalServiceNotFoundError,
)
from src.features.municipal_content.schemas import (
    CreateContactMessageIn,
    UpdateMunicipalServiceCatalogIn,
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


def send_contact_message(
    dto: CreateContactMessageIn, repo: MunicipalContentRepository
) -> ContactMessage:
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
