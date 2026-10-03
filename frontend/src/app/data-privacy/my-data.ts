import { DatePipe } from '@angular/common';
import { Component, ElementRef, Injector, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { apiErrorMessage } from '@/app/users/user.service';
import { CONCERN_TOPICS, ConcernTopic, DataConcern, concernStatusSeverity, concernSteps } from './data-concern.model';
import { DataConcernService } from './data-concern.service';

interface ConcernForm {
    topic: ConcernTopic | '';
    message: string;
}

/**
 * « Mes données » (F51) : ce que la plateforme fait des données, en langage simple,
 * et un signalement dont l'habitant suit le traitement jusqu'à la réponse de la mairie.
 */
@Component({
    selector: 'app-my-data',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, TagModule],
    templateUrl: './my-data.html'
})
export class MyData implements OnInit {
    private readonly api = inject(DataConcernService);
    private readonly injector = inject(Injector);
    private readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');

    readonly topics = CONCERN_TOPICS;
    readonly steps = concernSteps;
    readonly severity = concernStatusSeverity;

    readonly concerns = signal<DataConcern[]>([]);
    readonly loading = signal(false);
    readonly loadError = signal<string | null>(null);
    readonly sending = signal(false);
    readonly sendError = signal<string | null>(null);
    /** Signalement tout juste envoyé : sa référence est annoncée à l'habitant. */
    readonly sent = signal<DataConcern | null>(null);

    form: ConcernForm = { topic: '', message: '' };
    submitted = false;

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.loadError.set(null);
        this.api
            .mine()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (concerns) => this.concerns.set(concerns),
                error: (error: unknown) => this.loadError.set(apiErrorMessage(error))
            });
    }

    send(form: NgForm): void {
        this.submitted = true;
        const topic = this.form.topic;
        if (form.invalid || !topic || this.sending()) {
            form.control.markAllAsTouched();
            return;
        }
        this.sending.set(true);
        this.sendError.set(null);
        this.api
            .submit({ topic, message: this.form.message.trim() })
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (concern) => {
                    this.sent.set(concern);
                    this.concerns.update((items) => [concern, ...items]);
                    this.form = { topic: '', message: '' };
                    this.submitted = false;
                    form.resetForm(this.form);
                    // Le focus suit le message : un lecteur d'écran annonce la référence obtenue.
                    afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
                },
                error: (error: unknown) => this.sendError.set(apiErrorMessage(error))
            });
    }
}
