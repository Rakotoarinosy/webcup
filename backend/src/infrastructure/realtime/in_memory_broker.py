"""Broker WebSocket en mémoire pour une instance FastAPI."""

import asyncio
from collections.abc import Mapping
from contextlib import suppress
from dataclasses import dataclass
from threading import Lock

from fastapi import WebSocket, WebSocketDisconnect

from src.domain.realtime import RealtimeEvent, RealtimeEventPublisher


@dataclass(frozen=True, slots=True)
class _Subscriber:
    queue: asyncio.Queue[RealtimeEvent]
    loop: asyncio.AbstractEventLoop


class InMemoryRealtimeBroker(RealtimeEventPublisher):
    """Diffuse les signaux génériques aux connexions de cette instance.

    Une implémentation Redis peut remplacer cet adaptateur sans affecter les cas d'usage.
    """

    def __init__(self) -> None:
        self._subscribers: set[_Subscriber] = set()
        self._lock = Lock()

    async def publish(self, event: RealtimeEvent) -> None:
        self.publish_from_thread(event)

    def publish_from_thread(self, event: RealtimeEvent) -> None:
        """Peut être appelé par la synchronisation Terra Nova exécutée hors boucle ASGI."""

        with self._lock:
            subscribers = tuple(self._subscribers)
        for subscriber in subscribers:
            subscriber.loop.call_soon_threadsafe(self._enqueue, subscriber.queue, event)

    async def stream(self, websocket: WebSocket) -> None:
        await websocket.accept()
        subscriber: asyncio.Queue[RealtimeEvent] = asyncio.Queue(maxsize=1)
        registration = _Subscriber(subscriber, asyncio.get_running_loop())
        with self._lock:
            self._subscribers.add(registration)
        try:
            while True:
                try:
                    event = await asyncio.wait_for(subscriber.get(), timeout=25)
                    await websocket.send_json(self._serialize(event))
                except TimeoutError:
                    await websocket.send_json({"type": "realtime.ping"})
        except WebSocketDisconnect:
            pass
        finally:
            with self._lock:
                self._subscribers.discard(registration)

    @staticmethod
    def _enqueue(subscriber: asyncio.Queue[RealtimeEvent], event: RealtimeEvent) -> None:
        # Un client lent recevra le prochain signal ; aucun contenu métier n'est perdu.
        with suppress(asyncio.QueueFull):
            subscriber.put_nowait(event)

    @staticmethod
    def _serialize(event: RealtimeEvent) -> Mapping[str, str]:
        return {"type": event.type, "occurred_at": event.occurred_at.isoformat()}
