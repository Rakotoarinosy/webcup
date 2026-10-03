import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';

import { NAME_VALIDATORS, PASSWORD_VALIDATORS, normalizePhone, phoneValidator } from '../auth.validators';
import { AuthService } from '@/app/auth/auth.service';
import { authErrorMessage } from '../auth-errors';
import { ContactMethod, RegisterContact } from '../auth.model';
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
    imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator, GoogleButton],
    templateUrl: './register.html'
})
export class Register implements AfterViewInit {
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    private readonly injector = inject(Injector);
    private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
    private readonly contactInput = viewChild<ElementRef<HTMLInputElement>>('contactInput');
    private readonly errorSummary = viewChild<ElementRef<HTMLElement>>('errorSummary');

    /** Moyen de contact choisi : le code de confirmation part par ce canal (email ou SMS). */
    readonly method = signal<ContactMethod>('email');

    private readonly contactValidator: ValidatorFn = (control) => (this.method() === 'phone' ? phoneValidator(control) : Validators.email(control));

    readonly registerForm = this.fb.nonNullable.group(
        {
            name: ['', NAME_VALIDATORS],
            contact: ['', [Validators.required, this.contactValidator]],
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

    setMethod(method: ContactMethod): void {
        if (this.method() === method || this.loading()) return;

        this.method.set(method);
        this.registerForm.controls.contact.reset('');
        this.errorMessage.set(null);
        this.submitAttempted.set(false);
        afterNextRender(() => this.contactInput()?.nativeElement.focus(), { injector: this.injector });
    }

    /** Classes de l'onglet Email / Téléphone selon qu'il est actif ou non. */
    tabClass(method: ContactMethod): string {
        const base = 'rounded-lg px-3 py-2 text-sm font-semibold transition-colors';
        return this.method() === method
            ? `${base} bg-white text-emerald-700 shadow-sm dark:bg-emerald-700 dark:text-white`
            : `${base} text-emerald-950/60 hover:text-emerald-950 dark:text-emerald-50/65 dark:hover:text-emerald-50`;
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

        const { name, contact, password } = this.registerForm.getRawValue();
        // Un seul contact est envoyé : l'API refuse un email ET un téléphone dans la même inscription.
        const target: RegisterContact = this.method() === 'phone' ? { phone: normalizePhone(contact) ?? contact.trim() } : { email: contact.trim() };
        this.registerForm.disable();

        this.auth.register(name.trim(), target, password).subscribe({
            // Compte créé mais non confirmé : un code vient d'être envoyé (email ou SMS), la session s'ouvre après sa saisie.
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

    contactError(): string {
        const phone = this.method() === 'phone';
        if (this.registerForm.controls.contact.hasError('required')) {
            return phone ? 'Le numéro de téléphone est obligatoire.' : 'L’email est obligatoire.';
        }
        return phone ? 'Saisissez un numéro valide, par exemple 034 12 345 67 ou +261 34 12 345 67.' : 'Saisissez une adresse email valide.';
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
        const { name, contact, password, confirmPassword } = this.registerForm.controls;
        const errors: { field: string; message: string }[] = [];
        if (name.invalid) errors.push({ field: 'name', message: 'Saisissez un nom de 1 à 255 caractères.' });
        if (contact.invalid) errors.push({ field: 'contact', message: this.contactError() });
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
            return 'Cet email ou ce numéro est déjà utilisé par un autre compte.';
        case 422:
            return 'Vérifiez les informations saisies.';
        default:
            // 429 (un code vient d'être envoyé), 503 (SMTP ou SMS indisponible), etc.
            return authErrorMessage(error);
    }
}