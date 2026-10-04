import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, finalize, of, tap } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { OnboardingHint, OnboardingStep } from '@/app/shared/api-enums';
import { environment } from '@/environments/environment';

export type { OnboardingHint, OnboardingStep };

/** Miroir de GET /onboarding/me (D12, F35). */
export interface OnboardingProgress {
    steps: { step: OnboardingStep; done: boolean }[];
    seen_hints: OnboardingHint[];
    dismissed: boolean;
    completed_count: number;
    total: number;
    is_complete: boolean;
}

/**
 * Premiers pas du citoyen : progression et bulles d'aide déjà vues, mémorisées côté serveur
 * (elles suivent l'utilisateur d'un appareil à l'autre). Rien n'est chargé pour les autres rôles.
 */
@Injectable({ providedIn: 'root' })
export class OnboardingService {
    private readonly http = inject(HttpClient);
    private readonly auth = inject(AuthService);
    private readonly baseUrl = `${environment.apiUrl}/onboarding/me`;
    private loadedFor: string | null = null;
    private loading = false;

    readonly progress = signal<OnboardingProgress | null>(null);
    readonly error = signal(false);

    private enabled(): boolean {
        return this.auth.isAuthenticated() && this.auth.hasRole('citizen');
    }

    /** Charge une fois par session (utilisateur) ; sans effet pour un visiteur ou un agent. */
    ensureLoaded(): void {
        const user = this.auth.user();
        if (!this.enabled() || !user) {
            this.progress.set(null);
            this.loadedFor = null;
            return;
        }
        if (this.loadedFor === user.id || this.loading) return;
        this.refresh();
    }

    refresh(): void {
        const user = this.auth.user();
        if (!this.enabled() || !user) return;
        this.loading = true;
        this.http
            .get<OnboardingProgress>(this.baseUrl)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (progress) => {
                    this.loadedFor = user.id;
                    this.progress.set(progress);
                    this.error.set(false);
                },
                error: () => this.error.set(true)
            });
    }

    completeStep(step: OnboardingStep): Observable<OnboardingProgress | null> {
        if (!this.enabled()) return of(null);
        if (this.progress()?.steps.some((item) => item.step === step && item.done)) return of(this.progress());
        return this.http.post<OnboardingProgress>(`${this.baseUrl}/steps/${step}`, {}).pipe(tap((progress) => this.progress.set(progress)));
    }

    /** Une bulle n'est montrée qu'une fois : elle est marquée vue dès son affichage. */
    hintSeen(hint: OnboardingHint): boolean {
        return this.progress()?.seen_hints.includes(hint) ?? true;
    }

    markHintSeen(hint: OnboardingHint): void {
        if (!this.enabled()) return;
        this.http.post<OnboardingProgress>(`${this.baseUrl}/hints/${hint}`, {}).subscribe({ next: (progress) => this.progress.set(progress), error: () => undefined });
    }

    setDismissed(dismissed: boolean): Observable<OnboardingProgress> {
        return this.http.patch<OnboardingProgress>(this.baseUrl, { dismissed }).pipe(tap((progress) => this.progress.set(progress)));
    }
}
