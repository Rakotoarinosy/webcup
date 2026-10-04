from src.domain.errors import DomainError


class MunicipalServiceNotFoundError(DomainError):
    def __init__(self, service_id: str) -> None:
        super().__init__(f"Municipal service '{service_id}' not found")


class MunicipalPublicationNotFoundError(DomainError):
    def __init__(self, publication_id: str) -> None:
        super().__init__(f"Municipal publication '{publication_id}' not found")


class ReferenceLanguageTranslationError(DomainError):
    """Le français est la langue de référence : il se modifie sur le contenu lui-même."""

    def __init__(self) -> None:
        super().__init__("French is the reference language: edit the content itself")


class EmptyTranslationError(DomainError):
    def __init__(self) -> None:
        super().__init__("A translation needs at least one translated field")


class ContentTranslationNotFoundError(DomainError):
    def __init__(self, content_id: str, language: str) -> None:
        super().__init__(f"No '{language}' translation for content '{content_id}'")
