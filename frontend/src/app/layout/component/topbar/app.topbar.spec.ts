import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '@/app/auth/auth.service';
import { I18nService } from '@/app/i18n/i18n.service';
import { AppTopbar } from './app.topbar';

describe('Topbar search', () => {
    let fixture: ComponentFixture<AppTopbar>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
        await TestBed.configureTestingModule({
            imports: [AppTopbar],
            providers: [
                { provide: Router, useValue: router },
                { provide: AuthService, useValue: { user: signal({ name: 'Citoyen', role: 'citizen' }), roleLabel: signal('Citoyen'), hasRole: (...roles: string[]) => roles.includes('citizen') } },
                { provide: I18nService, useValue: { t: (key: string) => key } }
            ]
        }).overrideComponent(AppTopbar, { set: { imports: [], template: '' } }).compileComponents();
        fixture = TestBed.createComponent(AppTopbar);
        fixture.detectChanges();
    });

    it('finds accented pages from an unaccented query', () => {
        fixture.componentInstance.updateSearch('DONNEES');
        expect(fixture.componentInstance.searchSuggestions().map((item) => item.url)).toEqual(['/home/my-data']);
    });

    it('excludes pages outside the current role', () => {
        fixture.componentInstance.updateSearch('utilisateurs');
        expect(fixture.componentInstance.searchSuggestions()).toEqual([]);
    });

    it('navigates to the selected suggestion using the keyboard', () => {
        const topbar = fixture.componentInstance;
        topbar.updateSearch('services');
        topbar.onSearchKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        const selection = topbar.searchSuggestions()[0];
        topbar.onSearchKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(router.navigateByUrl).toHaveBeenCalledWith(selection.url);
        expect(topbar.searchOpen()).toBeFalse();
    });
});
