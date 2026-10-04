import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';
import { Register } from './register';

describe('Registration flow', () => {
    let component: Register;
    let auth: jasmine.SpyObj<AuthService>;
    beforeEach(() => {
        auth = jasmine.createSpyObj<AuthService>('AuthService', ['register', 'logout', 'homeUrl']);
        auth.homeUrl.and.returnValue('/home/account');
        auth.register.and.returnValue(of('verification-required'));
        TestBed.configureTestingModule({ imports: [Register], providers: [provideRouter([]), { provide: AuthService, useValue: auth }] });
        TestBed.overrideComponent(Register, { set: { template: '' } });
        component = TestBed.createComponent(Register).componentInstance;
    });
    it('opens code verification after registration', () => {
        const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        component.registerForm.setValue({ name: 'Rina', contact: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
        component.submit();
        expect(auth.register).toHaveBeenCalled();
        expect(auth.logout).not.toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith(['/auth/verify-code'], { queryParamsHandling: 'preserve' });
    });
    it('shows pending email verification, clears passwords and delays navigation', () => {
        const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
        const verify = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        auth.register.and.returnValue(of('verification-required'));
        component.registerForm.setValue({ name: 'Rina', contact: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
        component.submit();
        expect(component.loading()).toBeTrue();
        expect(component.registerForm.getRawValue().password).toBe('');
        expect(component.registerForm.getRawValue().confirmPassword).toBe('');
        expect(navigate).not.toHaveBeenCalled();
        expect(verify).toHaveBeenCalledWith(['/auth/verify-code'], { queryParamsHandling: 'preserve' });
    });
    it('rejects passwords that do not meet the API policy', () => {
        component.registerForm.setValue({ name: 'Rina', contact: 'r@test.mg', password: 'short', confirmPassword: 'short' });
        component.submit();
        expect(auth.register).not.toHaveBeenCalled();
    });
    it('rejects blank and oversized names', () => {
        component.registerForm.setValue({ name: '   ', contact: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
        component.submit();
        component.registerForm.controls.name.setValue('x'.repeat(256));
        component.submit();
        expect(auth.register).not.toHaveBeenCalled();
    });
    it('clears the mismatch when the confirmation is corrected', () => {
        component.registerForm.patchValue({ password: 'Motdepasse123', confirmPassword: 'wrong' });
        expect(component.registerForm.hasError('passwordMismatch')).toBeTrue();
        component.registerForm.controls.confirmPassword.setValue('Motdepasse123');
        expect(component.registerForm.hasError('passwordMismatch')).toBeFalse();
        expect(component.registerForm.controls.confirmPassword.valid).toBeTrue();
    });
});

describe('Registration form accessibility', () => {
    let fixture: ComponentFixture<Register>;

    beforeEach(async () => {
        const auth = jasmine.createSpyObj<AuthService>('AuthService', ['register', 'homeUrl']);
        await TestBed.configureTestingModule({ imports: [Register], providers: [provideRouter([]), { provide: AuthService, useValue: auth }] })
            .overrideComponent(Register, { remove: { imports: [AppFloatingConfigurator] }, add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] } })
            .compileComponents();
        fixture = TestBed.createComponent(Register);
        fixture.detectChanges();
    });

    it('links the password rules and the mismatch error to their fields', async () => {
        const host = fixture.nativeElement as HTMLElement;
        expect(host.querySelector('#password')?.getAttribute('aria-describedby')).toBe('password-help password-error');
        expect(host.querySelector('#password-help')?.textContent).toContain('10 à 128 caractères');

        fixture.componentInstance.registerForm.setValue({ name: 'Rina', contact: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Autre123456' });
        (host.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        await fixture.whenStable();

        const confirm = host.querySelector('#confirmPassword') as HTMLInputElement;
        expect(confirm.getAttribute('aria-invalid')).toBe('true');
        expect(confirm.getAttribute('aria-describedby')).toBe('confirmPassword-error');
        expect(host.querySelector('#confirmPassword-error')?.textContent).toContain('Les mots de passe ne correspondent pas.');
        expect(host.querySelector('#register-error-summary')?.getAttribute('role')).toBe('alert');
        expect(host.querySelector('#password')?.getAttribute('aria-invalid')).toBe('false');
    });
});
