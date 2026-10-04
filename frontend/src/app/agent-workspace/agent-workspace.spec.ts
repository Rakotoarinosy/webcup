import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { JournalService } from '@/app/journal/journal.service';
import { CitizenRequestService } from '@/app/requests/request.service';
import { AgentWorkspace } from './agent-workspace';

describe('AgentWorkspace', () => {
    let fixture: ComponentFixture<AgentWorkspace>;
    let byStatus: Record<string, number>;
    let lastQuery: { awaiting_reply?: boolean } = {};
    const awaitingItem = {
        id: 'r1',
        title: 'Lampadaire cassé',
        description: 'Rue sombre',
        category: 'Éclairage public',
        priority: 'Normale',
        status: 'En cours',
        location: 'Rue A',
        scheduled_at: null,
        support_count: 3,
        similar_count: 1,
        conversation_state: 'awaiting_staff'
    };

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
                        list: (query: { awaiting_reply?: boolean }) => {
                            lastQuery = query;
                            return of({ items: [awaitingItem], total: 1, page: 1, page_size: 20, total_pages: 1 });
                        },
                        get: () => of(awaitingItem),
                        messages: () => of([]),
                        postMessage: () => of({}),
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

    // Les compteurs « Demandes à traiter » sont affichés dans « Mon espace » (account) pour les agents.
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

    it('flags requests awaiting a reply, filters them and opens the thread with quick replies', () => {
        fixture.detectChanges();
        const element = fixture.nativeElement as HTMLElement;
        expect(element.querySelector('.awaiting-badge')?.textContent).toContain('Réponse attendue');
        expect(element.textContent).toContain('3 soutien(s)');

        const filter = Array.from(element.querySelectorAll('button[aria-pressed]'))[0] as HTMLButtonElement;
        filter.click();
        fixture.detectChanges();
        expect(lastQuery.awaiting_reply).toBeTrue();

        const open = Array.from(element.querySelectorAll('button')).find((b) => b.textContent?.includes('Répondre au citoyen')) as HTMLButtonElement;
        open.click();
        fixture.detectChanges();
        expect(element.querySelector('app-request-thread')).not.toBeNull();
        expect(element.textContent).toContain('Réponses rapides');
    });
});
