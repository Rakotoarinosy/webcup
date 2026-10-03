import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { catchError, forkJoin, of } from 'rxjs';

import { Agent, AGENT_STATUS_LABELS, AGENT_STATUSES, AgentStatus } from '@/app/agents/agent.model';
import { AgentService } from '@/app/agents/agent.service';
import { toCategories, toStatCards, toTrend } from '@/app/dashboard/dashboard.model';
import { CategoryChart } from '@/app/dashboard/widget/category-chart/category-chart';
import { Stats } from '@/app/dashboard/widget/stats/stats';
import { TrendChart } from '@/app/dashboard/widget/trend-chart/trend-chart';
import { Institut } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { CitizenRequest, DashboardStats, requestPrioritySeverity, requestStatusSeverity } from '@/app/requests/request.model';
import { CitizenRequestService } from '@/app/requests/request.service';
import { LiveDataService } from '@/app/shared/live-data.service';
import { apiErrorMessage } from '@/app/users/user.service';
import { AuthService } from '../auth.service';

interface Shortcut {
    label: string;
    icon: string;
    link: string;
}

const RECENT_COUNT = 5;

/**
 * « Mon espace » : même langage visuel que le tableau de bord, mais centré sur l'utilisateur.
 * Les chiffres viennent de GET /dashboard, que le serveur limite au périmètre du rôle :
 * ses demandes (citoyen), ses interventions (agent), son institut (manager), tout (admin).
 */
@Component({
    selector: 'app-account',
    imports: [DatePipe, FormsModule, RouterLink, ButtonModule, SelectModule, TagModule, ToastModule, Stats, TrendChart, CategoryChart],
    templateUrl: './account.html',
    providers: [MessageService]
})
export class Account implements OnInit {
    readonly auth = inject(AuthService);
    private readonly requests = inject(CitizenRequestService);
    private readonly agents = inject(AgentService);
    private readonly instituts = inject(InstitutService);
    private readonly messages = inject(MessageService);
    private readonly live = inject(LiveDataService);
    private readonly destroyRef = inject(DestroyRef);

    readonly stats = signal<DashboardStats | null>(null);
    readonly recent = signal<CitizenRequest[]>([]);
    readonly agent = signal<Agent | null>(null);
    readonly institut = signal<Institut | null>(null);
    readonly loading = signal(false);
    readonly error = signal<string | null>(null);
    readonly savingStatus = signal(false);

    readonly cards = computed(() => toStatCards(this.stats()));
    readonly trend = computed(() => toTrend(this.stats()));
    readonly categories = computed(() => toCategories(this.stats()));
    readonly statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
    readonly statusSeverity = requestStatusSeverity;
    readonly prioritySeverity = requestPrioritySeverity;

    /** Agent sans profil actif, ou manager sans institut actif : rien à afficher, on l'explique. */
    readonly unattached = computed(() => {
        const user = this.auth.user();
        if (!user) return false;
        if (user.role === 'agent') return !user.agent_id;
        if (user.role === 'manager') return !user.institut_id;
        return false;
    });

    readonly scopeLabel = computed(() => {
        const name = this.institut()?.name ?? this.agent()?.institut_name;
        switch (this.auth.user()?.role) {
            case 'citizen':
                return 'Vos demandes';
            case 'agent':
                return name ? `Vos interventions · ${name}` : 'Vos interventions';
            case 'manager':
                return name ? `Institut ${name}` : 'Votre institut';
            default:
                return 'Toute la plateforme';
        }
    });

    readonly shortcuts = computed<Shortcut[]>(() => {
        switch (this.auth.user()?.role) {
            case 'citizen':
                return [
                    { label: 'Nouvelle demande', icon: 'pi pi-plus', link: '/home/my-requests' },
                    { label: 'Services municipaux', icon: 'pi pi-map-marker', link: '/home/municipal/services' }
                ];
            case 'agent':
                return [{ label: 'Mes interventions', icon: 'pi pi-inbox', link: '/home/agent' }];
            case 'manager':
                return [
                    { label: 'Demandes de l\'institut', icon: 'pi pi-inbox', link: '/home/requests' },
                    { label: 'Mes agents', icon: 'pi pi-id-card', link: '/home/agents' },
                    { label: 'Tableau de bord', icon: 'pi pi-chart-bar', link: '/home/dashboard' }
                ];
            case 'admin':
                return [
                    { label: 'Instituts', icon: 'pi pi-building', link: '/home/instituts' },
                    { label: 'Demandes', icon: 'pi pi-inbox', link: '/home/requests' },
                    { label: 'Tableau de bord', icon: 'pi pi-chart-bar', link: '/home/dashboard' }
                ];
            default:
                return [];
        }
    });

    ngOnInit(): void {
        this.live.watch(this.destroyRef, () => this.load(), () => !this.loading() && !this.savingStatus());
        this.load();
    }

    load(): void {
        if (this.unattached()) return;
        const user = this.auth.user();

        this.loading.set(true);
        this.error.set(null);
        forkJoin({
            stats: this.requests.dashboard(),
            recent: this.requests.list({ page: 1, page_size: RECENT_COUNT, sort_by: 'created_at', sort_order: 'desc' }),
            agent: user?.agent_id ? this.agents.me().pipe(catchError(() => of(null))) : of(null),
            institut: user?.role === 'manager' && user.institut_id ? this.instituts.get(user.institut_id).pipe(catchError(() => of(null))) : of(null)
        }).subscribe({
            next: ({ stats, recent, agent, institut }) => {
                this.stats.set(stats);
                this.recent.set(recent.items);
                this.agent.set(agent);
                this.institut.set(institut);
                this.loading.set(false);
            },
            error: (error: unknown) => {
                this.loading.set(false);
                this.error.set(apiErrorMessage(error));
            }
        });
    }

    /** L'agent déclare lui-même sa disponibilité. */
    setAvailability(status: AgentStatus): void {
        const agent = this.agent();
        if (!agent || agent.status === status) return;

        this.savingStatus.set(true);
        this.agents.setStatus(agent.id, status).subscribe({
            next: (updated) => {
                this.agent.set(updated);
                this.savingStatus.set(false);
                this.messages.add({ severity: 'success', summary: 'Disponibilité mise à jour', detail: AGENT_STATUS_LABELS[status], life: 3000 });
            },
            error: (error: unknown) => {
                this.savingStatus.set(false);
                this.messages.add({ severity: 'error', summary: 'Erreur', detail: apiErrorMessage(error), life: 5000 });
            }
        });
    }

    requestLink(request: CitizenRequest): string[] {
        switch (this.auth.user()?.role) {
            case 'citizen':
                return ['/home/my-requests', request.id];
            case 'agent':
                return ['/home/agent'];
            default:
                return ['/home/requests'];
        }
    }
}
