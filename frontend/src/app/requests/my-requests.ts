import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Injector, OnInit, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { I18nService } from '@/app/i18n/i18n.service';
import { I18N_PIPES } from '@/app/i18n/t.pipe';
import { OnboardingHintComponent } from '@/app/onboarding/onboarding-hint';
import { OnboardingService } from '@/app/onboarding/onboarding.service';
import {
    CitizenRequest,
    CitizenRequestPage,
    CitizenRequestQuery,
    REQUEST_CATEGORIES,
    REQUEST_STATUSES,
    RequestCategory,
    RequestEvent,
    RequestStatus,
    eventLabel
} from './request.model';
import { CitizenRequestService } from './request.service';
import { apiErrorMessage } from '@/app/users/user.service';

const PAGE_SIZE = 10;

interface RequestForm {
    title: string;
    description: string;
    category: RequestCategory | null;
    location: string;
}

const EMPTY_FORM: RequestForm = { title: '', description: '', category: null, location: '' };

/** Aide au choix du type : la catégorie détermine le service (institut) qui traitera la demande. */
export const CATEGORY_HINTS: Record<RequestCategory, string> = {
    'Éclairage public': 'Lampadaire éteint, éclairage défaillant',
    Voirie: 'Nid-de-poule, trottoir abîmé, route inondée',
    Eau: 'Fuite, coupure, borne-fontaine',
    Déchets: 'Ordures non ramassées, dépôt sauvage',
    Sécurité: 'Câble à terre, mur dangereux, regard ouvert',
    'Espaces verts': 'Jardin public, arbres, aire de jeux',
    Autre: 'Tout autre problème'
};

@Component({
    selector: 'app-my-requests',
    imports: [FormsModule, RouterLink, ButtonModule, DialogModule, StepperModule, I18N_PIPES, OnboardingHintComponent],
    templateUrl: './my-requests.html'
})
export class MyRequests implements OnInit {
    private readonly requestsApi = inject(CitizenRequestService);
    private readonly auth = inject(AuthService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);
    private readonly i18n = inject(I18nService);
    private readonly onboarding = inject(OnboardingService);

    protected readonly requests = signal<CitizenRequest[]>([]);
    protected readonly total = signal(0);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly searchTerm = signal('');
    protected readonly categoryFilter = signal<RequestCategory | null>(null);
    protected readonly statusFilter = signal<RequestStatus | null>(null);
    protected readonly selectedRequest = signal<CitizenRequest | null>(null);
    protected readonly statusHistory = signal<RequestEvent[]>([]);
    protected readonly historyLoading = signal(false);
    protected readonly historyError = signal<string | null>(null);
    protected readonly eventLabel = eventLabel;
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly detailMode = signal(false);
    protected readonly createDialogVisible = signal(false);
    protected readonly creationStep = signal(1);
    protected readonly createError = signal<string | null>(null);
    protected readonly submitting = signal(false);
    /** Passe à true quand l’étape « Description » a été validée avec des champs vides. */
    protected readonly descriptionAttempted = signal(false);
    protected readonly categories = [...REQUEST_CATEGORIES];
    protected readonly categoryHints = CATEGORY_HINTS;
    protected readonly statuses = [...REQUEST_STATUSES];
    protected form: RequestForm = { ...EMPTY_FORM };

    ngOnInit(): void {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            const id = params.get('id');
            this.detailMode.set(id !== null);
            if (id) {
                this.loadDetail(id);
            } else {
                this.selectedRequest.set(null);
                this.load();
            }
        });
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => {
            if (this.detailMode() || query.get('new') !== '1') return;
            const category = query.get('category');
            this.openCreateDialog(this.categories.includes(category as RequestCategory) ? category as RequestCategory : null);
            void this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
        });
    }

    protected load(page = this.page()): void {
        // Le serveur limite toujours la liste aux demandes du citoyen connecté.
        const query: CitizenRequestQuery = {
            page,
            page_size: PAGE_SIZE,
            sort_by: 'created_at',
            sort_order: 'desc'
        };
        const status = this.statusFilter();
        if (status) query.status = status;
        const category = this.categoryFilter();
        if (category) query.category = category;
        const search = this.searchTerm().trim();
        if (search) query.search = search;

        this.loading.set(true);
        this.error.set(null);
        this.requestsApi
            .list(query)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (result: CitizenRequestPage) => {
                    this.requests.set(result.items);
                    this.total.set(result.total);
                    this.page.set(result.page);
                    this.pages.set(Math.max(1, result.total_pages));
                },
                error: (error: unknown) => this.error.set(apiErrorMessage(error))
            });
    }

    protected filterChanged(status: RequestStatus | null): void {
        this.statusFilter.set(status);
        this.load(1);
    }

    protected categoryChanged(category: RequestCategory | null): void {
        this.categoryFilter.set(category);
        this.load(1);
    }

    protected searchChanged(search: string): void {
        this.searchTerm.set(search);
        this.load(1);
    }

    protected pageBy(offset: number): void {
        this.goToPage(this.page() + offset);
    }

    protected goToPage(page: number): void {
        if (page < 1 || page > this.pages() || page === this.page() || this.loading()) return;
        this.load(page);
    }

    protected pageNumbers(): number[] {
        const total = this.pages();
        const first = Math.max(1, Math.min(this.page() - 2, total - 4));
        return Array.from({ length: Math.min(5, total) }, (_, index) => first + index);
    }

    protected openCreateDialog(category: RequestCategory | null = null): void {
        this.creationStep.set(1);
        this.createError.set(null);
        this.descriptionAttempted.set(false);
        this.form = { ...EMPTY_FORM, category };
        this.createDialogVisible.set(true);
    }

    protected closeCreateDialog(): void {
        if (!this.submitting()) this.createDialogVisible.set(false);
    }

    protected chooseCategory(category: RequestCategory): void {
        this.form.category = category;
        this.createError.set(null);
    }

    protected nextCreationStep(): void {
        if (this.creationStep() === 1 && !this.form.category) {
            this.createError.set(this.i18n.t('requests.new.chooseType'));
            this.focusAfterRender('input[name="request-type"]');
            return;
        }
        if (this.creationStep() === 2 && !this.isDescriptionStepValid()) {
            this.descriptionAttempted.set(true);
            this.createError.set(this.i18n.t('requests.new.fillAll'));
            this.focusAfterRender('[aria-invalid="true"]');
            return;
        }
        this.createError.set(null);
        this.creationStep.update((step) => Math.min(3, step + 1));
        this.focusStepHeading();
    }

    protected previousCreationStep(): void {
        this.createError.set(null);
        this.creationStep.update((step) => Math.max(1, step - 1));
        this.focusStepHeading();
    }

    /** Champ obligatoire de l’étape 2 laissé vide après une tentative de passage à l’étape suivante. */
    protected descriptionInvalid(field: 'title' | 'description' | 'location'): boolean {
        return this.descriptionAttempted() && !this.form[field].trim();
    }

    /** Après un changement d’étape, le focus va sur le titre de la nouvelle étape pour l’annoncer. */
    private focusStepHeading(): void {
        const headings = ['choose-type-title', 'description-step-title', 'review-step-title'];
        this.focusAfterRender('#' + headings[this.creationStep() - 1]);
    }

    private focusAfterRender(selector: string): void {
        afterNextRender(() => document.querySelector<HTMLElement>(`.p-dialog ${selector}`)?.focus(), { injector: this.injector });
    }

    protected submitCreation(): void {
        const category = this.form.category;
        if (!this.auth.user() || !category || !this.isDescriptionStepValid() || this.submitting()) return;

        // Statut, priorité, service et agent sont décidés par la mairie, jamais par le citoyen.
        this.submitting.set(true);
        this.createError.set(null);
        this.requestsApi
            .submit({
                title: this.form.title.trim(),
                description: this.form.description.trim(),
                location: this.form.location.trim(),
                category
            })
            .pipe(finalize(() => this.submitting.set(false)))
            .subscribe({
                next: () => {
                    this.createDialogVisible.set(false);
                    this.load(1);
                    // « Faire ma première démarche » est cochée côté serveur dès la première demande.
                    this.onboarding.refresh();
                },
                error: (error: unknown) => this.createError.set(apiErrorMessage(error))
            });
    }

    private loadDetail(id: string): void {
        this.loading.set(true);
        this.error.set(null);
        this.statusHistory.set([]);
        this.historyLoading.set(true);
        this.historyError.set(null);
        this.requestsApi
            .get(id)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (request) => this.selectedRequest.set(request),
                error: (error: unknown) => {
                    this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? this.i18n.t('requests.notFound') : apiErrorMessage(error));
                }
            });
        this.requestsApi
            .events(id)
            .pipe(finalize(() => this.historyLoading.set(false)))
            .subscribe({
                next: (events) => this.statusHistory.set(events),
                error: (error: unknown) => this.historyError.set(apiErrorMessage(error))
            });
    }

    private isDescriptionStepValid(): boolean {
        return !!this.form.title.trim() && !!this.form.description.trim() && !!this.form.location.trim();
    }
}
