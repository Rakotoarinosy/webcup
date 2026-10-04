import { DatePipe } from '@angular/common';
import { Component, OnDestroy, computed, effect, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

// URL http(s) externe, ou image téléversée sur le serveur (servie sous /api/v1/media).
const IMAGE_URL = /^(https?:\/\/|\/api\/v1\/media\/)/i;

export interface PublicationDraft {
    title: string;
    category: string;
    summary: string;
    content: string;
    coverUrl: string;
    coverFile: File | null;
    publishedAt: Date;
    publishImmediately: boolean;
}

@Component({
    selector: 'app-publication-editor',
    imports: [DatePipe, FormsModule, ButtonModule, CheckboxModule, DatePickerModule, EditorModule, InputTextModule, SelectModule, TextareaModule],
    templateUrl: './publication-editor.html',
    styleUrl: './publication-editor.scss'
})
export class PublicationEditor implements OnDestroy {
    readonly initial = input<Partial<PublicationDraft>>({});
    readonly author = input('La mairie');
    readonly saving = input(false);
    readonly saveError = input<string | null>(null);
    readonly saved = output<PublicationDraft>();
    readonly cancelled = output<void>();
    readonly title = signal('');
    readonly category = signal('Information');
    readonly summary = signal('');
    readonly content = signal('');
    readonly coverUrl = signal('');
    readonly coverFile = signal<File | null>(null);
    readonly publishedAt = signal<Date | null>(new Date());
    readonly publishImmediately = signal(true);
    readonly dragging = signal(false);
    readonly imageError = signal<string | null>(null);
    readonly attempted = signal(false);
    readonly imageLoading = signal(false);
    readonly categories = ['Information', 'Vie municipale', 'Événement', 'Travaux', 'Services', 'Culture'];
    private readonly localCover = signal('');
    private selectionVersion = 0;
    readonly imageFailed = signal(false);
    readonly previewImage = computed(() => this.localCover() || (IMAGE_URL.test(this.coverUrl().trim()) ? this.coverUrl().trim() : ''));
    readonly valid = computed(() => this.title().trim().length > 0 && this.category().trim().length > 0 && this.summary().trim().length > 0 && this.content().replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length > 0 && (this.publishImmediately() || (this.publishedAt() !== null && Number.isFinite(this.publishedAt()!.getTime()))));

    constructor() {
        effect(() => {
            const value = this.initial();
            // untracked : sinon l'effet suit aussi localCover (lu par removeFile) et se relance
            // à chaque image choisie, ce qui vide le formulaire et l'image aussitôt.
            untracked(() => {
                this.title.set(value.title ?? '');
                this.category.set(value.category ?? 'Information');
                this.summary.set(value.summary ?? '');
                this.content.set(value.content ?? '');
                this.coverUrl.set(value.coverUrl ?? '');
                this.publishedAt.set(value.publishedAt ?? new Date());
                this.publishImmediately.set(value.publishImmediately ?? true);
                this.removeFile();
                this.attempted.set(false);
            });
        });
        effect(() => { this.previewImage(); this.imageFailed.set(false); });
    }

    selectFile(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0]; if (file) this.readFile(file);
        input.value = '';
    }
    dragOver(event: DragEvent): void { event.preventDefault(); if (!this.saving()) this.dragging.set(true); }
    drop(event: DragEvent): void {
        event.preventDefault(); this.dragging.set(false);
        if (this.saving()) return;
        const file = event.dataTransfer?.files[0]; if (file) this.readFile(file);
    }
    private readFile(file: File): void {
        if (this.saving()) return;
        this.imageError.set(null);
        const version = ++this.selectionVersion;
        this.imageLoading.set(false);
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            this.imageError.set('Choisissez une image JPG, PNG ou WebP.'); return;
        }
        if (file.size > 5 * 1024 * 1024) { this.imageError.set('L’image ne doit pas dépasser 5 Mo.'); return; }
        const url = URL.createObjectURL(file);
        const image = new Image(); this.imageLoading.set(true);
        image.onload = () => {
            if (version !== this.selectionVersion) { URL.revokeObjectURL(url); return; }
            this.releaseCover(); this.localCover.set(url); this.coverFile.set(file); this.imageLoading.set(false);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            if (version !== this.selectionVersion) return;
            this.imageLoading.set(false); this.imageError.set('Cette image ne peut pas être lue. Choisissez un autre fichier.');
        };
        image.src = url;
    }
    removeFile(): void { this.selectionVersion++; this.releaseCover(); this.coverFile.set(null); this.imageLoading.set(false); this.imageError.set(null); }
    private releaseCover(): void { if (this.localCover()) URL.revokeObjectURL(this.localCover()); this.localCover.set(''); }
    ngOnDestroy(): void { this.selectionVersion++; this.releaseCover(); }
    submit(): void {
        this.attempted.set(true);
        if (!this.valid() || this.saving() || this.imageLoading()) return;
        if (!this.coverFile() && this.coverUrl().trim() && !IMAGE_URL.test(this.coverUrl().trim())) {
            this.imageError.set('L’adresse de l’image doit commencer par https:// ou http://.'); return;
        }
        this.saved.emit({ title: this.title().trim(), category: this.category().trim(), summary: this.summary().trim(), content: this.content(), coverUrl: this.coverFile() ? '' : this.coverUrl().trim(), coverFile: this.coverFile(), publishedAt: this.publishImmediately() ? new Date() : this.publishedAt()!, publishImmediately: this.publishImmediately() });
    }
}