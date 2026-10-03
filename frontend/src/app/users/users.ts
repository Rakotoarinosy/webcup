import { LiveDataService } from '@/app/shared/live-data.service';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { AgentService } from '../agents/agent.service';
import { Agent } from '../agents/agent.model';
import { AuthService } from '../auth/auth.service';
import { Role, ROLE_LABELS } from '../auth/auth.model';
import { NAME_VALIDATORS, PASSWORD_VALIDATORS } from '../auth/auth.validators';
import { CreateUserIn, UpdateUserIn, User } from './user.model';
import { apiErrorMessage, UserService } from './user.service';

const EMPTY_FORM = { email: '', name: '', password: '', role: 'citizen' as Role, agent_id: null as string | null, is_active: true };

/** Administration des comptes et de leurs autorisations. */
@Component({
    selector: 'app-users',
    imports: [DatePipe, ReactiveFormsModule, SelectModule, CheckboxModule, PasswordModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, ToastModule, ToolbarModule],
    templateUrl: './users.html',
    styleUrl: './users.scss',
    providers: [MessageService, ConfirmationService]
})
export class Users implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly userService = inject(UserService);
    private readonly agentService = inject(AgentService);
    private readonly auth = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    readonly roles = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));
    readonly agents = signal<Agent[]>([]);
    readonly agentsLoading = signal(false);
    readonly agentError = signal('');

    private readonly messageService = inject(MessageService);

    private readonly confirmationService = inject(ConfirmationService);

    readonly users = signal<User[]>([]);

    readonly loading = signal(false);

    readonly saving = signal(false);

    readonly dialogVisible = signal(false);

    /** Utilisateur en cours d'édition ; null = création. */
    readonly editedUser = signal<User | null>(null);

    readonly form = this.fb.nonNullable.group({
        name: ['', NAME_VALIDATORS],
        email: ['', [Validators.required, Validators.email]],
        password: ['', PASSWORD_VALIDATORS],
        role: ['citizen' as Role, Validators.required],
        agent_id: this.fb.control<string | null>(null),
        is_active: [true]
    });

    roleLabel(role: Role): string {
        return ROLE_LABELS[role];
    }

    availableAgents(): Agent[] {
        const current = this.editedUser();
        return this.agents().filter((agent) => (agent.is_active || agent.id === current?.agent_id) && !this.users().some((user) => user.id !== current?.id && user.agent_id === agent.id));
    }

    private loadAgents() {
        this.agentsLoading.set(true);
        this.agentError.set('');
        this.agentService.list().subscribe({
            next: (agents) => {
                this.agents.set(agents);
                this.agentsLoading.set(false);
            },
            error: () => {
                this.agentsLoading.set(false);
                this.agentError.set('Impossible de charger les fiches agents. Réessayez en rouvrant le formulaire.');
            }
        });
    }

    ngOnInit() {
        this.live.watch(
            this.destroyRef,
            () => {
                this.loadUsers();
            },
            () => !this.loading() && !this.saving() && !this.dialogVisible()
        );
        this.loadUsers();
    }

    loadUsers() {
        this.loading.set(true);
        this.userService.list().subscribe({
            next: (users) => {
                this.users.set(users);
                this.loading.set(false);
            },
            error: (error) => {
                this.loading.set(false);
                this.showError(error);
            }
        });
    }

    openNew() {
        this.editedUser.set(null);
        this.form.reset(EMPTY_FORM);
        this.form.controls.password.setValidators([Validators.required, ...PASSWORD_VALIDATORS]);
        this.form.controls.password.updateValueAndValidity();
        this.loadAgents();
        this.dialogVisible.set(true);
    }

    openEdit(user: User) {
        this.editedUser.set(user);
        this.form.reset({ ...user, password: '' });
        this.form.controls.password.setValidators(PASSWORD_VALIDATORS);
        this.form.controls.password.updateValueAndValidity();
        this.loadAgents();
        this.dialogVisible.set(true);
    }

    save() {
        if (this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const edited = this.editedUser();
        const values = this.form.getRawValue();
        const payload: CreateUserIn = {
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            password: values.password,
            role: values.role,
            agent_id: values.role === 'agent' ? values.agent_id : null
        };
        const changes: UpdateUserIn = {};
        if (edited) {
            if (payload.name !== edited.name) changes.name = payload.name;
            if (payload.email !== edited.email) changes.email = payload.email;
            if (payload.role !== edited.role) changes.role = payload.role;
            if (payload.agent_id !== edited.agent_id) changes.agent_id = payload.agent_id;
            if (values.is_active !== edited.is_active) changes.is_active = values.is_active;
            if (payload.password) changes.password = payload.password;
            if (Object.keys(changes).length === 0) {
                this.dialogVisible.set(false);
                return;
            }
        }
        const request = edited ? this.userService.update(edited.id, changes) : this.userService.create(payload);

        this.saving.set(true);
        request.subscribe({
            next: (saved) => {
                this.upsertLocally(saved);
                this.showSuccess(edited ? 'Utilisateur modifié' : 'Utilisateur créé');
                this.saving.set(false);
                this.dialogVisible.set(false);
                this.form.controls.password.reset('');
                if (saved.id === this.auth.user()?.id) {
                    if (['role', 'is_active', 'email', 'password'].some((key) => key in changes)) this.auth.logout();
                    else this.auth.me().subscribe({ error: (error) => this.showError(error) });
                }
            },
            error: (error) => {
                this.saving.set(false);
                this.showError(error);
            }
        });
    }

    confirmDelete(user: User) {
        this.confirmationService.confirm({
            message: `Supprimer ${user.name} (${user.email}) ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () => this.delete(user)
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    private delete(user: User) {
        this.userService.delete(user.id).subscribe({
            next: () => {
                this.users.update((users) => users.filter((u) => u.id !== user.id));
                this.showSuccess('Utilisateur supprimé');
                if (user.id === this.auth.user()?.id) this.auth.logout();
            },
            error: (error) => this.showError(error)
        });
    }

    private upsertLocally(saved: User) {
        this.users.update((users) => (users.some((u) => u.id === saved.id) ? users.map((u) => (u.id === saved.id ? saved : u)) : [...users, saved]));
    }

    private showSuccess(detail: string) {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
