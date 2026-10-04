"""Garde-fous HTTP de l'API, en un seul middleware ASGI (F69, F77, F78, F81, F82, F57).

Dans l'ordre, pour chaque requête HTTP :
  1. surcharge : au-delà de N requêtes simultanées, 503 immédiat (plutôt que de faire attendre) ;
  2. taille : corps refusé au-delà de la limite (64 Ko pour /auth) → 413 ;
  3. débit : plafond global par client + limites ciblées (connexion, inscription, codes,
     formulaires publics) par IP et par identifiant → 429 avec Retry-After ;
  4. anti-robots (inscription, contact) : jeton signé, délai minimal, pot de miel → 400 discret ;
  5. double soumission (POST) : Idempotency-Key rejoue la première réponse ; un contenu
     identique renvoyé par le même auteur peu après → 409 explicite ;
  6. contenus publics (GET anonymes) : cache mémoire court + ETag / 304 ;
  7. en-têtes de sécurité sur toutes les réponses, no-store sur les réponses authentifiées.
Les tentatives suspectes sont journalisées (logger « security »), sans donnée personnelle.
"""

import hashlib
import json
import logging
import re
import threading
import time
from collections.abc import Awaitable, Callable, Iterator, MutableMapping
from contextlib import contextmanager
from dataclasses import dataclass, field
from datetime import UTC, datetime, timedelta
from typing import Any

from sqlalchemy.orm import Session
from starlette.concurrency import run_in_threadpool
from starlette.datastructures import Headers

from src.infrastructure.config.settings import Settings
from src.infrastructure.persistence.database import get_db
from src.infrastructure.persistence.submission_store import SubmissionStore
from src.infrastructure.security.client import client_ip_from
from src.infrastructure.security.form_guard import (
    FORM_TOKEN_HEADER,
    FORM_TRAP_HEADER,
    FormCheck,
    FormTokenSigner,
)
from src.infrastructure.security.rate_limit import API, RULES, RateRule, SlidingWindowLimiter

logger = logging.getLogger("security")

Scope = MutableMapping[str, Any]
Message = MutableMapping[str, Any]
Receive = Callable[[], Awaitable[Message]]
Send = Callable[[Message], Awaitable[None]]
ASGIApp = Callable[[Scope, Receive, Send], Awaitable[None]]

AUTH_BODY_LIMIT = 64 * 1024
MAX_STORED_RESPONSE = 256 * 1024
IDEMPOTENCY_KEY_RE = re.compile(r"[A-Za-z0-9_\-:.]{8,128}")
DOCS_PATHS = ("/docs", "/redoc", "/openapi.json")

# Formulaires protégés contre les robots : ouverts sans compte, donc cibles privilégiées.
FORM_GUARDED = (re.compile(f"{API}/auth/register"), re.compile(f"{API}/municipal/contact"))
# Créations où un même contenu renvoyé deux fois est forcément une erreur.
DUPLICATE_GUARDED = (
    re.compile(f"{API}/requests"),
    re.compile(f"{API}/municipal/contact"),
    re.compile(f"{API}/data-concerns"),
    re.compile(f"{API}/municipal/publications/[^/]+/comments"),
)
# Contenus publics identiques pour tous : mis en cache quelques secondes.
PUBLIC_CACHEABLE = re.compile(
    f"{API}/municipal/(services(/featured|/popular)?|publications(/(?!manage$)[^/]+(/comments)?)?)"
)


@dataclass
class _CachedResponse:
    body: bytes
    etag: str
    content_type: str
    expires: float


class PublicCache:
    def __init__(self, max_entries: int = 256) -> None:
        self._items: dict[str, _CachedResponse] = {}
        self._lock = threading.Lock()
        self._max = max_entries

    def get(self, key: str) -> _CachedResponse | None:
        with self._lock:
            item = self._items.get(key)
            if item and item.expires > time.monotonic():
                return item
            self._items.pop(key, None)
            return None

    def put(self, key: str, item: _CachedResponse) -> None:
        with self._lock:
            if len(self._items) >= self._max:
                self._items.clear()
            self._items[key] = item

    def clear(self) -> None:
        with self._lock:
            self._items.clear()


@dataclass
class GuardConfig:
    rate_limit_enabled: bool = True
    global_per_minute: int = 600
    trust_forwarded_for: bool = False
    max_body_bytes: int = 10 * 1024 * 1024
    form_guard_enforced: bool = True
    duplicate_window_seconds: int = 180
    idempotency_ttl_seconds: int = 24 * 3600
    public_cache_seconds: int = 30
    max_concurrent_requests: int = 64
    production: bool = False
    rules: tuple[RateRule, ...] = RULES
    signer: FormTokenSigner = field(default_factory=lambda: FormTokenSigner("dev"))
    decode_user: Callable[[str], str] | None = None
    # État en mémoire porté par la configuration : une nouvelle configuration repart à zéro.
    limiter: SlidingWindowLimiter = field(default_factory=SlidingWindowLimiter)
    cache: PublicCache = field(default_factory=PublicCache)

    @classmethod
    def from_settings(
        cls, settings: Settings, decode_user: Callable[[str], str] | None = None
    ) -> "GuardConfig":
        return cls(
            rate_limit_enabled=settings.rate_limit_enabled,
            global_per_minute=settings.rate_limit_global_per_minute,
            trust_forwarded_for=settings.trust_forwarded_for,
            max_body_bytes=settings.max_request_body_bytes,
            form_guard_enforced=settings.form_guard_enforced,
            duplicate_window_seconds=settings.duplicate_submission_window_seconds,
            idempotency_ttl_seconds=settings.idempotency_ttl_seconds,
            public_cache_seconds=settings.public_cache_seconds,
            max_concurrent_requests=settings.max_concurrent_requests,
            production=settings.is_production,
            signer=FormTokenSigner(
                settings.secret_key,
                settings.form_min_fill_seconds,
                settings.form_token_max_age_seconds,
            ),
            decode_user=decode_user,
        )


def _json_error(status: int, error: str, detail: str, **extra: Any) -> tuple[int, bytes]:
    return status, json.dumps({"error": error, "detail": detail, **extra}).encode()


def _security_headers(path: str, production: bool) -> list[tuple[bytes, bytes]]:
    headers = [
        (b"x-content-type-options", b"nosniff"),
        (b"x-frame-options", b"DENY"),
        (b"referrer-policy", b"no-referrer"),
        (b"permissions-policy", b"camera=(), microphone=(), geolocation=(), payment=(), usb=()"),
        (b"cross-origin-opener-policy", b"same-origin"),
    ]
    if not path.startswith(DOCS_PATHS):
        headers.append(
            (b"content-security-policy", b"default-src 'none'; frame-ancestors 'none'; base-uri 'none'")
        )
    if production:
        headers.append((b"strict-transport-security", b"max-age=31536000; includeSubDomains"))
    return headers


def _canonical(body: bytes) -> str:
    """Contenu comparé pour les doublons : JSON trié, espaces superflus ignorés."""
    try:
        data = json.loads(body or b"null")
    except ValueError:
        return body.decode(errors="replace")

    def clean(value: Any) -> Any:
        if isinstance(value, str):
            return " ".join(value.split()).casefold()
        if isinstance(value, dict):
            return {k: clean(v) for k, v in value.items()}
        if isinstance(value, list):
            return [clean(v) for v in value]
        return value

    return json.dumps(clean(data), sort_keys=True, ensure_ascii=False)


def _identifier(body: bytes, fields: tuple[str, ...]) -> str | None:
    if not fields or not body:
        return None
    try:
        data = json.loads(body)
    except ValueError:
        return None
    if not isinstance(data, dict):
        return None
    for name in fields:
        value = data.get(name)
        if isinstance(value, str) and value.strip():
            return f"{name}:{value.strip().casefold()[:320]}"
    return None


def _anon(value: str) -> str:
    """Empreinte courte pour les journaux : corrèle sans exposer IP ni email."""
    return hashlib.sha256(value.encode()).hexdigest()[:12]


class HttpGuardMiddleware:
    def __init__(self, app: ASGIApp, config: GuardConfig | None = None) -> None:
        self.app = app
        self.default_config = config or GuardConfig()
        self.in_flight = 0

    # ─── outillage ASGI ───

    def _config(self, scope: Scope) -> GuardConfig:
        app = scope.get("app")
        state = getattr(app, "state", None)
        config = getattr(state, "guard_config", None) if state is not None else None
        return config if isinstance(config, GuardConfig) else self.default_config

    @contextmanager
    def _session(self, scope: Scope) -> Iterator[Session]:
        # Respecte dependency_overrides (base de test) comme les routes.
        app = scope.get("app")
        overrides = getattr(app, "dependency_overrides", {}) or {}
        provider = overrides.get(get_db, get_db)
        generator = provider()
        try:
            yield next(generator)
        finally:
            generator.close()

    async def _send_json(
        self, send: Send, status: int, body: bytes, extra: list[tuple[bytes, bytes]] | None = None
    ) -> None:
        headers = [
            (b"content-type", b"application/json"),
            (b"content-length", str(len(body)).encode()),
            (b"cache-control", b"no-store"),
            *(extra or []),
        ]
        await send({"type": "http.response.start", "status": status, "headers": headers})
        await send({"type": "http.response.body", "body": body})

    async def _reject(
        self, send: Send, status: int, error: str, detail: str, retry_after: int | None = None
    ) -> None:
        extra_body: dict[str, Any] = {}
        headers: list[tuple[bytes, bytes]] = []
        if retry_after is not None:
            extra_body["retry_after"] = retry_after
            headers.append((b"retry-after", str(retry_after).encode()))
        _, body = _json_error(status, error, detail, **extra_body)
        await self._send_json(send, status, body, headers)

    # ─── point d'entrée ───

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        config = self._config(scope)
        path: str = scope.get("path", "")
        method: str = scope.get("method", "GET")
        headers = Headers(scope=scope)
        has_auth = "authorization" in headers
        security = _security_headers(path, config.production)

        async def send_secured(message: Message) -> None:
            if message["type"] == "http.response.start":
                existing = {name.lower() for name, _ in message.get("headers", [])}
                extra = [h for h in security if h[0] not in existing]
                if has_auth and b"cache-control" not in existing:
                    extra.append((b"cache-control", b"no-store"))
                message["headers"] = [*message.get("headers", []), *extra]
            await send(message)

        if not path.startswith(API) or method == "OPTIONS":
            await self.app(scope, receive, send_secured)
            return

        # 1. Surcharge : réponse immédiate plutôt qu'une file d'attente qui s'allonge.
        limit = config.max_concurrent_requests
        if limit and self.in_flight >= limit and not path.endswith("/health"):
            logger.warning("overload: request shed", extra={"path": path})
            await self._reject(
                send_secured,
                503,
                "ServiceOverloadedError",
                "Le service est très sollicité. Réessayez dans quelques secondes.",
                retry_after=5,
            )
            return
        self.in_flight += 1
        try:
            await self._guarded(scope, receive, send_secured, config, path, method, headers)
        finally:
            self.in_flight -= 1

    async def _guarded(
        self,
        scope: Scope,
        receive: Receive,
        send: Send,
        config: GuardConfig,
        path: str,
        method: str,
        headers: Headers,
    ) -> None:
        peer = scope["client"][0] if scope.get("client") else None
        ip = client_ip_from(headers, peer, config.trust_forwarded_for)
        user_id = self._user_id(headers, config)
        owner = f"user:{user_id}" if user_id else f"ip:{ip}"

        # 2. Taille du corps.
        max_body = AUTH_BODY_LIMIT if path.startswith(f"{API}/auth/") else config.max_body_bytes
        length = headers.get("content-length")
        if length and length.isdigit() and int(length) > max_body:
            logger.warning("oversized request", extra={"path": path, "client": _anon(ip)})
            await self._reject(
                send, 413, "RequestTooLargeError", "Le contenu envoyé est trop volumineux."
            )
            return

        rules = [rule for rule in config.rules if rule.matches(method, path)]
        form_guarded = method == "POST" and any(p.fullmatch(path) for p in FORM_GUARDED)
        idem_key = headers.get("idempotency-key") if method == "POST" else None
        idem_allowed = idem_key is not None and (
            not path.startswith(f"{API}/auth/") or path == f"{API}/auth/register"
        )
        dup_guarded = (
            method == "POST"
            and config.duplicate_window_seconds > 0
            and any(p.fullmatch(path) for p in DUPLICATE_GUARDED)
        )

        body = b""
        if any(rule.identifier_fields for rule in rules) or idem_allowed or dup_guarded:
            body, too_large = await self._read_body(receive, max_body)
            if too_large:
                await self._reject(
                    send, 413, "RequestTooLargeError", "Le contenu envoyé est trop volumineux."
                )
                return
            receive = self._replay(body)

        # 3. Débit.
        if config.rate_limit_enabled:
            retry = config.limiter.hit(f"global|{owner}", config.global_per_minute, 60)
            for rule in rules:
                if retry:
                    break
                retry = config.limiter.hit(f"{rule.name}|ip|{ip}", rule.limit, rule.window_seconds)
                identifier = _identifier(body, rule.identifier_fields)
                if not retry and identifier:
                    retry = config.limiter.hit(
                        f"{rule.name}|id|{identifier}", rule.limit, rule.window_seconds
                    )
            if retry:
                logger.warning(
                    "rate limited",
                    extra={"path": path, "client": _anon(owner), "retry_after": retry},
                )
                await self._reject(
                    send,
                    429,
                    "TooManyRequestsError",
                    f"Trop de tentatives en peu de temps. Réessayez dans {retry} secondes.",
                    retry_after=retry,
                )
                return

        # 4. Anti-robots.
        if form_guarded and config.form_guard_enforced:
            check = config.signer.check(
                headers.get(FORM_TOKEN_HEADER), headers.get(FORM_TRAP_HEADER)
            )
            if check is not FormCheck.OK:
                logger.warning(
                    "form guard rejection",
                    extra={"path": path, "client": _anon(ip), "reason": check.value},
                )
                if check is FormCheck.TOO_FAST:
                    await self._reject(
                        send,
                        400,
                        "FormTooFastError",
                        "Formulaire envoyé trop vite. Patientez quelques secondes puis réessayez.",
                    )
                else:
                    # Rejet discret : rien n'indique au robot ce qui l'a trahi.
                    await self._reject(
                        send,
                        400,
                        "SubmissionRejectedError",
                        "Votre envoi n'a pas pu être traité. Rechargez la page puis réessayez.",
                    )
                return

        # 5. Double soumission.
        if idem_key is not None and idem_allowed:
            if not IDEMPOTENCY_KEY_RE.fullmatch(idem_key):
                await self._reject(
                    send, 400, "InvalidIdempotencyKeyError", "En-tête Idempotency-Key invalide."
                )
                return
        if (idem_allowed and idem_key) or dup_guarded:
            await self._submission(
                scope, receive, send, config, path, owner, body, idem_key if idem_allowed else None, dup_guarded
            )
            return

        # 6. Contenus publics.
        if method == "GET" and PUBLIC_CACHEABLE.fullmatch(path):
            await self._public(scope, receive, send, config, path, headers)
            return

        await self._call_and_invalidate(scope, receive, send, method, config)

    # ─── étapes ───

    def _user_id(self, headers: Headers, config: GuardConfig) -> str | None:
        auth = headers.get("authorization", "")
        if not auth.lower().startswith("bearer ") or config.decode_user is None:
            return None
        try:
            return config.decode_user(auth[7:].strip())
        except Exception:
            return None

    async def _read_body(self, receive: Receive, limit: int) -> tuple[bytes, bool]:
        chunks: list[bytes] = []
        size = 0
        while True:
            message = await receive()
            if message["type"] == "http.disconnect":
                break
            chunk = message.get("body", b"")
            size += len(chunk)
            if size > limit:
                return b"", True
            chunks.append(chunk)
            if not message.get("more_body", False):
                break
        return b"".join(chunks), False

    def _replay(self, body: bytes) -> Receive:
        sent = False

        async def receive() -> Message:
            nonlocal sent
            if not sent:
                sent = True
                return {"type": "http.request", "body": body, "more_body": False}
            return {"type": "http.disconnect"}

        return receive

    async def _call_and_invalidate(
        self, scope: Scope, receive: Receive, send: Send, method: str, config: GuardConfig
    ) -> None:
        status = 0

        async def watch(message: Message) -> None:
            nonlocal status
            if message["type"] == "http.response.start":
                status = message["status"]
            await send(message)

        await self.app(scope, receive, watch)
        if method in {"POST", "PUT", "PATCH", "DELETE"} and 200 <= status < 300:
            config.cache.clear()

    async def _public(
        self, scope: Scope, receive: Receive, send: Send, config: GuardConfig, path: str, headers: Headers
    ) -> None:
        query = scope.get("query_string", b"").decode()
        key = f"{path}?{query}"
        anonymous = "authorization" not in headers
        cache_header = f"public, max-age={max(config.public_cache_seconds, 0)}, stale-while-revalidate=120"
        cached = config.cache.get(key) if anonymous and config.public_cache_seconds > 0 else None
        if cached is None:
            captured = await self._capture(scope, receive)
            status, response_headers, body = captured
            content_type = response_headers.get("content-type", "application/json")
            if status != 200:
                await self._forward(send, status, response_headers.raw, body)
                return
            etag = '"' + hashlib.sha1(body, usedforsecurity=False).hexdigest()[:20] + '"'
            cached = _CachedResponse(
                body, etag, content_type, time.monotonic() + config.public_cache_seconds
            )
            if anonymous and config.public_cache_seconds > 0 and len(body) <= MAX_STORED_RESPONSE:
                config.cache.put(key, cached)
        extra = [
            (b"etag", cached.etag.encode()),
            (b"cache-control", cache_header.encode() if anonymous else b"private, no-cache"),
            (b"vary", b"Authorization, Accept-Encoding"),
        ]
        if headers.get("if-none-match") == cached.etag:
            await send({"type": "http.response.start", "status": 304, "headers": extra})
            await send({"type": "http.response.body", "body": b""})
            return
        await self._forward(
            send,
            200,
            [(b"content-type", cached.content_type.encode()), *extra],
            cached.body,
        )

    async def _capture(self, scope: Scope, receive: Receive) -> tuple[int, Headers, bytes]:
        status = 500
        raw: list[tuple[bytes, bytes]] = []
        chunks: list[bytes] = []

        async def capture(message: Message) -> None:
            nonlocal status, raw
            if message["type"] == "http.response.start":
                status = message["status"]
                raw = list(message.get("headers", []))
            elif message["type"] == "http.response.body":
                chunks.append(message.get("body", b""))

        await self.app(scope, receive, capture)
        return status, Headers(raw=raw), b"".join(chunks)

    async def _forward(
        self, send: Send, status: int, raw: list[tuple[bytes, bytes]], body: bytes
    ) -> None:
        headers = [(k, v) for k, v in raw if k.lower() != b"content-length"]
        headers.append((b"content-length", str(len(body)).encode()))
        await send({"type": "http.response.start", "status": status, "headers": headers})
        await send({"type": "http.response.body", "body": body})

    async def _submission(
        self,
        scope: Scope,
        receive: Receive,
        send: Send,
        config: GuardConfig,
        path: str,
        owner: str,
        body: bytes,
        idem_key: str | None,
        dup_guarded: bool,
    ) -> None:
        now = datetime.now(UTC)
        fingerprint = hashlib.sha256(body).hexdigest()
        idem = (
            hashlib.sha256(f"idem|{owner}|{path}|{idem_key}".encode()).hexdigest()
            if idem_key
            else None
        )
        dup = (
            hashlib.sha256(f"dup|{owner}|{path}|{_canonical(body)}".encode()).hexdigest()
            if dup_guarded
            else None
        )

        def reserve() -> tuple[str, Any]:
            with self._session(scope) as db:
                store = SubmissionStore(db)
                if idem:
                    record = store.get(idem, now)
                    if record is not None:
                        if record.fingerprint != fingerprint:
                            return "mismatch", None
                        if record.status_code is None:
                            return "pending", None
                        return "replay", record
                if dup and not store.try_reserve(
                    dup, "dup", fingerprint, now, now + timedelta(seconds=config.duplicate_window_seconds)
                ):
                    return "duplicate", None
                if idem and not store.try_reserve(
                    idem, "idem", fingerprint, now, now + timedelta(seconds=config.idempotency_ttl_seconds)
                ):
                    if dup:
                        store.delete(dup)
                    return "pending", None
                return "go", None

        outcome, record = await run_in_threadpool(reserve)
        if outcome == "replay":
            await self._forward(
                send,
                record.status_code,
                [
                    (b"content-type", (record.content_type or "application/json").encode()),
                    (b"idempotent-replayed", b"true"),
                ],
                (record.body or "").encode(),
            )
            return
        if outcome == "mismatch":
            await self._reject(
                send,
                422,
                "IdempotencyKeyReusedError",
                "Cette clé d'envoi a déjà servi pour un contenu différent. Rechargez le formulaire.",
            )
            return
        if outcome == "pending":
            await self._reject(
                send,
                409,
                "SubmissionInProgressError",
                "Votre envoi précédent est encore en cours de traitement. Patientez un instant.",
                retry_after=2,
            )
            return
        if outcome == "duplicate":
            logger.info("duplicate submission", extra={"path": path, "client": _anon(owner)})
            minutes = max(1, round(config.duplicate_window_seconds / 60))
            await self._reject(
                send,
                409,
                "DuplicateSubmissionError",
                "Vous avez déjà envoyé exactement ce contenu il y a moins de "
                f"{minutes} minute{'s' if minutes > 1 else ''} : il a bien été enregistré, "
                "inutile de le renvoyer.",
            )
            return

        try:
            status, response_headers, response_body = await self._capture(scope, receive)
        except BaseException:
            await run_in_threadpool(self._release, scope, [k for k in (idem, dup) if k])
            raise

        if 200 <= status < 300:
            config.cache.clear()
            content_type = response_headers.get("content-type")
            stored: str | None = None
            if len(response_body) <= MAX_STORED_RESPONSE:
                try:
                    stored = response_body.decode()
                except UnicodeDecodeError:
                    stored = None

            def finish() -> None:
                with self._session(scope) as db:
                    store = SubmissionStore(db)
                    if idem:
                        if stored is None:
                            store.delete(idem)
                        else:
                            store.complete(idem, status, content_type, stored)
                    if dup:
                        store.complete(dup, status, None, None)

            await run_in_threadpool(finish)
        else:
            await run_in_threadpool(self._release, scope, [k for k in (idem, dup) if k])

        raw = [(k, v) for k, v in response_headers.raw]
        await self._forward(send, status, raw, response_body)

    def _release(self, scope: Scope, keys: list[str]) -> None:
        with self._session(scope) as db:
            store = SubmissionStore(db)
            for key in keys:
                store.delete(key)
