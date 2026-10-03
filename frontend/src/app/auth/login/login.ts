import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './login.html'
})
export class Login implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);
    private readonly injector = inject(Injector);
    private readonly emailInput = viewChild<ElementRef<HTMLInputElement>>('emailInput');
    private readonly errorSummary = viewChild<ElementRef<HTMLElement>>('errorSummary');

    readonly loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    readonly loading = signal(false);
    readonly errorMessage = signal<string | null>(null);
    /** Passe à true au premier envoi refusé : affiche le récapitulatif des erreurs. */
    readonly submitAttempted = signal(false);
    readonly showPassword = signal(false);
    readonly accountDeleted = this.route.snapshot.queryParamMap.get('accountDeleted') === '1';

    ngAfterViewInit(): void {
        this.emailInput()?.nativeElement.focus();
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

        const { email, password } = this.loginForm.getRawValue();
        this.loginForm.disable();

        this.auth.login(email.trim(), password).subscribe({
            next: () => this.router.navigateByUrl(this.redirectUrl()),
            error: (error: unknown) => {
                this.loading.set(false);
                this.loginForm.enable();
                this.loginForm.patchValue({ password: '' });
                this.errorMessage.set(loginErrorMessage(error));
            }
        });
    }

    emailError(): string {
        return this.loginForm.controls.email.hasError('required') ? 'L’email est obligatoire.' : 'Saisissez une adresse email valide.';
    }

    /** Erreurs du formulaire, dans l’ordre des champs, pour le récapitulatif. */
    formErrors(): { field: string; message: string }[] {
        const { email, password } = this.loginForm.controls;
        const errors: { field: string; message: string }[] = [];
        if (email.invalid) errors.push({ field: 'email', message: this.emailError() });
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
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        return returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//') && !returnUrl.startsWith('/auth') ? returnUrl : this.auth.homeUrl();
    }
}

function loginErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
        return 'Erreur inattendue, veuillez réessayer.';
    }

    switch (error.status) {
        case 401:
            return 'Email ou mot de passe incorrect.';
        case 403:
            return 'Ce compte est désactivé. Contactez un administrateur.';
        case 429:
            return 'Trop de tentatives échouées : le compte est temporairement verrouillé. Réessayez dans quelques minutes.';
        case 422:
            return 'Vérifiez le format de votre email.';
        default:
            return apiErrorMessage(error);
    }
}
