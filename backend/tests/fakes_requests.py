"""Repositories en mémoire des demandes et des instituts, pour tester les use cases sans base de données."""

from src.domain.citizen_request import (
    CitizenRequest,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    RequestScope,
)
from src.domain.citizen_request.entities import RequestCategory
from src.domain.institut import Institut, InstitutRepository


def in_scope(request: CitizenRequest, scope: RequestScope) -> bool:
    return not scope.is_empty and all(
        expected is None or actual == expected
        for actual, expected in (
            (request.citizen_id, scope.citizen_id),
            (request.assigned_agent_id, scope.agent_id),
            (request.institut_id, scope.institut_id),
        )
    )


class FakeCitizenRequestRepository(CitizenRequestRepository):
    def __init__(self) -> None:
        self.items: dict[str, CitizenRequest] = {}

    def get_by_id(self, request_id):
        return self.items.get(request_id)

    def list_status_history(self, request_id):
        return []

    def list_page(
        self, *, page, page_size, search, category, priority, status, scope, sort_by, sort_order
    ):
        items = [
            r
            for r in self.items.values()
            if in_scope(r, scope)
            and (category is None or r.category is category)
            and (priority is None or r.priority is priority)
            and (status is None or r.status is status)
            and (search is None or search.casefold() in r.title.casefold())
        ]
        start = (page - 1) * page_size
        return items[start : start + page_size], len(items)

    def list_by_agent(self, agent_id):
        return [r for r in self.items.values() if r.assigned_agent_id == agent_id]

    def add(self, request):
        self.items[request.id] = request
        return request

    def update(self, request):
        self.items[request.id] = request
        return request

    def delete(self, request_id):
        self.items.pop(request_id, None)

    def dashboard_aggregates(self, **_):
        raise NotImplementedError


class FakeEventRepository(CitizenRequestEventRepository):
    def __init__(self) -> None:
        self.items: list[CitizenRequestEvent] = []

    def add(self, event):
        self.items.append(event)
        return event

    def list_for_request(self, request_id):
        return [e for e in self.items if e.request_id == request_id]

    def types(self) -> list[str]:
        return [e.type.value for e in self.items]


class FakeInstitutRepository(InstitutRepository):
    def __init__(self) -> None:
        self.items: dict[str, Institut] = {}

    def get_by_id(self, institut_id):
        return self.items.get(institut_id)

    def get_by_name(self, name):
        return next((i for i in self.items.values() if i.name.casefold() == name.casefold()), None)

    def get_by_manager(self, manager_id):
        return next((i for i in self.items.values() if i.manager_id == manager_id), None)

    def find_for_category(self, category: RequestCategory):
        return next((i for i in self.items.values() if i.handles(category)), None)

    def list(self, *, active_only=False):
        return [i for i in self.items.values() if i.is_active or not active_only]

    def add(self, institut):
        self.items[institut.id] = institut
        return institut

    def update(self, institut):
        self.items[institut.id] = institut
        return institut

    # Les tableaux de pilotage sont testés avec le repository SQLAlchemy ; ces
    # stubs préservent les anciens tests de règles métier en mémoire.
    def get_dashboard(self, institut_id):
        return None

    def get_service(self, institut_id, service_id):
        return None

    def add_service(self, service, agent_ids):
        return service

    def set_service_responsible(self, institut_id, service_id, agent_id):
        return None

    def set_service_agents(self, institut_id, service_id, agent_ids):
        return None
