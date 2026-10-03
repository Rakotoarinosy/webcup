"""Construit l'Actor (rôle + rattachements) de l'utilisateur connecté. Appelé une fois par requête."""

from src.domain.agent import AgentQuery, AgentRepository
from src.domain.citizen_request import Actor
from src.domain.institut import InstitutRepository
from src.domain.user import Role, User


def resolve_actor(user: User, agents: AgentRepository, instituts: InstitutRepository) -> Actor:
    """Un agent désactivé ou sans profil, un manager sans institut : Actor non rattaché (ne voit rien)."""
    if user.role is Role.AGENT:
        profiles = agents.search(AgentQuery(user_id=user.id, is_active=True))
        agent = profiles[0] if profiles else None
        if agent is None:
            return Actor(user_id=user.id, role=user.role)
        return Actor(
            user_id=user.id, role=user.role, agent_id=agent.id, institut_id=agent.institut_id
        )

    if user.role is Role.MANAGER:
        institut = instituts.get_by_manager(user.id)
        institut_id = institut.id if institut is not None and institut.is_active else None
        return Actor(user_id=user.id, role=user.role, institut_id=institut_id)

    return Actor(user_id=user.id, role=user.role)
