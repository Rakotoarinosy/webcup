import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Observable, finalize, forkJoin } from 'rxjs';

import { CONSULTATION_KINDS, CityProject, Consultation, ConsultationKind, Contribution, participationError, phaseSeverity, share } from '../participation.model';
import { ParticipationService } from '../participation.service';

interface ConsultationForm {
    title: string;
    question: string;
    description: string;
    kind: ConsultationKind;
    options: string; // une proposition par ligne
    rules: string;
    opens_at: string; // datetime-local
    closes_at: string;
    project_id: string;
    is_published: boolean;
}

/** Valeur d'un champ datetime-local (heure locale) pour un instant ISO. */
export function toLocalInput(iso: string): string {
    const date = new Date(iso);
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function emptyForm(): ConsultationForm {
    const now = new Date();
    const inTwoWeeks = new Date(now.getTime() + 14 * 24 * 3600 * 1000);
    return { title: '', question: '', description: '', kind: 'Vote à choix', options: '', rules: '', opens_at: toLocalInput(now.toISOString()), closes_at: toLocalInput(inTwoWeeks.toISOString()), project_id: '', is_published: true };
}

/** Gestion des consultations (mairie) : création, clôture, lecture des avis, publication de la décision. */
@Component({
    selector: 'app-consultations-admin',
    imports: [DatePipe, FormsModule, ButtonModule, DialogModule, TagModule, ToastModule],
    templateUrl: './consultations-admin.html',
    providers: [MessageService]
})
export class ConsultationsAdmin implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly messages = inject(MessageService);

    readonly kinds = CONSULTATION_KINDS;
    readonly severity = phaseSeverity;
    readonly share = share;
    readonly consultations = signal<Consultation[]>([]);
    readonly projects = signal<CityProject[]>([]);
    readonly loading = signal(false);
    readonly busy = signal(false);
    readonly contributions = signal<Contribution[]>([]);

    editing: Consultation | null = null;
    form: ConsultationForm = emptyForm();
    formVisible = false;
    deciding: Consultation | null = null;
    decision = '';
    decisionVisible = false;
    reading: Consultation | null = null;
    contributionsVisible = false;

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        forkJoin({ consultations: this.api.managedConsultations(), projects: this.api.managedProjects() })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ consultations, projects }) => {
                    this.consultations.set(consultations);
                    this.projects.set(projects);
                },
                error: (error: unknown) => this.fail(error)
            });
    }

    openCreate(): void {
        this.editing = null;
        this.form = emptyForm();
        this.formVisible = true;
    }

    openEdit(consultation: Consultation): void {
        this.editing = consultation;
        this.form = {
            title: consultation.title,
            question: consultation.question,
            description: consultation.description,
            kind: consultation.kind,
            options: consultation.options.join('\n'),
            rules: consultation.rules,
            opens_at: toLocalInput(consultation.opens_at),
            closes_at: toLocalInput(consultation.closes_at),
            project_id: consultation.project_id ?? '',
            is_published: consultation.is_published
        };
        this.formVisible = true;
    }

    save(form: NgForm): void {
        if (form.invalid || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        const f = this.form;
        const payload = {
            title: f.title.trim(),
            question: f.question.trim(),
            description: f.description.trim(),
            kind: f.kind,
            options: f.kind === 'Vote à choix' ? f.options.split('\n').map((line) => line.trim()).filter(Boolean) : [],
            rules: f.rules.trim() || null,
            opens_at: new Date(f.opens_at).toISOString(),
            closes_at: new Date(f.closes_at).toISOString(),
            project_id: f.project_id || null,
            is_published: f.is_published
        };
        const request = this.editing ? this.api.updateConsultation(this.editing.id, payload) : this.api.createConsultation(payload);
        this.run(request, this.editing ? 'Consultation mise à jour' : 'Consultation créée', () => (this.formVisible = false));
    }

    close(consultation: Consultation): void {
        this.run(this.api.closeConsultation(consultation.id), 'Consultation clôturée', () => undefined);
    }

    openDecision(consultation: Consultation): void {
        this.deciding = consultation;
        this.decision = '';
        this.decisionVisible = true;
    }

    publishDecision(form: NgForm): void {
        const consultation = this.deciding;
        if (form.invalid || !consultation || this.busy()) {
            form.control.markAllAsTouched();
            return;
        }
        this.run(this.api.publishDecision(consultation.id, this.decision.trim()), 'Décision publiée', () => (this.decisionVisible = false));
    }

    openContributions(consultation: Consultation): void {
        this.reading = consultation;
        this.contributions.set([]);
        this.contributionsVisible = true;
        this.api.contributions(consultation.id).subscribe({ next: (items) => this.contributions.set(items), error: (error: unknown) => this.fail(error) });
    }

    private run(request: Observable<Consultation>, summary: string, done: () => void): void {
        this.busy.set(true);
        request.pipe(finalize(() => this.busy.set(false))).subscribe({
            next: (saved) => {
                this.consultations.update((items) => (items.some((item) => item.id === saved.id) ? items.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...items]));
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
