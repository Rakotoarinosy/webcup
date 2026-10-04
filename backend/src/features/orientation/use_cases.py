from dataclasses import replace

from src.domain.i18n import Language
from src.domain.municipal_content import MunicipalContentRepository
from src.domain.orientation import (
    OrientationChannel,
    OrientationNeed,
    OrientationSituation,
    Recommendation,
    RecommendedService,
    recommend,
)
from src.features.municipal_content.use_cases import localize_services


def orient(
    situation: OrientationSituation,
    needs: list[OrientationNeed],
    channel: OrientationChannel,
    repo: MunicipalContentRepository,
    language: Language,
) -> Recommendation:
    """Recommandation calculée sur le français (référence), puis traduite pour l'affichage."""
    result = recommend(situation, tuple(dict.fromkeys(needs)), channel, repo.list_services())
    localized = localize_services([item.service for item in result.services], language, repo)
    return replace(
        result,
        services=tuple(
            RecommendedService(service, item.needs)
            for service, item in zip(localized, result.services, strict=True)
        ),
    )
