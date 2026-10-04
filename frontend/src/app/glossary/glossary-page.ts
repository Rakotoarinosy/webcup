import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GLOSSARY_THEMES, searchGlossary } from './glossary';

/** Lexique public (D13) : les mots de la plateforme expliqués simplement, avec recherche. */
@Component({
    selector: 'app-glossary-page',
    imports: [FormsModule],
    template: `
        <section class="glossary-page">
            <h1>Lexique</h1>
            <p class="intro">Les mots utilisés sur la plateforme, expliqués simplement. Sur les pages, le bouton <span class="inline-q" aria-hidden="true">?</span> à côté d’un mot affiche aussi sa définition.</p>

            <form role="search" aria-label="Rechercher dans le lexique" (submit)="$event.preventDefault()">
                <label for="glossary-search" class="search-label">Rechercher un mot</label>
                <input id="glossary-search" type="search" name="glossary-search" class="search-input" [ngModel]="query()" (ngModelChange)="query.set($event)" aria-describedby="glossary-search-help" autocomplete="off" />
                <small id="glossary-search-help">Par exemple : institut, statut, hors service, taxi-be.</small>
            </form>
            <p class="count" role="status" aria-live="polite">{{ results().length }} mot(s) trouvé(s).</p>

            @for (group of groups(); track group.theme) {
                <section class="theme" [attr.aria-labelledby]="'theme-' + $index">
                    <h2 [id]="'theme-' + $index">{{ group.theme }}</h2>
                    <dl>
                        @for (entry of group.entries; track entry.id) {
                            <div class="entry" [id]="'terme-' + entry.id" tabindex="-1">
                                <dt>{{ entry.term }}</dt>
                                <dd>
                                    {{ entry.definition }}
                                    @if (entry.example) {
                                        <span class="example">Exemple : {{ entry.example }}</span>
                                    }
                                </dd>
                            </div>
                        }
                    </dl>
                </section>
            } @empty {
                <p>Aucun mot ne correspond. Essayez un autre mot. <button type="button" class="clear-button" (click)="query.set('')">Effacer la recherche</button></p>
            }
        </section>
    `,
    styles: `
        .glossary-page {
            max-width: 900px;
            margin: 0 auto;
            padding: 1rem;
        }
        .intro {
            color: var(--p-text-muted-color);
        }
        .inline-q {
            display: inline-grid;
            place-items: center;
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
            border: 1px solid var(--p-primary-color);
            color: var(--p-primary-color);
            font-weight: 800;
            font-size: 0.8rem;
        }
        form {
            display: grid;
            gap: 0.35rem;
            margin: 1.5rem 0 0.5rem;
        }
        .search-label {
            font-weight: 700;
        }
        .search-input {
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid var(--p-content-border-color, #ccc);
            background: transparent;
            color: inherit;
            font: inherit;
        }
        .search-input:focus-visible {
            outline: 2px solid var(--p-primary-color);
            outline-offset: 2px;
        }
        .count {
            color: var(--p-text-muted-color);
        }
        .theme h2 {
            margin-top: 2rem;
            font-size: 1.3rem;
        }
        dl {
            display: grid;
            gap: 0.75rem;
            margin: 0;
        }
        .entry {
            padding: 0.85rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid var(--p-content-border-color, #ddd);
            background: var(--p-content-background);
        }
        .entry:target,
        .entry:focus {
            outline: 2px solid var(--p-primary-color);
        }
        dt {
            font-weight: 700;
            font-size: 1.05rem;
        }
        dd {
            margin: 0.25rem 0 0;
        }
        .clear-button {
            border: 0;
            background: none;
            color: var(--p-primary-color);
            font: inherit;
            font-weight: 600;
            text-decoration: underline;
            cursor: pointer;
        }
        .example {
            display: block;
            margin-top: 0.25rem;
            color: var(--p-text-muted-color);
            font-size: 0.9rem;
        }
    `
})
export class GlossaryPage implements AfterViewInit {
    private readonly route = inject(ActivatedRoute);
    readonly query = signal(this.route.snapshot.queryParamMap.get('q') ?? '');
    readonly results = computed(() => searchGlossary(this.query()));
    readonly groups = computed(() => {
        const results = this.results();
        return GLOSSARY_THEMES.map((theme) => ({ theme, entries: results.filter((entry) => entry.theme === theme) })).filter((group) => group.entries.length);
    });

    /** Arrivée depuis une infobulle « Voir le lexique » : le terme visé reçoit le focus. */
    ngAfterViewInit(): void {
        const fragment = this.route.snapshot.fragment;
        if (!fragment) return;
        const target = document.getElementById(fragment);
        target?.scrollIntoView({ block: 'center' });
        target?.focus({ preventScroll: true });
    }
}
