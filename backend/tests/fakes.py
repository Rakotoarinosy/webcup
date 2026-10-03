"""Repositories en mémoire pour les tests unitaires : ni base de données, ni HTTP."""

from datetime import datetime

from src.domain.user import RefreshToken, RefreshTokenRepository, Role, User, UserRepository
from src.domain.user.ports import PasswordHasher


class FakeUserRepository(UserRepository):
    def __init__(self) -> None:
        self.users: dict[str, User] = {}

    def get_by_id(self, user_id: str) -> User | None:
        return self.users.get(user_id)

    def get_by_email(self, email: str) -> User | None:
        return next((user for user in self.users.values() if user.email == email), None)

    def count_active_by_role(self, role: Role) -> int:
        return sum(user.role is role and user.is_active for user in self.users.values())

    def list(self) -> list[User]:
        return list(self.users.values())

    def list_citizens(self, search: str | None = None) -> "list[User]":
        users = [user for user in self.users.values() if user.role is Role.CITIZEN]
        if search:
            search = search.casefold()
            users = [
                user
                for user in users
                if search in user.name.casefold() or search in user.email.casefold()
            ]
        return users

    def add(self, user: User) -> User:
        self.users[user.id] = user
        return user

    def update(self, user: User) -> User:
        self.users[user.id] = user
        return user

    def delete(self, user_id: str) -> None:
        self.users.pop(user_id, None)


class FakePasswordHasher(PasswordHasher):
    def hash(self, password: str) -> str:
        return f"hashed:{password}"

    def verify(self, password: str, password_hash: str) -> bool:
        return password_hash == self.hash(password)

    def needs_rehash(self, password_hash: str) -> bool:
        return False


class FakeRefreshTokenRepository(RefreshTokenRepository):
    def add(self, token: RefreshToken) -> RefreshToken:
        return token

    def get_by_hash(self, token_hash: str) -> RefreshToken | None:
        return None

    def revoke(self, token_id: str, now: datetime) -> bool:
        return False

    def revoke_family(self, family_id: str, now: datetime) -> None:
        return None

    def revoke_all_for_user(self, user_id: str, now: datetime) -> None:
        return None

    def delete_expired(self, now: datetime) -> None:
        return None
