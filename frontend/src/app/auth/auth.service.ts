import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, map, of, shareReplay, switchMap, tap, throwError } from 'rxjs';

import { environment } from '@/environments/environment';
import { AuthUser, TokenResponse } from './auth.model';

export const AUTH_URL = `${environment.apiUrl}/auth`;

/**
 * Session utilisateur.
 *
 * L'access token reste en mémoire (jamais dans localStorage : résistant au XSS). Le refresh token
 * est un cookie HttpOnly posé par l'API sur /api/v1/auth : après un rafraîchissement de page,
 * `restoreSession()` appelle /auth/refresh pour récupérer un nouvel access token.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    private readonly token = signal<string | null>(null);
    private refreshInFlight: Observable<TokenResponse> | null = null;

    readonly user = signal<AuthUser | null>(null);
    readonly isAuthenticated = computed(() => this.user() !== null);

    accessToken(): string | null {
        return this.token();
    }

    login(email: string, password: string): Observable<AuthUser> {
        return this.http.post<TokenResponse>(`${AUTH_URL}/login`, { email, password }, { withCredentials: true }).pipe(
            tap((response) => this.setSession(response)),
            map((response) => response.user)
        );
    }

    register(name: string, email: string, password: string): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${AUTH_URL}/register`, { name, email, password }, { withCredentials: true }).pipe(switchMap(() => this.login(email, password)));
    }

    me(): Observable<AuthUser> {
        return this.http.get<AuthUser>(`${AUTH_URL}/me`).pipe(tap((user) => this.user.set(user)));
    }

    /** Nouvel access token via le cookie. Les appels simultanés partagent la même requête. */
    refresh(): Observable<TokenResponse> {
        if (!this.refreshInFlight) {
            this.refreshInFlight = this.http.post<TokenResponse>(`${AUTH_URL}/refresh`, {}, { withCredentials: true }).pipe(
                tap((response) => this.setSession(response)),
                catchError((error: unknown) => {
                    this.clearSession();
                    return throwError(() => error);
                }),
                finalize(() => (this.refreshInFlight = null)),
                shareReplay(1)
            );
        }

        return this.refreshInFlight;
    }

    /** `true` si l'utilisateur est (ou redevient) connecté, sans jamais lever d'erreur. */
    restoreSession(): Observable<boolean> {
        if (this.isAuthenticated()) {
            return of(true);
        }

        return this.refresh().pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    logout(): void {
        // Déconnexion locale immédiate ; la révocation côté API se fait en arrière-plan.
        this.http.post<void>(`${AUTH_URL}/logout`, {}, { withCredentials: true }).subscribe({ error: () => undefined });
        this.clearSession();

        const overlays = document.querySelectorAll('.p-menu-overlay, .p-component-overlay');
        overlays.forEach((el) => el.remove());
        this.router.navigate(['/auth/login']);
    }

    clearSession(): void {
        this.token.set(null);
        this.user.set(null);
    }

    private setSession(response: TokenResponse): void {
        this.token.set(response.access_token);
        this.user.set(response.user);
    }
}
