"""Règles pures : lecture du user-agent et troncature des adresses IP."""

import ipaddress
import re

from src.domain.account_security.entities import DeviceKind, DeviceProfile

_BROWSERS: tuple[tuple[str, str], ...] = (
    (r"Edg(e|A|iOS)?/", "Edge"),
    (r"OPR/|Opera", "Opera"),
    (r"SamsungBrowser/", "Samsung Internet"),
    (r"Firefox/|FxiOS/", "Firefox"),
    (r"Chrome/|CriOS/|Chromium/", "Chrome"),
    (r"Version/[\d.]+.*Safari/", "Safari"),
)
_SYSTEMS: tuple[tuple[str, str], ...] = (
    (r"Windows", "Windows"),
    (r"iPhone", "iPhone"),
    (r"iPad", "iPad"),
    (r"Android", "Android"),
    (r"CrOS", "ChromeOS"),
    (r"Mac OS X|Macintosh", "macOS"),
    (r"Linux", "Linux"),
)
UNKNOWN_BROWSER = "Navigateur inconnu"
UNKNOWN_OS = "système inconnu"


def parse_user_agent(user_agent: str | None) -> DeviceProfile:
    """Famille du navigateur et du système, sans version : une mise à jour ne crée pas d'alerte."""
    ua = (user_agent or "").strip()[:512]
    if not ua:
        return DeviceProfile(UNKNOWN_BROWSER, UNKNOWN_OS, DeviceKind.UNKNOWN)

    browser = next((name for pattern, name in _BROWSERS if re.search(pattern, ua)), None)
    if browser is None:
        # Client non navigateur (application, script) : son nom suffit à le reconnaître.
        first = re.match(r"[A-Za-z][\w.\-]{0,40}", ua)
        browser = first.group(0) if first else UNKNOWN_BROWSER
    system = next((name for pattern, name in _SYSTEMS if re.search(pattern, ua)), UNKNOWN_OS)

    if system == "iPad" or (system == "Android" and "Mobile" not in ua):
        kind = DeviceKind.TABLET
    elif system in {"iPhone", "Android"} or "Mobile" in ua:
        kind = DeviceKind.MOBILE
    elif system == UNKNOWN_OS:
        kind = DeviceKind.UNKNOWN
    else:
        kind = DeviceKind.DESKTOP

    return DeviceProfile(browser=browser, os=system, kind=kind)


def _address(ip: str | None) -> ipaddress.IPv4Address | ipaddress.IPv6Address | None:
    if not ip:
        return None
    try:
        address = ipaddress.ip_address(ip.strip())
    except ValueError:
        return None
    if isinstance(address, ipaddress.IPv6Address) and address.ipv4_mapped:
        return address.ipv4_mapped
    return address


def network_prefix(ip: str | None) -> str:
    """Réseau utilisé dans l'empreinte : /24 en IPv4, /48 en IPv6 (jamais l'adresse exacte)."""
    address = _address(ip)
    if address is None:
        return "unknown"
    prefix = 24 if address.version == 4 else 48
    return str(ipaddress.ip_network(f"{address}/{prefix}", strict=False))


def display_network(ip: str | None) -> str | None:
    """Réseau montré à l'habitant : 196.192.x.x (IPv4) ou 2001:db8:… (IPv6)."""
    address = _address(ip)
    if address is None:
        return None
    if address.version == 4:
        first, second, *_ = str(address).split(".")
        return f"{first}.{second}.x.x"
    hextets = address.exploded.split(":")[:2]
    return ":".join(part.lstrip("0") or "0" for part in hextets) + ":…"
