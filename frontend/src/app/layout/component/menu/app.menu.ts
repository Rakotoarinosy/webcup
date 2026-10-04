import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@/app/auth/auth.service';
import { I18nService } from '@/app/i18n/i18n.service';
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
    private readonly i18n = inject(I18nService);

    // AJOUT 1 : déclarations manquantes (corrigent les 12 erreurs)
    private readonly institutApi = inject(InstitutService);
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
        // Lecture du signal de langue : le menu se reconstruit quand la langue change (D14).
        const t = (key: Parameters<I18nService['t']>[0]) => this.i18n.t(key);
        const items: MenuItem[] = [{ label: t('menu.space'), icon: 'pi pi-fw pi-user', routerLink: ['/home/account'] }];

        if (this.auth.hasRole('agent')) {
            items.push(
                { label: t('menu.interventions'), icon: 'pi pi-fw pi-inbox', routerLink: ['/home/agent'] },
                { label: t('menu.citizenAccounts'), icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] }
            );
        }
        if (this.auth.hasRole('citizen')) {
            items.push({ label: t('menu.myRequests'), icon: 'pi pi-fw pi-list', routerLink: ['/home/my-requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('manager', 'admin')) {
            items.push({ label: t('menu.citizenRequests'), icon: 'pi pi-fw pi-inbox', routerLink: ['/home/requests'], badge: this.notificationBadge() });
        }
        if (this.auth.hasRole('admin')) {
            // L'admin gère tous les comptes depuis « Utilisateurs » (citoyens compris).
            items.push(
                {
                    label: t('menu.users'),
                    icon: 'pi pi-fw pi-users',
                    path: '/home/accounts',
                    dropdownOnly: true,
                    items: [
                        { label: t('menu.citizens'), icon: 'pi pi-fw pi-user', routerLink: ['/home/accounts/citizens'] },
                        { label: t('menu.agents'), icon: 'pi pi-fw pi-wrench', routerLink: ['/home/accounts/agents'] },
                        { label: t('menu.managers'), icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/accounts/managers'] },
                        { label: t('menu.admins'), icon: 'pi pi-fw pi-shield', routerLink: ['/home/accounts/admins'] }
                    ]
                },
                { label: t('menu.instituts'), icon: 'pi pi-fw pi-building', routerLink: ['/home/instituts'] },
                { label: t('menu.dataConcerns'), icon: 'pi pi-fw pi-shield', routerLink: ['/home/data-concerns'] }
            );
        } else if (this.auth.hasRole('manager')) {
            items.push({ label: t('menu.citizenAccounts'), icon: 'pi pi-fw pi-users', routerLink: ['/home/users'] });
        }

        // AJOUT 3 : entrées par institut (avec leurs services) pour manager et admin
        if (this.auth.hasRole('manager', 'admin')) {
            items.push(...this.institutMenuItems());
        }

        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            items.push({ label: t('menu.journal'), icon: 'pi pi-fw pi-history', routerLink: ['/home/journal'] });
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
                    { label: t('menu.dashboard'), icon: 'pi pi-fw pi-chart-line', routerLink: ['/home/terra-nova'], routerLinkActiveOptions: { exact: true } },
                    { label: t('menu.apiRequests'), icon: 'pi pi-fw pi-list', routerLink: ['/home/terra-nova/demandes'] },
                    { label: t('menu.notifications'), icon: 'pi pi-fw pi-bell', routerLink: ['/home/terra-nova/notifications'] },
                    { label: t('menu.pipeline'), icon: 'pi pi-fw pi-objects-column', routerLink: ['/home/terra-nova/pipeline'] }
                ]
            });
        }
        return groups;
    });

    // AJOUT 2 : chargement des instituts selon le rôle
    constructor() {
        effect(() => {
            if (this.auth.hasRole('manager', 'admin')) {
                this.loadInstitutionMenu();
            }
        });
    }

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