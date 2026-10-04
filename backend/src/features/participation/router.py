"""Endpoints HTTP de la participation : projets (F67), consultations (F65, F66), idées (F68), avis (F76).

Les pages publiques (projets, consultations, idées publiées, avis) se lisent sans connexion ;
contribuer demande un compte habitant ; gérer et modérer est réservé à la mairie.
"""

from fastapi import APIRouter, Depends, Query
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.municipal_content import MunicipalContentRepository
from src.domain.participation import (
    CityProject,
    ConsultationRepository,
    ConsultationResponse,
    Idea,
    IdeaRepository,
    IdeaStatus,
    IdeaVisibility,
    ProjectRepository,
    ProjectStatus,
    ServiceRating,
    ServiceReview,
    ServiceReviewRepository,
)
from src.domain.user import User, UserRepository
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.features.participation import use_cases
from src.features.participation.schemas import (
    ConsultationAnswerIn,
    ConsultationIn,
    ConsultationOut,
    ConsultationPatch,
    ConsultationResponseOut,
    ContributionOut,
    DecisionIn,
    IdeaAdminOut,
    IdeaIn,
    IdeaModerationIn,
    IdeaOut,
    IdeaStatusIn,
    MyParticipationOut,
    ProjectIn,
    ProjectNewsIn,
    ProjectOut,
    ProjectPatch,
    PublicIdeaOut,
    ReviewAdminOut,
    ReviewAnswerIn,
    ReviewIn,
    ReviewModerationIn,
    ReviewOut,
    ServiceRatingOut,
    ServiceReviewsOut,
    SupportOut,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.municipal_content_repository import (
    SqlAlchemyMunicipalContentRepository,
)
from src.infrastructure.persistence.participation_repository import (
    SqlAlchemyConsultationRepository,
    SqlAlchemyIdeaRepository,
    SqlAlchemyProjectRepository,
    SqlAlchemyServiceReviewRepository,
)
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/participation", tags=["participation"])


def get_projects(db: Session = Depends(get_db)) -> ProjectRepository:
    return SqlAlchemyProjectRepository(db)


def get_consultations(db: Session = Depends(get_db)) -> ConsultationRepository:
    return SqlAlchemyConsultationRepository(db)


def get_ideas(db: Session = Depends(get_db)) -> IdeaRepository:
    return SqlAlchemyIdeaRepository(db)


def get_reviews(db: Session = Depends(get_db)) -> ServiceReviewRepository:
    return SqlAlchemyServiceReviewRepository(db)


def get_services(db: Session = Depends(get_db)) -> MunicipalContentRepository:
    return SqlAlchemyMunicipalContentRepository(db)


def get_users(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


# ─── ma participation ───────────────────────────────────────────────


@router.get("/mine", response_model=MyParticipationOut)
def my_participation_endpoint(
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
    consultations: ConsultationRepository = Depends(get_consultations),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
) -> MyParticipationOut:
    return use_cases.my_participation(user, ideas, consultations, reviews, services)


# ─── projets ────────────────────────────────────────────────────────


@router.get("/projects", response_model=list[ProjectOut])
def list_projects_endpoint(
    status: ProjectStatus | None = None,
    district: str | None = Query(default=None, max_length=120),
    projects: ProjectRepository = Depends(get_projects),
) -> list[CityProject]:
    return use_cases.list_projects(projects, status, district)


@router.get("/projects/manage", response_model=list[ProjectOut])
def manage_projects_endpoint(
    user: User = Depends(get_current_user),
    projects: ProjectRepository = Depends(get_projects),
) -> list[CityProject]:
    return use_cases.list_projects_for_management(user, projects)


@router.post("/projects", response_model=ProjectOut, status_code=http_status.HTTP_201_CREATED)
def create_project_endpoint(
    payload: ProjectIn,
    user: User = Depends(get_current_user),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> CityProject:
    return use_cases.create_project(payload, user, projects, audit=audit)


@router.get("/projects/{project_id}", response_model=ProjectOut)
def get_project_endpoint(
    project_id: str, projects: ProjectRepository = Depends(get_projects)
) -> CityProject:
    return use_cases.get_project(project_id, projects)


@router.get("/projects/{project_id}/manage", response_model=ProjectOut)
def get_managed_project_endpoint(
    project_id: str,
    user: User = Depends(get_current_user),
    projects: ProjectRepository = Depends(get_projects),
) -> CityProject:
    return use_cases.get_managed_project(project_id, user, projects)


@router.patch("/projects/{project_id}", response_model=ProjectOut)
def update_project_endpoint(
    project_id: str,
    payload: ProjectPatch,
    user: User = Depends(get_current_user),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> CityProject:
    return use_cases.update_project(project_id, payload, user, projects, audit=audit)


@router.post("/projects/{project_id}/updates", response_model=ProjectOut)
def publish_project_news_endpoint(
    project_id: str,
    payload: ProjectNewsIn,
    user: User = Depends(get_current_user),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> CityProject:
    return use_cases.publish_project_news(project_id, payload, user, projects, audit=audit)


# ─── consultations ──────────────────────────────────────────────────


@router.get("/consultations", response_model=list[ConsultationOut])
def list_consultations_endpoint(
    project_id: str | None = None,
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
) -> list[ConsultationOut]:
    return [
        use_cases.consultation_out(item, consultations, projects)
        for item in use_cases.list_consultations(consultations, project_id)
    ]


@router.get("/consultations/manage", response_model=list[ConsultationOut])
def manage_consultations_endpoint(
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
) -> list[ConsultationOut]:
    return [
        use_cases.consultation_out(item, consultations, projects, user)
        for item in use_cases.list_consultations_for_management(user, consultations)
    ]


@router.post(
    "/consultations", response_model=ConsultationOut, status_code=http_status.HTTP_201_CREATED
)
def create_consultation_endpoint(
    payload: ConsultationIn,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ConsultationOut:
    created = use_cases.create_consultation(payload, user, consultations, projects, audit=audit)
    return use_cases.consultation_out(created, consultations, projects, user)


@router.get("/consultations/{consultation_id}", response_model=ConsultationOut)
def get_consultation_endpoint(
    consultation_id: str,
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
) -> ConsultationOut:
    consultation = use_cases.get_consultation(consultation_id, consultations)
    return use_cases.consultation_out(consultation, consultations, projects)


@router.patch("/consultations/{consultation_id}", response_model=ConsultationOut)
def update_consultation_endpoint(
    consultation_id: str,
    payload: ConsultationPatch,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ConsultationOut:
    updated = use_cases.update_consultation(
        consultation_id, payload, user, consultations, projects, audit=audit
    )
    return use_cases.consultation_out(updated, consultations, projects, user)


@router.post("/consultations/{consultation_id}/close", response_model=ConsultationOut)
def close_consultation_endpoint(
    consultation_id: str,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ConsultationOut:
    closed = use_cases.close_consultation(consultation_id, user, consultations, audit=audit)
    return use_cases.consultation_out(closed, consultations, projects, user)


@router.post("/consultations/{consultation_id}/decision", response_model=ConsultationOut)
def publish_decision_endpoint(
    consultation_id: str,
    payload: DecisionIn,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
    projects: ProjectRepository = Depends(get_projects),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ConsultationOut:
    decided = use_cases.publish_decision(consultation_id, payload, user, consultations, audit=audit)
    return use_cases.consultation_out(decided, consultations, projects, user)


@router.get("/consultations/{consultation_id}/contributions", response_model=list[ContributionOut])
def list_contributions_endpoint(
    consultation_id: str,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
) -> list[ContributionOut]:
    return use_cases.list_contributions(consultation_id, user, consultations)


@router.get(
    "/consultations/{consultation_id}/response",
    response_model=ConsultationResponseOut | None,
)
def my_response_endpoint(
    consultation_id: str,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
) -> ConsultationResponse | None:
    return use_cases.my_consultation_response(consultation_id, user, consultations)


@router.put("/consultations/{consultation_id}/response", response_model=ConsultationResponseOut)
def answer_consultation_endpoint(
    consultation_id: str,
    payload: ConsultationAnswerIn,
    user: User = Depends(get_current_user),
    consultations: ConsultationRepository = Depends(get_consultations),
) -> ConsultationResponse:
    return use_cases.answer_consultation(consultation_id, payload, user, consultations)


# ─── idées ──────────────────────────────────────────────────────────


@router.get("/ideas", response_model=list[PublicIdeaOut])
def list_public_ideas_endpoint(
    status: IdeaStatus | None = None, ideas: IdeaRepository = Depends(get_ideas)
) -> list[Idea]:
    return use_cases.list_public_ideas(ideas, status)


@router.post("/ideas", response_model=IdeaOut, status_code=http_status.HTTP_201_CREATED)
def submit_idea_endpoint(
    payload: IdeaIn,
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
) -> Idea:
    return use_cases.submit_idea(payload, user, ideas)


@router.get("/ideas/manage", response_model=list[IdeaAdminOut])
def manage_ideas_endpoint(
    status: IdeaStatus | None = None,
    visibility: IdeaVisibility | None = None,
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
    users: UserRepository = Depends(get_users),
) -> list[IdeaAdminOut]:
    items = use_cases.list_ideas_for_management(user, ideas, status, visibility)
    return [_idea_admin(idea, users) for idea in items]


@router.post("/ideas/{idea_id}/status", response_model=IdeaAdminOut)
def change_idea_status_endpoint(
    idea_id: str,
    payload: IdeaStatusIn,
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
    users: UserRepository = Depends(get_users),
    audit: AuditTrail = Depends(get_audit_trail),
) -> IdeaAdminOut:
    idea = use_cases.change_idea_status(idea_id, payload, user, ideas, audit=audit)
    return _idea_admin(idea, users)


@router.post("/ideas/{idea_id}/moderation", response_model=IdeaAdminOut)
def moderate_idea_endpoint(
    idea_id: str,
    payload: IdeaModerationIn,
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
    users: UserRepository = Depends(get_users),
    audit: AuditTrail = Depends(get_audit_trail),
) -> IdeaAdminOut:
    idea = use_cases.moderate_idea(idea_id, payload, user, ideas, audit=audit)
    return _idea_admin(idea, users)


@router.post("/ideas/{idea_id}/support", response_model=SupportOut)
def support_idea_endpoint(
    idea_id: str,
    user: User = Depends(get_current_user),
    ideas: IdeaRepository = Depends(get_ideas),
) -> SupportOut:
    supported, count = use_cases.toggle_idea_support(idea_id, user, ideas)
    return SupportOut(supported=supported, support_count=count)


def _idea_admin(idea: Idea, users: UserRepository) -> IdeaAdminOut:
    author = users.get_by_id(idea.user_id)
    return IdeaAdminOut(
        **IdeaOut.model_validate(idea).model_dump(),
        user_id=idea.user_id,
        user_name=author.name if author else "Compte supprimé",
    )


# ─── avis sur les services ──────────────────────────────────────────


@router.get("/services/ratings", response_model=list[ServiceRatingOut])
def service_ratings_endpoint(
    reviews: ServiceReviewRepository = Depends(get_reviews),
) -> list[ServiceRating]:
    return use_cases.service_ratings(reviews)


@router.get("/services/{service_id}/reviews", response_model=ServiceReviewsOut)
def service_reviews_endpoint(
    service_id: str,
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
) -> ServiceReviewsOut:
    return use_cases.service_reviews(service_id, reviews, services)


@router.get("/services/{service_id}/review", response_model=ReviewOut | None)
def my_service_review_endpoint(
    service_id: str,
    user: User = Depends(get_current_user),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
) -> ReviewOut | None:
    review = use_cases.my_service_review(service_id, user, reviews, services)
    return use_cases.review_out(review, services) if review else None


@router.put("/services/{service_id}/review", response_model=ReviewOut)
def review_service_endpoint(
    service_id: str,
    payload: ReviewIn,
    user: User = Depends(get_current_user),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
) -> ReviewOut:
    review = use_cases.review_service(service_id, payload, user, reviews, services)
    return use_cases.review_out(review, services)


@router.get("/reviews/manage", response_model=list[ReviewAdminOut])
def manage_reviews_endpoint(
    service_id: str | None = None,
    user: User = Depends(get_current_user),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
    users: UserRepository = Depends(get_users),
) -> list[ReviewAdminOut]:
    items = use_cases.list_reviews_for_management(user, reviews, service_id)
    return [_review_admin(review, services, users) for review in items]


@router.post("/reviews/{review_id}/answer", response_model=ReviewAdminOut)
def answer_review_endpoint(
    review_id: str,
    payload: ReviewAnswerIn,
    user: User = Depends(get_current_user),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
    users: UserRepository = Depends(get_users),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ReviewAdminOut:
    review = use_cases.answer_review(review_id, payload, user, reviews, audit=audit)
    return _review_admin(review, services, users)


@router.post("/reviews/{review_id}/moderation", response_model=ReviewAdminOut)
def moderate_review_endpoint(
    review_id: str,
    payload: ReviewModerationIn,
    user: User = Depends(get_current_user),
    reviews: ServiceReviewRepository = Depends(get_reviews),
    services: MunicipalContentRepository = Depends(get_services),
    users: UserRepository = Depends(get_users),
    audit: AuditTrail = Depends(get_audit_trail),
) -> ReviewAdminOut:
    review = use_cases.moderate_review(review_id, payload, user, reviews, audit=audit)
    return _review_admin(review, services, users)


def _review_admin(
    review: ServiceReview, services: MunicipalContentRepository, users: UserRepository
) -> ReviewAdminOut:
    author = users.get_by_id(review.user_id)
    return ReviewAdminOut(
        **use_cases.review_out(review, services).model_dump(),
        user_name=author.name if author else "Compte supprimé",
    )
