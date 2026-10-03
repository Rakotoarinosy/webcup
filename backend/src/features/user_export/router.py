"""Endpoint de téléchargement des données du compte connecté."""

from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from starlette.responses import Response

from src.domain.user import User
from src.domain.user_export import ExportFormat, UserExportRepository
from src.features.user_export.use_cases import export_personal_data
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.user_export_repository import SqlAlchemyUserExportRepository
from src.infrastructure.security.deps import get_current_user

router = APIRouter(prefix="/exports", tags=["exports"])


def get_user_export_repo(db: Session = Depends(get_db)) -> UserExportRepository:
    return SqlAlchemyUserExportRepository(db)


@router.get("/me")
def export_my_data_endpoint(
    export_format: Annotated[ExportFormat, Query(alias="format")],
    user: User = Depends(get_current_user),
    repo: UserExportRepository = Depends(get_user_export_repo),
) -> Response:
    document = export_personal_data(user.id, export_format, repo)
    return Response(
        content=document.content,
        media_type=document.media_type,
        headers={
            "Content-Disposition": f'attachment; filename="{document.filename}"',
            "Cache-Control": "no-store",
        },
    )
