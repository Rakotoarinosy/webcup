"""Stockage local des images de couverture des publications.

Les fichiers sont écrits dans `backend/uploads/publications/` sous un nom aléatoire :
le nom envoyé par le navigateur n'est jamais utilisé. Le type réel est lu dans les
premiers octets du fichier (le `Content-Type` du client n'est pas fiable).
"""

import uuid
from pathlib import Path
from typing import BinaryIO

UPLOAD_ROOT = Path(__file__).resolve().parents[3] / "uploads"
MEDIA_URL_PREFIX = "/api/v1/media"
MAX_IMAGE_BYTES = 5 * 1024 * 1024


class ImageRejected(Exception):
    """Fichier refusé (vide, format non pris en charge)."""


class ImageTooLarge(ImageRejected):
    """Fichier au-dessus de la taille autorisée."""


def detect_image_extension(head: bytes) -> str | None:
    if head.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "webp"
    return None


def _save_image(stream: BinaryIO, folder_name: str) -> str:
    """Enregistre l'image et renvoie son URL publique (relative à l'API)."""
    data = stream.read(MAX_IMAGE_BYTES + 1)
    if len(data) > MAX_IMAGE_BYTES:
        raise ImageTooLarge("L'image ne doit pas dépasser 5 Mo.")
    if not data:
        raise ImageRejected("Le fichier est vide.")
    extension = detect_image_extension(data[:12])
    if extension is None:
        raise ImageRejected("Format non pris en charge : utilisez une image JPG, PNG ou WebP.")

    folder = UPLOAD_ROOT / folder_name
    folder.mkdir(parents=True, exist_ok=True)
    name = f"{uuid.uuid4().hex}.{extension}"
    (folder / name).write_bytes(data)
    return f"{MEDIA_URL_PREFIX}/{folder_name}/{name}"


def save_publication_image(stream: BinaryIO) -> str:
    """Enregistre l'image de couverture d'une publication."""
    return _save_image(stream, "publications")


def save_profile_image(stream: BinaryIO) -> str:
    """Enregistre la photo de profil d'un compte."""
    return _save_image(stream, "profiles")
