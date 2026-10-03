import {
  MultiSelect,
  MultiSelectModule
} from "./chunk-65A54DW7.js";
import {
  Textarea,
  TextareaModule
} from "./chunk-QPJC6RD6.js";
import {
  Toolbar,
  ToolbarModule
} from "./chunk-SJ6BWTWE.js";
import {
  InstitutService
} from "./chunk-GY5LYIJF.js";
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
  Select,
  SelectModule
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
import {
  Tooltip,
  TooltipModule
} from "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  Button,
  ButtonDirective,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  DefaultValueAccessor,
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
  REQUEST_CATEGORIES
} from "./chunk-ROYE6VN6.js";
import {
  UserService,
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  __spreadProps,
  __spreadValues,
  computed,
  finalize,
  forkJoin,
  inject,
  of,
  setClassMetadata,
  signal,
  switchMap,
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
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E5MYAYBP.js";

// src/app/instituts/instituts.ts
var _c0 = () => ({ width: "30rem" });
var _c1 = () => ({ "min-width": "52rem" });
var _c2 = () => ({ width: "min(36rem, 95vw)" });
function Instituts_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h1", 23);
    \u0275\u0275text(2, "Instituts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4, "Services qui re\xE7oivent les demandes, par cat\xE9gorie.");
    \u0275\u0275elementEnd()();
  }
}
function Instituts_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "p-button", 26);
    \u0275\u0275listener("onClick", function Instituts_ng_template_6_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.load());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p-button", 27);
    \u0275\u0275listener("onClick", function Instituts_ng_template_6_Template_p_button_onClick_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNew());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("outlined", true)("loading", ctx_r2.loading());
  }
}
function Instituts_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Aucun institut actif ne re\xE7oit : ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, ". Ces demandes sont trait\xE9es par l'administration.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.uncovered().join(", "));
  }
}
function Instituts_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 29);
    \u0275\u0275text(2, "Institut ");
    \u0275\u0275element(3, "p-sortIcon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "th", 31);
    \u0275\u0275text(5, "Cat\xE9gories re\xE7ues");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 32);
    \u0275\u0275text(7, "Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 33);
    \u0275\u0275text(9, "\xC9tat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 34);
    \u0275\u0275text(11, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Instituts_ng_template_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const institut_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(institut_r5.description);
  }
}
function Instituts_ng_template_12_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 38);
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    \u0275\u0275property("value", category_r6);
  }
}
function Instituts_ng_template_12_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function Instituts_ng_template_12_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 45);
    \u0275\u0275listener("onClick", function Instituts_ng_template_12_Conditional_17_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r7);
      const institut_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleActive(institut_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Instituts_ng_template_12_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 46);
    \u0275\u0275listener("onClick", function Instituts_ng_template_12_Conditional_18_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r8);
      const institut_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleActive(institut_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Instituts_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Instituts_ng_template_12_Conditional_4_Template, 2, 1, "div", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "div", 37);
    \u0275\u0275repeaterCreate(7, Instituts_ng_template_12_For_8_Template, 1, 1, "p-tag", 38, \u0275\u0275repeaterTrackByIdentity, false, Instituts_ng_template_12_ForEmpty_9_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275element(13, "p-tag", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "div", 41)(16, "p-button", 42);
    \u0275\u0275listener("onClick", function Instituts_ng_template_12_Template_p_button_onClick_16_listener() {
      const institut_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openEdit(institut_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, Instituts_ng_template_12_Conditional_17_Template, 1, 2, "p-button", 43)(18, Instituts_ng_template_12_Conditional_18_Template, 1, 2, "p-button", 44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const institut_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("opacity-60", !institut_r5.is_active);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(institut_r5.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(institut_r5.description ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(institut_r5.categories);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.managerName(institut_r5.manager_id));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", institut_r5.is_active ? "Actif" : "D\xE9sactiv\xE9")("severity", institut_r5.is_active ? "success" : "danger");
    \u0275\u0275advance(3);
    \u0275\u0275property("rounded", true)("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(institut_r5.is_active ? 17 : 18);
  }
}
function Instituts_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 47);
    \u0275\u0275text(2, "Aucun institut. Toutes les demandes sont trait\xE9es par l'administration.");
    \u0275\u0275elementEnd()();
  }
}
function Instituts_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function Instituts_ng_template_39_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 49);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const institutForm_r9 = \u0275\u0275reference(18);
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r2.saving())("disabled", !institutForm_r9.valid || !ctx_r2.form.categories.length || ctx_r2.saving());
  }
}
var EMPTY_FORM = { name: "", description: "", categories: [], manager_id: null };
var Instituts = class _Instituts {
  institutService = inject(InstitutService);
  userService = inject(UserService);
  messages = inject(MessageService);
  confirmation = inject(ConfirmationService);
  instituts = signal([], ...ngDevMode ? [{ debugName: "instituts" }] : []);
  managers = signal([], ...ngDevMode ? [{ debugName: "managers" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  managerNames = computed(() => new Map(this.managers().map((user) => [user.id, user.name])), ...ngDevMode ? [{ debugName: "managerNames" }] : []);
  /** Catégories qu'aucun institut actif ne reçoit : leurs demandes reviennent à l'administration. */
  uncovered = computed(() => {
    const covered = new Set(this.instituts().filter((i) => i.is_active).flatMap((i) => i.categories));
    return REQUEST_CATEGORIES.filter((category) => !covered.has(category));
  }, ...ngDevMode ? [{ debugName: "uncovered" }] : []);
  dialogVisible = false;
  edited = null;
  form = __spreadValues({}, EMPTY_FORM);
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    forkJoin({ instituts: this.institutService.list(), managers: this.userService.listAccounts("manager") }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: ({ instituts, managers }) => {
        this.instituts.set(instituts);
        this.managers.set(managers);
      },
      error: (error) => this.showError(error)
    });
  }
  /** Catégories déjà reçues par un autre institut actif que celui en cours d'édition. */
  takenCategories() {
    const taken = /* @__PURE__ */ new Map();
    for (const institut of this.instituts()) {
      if (institut.is_active && institut.id !== this.edited?.id) {
        institut.categories.forEach((category) => taken.set(category, institut.name));
      }
    }
    return taken;
  }
  categoryOptions() {
    const taken = this.takenCategories();
    return REQUEST_CATEGORIES.map((category) => ({
      label: taken.has(category) ? `${category} (${taken.get(category)})` : category,
      value: category,
      disabled: taken.has(category)
    }));
  }
  /** Managers libres, plus celui de l'institut édité. */
  managerOptions() {
    const busy = new Set(this.instituts().filter((i) => i.id !== this.edited?.id && i.manager_id).map((i) => i.manager_id));
    return this.managers().filter((user) => user.is_active && !busy.has(user.id)).map((user) => ({ label: `${user.name} (${user.email})`, value: user.id }));
  }
  openNew() {
    this.edited = null;
    this.form = __spreadProps(__spreadValues({}, EMPTY_FORM), { categories: [] });
    this.dialogVisible = true;
  }
  openEdit(institut) {
    this.edited = institut;
    this.form = { name: institut.name, description: institut.description, categories: [...institut.categories], manager_id: institut.manager_id };
    this.dialogVisible = true;
  }
  save(form) {
    if (form.invalid || this.saving() || !this.form.categories.length) {
      form.control.markAllAsTouched();
      return;
    }
    const values = __spreadProps(__spreadValues({}, this.form), { name: this.form.name.trim() });
    const edited = this.edited;
    const action = edited ? this.institutService.update(edited.id, { name: values.name, description: values.description, categories: values.categories }).pipe(switchMap((updated) => values.manager_id !== edited.manager_id ? this.institutService.setManager(updated.id, values.manager_id) : of(updated))) : this.institutService.create(values);
    this.saving.set(true);
    action.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.showSuccess(edited ? "Institut modifi\xE9" : "Institut cr\xE9\xE9");
        this.load();
      },
      error: (error) => this.showError(error)
    });
  }
  toggleActive(institut) {
    const apply = () => this.institutService.update(institut.id, { is_active: !institut.is_active }).subscribe({
      next: () => {
        this.showSuccess(institut.is_active ? "Institut d\xE9sactiv\xE9" : "Institut r\xE9activ\xE9");
        this.load();
      },
      error: (error) => this.showError(error)
    });
    if (!institut.is_active) {
      apply();
      return;
    }
    this.confirmation.confirm({
      message: `D\xE9sactiver \xAB ${institut.name} \xBB ? Son manager et ses agents perdront l'acc\xE8s \xE0 ses demandes, et les nouvelles demandes de ses cat\xE9gories iront \xE0 l'administration.`,
      header: "D\xE9sactiver l'institut",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "D\xE9sactiver",
      rejectLabel: "Annuler",
      acceptButtonProps: { severity: "danger" },
      rejectButtonProps: { severity: "secondary", outlined: true },
      accept: apply
    });
  }
  managerName(id) {
    return id ? this.managerNames().get(id) ?? "Compte inconnu" : "Aucun";
  }
  showSuccess(detail) {
    this.messages.add({ severity: "success", summary: "Succ\xE8s", detail, life: 3e3 });
  }
  showError(error) {
    this.messages.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function Instituts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Instituts)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Instituts, selectors: [["app-instituts"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 41, vars: 22, consts: [["start", ""], ["end", ""], ["header", ""], ["body", ""], ["emptymessage", ""], ["institutForm", "ngForm"], ["footer", ""], [1, "card"], ["styleClass", "mb-5"], ["role", "status", 1, "mb-5", "flex", "items-start", "gap-3", "rounded-border", "bg-orange-50", "p-4", "text-orange-800", "dark:bg-orange-400/10", "dark:text-orange-200"], ["dataKey", "id", 3, "value", "loading", "tableStyle", "rowHover"], [3, "visibleChange", "visible", "header", "modal"], ["id", "institutForm", 1, "grid", "grid-cols-1", "gap-4", 3, "ngSubmit"], ["for", "institut-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "institut-name", "name", "name", "required", "", "maxlength", "255", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "institut-description", 1, "mb-2", "block", "font-semibold"], [1, "font-normal", "text-muted-color"], ["pTextarea", "", "id", "institut-description", "name", "description", "maxlength", "2000", "rows", "2", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "institut-categories", 1, "mb-2", "block", "font-semibold"], ["inputId", "institut-categories", "name", "categories", "optionLabel", "label", "optionValue", "value", "optionDisabled", "disabled", "display", "chip", "placeholder", "Au moins une cat\xE9gorie", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], [1, "mt-1", "block", "text-muted-color"], ["for", "institut-manager", 1, "mb-2", "block", "font-semibold"], ["inputId", "institut-manager", "name", "manager_id", "optionLabel", "label", "optionValue", "value", "placeholder", "Aucun", "emptyMessage", "Aucun compte manager disponible", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "showClear"], [1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "gap-2"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], ["label", "Nouvel institut", "icon", "pi pi-plus", 3, "onClick"], [1, "pi", "pi-info-circle", "mt-1"], ["pSortableColumn", "name", 2, "min-width", "14rem"], ["field", "name"], [2, "min-width", "16rem"], [2, "min-width", "12rem"], [2, "min-width", "8rem"], [2, "width", "8rem"], [1, "font-medium"], [1, "text-sm", "text-muted-color"], [1, "flex", "flex-wrap", "gap-1"], ["severity", "secondary", 3, "value"], [1, "text-muted-color"], [3, "value", "severity"], [1, "flex", "gap-1"], ["icon", "pi pi-pencil", "ariaLabel", "Modifier l'institut", "pTooltip", "Modifier", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver l'institut", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer l'institut", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver l'institut", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer l'institut", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["colspan", "5", 1, "py-8", "text-center", "text-muted-color"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "institutForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"]], template: function Instituts_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "div", 7)(3, "p-toolbar", 8);
      \u0275\u0275template(4, Instituts_ng_template_4_Template, 5, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, Instituts_ng_template_6_Template, 3, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, Instituts_Conditional_8_Template, 7, 1, "div", 9);
      \u0275\u0275elementStart(9, "p-table", 10);
      \u0275\u0275template(10, Instituts_ng_template_10_Template, 12, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(12, Instituts_ng_template_12_Template, 19, 11, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(14, Instituts_ng_template_14_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "p-dialog", 11);
      \u0275\u0275twoWayListener("visibleChange", function Instituts_Template_p_dialog_visibleChange_16_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.dialogVisible, $event) || (ctx.dialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(17, "form", 12, 5);
      \u0275\u0275listener("ngSubmit", function Instituts_Template_form_ngSubmit_17_listener() {
        \u0275\u0275restoreView(_r1);
        const institutForm_r9 = \u0275\u0275reference(18);
        return \u0275\u0275resetView(ctx.save(institutForm_r9));
      });
      \u0275\u0275elementStart(19, "div")(20, "label", 13);
      \u0275\u0275text(21, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function Instituts_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div")(24, "label", 15);
      \u0275\u0275text(25, "Description ");
      \u0275\u0275elementStart(26, "span", 16);
      \u0275\u0275text(27, "(facultatif)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "textarea", 17);
      \u0275\u0275twoWayListener("ngModelChange", function Instituts_Template_textarea_ngModelChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.description, $event) || (ctx.form.description = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div")(30, "label", 18);
      \u0275\u0275text(31, "Cat\xE9gories re\xE7ues");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "p-multiselect", 19);
      \u0275\u0275twoWayListener("ngModelChange", function Instituts_Template_p_multiselect_ngModelChange_32_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.categories, $event) || (ctx.form.categories = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "small", 20);
      \u0275\u0275text(34, "Une cat\xE9gorie d\xE9j\xE0 re\xE7ue par un autre institut actif est indisponible.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div")(36, "label", 21);
      \u0275\u0275text(37, "Responsable");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "p-select", 22);
      \u0275\u0275twoWayListener("ngModelChange", function Instituts_Template_p_select_ngModelChange_38_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.manager_id, $event) || (ctx.form.manager_id = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(39, Instituts_ng_template_39_Template, 2, 3, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(19, _c0));
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.uncovered().length ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.instituts())("loading", ctx.loading())("tableStyle", \u0275\u0275pureFunction0(20, _c1))("rowHover", true);
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(21, _c2));
      \u0275\u0275twoWayProperty("visible", ctx.dialogVisible);
      \u0275\u0275property("header", ctx.edited ? "Modifier l'institut" : "Nouvel institut")("modal", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.description);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.categories);
      \u0275\u0275property("options", ctx.categoryOptions());
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.manager_id);
      \u0275\u0275property("options", ctx.managerOptions())("showClear", true);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, InputTextModule, InputText, MultiSelectModule, MultiSelect, SelectModule, Select, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, TextareaModule, Textarea, ToastModule, Toast, ToolbarModule, Toolbar, TooltipModule, Tooltip], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Instituts, [{
    type: Component,
    args: [{ selector: "app-instituts", imports: [FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, InputTextModule, MultiSelectModule, SelectModule, TableModule, TagModule, TextareaModule, ToastModule, ToolbarModule, TooltipModule], providers: [MessageService, ConfirmationService], template: `<p-toast />
<p-confirmdialog [style]="{ width: '30rem' }" />

<div class="card">
    <p-toolbar styleClass="mb-5">
        <ng-template #start>
            <div>
                <h1 class="m-0 text-xl font-semibold">Instituts</h1>
                <p class="mt-1 mb-0 text-sm text-muted-color">Services qui re\xE7oivent les demandes, par cat\xE9gorie.</p>
            </div>
        </ng-template>
        <ng-template #end>
            <div class="flex gap-2">
                <p-button label="Actualiser" icon="pi pi-refresh" severity="secondary" [outlined]="true" [loading]="loading()" (onClick)="load()" />
                <p-button label="Nouvel institut" icon="pi pi-plus" (onClick)="openNew()" />
            </div>
        </ng-template>
    </p-toolbar>

    @if (uncovered().length) {
        <div class="mb-5 flex items-start gap-3 rounded-border bg-orange-50 p-4 text-orange-800 dark:bg-orange-400/10 dark:text-orange-200" role="status">
            <i class="pi pi-info-circle mt-1"></i>
            <span>Aucun institut actif ne re\xE7oit : <strong>{{ uncovered().join(', ') }}</strong>. Ces demandes sont trait\xE9es par l'administration.</span>
        </div>
    }

    <p-table [value]="instituts()" [loading]="loading()" [tableStyle]="{ 'min-width': '52rem' }" [rowHover]="true" dataKey="id">
        <ng-template #header>
            <tr>
                <th pSortableColumn="name" style="min-width: 14rem">Institut <p-sortIcon field="name" /></th>
                <th style="min-width: 16rem">Cat\xE9gories re\xE7ues</th>
                <th style="min-width: 12rem">Responsable</th>
                <th style="min-width: 8rem">\xC9tat</th>
                <th style="width: 8rem">Actions</th>
            </tr>
        </ng-template>
        <ng-template #body let-institut>
            <tr [class.opacity-60]="!institut.is_active">
                <td>
                    <div class="font-medium">{{ institut.name }}</div>
                    @if (institut.description) {
                        <div class="text-sm text-muted-color">{{ institut.description }}</div>
                    }
                </td>
                <td>
                    <div class="flex flex-wrap gap-1">
                        @for (category of institut.categories; track category) {
                            <p-tag [value]="category" severity="secondary" />
                        } @empty {
                            <span class="text-muted-color">\u2014</span>
                        }
                    </div>
                </td>
                <td>{{ managerName(institut.manager_id) }}</td>
                <td>
                    <p-tag [value]="institut.is_active ? 'Actif' : 'D\xE9sactiv\xE9'" [severity]="institut.is_active ? 'success' : 'danger'" />
                </td>
                <td>
                    <div class="flex gap-1">
                        <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" ariaLabel="Modifier l'institut" pTooltip="Modifier" tooltipPosition="top" (onClick)="openEdit(institut)" />
                        @if (institut.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" ariaLabel="D\xE9sactiver l'institut" pTooltip="D\xE9sactiver" tooltipPosition="top" (onClick)="toggleActive(institut)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" ariaLabel="R\xE9activer l'institut" pTooltip="R\xE9activer" tooltipPosition="top" (onClick)="toggleActive(institut)" />
                        }
                    </div>
                </td>
            </tr>
        </ng-template>
        <ng-template #emptymessage>
            <tr>
                <td colspan="5" class="py-8 text-center text-muted-color">Aucun institut. Toutes les demandes sont trait\xE9es par l'administration.</td>
            </tr>
        </ng-template>
    </p-table>
</div>

<p-dialog [(visible)]="dialogVisible" [header]="edited ? 'Modifier l\\'institut' : 'Nouvel institut'" [modal]="true" [style]="{ width: 'min(36rem, 95vw)' }">
    <form #institutForm="ngForm" id="institutForm" class="grid grid-cols-1 gap-4" (ngSubmit)="save(institutForm)">
        <div>
            <label for="institut-name" class="mb-2 block font-semibold">Nom</label>
            <input pInputText id="institut-name" name="name" [(ngModel)]="form.name" required maxlength="255" class="w-full" />
        </div>
        <div>
            <label for="institut-description" class="mb-2 block font-semibold">Description <span class="font-normal text-muted-color">(facultatif)</span></label>
            <textarea pTextarea id="institut-description" name="description" [(ngModel)]="form.description" maxlength="2000" rows="2" class="w-full"></textarea>
        </div>
        <div>
            <label for="institut-categories" class="mb-2 block font-semibold">Cat\xE9gories re\xE7ues</label>
            <p-multiselect inputId="institut-categories" name="categories" [(ngModel)]="form.categories" [options]="categoryOptions()" optionLabel="label" optionValue="value" optionDisabled="disabled" display="chip" placeholder="Au moins une cat\xE9gorie" class="w-full" appendTo="body" />
            <small class="mt-1 block text-muted-color">Une cat\xE9gorie d\xE9j\xE0 re\xE7ue par un autre institut actif est indisponible.</small>
        </div>
        <div>
            <label for="institut-manager" class="mb-2 block font-semibold">Responsable</label>
            <p-select inputId="institut-manager" name="manager_id" [(ngModel)]="form.manager_id" [options]="managerOptions()" optionLabel="label" optionValue="value" [showClear]="true" placeholder="Aucun" emptyMessage="Aucun compte manager disponible" class="w-full" appendTo="body" />
        </div>
    </form>
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="dialogVisible = false"></button>
        <button pButton type="submit" form="institutForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="!institutForm.valid || !form.categories.length || saving()"></button>
    </ng-template>
</p-dialog>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Instituts, { className: "Instituts", filePath: "src/app/instituts/instituts.ts", lineNumber: 43 });
})();
export {
  Instituts
};
//# sourceMappingURL=chunk-R4VIWC2N.js.map
