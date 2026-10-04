import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { LiveDataService } from '../shared/live-data.service';
import { AuthService } from '../auth/auth.service';
import { MunicipalContentService } from './municipal-content.service';
import { MunicipalPublications } from './municipal-publications';

describe('MunicipalPublications', () => {
    let fixture: ComponentFixture<MunicipalPublications>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MunicipalPublications],
            providers: [
                { provide: ActivatedRoute, useValue: { queryParamMap: of(convertToParamMap({ publication: 'p2' })) } },
                { provide: LiveDataService, useValue: { watch: () => {} } },
                { provide: AuthService, useValue: { hasRole: () => false } },
                {
                    provide: MunicipalContentService,
                    useValue: {
                        publications: () =>
                            of([
                                { id: 'p1', title: 'Travaux', summary: 'Routes', content: 'Informations complètes sur les travaux.', category: 'Voirie', published_at: '2026-10-01T10:00:00Z' },
                                { id: 'p2', title: 'Conseil municipal', summary: 'Réunion', content: 'Ordre du jour du conseil.', category: 'Vie municipale', published_at: '2026-10-02T10:00:00Z' }
                            ]),
                        viewPublication: () => of({ id: 'p1', title: 'Travaux', summary: 'Routes', content: 'Informations complètes sur les travaux.', category: 'Voirie', published_at: '2026-10-01T10:00:00Z', image_url: null, view_count: 1, like_count: 0 })
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(MunicipalPublications);
        fixture.detectChanges();
    });
    it('opens the selected publication in its reading view', () => {
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('.publication-summary');
        button.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.selectedPublication()?.id).toBe('p1');
        expect(fixture.nativeElement.textContent).toContain('Informations complètes sur les travaux.');
    });
    it('keeps all categories available when a category is selected', () => {
        const component = fixture.componentInstance;
        component.selectCategory('Voirie');
        fixture.detectChanges();
        expect(component.visiblePublications().map((item) => item.id)).toEqual(['p1']);
        expect(component.categories().map((item) => item.value)).toEqual(['Voirie', 'Vie municipale']);
        component.selectCategory('Vie municipale');
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Conseil municipal');
        expect(fixture.nativeElement.textContent).not.toContain('Informations complètes sur les travaux.');
    });
});
