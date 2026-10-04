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
    GlossaryTerm,
    PlainExplanation,
    TextSimplifier,
)

MAX_KEY_POINTS = 5
MAX_TERMS = 6


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
    return replace(reply, recommended_services=recommendations)


def explain_simply(passage: str, simplifier: TextSimplifier) -> PlainExplanation:
    """Explique un passage en langage simple ; le texte officiel reste la référence.

    Le glossaire ne garde que les mots présents dans le passage : l'IA ne doit pas en ajouter.
    """
    normalized = re.sub(r"\s+", " ", passage).strip()
    explanation = simplifier.simplify(normalized)
    if not explanation.summary.strip():
        raise ValueError("explication vide")
    haystack = normalized.casefold()

    seen: set[str] = set()
    terms: list[GlossaryTerm] = []
    for term in explanation.terms:
        word, definition = term.term.strip(), term.definition.strip()
        key = word.casefold()
        if word and definition and key in haystack and key not in seen:
            seen.add(key)
            terms.append(GlossaryTerm(term=word, definition=definition))

    return PlainExplanation(
        summary=explanation.summary.strip(),
        key_points=tuple(point.strip() for point in explanation.key_points if point.strip())[
            :MAX_KEY_POINTS
        ],
        terms=tuple(terms[:MAX_TERMS]),
    )
