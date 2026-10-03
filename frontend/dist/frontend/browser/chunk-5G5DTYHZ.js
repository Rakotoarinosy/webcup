import {
  ArrivalPipe,
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
  TerraNovaStore,
  XpPipe,
  arrivalMinutes,
  difficultyLabel,
  difficultySeverity,
  statusMeta,
  waveLabel
} from "./chunk-KHJ46OSZ.js";
import "./chunk-V7U3SW4H.js";
import {
  MultiSelect,
  MultiSelectModule
} from "./chunk-65A54DW7.js";
import {
  InputNumber,
  InputNumberModule,
  Table,
  TableModule
} from "./chunk-URL4G3DB.js";
import {
  SelectButton,
  SelectButtonModule
} from "./chunk-WBYO2P7A.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
import {
  IconField,
  IconFieldModule,
  InputIcon,
  InputIconModule,
  Select,
  SelectModule
} from "./chunk-IHOQCUVC.js";
import {
  InputText,
  InputTextModule
} from "./chunk-UR4GPL7H.js";
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
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import "./chunk-UHTXY4UO.js";
import "./chunk-K3YQDOX3.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E5MYAYBP.js";

// src/app/terra-nova/requests/tn-requests.ts
var _c0 = () => [25, 50, 100];
var _c1 = () => ({ "min-width": "64rem" });
function TerraNovaRequests_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 24);
    \u0275\u0275listener("onClick", function TerraNovaRequests_Conditional_18_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetFilters());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("text", true);
  }
}
function TerraNovaRequests_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" sur ", ctx_r2.store.requests().length);
  }
}
function TerraNovaRequests_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "th", 25);
    \u0275\u0275text(2, "Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 26);
    \u0275\u0275text(6, "Demandeur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 27);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_29_Template_th_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSort("difficulty"));
    });
    \u0275\u0275text(8, "Difficult\xE9 ");
    \u0275\u0275element(9, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 29);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_29_Template_th_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSort("xp"));
    });
    \u0275\u0275text(11, "XP ");
    \u0275\u0275element(12, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 30);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_29_Template_th_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSort("wave"));
    });
    \u0275\u0275text(14, "Vague ");
    \u0275\u0275element(15, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 31);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_29_Template_th_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSort("arrival"));
    });
    \u0275\u0275text(17, "Arriv\xE9e ");
    \u0275\u0275element(18, "i", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 32);
    \u0275\u0275text(20, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "th", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275classMap(ctx_r2.sortIcon("difficulty"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.sortIcon("xp"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.sortIcon("wave"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.sortIcon("arrival"));
  }
}
function TerraNovaRequests_ng_template_31_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 36);
  }
}
function TerraNovaRequests_ng_template_31_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("dont +", r_r6.xp_time_bonus, " bonus");
  }
}
function TerraNovaRequests_ng_template_31_ng_template_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 40);
  }
  if (rf & 2) {
    const r_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r2.statusMeta(r_r6.status).label)("severity", ctx_r2.statusMeta(r_r6.status).severity);
  }
}
function TerraNovaRequests_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 34);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_31_Template_tr_click_0_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.store.openDetail(r_r6.request_code));
    });
    \u0275\u0275elementStart(1, "td")(2, "span", 35);
    \u0275\u0275conditionalCreate(3, TerraNovaRequests_ng_template_31_Conditional_3_Template, 1, 0, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "span", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "div", 38);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 39);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275element(14, "p-tag", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 41)(16, "div", 42);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "xp");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, TerraNovaRequests_ng_template_31_Conditional_19_Template, 2, 1, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "arrival");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 44);
    \u0275\u0275listener("click", function TerraNovaRequests_ng_template_31_Template_td_click_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(26, "p-select", 45);
    \u0275\u0275listener("ngModelChange", function TerraNovaRequests_ng_template_31_Template_p_select_ngModelChange_26_listener($event) {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.store.updateStatus(r_r6.request_code, $event));
    });
    \u0275\u0275template(27, TerraNovaRequests_ng_template_31_ng_template_27_Template, 1, 2, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "td")(30, "p-button", 46);
    \u0275\u0275listener("onClick", function TerraNovaRequests_ng_template_31_Template_p_button_onClick_30_listener($event) {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r2.store.openDetail(r_r6.request_code));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("border-l-4", ctx_r2.store.newCodes().has(r_r6.request_code))("border-l-primary", ctx_r2.store.newCodes().has(r_r6.request_code));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.store.newCodes().has(r_r6.request_code) ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r6.request_code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("pTooltip", r_r6.message_public)("showDelay", 600);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r6.message_public);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r6.requester_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.requester_type);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r2.difficultyLabel(r_r6.difficulty_level, r_r6.difficulty))("severity", ctx_r2.difficultySeverity(r_r6.difficulty_level));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 23, r_r6.xp_total));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(r_r6.xp_time_bonus ? 19 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.waveLabel(r_r6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 25, r_r6.arrival_time));
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r2.statusOptions)("ngModel", r_r6.status)("ariaLabel", "Statut " + r_r6.request_code);
    \u0275\u0275advance(4);
    \u0275\u0275property("text", true)("rounded", true)("ariaLabel", "Voir " + r_r6.request_code);
  }
}
function TerraNovaRequests_ng_template_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275text(0, " Aucune demande ne correspond aux filtres. ");
    \u0275\u0275elementStart(1, "p-button", 48);
    \u0275\u0275listener("onClick", function TerraNovaRequests_ng_template_33_Conditional_2_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.resetFilters());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("text", true);
  }
}
function TerraNovaRequests_ng_template_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Aucune demande disponible pour le moment. ");
  }
}
function TerraNovaRequests_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 47);
    \u0275\u0275conditionalCreate(2, TerraNovaRequests_ng_template_33_Conditional_2_Template, 2, 1)(3, TerraNovaRequests_ng_template_33_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.store.requests().length ? 2 : 3);
  }
}
var SORTERS = {
  xp_desc: (a, b) => b.xp_total - a.xp_total,
  xp_asc: (a, b) => a.xp_total - b.xp_total,
  difficulty_desc: (a, b) => b.difficulty_level - a.difficulty_level || b.xp_total - a.xp_total,
  difficulty_asc: (a, b) => a.difficulty_level - b.difficulty_level || b.xp_total - a.xp_total,
  wave_desc: (a, b) => b.wave - a.wave,
  wave_asc: (a, b) => a.wave - b.wave,
  arrival_desc: (a, b) => arrivalMinutes(b.arrival_time) - arrivalMinutes(a.arrival_time),
  arrival_asc: (a, b) => arrivalMinutes(a.arrival_time) - arrivalMinutes(b.arrival_time),
  code_asc: (a, b) => a.request_code.localeCompare(b.request_code, "fr", { numeric: true })
};
var TerraNovaRequests = class _TerraNovaRequests {
  store = inject(TerraNovaStore);
  statusOptions = STATUS_OPTIONS;
  difficultyOptions = DIFFICULTY_OPTIONS;
  difficultyLabel = difficultyLabel;
  difficultySeverity = difficultySeverity;
  statusMeta = statusMeta;
  waveLabel = waveLabel;
  sortOptions = [
    { value: "xp_desc", label: "XP d\xE9croissant" },
    { value: "xp_asc", label: "XP croissant" },
    { value: "difficulty_desc", label: "Difficult\xE9 (expert \u2192 facile)" },
    { value: "difficulty_asc", label: "Difficult\xE9 (facile \u2192 expert)" },
    { value: "wave_desc", label: "Vague (r\xE9cente \u2192 initiale)" },
    { value: "wave_asc", label: "Vague (initiale \u2192 r\xE9cente)" },
    { value: "arrival_desc", label: "Date d'arriv\xE9e (r\xE9cente)" },
    { value: "arrival_asc", label: "Date d'arriv\xE9e (ancienne)" },
    { value: "code_asc", label: "Code" }
  ];
  originOptions = [
    { value: "all", label: "Toutes" },
    { value: "initial", label: "Initiales" },
    { value: "wave", label: "Vagues" }
  ];
  search = signal("", ...ngDevMode ? [{ debugName: "search" }] : []);
  difficultyFilter = signal([], ...ngDevMode ? [{ debugName: "difficultyFilter" }] : []);
  statusFilter = signal([], ...ngDevMode ? [{ debugName: "statusFilter" }] : []);
  waveFilter = signal([], ...ngDevMode ? [{ debugName: "waveFilter" }] : []);
  requesterFilter = signal([], ...ngDevMode ? [{ debugName: "requesterFilter" }] : []);
  origin = signal("all", ...ngDevMode ? [{ debugName: "origin" }] : []);
  xpMin = signal(null, ...ngDevMode ? [{ debugName: "xpMin" }] : []);
  xpMax = signal(null, ...ngDevMode ? [{ debugName: "xpMax" }] : []);
  onlyNew = signal(false, ...ngDevMode ? [{ debugName: "onlyNew" }] : []);
  sort = signal("xp_desc", ...ngDevMode ? [{ debugName: "sort" }] : []);
  first = signal(0, ...ngDevMode ? [{ debugName: "first" }] : []);
  // Options déduites des données : aucun nombre de vagues ni type de demandeur codé en dur.
  waveOptions = computed(() => [...new Set(this.store.requests().map((r) => r.wave))].sort((a, b) => a - b).map((w) => ({ value: w, label: w === 0 ? "Initiale" : `Vague ${w}` })), ...ngDevMode ? [{ debugName: "waveOptions" }] : []);
  requesterOptions = computed(() => [
    ...new Set(this.store.requests().map((r) => r.requester_type).filter(Boolean))
  ].sort((a, b) => a.localeCompare(b, "fr")).map((t) => ({ value: t, label: t })), ...ngDevMode ? [{ debugName: "requesterOptions" }] : []);
  activeFilterCount = computed(() => [this.search().trim(), this.difficultyFilter().length, this.statusFilter().length, this.waveFilter().length, this.requesterFilter().length, this.origin() !== "all", this.xpMin() !== null, this.xpMax() !== null, this.onlyNew()].filter(Boolean).length, ...ngDevMode ? [{ debugName: "activeFilterCount" }] : []);
  filtered = computed(() => {
    const q = normalize(this.search().trim());
    const difficulties = this.difficultyFilter();
    const statuses = this.statusFilter();
    const waves = this.waveFilter();
    const types = this.requesterFilter();
    const origin = this.origin();
    const min = this.xpMin();
    const max = this.xpMax();
    const onlyNew = this.onlyNew();
    const fresh = this.store.newCodes();
    return this.store.requests().filter((r) => {
      if (q && !normalize([r.request_code, r.message_public, r.requester_name, r.requester_type, r.group_name].join(" ")).includes(q))
        return false;
      if (difficulties.length && !difficulties.includes(r.difficulty_level))
        return false;
      if (statuses.length && !statuses.includes(r.status))
        return false;
      if (waves.length && !waves.includes(r.wave))
        return false;
      if (types.length && !types.includes(r.requester_type))
        return false;
      if (origin === "initial" && !r.is_initial)
        return false;
      if (origin === "wave" && r.is_initial)
        return false;
      if (min !== null && r.xp_total < min)
        return false;
      if (max !== null && r.xp_total > max)
        return false;
      return !onlyNew || fresh.has(r.request_code);
    }).sort(SORTERS[this.sort()]);
  }, ...ngDevMode ? [{ debugName: "filtered" }] : []);
  filteredXp = computed(() => this.filtered().reduce((sum, r) => sum + r.xp_total, 0), ...ngDevMode ? [{ debugName: "filteredXp" }] : []);
  /** Clic sur un en-tête : bascule entre les deux sens du tri. */
  toggleSort(base) {
    const desc = `${base}_desc`;
    this.sort.set(this.sort() === desc ? `${base}_asc` : desc);
  }
  sortIcon(base) {
    if (this.sort() === `${base}_desc`)
      return "pi pi-sort-amount-down";
    if (this.sort() === `${base}_asc`)
      return "pi pi-sort-amount-up-alt";
    return "pi pi-sort-alt text-muted-color";
  }
  setFilter(target, value) {
    target.set(value);
    this.first.set(0);
  }
  resetFilters() {
    this.search.set("");
    this.difficultyFilter.set([]);
    this.statusFilter.set([]);
    this.waveFilter.set([]);
    this.requesterFilter.set([]);
    this.origin.set("all");
    this.xpMin.set(null);
    this.xpMax.set(null);
    this.onlyNew.set(false);
    this.first.set(0);
  }
  static \u0275fac = function TerraNovaRequests_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaRequests)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerraNovaRequests, selectors: [["app-terra-nova-requests"]], decls: 35, vars: 46, consts: [["header", ""], ["body", ""], ["emptymessage", ""], ["selectedItem", ""], [1, "card"], [1, "mb-3", "flex", "flex-wrap", "items-center", "gap-3"], [1, "min-w-64", "flex-1"], ["styleClass", "pi pi-search"], ["pInputText", "", "type", "search", "placeholder", "Rechercher un code, un message, un demandeur\u2026", "aria-label", "Recherche", 1, "w-full", 3, "ngModelChange", "ngModel"], ["optionLabel", "label", "optionValue", "value", "size", "small", 3, "ngModelChange", "options", "allowEmpty", "ngModel"], ["icon", "pi pi-bell", "size", "small", 3, "onClick", "label", "outlined", "severity"], ["optionLabel", "label", "optionValue", "value", "size", "small", "ariaLabel", "Trier", 1, "min-w-60", 3, "ngModelChange", "options", "ngModel"], [1, "mb-4", "flex", "flex-wrap", "items-center", "gap-3"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Difficult\xE9", "display", "chip", "size", "small", 3, "ngModelChange", "options", "ngModel", "showToggleAll", "filter"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Statut", "display", "chip", "size", "small", 3, "ngModelChange", "options", "ngModel", "showToggleAll", "filter"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Vague", "size", "small", 3, "ngModelChange", "options", "ngModel", "showToggleAll", "filter"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Type de demandeur", "size", "small", 3, "ngModelChange", "options", "ngModel", "showToggleAll"], [1, "flex", "items-center", "gap-2"], ["placeholder", "XP min", "size", "small", "inputStyleClass", "w-28", "ariaLabel", "XP minimum", 3, "ngModelChange", "ngModel", "min", "step"], [1, "text-muted-color"], ["placeholder", "XP max", "size", "small", "inputStyleClass", "w-28", "ariaLabel", "XP maximum", 3, "ngModelChange", "ngModel", "min", "step"], ["label", "R\xE9initialiser", "icon", "pi pi-filter-slash", "severity", "secondary", "size", "small", 3, "text"], [1, "mb-2", "flex", "justify-between", "text-sm"], ["dataKey", "request_code", "size", "small", 3, "firstChange", "value", "loading", "paginator", "rows", "first", "rowsPerPageOptions", "rowHover", "tableStyle"], ["label", "R\xE9initialiser", "icon", "pi pi-filter-slash", "severity", "secondary", "size", "small", 3, "onClick", "text"], [2, "width", "6rem"], [2, "width", "12rem"], [1, "cursor-pointer", "whitespace-nowrap", "select-none", 2, "width", "8rem", 3, "click"], [1, "text-xs"], [1, "cursor-pointer", "text-right!", "whitespace-nowrap", "select-none", 2, "width", "7.5rem", 3, "click"], [1, "cursor-pointer", "whitespace-nowrap", "select-none", 2, "width", "6.5rem", 3, "click"], [1, "cursor-pointer", "whitespace-nowrap", "select-none", 2, "width", "7rem", 3, "click"], [2, "width", "11rem"], [2, "width", "3.5rem"], [1, "cursor-pointer", 3, "click"], [1, "inline-flex", "items-center", "gap-1.5", "font-mono", "font-semibold"], ["pTooltip", "Nouvelle demande", 1, "inline-block", "h-2", "w-2", "rounded-full", "bg-primary"], ["tooltipPosition", "top", 1, "line-clamp-2", "text-sm", "leading-snug", 3, "pTooltip", "showDelay"], [1, "line-clamp-2", "text-sm"], [1, "text-xs", "text-muted-color"], [3, "value", "severity"], [1, "text-right"], [1, "font-semibold", "whitespace-nowrap"], [1, "text-xs", "text-green-600"], [3, "click"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ariaLabel"], ["icon", "pi pi-eye", "severity", "secondary", "size", "small", 3, "onClick", "text", "rounded", "ariaLabel"], ["colspan", "9", 1, "py-10", "text-center", "text-muted-color"], ["label", "R\xE9initialiser les filtres", "size", "small", 3, "onClick", "text"]], template: function TerraNovaRequests_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "p-iconfield", 6);
      \u0275\u0275element(3, "p-inputicon", 7);
      \u0275\u0275elementStart(4, "input", 8);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_input_ngModelChange_4_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.search, $event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "p-selectbutton", 9);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_selectbutton_ngModelChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.origin, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p-button", 10);
      \u0275\u0275listener("onClick", function TerraNovaRequests_Template_p_button_onClick_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.onlyNew, !ctx.onlyNew()));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p-select", 11);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_select_ngModelChange_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sort.set($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 12)(9, "p-multiselect", 13);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_multiselect_ngModelChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.difficultyFilter, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p-multiselect", 14);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_multiselect_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.statusFilter, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p-multiselect", 15);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_multiselect_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.waveFilter, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p-multiselect", 16);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_multiselect_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.requesterFilter, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 17)(14, "p-inputnumber", 18);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_inputnumber_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.xpMin, $event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 19);
      \u0275\u0275text(16, "\u2013");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p-inputnumber", 20);
      \u0275\u0275listener("ngModelChange", function TerraNovaRequests_Template_p_inputnumber_ngModelChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setFilter(ctx.xpMax, $event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(18, TerraNovaRequests_Conditional_18_Template, 1, 1, "p-button", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 22)(20, "span")(21, "strong");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " demande(s) ");
      \u0275\u0275conditionalCreate(24, TerraNovaRequests_Conditional_24_Template, 2, 1, "span", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 19);
      \u0275\u0275text(26);
      \u0275\u0275pipe(27, "xp");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "p-table", 23);
      \u0275\u0275listener("firstChange", function TerraNovaRequests_Template_p_table_firstChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.first.set($event));
      });
      \u0275\u0275template(29, TerraNovaRequests_ng_template_29_Template, 22, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(31, TerraNovaRequests_ng_template_31_Template, 31, 27, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(33, TerraNovaRequests_ng_template_33_Template, 4, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.search());
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.originOptions)("allowEmpty", false)("ngModel", ctx.origin());
      \u0275\u0275advance();
      \u0275\u0275property("label", "Nouvelles" + (ctx.store.newCodes().size ? " (" + ctx.store.newCodes().size + ")" : ""))("outlined", !ctx.onlyNew())("severity", ctx.onlyNew() ? "primary" : "secondary");
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.sortOptions)("ngModel", ctx.sort());
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.difficultyOptions)("ngModel", ctx.difficultyFilter())("showToggleAll", false)("filter", false);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.statusOptions)("ngModel", ctx.statusFilter())("showToggleAll", false)("filter", false);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.waveOptions())("ngModel", ctx.waveFilter())("showToggleAll", false)("filter", false);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.requesterOptions())("ngModel", ctx.requesterFilter())("showToggleAll", false);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngModel", ctx.xpMin())("min", 0)("step", 250);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", ctx.xpMax())("min", 0)("step", 250);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeFilterCount() ? 18 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.filtered().length);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeFilterCount() ? 24 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(27, 42, ctx.filteredXp()), " au total");
      \u0275\u0275advance(2);
      \u0275\u0275property("value", ctx.filtered())("loading", !ctx.store.loaded())("paginator", ctx.filtered().length > 25)("rows", 25)("first", ctx.first())("rowsPerPageOptions", \u0275\u0275pureFunction0(44, _c0))("rowHover", true)("tableStyle", \u0275\u0275pureFunction0(45, _c1));
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ButtonModule, Button, IconFieldModule, IconField, InputIconModule, InputIcon, InputNumberModule, InputNumber, InputTextModule, InputText, MultiSelectModule, MultiSelect, SelectModule, Select, SelectButtonModule, SelectButton, TableModule, Table, TagModule, Tag, TooltipModule, Tooltip, ArrivalPipe, XpPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaRequests, [{
    type: Component,
    args: [{ selector: "app-terra-nova-requests", imports: [FormsModule, ButtonModule, IconFieldModule, InputIconModule, InputNumberModule, InputTextModule, MultiSelectModule, SelectModule, SelectButtonModule, TableModule, TagModule, TooltipModule, ArrivalPipe, XpPipe], template: `<div class="card">
    <div class="mb-3 flex flex-wrap items-center gap-3">
        <p-iconfield class="min-w-64 flex-1">
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="search" class="w-full" placeholder="Rechercher un code, un message, un demandeur\u2026" aria-label="Recherche" [ngModel]="search()" (ngModelChange)="setFilter(search, $event)" />
        </p-iconfield>
        <p-selectbutton [options]="originOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModel]="origin()" (ngModelChange)="setFilter(origin, $event)" size="small" />
        <p-button
            [label]="'Nouvelles' + (store.newCodes().size ? ' (' + store.newCodes().size + ')' : '')"
            icon="pi pi-bell"
            size="small"
            [outlined]="!onlyNew()"
            [severity]="onlyNew() ? 'primary' : 'secondary'"
            (onClick)="setFilter(onlyNew, !onlyNew())"
        />
        <p-select [options]="sortOptions" optionLabel="label" optionValue="value" [ngModel]="sort()" (ngModelChange)="sort.set($event)" size="small" class="min-w-60" ariaLabel="Trier" />
    </div>

    <div class="mb-4 flex flex-wrap items-center gap-3">
        <p-multiselect
            [options]="difficultyOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Difficult\xE9"
            [ngModel]="difficultyFilter()"
            (ngModelChange)="setFilter(difficultyFilter, $event)"
            [showToggleAll]="false"
            [filter]="false"
            display="chip"
            size="small"
        />
        <p-multiselect
            [options]="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Statut"
            [ngModel]="statusFilter()"
            (ngModelChange)="setFilter(statusFilter, $event)"
            [showToggleAll]="false"
            [filter]="false"
            display="chip"
            size="small"
        />
        <p-multiselect [options]="waveOptions()" optionLabel="label" optionValue="value" placeholder="Vague" [ngModel]="waveFilter()" (ngModelChange)="setFilter(waveFilter, $event)" [showToggleAll]="false" [filter]="false" size="small" />
        <p-multiselect [options]="requesterOptions()" optionLabel="label" optionValue="value" placeholder="Type de demandeur" [ngModel]="requesterFilter()" (ngModelChange)="setFilter(requesterFilter, $event)" [showToggleAll]="false" size="small" />
        <div class="flex items-center gap-2">
            <p-inputnumber [ngModel]="xpMin()" (ngModelChange)="setFilter(xpMin, $event)" placeholder="XP min" [min]="0" [step]="250" size="small" inputStyleClass="w-28" ariaLabel="XP minimum" />
            <span class="text-muted-color">\u2013</span>
            <p-inputnumber [ngModel]="xpMax()" (ngModelChange)="setFilter(xpMax, $event)" placeholder="XP max" [min]="0" [step]="250" size="small" inputStyleClass="w-28" ariaLabel="XP maximum" />
        </div>
        @if (activeFilterCount()) {
            <p-button label="R\xE9initialiser" icon="pi pi-filter-slash" severity="secondary" [text]="true" size="small" (onClick)="resetFilters()" />
        }
    </div>

    <div class="mb-2 flex justify-between text-sm">
        <span>
            <strong>{{ filtered().length }}</strong> demande(s)
            @if (activeFilterCount()) {
                <span class="text-muted-color"> sur {{ store.requests().length }}</span>
            }
        </span>
        <span class="text-muted-color">{{ filteredXp() | xp }} au total</span>
    </div>

    <p-table
        [value]="filtered()"
        [loading]="!store.loaded()"
        dataKey="request_code"
        [paginator]="filtered().length > 25"
        [rows]="25"
        [first]="first()"
        (firstChange)="first.set($event)"
        [rowsPerPageOptions]="[25, 50, 100]"
        [rowHover]="true"
        size="small"
        [tableStyle]="{ 'min-width': '64rem' }"
    >
        <ng-template #header>
            <tr>
                <th style="width: 6rem">Code</th>
                <th>Demande</th>
                <th style="width: 12rem">Demandeur</th>
                <th style="width: 8rem" class="cursor-pointer whitespace-nowrap select-none" (click)="toggleSort('difficulty')">Difficult\xE9 <i class="text-xs" [class]="sortIcon('difficulty')"></i></th>
                <th style="width: 7.5rem" class="cursor-pointer text-right! whitespace-nowrap select-none" (click)="toggleSort('xp')">XP <i class="text-xs" [class]="sortIcon('xp')"></i></th>
                <th style="width: 6.5rem" class="cursor-pointer whitespace-nowrap select-none" (click)="toggleSort('wave')">Vague <i class="text-xs" [class]="sortIcon('wave')"></i></th>
                <th style="width: 7rem" class="cursor-pointer whitespace-nowrap select-none" (click)="toggleSort('arrival')">Arriv\xE9e <i class="text-xs" [class]="sortIcon('arrival')"></i></th>
                <th style="width: 11rem">Statut</th>
                <th style="width: 3.5rem"></th>
            </tr>
        </ng-template>

        <ng-template #body let-r>
            <tr class="cursor-pointer" (click)="store.openDetail(r.request_code)">
                <td [class.border-l-4]="store.newCodes().has(r.request_code)" [class.border-l-primary]="store.newCodes().has(r.request_code)">
                    <span class="inline-flex items-center gap-1.5 font-mono font-semibold">
                        @if (store.newCodes().has(r.request_code)) {
                            <span class="inline-block h-2 w-2 rounded-full bg-primary" pTooltip="Nouvelle demande"></span>
                        }
                        {{ r.request_code }}
                    </span>
                </td>
                <td>
                    <span class="line-clamp-2 text-sm leading-snug" [pTooltip]="r.message_public" tooltipPosition="top" [showDelay]="600">{{ r.message_public }}</span>
                </td>
                <td>
                    <div class="line-clamp-2 text-sm">{{ r.requester_name }}</div>
                    <div class="text-xs text-muted-color">{{ r.requester_type }}</div>
                </td>
                <td><p-tag [value]="difficultyLabel(r.difficulty_level, r.difficulty)" [severity]="difficultySeverity(r.difficulty_level)" /></td>
                <td class="text-right">
                    <div class="font-semibold whitespace-nowrap">{{ r.xp_total | xp }}</div>
                    @if (r.xp_time_bonus) {
                        <div class="text-xs text-green-600">dont +{{ r.xp_time_bonus }} bonus</div>
                    }
                </td>
                <td>{{ waveLabel(r) }}</td>
                <td>{{ r.arrival_time | arrival }}</td>
                <td (click)="$event.stopPropagation()">
                    <p-select [options]="statusOptions" optionLabel="label" optionValue="value" [ngModel]="r.status" (ngModelChange)="store.updateStatus(r.request_code, $event)" size="small" appendTo="body" [ariaLabel]="'Statut ' + r.request_code">
                        <ng-template #selectedItem>
                            <p-tag [value]="statusMeta(r.status).label" [severity]="statusMeta(r.status).severity" />
                        </ng-template>
                    </p-select>
                </td>
                <td>
                    <p-button icon="pi pi-eye" [text]="true" [rounded]="true" severity="secondary" size="small" [ariaLabel]="'Voir ' + r.request_code" (onClick)="$event.stopPropagation(); store.openDetail(r.request_code)" />
                </td>
            </tr>
        </ng-template>

        <ng-template #emptymessage>
            <tr>
                <td colspan="9" class="py-10 text-center text-muted-color">
                    @if (store.requests().length) {
                        Aucune demande ne correspond aux filtres.
                        <p-button label="R\xE9initialiser les filtres" [text]="true" size="small" (onClick)="resetFilters()" />
                    } @else {
                        Aucune demande disponible pour le moment.
                    }
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerraNovaRequests, { className: "TerraNovaRequests", filePath: "src/app/terra-nova/requests/tn-requests.ts", lineNumber: 39 });
})();
function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
export {
  TerraNovaRequests
};
//# sourceMappingURL=chunk-5G5DTYHZ.js.map
