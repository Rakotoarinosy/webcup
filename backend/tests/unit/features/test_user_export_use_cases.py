from datetime import UTC, datetime

import pytest

from src.domain.user_export import ExportFormat, PersonalData, UserExportRepository
from src.features.user_export.use_cases import export_personal_data


class FakeUserExportRepository(UserExportRepository):
    def __init__(self, data: PersonalData) -> None:
        self.data = data
        self.user_ids: list[str] = []

    def get_personal_data(self, user_id: str) -> PersonalData:
        self.user_ids.append(user_id)
        return self.data


@pytest.mark.parametrize(
    ("export_format", "extension", "media_type", "signature"),
    [
        (ExportFormat.CSV, "csv", "text/csv", b"\xef\xbb\xbfRubrique"),
        (ExportFormat.EXCEL, "xlsx", "spreadsheetml.sheet", b"PK"),
        (ExportFormat.WORD, "doc", "application/msword", b"<!doctype html>"),
        (ExportFormat.PDF, "pdf", "application/pdf", b"%PDF-1.4"),
    ],
)
def test_export_personal_data_generates_the_requested_download(
    export_format: ExportFormat, extension: str, media_type: str, signature: bytes
) -> None:
    repo = FakeUserExportRepository(
        PersonalData(
            name="Ada Lovelace",
            email="ada@example.test",
            role="citizen",
            created_at=datetime(2026, 10, 3, tzinfo=UTC),
            theme="dark",
            font_size="medium",
            font_family="inter",
            requests=(),
        )
    )

    document = export_personal_data("only-me", export_format, repo)

    assert repo.user_ids == ["only-me"]
    assert document.filename.endswith(f".{extension}")
    assert media_type in document.media_type
    assert document.content.startswith(signature)
    assert b"password" not in document.content.lower()
