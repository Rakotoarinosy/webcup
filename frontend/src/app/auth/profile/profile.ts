import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, Injector, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../auth.service';
import { NAME_VALIDATORS, PASSWORD_VALIDATORS } from '../auth.validators';
import { apiErrorMessage } from '@/app/users/user.service';

@Component({
    selector: 'app-profile',
    imports: [DatePipe, ReactiveFormsModule, RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.scss'
})
export class Profile {
    readonly auth = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);
    readonly feedback = viewChild<ElementRef<HTMLElement>>('feedback');
    readonly deleteFeedback = viewChild<ElementRef<HTMLElement>>('deleteFeedback');
    readonly deleteDialog = viewChild<ElementRef<HTMLDialogElement>>('deleteDialog');
    readonly busy = signal<'profile' | 'password' | 'delete' | null>(null);
    readonly notice = signal<string | null>(null);
    readonly error = signal<string | null>(null);
    readonly deleteError = signal<string | null>(null);
    readonly initials = computed(() =>
        (
            this.auth
                .user()
                ?.name.trim()
                .split(/\s+/)
                .map((part) => part[0])
                .slice(0, 2)
                .join('') ?? ''
        ).toUpperCase()
    );

    readonly profileForm = this.fb.nonNullable.group({
        name: [this.auth.user()?.name ?? '', NAME_VALIDATORS],
        email: [this.auth.user()?.email ?? '', [Validators.required, Validators.email, Validators.maxLength(320)]],
        current_password: ['', [Validators.required, Validators.maxLength(128)]]
    });
    readonly passwordForm = this.fb.nonNullable.group({
        current_password: ['', [Validators.required, Validators.maxLength(128)]],
        new_password: ['', [Validators.required, ...PASSWORD_VALIDATORS]],
        confirmation: ['', Validators.required]
    });
    readonly deleteForm = this.fb.nonNullable.group({
        current_password: ['', [Validators.required, Validators.maxLength(128)]],
        confirmed: [false, Validators.requiredTrue]
    });

    saveProfile(): void {
        if (this.busy()) return;
        this.profileForm.markAllAsTouched();
        if (this.profileForm.invalid) return;
        const value = this.profileForm.getRawValue();
        this.start('profile');
        this.auth
            .updateProfile(value.name.trim(), value.email.trim().toLowerCase(), value.current_password)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.busy.set(null))
            )
            .subscribe({
                next: (user) => {
                    this.profileForm.reset({ name: user.name, email: user.email, current_password: '' });
                    this.notice.set('Vos informations ont été enregistrées. Utilisez cette adresse email lors de votre prochaine connexion.');
                    this.focusFeedback();
                },
                error: (error: unknown) => {
                    this.profileForm.controls.current_password.reset();
                    this.error.set(this.message(error));
                    this.focusFeedback();
                }
            });
    }

    savePassword(): void {
        if (this.busy()) return;
        this.passwordForm.markAllAsTouched();
        if (this.passwordForm.invalid) return;
        const value = this.passwordForm.getRawValue();
        if (value.new_password !== value.confirmation) {
            this.error.set('Les deux nouveaux mots de passe doivent être identiques.');
            this.notice.set(null);
            this.focusFeedback();
            return;
        }
        this.start('password');
        this.auth
            .changePassword(value.current_password, value.new_password)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.busy.set(null))
            )
            .subscribe({
                next: () => {
                    this.passwordForm.reset();
                    this.notice.set('Votre mot de passe a été modifié. Les sessions des autres appareils ne pourront plus être renouvelées.');
                    this.focusFeedback();
                },
                error: (error: unknown) => {
                    this.passwordForm.controls.current_password.reset();
                    this.error.set(this.message(error));
                    this.focusFeedback();
                }
            });
    }

    openDeletion(): void {
        if (this.busy() || !this.auth.hasRole('citizen')) return;
        this.deleteForm.reset();
        this.deleteError.set(null);
        this.deleteDialog()?.nativeElement.showModal();
    }

    closeDeletion(event?: Event): void {
        if (this.busy()) {
            event?.preventDefault();
            return;
        }
        this.deleteDialog()?.nativeElement.close();
        this.deleteForm.reset();
        this.deleteError.set(null);
    }

    deleteAccount(): void {
        if (this.busy() || !this.auth.hasRole('citizen')) return;
        this.deleteForm.markAllAsTouched();
        if (this.deleteForm.invalid) return;
        this.start('delete');
        this.deleteError.set(null);
        this.auth
            .deleteAccount(this.deleteForm.getRawValue().current_password)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.busy.set(null))
            )
            .subscribe({
                next: () => {
                    this.deleteDialog()?.nativeElement.close();
                    this.router.navigate(['/auth/login'], { queryParams: { accountDeleted: '1' } });
                },
                error: (error: unknown) => {
                    this.deleteForm.controls.current_password.reset();
                    this.deleteError.set(this.message(error));
                    afterNextRender(() => this.deleteFeedback()?.nativeElement.focus(), { injector: this.injector });
                }
            });
    }

    private start(action: 'profile' | 'password' | 'delete'): void {
        this.busy.set(action);
        this.notice.set(null);
        this.error.set(null);
    }

    private focusFeedback(): void {
        afterNextRender(() => this.feedback()?.nativeElement.focus(), { injector: this.injector });
    }

    private message(error: unknown): string {
        if (error instanceof HttpErrorResponse) {
            const messages: Record<string, string> = {
                IncorrectPasswordError: 'Le mot de passe actuel est incorrect. Réessayez.',
                PasswordReuseError: 'Choisissez un mot de passe différent de votre mot de passe actuel.',
                AccountLockedError: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
                ForbiddenError: 'Cette action n’est pas autorisée pour votre compte.'
            };
            if (messages[error.error?.error]) return messages[error.error.error];
        }
        return apiErrorMessage(error);
    }
}
