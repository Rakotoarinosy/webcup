import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MunicipalContentService } from '../../municipal/municipal-content.service';
import { LiveDataService } from '../../shared/live-data.service';
import { TopbarWidget } from './components/topbarwidget/topbarwidget.component';
import { Landing } from './landing';
import { AlertBanner } from '../../alerts/alert-banner';

describe('Landing real municipal data', () => {
    let fixture: ComponentFixture<Landing>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Landing],
            providers: [
                provideRouter([]),
                { provide: AuthService, useValue: { user: () => null, isAuthenticated: () => false, homeUrl: () => '/home/account' } },
                { provide: LiveDataService, useValue: { watch: () => {} } },
                {
                    provide: MunicipalContentService,
                    useValue: { services: () => of([]), publications: () => of([{ id: 'p1', title: 'Information réelle de la mairie', summary: 'Annonce', content: 'Contenu', category: 'Information', published_at: '2026-10-03T10:00:00Z' }]) }
                }
            ]
        })
            // La barre du haut (configurateur d'affichage) fait recharger la page de test : hors sujet ici.
            .overrideComponent(Landing, { remove: { imports: [TopbarWidget, AlertBanner] }, add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] } })
            .compileComponents();
        fixture = TestBed.createComponent(Landing);
        fixture.detectChanges();
    });
    it('renders municipal information and a full-card link to a real publication', () => {
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[aria-label="Lire la publication : Information réelle de la mairie"]');
        expect(link.getAttribute('href')).toBe('/municipal/publications?publication=p1');
    });
    it('retains the last municipal information if a refresh fails', () => {
        const content = TestBed.inject(MunicipalContentService) as unknown as { services: jasmine.Spy; publications: jasmine.Spy };
        content.services = jasmine.createSpy().and.returnValue(throwError(() => new Error('offline')));
        fixture.componentInstance.load();
        fixture.detectChanges();
        expect(fixture.componentInstance.error()).toBeTruthy();
        expect(fixture.nativeElement.textContent).toContain('Information réelle de la mairie');
    });
});
