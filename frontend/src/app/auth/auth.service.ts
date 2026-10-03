import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, finalize, map, of, shareReplay, switchMap, takeUntil, tap, throwError } from 'rxjs';

import { environment } from '@/environments/environment';
import { PreferencesService } from '@/app/preferences/preferences.service';
import { AuthUser, LoginOutcome, ROLE_LABELS, Role, TokenResponse, VerificationChallenge, isChallenge } from './auth.model';
import { ChallengeStore } from './challenge.store';

export const AUTH_URL = `${environment.apiUrl}/auth`;

/**
 * Session utilisateur.
 *
 * L'access token reste en mémoire (jamais dans localStorage : résistant au XSS). Le refresh token
 * est un cookie HttpOnly posé par l'API sur /api/v1/auth : après un rafraîchissement de page,
 * `restoreSession()` appelle /auth/refresh pour récupérer un nouvel access token.
 *
 * Confirmation par email : `register` et `login` ne donnent pas de session,
 * seulement un challenge (voir ChallengeStore). La session s'ouvre après `VerificationService.verify`,
 * qui appelle `acceptSession`.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly preferences = inject(PreferencesService);
    private readonly challenges = inject(ChallengeStore);

    private readonly token = signal<string | null>(null);
    private readonly sessionEnded = new Subject<void>();
    private readonly sessionReplaced = new Subject<void>();
    private sessionChecked = false;
    private sessionVersion = 0;
    private profileInFlight: Observable<AuthUser> | null = null;
    private refreshInFlight: Observable<TokenResponse> | null = null;

    readonly user = signal<AuthUser | null>(null);
    readonly isAuthenticated = computed(() => this.user() !== null && this.token() !== null);
    readonly roleLabel = computed(() => (this.user() ? ROLE_LABELS[this.user()!.role] : ''));
    readonly homeUrl = computed(() => '/home/account');

    hasRole(...roles: Role[]): boolean {
        const user = this.user();
        return user !== null && roles.includes(user.role);
    }

    accessToken(): string | null {
        return this.token();
    }

    /** Installe une session reçue de l'API (login, code validé, profil ou mot de passe modifié). */
    acceptSession(response: TokenResponse): void {
        this.sessionVersion++;
        this.sessionReplaced.next();
        this.setSession(response);
        this.challenges.clear();
    }

    /**
     * `'authenticated'` : session ouverte.
     * `'verification-required'` : code de connexion requis, un code vient d'être envoyé (challenge dans le store).
     */
    login(email: string, password: string): Observable<LoginOutcome> {
        return this.http.post<TokenResponse | VerificationChallenge>(`${AUTH_URL}/login`, { email, password }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            map((body): LoginOutcome => {
                if (isChallenge(body)) {
                    this.challenges.set(body);
                    return 'verification-required';
                }
                this.acceptSession(body);
                return 'authenticated';
            })
        );
    }

    /** Crée le compte non confirmé et envoie le code. Pas de session avant la saisie du code. */
    register(name: string, email: string, password: string): Observable<LoginOutcome> {
        return this.http.post<AuthUser | VerificationChallenge>(`${AUTH_URL}/register`, { name, email, password }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            map((body): LoginOutcome => {
                if (!isChallenge(body)) {
                    throw new Error('VERIFICATION_REQUIRED');
                }
                this.challenges.set(body);
                return 'verification-required';
            })
        );
    }

    verifyCode(challenge_id: string, code: string): Observable<AuthUser> {
        return this.http.post<TokenResponse>(`${AUTH_URL}/verify-code`, { challenge_id, code }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            tap((response) => this.acceptSession(response)),
            map((response) => response.user)
        );
    }

    resendCode(challenge_id: string): Observable<VerificationChallenge> {
        return this.http.post<VerificationChallenge>(`${AUTH_URL}/resend-code`, { challenge_id }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded));
    }

    requestGoogleLogin(credential: string): Observable<VerificationChallenge> {
        return this.http.post<VerificationChallenge>(`${AUTH_URL}/google`, { credential }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            tap((challenge) => this.challenges.set(challenge))
        );
    }

    me(): Observable<AuthUser> {
        if (!this.profileInFlight) {
            const version = this.sessionVersion;
            this.profileInFlight = this.http.get<AuthUser>(`${AUTH_URL}/me`).pipe(
                takeUntil(this.sessionEnded),
                takeUntil(this.sessionReplaced),
                tap((user) => {
                    if (version !== this.sessionVersion) throw new HttpErrorResponse({ status: 401, statusText: 'Session changed' });
                    this.user.set(user);
                }),
                finalize(() => (this.profileInFlight = null)),
                shareReplay({ bufferSize: 1, refCount: true })
            );
        }
        return this.profileInFlight;
    }

    /** Nouvel access token via le cookie. Les appels simultanés partagent la même requête. */
    refresh(): Observable<TokenResponse> {
        if (!this.refreshInFlight) {
            this.refreshInFlight = this.http.post<TokenResponse>(`${AUTH_URL}/refresh`, {}, { withCredentials: true }).pipe(
                takeUntil(this.sessionEnded),
                takeUntil(this.sessionReplaced),
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

        if (this.sessionChecked) {
            return of(false);
        }
        return this.refresh().pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    /** Refresh restores the cookie session; /me rechecks current account and role. */
    validateSession(): Observable<AuthUser | null> {
        return this.restoreSession().pipe(
            switchMap((authenticated) => (authenticated ? this.me() : of(null))),
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.clearSession();
                }
                return of(null);
            })
        );
    }

    updateProfile(name: string, email: string, current_password: string): Observable<AuthUser> {
        return this.http.patch<TokenResponse>(`${AUTH_URL}/me`, { name, email, current_password }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            tap((response) => this.acceptSession(response)),
            map((response) => response.user)
        );
    }

    changePassword(current_password: string, new_password: string): Observable<AuthUser> {
        return this.http.post<TokenResponse>(`${AUTH_URL}/change-password`, { current_password, new_password }, { withCredentials: true }).pipe(
            takeUntil(this.sessionEnded),
            tap((response) => this.acceptSession(response)),
            map((response) => response.user)
        );
    }

    deleteAccount(current_password: string): Observable<void> {
        return this.http.delete<void>(`${AUTH_URL}/me`, { body: { current_password }, withCredentials: true }).pipe(
            tap(() => {
                this.sessionEnded.next();
                this.clearSession();
            })
        );
    }

    logout(): void {
        this.sessionEnded.next();
        this.challenges.clear();
        // Déconnexion locale immédiate ; la révocation côté API se fait en arrière-plan.
        this.http.post<void>(`${AUTH_URL}/logout`, {}, { withCredentials: true }).subscribe({ error: () => undefined });
        this.clearSession();

        const overlays = document.querySelectorAll('.p-menu-overlay, .p-component-overlay');
        overlays.forEach((el) => el.remove());
        this.router.navigate(['/auth/login']);
    }

    clearSession(): void {
        this.sessionChecked = true;
        this.sessionVersion++;
        this.token.set(null);
        this.user.set(null);
    }

    private setSession(response: TokenResponse): void {
        this.sessionChecked = true;
        this.token.set(response.access_token);
        this.user.set(response.user);
        this.preferences
            .load()
            .pipe(takeUntil(this.sessionEnded), takeUntil(this.sessionReplaced))
            .subscribe({ error: () => undefined });
    }
}
