import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AgentService } from '../agents/agent.service';
import { CitizenRequestService } from '../requests/request.service';
import { LiveDataService } from '../shared/live-data.service';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard';

describe('Dashboard data consistency', () => {
    let component: Dashboard;
    let dashboard: jasmine.SpyObj<DashboardService>;
    let agents: jasmine.SpyObj<AgentService>;
    const summary = { open_requests: 7, in_progress_requests: 3, resolved_requests: 5, today_interventions: 2, category_distribution: [], requests_last_7_days: [] };
    beforeEach(() => {
        dashboard = jasmine.createSpyObj('DashboardService', ['summary']);
        dashboard.summary.and.returnValue(of(summary));
        agents = jasmine.createSpyObj('AgentService', ['list']);
        agents.list.and.returnValue(of([]));
        TestBed.configureTestingModule({
            providers: [
                { provide: DashboardService, useValue: dashboard },
                { provide: AgentService, useValue: agents },
                { provide: CitizenRequestService, useValue: { list: () => of({ items: [], total: 0, page: 1, total_pages: 0, page_size: 100 }) } },
                { provide: LiveDataService, useValue: { watch: () => {} } }
            ]
        });
        component = TestBed.runInInjectionContext(() => new Dashboard());
    });
    it('preserves server counters if a later refresh fails', () => {
        component.load();
        expect(component.dashboardStats().openRequests).toBe(7);
        dashboard.summary.and.returnValue(throwError(() => new Error('offline')));
        component.load();
        expect(component.hasData()).toBeTrue();
        expect(component.dashboardStats().openRequests).toBe(7);
        expect(component.error()).toBeTruthy();
        expect(component.loading()).toBeFalse();
    });
    it('distinguishes an initial failure from a real empty dashboard', () => {
        dashboard.summary.and.returnValue(throwError(() => new Error('offline')));
        component.load();
        expect(component.hasData()).toBeFalse();
        dashboard.summary.and.returnValue(of({ ...summary, open_requests: 0 }));
        component.load();
        expect(component.hasData()).toBeTrue();
        expect(component.error()).toBeNull();
    });
    it('reports an unavailable agent directory while keeping the summary', () => {
        agents.list.and.returnValue(throwError(() => new Error('forbidden')));
        component.load();
        expect(component.hasData()).toBeTrue();
        expect(component.agentWarning()).toBeTrue();
    });
});
