"""« Par où commencer ? » (F72) : public, sans compte ni nouvelle inscription."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.domain.i18n import Language
from src.domain.municipal_content import MunicipalContentRepository
from src.domain.orientation import OrientationChannel, OrientationNeed, OrientationSituation
from src.features.municipal_content.schemas import MunicipalServiceOut
from src.features.orientation.schemas import (
    OrientationOut,
    RecommendedActionOut,
    RecommendedServiceOut,
)
from src.features.orientation.use_cases import orient
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.municipal_content_repository import (
    SqlAlchemyMunicipalContentRepository,
)
from src.shared.language import get_content_language

router = APIRouter(prefix="/orientation", tags=["orientation"])


def get_municipal_content_repo(db: Session = Depends(get_db)) -> MunicipalContentRepository:
    return SqlAlchemyMunicipalContentRepository(db)


# GET : simple lecture (aucune donnée enregistrée, pas de diffusion temps réel).
@router.get("", response_model=OrientationOut)
def orientation_endpoint(
    situation: OrientationSituation,
    needs: list[OrientationNeed] = Query(default=[], max_length=len(OrientationNeed)),
    channel: OrientationChannel = OrientationChannel.ONLINE,
    repo: MunicipalContentRepository = Depends(get_municipal_content_repo),
    language: Language = Depends(get_content_language),
) -> OrientationOut:
    result = orient(situation, needs, channel, repo, language)
    return OrientationOut(
        needs=list(result.needs),
        services=[
            RecommendedServiceOut(
                service=MunicipalServiceOut.model_validate(item.service), needs=list(item.needs)
            )
            for item in result.services
        ],
        actions=[
            RecommendedActionOut(
                action=item.action, category=item.category, service_id=item.service_id
            )
            for item in result.actions
        ],
    )
