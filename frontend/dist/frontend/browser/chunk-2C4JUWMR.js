import {
  ACTIVITY_TYPES,
  AUDIT_LABELS,
  JournalService,
  auditDetails,
  toCsv
} from "./chunk-3BGGQYBZ.js";
import {
  eventLabel
} from "./chunk-KJD3IBMG.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import {
  ROLE_LABELS
} from "./chunk-RD6WJK3U.js";
import "./chunk-F3M422Q6.js";
import {
  Button,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BX45OWY6.js";
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  Subject,
  __spreadProps,
  __spreadValues,
  computed,
  debounceTime,
  finalize,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// src/app/journal/journal.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.event.id;
var _forTrack2 = ($index, $item) => $item.id;
function Journal_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "p-button", 25);
    \u0275\u0275listener("onClick", function Journal_Conditional_8_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.show("requests"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p-button", 26);
    \u0275\u0275listener("onClick", function Journal_Conditional_8_Template_p_button_onClick_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.show("administration"));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("outlined", ctx_r1.view() !== "requests")("ariaPressed", ctx_r1.view() === "requests");
    \u0275\u0275advance();
    \u0275\u0275property("outlined", ctx_r1.view() !== "administration")("ariaPressed", ctx_r1.view() === "administration");
  }
}
function Journal_Conditional_16_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", type_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r3.label);
  }
}
function Journal_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Journal_Conditional_16_For_1_Template, 2, 2, "option", 10, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.activityTypes);
  }
}
function Journal_Conditional_17_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", action_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r4.label);
  }
}
function Journal_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, Journal_Conditional_17_For_1_Template, 2, 2, "option", 10, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.auditActions);
  }
}
function Journal_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Chargement\u2026 ");
  }
}
function Journal_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", ctx_r1.total(), " entr\xE9e", ctx_r1.total() > 1 ? "s" : "", " ");
  }
}
function Journal_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function Journal_Conditional_39_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 30)(1, "td", 31)(2, "time");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 33);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("datetime", item_r5.event.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 6, item_r5.event.created_at, "dd/MM/y HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.event.actor_name ?? "Syst\xE8me");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.eventLabel(item_r5.event));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.request_title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Statut actuel : ", item_r5.request_status);
  }
}
function Journal_Conditional_39_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 34);
    \u0275\u0275text(2, "Aucune action ne correspond \xE0 ces filtres.");
    \u0275\u0275elementEnd()();
  }
}
function Journal_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23)(1, "caption", 27);
    \u0275\u0275text(2, "Journal des demandes, du plus r\xE9cent au plus ancien");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "thead")(4, "tr", 28)(5, "th", 29);
    \u0275\u0275text(6, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 29);
    \u0275\u0275text(8, "Auteur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 29);
    \u0275\u0275text(10, "Action");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 29);
    \u0275\u0275text(12, "Demande");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, Journal_Conditional_39_For_15_Template, 13, 9, "tr", 30, _forTrack1, false, Journal_Conditional_39_ForEmpty_16_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275repeater(((tmp_1_0 = ctx_r1.activity()) == null ? null : tmp_1_0.items) ?? \u0275\u0275pureFunction0(1, _c0));
  }
}
function Journal_Conditional_40_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 30)(1, "td", 31)(2, "time");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementStart(7, "span", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 32);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 32);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 35);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("datetime", entry_r6.occurred_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 7, entry_r6.occurred_at, "dd/MM/y HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", entry_r6.actor_name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.roleLabel(entry_r6.actor_role));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.auditLabels[entry_r6.action]);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r6.target_label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.details(entry_r6) || "\u2014");
  }
}
function Journal_Conditional_40_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275text(2, "Aucune op\xE9ration ne correspond \xE0 ces filtres.");
    \u0275\u0275elementEnd()();
  }
}
function Journal_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 23)(1, "caption", 27);
    \u0275\u0275text(2, "Journal d\u2019administration, du plus r\xE9cent au plus ancien");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "thead")(4, "tr", 28)(5, "th", 29);
    \u0275\u0275text(6, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 29);
    \u0275\u0275text(8, "Auteur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 29);
    \u0275\u0275text(10, "Action");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 29);
    \u0275\u0275text(12, "Objet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 29);
    \u0275\u0275text(14, "D\xE9tails");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, Journal_Conditional_40_For_17_Template, 15, 10, "tr", 30, _forTrack2, false, Journal_Conditional_40_ForEmpty_18_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(((tmp_1_0 = ctx_r1.audit()) == null ? null : tmp_1_0.items) ?? \u0275\u0275pureFunction0(1, _c0));
  }
}
function Journal_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 24)(1, "p-button", 37);
    \u0275\u0275listener("onClick", function Journal_Conditional_41_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load(ctx_r1.filters.page - 1));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p-button", 39);
    \u0275\u0275listener("onClick", function Journal_Conditional_41_Template_p_button_onClick_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load(ctx_r1.filters.page + 1));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("text", true)("disabled", ctx_r1.filters.page <= 1 || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Page ", ctx_r1.filters.page, " sur ", ctx_r1.pages());
    \u0275\u0275advance();
    \u0275\u0275property("text", true)("disabled", ctx_r1.filters.page >= ctx_r1.pages() || ctx_r1.loading());
  }
}
var EMPTY_FILTERS = { type: null, since: null, until: null, search: "", page: 1 };
var Journal = class _Journal {
  api = inject(JournalService);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  searches = new Subject();
  canAudit = computed(() => this.auth.hasRole("manager", "admin"), ...ngDevMode ? [{ debugName: "canAudit" }] : []);
  view = signal("requests", ...ngDevMode ? [{ debugName: "view" }] : []);
  activityTypes = ACTIVITY_TYPES;
  auditActions = Object.keys(AUDIT_LABELS).map((value) => ({ value, label: AUDIT_LABELS[value] }));
  auditLabels = AUDIT_LABELS;
  eventLabel = eventLabel;
  details = auditDetails;
  activity = signal(null, ...ngDevMode ? [{ debugName: "activity" }] : []);
  audit = signal(null, ...ngDevMode ? [{ debugName: "audit" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  filters = __spreadValues({}, EMPTY_FILTERS);
  constructor() {
    this.searches.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load(1));
  }
  ngOnInit() {
    this.load(1);
  }
  show(view) {
    if (view === this.view())
      return;
    this.view.set(view);
    this.filters = __spreadValues({}, EMPTY_FILTERS);
    this.load(1);
  }
  searchChanged() {
    this.searches.next();
  }
  reset() {
    this.filters = __spreadValues({}, EMPTY_FILTERS);
    this.load(1);
  }
  total() {
    return (this.view() === "requests" ? this.activity() : this.audit())?.total ?? 0;
  }
  pages() {
    return Math.max(1, (this.view() === "requests" ? this.activity() : this.audit())?.total_pages ?? 1);
  }
  load(page = this.filters.page) {
    this.filters = __spreadProps(__spreadValues({}, this.filters), { page });
    this.loading.set(true);
    this.error.set(null);
    const done = () => this.loading.set(false);
    const fail = (error) => this.error.set(apiErrorMessage(error));
    if (this.view() === "requests") {
      this.api.activity(this.filters).pipe(finalize(done)).subscribe({ next: (result) => this.activity.set(result), error: fail });
    } else {
      this.api.audit(this.filters).pipe(finalize(done)).subscribe({ next: (result) => this.audit.set(result), error: fail });
    }
  }
  /** Exporte toutes les lignes correspondant aux filtres (jusqu'à 100), pour justifier une action. */
  exportCsv() {
    const all = __spreadProps(__spreadValues({}, this.filters), { page: 1 });
    const date = (iso) => new Date(iso).toLocaleString("fr-FR");
    if (this.view() === "requests") {
      this.download(this.api.activity(all, 100), (page) => toCsv(["Date", "Auteur", "Action", "Demande", "Statut actuel"], page.items.map((item) => [date(item.event.created_at), item.event.actor_name ?? "Syst\xE8me", eventLabel(item.event), item.request_title, item.request_status])));
    } else {
      this.download(this.api.audit(all, 100), (page) => toCsv(["Date", "Auteur", "R\xF4le", "Action", "Objet", "D\xE9tails"], page.items.map((entry) => [date(entry.occurred_at), entry.actor_name, this.roleLabel(entry.actor_role), AUDIT_LABELS[entry.action], entry.target_label, auditDetails(entry)])));
    }
  }
  roleLabel(role) {
    return ROLE_LABELS[role] ?? role;
  }
  download(source, build) {
    source.subscribe({
      next: (page) => {
        const url = URL.createObjectURL(new Blob([build(page)], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `journal-${this.view()}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: (error) => this.error.set(apiErrorMessage(error))
    });
  }
  static \u0275fac = function Journal_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Journal)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Journal, selectors: [["app-journal"]], decls: 42, vars: 15, consts: [[1, "card"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-4"], [1, "m-0", "text-2xl", "font-semibold"], [1, "mb-0", "mt-2", "text-muted-color"], ["label", "Exporter (CSV)", "icon", "pi pi-download", "severity", "secondary", 3, "onClick", "outlined", "disabled"], ["role", "group", "aria-label", "Journal affich\xE9", 1, "mt-5", "flex", "flex-wrap", "gap-2"], ["aria-label", "Filtrer le journal", 1, "mt-5", "grid", "grid-cols-1", "gap-4", "md:grid-cols-4", 3, "ngSubmit"], [1, "grid", "gap-1"], ["for", "journal-type", 1, "text-sm", "font-semibold"], ["id", "journal-type", "name", "type", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["for", "journal-since", 1, "text-sm", "font-semibold"], ["id", "journal-since", "name", "since", "type", "date", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["for", "journal-until", 1, "text-sm", "font-semibold"], ["id", "journal-until", "name", "until", "type", "date", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["for", "journal-search", 1, "text-sm", "font-semibold"], ["id", "journal-search", "name", "search", "type", "search", "aria-describedby", "journal-search-help", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["id", "journal-search-help", 1, "text-muted-color"], [1, "mt-3", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["role", "status", 1, "m-0", "text-sm", "text-muted-color"], ["label", "R\xE9initialiser les filtres", "icon", "pi pi-filter-slash", "severity", "secondary", 3, "onClick", "text"], ["role", "alert", 1, "text-red-700", "dark:text-red-300"], [1, "mt-3", "overflow-x-auto"], [1, "w-full", "border-collapse", "text-left"], ["aria-label", "Pages du journal", 1, "mt-4", "flex", "items-center", "justify-center", "gap-3"], ["label", "Demandes", "icon", "pi pi-inbox", 3, "onClick", "outlined", "ariaPressed"], ["label", "Administration", "icon", "pi pi-shield", 3, "onClick", "outlined", "ariaPressed"], [1, "sr-only"], [1, "border-b", "border-surface"], ["scope", "col", 1, "p-2"], [1, "border-b", "border-surface", "align-top"], [1, "p-2", "whitespace-nowrap"], [1, "p-2"], [1, "block", "text-sm", "text-muted-color"], ["colspan", "4", 1, "p-4", "text-muted-color"], [1, "p-2", "text-sm"], ["colspan", "5", 1, "p-4", "text-muted-color"], ["icon", "pi pi-chevron-left", "severity", "secondary", "ariaLabel", "Page pr\xE9c\xE9dente", 3, "onClick", "text", "disabled"], ["aria-current", "page"], ["icon", "pi pi-chevron-right", "severity", "secondary", "ariaLabel", "Page suivante", 3, "onClick", "text", "disabled"]], template: function Journal_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Journal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Qui a fait quoi, quand, et sur quoi. Les entr\xE9es ne peuvent \xEAtre ni modifi\xE9es ni supprim\xE9es.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "p-button", 4);
      \u0275\u0275listener("onClick", function Journal_Template_p_button_onClick_7_listener() {
        return ctx.exportCsv();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, Journal_Conditional_8_Template, 3, 4, "div", 5);
      \u0275\u0275elementStart(9, "form", 6);
      \u0275\u0275listener("ngSubmit", function Journal_Template_form_ngSubmit_9_listener() {
        return ctx.load(1);
      });
      \u0275\u0275elementStart(10, "div", 7)(11, "label", 8);
      \u0275\u0275text(12, "Action");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function Journal_Template_select_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.type, $event) || (ctx.filters.type = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Journal_Template_select_ngModelChange_13_listener() {
        return ctx.load(1);
      });
      \u0275\u0275elementStart(14, "option", 10);
      \u0275\u0275text(15, "Toutes les actions");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, Journal_Conditional_16_Template, 2, 0)(17, Journal_Conditional_17_Template, 2, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 7)(19, "label", 11);
      \u0275\u0275text(20, "Du");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function Journal_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.since, $event) || (ctx.filters.since = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Journal_Template_input_ngModelChange_21_listener() {
        return ctx.load(1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 7)(23, "label", 13);
      \u0275\u0275text(24, "Au (inclus)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function Journal_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.until, $event) || (ctx.filters.until = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Journal_Template_input_ngModelChange_25_listener() {
        return ctx.load(1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 7)(27, "label", 15);
      \u0275\u0275text(28, "Rechercher");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function Journal_Template_input_ngModelChange_29_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.search, $event) || (ctx.filters.search = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function Journal_Template_input_ngModelChange_29_listener() {
        return ctx.searchChanged();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "small", 17);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 18)(33, "p", 19);
      \u0275\u0275conditionalCreate(34, Journal_Conditional_34_Template, 1, 0)(35, Journal_Conditional_35_Template, 1, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p-button", 20);
      \u0275\u0275listener("onClick", function Journal_Template_p_button_onClick_36_listener() {
        return ctx.reset();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(37, Journal_Conditional_37_Template, 2, 1, "p", 21);
      \u0275\u0275elementStart(38, "div", 22);
      \u0275\u0275conditionalCreate(39, Journal_Conditional_39_Template, 17, 2, "table", 23)(40, Journal_Conditional_40_Template, 19, 2, "table", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(41, Journal_Conditional_41_Template, 5, 6, "nav", 24);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_12_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("outlined", true)("disabled", !ctx.total());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canAudit() ? 8 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.type);
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.view() === "requests" ? 16 : 17);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.since);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.until);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.search);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.view() === "requests" ? "Titre de la demande ou auteur" : "Auteur ou objet");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading() ? 34 : 35);
      \u0275\u0275advance(2);
      \u0275\u0275property("text", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_12_0 = ctx.error()) ? 37 : -1, tmp_12_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.view() === "requests" ? 39 : 40);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.pages() > 1 ? 41 : -1);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, ButtonModule, Button, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Journal, [{
    type: Component,
    args: [{ selector: "app-journal", imports: [DatePipe, FormsModule, ButtonModule], template: `<div class="card">
    <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
            <h1 class="m-0 text-2xl font-semibold">Journal</h1>
            <p class="mb-0 mt-2 text-muted-color">Qui a fait quoi, quand, et sur quoi. Les entr\xE9es ne peuvent \xEAtre ni modifi\xE9es ni supprim\xE9es.</p>
        </div>
        <p-button label="Exporter (CSV)" icon="pi pi-download" severity="secondary" [outlined]="true" [disabled]="!total()" (onClick)="exportCsv()" />
    </div>

    @if (canAudit()) {
        <div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Journal affich\xE9">
            <p-button label="Demandes" icon="pi pi-inbox" [outlined]="view() !== 'requests'" [ariaPressed]="view() === 'requests'" (onClick)="show('requests')" />
            <p-button label="Administration" icon="pi pi-shield" [outlined]="view() !== 'administration'" [ariaPressed]="view() === 'administration'" (onClick)="show('administration')" />
        </div>
    }

    <form class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4" (ngSubmit)="load(1)" aria-label="Filtrer le journal">
        <div class="grid gap-1">
            <label for="journal-type" class="text-sm font-semibold">Action</label>
            <select id="journal-type" name="type" class="p-inputtext w-full" [(ngModel)]="filters.type" (ngModelChange)="load(1)">
                <option [ngValue]="null">Toutes les actions</option>
                @if (view() === 'requests') {
                    @for (type of activityTypes; track type.value) {
                        <option [ngValue]="type.value">{{ type.label }}</option>
                    }
                } @else {
                    @for (action of auditActions; track action.value) {
                        <option [ngValue]="action.value">{{ action.label }}</option>
                    }
                }
            </select>
        </div>
        <div class="grid gap-1">
            <label for="journal-since" class="text-sm font-semibold">Du</label>
            <input id="journal-since" name="since" type="date" class="p-inputtext w-full" [(ngModel)]="filters.since" (ngModelChange)="load(1)" />
        </div>
        <div class="grid gap-1">
            <label for="journal-until" class="text-sm font-semibold">Au (inclus)</label>
            <input id="journal-until" name="until" type="date" class="p-inputtext w-full" [(ngModel)]="filters.until" (ngModelChange)="load(1)" />
        </div>
        <div class="grid gap-1">
            <label for="journal-search" class="text-sm font-semibold">Rechercher</label>
            <input
                id="journal-search"
                name="search"
                type="search"
                class="p-inputtext w-full"
                [(ngModel)]="filters.search"
                (ngModelChange)="searchChanged()"
                aria-describedby="journal-search-help"
            />
            <small id="journal-search-help" class="text-muted-color">{{ view() === 'requests' ? 'Titre de la demande ou auteur' : 'Auteur ou objet' }}</small>
        </div>
    </form>

    <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p class="m-0 text-sm text-muted-color" role="status">
            @if (loading()) {
                Chargement\u2026
            } @else {
                {{ total() }} entr\xE9e{{ total() > 1 ? 's' : '' }}
            }
        </p>
        <p-button label="R\xE9initialiser les filtres" icon="pi pi-filter-slash" severity="secondary" [text]="true" (onClick)="reset()" />
    </div>

    @if (error(); as message) {
        <p role="alert" class="text-red-700 dark:text-red-300">{{ message }}</p>
    }

    <div class="mt-3 overflow-x-auto">
        @if (view() === 'requests') {
            <table class="w-full border-collapse text-left">
                <caption class="sr-only">Journal des demandes, du plus r\xE9cent au plus ancien</caption>
                <thead>
                    <tr class="border-b border-surface">
                        <th scope="col" class="p-2">Date</th>
                        <th scope="col" class="p-2">Auteur</th>
                        <th scope="col" class="p-2">Action</th>
                        <th scope="col" class="p-2">Demande</th>
                    </tr>
                </thead>
                <tbody>
                    @for (item of activity()?.items ?? []; track item.event.id) {
                        <tr class="border-b border-surface align-top">
                            <td class="p-2 whitespace-nowrap">
                                <time [attr.datetime]="item.event.created_at">{{ item.event.created_at | date: 'dd/MM/y HH:mm' }}</time>
                            </td>
                            <td class="p-2">{{ item.event.actor_name ?? 'Syst\xE8me' }}</td>
                            <td class="p-2">{{ eventLabel(item.event) }}</td>
                            <td class="p-2">
                                {{ item.request_title }}
                                <span class="block text-sm text-muted-color">Statut actuel : {{ item.request_status }}</span>
                            </td>
                        </tr>
                    } @empty {
                        <tr>
                            <td colspan="4" class="p-4 text-muted-color">Aucune action ne correspond \xE0 ces filtres.</td>
                        </tr>
                    }
                </tbody>
            </table>
        } @else {
            <table class="w-full border-collapse text-left">
                <caption class="sr-only">Journal d\u2019administration, du plus r\xE9cent au plus ancien</caption>
                <thead>
                    <tr class="border-b border-surface">
                        <th scope="col" class="p-2">Date</th>
                        <th scope="col" class="p-2">Auteur</th>
                        <th scope="col" class="p-2">Action</th>
                        <th scope="col" class="p-2">Objet</th>
                        <th scope="col" class="p-2">D\xE9tails</th>
                    </tr>
                </thead>
                <tbody>
                    @for (entry of audit()?.items ?? []; track entry.id) {
                        <tr class="border-b border-surface align-top">
                            <td class="p-2 whitespace-nowrap">
                                <time [attr.datetime]="entry.occurred_at">{{ entry.occurred_at | date: 'dd/MM/y HH:mm' }}</time>
                            </td>
                            <td class="p-2">
                                {{ entry.actor_name }}
                                <span class="block text-sm text-muted-color">{{ roleLabel(entry.actor_role) }}</span>
                            </td>
                            <td class="p-2">{{ auditLabels[entry.action] }}</td>
                            <td class="p-2">{{ entry.target_label }}</td>
                            <td class="p-2 text-sm">{{ details(entry) || '\u2014' }}</td>
                        </tr>
                    } @empty {
                        <tr>
                            <td colspan="5" class="p-4 text-muted-color">Aucune op\xE9ration ne correspond \xE0 ces filtres.</td>
                        </tr>
                    }
                </tbody>
            </table>
        }
    </div>

    @if (pages() > 1) {
        <nav class="mt-4 flex items-center justify-center gap-3" aria-label="Pages du journal">
            <p-button icon="pi pi-chevron-left" severity="secondary" [text]="true" ariaLabel="Page pr\xE9c\xE9dente" [disabled]="filters.page <= 1 || loading()" (onClick)="load(filters.page - 1)" />
            <span aria-current="page">Page {{ filters.page }} sur {{ pages() }}</span>
            <p-button icon="pi pi-chevron-right" severity="secondary" [text]="true" ariaLabel="Page suivante" [disabled]="filters.page >= pages() || loading()" (onClick)="load(filters.page + 1)" />
        </nav>
    }
</div>
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Journal, { className: "Journal", filePath: "src/app/journal/journal.ts", lineNumber: 29 });
})();
export {
  Journal
};
//# sourceMappingURL=chunk-2C4JUWMR.js.map
