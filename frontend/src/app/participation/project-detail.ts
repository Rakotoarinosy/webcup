import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { finalize, forkJoin } from 'rxjs';

import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { CityProject, Consultation, participationError, phaseSeverity, projectSeverity } from './participation.model';
import { ParticipationService } from './participation.service';

/** Fiche d'un projet : description, calendrier, étapes datées et consultations liées. */
@Component({
    selector: 'app-project-detail',
    imports: [DatePipe, RouterLink, TagModule],
    templateUrl: './project-detail.html'
})
export class ProjectDetail implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly route = inject(ActivatedRoute);
    readonly navigation = inject(MunicipalNavigation);

    readonly severity = projectSeverity;
    readonly phaseSeverity = phaseSeverity;
    readonly project = signal<CityProject | null>(null);
    readonly consultations = signal<Consultation[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.loading.set(true);
        forkJoin({ project: this.api.project(id), consultations: this.api.consultations(id) })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ project, consultations }) => {
                    this.project.set(project);
                    this.consultations.set(consultations);
                },
                error: (error: unknown) => this.error.set(participationError(error))
            });
    }
}
