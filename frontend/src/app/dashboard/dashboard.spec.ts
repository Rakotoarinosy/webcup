import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { DashboardStats } from '../requests/request.model';
import { CitizenRequestService } from '../requests/request.service';
import { LiveDataService } from '../shared/live-data.service';
import { Dashboard } from './dashboard';

describe('Dashboard data consistency', () => {
    let component: Dashboard;
    let requests: jasmine.SpyObj<CitizenRequestService>;
    const stats = {
        total: 15,
        open: 10,
        in_progress: 3,
        resolved: 5,
        rejected: 0,
        resolution_rate: 33.3,
        interventions_today: 2,
        resolved_today: 2,
        pending_count: 4,
        by_status: { Nouveau: 4, 'En cours': 3, 'En attente': 3, Résolu: 5, Rejeté: 0 },
        by_category: {},
        by_priority: {},
        daily: []
    } as unknown as DashboardStats;

    beforeEach(() => {
        requests = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['dashboard', 'map']);
        requests.dashboard.and.returnValue(of(stats));
        requests.map.and.returnValue(of([]));
        TestBed.configureTestingModule({
            providers: [
                { provide: CitizenRequestService, useValue: requests },
                { provide: LiveDataService, useValue: { watch: () => {} } }
            ]
        });
        component = TestBed.runInInjectionContext(() => new Dashboard());
    });

    it('preserves server counters if a later refresh fails', () => {
        component.load();
        expect(component.dashboardStats().openRequests).toBe(7);
        requests.dashboard.and.returnValue(throwError(() => new Error('offline')));
        component.load();
        expect(component.hasData()).toBeTrue();
        expect(component.dashboardStats().openRequests).toBe(7);
        expect(component.error()).toBeTruthy();
        expect(component.loading()).toBeFalse();
    });

    it('distinguishes an initial failure from a real empty dashboard', () => {
        requests.dashboard.and.returnValue(throwError(() => new Error('offline')));
        component.load();
        expect(component.hasData()).toBeFalse();
        requests.dashboard.and.returnValue(of({ ...stats, total: 0 }));
        component.load();
        expect(component.hasData()).toBeTrue();
        expect(component.error()).toBeNull();
    });
});
