"""Contenus d'information municipale et formulaire de contact publics."""

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from src.domain.municipal_content import (
    MunicipalContentRepository,
    MunicipalPublication,
    MunicipalPublicationComment,
    MunicipalService,
)
from src.domain.user import Role, User
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.municipal_content.schemas import (
    ContactReceiptOut,
    CreateContactMessageIn,
    CreateMunicipalPublicationIn,
    CreatePublicationCommentIn,
    MunicipalPublicationCommentOut,
    MunicipalPublicationOut,
    MunicipalServiceOut,
    PublicationLikeOut,
    UpdateMunicipalPublicationIn,
    UpdateMunicipalServiceCatalogIn,
    UpdateServiceLocationIn,
    UpdateServiceStatusIn,
)
from src.features.municipal_content.use_cases import (
    change_municipal_service_status,
    create_municipal_publication,
    create_publication_comment,
    delete_municipal_publication,
    get_municipal_publication,
    get_municipal_service,
    list_featured_municipal_services,
    list_interrupted_municipal_services,
    list_municipal_publications,
    list_municipal_services,
    list_popular_municipal_services,
    list_publication_comments,
    list_publications_for_management,
    register_publication_view,
    send_contact_message,
    start_municipal_service,
    toggle_publication_like,
    update_municipal_publication,
    update_municipal_service_catalog,
    update_municipal_service_location,
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
    available_only: bool = Query(default=False),
    category: str | None = Query(default=None, min_length=1, max_length=80),
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    return list_municipal_services(repo, available_only=available_only, category=category)


@router.get("/services/interruptions", response_model=list[MunicipalServiceOut])
def list_interrupted_services_endpoint(
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    """Public : services perturbés, en maintenance ou hors service, les plus graves d'abord."""
    return list_interrupted_municipal_services(repo)


@router.get("/services/featured", response_model=list[MunicipalServiceOut])
def list_featured_services_endpoint(
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    return list_featured_municipal_services(repo)


@router.get("/services/popular", response_model=list[MunicipalServiceOut])
def list_popular_services_endpoint(
    limit: int = Query(default=6, ge=1, le=6),
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalService]:
    return list_popular_municipal_services(limit, repo)


@router.get("/services/{service_id}", response_model=MunicipalServiceOut)
def get_service_endpoint(
    service_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> MunicipalService:
    """Public : fiche et état actuel d'un service, à consulter avant de commencer une démarche."""
    return get_municipal_service(service_id, repo)


@router.patch("/services/{service_id}/status", response_model=MunicipalServiceOut)
def update_service_status_endpoint(
    service_id: str,
    payload: UpdateServiceStatusIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.ADMIN, Role.MANAGER)),
    audit: AuditTrail = Depends(get_audit_trail),
) -> MunicipalService:
    return change_municipal_service_status(service_id, payload, repo, audit=audit)


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


@router.patch("/services/{service_id}/location", response_model=MunicipalServiceOut)
def update_service_location_endpoint(
    service_id: str,
    payload: UpdateServiceLocationIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.MANAGER)),
) -> MunicipalService:
    return update_municipal_service_location(service_id, payload, repo)


@router.get("/publications", response_model=list[MunicipalPublicationOut])
def list_publications_endpoint(
    category: str | None = Query(default=None, min_length=1, max_length=80),
    limit: int = Query(default=20, ge=1, le=100),
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalPublication]:
    return list_municipal_publications(category, limit, repo)


@router.get(
    "/publications/manage",
    response_model=list[MunicipalPublicationOut],
)
def list_publications_for_management_endpoint(
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.ADMIN, Role.AGENT, Role.MANAGER)),
) -> list[MunicipalPublication]:
    """Liste de modération : inclut brouillons et publications planifiées."""
    return list_publications_for_management(repo)


@router.get("/publications/{publication_id}", response_model=MunicipalPublicationOut)
def get_publication_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> MunicipalPublication:
    return get_municipal_publication(publication_id, repo)


@router.post("/publications/{publication_id}/view", response_model=MunicipalPublicationOut)
def register_publication_view_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> MunicipalPublication:
    return register_publication_view(publication_id, repo)


@router.post("/publications/{publication_id}/like", response_model=PublicationLikeOut)
def toggle_publication_like_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    user: User = Depends(require_roles(Role.CITIZEN)),
) -> PublicationLikeOut:
    publication, liked = toggle_publication_like(publication_id, user.id, repo)
    return PublicationLikeOut(like_count=publication.like_count, liked=liked)


@router.get(
    "/publications/{publication_id}/comments", response_model=list[MunicipalPublicationCommentOut]
)
def list_publication_comments_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> list[MunicipalPublicationComment]:
    return list_publication_comments(publication_id, repo)


@router.post(
    "/publications/{publication_id}/comments",
    response_model=MunicipalPublicationCommentOut,
    status_code=status.HTTP_201_CREATED,
)
def create_publication_comment_endpoint(
    publication_id: str,
    payload: CreatePublicationCommentIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    user: User = Depends(require_roles(Role.CITIZEN)),
) -> MunicipalPublicationComment:
    return create_publication_comment(publication_id, user.id, user.name, payload.content, repo)


@router.post(
    "/publications",
    response_model=MunicipalPublicationOut,
    status_code=status.HTTP_201_CREATED,
)
def create_publication_endpoint(
    payload: CreateMunicipalPublicationIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.ADMIN, Role.AGENT, Role.MANAGER)),
) -> MunicipalPublication:
    return create_municipal_publication(payload, repo)


@router.patch("/publications/{publication_id}", response_model=MunicipalPublicationOut)
def update_publication_endpoint(
    publication_id: str,
    payload: UpdateMunicipalPublicationIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.ADMIN, Role.AGENT, Role.MANAGER)),
) -> MunicipalPublication:
    return update_municipal_publication(publication_id, payload, repo)


@router.delete("/publications/{publication_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_publication_endpoint(
    publication_id: str,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    _: User = Depends(require_roles(Role.ADMIN, Role.AGENT, Role.MANAGER)),
) -> None:
    delete_municipal_publication(publication_id, repo)


@router.post("/contact", response_model=ContactReceiptOut, status_code=status.HTTP_201_CREATED)
def contact_endpoint(
    payload: CreateContactMessageIn,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
) -> ContactReceiptOut:
    contact = send_contact_message(payload, repo)
    return ContactReceiptOut(receipt_number=contact.receipt_number, created_at=contact.created_at)
