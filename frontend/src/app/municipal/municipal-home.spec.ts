import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

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
        usage_count
    });

    async function createComponent(popular: MunicipalService[]): Promise<void> {
        content = jasmine.createSpyObj<MunicipalContentService>('MunicipalContentService', ['popularServices', 'publications', 'startService']);
        content.popularServices.and.returnValue(of(popular));
        content.publications.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [MunicipalHome],
            providers: [provideRouter([]), { provide: MunicipalContentService, useValue: content }]
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
