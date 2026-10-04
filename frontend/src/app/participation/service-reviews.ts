import { DatePipe } from '@angular/common';
import { Component, ElementRef, Injector, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { RATING_LABELS, Review, ServiceReviews as ServiceReviewsData, participationError, ratingText } from './participation.model';
import { ParticipationService } from './participation.service';

/**
 * Avis sur un service municipal (F76) : note de 1 à 5 choisie avec des boutons radio libellés
 * (« 4 — Satisfait »), commentaire, confirmation avec référence, réponse de la mairie.
 */
@Component({
    selector: 'app-service-reviews',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule],
    templateUrl: './service-reviews.html'
})
export class ServiceReviews implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly injector = inject(Injector);
    private readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');
    readonly auth = inject(AuthService);
    readonly navigation = inject(MunicipalNavigation);

    readonly ratings = [5, 4, 3, 2, 1];
    readonly labels = RATING_LABELS;
    readonly ratingText = ratingText;
    readonly data = signal<ServiceReviewsData | null>(null);
    readonly mine = signal<Review | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly sending = signal(false);
    readonly sendError = signal<string | null>(null);
    readonly justSent = signal(false);

    rating: number | null = null;
    comment = '';
    submitted = false;
    private serviceId = '';

    get isCitizen(): boolean {
        return this.auth.hasRole('citizen') && !this.auth.hasRole('admin');
    }

    get currentUrl(): string {
        return this.router.url;
    }

    ngOnInit(): void {
        this.serviceId = this.route.snapshot.paramMap.get('id') ?? '';
        this.load();
        if (this.isCitizen) {
            this.api.myReview(this.serviceId).subscribe({
                next: (review) => {
                    this.mine.set(review);
                    if (review) {
                        this.rating = review.rating;
                        this.comment = review.comment;
                    }
                },
                error: () => undefined
            });
        }
    }

    load(): void {
        this.loading.set(true);
        this.api
            .serviceReviews(this.serviceId)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (data) => this.data.set(data), error: (error: unknown) => this.error.set(participationError(error)) });
    }

    send(form: NgForm): void {
        this.submitted = true;
        const rating = this.rating;
        if (form.invalid || rating === null || this.sending()) {
            form.control.markAllAsTouched();
            return;
        }
        this.sending.set(true);
        this.sendError.set(null);
        this.justSent.set(false);
        this.api
            .review(this.serviceId, rating, this.comment.trim())
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (review) => {
                    this.mine.set(review);
                    this.justSent.set(true);
                    this.submitted = false;
                    this.load();
                    afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
                },
                error: (error: unknown) => this.sendError.set(participationError(error))
            });
    }
}
