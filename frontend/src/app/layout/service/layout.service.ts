import { Injectable, computed, effect, signal, untracked } from '@angular/core';

/** Préférence de thème choisie par l'utilisateur ; `system` suit le réglage de l'OS. */
import { Theme } from '@/app/shared/api-enums';

/** Mêmes valeurs que les préférences enregistrées côté backend (Theme). */
export type ThemeMode = Theme;

// Même clé que le script inline de index.html, qui applique le thème avant le démarrage d'Angular.
export const THEME_STORAGE_KEY = 'theme-mode';
export const HIGH_CONTRAST_STORAGE_KEY = 'high-contrast';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function readStoredThemeMode(): ThemeMode {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    } catch {
        // Stockage indisponible (navigation privée stricte, cookies bloqués…) : on suit le système.
        return 'system';
    }
}

function readStoredHighContrast(): boolean {
    try {
        return localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

function systemPrefersDark(): boolean {
    return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches;
}

function isDark(mode: ThemeMode, systemDark: boolean): boolean {
    return mode === 'dark' || (mode === 'system' && systemDark);
}

export interface LayoutConfig {
    preset: string;
    primary: string;
    surface: string | undefined | null;
    darkTheme: boolean;
    menuMode: string;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    configSidebarVisible: boolean;
    mobileMenuActive: boolean;
    menuHoverActive: boolean;
    activePath: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    readonly themeMode = signal<ThemeMode>(readStoredThemeMode());

    readonly highContrast = signal(readStoredHighContrast());

    private readonly systemDark = signal(systemPrefersDark());

    layoutConfig = signal<LayoutConfig>({
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: isDark(this.themeMode(), this.systemDark()),
        menuMode: 'static'
    });

    layoutState = signal<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        mobileMenuActive: false,
        menuHoverActive: false,
        activePath: null
    });

    theme = computed(() => (this.layoutConfig().darkTheme ? 'dark' : 'light'));

    isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive);

    isDarkTheme = computed(() => this.layoutConfig().darkTheme);

    getPrimary = computed(() => this.layoutConfig().primary);

    getSurface = computed(() => this.layoutConfig().surface);

    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

    transitionComplete = signal<boolean>(false);

    private initialized = false;

    constructor() {
        // Thème initial appliqué tout de suite (index.html l'a normalement déjà fait avant Angular).
        this.toggleDarkMode();

        if (typeof window.matchMedia === 'function') {
            window.matchMedia(DARK_QUERY).addEventListener('change', (event) => this.systemDark.set(event.matches));
        }

        // Préférence → thème effectif (darkTheme), relu par le reste du layout, et sauvegarde.
        effect(() => {
            const mode = this.themeMode();
            const darkTheme = isDark(mode, this.systemDark());

            if (untracked(() => this.layoutConfig().darkTheme) !== darkTheme) {
                this.layoutConfig.update((state) => ({ ...state, darkTheme }));
            }
            try {
                localStorage.setItem(THEME_STORAGE_KEY, mode);
            } catch {
                // Préférence non sauvegardée, mais le thème reste appliqué pour la session.
            }
        });

        effect(() => {
            const enabled = this.highContrast();
            document.documentElement.classList.toggle('app-high-contrast', enabled);
            try {
                localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(enabled));
            } catch {
                // Préférence non sauvegardée, mais le contraste reste appliqué pour la session.
            }
        });

        effect(() => {
            const config = this.layoutConfig();

            if (!this.initialized || !config) {
                this.initialized = true;
                return;
            }

            this.handleDarkModeTransition(config);
        });
    }

    private handleDarkModeTransition(config: LayoutConfig): void {
        const supportsViewTransition = 'startViewTransition' in document;

        if (supportsViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
        }
    }

    private startViewTransition(config: LayoutConfig): void {
        const transition = document.startViewTransition(() => {
            this.toggleDarkMode(config);
        });
        // Une transition remplacee n’anime plus, mais son changement de theme reste applique.
        void transition.ready.catch((error: unknown) => {
            if (!(error instanceof DOMException && error.name === 'AbortError')) throw error;
        });
    }

    toggleDarkMode(config?: LayoutConfig): void {
        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    setThemeMode(mode: ThemeMode): void {
        this.themeMode.set(mode);
    }

    setHighContrast(enabled: boolean): void {
        this.highContrast.set(enabled);
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.layoutState.update((prev) => ({ ...prev, overlayMenuActive: !this.layoutState().overlayMenuActive }));
        }

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({ ...prev, staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive }));
        } else {
            this.layoutState.update((prev) => ({ ...prev, mobileMenuActive: !this.layoutState().mobileMenuActive }));
        }
    }

    showConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
    }

    hideConfigSidebar() {
        this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }
}
