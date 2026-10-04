import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { Consultation, participationError, phaseSeverity } from './participation.model';
import { ParticipationService } from './participation.service';

/** « Donner mon avis » (F65, F66) : consultations ouvertes, à venir et résultats publiés. */
@Component({
    selector: 'app-consultations',
    imports: [DatePipe, RouterLink, TagModule],
    templateUrl: './consultations.html'
})
export class Consultations implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    readonly navigation = inject(MunicipalNavigation);

    readonly severity = phaseSeverity;
    readonly consultations = signal<Consultation[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    readonly open = computed(() => this.consultations().filter((item) => item.phase === 'Ouverte'));
    readonly upcoming = computed(() => this.consultations().filter((item) => item.phase === 'À venir'));
    readonly finished = computed(() => this.consultations().filter((item) => item.phase === 'Clôturée' || item.phase === 'Décision publiée'));
    readonly groups = computed(() => [
        { id: 'open', title: 'Ouvertes : votre avis compte', items: this.open(), empty: 'Aucune consultation ouverte en ce moment.' },
        { id: 'upcoming', title: 'Bientôt ouvertes', items: this.upcoming(), empty: '' },
        { id: 'finished', title: 'Résultats et décisions', items: this.finished(), empty: '' }
    ]);

    ngOnInit(): void {
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => !this.loading()
        );
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .consultations()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.consultations.set(items), error: (error: unknown) => this.error.set(participationError(error)) });
    }
}
