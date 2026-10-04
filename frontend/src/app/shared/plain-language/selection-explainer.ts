import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { PlainExplanationView } from './plain-explanation';
import { MAX_PASSAGE_LENGTH, MIN_PASSAGE_LENGTH, PlainExplanation, PlainLanguageService, explanationErrorMessage } from './plain-language.service';

interface Anchor {
    top: number;
    left: number;
}

/** Zones où sélectionner du texte ne doit pas proposer d'explication (saisie, assistante, cet outil). */
const IGNORED = 'input, textarea, select, [contenteditable="true"], app-virtual-assistant-widget, app-selection-explainer';

/**
 * F90 : quand l'habitant sélectionne un passage, un petit bouton « Expliquer simplement »
 * apparaît à côté. Rien ne change tant qu'il ne le demande pas.
 */
@Component({
    selector: 'app-selection-explainer',
    imports: [DialogModule, PlainExplanationView],
    template: `
        @if (anchor(); as position) {
            <button
                type="button"
                class="selection-explainer fixed z-[3000] inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-contrast shadow-lg focus-visible:outline-2"
                [style.top.px]="position.top"
                [style.left.px]="position.left"
                (mousedown)="$event.preventDefault()"
                (click)="explain()"
            >
                <i class="pi pi-lightbulb" aria-hidden="true"></i> Expliquer simplement<span class="sr-only"> le passage sélectionné</span>
            </button>
        }
        <p-dialog header="Explication simple" [visible]="dialogOpen()" (visibleChange)="dialogOpen.set($event)" [modal]="true" [dismissableMask]="true" [draggable]="false" [style]="{ width: 'min(94vw, 38rem)' }">
            <blockquote class="m-0 mb-4 max-h-32 overflow-y-auto border-l-4 border-surface pl-3 text-sm text-muted-color">{{ passage() }}</blockquote>
            <div aria-live="polite">
                @if (loading()) {
                    <p class="m-0" role="status"><i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>Préparation d’une explication simple…</p>
                } @else if (error(); as message) {
                    <p class="m-0" role="alert">{{ message }}</p>
                    <button type="button" class="mt-2 text-sm text-primary underline" (click)="load()">Réessayer</button>
                } @else if (explanation(); as value) {
                    <app-plain-explanation [explanation]="value" />
                }
            </div>
        </p-dialog>
    `
})
export class SelectionExplainer {
    private readonly plainLanguage = inject(PlainLanguageService);
    private readonly host = inject(ElementRef<HTMLElement>);

    readonly anchor = signal<Anchor | null>(null);
    readonly passage = signal('');
    readonly dialogOpen = signal(false);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly explanation = signal<PlainExplanation | null>(null);

    /** Après une sélection à la souris ou au clavier (Maj + flèches). */
    @HostListener('document:mouseup')
    @HostListener('document:keyup')
    onSelectionEnd(): void {
        // Laisse le navigateur finir la sélection (double clic, clic qui la vide).
        setTimeout(() => this.update());
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        this.anchor.set(null);
    }

    @HostListener('window:scroll')
    @HostListener('window:resize')
    onViewportChange(): void {
        this.anchor.set(null);
    }

    explain(): void {
        this.anchor.set(null);
        window.getSelection()?.removeAllRanges();
        this.explanation.set(null);
        this.dialogOpen.set(true);
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.error.set(null);
        this.plainLanguage.explain(this.passage()).subscribe({
            next: (explanation) => {
                this.explanation.set(explanation);
                this.loading.set(false);
            },
            error: (error: HttpErrorResponse) => {
                this.error.set(explanationErrorMessage(error.status));
                this.loading.set(false);
            }
        });
    }

    private update(): void {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || selection.rangeCount === 0 || this.dialogOpen()) {
            this.anchor.set(null);
            return;
        }
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const element = container instanceof Element ? container : container.parentElement;
        const text = selection.toString().replace(/\s+/g, ' ').trim();
        if (!element || element.closest(IGNORED) || this.host.nativeElement.contains(element) || text.length < MIN_PASSAGE_LENGTH) {
            this.anchor.set(null);
            return;
        }

        this.passage.set(text.slice(0, MAX_PASSAGE_LENGTH));
        const rect = range.getBoundingClientRect();
        const width = 220;
        const below = rect.bottom + 8;
        this.anchor.set({
            top: below + 40 > window.innerHeight ? Math.max(8, rect.top - 44) : below,
            left: Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)
        });
    }
}
