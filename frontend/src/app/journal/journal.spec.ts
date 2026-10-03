import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from '@/app/auth/auth.service';
import { AuditEntry, auditDetails, dayBounds, toCsv } from './journal.model';
import { JournalService } from './journal.service';
import { Journal } from './journal';

describe('Journal', () => {
    let fixture: ComponentFixture<Journal>;
    let api: jasmine.SpyObj<JournalService>;
    const empty = { items: [], total: 0, page: 1, page_size: 20, total_pages: 0 };
    const entry: AuditEntry = {
        id: 'a1',
        action: 'account_role_changed',
        occurred_at: '2026-10-03T08:00:00Z',
        target_type: 'account',
        target_id: 'u1',
        target_label: 'Rina (rina@test.mg)',
        actor_id: 'admin',
        actor_name: 'Admin',
        actor_role: 'admin',
        institut_id: null,
        details: { role: { from: 'citizen', to: 'manager' } }
    };

    async function create(roles: string[]): Promise<void> {
        api = jasmine.createSpyObj<JournalService>('JournalService', ['activity', 'audit']);
        api.activity.and.returnValue(of(empty));
        api.audit.and.returnValue(of({ ...empty, items: [entry], total: 1, total_pages: 1 }));
        await TestBed.configureTestingModule({
            imports: [Journal],
            providers: [
                { provide: JournalService, useValue: api },
                { provide: AuthService, useValue: { hasRole: (...wanted: string[]) => wanted.some((role) => roles.includes(role)) } }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(Journal);
        fixture.detectChanges();
    }

    it('shows only the request journal to an agent', async () => {
        await create(['agent']);
        expect(api.activity).toHaveBeenCalled();
        expect(fixture.nativeElement.textContent).not.toContain('Administration');
    });

    it('lets an admin read who changed what in administration', async () => {
        await create(['admin']);
        const buttons = Array.from(fixture.nativeElement.querySelectorAll('[role="group"] button')) as HTMLButtonElement[];
        buttons[1].click();
        fixture.detectChanges();

        expect(api.audit).toHaveBeenCalled();
        const row = fixture.nativeElement.querySelector('tbody tr') as HTMLElement;
        expect(row.textContent).toContain('Rôle modifié');
        expect(row.textContent).toContain('rôle : citizen → manager');
        expect(row.querySelector('time')?.getAttribute('datetime')).toBe('2026-10-03T08:00:00Z');
    });

    it('formats details, local day bounds and CSV safely', () => {
        expect(auditDetails(entry)).toBe('rôle : citizen → manager');
        const bounds = dayBounds({ since: '2026-10-01', until: '2026-10-01' });
        expect(new Date(bounds.until!).getTime() - new Date(bounds.since!).getTime()).toBe(24 * 3600 * 1000);
        expect(toCsv(['a'], [['dit "oui"; ok']])).toBe('﻿"a"\r\n"dit ""oui""; ok"');
    });
});
