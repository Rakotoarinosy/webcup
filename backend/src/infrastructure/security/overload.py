"""Base saturée ou injoignable : 503 lisible avec Retry-After, plutôt qu'une erreur 500."""

import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import OperationalError
from sqlalchemy.exc import TimeoutError as PoolTimeoutError

logger = logging.getLogger("security")


async def _database_busy(request: Request, exc: Exception) -> JSONResponse:
    logger.warning(
        "database unavailable", extra={"path": request.url.path, "error": type(exc).__name__}
    )
    return JSONResponse(
        status_code=503,
        content={
            "error": "ServiceOverloadedError",
            "detail": "Le service est momentanément surchargé. Réessayez dans quelques secondes.",
            "retry_after": 5,
        },
        headers={"Retry-After": "5", "Cache-Control": "no-store"},
    )


def register_overload_handlers(app: FastAPI) -> None:
    app.add_exception_handler(PoolTimeoutError, _database_busy)
    app.add_exception_handler(OperationalError, _database_busy)
