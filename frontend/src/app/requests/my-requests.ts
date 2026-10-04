import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Injector, OnInit, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
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

/** Confirmation affichée juste après l'envoi (D16) : de quoi citer et retrouver la demande (F83). */
export interface SubmissionConfirmation {
    id: string;
    reference: string;
    title: string;
    receivedAt: string;
    /** null tant que l'accusé n'est pas chargé (ou s'il n'a pas pu l'être). */
    service: string | null;
}

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
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, DialogModule, StepperModule],
    templateUrl: './my-requests.html'
})
export class MyRequests implements OnInit {
    private readonly requestsApi = inject(CitizenRequestService);
    private readonly auth = inject(AuthService);
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);

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
    protected readonly confirmation = signal<SubmissionConfirmation | null>(null);
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

    protected openCreateDialog(): void {
        this.creationStep.set(1);
        this.createError.set(null);
        this.descriptionAttempted.set(false);
        this.form = { ...EMPTY_FORM };
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
            this.createError.set('Choisissez le type de problème : il détermine le service qui traitera votre demande.');
            this.focusAfterRender('input[name="request-type"]');
            return;
        }
        if (this.creationStep() === 2 && !this.isDescriptionStepValid()) {
            this.descriptionAttempted.set(true);
            this.createError.set('Renseignez le titre, la description et le lieu de la demande.');
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
                next: (created) => {
                    this.createDialogVisible.set(false);
                    this.showConfirmation(created);
                    this.load(1);
                },
                error: (error: unknown) => this.createError.set(apiErrorMessage(error))
            });
    }

    private showConfirmation(created: CitizenRequest): void {
        this.confirmation.set({ id: created.id, reference: created.reference, title: created.title, receivedAt: created.created_at, service: null });
        // Le focus va sur la confirmation pour qu'elle soit lue immédiatement.
        afterNextRender(() => document.getElementById('submission-confirmation')?.focus(), { injector: this.injector });
        this.requestsApi.receipt(created.id).subscribe({
            next: (receipt) => this.confirmation.update((current) => (current?.id === created.id ? { ...current, service: receipt.service, receivedAt: receipt.received_at } : current)),
            error: () => undefined // la référence et l'heure restent affichées ; l'accusé reste accessible
        });
    }

    protected dismissConfirmation(): void {
        this.confirmation.set(null);
        document.getElementById('history-title')?.focus();
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
                    this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? 'Cette demande est introuvable.' : apiErrorMessage(error));
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
