import {
  NAME_VALIDATORS,
  PASSWORD_VALIDATORS
} from "./chunk-QOFYXRXI.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  Router
} from "./chunk-F3M422Q6.js";
import {
  Toast,
  ToastModule
} from "./chunk-BBCFJD72.js";
import "./chunk-VCWXY23E.js";
import "./chunk-5UENDHV5.js";
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BX45OWY6.js";
import {
  MessageService
} from "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  HttpClient,
  HttpErrorResponse,
  Injectable,
  Injector,
  ViewChild,
  afterNextRender,
  computed,
  environment,
  finalize,
  inject,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// src/app/auth/profile/profile-export.service.ts
var ProfileExportService = class _ProfileExportService {
  http = inject(HttpClient);
  exportPersonalData(format) {
    return this.http.get(`${environment.apiUrl}/exports/me`, {
      params: { format },
      observe: "response",
      responseType: "blob"
    });
  }
  static \u0275fac = function ProfileExportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileExportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProfileExportService, factory: _ProfileExportService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileExportService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/profile/profile.ts
var _c0 = ["deleteFeedback"];
var _c1 = ["deleteDialog"];
function Profile_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Indiquez votre nom et pr\xE9nom. ");
  }
}
function Profile_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Indiquez une adresse email valide. ");
  }
}
function Profile_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Saisissez votre mot de passe actuel. ");
  }
}
function Profile_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Saisissez votre mot de passe actuel. ");
  }
}
function Profile_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le mot de passe doit respecter les crit\xE8res ci-dessous. ");
  }
}
function Profile_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Confirmez votre nouveau mot de passe. ");
  }
}
function Profile_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 40)(1, "h2", 77);
    \u0275\u0275text(2, "Supprimer mon compte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Vous pouvez quitter le portail quand vous le souhaitez. Votre compte et ses acc\xE8s seront supprim\xE9s d\xE9finitivement.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 78);
    \u0275\u0275text(6, "Vos demandes resteront dans les dossiers de la mairie sous l\u2019identit\xE9 \xAB Compte supprim\xE9 \xBB. Leur contenu et leur suivi seront conserv\xE9s.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 79);
    \u0275\u0275listener("click", function Profile_Conditional_74_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDeletion());
    });
    \u0275\u0275text(8, "Supprimer mon compte");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !!ctx_r2.busy());
  }
}
function Profile_Conditional_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 68, 1);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.deleteError());
  }
}
function Profile_Conditional_142_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Votre mot de passe est n\xE9cessaire pour supprimer le compte. ");
  }
}
var Profile = class _Profile {
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  profileExport = inject(ProfileExportService);
  messages = inject(MessageService);
  deleteFeedback = viewChild("deleteFeedback", ...ngDevMode ? [{ debugName: "deleteFeedback" }] : []);
  deleteDialog = viewChild("deleteDialog", ...ngDevMode ? [{ debugName: "deleteDialog" }] : []);
  busy = signal(null, ...ngDevMode ? [{ debugName: "busy" }] : []);
  deleteError = signal(null, ...ngDevMode ? [{ debugName: "deleteError" }] : []);
  exportFormat = signal("pdf", ...ngDevMode ? [{ debugName: "exportFormat" }] : []);
  initials = computed(() => (this.auth.user()?.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("") ?? "").toUpperCase(), ...ngDevMode ? [{ debugName: "initials" }] : []);
  profileForm = this.fb.nonNullable.group({
    name: [this.auth.user()?.name ?? "", NAME_VALIDATORS],
    email: [this.auth.user()?.email ?? "", [Validators.required, Validators.email, Validators.maxLength(320)]],
    current_password: ["", [Validators.required, Validators.maxLength(128)]]
  });
  passwordForm = this.fb.nonNullable.group({
    current_password: ["", [Validators.required, Validators.maxLength(128)]],
    new_password: ["", [Validators.required, ...PASSWORD_VALIDATORS]],
    confirmation: ["", Validators.required]
  });
  deleteForm = this.fb.nonNullable.group({
    current_password: ["", [Validators.required, Validators.maxLength(128)]],
    confirmed: [false, Validators.requiredTrue]
  });
  saveProfile() {
    if (this.busy())
      return;
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid)
      return;
    const value = this.profileForm.getRawValue();
    this.start("profile");
    this.auth.updateProfile(value.name.trim(), value.email.trim().toLowerCase(), value.current_password).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.busy.set(null))).subscribe({
      next: (user) => {
        this.profileForm.reset({ name: user.name, email: user.email ?? "", current_password: "" });
        this.success("Informations enregistr\xE9es", "Utilisez cette adresse email lors de votre prochaine connexion.");
      },
      error: (error) => {
        this.profileForm.controls.current_password.reset();
        this.failure("Enregistrement impossible", error);
      }
    });
  }
  savePassword() {
    if (this.busy())
      return;
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid)
      return;
    const value = this.passwordForm.getRawValue();
    if (value.new_password !== value.confirmation) {
      this.messages.add({ severity: "warn", summary: "V\xE9rifiez le mot de passe", detail: "Les deux nouveaux mots de passe doivent \xEAtre identiques.", life: 5e3 });
      return;
    }
    this.start("password");
    this.auth.changePassword(value.current_password, value.new_password).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.busy.set(null))).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.success("Mot de passe modifi\xE9", "Les sessions des autres appareils ne pourront plus \xEAtre renouvel\xE9es.");
      },
      error: (error) => {
        this.passwordForm.controls.current_password.reset();
        this.failure("Modification impossible", error);
      }
    });
  }
  openDeletion() {
    if (this.busy() || !this.auth.hasRole("citizen"))
      return;
    this.deleteForm.reset();
    this.deleteError.set(null);
    this.deleteDialog()?.nativeElement.showModal();
  }
  closeDeletion(event) {
    if (this.busy()) {
      event?.preventDefault();
      return;
    }
    this.deleteDialog()?.nativeElement.close();
    this.deleteForm.reset();
    this.deleteError.set(null);
  }
  deleteAccount() {
    if (this.busy() || !this.auth.hasRole("citizen"))
      return;
    this.deleteForm.markAllAsTouched();
    if (this.deleteForm.invalid)
      return;
    this.start("delete");
    this.deleteError.set(null);
    this.auth.deleteAccount(this.deleteForm.getRawValue().current_password).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.busy.set(null))).subscribe({
      next: () => {
        this.deleteDialog()?.nativeElement.close();
        this.router.navigate(["/auth/login"], { queryParams: { accountDeleted: "1" } });
      },
      error: (error) => {
        this.deleteForm.controls.current_password.reset();
        this.deleteError.set(this.message(error));
        afterNextRender(() => this.deleteFeedback()?.nativeElement.focus(), { injector: this.injector });
      }
    });
  }
  downloadPersonalData() {
    if (this.busy())
      return;
    const format = this.exportFormat();
    this.start("export");
    this.profileExport.exportPersonalData(format).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.busy.set(null))).subscribe({
      next: (response) => {
        this.saveFile(response, format);
        this.success("Export pr\xEAt", "Le t\xE9l\xE9chargement de vos donn\xE9es a commenc\xE9.");
      },
      error: (error) => {
        this.failure("Export impossible", error);
      }
    });
  }
  start(action) {
    this.busy.set(action);
  }
  success(summary, detail) {
    this.messages.add({ severity: "success", summary, detail, life: 4e3 });
  }
  failure(summary, error) {
    this.messages.add({ severity: "error", summary, detail: this.message(error), life: 5e3 });
  }
  saveFile(response, format) {
    const filename = response.headers.get("content-disposition")?.match(/filename="?([^";]+)"?/i)?.[1] ?? `mes-donnees.${format === "excel" ? "xlsx" : format === "word" ? "doc" : format}`;
    const url = URL.createObjectURL(response.body ?? new Blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
  message(error) {
    if (error instanceof HttpErrorResponse) {
      const messages = {
        IncorrectPasswordError: "Le mot de passe actuel est incorrect. R\xE9essayez.",
        PasswordReuseError: "Choisissez un mot de passe diff\xE9rent de votre mot de passe actuel.",
        AccountLockedError: "Trop de tentatives. Patientez quelques minutes avant de r\xE9essayer.",
        ForbiddenError: "Cette action n\u2019est pas autoris\xE9e pour votre compte."
      };
      if (messages[error.error?.error])
        return messages[error.error.error];
    }
    return apiErrorMessage(error);
  }
  static \u0275fac = function Profile_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Profile)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Profile, selectors: [["app-profile"]], viewQuery: function Profile_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.deleteFeedback, _c0, 5)(ctx.deleteDialog, _c1, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, features: [\u0275\u0275ProvidersFeature([MessageService])], decls: 152, vars: 43, consts: [["deleteDialog", ""], ["deleteFeedback", ""], [1, "mx-auto", "max-w-[78rem]"], [1, "mt-6", "flex", "flex-wrap", "gap-6"], [1, "grid", "min-w-0", "flex-[3_1_30rem]", "gap-6"], ["aria-labelledby", "identity-heading", 1, "profile-panel", "card", "mb-0"], [1, "mb-5", "flex", "items-start", "gap-3"], ["id", "identity-heading", 1, "m-0", "text-xl", "font-semibold"], [1, "mb-0", "mt-2", "text-muted-color"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "profile-fields", 3, "disabled"], [1, "grid", "gap-5", "sm:grid-cols-2"], ["for", "profile-name"], ["id", "profile-name", "formControlName", "name", "autocomplete", "name", "maxlength", "255", "required", "", "aria-describedby", "name-help name-error"], ["id", "name-help"], ["id", "name-error", 1, "text-red-700", "dark:text-red-300"], ["for", "profile-email"], ["id", "profile-email", "type", "email", "formControlName", "email", "autocomplete", "email", "maxlength", "320", "required", "", "aria-describedby", "email-help email-error"], ["id", "email-help"], ["id", "email-error", 1, "text-red-700", "dark:text-red-300"], [1, "mt-5"], ["for", "profile-password"], ["id", "profile-password", "type", "password", "formControlName", "current_password", "autocomplete", "current-password", "maxlength", "128", "required", "", "aria-describedby", "identity-password-help identity-password-error"], ["id", "identity-password-help"], ["id", "identity-password-error", 1, "text-red-700", "dark:text-red-300"], ["type", "submit", 1, "profile-button", "mt-6"], ["aria-hidden", "true"], ["aria-labelledby", "security-heading", 1, "profile-panel", "card", "mb-0"], ["id", "security-heading", 1, "m-0", "text-xl", "font-semibold"], ["for", "security-current"], ["id", "security-current", "type", "password", "formControlName", "current_password", "autocomplete", "current-password", "maxlength", "128", "required", "", "aria-describedby", "security-current-error"], ["id", "security-current-error", 1, "text-red-700", "dark:text-red-300"], [1, "mt-5", "grid", "gap-5", "sm:grid-cols-2"], ["for", "security-new"], ["id", "security-new", "type", "password", "formControlName", "new_password", "autocomplete", "new-password", "maxlength", "128", "required", "", "aria-describedby", "password-help security-new-error"], ["id", "security-new-error", 1, "text-red-700", "dark:text-red-300"], ["for", "security-confirm"], ["id", "security-confirm", "type", "password", "formControlName", "confirmation", "autocomplete", "new-password", "maxlength", "128", "required", "", "aria-describedby", "security-confirm-error"], ["id", "security-confirm-error", 1, "text-red-700", "dark:text-red-300"], ["id", "password-help", 1, "mt-3", "block"], ["aria-labelledby", "delete-heading", 1, "profile-panel", "card", "mb-0", "border", "border-red-200", "dark:border-red-900"], ["aria-labelledby", "account-info-heading", 1, "profile-panel", "card", "mb-0", "h-fit", "min-w-0", "flex-[1_1_18rem]"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-emphasis", "px-3", "py-2", "text-sm"], ["aria-hidden", "true", 1, "h-2", "w-2", "rounded-full", "bg-emerald-500"], ["id", "account-info-heading", 1, "mb-5", "mt-5", "text-lg", "font-semibold"], [1, "grid", "gap-5"], [1, "text-sm", "text-muted-color"], [1, "m-0", "mt-1", "font-semibold"], [1, "m-0", "mt-1", "break-all"], [1, "m-0", "mt-1"], [1, "mb-0", "mt-6", "border-t", "border-surface", "pt-5", "text-sm", "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-lock", "mr-1"], ["aria-labelledby", "export-heading", 1, "profile-export-side"], [1, "flex", "items-center", "gap-2"], ["aria-hidden", "true", 1, "pi", "pi-download", "text-primary"], ["id", "export-heading", 1, "m-0", "text-base", "font-semibold"], [1, "mb-3", "mt-2", "text-sm", "text-muted-color"], ["for", "export-format", 1, "sr-only"], ["id", "export-format", 3, "change", "value", "disabled"], ["value", "pdf"], ["value", "csv"], ["value", "excel"], ["value", "word"], ["type", "button", 1, "profile-button", "export-button", "mt-3", 3, "click", "disabled"], ["id", "export-help", 1, "profile-export-help"], ["aria-labelledby", "confirm-heading", "aria-describedby", "confirm-description", 1, "profile-dialog", 3, "cancel"], ["id", "confirm-heading", 1, "mt-0", "text-2xl", "font-bold"], ["id", "confirm-description"], ["tabindex", "-1", "role", "alert", 1, "text-red-700", "dark:text-red-300"], ["for", "delete-password"], ["id", "delete-password", "type", "password", "formControlName", "current_password", "autocomplete", "current-password", "maxlength", "128", "required", "", "aria-describedby", "delete-password-error"], ["id", "delete-password-error", 1, "text-red-700", "dark:text-red-300"], [1, "mt-5", "flex", "items-start", "gap-3"], ["type", "checkbox", "formControlName", "confirmed", 1, "mt-1", "shrink-0"], [1, "mt-6", "flex", "flex-wrap", "justify-end", "gap-3"], ["type", "button", "autofocus", "", 1, "profile-button", "secondary", 3, "click"], ["id", "confirm-deletion", "type", "submit", 1, "profile-button", "danger", 3, "disabled"], ["id", "delete-heading", 1, "m-0", "text-xl", "font-semibold"], [1, "text-muted-color"], ["id", "open-deletion", "type", "button", 1, "profile-button", "danger", 3, "click", "disabled"]], template: function Profile_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2);
      \u0275\u0275element(1, "p-toast");
      \u0275\u0275elementStart(2, "div", 3)(3, "div", 4)(4, "section", 5)(5, "div", 6)(6, "div")(7, "h2", 7);
      \u0275\u0275text(8, "Mes informations");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 8);
      \u0275\u0275text(10, "Gardez votre nom et votre adresse de connexion \xE0 jour.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "form", 9);
      \u0275\u0275listener("ngSubmit", function Profile_Template_form_ngSubmit_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.saveProfile());
      });
      \u0275\u0275elementStart(12, "fieldset", 10)(13, "div", 11)(14, "div")(15, "label", 12);
      \u0275\u0275text(16, "Nom et pr\xE9nom");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 13);
      \u0275\u0275elementStart(18, "small", 14);
      \u0275\u0275text(19, "De 1 \xE0 255 caract\xE8res.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p", 15);
      \u0275\u0275conditionalCreate(21, Profile_Conditional_21_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div")(23, "label", 16);
      \u0275\u0275text(24, "Adresse email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 17);
      \u0275\u0275elementStart(26, "small", 18);
      \u0275\u0275text(27, "Elle sert \xE0 vous connecter \xE0 votre espace.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 19);
      \u0275\u0275conditionalCreate(29, Profile_Conditional_29_Template, 1, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 20)(31, "label", 21);
      \u0275\u0275text(32, "Mot de passe actuel");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "input", 22);
      \u0275\u0275elementStart(34, "small", 23);
      \u0275\u0275text(35, "Pour confirmer que ces changements viennent bien de vous.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p", 24);
      \u0275\u0275conditionalCreate(37, Profile_Conditional_37_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "button", 25);
      \u0275\u0275element(39, "i", 26);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "section", 27)(42, "div", 6)(43, "div")(44, "h2", 28);
      \u0275\u0275text(45, "Mon mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 8);
      \u0275\u0275text(47, "Choisissez un mot de passe que vous utilisez uniquement ici.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "form", 9);
      \u0275\u0275listener("ngSubmit", function Profile_Template_form_ngSubmit_48_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.savePassword());
      });
      \u0275\u0275elementStart(49, "fieldset", 10)(50, "div")(51, "label", 29);
      \u0275\u0275text(52, "Mot de passe actuel");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "input", 30);
      \u0275\u0275elementStart(54, "p", 31);
      \u0275\u0275conditionalCreate(55, Profile_Conditional_55_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "div", 32)(57, "div")(58, "label", 33);
      \u0275\u0275text(59, "Nouveau mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275element(60, "input", 34);
      \u0275\u0275elementStart(61, "p", 35);
      \u0275\u0275conditionalCreate(62, Profile_Conditional_62_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div")(64, "label", 36);
      \u0275\u0275text(65, "Confirmer le nouveau mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275element(66, "input", 37);
      \u0275\u0275elementStart(67, "p", 38);
      \u0275\u0275conditionalCreate(68, Profile_Conditional_68_Template, 1, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(69, "small", 39);
      \u0275\u0275text(70, "10 \xE0 128 caract\xE8res, avec une majuscule, une minuscule et un chiffre.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 25);
      \u0275\u0275element(72, "i", 26);
      \u0275\u0275text(73);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(74, Profile_Conditional_74_Template, 9, 1, "section", 40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "aside", 41)(76, "span", 42);
      \u0275\u0275element(77, "span", 43);
      \u0275\u0275text(78, " Session connect\xE9e");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "h2", 44);
      \u0275\u0275text(80, "Mon compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "dl", 45)(82, "div")(83, "dt", 46);
      \u0275\u0275text(84, "Nom et pr\xE9nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "dd", 47);
      \u0275\u0275text(86);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(87, "div")(88, "dt", 46);
      \u0275\u0275text(89, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "dd", 48);
      \u0275\u0275text(91);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(92, "div")(93, "dt", 46);
      \u0275\u0275text(94, "Profil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "dd", 49);
      \u0275\u0275text(96);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(97, "div")(98, "dt", 46);
      \u0275\u0275text(99, "Membre depuis le");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "dd", 49);
      \u0275\u0275text(101);
      \u0275\u0275pipe(102, "date");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(103, "p", 50);
      \u0275\u0275element(104, "i", 51);
      \u0275\u0275text(105, " Votre r\xF4le et vos autorisations sont g\xE9r\xE9s par la mairie.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "section", 52)(107, "div", 53);
      \u0275\u0275element(108, "i", 54);
      \u0275\u0275elementStart(109, "h3", 55);
      \u0275\u0275text(110, "Exporter mes donn\xE9es");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(111, "p", 56);
      \u0275\u0275text(112, "Informations de compte, pr\xE9f\xE9rences et demandes personnelles.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "label", 57);
      \u0275\u0275text(114, "Format du fichier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "select", 58);
      \u0275\u0275listener("change", function Profile_Template_select_change_115_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportFormat.set($event.target.value));
      });
      \u0275\u0275elementStart(116, "option", 59);
      \u0275\u0275text(117, "PDF");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "option", 60);
      \u0275\u0275text(119, "CSV");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "option", 61);
      \u0275\u0275text(121, "Excel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "option", 62);
      \u0275\u0275text(123, "Word");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(124, "button", 63);
      \u0275\u0275listener("click", function Profile_Template_button_click_124_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadPersonalData());
      });
      \u0275\u0275element(125, "i", 26);
      \u0275\u0275text(126);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(127, "small", 64);
      \u0275\u0275text(128, "Vos mots de passe et jetons ne sont jamais inclus.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(129, "dialog", 65, 0);
      \u0275\u0275listener("cancel", function Profile_Template_dialog_cancel_129_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDeletion($event));
      });
      \u0275\u0275elementStart(131, "h2", 66);
      \u0275\u0275text(132, "Supprimer mon compte ?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(133, "p", 67);
      \u0275\u0275text(134, " Vous perdrez l\u2019acc\xE8s \xE0 votre espace. Votre nom, votre email de connexion et vos sessions seront retir\xE9s du compte. Les demandes d\xE9j\xE0 transmises \xE0 la mairie conserveront leur contenu et leur suivi sous l\u2019identit\xE9 \xAB Compte supprim\xE9 \xBB. ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(135, Profile_Conditional_135_Template, 3, 1, "p", 68);
      \u0275\u0275elementStart(136, "form", 9);
      \u0275\u0275listener("ngSubmit", function Profile_Template_form_ngSubmit_136_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.deleteAccount());
      });
      \u0275\u0275elementStart(137, "fieldset", 10)(138, "label", 69);
      \u0275\u0275text(139, "Votre mot de passe actuel");
      \u0275\u0275elementEnd();
      \u0275\u0275element(140, "input", 70);
      \u0275\u0275elementStart(141, "p", 71);
      \u0275\u0275conditionalCreate(142, Profile_Conditional_142_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(143, "label", 72);
      \u0275\u0275element(144, "input", 73);
      \u0275\u0275elementStart(145, "span");
      \u0275\u0275text(146, "Je comprends que la suppression de mon compte est d\xE9finitive.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(147, "div", 74)(148, "button", 75);
      \u0275\u0275listener("click", function Profile_Template_button_click_148_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDeletion());
      });
      \u0275\u0275text(149, "Garder mon compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "button", 76);
      \u0275\u0275text(151);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_22_0;
      let tmp_23_0;
      let tmp_25_0;
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.profileForm);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !!ctx.busy());
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-invalid", ctx.profileForm.controls.name.touched && ctx.profileForm.controls.name.invalid);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.profileForm.controls.name.touched && ctx.profileForm.controls.name.invalid ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-invalid", ctx.profileForm.controls.email.touched && ctx.profileForm.controls.email.invalid);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.profileForm.controls.email.touched && ctx.profileForm.controls.email.invalid ? 29 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-invalid", ctx.profileForm.controls.current_password.touched && ctx.profileForm.controls.current_password.invalid);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.profileForm.controls.current_password.touched && ctx.profileForm.controls.current_password.invalid ? 37 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.busy() === "profile" ? "pi pi-spin pi-spinner" : "pi pi-check");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.busy() === "profile" ? "Enregistrement\u2026" : "Enregistrer mes informations", " ");
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.passwordForm);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !!ctx.busy());
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-invalid", ctx.passwordForm.controls.current_password.touched && ctx.passwordForm.controls.current_password.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.passwordForm.controls.current_password.touched && ctx.passwordForm.controls.current_password.invalid ? 55 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-invalid", ctx.passwordForm.controls.new_password.touched && ctx.passwordForm.controls.new_password.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.passwordForm.controls.new_password.touched && ctx.passwordForm.controls.new_password.invalid ? 62 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-invalid", ctx.passwordForm.controls.confirmation.touched && ctx.passwordForm.controls.confirmation.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.passwordForm.controls.confirmation.touched && ctx.passwordForm.controls.confirmation.invalid ? 68 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classMap(ctx.busy() === "password" ? "pi pi-spin pi-spinner" : "pi pi-lock");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.busy() === "password" ? "Modification\u2026" : "Modifier mon mot de passe", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.hasRole("citizen") ? 74 : -1);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate((tmp_22_0 = ctx.auth.user()) == null ? null : tmp_22_0.name);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((tmp_23_0 = ctx.auth.user()) == null ? null : tmp_23_0.email);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.auth.roleLabel());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(102, 40, (tmp_25_0 = ctx.auth.user()) == null ? null : tmp_25_0.created_at, "d MMMM yyyy"));
      \u0275\u0275advance(14);
      \u0275\u0275property("value", ctx.exportFormat())("disabled", !!ctx.busy());
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", !!ctx.busy());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.busy() === "export" ? "pi pi-spin pi-spinner" : "pi pi-download");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.busy() === "export" ? "Pr\xE9paration\u2026" : "Exporter (" + ctx.exportFormat().toUpperCase() + ")", " ");
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.deleteError() ? 135 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.deleteForm);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !!ctx.busy());
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-invalid", ctx.deleteForm.controls.current_password.touched && ctx.deleteForm.controls.current_password.invalid);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.deleteForm.controls.current_password.touched && ctx.deleteForm.controls.current_password.invalid ? 142 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.deleteForm.invalid);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.busy() === "delete" ? "Suppression\u2026" : "Supprimer mon compte");
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, FormGroupDirective, FormControlName, ToastModule, Toast, DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.profile-hero[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      120deg,\n      color-mix(in srgb, var(--p-primary-color) 15%, var(--surface-card)),\n      var(--surface-card));\n  border: 1px solid var(--surface-border);\n}\n.profile-panel[_ngcontent-%COMP%], \n.profile-hero[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_profile-in 250ms ease-out both;\n}\n.profile-fields[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\ninput[_ngcontent-%COMP%]:not([type=checkbox]) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.65rem;\n  padding: 0.85rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n  font: inherit;\n}\nselect[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.65rem;\n  padding: 0.85rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n  font: inherit;\n}\ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible, \na[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--p-primary-color);\n  outline-offset: 3px;\n}\nsmall[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  color: var(--text-color-secondary);\n}\n.profile-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 0.85rem 1.2rem;\n  border: 1px solid transparent;\n  border-radius: 0.7rem;\n  background: var(--p-primary-color);\n  color: var(--p-primary-contrast-color);\n  font: inherit;\n  font-weight: 600;\n  transition: opacity 160ms;\n  cursor: pointer;\n}\n.profile-button.danger[_ngcontent-%COMP%] {\n  background: var(--p-red-700);\n  color: white;\n}\n.profile-button.secondary[_ngcontent-%COMP%] {\n  background: var(--surface-card);\n  border-color: var(--surface-border);\n  color: var(--text-color);\n}\nbutton[_ngcontent-%COMP%]:disabled, \nfieldset[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n}\n.profile-notice[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, var(--p-primary-color) 12%, var(--surface-card));\n}\n.profile-export-side[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding-top: 1.25rem;\n  border-top: 1px solid var(--surface-border);\n}\n.profile-export-side[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.profile-export-side[_ngcontent-%COMP%]   .export-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.profile-export-help[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.profile-dialog[_ngcontent-%COMP%] {\n  margin: auto;\n  width: min(36rem, 100vw - 2rem);\n  max-height: calc(100dvh - 2rem);\n  overflow: auto;\n  padding: 1.5rem;\n  border: 1px solid var(--surface-border);\n  border-radius: 1rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n}\n.profile-dialog[_ngcontent-%COMP%]::backdrop {\n  background: rgba(0, 0, 0, 0.5);\n}\n@keyframes _ngcontent-%COMP%_profile-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .profile-panel[_ngcontent-%COMP%], \n   .profile-hero[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .profile-button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n@media (max-width: 480px) {\n  .profile-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=profile.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Profile, [{
    type: Component,
    args: [{ selector: "app-profile", imports: [DatePipe, ReactiveFormsModule, ToastModule], providers: [MessageService], template: `<div class="mx-auto max-w-[78rem]">
    <p-toast />

    <div class="mt-6 flex flex-wrap gap-6">
        <div class="grid min-w-0 flex-[3_1_30rem] gap-6">
            <section class="profile-panel card mb-0" aria-labelledby="identity-heading">
                <div class="mb-5 flex items-start gap-3">
                    <div>
                        <h2 id="identity-heading" class="m-0 text-xl font-semibold">Mes informations</h2>
                        <p class="mb-0 mt-2 text-muted-color">Gardez votre nom et votre adresse de connexion \xE0 jour.</p>
                    </div>
                </div>
                <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" novalidate>
                    <fieldset [disabled]="!!busy()" class="profile-fields">
                        <div class="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label for="profile-name">Nom et pr\xE9nom</label
                                ><input id="profile-name" formControlName="name" autocomplete="name" maxlength="255" required [attr.aria-invalid]="profileForm.controls.name.touched && profileForm.controls.name.invalid" aria-describedby="name-help name-error" />
                                <small id="name-help">De 1 \xE0 255 caract\xE8res.</small>
                                <p id="name-error" class="text-red-700 dark:text-red-300">
                                    @if (profileForm.controls.name.touched && profileForm.controls.name.invalid) {
                                        Indiquez votre nom et pr\xE9nom.
                                    }
                                </p>
                            </div>
                            <div>
                                <label for="profile-email">Adresse email</label
                                ><input
                                    id="profile-email"
                                    type="email"
                                    formControlName="email"
                                    autocomplete="email"
                                    maxlength="320"
                                    required
                                    [attr.aria-invalid]="profileForm.controls.email.touched && profileForm.controls.email.invalid"
                                    aria-describedby="email-help email-error"
                                />
                                <small id="email-help">Elle sert \xE0 vous connecter \xE0 votre espace.</small>
                                <p id="email-error" class="text-red-700 dark:text-red-300">
                                    @if (profileForm.controls.email.touched && profileForm.controls.email.invalid) {
                                        Indiquez une adresse email valide.
                                    }
                                </p>
                            </div>
                        </div>
                        <div class="mt-5">
                            <label for="profile-password">Mot de passe actuel</label
                            ><input id="profile-password" type="password" formControlName="current_password" autocomplete="current-password" maxlength="128" required aria-describedby="identity-password-help identity-password-error" [attr.aria-invalid]="profileForm.controls.current_password.touched && profileForm.controls.current_password.invalid" />
                            <small id="identity-password-help">Pour confirmer que ces changements viennent bien de vous.</small>
                            <p id="identity-password-error" class="text-red-700 dark:text-red-300">
                                @if (profileForm.controls.current_password.touched && profileForm.controls.current_password.invalid) {
                                    Saisissez votre mot de passe actuel.
                                }
                            </p>
                        </div>
                        <button class="profile-button mt-6" type="submit">
                            <i [class]="busy() === 'profile' ? 'pi pi-spin pi-spinner' : 'pi pi-check'" aria-hidden="true"></i>{{ busy() === 'profile' ? 'Enregistrement\u2026' : 'Enregistrer mes informations' }}
                        </button>
                    </fieldset>
                </form>
            </section>

            <section class="profile-panel card mb-0" aria-labelledby="security-heading">
                <div class="mb-5 flex items-start gap-3">
                    <div>
                        <h2 id="security-heading" class="m-0 text-xl font-semibold">Mon mot de passe</h2>
                        <p class="mb-0 mt-2 text-muted-color">Choisissez un mot de passe que vous utilisez uniquement ici.</p>
                    </div>
                </div>
                <form [formGroup]="passwordForm" (ngSubmit)="savePassword()" novalidate>
                    <fieldset [disabled]="!!busy()" class="profile-fields">
                        <div>
                            <label for="security-current">Mot de passe actuel</label><input id="security-current" type="password" formControlName="current_password" autocomplete="current-password" maxlength="128" required aria-describedby="security-current-error" [attr.aria-invalid]="passwordForm.controls.current_password.touched && passwordForm.controls.current_password.invalid" />
                            <p id="security-current-error" class="text-red-700 dark:text-red-300">
                                @if (passwordForm.controls.current_password.touched && passwordForm.controls.current_password.invalid) {
                                    Saisissez votre mot de passe actuel.
                                }
                            </p>
                        </div>
                        <div class="mt-5 grid gap-5 sm:grid-cols-2">
                            <div>
                                <label for="security-new">Nouveau mot de passe</label><input id="security-new" type="password" formControlName="new_password" autocomplete="new-password" maxlength="128" required aria-describedby="password-help security-new-error" [attr.aria-invalid]="passwordForm.controls.new_password.touched && passwordForm.controls.new_password.invalid" />
                                <p id="security-new-error" class="text-red-700 dark:text-red-300">
                                    @if (passwordForm.controls.new_password.touched && passwordForm.controls.new_password.invalid) {
                                        Le mot de passe doit respecter les crit\xE8res ci-dessous.
                                    }
                                </p>
                            </div>
                            <div>
                                <label for="security-confirm">Confirmer le nouveau mot de passe</label><input id="security-confirm" type="password" formControlName="confirmation" autocomplete="new-password" maxlength="128" required aria-describedby="security-confirm-error" [attr.aria-invalid]="passwordForm.controls.confirmation.touched && passwordForm.controls.confirmation.invalid" />
                                <p id="security-confirm-error" class="text-red-700 dark:text-red-300">
                                    @if (passwordForm.controls.confirmation.touched && passwordForm.controls.confirmation.invalid) {
                                        Confirmez votre nouveau mot de passe.
                                    }
                                </p>
                            </div>
                        </div>
                        <small id="password-help" class="mt-3 block">10 \xE0 128 caract\xE8res, avec une majuscule, une minuscule et un chiffre.</small>
                        <button class="profile-button mt-6" type="submit">
                            <i [class]="busy() === 'password' ? 'pi pi-spin pi-spinner' : 'pi pi-lock'" aria-hidden="true"></i>{{ busy() === 'password' ? 'Modification\u2026' : 'Modifier mon mot de passe' }}
                        </button>
                    </fieldset>
                </form>
            </section>

            @if (auth.hasRole('citizen')) {
                <section class="profile-panel card mb-0 border border-red-200 dark:border-red-900" aria-labelledby="delete-heading">
                    <h2 id="delete-heading" class="m-0 text-xl font-semibold">Supprimer mon compte</h2>
                    <p>Vous pouvez quitter le portail quand vous le souhaitez. Votre compte et ses acc\xE8s seront supprim\xE9s d\xE9finitivement.</p>
                    <p class="text-muted-color">Vos demandes resteront dans les dossiers de la mairie sous l\u2019identit\xE9 \xAB Compte supprim\xE9 \xBB. Leur contenu et leur suivi seront conserv\xE9s.</p>
                    <button id="open-deletion" type="button" class="profile-button danger" [disabled]="!!busy()" (click)="openDeletion()">Supprimer mon compte</button>
                </section>
            }
        </div>

        <aside class="profile-panel card mb-0 h-fit min-w-0 flex-[1_1_18rem]" aria-labelledby="account-info-heading">
            <span class="inline-flex items-center gap-2 rounded-full bg-emphasis px-3 py-2 text-sm"><span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span> Session connect\xE9e</span>
            <h2 id="account-info-heading" class="mb-5 mt-5 text-lg font-semibold">Mon compte</h2>
            <dl class="grid gap-5">
                <div>
                    <dt class="text-sm text-muted-color">Nom et pr\xE9nom</dt>
                    <dd class="m-0 mt-1 font-semibold">{{ auth.user()?.name }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-muted-color">Email</dt>
                    <dd class="m-0 mt-1 break-all">{{ auth.user()?.email }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-muted-color">Profil</dt>
                    <dd class="m-0 mt-1">{{ auth.roleLabel() }}</dd>
                </div>
                <div>
                    <dt class="text-sm text-muted-color">Membre depuis le</dt>
                    <dd class="m-0 mt-1">{{ auth.user()?.created_at | date: 'd MMMM yyyy' }}</dd>
                </div>
            </dl>
            <p class="mb-0 mt-6 border-t border-surface pt-5 text-sm text-muted-color"><i class="pi pi-lock mr-1" aria-hidden="true"></i> Votre r\xF4le et vos autorisations sont g\xE9r\xE9s par la mairie.</p>
            <section class="profile-export-side" aria-labelledby="export-heading">
                <div class="flex items-center gap-2">
                    <i class="pi pi-download text-primary" aria-hidden="true"></i>
                    <h3 id="export-heading" class="m-0 text-base font-semibold">Exporter mes donn\xE9es</h3>
                </div>
                <p class="mb-3 mt-2 text-sm text-muted-color">Informations de compte, pr\xE9f\xE9rences et demandes personnelles.</p>
                <label class="sr-only" for="export-format">Format du fichier</label>
                <select id="export-format" [value]="exportFormat()" [disabled]="!!busy()" (change)="exportFormat.set($any($event.target).value)">
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="word">Word</option>
                </select>
                <button type="button" class="profile-button export-button mt-3" [disabled]="!!busy()" (click)="downloadPersonalData()">
                    <i [class]="busy() === 'export' ? 'pi pi-spin pi-spinner' : 'pi pi-download'" aria-hidden="true"></i>{{ busy() === 'export' ? 'Pr\xE9paration\u2026' : 'Exporter (' + exportFormat().toUpperCase() + ')' }}
                </button>
                <small id="export-help" class="profile-export-help">Vos mots de passe et jetons ne sont jamais inclus.</small>
            </section>
        </aside>
    </div>

    <dialog #deleteDialog class="profile-dialog" aria-labelledby="confirm-heading" aria-describedby="confirm-description" (cancel)="closeDeletion($event)">
        <h2 id="confirm-heading" class="mt-0 text-2xl font-bold">Supprimer mon compte ?</h2>
        <p id="confirm-description">
            Vous perdrez l\u2019acc\xE8s \xE0 votre espace. Votre nom, votre email de connexion et vos sessions seront retir\xE9s du compte. Les demandes d\xE9j\xE0 transmises \xE0 la mairie conserveront leur contenu et leur suivi sous l\u2019identit\xE9 \xAB Compte supprim\xE9 \xBB.
        </p>
        @if (deleteError()) {
            <p #deleteFeedback tabindex="-1" role="alert" class="text-red-700 dark:text-red-300">{{ deleteError() }}</p>
        }
        <form [formGroup]="deleteForm" (ngSubmit)="deleteAccount()" novalidate>
            <fieldset [disabled]="!!busy()" class="profile-fields">
                <label for="delete-password">Votre mot de passe actuel</label><input id="delete-password" type="password" formControlName="current_password" autocomplete="current-password" maxlength="128" required aria-describedby="delete-password-error" [attr.aria-invalid]="deleteForm.controls.current_password.touched && deleteForm.controls.current_password.invalid" />
                <p id="delete-password-error" class="text-red-700 dark:text-red-300">
                    @if (deleteForm.controls.current_password.touched && deleteForm.controls.current_password.invalid) {
                        Votre mot de passe est n\xE9cessaire pour supprimer le compte.
                    }
                </p>
                <label class="mt-5 flex items-start gap-3"><input class="mt-1 shrink-0" type="checkbox" formControlName="confirmed" /><span>Je comprends que la suppression de mon compte est d\xE9finitive.</span></label>
                <div class="mt-6 flex flex-wrap justify-end gap-3">
                    <button type="button" class="profile-button secondary" (click)="closeDeletion()" autofocus>Garder mon compte</button>
                    <button id="confirm-deletion" type="submit" class="profile-button danger" [disabled]="deleteForm.invalid">{{ busy() === 'delete' ? 'Suppression\u2026' : 'Supprimer mon compte' }}</button>
                </div>
            </fieldset>
        </form>
    </dialog>
</div>
`, styles: ["/* src/app/auth/profile/profile.scss */\n:host {\n  display: block;\n}\n.profile-hero {\n  background:\n    linear-gradient(\n      120deg,\n      color-mix(in srgb, var(--p-primary-color) 15%, var(--surface-card)),\n      var(--surface-card));\n  border: 1px solid var(--surface-border);\n}\n.profile-panel,\n.profile-hero {\n  animation: profile-in 250ms ease-out both;\n}\n.profile-fields {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\nlabel {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\ninput:not([type=checkbox]) {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.65rem;\n  padding: 0.85rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n  font: inherit;\n}\nselect {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.65rem;\n  padding: 0.85rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n  font: inherit;\n}\ninput:focus-visible,\nselect:focus-visible,\nbutton:focus-visible,\na:focus-visible {\n  outline: 3px solid var(--p-primary-color);\n  outline-offset: 3px;\n}\nsmall {\n  display: block;\n  margin-top: 0.5rem;\n  color: var(--text-color-secondary);\n}\n.profile-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  padding: 0.85rem 1.2rem;\n  border: 1px solid transparent;\n  border-radius: 0.7rem;\n  background: var(--p-primary-color);\n  color: var(--p-primary-contrast-color);\n  font: inherit;\n  font-weight: 600;\n  transition: opacity 160ms;\n  cursor: pointer;\n}\n.profile-button.danger {\n  background: var(--p-red-700);\n  color: white;\n}\n.profile-button.secondary {\n  background: var(--surface-card);\n  border-color: var(--surface-border);\n  color: var(--text-color);\n}\nbutton:disabled,\nfieldset:disabled {\n  opacity: 0.65;\n}\nbutton:disabled {\n  cursor: wait;\n}\n.profile-notice {\n  background: color-mix(in srgb, var(--p-primary-color) 12%, var(--surface-card));\n}\n.profile-export-side {\n  margin-top: 1.5rem;\n  padding-top: 1.25rem;\n  border-top: 1px solid var(--surface-border);\n}\n.profile-export-side select,\n.profile-export-side .export-button {\n  width: 100%;\n}\n.profile-export-help {\n  margin-top: 1rem;\n}\n.profile-dialog {\n  margin: auto;\n  width: min(36rem, 100vw - 2rem);\n  max-height: calc(100dvh - 2rem);\n  overflow: auto;\n  padding: 1.5rem;\n  border: 1px solid var(--surface-border);\n  border-radius: 1rem;\n  background: var(--surface-card);\n  color: var(--text-color);\n}\n.profile-dialog::backdrop {\n  background: rgba(0, 0, 0, 0.5);\n}\n@keyframes profile-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .profile-panel,\n  .profile-hero {\n    animation: none;\n  }\n  .profile-button {\n    transition: none;\n  }\n}\n@media (max-width: 480px) {\n  .profile-button {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=profile.css.map */\n"] }]
  }], null, { deleteFeedback: [{ type: ViewChild, args: ["deleteFeedback", { isSignal: true }] }], deleteDialog: [{ type: ViewChild, args: ["deleteDialog", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Profile, { className: "Profile", filePath: "src/app/auth/profile/profile.ts", lineNumber: 23 });
})();
export {
  Profile
};
//# sourceMappingURL=chunk-DOKS55VR.js.map
