"""Port de diffusion d'événements temps réel."""

from abc import ABC, abstractmethod

from src.domain.realtime.entities import RealtimeEvent


class RealtimeEventPublisher(ABC):
    @abstractmethod
    async def publish(self, event: RealtimeEvent) -> None: ...
