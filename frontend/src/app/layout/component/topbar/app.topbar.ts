import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';

import { ROLE_LABELS } from '@/app/auth/auth.model';
import { AuthService } from '@/app/auth/auth.service';
import { LayoutService } from '@/app/layout/service/layout.service';
import { OverlayCoordinatorService } from '@/app/layout/service/overlay-coordinator.service';
import { AppConfigurator } from '../configurator/app.configurator';
import { Notifications } from './widget/notifications/notifications';

type SearchSuggestion = { label: string; detail: string; icon: string; url: string; roles?: readonly string[] };

const SEARCH_SUGGESTIONS: readonly SearchSuggestion[] = [
    { label: 'Mon espace', detail: 'Votre tableau personnel', icon: 'pi-home', url: '/home/account' },
    { label: 'Mon profil', detail: 'Informations de votre compte', icon: 'pi-id-card', url: '/home/profile' },
    { label: 'Mes données', detail: 'Préférences et données personnelles', icon: 'pi-lock', url: '/home/my-data' },
    { label: 'Services municipaux', detail: 'Trouver un service de la mairie', icon: 'pi-map-marker', url: '/home/municipal/services' },
    { label: 'Publications', detail: 'Actualités et informations municipales', icon: 'pi-megaphone', url: '/home/municipal/publications' },
    { label: 'Contacter la mairie', detail: 'Envoyer un message aux services', icon: 'pi-envelope', url: '/home/municipal/contact' },
    { label: 'Mes demandes', detail: 'Suivre vos demandes', icon: 'pi-list', url: '/home/my-requests', roles: ['citizen'] },
    { label: 'Mes interventions', detail: 'Demandes à traiter', icon: 'pi-inbox', url: '/home/agent', roles: ['agent'] },
    { label: 'Demandes citoyennes', detail: 'Gérer les demandes', icon: 'pi-inbox', url: '/home/requests', roles: ['manager', 'admin'] },
    { label: 'Utilisateurs', detail: 'Gérer les comptes', icon: 'pi-users', url: '/home/accounts', roles: ['admin'] },
    { label: 'Instituts', detail: 'Gérer les instituts', icon: 'pi-building', url: '/home/instituts', roles: ['admin'] },
    { label: 'Journal', detail: 'Consulter le journal d’activité', icon: 'pi-history', url: '/home/journal', roles: ['agent', 'manager', 'admin'] },
    { label: 'Terra Nova', detail: 'Espace de suivi Terra Nova', icon: 'pi-chart-line', url: '/home/terra-nova', roles: ['agent', 'manager', 'admin'] }
];

@Component({
    selector: 'app-topbar',
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule, Notifications],
    templateUrl: './app.topbar.html',
    styleUrl: './app.topbar.scss'
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    readonly overlays = inject(OverlayCoordinatorService);

    // Référence vers le menu popup PrimeNG pour pouvoir le fermer explicitement
    readonly userMenu = viewChild<Menu>('menu');
    readonly configMenu = viewChild<ElementRef<HTMLElement>>('configMenu');
    readonly configVisible = signal(false);
    readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('globalSearch');
    readonly searchQuery = signal('');
    readonly searchOpen = signal(false);
    readonly activeSuggestion = signal(-1);

    readonly user = this.auth.user;

    /** État ouvert/fermé du menu latéral, exposé via aria-expanded sur le bouton « Menu principal ». */
    readonly menuExpanded = computed(() => {
        const state = this.layoutService.layoutState();
        if (this.layoutService.isOverlay()) return state.overlayMenuActive;
        return this.layoutService.isDesktop() ? !state.staticMenuDesktopInactive : state.mobileMenuActive;
    });
    readonly roleLabel = this.auth.roleLabel;
    readonly searchSuggestions = computed(() => {
        const query = this.searchQuery().trim().toLocaleLowerCase('fr-FR');
        if (!query) return [];
        return SEARCH_SUGGESTIONS.filter((item) => {
            const allowed = !item.roles || this.auth.hasRole(...item.roles as ('admin' | 'manager' | 'agent' | 'citizen')[]);
            return allowed && `${item.label} ${item.detail}`.toLocaleLowerCase('fr-FR').includes(query);
        }).slice(0, 7);
    });

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

    /** Même point de départ vertical que le configurateur (sans modifier son axe horizontal). */
    alignAccountMenu(): void {
        requestAnimationFrame(() => {
            // PrimeNG place le popup dans un conteneur parent appendu au body.
            const popup = this.userMenu()?.container as HTMLElement | undefined;
            if (popup) popup.style.top = '3.75rem';
        });
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
        if (this.searchOpen()) {
            this.closeSearch();
            return;
        }
        this.overlays.close();
    }

    @HostListener('document:keydown', ['$event'])
    focusSearchShortcut(event: KeyboardEvent): void {
        if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
        event.preventDefault();
        this.searchOpen.set(true);
        requestAnimationFrame(() => this.searchInput()?.nativeElement.focus());
    }

    updateSearch(value: string): void {
        this.searchQuery.set(value);
        this.searchOpen.set(true);
        this.activeSuggestion.set(-1);
    }

    onSearchKeydown(event: KeyboardEvent): void {
        const suggestions = this.searchSuggestions();
        if (event.key === 'ArrowDown' && suggestions.length) {
            event.preventDefault();
            this.activeSuggestion.update((index) => (index + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp' && suggestions.length) {
            event.preventDefault();
            this.activeSuggestion.update((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
        } else if (event.key === 'Enter' && suggestions.length) {
            event.preventDefault();
            this.selectSuggestion(suggestions[this.activeSuggestion() < 0 ? 0 : this.activeSuggestion()]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.closeSearch();
            this.searchInput()?.nativeElement.blur();
        }
    }

    selectSuggestion(suggestion: SearchSuggestion): void {
        this.closeSearch();
        this.router.navigateByUrl(suggestion.url);
    }

    onSearchFocusOut(): void {
        setTimeout(() => {
            const search = this.searchInput()?.nativeElement.closest('.topbar-search');
            if (!search?.contains(document.activeElement)) this.closeSearch();
        });
    }

    private closeSearch(): void {
        this.searchOpen.set(false);
        this.activeSuggestion.set(-1);
    }

    // Menu utilisateur : identité (non cliquable) puis déconnexion.
    readonly items = computed<MenuItem[]>(() => {
        const user = this.user();

        return [
            {
                items: [
                    { label: 'Mon profil', icon: 'pi pi-id-card', routerLink: ['/home/profile'] },
                    { label: 'Mes données', icon: 'pi pi-lock', routerLink: ['/home/my-data'] },
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
