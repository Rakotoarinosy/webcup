import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { AuthService } from '@/app/auth/auth.service';
import { authErrorMessage } from '../auth-errors';
import { ContactMethod } from '../auth.model';
import { normalizePhone, phoneValidator } from '../auth.validators';
import { GoogleButton } from '../google-button/google-button';
import { safeReturnUrl } from '../return-url';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, GoogleButton],
    templateUrl: './login.html'
})
export class Login implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);
    private readonly injector = inject(Injector);
    private readonly identifierInput = viewChild<ElementRef<HTMLInputElement>>('identifierInput');
    private readonly errorSummary = viewChild<ElementRef<HTMLElement>>('errorSummary');

    /** Moyen de connexion choisi : le code de confirmation part par ce canal (email ou SMS). */
    readonly method = signal<ContactMethod>('email');

    private readonly identifierValidator: ValidatorFn = (control) => (this.method() === 'phone' ? phoneValidator(control) : Validators.email(control));

    readonly loginForm = this.fb.nonNullable.group({
        identifier: ['', [Validators.required, this.identifierValidator]],
        password: ['', [Validators.required]]
    });

    readonly loading = signal(false);
    readonly errorMessage = signal<string | null>(null);
    /** Passe à true au premier envoi refusé : affiche le récapitulatif des erreurs. */
    readonly submitAttempted = signal(false);
    readonly showPassword = signal(false);
    readonly accountDeleted = this.route.snapshot.queryParamMap.get('accountDeleted') === '1';

    ngAfterViewInit(): void {
        this.identifierInput()?.nativeElement.focus();
    }

    setMethod(method: ContactMethod): void {
        if (this.method() === method || this.loading()) return;

        this.method.set(method);
        this.loginForm.controls.identifier.reset('');
        this.errorMessage.set(null);
        this.submitAttempted.set(false);
        afterNextRender(() => this.identifierInput()?.nativeElement.focus(), { injector: this.injector });
    }

    /** Classes de l'onglet Email / Téléphone selon qu'il est actif ou non. */
    tabClass(method: ContactMethod): string {
        const base = 'rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
        return this.method() === method
            ? `${base} bg-white text-emerald-700 shadow-sm`
            : `${base} text-emerald-950/60 hover:text-emerald-950`;
    }

    submit(): void {
        if (this.loading()) return;
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.submitAttempted.set(true);
            // Le récapitulatif (role="alert") reçoit le focus pour être lu et parcouru au clavier.
            afterNextRender(() => this.errorSummary()?.nativeElement.focus(), { injector: this.injector });
            return;
        }

        this.loading.set(true);
        this.errorMessage.set(null);

        const { identifier, password } = this.loginForm.getRawValue();
        // Téléphone : envoyé au format international (+261...), comme l'API le stocke.
        const value = this.method() === 'phone' ? (normalizePhone(identifier) ?? identifier.trim()) : identifier.trim();
        this.loginForm.disable();

        this.auth.login(value, password).subscribe({
            next: (outcome) =>
                outcome === 'verification-required'
                    ? // Un code vient d'être envoyé (email ou SMS) : aucune session avant sa validation.
                      this.router.navigate(['/auth/verify-code'], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get('returnUrl') } })
                    : this.router.navigateByUrl(this.redirectUrl()),
            error: (error: unknown) => {
                this.loading.set(false);
                this.loginForm.enable();
                this.loginForm.patchValue({ password: '' });
                this.errorMessage.set(loginErrorMessage(error));
            }
        });
    }

    identifierError(): string {
        const phone = this.method() === 'phone';
        if (this.loginForm.controls.identifier.hasError('required')) {
            return phone ? 'Le numéro de téléphone est obligatoire.' : 'L’email est obligatoire.';
        }
        return phone ? 'Saisissez un numéro valide, par exemple 034 12 345 67 ou +261 34 12 345 67.' : 'Saisissez une adresse email valide.';
    }

    /** Erreurs du formulaire, dans l’ordre des champs, pour le récapitulatif. */
    formErrors(): { field: string; message: string }[] {
        const { identifier, password } = this.loginForm.controls;
        const errors: { field: string; message: string }[] = [];
        if (identifier.invalid) errors.push({ field: 'identifier', message: this.identifierError() });
        if (password.invalid) errors.push({ field: 'password', message: 'Le mot de passe est obligatoire.' });
        return errors;
    }

    /** Lien du récapitulatif : place le focus dans le champ concerné sans recharger la page. */
    focusField(event: Event, id: string): void {
        event.preventDefault();
        document.getElementById(id)?.focus();
    }

    /** Page demandée avant la connexion (?returnUrl=), limitée aux chemins internes. */
    private redirectUrl(): string {
        return safeReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl')) ?? this.auth.homeUrl();
    }
}

function loginErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
        return 'Erreur inattendue, veuillez réessayer.';
    }

    // 429 peut aussi venir du délai anti-spam des codes (ex. email puis téléphone à quelques secondes d'intervalle).
    if (error.error?.error === 'CodeResendLockedError') {
        return authErrorMessage(error);
    }

    switch (error.status) {
        case 401:
            return 'Identifiant ou mot de passe incorrect.';
        case 403:
            return 'Ce compte est désactivé. Contactez un administrateur.';
        case 429:
            return 'Trop de tentatives échouées : le compte est temporairement verrouillé. Réessayez dans quelques minutes.';
        case 422:
            return 'Vérifiez le format de votre email ou de votre numéro de téléphone.';
        default:
            return authErrorMessage(error);
    }
}
