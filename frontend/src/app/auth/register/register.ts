import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

import { NAME_VALIDATORS, PASSWORD_VALIDATORS } from '../auth.validators';
import { AuthService } from '@/app/auth/auth.service';
import { apiErrorMessage } from '@/app/users/user.service';

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
    imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator],
    templateUrl: './register.html'
})
export class Register implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    private readonly injector = inject(Injector);
    private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
    private readonly errorSummary = viewChild<ElementRef<HTMLElement>>('errorSummary');

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
    /** Passe à true au premier envoi refusé : affiche le récapitulatif des erreurs. */
    readonly submitAttempted = signal(false);
    readonly showPassword = signal(false);
    readonly showConfirm = signal(false);

    ngAfterViewInit(): void {
        this.nameInput()?.nativeElement.focus();
    }

    submit(): void {
        if (this.loading()) return;
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            this.submitAttempted.set(true);
            // Le récapitulatif (role="alert") reçoit le focus pour être lu et parcouru au clavier.
            afterNextRender(() => this.errorSummary()?.nativeElement.focus(), { injector: this.injector });
            return;
        }

        this.loading.set(true);
        this.errorMessage.set(null);

        const { name, email, password } = this.registerForm.getRawValue();
        this.registerForm.disable();

        this.auth.register(name.trim(), email.trim(), password).subscribe({
            next: () => this.router.navigateByUrl(this.auth.homeUrl()),
            error: (error: unknown) => {
                this.loading.set(false);
                this.registerForm.enable();
                this.registerForm.patchValue({ password: '', confirmPassword: '' });
                this.errorMessage.set(registerErrorMessage(error));
            }
        });
    }

    emailError(): string {
        return this.registerForm.controls.email.hasError('required') ? 'L’email est obligatoire.' : 'Saisissez une adresse email valide.';
    }

    passwordError(): string {
        return this.registerForm.controls.password.hasError('required') ? 'Le mot de passe est obligatoire.' : 'Le mot de passe doit contenir 10 à 128 caractères, avec majuscule, minuscule et chiffre.';
    }

    confirmInvalid(): boolean {
        const confirm = this.registerForm.controls.confirmPassword;
        return (confirm.invalid || this.registerForm.hasError('passwordMismatch')) && confirm.touched;
    }

    confirmError(): string {
        return this.registerForm.controls.confirmPassword.hasError('required') ? 'La confirmation est obligatoire.' : 'Les mots de passe ne correspondent pas.';
    }

    /** Erreurs du formulaire, dans l’ordre des champs, pour le récapitulatif. */
    formErrors(): { field: string; message: string }[] {
        const { name, email, password, confirmPassword } = this.registerForm.controls;
        const errors: { field: string; message: string }[] = [];
        if (name.invalid) errors.push({ field: 'name', message: 'Saisissez un nom de 1 à 255 caractères.' });
        if (email.invalid) errors.push({ field: 'email', message: this.emailError() });
        if (password.invalid) errors.push({ field: 'password', message: this.passwordError() });
        if (confirmPassword.invalid || this.registerForm.hasError('passwordMismatch')) errors.push({ field: 'confirmPassword', message: this.confirmError() });
        return errors;
    }

    /** Lien du récapitulatif : place le focus dans le champ concerné sans recharger la page. */
    focusField(event: Event, id: string): void {
        event.preventDefault();
        document.getElementById(id)?.focus();
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
            return apiErrorMessage(error);
    }
}
