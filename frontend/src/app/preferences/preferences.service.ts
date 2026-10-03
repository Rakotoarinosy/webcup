import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LayoutService, ThemeMode } from '@/app/layout/service/layout.service';
import { environment } from '@/environments/environment';

export type FontSize = 'small' | 'medium' | 'large';
export type FontFamily = 'system' | 'inter' | 'poppins' | 'manrope' | 'source' | 'serif' | 'mono';
export interface UserPreferences { theme: ThemeMode; font_size: FontSize; font_family: FontFamily; }

@Injectable({ providedIn: 'root' })
export class PreferencesService {
    private readonly http = inject(HttpClient);
    private readonly layout = inject(LayoutService);
    private readonly baseUrl = `${environment.apiUrl}/preferences/me`;

    load(): Observable<UserPreferences> { return this.http.get<UserPreferences>(this.baseUrl).pipe(tap((value) => this.apply(value))); }
    save(value: UserPreferences): Observable<UserPreferences> { return this.http.put<UserPreferences>(this.baseUrl, value).pipe(tap((saved) => this.apply(saved))); }
    apply(value: UserPreferences): void {
        this.layout.setThemeMode(value.theme);
        document.documentElement.dataset['fontSize'] = value.font_size;
        document.documentElement.dataset['fontFamily'] = value.font_family;
    }
}
