import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Subject, of } from 'rxjs';

import { LiveDataService } from '../shared/live-data.service';
import { MunicipalService } from './municipal-content.model';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalHome } from './municipal-home';

describe('MunicipalHome', () => {
    let fixture: ComponentFixture<MunicipalHome>;
    let content: jasmine.SpyObj<MunicipalContentService>;

    const service = (id: string, name: string, usage_count: number): MunicipalService => ({
        id,
        name,
        category: 'Administration',
        description: 'Description',
        contact_details: 'Mairie',
        opening_hours: '8h-16h',
        icon: 'pi-building',
        display_order: 0,
        is_featured: false,
        usage_count,
        address: null,
        latitude: null,
        longitude: null
    });

    async function createComponent(popular: MunicipalService[]): Promise<void> {
        content = jasmine.createSpyObj<MunicipalContentService>('MunicipalContentService', ['popularServices', 'publications', 'startService']);
        content.popularServices.and.returnValue(of(popular));
        content.publications.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [MunicipalHome],
            providers: [provideRouter([]), { provide: MunicipalContentService, useValue: content }, { provide: LiveDataService, useValue: { watch: () => {} } }]
        }).compileComponents();

        fixture = TestBed.createComponent(MunicipalHome);
        fixture.detectChanges();
    }

    it('requests six server-ranked services and renders them in the received order', async () => {
        const ranked = [
            service('one', 'Service 1', 30),
            service('two', 'Service 2', 20),
            service('three', 'Service 3', 10),
            service('four', 'Service 4', 8),
            service('five', 'Service 5', 4),
            service('six', 'Service 6', 2),
            service('seven', 'Service 7', 1)
        ];
        await createComponent(ranked);

        expect(content.popularServices).toHaveBeenCalledOnceWith(6);
        expect(fixture.componentInstance.popularServices().map((item) => item.id)).toEqual(['one', 'two', 'three', 'four', 'five', 'six']);
        const host = fixture.nativeElement as HTMLElement;
        const rendered = Array.from(host.querySelectorAll<HTMLButtonElement>('.cards button')).map((button) => button.textContent);
        expect(rendered.length).toBe(6);
        expect(rendered[0]).toContain('Service 1');
        expect(rendered[5]).toContain('Service 6');
    });

    it('shows an explicit empty state when no service has usage yet', async () => {
        await createComponent([]);

        expect(fixture.nativeElement.textContent).toContain('Les services les plus utilisés seront affichés dès que des démarches auront été ouvertes.');
        expect(fixture.nativeElement.querySelectorAll('.cards button').length).toBe(0);
    });
});

describe('MunicipalHome cards', () => {
    let fixture: ComponentFixture<MunicipalHome>;
    let api: jasmine.SpyObj<MunicipalContentService>;
    const service = { id: 'roads', name: 'Voirie', category: 'Travaux', description: 'Routes', contact_details: 'Mairie', opening_hours: '8h-16h', icon: 'pi-building', display_order: 1, is_featured: true, usage_count: 2, address: null, latitude: null, longitude: null };
    beforeEach(async () => {
        api = jasmine.createSpyObj('MunicipalContentService', ['popularServices', 'publications', 'startService']);
        api.popularServices.and.returnValue(of([service]));
        api.publications.and.returnValue(of([{ id: 'p1', title: 'Travaux', summary: 'Annonce', content: 'Contenu', category: 'Voirie', published_at: '2026-10-03T10:00:00Z' }]));
        await TestBed.configureTestingModule({ imports: [MunicipalHome], providers: [provideRouter([]), { provide: MunicipalContentService, useValue: api }, { provide: LiveDataService, useValue: { watch: () => {} } }] }).compileComponents();
        fixture = TestBed.createComponent(MunicipalHome);
        fixture.detectChanges();
    });
    it('opens contact from a full service card and blocks repeated opening', async () => {
        const pending = new Subject<MunicipalService>();
        api.startService.and.returnValue(pending);
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        const card: HTMLButtonElement = fixture.nativeElement.querySelector('button.card-link');
        card.click();
        fixture.detectChanges();
        expect(card.disabled).toBeTrue();
        fixture.componentInstance.startService(service);
        expect(api.startService).toHaveBeenCalledTimes(1);
        pending.next(service);
        pending.complete();
        await fixture.whenStable();
        expect(router.navigate).toHaveBeenCalledWith(['/municipal/contact'], { queryParams: { service: 'roads' } });
    });
    it('links the full publication card to the selected publication', () => {
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a.card-link');
        expect(link.getAttribute('href')).toBe('/municipal/publications?publication=p1');
    });
});
