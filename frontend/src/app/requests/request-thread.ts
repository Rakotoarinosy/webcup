import { DatePipe } from '@angular/common';
import { Component, OnChanges, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

import { apiErrorMessage } from '@/app/users/user.service';
import { MESSAGE_MAX_LENGTH, MessageVisibility, QUICK_REPLIES, RequestMessage } from './request.model';
import { CitizenRequestService } from './request.service';

let nextId = 0;

/**
 * Fil de messages d'une demande (F84), partagé par le citoyen (Mes demandes), l'agent
 * (Mes interventions) et le gestionnaire (Demandes citoyennes).
 * `staff` : propose les modèles de réponses rapides et la note interne (jamais visible du citoyen).
 */
@Component({
    selector: 'app-request-thread',
    imports: [DatePipe, FormsModule],
    templateUrl: './request-thread.html'
})
export class RequestThread implements OnChanges {
    private readonly api = inject(CitizenRequestService);

    readonly requestId = input.required<string>();
    readonly staff = input(false);
    readonly canWrite = input(true);
    /** Émis après un envoi réussi (pour rafraîchir l'indicateur « réponse attendue »). */
    readonly posted = output<RequestMessage>();

    protected readonly uid = `thread-${++nextId}`;
    protected readonly messages = signal<RequestMessage[]>([]);
    protected readonly loading = signal(false);
    protected readonly loadError = signal<string | null>(null);
    protected readonly sending = signal(false);
    protected readonly sendError = signal<string | null>(null);
    protected readonly confirmation = signal<string | null>(null);
    protected readonly attempted = signal(false);
    protected readonly quickReplies = QUICK_REPLIES;
    protected readonly maxLength = MESSAGE_MAX_LENGTH;
    protected body = '';
    protected visibility: MessageVisibility = 'public';

    protected readonly publicCount = computed(() => this.messages().filter((m) => m.visibility === 'public').length);

    ngOnChanges(): void {
        this.body = '';
        this.attempted.set(false);
        this.confirmation.set(null);
        this.load();
    }

    protected load(): void {
        this.loading.set(true);
        this.loadError.set(null);
        this.api
            .messages(this.requestId())
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (messages) => this.messages.set(messages),
                error: (error: unknown) => this.loadError.set(apiErrorMessage(error))
            });
    }

    protected useTemplate(body: string): void {
        this.body = body;
        this.visibility = 'public';
        document.getElementById(`${this.uid}-body`)?.focus();
    }

    protected invalid(): boolean {
        return this.attempted() && !this.body.trim();
    }

    protected send(): void {
        this.attempted.set(true);
        this.confirmation.set(null);
        const body = this.body.trim();
        if (!body) {
            this.sendError.set('Écrivez un message avant de l’envoyer.');
            document.getElementById(`${this.uid}-body`)?.focus();
            return;
        }
        if (this.sending()) return;
        const visibility: MessageVisibility = this.staff() ? this.visibility : 'public';
        this.sending.set(true);
        this.sendError.set(null);
        this.api
            .postMessage(this.requestId(), { body, visibility })
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (message) => {
                    this.messages.update((items) => [...items, message]);
                    this.body = '';
                    this.attempted.set(false);
                    this.confirmation.set(visibility === 'internal' ? 'Note interne enregistrée (non visible du citoyen).' : 'Message envoyé.');
                    this.posted.emit(message);
                },
                error: (error: unknown) => this.sendError.set(apiErrorMessage(error))
            });
    }

    protected authorLabel(message: RequestMessage): string {
        if (!message.from_staff) return this.staff() ? `${message.author_name} (citoyen)` : 'Vous';
        return message.author_role === 'agent' ? `${message.author_name} (agent)` : `${message.author_name} (mairie)`;
    }
}
