import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';

import { apiErrorMessage } from '@/app/users/user.service';
import { CONCERN_STATUSES, ConcernStatus, DataConcernAdmin, concernStatusSeverity, concernSteps } from './data-concern.model';
import { DataConcernService } from './data-concern.service';

/** Traitement des signalements sur les données (admin) : chaque étape est datée et visible par l'habitant. */
@Component({
    selector: 'app-data-concerns-admin',
    imports: [DatePipe, FormsModule, ButtonModule, DialogModule, SelectModule, TagModule, ToastModule],
    templateUrl: './data-concerns-admin.html',
    providers: [MessageService]
})
export class DataConcernsAdmin implements OnInit {
    private readonly api = inject(DataConcernService);
    private readonly messages = inject(MessageService);

    readonly statusOptions = [{ label: 'Tous les statuts', value: null }, ...CONCERN_STATUSES.map((status) => ({ label: status, value: status }))];
    readonly steps = concernSteps;
    readonly severity = concernStatusSeverity;

    readonly concerns = signal<DataConcernAdmin[]>([]);
    readonly loading = signal(false);
    readonly busy = signal<string | null>(null);

    status: ConcernStatus | null = null;
    answering: DataConcernAdmin | null = null;
    answerVisible = false;
    response = '';

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.api
            .list(this.status)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.concerns.set(items), error: (error: unknown) => this.showError(error) });
    }

    review(concern: DataConcernAdmin): void {
        this.busy.set(concern.id);
        this.api
            .review(concern.id)
            .pipe(finalize(() => this.busy.set(null)))
            .subscribe({
                next: (updated) => {
                    this.replace(updated);
                    this.messages.add({ severity: 'success', summary: 'Pris en charge', detail: `${updated.reference} est en cours d’examen.`, life: 3000 });
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    openAnswer(concern: DataConcernAdmin): void {
        this.answering = concern;
        this.response = '';
        this.answerVisible = true;
    }

    sendAnswer(form: NgForm): void {
        const concern = this.answering;
        if (form.invalid || !concern || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        this.busy.set(concern.id);
        this.api
            .answer(concern.id, this.response.trim())
            .pipe(finalize(() => this.busy.set(null)))
            .subscribe({
                next: (updated) => {
                    this.replace(updated);
                    this.answerVisible = false;
                    this.messages.add({ severity: 'success', summary: 'Réponse envoyée', detail: `L’habitant voit la réponse à ${updated.reference}.`, life: 3000 });
                },
                error: (error: unknown) => this.showError(error)
            });
    }

    private replace(updated: DataConcernAdmin): void {
        this.concerns.update((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    }

    private showError(error: unknown): void {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
    }
}
