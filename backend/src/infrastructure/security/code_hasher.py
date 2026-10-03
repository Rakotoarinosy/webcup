"""Hachage keyé (HMAC-SHA256) des codes de confirmation à 6 chiffres."""

import hashlib
import hmac

from src.domain.user.ports import CodeHasher


class HmacCodeHasher(CodeHasher):
    def __init__(self, secret_key: str) -> None:
        self._key = secret_key.encode()

    def hash(self, user_id: str, code: str) -> str:
        # Le préfixe sépare cet usage de tout autre usage de SECRET_KEY (ex. signature des JWT).
        message = f"verification-code:{user_id}:{code}".encode()

        return hmac.new(self._key, message, hashlib.sha256).hexdigest()
