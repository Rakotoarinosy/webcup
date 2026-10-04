import { Component, ElementRef, HostListener, computed, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MunicipalNavigation } from '@/app/municipal/municipal-navigation.service';
import { glossaryEntry } from './glossary';

let nextId = 0;

/**
 * Bouton « ? » qui affiche la définition simple d'un terme du lexique (D13).
 * Activable au clavier (Entrée / Espace), refermé par Échap ou un nouveau clic : la définition
 * ne dépend jamais du seul survol de la souris, et reste lisible par les lecteurs d'écran.
 */
@Component({
    selector: 'app-term-help',
    imports: [RouterLink],
    template: `
        @if (entry(); as item) {
            <span class="term-help">
                <button #trigger type="button" class="term-button" [attr.aria-expanded]="open()" [attr.aria-controls]="panelId" [attr.aria-label]="'Que veut dire « ' + item.term + ' » ?'" (click)="toggle()">
                    <span aria-hidden="true">?</span>
                </button>
                @if (open()) {
                    <span [id]="panelId" class="term-panel" role="note" [attr.aria-label]="'Définition : ' + item.term">
                        <strong>{{ item.term }}</strong> : {{ item.definition }}
                        <a class="term-more" [routerLink]="navigation.path('lexique')" [fragment]="'terme-' + item.id">Voir le lexique</a>
                    </span>
                }
            </span>
        }
    `,
    styles: `
        :host {
            display: inline;
        }
        .term-help {
            position: relative;
            display: inline-block;
            vertical-align: middle;
        }
        .term-button {
            display: inline-grid;
            place-items: center;
            width: 1.4rem;
            height: 1.4rem;
            margin-left: 0.25rem;
            border-radius: 50%;
            border: 1px solid var(--p-primary-color);
            background: var(--p-content-background, #fff);
            color: var(--p-primary-color);
            font-size: 0.8rem;
            font-weight: 800;
            line-height: 1;
            cursor: pointer;
        }
        .term-button:focus-visible {
            outline: 2px solid var(--p-primary-color);
            outline-offset: 2px;
        }
        .term-panel {
            position: absolute;
            z-index: 30;
            top: calc(100% + 0.4rem);
            left: 0;
            display: block;
            width: min(18rem, 80vw);
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid var(--p-content-border-color, #ccc);
            background: var(--p-content-background, #fff);
            color: var(--p-text-color);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            font-size: 0.9rem;
            font-weight: 400;
            text-transform: none;
            letter-spacing: normal;
            line-height: 1.45;
            white-space: normal;
            text-align: left;
        }
        .term-more {
            display: block;
            margin-top: 0.4rem;
            font-weight: 600;
            color: var(--p-primary-color);
            text-decoration: underline;
        }
    `
})
export class TermHelp {
    readonly navigation = inject(MunicipalNavigation);
    private readonly host = inject(ElementRef<HTMLElement>);
    /** Identifiant d'une entrée de GLOSSARY. */
    readonly term = input.required<string>();
    readonly entry = computed(() => glossaryEntry(this.term()));
    readonly open = signal(false);
    readonly panelId = `term-help-${++nextId}`;
    private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');

    toggle(): void {
        this.open.update((value) => !value);
    }

    @HostListener('keydown.escape')
    close(): void {
        if (!this.open()) return;
        this.open.set(false);
        this.trigger()?.nativeElement.focus();
    }

    @HostListener('document:click', ['$event'])
    closeOutside(event: Event): void {
        if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.open.set(false);
    }
}
