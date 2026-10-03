import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { Agent } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { InstitutService } from '@/app/instituts/institut.service';
import { Accounts } from './accounts';
import { User } from './user.model';
import { UserService } from './user.service';

const MANAGER: User = { id: 'm1', name: 'Hery', email: 'hery@test.mg', role: 'manager', is_active: true, created_at: '2026-01-01T00:00:00Z' };
const AGENT: User = { id: 'u-a1', name: 'Jean', email: 'jean@test.mg', role: 'agent', is_active: true, created_at: '2026-01-01T00:00:00Z' };
const VOIRIE = { id: 'voirie', name: 'Voirie', description: '', categories: ['Voirie' as const], manager_id: 'm1', is_active: true, created_at: '' };
const EAU = { id: 'eau', name: 'Eau', description: '', categories: ['Eau' as const], manager_id: null, is_active: true, created_at: '' };

describe('Accounts (admin user management)', () => {
    let fixture: ComponentFixture<Accounts>;
    let component: Accounts;
    let users: jasmine.SpyObj<UserService>;
    let instituts: jasmine.SpyObj<InstitutService>;
    let agents: jasmine.SpyObj<AgentService>;
    let routeData: BehaviorSubject<Data>;

    beforeEach(() => {
        users = jasmine.createSpyObj<UserService>('UserService', ['listAccounts', 'updateAccount', 'createAccount']);
        users.listAccounts.and.returnValue(of([MANAGER, AGENT]));
        users.updateAccount.and.callFake((_id, payload) => of({ ...MANAGER, ...payload } as User));
        users.createAccount.and.returnValue(of({ ...AGENT, id: 'new-agent' }));
        instituts = jasmine.createSpyObj<InstitutService>('InstitutService', ['list', 'setManager']);
        instituts.list.and.returnValue(of([VOIRIE, EAU]));
        instituts.setManager.and.returnValue(of(EAU));
        agents = jasmine.createSpyObj<AgentService>('AgentService', ['list', 'create', 'move', 'activate']);
        agents.list.and.returnValue(of([]));
        agents.create.and.returnValue(of({ id: 'a-new' } as Agent));
        routeData = new BehaviorSubject<Data>({ role: 'manager' });
        TestBed.configureTestingModule({
            imports: [Accounts],
            providers: [
                { provide: ActivatedRoute, useValue: { data: routeData } },
                { provide: UserService, useValue: users },
                { provide: InstitutService, useValue: instituts },
                { provide: AgentService, useValue: agents }
            ]
        });
        fixture = TestBed.createComponent(Accounts);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('lists only the role of the current route and follows route changes', () => {
        expect(users.listAccounts).toHaveBeenCalledWith('manager', '');
        expect(component.page().title).toBe('Managers');
        expect(component.showAttachment()).toBeTrue();

        routeData.next({ role: 'citizen' });
        expect(users.listAccounts).toHaveBeenCalledWith('citizen', '');
        expect(component.page().title).toBe('Citoyens');
        expect(component.showAttachment()).toBeFalse();

        component.openNew();
        expect(component.form.role).toBe('citizen');
    });

    it('shows what each account is attached to', () => {
        expect(component.attachment(MANAGER)).toBe('Voirie');
        expect(component.attachment(AGENT)).toBe('Sans profil agent');
    });

    it('moves a manager to another institut: releases the old one first', () => {
        component.openEdit(MANAGER);
        expect(component.form.institut_id).toBe('voirie');
        component.form.institut_id = 'eau';
        component.save({ invalid: false } as never);

        expect(users.updateAccount).toHaveBeenCalledWith('m1', {});
        expect(instituts.setManager.calls.allArgs()).toEqual([
            ['voirie', null],
            ['eau', 'm1']
        ]);
    });

    it('creates an agent account then its profile in the chosen institut', () => {
        component.openNew();
        component.form = { name: 'Zo', email: 'zo@test.mg', role: 'agent', password: 'Motdepasse123', institut_id: 'eau' };
        component.save({ invalid: false } as never);

        expect(users.createAccount).toHaveBeenCalledWith({ name: 'Zo', email: 'zo@test.mg', password: 'Motdepasse123', role: 'agent' });
        expect(agents.create).toHaveBeenCalledWith({ user_id: 'new-agent', institut_id: 'eau', status: 'available' });
    });

    it('offers a manager only instituts without a responsible', () => {
        component.openNew();
        component.form.role = 'manager';
        expect(component.institutOptions().map((option) => option.value)).toEqual(['eau']);
    });
});
