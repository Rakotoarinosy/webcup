"""Chargement d'un agent par identifiant (sans contrôle d'accès : voir profile.get_agent_for)."""

from src.domain.agent import Agent, AgentNotFoundError, AgentRepository


def get_agent(agent_id: str, repo: AgentRepository) -> Agent:
    agent = repo.get_by_id(agent_id)
    if agent is None:
        raise AgentNotFoundError(agent_id)

    return agent
