import { DatePipe } from '@angular/common';
import { Component, ElementRef, Injector, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { Consultation, ConsultationResponse, participationError, phaseSeverity, share } from './participation.model';
import { ParticipationService } from './participation.service';

/**
 * Une consultation : la question, les règles, la réponse de l'habitant (une seule, modifiable
 * tant que c'est ouvert) avec sa référence, puis les résultats anonymes et la décision de la mairie.
 */
@Component({
    selector: 'app-consultation-detail',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, TagModule],
    templateUrl: './consultation-detail.html'
})
export class ConsultationDetail implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly injector = inject(Injector);
    private readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');
    readonly auth = inject(AuthService);
    readonly navigation = inject(MunicipalNavigation);

    readonly severity = phaseSeverity;
    readonly share = share;
    readonly consultation = signal<Consultation | null>(null);
    readonly response = signal<ConsultationResponse | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly sending = signal(false);
    readonly sendError = signal<string | null>(null);
    /** Vrai juste après l'envoi : la confirmation est annoncée et reçoit le focus. */
    readonly justSent = signal(false);

    choice = '';
    comment = '';
    submitted = false;

    get canAnswer(): boolean {
        return this.auth.hasRole('citizen') && !this.auth.hasRole('admin');
    }

    get currentUrl(): string {
        return this.router.url;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.loading.set(true);
        this.api
            .consultation(id)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (consultation) => {
                    this.consultation.set(consultation);
                    if (this.canAnswer) this.loadMine(consultation.id);
                },
                error: (error: unknown) => this.error.set(participationError(error))
            });
    }

    private loadMine(id: string): void {
        this.api.myResponse(id).subscribe({
            next: (response) => {
                this.response.set(response);
                if (response) {
                    this.choice = response.choice ?? '';
                    this.comment = response.comment ?? '';
                }
            },
            error: () => this.response.set(null)
        });
    }

    send(form: NgForm, consultation: Consultation): void {
        this.submitted = true;
        const isVote = consultation.kind === 'Vote à choix';
        const comment = this.comment.trim();
        if (form.invalid || (isVote && !this.choice) || (!isVote && !comment) || this.sending()) {
            form.control.markAllAsTouched();
            return;
        }
        this.sending.set(true);
        this.sendError.set(null);
        this.justSent.set(false);
        this.api
            .answer(consultation.id, isVote ? this.choice : null, comment || null)
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (response) => {
                    this.response.set(response);
                    this.justSent.set(true);
                    this.submitted = false;
                    afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
                },
                error: (error: unknown) => this.sendError.set(participationError(error))
            });
    }
}
