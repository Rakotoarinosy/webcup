import {
  ConfirmDialog,
  ConfirmDialogModule
} from "./chunk-4ZINNOFN.js";
import {
  Dialog,
  DialogModule
} from "./chunk-W24WFQPP.js";
import {
  SortIcon,
  SortableColumn,
  Table,
  TableModule
} from "./chunk-URL4G3DB.js";
import "./chunk-WBYO2P7A.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
import {
  IconField,
  IconFieldModule,
  InputIcon,
  InputIconModule
} from "./chunk-IHOQCUVC.js";
import {
  InputText,
  InputTextModule
} from "./chunk-UR4GPL7H.js";
import {
  Toast,
  ToastModule
} from "./chunk-PXE4FUQO.js";
import "./chunk-YTN6XZFY.js";
import "./chunk-ZDG3GNHS.js";
import "./chunk-JL6DBWWC.js";
import "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  Button,
  ButtonDirective,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
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
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import {
  ConfirmationService,
  MessageService
} from "./chunk-UHTXY4UO.js";
import {
  UserService,
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
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
} from "./chunk-E5MYAYBP.js";

// src/app/users/users.ts
var _c0 = () => ({ width: "min(28rem, 95vw)" });
var _c1 = () => ({ "min-width": "42rem" });
var _c2 = () => ({ width: "min(34rem, 95vw)" });
var _c3 = () => ({ width: "min(32rem, 95vw)" });
function Users_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 24);
    \u0275\u0275text(2, "Citoyen ");
    \u0275\u0275element(3, "p-sortIcon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "th", 26);
    \u0275\u0275text(5, "Email ");
    \u0275\u0275element(6, "p-sortIcon", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "\xC9tat du compte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 28);
    \u0275\u0275text(10, "Inscription ");
    \u0275\u0275element(11, "p-sortIcon", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 30);
    \u0275\u0275text(13, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Users_ng_template_19_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 32);
  }
}
function Users_ng_template_19_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 33);
  }
}
function Users_ng_template_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 39);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Conditional_15_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r5);
      const user_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmActivationChange(user_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Users_ng_template_19_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 40);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Conditional_16_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r6);
      const user_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmActivationChange(user_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Users_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, Users_ng_template_19_Conditional_6_Template, 1, 0, "p-tag", 32)(7, Users_ng_template_19_Conditional_7_Template, 1, 0, "p-tag", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "div", 34)(13, "p-button", 35);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Template_p_button_onClick_13_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openDetails(user_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p-button", 36);
    \u0275\u0275listener("onClick", function Users_ng_template_19_Template_p_button_onClick_14_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openEdit(user_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, Users_ng_template_19_Conditional_15_Template, 1, 2, "p-button", 37)(16, Users_ng_template_19_Conditional_16_Template, 1, 2, "p-button", 38);
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
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 11, user_r3.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("rounded", true)("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("rounded", true)("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r3.is_active ? 15 : 16);
  }
}
function Users_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 41);
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
    \u0275\u0275elementStart(0, "dl", 17)(1, "div")(2, "dt", 42);
    \u0275\u0275text(3, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "dt", 42);
    \u0275\u0275text(8, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "dt", 42);
    \u0275\u0275text(13, "\xC9tat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 44);
    \u0275\u0275element(15, "p-tag", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "dt", 42);
    \u0275\u0275text(18, "Inscription");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd", 44);
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
function Users_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function Users_ng_template_36_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.editVisible.set(false));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 47);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const accountForm_r8 = \u0275\u0275reference(27);
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r3.saving())("disabled", !accountForm_r8.valid || ctx_r3.saving());
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
    if (!user || form.invalid || this.saving())
      return;
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Users, selectors: [["app-users"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 38, vars: 27, consts: [["header", ""], ["body", ""], ["emptymessage", ""], ["accountForm", "ngForm"], ["footer", ""], ["aria-labelledby", "citizen-accounts-heading", 1, "card"], [1, "mb-5", "flex", "flex-wrap", "items-start", "justify-between", "gap-4"], ["id", "citizen-accounts-heading", 1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "w-full", "md:w-96"], ["styleClass", "pi pi-search"], ["pInputText", "", "type", "search", "aria-label", "Rechercher un compte citoyen par nom ou email", "placeholder", "Rechercher par nom ou email...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["aria-live", "polite", 1, "text-sm", "text-muted-color"], ["dataKey", "id", 3, "value", "loading", "paginator", "rows", "rowHover", "tableStyle"], ["header", "D\xE9tail du compte citoyen", 3, "visibleChange", "visible", "modal"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], ["header", "Modifier le profil citoyen", 3, "visibleChange", "visible", "modal"], ["id", "citizenAccountForm", 1, "flex", "flex-col", "gap-5", 3, "ngSubmit"], ["for", "citizen-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "citizen-name", "name", "name", "required", "", "maxlength", "255", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "citizen-email", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "citizen-email", "name", "email", "type", "email", "required", "", "email", "", "maxlength", "320", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pSortableColumn", "name"], ["field", "name"], ["pSortableColumn", "email"], ["field", "email"], ["pSortableColumn", "created_at"], ["field", "created_at"], [2, "width", "12rem"], [1, "font-medium"], ["value", "Actif", "severity", "success"], ["value", "D\xE9sactiv\xE9", "severity", "danger"], [1, "flex", "gap-1"], ["icon", "pi pi-eye", "ariaLabel", "Voir le compte", 3, "onClick", "rounded", "text"], ["icon", "pi pi-pencil", "ariaLabel", "Modifier le profil", 3, "onClick", "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver le compte", 3, "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "Activer le compte", 3, "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver le compte", 3, "onClick", "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "Activer le compte", 3, "onClick", "rounded", "text"], ["colspan", "5", 1, "py-8", "text-center", "text-muted-color"], [1, "text-sm", "text-muted-color"], [1, "m-0", "font-medium"], [1, "m-0"], [3, "value", "severity"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "citizenAccountForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"]], template: function Users_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "section", 5)(3, "header", 6)(4, "div")(5, "h1", 7);
      \u0275\u0275text(6, "Comptes citoyens");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 8);
      \u0275\u0275text(8, "Rechercher, consulter et mettre \xE0 jour les informations des comptes citoyens.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p-button", 9);
      \u0275\u0275listener("onClick", function Users_Template_p_button_onClick_9_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadUsers());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 10)(11, "p-iconfield", 11);
      \u0275\u0275element(12, "p-inputicon", 12);
      \u0275\u0275elementStart(13, "input", 13);
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
      \u0275\u0275elementStart(14, "span", 14);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p-table", 15);
      \u0275\u0275template(17, Users_ng_template_17_Template, 14, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(19, Users_ng_template_19_Template, 17, 14, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(21, Users_ng_template_21_Template, 3, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "p-dialog", 16);
      \u0275\u0275listener("visibleChange", function Users_Template_p_dialog_visibleChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.detailsVisible.set($event));
      });
      \u0275\u0275conditionalCreate(24, Users_Conditional_24_Template, 22, 8, "dl", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p-dialog", 18);
      \u0275\u0275listener("visibleChange", function Users_Template_p_dialog_visibleChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.editVisible.set($event));
      });
      \u0275\u0275elementStart(26, "form", 19, 3);
      \u0275\u0275listener("ngSubmit", function Users_Template_form_ngSubmit_26_listener() {
        \u0275\u0275restoreView(_r1);
        const accountForm_r8 = \u0275\u0275reference(27);
        return \u0275\u0275resetView(ctx.save(accountForm_r8));
      });
      \u0275\u0275elementStart(28, "div")(29, "label", 20);
      \u0275\u0275text(30, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function Users_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div")(33, "label", 22);
      \u0275\u0275text(34, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function Users_Template_input_ngModelChange_35_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.email, $event) || (ctx.form.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(36, Users_ng_template_36_Template, 2, 3, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_19_0;
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(23, _c0));
      \u0275\u0275advance(8);
      \u0275\u0275property("outlined", true)("loading", ctx.loading());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.users().length, " compte(s)");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.users())("loading", ctx.loading())("paginator", ctx.users().length > 10)("rows", 10)("rowHover", true)("tableStyle", \u0275\u0275pureFunction0(24, _c1));
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(25, _c2));
      \u0275\u0275property("visible", ctx.detailsVisible())("modal", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_19_0 = ctx.selectedUser()) ? 24 : -1, tmp_19_0);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(26, _c3));
      \u0275\u0275property("visible", ctx.editVisible())("modal", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.email);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, EmailValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, IconFieldModule, IconField, InputIconModule, InputIcon, InputTextModule, InputText, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, ToastModule, Toast, DatePipe], encapsulation: 2 });
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
            <p-inputicon styleClass="pi pi-search" />
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
        <span class="text-sm text-muted-color" aria-live="polite">{{ users().length }} compte(s)</span>
    </div>

    <p-table [value]="users()" [loading]="loading()" [paginator]="users().length > 10" [rows]="10" [rowHover]="true" dataKey="id" [tableStyle]="{ 'min-width': '42rem' }">
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
                        <p-button icon="pi pi-eye" [rounded]="true" [text]="true" ariaLabel="Voir le compte" (onClick)="openDetails(user)" />
                        <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" ariaLabel="Modifier le profil" (onClick)="openEdit(user)" />
                        @if (user.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" ariaLabel="D\xE9sactiver le compte" (onClick)="confirmActivationChange(user)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" ariaLabel="Activer le compte" (onClick)="confirmActivationChange(user)" />
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
    <form #accountForm="ngForm" id="citizenAccountForm" class="flex flex-col gap-5" (ngSubmit)="save(accountForm)">
        <div>
            <label for="citizen-name" class="mb-2 block font-semibold">Nom</label>
            <input pInputText id="citizen-name" name="name" [(ngModel)]="form.name" required maxlength="255" class="w-full" />
        </div>
        <div>
            <label for="citizen-email" class="mb-2 block font-semibold">Email</label>
            <input pInputText id="citizen-email" name="email" type="email" [(ngModel)]="form.email" required email maxlength="320" class="w-full" />
        </div>
    </form>
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="editVisible.set(false)"></button>
        <button pButton type="submit" form="citizenAccountForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="!accountForm.valid || saving()"></button>
    </ng-template>
</p-dialog>
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Users, { className: "Users", filePath: "src/app/users/users.ts", lineNumber: 37 });
})();
export {
  Users
};
//# sourceMappingURL=chunk-Y7DXDC27.js.map
