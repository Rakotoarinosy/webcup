import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LiveDataService } from '../shared/live-data.service';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalHealth, phoneHref } from './municipal-health';
import { makeService } from './municipal-service.fixture';
import { ServicesMap } from './services-map';

@Component({ selector: 'app-services-map', template: '' })
class ServicesMapStub {
    readonly services = input<unknown[]>([]);
    readonly position = input<unknown>(null);
    readonly label = input('');
    focus(): void {}
}

describe('phoneHref', () => {
    it('extracts a callable number from free contact text', () => {
        expect(phoneHref('Standard : 020 00 000 10 (numéro fictif)')).toBe('tel:0200000010');
        expect(phoneHref('Hôtel de ville — guichet 1')).toBeNull();
    });
});

describe('MunicipalHealth (F46)', () => {
    let fixture: ComponentFixture<MunicipalHealth>;

    beforeEach(async () => {
        const services = [
            makeService({ id: 'civil', name: 'État civil' }),
            makeService({ id: 'clinic', name: 'Centre de santé (démo)', category: 'Santé et urgences', contact_details: '020 00 000 13', latitude: -18.9, longitude: 47.54, address: 'Rue Est' }),
            makeService({ id: 'hospital', name: 'Hôpital (démo)', category: 'Santé et urgences', open_24_7: true, emergency_care: true, contact_details: 'Standard : 020 00 000 10', latitude: -18.915, longitude: 47.531, address: 'Avenue' })
        ];
        await TestBed.configureTestingModule({
            imports: [MunicipalHealth],
            providers: [provideRouter([]), { provide: MunicipalContentService, useValue: { services: () => of(services) } }, { provide: LiveDataService, useValue: { watch: () => {} } }]
        })
            .overrideComponent(MunicipalHealth, { remove: { imports: [ServicesMap] }, add: { imports: [ServicesMapStub] } })
            .compileComponents();
        fixture = TestBed.createComponent(MunicipalHealth);
        fixture.detectChanges();
    });

    it('offers direct calls to emergency numbers and lists 24/7 emergency care first', () => {
        const host = fixture.nativeElement as HTMLElement;
        const calls = Array.from(host.querySelectorAll<HTMLAnchorElement>('a.call')).map((link) => link.getAttribute('href'));
        expect(calls).toEqual(['tel:117', 'tel:118']);
        expect(fixture.componentInstance.healthServices().map((service) => service.id)).toEqual(['hospital', 'clinic']);
        const first = host.querySelector('article.place') as HTMLElement;
        expect(first.textContent).toContain('Ouvert 24h/24');
        expect(first.textContent).toContain('Accueille les urgences');
        expect(first.querySelector('a[href="tel:0200000010"]')).not.toBeNull();
        expect(first.querySelector('a[href*="destination=-18.915,47.531"]')).not.toBeNull();
    });

    it('finds the nearest emergency care from the resident position', () => {
        spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success: PositionCallback) => success({ coords: { latitude: -18.9, longitude: 47.54 } } as GeolocationPosition));
        fixture.componentInstance.locateMe();
        fixture.detectChanges();
        expect(fixture.componentInstance.nearestEmergency()?.id).toBe('hospital');
        expect(fixture.componentInstance.healthServices()[0].id).toBe('clinic');
        expect((fixture.nativeElement as HTMLElement).querySelector('[role="status"]')?.textContent).toContain('Urgences les plus proches : Hôpital (démo)');
    });
});
