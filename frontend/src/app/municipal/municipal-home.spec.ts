import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, Subject } from 'rxjs';
import { LiveDataService } from '../shared/live-data.service';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalHome } from './municipal-home';
import { MunicipalService } from './municipal-content.model';

describe('MunicipalHome cards', () => {
    let fixture: ComponentFixture<MunicipalHome>;
    let api: jasmine.SpyObj<MunicipalContentService>;
    const service = { id: 'roads', name: 'Voirie', category: 'Travaux', description: 'Routes', contact_details: 'Mairie', opening_hours: '8h-16h', icon: 'pi-building', display_order: 1, is_featured: true, usage_count: 2 };
    beforeEach(async () => {
        api = jasmine.createSpyObj('MunicipalContentService', ['services', 'featuredServices', 'publications', 'startService']);
        api.services.and.returnValue(of([service]));
        api.featuredServices.and.returnValue(of([service]));
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
