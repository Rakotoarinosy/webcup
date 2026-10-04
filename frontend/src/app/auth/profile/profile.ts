import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, Injector, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';

import { AuthService } from '../auth.service';
import { NAME_VALIDATORS, PASSWORD_VALIDATORS } from '../auth.validators';
import { apiErrorMessage } from '@/app/users/user.service';
import { ProfileExportService, UserExportFormat } from './profile-export.service';

@Component({
    selector: 'app-profile',
    imports: [DatePipe, ReactiveFormsModule, ToastModule],
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    providers: [MessageService]
})
export class Profile {
    readonly auth = inject(AuthService);
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);
    private readonly profileExport = inject(ProfileExportService);
    private readonly messages = inject(MessageService);
    readonly avatarFileInput = viewChild<ElementRef<HTMLInputElement>>('avatarFileInput');
    readonly deleteFeedback = viewChild<ElementRef<HTMLElement>>('deleteFeedback');
    readonly deleteDialog = viewChild<ElementRef<HTMLDialogElement>>('deleteDialog');
    readonly busy = signal<'avatar' | 'profile' | 'password' | 'delete' | 'export' | null>(null);
    readonly deleteError = signal<string | null>(null);
    readonly exportFormat = signal<UserExportFormat>('pdf');
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

    chooseAvatar(): void {
        if (this.busy()) return;
        this.avatarFileInput()?.nativeElement.click();
    }

    uploadAvatar(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        input.value = '';
        if (!file || this.busy()) return;

        const accepted = ['image/jpeg', 'image/png', 'image/webp'];
        if (!accepted.includes(file.type)) {
            this.messages.add({ severity: 'warn', summary: 'Image refusee', detail: 'Utilisez une image JPG, PNG ou WebP.', life: 5000 });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            this.messages.add({ severity: 'warn', summary: 'Image trop lourde', detail: 'La photo ne doit pas depasser 5 Mo.', life: 5000 });
            return;
        }

        this.start('avatar');
        this.auth
            .uploadAvatar(file)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.busy.set(null))
            )
            .subscribe({
                next: () => this.success('Photo mise a jour', 'Votre photo de profil est maintenant enregistree.'),
                error: (error: unknown) => this.failure('Upload impossible', error)
            });
    }

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
                    this.profileForm.reset({ name: user.name, email: user.email ?? '', current_password: '' });
                    this.success('Informations enregistrées', 'Utilisez cette adresse email lors de votre prochaine connexion.');
                },
                error: (error: unknown) => {
                    this.profileForm.controls.current_password.reset();
                    this.failure('Enregistrement impossible', error);
                }
            });
    }

    savePassword(): void {
        if (this.busy()) return;
        this.passwordForm.markAllAsTouched();
        if (this.passwordForm.invalid) return;
        const value = this.passwordForm.getRawValue();
        if (value.new_password !== value.confirmation) {
            this.messages.add({ severity: 'warn', summary: 'Vérifiez le mot de passe', detail: 'Les deux nouveaux mots de passe doivent être identiques.', life: 5000 });
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
                    this.success('Mot de passe modifié', 'Les sessions des autres appareils ne pourront plus être renouvelées.');
                },
                error: (error: unknown) => {
                    this.passwordForm.controls.current_password.reset();
                    this.failure('Modification impossible', error);
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

    downloadPersonalData(): void {
        if (this.busy()) return;
        const format = this.exportFormat();
        this.start('export');
        this.profileExport
            .exportPersonalData(format)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.busy.set(null))
            )
            .subscribe({
                next: (response) => {
                    this.saveFile(response, format);
                    this.success('Export prêt', 'Le téléchargement de vos données a commencé.');
                },
                error: (error: unknown) => {
                    this.failure('Export impossible', error);
                }
            });
    }

    private start(action: 'avatar' | 'profile' | 'password' | 'delete' | 'export'): void {
        this.busy.set(action);
    }

    private success(summary: string, detail: string): void {
        this.messages.add({ severity: 'success', summary, detail, life: 4000 });
    }

    private failure(summary: string, error: unknown): void {
        this.messages.add({ severity: 'error', summary, detail: this.message(error), life: 5000 });
    }

    private saveFile(response: HttpResponse<Blob>, format: UserExportFormat): void {
        const filename = response.headers.get('content-disposition')?.match(/filename="?([^";]+)"?/i)?.[1] ?? `mes-donnees.${format === 'excel' ? 'xlsx' : format === 'word' ? 'doc' : format}`;
        const url = URL.createObjectURL(response.body ?? new Blob());
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
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
