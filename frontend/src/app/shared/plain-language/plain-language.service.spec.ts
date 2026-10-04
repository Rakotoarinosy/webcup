import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@/environments/environment';
import { PlainLanguageService, toPlainText } from './plain-language.service';

describe('PlainLanguageService', () => {
    let service: PlainLanguageService;
    let http: HttpTestingController;
    const url = `${environment.apiUrl}/assistant/simplify`;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
        service = TestBed.inject(PlainLanguageService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('asks the API only once for the same passage', () => {
        const passage = 'Le dossier doit être déposé auprès du CCAS.';
        service.explain(passage).subscribe();
        http.expectOne(url).flush({ summary: 'Simple.', key_points: [], terms: [] });

        let summary = '';
        service.explain(passage).subscribe((value) => (summary = value.summary));
        http.expectNone(url);
        expect(summary).toBe('Simple.');
    });

    it('asks again after a failure', () => {
        const passage = 'Le dossier doit être déposé auprès du CCAS.';
        service.explain(passage).subscribe({ error: () => undefined });
        http.expectOne(url).flush(null, { status: 502, statusText: 'Bad Gateway' });

        service.explain(passage).subscribe();
        expect(http.expectOne(url).request.body).toEqual({ text: passage });
    });

    it('reduces HTML content to its text', () => {
        expect(toPlainText('<p>Un  <strong>texte</strong></p>\n<ul><li>clair</li></ul>')).toBe('Un texte clair');
    });
});
