"""Contrats métier pour les signaux de synchronisation temps réel."""

from src.domain.realtime.entities import RealtimeEvent
from src.domain.realtime.repository import RealtimeEventPublisher

__all__ = ["RealtimeEvent", "RealtimeEventPublisher"]
