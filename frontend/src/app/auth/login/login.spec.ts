import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../auth.service';
import { AppFloatingConfigurator } from '../../layout/component/floatingconfigurator/app.floatingconfigurator';
import { Login } from './login';

describe('Login accessibility', () => {
    let fixture: ComponentFixture<Login>;
    let auth: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        auth = jasmine.createSpyObj<AuthService>('AuthService', ['login', 'homeUrl']);
        await TestBed.configureTestingModule({ imports: [Login], providers: [provideRouter([]), { provide: AuthService, useValue: auth }] })
            .overrideComponent(Login, { remove: { imports: [AppFloatingConfigurator] }, add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] } })
            .compileComponents();
        fixture = TestBed.createComponent(Login);
        fixture.detectChanges();
    });

    function element<T extends HTMLElement>(selector: string): T {
        return fixture.nativeElement.querySelector(selector) as T;
    }

    it('labels every field, marks them required and offers autocomplete', () => {
        for (const id of ['identifier', 'password']) {
            const input = element<HTMLInputElement>('#' + id);
            expect(element(`label[for="${id}"]`)).withContext(id).not.toBeNull();
            expect(input.required).withContext(id).toBeTrue();
            expect(input.getAttribute('aria-describedby')).withContext(id).toBe(`${id}-error`);
            expect(element('#' + id + '-error')).withContext(id).not.toBeNull();
        }
        expect(element('#identifier').getAttribute('autocomplete')).toBe('username');
        expect(element('#password').getAttribute('autocomplete')).toBe('current-password');
    });

    it('flags invalid fields and announces an error summary on a failed submit', async () => {
        element<HTMLFormElement>('form').dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(auth.login).not.toHaveBeenCalled();
        expect(element('#identifier').getAttribute('aria-invalid')).toBe('true');
        expect(element('#password').getAttribute('aria-invalid')).toBe('true');
        expect(element('#identifier-error').textContent).toContain('L’email est obligatoire.');
        const summary = element('#login-error-summary');
        expect(summary.getAttribute('role')).toBe('alert');
        expect(summary.querySelectorAll('li').length).toBe(2);
        expect(document.activeElement).toBe(summary);
    });

    it('moves focus to the field from the error summary link', async () => {
        element<HTMLFormElement>('form').dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        await fixture.whenStable();

        (element('#login-error-summary a[href="#password"]') as HTMLAnchorElement).click();
        expect(document.activeElement).toBe(element('#password'));
    });

    it('exposes the password visibility toggle as a pressed state', () => {
        const toggle = element<HTMLButtonElement>('button[aria-controls="password"]');
        expect(toggle.getAttribute('aria-label')).toBe('Afficher le mot de passe');
        expect(toggle.getAttribute('aria-pressed')).toBe('false');

        toggle.click();
        fixture.detectChanges();

        expect(toggle.getAttribute('aria-pressed')).toBe('true');
        expect(element<HTMLInputElement>('#password').type).toBe('text');
    });
});
