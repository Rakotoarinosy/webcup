"""Génère frontend/src/app/shared/api-enums.ts à partir des Enum du backend.

Le backend reste la source de vérité : une valeur ajoutée, renommée ou supprimée ici
change le fichier généré, et tests/unit/test_frontend_enums.py échoue tant que le
frontend n'a pas été régénéré :

    uv run python scripts/generate_frontend_enums.py
"""

import re
import sys
from enum import StrEnum
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND))

from src.domain.agent import AgentStatus  # noqa: E402
from src.domain.appointment import AppointmentModality, AppointmentStatus, ReminderDelay  # noqa: E402
from src.domain.audit import AuditAction, AuditTarget  # noqa: E402
from src.domain.citizen_request import (  # noqa: E402
    RequestCategory,
    RequestEventType,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    SortOrder,
)
from src.domain.data_concern import ConcernStatus, ConcernTopic  # noqa: E402
from src.domain.notification import NotificationKind  # noqa: E402
from src.domain.preferences import FontFamily, FontSize, Theme  # noqa: E402
from src.domain.search.entities import SearchKind  # noqa: E402
from src.domain.terra_request import PipelineStatus, TerraNotificationKind  # noqa: E402
from src.domain.user import Role  # noqa: E402
from src.domain.user_export import ExportFormat  # noqa: E402

TARGET = BACKEND.parent / "frontend" / "src" / "app" / "shared" / "api-enums.ts"

# Ordre du fichier généré : regroupé par domaine.
ENUMS: tuple[type[StrEnum], ...] = (
    Role,
    RequestCategory,
    RequestPriority,
    RequestStatus,
    RequestEventType,
    RequestSortBy,
    SortOrder,
    AgentStatus,
    NotificationKind,
    ConcernTopic,
    ConcernStatus,
    AuditAction,
    AuditTarget,
    Theme,
    FontSize,
    FontFamily,
    ExportFormat,
    SearchKind,
    PipelineStatus,
    TerraNotificationKind,
    AppointmentModality,
    AppointmentStatus,
    ReminderDelay,
)

HEADER = """\
// FICHIER GÉNÉRÉ — ne pas modifier à la main.
// Source : les Enum du backend (backend/src/domain). Pour le régénérer :
//   cd backend && uv run python scripts/generate_frontend_enums.py
// tests/unit/test_frontend_enums.py échoue si ce fichier n'est plus à jour.
"""


def constant_name(enum: type[StrEnum]) -> str:
    """RequestStatus → REQUEST_STATUS_VALUES."""
    return re.sub(r"(?<!^)(?=[A-Z])", "_", enum.__name__).upper() + "_VALUES"


def render() -> str:
    blocks = [HEADER]
    for enum in ENUMS:
        values = ", ".join(_ts_string(member.value) for member in enum)
        constant = constant_name(enum)
        blocks.append(
            f"export const {constant} = [{values}] as const;\n"
            f"export type {enum.__name__} = (typeof {constant})[number];\n"
        )
    return "\n".join(blocks)


def _ts_string(value: str) -> str:
    # Apostrophes présentes dans certaines valeurs (« En cours d'examen ») : guillemets doubles.
    return (
        '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
        if "'" in value
        else f"'{value}'"
    )


if __name__ == "__main__":
    TARGET.write_text(render(), encoding="utf-8")
    print(f"{TARGET.relative_to(BACKEND.parent)} : {len(ENUMS)} enums")
