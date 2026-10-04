import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal } from '@angular/core';

import { PlainExplanationView } from './plain-explanation';
import { MIN_PASSAGE_LENGTH, PlainExplanation, PlainLanguageService, explanationErrorMessage, toPlainText } from './plain-language.service';

let nextId = 0;

/**
 * Bouton « Expliquer plus simplement » placé sous un texte officiel (F90).
 * L'explication s'ouvre sous le texte, sans le remplacer, et seulement si l'habitant la demande.
 */
@Component({
    selector: 'app-explain-simply',
    imports: [PlainExplanationView],
    template: `
        @if (passage().length >= minLength) {
            <button
                type="button"
                class="inline-flex items-center gap-2 rounded border border-surface px-3 py-1.5 text-sm font-medium text-primary hover:bg-emphasis focus-visible:outline-2"
                [attr.aria-expanded]="open()"
                [attr.aria-controls]="panelId"
                [disabled]="loading()"
                (click)="toggle()"
            >
                <i class="pi" [class.pi-lightbulb]="!open()" [class.pi-times]="open()" aria-hidden="true"></i>
                {{ open() ? 'Masquer l’explication' : 'Expliquer plus simplement' }}
                @if (subject()) {
                    <span class="sr-only"> : {{ subject() }}</span>
                }
            </button>
            <div [id]="panelId" aria-live="polite">
                @if (open()) {
                    <section class="mt-3 rounded-lg border-l-4 border-primary bg-emphasis p-4" [attr.aria-label]="'Explication simple' + (subject() ? ' : ' + subject() : '')">
                        @if (loading()) {
                            <p class="m-0" role="status"><i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>Préparation d’une explication simple…</p>
                        } @else if (error(); as message) {
                            <p class="m-0" role="alert">{{ message }}</p>
                            <button type="button" class="mt-2 text-sm text-primary underline" (click)="load()">Réessayer</button>
                        } @else if (explanation(); as value) {
                            <app-plain-explanation [explanation]="value" />
                        }
                    </section>
                }
            </div>
        }
    `
})
export class ExplainSimply {
    private readonly plainLanguage = inject(PlainLanguageService);

    /** Texte à expliquer ; le HTML (publications) est réduit à son texte. */
    readonly text = input.required<string>();
    /** Ce qui est expliqué (titre, nom du service), pour les lecteurs d'écran. */
    readonly subject = input<string>('');

    readonly minLength = MIN_PASSAGE_LENGTH;
    readonly panelId = `explain-simply-${nextId++}`;
    readonly passage = computed(() => toPlainText(this.text()));
    readonly open = signal(false);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly explanation = signal<PlainExplanation | null>(null);

    constructor() {
        // Un autre texte : l'ancienne explication ne s'applique plus.
        effect(() => {
            this.passage();
            this.open.set(false);
            this.explanation.set(null);
            this.error.set(null);
        });
    }

    toggle(): void {
        this.open.update((open) => !open);
        if (this.open() && !this.explanation()) this.load();
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.plainLanguage.explain(this.passage()).subscribe({
            next: (explanation) => {
                this.explanation.set(explanation);
                this.loading.set(false);
            },
            error: (error: HttpErrorResponse) => {
                this.error.set(explanationErrorMessage(error.status));
                this.loading.set(false);
            }
        });
    }
}
