import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';

const DEFAULT_REDIRECT = '/home/dashboard';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, InputTextModule, MessageModule, PasswordModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './login.html',
})
export class Login implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly fb = inject(FormBuilder);
    private readonly emailInput = viewChild<ElementRef<HTMLInputElement>>('emailInput');

    readonly loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    readonly loading = signal(false);
    readonly errorMessage = signal<string | null>(null);

    ngAfterViewInit(): void {
        this.emailInput()?.nativeElement.focus();
    }

    submit(): void {
        if (this.loginForm.invalid || this.loading()) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading.set(true);
        this.errorMessage.set(null);

        const { email, password } = this.loginForm.getRawValue();

        this.auth.login(email.trim(), password).subscribe({
            next: () => this.router.navigateByUrl(this.redirectUrl()),
            error: (error: unknown) => {
                this.loading.set(false);
                this.loginForm.patchValue({ password: '' });
                this.errorMessage.set(loginErrorMessage(error));
            }
        });
    }

    /** Page demandée avant la connexion (?returnUrl=), limitée aux chemins internes. */
    private redirectUrl(): string {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        return returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//') && !returnUrl.startsWith('/auth') ? returnUrl : DEFAULT_REDIRECT;
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
