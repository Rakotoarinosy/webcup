import { Component, OnInit, computed, effect, inject, input, signal } from '@angular/core';

import { TranslationKey } from '@/app/i18n/fr';
import { TranslatePipe } from '@/app/i18n/t.pipe';
import { OnboardingHint, OnboardingService } from './onboarding.service';

/**
 * Bulle d'aide contextuelle (F35) : courte, non bloquante, fermable au clavier.
 * Elle est enregistrée comme « vue » dès son premier affichage et ne réapparaît plus ensuite.
 */
@Component({
    selector: 'app-onboarding-hint',
    imports: [TranslatePipe],
    template: `
        @if (visible()) {
            <aside class="onboarding-hint" role="note" [attr.aria-labelledby]="'hint-title-' + hint()">
                <i class="pi pi-lightbulb" aria-hidden="true"></i>
                <p class="m-0 flex-1">
                    <strong [id]="'hint-title-' + hint()">{{ 'hint.label' | t }} : </strong>{{ textKey() | t }}
                </p>
                <button type="button" class="hint-close" [attr.aria-label]="'hint.close' | t" (click)="close()"><i class="pi pi-times" aria-hidden="true"></i></button>
            </aside>
        }
    `,
    styles: [
        `
            .onboarding-hint {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                margin-bottom: 1rem;
                padding: 0.75rem 1rem;
                border: 1px solid var(--p-primary-200, #a7f3d0);
                border-left-width: 4px;
                border-left-color: var(--p-primary-color, #059669);
                border-radius: 0.75rem;
                background: var(--p-primary-50, #ecfdf5);
                color: var(--p-primary-900, #064e3b);
            }
            :host-context(.app-dark) .onboarding-hint {
                background: color-mix(in srgb, var(--p-primary-color) 15%, transparent);
                color: inherit;
            }
            .pi-lightbulb {
                margin-top: 0.2rem;
            }
            .hint-close {
                display: grid;
                place-items: center;
                width: 2rem;
                height: 2rem;
                border-radius: 0.5rem;
                color: inherit;
            }
            .hint-close:hover {
                background: color-mix(in srgb, currentColor 10%, transparent);
            }
            .hint-close:focus-visible {
                outline: 2px solid var(--p-primary-color, #059669);
                outline-offset: 2px;
            }
        `
    ]
})
export class OnboardingHintComponent implements OnInit {
    private readonly onboarding = inject(OnboardingService);

    readonly hint = input.required<OnboardingHint>();
    /** Gardée à l'écran pendant cette visite, même après l'enregistrement « vue ». */
    private readonly shown = signal(false);
    private readonly closed = signal(false);

    readonly textKey = computed(() => `hint.${this.hint()}` as TranslationKey);
    readonly visible = computed(() => !this.closed() && this.shown());

    constructor() {
        effect(() => {
            const progress = this.onboarding.progress();
            if (!progress || this.shown() || this.closed()) return;
            if (!progress.seen_hints.includes(this.hint())) {
                this.shown.set(true);
                this.onboarding.markHintSeen(this.hint());
            }
        });
    }

    ngOnInit(): void {
        this.onboarding.ensureLoaded();
    }

    close(): void {
        this.closed.set(true);
    }
}
