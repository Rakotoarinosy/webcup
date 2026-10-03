import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { LiveDataService } from '../shared/live-data.service';
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
                {
                    provide: MunicipalContentService,
                    useValue: {
                        publications: () =>
                            of([
                                { id: 'p1', title: 'Travaux', summary: 'Routes', content: 'Informations complètes sur les travaux.', category: 'Voirie', published_at: '2026-10-01T10:00:00Z' },
                                { id: 'p2', title: 'Conseil municipal', summary: 'Réunion', content: 'Ordre du jour du conseil.', category: 'Vie municipale', published_at: '2026-10-02T10:00:00Z' }
                            ])
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(MunicipalPublications);
        fixture.detectChanges();
    });
    it('opens the requested publication and toggles the whole summary button', () => {
        expect(fixture.nativeElement.querySelector('#publication-p2').hidden).toBeFalse();
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('.publication-summary');
        button.click();
        fixture.detectChanges();
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(fixture.nativeElement.querySelector('#publication-p1').hidden).toBeFalse();
        button.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#publication-p1').hidden).toBeTrue();
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
