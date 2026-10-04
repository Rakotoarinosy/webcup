"""Point d'entrée FastAPI : configuration, CORS, handlers d'erreurs et montage des routers."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scalar_fastapi import get_scalar_api_reference
from starlette.responses import HTMLResponse

from src.bootstrap import ensure_bootstrap_admin, start_appointment_reminders, start_terra_sync
from src.features.agent.router import router as agent_router
from src.features.appointment.router import router as appointment_router
from src.features.audit.router import router as audit_router
from src.features.auth.router import router as auth_router
from src.features.citizen_request.router import dashboard_router, request_router
from src.features.data_concern.router import router as data_concern_router
from src.features.institut.router import router as institut_router
from src.features.municipal_content.router import router as municipal_content_router
from src.features.notification.router import router as notification_router
from src.features.preferences.router import router as preferences_router
from src.features.realtime.router import get_realtime_broker
from src.features.realtime.router import router as realtime_router
from src.features.realtime.use_cases import publish_data_changed
from src.features.search.router import router as search_router
from src.features.terra_request.router import router as terra_request_router
from src.features.user.router import router as user_router
from src.features.user_export.router import router as user_export_router
from src.infrastructure.config import configure_logging, get_settings
from src.shared.errors import register_exception_handlers

API_PREFIX = "/api/v1"

FEATURE_ROUTERS: list[APIRouter] = [
    auth_router,
    user_router,
    institut_router,
    agent_router,
    request_router,
    dashboard_router,
    notification_router,
    search_router,
    preferences_router,
    user_export_router,
    municipal_content_router,
    data_concern_router,
    audit_router,
    terra_request_router,
    appointment_router,
    realtime_router,
]


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    ensure_bootstrap_admin()
    terra_sync_stop = start_terra_sync()
    reminders_stop = start_appointment_reminders()
    yield
    for stop in (terra_sync_stop, reminders_stop):
        if stop is not None:
            stop.set()


def create_app() -> FastAPI:
    settings = get_settings()
    configure_logging(settings.log_level, json_output=settings.is_production)

    # Documentation interactive masquée en production.
    show_docs = not settings.is_production
    app = FastAPI(
        title="WebCup API — Bugs Killer",
        version="1.0.0",
        lifespan=lifespan,
        docs_url=None,
        redoc_url="/redoc" if show_docs else None,
        openapi_url="/openapi.json" if show_docs else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,  # jamais "*" : les cookies (credentials) sont activés
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
    )
    register_exception_handlers(app)

    @app.middleware("http")
    async def broadcast_successful_mutations(request, call_next):  # type: ignore[no-untyped-def]
        response = await call_next(request)
        is_api_mutation = request.method in {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
        } and request.url.path.startswith(API_PREFIX)
        is_auth_route = request.url.path.startswith(f"{API_PREFIX}/auth/")
        if is_api_mutation and not is_auth_route and 200 <= response.status_code < 300:
            await publish_data_changed(get_realtime_broker())
        return response

    api = APIRouter(prefix=API_PREFIX)

    @api.get("/health", tags=["health"])
    def health() -> dict[str, str]:
        return {"status": "ok"}

    for feature_router in FEATURE_ROUTERS:
        api.include_router(feature_router)

    app.include_router(api)

    if show_docs:

        @app.get("/docs", include_in_schema=False)
        def scalar() -> HTMLResponse:
            return get_scalar_api_reference(openapi_url="/openapi.json", title=app.title)

    return app


app = create_app()
