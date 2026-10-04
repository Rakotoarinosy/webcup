import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { GoogleButton } from './google-button';
import { GoogleIdentityService } from '../google-identity.service';
import { VerificationService } from '../verification.service';

describe('Google sign in', () => {
    it('keeps a visible disabled button when Google is unavailable', async () => {
        TestBed.configureTestingModule({
            imports: [GoogleButton],
            providers: [
                provideRouter([]),
                { provide: GoogleIdentityService, useValue: { renderButton: () => Promise.reject(new Error('unavailable')) } },
                { provide: VerificationService, useValue: {} }
            ]
        });
        const fixture = TestBed.createComponent(GoogleButton);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        expect(button.textContent).toContain('Continuer avec Google');
        expect(button.disabled).toBeTrue();
    });

    it('opens code verification after Google credentials are accepted', async () => {
        const loginWithGoogle = jasmine.createSpy('loginWithGoogle').and.returnValue(of('verification-required'));
        TestBed.configureTestingModule({
            imports: [GoogleButton],
            providers: [
                provideRouter([]),
                { provide: GoogleIdentityService, useValue: { renderButton: (_host: HTMLElement, callback: (credential: string) => void) => {
                    callback('google-credential');
                    return Promise.resolve();
                } } },
                { provide: VerificationService, useValue: { loginWithGoogle } }
            ]
        });
        const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        const fixture = TestBed.createComponent(GoogleButton);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(loginWithGoogle).toHaveBeenCalledWith('google-credential');
        expect(navigate).toHaveBeenCalledWith(['/auth/verify-code'], { queryParams: { returnUrl: null } });
    });

    it('returns the Google proof without replacing the session during reauthentication', async () => {
        let callback: (credential: string) => void = () => {};
        const loginWithGoogle = jasmine.createSpy('loginWithGoogle');
        TestBed.configureTestingModule({
            imports: [GoogleButton],
            providers: [
                provideRouter([]),
                { provide: GoogleIdentityService, useValue: { renderButton: (_host: HTMLElement, receive: (credential: string) => void) => { callback = receive; return Promise.resolve(); } } },
                { provide: VerificationService, useValue: { loginWithGoogle } }
            ]
        });
        const fixture = TestBed.createComponent(GoogleButton);
        fixture.componentRef.setInput('reauthenticate', true);
        const received = jasmine.createSpy('credential');
        fixture.componentInstance.credential.subscribe(received);
        fixture.detectChanges();
        await fixture.whenStable();
        callback('fresh-google-proof');
        expect(received).toHaveBeenCalledOnceWith('fresh-google-proof');
        expect(loginWithGoogle).not.toHaveBeenCalled();
    });
});
