"""Endpoints des alertes et messages officiels (D18, F29, F30, F31, F73).

GET    /alerts/current            alertes affichées maintenant (public, sans connexion)
GET    /alerts/history?days=      historique récent (public)
GET    /alerts                    toutes les alertes (admin, manager)
POST   /alerts                    publier (admin, manager) ; email facultatif en tâche de fond
POST   /alerts/recommendations    recommandations proposées par l'IA (admin, manager)
PUT    /alerts/{id}               modifier
POST   /alerts/{id}/end           terminer
DELETE /alerts/{id}               supprimer (admin)
"""

from datetime import UTC, datetime
from functools import lru_cache

from fastapi import APIRouter, BackgroundTasks, Depends, Query
from fastapi import status as http_status
from sqlalchemy.orm import Session

from src.domain.alert import (
    Alert,
    AlertMailer,
    AlertRecommender,
    AlertRepository,
    RecommendationUnavailableError,
)
from src.domain.user import User, UserRepository
from src.features.alert.schemas import (
    AlertAdminOut,
    AlertIn,
    AlertOut,
    CreateAlertIn,
    CreatedAlertOut,
    RecommendationIn,
    RecommendationOut,
)
from src.features.alert.use_cases import (
    HISTORY_DAYS,
    can_manage,
    create_alert,
    delete_alert,
    email_recipients,
    end_alert,
    list_alert_history,
    list_alerts_for_staff,
    list_current_alerts,
    send_alert_emails,
    suggest_recommendations,
    update_alert,
)
from src.features.audit.recording import AuditTrail
from src.features.audit.router import get_audit_trail
from src.infrastructure.config import get_settings
from src.infrastructure.external.alert_mailer import LoggingAlertMailer, SmtpAlertMailer
from src.infrastructure.external.gemini_analyzer import GeminiAlertRecommender
from src.infrastructure.persistence.alert_repository import SqlAlchemyAlertRepository
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/alerts", tags=["alerts"])


# ─── Câblage ────────────────────────────────────────────────────────


def get_alert_repo(db: Session = Depends(get_db)) -> AlertRepository:
    return SqlAlchemyAlertRepository(db)


def get_users_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlAlchemyUserRepository(db)


@lru_cache
def _gemini_recommender(api_key: str, model: str) -> AlertRecommender:
    return GeminiAlertRecommender(api_key, model)


def get_alert_recommender() -> AlertRecommender:
    settings = get_settings()
    if not settings.gemini_api_key:
        raise RecommendationUnavailableError(
            "AI recommendations are not configured (GEMINI_API_KEY is missing)"
        )
    return _gemini_recommender(settings.gemini_api_key, settings.gemini_model)


@lru_cache
def get_alert_mailer() -> AlertMailer:
    settings = get_settings()
    if settings.smtp_host:
        return SmtpAlertMailer(
            host=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_username,
            password=settings.smtp_password,
            sender=settings.smtp_from,
            use_ssl=settings.smtp_use_ssl,
            timeout=settings.smtp_timeout_seconds,
        )
    return LoggingAlertMailer()


# ─── Public ─────────────────────────────────────────────────────────


@router.get("/current", response_model=list[AlertOut])
def current_alerts_endpoint(repo: AlertRepository = Depends(get_alert_repo)) -> list[AlertOut]:
    now = datetime.now(UTC)
    return [_public_out(alert, now) for alert in list_current_alerts(repo, now)]


@router.get("/history", response_model=list[AlertOut])
def alert_history_endpoint(
    days: int = Query(default=HISTORY_DAYS, ge=1, le=365),
    repo: AlertRepository = Depends(get_alert_repo),
) -> list[AlertOut]:
    now = datetime.now(UTC)
    return [_public_out(alert, now) for alert in list_alert_history(repo, days, now)]


# ─── Gestion ────────────────────────────────────────────────────────


@router.get("", response_model=list[AlertAdminOut])
def list_alerts_endpoint(
    user: User = Depends(get_current_user),
    repo: AlertRepository = Depends(get_alert_repo),
) -> list[AlertAdminOut]:
    now = datetime.now(UTC)
    return [_admin_out(alert, user, now) for alert in list_alerts_for_staff(user, repo)]


@router.post("", response_model=CreatedAlertOut, status_code=http_status.HTTP_201_CREATED)
def create_alert_endpoint(
    payload: CreateAlertIn,
    background: BackgroundTasks,
    user: User = Depends(get_current_user),
    repo: AlertRepository = Depends(get_alert_repo),
    users: UserRepository = Depends(get_users_repo),
    mailer: AlertMailer = Depends(get_alert_mailer),
    audit: AuditTrail = Depends(get_audit_trail),
) -> CreatedAlertOut:
    alert = create_alert(
        user, AlertIn(**payload.model_dump(exclude={"notify_by_email"})), repo, audit=audit
    )
    recipients = email_recipients(users) if payload.notify_by_email else []
    if recipients:
        # Après la réponse : la publication ne dépend jamais de l'envoi des emails.
        background.add_task(send_alert_emails, alert, recipients, mailer)
    return CreatedAlertOut(
        **_admin_out(alert, user, datetime.now(UTC)).model_dump(),
        email_recipients=len(recipients),
    )


@router.post("/recommendations", response_model=RecommendationOut)
def recommendations_endpoint(
    payload: RecommendationIn,
    user: User = Depends(get_current_user),
    recommender: AlertRecommender = Depends(get_alert_recommender),
) -> RecommendationOut:
    return RecommendationOut(recommendations=suggest_recommendations(user, payload, recommender))


@router.put("/{alert_id}", response_model=AlertAdminOut)
def update_alert_endpoint(
    alert_id: str,
    payload: AlertIn,
    user: User = Depends(get_current_user),
    repo: AlertRepository = Depends(get_alert_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> AlertAdminOut:
    alert = update_alert(alert_id, payload, user, repo, audit=audit)
    return _admin_out(alert, user, datetime.now(UTC))


@router.post("/{alert_id}/end", response_model=AlertAdminOut)
def end_alert_endpoint(
    alert_id: str,
    user: User = Depends(get_current_user),
    repo: AlertRepository = Depends(get_alert_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> AlertAdminOut:
    return _admin_out(end_alert(alert_id, user, repo, audit=audit), user, datetime.now(UTC))


@router.delete("/{alert_id}", status_code=http_status.HTTP_204_NO_CONTENT)
def delete_alert_endpoint(
    alert_id: str,
    user: User = Depends(get_current_user),
    repo: AlertRepository = Depends(get_alert_repo),
    audit: AuditTrail = Depends(get_audit_trail),
) -> None:
    delete_alert(alert_id, user, repo, audit=audit)


def _public_out(alert: Alert, now: datetime) -> AlertOut:
    return AlertOut(
        id=alert.id,
        title=alert.title,
        message=alert.message,
        instructions=alert.instructions,
        level=alert.level,
        audience=alert.audience,
        zone=alert.zone,
        issuer=alert.issuer,
        starts_at=alert.starts_at,
        ends_at=alert.ends_at,
        ended_at=alert.ended_at,
        status=alert.status(now),
        created_at=alert.created_at,
        updated_at=alert.updated_at,
    )


def _admin_out(alert: Alert, user: User, now: datetime) -> AlertAdminOut:
    return AlertAdminOut(
        **_public_out(alert, now).model_dump(),
        author_id=alert.author_id,
        author_name=alert.author_name,
        can_manage=can_manage(user, alert),
    )
