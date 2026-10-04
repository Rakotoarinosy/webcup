import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MunicipalPublicationIn, MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';

describe('MunicipalContentService', () => {
    let service: MunicipalContentService;
    let http: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MunicipalContentService, provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(MunicipalContentService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => http.verify());

    it('requests a maximum of six popular services and preserves the server rank', () => {
        let result: MunicipalService[] = [];
        service.popularServices(100).subscribe((items) => (result = items));

        const request = http.expectOne((req) => req.url.endsWith('/municipal/services/popular'));
        expect(request.request.method).toBe('GET');
        expect(request.request.params.get('limit')).toBe('6');

        const ranked = [
            { id: 'most-used', usage_count: 30 },
            { id: 'next-used', usage_count: 12 }
        ] as MunicipalService[];
        request.flush(ranked);

        expect(result.map((item) => item.id)).toEqual(['most-used', 'next-used']);
    });

    it('uses the protected publication management endpoints for CRUD operations', () => {
        const payload: MunicipalPublicationIn = {
            title: 'Information pratique',
            summary: 'Une information utile.',
            content: 'Le contenu détaillé de la publication.',
            category: 'Vie municipale',
            published_at: '2026-10-03T10:00:00.000Z',
            is_published: false,
            image_url: null
        };

        service.managedPublications().subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/manage') && req.method === 'GET').flush([]);

        service.createPublication(payload).subscribe();
        const create = http.expectOne((req) => req.url.endsWith('/municipal/publications') && req.method === 'POST');
        expect(create.request.body).toEqual(payload);
        create.flush({ id: 'publication-1', ...payload });

        service.updatePublication('publication-1', { is_published: true }).subscribe();
        const update = http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1') && req.method === 'PATCH');
        expect(update.request.body).toEqual({ is_published: true });
        update.flush({ id: 'publication-1', ...payload, is_published: true });

        service.deletePublication('publication-1').subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1') && req.method === 'DELETE').flush(null);

        service.viewPublication('publication-1').subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1/view') && req.method === 'POST').flush({ id: 'publication-1', ...payload, view_count: 1, like_count: 0 });

        service.likePublication('publication-1').subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1/like') && req.method === 'POST').flush({ like_count: 1, liked: true });

        service.publicationComments('publication-1').subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1/comments') && req.method === 'GET').flush([]);
        service.addPublicationComment('publication-1', 'Merci').subscribe();
        http.expectOne((req) => req.url.endsWith('/municipal/publications/publication-1/comments') && req.method === 'POST').flush({ id: 'comment-1', publication_id: 'publication-1', author_name: 'Athan', content: 'Merci', created_at: '2026-10-04T00:00:00Z' });
    });
});
