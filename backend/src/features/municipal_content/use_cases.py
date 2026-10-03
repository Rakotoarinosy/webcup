import uuid
from datetime import UTC, datetime

from src.domain.municipal_content import (
    ContactMessage,
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalPublicationNotFoundError,
    MunicipalService,
)
from src.features.municipal_content.schemas import CreateContactMessageIn


def list_municipal_services(repo: MunicipalContentRepository) -> list[MunicipalService]:
    return repo.list_services()


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
