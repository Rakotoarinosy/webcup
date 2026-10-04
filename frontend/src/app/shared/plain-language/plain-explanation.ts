import { Component, input } from '@angular/core';

import { PlainExplanation } from './plain-language.service';

/** Affichage d'une explication simple : idée principale, points à retenir, mots expliqués. */
@Component({
    selector: 'app-plain-explanation',
    template: `
        @let value = explanation();
        <p class="m-0 leading-relaxed">{{ value.summary }}</p>
        @if (value.key_points.length) {
            <h4 class="mb-1 mt-3 text-sm font-semibold">À retenir</h4>
            <ul class="m-0 list-disc pl-5 leading-relaxed">
                @for (point of value.key_points; track $index) {
                    <li>{{ point }}</li>
                }
            </ul>
        }
        @if (value.terms.length) {
            <h4 class="mb-1 mt-3 text-sm font-semibold">Les mots difficiles</h4>
            <dl class="m-0 grid gap-1">
                @for (term of value.terms; track term.term) {
                    <div>
                        <dt class="inline font-semibold">{{ term.term }} :</dt>
                        <dd class="ml-1 inline">{{ term.definition }}</dd>
                    </div>
                }
            </dl>
        }
        <p class="mb-0 mt-3 text-xs text-muted-color">Explication proposée automatiquement. En cas de doute, le texte officiel fait foi.</p>
    `
})
export class PlainExplanationView {
    readonly explanation = input.required<PlainExplanation>();
}
