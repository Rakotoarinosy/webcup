import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AgentService } from '@/app/agents/agent.service';
import { AuthService } from '@/app/auth/auth.service';
import { InstitutService } from '@/app/instituts/institut.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { UserService } from '@/app/users/user.service';
import { CitizenRequest } from './request.model';
import { CitizenRequestService } from './request.service';
import { Requests } from './requests';

describe('Requests (gestionnaires)', () => {
    let fixture: ComponentFixture<Requests>;
    let api: jasmine.SpyObj<CitizenRequestService>;
    const base: CitizenRequest = {
        id: 'r1-aaaaaaaa',
        title: 'Nid de poule énorme',
        description: 'Trou',
        category: 'Voirie',
        priority: 'Normale',
        status: 'Nouveau',
        citizen_id: 'c1',
        institut_id: 'i1',
        assigned_agent_id: null,
        location: 'Rue A',
        latitude: null,
        longitude: null,
        urgency: 3,
        affected_citizens: 1,
        priority_score: 40,
        created_at: '2026-10-03T10:00:00Z',
        updated_at: '2026-10-03T10:00:00Z',
        scheduled_at: null,
        resolved_at: null,
        support_count: 2,
        duplicate_of_id: null,
        conversation_state: 'awaiting_staff',
        last_message_at: '2026-10-03T11:00:00Z',
        similar_count: 1
    };
    const other: CitizenRequest = { ...base, id: 'r2-bbbbbbbb', title: 'Énorme nid de poule', similar_count: 1, conversation_state: 'none', support_count: 0 };

    beforeEach(async () => {
        api = jasmine.createSpyObj<CitizenRequestService>('CitizenRequestService', ['list', 'events', 'group', 'markDuplicate', 'messages', 'postMessage']);
        api.list.and.returnValue(of({ items: [base, other], total: 2, page: 1, page_size: 10, total_pages: 1 }));
        api.events.and.returnValue(of([]));
        api.messages.and.returnValue(of([]));
        api.group.and.returnValue(of({ principal: null, duplicates: [], similar: [{ request: other, score: 80, shared_keywords: ['enorme', 'nid', 'poule'], distance_km: null, same_place: true }] }));
        api.markDuplicate.and.returnValue(of({ ...other, duplicate_of_id: base.id, status: 'Rejeté' }));
        await TestBed.configureTestingModule({
            imports: [Requests],
            providers: [
                { provide: CitizenRequestService, useValue: api },
                { provide: UserService, useValue: { list: () => of([]) } },
                { provide: AgentService, useValue: { list: () => of([]) } },
                { provide: InstitutService, useValue: { list: () => of([]) } },
                { provide: LiveDataService, useValue: { watch: () => undefined } },
                { provide: AuthService, useValue: { hasRole: () => false, user: () => ({ role: 'manager' }) } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(Requests);
        fixture.detectChanges();
        fixture.componentInstance.loadRequests();
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('shows reply-awaited, similar and support indicators as text', () => {
        const text = fixture.nativeElement.textContent as string;
        expect(text).toContain('Réponse attendue');
        expect(text).toContain('1 similaire(s)');
        expect(text).toContain('2 soutien(s)');
    });

    it('sends the duplicate and awaiting-reply filters', () => {
        fixture.componentInstance.similarOnly = true;
        fixture.componentInstance.awaitingOnly = true;
        fixture.componentInstance.applyFilters();
        expect(api.list.calls.mostRecent().args[0]).toEqual(jasmine.objectContaining({ has_similar: true, awaiting_reply: true }));
    });

    it('shows the grouped view and the message thread in the details', async () => {
        fixture.componentInstance.openDetails(base);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        const text = document.body.textContent as string;
        expect(api.group).toHaveBeenCalledWith(base.id);
        expect(text).toContain('1 demande(s) similaire(s) ouverte(s)');
        expect(text).toContain('mots communs : enorme, nid, poule');
        expect(document.body.querySelector('app-request-thread ol[role="log"]')).not.toBeNull();
        expect(text).toContain('Réponses rapides');
    });
});
