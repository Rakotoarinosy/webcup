import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CreateUserIn, User } from './user.model';
import { apiErrorMessage, UserService } from './user.service';

const EMPTY_FORM: CreateUserIn = { email: '', name: '' };

/** Page de démo branchée sur le backend : CRUD complet sur /api/v1/users. */
@Component({
    selector: 'app-users',
    imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, TableModule, ToastModule, ToolbarModule],
    templateUrl: './users.html',
    styleUrl: './users.scss',
    providers: [MessageService, ConfirmationService]
})
export class Users implements OnInit {
    private readonly userService = inject(UserService);

    private readonly messageService = inject(MessageService);

    private readonly confirmationService = inject(ConfirmationService);

    readonly users = signal<User[]>([]);

    readonly loading = signal(false);

    readonly saving = signal(false);

    readonly dialogVisible = signal(false);

    /** Utilisateur en cours d'édition ; null = création. */
    readonly editedUser = signal<User | null>(null);

    form: CreateUserIn = { ...EMPTY_FORM };

    ngOnInit() {
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
        this.form = { ...EMPTY_FORM };
        this.dialogVisible.set(true);
    }

    openEdit(user: User) {
        this.editedUser.set(user);
        this.form = { email: user.email, name: user.name };
        this.dialogVisible.set(true);
    }

    save() {
        const edited = this.editedUser();
        const request = edited ? this.userService.update(edited.id, this.form) : this.userService.create(this.form);

        this.saving.set(true);
        request.subscribe({
            next: (saved) => {
                this.upsertLocally(saved);
                this.showSuccess(edited ? 'Utilisateur modifié' : 'Utilisateur créé');
                this.saving.set(false);
                this.dialogVisible.set(false);
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
