import { DatePipe } from '@angular/common';
import { Component, ElementRef, Injector, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { IDEA_STATUSES, IDEA_THEMES, Idea, IdeaStatus, IdeaTheme, PublicIdea, ideaSeverity, participationError } from './participation.model';
import { ParticipationService } from './participation.service';

interface IdeaForm {
    title: string;
    description: string;
    theme: IdeaTheme | '';
    district: string;
}

/** Boîte à idées (F68) : proposer une idée, suivre sa prise en compte, soutenir celles des autres. */
@Component({
    selector: 'app-ideas',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, TagModule],
    templateUrl: './ideas.html'
})
export class Ideas implements OnInit {
    private readonly api = inject(ParticipationService);
    private readonly router = inject(Router);
    private readonly injector = inject(Injector);
    private readonly confirmation = viewChild<ElementRef<HTMLElement>>('confirmation');
    readonly auth = inject(AuthService);
    readonly navigation = inject(MunicipalNavigation);

    readonly themes = IDEA_THEMES;
    readonly statuses = IDEA_STATUSES;
    readonly severity = ideaSeverity;
    readonly ideas = signal<PublicIdea[]>([]);
    readonly status = signal<IdeaStatus | ''>('');
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly supported = signal<Set<string>>(new Set());
    readonly own = signal<Set<string>>(new Set());
    readonly supporting = signal<string | null>(null);
    readonly supportMessage = signal<string | null>(null);
    readonly sending = signal(false);
    readonly sendError = signal<string | null>(null);
    readonly sent = signal<Idea | null>(null);

    form: IdeaForm = { title: '', description: '', theme: '', district: '' };
    submitted = false;

    get isCitizen(): boolean {
        return this.auth.hasRole('citizen') && !this.auth.hasRole('admin');
    }

    get currentUrl(): string {
        return this.router.url;
    }

    ngOnInit(): void {
        this.load();
        if (this.isCitizen) {
            this.api.mine().subscribe({
                next: (mine) => {
                    this.supported.set(new Set(mine.supported_idea_ids));
                    this.own.set(new Set(mine.ideas.map((idea) => idea.id)));
                },
                error: () => undefined
            });
        }
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api
            .ideas(this.status() || null)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({ next: (items) => this.ideas.set(items), error: (error: unknown) => this.error.set(participationError(error)) });
    }

    filter(status: IdeaStatus | ''): void {
        this.status.set(status);
        this.load();
    }

    toggleSupport(idea: PublicIdea): void {
        if (this.supporting()) return;
        this.supporting.set(idea.id);
        this.api
            .toggleSupport(idea.id)
            .pipe(finalize(() => this.supporting.set(null)))
            .subscribe({
                next: ({ supported, support_count }) => {
                    this.ideas.update((items) => items.map((item) => (item.id === idea.id ? { ...item, support_count } : item)));
                    this.supported.update((ids) => {
                        const next = new Set(ids);
                        if (supported) next.add(idea.id);
                        else next.delete(idea.id);
                        return next;
                    });
                    this.supportMessage.set(supported ? `Votre soutien à « ${idea.title} » est enregistré.` : `Vous ne soutenez plus « ${idea.title} ».`);
                },
                error: (error: unknown) => this.supportMessage.set(participationError(error))
            });
    }

    send(form: NgForm): void {
        this.submitted = true;
        const theme = this.form.theme;
        if (form.invalid || !theme || this.sending()) {
            form.control.markAllAsTouched();
            return;
        }
        this.sending.set(true);
        this.sendError.set(null);
        this.api
            .submitIdea({ title: this.form.title.trim(), description: this.form.description.trim(), theme, district: this.form.district.trim() || null })
            .pipe(finalize(() => this.sending.set(false)))
            .subscribe({
                next: (idea) => {
                    this.sent.set(idea);
                    this.own.update((ids) => new Set([...ids, idea.id]));
                    this.form = { title: '', description: '', theme: '', district: '' };
                    this.submitted = false;
                    form.resetForm(this.form);
                    afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
                },
                error: (error: unknown) => this.sendError.set(participationError(error))
            });
    }
}
