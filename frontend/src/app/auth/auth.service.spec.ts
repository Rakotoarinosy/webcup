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
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])] });
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
});
