import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { MunicipalContentService } from '../../municipal/municipal-content.service';
import { LiveDataService } from '../../shared/live-data.service';
import { Landing } from './landing';

describe('Landing real municipal data', () => {
    let fixture: ComponentFixture<Landing>;
    let dashboard: jasmine.SpyObj<DashboardService>;
    const summary = { open_requests: 7, in_progress_requests: 3, resolved_requests: 5, today_interventions: 2, category_distribution: [], requests_last_7_days: [] };
    beforeEach(async () => {
        dashboard = jasmine.createSpyObj('DashboardService', ['summary']);
        dashboard.summary.and.returnValue(of(summary));
        await TestBed.configureTestingModule({
            imports: [Landing],
            providers: [
                provideRouter([]),
                { provide: AuthService, useValue: { user: () => null, isAuthenticated: () => false, homeUrl: () => '/home/account' } },
                { provide: DashboardService, useValue: dashboard },
                { provide: LiveDataService, useValue: { watch: () => {} } },
                {
                    provide: MunicipalContentService,
                    useValue: { services: () => of([]), publications: () => of([{ id: 'p1', title: 'Information réelle de la mairie', summary: 'Annonce', content: 'Contenu', category: 'Information', published_at: '2026-10-03T10:00:00Z' }]) }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(Landing);
        fixture.detectChanges();
    });
    it('renders API counters and a full-card link to a real publication', () => {
        expect(fixture.nativeElement.querySelector('[data-testid="public-open-count"]').textContent.trim()).toBe('7');
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a[aria-label="Lire la publication : Information réelle de la mairie"]');
        expect(link.getAttribute('href')).toBe('/municipal/publications?publication=p1');
    });
    it('updates counters after refresh and retains the last valid values on failure', () => {
        dashboard.summary.and.returnValue(of({ ...summary, open_requests: 9 }));
        fixture.componentInstance.load();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[data-testid="public-open-count"]').textContent.trim()).toBe('9');
        dashboard.summary.and.returnValue(throwError(() => new Error('offline')));
        fixture.componentInstance.load();
        fixture.detectChanges();
        expect(fixture.componentInstance.error()).toBeTruthy();
        expect(fixture.nativeElement.querySelector('[data-testid="public-open-count"]').textContent.trim()).toBe('9');
    });
});
