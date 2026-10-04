"""Endpoint public du chatbot Terra Nova et câblage des dépendances d'infrastructure."""

import logging
import uuid
from datetime import UTC, datetime

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import Response
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
    SpeechIn,
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
GROQ_TRANSCRIPT_URL = "https://api.groq.com/openai/v1/audio/transcriptions"
GROQ_SPEECH_URL = "https://api.groq.com/openai/v1/audio/speech"


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
    allowed = available_navigation_keys(user)
    return routes.get(key) if key in allowed else None


def available_navigation_keys(user: User | None) -> set[str]:
    role = user.role if user else None
    allowed = {"services", "publications", "contact"}
    if user:
        allowed.add("account")
    if role is Role.CITIZEN:
        allowed |= {"my_requests", "new_request"}
    if role in {Role.MANAGER, Role.ADMIN}:
        allowed.add("requests")
    if role in {Role.AGENT, Role.MANAGER, Role.ADMIN}:
        allowed.add("journal")
    return allowed


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
        navigation_keys=tuple(sorted(available_navigation_keys(user))),
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


def _voice_key(settings: Settings) -> str:
    if not settings.groq_voice_api_key:
        raise HTTPException(status_code=503, detail="La fonction vocale est indisponible.")
    return settings.groq_voice_api_key


@router.post("/transcribe")
def transcribe(audio: UploadFile = File(...), settings: Settings = Depends(get_settings)) -> dict[str, str]:
    content = audio.file.read()
    if not content or len(content) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Audio invalide ou trop volumineux.")
    try:
        response = httpx.post(GROQ_TRANSCRIPT_URL, headers={"Authorization": f"Bearer {_voice_key(settings)}"}, files={"file": (audio.filename or "voice.webm", content, audio.content_type or "audio/webm")}, data={"model": settings.groq_stt_model, "response_format": "json"}, timeout=45)
        response.raise_for_status()
        text = str(response.json().get("text", "")).strip()
        if not text:
            raise ValueError("empty transcript")
        return {"text": text}
    except (httpx.HTTPError, ValueError, TypeError) as error:
        logger.warning("assistant transcription failed (%s)", type(error).__name__)
        raise HTTPException(status_code=502, detail="La transcription a échoué.") from error


@router.post("/speech")
def speech(payload: SpeechIn, settings: Settings = Depends(get_settings)) -> Response:
    try:
        response = httpx.post(GROQ_SPEECH_URL, headers={"Authorization": f"Bearer {_voice_key(settings)}"}, json={"model": settings.groq_tts_model, "voice": settings.groq_tts_voice, "input": payload.text, "response_format": "mp3"}, timeout=45)
        response.raise_for_status()
        return Response(content=response.content, media_type="audio/mpeg")
    except httpx.HTTPStatusError as error:
        logger.warning("assistant speech failed (%s)", type(error).__name__)
        if "model_terms_required" in error.response.text:
            raise HTTPException(status_code=409, detail="Les conditions du modèle vocal doivent être acceptées dans la console Groq.") from error
        raise HTTPException(status_code=502, detail="La synthèse vocale a échoué.") from error
    except httpx.HTTPError as error:
        logger.warning("assistant speech failed (%s)", type(error).__name__)
        raise HTTPException(status_code=502, detail="La synthèse vocale a échoué.") from error
