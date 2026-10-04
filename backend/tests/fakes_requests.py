"""Repositories en mémoire des demandes et des instituts, pour tester les use cases sans base de données."""

from src.domain.citizen_request import (
    CitizenRequest,
    CitizenRequestEvent,
    CitizenRequestEventRepository,
    CitizenRequestRepository,
    PublicRequestSort,
    RequestMessage,
    RequestMessageRepository,
    RequestScope,
)
from src.domain.citizen_request.entities import RequestCategory
from src.domain.citizen_request.support import RequestSupport, SupportRepository
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
        self,
        *,
        page,
        page_size,
        search,
        category,
        priority,
        status,
        scope,
        sort_by,
        sort_order,
        only_ids=None,
        conversation_state=None,
    ):
        items = [
            r
            for r in self.items.values()
            if in_scope(r, scope)
            and (only_ids is None or r.id in only_ids)
            and (conversation_state is None or r.conversation_state is conversation_state)
            and (category is None or r.category is category)
            and (priority is None or r.priority is priority)
            and (status is None or r.status is status)
            and (search is None or search.casefold() in r.title.casefold())
        ]
        start = (page - 1) * page_size
        return items[start : start + page_size], len(items)

    def list_candidates(self, *, scope, since, category=None, limit=1000):
        return [
            r
            for r in self.items.values()
            if in_scope(r, scope)
            and r.is_open
            and not r.is_duplicate
            and r.created_at >= since
            and (category is None or r.category is category)
        ][:limit]

    def get_many(self, request_ids):
        return [self.items[i] for i in request_ids if i in self.items]

    def list_public(self, *, page, page_size, search, category, sort):
        items = [
            r
            for r in self.items.values()
            if r.is_open
            and not r.is_duplicate
            and (category is None or r.category is category)
            and (search is None or search.casefold() in r.title.casefold())
        ]
        if sort is PublicRequestSort.MOST_SUPPORTED:
            items.sort(key=lambda r: -r.support_count)
        start = (page - 1) * page_size
        return items[start : start + page_size], len(items)

    def list_duplicates_of(self, request_id):
        return [r for r in self.items.values() if r.duplicate_of_id == request_id]

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


class FakeSupportRepository(SupportRepository):
    def __init__(self) -> None:
        self.items: dict[tuple[str, str], RequestSupport] = {}

    def add(self, support):
        self.items[(support.request_id, support.citizen_id)] = support

    def remove(self, request_id, citizen_id):
        return self.items.pop((request_id, citizen_id), None) is not None

    def get(self, request_id, citizen_id):
        return self.items.get((request_id, citizen_id))

    def count_for(self, request_id):
        return sum(1 for r, _ in self.items if r == request_id)

    def supporter_ids(self, request_id):
        return [c for r, c in self.items if r == request_id]

    def supported_by(self, citizen_id, request_ids):
        return {r for r, c in self.items if c == citizen_id and r in request_ids}

    def list_for_citizen(self, citizen_id):
        mine = [s for s in self.items.values() if s.citizen_id == citizen_id]
        return sorted(mine, key=lambda s: s.created_at, reverse=True)


class FakeMessageRepository(RequestMessageRepository):
    def __init__(self) -> None:
        self.items: list[RequestMessage] = []

    def add(self, message):
        self.items.append(message)
        return message

    def list_for_request(self, request_id, *, include_internal):
        return [
            m
            for m in self.items
            if m.request_id == request_id and (include_internal or m.visibility.value == "public")
        ]
