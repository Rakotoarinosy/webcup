"""Le frontend utilise exactement les valeurs des Enum du backend (contrat de l'API)."""

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[2] / "scripts" / "generate_frontend_enums.py"


def _generator():  # type: ignore[no-untyped-def]
    spec = importlib.util.spec_from_file_location("generate_frontend_enums", SCRIPT)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_frontend_enums_match_the_backend() -> None:
    generator = _generator()
    current = generator.TARGET.read_text(encoding="utf-8") if generator.TARGET.exists() else ""
    assert current == generator.render(), (
        "frontend/src/app/shared/api-enums.ts n'est plus à jour : "
        "lancez `uv run python scripts/generate_frontend_enums.py` dans backend/"
    )
