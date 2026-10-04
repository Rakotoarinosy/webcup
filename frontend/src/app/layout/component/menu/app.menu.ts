import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@/app/auth/auth.service';
import { I18nService } from '@/app/i18n/i18n.service';
import { NotificationService } from '@/app/notifications/notification.service';
import { PublicationReadService } from '@/app/municipal/publication-read.service';
import { AppMenuitem } from '../menuitem/app.menuitem';

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
        if (this.auth.hasRole('agent', 'manager', 'admin')) {
            items.push({ label: t('menu.journal'), icon: 'pi pi-fw pi-history', routerLink: ['/home/journal'] });
        }

        const groups: MenuItem[] = [{ label: 'Terra Nova', items }];

        groups.push({
            label: t('menu.townHall'),
            items: [
                { label: t('menu.municipalHome'), icon: 'pi pi-fw pi-building', routerLink: ['/home/municipal'], routerLinkActiveOptions: { exact: true } },
                { label: t('menu.services'), icon: 'pi pi-fw pi-map-marker', routerLink: ['/home/municipal/services'] },
                { label: t('menu.publications'), icon: 'pi pi-fw pi-megaphone', routerLink: ['/home/municipal/publications'], badge: this.publicationBadge() },
                { label: t('menu.contact'), icon: 'pi pi-fw pi-envelope', routerLink: ['/home/municipal/contact'] },
                { label: t('menu.orientation'), icon: 'pi pi-fw pi-compass', routerLink: ['/home/orientation'] }
            ]
        });

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

    private notificationBadge(): string | undefined {
        const count = this.notifications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }

    private publicationBadge(): string | undefined {
        const count = this.publications.unreadCount();
        return count ? (count > 99 ? '99+' : String(count)) : undefined;
    }
}
