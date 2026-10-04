"""Appareils connus d'un compte et contexte d'une connexion.

Un appareil est reconnu par un cookie opaque propre au navigateur (stocké haché) ou, à défaut,
par une empreinte non sensible : navigateur + système + réseau tronqué, hachés avec une clé.
Aucune adresse IP complète n'est conservée : seul un réseau tronqué (ex. 196.192.x.x) est
gardé pour aider l'habitant à reconnaître ses connexions.
"""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class DeviceKind(StrEnum):
    DESKTOP = "desktop"
    MOBILE = "mobile"
    TABLET = "tablet"
    UNKNOWN = "unknown"


@dataclass(frozen=True)
class DeviceProfile:
    """Lecture humaine d'un user-agent : « Firefox sur Windows »."""

    browser: str
    os: str
    kind: DeviceKind

    @property
    def label(self) -> str:
        return f"{self.browser} sur {self.os}"


@dataclass(frozen=True)
class LoginContext:
    """Ce que la requête de connexion révèle de l'appareil (rien n'est stocké tel quel)."""

    user_agent: str = ""
    ip: str | None = None
    device_token: str | None = None  # valeur brute du cookie d'appareil, si présent
    location: str | None = None  # pays ou ville fournis par un proxy, si disponibles


@dataclass(frozen=True)
class KnownDevice:
    id: str
    user_id: str
    token_hash: str  # SHA-256 du cookie d'appareil
    fingerprint: str  # HMAC(navigateur | système | réseau tronqué)
    label: str
    kind: DeviceKind
    network: str | None  # réseau tronqué lisible, jamais l'adresse complète
    location: str | None
    first_seen_at: datetime
    last_seen_at: datetime
    # False : connexion depuis un nouvel appareil pas encore confirmée par l'habitant (alerte).
    acknowledged: bool = True
    # Rempli à la lecture : sessions encore ouvertes depuis cet appareil.
    active_sessions: int = 0


@dataclass(frozen=True)
class LoginRecord:
    device: KnownDevice
    is_new: bool  # nouvel appareil (et pas le tout premier du compte) : alerte à envoyer
    device_token: str  # à (re)poser dans le cookie d'appareil
