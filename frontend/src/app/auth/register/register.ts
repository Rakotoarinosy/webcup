import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

import { NAME_VALIDATORS, PASSWORD_VALIDATORS } from '../auth.validators';
import { AuthService } from '@/app/auth/auth.service';
import { authErrorMessage } from '../auth-errors';
import { GoogleButton } from '../google-button/google-button';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
    }
    return null;
}

@Component({
    selector: 'app-register',
    imports: [ButtonModule, InputTextModule, MessageModule, PasswordModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator, GoogleButton],
    templateUrl: './register.html'
})
export class Register implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

    readonly registerForm = this.fb.nonNullable.group(
        {
            name: ['', NAME_VALIDATORS],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, ...PASSWORD_VALIDATORS]],
            confirmPassword: ['', [Validators.required]]
        },
        { validators: passwordMatchValidator }
    );

    readonly loading = signal(false);
    readonly errorMessage = signal<string | null>(null);

    ngAfterViewInit(): void {
        this.nameInput()?.nativeElement.focus();
    }

    submit(): void {
        if (this.registerForm.invalid || this.loading()) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.loading.set(true);
        this.errorMessage.set(null);

        const { name, email, password } = this.registerForm.getRawValue();
        this.registerForm.disable();

        this.auth.register(name.trim(), email.trim(), password).subscribe({
            // Compte créé mais non confirmé : un code vient d'être envoyé, la session s'ouvre après sa saisie.
            next: () => {
                this.registerForm.patchValue({ password: '', confirmPassword: '' });
                this.router.navigate(['/auth/verify-code'], { queryParamsHandling: 'preserve' });
            },
            error: (error: unknown) => {
                this.loading.set(false);
                this.registerForm.enable();
                this.registerForm.patchValue({ password: '', confirmPassword: '' });
                this.errorMessage.set(registerErrorMessage(error));
            }
        });
    }
}

function registerErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
        return 'Erreur inattendue, veuillez réessayer.';
    }

    switch (error.status) {
        case 409:
            return 'Cet email est déjà utilisé par un autre compte.';
        case 422:
            return 'Vérifiez les informations saisies.';
        default:
            // 429 (un code vient d'être envoyé à cette adresse), 503 (SMTP indisponible), etc.
            return authErrorMessage(error);
    }
}
