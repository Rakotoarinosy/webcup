import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@/environments/environment';
import { AuthService } from '../auth.service';
import { AccountService } from './account.service';

describe('AccountService request sources', () => {
    let role: string;
    let api: AccountService;
    let http: HttpTestingController;
    beforeEach(() => {
        role = 'citizen';
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(), { provide: AuthService, useValue: { hasRole: (...roles: string[]) => roles.includes(role) } }] });
        api = TestBed.inject(AccountService);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => http.verify());
    it('uses the same server-owned history as Mes demandes for citizens', () => {
        const result = jasmine.createSpy('result');
        api.list(2).subscribe(result);
        const request = http.expectOne((req) => req.url === `${environment.apiUrl}/requests`);
        expect(request.request.params.get('mine')).toBe('true');
        expect(request.request.params.get('page')).toBe('2');
        expect(request.request.params.get('sort_order')).toBe('desc');
        request.flush({ items: [{ id: 'r1', location: 'Rue Centrale', status: 'Nouveau' }], page: 2, total: 11, total_pages: 2 });
        expect(result).toHaveBeenCalledWith(jasmine.objectContaining({ pages: 2, items: [jasmine.objectContaining({ address: 'Rue Centrale' })] }));
    });
    it('keeps assigned interventions on the existing agent API', () => {
        role = 'agent';
        api.list().subscribe();
        const request = http.expectOne((req) => req.url === `${environment.apiUrl}/demandes`);
        expect(request.request.params.get('page_size')).toBe('10');
        request.flush({ items: [], total: 0, page: 1, pages: 0 });
    });
    it('uses global requests for municipal administrators', () => {
        role = 'admin';
        api.list().subscribe();
        const request = http.expectOne((req) => req.url === `${environment.apiUrl}/requests`);
        expect(request.request.params.has('mine')).toBeFalse();
        request.flush({ items: [], total: 0, page: 1, total_pages: 0 });
    });
});
