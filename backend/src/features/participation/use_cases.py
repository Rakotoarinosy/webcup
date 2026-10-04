"""Use cases de la participation des habitants (F65, F66, F67, F68, F76).

- Les habitants (rôle citoyen) contribuent : réponse à une consultation, idée, soutien, avis.
  Chaque contribution reçoit une référence et une date, et reste consultable dans « Ma participation ».
- La mairie (administrateurs et managers) publie les projets et les consultations, étudie les idées,
  répond aux avis et modère ; chacune de ces opérations est tracée dans le journal d'audit.
"""

import uuid
from dataclasses import replace
from datetime import UTC, datetime

from src.domain.audit import AuditAction, AuditTarget
from src.domain.municipal_content import MunicipalContentRepository
from src.domain.participation import (
    DEFAULT_RULES,
    CityProject,
    Consultation,
    ConsultationLockedConflictError,
    ConsultationNotFoundError,
    ConsultationPhase,
    ConsultationRepository,
    ConsultationResponse,
    Idea,
    IdeaNotFoundError,
    IdeaNotSupportableError,
    IdeaRepository,
    IdeaStatus,
    IdeaStep,
    IdeaVisibility,
    InvalidConsultationError,
    ProjectNotFoundError,
    ProjectRepository,
    ProjectStatus,
    ProjectUpdate,
    ReviewNotFoundError,
    ServiceNotFoundError,
    ServiceRating,
    ServiceReview,
    ServiceReviewRepository,
    tally,
)
from src.domain.user import ForbiddenError, Role, User
from src.features.audit.recording import AuditTrail, field_changes, record
from src.features.participation.schemas import (
    ConsultationAnswerIn,
    ConsultationIn,
    ConsultationOut,
    ConsultationPatch,
    ContributionOut,
    DecisionIn,
    IdeaIn,
    IdeaModerationIn,
    IdeaOut,
    IdeaStatusIn,
    MyConsultationResponseOut,
    MyParticipationOut,
    ProjectIn,
    ProjectNewsIn,
    ProjectPatch,
    PublicReviewOut,
    ResultsOut,
    ReviewAnswerIn,
    ReviewIn,
    ReviewModerationIn,
    ReviewOut,
    ServiceReviewsOut,
)

# ─── droits ─────────────────────────────────────────────────────────


def is_staff(user: User | None) -> bool:
    """La mairie : administrateurs et managers (has_role inclut l'administrateur)."""
    return user is not None and user.has_role(Role.MANAGER)


def _ensure_staff(user: User) -> None:
    if not is_staff(user):
        raise ForbiddenError()


def _ensure_citizen(user: User) -> None:
    if not (user.is_active and user.role is Role.CITIZEN):
        raise ForbiddenError("Only inhabitants can contribute")


def _now(now: datetime | None) -> datetime:
    return now or datetime.now(UTC)


def _aware(value: datetime) -> datetime:
    return value.replace(tzinfo=UTC) if value.tzinfo is None else value.astimezone(UTC)


def _reference(prefix: str, entity_id: str, now: datetime) -> str:
    return f"{prefix}-{now:%Y%m%d}-{entity_id[:8].upper()}"


def _clean(text: str | None) -> str | None:
    text = (text or "").strip()
    return text or None


# ─── projets de la ville (F67) ──────────────────────────────────────

PROJECT_FIELDS = (
    "title",
    "summary",
    "description",
    "district",
    "location",
    "budget",
    "status",
    "progress",
    "planned_start",
    "planned_end",
    "is_published",
)


def list_projects(
    repo: ProjectRepository,
    status: ProjectStatus | None = None,
    district: str | None = None,
) -> list[CityProject]:
    return repo.list(status, _clean(district), published_only=True)


def list_projects_for_management(user: User, repo: ProjectRepository) -> list[CityProject]:
    _ensure_staff(user)
    return repo.list(published_only=False)


def get_project(
    project_id: str, repo: ProjectRepository, viewer: User | None = None
) -> CityProject:
    project = repo.get(project_id)
    if project is None or not (project.is_published or is_staff(viewer)):
        raise ProjectNotFoundError(project_id)
    return project


def get_managed_project(project_id: str, user: User, repo: ProjectRepository) -> CityProject:
    _ensure_staff(user)
    return get_project(project_id, repo, user)


def create_project(
    dto: ProjectIn,
    user: User,
    repo: ProjectRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> CityProject:
    _ensure_staff(user)
    now = _now(now)
    data = dto.model_dump()
    for name in ("location", "budget"):
        data[name] = _clean(data[name])
    project = CityProject(id=str(uuid.uuid4()), created_at=now, updated_at=now, **data)
    project.check_schedule()
    saved = repo.add(project)
    record(audit, AuditAction.PROJECT_CREATED, AuditTarget.PROJECT, saved.id, saved.title)
    return saved


def update_project(
    project_id: str,
    dto: ProjectPatch,
    user: User,
    repo: ProjectRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> CityProject:
    _ensure_staff(user)
    now = _now(now)
    before = get_project(project_id, repo, user)
    changes = dto.model_dump(exclude_unset=True)
    for name in ("location", "budget"):
        if name in changes:
            changes[name] = _clean(changes[name])
    after = replace(before, **changes, updated_at=now)
    after.check_schedule()
    saved = repo.update(after)
    if saved.status is not before.status:
        # Le changement d'état devient une étape datée, visible sur la page du projet.
        repo.add_update(
            ProjectUpdate(
                id=str(uuid.uuid4()),
                project_id=saved.id,
                title=f"Nouvel état : {saved.status.value}",
                content=f"Le projet passe de « {before.status.value} » à « {saved.status.value} ».",
                published_at=now,
                author_name=user.name,
            )
        )
        saved = repo.get(saved.id) or saved
    diff = field_changes(before, saved, PROJECT_FIELDS)
    if diff:
        record(
            audit,
            AuditAction.PROJECT_UPDATED,
            AuditTarget.PROJECT,
            saved.id,
            saved.title,
            details=_jsonable(diff),
        )
    return saved


def publish_project_news(
    project_id: str,
    dto: ProjectNewsIn,
    user: User,
    repo: ProjectRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> CityProject:
    _ensure_staff(user)
    now = _now(now)
    project = get_project(project_id, repo, user)
    repo.add_update(
        ProjectUpdate(
            id=str(uuid.uuid4()),
            project_id=project.id,
            title=dto.title.strip(),
            content=dto.content.strip(),
            published_at=now,
            author_name=user.name,
        )
    )
    repo.update(replace(project, updated_at=now))
    record(
        audit,
        AuditAction.PROJECT_NEWS_PUBLISHED,
        AuditTarget.PROJECT,
        project.id,
        project.title,
        details={"title": dto.title.strip()},
    )
    return get_project(project_id, repo, user)


def _jsonable(diff: dict[str, dict[str, object]]) -> dict[str, dict[str, object]]:
    """Les dates du calendrier passent en texte ISO dans le journal.

    « status » est renommé : dans le journal, ce mot désigne la disponibilité d'un agent.
    """
    return {
        name: {
            key: value.isoformat() if hasattr(value, "isoformat") else value
            for key, value in change.items()
        }
        for name, change in diff.items()
        if name != "status"
    } | ({"project_status": diff["status"]} if "status" in diff else {})


# ─── consultations (F65, F66) ───────────────────────────────────────

CONSULTATION_FIELDS = (
    "title",
    "question",
    "description",
    "kind",
    "options",
    "rules",
    "opens_at",
    "closes_at",
    "project_id",
    "is_published",
)


def _options(raw: list[str]) -> list[str]:
    return [label for label in (option.strip() for option in raw) if label]


def consultation_out(
    consultation: Consultation,
    consultations: ConsultationRepository,
    projects: ProjectRepository,
    viewer: User | None = None,
    now: datetime | None = None,
) -> ConsultationOut:
    phase = consultation.phase(_now(now))
    results = None
    if is_staff(viewer) or phase in (ConsultationPhase.CLOSED, ConsultationPhase.DECIDED):
        counted = tally(consultation, consultations.list_responses(consultation.id))
        results = ResultsOut.model_validate(counted)
    project = projects.get(consultation.project_id) if consultation.project_id else None
    return ConsultationOut(
        id=consultation.id,
        title=consultation.title,
        question=consultation.question,
        description=consultation.description,
        kind=consultation.kind,
        options=consultation.options,
        rules=consultation.rules,
        opens_at=consultation.opens_at,
        closes_at=consultation.closes_at,
        phase=phase,
        is_published=consultation.is_published,
        project_id=consultation.project_id,
        project_title=project.title if project else None,
        results=results,
        decision=consultation.decision,
        decided_at=consultation.decided_at,
        decided_by=consultation.decided_by,
    )


def list_consultations(
    repo: ConsultationRepository, project_id: str | None = None
) -> list[Consultation]:
    return repo.list(project_id, published_only=True)


def list_consultations_for_management(
    user: User, repo: ConsultationRepository
) -> list[Consultation]:
    _ensure_staff(user)
    return repo.list(published_only=False)


def get_consultation(
    consultation_id: str, repo: ConsultationRepository, viewer: User | None = None
) -> Consultation:
    consultation = repo.get(consultation_id)
    if consultation is None or not (consultation.is_published or is_staff(viewer)):
        raise ConsultationNotFoundError(consultation_id)
    return consultation


def create_consultation(
    dto: ConsultationIn,
    user: User,
    repo: ConsultationRepository,
    projects: ProjectRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Consultation:
    _ensure_staff(user)
    now = _now(now)
    if dto.project_id and projects.get(dto.project_id) is None:
        raise ProjectNotFoundError(dto.project_id)
    consultation = Consultation(
        id=str(uuid.uuid4()),
        title=dto.title.strip(),
        question=dto.question.strip(),
        description=dto.description.strip(),
        kind=dto.kind,
        options=_options(dto.options),
        rules=_clean(dto.rules) or DEFAULT_RULES,
        opens_at=_aware(dto.opens_at),
        closes_at=_aware(dto.closes_at),
        project_id=dto.project_id,
        is_published=dto.is_published,
        created_at=now,
        updated_at=now,
    )
    consultation.check()
    saved = repo.add(consultation)
    record(
        audit,
        AuditAction.CONSULTATION_CREATED,
        AuditTarget.CONSULTATION,
        saved.id,
        saved.title,
        details={"kind": saved.kind.value},
    )
    return saved


def update_consultation(
    consultation_id: str,
    dto: ConsultationPatch,
    user: User,
    repo: ConsultationRepository,
    projects: ProjectRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Consultation:
    _ensure_staff(user)
    now = _now(now)
    before = get_consultation(consultation_id, repo, user)
    changes = dto.model_dump(exclude_unset=True)
    if "options" in changes:
        changes["options"] = _options(changes["options"] or [])
    if "rules" in changes:
        changes["rules"] = _clean(changes["rules"]) or DEFAULT_RULES
    for name in ("opens_at", "closes_at"):
        if changes.get(name) is not None:
            changes[name] = _aware(changes[name])
        elif name in changes:
            raise InvalidConsultationError(f"'{name}' cannot be empty")
    if changes.get("project_id") and projects.get(changes["project_id"]) is None:
        raise ProjectNotFoundError(changes["project_id"])
    if before.decision:
        raise InvalidConsultationError("A decided consultation can no longer be edited")
    after = replace(before, **changes, updated_at=now)
    locked = after.kind is not before.kind or after.options != before.options
    if locked and repo.count_responses(before.id):
        # Changer la question sous les réponses déjà données fausserait les résultats.
        raise ConsultationLockedConflictError()
    after.check()
    saved = repo.update(after)
    diff = field_changes(before, saved, CONSULTATION_FIELDS)
    if diff:
        record(
            audit,
            AuditAction.CONSULTATION_UPDATED,
            AuditTarget.CONSULTATION,
            saved.id,
            saved.title,
            details=_jsonable(diff),
        )
    return saved


def close_consultation(
    consultation_id: str,
    user: User,
    repo: ConsultationRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Consultation:
    _ensure_staff(user)
    consultation = get_consultation(consultation_id, repo, user)
    consultation.close(_now(now))
    saved = repo.update(consultation)
    record(
        audit,
        AuditAction.CONSULTATION_CLOSED,
        AuditTarget.CONSULTATION,
        saved.id,
        saved.title,
        details={"responses": repo.count_responses(saved.id)},
    )
    return saved


def publish_decision(
    consultation_id: str,
    dto: DecisionIn,
    user: User,
    repo: ConsultationRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Consultation:
    _ensure_staff(user)
    consultation = get_consultation(consultation_id, repo, user)
    consultation.decide(dto.decision.strip(), user.name, _now(now))
    saved = repo.update(consultation)
    record(
        audit,
        AuditAction.CONSULTATION_DECIDED,
        AuditTarget.CONSULTATION,
        saved.id,
        saved.title,
    )
    return saved


def list_contributions(
    consultation_id: str, user: User, repo: ConsultationRepository
) -> list[ContributionOut]:
    """Réponses sans identité, pour que la mairie lise les avis libres."""
    _ensure_staff(user)
    consultation = get_consultation(consultation_id, repo, user)
    return [
        ContributionOut(choice=item.choice, comment=item.comment, submitted_at=item.updated_at)
        for item in reversed(repo.list_responses(consultation.id))
    ]


def answer_consultation(
    consultation_id: str,
    dto: ConsultationAnswerIn,
    user: User,
    repo: ConsultationRepository,
    now: datetime | None = None,
) -> ConsultationResponse:
    _ensure_citizen(user)
    now = _now(now)
    consultation = get_consultation(consultation_id, repo)
    consultation.ensure_open(now)
    choice, comment = _clean(dto.choice), _clean(dto.comment)
    consultation.validate_answer(choice, comment)
    existing = repo.get_response(consultation.id, user.id)
    if existing is None:
        response_id = str(uuid.uuid4())
        response = ConsultationResponse(
            id=response_id,
            reference=_reference("CP", response_id, now),
            consultation_id=consultation.id,
            user_id=user.id,
            choice=choice,
            comment=comment,
            created_at=now,
            updated_at=now,
        )
    else:
        response = replace(existing, choice=choice, comment=comment, updated_at=now)
    return repo.save_response(response)


def my_consultation_response(
    consultation_id: str, user: User, repo: ConsultationRepository
) -> ConsultationResponse | None:
    get_consultation(consultation_id, repo)
    return repo.get_response(consultation_id, user.id)


# ─── boîte à idées (F68) ────────────────────────────────────────────


def submit_idea(dto: IdeaIn, user: User, repo: IdeaRepository, now: datetime | None = None) -> Idea:
    _ensure_citizen(user)
    now = _now(now)
    idea_id = str(uuid.uuid4())
    idea = Idea(
        id=idea_id,
        reference=_reference("ID", idea_id, now),
        user_id=user.id,
        title=dto.title.strip(),
        description=dto.description.strip(),
        theme=dto.theme,
        district=_clean(dto.district),
        created_at=now,
        updated_at=now,
        history=[IdeaStep(status=IdeaStatus.RECEIVED, at=now)],
    )
    return repo.add(idea)


def list_public_ideas(repo: IdeaRepository, status: IdeaStatus | None = None) -> list[Idea]:
    ideas = repo.list(status, IdeaVisibility.PUBLIC)
    return sorted(ideas, key=lambda idea: (-idea.support_count, -idea.created_at.timestamp()))


def list_ideas_for_management(
    user: User,
    repo: IdeaRepository,
    status: IdeaStatus | None = None,
    visibility: IdeaVisibility | None = None,
) -> list[Idea]:
    _ensure_staff(user)
    return list(reversed(repo.list(status, visibility)))  # les plus anciennes d'abord


def _load_idea(idea_id: str, repo: IdeaRepository) -> Idea:
    idea = repo.get(idea_id)
    if idea is None:
        raise IdeaNotFoundError(idea_id)
    return idea


def change_idea_status(
    idea_id: str,
    dto: IdeaStatusIn,
    user: User,
    repo: IdeaRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Idea:
    _ensure_staff(user)
    idea = _load_idea(idea_id, repo)
    was = idea.status
    idea.advance(dto.status, _clean(dto.response), user.name, _now(now))
    saved = repo.update(idea)
    record(
        audit,
        AuditAction.IDEA_STATUS_CHANGED,
        AuditTarget.IDEA,
        saved.id,
        saved.reference,
        details={"stage": {"from": was.value, "to": saved.status.value}},
    )
    return saved


def moderate_idea(
    idea_id: str,
    dto: IdeaModerationIn,
    user: User,
    repo: IdeaRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> Idea:
    _ensure_staff(user)
    idea = _load_idea(idea_id, repo)
    was = idea.visibility
    idea.moderate(dto.visibility, _clean(dto.note), _now(now))
    saved = repo.update(idea)
    record(
        audit,
        AuditAction.IDEA_MODERATED,
        AuditTarget.IDEA,
        saved.id,
        saved.reference,
        details={"visibility": {"from": was.value, "to": saved.visibility.value}},
    )
    return saved


def toggle_idea_support(idea_id: str, user: User, repo: IdeaRepository) -> tuple[bool, int]:
    _ensure_citizen(user)
    idea = _load_idea(idea_id, repo)
    if not idea.can_be_supported or idea.user_id == user.id:
        raise IdeaNotSupportableError()
    return repo.toggle_support(idea.id, user.id)


# ─── avis sur les services (F76) ────────────────────────────────────


def _service_name(service_id: str, services: MunicipalContentRepository) -> str:
    service = services.get_service(service_id)
    if service is None:
        raise ServiceNotFoundError(service_id)
    return service.name


def review_out(review: ServiceReview, services: MunicipalContentRepository) -> ReviewOut:
    service = services.get_service(review.service_id)
    return ReviewOut(
        **PublicReviewOut.model_validate(review).model_dump(),
        reference=review.reference,
        service_id=review.service_id,
        service_name=service.name if service else "Service supprimé",
        is_hidden=review.is_hidden,
    )


def service_ratings(repo: ServiceReviewRepository) -> list[ServiceRating]:
    return repo.ratings()


def service_reviews(
    service_id: str, repo: ServiceReviewRepository, services: MunicipalContentRepository
) -> ServiceReviewsOut:
    name = _service_name(service_id, services)
    reviews = repo.list(service_id)
    count = len(reviews)
    average = round(sum(review.rating for review in reviews) / count, 1) if count else None
    return ServiceReviewsOut(
        service_id=service_id,
        service_name=name,
        average=average,
        count=count,
        reviews=[PublicReviewOut.model_validate(review) for review in reviews],
    )


def review_service(
    service_id: str,
    dto: ReviewIn,
    user: User,
    repo: ServiceReviewRepository,
    services: MunicipalContentRepository,
    now: datetime | None = None,
) -> ServiceReview:
    _ensure_citizen(user)
    _service_name(service_id, services)
    now = _now(now)
    comment = dto.comment.strip()
    existing = repo.get_for(service_id, user.id)
    if existing is not None:
        existing.revise(dto.rating, comment, now)
        return repo.update(existing)
    review_id = str(uuid.uuid4())
    return repo.add(
        ServiceReview(
            id=review_id,
            reference=_reference("AV", review_id, now),
            service_id=service_id,
            user_id=user.id,
            rating=dto.rating,
            comment=comment,
            created_at=now,
            updated_at=now,
        )
    )


def my_service_review(
    service_id: str,
    user: User,
    repo: ServiceReviewRepository,
    services: MunicipalContentRepository,
) -> ServiceReview | None:
    _service_name(service_id, services)
    return repo.get_for(service_id, user.id)


def list_reviews_for_management(
    user: User, repo: ServiceReviewRepository, service_id: str | None = None
) -> list[ServiceReview]:
    _ensure_staff(user)
    return repo.list(service_id, include_hidden=True)


def _load_review(review_id: str, repo: ServiceReviewRepository) -> ServiceReview:
    review = repo.get(review_id)
    if review is None:
        raise ReviewNotFoundError(review_id)
    return review


def answer_review(
    review_id: str,
    dto: ReviewAnswerIn,
    user: User,
    repo: ServiceReviewRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> ServiceReview:
    _ensure_staff(user)
    review = _load_review(review_id, repo)
    review.answer(dto.response.strip(), user.name, _now(now))
    saved = repo.update(review)
    record(
        audit,
        AuditAction.SERVICE_REVIEW_ANSWERED,
        AuditTarget.SERVICE_REVIEW,
        saved.id,
        saved.reference,
    )
    return saved


def moderate_review(
    review_id: str,
    dto: ReviewModerationIn,
    user: User,
    repo: ServiceReviewRepository,
    now: datetime | None = None,
    audit: AuditTrail | None = None,
) -> ServiceReview:
    _ensure_staff(user)
    review = _load_review(review_id, repo)
    if review.is_hidden == dto.hidden:
        return review
    saved = repo.update(replace(review, is_hidden=dto.hidden, updated_at=_now(now)))
    record(
        audit,
        AuditAction.SERVICE_REVIEW_MODERATED,
        AuditTarget.SERVICE_REVIEW,
        saved.id,
        saved.reference,
        details={"is_hidden": {"from": not dto.hidden, "to": dto.hidden}},
    )
    return saved


# ─── ma participation ───────────────────────────────────────────────


def my_participation(
    user: User,
    ideas: IdeaRepository,
    consultations: ConsultationRepository,
    reviews: ServiceReviewRepository,
    services: MunicipalContentRepository,
    now: datetime | None = None,
) -> MyParticipationOut:
    now = _now(now)
    answers: list[MyConsultationResponseOut] = []
    for response in consultations.list_responses_for_user(user.id):
        consultation = consultations.get(response.consultation_id)
        if consultation is None:
            continue
        answers.append(
            MyConsultationResponseOut(
                id=response.id,
                reference=response.reference,
                consultation_id=consultation.id,
                choice=response.choice,
                comment=response.comment,
                created_at=response.created_at,
                updated_at=response.updated_at,
                consultation_title=consultation.title,
                kind=consultation.kind,
                phase=consultation.phase(now),
                closes_at=consultation.closes_at,
                decision=consultation.decision,
                decided_at=consultation.decided_at,
            )
        )
    return MyParticipationOut(
        ideas=[IdeaOut.model_validate(idea) for idea in ideas.list_for_user(user.id)],
        consultation_responses=answers,
        reviews=[review_out(review, services) for review in reviews.list_for_user(user.id)],
        supported_idea_ids=ideas.supported_by(user.id),
    )
