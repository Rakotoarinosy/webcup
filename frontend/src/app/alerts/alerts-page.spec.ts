import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LiveDataService } from '@/app/shared/live-data.service';
import { CityAlert } from './alert.model';
import { AlertService } from './alert.service';
import { AlertsPage } from './alerts-page';

const alert = (id: string, status: CityAlert['status'], title: string): CityAlert => ({
    id,
    title,
    message: 'Message officiel',
    instructions: 'Restez chez vous.',
    level: 'Information',
    audience: 'Tous les habitants',
    zone: null,
    issuer: 'Haut Conseil de la Ville',
    starts_at: '2026-10-01T08:00:00Z',
    ends_at: null,
    ended_at: status === 'Terminée' ? '2026-10-02T08:00:00Z' : null,
    status,
    created_at: '2026-10-01T08:00:00Z',
    updated_at: '2026-10-01T08:00:00Z'
});

describe('AlertsPage', () => {
    it('lists current alerts and recently ended ones separately', async () => {
        await TestBed.configureTestingModule({
            imports: [AlertsPage],
            providers: [
                { provide: AlertService, useValue: { history: () => of([alert('1', 'En cours', 'Message du Haut Conseil'), alert('2', 'Terminée', 'Coupure d’eau')]) } },
                { provide: LiveDataService, useValue: { watch: () => undefined } }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(AlertsPage);
        fixture.detectChanges();

        const lists = fixture.nativeElement.querySelectorAll('ul') as NodeListOf<HTMLElement>;
        expect(lists[0].getAttribute('aria-labelledby')).toBe('alerts-current-title');
        expect(lists[0].textContent).toContain('Message du Haut Conseil');
        expect(lists[1].textContent).toContain('Coupure d’eau');
        expect(lists[1].textContent).toContain('Terminée le');
        expect(fixture.nativeElement.textContent).toContain('Que faire ?');
    });
});
