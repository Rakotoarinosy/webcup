import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';

import { environment } from '@/environments/environment';

export interface GlossaryTerm {
    term: string;
    definition: string;
}

export interface PlainExplanation {
    summary: string;
    key_points: string[];
    terms: GlossaryTerm[];
}

/** Bornes acceptées par l'API (POST /assistant/simplify). */
export const MIN_PASSAGE_LENGTH = 20;
export const MAX_PASSAGE_LENGTH = 5000;

/** Texte brut d'un contenu éventuellement HTML (publications), espaces normalisés. */
export function toPlainText(content: string): string {
    const text = new DOMParser().parseFromString(content, 'text/html').body.textContent ?? '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * Explications en langage clair (F90). Un même passage n'est demandé qu'une fois par session :
 * rouvrir une explication ne relance pas l'IA.
 */
@Injectable({ providedIn: 'root' })
export class PlainLanguageService {
    private readonly http = inject(HttpClient);
    private readonly cache = new Map<string, Observable<PlainExplanation>>();

    explain(passage: string): Observable<PlainExplanation> {
        const text = passage.slice(0, MAX_PASSAGE_LENGTH);
        let request = this.cache.get(text);
        if (!request) {
            request = this.http.post<PlainExplanation>(`${environment.apiUrl}/assistant/simplify`, { text }).pipe(
                catchError((error) => {
                    this.cache.delete(text);
                    return throwError(() => error);
                }),
                shareReplay(1)
            );
            this.cache.set(text, request);
        }
        return request;
    }
}

export function explanationErrorMessage(status: number): string {
    return status === 503 || status === 502
        ? 'L’explication simplifiée est indisponible pour le moment. Le texte officiel reste la référence ; vous pouvez aussi contacter la mairie.'
        : 'Impossible d’obtenir une explication pour ce passage. Réessayez dans un instant.';
}
