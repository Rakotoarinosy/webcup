import { Component, inject, input, signal } from '@angular/core';

import { AuthService } from '@/app/auth/auth.service';
import { OnboardingService } from '@/app/onboarding/onboarding.service';
import { PreferencesService } from '@/app/preferences/preferences.service';
import { I18nService, LANGUAGES, Language, isLanguage } from './i18n.service';
import { TranslatePipe } from './t.pipe';

let nextId = 0;

/**
 * Sélecteur de langue (D14) : liste native, libellé associé, langue de chaque option déclarée (lang)
 * pour les lecteurs d'écran. Mémorisé sur l'appareil, et dans le compte si l'utilisateur est connecté.
 */
@Component({
    selector: 'app-language-switcher',
    imports: [TranslatePipe],
    template: `
        <div class="language-switcher" [class.compact]="compact()">
            <label [for]="id" [class.sr-only]="compact()"><i class="pi pi-language mr-1" aria-hidden="true"></i>{{ 'language.label' | t }}</label>
            <select [id]="id" [value]="i18n.language()" [attr.aria-describedby]="id + '-status'" (change)="choose($any($event.target).value)">
                @for (option of languages; track option.code) {
                    <option [value]="option.code" [attr.lang]="option.code" [selected]="option.code === i18n.language()">{{ option.label }}</option>
                }
            </select>
            <span [id]="id + '-status'" class="sr-only" role="status">{{ announcement() }}</span>
        </div>
    `,
    styles: [
        `
            .language-switcher {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
            }
            label {
                font-size: 0.875rem;
                font-weight: 600;
            }
            select {
                border: 1px solid var(--surface-border, #d1d5db);
                border-radius: 0.5rem;
                background: var(--surface-card, transparent);
                color: inherit;
                padding: 0.4rem 0.6rem;
                font: inherit;
                font-size: 0.875rem;
            }
            select:focus-visible {
                outline: 2px solid var(--p-primary-color, #059669);
                outline-offset: 2px;
            }
        `
    ]
})
export class LanguageSwitcher {
    readonly i18n = inject(I18nService);
    private readonly auth = inject(AuthService);
    private readonly preferences = inject(PreferencesService);
    private readonly onboarding = inject(OnboardingService);

    /** Libellé masqué visuellement (barre du haut) mais toujours lu par les lecteurs d'écran. */
    readonly compact = input(false);
    readonly languages = LANGUAGES;
    readonly id = `language-switcher-${nextId++}`;
    readonly announcement = signal('');

    choose(value: string): void {
        if (!isLanguage(value)) return;
        this.i18n.use(value as Language);
        this.announcement.set(this.i18n.t('language.changed', { language: this.i18n.option().label }));
        if (this.auth.isAuthenticated()) {
            this.preferences.saveLanguage(value).subscribe({ next: () => this.onboarding.refresh(), error: () => undefined });
        }
    }
}
