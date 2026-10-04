"""Accueil et langues : règles pures (langue, traduction, premiers pas, orientation)."""

from datetime import UTC, datetime

from src.domain.citizen_request import RequestCategory
from src.domain.i18n import Language, parse_accept_language, resolve_language
from src.domain.municipal_content import (
    ContentTranslation,
    MunicipalService,
    TranslatableContent,
    clean_translation_fields,
    localize,
)
from src.domain.onboarding import (
    OnboardingFacts,
    OnboardingHint,
    OnboardingProgress,
    OnboardingStep,
    build_view,
)
from src.domain.orientation import (
    OrientationAction,
    OrientationChannel,
    OrientationNeed,
    OrientationSituation,
    recommend,
)

NOW = datetime(2026, 10, 4, tzinfo=UTC)


def service(sid: str, name: str, category: str, address: str | None = None) -> MunicipalService:
    return MunicipalService(
        sid, name, category, "Description", "Mairie", "8h-16h", "pi-x", 0, False, 0, True, address
    )


def test_accept_language_picks_the_best_supported_language() -> None:
    assert parse_accept_language("de-DE, mg;q=0.9, fr;q=0.8") is Language.MG
    assert parse_accept_language("en-GB,en;q=0.9") is Language.EN
    assert parse_accept_language("de, it") is None
    assert parse_accept_language(None) is None


def test_explicit_lang_wins_and_french_is_the_fallback() -> None:
    assert resolve_language("en", "mg") is Language.EN
    assert resolve_language("xx", "mg") is Language.MG
    assert resolve_language(None, None) is Language.FR


def test_localize_replaces_translated_fields_and_falls_back_field_by_field() -> None:
    base = service("s1", "État civil", "Administration")
    translation = ContentTranslation(
        TranslatableContent.SERVICE, "s1", Language.EN, {"name": "Civil registry"}
    )

    english = localize(base, Language.EN, translation)

    assert english.name == "Civil registry"
    assert english.description == "Description"  # non traduit : français
    assert english.language is Language.EN and english.translation_available


def test_localize_without_translation_returns_french_flagged_unavailable() -> None:
    result = localize(service("s1", "État civil", "Administration"), Language.MG, None)

    assert result.name == "État civil"
    assert result.language is Language.FR
    assert result.translation_available is False


def test_clean_translation_fields_ignores_unknown_and_blank_fields() -> None:
    cleaned = clean_translation_fields(
        TranslatableContent.PUBLICATION, {"title": " Hello ", "summary": "  ", "name": "x"}
    )
    assert cleaned == {"title": "Hello"}


def test_onboarding_view_derives_steps_done_elsewhere() -> None:
    progress = OnboardingProgress("u1").complete(OnboardingStep.PROFILE, NOW)
    view = build_view(progress, OnboardingFacts(language_chosen=True, has_request=False))

    assert dict(view.steps) == {
        OnboardingStep.PROFILE: True,
        OnboardingStep.LANGUAGE: True,
        OnboardingStep.FIND_SERVICE: False,
        OnboardingStep.FIRST_REQUEST: False,
    }
    assert view.completed_count == 2 and not view.is_complete


def test_onboarding_hints_are_remembered() -> None:
    progress = OnboardingProgress("u1").see(OnboardingHint.MY_REQUESTS, NOW)
    assert OnboardingHint.MY_REQUESTS in progress.seen_hints


def test_new_resident_gets_account_papers_and_health_services() -> None:
    services = [
        service("civil", "État civil", "Administration"),
        service("road", "Voirie et mobilité", "Voirie"),
        service("health", "Centre de santé", "Santé"),
    ]

    result = recommend(OrientationSituation.NEW_RESIDENT, (), OrientationChannel.ONLINE, services)

    assert {item.service.id for item in result.services} == {"civil", "health"}
    actions = [item.action for item in result.actions]
    assert actions[0] is OrientationAction.SET_UP_ACCOUNT
    assert OrientationAction.READ_NEWS in actions
    assert OrientationAction.CONTACT_SERVICE in actions


def test_neighbourhood_issue_proposes_a_prefilled_request() -> None:
    result = recommend(
        OrientationSituation.NEIGHBOURHOOD_ISSUE,
        (OrientationNeed.WATER,),
        OrientationChannel.IN_PERSON,
        [service("water", "Eau et assainissement", "Eau", address="Rue 1")],
    )

    report = [a for a in result.actions if a.action is OrientationAction.REPORT_ISSUE]
    assert report[0].category is RequestCategory.WATER
    assert any(a.action is OrientationAction.VISIT_SERVICE for a in result.actions)
    assert any(a.action is OrientationAction.ASK_AGENT for a in result.actions)


def test_no_matching_service_points_to_the_catalogue() -> None:
    result = recommend(
        OrientationSituation.HEALTH, (), OrientationChannel.ONLINE, [service("r", "Voirie", "V")]
    )
    assert result.services == ()
    assert result.actions[-1].action is OrientationAction.BROWSE_SERVICES
