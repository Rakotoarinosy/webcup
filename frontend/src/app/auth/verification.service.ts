import { Injectable, inject } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { AuthUser, VerificationChallenge } from './auth.model';
import { AuthService } from './auth.service';
import { ChallengeStore } from './challenge.store';

@Injectable({ providedIn: 'root' })
export class VerificationService {
    private readonly auth = inject(AuthService);
    private readonly store = inject(ChallengeStore);
    verify(code: string): Observable<AuthUser> {
        const challenge = this.store.challenge();
        if (!challenge) return throwError(() => new Error('NO_CHALLENGE'));
        return this.auth.verifyCode(challenge.challenge_id, code).pipe(tap(() => this.store.clear()));
    }
    resend(): Observable<VerificationChallenge> {
        const challenge = this.store.challenge();
        if (!challenge) return throwError(() => new Error('NO_CHALLENGE'));
        return this.auth.resendCode(challenge.challenge_id).pipe(tap((next) => this.store.set(next)));
    }
    loginWithGoogle(credential: string): Observable<VerificationChallenge> {
        return this.auth.requestGoogleLogin(credential);
    }
}
