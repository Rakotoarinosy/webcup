"""F90 : explication simple d'un passage administratif, à la demande."""

import pytest

from src.domain.virtual_assistant import GlossaryTerm, PlainExplanation
from src.features.virtual_assistant.use_cases import explain_simply

PASSAGE = (
    "Toute demande d'occupation du domaine public doit être adressée   à la mairie\n"
    "au moins quinze jours avant la date prévue, accompagnée d'un justificatif de domicile."
)


class FakeSimplifier:
    def __init__(self, explanation: PlainExplanation) -> None:
        self.explanation = explanation
        self.received: str | None = None

    def simplify(self, passage: str) -> PlainExplanation:
        self.received = passage
        return self.explanation


def test_sends_a_normalized_passage_and_cleans_the_answer() -> None:
    simplifier = FakeSimplifier(
        PlainExplanation(
            summary="  Pour utiliser la rue ou le trottoir, demandez l'accord de la mairie.  ",
            key_points=(" Faites la demande 15 jours avant. ", "  ", "Joignez un justificatif."),
        )
    )

    explanation = explain_simply(PASSAGE, simplifier)

    assert simplifier.received is not None and "  " not in simplifier.received
    assert "\n" not in simplifier.received
    assert (
        explanation.summary
        == "Pour utiliser la rue ou le trottoir, demandez l'accord de la mairie."
    )
    assert explanation.key_points == (
        "Faites la demande 15 jours avant.",
        "Joignez un justificatif.",
    )


def test_keeps_only_glossary_terms_found_in_the_passage() -> None:
    simplifier = FakeSimplifier(
        PlainExplanation(
            summary="Résumé.",
            terms=(
                GlossaryTerm("domaine public", "Les rues, places et trottoirs de la ville."),
                GlossaryTerm("Domaine public", "Doublon."),
                GlossaryTerm("arrêté municipal", "Inventé : absent du passage."),
                GlossaryTerm("justificatif de domicile", " "),
            ),
        )
    )

    explanation = explain_simply(PASSAGE, simplifier)

    assert explanation.terms == (
        GlossaryTerm("domaine public", "Les rues, places et trottoirs de la ville."),
    )


def test_caps_the_number_of_key_points() -> None:
    simplifier = FakeSimplifier(
        PlainExplanation(summary="Résumé.", key_points=tuple(f"Point {i}" for i in range(9)))
    )

    assert len(explain_simply(PASSAGE, simplifier).key_points) == 5


def test_rejects_an_empty_explanation() -> None:
    with pytest.raises(ValueError):
        explain_simply(PASSAGE, FakeSimplifier(PlainExplanation(summary="   ")))
