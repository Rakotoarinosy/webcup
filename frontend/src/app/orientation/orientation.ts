import { Component, DestroyRef, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { I18nService } from '@/app/i18n/i18n.service';
import { TranslatePipe } from '@/app/i18n/t.pipe';
import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { OnboardingService } from '@/app/onboarding/onboarding.service';
import { ORIENTATION_CHANNEL_VALUES, ORIENTATION_NEED_VALUES, ORIENTATION_SITUATION_VALUES, OrientationChannel, OrientationNeed, OrientationSituation } from '@/app/shared/api-enums';
import { OrientationResult, OrientationService } from './orientation.service';

export interface ActionLink {
    label: string;
    route: string;
    queryParams?: Record<string, string>;
    icon: string;
}

/**
 * « Par où commencer ? » (F72) : 3 questions, puis les services et démarches utiles avec liens
 * directs. Accessible au visiteur (pages publiques) comme au citoyen connecté, sans réinscription.
 */
@Component({
    selector: 'app-orientation',
    imports: [FormsModule, RouterLink, TranslatePipe],
    templateUrl: './orientation.html'
})
export class Orientation {
    private readonly api = inject(OrientationService);
    private readonly auth = inject(AuthService);
    private readonly i18n = inject(I18nService);
    private readonly onboarding = inject(OnboardingService);
    private readonly navigation = inject(MunicipalNavigation);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);

    readonly situations = ORIENTATION_SITUATION_VALUES;
    readonly needOptions = ORIENTATION_NEED_VALUES;
    readonly channels = ORIENTATION_CHANNEL_VALUES;

    readonly situation = signal<OrientationSituation | null>(null);
    readonly needs = signal<ReadonlySet<OrientationNeed>>(new Set());
    readonly channel = signal<OrientationChannel>('online');
    readonly attempted = signal(false);
    readonly loading = signal(false);
    readonly error = signal(false);
    readonly result = signal<OrientationResult | null>(null);

    readonly isCitizen = computed(() => this.auth.hasRole('citizen'));
    readonly actionLinks = computed(() => {
        const result = this.result();
        return result ? result.actions.map((action) => this.linkFor(action, result)) : [];
    });

    toggleNeed(need: OrientationNeed, checked: boolean): void {
        const next = new Set(this.needs());
        if (checked) next.add(need);
        else next.delete(need);
        this.needs.set(next);
    }

    submit(): void {
        const situation = this.situation();
        this.attempted.set(true);
        if (!situation) {
            afterNextRender(() => document.querySelector<HTMLInputElement>('input[name="orientation-situation"]')?.focus(), { injector: this.injector });
            return;
        }
        this.loading.set(true);
        this.error.set(false);
        this.api
            .recommend(situation, [...this.needs()], this.channel())
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (result) => {
                    this.result.set(result);
                    // Avoir trouvé ses services fait partie des premiers pas (D12).
                    this.onboarding.completeStep('find_service').subscribe({ error: () => undefined });
                    afterNextRender(() => document.getElementById('orientation-results-title')?.focus(), { injector: this.injector });
                },
                error: () => this.error.set(true)
            });
    }

    restart(): void {
        this.result.set(null);
        this.attempted.set(false);
        afterNextRender(() => document.getElementById('orientation-title')?.focus(), { injector: this.injector });
    }

    needsLabel(needs: OrientationNeed[]): string {
        return needs.map((need) => this.i18n.t(`orientation.need.${need}`)).join(', ');
    }

    private linkFor(action: OrientationResult['actions'][number], result: OrientationResult): ActionLink {
        const service = result.services.find((item) => item.service.id === action.service_id)?.service;
        const serviceName = service?.name ?? '';
        switch (action.action) {
            case 'set_up_account':
                return this.auth.isAuthenticated()
                    ? { label: this.i18n.t('orientation.action.set_up_account.user'), route: '/home/profile', icon: 'pi-id-card' }
                    : { label: this.i18n.t('orientation.action.set_up_account.visitor'), route: '/auth/register', icon: 'pi-user-plus' };
            case 'report_issue': {
                const category = action.category ?? 'Autre';
                const label = this.i18n.t('orientation.action.report_issue', { category: this.i18n.tOr(`category.${category}`, category) });
                if (this.isCitizen()) return { label, route: '/home/my-requests', queryParams: { new: '1', category }, icon: 'pi-flag' };
                if (this.auth.isAuthenticated()) return { label, route: this.navigation.path('contact'), icon: 'pi-flag' };
                return { label, route: '/auth/login', queryParams: { returnUrl: `/home/my-requests?new=1&category=${encodeURIComponent(category)}` }, icon: 'pi-flag' };
            }
            case 'contact_service':
                return { label: this.i18n.t('orientation.action.contact_service', { service: serviceName }), route: this.navigation.path('contact'), queryParams: action.service_id ? { service: action.service_id } : undefined, icon: 'pi-envelope' };
            case 'visit_service':
                return { label: this.i18n.t('orientation.action.visit_service', { service: serviceName }), route: this.navigation.path('services'), icon: 'pi-map-marker' };
            case 'read_news':
                return { label: this.i18n.t('orientation.action.read_news'), route: this.navigation.path('publications'), icon: 'pi-megaphone' };
            case 'ask_agent':
                return { label: this.i18n.t('orientation.action.ask_agent'), route: this.navigation.path('services'), icon: 'pi-users' };
            default:
                return { label: this.i18n.t('orientation.action.browse_services'), route: this.navigation.path('services'), icon: 'pi-th-large' };
        }
    }
}
