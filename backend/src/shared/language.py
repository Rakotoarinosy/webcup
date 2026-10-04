"""Langue demandée par le client pour les contenus (paramètre `lang` ou Accept-Language)."""

from fastapi import Header, Query

from src.domain.i18n import Language, resolve_language


def get_content_language(
    lang: str | None = Query(
        default=None,
        max_length=16,
        description="Langue des contenus (fr, en, mg). Prioritaire sur Accept-Language.",
    ),
    accept_language: str | None = Header(default=None, max_length=256),
) -> Language:
    return resolve_language(lang, accept_language)
