"""Logs structurés : JSON en production, format texte lisible en développement."""

import json
import logging
import re
import sys
from datetime import UTC, datetime
from typing import Any

# Attributs standards d'un LogRecord ; le reste vient de `extra={...}` et va dans le JSON.
_RESERVED_ATTRS = set(vars(logging.makeLogRecord({}))) | {"message", "asctime", "taskName"}
_QUERY_TOKEN = re.compile(r"([?&]token=)[^&\s\"']+", re.IGNORECASE)


class SensitiveQueryParameterFilter(logging.Filter):
    """Masque les jetons de session que le serveur WebSocket place dans les URL de log."""

    def filter(self, record: logging.LogRecord) -> bool:
        message = record.getMessage()
        redacted = _QUERY_TOKEN.sub(r"\1[MASQUÉ]", message)
        if redacted != message:
            record.msg = redacted
            record.args = ()
        return True


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "timestamp": datetime.fromtimestamp(record.created, UTC).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        payload.update({k: v for k, v in vars(record).items() if k not in _RESERVED_ATTRS})

        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)

        return json.dumps(payload, default=str, ensure_ascii=False)


_TEXT_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"


def configure_logging(level: str, *, json_output: bool) -> None:
    """Configure le logger racine ; les logs d'uvicorn y sont redirigés pour un format unique."""
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter() if json_output else logging.Formatter(_TEXT_FORMAT))
    handler.addFilter(SensitiveQueryParameterFilter())

    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(level)

    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        uvicorn_logger = logging.getLogger(name)
        uvicorn_logger.handlers = []
        uvicorn_logger.propagate = True

    # Bibliothèques trop bavardes au niveau INFO.
    logging.getLogger("httpx").setLevel(logging.WARNING)
