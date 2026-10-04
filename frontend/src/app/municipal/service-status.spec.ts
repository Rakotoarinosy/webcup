import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { makeService } from './municipal-service.fixture';
import { ServiceStatusBadge } from './service-status';

describe('ServiceStatusBadge (F38/F64)', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [ServiceStatusBadge], providers: [provideRouter([])] }).compileComponents());

    it('shows the state with text and icon, then why, when and what to do instead', () => {
        const fixture = TestBed.createComponent(ServiceStatusBadge);
        const annexe = makeService({ id: 'annexe', name: 'Mairie annexe' });
        fixture.componentRef.setInput(
            'service',
            makeService({
                id: 'civil',
                name: 'État civil',
                status: 'maintenance',
                status_message: 'Mise à jour du logiciel.',
                status_expected_back_at: '2026-10-05T08:00:00Z',
                status_alternative: 'Actes urgents à la mairie annexe.',
                alternative_service_id: 'annexe',
                status_updated_at: '2026-10-04T08:00:00Z'
            })
        );
        fixture.componentRef.setInput('services', [annexe]);
        fixture.componentRef.setInput('detailed', true);
        fixture.detectChanges();
        const text = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, ' ') ?? '';

        expect(text).toContain('État du service : En maintenance');
        expect((fixture.nativeElement as HTMLElement).querySelector('.status-badge i.pi-wrench')).not.toBeNull();
        expect(text).toContain('Mise à jour du logiciel.');
        expect(text).toContain('Retour prévu');
        expect(text).toContain('Que faire à la place : Actes urgents à la mairie annexe.');
        const link = (fixture.nativeElement as HTMLElement).querySelector('a.alt-link') as HTMLAnchorElement;
        expect(link.getAttribute('href')).toBe('/municipal/contact?service=annexe');
    });

    it('stays short for an available service', () => {
        const fixture = TestBed.createComponent(ServiceStatusBadge);
        fixture.componentRef.setInput('service', makeService({ id: 'ok', name: 'Eau' }));
        fixture.componentRef.setInput('detailed', true);
        fixture.detectChanges();
        expect((fixture.nativeElement as HTMLElement).textContent).toContain('Disponible');
        expect((fixture.nativeElement as HTMLElement).querySelector('.status-details')).toBeNull();
    });
});
