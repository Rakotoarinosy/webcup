import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { filter, finalize, interval } from 'rxjs';

import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';
import { authErrorMessage } from '../auth-errors';
import { AuthService } from '../auth.service';
import { ChallengeStore } from '../challenge.store';
import { safeReturnUrl } from '../return-url';
import { VerificationService } from '../verification.service';

@Component({
    selector: 'app-verify-code',
    imports: [ButtonModule, InputOtpModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './verify-code.html'
})
export class VerifyCode {
    private readonly verification = inject(VerificationService);
    private readonly store = inject(ChallengeStore);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);
    private readonly now = signal(Date.now());

    readonly challenge = this.store.challenge;
    readonly code = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)] });
    readonly loading = signal(false);
    readonly resending = signal(false);
    readonly errorMessage = signal<string | null>(null);
    readonly notice = signal<string | null>(null);
    readonly secondsBeforeResend = computed(() => Math.max(0, Math.ceil((this.store.resendAt() - this.now()) / 1000)));
    readonly expiresInMinutes = computed(() => Math.max(1, Math.round((this.challenge()?.expires_in ?? 0) / 60)));
    readonly isSms = computed(() => this.challenge()?.channel === 'sms');
    readonly title = computed(() => (this.isSms() ? 'Vérifiez votre téléphone' : 'Vérifiez votre email'));
    /** Email, ou numéro masqué (+261•••••67) pour un SMS. */
    readonly destination = computed(() => {
        const challenge = this.challenge();
        return challenge ? challenge.destination || challenge.email || '' : '';
    });

    constructor() {
        // Pas de challenge (rechargement de page, accès direct) : ne jamais laisser un
        // utilisateur connecté revenir vers l'écran de connexion.
        if (!this.store.challenge()) {
            this.router.navigateByUrl(this.auth.isAuthenticated() ? this.auth.homeUrl() : '/auth/login');
        }
        interval(1000)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.now.set(Date.now()));
        // Validation automatique dès que les 6 chiffres sont saisis (ou collés).
        this.code.valueChanges
            .pipe(
                filter(() => this.code.valid),
                takeUntilDestroyed()
            )
            .subscribe(() => this.submit());
    }

    submit(): void {
        if (this.code.invalid || this.loading() || this.resending()) return;

        this.loading.set(true);
        this.code.disable({ emitEvent: false });
        this.errorMessage.set(null);
        this.notice.set(null);

        this.verification
            .verify(this.code.value)
            .pipe(
                finalize(() => {
                    this.loading.set(false);
                    this.code.enable({ emitEvent: false });
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => this.router.navigateByUrl(this.target()),
                error: (error: unknown) => {
                    this.code.reset('');
                    this.errorMessage.set(authErrorMessage(error));
                }
            });
    }

    resend(): void {
        if (this.secondsBeforeResend() > 0 || this.resending() || this.loading()) return;

        this.resending.set(true);
        this.code.disable({ emitEvent: false });
        this.errorMessage.set(null);
        this.notice.set(null);

        this.verification
            .resend()
            .pipe(
                finalize(() => {
                    this.resending.set(false);
                    this.code.enable({ emitEvent: false });
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    this.code.reset('');
                    this.notice.set('Un nouveau code vient d’être envoyé.');
                },
                error: (error: unknown) => this.errorMessage.set(authErrorMessage(error))
            });
    }

    private target(): string {
        return safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl')) ?? this.auth.homeUrl();
    }
}