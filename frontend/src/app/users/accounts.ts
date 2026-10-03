import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { Observable, Subject, concat, debounceTime, finalize, forkJoin, last, of, switchMap } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { ROLE_LABELS } from '@/app/auth/auth.model';
import { Institut } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { Role, UpdateAccountIn, User } from './user.model';
import { apiErrorMessage, UserService } from './user.service';

interface AccountForm {
    name: string;
    email: string;
    role: Role;
    password: string;
    /** Institut dirigé (manager) ou de rattachement (agent). */
    institut_id: string | null;
}

const EMPTY_FORM: AccountForm = { name: '', email: '', role: 'citizen', password: '', institut_id: null };

/** En-tête de chaque liste (une route par rôle, voir app.routes.ts). */
const ROLE_PAGES: Record<Role, { title: string; description: string; create: string; empty: string }> = {
    citizen: {
        title: 'Citoyens',
        description: 'Comptes des habitants qui envoient des demandes.',
        create: 'Nouveau citoyen',
        empty: 'Aucun citoyen ne correspond aux critères.'
    },
    agent: {
        title: 'Agents',
        description: 'Comptes des agents de terrain et institut de rattachement.',
        create: 'Nouvel agent',
        empty: 'Aucun agent ne correspond aux critères.'
    },
    manager: {
        title: 'Managers',
        description: 'Responsables d’institut : chacun dirige un seul institut.',
        create: 'Nouveau manager',
        empty: 'Aucun manager ne correspond aux critères.'
    },
    admin: {
        title: 'Administrateurs',
        description: 'Comptes qui administrent toute la plateforme.',
        create: 'Nouvel administrateur',
        empty: 'Aucun administrateur ne correspond aux critères.'
    }
};

/**
 * Utilisateurs (admin) : une liste par rôle (citoyens, agents, managers, administrateurs).
 * Un manager se voit confier un institut, un agent y est rattaché par un profil.
 * L'API garde les rattachements cohérents quand un rôle change.
 */
@Component({
    selector: 'app-accounts',
    imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, ToastModule, ToolbarModule, TooltipModule],
    templateUrl: './accounts.html',
    providers: [MessageService, ConfirmationService]
})
export class Accounts implements OnInit {
    private readonly users = inject(UserService);
    private readonly agents = inject(AgentService);
    private readonly instituts = inject(InstitutService);
    private readonly messages = inject(MessageService);
    private readonly confirmation = inject(ConfirmationService);
    private readonly searches = new Subject<void>();
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    /** Rôle de la liste affichée, fixé par la route. */
    readonly role = signal<Role>('citizen');
    readonly page = computed(() => ROLE_PAGES[this.role()]);
    /** Le rattachement à un institut n'a de sens que pour les agents et les managers. */
    readonly showAttachment = computed(() => this.role() === 'agent' || this.role() === 'manager');

    readonly accounts = signal<User[]>([]);
    readonly institutList = signal<Institut[]>([]);
    readonly agentProfiles = signal<Agent[]>([]);
    readonly loading = signal(false);
    readonly saving = signal(false);

    readonly roleOptions = (Object.keys(ROLE_LABELS) as Role[]).map((role) => ({ label: ROLE_LABELS[role], value: role }));

    /** user_id → profil agent ; manager_id → institut dirigé. */
    readonly profileByUser = computed(() => new Map(this.agentProfiles().map((agent) => [agent.user_id, agent])));
    readonly institutByManager = computed(() => new Map(this.institutList().filter((i) => i.manager_id).map((i) => [i.manager_id as string, i])));

    searchText = '';

    dialogVisible = false;
    edited: User | null = null;
    form: AccountForm = { ...EMPTY_FORM };

    constructor() {
        this.searches.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAccounts());
    }

    ngOnInit(): void {
        // Même composant pour les 4 routes : on recharge à chaque changement de rôle.
        this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
            this.role.set((data['role'] as Role | undefined) ?? 'citizen');
            this.searchText = '';
            this.dialogVisible = false;
            this.load();
        });
    }

    load(): void {
        this.loading.set(true);
        forkJoin({
            accounts: this.users.listAccounts(this.role(), this.searchText),
            instituts: this.instituts.list(),
            agents: this.agents.list()
        })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ accounts, instituts, agents }) => {
                    this.accounts.set(accounts);
                    this.institutList.set(instituts);
                    this.agentProfiles.set(agents);
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    loadAccounts(): void {
        this.loading.set(true);
        this.users
            .listAccounts(this.role(), this.searchText)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (accounts) => this.accounts.set(accounts), error: (error: unknown) => this.showError(error) });
    }

    onSearchChange(value: string): void {
        this.searchText = value;
        this.searches.next();
    }

    /** Ce à quoi le compte est rattaché, pour la colonne du tableau. */
    attachment(user: User): string {
        if (user.role === 'manager') {
            return this.institutByManager().get(user.id)?.name ?? 'Aucun institut';
        }
        if (user.role === 'agent') {
            const profile = this.profileByUser().get(user.id);
            if (!profile) return 'Sans profil agent';
            return profile.is_active ? profile.institut_name : `${profile.institut_name} (profil désactivé)`;
        }
        return '—';
    }

    /** Manager : instituts actifs sans responsable (ou le sien). Agent : tous les instituts actifs. */
    institutOptions(): { label: string; value: string }[] {
        const own = this.edited?.id;
        return this.institutList()
            .filter((i) => i.is_active && (this.form.role !== 'manager' || !i.manager_id || i.manager_id === own))
            .map((i) => ({ label: i.name, value: i.id }));
    }

    needsInstitut(): boolean {
        return this.form.role === 'manager' || this.form.role === 'agent';
    }

    openNew(): void {
        this.edited = null;
        this.form = { ...EMPTY_FORM, role: this.role() };
        this.dialogVisible = true;
    }

    openEdit(user: User): void {
        this.edited = user;
        this.form = { name: user.name, email: user.email, role: user.role, password: '', institut_id: this.currentInstitut(user) };
        this.dialogVisible = true;
    }

    save(form: NgForm): void {
        if (form.invalid || this.saving()) {
            form.control.markAllAsTouched();
            return;
        }
        const values = this.form;
        const edited = this.edited;
        const account$: Observable<User> = edited
            ? this.users.updateAccount(edited.id, this.changes(edited, values))
            : this.users.createAccount({ name: values.name.trim(), email: values.email.trim(), password: values.password, role: values.role });

        this.saving.set(true);
        account$
            .pipe(
                // Le compte d'abord (le rôle conditionne le rattachement), puis l'institut.
                switchMap((user) => this.attach(user, values.institut_id)),
                finalize(() => this.saving.set(false))
            )
            .subscribe({
                next: () => {
                    this.dialogVisible = false;
                    this.showSuccess(edited ? 'Compte modifié' : 'Compte créé');
                    this.load();
                },
                error: (error: unknown) => {
                    this.showError(error);
                    this.load(); // le compte a pu être enregistré avant l'échec du rattachement
                }
            });
    }

    confirmActivation(user: User): void {
        const action = user.is_active ? 'Désactiver' : 'Réactiver';
        const consequence =
            user.is_active && user.role === 'manager'
                ? ' Son institut se retrouvera sans responsable.'
                : user.is_active && user.role === 'agent'
                  ? ' Son profil agent sera désactivé.'
                  : '';
        this.confirmation.confirm({
            header: `${action} le compte`,
            message: `${action} le compte de ${user.name} ?${consequence}`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: action,
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: user.is_active ? 'danger' : 'success' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () =>
                this.users.updateAccount(user.id, { is_active: !user.is_active }).subscribe({
                    next: () => {
                        this.showSuccess(user.is_active ? 'Compte désactivé' : 'Compte réactivé');
                        this.load();
                    },
                    error: (error: unknown) => this.showError(error)
                })
        });
    }

    private currentInstitut(user: User): string | null {
        if (user.role === 'manager') return this.institutByManager().get(user.id)?.id ?? null;
        if (user.role === 'agent') return this.profileByUser().get(user.id)?.institut_id ?? null;
        return null;
    }

    private changes(user: User, values: AccountForm): UpdateAccountIn {
        const changes: UpdateAccountIn = {};
        if (values.name.trim() !== user.name) changes.name = values.name.trim();
        if (values.email.trim() !== user.email) changes.email = values.email.trim();
        if (values.role !== user.role) changes.role = values.role;
        if (values.password) changes.password = values.password;
        return changes;
    }

    /** Rattachement après enregistrement du compte, en étapes successives. */
    private attach(user: User, institutId: string | null): Observable<unknown> {
        const steps: Observable<unknown>[] = [];

        if (user.role === 'manager') {
            const current = this.institutByManager().get(user.id);
            if (current?.id !== institutId) {
                // Libérer l'ancien institut avant de prendre le nouveau : un manager n'en dirige qu'un.
                if (current) steps.push(this.instituts.setManager(current.id, null));
                if (institutId) steps.push(this.instituts.setManager(institutId, user.id));
            }
        }

        if (user.role === 'agent' && institutId) {
            const profile = this.profileByUser().get(user.id);
            if (!profile) {
                steps.push(this.agents.create({ user_id: user.id, institut_id: institutId, status: 'available' }));
            } else {
                if (profile.institut_id !== institutId) steps.push(this.agents.move(profile.id, institutId));
                if (!profile.is_active) steps.push(this.agents.activate(profile.id));
            }
        }

        return steps.length ? concat(...steps).pipe(last()) : of(null);
    }

    private showSuccess(detail: string): void {
        this.messages.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
