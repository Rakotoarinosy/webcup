"""Faux flux Terra Nova et faux repository en mémoire pour tester les use cases sans réseau ni base."""

import copy
from datetime import datetime
from typing import Any

from src.domain.terra_request import (
    FeedSnapshot,
    PipelineStatus,
    TerraFeed,
    TerraFeedUnavailableError,
    TerraRequest,
    TerraRequestRepository,
    TerraSession,
)


def make_request(code: str, **overrides: Any) -> TerraRequest:
    data: dict[str, Any] = {
        "request_code": code,
        "api_id": 1,
        "requester_name": "Haut Conseil",
        "requester_type": "Institution",
        "message_public": f"Besoin {code}",
        "difficulty": "Moyenne",
        "difficulty_level": 2,
        "xp_base": 500,
        "xp_time_bonus": 0,
        "xp_total": 500,
        "xp_available": 500,
        "is_initial": True,
        "visible_since_wave": 0,
        "arrival_type": "debut",
        "wave_number": None,
        "arrival_time": "",
        "is_ai_related": False,
        "is_ai_request": False,
        "group_name": "Socle",
        "sort_order": 1,
        **overrides,
    }
    # raw = ce que l'API renvoie : pas les champs locaux (statut, dates de suivi).
    local = {"raw", "status", "first_seen_at", "updated_at"}
    data["raw"] = {k: v for k, v in data.items() if k not in local}
    return TerraRequest(**data)


def make_session(**overrides: Any) -> TerraSession:
    data: dict[str, Any] = {
        "status": "active",
        "is_running": True,
        "current_wave": 0,
        "elapsed_minutes": 60,
        "visible_requests_count": 1,
        "initial_requests_count": 1,
        "wave_requests_count": 0,
        "next_wave_number": 1,
        "minutes_until_next_wave": 60,
        **overrides,
    }
    return TerraSession(**data)


class FakeTerraFeed(TerraFeed):
    def __init__(self) -> None:
        self.session = make_session()
        self.requests: list[TerraRequest] = []
        self.fail: str | None = None
        self.calls = 0

    def fetch(self) -> FeedSnapshot:
        self.calls += 1
        if self.fail:
            raise TerraFeedUnavailableError(self.fail)
        # Copies : chaque appel renvoie des objets neufs, comme une vraie réponse HTTP.
        return FeedSnapshot(copy.deepcopy(self.session), copy.deepcopy(self.requests))


class FakeTerraRequestRepository(TerraRequestRepository):
    def __init__(self) -> None:
        self.items: dict[str, TerraRequest] = {}
        self.session = TerraSession()
        self.reads: dict[str, set[str]] = {}

    def list_all(self) -> list[TerraRequest]:
        return [copy.deepcopy(r) for r in self.items.values()]

    def get_by_code(self, request_code: str) -> TerraRequest | None:
        item = self.items.get(request_code)
        return copy.deepcopy(item) if item else None

    def save_sync(
        self, added: list[TerraRequest], updated: list[TerraRequest], session: TerraSession
    ) -> None:
        for request in [*added, *updated]:
            self.items[request.request_code] = copy.deepcopy(request)
        self.session = copy.deepcopy(session)

    def set_status(self, request_code: str, status: PipelineStatus, now: datetime) -> None:
        self.items[request_code].status = status
        self.items[request_code].updated_at = now

    def get_session(self) -> TerraSession:
        return copy.deepcopy(self.session)

    def save_session(self, session: TerraSession) -> None:
        self.session = copy.deepcopy(session)

    def read_keys(self, user_id: str) -> set[str]:
        return set(self.reads.get(user_id, set()))

    def mark_read(self, user_id: str, keys: list[str], now: datetime) -> None:
        self.reads.setdefault(user_id, set()).update(keys)
