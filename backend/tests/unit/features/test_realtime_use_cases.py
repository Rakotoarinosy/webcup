from datetime import datetime

import pytest

from src.domain.realtime import RealtimeEvent, RealtimeEventPublisher
from src.features.realtime.use_cases import publish_data_changed


class FakeRealtimePublisher(RealtimeEventPublisher):
    def __init__(self) -> None:
        self.events: list[RealtimeEvent] = []

    async def publish(self, event: RealtimeEvent) -> None:
        self.events.append(event)


@pytest.mark.anyio
async def test_publish_data_changed_emits_a_generic_event_without_business_data() -> None:
    publisher = FakeRealtimePublisher()

    await publish_data_changed(publisher)

    assert len(publisher.events) == 1
    assert publisher.events[0].type == "data.changed"
    assert isinstance(publisher.events[0].occurred_at, datetime)
