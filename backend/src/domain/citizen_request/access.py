"""Qui peut voir et modifier une demande. Source unique des permissions, appelée par les use cases.

| Rôle    | Voir                 | Modifier / supprimer   | Gérer (attribuer, prioriser, rejeter) | Avancer le statut |
|---------|----------------------|------------------------|---------------------------------------|-------------------|
| CITIZEN | ses demandes         | les siennes, si Nouveau | non                                  | non               |
| AGENT   | ses interventions    | non                    | non                                   | ses interventions |
| MANAGER | son institut         | son institut           | son institut                          | son institut      |
| ADMIN   | toutes               | toutes                 | toutes                                | toutes            |
"""

from dataclasses import dataclass

from src.domain.agent.entities import Agent
from src.domain.agent.exceptions import AgentInactiveError
from src.domain.citizen_request.analytics import RequestScope
from src.domain.citizen_request.entities import CitizenRequest, RequestStatus
from src.domain.citizen_request.exceptions import AgentOutsideInstitutError
from src.domain.user.entities import Role
from src.domain.user.exceptions import ForbiddenError


@dataclass(frozen=True)
class Actor:
    """L'utilisateur qui agit, avec ses rattachements. Construit par le use case."""

    user_id: str
    role: Role
    agent_id: str | None = None  # profil agent (rôle AGENT)
    institut_id: str | None = None  # institut de l'agent, ou institut géré (MANAGER)


def _manages(actor: Actor, request: CitizenRequest) -> bool:
    if actor.role is Role.ADMIN:
        return True
    return (
        actor.role is Role.MANAGER
        and actor.institut_id is not None
        and request.institut_id == actor.institut_id
    )


def can_view(actor: Actor, request: CitizenRequest) -> bool:
    if _manages(actor, request):
        return True
    if actor.role is Role.AGENT:
        return actor.agent_id is not None and request.assigned_agent_id == actor.agent_id
    if actor.role is Role.CITIZEN:
        return request.citizen_id == actor.user_id
    return False


def can_manage(actor: Actor, request: CitizenRequest) -> bool:
    return _manages(actor, request)


def can_change_status(actor: Actor, request: CitizenRequest) -> bool:
    if _manages(actor, request):
        return True
    return (
        actor.role is Role.AGENT
        and actor.agent_id is not None
        and request.assigned_agent_id == actor.agent_id
    )


def can_edit(actor: Actor, request: CitizenRequest) -> bool:
    """Contenu (titre, description, lieu) et suppression : le gestionnaire, ou l'auteur tant que
    la demande n'est pas prise en charge."""
    if _manages(actor, request):
        return True
    return (
        actor.role is Role.CITIZEN
        and request.citizen_id == actor.user_id
        and request.status is RequestStatus.NEW
    )


def can_create_for(actor: Actor, citizen_id: str) -> bool:
    """Un citoyen crée pour lui-même ; manager et admin peuvent saisir pour un citoyen."""
    if actor.role is Role.CITIZEN:
        return citizen_id == actor.user_id
    return actor.role in (Role.MANAGER, Role.ADMIN)


def can_manage_institut(actor: Actor, institut_id: str | None) -> bool:
    """Agents et paramètres d'un institut : l'admin, ou le manager de cet institut."""
    if actor.role is Role.ADMIN:
        return True
    return (
        actor.role is Role.MANAGER and institut_id is not None and actor.institut_id == institut_id
    )


def scope_for(actor: Actor) -> RequestScope:
    """Périmètre des listes et statistiques. Un agent ou manager non rattaché ne voit rien."""
    match actor.role:
        case Role.ADMIN:
            return RequestScope()
        case Role.MANAGER:
            if actor.institut_id is None:
                return RequestScope(is_empty=True)
            return RequestScope(institut_id=actor.institut_id)
        case Role.AGENT:
            if actor.agent_id is None:
                return RequestScope(is_empty=True)
            return RequestScope(agent_id=actor.agent_id)
        case _:
            return RequestScope(citizen_id=actor.user_id)


def ensure_can_view(actor: Actor, request: CitizenRequest) -> None:
    if not can_view(actor, request):
        raise ForbiddenError()


def ensure_can_manage(actor: Actor, request: CitizenRequest) -> None:
    if not can_manage(actor, request):
        raise ForbiddenError()


def ensure_can_edit(actor: Actor, request: CitizenRequest) -> None:
    if not can_edit(actor, request):
        raise ForbiddenError()


def ensure_can_change_status(actor: Actor, request: CitizenRequest) -> None:
    if not can_change_status(actor, request):
        raise ForbiddenError()


def ensure_can_manage_institut(actor: Actor, institut_id: str | None) -> None:
    if not can_manage_institut(actor, institut_id):
        raise ForbiddenError()


def ensure_agent_assignable(request: CitizenRequest, agent: Agent) -> None:
    """L'agent doit être actif et appartenir à l'institut de la demande."""
    if not agent.is_active:
        raise AgentInactiveError(agent.id)
    if request.institut_id is not None and agent.institut_id != request.institut_id:
        raise AgentOutsideInstitutError(agent.id, request.institut_id)
