"""« Par où commencer ? » (F72) : orientation d'un nouvel habitant en 3 questions. Python pur.

La recommandation s'appuie sur le catalogue réel des services municipaux (catégorie et nom
en français, la langue de référence) : un service ajouté par la mairie est proposé sans
modifier ce module, dès que son intitulé correspond à un besoin.
"""

from dataclasses import dataclass
from enum import StrEnum

from src.domain.citizen_request import RequestCategory
from src.domain.municipal_content import MunicipalService


class OrientationSituation(StrEnum):
    """Question 1 : quelle est votre situation ?"""

    NEW_RESIDENT = "new_resident"
    NEIGHBOURHOOD_ISSUE = "neighbourhood_issue"
    DOCUMENT = "document"
    HEALTH = "health"
    INFORMATION = "information"


class OrientationNeed(StrEnum):
    """Question 2 : de quoi avez-vous besoin ? (plusieurs réponses possibles)"""

    PAPERS = "papers"
    WATER = "water"
    ROADS = "roads"
    LIGHTING = "lighting"
    WASTE = "waste"
    SAFETY = "safety"
    GREEN_SPACES = "green_spaces"
    HEALTH = "health"
    NEWS = "news"


class OrientationChannel(StrEnum):
    """Question 3 : comment préférez-vous être aidé ?"""

    ONLINE = "online"
    IN_PERSON = "in_person"


class OrientationAction(StrEnum):
    """Démarche proposée ; le frontend en fait un lien direct."""

    SET_UP_ACCOUNT = "set_up_account"
    REPORT_ISSUE = "report_issue"
    CONTACT_SERVICE = "contact_service"
    VISIT_SERVICE = "visit_service"
    READ_NEWS = "read_news"
    ASK_AGENT = "ask_agent"
    BROWSE_SERVICES = "browse_services"


# Mots repérés dans « catégorie + nom » du service (minuscules, français).
NEED_KEYWORDS: dict[OrientationNeed, tuple[str, ...]] = {
    OrientationNeed.PAPERS: ("civil", "administration", "document", "papier", "mairie"),
    OrientationNeed.WATER: ("eau", "assainissement"),
    OrientationNeed.ROADS: ("voirie", "mobilité", "route"),
    OrientationNeed.LIGHTING: ("éclairage", "voirie"),
    OrientationNeed.WASTE: ("déchet", "propreté", "environnement"),
    OrientationNeed.SAFETY: ("sécurité", "police"),
    OrientationNeed.GREEN_SPACES: ("espaces verts", "jardin", "environnement"),
    OrientationNeed.HEALTH: ("santé", "médical"),
    OrientationNeed.NEWS: (),
}

# Besoin qui se traite par une demande citoyenne : type de demande à pré-sélectionner.
NEED_REQUEST_CATEGORY: dict[OrientationNeed, RequestCategory] = {
    OrientationNeed.WATER: RequestCategory.WATER,
    OrientationNeed.ROADS: RequestCategory.ROADS,
    OrientationNeed.LIGHTING: RequestCategory.PUBLIC_LIGHTING,
    OrientationNeed.WASTE: RequestCategory.WASTE,
    OrientationNeed.SAFETY: RequestCategory.SAFETY,
    OrientationNeed.GREEN_SPACES: RequestCategory.GREEN_SPACES,
}

# Besoins implicites quand la personne ne coche rien à la question 2.
SITUATION_NEEDS: dict[OrientationSituation, tuple[OrientationNeed, ...]] = {
    OrientationSituation.NEW_RESIDENT: (
        OrientationNeed.PAPERS,
        OrientationNeed.HEALTH,
        OrientationNeed.NEWS,
    ),
    OrientationSituation.NEIGHBOURHOOD_ISSUE: (
        OrientationNeed.ROADS,
        OrientationNeed.WATER,
        OrientationNeed.LIGHTING,
        OrientationNeed.WASTE,
    ),
    OrientationSituation.DOCUMENT: (OrientationNeed.PAPERS,),
    OrientationSituation.HEALTH: (OrientationNeed.HEALTH,),
    OrientationSituation.INFORMATION: (OrientationNeed.NEWS,),
}

MAX_SERVICES = 4


@dataclass(frozen=True)
class RecommendedService:
    service: MunicipalService
    needs: tuple[OrientationNeed, ...]


@dataclass(frozen=True)
class RecommendedAction:
    action: OrientationAction
    category: RequestCategory | None = None
    service_id: str | None = None


@dataclass(frozen=True)
class Recommendation:
    needs: tuple[OrientationNeed, ...]
    services: tuple[RecommendedService, ...]
    actions: tuple[RecommendedAction, ...]


def effective_needs(
    situation: OrientationSituation, needs: tuple[OrientationNeed, ...]
) -> tuple[OrientationNeed, ...]:
    chosen = needs or SITUATION_NEEDS[situation]
    return tuple(need for need in OrientationNeed if need in chosen)


def matching_needs(
    service: MunicipalService, needs: tuple[OrientationNeed, ...]
) -> tuple[OrientationNeed, ...]:
    text = f"{service.category} {service.name}".lower()
    return tuple(need for need in needs if any(word in text for word in NEED_KEYWORDS[need]))


def recommend(
    situation: OrientationSituation,
    needs: tuple[OrientationNeed, ...],
    channel: OrientationChannel,
    services: list[MunicipalService],
) -> Recommendation:
    wanted = effective_needs(situation, needs)

    matches = [
        RecommendedService(service, matched)
        for service in services
        if (matched := matching_needs(service, wanted))
    ]
    in_person = channel is OrientationChannel.IN_PERSON
    matches.sort(
        key=lambda item: (
            -len(item.needs),
            # À l'accueil physique : d'abord les services dont l'adresse est connue.
            0 if not in_person or item.service.address else 1,
            item.service.display_order,
            item.service.name,
        )
    )
    chosen = tuple(matches[:MAX_SERVICES])

    actions: list[RecommendedAction] = []
    if situation is OrientationSituation.NEW_RESIDENT:
        actions.append(RecommendedAction(OrientationAction.SET_UP_ACCOUNT))
    for need in wanted:
        category = NEED_REQUEST_CATEGORY.get(need)
        if category is not None:
            actions.append(RecommendedAction(OrientationAction.REPORT_ISSUE, category=category))
    if chosen:
        first = chosen[0].service
        visit = in_person and first.address
        actions.append(
            RecommendedAction(
                OrientationAction.VISIT_SERVICE if visit else OrientationAction.CONTACT_SERVICE,
                service_id=first.id,
            )
        )
    if OrientationNeed.NEWS in wanted:
        actions.append(RecommendedAction(OrientationAction.READ_NEWS))
    if in_person:
        actions.append(RecommendedAction(OrientationAction.ASK_AGENT))
    if not chosen:
        actions.append(RecommendedAction(OrientationAction.BROWSE_SERVICES))
    return Recommendation(needs=wanted, services=chosen, actions=tuple(actions))
