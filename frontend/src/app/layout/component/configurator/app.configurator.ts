import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AppFontSize } from '../fontsize/app.fontsize';

import { AuthService } from '@/app/auth/auth.service';
import { LayoutConfig, LayoutService } from '@/app/layout/service/layout.service';
import { FontFamily, FontSize, PreferencesService, UserPreferences } from '@/app/preferences/preferences.service';

const presets = {
    Aura,
    Lara,
    Nora
} as const;

declare type KeyOfType<T> = keyof T extends infer U ? U : never;

declare type SurfacesType = {
    name?: string;
    palette?: {
        0?: string;
        50?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
        950?: string;
    };
};

/** Primary color names offered by the configurator, resolved against the active preset's primitives. */
const PRIMARY_COLOR_NAMES = ['emerald', 'green', 'lime', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];

const MENU_MODE_OPTIONS = [
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
];

const THEME_OPTIONS: { label: string; value: UserPreferences['theme'] }[] = [
    { label: 'Clair', value: 'light' },
    { label: 'Sombre', value: 'dark' },
    { label: 'Système', value: 'system' }
];

const FONT_SIZE_OPTIONS: { label: string; value: FontSize }[] = [
    { label: 'Petite', value: 'small' },
    { label: 'Normale', value: 'medium' },
    { label: 'Grande', value: 'large' }
];

const FONT_FAMILY_OPTIONS: { label: string; value: FontFamily }[] = [
    { label: 'Lato — classique', value: 'system' },
    { label: 'Inter — moderne et lisible', value: 'inter' },
    { label: 'Poppins — géométrique', value: 'poppins' },
    { label: 'Manrope — élégant', value: 'manrope' },
    { label: 'Source Sans 3 — professionnel', value: 'source' },
    { label: 'Merriweather — avec serif', value: 'serif' },
    { label: 'Monospace — technique', value: 'mono' }
];

const DEFAULT_PREFERENCES: UserPreferences = {
    theme: 'system',
    font_size: 'medium',
    font_family: 'system'
};

const SURFACES: SurfacesType[] = [
    {
        name: 'slate',
        palette: {
            0: '#ffffff',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617'
        }
    },
    {
        name: 'gray',
        palette: {
            0: '#ffffff',
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712'
        }
    },
    {
        name: 'zinc',
        palette: {
            0: '#ffffff',
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b'
        }
    },
    {
        name: 'neutral',
        palette: {
            0: '#ffffff',
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a'
        }
    },
    {
        name: 'stone',
        palette: {
            0: '#ffffff',
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
            950: '#0c0a09'
        }
    },
    {
        name: 'soho',
        palette: {
            0: '#ffffff',
            50: '#ececec',
            100: '#dedfdf',
            200: '#c4c4c6',
            300: '#adaeb0',
            400: '#97979b',
            500: '#7f8084',
            600: '#6a6b70',
            700: '#55565b',
            800: '#3f4046',
            900: '#2c2c34',
            950: '#16161d'
        }
    },
    {
        name: 'viva',
        palette: {
            0: '#ffffff',
            50: '#f3f3f3',
            100: '#e7e7e8',
            200: '#cfd0d0',
            300: '#b7b8b9',
            400: '#9fa1a1',
            500: '#87898a',
            600: '#6e7173',
            700: '#565a5b',
            800: '#3e4244',
            900: '#262b2c',
            950: '#0e1315'
        }
    },
    {
        name: 'ocean',
        palette: {
            0: '#ffffff',
            50: '#fbfcfc',
            100: '#F7F9F8',
            200: '#EFF3F2',
            300: '#DADEDD',
            400: '#B1B7B6',
            500: '#828787',
            600: '#5F7274',
            700: '#415B61',
            800: '#29444E',
            900: '#183240',
            950: '#0c1920'
        }
    }
];

@Component({
    selector: 'app-configurator',
    imports: [CommonModule, FormsModule, SelectModule, SelectButtonModule, AppFontSize],
    templateUrl: './app.configurator.html',
    styleUrl: './app.configurator.scss',
    host: {
        class: 'config-panel absolute w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]',
        '[class.hidden]': '!visible()'
    }
})
export class AppConfigurator {
    readonly visible = input(false);
    router = inject(Router);

    layoutService: LayoutService = inject(LayoutService);

    platformId = inject(PLATFORM_ID);

    private readonly preferencesService = inject(PreferencesService);

    private readonly auth = inject(AuthService);

    readonly presets = Object.keys(presets);

    readonly menuModeOptions = MENU_MODE_OPTIONS;

    readonly themeOptions = THEME_OPTIONS;

    readonly fontSizeOptions = FONT_SIZE_OPTIONS;

    readonly fontFamilyOptions = FONT_FAMILY_OPTIONS;

    readonly surfaces = SURFACES;

    showMenuModeButton = signal(!this.router.url.includes('auth'));

    selectedPrimaryColor = computed(() => this.layoutService.layoutConfig().primary);

    selectedSurfaceColor = computed(() => this.layoutService.layoutConfig().surface);

    selectedPreset = computed(() => this.layoutService.layoutConfig().preset);

    menuMode = computed(() => this.layoutService.layoutConfig().menuMode);

    readonly isAuthenticated = this.auth.isAuthenticated;

    readonly preferences = signal<UserPreferences>(DEFAULT_PREFERENCES);

    readonly saving = signal(false);

    readonly saveError = signal<string | null>(null);

    readonly saved = signal(false);

    primaryColors = computed<SurfacesType[]>(() => {
        const presetPalette = presets[this.layoutService.layoutConfig().preset as KeyOfType<typeof presets>].primitive;
        const palettes: SurfacesType[] = [{ name: 'noir', palette: {} }];

        PRIMARY_COLOR_NAMES.forEach((color) => {
            palettes.push({
                name: color,
                palette: presetPalette?.[color as KeyOfType<typeof presetPalette>] as SurfacesType['palette']
            });
        });

        return palettes;
    });

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.onPresetChange(this.layoutService.layoutConfig().preset);
        }

        if (this.isAuthenticated()) {
            this.preferencesService.load().subscribe({
                next: (preferences) => this.preferences.set(preferences),
                error: () => this.saveError.set('Vos préférences ne peuvent pas être chargées pour le moment.')
            });
        }
    }

    getPresetExt() {
        const color: SurfacesType = this.primaryColors().find((c) => c.name === this.selectedPrimaryColor()) || {};
        const preset = this.layoutService.layoutConfig().preset;

        if (color.name === 'noir') {
            return this.buildNoirPresetExt();
        }
        if (preset === 'Nora') {
            return this.buildNoraPresetExt(color.palette);
        }
        return this.buildDefaultPresetExt(color.palette);
    }

    updateColors(event: any, type: string, color: any) {
        if (type === 'primary') {
            this.updateLayoutConfig({ primary: color.name });
        } else if (type === 'surface') {
            this.updateLayoutConfig({ surface: color.name });
        }
        this.applyTheme(type, color);

        event.stopPropagation();
    }

    applyTheme(type: string, color: any) {
        if (type === 'primary') {
            updatePreset(this.getPresetExt());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

    onPresetChange(event: any) {
        this.updateLayoutConfig({ preset: event });
        const preset = presets[event as KeyOfType<typeof presets>];
        const surfacePalette = this.surfaces.find((s) => s.name === this.selectedSurfaceColor())?.palette;
        $t().preset(preset).preset(this.getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
    }

    onMenuModeChange(event: string) {
        this.updateLayoutConfig({ menuMode: event });
    }

    onThemeChange(theme: UserPreferences['theme']): void {
        this.preview({ theme });
    }

    onFontSizeChange(fontSize: FontSize): void {
        this.preview({ font_size: fontSize });
    }

    onFontFamilyChange(fontFamily: FontFamily): void {
        this.preview({ font_family: fontFamily });
    }

    savePreferences(): void {
        if (!this.isAuthenticated() || this.saving()) {
            return;
        }

        this.saving.set(true);
        this.saveError.set(null);
        this.saved.set(false);
        this.preferencesService.save(this.preferences()).subscribe({
            next: (preferences) => {
                this.preferences.set(preferences);
                this.saved.set(true);
                this.saving.set(false);
            },
            error: () => {
                this.saveError.set('Impossible d’enregistrer vos préférences. Réessayez plus tard.');
                this.saving.set(false);
            }
        });
    }

    private preview(patch: Partial<UserPreferences>): void {
        const preferences = { ...this.preferences(), ...patch };
        this.preferences.set(preferences);
        this.preferencesService.apply(preferences);
        this.saveError.set(null);
        this.saved.set(false);
    }

    private updateLayoutConfig(patch: Partial<LayoutConfig>) {
        this.layoutService.layoutConfig.update((state) => ({ ...state, ...patch }));
    }

    /** "Noir" maps the primary scale onto the surface scale. */
    private buildNoirPresetExt() {
        return {
            semantic: {
                primary: {
                    50: '{surface.50}',
                    100: '{surface.100}',
                    200: '{surface.200}',
                    300: '{surface.300}',
                    400: '{surface.400}',
                    500: '{surface.500}',
                    600: '{surface.600}',
                    700: '{surface.700}',
                    800: '{surface.800}',
                    900: '{surface.900}',
                    950: '{surface.950}'
                },
                colorScheme: {
                    light: {
                        primary: {
                            color: '{primary.950}',
                            contrastColor: '#ffffff',
                            hoverColor: '{primary.800}',
                            activeColor: '{primary.700}'
                        },
                        highlight: {
                            background: '{primary.950}',
                            focusBackground: '{primary.700}',
                            color: '#ffffff',
                            focusColor: '#ffffff'
                        }
                    },
                    dark: {
                        primary: {
                            color: '{primary.50}',
                            contrastColor: '{primary.950}',
                            hoverColor: '{primary.200}',
                            activeColor: '{primary.300}'
                        },
                        highlight: {
                            background: '{primary.50}',
                            focusBackground: '{primary.300}',
                            color: '{primary.950}',
                            focusColor: '{primary.950}'
                        }
                    }
                }
            }
        };
    }

    private buildNoraPresetExt(palette: SurfacesType['palette']) {
        return {
            semantic: {
                primary: palette,
                colorScheme: {
                    light: {
                        primary: {
                            color: '{primary.600}',
                            contrastColor: '#ffffff',
                            hoverColor: '{primary.700}',
                            activeColor: '{primary.800}'
                        },
                        highlight: {
                            background: '{primary.600}',
                            focusBackground: '{primary.700}',
                            color: '#ffffff',
                            focusColor: '#ffffff'
                        }
                    },
                    dark: {
                        primary: {
                            color: '{primary.500}',
                            contrastColor: '{surface.900}',
                            hoverColor: '{primary.400}',
                            activeColor: '{primary.300}'
                        },
                        highlight: {
                            background: '{primary.500}',
                            focusBackground: '{primary.400}',
                            color: '{surface.900}',
                            focusColor: '{surface.900}'
                        }
                    }
                }
            }
        };
    }

    private buildDefaultPresetExt(palette: SurfacesType['palette']) {
        return {
            semantic: {
                primary: palette,
                colorScheme: {
                    light: {
                        primary: {
                            color: '{primary.500}',
                            contrastColor: '#ffffff',
                            hoverColor: '{primary.600}',
                            activeColor: '{primary.700}'
                        },
                        highlight: {
                            background: '{primary.50}',
                            focusBackground: '{primary.100}',
                            color: '{primary.700}',
                            focusColor: '{primary.800}'
                        }
                    },
                    dark: {
                        primary: {
                            color: '{primary.400}',
                            contrastColor: '{surface.900}',
                            hoverColor: '{primary.300}',
                            activeColor: '{primary.200}'
                        },
                        highlight: {
                            background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                            focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                            color: 'rgba(255,255,255,.87)',
                            focusColor: 'rgba(255,255,255,.87)'
                        }
                    }
                }
            }
        };
    }
}
