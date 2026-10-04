from pydantic import BaseModel

from src.domain.citizen_request import RequestCategory
from src.domain.orientation import OrientationAction, OrientationNeed
from src.features.municipal_content.schemas import MunicipalServiceOut


class RecommendedServiceOut(BaseModel):
    service: MunicipalServiceOut
    needs: list[OrientationNeed]


class RecommendedActionOut(BaseModel):
    action: OrientationAction
    category: RequestCategory | None = None
    service_id: str | None = None


class OrientationOut(BaseModel):
    needs: list[OrientationNeed]
    services: list[RecommendedServiceOut]
    actions: list[RecommendedActionOut]
