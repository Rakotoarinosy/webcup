import {
  AGENT_STATUSES,
  AGENT_STATUS_LABELS
} from "./chunk-YOZFVDPL.js";
import {
  CategoryChart,
  Stats,
  TrendChart,
  toCategories,
  toStatCards,
  toTrend
} from "./chunk-TSB6BXKK.js";
import "./chunk-ZPDOWPDJ.js";
import {
  AuthService
} from "./chunk-BFXRYUZT.js";
import {
  AgentService
} from "./chunk-5QXMNFWU.js";
import "./chunk-OY2B3AGZ.js";
import {
  RouterLink
} from "./chunk-O26HSNKS.js";
import {
  InstitutService
} from "./chunk-GY5LYIJF.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
import {
  Select,
  SelectModule
} from "./chunk-IHOQCUVC.js";
import "./chunk-UR4GPL7H.js";
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
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import {
  MessageService
} from "./chunk-UHTXY4UO.js";
import {
  CitizenRequestService
} from "./chunk-MURNZCDI.js";
import {
  requestPrioritySeverity,
  requestStatusSeverity
} from "./chunk-ROYE6VN6.js";
import {
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  catchError,
  computed,
  forkJoin,
  inject,
  of,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-E5MYAYBP.js";

// src/app/auth/account/account.ts
var _forTrack0 = ($index, $item) => $item.link;
var _forTrack1 = ($index, $item) => $item.id;
function Account_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-button", 11);
  }
  if (rf & 2) {
    const shortcut_r1 = ctx.$implicit;
    const \u0275$index_30_r2 = ctx.$index;
    \u0275\u0275property("label", shortcut_r1.label)("icon", shortcut_r1.icon)("outlined", !(\u0275$index_30_r2 === 0))("routerLink", shortcut_r1.link);
  }
}
function Account_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 15);
    \u0275\u0275listener("onClick", function Account_Conditional_18_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.load());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true)("loading", ctx_r3.loading());
  }
}
function Account_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "label", 16);
    \u0275\u0275text(2, "Ma disponibilit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-select", 17);
    \u0275\u0275listener("ngModelChange", function Account_Conditional_19_Template_p_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.setAvailability($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const profile_r6 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r3.statusOptions)("ngModel", profile_r6.status)("disabled", ctx_r3.savingStatus());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Institut ", profile_r6.institut_name, " \xB7 ", profile_r6.interventions, " intervention(s)");
  }
}
function Account_Conditional_20_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Votre compte agent n'a pas de profil actif dans un institut. Un administrateur ou le responsable de votre institut doit vous y rattacher. ");
  }
}
function Account_Conditional_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Vous n'\xEAtes responsable d'aucun institut actif. Un administrateur doit vous d\xE9signer comme responsable. ");
  }
}
function Account_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14)(1, "div", 19);
    \u0275\u0275element(2, "i", 20);
    \u0275\u0275elementStart(3, "div")(4, "h2", 21);
    \u0275\u0275text(5, "Compte pas encore rattach\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 22);
    \u0275\u0275conditionalCreate(7, Account_Conditional_20_Conditional_7_Template, 1, 0)(8, Account_Conditional_20_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r3.auth.hasRole("agent") ? 7 : 8);
  }
}
function Account_Conditional_21_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function Account_Conditional_21_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r7.total, " au total \xB7 ", s_r7.resolution_rate, " % r\xE9solues");
  }
}
function Account_Conditional_21_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 33)(1, "div")(2, "div", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 18);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36);
    \u0275\u0275element(8, "p-tag", 37)(9, "p-tag", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r3.requestLink(request_r8));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", request_r8.category, " \xB7 ", request_r8.location, " \xB7 ", \u0275\u0275pipeBind2(6, 9, request_r8.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", request_r8.priority)("severity", ctx_r3.prioritySeverity(request_r8.priority));
    \u0275\u0275advance();
    \u0275\u0275property("value", request_r8.status)("severity", ctx_r3.statusSeverity(request_r8.status));
  }
}
function Account_Conditional_21_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.loading() ? "Chargement\u2026" : "Aucune demande pour le moment.");
  }
}
function Account_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Account_Conditional_21_Conditional_0_Template, 2, 1, "p", 23);
    \u0275\u0275elementStart(1, "div", 24)(2, "h2", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(4, "app-stats", 25);
    \u0275\u0275elementStart(5, "div", 26);
    \u0275\u0275element(6, "app-trend-chart", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 28);
    \u0275\u0275element(8, "app-category-chart", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "section", 30)(10, "div", 31)(11, "h2", 32);
    \u0275\u0275text(12, "Derni\xE8res demandes");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, Account_Conditional_21_Conditional_13_Template, 2, 2, "span", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(14, Account_Conditional_21_For_15_Template, 10, 12, "a", 33, _forTrack1, false, Account_Conditional_21_ForEmpty_16_Template, 2, 1, "p", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_6_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r3.error()) ? 0 : -1, tmp_1_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.scopeLabel());
    \u0275\u0275advance();
    \u0275\u0275property("stats", ctx_r3.cards());
    \u0275\u0275advance(2);
    \u0275\u0275property("trendData", ctx_r3.trend());
    \u0275\u0275advance(2);
    \u0275\u0275property("categoryData", ctx_r3.categories());
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_6_0 = ctx_r3.stats()) ? 13 : -1, tmp_6_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.recent());
  }
}
var RECENT_COUNT = 5;
var Account = class _Account {
  auth = inject(AuthService);
  requests = inject(CitizenRequestService);
  agents = inject(AgentService);
  instituts = inject(InstitutService);
  messages = inject(MessageService);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  recent = signal([], ...ngDevMode ? [{ debugName: "recent" }] : []);
  agent = signal(null, ...ngDevMode ? [{ debugName: "agent" }] : []);
  institut = signal(null, ...ngDevMode ? [{ debugName: "institut" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  savingStatus = signal(false, ...ngDevMode ? [{ debugName: "savingStatus" }] : []);
  cards = computed(() => toStatCards(this.stats()), ...ngDevMode ? [{ debugName: "cards" }] : []);
  trend = computed(() => toTrend(this.stats()), ...ngDevMode ? [{ debugName: "trend" }] : []);
  categories = computed(() => toCategories(this.stats()), ...ngDevMode ? [{ debugName: "categories" }] : []);
  statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
  statusSeverity = requestStatusSeverity;
  prioritySeverity = requestPrioritySeverity;
  /** Agent sans profil actif, ou manager sans institut actif : rien à afficher, on l'explique. */
  unattached = computed(() => {
    const user = this.auth.user();
    if (!user)
      return false;
    if (user.role === "agent")
      return !user.agent_id;
    if (user.role === "manager")
      return !user.institut_id;
    return false;
  }, ...ngDevMode ? [{ debugName: "unattached" }] : []);
  scopeLabel = computed(() => {
    const name = this.institut()?.name ?? this.agent()?.institut_name;
    switch (this.auth.user()?.role) {
      case "citizen":
        return "Vos demandes";
      case "agent":
        return name ? `Vos interventions \xB7 ${name}` : "Vos interventions";
      case "manager":
        return name ? `Institut ${name}` : "Votre institut";
      default:
        return "Toute la plateforme";
    }
  }, ...ngDevMode ? [{ debugName: "scopeLabel" }] : []);
  shortcuts = computed(() => {
    switch (this.auth.user()?.role) {
      case "citizen":
        return [
          { label: "Nouvelle demande", icon: "pi pi-plus", link: "/home/my-requests" },
          { label: "Services municipaux", icon: "pi pi-map-marker", link: "/home/municipal/services" }
        ];
      case "agent":
        return [{ label: "Mes interventions", icon: "pi pi-inbox", link: "/home/agent" }];
      case "manager":
        return [
          { label: "Demandes de l'institut", icon: "pi pi-inbox", link: "/home/requests" },
          { label: "Mes agents", icon: "pi pi-id-card", link: "/home/agents" },
          { label: "Tableau de bord", icon: "pi pi-chart-bar", link: "/home/dashboard" }
        ];
      case "admin":
        return [
          { label: "Instituts", icon: "pi pi-building", link: "/home/instituts" },
          { label: "Demandes", icon: "pi pi-inbox", link: "/home/requests" },
          { label: "Tableau de bord", icon: "pi pi-chart-bar", link: "/home/dashboard" }
        ];
      default:
        return [];
    }
  }, ...ngDevMode ? [{ debugName: "shortcuts" }] : []);
  ngOnInit() {
    this.load();
  }
  load() {
    if (this.unattached())
      return;
    const user = this.auth.user();
    this.loading.set(true);
    this.error.set(null);
    forkJoin({
      stats: this.requests.dashboard(),
      recent: this.requests.list({ page: 1, page_size: RECENT_COUNT, sort_by: "created_at", sort_order: "desc" }),
      agent: user?.agent_id ? this.agents.me().pipe(catchError(() => of(null))) : of(null),
      institut: user?.role === "manager" && user.institut_id ? this.instituts.get(user.institut_id).pipe(catchError(() => of(null))) : of(null)
    }).subscribe({
      next: ({ stats, recent, agent, institut }) => {
        this.stats.set(stats);
        this.recent.set(recent.items);
        this.agent.set(agent);
        this.institut.set(institut);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(apiErrorMessage(error));
      }
    });
  }
  /** L'agent déclare lui-même sa disponibilité. */
  setAvailability(status) {
    const agent = this.agent();
    if (!agent || agent.status === status)
      return;
    this.savingStatus.set(true);
    this.agents.setStatus(agent.id, status).subscribe({
      next: (updated) => {
        this.agent.set(updated);
        this.savingStatus.set(false);
        this.messages.add({ severity: "success", summary: "Disponibilit\xE9 mise \xE0 jour", detail: AGENT_STATUS_LABELS[status], life: 3e3 });
      },
      error: (error) => {
        this.savingStatus.set(false);
        this.messages.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
      }
    });
  }
  requestLink(request) {
    switch (this.auth.user()?.role) {
      case "citizen":
        return ["/home/my-requests", request.id];
      case "agent":
        return ["/home/agent"];
      default:
        return ["/home/requests"];
    }
  }
  static \u0275fac = function Account_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Account)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Account, selectors: [["app-account"]], features: [\u0275\u0275ProvidersFeature([MessageService])], decls: 22, vars: 6, consts: [[1, "grid", "grid-cols-12", "gap-6"], ["aria-labelledby", "account-title", 1, "card", "col-span-12", "mb-0"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-6"], [1, "flex", "items-center", "gap-4"], ["aria-hidden", "true", 1, "flex", "items-center", "justify-center", "rounded-full", "bg-primary-100", "dark:bg-primary-400/10", 2, "width", "3.5rem", "height", "3.5rem"], [1, "pi", "pi-user", "text-primary", "!text-2xl"], [1, "m-0", "text-sm", "font-medium", "text-muted-color"], ["id", "account-title", 1, "m-0", "text-2xl", "font-semibold"], [1, "mt-1", "mb-0", "text-muted-color"], ["severity", "secondary", 3, "value"], [1, "flex", "flex-wrap", "gap-2"], [3, "label", "icon", "outlined", "routerLink"], ["icon", "pi pi-refresh", "severity", "secondary", "ariaLabel", "Actualiser", 3, "text", "loading"], [1, "mt-6", "flex", "flex-wrap", "items-center", "gap-3", "border-t", "border-surface", "pt-4"], ["role", "status", 1, "card", "col-span-12", "mb-0"], ["icon", "pi pi-refresh", "severity", "secondary", "ariaLabel", "Actualiser", 3, "onClick", "text", "loading"], ["for", "agent-availability", 1, "font-medium"], ["inputId", "agent-availability", "optionLabel", "label", "optionValue", "value", 1, "w-56", 3, "ngModelChange", "options", "ngModel", "disabled"], [1, "text-sm", "text-muted-color"], [1, "flex", "items-start", "gap-3"], [1, "pi", "pi-info-circle", "mt-1", "text-orange-500"], [1, "m-0", "text-lg", "font-semibold"], [1, "mt-2", "mb-0", "text-muted-color"], ["role", "alert", 1, "col-span-12", "m-0", "text-red-600"], [1, "col-span-12"], [1, "contents", 3, "stats"], [1, "col-span-12", "xl:col-span-8"], [3, "trendData"], [1, "col-span-12", "xl:col-span-4"], [3, "categoryData"], ["aria-labelledby", "recent-title", 1, "card", "col-span-12", "mb-0"], [1, "mb-4", "flex", "items-center", "justify-between"], ["id", "recent-title", 1, "m-0", "text-xl", "font-semibold"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-surface", "py-3", "text-color", "no-underline", "hover:bg-emphasis", 3, "routerLink"], [1, "m-0", "text-muted-color"], [1, "font-medium"], [1, "flex", "gap-2"], [3, "value", "severity"]], template: function Account_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast");
      \u0275\u0275elementStart(1, "div", 0)(2, "section", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4);
      \u0275\u0275element(6, "i", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div")(8, "p", 6);
      \u0275\u0275text(9, "Mon espace");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "h1", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 8);
      \u0275\u0275text(13);
      \u0275\u0275element(14, "p-tag", 9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 10);
      \u0275\u0275repeaterCreate(16, Account_For_17_Template, 1, 4, "p-button", 11, _forTrack0);
      \u0275\u0275conditionalCreate(18, Account_Conditional_18_Template, 1, 2, "p-button", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, Account_Conditional_19_Template, 6, 5, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(20, Account_Conditional_20_Template, 9, 1, "section", 14)(21, Account_Conditional_21_Template, 17, 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_5_0;
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1("Bonjour ", (tmp_0_0 = ctx.auth.user()) == null ? null : tmp_0_0.name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", (tmp_1_0 = ctx.auth.user()) == null ? null : tmp_1_0.email, " \xB7 ");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.auth.roleLabel());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.shortcuts());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.unattached() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.agent()) ? 19 : -1, tmp_5_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.unattached() ? 20 : 21);
    }
  }, dependencies: [FormsModule, NgControlStatus, NgModel, RouterLink, ButtonModule, Button, SelectModule, Select, TagModule, Tag, ToastModule, Toast, Stats, TrendChart, CategoryChart, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Account, [{
    type: Component,
    args: [{ selector: "app-account", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, SelectModule, TagModule, ToastModule, Stats, TrendChart, CategoryChart], providers: [MessageService], template: `<p-toast />

<div class="grid grid-cols-12 gap-6">
    <!-- En-t\xEAte : identit\xE9, p\xE9rim\xE8tre et raccourcis du r\xF4le -->
    <section class="card col-span-12 mb-0" aria-labelledby="account-title">
        <div class="flex flex-wrap items-start justify-between gap-6">
            <div class="flex items-center gap-4">
                <div class="flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-400/10" style="width: 3.5rem; height: 3.5rem" aria-hidden="true">
                    <i class="pi pi-user text-primary !text-2xl"></i>
                </div>
                <div>
                    <p class="m-0 text-sm font-medium text-muted-color">Mon espace</p>
                    <h1 id="account-title" class="m-0 text-2xl font-semibold">Bonjour {{ auth.user()?.name }}</h1>
                    <p class="mt-1 mb-0 text-muted-color">{{ auth.user()?.email }} \xB7 <p-tag [value]="auth.roleLabel()" severity="secondary" /></p>
                </div>
            </div>
            <div class="flex flex-wrap gap-2">
                @for (shortcut of shortcuts(); track shortcut.link) {
                    <p-button [label]="shortcut.label" [icon]="shortcut.icon" [outlined]="!$first" [routerLink]="shortcut.link" />
                }
                @if (!unattached()) {
                    <p-button icon="pi pi-refresh" severity="secondary" [text]="true" [loading]="loading()" ariaLabel="Actualiser" (onClick)="load()" />
                }
            </div>
        </div>

        @if (agent(); as profile) {
            <div class="mt-6 flex flex-wrap items-center gap-3 border-t border-surface pt-4">
                <label for="agent-availability" class="font-medium">Ma disponibilit\xE9</label>
                <p-select
                    inputId="agent-availability"
                    [options]="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    [ngModel]="profile.status"
                    (ngModelChange)="setAvailability($event)"
                    [disabled]="savingStatus()"
                    class="w-56"
                />
                <span class="text-sm text-muted-color">Institut {{ profile.institut_name }} \xB7 {{ profile.interventions }} intervention(s)</span>
            </div>
        }
    </section>

    @if (unattached()) {
        <section class="card col-span-12 mb-0" role="status">
            <div class="flex items-start gap-3">
                <i class="pi pi-info-circle mt-1 text-orange-500"></i>
                <div>
                    <h2 class="m-0 text-lg font-semibold">Compte pas encore rattach\xE9</h2>
                    <p class="mt-2 mb-0 text-muted-color">
                        @if (auth.hasRole('agent')) {
                            Votre compte agent n'a pas de profil actif dans un institut. Un administrateur ou le responsable de votre institut doit vous y rattacher.
                        } @else {
                            Vous n'\xEAtes responsable d'aucun institut actif. Un administrateur doit vous d\xE9signer comme responsable.
                        }
                    </p>
                </div>
            </div>
        </section>
    } @else {
        @if (error(); as message) {
            <p class="col-span-12 m-0 text-red-600" role="alert">{{ message }}</p>
        }

        <div class="col-span-12">
            <h2 class="m-0 text-lg font-semibold">{{ scopeLabel() }}</h2>
        </div>

        <!-- M\xEAme rang\xE9e de cartes que le tableau de bord, sur le p\xE9rim\xE8tre de l'utilisateur -->
        <app-stats class="contents" [stats]="cards()" />

        <div class="col-span-12 xl:col-span-8">
            <app-trend-chart [trendData]="trend()" />
        </div>
        <div class="col-span-12 xl:col-span-4">
            <app-category-chart [categoryData]="categories()" />
        </div>

        <section class="card col-span-12 mb-0" aria-labelledby="recent-title">
            <div class="mb-4 flex items-center justify-between">
                <h2 id="recent-title" class="m-0 text-xl font-semibold">Derni\xE8res demandes</h2>
                @if (stats(); as s) {
                    <span class="text-sm text-muted-color">{{ s.total }} au total \xB7 {{ s.resolution_rate }} % r\xE9solues</span>
                }
            </div>
            @for (request of recent(); track request.id) {
                <a [routerLink]="requestLink(request)" class="flex flex-wrap items-center justify-between gap-3 border-t border-surface py-3 text-color no-underline hover:bg-emphasis">
                    <div>
                        <div class="font-medium">{{ request.title }}</div>
                        <div class="text-sm text-muted-color">{{ request.category }} \xB7 {{ request.location }} \xB7 {{ request.created_at | date: 'dd/MM/yyyy' }}</div>
                    </div>
                    <div class="flex gap-2">
                        <p-tag [value]="request.priority" [severity]="prioritySeverity(request.priority)" />
                        <p-tag [value]="request.status" [severity]="statusSeverity(request.status)" />
                    </div>
                </a>
            } @empty {
                <p class="m-0 text-muted-color">{{ loading() ? 'Chargement\u2026' : 'Aucune demande pour le moment.' }}</p>
            }
        </section>
    }
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Account, { className: "Account", filePath: "src/app/auth/account/account.ts", lineNumber: 44 });
})();
export {
  Account
};
//# sourceMappingURL=chunk-OETZKQRC.js.map
