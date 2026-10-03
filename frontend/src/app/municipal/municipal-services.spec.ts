import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalServices } from './municipal-services';

describe('MunicipalServices', () => {
    let fixture: ComponentFixture<MunicipalServices>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MunicipalServices],
            providers: [
                provideRouter([]),
                {
                    provide: MunicipalContentService,
                    useValue: {
                        services: () =>
                            of([
                                { id: 'roads', name: 'Voirie', category: 'Mobilité', description: 'Routes et circulation', contact_details: '', opening_hours: '', icon: 'pi-directions', display_order: 1, is_featured: false, usage_count: 0 },
                                { id: 'health', name: 'Centre de santé', category: 'Santé', description: 'Soins et prévention', contact_details: '', opening_hours: '', icon: 'pi-heart', display_order: 20, is_featured: true, usage_count: 5 }
                            ]),
                        updateFeaturedService: jasmine.createSpy('updateFeaturedService')
                    }
                },
                { provide: AuthService, useValue: { hasRole: () => false } }
            ]
        }).compileComponents();
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
});
