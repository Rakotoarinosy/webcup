import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { I18nService } from '@/app/i18n/i18n.service';
import { LayoutService, ThemeMode } from '@/app/layout/service/layout.service';
import { environment } from '@/environments/environment';

import { FontFamily, FontSize, Language } from '@/app/shared/api-enums';

export type { FontFamily, FontSize, Language };
export interface UserPreferences {
    theme: ThemeMode;
    font_size: FontSize;
    font_family: FontFamily;
    /** null : jamais choisie (interface en français, ou langue choisie sur l'appareil). */
    language?: Language | null;
}

@Injectable({ providedIn: 'root' })
export class PreferencesService {
    private readonly http = inject(HttpClient);
    private readonly layout = inject(LayoutService);
    private readonly i18n = inject(I18nService);
    private readonly baseUrl = `${environment.apiUrl}/preferences/me`;

    load(): Observable<UserPreferences> {
        return this.http.get<UserPreferences>(this.baseUrl).pipe(tap((value) => this.apply(value)));
    }

    /** Affichage (configurateur) : la langue n'est pas envoyée, elle a son propre sélecteur. */
    save(value: UserPreferences): Observable<UserPreferences> {
        const { theme, font_size, font_family } = value;
        return this.http.put<UserPreferences>(this.baseUrl, { theme, font_size, font_family }).pipe(tap((saved) => this.apply(saved)));
    }

    saveLanguage(language: Language): Observable<UserPreferences> {
        return this.http.patch<UserPreferences>(this.baseUrl, { language });
    }

    apply(value: UserPreferences): void {
        this.layout.setThemeMode(value.theme);
        document.documentElement.dataset['fontSize'] = value.font_size;
        document.documentElement.dataset['fontFamily'] = value.font_family;
        if (value.language) {
            // Choix enregistré dans le compte : il suit l'utilisateur sur tous ses appareils.
            this.i18n.use(value.language);
        } else {
            // Langue choisie avant la connexion (ex. sur l'écran d'inscription) : on la mémorise dans le compte.
            const local = this.i18n.storedLanguage();
            if (local) this.saveLanguage(local).subscribe({ error: () => undefined });
        }
    }
}
