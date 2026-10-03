import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { finalize } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { AuthService } from '@/app/auth/auth.service';
import {
    CitizenRequest,
    CitizenRequestPage,
    CitizenRequestQuery,
    CreateCitizenRequestIn,
    REQUEST_CATEGORIES,
    REQUEST_STATUSES,
    RequestCategory,
    RequestStatus
} from './request.model';
import { CitizenRequestService } from './request.service';
import { apiErrorMessage } from '@/app/users/user.service';

const PAGE_SIZE = 10;

interface RequestForm {
    title: string;
    description: string;
    category: RequestCategory;
    location: string;
}

const EMPTY_FORM: RequestForm = { title: '', description: '', category: 'Autre', location: '' };

@Component({
    selector: 'app-my-requests',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, DialogModule, StepperModule],
    templateUrl: './my-requests.html'
})
export class MyRequests implements OnInit {
    private readonly requestsApi = inject(CitizenRequestService);
    private readonly agentsApi = inject(AgentService);
    private readonly auth = inject(AuthService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly requests = signal<CitizenRequest[]>([]);
    protected readonly total = signal(0);
    protected readonly page = signal(1);
    protected readonly pages = signal(1);
    protected readonly searchTerm = signal('');
    protected readonly categoryFilter = signal<RequestCategory | null>(null);
    protected readonly statusFilter = signal<RequestStatus | null>(null);
    protected readonly selectedRequest = signal<CitizenRequest | null>(null);
    protected readonly loading = signal(false);
    protected readonly error = signal<string | null>(null);
    protected readonly detailMode = signal(false);
    protected readonly createDialogVisible = signal(false);
    protected readonly creationStep = signal(1);
    protected readonly availableAgents = signal<Agent[]>([]);
    protected readonly agentsLoading = signal(false);
    protected readonly selectedAgentId = signal<string | null>(null);
    protected readonly createError = signal<string | null>(null);
    protected readonly submitting = signal(false);
    protected readonly categories = [...REQUEST_CATEGORIES];
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
        const query: CitizenRequestQuery = {
            page,
            page_size: PAGE_SIZE,
            sort_by: 'created_at',
            sort_order: 'desc',
            mine: true
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
        this.selectedAgentId.set(null);
        this.createError.set(null);
        this.form = { ...EMPTY_FORM };
        this.createDialogVisible.set(true);
        this.agentsLoading.set(true);
        this.agentsApi
            .availableForCitizen()
            .pipe(finalize(() => this.agentsLoading.set(false)))
            .subscribe({
                next: (agents) => this.availableAgents.set(agents),
                error: (error: unknown) => this.createError.set(apiErrorMessage(error))
            });
    }

    protected closeCreateDialog(): void {
        if (!this.submitting()) this.createDialogVisible.set(false);
    }

    protected nextCreationStep(): void {
        if (this.creationStep() === 1 && !this.selectedAgentId()) {
            this.createError.set('Choisissez le service qui traitera votre demande.');
            return;
        }
        if (this.creationStep() === 2 && !this.isDescriptionStepValid()) {
            this.createError.set('Renseignez le titre, la description et le lieu de la demande.');
            return;
        }
        this.createError.set(null);
        this.creationStep.update((step) => Math.min(3, step + 1));
    }

    protected previousCreationStep(): void {
        this.createError.set(null);
        this.creationStep.update((step) => Math.max(1, step - 1));
    }

    protected selectedAgent(): Agent | null {
        return this.availableAgents().find((agent) => agent.id === this.selectedAgentId()) ?? null;
    }

    protected submitCreation(): void {
        const citizenId = this.auth.user()?.id;
        const assignedAgentId = this.selectedAgentId();
        if (!citizenId || !assignedAgentId || !this.isDescriptionStepValid() || this.submitting()) return;

        const payload: CreateCitizenRequestIn = {
            ...this.form,
            priority: 'Normale',
            status: 'Nouveau',
            citizen_id: citizenId,
            assigned_agent_id: assignedAgentId
        };
        this.submitting.set(true);
        this.createError.set(null);
        this.requestsApi
            .create(payload)
            .pipe(finalize(() => this.submitting.set(false)))
            .subscribe({
                next: () => {
                    this.createDialogVisible.set(false);
                    this.load(1);
                },
                error: (error: unknown) => this.createError.set(apiErrorMessage(error))
            });
    }

    private loadDetail(id: string): void {
        this.loading.set(true);
        this.error.set(null);
        this.requestsApi
            .get(id)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (request) => {
                    this.selectedRequest.set(request);
                },
                error: (error: unknown) => {
                    this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? 'Cette demande est introuvable.' : apiErrorMessage(error));
                }
            });
    }

    private isDescriptionStepValid(): boolean {
        return !!this.form.title.trim() && !!this.form.description.trim() && !!this.form.location.trim();
    }

}
