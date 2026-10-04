import { TermHelp } from '@/app/glossary/term-help';
import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { EMPTY, Observable, Subject, catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { Institut } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { CitizenRequest, requestStatusSeverity } from '@/app/requests/request.model';
import { User } from '@/app/users/user.model';
import { apiErrorMessage, UserService } from '@/app/users/user.service';
import { Agent, AGENT_STATUS_LABELS, AGENT_STATUSES, AgentQuery, AgentStatus } from './agent.model';
import { AgentService } from './agent.service';

type ActivityFilter = 'active' | 'inactive' | 'all';
type AccountMode = 'existing' | 'new';

/** Un agent = un compte de rôle « agent » + un profil rattaché à un institut. */
interface AgentForm {
    mode: AccountMode;
    user_id: string | null;
    name: string;
    email: string;
    password: string;
    institut_id: string | null;
    status: AgentStatus;
}

const EMPTY_FORM: AgentForm = { mode: 'existing', user_id: null, name: '', email: '', password: '', institut_id: null, status: 'available' };

@Component({
    selector: 'app-agents',
    imports: [TermHelp, DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, ToastModule, ToolbarModule, TooltipModule],
    templateUrl: './agents.html',
    styleUrl: './agents.scss',
    providers: [MessageService, ConfirmationService]
})
export class Agents implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly agentService = inject(AgentService);
    private readonly institutService = inject(InstitutService);
    private readonly userService = inject(UserService);
    protected readonly auth = inject(AuthService);
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

    readonly instituts = signal<Institut[]>([]);
    readonly institutOptions = computed(() => this.instituts().filter((i) => i.is_active).map((i) => ({ label: i.name, value: i.id })));
    /** Comptes « agent » sans profil : seuls candidats à un nouveau profil (admin). */
    readonly agentAccounts = signal<User[]>([]);
    readonly accountOptions = computed(() => {
        const linked = new Set(this.agents().map((agent) => agent.user_id));
        return this.agentAccounts()
            .filter((user) => !linked.has(user.id))
            .map((user) => ({ label: `${user.name} (${user.email})`, value: user.id }));
    });
    readonly modeOptions: { label: string; value: AccountMode }[] = [
        { label: 'Compte existant', value: 'existing' },
        { label: 'Nouveau compte', value: 'new' }
    ];
    readonly statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
    readonly activityOptions: { label: string; value: ActivityFilter }[] = [
        { label: 'Agents actifs', value: 'active' },
        { label: 'Agents désactivés', value: 'inactive' },
        { label: 'Tous les agents', value: 'all' }
    ];
    readonly requestStatusSeverity = requestStatusSeverity;

    searchText = '';
    institutFilter: string | null = null;
    statusFilter: AgentStatus | null = null;
    activityFilter: ActivityFilter = 'active';

    formDialogVisible = false;
    interventionsDialogVisible = false;
    moveDialogVisible = false;
    selectedAgent: Agent | null = null;
    movedAgent: Agent | null = null;
    moveInstitutId: string | null = null;
    form: AgentForm = { ...EMPTY_FORM };

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
        this.live.watch(
            this.destroyRef,
            () => {
                this.loadAgents();
            },
            () => !this.loading() && !this.saving() && !this.formDialogVisible && !this.interventionsDialogVisible
        );
        this.loadAgents();
        this.institutService.list().subscribe({ next: (instituts) => this.instituts.set(instituts), error: (error: unknown) => this.showError(error) });
        if (this.auth.hasRole('admin')) {
            this.loadAccounts();
        }
    }

    loadAgents(): void {
        this.agentQueries.next({
            search: this.searchText.trim() || undefined,
            institut_id: this.institutFilter ?? undefined,
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
        this.institutFilter = null;
        this.statusFilter = null;
        this.activityFilter = 'active';
        this.loadAgents();
    }

    openNew(): void {
        this.form = { ...EMPTY_FORM, mode: this.accountOptions().length ? 'existing' : 'new' };
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

        const values = this.form;
        // Nouveau compte : création du compte « agent », puis de son profil dans l'institut.
        const account: Observable<string | null> =
            values.mode === 'new'
                ? this.userService.createAccount({ name: values.name.trim(), email: values.email.trim(), password: values.password, role: 'agent' }).pipe(switchMap((user) => of(user.id)))
                : of(values.user_id);

        this.saving.set(true);
        account
            .pipe(
                switchMap((userId) => this.agentService.create({ user_id: userId ?? '', institut_id: values.institut_id, status: values.status })),
                finalize(() => this.saving.set(false))
            )
            .subscribe({
                next: () => {
                    this.formDialogVisible = false;
                    this.showSuccess('Agent ajouté');
                    this.loadAgents();
                    this.loadAccounts();
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    changeStatus(agent: Agent, status: AgentStatus): void {
        if (agent.status === status) return;
        this.agentService.setStatus(agent.id, status).subscribe({
            next: () => {
                this.showSuccess(`${agent.name} : ${AGENT_STATUS_LABELS[status]}`);
                this.loadAgents();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    openMove(agent: Agent): void {
        this.movedAgent = agent;
        this.moveInstitutId = agent.institut_id;
        this.moveDialogVisible = true;
    }

    saveMove(): void {
        const agent = this.movedAgent;
        if (!agent || !this.moveInstitutId || this.moveInstitutId === agent.institut_id) return;
        this.agentService.move(agent.id, this.moveInstitutId).subscribe({
            next: (moved) => {
                this.moveDialogVisible = false;
                this.showSuccess(`${moved.name} rattaché à ${moved.institut_name}`);
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

    private loadAccounts(): void {
        if (!this.auth.hasRole('admin')) return;
        this.userService.listAccounts('agent').subscribe({ next: (users) => this.agentAccounts.set(users), error: (error: unknown) => this.showError(error) });
    }

    private showSuccess(detail: string): void {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
