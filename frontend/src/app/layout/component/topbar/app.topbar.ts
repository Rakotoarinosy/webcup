import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';

import { ROLE_LABELS } from '@/app/auth/auth.model';
import { AuthService } from '@/app/auth/auth.service';
import { LayoutService } from '@/app/layout/service/layout.service';
import { OverlayCoordinatorService } from '@/app/layout/service/overlay-coordinator.service';
import { AppConfigurator } from '../configurator/app.configurator';
import { Notifications } from './widget/notifications/notifications';

@Component({
    selector: 'app-topbar',
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule, Notifications],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss'
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    private readonly auth = inject(AuthService);
    readonly overlays = inject(OverlayCoordinatorService);

    // Référence vers le menu popup PrimeNG pour pouvoir le fermer explicitement
    readonly userMenu = viewChild<Menu>('menu');
    readonly configMenu = viewChild<ElementRef<HTMLElement>>('configMenu');
    readonly configVisible = signal(false);

    readonly user = this.auth.user;
    readonly roleLabel = this.auth.roleLabel;

    toggleConfigurator(event: MouseEvent): void {
        event.stopPropagation();
        this.overlays.active() === 'config' ? this.overlays.close('config') : this.overlays.open('config');
    }

    toggleAccount(event: MouseEvent): void {
        event.stopPropagation();
        if (this.overlays.active() === 'account') {
            this.userMenu()?.hide();
            this.overlays.close('account');
        } else {
            this.overlays.open('account');
            this.userMenu()?.show(event);
        }
    }

    constructor() {
        effect(() => {
            const isConfigOpen = this.overlays.active() === 'config';
            this.configVisible.set(isConfigOpen);
            if (this.overlays.active() !== 'account') this.userMenu()?.hide();
        });
    }

    @HostListener('document:click', ['$event'])
    closeConfiguratorOnOutsideClick(event: MouseEvent): void {
        if (this.configVisible() && !this.configMenu()?.nativeElement.contains(event.target as Node)) this.overlays.close('config');
    }

    @HostListener('document:pointerdown', ['$event'])
    closeConfiguratorOnOutsidePointerDown(event: PointerEvent): void {
        if (this.configVisible() && !this.configMenu()?.nativeElement.contains(event.target as Node)) this.overlays.close('config');
    }

    @HostListener('document:keydown.escape')
    closeConfiguratorOnEscape(): void {
        this.overlays.close();
    }

    // Menu utilisateur : identité (non cliquable) puis déconnexion.
    readonly items = computed<MenuItem[]>(() => {
        const user = this.user();

        return [
            {
                label: user?.name ?? 'Utilisateur',
                items: [
                    {
                        label: user ? `${user.email} · ${ROLE_LABELS[user.role] ?? user.role}` : '',
                        icon: 'pi pi-user',
                        disabled: true
                    },
                    { label: 'Mon espace', icon: 'pi pi-user', routerLink: ['/home/account'] },
                    { label: 'Mon profil', icon: 'pi pi-id-card', routerLink: ['/home/profile'] },
                    { separator: true },
                    {
                        label: 'Déconnexion',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            // Ferme le menu popup proprement avant de lancer la déconnexion
                            this.userMenu()?.hide();
                            this.auth.logout();
                        }
                    }
                ]
            }
        ];
    });
}
