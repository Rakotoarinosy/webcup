import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { User } from '@/app/users/user.model';
import { apiErrorMessage, UserService } from '@/app/users/user.service';
import {
    CitizenRequest,
    CitizenRequestQuery,
    CreateCitizenRequestIn,
    RequestAnalysis,
    REQUEST_CATEGORIES,
    REQUEST_PRIORITIES,
    REQUEST_STATUSES,
    requestStatusSeverity,
    RequestCategory,
    RequestPriority,
    RequestSortBy,
    RequestStatus
} from './request.model';
import { CitizenRequestService } from './request.service';

interface RequestForm {
    title: string;
    description: string;
    category: RequestCategory;
    priority: RequestPriority;
    status: RequestStatus;
    citizen_id: string;
    location: string;
    assigned_agent_id: string | null;
}

const EMPTY_FORM: RequestForm = {
    title: '',
    description: '',
    category: 'Autre',
    priority: 'Normale',
    status: 'Nouveau',
    citizen_id: '',
    location: '',
    assigned_agent_id: null
};

const SORT_FIELDS: RequestSortBy[] = ['created_at', 'title', 'category', 'priority', 'status'];

@Component({
    selector: 'app-requests',
    imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, TextareaModule, ToastModule, ToolbarModule, TooltipModule],
    templateUrl: './requests.html',
    styleUrl: './requests.scss',
    providers: [MessageService, ConfirmationService]
})
export class Requests implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly requestService = inject(CitizenRequestService);
    private readonly userService = inject(UserService);
    private readonly agentService = inject(AgentService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly requestQueries = new Subject<CitizenRequestQuery>();
    private readonly searchChanges = new Subject<string>();

    readonly requests = signal<CitizenRequest[]>([]);
    readonly users = signal<User[]>([]);
    readonly userNames = computed(() => new Map(this.users().map((user) => [user.id, user.name])));
    readonly userOptions = computed(() => this.users().map((user) => ({ label: `${user.name} (${user.email})`, value: user.id })));
    readonly agents = signal<Agent[]>([]);
    readonly agentNames = computed(() => new Map(this.agents().map((agent) => [agent.id, agent.name])));
    // Seuls les agents actifs peuvent recevoir une demande.
    readonly agentOptions = computed(() =>
        this.agents()
            .filter((agent) => agent.is_active)
            .map((agent) => ({ label: `${agent.name} (${agent.department})`, value: agent.id }))
    );
    readonly total = signal(0);
    readonly loading = signal(false);
    readonly saving = signal(false);

    readonly categories: RequestCategory[] = [...REQUEST_CATEGORIES];
    readonly priorities: RequestPriority[] = [...REQUEST_PRIORITIES];
    readonly statuses: RequestStatus[] = [...REQUEST_STATUSES];

    first = 0;
    pageSize = 10;
    sortBy: RequestSortBy = 'created_at';
    sortOrder: 'asc' | 'desc' = 'desc';
    searchText = '';
    categoryFilter: RequestCategory | null = null;
    priorityFilter: RequestPriority | null = null;
    statusFilter: RequestStatus | null = null;

    formDialogVisible = false;
    detailsDialogVisible = false;
    editedRequest: CitizenRequest | null = null;
    selectedRequest: CitizenRequest | null = null;
    form: RequestForm = { ...EMPTY_FORM };

    // Analyse IA : suggestion affichée dans une fenêtre, appliquée seulement sur validation.
    analysisDialogVisible = false;
    analyzedRequest: CitizenRequest | null = null;
    readonly analysis = signal<RequestAnalysis | null>(null);
    readonly analysisError = signal<string | null>(null);
    readonly analyzing = signal(false);
    readonly applyingAnalysis = signal(false);

    constructor() {
        this.requestQueries
            .pipe(
                switchMap((query) => {
                    this.loading.set(true);
                    return this.requestService.list(query).pipe(
                        tap((page) => {
                            this.requests.set(page.items);
                            this.total.set(page.total);
                        }),
                        catchError((error: unknown) => {
                            this.showError(error);
                            return EMPTY;
                        }),
                        finalize(() => this.loading.set(false))
                    );
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();

        this.searchChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.resetAndLoad());
    }

    ngOnInit(): void {
        this.live.watch(
            this.destroyRef,
            () => {
                this.loadRequests();
                this.loadUsers();
                this.loadAgents();
            },
            () => !this.loading() && !this.saving() && !this.formDialogVisible && !this.detailsDialogVisible && !this.analysisDialogVisible
        );
        this.loadUsers();
        this.loadAgents();
    }

    onLazyLoad(event: TableLazyLoadEvent): void {
        this.first = event.first ?? this.first;
        this.pageSize = event.rows ?? this.pageSize;

        if (typeof event.sortField === 'string' && this.isSortField(event.sortField)) {
            this.sortBy = event.sortField;
        }
        if (event.sortOrder === 1 || event.sortOrder === -1) {
            this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
        }

        this.loadRequests();
    }

    onSearchChange(value: string): void {
        this.searchText = value;
        this.searchChanges.next(value);
    }

    applyFilters(): void {
        this.resetAndLoad();
    }

    clearFilters(): void {
        this.searchText = '';
        this.categoryFilter = null;
        this.priorityFilter = null;
        this.statusFilter = null;
        this.resetAndLoad();
    }

    openNew(): void {
        this.editedRequest = null;
        this.form = { ...EMPTY_FORM };
        this.formDialogVisible = true;
    }

    openEdit(request: CitizenRequest): void {
        this.editedRequest = request;
        this.form = {
            title: request.title,
            description: request.description,
            category: request.category,
            priority: request.priority,
            status: request.status,
            citizen_id: request.citizen_id,
            location: request.location,
            assigned_agent_id: request.assigned_agent_id
        };
        this.formDialogVisible = true;
    }

    openDetails(request: CitizenRequest): void {
        this.selectedRequest = request;
        this.detailsDialogVisible = true;
    }

    analyze(request: CitizenRequest): void {
        this.analyzedRequest = request;
        this.analysis.set(null);
        this.analysisError.set(null);
        this.detailsDialogVisible = false;
        this.analysisDialogVisible = true;
        this.analyzing.set(true);

        this.requestService
            .analyze(request.id)
            .pipe(finalize(() => this.analyzing.set(false)))
            .subscribe({
                next: (analysis) => this.analysis.set(analysis),
                error: (error: unknown) => this.analysisError.set(analysisErrorMessage(error))
            });
    }

    /** Applique catégorie, priorité et agent suggérés à la demande analysée. */
    applyAnalysis(): void {
        const request = this.analyzedRequest;
        const analysis = this.analysis();
        if (!request || !analysis || this.applyingAnalysis()) {
            return;
        }

        this.applyingAnalysis.set(true);
        this.requestService
            .update(request.id, {
                category: analysis.category,
                priority: analysis.priority,
                ...(analysis.recommended_agent ? { assigned_agent_id: analysis.recommended_agent.id } : {})
            })
            .pipe(finalize(() => this.applyingAnalysis.set(false)))
            .subscribe({
                next: () => {
                    this.analysisDialogVisible = false;
                    this.showSuccess("Suggestions de l'IA appliquées");
                    this.loadRequests();
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    save(form: NgForm): void {
        if (form.invalid || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }

        const payload: CreateCitizenRequestIn = {
            ...this.form,
            title: this.form.title.trim(),
            description: this.form.description.trim(),
            location: this.form.location.trim()
        };
        const edited = this.editedRequest;
        const request = edited ? this.requestService.update(edited.id, payload) : this.requestService.create(payload);

        this.saving.set(true);
        request.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: () => {
                this.formDialogVisible = false;
                this.showSuccess(edited ? 'Demande modifiée' : 'Demande créée');
                this.loadRequests();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    confirmDelete(request: CitizenRequest): void {
        this.confirmationService.confirm({
            message: `Supprimer la demande « ${request.title} » ?`,
            header: 'Confirmer la suppression',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () => this.delete(request)
        });
    }

    userName(id: string): string {
        return this.userNames().get(id) ?? id;
    }

    agentName(id: string | null): string {
        if (id === null) {
            return 'Non assigné';
        }

        return this.agentNames().get(id) ?? id;
    }

    statusSeverity(status: RequestStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
        return requestStatusSeverity(status);
    }

    prioritySeverity(priority: RequestPriority): 'warn' | 'danger' | 'secondary' {
        switch (priority) {
            case 'Basse':
                return 'secondary';
            case 'Normale':
                return 'warn';
            case 'Haute':
            case 'Urgente':
                return 'danger';
        }
    }

    private loadUsers(): void {
        this.userService.list().subscribe({
            next: (users) => this.users.set(users),
            error: (error: unknown) => this.showError(error)
        });
    }

    private loadAgents(): void {
        this.agentService.list().subscribe({
            next: (agents) => this.agents.set(agents),
            error: (error: unknown) => this.showError(error)
        });
    }

    loadRequests(): void {
        const query: CitizenRequestQuery = {
            page: Math.floor(this.first / this.pageSize) + 1,
            page_size: this.pageSize,
            search: this.searchText.trim() || undefined,
            category: this.categoryFilter ?? undefined,
            priority: this.priorityFilter ?? undefined,
            status: this.statusFilter ?? undefined,
            sort_by: this.sortBy,
            sort_order: this.sortOrder
        };
        this.requestQueries.next(query);
    }

    private resetAndLoad(): void {
        this.first = 0;
        this.loadRequests();
    }

    private isSortField(value: string): value is RequestSortBy {
        return SORT_FIELDS.includes(value as RequestSortBy);
    }

    private delete(request: CitizenRequest): void {
        this.requestService.delete(request.id).subscribe({
            next: () => {
                if (this.requests().length === 1 && this.first > 0) {
                    this.first = Math.max(0, this.first - this.pageSize);
                }
                this.showSuccess('Demande supprimée');
                this.loadRequests();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    private showSuccess(detail: string): void {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: apiErrorMessage(error),
            life: 5000
        });
    }
}

function analysisErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
        if (error.status === 503 && String(error.error?.detail ?? '').includes('GEMINI_API_KEY')) {
            return "L'IA n'est pas configurée : ajoutez GEMINI_API_KEY dans le .env du backend.";
        }
        if (error.status === 503) {
            return "L'IA est momentanément indisponible. Réessayez dans quelques instants.";
        }
        if (error.status === 403) {
            return "L'analyse IA est réservée aux gestionnaires.";
        }
    }

    return apiErrorMessage(error);
}
