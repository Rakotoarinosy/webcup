import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@/app/auth/auth.service';
import { NotificationService } from '@/app/notifications/notification.service';
import { PublicationReadService } from '@/app/municipal/publication-read.service';
import { Institut, InstitutService as ManagedService } from '@/app/instituts/institut.model';
import { InstitutService } from '@/app/instituts/institut.service';
import { AppMenuitem } from '../menuitem/app.menuitem';

type InstitutMenuService = Pick<ManagedService, 'id' | 'name' | 'icon'>;

@Component({
    selector: 'app-menu',
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu {
    private readonly auth = inject(AuthService);
    private readonly notifications = inject(NotificationService);
    private readonly publications = inject(PublicationReadService);
    private readonly institutApi = inject(InstitutService);
    /** Navigation de pilotage chargée depuis l'API : elle suit les vrais instituts et services. */
    private readonly instituts = signal<Institut[]>([]);
    private readonly servicesByInstitut = signal(new Map<string, InstitutMenuService[]>());

    constructor() {
        effect(() => {
            if (!this.auth.hasRole('admin', 'citizen')) {
                this.instituts.set([]);
                this.servicesByInstitut.set(new Map());
                return;
            }
            this.loadInstitutionMenu();
        });
    }

    readonly model = computed<MenuItem[]>(() => {
        const items: MenuItem[] = [{ label: 'Mon espace', icon: 'pi pi-fw pi-user', routerLink: ['/home/account'] }];

        if (this.auth.hasRole('agent')) {
            items.push(
                { label: 'Mes interventions', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/agent'] },
                { label: 'Comptes citoyens', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] }
            );
        }
        if (this.auth.hasRole('citizen')) {
            items.push({ label: 'Mes demandes', icon: 'pi pi-fw pi-list', routerLink: ['/home/my-requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('manager', 'admin')) {
            items.push({ label: 'Demandes citoyennes', icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('admin')) {
            // L'admin gère tous les comptes depuis « Utilisateurs » (citoyens compris).
            items.push(
                {
                    label: 'Utilisateurs',
                    icon: 'pi pi-fw pi-users',
                    path: '/home/accounts',
                    dropdownOnly: true,
                    items: [
                        { label: 'Citoyens', icon: 'pi pi-fw pi-user', routerLink: ['/home/accounts/citizens'] },
                        { label: 'Agents', icon: 'pi pi-fw pi-wrench', routerLink: ['/home/accounts/agents'] },
                        { label: 'Managers', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/accounts/managers'] },
                        { label: 'Administrateurs', icon: 'pi pi-fw pi-shield', routerLink: ['/home/accounts/admins'] }
                    ]
                },
                { label: 'Signalements données', icon: 'pi pi-fw pi-shield', routerLink: ['/home/data-concerns'] }
            );
        } else if (this.auth.hasRole('manager')) {
            items.push({ label: 'Comptes citoyens', icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] });
        }
        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            items.push({ label: 'Journal', icon: 'pi pi-fw pi-history', routerLink: ['/home/journal'] });
        }

        const groups: MenuItem[] = [{ label: 'Terra Nova', items }];

        items.push({ label: 'Publications', icon: 'pi pi-fw pi-megaphone', routerLink: ['/home/municipal/publications'], badge: this.publicationBadge() });
        if (this.auth.hasRole('admin', 'citizen')) {
            items.push({
                label: 'Instituts', icon: 'pi pi-fw pi-building', path: '__instituts', dropdownOnly: true,
                items: this.institutMenuItems()
            });
        }

        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            groups.push({
                label: 'API Terra Nova',
                items: [
                    { label: 'Tableau de bord', icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/terra-nova'], routerLinkActiveOptions: { exact: true } },
                    { label: 'Demandes API', icon: 'pi pi-fw pi-list', routerLink: ['/home/terra-nova/demandes'] },
                    { label: 'Notifications', icon: 'pi pi-fw pi-bell', routerLink: ['/home/terra-nova/notifications'] },
                    { label: 'Pipeline', icon: 'pi pi-fw pi-objects-column', routerLink: ['/home/terra-nova/pipeline'] }
                ]
            });
        }
        return groups;
    });

    private notificationBadge(): string | undefined {
        const count = this.notifications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }

    private publicationBadge(): string | undefined {
        const count = this.publications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }

    private loadInstitutionMenu(): void {
        this.institutApi.list().subscribe({
            next: (instituts) => {
                this.instituts.set(instituts);
                instituts.forEach((institut) => (this.auth.hasRole('citizen')
                    ? this.institutApi.citizenDashboard(institut.id)
                    : this.institutApi.dashboard(institut.id)
                ).subscribe({
                    next: (dashboard) => this.servicesByInstitut.update((current) => new Map(current).set(institut.id, dashboard.services)),
                    error: () => undefined
                }));
            },
            error: () => undefined
        });
    }

    private institutMenuItems(): MenuItem[] {
        return this.instituts().map((institut) => ({
            label: institut.name,
            icon: `pi pi-fw ${this.institutIcon(institut)}`,
            path: `__institut/${institut.id}`,
            dropdownOnly: true,
            items: [
                { label: 'Principal', icon: 'pi pi-fw pi-info-circle', routerLink: ['/home/instituts', institut.id] },
                ...(this.servicesByInstitut().get(institut.id) ?? []).map((service) => ({
                    label: service.name,
                    icon: `pi pi-fw ${service.icon || 'pi-building'}`,
                    routerLink: ['/home/instituts', institut.id, 'services', service.id]
                }))
            ]
        }));
    }

    private institutIcon(institut: Institut): string {
        const identity = `${institut.name} ${institut.categories.join(' ')}`.toLocaleLowerCase('fr');
        if (identity.includes('voirie')) return 'pi-directions';
        if (identity.includes('eau') || identity.includes('assainissement')) return 'pi-cloud';
        if (identity.includes('déchet') || identity.includes('propreté')) return 'pi-trash';
        if (identity.includes('éclairage')) return 'pi-bolt';
        if (identity.includes('vert') || identity.includes('environnement')) return 'pi-tree';
        if (identity.includes('sécurité')) return 'pi-shield';
        if (identity.includes('accueil') || identity.includes('démarche')) return 'pi-id-card';
        return 'pi-building';
    }
}
