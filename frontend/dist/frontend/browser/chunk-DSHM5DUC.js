import {
  CitizenRequestService
} from "./chunk-MURNZCDI.js";
import {
  STATUS_TRANSITIONS,
  eventLabel
} from "./chunk-ROYE6VN6.js";
import {
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  computed,
  finalize,
  forkJoin,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E5MYAYBP.js";

// src/app/agent-workspace/agent-workspace.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.target;
function AgentWorkspace_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function AgentWorkspace_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 15);
    \u0275\u0275text(1, "Aucune demande ne n\xE9cessite une prise en charge.");
    \u0275\u0275domElementEnd();
  }
}
function AgentWorkspace_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 7)(1, "article", 14)(2, "span");
    \u0275\u0275text(3, "Demandes \xE0 traiter");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, AgentWorkspace_Conditional_12_Conditional_6_Template, 2, 0, "span", 15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "article")(8, "span");
    \u0275\u0275text(9, "Total attribu\xE9");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(12, "article", 16)(13, "span");
    \u0275\u0275text(14, "En cours");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(17, "article")(18, "span");
    \u0275\u0275text(19, "En attente");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "strong");
    \u0275\u0275text(21);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(22, "article")(23, "span");
    \u0275\u0275text(24, "R\xE9solues");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.pendingCount());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.pendingCount() === 0 ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.total);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.count("En cours"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.count("En attente"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.count("R\xE9solu"));
  }
}
function AgentWorkspace_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 12);
    \u0275\u0275text(1, "Chargement de vos demandes\u2026");
    \u0275\u0275domElementEnd();
  }
}
function AgentWorkspace_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 13);
    \u0275\u0275text(1, "Aucune demande ne vous est attribu\xE9e pour le moment.");
    \u0275\u0275domElementEnd();
  }
}
function AgentWorkspace_Conditional_24_For_20_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "time");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const event_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.eventLabel(event_r5), " \xB7 ");
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", event_r5.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 3, event_r5.created_at, "dd/MM/yyyy HH:mm"));
  }
}
function AgentWorkspace_Conditional_24_For_20_Conditional_10_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li");
    \u0275\u0275text(1, "Chargement\u2026");
    \u0275\u0275domElementEnd();
  }
}
function AgentWorkspace_Conditional_24_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "ol", 23);
    \u0275\u0275repeaterCreate(1, AgentWorkspace_Conditional_24_For_20_Conditional_10_For_2_Template, 5, 6, "li", null, _forTrack0, false, AgentWorkspace_Conditional_24_For_20_Conditional_10_ForEmpty_3_Template, 2, 0, "li");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.timeline());
  }
}
function AgentWorkspace_Conditional_24_For_20_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 27);
    \u0275\u0275domListener("click", function AgentWorkspace_Conditional_24_For_20_For_23_Template_button_click_0_listener() {
      const action_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.move(item_r4, action_r7.target));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const action_r7 = ctx.$implicit;
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(action_r7.target === "R\xE9solu" ? "resolve-button" : "secondary-button");
    \u0275\u0275domProperty("disabled", ctx_r0.saving() === item_r4.id);
    \u0275\u0275attribute("aria-label", action_r7.label + " : " + item_r4.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() === item_r4.id ? "Enregistrement\u2026" : action_r7.label, " ");
  }
}
function AgentWorkspace_Conditional_24_For_20_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 26);
    \u0275\u0275text(1, "Aucune action");
    \u0275\u0275domElementEnd();
  }
}
function AgentWorkspace_Conditional_24_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "span", 15);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span", 21);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "button", 22);
    \u0275\u0275domListener("click", function AgentWorkspace_Conditional_24_For_20_Template_button_click_8_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleTimeline(item_r4));
    });
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(10, AgentWorkspace_Conditional_24_For_20_Conditional_10_Template, 4, 1, "ol", 23);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(15, "td")(16, "span", 24);
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "td");
    \u0275\u0275repeaterCreate(22, AgentWorkspace_Conditional_24_For_20_For_23_Template, 2, 5, "button", 25, _forTrack1, false, AgentWorkspace_Conditional_24_For_20_ForEmpty_24_Template, 2, 0, "span", 26);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("action-row", item_r4.status === "En cours");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.location);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r0.timelineFor() === item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.timelineFor() === item_r4.id ? "Masquer l\u2019historique" : "Voir l\u2019historique", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.timelineFor() === item_r4.id ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.priority);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", ctx_r0.statusKey(item_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r4.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.scheduled_at ? \u0275\u0275pipeBind2(20, 14, item_r4.scheduled_at, "medium") : "Non planifi\xE9e");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.actions(item_r4));
  }
}
function AgentWorkspace_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 17)(1, "table")(2, "caption");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "thead")(5, "tr")(6, "th", 18);
    \u0275\u0275text(7, "Demande");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "th", 18);
    \u0275\u0275text(9, "Cat\xE9gorie");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "th", 18);
    \u0275\u0275text(11, "Priorit\xE9");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "th", 18);
    \u0275\u0275text(13, "\xC9tat");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "th", 18);
    \u0275\u0275text(15, "\xC9ch\xE9ance pr\xE9vue");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "th", 18);
    \u0275\u0275text(17, "Actions");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, AgentWorkspace_Conditional_24_For_20_Template, 25, 17, "tr", 19, _forTrack0);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(21, "nav", 20)(22, "button", 5);
    \u0275\u0275domListener("click", function AgentWorkspace_Conditional_24_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.page() - 1));
    });
    \u0275\u0275text(23, "Page pr\xE9c\xE9dente");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(24, "span", 14);
    \u0275\u0275text(25);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(26, "button", 5);
    \u0275\u0275domListener("click", function AgentWorkspace_Conditional_24_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.page() + 1));
    });
    \u0275\u0275text(27, "Page suivante");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Demandes attribu\xE9es \xE0 votre compte, page ", ctx_r0.page(), " sur ", ctx_r0.pages());
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r0.items());
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r0.page() <= 1 || ctx_r0.loading());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r0.page(), " sur ", ctx_r0.pages());
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", ctx_r0.page() >= ctx_r0.pages() || ctx_r0.loading());
  }
}
var PAGE_SIZE = 20;
var AGENT_TARGETS = ["En cours", "En attente", "R\xE9solu"];
var ACTION_LABELS = {
  "En cours": "Reprendre",
  "En attente": "Mettre en attente",
  R\u00E9solu: "R\xE9soudre"
};
var AgentWorkspace = class _AgentWorkspace {
  api = inject(CitizenRequestService);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  pages = signal(1, ...ngDevMode ? [{ debugName: "pages" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  saving = signal(null, ...ngDevMode ? [{ debugName: "saving" }] : []);
  timelineFor = signal(null, ...ngDevMode ? [{ debugName: "timelineFor" }] : []);
  timeline = signal([], ...ngDevMode ? [{ debugName: "timeline" }] : []);
  eventLabel = eventLabel;
  actionRequired = computed(() => this.items().filter((item) => item.status === "En cours"), ...ngDevMode ? [{ debugName: "actionRequired" }] : []);
  count = (status) => this.stats()?.by_status[status] ?? 0;
  /** Demandes encore ouvertes qui attendent une action de l'agent. */
  pendingCount = computed(() => this.count("En cours") + this.count("En attente"), ...ngDevMode ? [{ debugName: "pendingCount" }] : []);
  constructor() {
    this.refresh();
  }
  refresh() {
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      page: this.api.list({ page: this.page(), page_size: PAGE_SIZE, sort_by: "created_at", sort_order: "desc" }),
      stats: this.api.dashboard()
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: ({ page, stats }) => {
        this.items.set(page.items);
        this.page.set(page.page);
        this.pages.set(Math.max(1, page.total_pages));
        this.stats.set(stats);
      },
      error: () => this.error.set("Impossible de charger vos demandes. R\xE9essayez dans quelques instants.")
    });
  }
  goToPage(page) {
    if (page < 1 || page > this.pages() || page === this.page())
      return;
    this.page.set(page);
    this.refresh();
  }
  actions(item) {
    return STATUS_TRANSITIONS[item.status].filter((target) => AGENT_TARGETS.includes(target)).map((target) => ({ target, label: ACTION_LABELS[target] ?? target }));
  }
  move(item, target) {
    if (this.saving())
      return;
    this.saving.set(item.id);
    this.api.changeStatus(item.id, target).pipe(finalize(() => this.saving.set(null))).subscribe({
      next: () => this.refresh(),
      error: (error) => this.error.set(`\xAB ${item.title} \xBB : ${apiErrorMessage(error)}`)
    });
  }
  toggleTimeline(item) {
    if (this.timelineFor() === item.id) {
      this.timelineFor.set(null);
      return;
    }
    this.timelineFor.set(item.id);
    this.timeline.set([]);
    this.api.events(item.id).subscribe({
      next: (events) => this.timeline.set(events),
      error: (error) => this.error.set(apiErrorMessage(error))
    });
  }
  /** Clé CSS stable du statut (« En cours » → « en_cours »). */
  statusKey(status) {
    return status.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(" ", "_");
  }
  static \u0275fac = function AgentWorkspace_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgentWorkspace)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AgentWorkspace, selectors: [["app-agent-workspace"]], decls: 25, vars: 5, consts: [["aria-labelledby", "agent-heading", 1, "agent-workspace"], [1, "page-header"], [1, "eyebrow"], ["id", "agent-heading"], [1, "intro"], ["type", "button", 1, "secondary-button", 3, "click", "disabled"], ["role", "alert", 1, "error-message"], ["aria-label", "R\xE9sum\xE9 de mes demandes", 1, "summary"], ["aria-labelledby", "requests-heading"], [1, "section-heading"], ["id", "requests-heading"], ["aria-live", "polite", 1, "action-count"], ["role", "status", 1, "loading-message"], [1, "empty-message"], ["aria-live", "polite"], [1, "description"], [1, "needs-action"], [1, "table-wrap"], ["scope", "col"], [3, "action-row"], ["aria-label", "Pagination des demandes", 1, "pagination"], [1, "address"], ["type", "button", 1, "link-button", 3, "click"], ["aria-label", "Historique de la demande", 1, "timeline"], [1, "status"], ["type", "button", 3, "class", "disabled"], [1, "no-action"], ["type", "button", 3, "click", "disabled"]], template: function AgentWorkspace_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "main", 0)(1, "header", 1)(2, "div")(3, "p", 2);
      \u0275\u0275text(4, "Espace professionnel");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "h1", 3);
      \u0275\u0275text(6, "Mes interventions");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "p", 4);
      \u0275\u0275text(8, "Suivez les demandes qui vous sont attribu\xE9es et mettez leur \xE9tat \xE0 jour.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(9, "button", 5);
      \u0275\u0275domListener("click", function AgentWorkspace_Template_button_click_9_listener() {
        return ctx.refresh();
      });
      \u0275\u0275text(10, "Actualiser");
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(11, AgentWorkspace_Conditional_11_Template, 2, 1, "p", 6);
      \u0275\u0275conditionalCreate(12, AgentWorkspace_Conditional_12_Template, 27, 6, "section", 7);
      \u0275\u0275domElementStart(13, "section", 8)(14, "div", 9)(15, "div")(16, "h2", 10);
      \u0275\u0275text(17, "Demandes re\xE7ues");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(18, "p");
      \u0275\u0275text(19, "Les demandes en cours demandent une action de votre part.");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(20, "span", 11);
      \u0275\u0275text(21);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(22, AgentWorkspace_Conditional_22_Template, 2, 0, "p", 12)(23, AgentWorkspace_Conditional_23_Template, 2, 0, "p", 13)(24, AgentWorkspace_Conditional_24_Template, 28, 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275advance(9);
      \u0275\u0275domProperty("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_1_0 = ctx.error()) ? 11 : -1, tmp_1_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.stats()) ? 12 : -1, tmp_2_0);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("", ctx.actionRequired().length, " en cours sur cette page");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() && !ctx.items().length ? 22 : !ctx.loading() && !ctx.items().length ? 23 : 24);
    }
  }, dependencies: [DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text-color, #17212b);\n  font-size: 1rem;\n}\n.agent-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n.page-header[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  background: var(--surface-card, #fff);\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 0.4rem;\n  font-size: 1.8rem;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 0.35rem;\n  font-size: 1.3rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  color: #315b78;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.intro[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  color: var(--text-color-secondary, #465563);\n}\n.summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n}\n.summary[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  padding: 1.15rem;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\n.summary[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #344451;\n}\n.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.7rem;\n}\n.summary[_ngcontent-%COMP%]   .needs-action[_ngcontent-%COMP%] {\n  border: 2px solid #8c4a00;\n  background: #fff7e8;\n}\n.summary[_ngcontent-%COMP%]   .needs-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.action-count[_ngcontent-%COMP%] {\n  color: #703b00;\n  font-weight: 700;\n}\n.section-heading[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n}\ncaption[_ngcontent-%COMP%] {\n  padding: 0.8rem 1rem;\n  text-align: left;\n  color: var(--text-color-secondary, #465563);\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  border-top: 1px solid #c5cfd7;\n  vertical-align: top;\n}\nth[_ngcontent-%COMP%] {\n  color: #283846;\n  background: var(--surface-ground, #f5f7f9);\n  font-size: 0.95rem;\n}\ntd[_ngcontent-%COMP%] {\n  min-width: 7.5rem;\n}\ntd[_ngcontent-%COMP%]:first-child {\n  min-width: 15rem;\n}\n.description[_ngcontent-%COMP%], \n.address[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 32rem;\n  margin-top: 0.3rem;\n  color: var(--text-color-secondary, #465563);\n  white-space: normal;\n}\n.address[_ngcontent-%COMP%] {\n  color: #344451;\n}\n.action-row[_ngcontent-%COMP%] {\n  background: #fffaf0;\n}\n.status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #607386;\n  border-radius: 999px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status[data-status=en_cours][_ngcontent-%COMP%] {\n  color: #713d00;\n  border-color: #8c4a00;\n  background: #fff0cf;\n}\n.status[data-status=resolu][_ngcontent-%COMP%] {\n  color: #14532d;\n  border-color: #287443;\n  background: #e9f7ed;\n}\n.resolve-button[_ngcontent-%COMP%], \n.secondary-button[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  padding: 0.55rem 0.85rem;\n  border: 2px solid #124f70;\n  border-radius: 0.4rem;\n  color: #fff;\n  background: #124f70;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.secondary-button[_ngcontent-%COMP%] {\n  color: #124f70;\n  background: transparent;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #b45309;\n  outline-offset: 3px;\n}\n.no-action[_ngcontent-%COMP%] {\n  color: #465563;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n.error-message[_ngcontent-%COMP%], \n.empty-message[_ngcontent-%COMP%], \n.loading-message[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 0.5rem;\n  background: var(--surface-card, #fff);\n}\n.error-message[_ngcontent-%COMP%] {\n  border: 2px solid #a21c24;\n  color: #7f1d1d;\n}\n@media (max-width: 50rem) {\n  .summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .page-header[_ngcontent-%COMP%], \n   .section-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .section-heading[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .table-wrap[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    min-width: 58rem;\n  }\n}\n@media (max-width: 30rem) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pagination[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.status[data-status=en_attente][_ngcontent-%COMP%] {\n  color: #334155;\n  border-color: #64748b;\n  background: #f1f5f9;\n}\n.status[data-status=rejete][_ngcontent-%COMP%] {\n  color: #7f1d1d;\n  border-color: #b91c1c;\n  background: #fef2f2;\n}\ntd[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n.link-button[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--primary-color);\n  text-decoration: underline;\n  cursor: pointer;\n}\n.timeline[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  padding-left: 1.25rem;\n  font-size: 0.875rem;\n  color: var(--text-color-secondary);\n}\n/*# sourceMappingURL=agent-workspace.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgentWorkspace, [{
    type: Component,
    args: [{ selector: "app-agent-workspace", imports: [DatePipe], template: `<main class="agent-workspace" aria-labelledby="agent-heading">
    <header class="page-header">
        <div>
            <p class="eyebrow">Espace professionnel</p>
            <h1 id="agent-heading">Mes interventions</h1>
            <p class="intro">Suivez les demandes qui vous sont attribu\xE9es et mettez leur \xE9tat \xE0 jour.</p>
        </div>
        <button type="button" class="secondary-button" (click)="refresh()" [disabled]="loading()">Actualiser</button>
    </header>

    @if (error(); as message) {
        <p class="error-message" role="alert">{{ message }}</p>
    }

    @if (stats(); as s) {
        <section class="summary" aria-label="R\xE9sum\xE9 de mes demandes">
            <article aria-live="polite">
                <span>Demandes \xE0 traiter</span>
                <strong>{{ pendingCount() }}</strong>
                @if (pendingCount() === 0) { <span class="description">Aucune demande ne n\xE9cessite une prise en charge.</span> }
            </article>
            <article><span>Total attribu\xE9</span><strong>{{ s.total }}</strong></article>
            <article class="needs-action"><span>En cours</span><strong>{{ count('En cours') }}</strong></article>
            <article><span>En attente</span><strong>{{ count('En attente') }}</strong></article>
            <article><span>R\xE9solues</span><strong>{{ count('R\xE9solu') }}</strong></article>
        </section>
    }

    <section aria-labelledby="requests-heading">
        <div class="section-heading">
            <div>
                <h2 id="requests-heading">Demandes re\xE7ues</h2>
                <p>Les demandes en cours demandent une action de votre part.</p>
            </div>
            <span class="action-count" aria-live="polite">{{ actionRequired().length }} en cours sur cette page</span>
        </div>

        @if (loading() && !items().length) {
            <p class="loading-message" role="status">Chargement de vos demandes\u2026</p>
        } @else if (!loading() && !items().length) {
            <p class="empty-message">Aucune demande ne vous est attribu\xE9e pour le moment.</p>
        } @else {
            <div class="table-wrap">
                <table>
                    <caption>Demandes attribu\xE9es \xE0 votre compte, page {{ page() }} sur {{ pages() }}</caption>
                    <thead>
                        <tr>
                            <th scope="col">Demande</th>
                            <th scope="col">Cat\xE9gorie</th>
                            <th scope="col">Priorit\xE9</th>
                            <th scope="col">\xC9tat</th>
                            <th scope="col">\xC9ch\xE9ance pr\xE9vue</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @for (item of items(); track item.id) {
                            <tr [class.action-row]="item.status === 'En cours'">
                                <td>
                                    <strong>{{ item.title }}</strong>
                                    <span class="description">{{ item.description }}</span>
                                    <span class="address">{{ item.location }}</span>
                                    <button type="button" class="link-button" [attr.aria-expanded]="timelineFor() === item.id" (click)="toggleTimeline(item)">
                                        {{ timelineFor() === item.id ? 'Masquer l\u2019historique' : 'Voir l\u2019historique' }}
                                    </button>
                                    @if (timelineFor() === item.id) {
                                        <ol class="timeline" aria-label="Historique de la demande">
                                            @for (event of timeline(); track event.id) {
                                                <li>{{ eventLabel(event) }} \xB7 <time [attr.datetime]="event.created_at">{{ event.created_at | date: 'dd/MM/yyyy HH:mm' }}</time></li>
                                            } @empty {
                                                <li>Chargement\u2026</li>
                                            }
                                        </ol>
                                    }
                                </td>
                                <td>{{ item.category }}</td>
                                <td>{{ item.priority }}</td>
                                <td><span class="status" [attr.data-status]="statusKey(item.status)">{{ item.status }}</span></td>
                                <td>{{ item.scheduled_at ? (item.scheduled_at | date: 'medium') : 'Non planifi\xE9e' }}</td>
                                <td>
                                    @for (action of actions(item); track action.target) {
                                        <button
                                            type="button"
                                            [class]="action.target === 'R\xE9solu' ? 'resolve-button' : 'secondary-button'"
                                            [disabled]="saving() === item.id"
                                            [attr.aria-label]="action.label + ' : ' + item.title"
                                            (click)="move(item, action.target)"
                                        >
                                            {{ saving() === item.id ? 'Enregistrement\u2026' : action.label }}
                                        </button>
                                    } @empty {
                                        <span class="no-action">Aucune action</span>
                                    }
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <nav class="pagination" aria-label="Pagination des demandes">
                <button type="button" class="secondary-button" [disabled]="page() <= 1 || loading()" (click)="goToPage(page() - 1)">Page pr\xE9c\xE9dente</button>
                <span aria-live="polite">Page {{ page() }} sur {{ pages() }}</span>
                <button type="button" class="secondary-button" [disabled]="page() >= pages() || loading()" (click)="goToPage(page() + 1)">Page suivante</button>
            </nav>
        }
    </section>
</main>
`, styles: ["/* src/app/agent-workspace/agent-workspace.scss */\n:host {\n  display: block;\n  color: var(--text-color, #17212b);\n  font-size: 1rem;\n}\n.agent-workspace {\n  display: grid;\n  gap: 1.5rem;\n}\n.page-header,\n.section-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.page-header {\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  background: var(--surface-card, #fff);\n}\nh1,\nh2,\np {\n  margin-top: 0;\n}\nh1 {\n  margin-bottom: 0.4rem;\n  font-size: 1.8rem;\n}\nh2 {\n  margin-bottom: 0.35rem;\n  font-size: 1.3rem;\n}\n.eyebrow {\n  margin-bottom: 0.5rem;\n  color: #315b78;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.intro,\n.section-heading p {\n  margin-bottom: 0;\n  color: var(--text-color-secondary, #465563);\n}\n.summary {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n}\n.summary article {\n  display: grid;\n  gap: 0.45rem;\n  padding: 1.15rem;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\n.summary article span {\n  color: #344451;\n}\n.summary strong {\n  font-size: 1.7rem;\n}\n.summary .needs-action {\n  border: 2px solid #8c4a00;\n  background: #fff7e8;\n}\n.summary .needs-action span,\n.action-count {\n  color: #703b00;\n  font-weight: 700;\n}\n.section-heading {\n  margin-bottom: 1rem;\n}\n.table-wrap {\n  overflow-x: auto;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n}\ncaption {\n  padding: 0.8rem 1rem;\n  text-align: left;\n  color: var(--text-color-secondary, #465563);\n}\nth,\ntd {\n  padding: 0.85rem 1rem;\n  border-top: 1px solid #c5cfd7;\n  vertical-align: top;\n}\nth {\n  color: #283846;\n  background: var(--surface-ground, #f5f7f9);\n  font-size: 0.95rem;\n}\ntd {\n  min-width: 7.5rem;\n}\ntd:first-child {\n  min-width: 15rem;\n}\n.description,\n.address {\n  display: block;\n  max-width: 32rem;\n  margin-top: 0.3rem;\n  color: var(--text-color-secondary, #465563);\n  white-space: normal;\n}\n.address {\n  color: #344451;\n}\n.action-row {\n  background: #fffaf0;\n}\n.status {\n  display: inline-block;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #607386;\n  border-radius: 999px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status[data-status=en_cours] {\n  color: #713d00;\n  border-color: #8c4a00;\n  background: #fff0cf;\n}\n.status[data-status=resolu] {\n  color: #14532d;\n  border-color: #287443;\n  background: #e9f7ed;\n}\n.resolve-button,\n.secondary-button {\n  min-height: 2.75rem;\n  padding: 0.55rem 0.85rem;\n  border: 2px solid #124f70;\n  border-radius: 0.4rem;\n  color: #fff;\n  background: #124f70;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.secondary-button {\n  color: #124f70;\n  background: transparent;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton:focus-visible {\n  outline: 3px solid #b45309;\n  outline-offset: 3px;\n}\n.no-action {\n  color: #465563;\n}\n.pagination {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n.error-message,\n.empty-message,\n.loading-message {\n  padding: 1rem;\n  border-radius: 0.5rem;\n  background: var(--surface-card, #fff);\n}\n.error-message {\n  border: 2px solid #a21c24;\n  color: #7f1d1d;\n}\n@media (max-width: 50rem) {\n  .summary {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .page-header,\n  .section-heading {\n    align-items: flex-start;\n  }\n  .section-heading {\n    flex-direction: column;\n  }\n  .table-wrap table {\n    min-width: 58rem;\n  }\n}\n@media (max-width: 30rem) {\n  .page-header {\n    flex-direction: column;\n  }\n  .summary {\n    grid-template-columns: 1fr;\n  }\n  .pagination {\n    flex-wrap: wrap;\n  }\n}\n.status[data-status=en_attente] {\n  color: #334155;\n  border-color: #64748b;\n  background: #f1f5f9;\n}\n.status[data-status=rejete] {\n  color: #7f1d1d;\n  border-color: #b91c1c;\n  background: #fef2f2;\n}\ntd button + button {\n  margin-left: 0.5rem;\n}\n.link-button {\n  display: block;\n  margin-top: 0.5rem;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--primary-color);\n  text-decoration: underline;\n  cursor: pointer;\n}\n.timeline {\n  margin: 0.5rem 0 0;\n  padding-left: 1.25rem;\n  font-size: 0.875rem;\n  color: var(--text-color-secondary);\n}\n/*# sourceMappingURL=agent-workspace.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AgentWorkspace, { className: "AgentWorkspace", filePath: "src/app/agent-workspace/agent-workspace.ts", lineNumber: 25 });
})();
export {
  AgentWorkspace
};
//# sourceMappingURL=chunk-DSHM5DUC.js.map
