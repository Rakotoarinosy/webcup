"""Détection des demandes similaires (F75) : fonctions pures, sans base de données.

Deux demandes parlent probablement du même problème si :
  1. elles ont la même catégorie ;
  2. elles ont été déposées à moins de SIMILARITY_WINDOW d'intervalle ;
  3. elles ne sont pas éloignées : si les deux ont des coordonnées GPS, moins de FAR_KM
     (distance haversine) ; « proches » en dessous de NEAR_KM ;
  4. et leurs textes se recoupent : au moins MIN_SHARED_KEYWORDS mots-clés communs, ou un seul
     mot-clé commun si le lieu concorde (coordonnées proches ou même voie / quartier).

Mots-clés : titre + description, en minuscules, sans accents, sans mots vides français,
avec un pluriel simple ramené au singulier (« lampadaires » → « lampadaire »).
"""

import re
import unicodedata
from collections.abc import Iterable
from dataclasses import dataclass
from datetime import datetime, timedelta
from functools import lru_cache
from math import asin, cos, radians, sin, sqrt
from typing import Protocol

from src.domain.citizen_request.entities import RequestCategory

SIMILARITY_WINDOW = timedelta(days=30)
NEAR_KM = 0.3
FAR_KM = 2.0
MIN_SHARED_KEYWORDS = 2
MIN_KEYWORD_LENGTH = 3
EARTH_RADIUS_KM = 6371.0

# Mots vides du français, plus les mots trop génériques dans une demande municipale.
FRENCH_STOPWORDS = frozenset(
    [
        "a",
        "ai",
        "aie",
        "aient",
        "aies",
        "ait",
        "alors",
        "as",
        "au",
        "aucun",
        "aucune",
        "aupres",
        "aussi",
        "autre",
        "autres",
        "aux",
        "avaient",
        "avais",
        "avait",
        "avant",
        "avec",
        "avez",
        "avoir",
        "avons",
        "bon",
        "car",
        "ce",
        "ceci",
        "cela",
        "celle",
        "celles",
        "celui",
        "cependant",
        "ces",
        "cet",
        "cette",
        "ceux",
        "chaque",
        "chez",
        "ci",
        "comme",
        "comment",
        "dans",
        "de",
        "des",
        "depuis",
        "devant",
        "doit",
        "donc",
        "dont",
        "du",
        "elle",
        "elles",
        "en",
        "encore",
        "entre",
        "est",
        "et",
        "etaient",
        "etais",
        "etait",
        "etant",
        "ete",
        "etre",
        "eu",
        "eux",
        "fait",
        "faire",
        "fois",
        "font",
        "hors",
        "ici",
        "il",
        "ils",
        "je",
        "jusqu",
        "la",
        "le",
        "les",
        "leur",
        "leurs",
        "lui",
        "ma",
        "mais",
        "me",
        "meme",
        "mes",
        "moi",
        "moins",
        "mon",
        "ne",
        "ni",
        "non",
        "nos",
        "notre",
        "nous",
        "on",
        "ont",
        "ou",
        "par",
        "parce",
        "pas",
        "peu",
        "peut",
        "plus",
        "pour",
        "pourquoi",
        "quand",
        "que",
        "quel",
        "quelle",
        "quelles",
        "quels",
        "qui",
        "quoi",
        "sa",
        "sans",
        "se",
        "sera",
        "ses",
        "seulement",
        "si",
        "sien",
        "son",
        "sont",
        "sous",
        "sur",
        "ta",
        "tandis",
        "te",
        "tes",
        "toi",
        "ton",
        "tous",
        "tout",
        "toute",
        "toutes",
        "tres",
        "trop",
        "tu",
        "un",
        "une",
        "vers",
        "via",
        "voici",
        "voila",
        "vos",
        "votre",
        "vous",
        "deja",
        "depuis",
        "apres",
        "probleme",
        "problemes",
        "merci",
        "bonjour",
        "svp",
        "urgent",
        "urgence",
        "signale",
        "signaler",
        "signalement",
        "demande",
        "depuis",
        "jours",
        "semaine",
        "semaines",
        "mois",
        "hier",
        "aujourd",
        "hui",
        "matin",
        "soir",
        "nuit",
        "encore",
        "toujours",
        "plusieurs",
    ]
)
# Mots du lieu trop communs pour rapprocher deux adresses.
LOCATION_STOPWORDS = frozenset(
    [
        "rue",
        "avenue",
        "av",
        "boulevard",
        "bd",
        "route",
        "rte",
        "chemin",
        "impasse",
        "allee",
        "place",
        "quartier",
        "lot",
        "cite",
        "residence",
        "pres",
        "face",
        "cote",
        "angle",
        "carrefour",
        "niveau",
        "entree",
        "sortie",
        "centre",
        "ville",
        "commune",
    ]
)

_WORD = re.compile(r"[a-z0-9]+")


def strip_accents(text: str) -> str:
    decomposed = unicodedata.normalize("NFKD", text)
    return "".join(char for char in decomposed if not unicodedata.combining(char))


def _singular(word: str) -> str:
    if len(word) > 4 and word.endswith("aux"):
        return word[:-3] + "al"
    if len(word) > MIN_KEYWORD_LENGTH and word[-1] in "sx":
        return word[:-1]
    return word


def keywords(text: str, *, location: bool = False) -> frozenset[str]:
    """Mots significatifs d'un texte, normalisés (casse, accents, pluriel simple).

    `location` : écarte aussi les mots trop communs d'une adresse (rue, quartier…)."""
    return _keywords(text, location)


@lru_cache(maxsize=8192)
def _keywords(text: str, location: bool) -> frozenset[str]:
    stop = FRENCH_STOPWORDS | LOCATION_STOPWORDS if location else FRENCH_STOPWORDS
    words = _WORD.findall(strip_accents(text.lower()))
    return frozenset(
        _singular(word)
        for word in words
        if len(word) >= MIN_KEYWORD_LENGTH and not word.isdigit() and word not in stop
    )


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Distance orthodromique entre deux points GPS, en kilomètres."""
    phi1, phi2 = radians(lat1), radians(lat2)
    d_phi, d_lambda = radians(lat2 - lat1), radians(lon2 - lon1)
    h = sin(d_phi / 2) ** 2 + cos(phi1) * cos(phi2) * sin(d_lambda / 2) ** 2
    return 2 * EARTH_RADIUS_KM * asin(min(1.0, sqrt(h)))


class Comparable(Protocol):
    """Ce dont la comparaison a besoin : une demande enregistrée ou un brouillon en cours de saisie."""

    @property
    def id(self) -> str: ...
    @property
    def title(self) -> str: ...
    @property
    def description(self) -> str: ...
    @property
    def category(self) -> RequestCategory: ...
    @property
    def location(self) -> str: ...
    @property
    def latitude(self) -> float | None: ...
    @property
    def longitude(self) -> float | None: ...
    @property
    def created_at(self) -> datetime: ...


@dataclass(frozen=True)
class DraftRequest:
    """Demande en cours de saisie, comparée avant d'être envoyée."""

    title: str
    description: str
    category: RequestCategory
    location: str
    created_at: datetime
    latitude: float | None = None
    longitude: float | None = None
    id: str = ""


@dataclass(frozen=True)
class SimilarityMatch:
    request_id: str
    score: int  # 0 à 100, pour classer les rapprochements
    shared_keywords: tuple[str, ...]
    distance_km: float | None
    same_place: bool


def _distance(a: Comparable, b: Comparable) -> float | None:
    if None in (a.latitude, a.longitude, b.latitude, b.longitude):
        return None
    return haversine_km(a.latitude, a.longitude, b.latitude, b.longitude)  # type: ignore[arg-type]


def compare(a: Comparable, b: Comparable) -> SimilarityMatch | None:
    """Rapprochement de `b` vers `a`, ou None si elles ne parlent pas du même problème."""
    if a.id and a.id == b.id:
        return None
    if a.category is not b.category:
        return None
    if abs(a.created_at - b.created_at) > SIMILARITY_WINDOW:
        return None

    distance = _distance(a, b)
    if distance is not None and distance > FAR_KM:
        return None

    shared = keywords(f"{a.title} {a.description}") & keywords(f"{b.title} {b.description}")
    if distance is not None:
        same_place = distance <= NEAR_KM
    else:
        same_place = bool(keywords(a.location, location=True) & keywords(b.location, location=True))

    if len(shared) < MIN_SHARED_KEYWORDS and not (shared and same_place):
        return None

    score = min(100, 20 * len(shared) + (40 if same_place else 0))
    return SimilarityMatch(
        request_id=b.id,
        score=score,
        shared_keywords=tuple(sorted(shared)),
        distance_km=round(distance, 3) if distance is not None else None,
        same_place=same_place,
    )


def find_similar(
    target: Comparable, candidates: Iterable[Comparable], limit: int | None = None
) -> list[SimilarityMatch]:
    """Rapprochements de `target` parmi `candidates`, du plus probable au moins probable."""
    matches = [match for c in candidates if (match := compare(target, c)) is not None]
    matches.sort(key=lambda match: (-match.score, match.request_id))
    return matches[:limit] if limit is not None else matches


def similar_counts(requests: list[Comparable]) -> dict[str, int]:
    """Pour chaque demande, combien d'autres de la liste lui ressemblent (comparaison deux à deux)."""
    counts = {request.id: 0 for request in requests}
    by_category: dict[RequestCategory, list[Comparable]] = {}
    for request in requests:
        by_category.setdefault(request.category, []).append(request)
    for group in by_category.values():
        for index, first in enumerate(group):
            for second in group[index + 1 :]:
                if compare(first, second) is not None:
                    counts[first.id] += 1
                    counts[second.id] += 1
    return counts
