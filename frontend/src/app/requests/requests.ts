import { TermHelp } from '@/app/glossary/term-help';
import { requestStatusTerm } from '@/app/glossary/glossary';
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
import { EMPTY, Observable, Subject, catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { AuthService } from '@/app/auth/auth.service';
import { Institut } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { User } from '@/app/users/user.model';
import { apiErrorMessage, UserService } from '@/app/users/user.service';
import {
    CitizenRequest,
    CitizenRequestQuery,
    EditRequestIn,
    eventLabel,
    isOpen,
    RequestAnalysis,
    RequestEvent,
    REQUEST_CATEGORIES,
    REQUEST_PRIORITIES,
    REQUEST_STATUSES,
    requestPrioritySeverity,
    requestStatusSeverity,
    RequestCategory,
    RequestPriority,
    RequestSortBy,
    RequestStatus,
    STATUS_TRANSITIONS
} from './request.model';
import { LiveDataService } from '@/app/shared/live-data.service';
import { CitizenRequestService } from './request.service';

/** Création pour le compte d'un citoyen : statut, priorité et institut sont décidés par le serveur. */
interface SubmitForm {
    title: string;
    description: string;
    category: RequestCategory;
    location: string;
    citizen_id: string;
}

/** Modification du contenu : statut et agent ont leurs propres actions. */
interface EditForm {
    title: string;
    description: string;
    location: string;
    category: RequestCategory;
    priority: RequestPriority;
}

const EMPTY_SUBMIT: SubmitForm = { title: '', description: '', category: 'Autre', location: '', citizen_id: '' };

const SORT_FIELDS: RequestSortBy[] = ['created_at', 'title', 'category', 'priority', 'status'];

const STATUS_ACTION_LABELS: Record<RequestStatus, string> = {
    Nouveau: 'Nouveau',
    'En cours': 'Prendre en charge',
    'En attente': 'Mettre en attente',
    Résolu: 'Marquer résolue',
    Rejeté: 'Rejeter'
};

/**
 * Demandes citoyennes pour l'encadrement : un manager voit et gère celles de son institut,
 * l'admin toutes. Le périmètre et les droits sont appliqués par l'API.
 */
@Component({
    selector: 'app-requests',
    imports: [
        TermHelp,
        DatePipe,
        FormsModule,
        ButtonModule,
        ConfirmDialogModule,
        DialogModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        SelectModule,
        TableModule,
        TagModule,
        TextareaModule,
        ToastModule,
        ToolbarModule,
        TooltipModule
    ],
    templateUrl: './requests.html',
    styleUrl: './requests.scss',
    providers: [MessageService, ConfirmationService]
})
export class Requests implements OnInit {
    readonly requestStatusTerm = requestStatusTerm;
    private readonly requestService = inject(CitizenRequestService);
    private readonly userService = inject(UserService);
    private readonly agentService = inject(AgentService);
    private readonly institutService = inject(InstitutService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly live = inject(LiveDataService);
    private readonly requestQueries = new Subject<CitizenRequestQuery>();
    private readonly searchChanges = new Subject<string>();
    protected readonly auth = inject(AuthService);

    readonly requests = signal<CitizenRequest[]>([]);
    readonly users = signal<User[]>([]);
    readonly userNames = computed(() => new Map(this.users().map((user) => [user.id, user.name])));
    readonly userOptions = computed(() => this.users().map((user) => ({ label: `${user.name} (${user.email})`, value: user.id })));
    readonly agents = signal<Agent[]>([]);
    readonly agentNames = computed(() => new Map(this.agents().map((agent) => [agent.id, agent.name])));
    readonly instituts = signal<Institut[]>([]);
    readonly institutNames = computed(() => new Map(this.instituts().map((institut) => [institut.id, institut.name])));
    readonly total = signal(0);
    readonly loading = signal(false);
    readonly saving = signal(false);

    readonly categories: RequestCategory[] = [...REQUEST_CATEGORIES];
    readonly priorities: RequestPriority[] = [...REQUEST_PRIORITIES];
    readonly statuses: RequestStatus[] = [...REQUEST_STATUSES];
    readonly statusSeverity = requestStatusSeverity;
    readonly prioritySeverity = requestPrioritySeverity;
    readonly eventLabel = eventLabel;
    readonly isOpen = isOpen;

    first = 0;
    pageSize = 10;
    sortBy: RequestSortBy = 'created_at';
    sortOrder: 'asc' | 'desc' = 'desc';
    searchText = '';
    categoryFilter: RequestCategory | null = null;
    priorityFilter: RequestPriority | null = null;
    statusFilter: RequestStatus | null = null;

    submitDialogVisible = false;
    submitForm: SubmitForm = { ...EMPTY_SUBMIT };

    editDialogVisible = false;
    editedRequest: CitizenRequest | null = null;
    editForm: EditForm | null = null;

    detailsDialogVisible = false;
    readonly selectedRequest = signal<CitizenRequest | null>(null);
    readonly timeline = signal<RequestEvent[]>([]);

    assignDialogVisible = false;
    assignedRequest: CitizenRequest | null = null;
    assignAgentId: string | null = null;
    assignScheduledAt = '';

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
            () => this.loadRequests(),
            () => !this.loading() && !this.saving() && !this.submitDialogVisible && !this.editDialogVisible && !this.detailsDialogVisible && !this.assignDialogVisible && !this.analysisDialogVisible
        );
        this.userService.list().subscribe({ next: (users) => this.users.set(users), error: (error: unknown) => this.showError(error) });
        this.agentService.list().subscribe({ next: (agents) => this.agents.set(agents), error: (error: unknown) => this.showError(error) });
        this.institutService.list().subscribe({ next: (instituts) => this.instituts.set(instituts), error: (error: unknown) => this.showError(error) });
    }

    // ─── Liste ──────────────────────────────────────────────────────

    onLazyLoad(event: TableLazyLoadEvent): void {
        this.first = event.first ?? this.first;
        this.pageSize = event.rows ?? this.pageSize;

        if (typeof event.sortField === 'string' && SORT_FIELDS.includes(event.sortField as RequestSortBy)) {
            this.sortBy = event.sortField as RequestSortBy;
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

    loadRequests(): void {
        this.requestQueries.next({
            page: Math.floor(this.first / this.pageSize) + 1,
            page_size: this.pageSize,
            search: this.searchText.trim() || undefined,
            category: this.categoryFilter ?? undefined,
            priority: this.priorityFilter ?? undefined,
            status: this.statusFilter ?? undefined,
            sort_by: this.sortBy,
            sort_order: this.sortOrder
        });
    }

    // ─── Création pour un citoyen ───────────────────────────────────

    openSubmit(): void {
        this.submitForm = { ...EMPTY_SUBMIT };
        this.submitDialogVisible = true;
    }

    submit(form: NgForm): void {
        if (form.invalid || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }
        const payload = {
            ...this.submitForm,
            title: this.submitForm.title.trim(),
            description: this.submitForm.description.trim(),
            location: this.submitForm.location.trim()
        };
        this.run(this.requestService.submit(payload), 'Demande enregistrée', () => (this.submitDialogVisible = false));
    }

    // ─── Modification du contenu ────────────────────────────────────

    openEdit(request: CitizenRequest): void {
        this.editedRequest = request;
        this.editForm = { title: request.title, description: request.description, location: request.location, category: request.category, priority: request.priority };
        this.editDialogVisible = true;
    }

    saveEdit(form: NgForm): void {
        const request = this.editedRequest;
        const values = this.editForm;
        if (!request || !values || form.invalid || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }
        // Seuls les champs modifiés partent : l'historique ne garde que de vrais changements.
        const changes: EditRequestIn = {};
        if (values.title.trim() !== request.title) changes.title = values.title.trim();
        if (values.description.trim() !== request.description) changes.description = values.description.trim();
        if (values.location.trim() !== request.location) changes.location = values.location.trim();
        if (values.category !== request.category) changes.category = values.category;
        if (values.priority !== request.priority) changes.priority = values.priority;

        const rerouted = changes.category !== undefined;
        this.run(this.requestService.edit(request.id, changes), rerouted ? 'Demande modifiée et transmise à l\'institut de la nouvelle catégorie' : 'Demande modifiée', () => (this.editDialogVisible = false));
    }

    // ─── Détail, historique et cycle de vie ─────────────────────────

    openDetails(request: CitizenRequest): void {
        this.selectedRequest.set(request);
        this.timeline.set([]);
        this.detailsDialogVisible = true;
        this.requestService.events(request.id).subscribe({
            next: (events) => this.timeline.set(events),
            error: (error: unknown) => this.showError(error)
        });
    }

    statusActions(request: CitizenRequest): { target: RequestStatus; label: string; danger: boolean }[] {
        return STATUS_TRANSITIONS[request.status].map((target) => ({ target, label: STATUS_ACTION_LABELS[target], danger: target === 'Rejeté' }));
    }

    changeStatus(request: CitizenRequest, target: RequestStatus): void {
        const apply = () =>
            this.run(this.requestService.changeStatus(request.id, target), `Statut : ${target}`, (updated) => {
                if (this.detailsDialogVisible) this.openDetails(updated);
            });

        if (target === 'Rejeté') {
            this.confirmationService.confirm({
                message: `Rejeter la demande « ${request.title} » ? Ce statut est définitif.`,
                header: 'Rejeter la demande',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Rejeter',
                rejectLabel: 'Annuler',
                acceptButtonProps: { severity: 'danger' },
                rejectButtonProps: { severity: 'secondary', outlined: true },
                accept: apply
            });
            return;
        }
        apply();
    }

    // ─── Attribution ────────────────────────────────────────────────

    /** Agents actifs de l'institut de la demande (tous les actifs pour une demande sans institut). */
    agentOptions(request: CitizenRequest | null): { label: string; value: string }[] {
        return this.agents()
            .filter((agent) => agent.is_active && (!request?.institut_id || agent.institut_id === request.institut_id))
            .map((agent) => ({ label: `${agent.name} — ${agent.institut_name}`, value: agent.id }));
    }

    openAssign(request: CitizenRequest): void {
        this.assignedRequest = request;
        this.assignAgentId = request.assigned_agent_id;
        this.assignScheduledAt = request.scheduled_at ? request.scheduled_at.slice(0, 16) : '';
        this.detailsDialogVisible = false;
        this.assignDialogVisible = true;
    }

    saveAssign(): void {
        const request = this.assignedRequest;
        if (!request || !this.assignAgentId || this.saving()) return;
        const payload = { agent_id: this.assignAgentId, scheduled_at: this.assignScheduledAt ? new Date(this.assignScheduledAt).toISOString() : null };
        this.run(this.requestService.assign(request.id, payload), 'Demande attribuée', () => (this.assignDialogVisible = false));
    }

    // ─── Analyse IA ─────────────────────────────────────────────────

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

    /** Applique catégorie et priorité suggérées, puis attribue l'agent recommandé si la demande est ouverte. */
    applyAnalysis(): void {
        const request = this.analyzedRequest;
        const analysis = this.analysis();
        if (!request || !analysis || this.applyingAnalysis()) return;

        const changes: EditRequestIn = {};
        if (analysis.category !== request.category) changes.category = analysis.category;
        if (analysis.priority !== request.priority) changes.priority = analysis.priority;
        const agent = analysis.recommended_agent;

        this.applyingAnalysis.set(true);
        this.requestService
            .edit(request.id, changes)
            .pipe(
                switchMap((updated) => (agent && isOpen(updated.status) ? this.requestService.assign(updated.id, { agent_id: agent.id }) : of(updated))),
                finalize(() => this.applyingAnalysis.set(false))
            )
            .subscribe({
                next: () => {
                    this.analysisDialogVisible = false;
                    this.showSuccess("Suggestions de l'IA appliquées");
                    this.loadRequests();
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    // ─── Suppression ────────────────────────────────────────────────

    confirmDelete(request: CitizenRequest): void {
        this.confirmationService.confirm({
            message: `Supprimer la demande « ${request.title} » ?`,
            header: 'Confirmer la suppression',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () =>
                this.requestService.delete(request.id).subscribe({
                    next: () => {
                        if (this.requests().length === 1 && this.first > 0) {
                            this.first = Math.max(0, this.first - this.pageSize);
                        }
                        this.showSuccess('Demande supprimée');
                        this.loadRequests();
                    },
                    error: (error: unknown) => this.showError(error)
                })
        });
    }

    // ─── Affichage ──────────────────────────────────────────────────

    userName(id: string): string {
        return this.userNames().get(id) ?? id.slice(0, 8);
    }

    agentName(id: string | null): string {
        return id === null ? 'Non assigné' : (this.agentNames().get(id) ?? 'Agent inconnu');
    }

    institutName(id: string | null): string {
        return id === null ? 'Administration' : (this.institutNames().get(id) ?? '—');
    }

    private run(action: Observable<CitizenRequest>, success: string, done: (updated: CitizenRequest) => void): void {
        this.saving.set(true);
        action.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: (updated) => {
                done(updated);
                this.showSuccess(success);
                this.loadRequests();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    private resetAndLoad(): void {
        this.first = 0;
        this.loadRequests();
    }

    private showSuccess(detail: string): void {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
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
            return "L'analyse IA est réservée au responsable de l'institut de la demande.";
        }
    }

    return apiErrorMessage(error);
}
