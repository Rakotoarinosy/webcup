import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';

import { AgentService } from '@/app/agents/agent.service';
import { Agent } from '@/app/agents/agent.model';
import { AuthService } from '@/app/auth/auth.service';
import { REQUEST_CATEGORIES, RequestCategory } from '@/app/requests/request.model';
import { apiErrorMessage } from '@/app/users/user.service';
import { CreateInstitutServiceIn, InstitutDashboard, InstitutService } from './institut.model';
import { InstitutService as InstitutApi } from './institut.service';

const EMPTY_SERVICE: CreateInstitutServiceIn = {
    name: '', category: '', description: '', contact_details: '', opening_hours: '', icon: 'pi-building',
    request_category: null, responsible_agent_id: null, agent_ids: []
};

@Component({
    selector: 'app-institut-dashboard',
    imports: [FormsModule, ButtonModule, DialogModule, InputTextModule, MultiSelectModule, SelectModule, TagModule, TextareaModule, ToastModule],
    templateUrl: './institut-dashboard.html',
    providers: [MessageService]
})
export class InstitutDashboardPage implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly api = inject(InstitutApi);
    private readonly agentsApi = inject(AgentService);
    private readonly auth = inject(AuthService);
    private readonly messages = inject(MessageService);

    readonly dashboard = signal<InstitutDashboard | null>(null);
    readonly serviceDetail = signal<InstitutService | null>(null);
    readonly agents = signal<Agent[]>([]);
    readonly loading = signal(true);
    readonly saving = signal(false);
    readonly serviceId = signal<string | null>(null);
    readonly isServicePage = computed(() => !!this.serviceId());
    readonly citizenView = computed(() => this.auth.hasRole('citizen'));
    readonly agentOptions = computed(() => this.agents().filter((agent) => agent.is_active).map((agent) => ({ label: agent.name, value: agent.id })));
    readonly categories = REQUEST_CATEGORIES.map((category) => ({ label: category, value: category }));

    addDialog = false;
    assignDialog = false;
    selectedService: InstitutService | null = null;
    form: CreateInstitutServiceIn = { ...EMPTY_SERVICE, agent_ids: [] };
    assignedAgentIds: string[] = [];

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.serviceId.set(params.get('serviceId'));
            this.load();
        });
    }

    load(): void {
        const institutId = this.institutId();
        if (!institutId) return;
        this.loading.set(true);
        if (this.citizenView()) {
            this.api.citizenDashboard(institutId)
                .pipe(finalize(() => this.loading.set(false)))
                .subscribe({
                    next: (dashboard) => {
                        // La structure interne reste commune, mais ces valeurs ne sont
                        // jamais reçues de l'API citoyenne et ne sont pas affichées.
                        const view: InstitutDashboard = {
                            ...dashboard,
                            manager_name: null,
                            associated_agents: 0,
                            services: dashboard.services.map((service) => ({
                                ...service,
                                responsible_agent_id: null,
                                responsible_agent_name: null,
                                associated_agents: 0
                            }))
                        };
                        this.dashboard.set(view);
                        const serviceId = this.serviceId();
                        this.serviceDetail.set(serviceId ? view.services.find((service) => service.id === serviceId) ?? null : null);
                    },
                    error: (error: unknown) => this.error(error)
                });
            return;
        }
        forkJoin({ dashboard: this.api.dashboard(institutId), agents: this.agentsApi.list({ institut_id: institutId, is_active: true }) })
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: ({ dashboard, agents }) => {
                    this.dashboard.set(dashboard);
                    this.agents.set(agents);
                    const serviceId = this.serviceId();
                    this.serviceDetail.set(serviceId ? dashboard.services.find((service) => service.id === serviceId) ?? null : null);
                },
                error: (error: unknown) => this.error(error)
            });
    }

    openAdd(): void {
        if (this.citizenView()) {
            const category = this.serviceDetail()?.request_category ?? null;
            void this.router.navigate(['/home/my-requests'], {
                queryParams: { new: 1, ...(category ? { category } : {}) }
            });
            return;
        }
        this.form = { ...EMPTY_SERVICE, agent_ids: [] };
        this.addDialog = true;
    }

    saveService(): void {
        if (!this.form.name.trim() || !this.form.category.trim() || !this.form.description.trim() || !this.form.contact_details.trim() || !this.form.opening_hours.trim()) {
            this.messages.add({ severity: 'warn', summary: 'Informations manquantes', detail: 'Complétez les informations du service.' });
            return;
        }
        this.saving.set(true);
        this.api.createService(this.institutId(), { ...this.form, agent_ids: [...new Set(this.form.agent_ids)] })
            .pipe(finalize(() => this.saving.set(false)))
            .subscribe({ next: () => { this.addDialog = false; this.success('Service ajouté'); this.load(); }, error: (error: unknown) => this.error(error) });
    }

    openAssignment(service: InstitutService): void {
        this.selectedService = service;
        this.assignedAgentIds = service.responsible_agent_id ? [service.responsible_agent_id] : [];
        this.assignDialog = true;
    }

    saveAssignment(): void {
        if (!this.selectedService) return;
        this.saving.set(true);
        this.api.setServiceAgents(this.institutId(), this.selectedService.id, this.assignedAgentIds)
            .pipe(finalize(() => this.saving.set(false)))
            .subscribe({ next: () => { this.assignDialog = false; this.success('Équipe associée au service'); this.load(); }, error: (error: unknown) => this.error(error) });
    }

    changeResponsible(service: InstitutService, agentId: string | null): void {
        this.api.setServiceResponsible(this.institutId(), service.id, agentId)
            .subscribe({ next: () => { this.success('Responsable du service mis à jour'); this.load(); }, error: (error: unknown) => this.error(error) });
    }

    openService(service: InstitutService): void {
        void this.router.navigate(['/home/instituts', this.institutId(), 'services', service.id]);
    }

    back(): void { void this.router.navigate(['/home/instituts']); }

    private institutId(): string { return this.route.snapshot.paramMap.get('id') ?? ''; }
    private success(detail: string): void { this.messages.add({ severity: 'success', summary: 'Enregistré', detail, life: 3000 }); }
    private error(error: unknown): void { this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 }); }
}
