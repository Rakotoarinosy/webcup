import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { CityProject, PROJECT_STATUSES, ProjectStatus, participationError, projectSeverity } from './participation.model';
import { ParticipationService } from './participation.service';

/** « Projets de la ville » (F67) : ce qui se prépare et se construit, filtrable par état et par quartier. */
@Component({
    selector: 'app-projects',
    imports: [DatePipe, FormsModule, RouterLink, TagModule],
    templateUrl: './projects.html'
})
export class Projects implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    readonly navigation = inject(MunicipalNavigation);

    readonly statuses = PROJECT_STATUSES;
    readonly severity = projectSeverity;
    readonly projects = signal<CityProject[]>([]);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly status = signal<ProjectStatus | ''>('');
    readonly district = signal('');

    /** Quartiers connus, tirés des projets publiés. */
    readonly districts = computed(() => [...new Set(this.projects().map((project) => project.district))].sort((a, b) => a.localeCompare(b, 'fr')));
    readonly visible = computed(() => this.projects().filter((project) => (!this.status() || project.status === this.status()) && (!this.district() || project.district === this.district())));

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
            .projects()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.projects.set(items), error: (error: unknown) => this.error.set(participationError(error)) });
    }
}
