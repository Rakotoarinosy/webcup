import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import { authGuard, guestGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthUser, Role } from './auth.model';

const user: AuthUser = { id: 'id', name: 'Test', email: 't@test.mg', role: 'citizen', agent_id: null, created_at: '' };
describe('Route access by role', () => {
    let auth: jasmine.SpyObj<AuthService>;
    const run = (guard: CanActivateFn, roles?: Role[]) =>
        TestBed.runInInjectionContext(() => firstValueFrom(guard({ data: { roles } } as unknown as ActivatedRouteSnapshot, { url: '/home/users' } as RouterStateSnapshot) as Observable<boolean | UrlTree>));
    beforeEach(() => {
        auth = jasmine.createSpyObj<AuthService>('AuthService', ['validateSession', 'homeUrl']);
        auth.homeUrl.and.returnValue('/home/account');
        TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: AuthService, useValue: auth }] });
    });
    it('keeps the requested page when redirecting to login', async () => {
        auth.validateSession.and.returnValue(of(null));
        expect(TestBed.inject(Router).serializeUrl((await run(authGuard)) as UrlTree)).toBe('/auth/login?returnUrl=%2Fhome%2Fusers');
    });
    for (const role of ['citizen', 'agent', 'manager', 'admin'] as Role[]) {
        it(`allows the personal space for ${role}`, async () => {
            auth.validateSession.and.returnValue(of({ ...user, role }));
            expect(await run(authGuard)).toBeTrue();
        });
        for (const [name, roles] of [
            ['users', ['admin']],
            ['agents', ['manager', 'admin']],
            ['dashboard', ['manager', 'admin']],
            ['requests', ['admin']]
        ] as [string, Role[]][]) {
            it(`checks ${name} access for ${role}`, async () => {
                auth.validateSession.and.returnValue(of({ ...user, role }));
                const result = await run(authGuard, roles);
                if (roles.includes(role)) expect(result).toBeTrue();
                else expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/home/account');
            });
        }
    }
    for (const role of ['citizen', 'agent', 'manager', 'admin'] as Role[]) {
        it(`inherits Terra Nova access restrictions for ${role}`, async () => {
            auth.validateSession.and.returnValue(of({ ...user, role }));
            const route = { data: {}, parent: { data: { roles: ['agent', 'manager', 'admin'] }, parent: null } } as unknown as ActivatedRouteSnapshot;
            const result = await TestBed.runInInjectionContext(() => firstValueFrom(authGuard(route, { url: '/home/terra-nova/demandes' } as RouterStateSnapshot) as Observable<boolean | UrlTree>));
            if (role === 'citizen') expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/home/account');
            else expect(result).toBeTrue();
        });
    }
    it('redirects an authenticated visitor away from login', async () => {
        auth.validateSession.and.returnValue(of(user));
        expect(TestBed.inject(Router).serializeUrl((await run(guestGuard)) as UrlTree)).toBe('/home/account');
    });
});
