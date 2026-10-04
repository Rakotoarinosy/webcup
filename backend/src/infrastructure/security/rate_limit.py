"""Limitation de débit en mémoire (fenêtre glissante), sans dépendance externe.

Par processus : derrière Passenger avec plusieurs processus, la limite effective est
multipliée par leur nombre, ce qui reste protecteur contre le bourrage d'identifiants.
"""

import re
import threading
import time
from collections import OrderedDict, deque
from dataclasses import dataclass


@dataclass(frozen=True)
class RateRule:
    name: str
    method: str
    pattern: re.Pattern[str]
    limit: int  # requêtes autorisées par fenêtre, par client (IP) et par identifiant
    window_seconds: int
    identifier_fields: tuple[str, ...] = ()

    def matches(self, method: str, path: str) -> bool:
        return method == self.method and self.pattern.fullmatch(path) is not None


def _rule(
    name: str, method: str, path: str, limit: int, window: int, *fields: str
) -> RateRule:
    return RateRule(name, method, re.compile(path), limit, window, fields)


API = "/api/v1"

# Limites larges pour un humain (fautes de frappe, plusieurs onglets), bloquantes pour un robot.
RULES: tuple[RateRule, ...] = (
    _rule("login", "POST", f"{API}/auth/login", 20, 300, "identifier", "email", "phone"),
    _rule("register", "POST", f"{API}/auth/register", 10, 600, "email", "phone"),
    _rule("verify", "POST", f"{API}/auth/verify-code", 20, 300, "challenge_id"),
    _rule("resend", "POST", f"{API}/auth/resend-code", 10, 600, "challenge_id"),
    _rule("google", "POST", f"{API}/auth/google", 20, 300),
    _rule("refresh", "POST", f"{API}/auth/refresh", 120, 60),
    _rule("password", "POST", f"{API}/auth/change-password", 10, 600),
    _rule("account_delete", "DELETE", f"{API}/auth/me", 10, 600),
    _rule("profile", "PATCH", f"{API}/auth/me", 10, 600),
    _rule("not_me", "POST", f"{API}/auth/security/not-me", 10, 600),
    _rule("form_token", "GET", f"{API}/security/form-token", 60, 600),
    _rule("contact", "POST", f"{API}/municipal/contact", 5, 600, "sender_email"),
    _rule("request", "POST", f"{API}/requests", 10, 600),
    _rule("data_concern", "POST", f"{API}/data-concerns", 5, 600),
    _rule("comment", "POST", f"{API}/municipal/publications/[^/]+/comments", 20, 600),
)


class SlidingWindowLimiter:
    def __init__(self, max_keys: int = 50_000) -> None:
        self._hits: OrderedDict[str, deque[float]] = OrderedDict()
        self._lock = threading.Lock()
        self._max_keys = max_keys

    def hit(self, key: str, limit: int, window: float, now: float | None = None) -> int:
        """Enregistre un passage. Retourne 0 si autorisé, sinon les secondes à attendre."""
        now = time.monotonic() if now is None else now
        with self._lock:
            hits = self._hits.get(key)
            if hits is None:
                hits = deque()
                self._hits[key] = hits
                if len(self._hits) > self._max_keys:
                    self._hits.popitem(last=False)  # mémoire bornée : oublie le plus ancien
            else:
                self._hits.move_to_end(key)
            while hits and hits[0] <= now - window:
                hits.popleft()
            if len(hits) >= limit:
                return max(1, int(hits[0] + window - now + 0.999))
            hits.append(now)
            return 0

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()
