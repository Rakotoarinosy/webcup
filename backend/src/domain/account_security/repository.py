"""Ports de la sécurité du compte : stockage des appareils et envoi des alertes."""

from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.account_security.entities import KnownDevice
from src.domain.user.entities import User


class KnownDeviceRepository(ABC):
    @abstractmethod
    def list_for_user(self, user_id: str, now: datetime) -> "list[KnownDevice]":
        """Du plus récemment utilisé au plus ancien, avec le nombre de sessions encore ouvertes."""

    @abstractmethod
    def get(self, user_id: str, device_id: str) -> KnownDevice | None: ...

    @abstractmethod
    def find_by_token(self, user_id: str, token_hash: str) -> KnownDevice | None: ...

    @abstractmethod
    def find_by_fingerprint(self, user_id: str, fingerprint: str) -> KnownDevice | None: ...

    @abstractmethod
    def count_for_user(self, user_id: str) -> int: ...

    @abstractmethod
    def add(self, device: KnownDevice) -> KnownDevice: ...

    @abstractmethod
    def update(self, device: KnownDevice) -> KnownDevice: ...

    @abstractmethod
    def delete(self, device_id: str) -> None: ...

    @abstractmethod
    def link_session(self, device_id: str, user_id: str, family_id: str, now: datetime) -> None:
        """Rattache une session (famille de refresh tokens) à l'appareil qui l'a ouverte."""

    @abstractmethod
    def device_for_session(self, family_id: str) -> str | None: ...

    @abstractmethod
    def session_families(self, device_id: str) -> "list[str]": ...

    @abstractmethod
    def revoke_sessions_except(self, user_id: str, keep_family_id: str | None, now: datetime) -> int:
        """Révoque toutes les sessions ouvertes du compte sauf `keep_family_id`. Retourne leur nombre."""

    @abstractmethod
    def prune(self, user_id: str, keep: int) -> None:
        """Ne garde que les `keep` appareils les plus récemment utilisés."""


class SecurityAlertSender(ABC):
    @abstractmethod
    def new_device_login(self, user: User, device: KnownDevice) -> "list[str]":
        """Prévient l'habitant (email et/ou SMS). Retourne les canaux utilisés ; ne lève jamais."""
