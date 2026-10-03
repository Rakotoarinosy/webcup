import { Component, computed, inject, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

import { LayoutService, ThemeMode } from '@/app/layout/service/layout.service';

const THEME_OPTIONS: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Clair', icon: 'pi pi-sun' },
    { mode: 'dark', label: 'Sombre', icon: 'pi pi-moon' },
    { mode: 'system', label: 'Système', icon: 'pi pi-desktop' }
];

/** Choix du thème : clair, sombre ou automatique selon le système. La préférence est mémorisée. */
@Component({
    selector: 'app-theme-switcher',
    imports: [ButtonModule, MenuModule, TooltipModule],
    templateUrl: './app.themeswitcher.html'
})
export class AppThemeSwitcher {
    private readonly layoutService = inject(LayoutService);

    /** `topbar` : bouton de la barre du haut ; `floating` : bouton rond des pages sans layout. */
    variant = input<'topbar' | 'floating'>('topbar');

    readonly current = computed(() => THEME_OPTIONS.find((option) => option.mode === this.layoutService.themeMode()) ?? THEME_OPTIONS[2]);

    readonly items = computed<MenuItem[]>(() =>
        THEME_OPTIONS.map((option) => ({
            label: option.label,
            icon: option.icon,
            state: { active: option.mode === this.layoutService.themeMode() },
            command: () => this.layoutService.setThemeMode(option.mode)
        }))
    );
}
