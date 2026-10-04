import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Observable, finalize } from 'rxjs';

import { CityProject, PROJECT_STATUSES, ProjectIn, participationError, projectSeverity } from '../participation.model';
import { ParticipationService } from '../participation.service';

function emptyProject(): ProjectIn {
    return { title: '', summary: '', description: '', district: '', location: null, budget: null, status: "À l'étude", progress: 0, planned_start: null, planned_end: null, is_published: true };
}

/** Gestion des projets de la ville (mairie) : fiche, état, avancement, étapes datées. */
@Component({
    selector: 'app-projects-admin',
    imports: [DatePipe, FormsModule, ButtonModule, DialogModule, TagModule, ToastModule],
    templateUrl: './projects-admin.html',
    providers: [MessageService]
})
export class ProjectsAdmin implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly messages = inject(MessageService);

    readonly statuses = PROJECT_STATUSES;
    readonly severity = projectSeverity;
    readonly projects = signal<CityProject[]>([]);
    readonly loading = signal(false);
    readonly busy = signal(false);

    editing: CityProject | null = null;
    form: ProjectIn = emptyProject();
    formVisible = false;
    newsFor: CityProject | null = null;
    news = { title: '', content: '' };
    newsVisible = false;

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.api
            .managedProjects()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.projects.set(items), error: (error: unknown) => this.fail(error) });
    }

    openCreate(): void {
        this.editing = null;
        this.form = emptyProject();
        this.formVisible = true;
    }

    openEdit(project: CityProject): void {
        this.editing = project;
        const { title, summary, description, district, location, budget, status, progress, planned_start, planned_end, is_published } = project;
        this.form = { title, summary, description, district, location, budget, status, progress, planned_start, planned_end, is_published };
        this.formVisible = true;
    }

    save(form: NgForm): void {
        if (form.invalid || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        const payload: ProjectIn = { ...this.form, location: this.form.location?.trim() || null, budget: this.form.budget?.trim() || null, planned_start: this.form.planned_start || null, planned_end: this.form.planned_end || null };
        const request: Observable<CityProject> = this.editing ? this.api.updateProject(this.editing.id, payload) : this.api.createProject(payload);
        this.run(request, this.editing ? 'Projet mis à jour' : 'Projet créé', () => (this.formVisible = false));
    }

    openNews(project: CityProject): void {
        this.newsFor = project;
        this.news = { title: '', content: '' };
        this.newsVisible = true;
    }

    publishNews(form: NgForm): void {
        const project = this.newsFor;
        if (form.invalid || !project || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        this.run(this.api.publishNews(project.id, this.news.title.trim(), this.news.content.trim()), 'Actualité publiée', () => (this.newsVisible = false));
    }

    private run(request: Observable<CityProject>, summary: string, done: () => void): void {
        this.busy.set(true);
        request.pipe(finalize(() => this.busy.set(false))).subscribe({
            next: (saved) => {
                this.projects.update((items) => (items.some((item) => item.id === saved.id) ? items.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...items]));
                this.messages.add({ severity: 'success', summary, detail: saved.title, life: 3000 });
                done();
            },
            error: (error: unknown) => this.fail(error)
        });
    }

    private fail(error: unknown): void {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: participationError(error), life: 5000 });
    }
}
