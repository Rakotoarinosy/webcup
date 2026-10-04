"""Cas d'usage temps réel, indépendants du transport WebSocket."""

from datetime import UTC, datetime

from src.domain.realtime import RealtimeEvent, RealtimeEventPublisher


async def publish_data_changed(publisher: RealtimeEventPublisher) -> None:
    """Diffuse un signal générique après une mutation API réussie.

    Le message ne contient ni identifiant ni contenu métier : chaque client recharge ensuite
    uniquement les ressources auxquelles son rôle donne accès.
    """

    await publisher.publish(RealtimeEvent(type="data.changed", occurred_at=datetime.now(UTC)))
