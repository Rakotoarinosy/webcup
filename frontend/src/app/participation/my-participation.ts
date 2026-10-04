import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { MyParticipation as MyParticipationData, RATING_LABELS, ideaSeverity, ideaStepLabel, participationError, phaseSeverity } from './participation.model';
import { ParticipationService } from './participation.service';

/** « Ma participation » : idées, réponses aux consultations et avis, avec leur état et les réponses de la mairie. */
@Component({
    selector: 'app-my-participation',
    imports: [DatePipe, RouterLink, ButtonModule, TagModule],
    templateUrl: './my-participation.html'
})
export class MyParticipation implements OnInit {
    private readonly api = inject(ParticipationService);

    readonly ideaSeverity = ideaSeverity;
    readonly phaseSeverity = phaseSeverity;
    readonly stepLabel = ideaStepLabel;
    readonly labels = RATING_LABELS;
    readonly data = signal<MyParticipationData | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .mine()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (data) => this.data.set(data), error: (error: unknown) => this.error.set(participationError(error)) });
    }
}
