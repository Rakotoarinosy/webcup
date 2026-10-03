import { PreferencesService } from '@/app/preferences/preferences.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AUTH_URL, AuthService } from './auth.service';
import { AuthUser, TokenResponse } from './auth.model';

const USER: AuthUser = { id: 'id', name: 'Rina', email: 'rina@test.mg', role: 'citizen', agent_id: null, institut_id: null, created_at: '' };
const SESSION: TokenResponse = { access_token: 'access-token', token_type: 'bearer', expires_in: 900, user: USER };

describe('AuthService session lifecycle', () => {
    let auth: AuthService;
    let http: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([]), { provide: PreferencesService, useValue: { load: () => of(null) } }] });
        auth = TestBed.inject(AuthService);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => http.verify());
    it('registers then logs in without logging out', () => {
        const user = jasmine.createSpy('user');
        auth.register('Rina', USER.email, 'Motdepasse123').subscribe(user);
        const register = http.expectOne(`${AUTH_URL}/register`);
        expect(register.request.withCredentials).toBeTrue();
        register.flush(USER);
        http.expectOne(`${AUTH_URL}/login`).flush(SESSION);
        expect(user).toHaveBeenCalledWith(USER);
        expect(auth.accessToken()).toBe(SESSION.access_token);
        expect(auth.isAuthenticated()).toBeTrue();
        http.expectNone(`${AUTH_URL}/logout`);
    });
    it('shares one refresh across concurrent restorations', () => {
        const restored = jasmine.createSpy('restored');
        auth.restoreSession().subscribe(restored);
        auth.restoreSession().subscribe(restored);
        const request = http.expectOne(`${AUTH_URL}/refresh`);
        expect(request.request.withCredentials).toBeTrue();
        request.flush(SESSION);
        expect(restored).toHaveBeenCalledTimes(2);
        auth.restoreSession().subscribe();
        http.expectNone(`${AUTH_URL}/refresh`);
    });
    it('does not repeatedly refresh an anonymous session', () => {
        const restored = jasmine.createSpy('restored');
        auth.restoreSession().subscribe(restored);
        http.expectOne(`${AUTH_URL}/refresh`).flush({}, { status: 401, statusText: 'Unauthorized' });
        expect(restored).toHaveBeenCalledWith(false);
        auth.restoreSession().subscribe();
        http.expectNone(`${AUTH_URL}/refresh`);
    });
    it('cancels a pending refresh when logged out', () => {
        auth.refresh().subscribe();
        const pending = http.expectOne(`${AUTH_URL}/refresh`);
        spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
        auth.logout();
        http.expectOne(`${AUTH_URL}/logout`).flush(null);
        expect(pending.cancelled).toBeTrue();
        expect(auth.user()).toBeNull();
        expect(auth.accessToken()).toBeNull();
    });
    it('rechecks the current role before navigation', () => {
        auth.login(USER.email, 'Motdepasse123').subscribe();
        http.expectOne(`${AUTH_URL}/login`).flush(SESSION);
        auth.validateSession().subscribe();
        http.expectOne(`${AUTH_URL}/me`).flush({ ...USER, role: 'manager' });
        expect(auth.homeUrl()).toBe('/home/dashboard');
        expect(auth.roleLabel()).toBe('Gestionnaire');
    });
    it('updates the visible profile and cancels a stale profile response', () => {
        auth.login(USER.email, 'Motdepasse123').subscribe();
        http.expectOne(`${AUTH_URL}/login`).flush(SESSION);
        auth.me().subscribe();
        const oldProfile = http.expectOne(`${AUTH_URL}/me`);
        auth.updateProfile('New name', 'new@test.mg', 'Motdepasse123').subscribe();
        const patch = http.expectOne(`${AUTH_URL}/me`);
        expect(patch.request.method).toBe('PATCH');
        expect(patch.request.withCredentials).toBeTrue();
        expect(patch.request.body).toEqual({ name: 'New name', email: 'new@test.mg', current_password: 'Motdepasse123' });
        patch.flush({ ...SESSION, access_token: 'updated-token', user: { ...USER, name: 'New name', email: 'new@test.mg' } });
        expect(oldProfile.cancelled).toBeTrue();
        expect(auth.user()?.name).toBe('New name');
        expect(auth.accessToken()).toBe('updated-token');
    });
    it('uses the existing password endpoint and installs the renewed session', () => {
        auth.changePassword('Motdepasse123', 'NouveauMot123').subscribe();
        const request = http.expectOne(`${AUTH_URL}/change-password`);
        expect(request.request.body).toEqual({ current_password: 'Motdepasse123', new_password: 'NouveauMot123' });
        request.flush({ ...SESSION, access_token: 'new-token' });
        expect(auth.accessToken()).toBe('new-token');
    });
    it('erases local credentials and cancels pending session restoration after deletion', () => {
        auth.refresh().subscribe();
        const pending = http.expectOne(`${AUTH_URL}/refresh`);
        auth.deleteAccount('Motdepasse123').subscribe();
        const request = http.expectOne(`${AUTH_URL}/me`);
        expect(request.request.method).toBe('DELETE');
        expect(request.request.body).toEqual({ current_password: 'Motdepasse123' });
        expect(request.request.withCredentials).toBeTrue();
        request.flush(null, { status: 204, statusText: 'No Content' });
        expect(pending.cancelled).toBeTrue();
        expect(auth.user()).toBeNull();
        expect(auth.accessToken()).toBeNull();
        auth.restoreSession().subscribe();
        http.expectNone(`${AUTH_URL}/refresh`);
    });
    it('preserves the session if account deletion fails', () => {
        auth.login(USER.email, 'Motdepasse123').subscribe();
        http.expectOne(`${AUTH_URL}/login`).flush(SESSION);
        auth.deleteAccount('wrong').subscribe({ error: () => {} });
        http.expectOne(`${AUTH_URL}/me`).flush({}, { status: 400, statusText: 'Bad Request' });
        expect(auth.accessToken()).toBe(SESSION.access_token);
        expect(auth.user()).toEqual(USER);
    });
});
