import {
  JournalService
} from "./chunk-3BGGQYBZ.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import {
  CitizenRequestService
} from "./chunk-QNPZAXSG.js";
import {
  STATUS_TRANSITIONS,
  eventLabel
} from "./chunk-KJD3IBMG.js";
import "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  catchError,
  computed,
  finalize,
  forkJoin,
  inject,
  of,
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
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-TSUH44O7.js";

// src/app/agent-workspace/agent-workspace.ts
var _forTrack0 = ($index, $item) => $item.event.id;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.target;
function AgentWorkspace_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function AgentWorkspace_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "time");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 18);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", item_r1.event.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, item_r1.event.created_at, "dd/MM HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.eventLabel(item_r1.event));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", item_r1.request_title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("par ", item_r1.event.actor_name ?? "Syst\xE8me");
  }
}
function AgentWorkspace_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 11);
    \u0275\u0275repeaterCreate(1, AgentWorkspace_Conditional_21_For_2_Template, 10, 8, "li", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.recentActivity());
  }
}
function AgentWorkspace_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Aucune action r\xE9cente sur vos demandes.");
    \u0275\u0275elementEnd();
  }
}
function AgentWorkspace_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Chargement de vos demandes\u2026");
    \u0275\u0275elementEnd();
  }
}
function AgentWorkspace_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Aucune demande ne vous est attribu\xE9e pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function AgentWorkspace_Conditional_34_For_20_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "time");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.eventLabel(event_r6), " \xB7 ");
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", event_r6.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 3, event_r6.created_at, "dd/MM/yyyy HH:mm"));
  }
}
function AgentWorkspace_Conditional_34_For_20_Conditional_10_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1, "Chargement\u2026");
    \u0275\u0275elementEnd();
  }
}
function AgentWorkspace_Conditional_34_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 36);
    \u0275\u0275repeaterCreate(1, AgentWorkspace_Conditional_34_For_20_Conditional_10_For_2_Template, 5, 6, "li", null, _forTrack1, false, AgentWorkspace_Conditional_34_For_20_Conditional_10_ForEmpty_3_Template, 2, 0, "li");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.timeline());
  }
}
function AgentWorkspace_Conditional_34_For_20_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_For_20_For_23_Template_button_click_0_listener() {
      const action_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.move(item_r5, action_r8.target));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r8 = ctx.$implicit;
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(action_r8.target === "R\xE9solu" ? "resolve-button" : "secondary-button");
    \u0275\u0275property("disabled", ctx_r1.saving() === item_r5.id);
    \u0275\u0275attribute("aria-label", action_r8.label + " : " + item_r5.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() === item_r5.id ? "Enregistrement\u2026" : action_r8.label, " ");
  }
}
function AgentWorkspace_Conditional_34_For_20_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, "Aucune action");
    \u0275\u0275elementEnd();
  }
}
function AgentWorkspace_Conditional_34_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 12);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 35);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_For_20_Template_button_click_8_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleTimeline(item_r5));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, AgentWorkspace_Conditional_34_For_20_Conditional_10_Template, 4, 1, "ol", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td")(16, "span", 37);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td");
    \u0275\u0275repeaterCreate(22, AgentWorkspace_Conditional_34_For_20_For_23_Template, 2, 5, "button", 38, _forTrack2, false, AgentWorkspace_Conditional_34_For_20_ForEmpty_24_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("action-row", item_r5.status === "En cours");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.location);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r1.timelineFor() === item_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.timelineFor() === item_r5.id ? "Masquer l\u2019historique" : "Voir l\u2019historique", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.timelineFor() === item_r5.id ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.priority);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-status", ctx_r1.statusKey(item_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.scheduled_at ? \u0275\u0275pipeBind2(20, 14, item_r5.scheduled_at, "medium") : "Non planifi\xE9e");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.actions(item_r5));
  }
}
function AgentWorkspace_Conditional_34_For_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_For_27_Template_button_click_0_listener() {
      const pageNumber_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(pageNumber_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageNumber_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-active", pageNumber_r10 === ctx_r1.page());
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275attribute("aria-current", pageNumber_r10 === ctx_r1.page() ? "page" : null)("aria-label", "Page " + pageNumber_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pageNumber_r10);
  }
}
function AgentWorkspace_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "table", 20)(2, "caption");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "thead")(5, "tr")(6, "th", 21);
    \u0275\u0275text(7, "Demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 21);
    \u0275\u0275text(9, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 21);
    \u0275\u0275text(11, "Priorit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 21);
    \u0275\u0275text(13, "\xC9tat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 21);
    \u0275\u0275text(15, "\xC9ch\xE9ance pr\xE9vue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 21);
    \u0275\u0275text(17, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, AgentWorkspace_Conditional_34_For_20_Template, 25, 17, "tr", 22, _forTrack1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "nav", 23)(22, "button", 24);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275element(23, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 26);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.page() - 1));
    });
    \u0275\u0275element(25, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(26, AgentWorkspace_Conditional_34_For_27_Template, 2, 6, "button", 28, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(28, "button", 29);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.page() + 1));
    });
    \u0275\u0275element(29, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 31);
    \u0275\u0275listener("click", function AgentWorkspace_Conditional_34_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.pages()));
    });
    \u0275\u0275element(31, "i", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 33);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Demandes attribu\xE9es \xE0 votre compte, page ", ctx_r1.page(), " sur ", ctx_r1.pages());
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r1.items());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page() <= 1 || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() <= 1 || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.pageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() >= ctx_r1.pages() || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() >= ctx_r1.pages() || ctx_r1.loading());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r1.page(), " sur ", ctx_r1.pages());
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
  live = inject(LiveDataService);
  journal = inject(JournalService);
  destroyRef = inject(DestroyRef);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  pages = signal(1, ...ngDevMode ? [{ debugName: "pages" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  saving = signal(null, ...ngDevMode ? [{ debugName: "saving" }] : []);
  timelineFor = signal(null, ...ngDevMode ? [{ debugName: "timelineFor" }] : []);
  timeline = signal([], ...ngDevMode ? [{ debugName: "timeline" }] : []);
  eventLabel = eventLabel;
  /** Dernières actions sur les demandes de l'agent (F47), le détail complet est dans le Journal. */
  recentActivity = signal([], ...ngDevMode ? [{ debugName: "recentActivity" }] : []);
  actionRequired = computed(() => this.items().filter((item) => item.status === "En cours"), ...ngDevMode ? [{ debugName: "actionRequired" }] : []);
  constructor() {
    this.live.watch(this.destroyRef, () => this.refresh(), () => !this.loading() && !this.saving());
    this.refresh();
  }
  refresh() {
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      page: this.api.list({ page: this.page(), page_size: PAGE_SIZE, sort_by: "created_at", sort_order: "desc" }),
      // Le journal est un complément : son indisponibilité ne bloque pas la liste.
      activity: this.journal.activity({ type: null, since: null, until: null, search: "", page: 1 }, 5).pipe(catchError(() => of(null)))
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: ({ page, activity }) => {
        this.recentActivity.set(activity?.items ?? []);
        this.items.set(page.items);
        this.page.set(page.page);
        this.pages.set(Math.max(1, page.total_pages));
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
  pageNumbers() {
    const total = this.pages();
    const first = Math.max(1, Math.min(this.page() - 2, total - 4));
    return Array.from({ length: Math.min(5, total) }, (_, index) => first + index);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AgentWorkspace, selectors: [["app-agent-workspace"]], decls: 35, vars: 5, consts: [[1, "agent-workspace"], [1, "page-header"], [1, "eyebrow"], ["id", "agent-heading"], [1, "intro"], ["type", "button", 1, "secondary-button", 3, "click", "disabled"], ["role", "alert", 1, "error-message"], ["aria-labelledby", "activity-heading", 1, "recent-activity"], [1, "section-heading"], ["id", "activity-heading"], ["routerLink", "/home/journal", 1, "secondary-button"], [1, "activity-list"], [1, "description"], ["aria-labelledby", "requests-heading"], ["id", "requests-heading"], ["aria-live", "polite", 1, "action-count"], ["role", "status", 1, "loading-message"], [1, "empty-message"], [1, "activity-author"], [1, "table-wrap"], [1, "app-data-table"], ["scope", "col"], [3, "action-row"], ["aria-label", "Pagination des demandes", 1, "app-table-pagination"], ["type", "button", "aria-label", "Premi\xE8re page", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-double-left"], ["type", "button", "aria-label", "Page pr\xE9c\xE9dente", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-left"], ["type", "button", 1, "app-pagination-button", "app-pagination-page", 3, "is-active", "disabled"], ["type", "button", "aria-label", "Page suivante", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-right"], ["type", "button", "aria-label", "Derni\xE8re page", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-double-right"], ["aria-live", "polite", 1, "sr-only"], [1, "address"], ["type", "button", 1, "link-button", 3, "click"], ["aria-label", "Historique de la demande", 1, "timeline"], [1, "status"], ["type", "button", 3, "class", "disabled"], [1, "no-action"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "app-pagination-button", "app-pagination-page", 3, "click", "disabled"]], template: function AgentWorkspace_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
      \u0275\u0275text(4, "Espace professionnel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 3);
      \u0275\u0275text(6, "Mes interventions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Suivez les demandes qui vous sont attribu\xE9es et mettez leur \xE9tat \xE0 jour.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function AgentWorkspace_Template_button_click_9_listener() {
        return ctx.refresh();
      });
      \u0275\u0275text(10, "Actualiser");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, AgentWorkspace_Conditional_11_Template, 2, 1, "p", 6);
      \u0275\u0275elementStart(12, "section", 7)(13, "div", 8)(14, "div")(15, "h2", 9);
      \u0275\u0275text(16, "Activit\xE9 r\xE9cente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p");
      \u0275\u0275text(18, "Les derni\xE8res actions sur vos demandes, avec leur auteur et leur date.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "a", 10);
      \u0275\u0275text(20, "Voir tout le journal");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, AgentWorkspace_Conditional_21_Template, 3, 0, "ol", 11)(22, AgentWorkspace_Conditional_22_Template, 2, 0, "p", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "section", 13)(24, "div", 8)(25, "div")(26, "h2", 14);
      \u0275\u0275text(27, "Demandes re\xE7ues");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29, "Les demandes en cours demandent une action de votre part.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "span", 15);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(32, AgentWorkspace_Conditional_32_Template, 2, 0, "p", 16)(33, AgentWorkspace_Conditional_33_Template, 2, 0, "p", 17)(34, AgentWorkspace_Conditional_34_Template, 34, 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_1_0 = ctx.error()) ? 11 : -1, tmp_1_0);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.recentActivity().length ? 21 : !ctx.loading() ? 22 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("", ctx.actionRequired().length, " en cours sur cette page");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() && !ctx.items().length ? 32 : !ctx.loading() && !ctx.items().length ? 33 : 34);
    }
  }, dependencies: [RouterLink, DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--text-color, #17212b);\n  font-size: 1rem;\n}\n.agent-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n.page-header[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  background: var(--surface-card, #fff);\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 0.4rem;\n  font-size: 1.8rem;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 0.35rem;\n  font-size: 1.3rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  color: #315b78;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.intro[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  color: var(--text-color-secondary, #465563);\n}\n.summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n}\n.summary[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  padding: 1.15rem;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\n.summary[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #344451;\n}\n.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.7rem;\n}\n.summary[_ngcontent-%COMP%]   .needs-action[_ngcontent-%COMP%] {\n  border: 2px solid #8c4a00;\n  background: #fff7e8;\n}\n.summary[_ngcontent-%COMP%]   .needs-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.action-count[_ngcontent-%COMP%] {\n  color: #703b00;\n  font-weight: 700;\n}\n.section-heading[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.app-data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  min-width: 7.5rem;\n  vertical-align: top;\n}\n.app-data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  min-width: 15rem;\n}\n.description[_ngcontent-%COMP%], \n.address[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 32rem;\n  margin-top: 0.3rem;\n  color: var(--text-color-secondary, #465563);\n  white-space: normal;\n}\n.address[_ngcontent-%COMP%] {\n  color: #344451;\n}\n.action-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: color-mix(in srgb, #f59e0b 10%, transparent);\n}\n.status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #607386;\n  border-radius: 999px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status[data-status=en_cours][_ngcontent-%COMP%] {\n  color: #713d00;\n  border-color: #8c4a00;\n  background: #fff0cf;\n}\n.status[data-status=resolu][_ngcontent-%COMP%] {\n  color: #14532d;\n  border-color: #287443;\n  background: #e9f7ed;\n}\n.resolve-button[_ngcontent-%COMP%], \n.secondary-button[_ngcontent-%COMP%] {\n  min-height: 2.75rem;\n  padding: 0.55rem 0.85rem;\n  border: 2px solid #124f70;\n  border-radius: 0.4rem;\n  color: #fff;\n  background: #124f70;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.secondary-button[_ngcontent-%COMP%] {\n  color: #124f70;\n  background: transparent;\n}\na.secondary-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  text-decoration: none;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #b45309;\n  outline-offset: 3px;\n}\n.no-action[_ngcontent-%COMP%] {\n  color: #465563;\n}\n.error-message[_ngcontent-%COMP%], \n.empty-message[_ngcontent-%COMP%], \n.loading-message[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 0.5rem;\n  background: var(--surface-card, #fff);\n}\n.error-message[_ngcontent-%COMP%] {\n  border: 2px solid #a21c24;\n  color: #7f1d1d;\n}\n@media (max-width: 50rem) {\n  .summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .page-header[_ngcontent-%COMP%], \n   .section-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n  .section-heading[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .table-wrap[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n    min-width: 58rem;\n  }\n}\n@media (max-width: 30rem) {\n  .page-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .app-table-pagination[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n}\n.status[data-status=en_attente][_ngcontent-%COMP%] {\n  color: #334155;\n  border-color: #64748b;\n  background: #f1f5f9;\n}\n.status[data-status=rejete][_ngcontent-%COMP%] {\n  color: #7f1d1d;\n  border-color: #b91c1c;\n  background: #fef2f2;\n}\ntd[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    + button[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\n.link-button[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--primary-color);\n  text-decoration: underline;\n  cursor: pointer;\n}\n.timeline[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  padding-left: 1.25rem;\n  font-size: 0.875rem;\n  color: var(--text-color-secondary);\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.activity-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.75rem;\n  padding: 0.6rem 0;\n  border-bottom: 1px solid #d5dde3;\n}\n.activity-list[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] {\n  min-width: 6.5rem;\n  font-variant-numeric: tabular-nums;\n}\n.activity-author[_ngcontent-%COMP%] {\n  color: #344451;\n}\n/*# sourceMappingURL=agent-workspace.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgentWorkspace, [{
    type: Component,
    args: [{ selector: "app-agent-workspace", imports: [DatePipe, RouterLink], template: `<div class="agent-workspace">
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

    <section class="recent-activity" aria-labelledby="activity-heading">
        <div class="section-heading">
            <div>
                <h2 id="activity-heading">Activit\xE9 r\xE9cente</h2>
                <p>Les derni\xE8res actions sur vos demandes, avec leur auteur et leur date.</p>
            </div>
            <a routerLink="/home/journal" class="secondary-button">Voir tout le journal</a>
        </div>
        @if (recentActivity().length) {
            <ol class="activity-list">
                @for (item of recentActivity(); track item.event.id) {
                    <li>
                        <time [attr.datetime]="item.event.created_at">{{ item.event.created_at | date: 'dd/MM HH:mm' }}</time>
                        <span><strong>{{ eventLabel(item.event) }}</strong> \u2014 {{ item.request_title }}</span>
                        <span class="activity-author">par {{ item.event.actor_name ?? 'Syst\xE8me' }}</span>
                    </li>
                }
            </ol>
        } @else if (!loading()) {
            <p class="description">Aucune action r\xE9cente sur vos demandes.</p>
        }
    </section>

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
                <table class="app-data-table">
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
            <nav class="app-table-pagination" aria-label="Pagination des demandes">
                <button type="button" class="app-pagination-button" aria-label="Premi\xE8re page" [disabled]="page() <= 1 || loading()" (click)="goToPage(1)"><i class="pi pi-angle-double-left" aria-hidden="true"></i></button>
                <button type="button" class="app-pagination-button" aria-label="Page pr\xE9c\xE9dente" [disabled]="page() <= 1 || loading()" (click)="goToPage(page() - 1)"><i class="pi pi-angle-left" aria-hidden="true"></i></button>
                @for (pageNumber of pageNumbers(); track pageNumber) {
                    <button type="button" class="app-pagination-button app-pagination-page" [class.is-active]="pageNumber === page()" [attr.aria-current]="pageNumber === page() ? 'page' : null" [attr.aria-label]="'Page ' + pageNumber" [disabled]="loading()" (click)="goToPage(pageNumber)">{{ pageNumber }}</button>
                }
                <button type="button" class="app-pagination-button" aria-label="Page suivante" [disabled]="page() >= pages() || loading()" (click)="goToPage(page() + 1)"><i class="pi pi-angle-right" aria-hidden="true"></i></button>
                <button type="button" class="app-pagination-button" aria-label="Derni\xE8re page" [disabled]="page() >= pages() || loading()" (click)="goToPage(pages())"><i class="pi pi-angle-double-right" aria-hidden="true"></i></button>
                <span class="sr-only" aria-live="polite">Page {{ page() }} sur {{ pages() }}</span>
            </nav>
        }
    </section>
</div>
`, styles: ["/* src/app/agent-workspace/agent-workspace.scss */\n:host {\n  display: block;\n  color: var(--text-color, #17212b);\n  font-size: 1rem;\n}\n.agent-workspace {\n  display: grid;\n  gap: 1.5rem;\n}\n.page-header,\n.section-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.page-header {\n  padding: 1.5rem;\n  border-radius: 0.75rem;\n  background: var(--surface-card, #fff);\n}\nh1,\nh2,\np {\n  margin-top: 0;\n}\nh1 {\n  margin-bottom: 0.4rem;\n  font-size: 1.8rem;\n}\nh2 {\n  margin-bottom: 0.35rem;\n  font-size: 1.3rem;\n}\n.eyebrow {\n  margin-bottom: 0.5rem;\n  color: #315b78;\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n.intro,\n.section-heading p {\n  margin-bottom: 0;\n  color: var(--text-color-secondary, #465563);\n}\n.summary {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 1rem;\n}\n.summary article {\n  display: grid;\n  gap: 0.45rem;\n  padding: 1.15rem;\n  border: 1px solid #aebbc6;\n  border-radius: 0.65rem;\n  background: var(--surface-card, #fff);\n}\n.summary article span {\n  color: #344451;\n}\n.summary strong {\n  font-size: 1.7rem;\n}\n.summary .needs-action {\n  border: 2px solid #8c4a00;\n  background: #fff7e8;\n}\n.summary .needs-action span,\n.action-count {\n  color: #703b00;\n  font-weight: 700;\n}\n.section-heading {\n  margin-bottom: 1rem;\n}\n.table-wrap {\n  overflow-x: auto;\n}\n.app-data-table td {\n  min-width: 7.5rem;\n  vertical-align: top;\n}\n.app-data-table td:first-child {\n  min-width: 15rem;\n}\n.description,\n.address {\n  display: block;\n  max-width: 32rem;\n  margin-top: 0.3rem;\n  color: var(--text-color-secondary, #465563);\n  white-space: normal;\n}\n.address {\n  color: #344451;\n}\n.action-row td {\n  background: color-mix(in srgb, #f59e0b 10%, transparent);\n}\n.status {\n  display: inline-block;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #607386;\n  border-radius: 999px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.status[data-status=en_cours] {\n  color: #713d00;\n  border-color: #8c4a00;\n  background: #fff0cf;\n}\n.status[data-status=resolu] {\n  color: #14532d;\n  border-color: #287443;\n  background: #e9f7ed;\n}\n.resolve-button,\n.secondary-button {\n  min-height: 2.75rem;\n  padding: 0.55rem 0.85rem;\n  border: 2px solid #124f70;\n  border-radius: 0.4rem;\n  color: #fff;\n  background: #124f70;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n.secondary-button {\n  color: #124f70;\n  background: transparent;\n}\na.secondary-button {\n  display: inline-flex;\n  align-items: center;\n  text-decoration: none;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  opacity: 0.65;\n}\nbutton:focus-visible {\n  outline: 3px solid #b45309;\n  outline-offset: 3px;\n}\n.no-action {\n  color: #465563;\n}\n.error-message,\n.empty-message,\n.loading-message {\n  padding: 1rem;\n  border-radius: 0.5rem;\n  background: var(--surface-card, #fff);\n}\n.error-message {\n  border: 2px solid #a21c24;\n  color: #7f1d1d;\n}\n@media (max-width: 50rem) {\n  .summary {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .page-header,\n  .section-heading {\n    align-items: flex-start;\n  }\n  .section-heading {\n    flex-direction: column;\n  }\n  .table-wrap table {\n    min-width: 58rem;\n  }\n}\n@media (max-width: 30rem) {\n  .page-header {\n    flex-direction: column;\n  }\n  .summary {\n    grid-template-columns: 1fr;\n  }\n  .app-table-pagination {\n    flex-wrap: wrap;\n  }\n}\n.status[data-status=en_attente] {\n  color: #334155;\n  border-color: #64748b;\n  background: #f1f5f9;\n}\n.status[data-status=rejete] {\n  color: #7f1d1d;\n  border-color: #b91c1c;\n  background: #fef2f2;\n}\ntd button + button {\n  margin-left: 0.5rem;\n}\n.link-button {\n  display: block;\n  margin-top: 0.5rem;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--primary-color);\n  text-decoration: underline;\n  cursor: pointer;\n}\n.timeline {\n  margin: 0.5rem 0 0;\n  padding-left: 1.25rem;\n  font-size: 0.875rem;\n  color: var(--text-color-secondary);\n}\n.activity-list {\n  display: grid;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.activity-list li {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.75rem;\n  padding: 0.6rem 0;\n  border-bottom: 1px solid #d5dde3;\n}\n.activity-list time {\n  min-width: 6.5rem;\n  font-variant-numeric: tabular-nums;\n}\n.activity-author {\n  color: #344451;\n}\n/*# sourceMappingURL=agent-workspace.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AgentWorkspace, { className: "AgentWorkspace", filePath: "src/app/agent-workspace/agent-workspace.ts", lineNumber: 29 });
})();
export {
  AgentWorkspace
};
//# sourceMappingURL=chunk-SGEXET3Z.js.map
