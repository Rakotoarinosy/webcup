import { ComponentFixture, TestBed } from '@angular/core/testing';

// Le composant attend 250 ms (anti-rebond de la recherche) avant d'appeler l'API.
const settle = () => new Promise((resolve) => setTimeout(resolve, 300));
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { TransportLine, formatPassage } from './transport.model';
import { TransportPage } from './transport-page';
import { TransportService } from './transport.service';

const now = new Date();
const inMinutes = (minutes: number) => new Date(now.getTime() + minutes * 60000).toISOString();

const line = (overrides: Partial<TransportLine>): TransportLine => ({
    id: 'l1',
    code: 'D1',
    name: 'Hôtel de ville ↔ Gare',
    mode: 'bus',
    first_departure: '05:30',
    last_departure: '21:00',
    frequency_minutes: 15,
    days_label: 'Tous les jours',
    status: 'normal',
    status_message: null,
    status_updated_at: null,
    computed_at: now.toISOString(),
    stops: [{ id: 's1', name: 'Hôtel de ville', position: 0, minutes_from_start: 0, latitude: null, longitude: null, next_passages: [inMinutes(4), inMinutes(19)], matches_search: false }],
    ...overrides
});

describe('formatPassage', () => {
    it('gives the delay first, then the time', () => {
        expect(formatPassage(inMinutes(4), now)).toMatch(/^dans 4 min \(\d\d:\d\d\)$/);
        expect(formatPassage(now.toISOString(), now)).toMatch(/^maintenant/);
    });
});

describe('TransportPage (F36)', () => {
    let fixture: ComponentFixture<TransportPage>;
    let api: jasmine.SpyObj<TransportService>;
    let roles: string[];

    beforeEach(async () => {
        roles = [];
        api = jasmine.createSpyObj<TransportService>('TransportService', ['lines', 'updateStatus']);
        api.lines.and.returnValue(
            of([
                line({ id: 'l2', code: 'D2', name: 'Hôpital ↔ Est', mode: 'minibus', status: 'disrupted', status_message: 'Arrêt Lycée non desservi.' }),
                line({})
            ])
        );
        await TestBed.configureTestingModule({
            imports: [TransportPage],
            providers: [
                provideRouter([]),
                { provide: TransportService, useValue: api },
                { provide: LiveDataService, useValue: { watch: () => {} } },
                { provide: AuthService, useValue: { hasRole: (...wanted: string[]) => wanted.some((role) => roles.includes(role)) } }
            ]
        }).compileComponents();
    });

    it('shows disruptions first and the next passage at each stop', async () => {
        fixture = TestBed.createComponent(TransportPage);
        fixture.detectChanges();
        await settle();
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        const cards = host.querySelectorAll('article.line');
        expect(cards.length).toBe(2);
        expect(cards[0].textContent).toContain('Trafic perturbé');
        expect(cards[0].textContent).toContain('Arrêt Lycée non desservi.');
        expect(cards[1].textContent).toContain('Trafic normal');
        expect(cards[1].textContent).toMatch(/Prochain : dans 4 min/);
        expect(host.textContent).toContain('démonstration');
        expect(host.querySelector('button[aria-controls]')).not.toBeNull(); // infobulle « ? »
        expect(host.textContent).not.toContain('Modifier l’état');
        fixture.destroy();
    });

    it('searches by line or stop through the API', async () => {
        fixture = TestBed.createComponent(TransportPage);
        fixture.detectChanges();
        await settle();
        fixture.componentInstance.onSearch('lycee');
        await settle();
        expect(api.lines).toHaveBeenCalledWith('lycee');
        fixture.destroy();
    });

    it('lets a manager interrupt a line with a message', async () => {
        roles = ['manager'];
        api.updateStatus.and.returnValue(of(line({ status: 'interrupted', status_message: 'Grève' })));
        fixture = TestBed.createComponent(TransportPage);
        fixture.detectChanges();
        await settle();
        const component = fixture.componentInstance;
        const target = component.lines()[1];
        component.edit(target);
        component.statusForm = { status: 'interrupted', message: '' };
        component.save(target);
        expect(api.updateStatus).not.toHaveBeenCalled();
        component.statusForm.message = 'Grève';
        component.save(target);
        expect(api.updateStatus).toHaveBeenCalledWith('l1', 'interrupted', 'Grève');
        expect(component.manageNotice()).toContain('Ligne interrompue');
        fixture.destroy();
    });
});
