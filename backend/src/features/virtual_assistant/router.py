"""Endpoint public du chatbot Terra Nova et câblage des dépendances d'infrastructure."""

import logging
import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.domain.user import Role, User
from src.domain.virtual_assistant import (
    AssistantMessage,
    AssistantNavigation,
    AssistantQuery,
    AssistantResponder,
    AssistantResponsePreference,
    AssistantServiceCatalog,
    AssistantTurn,
    AssistantTurnRole,
)
from src.features.virtual_assistant.schemas import (
    AssistantReplyOut,
    ChatIn,
    ChatOut,
    ConversationMessageOut,
)
from src.features.virtual_assistant.use_cases import answer_user
from src.infrastructure.config.settings import Settings, get_settings
from src.infrastructure.external.groq_assistant import GroqAssistantResponder
from src.infrastructure.persistence.assistant_conversation_repository import (
    SqlAlchemyAssistantConversationRepository,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.municipal_content_repository import (
    SqlAlchemyMunicipalContentRepository,
)
from src.infrastructure.security.deps import get_current_user, get_optional_current_user

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/assistant", tags=["assistant"])


def get_assistant_responder(settings: Settings = Depends(get_settings)) -> AssistantResponder:
    api_key = settings.resolved_groq_api_key
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="L'assistante est temporairement indisponible. Réessayez plus tard.",
        )
    return GroqAssistantResponder(api_key, settings.groq_model)


def get_assistant_service_catalog(db: Session = Depends(get_db)) -> AssistantServiceCatalog:
    return SqlAlchemyMunicipalContentRepository(db)


def get_conversations(db: Session = Depends(get_db)) -> SqlAlchemyAssistantConversationRepository:
    return SqlAlchemyAssistantConversationRepository(db)


def navigation_for(key: str | None, user: User | None) -> AssistantNavigation | None:
    role = user.role if user else None
    routes = {
        "services": AssistantNavigation("Voir les services municipaux", "/municipal/services"),
        "publications": AssistantNavigation("Voir les publications", "/municipal/publications"),
        "contact": AssistantNavigation("Contacter la mairie", "/municipal/contact"),
        "my_requests": AssistantNavigation("Voir mes demandes", "/home/my-requests"),
        "new_request": AssistantNavigation("Créer une demande", "/home/my-requests"),
        "account": AssistantNavigation("Mon espace", "/home/account"),
        "requests": AssistantNavigation("Demandes citoyennes", "/home/requests"),
        "journal": AssistantNavigation("Ouvrir le journal", "/home/journal"),
    }
    allowed = {"services", "publications", "contact"}
    if user:
        allowed |= {"account"}
    if role is Role.CITIZEN:
        allowed |= {"my_requests", "new_request"}
    if role in {Role.MANAGER, Role.ADMIN}:
        allowed |= {"requests"}
    if role in {Role.AGENT, Role.MANAGER, Role.ADMIN}:
        allowed |= {"journal"}
    return routes.get(key) if key in allowed else None


@router.post("/chat", response_model=ChatOut)
def chat(
    payload: ChatIn,
    responder: AssistantResponder = Depends(get_assistant_responder),
    service_catalog: AssistantServiceCatalog = Depends(get_assistant_service_catalog),
    user: User | None = Depends(get_optional_current_user),
    conversations: SqlAlchemyAssistantConversationRepository = Depends(get_conversations),
) -> ChatOut:
    if user:
        history = [
            AssistantTurn(role=item.role, content=item.content)
            for item in conversations.list_messages(user.id, limit=8)
        ]
    else:
        history = [
            AssistantTurn(role=AssistantTurnRole(turn.role), content=turn.content.strip())
            for turn in payload.history
        ]
    query = AssistantQuery(
        message=payload.message.strip(),
        history=tuple(history[-8:]),
        response_preference=AssistantResponsePreference(payload.response_preference),
    )

    try:
        reply = answer_user(query, responder, service_catalog)
        navigation = navigation_for(reply.navigation_key, user)
        if user:
            now = datetime.now(UTC)
            conversations.add(AssistantMessage(id=str(uuid.uuid4()), user_id=user.id, role=AssistantTurnRole.USER, content=query.message, created_at=now))
            conversations.add(AssistantMessage(id=str(uuid.uuid4()), user_id=user.id, role=AssistantTurnRole.ASSISTANT, content=reply.message, reply=reply, created_at=now))
        return ChatOut(response=AssistantReplyOut.from_domain(reply, navigation))
    except Exception as error:
        logger.warning("Terra Nova assistant request failed (%s)", type(error).__name__)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="L'assistante est temporairement indisponible. Réessayez dans un instant.",
        ) from error


@router.get("/history", response_model=list[ConversationMessageOut])
def history(user: User = Depends(get_current_user), conversations: SqlAlchemyAssistantConversationRepository = Depends(get_conversations)) -> list[ConversationMessageOut]:
    return [ConversationMessageOut(role=item.role.value, content=AssistantReplyOut.from_domain(item.reply, navigation_for(item.reply.navigation_key, user)) if item.reply else item.content) for item in conversations.list_messages(user.id)]


@router.delete("/history", status_code=status.HTTP_204_NO_CONTENT)
def clear_history(user: User = Depends(get_current_user), conversations: SqlAlchemyAssistantConversationRepository = Depends(get_conversations)) -> None:
    conversations.clear(user.id)
