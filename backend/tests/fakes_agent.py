"""Faux repository agent en mémoire pour tester les use cases sans base de données."""

from src.domain.agent import Agent, AgentQuery, AgentRepository


class FakeAgentRepository(AgentRepository):
    def __init__(self) -> None:
        self.items: dict[str, Agent] = {}

    def get_by_id(self, agent_id: str) -> Agent | None:
        return self.items.get(agent_id)

    def search(self, query: AgentQuery) -> list[Agent]:
        return [
            a
            for a in self.items.values()
            if (query.status is None or a.status == query.status)
            and (query.is_active is None or a.is_active == query.is_active)
            and (query.institut_id is None or a.institut_id == query.institut_id)
            and (query.user_id is None or a.user_id == query.user_id)
        ]

    def add(self, agent: Agent) -> Agent:
        self.items[agent.id] = agent
        return agent

    def update(self, agent: Agent) -> Agent:
        self.items[agent.id] = agent
        return agent
