"""Interfaces des repositories user : le domaine décrit ce dont il a besoin, l'infrastructure l'implémente."""

import builtins
from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.user.entities import RefreshToken, Role, User, VerificationCode


class UserRepository(ABC):
    @abstractmethod
    def get_by_id(self, user_id: str) -> User | None: ...

    @abstractmethod
    def get_by_email(self, email: str) -> User | None: ...

    @abstractmethod
    def get_by_phone(self, phone: str) -> User | None: ...

    @abstractmethod
    def get_by_google_id(self, google_id: str) -> User | None: ...

    @abstractmethod
    def count_active_by_role(self, role: Role) -> int: ...

    @abstractmethod
    def add(self, user: User) -> User: ...

    @abstractmethod
    def update(self, user: User) -> User: ...

    @abstractmethod
    def delete(self, user_id: str) -> None: ...

    @abstractmethod
    def delete_personal_account(self, user_id: str, archive: User) -> None:
        """Atomically erase the account and archive its municipal records without its identity."""

    # Déclaré en dernier : le nom `list` masque le builtin dans le corps de la classe.
    @abstractmethod
    def list(self) -> list[User]: ...

    @abstractmethod
    def list_citizens(self, search: str | None = None) -> builtins.list[User]: ...


class RefreshTokenRepository(ABC):
    @abstractmethod
    def add(self, token: RefreshToken) -> RefreshToken: ...

    @abstractmethod
    def get_by_hash(self, token_hash: str) -> RefreshToken | None: ...

    @abstractmethod
    def has_active_device(
        self, user_id: str, device_fingerprint: str, now: datetime
    ) -> bool: ...

    @abstractmethod
    def revoke(self, token_id: str, now: datetime) -> bool:
        """Révoque un token. Retourne False s'il était déjà révoqué (course / réutilisation)."""

    @abstractmethod
    def revoke_family(self, family_id: str, now: datetime) -> None: ...

    @abstractmethod
    def revoke_all_for_user(self, user_id: str, now: datetime) -> None: ...

    @abstractmethod
    def delete_expired(self, now: datetime) -> None: ...


class VerificationCodeRepository(ABC):
    @abstractmethod
    def replace_for_user(self, code: VerificationCode) -> VerificationCode:
        """Supprime les codes précédents de l'utilisateur et enregistre celui-ci (une transaction)."""

    @abstractmethod
    def get_by_id(self, code_id: str) -> VerificationCode | None: ...

    @abstractmethod
    def get_for_user(self, user_id: str) -> VerificationCode | None: ...

    @abstractmethod
    def consume_attempt(self, code_id: str, max_attempts: int) -> bool:
        """Compte un essai de façon atomique. Retourne False si le quota d'essais est épuisé."""

    @abstractmethod
    def consume_verified(self, code_id: str, code_hash: str, now: datetime) -> bool:
        """Atomically consume a valid challenge once, returning whether this caller consumed it."""

    @abstractmethod
    def delete_for_user(self, user_id: str) -> None: ...

    @abstractmethod
    def delete_created_before(self, cutoff: datetime) -> None: ...
