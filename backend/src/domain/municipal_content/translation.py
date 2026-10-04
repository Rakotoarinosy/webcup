"""Choix de la version linguistique d'un contenu municipal (F27). Python pur."""

from dataclasses import replace

from src.domain.i18n import DEFAULT_LANGUAGE, Language
from src.domain.municipal_content.entities import (
    TRANSLATABLE_FIELDS,
    ContentTranslation,
    MunicipalPublication,
    MunicipalService,
    TranslatableContent,
)


def content_type_of(content: MunicipalService | MunicipalPublication) -> TranslatableContent:
    if isinstance(content, MunicipalService):
        return TranslatableContent.SERVICE
    return TranslatableContent.PUBLICATION


def localize[Content: (MunicipalService, MunicipalPublication)](
    content: Content, language: Language, translation: ContentTranslation | None
) -> Content:
    """Version dans `language`, champ par champ, avec repli sur le français.

    - français demandé : le contenu de référence ;
    - traduction existante : ses champs non vides remplacent le français ;
    - aucune traduction : le français, signalé par `translation_available=False`.
    """
    if language is DEFAULT_LANGUAGE:
        return replace(content, language=DEFAULT_LANGUAGE, translation_available=True)
    if translation is None or not any(v.strip() for v in translation.fields.values()):
        return replace(content, language=DEFAULT_LANGUAGE, translation_available=False)
    allowed = TRANSLATABLE_FIELDS[content_type_of(content)]
    values = {
        name: value
        for name, value in translation.fields.items()
        if name in allowed and value.strip()
    }
    return replace(content, **values, language=language, translation_available=True)


def clean_translation_fields(
    content_type: TranslatableContent, fields: dict[str, str | None]
) -> dict[str, str]:
    """Ne garde que les champs traduisibles renseignés (espaces retirés)."""
    allowed = TRANSLATABLE_FIELDS[content_type]
    return {
        name: value.strip()
        for name, value in fields.items()
        if name in allowed and value is not None and value.strip()
    }
