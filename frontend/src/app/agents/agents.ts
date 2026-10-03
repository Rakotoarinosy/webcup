import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs';

import { CitizenRequest, REQUEST_CATEGORIES, requestStatusSeverity } from '@/app/requests/request.model';
import { apiErrorMessage } from '@/app/users/user.service';
import { Agent, AGENT_STATUS_LABELS, AGENT_STATUSES, AgentQuery, AgentStatus, CreateAgentIn } from './agent.model';
import { AgentService } from './agent.service';

type ActivityFilter = 'active' | 'inactive' | 'all';

const EMPTY_FORM: CreateAgentIn = { name: '', email: '', department: '', status: 'available' };

@Component({
    selector: 'app-agents',
    imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, ToastModule, ToolbarModule, TooltipModule],
    templateUrl: './agents.html',
    styleUrl: './agents.scss',
    providers: [MessageService, ConfirmationService]
})
export class Agents implements OnInit {
    private readonly agentService = inject(AgentService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly agentQueries = new Subject<AgentQuery>();
    private readonly searchChanges = new Subject<string>();

    readonly agents = signal<Agent[]>([]);
    readonly loading = signal(false);
    readonly saving = signal(false);
    readonly interventions = signal<CitizenRequest[]>([]);
    readonly interventionsLoading = signal(false);

    // Les départements reprennent les catégories de demandes, mais la saisie libre reste possible.
    readonly departments: string[] = [...REQUEST_CATEGORIES];
    readonly statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
    readonly activityOptions: { label: string; value: ActivityFilter }[] = [
        { label: 'Agents actifs', value: 'active' },
        { label: 'Agents désactivés', value: 'inactive' },
        { label: 'Tous les agents', value: 'all' }
    ];
    readonly requestStatusSeverity = requestStatusSeverity;

    searchText = '';
    departmentFilter: string | null = null;
    statusFilter: AgentStatus | null = null;
    activityFilter: ActivityFilter = 'active';

    formDialogVisible = false;
    interventionsDialogVisible = false;
    editedAgent: Agent | null = null;
    selectedAgent: Agent | null = null;
    form: CreateAgentIn = { ...EMPTY_FORM };

    constructor() {
        this.agentQueries
            .pipe(
                switchMap((query) => {
                    this.loading.set(true);
                    return this.agentService.list(query).pipe(
                        tap((agents) => this.agents.set(agents)),
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

        this.searchChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAgents());
    }

    ngOnInit(): void {
        this.loadAgents();
    }

    loadAgents(): void {
        this.agentQueries.next({
            search: this.searchText.trim() || undefined,
            department: this.departmentFilter ?? undefined,
            status: this.statusFilter ?? undefined,
            is_active: this.activityFilter === 'all' ? undefined : this.activityFilter === 'active'
        });
    }

    onSearchChange(value: string): void {
        this.searchText = value;
        this.searchChanges.next(value);
    }

    clearFilters(): void {
        this.searchText = '';
        this.departmentFilter = null;
        this.statusFilter = null;
        this.activityFilter = 'active';
        this.loadAgents();
    }

    openNew(): void {
        this.editedAgent = null;
        this.form = { ...EMPTY_FORM };
        this.formDialogVisible = true;
    }

    openEdit(agent: Agent): void {
        this.editedAgent = agent;
        this.form = { name: agent.name, email: agent.email, department: agent.department, status: agent.status };
        this.formDialogVisible = true;
    }

    openInterventions(agent: Agent): void {
        this.selectedAgent = agent;
        this.interventions.set([]);
        this.interventionsDialogVisible = true;
        this.interventionsLoading.set(true);
        this.agentService
            .interventions(agent.id)
            .pipe(finalize(() => this.interventionsLoading.set(false)))
            .subscribe({
                next: (requests) => this.interventions.set(requests),
                error: (error: unknown) => this.showError(error)
            });
    }

    save(form: NgForm): void {
        if (form.invalid || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }

        const payload: CreateAgentIn = {
            ...this.form,
            name: this.form.name.trim(),
            email: this.form.email.trim(),
            department: this.form.department.trim()
        };
        const edited = this.editedAgent;
        const request = edited ? this.agentService.update(edited.id, payload) : this.agentService.create(payload);

        this.saving.set(true);
        request.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: () => {
                this.formDialogVisible = false;
                this.showSuccess(edited ? 'Agent modifié' : 'Agent ajouté');
                this.loadAgents();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    confirmDeactivate(agent: Agent): void {
        this.confirmationService.confirm({
            message: `Désactiver ${agent.name} ? Il ne pourra plus recevoir de demandes, mais ses interventions sont conservées.`,
            header: "Désactiver l'agent",
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Désactiver',
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () => this.toggleActivation(agent)
        });
    }

    toggleActivation(agent: Agent): void {
        const request = agent.is_active ? this.agentService.deactivate(agent.id) : this.agentService.activate(agent.id);

        request.subscribe({
            next: () => {
                this.showSuccess(agent.is_active ? 'Agent désactivé' : 'Agent réactivé');
                this.loadAgents();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    statusLabel(status: AgentStatus): string {
        return AGENT_STATUS_LABELS[status];
    }

    statusSeverity(status: AgentStatus): 'success' | 'info' | 'warn' | 'secondary' {
        switch (status) {
            case 'available':
                return 'success';
            case 'in_intervention':
                return 'info';
            case 'unavailable':
                return 'warn';
            case 'offline':
                return 'secondary';
        }
    }

    private showSuccess(detail: string): void {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
