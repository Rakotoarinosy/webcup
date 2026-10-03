import { ValidatorFn, Validators } from '@angular/forms';

export const nameValidator: ValidatorFn = (control) => (typeof control.value === 'string' && control.value.trim().length > 0 ? null : { required: true });
export const NAME_VALIDATORS = [nameValidator, Validators.maxLength(255)];
export const PASSWORD_VALIDATORS = [Validators.minLength(10), Validators.maxLength(128), Validators.pattern(/^(?=[\s\S]*[a-z])(?=[\s\S]*[A-Z])(?=[\s\S]*\d)[\s\S]+$/)];
