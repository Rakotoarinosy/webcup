"""Use cases du dashboard. Ne dépendent que du domaine."""

from dataclasses import replace
from datetime import UTC, datetime, tzinfo

from src.domain.demande.analytics import DashboardStats, DemandeAnalytics
from src.domain.demande.repository import DemandeRepository
from src.domain.user import Role, User

DEFAULT_DAYS = 7


def get_dashboard_stats(
    analytics: DemandeAnalytics,
    demandes: DemandeRepository,
    user: User,
    tz: tzinfo,
    days: int = DEFAULT_DAYS,
) -> DashboardStats:
    stats = analytics.dashboard_stats(datetime.now(UTC), tz, days)
    if user.role is Role.AGENT:
        pending_count = (
            demandes.pending_count_for_agent(user.agent_id) if user.agent_id is not None else 0
        )
    else:
        pending_count = demandes.pending_count()

    return replace(stats, pending_count=pending_count)
