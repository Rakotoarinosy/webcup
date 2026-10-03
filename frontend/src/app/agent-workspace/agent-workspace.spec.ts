import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { JournalService } from '@/app/journal/journal.service';
import { CitizenRequestService } from '@/app/requests/request.service';
import { AgentWorkspace } from './agent-workspace';

describe('AgentWorkspace pending counter', () => {
    let fixture: ComponentFixture<AgentWorkspace>;
    let byStatus: Record<string, number>;

    beforeEach(async () => {
        byStatus = { Nouveau: 0, 'En cours': 2, 'En attente': 1, Résolu: 0, Rejeté: 0 };
        await TestBed.configureTestingModule({
            imports: [AgentWorkspace],
            providers: [
                provideRouter([]),
                {
                    provide: JournalService,
                    useValue: {
                        activity: () =>
                            of({
                                items: [
                                    {
                                        event: { id: 'e1', request_id: 'r1', type: 'assigned', actor_id: 'm1', actor_name: 'Hery', payload: { agent_name: 'Jean' }, created_at: '2026-10-03T08:00:00Z' },
                                        request_title: 'Lampadaire cassé',
                                        request_status: 'En cours'
                                    }
                                ],
                                total: 1,
                                page: 1,
                                page_size: 5,
                                total_pages: 1
                            })
                    }
                },
                {
                    provide: CitizenRequestService,
                    useValue: {
                        list: () => of({ items: [], total: 0, page: 1, page_size: 20, total_pages: 1 }),
                        dashboard: () => of({ total: 3, by_status: byStatus }),
                        changeStatus: () => of({}),
                        events: () => of([])
                    }
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AgentWorkspace);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('counts in-progress and waiting requests as to be handled', () => {
        expect(fixture.nativeElement.textContent).toContain('Demandes à traiter');
        expect(fixture.nativeElement.textContent).toContain('3');
    });

    it('uses a neutral message when nothing is waiting', async () => {
        byStatus = { Nouveau: 0, 'En cours': 0, 'En attente': 0, Résolu: 0, Rejeté: 0 };
        const refreshButton = [...fixture.nativeElement.querySelectorAll('button')].find((button) => button.textContent.includes('Actualiser')) as HTMLButtonElement;
        refreshButton.click();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Aucune demande ne nécessite une prise en charge.');
    });

    it('shows the latest actions on the agent requests with author and date', () => {
        fixture.detectChanges();
        const entries = Array.from(fixture.nativeElement.querySelectorAll('.activity-list li')) as HTMLElement[];
        expect(entries.length).toBe(1);
        expect(entries[0].textContent).toContain('Prise en charge par Jean');
        expect(entries[0].textContent).toContain('Lampadaire cassé');
        expect(entries[0].textContent).toContain('par Hery');
        expect(entries[0].querySelector('time')?.getAttribute('datetime')).toBe('2026-10-03T08:00:00Z');
        expect(fixture.nativeElement.querySelector('a[href="/home/journal"]')).not.toBeNull();
    });
});
