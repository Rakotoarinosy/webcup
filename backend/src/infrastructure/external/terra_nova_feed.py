"""Client HTTP de l'API officielle Terra Nova (bibliothèque standard : aucune dépendance ajoutée).

L'API mélange entiers, booléens, null et chaînes vides : tout est normalisé ici, pour que le
domaine ne manipule que des valeurs typées.
"""

import json
import logging
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from src.domain.terra_request import (
    FeedSnapshot,
    TerraFeed,
    TerraFeedUnavailableError,
    TerraRequest,
    TerraSession,
)
from src.infrastructure.config.settings import Settings

logger = logging.getLogger(__name__)

# Le serveur coupe la connexion aux User-Agent de bibliothèques HTTP (python-urllib, httpx…).
USER_AGENT = "Mozilla/5.0 (compatible; BugsKillerTerraNova/1.0)"


class HttpTerraFeed(TerraFeed):
    def __init__(self, url: str, api_key: str | None, timeout: float) -> None:
        self._url = url
        self._api_key = api_key
        self._timeout = timeout

    @classmethod
    def from_settings(cls, settings: Settings) -> "HttpTerraFeed":
        return cls(
            settings.terra_nova_api_url,
            settings.terra_nova_api_key,
            settings.terra_nova_timeout_seconds,
        )

    def fetch(self) -> FeedSnapshot:
        if not self._api_key:
            raise TerraFeedUnavailableError(
                "Clé API Terra Nova non configurée (TERRA_NOVA_API_KEY)"
            )

        data = self._get_json()
        session = data.get("session")
        items = data.get("requests") or []
        if not isinstance(items, list):
            raise TerraFeedUnavailableError("Structure de réponse inattendue de l'API Terra Nova")

        requests = []
        for item in items:
            if isinstance(item, dict) and _str(item.get("request_code")).strip():
                requests.append(_to_request(item))
            else:
                logger.warning("terra nova item ignored (no request_code)")

        return FeedSnapshot(
            session=_to_session(session if isinstance(session, dict) else {}),
            requests=requests,
        )

    def _get_json(self) -> dict[str, Any]:
        # Les deux modes d'authentification sont acceptés par l'API : on envoie les deux.
        query = urllib.parse.urlencode({"api_key": self._api_key})
        request = urllib.request.Request(
            f"{self._url}?{query}",
            headers={
                "X-Webcup-Api-Key": self._api_key or "",
                "Accept": "application/json",
                "User-Agent": USER_AGENT,
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=self._timeout) as response:
                body = response.read()
        except urllib.error.HTTPError as error:
            if error.code == 403:
                raise TerraFeedUnavailableError("Clé API Terra Nova refusée (403)") from error
            raise TerraFeedUnavailableError(
                f"Erreur HTTP {error.code} de l'API Terra Nova"
            ) from error
        except TimeoutError as error:
            raise TerraFeedUnavailableError(
                "Délai dépassé lors de l'appel à l'API Terra Nova"
            ) from error
        except (urllib.error.URLError, OSError) as error:
            raise TerraFeedUnavailableError("API Terra Nova injoignable") from error

        try:
            data = json.loads(body)
        except ValueError as error:
            raise TerraFeedUnavailableError("Réponse JSON invalide de l'API Terra Nova") from error
        if not isinstance(data, dict):
            raise TerraFeedUnavailableError("Structure de réponse inattendue de l'API Terra Nova")
        return data


def _int(value: Any, default: int | None = 0) -> int | None:
    if value is None or value == "":
        return default
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _req_int(value: Any) -> int:
    return _int(value) or 0


def _bool(value: Any) -> bool:
    if isinstance(value, str):
        return value.strip().lower() in {"1", "true", "yes", "oui"}
    return bool(value)


def _str(value: Any) -> str:
    return "" if value is None else str(value)


def _to_request(item: dict[str, Any]) -> TerraRequest:
    xp_base = _req_int(item.get("xp_base"))
    xp_bonus = _req_int(item.get("xp_time_bonus"))
    xp_total = _int(item.get("xp_total"), None)
    xp_total = xp_base + xp_bonus if xp_total is None else xp_total
    xp_available = _int(item.get("xp_available"), None)

    return TerraRequest(
        request_code=_str(item.get("request_code")).strip(),
        api_id=_int(item.get("id"), None),
        requester_name=_str(item.get("requester_name")),
        requester_type=_str(item.get("requester_type")),
        message_public=_str(item.get("message_public")),
        difficulty=_str(item.get("difficulty")),
        difficulty_level=_req_int(item.get("difficulty_level")),
        xp_base=xp_base,
        xp_time_bonus=xp_bonus,
        xp_total=xp_total,
        xp_available=xp_total if xp_available is None else xp_available,
        is_initial=_bool(item.get("is_initial")),
        visible_since_wave=_int(item.get("visible_since_wave"), None),
        arrival_type=_str(item.get("arrival_type")),
        wave_number=_int(item.get("wave_number"), None),
        arrival_time=_str(item.get("arrival_time")),
        is_ai_related=_bool(item.get("is_ai_related")),
        is_ai_request=_bool(item.get("is_ai_request")),
        group_name=_str(item.get("group_name")),
        sort_order=_req_int(item.get("sort_order")),
        raw=item,
    )


def _to_session(data: dict[str, Any]) -> TerraSession:
    return TerraSession(
        status=_str(data.get("status")) or "none",
        is_running=_bool(data.get("is_running")),
        current_wave=_req_int(data.get("current_wave")),
        elapsed_minutes=_req_int(data.get("elapsed_minutes")),
        visible_requests_count=_req_int(data.get("visible_requests_count")),
        initial_requests_count=_req_int(data.get("initial_requests_count")),
        wave_requests_count=_req_int(data.get("wave_requests_count")),
        next_wave_number=_req_int(data.get("next_wave_number")),
        minutes_until_next_wave=_req_int(data.get("minutes_until_next_wave")),
    )
