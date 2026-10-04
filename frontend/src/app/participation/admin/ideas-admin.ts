import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Observable, finalize } from 'rxjs';

import { IDEA_STATUSES, IDEA_VISIBILITIES, IdeaAdmin, IdeaStatus, IdeaVisibility, ideaSeverity, ideaStepLabel, participationError } from '../participation.model';
import { ParticipationService } from '../participation.service';

/** Étapes possibles depuis chaque état (miroir de IDEA_TRANSITIONS côté backend). */
export const NEXT_STATUSES: Record<IdeaStatus, IdeaStatus[]> = {
    Reçue: ["À l'étude", 'Retenue', 'Non retenue'],
    "À l'étude": ['Retenue', 'Non retenue'],
    Retenue: ['Réalisée'],
    'Non retenue': [],
    Réalisée: []
};
const MOTIVATED: IdeaStatus[] = ['Retenue', 'Non retenue', 'Réalisée'];

/** Boîte à idées côté mairie : modération de la publication et réponse motivée à chaque étape. */
@Component({
    selector: 'app-ideas-admin',
    imports: [DatePipe, FormsModule, ButtonModule, DialogModule, TagModule, ToastModule],
    templateUrl: './ideas-admin.html',
    providers: [MessageService]
})
export class IdeasAdmin implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly messages = inject(MessageService);

    readonly statuses = IDEA_STATUSES;
    readonly visibilities = IDEA_VISIBILITIES;
    readonly next = NEXT_STATUSES;
    readonly severity = ideaSeverity;
    readonly stepLabel = ideaStepLabel;
    readonly ideas = signal<IdeaAdmin[]>([]);
    readonly loading = signal(false);
    readonly busy = signal(false);

    status: IdeaStatus | '' = '';
    visibility: IdeaVisibility | '' = '';
    target: IdeaAdmin | null = null;
    nextStatus: IdeaStatus | '' = '';
    response = '';
    statusVisible = false;
    moderationVisibility: IdeaVisibility = 'Publiée';
    moderationNote = '';
    moderationVisible = false;

    get responseRequired(): boolean {
        return !!this.nextStatus && MOTIVATED.includes(this.nextStatus);
    }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.api
            .managedIdeas(this.status || null, this.visibility || null)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.ideas.set(items), error: (error: unknown) => this.fail(error) });
    }

    openStatus(idea: IdeaAdmin): void {
        this.target = idea;
        this.nextStatus = this.next[idea.status][0] ?? '';
        this.response = '';
        this.statusVisible = true;
    }

    saveStatus(form: NgForm): void {
        const idea = this.target;
        const status = this.nextStatus;
        if (form.invalid || !idea || !status || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        this.run(this.api.changeIdeaStatus(idea.id, status, this.response.trim() || null), `Idée ${status.toLowerCase()}`, () => (this.statusVisible = false));
    }

    openModeration(idea: IdeaAdmin): void {
        this.target = idea;
        this.moderationVisibility = idea.visibility === 'Publiée' ? 'Non publiée' : 'Publiée';
        this.moderationNote = idea.moderation_note ?? '';
        this.moderationVisible = true;
    }

    saveModeration(form: NgForm): void {
        const idea = this.target;
        if (form.invalid || !idea || this.busy()) return;
        this.run(this.api.moderateIdea(idea.id, this.moderationVisibility, this.moderationNote.trim() || null), 'Modération enregistrée', () => (this.moderationVisible = false));
    }

    private run(request: Observable<IdeaAdmin>, summary: string, done: () => void): void {
        this.busy.set(true);
        request.pipe(finalize(() => this.busy.set(false))).subscribe({
            next: (saved) => {
                this.ideas.update((items) => items.map((item) => (item.id === saved.id ? saved : item)));
                this.messages.add({ severity: 'success', summary, detail: saved.reference, life: 3000 });
                done();
            },
            error: (error: unknown) => this.fail(error)
        });
    }

    private fail(error: unknown): void {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: participationError(error), life: 5000 });
    }
}
