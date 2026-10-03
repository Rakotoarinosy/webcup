"""Vérification des ID tokens Google (Google Identity Services)."""

import logging

import requests
from google.auth.exceptions import GoogleAuthError, TransportError
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

from src.domain.user.exceptions import GoogleSignInUnavailableError, InvalidGoogleTokenError
from src.domain.user.ports import GoogleIdentityVerifier, GoogleProfile

logger = logging.getLogger(__name__)


class GoogleIdTokenVerifier(GoogleIdentityVerifier):
    def __init__(self, client_id: str | None) -> None:
        self._client_id = client_id
        # Les certificats de Google changent rarement : le cache HTTP évite un appel réseau
        # (et un point de panne) à chaque connexion.
        self._request = google_requests.Request(session=requests.Session())

    def verify(self, credential: str) -> GoogleProfile:
        if not self._client_id:
            raise GoogleSignInUnavailableError()

        if credential.count(".") != 2:  # un JWT a 3 segments : inutile d'appeler Google sinon
            raise InvalidGoogleTokenError()

        try:
            # Vérifie la signature (certificats Google), l'expiration, l'émetteur et l'audience.
            claims = id_token.verify_oauth2_token(  # type: ignore[no-untyped-call]
                credential, self._request, self._client_id, clock_skew_in_seconds=10
            )
        except TransportError as exc:
            logger.warning("google certificates unreachable", exc_info=exc)
            raise GoogleSignInUnavailableError() from exc
        except (ValueError, GoogleAuthError) as exc:
            raise InvalidGoogleTokenError() from exc

        subject, email = claims.get("sub"), claims.get("email")
        if not isinstance(subject, str) or not isinstance(email, str):
            raise InvalidGoogleTokenError()

        return GoogleProfile(
            subject=subject,
            email=email,
            email_verified=claims.get("email_verified") is True,
            name=claims.get("name") if isinstance(claims.get("name"), str) else None,
            picture=claims.get("picture") if isinstance(claims.get("picture"), str) else None,
        )
