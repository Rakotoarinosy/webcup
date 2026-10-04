"""Identification du client HTTP : adresse IP (proxy de confiance optionnel) et appareil."""

from collections.abc import Mapping

from starlette.requests import HTTPConnection

# En-têtes de géolocalisation posés par certains proxys / CDN (Cloudflare…) ; absents sinon.
_LOCATION_HEADERS = ("cf-ipcountry", "x-geo-country", "x-country-code")
_COUNTRY_NAMES = {
    "MG": "Madagascar",
    "FR": "France",
    "RE": "La Réunion",
    "MU": "Maurice",
    "KM": "Comores",
    "YT": "Mayotte",
}


def client_ip_from(headers: Mapping[str, str], peer: str | None, trust_forwarded: bool) -> str:
    if trust_forwarded:
        forwarded = headers.get("x-forwarded-for", "")
        first = forwarded.split(",")[0].strip()
        if first:
            return first[:64]
    return peer or "unknown"


def client_ip(connection: HTTPConnection, trust_forwarded: bool) -> str:
    peer = connection.client.host if connection.client else None
    return client_ip_from(connection.headers, peer, trust_forwarded)


def approximate_location(headers: Mapping[str, str]) -> str | None:
    for name in _LOCATION_HEADERS:
        value = headers.get(name, "").strip().upper()
        if len(value) == 2 and value.isalpha() and value not in {"XX", "T1"}:
            return _COUNTRY_NAMES.get(value, value)
    return None
