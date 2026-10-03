import { ValidatorFn, Validators } from '@angular/forms';

export const nameValidator: ValidatorFn = (control) => (typeof control.value === 'string' && control.value.trim().length > 0 ? null : { required: true });
export const NAME_VALIDATORS = [nameValidator, Validators.maxLength(255)];
export const PASSWORD_VALIDATORS = [Validators.minLength(10), Validators.maxLength(128), Validators.pattern(/^(?=[\s\S]*[a-z])(?=[\s\S]*[A-Z])(?=[\s\S]*\d)[\s\S]+$/)];

/** Indicatif appliqué aux numéros saisis au format local (0341234567 → +261341234567). */
export const DEFAULT_COUNTRY_CODE = '261';
/** Un numéro national malgache compte 9 chiffres (sans le 0 initial). */
const DEFAULT_NATIONAL_LENGTH = 9;

/**
 * Met un numéro saisi à la main au format international (E.164), celui attendu par l'API.
 * Accepte : 034 12 345 67 · +261 34 12 345 67 · 261341234567 · 00261341234567.
 * Retourne `null` si ce n'est pas un numéro plausible.
 */
export function normalizePhone(raw: string): string | null {
    const compact = raw.trim().replace(/[\s.\-()]/g, '');
    let digits: string;

    if (compact.startsWith('+')) {
        digits = compact.slice(1);
    } else if (compact.startsWith('00')) {
        digits = compact.slice(2);
    } else if (compact.startsWith('0')) {
        digits = DEFAULT_COUNTRY_CODE + compact.slice(1);
    } else if (compact.startsWith(DEFAULT_COUNTRY_CODE)) {
        digits = compact;
    } else {
        return null;
    }

    if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
    if (digits.startsWith(DEFAULT_COUNTRY_CODE) && digits.length !== DEFAULT_COUNTRY_CODE.length + DEFAULT_NATIONAL_LENGTH) return null;

    return `+${digits}`;
}

/** Valide un numéro de téléphone. Le champ vide est laissé à `Validators.required`. */
export const phoneValidator: ValidatorFn = (control) => {
    const value = control.value;
    if (typeof value !== 'string' || value.trim() === '') return null;
    return normalizePhone(value) ? null : { phone: true };
};