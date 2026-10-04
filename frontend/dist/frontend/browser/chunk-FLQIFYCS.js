import {
  SortIcon,
  SortableColumn,
  Table,
  TableModule
} from "./chunk-GD36EOZK.js";
import {
  ConfirmDialog,
  ConfirmDialogModule
} from "./chunk-YTW5QXAE.js";
import "./chunk-SULZIKH5.js";
import {
  IconField,
  IconFieldModule,
  InputIcon,
  InputIconModule,
  InputText,
  InputTextModule
} from "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import "./chunk-OUQ4VYAJ.js";
import {
  Toast,
  ToastModule
} from "./chunk-BBCFJD72.js";
import "./chunk-VCWXY23E.js";
import "./chunk-5UENDHV5.js";
import {
  Tag,
  TagModule
} from "./chunk-EMZ2UMTV.js";
import {
  Dialog,
  DialogModule
} from "./chunk-ZWCF3HLH.js";
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  Button,
  ButtonDirective,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  UserService,
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  DefaultValueAccessor,
  EmailValidator,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-BX45OWY6.js";
import {
  ConfirmationService,
  MessageService
} from "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// src/app/users/users.ts
var _c0 = () => ({ width: "min(28rem, 95vw)" });
var _c1 = () => ({ "min-width": "42rem" });
var _c2 = () => ({ width: "min(34rem, 95vw)" });
var _c3 = () => ({ width: "min(32rem, 95vw)" });
function Users_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 31);
    \u0275\u0275text(2, "Citoyen ");
    \u0275\u0275element(3, "p-sortIcon", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "th", 33);
    \u0275\u0275text(5, "Email ");
    \u0275\u0275element(6, "p-sortIcon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\xC9tat du compte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 35);
    \u0275\u0275text(10, "Inscription ");
    \u0275\u0275element(11, "p-sortIcon", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 37);
    \u0275\u0275text(13, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Users_ng_template_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 39);
  }
}
function Users_ng_template_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 40);
  }
}
function Users_ng_template_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 46);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Conditional_15_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r5);
      const user_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmActivationChange(user_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "D\xE9sactiver le compte de " + user_r3.name);
  }
}
function Users_ng_template_19_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 47);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Conditional_16_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r6);
      const user_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmActivationChange(user_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Activer le compte de " + user_r3.name);
  }
}
function Users_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, Users_ng_template_19_Conditional_6_Template, 1, 0, "p-tag", 39)(7, Users_ng_template_19_Conditional_7_Template, 1, 0, "p-tag", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "div", 41)(13, "p-button", 42);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Template_p_button_onClick_13_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openDetails(user_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p-button", 43);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Template_p_button_onClick_14_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openEdit(user_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, Users_ng_template_19_Conditional_15_Template, 1, 3, "p-button", 44)(16, Users_ng_template_19_Conditional_16_Template, 1, 3, "p-button", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275classProp("opacity-60", !user_r3.is_active);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r3.is_active ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 13, user_r3.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Voir le compte de " + user_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Modifier le profil de " + user_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r3.is_active ? 15 : 16);
  }
}
function Users_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 48);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.searchText ? "Aucun compte citoyen ne correspond \xE0 cette recherche." : "Aucun compte citoyen \xE0 afficher.", " ");
  }
}
function Users_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 19)(1, "div")(2, "dt", 49);
    \u0275\u0275text(3, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd", 50);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "dt", 49);
    \u0275\u0275text(8, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd", 50);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "dt", 49);
    \u0275\u0275text(13, "\xC9tat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 51);
    \u0275\u0275element(15, "p-tag", 52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "dt", 49);
    \u0275\u0275text(18, "Inscription");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd", 51);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r7 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r7.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(user_r7.email);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", user_r7.is_active ? "Actif" : "D\xE9sactiv\xE9")("severity", user_r7.is_active ? "success" : "danger");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(21, 5, user_r7.created_at, "dd/MM/yyyy HH:mm"));
  }
}
function Users_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "Le formulaire contient des erreurs : corrigez les champs signal\xE9s.");
    \u0275\u0275elementEnd();
  }
}
function Users_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Le nom est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Users_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const emailModel_r9 = \u0275\u0275reference(42);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(emailModel_r9.hasError("required") ? "L\u2019email est obligatoire." : "Saisissez une adresse email valide.");
  }
}
function Users_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function Users_ng_template_45_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.editVisible.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 54);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r3.saving())("disabled", ctx_r3.saving());
  }
}
var Users = class _Users {
  userService = inject(UserService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  detailsVisible = signal(false, ...ngDevMode ? [{ debugName: "detailsVisible" }] : []);
  editVisible = signal(false, ...ngDevMode ? [{ debugName: "editVisible" }] : []);
  selectedUser = signal(null, ...ngDevMode ? [{ debugName: "selectedUser" }] : []);
  searchText = "";
  form = { name: "", email: "" };
  constructor() {
    this.loadUsers();
  }
  loadUsers(search = this.searchText) {
    this.loading.set(true);
    this.userService.list(search).subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.showError(error);
      }
    });
  }
  openDetails(user) {
    this.selectedUser.set(user);
    this.detailsVisible.set(true);
    this.userService.get(user.id).subscribe({
      next: (account) => this.selectedUser.set(account),
      error: (error) => this.showError(error)
    });
  }
  openEdit(user) {
    this.selectedUser.set(user);
    this.form = { name: user.name, email: user.email };
    this.editVisible.set(true);
  }
  save(form) {
    const user = this.selectedUser();
    if (!user || this.saving())
      return;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.userService.update(user.id, this.form).subscribe({
      next: (saved) => {
        this.replaceUser(saved);
        this.saving.set(false);
        this.editVisible.set(false);
        this.messageService.add({ severity: "success", summary: "Compte modifi\xE9", detail: "Les informations du compte ont \xE9t\xE9 enregistr\xE9es." });
      },
      error: (error) => {
        this.saving.set(false);
        this.showError(error);
      }
    });
  }
  confirmActivationChange(user) {
    const action = user.is_active ? "D\xE9sactiver" : "Activer";
    this.confirmationService.confirm({
      header: `${action} le compte`,
      message: `Voulez-vous ${action.toLowerCase()} le compte de ${user.name} ?`,
      icon: "pi pi-exclamation-triangle",
      acceptLabel: action,
      rejectLabel: "Annuler",
      acceptButtonProps: { severity: user.is_active ? "danger" : "success" },
      rejectButtonProps: { severity: "secondary", outlined: true },
      accept: () => this.setActivation(user, !user.is_active)
    });
  }
  setActivation(user, is_active) {
    this.userService.update(user.id, { is_active }).subscribe({
      next: (saved) => {
        this.replaceUser(saved);
        this.messageService.add({
          severity: "success",
          summary: is_active ? "Compte activ\xE9" : "Compte d\xE9sactiv\xE9",
          detail: `${saved.name} peut ${is_active ? "\xE0 nouveau" : "ne peut plus"} acc\xE9der \xE0 son compte.`
        });
      },
      error: (error) => this.showError(error)
    });
  }
  replaceUser(saved) {
    this.users.update((users) => users.map((user) => user.id === saved.id ? saved : user));
    if (this.selectedUser()?.id === saved.id)
      this.selectedUser.set(saved);
  }
  showError(error) {
    this.messageService.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function Users_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Users)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Users, selectors: [["app-users"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 47, vars: 32, consts: [["header", ""], ["body", ""], ["emptymessage", ""], ["accountForm", "ngForm"], ["nameModel", "ngModel"], ["emailModel", "ngModel"], ["footer", ""], ["aria-labelledby", "citizen-accounts-heading", 1, "card"], [1, "mb-5", "flex", "flex-wrap", "items-start", "justify-between", "gap-4"], ["id", "citizen-accounts-heading", 1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "w-full", "md:w-96"], ["styleClass", "pi pi-search", "aria-hidden", "true"], ["pInputText", "", "type", "search", "aria-label", "Rechercher un compte citoyen par nom ou email", "placeholder", "Rechercher par nom ou email...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["role", "status", 1, "text-sm", "text-muted-color"], ["role", "region", "aria-label", "Liste des comptes citoyens", "dataKey", "id", 3, "value", "loading", "paginator", "rows", "rowHover", "tableStyle"], ["header", "D\xE9tail du compte citoyen", 3, "visibleChange", "visible", "modal"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], ["header", "Modifier le profil citoyen", 3, "visibleChange", "visible", "modal"], ["id", "citizenAccountForm", "novalidate", "", 1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], [1, "m-0", "text-sm", "text-muted-color"], ["role", "alert", 1, "m-0", "rounded-border", "border", "border-red-300", "bg-red-50", "p-3", "text-sm", "text-red-700", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["for", "citizen-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "citizen-name", "name", "name", "required", "", "maxlength", "255", "autocomplete", "off", "aria-describedby", "citizen-name-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "citizen-name-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], [1, "block", "pt-1"], ["for", "citizen-email", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "citizen-email", "name", "email", "type", "email", "required", "", "email", "", "maxlength", "320", "autocomplete", "off", "aria-describedby", "citizen-email-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "citizen-email-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["pSortableColumn", "name"], ["field", "name"], ["pSortableColumn", "email"], ["field", "email"], ["pSortableColumn", "created_at"], ["field", "created_at"], [2, "width", "12rem"], [1, "font-medium"], ["value", "Actif", "severity", "success"], ["value", "D\xE9sactiv\xE9", "severity", "danger"], [1, "flex", "gap-1"], ["icon", "pi pi-eye", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-pencil", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-ban", "severity", "danger", 3, "rounded", "text", "ariaLabel"], ["icon", "pi pi-replay", "severity", "success", 3, "rounded", "text", "ariaLabel"], ["icon", "pi pi-ban", "severity", "danger", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-replay", "severity", "success", 3, "onClick", "rounded", "text", "ariaLabel"], ["colspan", "5", 1, "py-8", "text-center", "text-muted-color"], [1, "text-sm", "text-muted-color"], [1, "m-0", "font-medium"], [1, "m-0"], [3, "value", "severity"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "citizenAccountForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"]], template: function Users_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "section", 7)(3, "header", 8)(4, "div")(5, "h1", 9);
      \u0275\u0275text(6, "Comptes citoyens");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 10);
      \u0275\u0275text(8, "Rechercher, consulter et mettre \xE0 jour les informations des comptes citoyens.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p-button", 11);
      \u0275\u0275listener("onClick", function Users_Template_p_button_onClick_9_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadUsers());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 12)(11, "p-iconfield", 13);
      \u0275\u0275element(12, "p-inputicon", 14);
      \u0275\u0275elementStart(13, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function Users_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Users_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadUsers($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "span", 16);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p-table", 17);
      \u0275\u0275template(17, Users_ng_template_17_Template, 14, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(19, Users_ng_template_19_Template, 17, 16, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(21, Users_ng_template_21_Template, 3, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "p-dialog", 18);
      \u0275\u0275listener("visibleChange", function Users_Template_p_dialog_visibleChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.detailsVisible.set($event));
      });
      \u0275\u0275conditionalCreate(24, Users_Conditional_24_Template, 22, 8, "dl", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p-dialog", 20);
      \u0275\u0275listener("visibleChange", function Users_Template_p_dialog_visibleChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.editVisible.set($event));
      });
      \u0275\u0275elementStart(26, "form", 21, 3);
      \u0275\u0275listener("ngSubmit", function Users_Template_form_ngSubmit_26_listener() {
        \u0275\u0275restoreView(_r1);
        const accountForm_r8 = \u0275\u0275reference(27);
        return \u0275\u0275resetView(ctx.save(accountForm_r8));
      });
      \u0275\u0275elementStart(28, "p", 22);
      \u0275\u0275text(29, "Tous les champs sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(30, Users_Conditional_30_Template, 2, 0, "p", 23);
      \u0275\u0275elementStart(31, "div")(32, "label", 24);
      \u0275\u0275text(33, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "input", 25, 4);
      \u0275\u0275twoWayListener("ngModelChange", function Users_Template_input_ngModelChange_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "small", 26);
      \u0275\u0275conditionalCreate(37, Users_Conditional_37_Template, 2, 0, "span", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div")(39, "label", 28);
      \u0275\u0275text(40, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "input", 29, 5);
      \u0275\u0275twoWayListener("ngModelChange", function Users_Template_input_ngModelChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.email, $event) || (ctx.form.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "small", 30);
      \u0275\u0275conditionalCreate(44, Users_Conditional_44_Template, 2, 1, "span", 27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(45, Users_ng_template_45_Template, 2, 3, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_21_0;
      const accountForm_r8 = \u0275\u0275reference(27);
      const nameModel_r11 = \u0275\u0275reference(35);
      const emailModel_r9 = \u0275\u0275reference(42);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(28, _c0));
      \u0275\u0275advance(8);
      \u0275\u0275property("outlined", true)("loading", ctx.loading());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.users().length, " compte(s)");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.users())("loading", ctx.loading())("paginator", ctx.users().length > 10)("rows", 10)("rowHover", true)("tableStyle", \u0275\u0275pureFunction0(29, _c1));
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(30, _c2));
      \u0275\u0275property("visible", ctx.detailsVisible())("modal", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_21_0 = ctx.selectedUser()) ? 24 : -1, tmp_21_0);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(31, _c3));
      \u0275\u0275property("visible", ctx.editVisible())("modal", true);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(accountForm_r8.submitted && accountForm_r8.invalid ? 30 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
      \u0275\u0275attribute("aria-invalid", nameModel_r11.invalid && nameModel_r11.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(nameModel_r11.invalid && nameModel_r11.touched ? 37 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.email);
      \u0275\u0275attribute("aria-invalid", emailModel_r9.invalid && emailModel_r9.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(emailModel_r9.invalid && emailModel_r9.touched ? 44 : -1);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, EmailValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, IconFieldModule, IconField, InputIconModule, InputIcon, InputTextModule, InputText, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, ToastModule, Toast, DatePipe], styles: ["\n\n.users-caption[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.users-caption[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.users-caption[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: min(100%, 22rem);\n}\n.user-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n.user-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.user-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.user-dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  width: 100%;\n}\n.user-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  overflow-wrap: normal;\n}\n@media (max-width: 600px) {\n  .user-dialog-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .user-dialog-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    justify-content: center;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=users.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Users, [{
    type: Component,
    args: [{ selector: "app-users", imports: [
      DatePipe,
      FormsModule,
      ButtonModule,
      ConfirmDialogModule,
      DialogModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      TableModule,
      TagModule,
      ToastModule
    ], providers: [MessageService, ConfirmationService], template: `<p-toast />
<p-confirmdialog [style]="{ width: 'min(28rem, 95vw)' }" />

<section class="card" aria-labelledby="citizen-accounts-heading">
    <header class="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
            <h1 id="citizen-accounts-heading" class="m-0 text-xl font-semibold">Comptes citoyens</h1>
            <p class="mt-1 mb-0 text-sm text-muted-color">Rechercher, consulter et mettre \xE0 jour les informations des comptes citoyens.</p>
        </div>
        <p-button label="Actualiser" icon="pi pi-refresh" severity="secondary" [outlined]="true" [loading]="loading()" (onClick)="loadUsers()" />
    </header>

    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p-iconfield class="w-full md:w-96">
            <p-inputicon styleClass="pi pi-search" aria-hidden="true" />
            <input
                pInputText
                type="search"
                class="w-full"
                aria-label="Rechercher un compte citoyen par nom ou email"
                placeholder="Rechercher par nom ou email..."
                [(ngModel)]="searchText"
                (ngModelChange)="loadUsers($event)"
            />
        </p-iconfield>
        <span class="text-sm text-muted-color" role="status">{{ users().length }} compte(s)</span>
    </div>

    <p-table role="region" aria-label="Liste des comptes citoyens" [value]="users()" [loading]="loading()" [paginator]="users().length > 10" [rows]="10" [rowHover]="true" dataKey="id" [tableStyle]="{ 'min-width': '42rem' }">
        <ng-template #header>
            <tr>
                <th pSortableColumn="name">Citoyen <p-sortIcon field="name" /></th>
                <th pSortableColumn="email">Email <p-sortIcon field="email" /></th>
                <th>\xC9tat du compte</th>
                <th pSortableColumn="created_at">Inscription <p-sortIcon field="created_at" /></th>
                <th style="width: 12rem">Actions</th>
            </tr>
        </ng-template>

        <ng-template #body let-user>
            <tr [class.opacity-60]="!user.is_active">
                <td class="font-medium">{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    @if (user.is_active) {
                        <p-tag value="Actif" severity="success" />
                    } @else {
                        <p-tag value="D\xE9sactiv\xE9" severity="danger" />
                    }
                </td>
                <td>{{ user.created_at | date: 'dd/MM/yyyy' }}</td>
                <td>
                    <div class="flex gap-1">
                        <p-button icon="pi pi-eye" [rounded]="true" [text]="true" [ariaLabel]="'Voir le compte de ' + user.name" (onClick)="openDetails(user)" />
                        <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" [ariaLabel]="'Modifier le profil de ' + user.name" (onClick)="openEdit(user)" />
                        @if (user.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" [ariaLabel]="'D\xE9sactiver le compte de ' + user.name" (onClick)="confirmActivationChange(user)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" [ariaLabel]="'Activer le compte de ' + user.name" (onClick)="confirmActivationChange(user)" />
                        }
                    </div>
                </td>
            </tr>
        </ng-template>

        <ng-template #emptymessage>
            <tr>
                <td colspan="5" class="py-8 text-center text-muted-color">
                    {{ searchText ? 'Aucun compte citoyen ne correspond \xE0 cette recherche.' : 'Aucun compte citoyen \xE0 afficher.' }}
                </td>
            </tr>
        </ng-template>
    </p-table>
</section>

<p-dialog [visible]="detailsVisible()" (visibleChange)="detailsVisible.set($event)" header="D\xE9tail du compte citoyen" [modal]="true" [style]="{ width: 'min(34rem, 95vw)' }">
    @if (selectedUser(); as user) {
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><dt class="text-sm text-muted-color">Nom</dt><dd class="m-0 font-medium">{{ user.name }}</dd></div>
            <div><dt class="text-sm text-muted-color">Email</dt><dd class="m-0 font-medium">{{ user.email }}</dd></div>
            <div><dt class="text-sm text-muted-color">\xC9tat</dt><dd class="m-0"><p-tag [value]="user.is_active ? 'Actif' : 'D\xE9sactiv\xE9'" [severity]="user.is_active ? 'success' : 'danger'" /></dd></div>
            <div><dt class="text-sm text-muted-color">Inscription</dt><dd class="m-0">{{ user.created_at | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
        </dl>
    }
</p-dialog>

<p-dialog [visible]="editVisible()" (visibleChange)="editVisible.set($event)" header="Modifier le profil citoyen" [modal]="true" [style]="{ width: 'min(32rem, 95vw)' }">
    <form #accountForm="ngForm" id="citizenAccountForm" class="flex flex-col gap-5" novalidate (ngSubmit)="save(accountForm)">
        <p class="m-0 text-sm text-muted-color">Tous les champs sont obligatoires.</p>
        @if (accountForm.submitted && accountForm.invalid) {
            <p role="alert" class="m-0 rounded-border border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-100">Le formulaire contient des erreurs : corrigez les champs signal\xE9s.</p>
        }
        <div>
            <label for="citizen-name" class="mb-2 block font-semibold">Nom</label>
            <input
                pInputText
                #nameModel="ngModel"
                id="citizen-name"
                name="name"
                [(ngModel)]="form.name"
                required
                maxlength="255"
                autocomplete="off"
                aria-describedby="citizen-name-error"
                [attr.aria-invalid]="nameModel.invalid && nameModel.touched"
                class="w-full"
            />
            <small id="citizen-name-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (nameModel.invalid && nameModel.touched) {
                    <span class="block pt-1">Le nom est obligatoire.</span>
                }
            </small>
        </div>
        <div>
            <label for="citizen-email" class="mb-2 block font-semibold">Email</label>
            <input
                pInputText
                #emailModel="ngModel"
                id="citizen-email"
                name="email"
                type="email"
                [(ngModel)]="form.email"
                required
                email
                maxlength="320"
                autocomplete="off"
                aria-describedby="citizen-email-error"
                [attr.aria-invalid]="emailModel.invalid && emailModel.touched"
                class="w-full"
            />
            <small id="citizen-email-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (emailModel.invalid && emailModel.touched) {
                    <span class="block pt-1">{{ emailModel.hasError('required') ? 'L\u2019email est obligatoire.' : 'Saisissez une adresse email valide.' }}</span>
                }
            </small>
        </div>
    </form>
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="editVisible.set(false)"></button>
        <button pButton type="submit" form="citizenAccountForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="saving()"></button>
    </ng-template>
</p-dialog>
`, styles: ["/* src/app/users/users.scss */\n.users-caption {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.users-caption > * {\n  min-width: 0;\n}\n.users-caption input {\n  width: min(100%, 22rem);\n}\n.user-form {\n  display: grid;\n  gap: 1.5rem;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n.user-form > div {\n  min-width: 0;\n}\n.user-form label {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.user-dialog-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  width: 100%;\n}\n.user-dialog-actions button {\n  overflow-wrap: normal;\n}\n@media (max-width: 600px) {\n  .user-dialog-actions {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .user-dialog-actions button {\n    justify-content: center;\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=users.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Users, { className: "Users", filePath: "src/app/users/users.ts", lineNumber: 37 });
})();
export {
  Users
};
//# sourceMappingURL=chunk-FLQIFYCS.js.map
