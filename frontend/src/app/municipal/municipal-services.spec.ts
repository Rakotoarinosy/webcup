import { STATUS_DEFAULTS } from './municipal-service.fixture';
import { LiveDataService } from '../shared/live-data.service';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalServices } from './municipal-services';
import { ServicesMap } from './services-map';

// La vraie carte (Leaflet, tuiles OpenStreetMap) n'a pas sa place dans un test unitaire.
@Component({ selector: 'app-services-map', template: '' })
class ServicesMapStub {
    readonly services = input<unknown[]>([]);
    readonly position = input<unknown>(null);
    focus(): void {}
}

describe('MunicipalServices', () => {
    let fixture: ComponentFixture<MunicipalServices>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MunicipalServices],
            providers: [
                provideRouter([]),
                { provide: LiveDataService, useValue: { watch: () => {} } },
                {
                    provide: MunicipalContentService,
                    useValue: {
                        services: () =>
                            of([
                                { id: 'roads', name: 'Voirie', category: 'Mobilité', description: 'Routes et circulation', contact_details: '', opening_hours: '', icon: 'pi-directions', display_order: 1, is_featured: false, usage_count: 0, address: 'Rue Rainitovo', latitude: -18.912, longitude: 47.529, ...STATUS_DEFAULTS },
                                { id: 'health', name: 'Centre de santé', category: 'Santé', description: 'Soins et prévention', contact_details: '', opening_hours: '', icon: 'pi-heart', display_order: 20, is_featured: true, usage_count: 5, address: null, latitude: null, longitude: null, ...STATUS_DEFAULTS }
                            ]),
                        startService: jasmine.createSpy('startService').and.returnValue(of({})),
                        updateFeaturedService: jasmine.createSpy('updateFeaturedService'),
                        updateServiceStatus: jasmine.createSpy('updateServiceStatus')
                    }
                },
                { provide: AuthService, useValue: { hasRole: () => false } }
            ]
        })
            .overrideComponent(MunicipalServices, { remove: { imports: [ServicesMap] }, add: { imports: [ServicesMapStub] } })
            .compileComponents();
        fixture = TestBed.createComponent(MunicipalServices);
        fixture.detectChanges();
    });

    it('prioritizes Santé and filters by service name/category text', () => {
        const component = fixture.componentInstance;

        expect(component.visibleServices()[0].id).toBe('health');
        component.search.set('route');
        expect(component.visibleServices().map((service) => service.id)).toEqual(['roads']);
        component.search.set('sante');
        expect(component.visibleServices().map((service) => service.id)).toEqual(['health']);
    });
    it('opens contact with the chosen service from the full-card action', async () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('.service-card .card-action');
        // Le nom accessible commence par le texte visible, puis précise le service (WCAG 2.5.3).
        expect(button.textContent?.replace(/\s+/g, ' ').trim()).toBe('Contacter ce service : Centre de santé');
        button.click();
        await fixture.whenStable();
        expect(TestBed.inject(MunicipalContentService).startService).toHaveBeenCalledOnceWith('health');
        expect(router.navigate).toHaveBeenCalledWith(['/municipal/contact'], { queryParams: { service: 'health' } });
    });

    it('gives directions and sorts by distance once the resident shares their position', () => {
        const roads = fixture.nativeElement.querySelectorAll('.service-card')[1] as HTMLElement;
        const directions = roads.querySelector('a.card-action') as HTMLAnchorElement;
        expect(directions.href).toContain('destination=-18.912,47.529');
        expect(directions.textContent).toContain('(nouvel onglet)');

        spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success: PositionCallback) =>
            success({ coords: { latitude: -18.913, longitude: 47.529 } } as GeolocationPosition)
        );
        fixture.componentInstance.locateMe();
        fixture.detectChanges();

        const component = fixture.componentInstance;
        expect(component.visibleServices().map((service) => service.id)).toEqual(['roads', 'health']);
        expect(component.distance(component.visibleServices()[0])).toMatch(/^\d+ m$/);
        expect(fixture.nativeElement.textContent).toContain('Services classés du plus proche au plus éloigné de vous.');
    });

    it('shows the state on each card, hides interrupted services on demand and never starts them (F38/F63/F64)', () => {
        const component = fixture.componentInstance;
        component.services.update((items) => items.map((item) => (item.id === 'roads' ? { ...item, status: 'maintenance' as const, status_message: 'Travaux' } : item)));
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        const roads = host.querySelectorAll('.service-card')[1] as HTMLElement;
        expect(roads.textContent).toContain('En maintenance');
        expect(roads.textContent).toContain('Écrire quand même');
        expect(roads.textContent).not.toContain('Contacter ce service');
        expect(host.querySelector('.interruption-summary')?.textContent).toContain('1 service(s) actuellement interrompu(s)');

        (host.querySelector('#available-only') as HTMLInputElement).click();
        fixture.detectChanges();
        expect(component.visibleServices().map((service) => service.id)).toEqual(['health']);
    });

    it('lets a manager take a service out of order with an explanation, then restore it in one click', () => {
        const component = fixture.componentInstance;
        const api = TestBed.inject(MunicipalContentService) as unknown as { updateServiceStatus: jasmine.Spy };
        const [health] = component.services().filter((service) => service.id === 'health');
        api.updateServiceStatus.and.callFake((_id: string, payload: { status: string; message?: string }) => of({ ...health, status: payload.status, status_message: payload.message ?? null }));

        component.editStatus(health, 'out_of_service');
        component.saveStatus(health);
        expect(api.updateServiceStatus).not.toHaveBeenCalled();
        expect(component.statusError()).toContain('Expliquez');

        component.statusForm.message = 'Panne informatique';
        component.statusForm.alternative = 'Appelez le standard.';
        component.saveStatus(health);
        expect(api.updateServiceStatus).toHaveBeenCalledWith('health', jasmine.objectContaining({ status: 'out_of_service', message: 'Panne informatique', alternative: 'Appelez le standard.' }));
        expect(component.statusNotice()).toContain('Hors service');

        component.restore(component.services().find((service) => service.id === 'health')!);
        expect(api.updateServiceStatus).toHaveBeenCalledWith('health', { status: 'available' });
    });
});
