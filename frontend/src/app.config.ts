import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';
import { AuthService } from './app/auth/auth.service';
import { authInterceptor } from './app/auth/auth.interceptor';
import { RealtimeService } from './app/shared/realtime.service';
import { appRoutes } from './app.routes';

registerLocaleData(localeFr);

/* Le preset est appliqué avant qu'un composant ne soit affiché. Cela évite
   l'éclair vert d'Aura sur les pages qui n'affichent pas le configurateur. */
const terraNovaPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{fuchsia.50}',
            100: '{fuchsia.100}',
            200: '{fuchsia.200}',
            300: '{fuchsia.300}',
            400: '{fuchsia.400}',
            500: '{fuchsia.500}',
            600: '{fuchsia.600}',
            700: '{fuchsia.700}',
            800: '{fuchsia.800}',
            900: '{fuchsia.900}',
            950: '{fuchsia.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideAppInitializer(() => inject(AuthService).restoreSession()),
        provideAppInitializer(() => {
            inject(RealtimeService);
        }),
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({ theme: { preset: terraNovaPreset, options: { darkModeSelector: '.app-dark' } } })
    ]
};
