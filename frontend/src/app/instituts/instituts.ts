import { TermHelp } from '@/app/glossary/term-help';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, finalize, forkJoin, of, switchMap } from 'rxjs';

import { REQUEST_CATEGORIES, RequestCategory } from '@/app/requests/request.model';
import { User } from '@/app/users/user.model';
import { apiErrorMessage, UserService } from '@/app/users/user.service';
import { Institut } from './institut.model';
import { InstitutService } from './institut.service';

interface InstitutForm {
    name: string;
    description: string;
    categories: RequestCategory[];
    manager_id: string | null;
}

const EMPTY_FORM: InstitutForm = { name: '', description: '', categories: [], manager_id: null };

/**
 * Instituts (admin) : chaque catégorie de demande est reçue par un seul institut actif,
 * dirigé par un manager qui ne gère que celui-ci. Les règles sont vérifiées par l'API.
 */
@Component({
    selector: 'app-instituts',
    imports: [TermHelp, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, InputTextModule, MultiSelectModule, SelectModule, TableModule, TagModule, TextareaModule, ToastModule, ToolbarModule, TooltipModule],
    templateUrl: './instituts.html',
    providers: [MessageService, ConfirmationService]
})
export class Instituts implements OnInit {
    private readonly institutService = inject(InstitutService);
    private readonly userService = inject(UserService);
    private readonly messages = inject(MessageService);
    private readonly confirmation = inject(ConfirmationService);

    readonly instituts = signal<Institut[]>([]);
    readonly managers = signal<User[]>([]);
    readonly loading = signal(false);
    readonly saving = signal(false);

    readonly managerNames = computed(() => new Map(this.managers().map((user) => [user.id, user.name])));
    /** Catégories qu'aucun institut actif ne reçoit : leurs demandes reviennent à l'administration. */
    readonly uncovered = computed(() => {
        const covered = new Set(this.instituts().filter((i) => i.is_active).flatMap((i) => i.categories));
        return REQUEST_CATEGORIES.filter((category) => !covered.has(category));
    });

    dialogVisible = false;
    edited: Institut | null = null;
    form: InstitutForm = { ...EMPTY_FORM };

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        forkJoin({ instituts: this.institutService.list(), managers: this.userService.listAccounts('manager') })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ instituts, managers }) => {
                    this.instituts.set(instituts);
                    this.managers.set(managers);
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    /** Catégories déjà reçues par un autre institut actif que celui en cours d'édition. */
    private takenCategories(): Map<RequestCategory, string> {
        const taken = new Map<RequestCategory, string>();
        for (const institut of this.instituts()) {
            if (institut.is_active && institut.id !== this.edited?.id) {
                institut.categories.forEach((category) => taken.set(category, institut.name));
            }
        }
        return taken;
    }

    categoryOptions(): { label: string; value: RequestCategory; disabled: boolean }[] {
        const taken = this.takenCategories();
        return REQUEST_CATEGORIES.map((category) => ({
            label: taken.has(category) ? `${category} (${taken.get(category)})` : category,
            value: category,
            disabled: taken.has(category)
        }));
    }

    /** Managers libres, plus celui de l'institut édité. */
    managerOptions(): { label: string; value: string }[] {
        const busy = new Set(this.instituts().filter((i) => i.id !== this.edited?.id && i.manager_id).map((i) => i.manager_id));
        return this.managers()
            .filter((user) => user.is_active && !busy.has(user.id))
            .map((user) => ({ label: `${user.name} (${user.email})`, value: user.id }));
    }

    openNew(): void {
        this.edited = null;
        this.form = { ...EMPTY_FORM, categories: [] };
        this.dialogVisible = true;
    }

    openEdit(institut: Institut): void {
        this.edited = institut;
        this.form = { name: institut.name, description: institut.description, categories: [...institut.categories], manager_id: institut.manager_id };
        this.dialogVisible = true;
    }

    save(form: NgForm): void {
        if (form.invalid || this.saving() || !this.form.categories.length) {
            form.control.markAllAsTouched();
            return;
        }
        const values = { ...this.form, name: this.form.name.trim() };
        const edited = this.edited;
        // Le manager a sa propre action côté API : on ne l'appelle que s'il change.
        const action: Observable<Institut> = edited
            ? this.institutService
                  .update(edited.id, { name: values.name, description: values.description, categories: values.categories })
                  .pipe(switchMap((updated) => (values.manager_id !== edited.manager_id ? this.institutService.setManager(updated.id, values.manager_id) : of(updated))))
            : this.institutService.create(values);

        this.saving.set(true);
        action.pipe(finalize(() => this.saving.set(false))).subscribe({
            next: () => {
                this.dialogVisible = false;
                this.showSuccess(edited ? 'Institut modifié' : 'Institut créé');
                this.load();
            },
            error: (error: unknown) => this.showError(error)
        });
    }

    toggleActive(institut: Institut): void {
        const apply = () =>
            this.institutService.update(institut.id, { is_active: !institut.is_active }).subscribe({
                next: () => {
                    this.showSuccess(institut.is_active ? 'Institut désactivé' : 'Institut réactivé');
                    this.load();
                },
                error: (error: unknown) => this.showError(error)
            });

        if (!institut.is_active) {
            apply();
            return;
        }
        this.confirmation.confirm({
            message: `Désactiver « ${institut.name} » ? Son manager et ses agents perdront l'accès à ses demandes, et les nouvelles demandes de ses catégories iront à l'administration.`,
            header: "Désactiver l'institut",
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Désactiver',
            rejectLabel: 'Annuler',
            acceptButtonProps: { severity: 'danger' },
            rejectButtonProps: { severity: 'secondary', outlined: true },
            accept: apply
        });
    }

    managerName(id: string | null): string {
        return id ? (this.managerNames().get(id) ?? 'Compte inconnu') : 'Aucun';
    }

    private showSuccess(detail: string): void {
        this.messages.add({ severity: 'success', summary: 'Succès', detail, life: 3000 });
    }

    private showError(error: unknown): void {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
