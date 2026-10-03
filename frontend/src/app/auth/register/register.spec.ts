import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
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
        component.registerForm.setValue({ name: 'Rina', email: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
        component.submit();
        expect(auth.register).toHaveBeenCalled();
        expect(auth.logout).not.toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith(['/auth/verify-code'], { queryParamsHandling: 'preserve' });
    });
    it('shows pending email verification, clears passwords and delays navigation', () => {
        const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
        const verify = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        auth.register.and.returnValue(of('verification-required'));
        component.registerForm.setValue({ name: 'Rina', email: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
        component.submit();
        expect(component.loading()).toBeTrue();
        expect(component.registerForm.getRawValue().password).toBe('');
        expect(component.registerForm.getRawValue().confirmPassword).toBe('');
        expect(navigate).not.toHaveBeenCalled();
        expect(verify).toHaveBeenCalledWith(['/auth/verify-code'], { queryParamsHandling: 'preserve' });
    });
    it('rejects passwords that do not meet the API policy', () => {
        component.registerForm.setValue({ name: 'Rina', email: 'r@test.mg', password: 'short', confirmPassword: 'short' });
        component.submit();
        expect(auth.register).not.toHaveBeenCalled();
    });
    it('rejects blank and oversized names', () => {
        component.registerForm.setValue({ name: '   ', email: 'r@test.mg', password: 'Motdepasse123', confirmPassword: 'Motdepasse123' });
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
