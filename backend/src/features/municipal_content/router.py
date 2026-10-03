"""Contenus d'information municipale et formulaire de contact publics."""

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from src.domain.municipal_content import (
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalService,
)
from src.domain.user import Role, User
from src.features.municipal_content.schemas import (
    ContactReceiptOut,
    CreateContactMessageIn,
    MunicipalPublicationOut,
    MunicipalServiceOut,
    UpdateMunicipalServiceCatalogIn,
)
from src.features.municipal_content.use_cases import (
    get_municipal_publication,
    list_featured_municipal_services,
    list_municipal_publications,
    list_municipal_services,
    send_contact_message,
    start_municipal_service,
    update_municipal_service_catalog,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.municipal_content_repository import (
    SqlAlchemyMunicipalContentRepository,
)
from src.infrastructure.security.deps import require_roles

router = APIRouter(prefix="/municipal", tags=["municipal content"])


def get_municipal_content_repo(db: Session = Depends(get_db)) -> MunicipalContentRepository:
    return SqlAlchemyMunicipalContentRepository(db)


@router.get("/services", response_model=list[MunicipalServiceOut])
def list_services_endpoint(
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    return list_municipal_services(repo)


@router.get("/services/featured", response_model=list[MunicipalServiceOut])
def list_featured_services_endpoint(
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    return list_featured_municipal_services(repo)


@router.post("/services/{service_id}/start", response_model=MunicipalServiceOut)
def start_service_endpoint(
    service_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> MunicipalService:
    return start_municipal_service(service_id, repo)


@router.patch("/services/{service_id}/featured", response_model=MunicipalServiceOut)
def update_service_catalog_endpoint(
    service_id: str,
    payload: UpdateMunicipalServiceCatalogIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.MANAGER)),
) -> MunicipalService:
    return update_municipal_service_catalog(service_id, payload, repo)


@router.get("/publications", response_model=list[MunicipalPublicationOut])
def list_publications_endpoint(
    category: str | None = Query(default=None, min_length=1, max_length=80),
    limit: int = Query(default=20, ge=1, le=100),
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalPublication]:
    return list_municipal_publications(category, limit, repo)


@router.get("/publications/{publication_id}", response_model=MunicipalPublicationOut)
def get_publication_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> MunicipalPublication:
    return get_municipal_publication(publication_id, repo)


@router.post("/contact", response_model=ContactReceiptOut, status_code=status.HTTP_201_CREATED)
def contact_endpoint(
    payload: CreateContactMessageIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> ContactReceiptOut:
    contact = send_contact_message(payload, repo)
    return ContactReceiptOut(receipt_number=contact.receipt_number, created_at=contact.created_at)
