"""Endpoint public du chatbot Terra Nova et câblage des dépendances d'infrastructure."""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.domain.virtual_assistant import (
    AssistantQuery,
    AssistantResponder,
    AssistantResponsePreference,
    AssistantServiceCatalog,
    AssistantTurn,
    AssistantTurnRole,
    TextSimplifier,
)
from src.features.virtual_assistant.schemas import (
    AssistantReplyOut,
    ChatIn,
    ChatOut,
    PlainExplanationOut,
    SimplifyIn,
)
from src.features.virtual_assistant.use_cases import answer_user, explain_simply
from src.infrastructure.config.settings import Settings, get_settings
from src.infrastructure.external.gemini_assistant import (
    GeminiAssistantResponder,
    GeminiTextSimplifier,
)
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.municipal_content_repository import (
    SqlAlchemyMunicipalContentRepository,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/assistant", tags=["assistant"])


def get_assistant_responder(settings: Settings = Depends(get_settings)) -> AssistantResponder:
    if not settings.gemini_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="L'assistante est temporairement indisponible. Réessayez plus tard.",
        )
    return GeminiAssistantResponder(settings.gemini_api_key, settings.gemini_model)


def get_text_simplifier(settings: Settings = Depends(get_settings)) -> TextSimplifier:
    if not settings.gemini_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="L'explication simplifiée est temporairement indisponible.",
        )
    return GeminiTextSimplifier(settings.gemini_api_key, settings.gemini_model)


def get_assistant_service_catalog(db: Session = Depends(get_db)) -> AssistantServiceCatalog:
    return SqlAlchemyMunicipalContentRepository(db)


@router.post("/chat", response_model=ChatOut)
def chat(
    payload: ChatIn,
    responder: AssistantResponder = Depends(get_assistant_responder),
    service_catalog: AssistantServiceCatalog = Depends(get_assistant_service_catalog),
) -> ChatOut:
    query = AssistantQuery(
        message=payload.message.strip(),
        history=tuple(
            AssistantTurn(role=AssistantTurnRole(turn.role), content=turn.content.strip())
            for turn in payload.history
        ),
        response_preference=AssistantResponsePreference(payload.response_preference),
    )

    try:
        reply = answer_user(query, responder, service_catalog)
        return ChatOut(response=AssistantReplyOut.from_domain(reply))
    except Exception as error:
        logger.warning("Terra Nova assistant request failed (%s)", type(error).__name__)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="L'assistante est temporairement indisponible. Réessayez dans un instant.",
        ) from error


@router.post("/simplify", response_model=PlainExplanationOut)
def simplify(
    payload: SimplifyIn,
    simplifier: TextSimplifier = Depends(get_text_simplifier),
) -> PlainExplanationOut:
    """Explique un passage administratif en langage clair, à la demande de l'habitant (F90)."""
    try:
        return PlainExplanationOut.from_domain(explain_simply(payload.text, simplifier))
    except Exception as error:
        logger.warning("Terra Nova simplification failed (%s)", type(error).__name__)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="L'explication simplifiée est indisponible pour le moment. Réessayez dans un instant.",
        ) from error
