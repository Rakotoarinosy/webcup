import { Pipe, PipeTransform, inject } from '@angular/core';

import { I18nService, TranslationParams } from './i18n.service';
import { TranslationKey } from './fr';

/**
 * `{{ 'menu.myRequests' | t }}` ou `{{ 'requests.pageStatus' | t: { page, pages } }}`.
 * Impur : la lecture du signal de langue rend le gabarit réactif au changement de langue.
 */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
    private readonly i18n = inject(I18nService);

    transform(key: TranslationKey | string, params?: TranslationParams): string {
        return this.i18n.t(key, params);
    }
}

/** Libellé traduit d'une valeur d'API (catégorie, statut…) : `{{ request.status | tv: 'status' }}`. */
@Pipe({ name: 'tv', pure: false })
export class TranslateValuePipe implements PipeTransform {
    private readonly i18n = inject(I18nService);

    transform(value: string | null | undefined, prefix: string): string {
        if (!value) return '';
        return this.i18n.tOr(`${prefix}.${value}`, value);
    }
}

/** Date formatée selon la langue choisie : `{{ value | ldate: 'dd/MM/yyyy' }}`. */
@Pipe({ name: 'ldate', pure: false })
export class LocalizedDatePipe implements PipeTransform {
    private readonly i18n = inject(I18nService);

    transform(value: string | number | Date | null | undefined, format = 'mediumDate'): string {
        return this.i18n.formatDate(value, format);
    }
}

export const I18N_PIPES = [TranslatePipe, TranslateValuePipe, LocalizedDatePipe] as const;
