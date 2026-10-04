import { formatDate, registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import localeMg from '@angular/common/locales/mg';
import { Injectable, computed, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { LANGUAGE_VALUES, Language } from '@/app/shared/api-enums';
import { EN } from './en';
import { Dictionary, FR, TranslationKey } from './fr';
import { MG } from './mg';

export type { Language, TranslationKey };
export type TranslationParams = Record<string, string | number>;

export interface LanguageOption {
    code: Language;
    /** Nom de la langue dans la langue elle-même : reconnaissable par qui ne lit pas le français. */
    label: string;
    locale: string;
}

export const LANGUAGES: readonly LanguageOption[] = [
    { code: 'fr', label: 'Français', locale: 'fr-FR' },
    { code: 'en', label: 'English', locale: 'en-GB' },
    { code: 'mg', label: 'Malagasy', locale: 'mg' }
];

export const DEFAULT_LANGUAGE: Language = 'fr';
export const LANGUAGE_STORAGE_KEY = 'tn.language';

// Formats de date de chaque langue (enregistrés ici pour fonctionner aussi dans les tests).
registerLocaleData(localeFr);
registerLocaleData(localeEnGb);
registerLocaleData(localeMg);

const DICTIONARIES: Record<Language, Partial<Dictionary>> = { fr: FR, en: EN, mg: MG };

export function isLanguage(value: unknown): value is Language {
    return typeof value === 'string' && (LANGUAGE_VALUES as readonly string[]).includes(value);
}

/**
 * Traduction de l'interface (D14), à base de signaux : changer de langue met à jour tous les
 * gabarits qui utilisent le pipe `t`. Une clé absente d'une langue retombe sur le français.
 * Le choix d'un visiteur est gardé dans localStorage ; celui d'un utilisateur connecté est en plus
 * enregistré dans ses préférences (PreferencesService).
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
    private readonly current = signal<Language>(this.storedLanguage() ?? DEFAULT_LANGUAGE);
    private readonly changes = new Subject<Language>();

    readonly language = this.current.asReadonly();
    readonly option = computed(() => LANGUAGES.find((item) => item.code === this.current()) ?? LANGUAGES[0]);
    readonly locale = computed(() => this.option().locale);
    /** Émet après chaque changement effectif : les pages rechargent leurs contenus traduits. */
    readonly languageChanged$ = this.changes.asObservable();

    constructor() {
        this.applyDocumentLanguage(this.current());
    }

    /** Langue choisie explicitement sur cet appareil (visiteur ou utilisateur). */
    storedLanguage(): Language | null {
        try {
            const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
            return isLanguage(value) ? value : null;
        } catch {
            return null;
        }
    }

    use(language: Language, options: { remember?: boolean } = {}): void {
        if (options.remember ?? true) {
            try {
                localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
            } catch {
                /* stockage indisponible (navigation privée) : la langue reste valable pour la session */
            }
        }
        if (language === this.current()) return;
        this.current.set(language);
        this.applyDocumentLanguage(language);
        this.changes.next(language);
    }

    t(key: TranslationKey | string, params?: TranslationParams): string {
        const text = DICTIONARIES[this.current()][key as TranslationKey] ?? FR[key as TranslationKey] ?? key;
        return params ? interpolate(text, params) : text;
    }

    /** Clé facultative (ex. libellé d'une valeur d'API) : la valeur brute si aucune traduction. */
    tOr(key: string, fallback: string, params?: TranslationParams): string {
        const known = DICTIONARIES[this.current()][key as TranslationKey] ?? FR[key as TranslationKey];
        return known ? (params ? interpolate(known, params) : known) : fallback;
    }

    formatDate(value: string | number | Date | null | undefined, format = 'mediumDate'): string {
        if (value === null || value === undefined || value === '') return '';
        try {
            return formatDate(value, format, this.locale());
        } catch {
            return formatDate(value, format, 'en-US');
        }
    }

    private applyDocumentLanguage(language: Language): void {
        if (typeof document !== 'undefined') document.documentElement.lang = language;
    }
}

function interpolate(text: string, params: TranslationParams): string {
    return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
}
