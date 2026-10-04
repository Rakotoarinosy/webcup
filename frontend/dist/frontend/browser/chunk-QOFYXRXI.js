import {
  Validators
} from "./chunk-BX45OWY6.js";

// src/app/auth/auth.validators.ts
var nameValidator = (control) => typeof control.value === "string" && control.value.trim().length > 0 ? null : { required: true };
var NAME_VALIDATORS = [nameValidator, Validators.maxLength(255)];
var PASSWORD_VALIDATORS = [Validators.minLength(10), Validators.maxLength(128), Validators.pattern(/^(?=[\s\S]*[a-z])(?=[\s\S]*[A-Z])(?=[\s\S]*\d)[\s\S]+$/)];
var DEFAULT_COUNTRY_CODE = "261";
var DEFAULT_NATIONAL_LENGTH = 9;
function normalizePhone(raw) {
  const compact = raw.trim().replace(/[\s.\-()]/g, "");
  let digits;
  if (compact.startsWith("+")) {
    digits = compact.slice(1);
  } else if (compact.startsWith("00")) {
    digits = compact.slice(2);
  } else if (compact.startsWith("0")) {
    digits = DEFAULT_COUNTRY_CODE + compact.slice(1);
  } else if (compact.startsWith(DEFAULT_COUNTRY_CODE)) {
    digits = compact;
  } else {
    return null;
  }
  if (!/^[1-9]\d{7,14}$/.test(digits))
    return null;
  if (digits.startsWith(DEFAULT_COUNTRY_CODE) && digits.length !== DEFAULT_COUNTRY_CODE.length + DEFAULT_NATIONAL_LENGTH)
    return null;
  return `+${digits}`;
}
var phoneValidator = (control) => {
  const value = control.value;
  if (typeof value !== "string" || value.trim() === "")
    return null;
  return normalizePhone(value) ? null : { phone: true };
};

export {
  NAME_VALIDATORS,
  PASSWORD_VALIDATORS,
  normalizePhone,
  phoneValidator
};
//# sourceMappingURL=chunk-QOFYXRXI.js.map
