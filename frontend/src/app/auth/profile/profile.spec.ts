import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthUser } from '../auth.model';
import { Profile } from './profile';

const USER: AuthUser = { id: 'me', name: 'Ada Lovelace', email: 'ada@test.mg', role: 'citizen', agent_id: null, institut_id: null, created_at: '2026-10-03T10:00:00Z', email_verified: true, avatar_url: null };

describe('Profile', () => {
    let fixture: ComponentFixture<Profile>;
    let auth: jasmine.SpyObj<AuthService>;
    const user = signal<AuthUser | null>(USER);
    beforeEach(async () => {
        user.set(USER);
        auth = jasmine.createSpyObj('AuthService', ['hasRole', 'updateProfile', 'changePassword', 'deleteAccount'], { user, roleLabel: () => 'Citoyen' });
        auth.hasRole.and.callFake((...roles) => roles.includes(user()!.role));
        await TestBed.configureTestingModule({ imports: [Profile], providers: [provideRouter([]), { provide: AuthService, useValue: auth }] }).compileComponents();
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
    it('prevents duplicate submissions and clears the password on success', () => {
        const pending = new Subject<AuthUser>();
        auth.updateProfile.and.returnValue(pending);
        fixture.componentInstance.profileForm.setValue({ name: '  Ada  ', email: 'ada@example.com', current_password: 'Motdepasse123' });
        fixture.componentInstance.saveProfile();
        fixture.componentInstance.saveProfile();
        fixture.detectChanges();
        expect(auth.updateProfile).toHaveBeenCalledOnceWith('Ada', 'ada@example.com', 'Motdepasse123');
        expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
        pending.next({ ...USER, name: 'Ada', email: 'ada@example.com' });
        pending.complete();
        fixture.detectChanges();
        expect(fixture.componentInstance.profileForm.getRawValue().current_password).toBe('');
        expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('enregistrées');
    });
    it('retains edited identity and reports a wrong password in French', () => {
        auth.updateProfile.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400, error: { error: 'IncorrectPasswordError' } })));
        fixture.componentInstance.profileForm.setValue({ name: 'Edited name', email: 'new@test.mg', current_password: 'wrong' });
        fixture.componentInstance.saveProfile();
        fixture.detectChanges();
        expect(fixture.componentInstance.profileForm.getRawValue().name).toBe('Edited name');
        expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('mot de passe actuel est incorrect');
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
        expect(auth.changePassword).toHaveBeenCalledOnceWith('Motdepasse123', 'NouveauMot123');
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
        expect(auth.deleteAccount).toHaveBeenCalledOnceWith('Motdepasse123');
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
});
