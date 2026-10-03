import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@/environments/environment';
import { LayoutService } from '@/app/layout/service/layout.service';
import { PreferencesService, UserPreferences } from './preferences.service';

const PREFERENCES: UserPreferences = {
    theme: 'dark',
    font_size: 'large',
    font_family: 'manrope'
};

describe('PreferencesService', () => {
    let service: PreferencesService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(PreferencesService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        http.verify();
        delete document.documentElement.dataset['fontSize'];
        delete document.documentElement.dataset['fontFamily'];
    });

    it('applies a preview immediately without any HTTP request', () => {
        service.apply(PREFERENCES);

        expect(TestBed.inject(LayoutService).themeMode()).toBe('dark');
        expect(document.documentElement.dataset['fontSize']).toBe('large');
        expect(document.documentElement.dataset['fontFamily']).toBe('manrope');
    });

    it('persists preferences only through save', () => {
        service.save(PREFERENCES).subscribe();

        const request = http.expectOne(`${environment.apiUrl}/preferences/me`);
        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(PREFERENCES);
        request.flush(PREFERENCES);
    });
});
