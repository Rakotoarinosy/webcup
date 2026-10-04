"""Règles métier de la participation : phases d'une consultation, étapes d'une idée."""

from datetime import UTC, datetime, timedelta

import pytest

from src.domain.participation import (
    Consultation,
    ConsultationKind,
    ConsultationNotClosedError,
    ConsultationPhase,
    ConsultationResponse,
    Idea,
    IdeaStatus,
    IdeaTheme,
    IdeaTransitionError,
    IdeaVisibility,
    InvalidConsultationError,
    MotivatedResponseRequiredError,
    tally,
)

NOW = datetime(2026, 10, 4, 12, tzinfo=UTC)


def _vote(**overrides: object) -> Consultation:
    data: dict[str, object] = {
        "id": "c",
        "title": "Priorité",
        "question": "Quoi d'abord ?",
        "kind": ConsultationKind.VOTE,
        "options": ["A", "B"],
        "opens_at": NOW - timedelta(days=1),
        "closes_at": NOW + timedelta(days=1),
        "created_at": NOW,
        "updated_at": NOW,
        **overrides,
    }
    return Consultation(**data)  # type: ignore[arg-type]


def test_consultation_phases_follow_the_calendar_then_the_decision() -> None:
    vote = _vote()
    assert vote.phase(NOW - timedelta(days=2)) is ConsultationPhase.UPCOMING
    assert vote.phase(NOW) is ConsultationPhase.OPEN
    with pytest.raises(ConsultationNotClosedError):
        vote.decide("On verra plus tard.", "Mairie", NOW)
    vote.close(NOW)
    assert vote.phase(NOW) is ConsultationPhase.CLOSED
    vote.decide("Option A retenue.", "Mairie", NOW)
    assert vote.phase(NOW) is ConsultationPhase.DECIDED


def test_vote_needs_distinct_options_and_valid_choice() -> None:
    with pytest.raises(InvalidConsultationError):
        _vote(options=["A", "a"]).check()
    with pytest.raises(InvalidConsultationError):
        _vote().validate_answer("C", None)
    with pytest.raises(InvalidConsultationError):
        _vote(kind=ConsultationKind.OPINION, options=[]).validate_answer(None, None)


def test_tally_counts_every_option_even_without_votes() -> None:
    vote = _vote()
    answers = [
        ConsultationResponse(
            id=str(i),
            reference="r",
            consultation_id="c",
            user_id=str(i),
            created_at=NOW,
            updated_at=NOW,
            choice="A",
        )
        for i in range(3)
    ]
    results = tally(vote, answers)
    assert results.total == 3
    assert [(o.option, o.count) for o in results.options] == [("A", 3), ("B", 0)]


def test_idea_steps_are_dated_and_decisions_motivated() -> None:
    idea = Idea(
        id="i",
        reference="ID-1",
        user_id="u",
        title="Bancs",
        description="Des bancs.",
        theme=IdeaTheme.LIVING,
        created_at=NOW,
        updated_at=NOW,
    )
    with pytest.raises(MotivatedResponseRequiredError):
        idea.advance(IdeaStatus.REJECTED, None, "Mairie", NOW)
    idea.advance(IdeaStatus.REJECTED, "Budget déjà engagé cette année.", "Mairie", NOW)
    assert idea.response and idea.answered_at == NOW
    with pytest.raises(IdeaTransitionError):
        idea.advance(IdeaStatus.DONE, "Fait.", "Mairie", NOW)
    idea.moderate(IdeaVisibility.PUBLIC, None, NOW)
    assert not idea.can_be_supported  # une idée non retenue ne se soutient plus
