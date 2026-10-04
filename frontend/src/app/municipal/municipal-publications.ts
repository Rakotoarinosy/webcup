import { ActivatedRoute, Router } from '@angular/router';
import { LiveDataService } from '@/app/shared/live-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, map, of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '@/app/auth/auth.service';
import { MunicipalPublication, MunicipalPublicationComment } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { PublicationEditor, PublicationDraft } from './publication-editor/publication-editor';
import { PublicationReadService } from './publication-read.service';
import { ExplainSimply } from '../shared/plain-language/explain-simply';

@Component({
    selector: 'app-municipal-publications',
    imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, ExplainSimply, PublicationEditor, SelectModule, TextareaModule, ToastModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './municipal-publications.html',
    styleUrl: './municipal-publications.scss'
})
export class MunicipalPublications implements OnInit {
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly content = inject(MunicipalContentService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly reads = inject(PublicationReadService);
    readonly auth = inject(AuthService);
    private readonly confirmation = inject(ConfirmationService);
    private readonly messages = inject(MessageService);
    readonly expandedPublication = signal<string | null>(null);
    readonly selectedPublication = signal<MunicipalPublication | null>(null);
    readonly comments = signal<MunicipalPublicationComment[]>([]);
    readonly commentsLoading = signal(false);
    readonly submittingComment = signal(false);
    readonly likedPublicationIds = signal<Set<string>>(new Set());
    readonly loading = signal(false);
    readonly saving = signal(false);
    readonly error = signal<string | null>(null);
    readonly publications = signal<MunicipalPublication[]>([]);
    readonly selectedCategory = signal<string | null>(null);
    readonly editorVisible = signal(false);
    readonly editingId = signal<string | null>(null);
    readonly editorInitial = signal<Partial<PublicationDraft>>({});
    readonly saveError = signal<string | null>(null);
    readonly canManage = computed(() => this.auth.hasRole('admin', 'agent', 'manager'));
    readonly isCitizen = computed(() => this.auth.hasRole('citizen'));
    readonly categories = computed(() => [...new Set(this.publications().map((item) => item.category))].map((label) => ({ label, value: label })));

    readonly visiblePublications = computed(() => this.publications().filter((item) => !this.selectedCategory() || item.category === this.selectedCategory()));

    ngOnInit(): void {
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.expandedPublication.set(params.get('publication')));
        this.load();
        this.live.watch(
            this.destroyRef,
            () => this.load(),
            () => !this.loading()
        );
    }
    load(): void {
        if (this.loading()) return;
        this.loading.set(true);
        this.error.set(null);
        const request = this.canManage() ? this.content.managedPublications() : this.content.publications();
        request
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (items) => this.publications.set(items),
                error: () => this.error.set('Impossible de charger les publications. Réessayez.')
            });
    }
    openPublication(publication: MunicipalPublication): void {
        this.expandedPublication.set(publication.id);
        this.selectedPublication.set(publication);
        this.reads.markRead(publication.id);
        this.content.viewPublication(publication.id).subscribe({
                next: (updated) => {
                    this.replacePublication(updated);
                    this.selectedPublication.set(updated);
                },
                error: () => undefined
            });
        if (this.isCitizen()) {
            this.loadComments(publication.id);
        }
    }

    closePublication(): void {
        this.selectedPublication.set(null);
        this.comments.set([]);
    }
    selectCategory(value: string | null): void {
        this.selectedCategory.set(value);
    }

    openCreate(): void {
        this.editingId.set(null);
        this.editorInitial.set({});
        this.saveError.set(null);
        this.editorVisible.set(true);
    }

    openEdit(publication: MunicipalPublication, event: Event): void {
        event.stopPropagation();
        this.editingId.set(publication.id);
        this.editorInitial.set({
            title: publication.title,
            category: publication.category,
            summary: publication.summary,
            content: publication.content,
            coverUrl: publication.image_url ?? '',
            publishedAt: new Date(publication.published_at),
            publishImmediately: false
        });
        this.saveError.set(null);
        this.editorVisible.set(true);
    }

    save(draft: PublicationDraft): void {
        this.saving.set(true);
        this.saveError.set(null);
        const publicationId = this.editingId();
        // Image locale : envoyée d'abord au serveur, la publication ne garde que l'URL renvoyée.
        const imageUrl$ = draft.coverFile ? this.content.uploadPublicationImage(draft.coverFile).pipe(map((result) => result.url)) : of(draft.coverUrl.trim() || null);
        imageUrl$
            .pipe(
                switchMap((imageUrl) => {
                    const payload = {
                        title: draft.title,
                        summary: draft.summary,
                        content: draft.content,
                        category: draft.category,
                        published_at: draft.publishedAt.toISOString(),
                        is_published: true,
                        image_url: imageUrl
                    };
                    return publicationId ? this.content.updatePublication(publicationId, payload) : this.content.createPublication(payload);
                }),
                finalize(() => this.saving.set(false))
            )
            .subscribe({
                next: (publication) => {
                    this.publications.update((items) => (publicationId ? items.map((item) => (item.id === publication.id ? publication : item)) : [publication, ...items]));
                    this.editorVisible.set(false);
                    this.messages.add({ severity: 'success', summary: publicationId ? 'Publication modifiée' : 'Publication créée', detail: 'Les informations ont été enregistrées.' });
                },
                error: (error: unknown) => {
                    const detail = error instanceof HttpErrorResponse && typeof error.error?.detail === 'string' ? error.error.detail : null;
                    this.saveError.set(detail ?? 'Enregistrement impossible. Veuillez réessayer.');
                }
            });
    }

    confirmDelete(publication: MunicipalPublication, event: Event): void {
        event.stopPropagation();
        this.confirmation.confirm({
            message: `Supprimer définitivement « ${publication.title} » ?`,
            header: 'Supprimer la publication',
            acceptLabel: 'Supprimer',
            rejectLabel: 'Annuler',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.content.deletePublication(publication.id).subscribe({
                    next: () => {
                        this.publications.update((items) => items.filter((item) => item.id !== publication.id));
                        this.messages.add({ severity: 'success', summary: 'Publication supprimée' });
                    },
                    error: () => this.messages.add({ severity: 'error', summary: 'Suppression impossible', detail: 'Veuillez réessayer.' })
                });
            }
        });
    }

    likePublication(publication: MunicipalPublication, event: Event): void {
        event.stopPropagation();
        if (!this.auth.isAuthenticated()) {
            void this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
            return;
        }
        if (!this.isCitizen()) return;
        this.content.likePublication(publication.id).subscribe({
            next: (result) => {
                this.publications.update((items) => items.map((item) => item.id === publication.id ? { ...item, like_count: result.like_count } : item));
                this.selectedPublication.update((item) => item?.id === publication.id ? { ...item, like_count: result.like_count } : item);
                this.likedPublicationIds.update((ids) => {
                    const next = new Set(ids);
                    result.liked ? next.add(publication.id) : next.delete(publication.id);
                    return next;
                });
            },
            error: () => this.messages.add({ severity: 'error', summary: 'Action impossible', detail: 'Veuillez réessayer.' })
        });
    }

    addComment(content: string): void {
        if (!this.auth.isAuthenticated()) {
            void this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
            return;
        }
        const publication = this.selectedPublication();
        const trimmed = content.trim();
        if (!publication || !trimmed || this.submittingComment()) return;
        this.submittingComment.set(true);
        this.content.addPublicationComment(publication.id, trimmed).pipe(finalize(() => this.submittingComment.set(false))).subscribe({
            next: (comment) => this.comments.update((items) => [comment, ...items]),
            error: () => this.messages.add({ severity: 'error', summary: 'Commentaire non envoyé', detail: 'Veuillez réessayer.' })
        });
    }

    private loadComments(publicationId: string): void {
        this.commentsLoading.set(true);
        this.content.publicationComments(publicationId).pipe(finalize(() => this.commentsLoading.set(false))).subscribe({
            next: (comments) => this.comments.set(comments),
            error: () => this.messages.add({ severity: 'warn', summary: 'Commentaires indisponibles', detail: 'Ils pourront être rechargés plus tard.' })
        });
    }

    private replacePublication(publication: MunicipalPublication): void {
        this.publications.update((items) => items.map((item) => (item.id === publication.id ? publication : item)));
    }

    private toLocalDateTime(value: string): string {
        const date = new Date(value);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date.toISOString().slice(0, 16);
    }
}
