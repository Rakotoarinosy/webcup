import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { I18nService } from '@/app/i18n/i18n.service';
import { LanguageSwitcher } from '@/app/i18n/language-switcher';
import { TranslatePipe } from '@/app/i18n/t.pipe';
import { PreferencesService } from '@/app/preferences/preferences.service';
import { OnboardingService, OnboardingStep } from './onboarding.service';

interface StepLink {
    route: string;
    queryParams?: Record<string, string>;
}

const STEP_LINKS: Record<OnboardingStep, StepLink | null> = {
    profile: { route: '/home/profile' },
    language: null,
    find_service: { route: '/home/municipal/services' },
    first_request: { route: '/home/my-requests', queryParams: { new: '1' } }
};

/**
 * Checklist « Premiers pas » (D12) affichée au citoyen sur « Mon espace » tant qu'il ne l'a pas
 * masquée : progression enregistrée côté serveur, chaque étape mène directement à l'action.
 */
@Component({
    selector: 'app-getting-started',
    imports: [RouterLink, TranslatePipe, LanguageSwitcher],
    templateUrl: './getting-started.html'
})
export class GettingStarted implements OnInit {
    readonly onboarding = inject(OnboardingService);
    private readonly preferences = inject(PreferencesService);
    private readonly i18n = inject(I18nService);

    readonly progress = this.onboarding.progress;
    readonly links = STEP_LINKS;
    readonly busy = signal(false);
    readonly actionError = signal(false);
    readonly percent = computed(() => {
        const progress = this.progress();
        return progress ? Math.round((progress.completed_count / progress.total) * 100) : 0;
    });

    ngOnInit(): void {
        this.onboarding.ensureLoaded();
    }

    stepKey(step: OnboardingStep, suffix = ''): string {
        return `onboarding.step.${step}${suffix}`;
    }

    markDone(step: OnboardingStep): void {
        this.run(this.onboarding.completeStep(step));
    }

    /** Étape « langue » : confirme la langue affichée (même le français) dans le compte. */
    keepLanguage(): void {
        this.busy.set(true);
        this.preferences
            .saveLanguage(this.i18n.language())
            .pipe(finalize(() => this.busy.set(false)))
            .subscribe({ next: () => this.onboarding.refresh(), error: () => this.actionError.set(true) });
    }

    setDismissed(dismissed: boolean): void {
        this.run(this.onboarding.setDismissed(dismissed));
    }

    private run(action: ReturnType<OnboardingService['setDismissed']> | ReturnType<OnboardingService['completeStep']>): void {
        this.busy.set(true);
        this.actionError.set(false);
        action.pipe(finalize(() => this.busy.set(false))).subscribe({ error: () => this.actionError.set(true) });
    }
}
