import { Injectable, computed, signal } from '@angular/core';

import { VerificationChallenge } from './auth.model';

/**
 * Challenge de confirmation en cours (code envoyé par email).
 *
 * En mémoire uniquement : `challenge_id` est un secret qui permet de valider ou renvoyer le code,
 * il ne va jamais dans localStorage. Un rechargement de page ramène donc à /auth/login ;
 * le backend renvoie alors le challenge en cours (pendant le délai anti-spam) ou un nouveau code.
 */
@Injectable({ providedIn: 'root' })
export class ChallengeStore {
    private readonly state = signal<{ challenge: VerificationChallenge; receivedAt: number } | null>(null);

    readonly challenge = computed(() => this.state()?.challenge ?? null);
    /** Timestamp (ms) à partir duquel un nouveau code peut être demandé. */
    readonly resendAt = computed(() => {
        const state = this.state();
        return state ? state.receivedAt + state.challenge.resend_after * 1000 : 0;
    });

    set(challenge: VerificationChallenge): void {
        this.state.set({ challenge, receivedAt: Date.now() });
    }

    clear(): void {
        this.state.set(null);
    }
}