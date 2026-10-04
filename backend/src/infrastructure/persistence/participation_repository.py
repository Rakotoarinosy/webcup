"""Implémentations SQLAlchemy des repositories de la participation. Mapping Model ↔ Entity privé ici."""

from datetime import datetime
from typing import Any

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from src.domain.participation import (
    CityProject,
    Consultation,
    ConsultationKind,
    ConsultationRepository,
    ConsultationResponse,
    Idea,
    IdeaRepository,
    IdeaStatus,
    IdeaStep,
    IdeaTheme,
    IdeaVisibility,
    ProjectRepository,
    ProjectStatus,
    ProjectUpdate,
    ServiceRating,
    ServiceReview,
    ServiceReviewRepository,
)
from src.infrastructure.persistence.citizen_request_repository import as_utc
from src.infrastructure.persistence.models import (
    CityProjectModel,
    CityProjectUpdateModel,
    ConsultationModel,
    ConsultationResponseModel,
    IdeaModel,
    IdeaSupportModel,
    ServiceReviewModel,
)


def _utc(value: datetime | None) -> datetime | None:
    return as_utc(value) if value else None


# ─── projets ────────────────────────────────────────────────────────


class SqlAlchemyProjectRepository(ProjectRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, project_id: str) -> CityProject | None:
        model = self.db.get(CityProjectModel, project_id)
        if model is None:
            return None
        updates = self.db.scalars(
            select(CityProjectUpdateModel)
            .where(CityProjectUpdateModel.project_id == project_id)
            .order_by(CityProjectUpdateModel.published_at.desc())
        )
        return _project(model, [_project_update(update) for update in updates])

    def list(
        self,
        status: ProjectStatus | None = None,
        district: str | None = None,
        published_only: bool = True,
    ) -> "list[CityProject]":
        statement = select(CityProjectModel).order_by(CityProjectModel.updated_at.desc())
        if status is not None:
            statement = statement.where(CityProjectModel.status == status.value)
        if district:
            statement = statement.where(CityProjectModel.district == district)
        if published_only:
            statement = statement.where(CityProjectModel.is_published.is_(True))
        return [_project(model, []) for model in self.db.scalars(statement)]

    def add(self, project: CityProject) -> CityProject:
        self.db.add(_project_model(project))
        self.db.commit()
        return self.get(project.id) or project

    def update(self, project: CityProject) -> CityProject:
        self.db.merge(_project_model(project))
        self.db.commit()
        return self.get(project.id) or project

    def add_update(self, update: ProjectUpdate) -> ProjectUpdate:
        model = CityProjectUpdateModel(
            id=update.id,
            project_id=update.project_id,
            title=update.title,
            content=update.content,
            author_name=update.author_name,
            published_at=update.published_at,
        )
        self.db.add(model)
        self.db.commit()
        return _project_update(model)


def _project(model: CityProjectModel, updates: "list[ProjectUpdate]") -> CityProject:
    return CityProject(
        id=model.id,
        title=model.title,
        summary=model.summary,
        description=model.description,
        district=model.district,
        location=model.location,
        budget=model.budget,
        status=ProjectStatus(model.status),
        progress=model.progress,
        planned_start=model.planned_start,
        planned_end=model.planned_end,
        is_published=model.is_published,
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
        updates=updates,
    )


def _project_model(project: CityProject) -> CityProjectModel:
    return CityProjectModel(
        id=project.id,
        title=project.title,
        summary=project.summary,
        description=project.description,
        district=project.district,
        location=project.location,
        budget=project.budget,
        status=project.status.value,
        progress=project.progress,
        planned_start=project.planned_start,
        planned_end=project.planned_end,
        is_published=project.is_published,
        created_at=project.created_at,
        updated_at=project.updated_at,
    )


def _project_update(model: CityProjectUpdateModel) -> ProjectUpdate:
    return ProjectUpdate(
        id=model.id,
        project_id=model.project_id,
        title=model.title,
        content=model.content,
        author_name=model.author_name,
        published_at=as_utc(model.published_at),
    )


# ─── consultations ──────────────────────────────────────────────────


class SqlAlchemyConsultationRepository(ConsultationRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, consultation_id: str) -> Consultation | None:
        model = self.db.get(ConsultationModel, consultation_id)
        return _consultation(model) if model else None

    def list(
        self, project_id: str | None = None, published_only: bool = True
    ) -> "list[Consultation]":
        statement = select(ConsultationModel).order_by(ConsultationModel.closes_at.desc())
        if project_id:
            statement = statement.where(ConsultationModel.project_id == project_id)
        if published_only:
            statement = statement.where(ConsultationModel.is_published.is_(True))
        return [_consultation(model) for model in self.db.scalars(statement)]

    def add(self, consultation: Consultation) -> Consultation:
        model = _consultation_model(consultation)
        self.db.add(model)
        self.db.commit()
        return _consultation(model)

    def update(self, consultation: Consultation) -> Consultation:
        model = self.db.merge(_consultation_model(consultation))
        self.db.commit()
        return _consultation(model)

    def get_response(self, consultation_id: str, user_id: str) -> ConsultationResponse | None:
        model = self.db.scalar(
            select(ConsultationResponseModel).where(
                ConsultationResponseModel.consultation_id == consultation_id,
                ConsultationResponseModel.user_id == user_id,
            )
        )
        return _response(model) if model else None

    def save_response(self, response: ConsultationResponse) -> ConsultationResponse:
        model = self.db.merge(
            ConsultationResponseModel(
                id=response.id,
                reference=response.reference,
                consultation_id=response.consultation_id,
                user_id=response.user_id,
                choice=response.choice,
                comment=response.comment,
                created_at=response.created_at,
                updated_at=response.updated_at,
            )
        )
        self.db.commit()
        return _response(model)

    def list_responses(self, consultation_id: str) -> "list[ConsultationResponse]":
        statement = (
            select(ConsultationResponseModel)
            .where(ConsultationResponseModel.consultation_id == consultation_id)
            .order_by(ConsultationResponseModel.created_at)
        )
        return [_response(model) for model in self.db.scalars(statement)]

    def count_responses(self, consultation_id: str) -> int:
        statement = select(func.count()).where(
            ConsultationResponseModel.consultation_id == consultation_id
        )
        return int(self.db.scalar(statement) or 0)

    def list_responses_for_user(self, user_id: str) -> "list[ConsultationResponse]":
        statement = (
            select(ConsultationResponseModel)
            .where(ConsultationResponseModel.user_id == user_id)
            .order_by(ConsultationResponseModel.updated_at.desc())
        )
        return [_response(model) for model in self.db.scalars(statement)]


def _consultation(model: ConsultationModel) -> Consultation:
    return Consultation(
        id=model.id,
        project_id=model.project_id,
        title=model.title,
        question=model.question,
        description=model.description,
        kind=ConsultationKind(model.kind),
        options=list(model.options or []),
        rules=model.rules,
        opens_at=as_utc(model.opens_at),
        closes_at=as_utc(model.closes_at),
        is_published=model.is_published,
        decision=model.decision,
        decided_by=model.decided_by,
        decided_at=_utc(model.decided_at),
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
    )


def _consultation_model(consultation: Consultation) -> ConsultationModel:
    return ConsultationModel(
        id=consultation.id,
        project_id=consultation.project_id,
        title=consultation.title,
        question=consultation.question,
        description=consultation.description,
        kind=consultation.kind.value,
        options=list(consultation.options),
        rules=consultation.rules,
        opens_at=consultation.opens_at,
        closes_at=consultation.closes_at,
        is_published=consultation.is_published,
        decision=consultation.decision,
        decided_by=consultation.decided_by,
        decided_at=consultation.decided_at,
        created_at=consultation.created_at,
        updated_at=consultation.updated_at,
    )


def _response(model: ConsultationResponseModel) -> ConsultationResponse:
    return ConsultationResponse(
        id=model.id,
        reference=model.reference,
        consultation_id=model.consultation_id,
        user_id=model.user_id,
        choice=model.choice,
        comment=model.comment,
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
    )


# ─── idées ──────────────────────────────────────────────────────────


class SqlAlchemyIdeaRepository(IdeaRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, idea_id: str) -> Idea | None:
        model = self.db.get(IdeaModel, idea_id)
        return _idea(model) if model else None

    def list(
        self,
        status: IdeaStatus | None = None,
        visibility: IdeaVisibility | None = None,
    ) -> "list[Idea]":
        statement = select(IdeaModel).order_by(IdeaModel.created_at.desc())
        if status is not None:
            statement = statement.where(IdeaModel.status == status.value)
        if visibility is not None:
            statement = statement.where(IdeaModel.visibility == visibility.value)
        return [_idea(model) for model in self.db.scalars(statement)]

    def list_for_user(self, user_id: str) -> "list[Idea]":
        statement = (
            select(IdeaModel)
            .where(IdeaModel.user_id == user_id)
            .order_by(IdeaModel.created_at.desc())
        )
        return [_idea(model) for model in self.db.scalars(statement)]

    def add(self, idea: Idea) -> Idea:
        model = _idea_model(idea)
        self.db.add(model)
        self.db.commit()
        return _idea(model)

    def update(self, idea: Idea) -> Idea:
        model = self.db.get(IdeaModel, idea.id)
        fresh = _idea_model(idea)
        if model is None:
            raise LookupError(idea.id)
        # Le nombre de soutiens appartient au repository (toggle_support) : jamais écrasé ici.
        for column in IdeaModel.__table__.columns.keys():  # noqa: SIM118
            if column not in {"id", "support_count"}:
                setattr(model, column, getattr(fresh, column))
        self.db.commit()
        return _idea(model)

    def toggle_support(self, idea_id: str, user_id: str) -> tuple[bool, int]:
        existing = self.db.scalar(
            select(IdeaSupportModel.id).where(
                IdeaSupportModel.idea_id == idea_id, IdeaSupportModel.user_id == user_id
            )
        )
        if existing:
            self.db.execute(delete(IdeaSupportModel).where(IdeaSupportModel.id == existing))
        else:
            self.db.add(IdeaSupportModel(idea_id=idea_id, user_id=user_id))
        self.db.flush()
        count = int(
            self.db.scalar(select(func.count()).where(IdeaSupportModel.idea_id == idea_id)) or 0
        )
        model = self.db.get(IdeaModel, idea_id)
        if model is not None:
            model.support_count = count
        self.db.commit()
        return not existing, count

    def supported_by(self, user_id: str) -> "list[str]":
        statement = select(IdeaSupportModel.idea_id).where(IdeaSupportModel.user_id == user_id)
        return list(self.db.scalars(statement))


def _idea(model: IdeaModel) -> Idea:
    return Idea(
        id=model.id,
        reference=model.reference,
        user_id=model.user_id,
        title=model.title,
        description=model.description,
        theme=IdeaTheme(model.theme),
        district=model.district,
        status=IdeaStatus(model.status),
        visibility=IdeaVisibility(model.visibility),
        moderation_note=model.moderation_note,
        support_count=model.support_count or 0,
        response=model.response,
        answered_by=model.answered_by,
        answered_at=_utc(model.answered_at),
        history=[_step(step) for step in model.history or []],
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
    )


def _step(raw: dict[str, Any]) -> IdeaStep:
    return IdeaStep(
        status=IdeaStatus(raw["status"]),
        at=as_utc(datetime.fromisoformat(raw["at"])),
        note=raw.get("note"),
        by=raw.get("by"),
    )


def _idea_model(idea: Idea) -> IdeaModel:
    return IdeaModel(
        id=idea.id,
        reference=idea.reference,
        user_id=idea.user_id,
        title=idea.title,
        description=idea.description,
        theme=idea.theme.value,
        district=idea.district,
        status=idea.status.value,
        visibility=idea.visibility.value,
        moderation_note=idea.moderation_note,
        support_count=idea.support_count,
        response=idea.response,
        answered_by=idea.answered_by,
        answered_at=idea.answered_at,
        history=[
            {
                "status": step.status.value,
                "at": step.at.isoformat(),
                "note": step.note,
                "by": step.by,
            }
            for step in idea.history
        ],
        created_at=idea.created_at,
        updated_at=idea.updated_at,
    )


# ─── avis sur les services ──────────────────────────────────────────


class SqlAlchemyServiceReviewRepository(ServiceReviewRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def get(self, review_id: str) -> ServiceReview | None:
        model = self.db.get(ServiceReviewModel, review_id)
        return _review(model) if model else None

    def get_for(self, service_id: str, user_id: str) -> ServiceReview | None:
        model = self.db.scalar(
            select(ServiceReviewModel).where(
                ServiceReviewModel.service_id == service_id,
                ServiceReviewModel.user_id == user_id,
            )
        )
        return _review(model) if model else None

    def list(
        self, service_id: str | None = None, include_hidden: bool = False
    ) -> "list[ServiceReview]":
        statement = select(ServiceReviewModel).order_by(ServiceReviewModel.created_at.desc())
        if service_id:
            statement = statement.where(ServiceReviewModel.service_id == service_id)
        if not include_hidden:
            statement = statement.where(ServiceReviewModel.is_hidden.is_(False))
        return [_review(model) for model in self.db.scalars(statement)]

    def list_for_user(self, user_id: str) -> "list[ServiceReview]":
        statement = (
            select(ServiceReviewModel)
            .where(ServiceReviewModel.user_id == user_id)
            .order_by(ServiceReviewModel.updated_at.desc())
        )
        return [_review(model) for model in self.db.scalars(statement)]

    def add(self, review: ServiceReview) -> ServiceReview:
        model = _review_model(review)
        self.db.add(model)
        self.db.commit()
        return _review(model)

    def update(self, review: ServiceReview) -> ServiceReview:
        model = self.db.merge(_review_model(review))
        self.db.commit()
        return _review(model)

    def ratings(self) -> "list[ServiceRating]":
        statement = (
            select(
                ServiceReviewModel.service_id,
                func.avg(ServiceReviewModel.rating),
                func.count(),
            )
            .where(ServiceReviewModel.is_hidden.is_(False))
            .group_by(ServiceReviewModel.service_id)
        )
        return [
            ServiceRating(service_id=service_id, average=round(float(average), 1), count=count)
            for service_id, average, count in self.db.execute(statement)
        ]


def _review(model: ServiceReviewModel) -> ServiceReview:
    return ServiceReview(
        id=model.id,
        reference=model.reference,
        service_id=model.service_id,
        user_id=model.user_id,
        rating=model.rating,
        comment=model.comment,
        response=model.response,
        answered_by=model.answered_by,
        answered_at=_utc(model.answered_at),
        is_hidden=model.is_hidden,
        created_at=as_utc(model.created_at),
        updated_at=as_utc(model.updated_at),
    )


def _review_model(review: ServiceReview) -> ServiceReviewModel:
    return ServiceReviewModel(
        id=review.id,
        reference=review.reference,
        service_id=review.service_id,
        user_id=review.user_id,
        rating=review.rating,
        comment=review.comment,
        response=review.response,
        answered_by=review.answered_by,
        answered_at=review.answered_at,
        is_hidden=review.is_hidden,
        created_at=review.created_at,
        updated_at=review.updated_at,
    )
