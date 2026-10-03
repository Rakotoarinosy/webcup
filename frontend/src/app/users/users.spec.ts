import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AgentService } from '../agents/agent.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';
import { UserService } from './user.service';
import { Users } from './users';

const citizen: User = { id: 'citizen-id', name: 'Sophie', email: 'sophie@test.mg', role: 'citizen', is_active: true, agent_id: null, created_at: '' };

describe('User account administration', () => {
    let component: Users;
    let service: jasmine.SpyObj<UserService>;
    let auth: jasmine.SpyObj<AuthService>;
    beforeEach(() => {
        service = jasmine.createSpyObj<UserService>('UserService', ['list', 'create', 'update', 'delete']);
        service.list.and.returnValue(of([citizen]));
        service.create.and.returnValue(of(citizen));
        service.update.and.returnValue(of(citizen));
        auth = jasmine.createSpyObj<AuthService>('AuthService', ['logout', 'me'], { user: signal(null) });
        auth.me.and.returnValue(of(citizen));
        const agents = jasmine.createSpyObj<AgentService>('AgentService', ['list']);
        agents.list.and.returnValue(of([]));
        TestBed.configureTestingModule({
            imports: [Users],
            providers: [
                { provide: UserService, useValue: service },
                { provide: AuthService, useValue: auth },
                { provide: AgentService, useValue: agents }
            ]
        });
        TestBed.overrideComponent(Users, { set: { template: '' } });
        component = TestBed.createComponent(Users).componentInstance;
    });

    it('requires a strong password for creation and submits a usable account', () => {
        component.openNew();
        component.form.patchValue({ name: 'Sophie', email: 'sophie@test.mg' });
        component.save();
        expect(service.create).not.toHaveBeenCalled();
        component.form.controls.password.setValue('short');
        component.save();
        expect(service.create).not.toHaveBeenCalled();
        component.form.patchValue({ name: '  Sophie  ', email: 'SOPHIE@test.mg', password: 'Motdepasse123', role: 'manager' });
        component.save();
        expect(service.create).toHaveBeenCalledWith({ name: 'Sophie', email: 'sophie@test.mg', password: 'Motdepasse123', role: 'manager', agent_id: null });
        expect(component.form.controls.password.value).toBe('');
    });

    it('changes only the name without resetting password or revoking sessions', () => {
        component.openEdit(citizen);
        component.form.controls.name.setValue('Sophie Nguyen');
        component.save();
        expect(service.update).toHaveBeenCalledWith(citizen.id, { name: 'Sophie Nguyen' });
    });

    it('updates role, password, active state and agent link together', () => {
        component.openEdit(citizen);
        component.form.patchValue({ role: 'agent', agent_id: 'agent-id', password: 'NouveauPasse123', is_active: false });
        component.save();
        expect(service.update).toHaveBeenCalledWith(citizen.id, { role: 'agent', agent_id: 'agent-id', password: 'NouveauPasse123', is_active: false });
    });

    it('detaches the agent record when changing to a non-agent role', () => {
        const agent: User = { ...citizen, role: 'agent', agent_id: 'agent-id' };
        component.openEdit(agent);
        component.form.controls.role.setValue('citizen');
        component.save();
        expect(service.update).toHaveBeenCalledWith(agent.id, { role: 'citizen', agent_id: null });
    });

    it('does not submit an unchanged account', () => {
        component.openEdit(citizen);
        component.save();
        expect(service.update).not.toHaveBeenCalled();
    });

    it('keeps the form open after an API error', () => {
        service.update.and.returnValue(throwError(() => new Error('Conflict')));
        component.openEdit(citizen);
        component.form.controls.name.setValue('New name');
        component.save();
        expect(component.dialogVisible()).toBeTrue();
        expect(component.saving()).toBeFalse();
    });

    it('logs out after a sensitive change to the current account', () => {
        auth.user.set(citizen);
        component.openEdit(citizen);
        component.form.controls.email.setValue('new@test.mg');
        component.save();
        expect(auth.logout).toHaveBeenCalled();
    });

    it('reloads the current profile after a name change', () => {
        auth.user.set(citizen);
        component.openEdit(citizen);
        component.form.controls.name.setValue('Sophie Nguyen');
        component.save();
        expect(auth.me).toHaveBeenCalled();
        expect(auth.logout).not.toHaveBeenCalled();
    });

    it('rejects blank names and leaves edit passwords optional', () => {
        component.openEdit(citizen);
        expect(component.form.controls.password.valid).toBeTrue();
        component.form.controls.name.setValue('   ');
        component.save();
        expect(service.update).not.toHaveBeenCalled();
    });
});
