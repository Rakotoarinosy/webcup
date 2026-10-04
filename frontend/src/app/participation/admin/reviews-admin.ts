import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Observable, finalize } from 'rxjs';

import { RATING_LABELS, ReviewAdmin, participationError } from '../participation.model';
import { ParticipationService } from '../participation.service';

/** Avis sur les services côté mairie : réponse publique et modération. */
@Component({
    selector: 'app-reviews-admin',
    imports: [DatePipe, FormsModule, ButtonModule, DialogModule, TagModule, ToastModule],
    templateUrl: './reviews-admin.html',
    providers: [MessageService]
})
export class ReviewsAdmin implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly messages = inject(MessageService);

    readonly labels = RATING_LABELS;
    readonly reviews = signal<ReviewAdmin[]>([]);
    readonly loading = signal(false);
    readonly busy = signal<string | null>(null);

    answering: ReviewAdmin | null = null;
    response = '';
    answerVisible = false;

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.api
            .managedReviews()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.reviews.set(items), error: (error: unknown) => this.fail(error) });
    }

    openAnswer(review: ReviewAdmin): void {
        this.answering = review;
        this.response = '';
        this.answerVisible = true;
    }

    sendAnswer(form: NgForm): void {
        const review = this.answering;
        if (form.invalid || !review || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        this.run(review.id, this.api.answerReview(review.id, this.response.trim()), 'Réponse publiée', () => (this.answerVisible = false));
    }

    toggleHidden(review: ReviewAdmin): void {
        this.run(review.id, this.api.moderateReview(review.id, !review.is_hidden), review.is_hidden ? 'Avis de nouveau visible' : 'Avis masqué', () => undefined);
    }

    private run(id: string, request: Observable<ReviewAdmin>, summary: string, done: () => void): void {
        this.busy.set(id);
        request.pipe(finalize(() => this.busy.set(null))).subscribe({
            next: (saved) => {
                this.reviews.update((items) => items.map((item) => (item.id === saved.id ? saved : item)));
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
