import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { apiErrorMessage, UserService } from './user.service';
import { UpdateUserIn, User } from './user.model';

@Component({
    selector: 'app-users',
    imports: [
        DatePipe,
        FormsModule,
        ButtonModule,
        ConfirmDialogModule,
        DialogModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        TableModule,
        TagModule,
        ToastModule
    ],
    templateUrl: './users.html',
    styleUrl: './users.scss',
    providers: [MessageService, ConfirmationService]
})
export class Users {
    private readonly userService = inject(UserService);
    private readonly messageService = inject(MessageService);
    private readonly confirmationService = inject(ConfirmationService);

    readonly users = signal<User[]>([]);
    readonly loading = signal(false);
    readonly saving = signal(false);
    readonly detailsVisible = signal(false);
    readonly editVisible = signal(false);
    readonly selectedUser = signal<User | null>(null);

    searchText = '';
    form: UpdateUserIn = { name: '', email: '' };

    constructor() {
        this.loadUsers();
    }

    loadUsers(search = this.searchText): void {
        this.loading.set(true);
        this.userService.list(search).subscribe({
            next: (users) => {
                this.users.set(users);
                this.loading.set(false);
            },
            error: (error: unknown) => {
                this.loading.set(false);
                this.showError(error);
            }
        });
    }

    openDetails(user: User): void {
        this.selectedUser.set(user);
        this.detailsVisible.set(true);
        this.userService.get(user.id).subscribe({
            next: (account) => this.selectedUser.set(account),
            error: (error: unknown) => this.showError(error)
        });
    }

    openEdit(user: User): void {
        this.selectedUser.set(user);
        this.form = { name: user.name, email: user.email };
        this.editVisible.set(true);
    }

    save(form: NgForm): void {
        const user = this.selectedUser();
        if (!user || form.invalid || this.saving()) return;

        this.saving.set(true);
        this.userService.update(user.id, this.form).subscribe({
            next: (saved) => {
                this.replaceUser(saved);
                this.saving.set(false);
                this.editVisible.set(false);
                this.messageService.add({ severity: 'success', summary: 'Compte modifié', detail: 'Les informations du compte ont été enregistrées.' });
            },
            error: (error: unknown) => {
                this.saving.set(false);
                this.showError(error);
            }
        });
    }

    confirmActivationChange(user: User): void {
        const action = user.is_active ? 'Désactiver' : 'Activer';
        this.confirmationService.confirm({
            header: `${action} le compte`,
            message: `Voulez-vous ${action.toLowerCase()} le compte de ${user.name} ?`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: action,
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: user.is_active ? 'danger' : 'success' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: () => this.setActivation(user, !user.is_active)
        });
    }

    private setActivation(user: User, is_active: boolean): void {
        this.userService.update(user.id, { is_active }).subscribe({
            next: (saved) => {
                this.replaceUser(saved);
                this.messageService.add({
                    severity: 'success',
                    summary: is_active ? 'Compte activé' : 'Compte désactivé',
                    detail: `${saved.name} peut ${is_active ? 'à nouveau' : 'ne peut plus'} accéder à son compte.`
                });
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    private replaceUser(saved: User): void {
        this.users.update((users) => users.map((user) => (user.id === saved.id ? saved : user)));
        if (this.selectedUser()?.id === saved.id) this.selectedUser.set(saved);
    }

    private showError(error: unknown): void {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
