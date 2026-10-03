"""Point de connexion WebSocket authentifié pour la synchronisation."""

from fastapi import APIRouter, Depends, Query, WebSocket, status
from sqlalchemy.orm import Session

from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.user_repository import SqlAlchemyUserRepository
from src.infrastructure.realtime import InMemoryRealtimeBroker
from src.infrastructure.security.deps import get_token_service
from src.infrastructure.security.tokens import JwtAccessTokenService

router = APIRouter(tags=["realtime"])


def get_realtime_broker() -> InMemoryRealtimeBroker:
    """Singleton de l'instance ASGI courante."""

    return realtime_broker


realtime_broker = InMemoryRealtimeBroker()


@router.websocket("/realtime")
async def realtime_endpoint(
    websocket: WebSocket,
    token: str = Query(min_length=1),
    db: Session = Depends(get_db),
    tokens: JwtAccessTokenService = Depends(get_token_service),
    broker: InMemoryRealtimeBroker = Depends(get_realtime_broker),
) -> None:
    """Autorise uniquement une session active, puis diffuse des signaux sans données."""

    try:
        user = SqlAlchemyUserRepository(db).get_by_id(tokens.decode(token))
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    if user is None or not user.is_active:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    await broker.stream(websocket)
