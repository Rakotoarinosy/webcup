import { AfterViewInit, Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { authErrorMessage } from '../auth-errors';
import { GoogleIdentityService } from '../google-identity.service';
import { VerificationService } from '../verification.service';
import { safeReturnUrl } from '../return-url';

/**
 * Bouton « Continuer avec Google ». Après l'ID token, l'API envoie un code par email :
 * on enchaîne donc sur /auth/verify-code (`returnUrl` est conservé).
 * Les erreurs remontent au parent via `(failed)` pour s'afficher dans son bandeau.
 */
@Component({
    selector: 'app-google-button',
    template: `
        <div #host class="flex min-h-10 w-full justify-center" [class.hidden]="unavailable()"></div>
        @if (unavailable()) {
            <button type="button" disabled class="flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-emerald-200 px-4 py-3 opacity-60">
                <i class="pi pi-google" aria-hidden="true"></i> Continuer avec Google
            </button>
            <p class="mt-2 text-center text-xs" role="status">La connexion Google est momentanément indisponible.</p>
        }
    `
})
export class GoogleButton implements AfterViewInit {
    readonly google = inject(GoogleIdentityService);
    private readonly verification = inject(VerificationService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly host = viewChild<ElementRef<HTMLElement>>('host');

    readonly failed = output<string>();
    readonly unavailable = signal(false);

    ngAfterViewInit(): void {
        const host = this.host()?.nativeElement;
        if (!host) return;

        this.google.renderButton(host, (credential) => this.signIn(credential)).catch(() => this.unavailable.set(true));
    }

    private signIn(credential: string): void {
        this.verification.loginWithGoogle(credential).subscribe({
            next: (outcome) =>
                outcome === 'verification-required'
                    ? this.router.navigate(['/auth/verify-code'], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get('returnUrl') } })
                    : this.router.navigateByUrl(safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl')) ?? '/home/account'),
            error: (error: unknown) => this.failed.emit(authErrorMessage(error))
        });
    }
}