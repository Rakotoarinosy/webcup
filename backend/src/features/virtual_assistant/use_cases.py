"""Cas d'usage de réponse aux questions des utilisateurs Terra Nova."""

import re
from dataclasses import replace

from src.domain.virtual_assistant import (
    AssistantQuery,
    AssistantReply,
    AssistantReplyFormat,
    AssistantResponder,
    AssistantResponsePreference,
    AssistantServiceCatalog,
    AssistantServiceRecommendation,
)


def answer_user(
    query: AssistantQuery,
    responder: AssistantResponder,
    service_catalog: AssistantServiceCatalog,
) -> AssistantReply:
    """Ancre la question dans les services actifs et valide chaque recommandation de l'IA."""
    services = sorted(
        service_catalog.list_services(),
        key=lambda service: (-service.is_featured, -service.usage_count, service.display_order),
    )[:20]
    contextual_query = replace(query, available_services=tuple(services))
    reply = responder.respond(contextual_query)

    if query.response_preference is not AssistantResponsePreference.AUTO:
        reply = replace(reply, format=AssistantReplyFormat(query.response_preference.value))

    services_by_id = {service.id: service for service in services}
    recommendations = tuple(
        AssistantServiceRecommendation(
            id=service.id,
            name=service.name,
            category=service.category,
            description=service.description,
            contact_details=service.contact_details,
            opening_hours=service.opening_hours,
            address=service.address,
        )
        for service_id in reply.service_ids
        if (service := services_by_id.get(service_id)) is not None
    )[:3]
    return replace(reply, recommended_services=recommendations, message=_safe_reply_text(reply.message), steps=tuple(_safe_reply_text(step) for step in reply.steps), notes=tuple(_safe_reply_text(note) for note in reply.notes), follow_up=_safe_reply_text(reply.follow_up))


def _safe_reply_text(text: str) -> str:
    """Une réponse IA ne doit jamais devenir une source de liens ou de routes non contrôlés."""
    text = re.sub(r"https?://\S+|(?<!\w)/(?:home|municipal|auth)\S*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\b(page|route|lien|onglet)\s+(manager|gestionnaire)\b", "espace approprié", text, flags=re.IGNORECASE)
    return re.sub(r"\s{2,}", " ", text).strip()
