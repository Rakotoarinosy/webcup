import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthUser } from '../auth.model';
import { Profile } from './profile';
import { ProfileExportService } from './profile-export.service';
import { GoogleIdentityService } from '../google-identity.service';
import { GoogleButton } from '../google-button/google-button';
import { MessageService } from 'primeng/api';

const USER: AuthUser = { id: 'me', name: 'Ada Lovelace', email: 'ada@test.mg', role: 'citizen', agent_id: null, institut_id: null, created_at: '2026-10-03T10:00:00Z', email_verified: true, phone: null, phone_verified: false, avatar_url: null };

describe('Profile', () => {
    let fixture: ComponentFixture<Profile>;
    let auth: jasmine.SpyObj<AuthService>;
    let profileExport: jasmine.SpyObj<ProfileExportService>;
    const user = signal<AuthUser | null>(USER);
    beforeEach(async () => {
        user.set(USER);
        auth = jasmine.createSpyObj('AuthService', ['hasRole', 'updateProfile', 'changePassword', 'deleteAccount'], { user, roleLabel: () => 'Citoyen' });
        profileExport = jasmine.createSpyObj('ProfileExportService', ['exportPersonalData']);
        auth.hasRole.and.callFake((...roles) => roles.includes(user()!.role));
        const google = jasmine.createSpyObj<GoogleIdentityService>('GoogleIdentityService', ['renderButton']);
        google.renderButton.and.resolveTo();
        await TestBed.configureTestingModule({
            imports: [Profile],
            providers: [provideRouter([]), { provide: AuthService, useValue: auth }, { provide: ProfileExportService, useValue: profileExport }, { provide: GoogleIdentityService, useValue: google }]
        }).compileComponents();
        fixture = TestBed.createComponent(Profile);
        fixture.detectChanges();
    });
    it('shows the real profile and keeps role out of the editable form', () => {
        expect(fixture.componentInstance.profileForm.getRawValue().name).toBe(USER.name);
        expect(fixture.nativeElement.querySelector('aside').textContent).toContain(USER.email);
        expect(fixture.componentInstance.initials()).toBe('AL');
        expect(fixture.componentInstance.profileForm.get('role')).toBeNull();
    });
    it('requires a name, valid email and current password', () => {
        fixture.componentInstance.profileForm.setValue({ name: '   ', email: 'invalid', current_password: '' });
        fixture.componentInstance.saveProfile();
        fixture.detectChanges();
        expect(auth.updateProfile).not.toHaveBeenCalled();
        expect(fixture.nativeElement.textContent).toContain('Indiquez une adresse email valide');
    });
    it('allows a phone-only citizen to update their name without adding an email', () => {
        const phoneOnly = { ...USER, email: null, email_verified: false, phone: '+261341234567', phone_verified: true, has_password: true };
        user.set(phoneOnly);
        fixture.detectChanges();
        const component = fixture.componentInstance;
        component.profileForm.setValue({ name: 'Ada Updated', email: '', current_password: 'Motdepasse123' });
        auth.updateProfile.and.returnValue(of({ ...phoneOnly, name: 'Ada Updated' }));
        const email = fixture.nativeElement.querySelector('#profile-email') as HTMLInputElement;
        expect(email.required).toBeFalse();
        const notify = spyOn(fixture.debugElement.injector.get(MessageService), 'add');
        component.saveProfile();
        expect(auth.updateProfile).toHaveBeenCalledOnceWith('Ada Updated', undefined, 'Motdepasse123', undefined);
        expect(notify).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'success', detail: 'Votre profil a été mis à jour.' }));
    });
    it('announces email verification when the destination was actually changed', () => {
        fixture.componentInstance.profileForm.setValue({ name: USER.name, email: 'new@example.mg', current_password: 'Motdepasse123' });
        auth.updateProfile.and.callFake(() => {
            const updated = { ...USER, email: 'new@example.mg', email_verified: false };
            user.set(updated);
            return of(updated);
        });
        const notify = spyOn(fixture.debugElement.injector.get(MessageService), 'add');
        fixture.componentInstance.saveProfile();
        expect(notify).toHaveBeenCalledWith(jasmine.objectContaining({ detail: 'Votre nouvelle adresse devra être confirmée par code lors de votre prochaine connexion.' }));
    });
    it('prevents duplicate submissions and clears the password on success', () => {
        const pending = new Subject<AuthUser>();
        auth.updateProfile.and.returnValue(pending);
        fixture.componentInstance.profileForm.setValue({ name: '  Ada  ', email: 'ada@example.com', current_password: 'Motdepasse123' });
        fixture.componentInstance.saveProfile();
        fixture.componentInstance.saveProfile();
        fixture.detectChanges();
        expect(auth.updateProfile).toHaveBeenCalledOnceWith('Ada', 'ada@example.com', 'Motdepasse123', undefined);
        expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
        pending.next({ ...USER, name: 'Ada', email: 'ada@example.com' });
        pending.complete();
        fixture.detectChanges();
        expect(fixture.componentInstance.profileForm.getRawValue().current_password).toBe('');
    });
    it('retains edited identity and reports a wrong password in French', () => {
        auth.updateProfile.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400, error: { error: 'IncorrectPasswordError' } })));
        fixture.componentInstance.profileForm.setValue({ name: 'Edited name', email: 'new@test.mg', current_password: 'wrong' });
        fixture.componentInstance.saveProfile();
        fixture.detectChanges();
        expect(fixture.componentInstance.profileForm.getRawValue().name).toBe('Edited name');
        expect(fixture.componentInstance.busy()).toBeNull();
    });
    it('requires matching passwords and resets them after success', () => {
        const component = fixture.componentInstance;
        component.passwordForm.setValue({ current_password: 'Motdepasse123', new_password: 'NouveauMot123', confirmation: 'Different123' });
        component.savePassword();
        expect(auth.changePassword).not.toHaveBeenCalled();
        auth.changePassword.and.returnValue(of(USER));
        component.passwordForm.controls.confirmation.setValue('NouveauMot123');
        component.savePassword();
        expect(auth.changePassword).toHaveBeenCalledOnceWith('Motdepasse123', 'NouveauMot123', undefined);
        expect(component.passwordForm.getRawValue().new_password).toBe('');
    });
    it('opens an accessible confirmation and allows cancellation without deleting', () => {
        fixture.componentInstance.openDeletion();
        const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
        expect(dialog.open).toBeTrue();
        expect(dialog.getAttribute('aria-labelledby')).toBe('confirm-heading');
        expect(dialog.textContent).toContain('Compte supprimé');
        fixture.componentInstance.closeDeletion();
        expect(dialog.open).toBeFalse();
        expect(auth.deleteAccount).not.toHaveBeenCalled();
    });
    it('requires both explicit confirmation and password, and prevents duplicate deletion', () => {
        const component = fixture.componentInstance;
        const pending = new Subject<void>();
        auth.deleteAccount.and.returnValue(pending);
        const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        component.openDeletion();
        component.deleteAccount();
        expect(auth.deleteAccount).not.toHaveBeenCalled();
        component.deleteForm.setValue({ current_password: 'Motdepasse123', confirmed: true });
        component.deleteAccount();
        component.deleteAccount();
        const cancel = new Event('cancel', { cancelable: true });
        component.closeDeletion(cancel);
        expect(cancel.defaultPrevented).toBeTrue();
        expect(auth.deleteAccount).toHaveBeenCalledOnceWith('Motdepasse123', undefined);
        pending.next();
        pending.complete();
        expect(navigate).toHaveBeenCalledWith(['/auth/login'], { queryParams: { accountDeleted: '1' } });
    });
    it('keeps the dialog open after failed deletion and allows retry', () => {
        auth.deleteAccount.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400, error: { error: 'IncorrectPasswordError' } })));
        const component = fixture.componentInstance;
        component.openDeletion();
        component.deleteForm.setValue({ current_password: 'wrong', confirmed: true });
        component.deleteAccount();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('dialog').open).toBeTrue();
        expect(fixture.nativeElement.querySelector('dialog [role="alert"]').textContent).toContain('incorrect');
        expect(component.busy()).toBeNull();
    });
    it('hides self-deletion from staff and blocks the handler too', () => {
        user.set({ ...USER, role: 'admin' });
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#open-deletion')).toBeNull();
        fixture.componentInstance.deleteForm.setValue({ current_password: 'Motdepasse123', confirmed: true });
        fixture.componentInstance.deleteAccount();
        expect(auth.deleteAccount).not.toHaveBeenCalled();
    });
    it('offers all supported personal-data export formats', () => {
        const select: HTMLSelectElement = fixture.nativeElement.querySelector('#export-format');
        expect(Array.from(select.options).map((option) => option.value)).toEqual(['pdf', 'csv', 'excel', 'word']);
        expect(fixture.nativeElement.textContent).toContain('mots de passe et jetons');
    });
    it('requires Google confirmation for a Google-only profile edit and clears the proof after saving', () => {
        user.set({ ...USER, has_password: false, google_linked: true });
        fixture.detectChanges();
        const component = fixture.componentInstance;
        const host = fixture.nativeElement as HTMLElement;
        component.profileForm.controls.name.setValue('Ada Updated');
        host.querySelector<HTMLButtonElement>('form button[type="submit"]')!.click();
        fixture.detectChanges();
        expect(auth.updateProfile).not.toHaveBeenCalled();
        expect(host.querySelector<HTMLInputElement>('#profile-password')!.parentElement!.hidden).toBeTrue();

        const google = fixture.debugElement.query(By.directive(GoogleButton)).componentInstance as GoogleButton;
        expect(google.reauthenticate()).toBeTrue();
        google.credential.emit('fresh-google-proof');
        auth.updateProfile.and.returnValue(of({ ...USER, name: 'Ada Updated', has_password: false }));
        host.querySelector<HTMLButtonElement>('form button[type="submit"]')!.click();
        expect(auth.updateProfile).toHaveBeenCalledOnceWith('Ada Updated', USER.email!, '', 'fresh-google-proof');
        expect(component.googleCredential()).toBeUndefined();

        component.profileForm.controls.name.setValue('Another edit');
        component.saveProfile();
        expect(auth.updateProfile).toHaveBeenCalledTimes(1);
    });
    it('does not require a hidden password when opening a Google-only profile directly', () => {
        fixture.destroy();
        user.set({ ...USER, has_password: false, google_linked: true });
        fixture = TestBed.createComponent(Profile);
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        expect(host.querySelector<HTMLInputElement>('#profile-password')!.required).toBeFalse();
        expect(host.querySelector<HTMLInputElement>('#security-current')!.required).toBeFalse();
        const google = fixture.debugElement.query(By.directive(GoogleButton)).componentInstance as GoogleButton;
        google.credential.emit('initial-google-proof');
        auth.updateProfile.and.returnValue(of({ ...USER, has_password: false }));
        host.querySelector<HTMLButtonElement>('form button[type="submit"]')!.click();
        expect(auth.updateProfile).toHaveBeenCalledOnceWith(USER.name, USER.email!, '', 'initial-google-proof');
    });
    it('creates the first password with Google and then requires the current password', () => {
        user.set({ ...USER, has_password: false, google_linked: true });
        fixture.detectChanges();
        const component = fixture.componentInstance;
        component.passwordForm.setValue({ current_password: '', new_password: 'NouveauMot123', confirmation: 'NouveauMot123' });
        component.savePassword();
        expect(auth.changePassword).not.toHaveBeenCalled();
        const google = fixture.debugElement.query(By.directive(GoogleButton)).componentInstance as GoogleButton;
        google.credential.emit('password-google-proof');
        auth.changePassword.and.callFake(() => {
            const updated = { ...USER, has_password: true, google_linked: true };
            user.set(updated);
            return of(updated);
        });
        component.savePassword();
        fixture.detectChanges();
        expect(auth.changePassword).toHaveBeenCalledOnceWith('', 'NouveauMot123', 'password-google-proof');
        expect(fixture.debugElement.query(By.directive(GoogleButton))).toBeNull();
        expect(component.passwordForm.controls.current_password.hasError('required')).toBeTrue();
        expect(component.googleCredential()).toBeUndefined();
    });
});
