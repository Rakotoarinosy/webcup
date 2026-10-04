"""Construction pure des fichiers d'export des données personnelles."""

import csv
import io
import zipfile
from datetime import UTC, datetime
from html import escape as html_escape
from xml.sax.saxutils import escape as xml_escape

from src.domain.user_export import ExportDocument, ExportFormat, PersonalData, UserExportRepository


def export_personal_data(
    user_id: str, export_format: ExportFormat, repo: UserExportRepository
) -> ExportDocument:
    data = repo.get_personal_data(user_id)
    generated_at = datetime.now(UTC)
    content, media_type, extension = {
        ExportFormat.CSV: (_csv(data, generated_at), "text/csv; charset=utf-8", "csv"),
        ExportFormat.EXCEL: (
            _xlsx(data, generated_at),
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "xlsx",
        ),
        ExportFormat.WORD: (_word(data, generated_at), "application/msword", "doc"),
        ExportFormat.PDF: (_pdf(data, generated_at), "application/pdf", "pdf"),
    }[export_format]
    return ExportDocument(content, media_type, f"mes-donnees-{generated_at:%Y-%m-%d}.{extension}")


def _rows(data: PersonalData, generated_at: datetime) -> list[tuple[str, str, str]]:
    rows = [
        ("Informations du compte", "Nom", data.name),
        ("Informations du compte", "Adresse email", data.email or "Non renseignée"),
        ("Informations du compte", "Téléphone", data.phone or "Non renseigné"),
        ("Informations du compte", "Rôle", data.role),
        ("Informations du compte", "Membre depuis", _date(data.created_at)),
        ("Préférences", "Thème", data.theme),
        ("Préférences", "Taille du texte", data.font_size),
        ("Préférences", "Style de police", data.font_family),
        ("Export", "Généré le", _date(generated_at)),
    ]
    for index, request in enumerate(data.requests, start=1):
        section = f"Demande {index}"
        rows.extend(
            [
                (section, "Titre", request.title),
                (section, "Description", request.description),
                (section, "Catégorie", request.category),
                (section, "Statut", request.status),
                (section, "Priorité", request.priority),
                (section, "Lieu", request.location),
                (section, "Créée le", _date(request.created_at)),
                (section, "Mise à jour le", _date(request.updated_at)),
            ]
        )
    return rows


def _date(value: datetime) -> str:
    return value.astimezone(UTC).strftime("%d/%m/%Y %H:%M UTC")


def _csv(data: PersonalData, generated_at: datetime) -> bytes:
    stream = io.StringIO(newline="")
    writer = csv.writer(stream, delimiter=";")
    writer.writerow(["Rubrique", "Champ", "Valeur"])
    writer.writerows(_rows(data, generated_at))
    return ("\ufeff" + stream.getvalue()).encode("utf-8")


def _xlsx(data: PersonalData, generated_at: datetime) -> bytes:
    """Classeur XLSX minimal et standard, sans dépendance serveur supplémentaire."""

    rows = [("Rubrique", "Champ", "Valeur"), *_rows(data, generated_at)]
    sheet_rows = []
    for index, row in enumerate(rows, start=1):
        cells = "".join(
            f'<c r="{column}{index}" t="inlineStr"><is><t>{xml_escape(value)}</t></is></c>'
            for column, value in zip(("A", "B", "C"), row, strict=True)
        )
        sheet_rows.append(f'<row r="{index}">{cells}</row>')
    files = {
        "[Content_Types].xml": """<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\"><Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/><Default Extension=\"xml\" ContentType=\"application/xml\"/><Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/><Override PartName=\"/xl/worksheets/sheet1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/></Types>""",
        "_rels/.rels": """<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/></Relationships>""",
        "xl/workbook.xml": """<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><sheets><sheet name=\"Mes données\" sheetId=\"1\" r:id=\"rId1\"/></sheets></workbook>""",
        "xl/_rels/workbook.xml.rels": """<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>
<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet1.xml\"/></Relationships>""",
        "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'
        + "".join(sheet_rows)
        + "</sheetData></worksheet>",
    }
    stream = io.BytesIO()
    with zipfile.ZipFile(stream, "w", zipfile.ZIP_DEFLATED) as archive:
        for path, body in files.items():
            archive.writestr(path, body)
    return stream.getvalue()


def _word(data: PersonalData, generated_at: datetime) -> bytes:
    body = "".join(
        f"<tr><td>{html_escape(section)}</td><td>{html_escape(field)}</td><td>{html_escape(value)}</td></tr>"
        for section, field, value in _rows(data, generated_at)
    )
    return (
        '<!doctype html><html><head><meta charset="utf-8"><title>Mes données Terra Nova</title>'
        "<style>body{font-family:Arial,sans-serif;color:#1f2937}table{border-collapse:collapse;width:100%}"
        "th,td{border:1px solid #d1d5db;padding:8px;text-align:left}th{background:#e5f8f0}</style>"
        "</head><body><h1>Mes données Terra Nova</h1><table><thead><tr><th>Rubrique</th><th>Champ</th>"
        f"<th>Valeur</th></tr></thead><tbody>{body}</tbody></table></body></html>"
    ).encode()


def _pdf(data: PersonalData, generated_at: datetime) -> bytes:
    """Build a compact, single-page PDF using only the standard PDF fonts."""

    page_width, page_height = 595, 842
    left, right = 48, 547
    commands: list[str] = []
    y = 0

    def color(rgb: tuple[float, float, float]) -> str:
        return " ".join(f"{component:.3f}" for component in rgb)

    def draw_text(
        x: float,
        baseline: float,
        value: str,
        font: str,
        size: float,
        rgb: tuple[float, float, float],
    ) -> None:
        encoded = value.encode("cp1252", "replace").decode("latin-1")
        escaped = encoded.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        commands.append(
            f"BT {color(rgb)} rg /{font} {size:g} Tf 1 0 0 1 {x:g} {baseline:g} Tm ({escaped}) Tj ET"
        )

    def rect(
        x: float, bottom: float, width: float, height: float, rgb: tuple[float, float, float]
    ) -> None:
        commands.append(f"{color(rgb)} rg {x:g} {bottom:g} {width:g} {height:g} re f")

    rect(0, page_height - 12, page_width, 12, (0.16, 0.80, 0.60))
    draw_text(left, page_height - 46, "TERRA NOVA  /  MES DONNÉES", "F2", 9, (0.20, 0.48, 0.41))
    y = page_height - 78
    draw_text(left, y, "Mes données personnelles", "F2", 23, (0.10, 0.13, 0.18))
    y -= 23
    draw_text(
        left, y, "Votre compte, vos préférences et vos demandes", "F1", 10, (0.38, 0.43, 0.49)
    )
    y -= 34

    rows = _rows(data, generated_at)
    groups: list[tuple[str, list[tuple[str, str]]]] = []
    for section, field, value in rows:
        if not groups or groups[-1][0] != section:
            groups.append((section, []))
        groups[-1][1].append((field, value))

    for section, fields in groups:
        rect(left, y - 18, 4, 18, (0.16, 0.80, 0.60))
        draw_text(left + 13, y - 13, section.upper(), "F2", 10, (0.13, 0.19, 0.24))
        y -= 28
        for field, value in fields:
            # Keep long values readable by wrapping at a conservative character width.
            words = value.split()
            value_lines: list[str] = []
            current = ""
            for word in words or [""]:
                candidate = f"{current} {word}".strip()
                if len(candidate) > 68 and current:
                    value_lines.append(current)
                    current = word
                else:
                    current = candidate
            value_lines.append(current)
            row_height = 18 + 12 * (len(value_lines) - 1)
            draw_text(left + 13, y, field, "F1", 9, (0.42, 0.47, 0.52))
            for line_index, line in enumerate(value_lines):
                draw_text(230, y - line_index * 12, line, "F2", 10, (0.10, 0.13, 0.18))
            y -= row_height
            commands.append(
                f"0.86 0.89 0.91 RG 0.5 w {left + 13:g} {y + 4:g} m {right:g} {y + 4:g} l S"
            )
            y -= 5
        y -= 12

    content_height = page_height - y
    scale = min(1.0, (page_height - 110) / content_height) if content_height > 0 else 1.0
    # Scale the complete layout uniformly when necessary, then center it on the page.
    offset_x = (page_width * (1 - scale)) / 2
    offset_y = 55 - scale * y if scale < 1 else 0
    stream = (
        f"q {scale:.5f} 0 0 {scale:.5f} {offset_x:.2f} {offset_y:.2f} cm\n"
        + "\n".join(commands)
        + "\nQ\n0.78 0.82 0.85 RG 0.6 w 48 38 m 547 38 l S"
    )
    draw_text(right - 64, 24, "Terra Nova  ·  1/1", "F1", 8, (0.48, 0.53, 0.58))
    stream += "\n" + commands[-1]

    objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    ]
    objects.extend(
        [
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents 6 0 R >>",
            f"<< /Length {len(stream.encode('latin-1'))} >>\nstream\n{stream}\nendstream",
        ]
    )
    objects[1] = "<< /Type /Pages /Kids [5 0 R] /Count 1 >>"
    result = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(result))
        result += f"{index} 0 obj\n{obj}\nendobj\n".encode("latin-1")
    xref = len(result)
    result += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode()
    result += b"".join(f"{offset:010d} 00000 n \n".encode() for offset in offsets[1:])
    return (
        result
        + f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode()
    )
