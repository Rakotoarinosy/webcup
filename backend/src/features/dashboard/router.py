"""Endpoints HTTP du dashboard : réservés aux AGENT, MANAGER et ADMIN."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.domain.demande.analytics import DashboardStats, DemandeAnalytics
from src.domain.demande.repository import DemandeRepository
from src.domain.user import Role, User
from src.features.dashboard.schemas import DashboardStatsOut
from src.features.dashboard.use_cases import DEFAULT_DAYS, get_dashboard_stats
from src.infrastructure.config.settings import Settings, get_settings
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.demande_analytics import SqlAlchemyDemandeAnalytics
from src.infrastructure.persistence.demande_repository import SqlAlchemyDemandeRepository
from src.infrastructure.security.deps import require_roles
from src.shared.timezone import resolve_timezone

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)


def get_analytics(db: Session = Depends(get_db)) -> DemandeAnalytics:
    return SqlAlchemyDemandeAnalytics(db)


def get_demande_repo(db: Session = Depends(get_db)) -> DemandeRepository:
    return SqlAlchemyDemandeRepository(db)


@router.get("/stats", response_model=DashboardStatsOut)
def dashboard_stats_endpoint(
    days: int = Query(default=DEFAULT_DAYS, ge=1, le=31),
    user: User = Depends(require_roles(Role.MANAGER, Role.AGENT, Role.ADMIN)),
    analytics: DemandeAnalytics = Depends(get_analytics),
    demandes: DemandeRepository = Depends(get_demande_repo),
    settings: Settings = Depends(get_settings),
) -> DashboardStats:
    return get_dashboard_stats(
        analytics, demandes, user, resolve_timezone(settings.app_timezone), days
    )
