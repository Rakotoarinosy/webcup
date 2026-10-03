"""Tableau de bord, carte et analyse IA, dans le périmètre de l'Actor.

Le même tableau de bord sert à tous les rôles : un citoyen y voit ses demandes (« Mon espace »),
un agent ses interventions, un manager son institut, l'admin toute la plateforme.
"""

from dataclasses import replace
from datetime import UTC, datetime, tzinfo

from src.domain.agent import Agent, AgentQuery, AgentRepository
from src.domain.citizen_request import (
    Actor,
    CitizenRequestAnalytics,
    CitizenRequestRepository,
    DashboardStats,
    MapPoint,
    RequestAnalysis,
    RequestAnalyzer,
    RequestCategory,
    RequestScope,
    RequestStatus,
    ensure_can_manage,
    scope_for,
)
from src.features.citizen_request.use_cases.read import load_request

DEFAULT_DAYS = 7


def get_dashboard(
    actor: Actor,
    analytics: CitizenRequestAnalytics,
    tz: tzinfo,
    days: int = DEFAULT_DAYS,
    now: datetime | None = None,
) -> DashboardStats:
    return analytics.dashboard_stats(scope_for(actor), now or datetime.now(UTC), tz, days)


def get_public_dashboard(
    analytics: CitizenRequestAnalytics, tz: tzinfo, now: datetime | None = None
) -> DashboardStats:
    """Chiffres de toute la ville pour la page d'accueil publique. Le routeur n'en expose que
    des compteurs agrégés : aucune demande, aucune identité."""
    return analytics.dashboard_stats(RequestScope(), now or datetime.now(UTC), tz, 1)


def list_map_points(
    actor: Actor,
    analytics: CitizenRequestAnalytics,
    *,
    status: RequestStatus | None,
    category: RequestCategory | None,
    active_only: bool,
    limit: int,
) -> list[MapPoint]:
    return analytics.map_points(
        scope_for(actor), status=status, category=category, active_only=active_only, limit=limit
    )


def analyze_request(
    request_id: str,
    actor: Actor,
    repo: CitizenRequestRepository,
    agents: AgentRepository,
    analyzer: RequestAnalyzer,
) -> tuple[RequestAnalysis, Agent | None]:
    """Suggestion de l'IA (catégorie, priorité, résumé, agent). Rien n'est modifié en base."""
    request = load_request(request_id, repo)
    ensure_can_manage(actor, request)
    # Seuls les agents qui peuvent réellement être attribués sont proposés au modèle.
    candidates = agents.search(AgentQuery(is_active=True, institut_id=request.institut_id))

    analysis = analyzer.analyze(request, candidates)

    # Le modèle peut halluciner un identifiant : seul un agent actif réellement proposé est retenu.
    agent = next((a for a in candidates if a.id == analysis.recommended_agent_id), None)
    if agent is None and analysis.recommended_agent_id is not None:
        analysis = replace(analysis, recommended_agent_id=None)

    return analysis, agent
