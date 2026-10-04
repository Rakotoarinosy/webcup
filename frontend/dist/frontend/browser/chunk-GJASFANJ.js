import {
  AGENT_STATUSES,
  AGENT_STATUS_LABELS
} from "./chunk-T6CAQ4OU.js";
import {
  require_leaflet_src
} from "./chunk-YPF3MTRK.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import {
  CitizenRequestService
} from "./chunk-QNPZAXSG.js";
import {
  requestPrioritySeverity,
  requestStatusSeverity
} from "./chunk-KJD3IBMG.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import {
  AgentService
} from "./chunk-4C575W2K.js";
import {
  InstitutService
} from "./chunk-KQXKYOP3.js";
import "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  SelectModule
} from "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import {
  TooltipModule
} from "./chunk-OUQ4VYAJ.js";
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
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  FormsModule
} from "./chunk-BX45OWY6.js";
import {
  MessageService
} from "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  Input,
  ViewChild,
  __spreadProps,
  __spreadValues,
  __toESM,
  catchError,
  computed,
  effect,
  forkJoin,
  inject,
  input,
  of,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// src/app/auth/account/account-widgets.ts
var L = __toESM(require_leaflet_src());
var _forTrack0 = ($index, $item) => $item.label;
function AccountStats_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "a", 1)(2, "div", 2)(3, "div")(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 5);
    \u0275\u0275element(9, "i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "span", 6);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const card_r1 = ctx.$implicit;
    const \u0275$index_1_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", ctx_r2.links()[\u0275$index_1_r2]);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(card_r1.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(card_r1.value);
    \u0275\u0275advance();
    \u0275\u0275classMap(card_r1.background);
    \u0275\u0275advance();
    \u0275\u0275classMap(card_r1.icon);
    \u0275\u0275advance();
    \u0275\u0275classMap(card_r1.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(card_r1.help);
  }
}
var _c0 = ["mapContainer"];
var _forTrack1 = ($index, $item) => $item[0];
function AccountMap_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 5);
    \u0275\u0275domElement(1, "span", 7);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const entry_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-color", entry_r1[1]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r1[0]);
  }
}
function toAccountStatCards(stats) {
  if (!stats)
    return { openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 };
  return {
    openRequests: (stats.by_status["Nouveau"] ?? 0) + (stats.by_status["En attente"] ?? 0),
    inProgressRequests: stats.in_progress,
    resolvedRequests: stats.resolved,
    todayInterventions: stats.resolved_today
  };
}
function toAccountMapRequests(points) {
  return points.map((point) => __spreadProps(__spreadValues({}, point), { agent: point.agent_name ?? "Non assign\xE9" }));
}
var AccountStats = class _AccountStats {
  stats = input({ openRequests: 0, inProgressRequests: 0, resolvedRequests: 0, todayInterventions: 0 }, ...ngDevMode ? [{ debugName: "stats" }] : []);
  links = input([], ...ngDevMode ? [{ debugName: "links" }] : []);
  cards = () => [
    { label: "Demandes ouvertes", value: this.stats().openRequests, help: "En attente de prise en charge", icon: "pi pi-folder-open text-xl text-blue-500", background: "bg-blue-100 dark:bg-blue-400/10", color: "text-primary" },
    { label: "Demandes en cours", value: this.stats().inProgressRequests, help: "Traitement en cours", icon: "pi pi-clock text-xl text-orange-500", background: "bg-orange-100 dark:bg-orange-400/10", color: "text-orange-500" },
    { label: "Demandes r\xE9solues", value: this.stats().resolvedRequests, help: "Cl\xF4tur\xE9es avec succ\xE8s", icon: "pi pi-check-circle text-xl text-green-500", background: "bg-green-100 dark:bg-green-400/10", color: "text-green-500" },
    { label: "Interventions (aujourd'hui)", value: this.stats().todayInterventions, help: "R\xE9solues aujourd'hui", icon: "pi pi-calendar text-xl text-purple-500", background: "bg-purple-100 dark:bg-purple-400/10", color: "text-purple-500" }
  ];
  static \u0275fac = function AccountStats_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountStats)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountStats, selectors: [["app-account-stats"]], inputs: { stats: [1, "stats"], links: [1, "links"] }, decls: 2, vars: 0, consts: [[1, "col-span-12", "lg:col-span-6", "xl:col-span-3"], [1, "card", "mb-0", "block", "cursor-pointer", "no-underline", "transition-transform", "hover:-translate-y-0.5", "hover:shadow-md", "focus-visible:outline-2", "focus-visible:outline-primary", 3, "routerLink"], [1, "mb-4", "flex", "justify-between"], [1, "mb-4", "block", "font-medium", "text-muted-color"], [1, "text-xl", "font-medium", "text-surface-900", "dark:text-surface-0"], [1, "flex", "size-10", "items-center", "justify-center", "rounded-border"], [1, "font-medium"]], template: function AccountStats_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, AccountStats_For_1_Template, 12, 10, "div", 0, _forTrack0);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.cards());
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountStats, [{
    type: Component,
    args: [{
      selector: "app-account-stats",
      imports: [RouterLink],
      template: `
        @for (card of cards(); track card.label; let index = $index) {
            <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                <a class="card mb-0 block cursor-pointer no-underline transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary" [routerLink]="links()[index]">
                    <div class="mb-4 flex justify-between"><div><span class="mb-4 block font-medium text-muted-color">{{ card.label }}</span><div class="text-xl font-medium text-surface-900 dark:text-surface-0">{{ card.value }}</div></div><div class="flex size-10 items-center justify-center rounded-border" [class]="card.background"><i [class]="card.icon"></i></div></div>
                    <span class="font-medium" [class]="card.color">{{ card.help }}</span>
                </a>
            </div>
        }
    `
    }]
  }], null, { stats: [{ type: Input, args: [{ isSignal: true, alias: "stats", required: false }] }], links: [{ type: Input, args: [{ isSignal: true, alias: "links", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountStats, { className: "AccountStats", filePath: "src/app/auth/account/account-widgets.ts", lineNumber: 53 });
})();
var PRIORITY_COLORS = { Basse: "#22c55e", Normale: "#3b82f6", Haute: "#f97316", Urgente: "#ef4444" };
var AccountMap = class _AccountMap {
  requests = input([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  priorityColors = Object.entries(PRIORITY_COLORS);
  container = viewChild.required("mapContainer");
  ready = signal(false, ...ngDevMode ? [{ debugName: "ready" }] : []);
  map;
  markers = L.layerGroup();
  constructor() {
    effect(() => {
      if (this.ready())
        this.renderMarkers(this.requests());
    });
  }
  ngAfterViewInit() {
    this.map = L.map(this.container().nativeElement).setView([-18.9068, 47.5244], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "\xA9 OpenStreetMap contributors" }).addTo(this.map);
    this.markers.addTo(this.map);
    this.ready.set(true);
  }
  ngOnDestroy() {
    this.map?.remove();
  }
  renderMarkers(requests) {
    this.markers.clearLayers();
    for (const request of requests) {
      const color = PRIORITY_COLORS[request.priority];
      const icon = L.divIcon({ className: "custom-marker", html: `<div style="background-color:${color};width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] });
      L.marker([request.latitude, request.longitude], { icon }).bindPopup(`<strong>${escapeHtml(request.title)}</strong><br>${escapeHtml(request.location)}<br>Priorit\xE9 : ${escapeHtml(request.priority)}<br>Statut : ${escapeHtml(request.status)}`).addTo(this.markers);
    }
    if (requests.length)
      this.map?.fitBounds(L.latLngBounds(requests.map((request) => [request.latitude, request.longitude])), { padding: [30, 30], maxZoom: 15 });
  }
  static \u0275fac = function AccountMap_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountMap)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountMap, selectors: [["app-account-map"]], viewQuery: function AccountMap_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.container, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { requests: [1, "requests"] }, decls: 9, vars: 1, consts: [["mapContainer", ""], [1, "card", "z-1"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "text-xl", "font-semibold"], [1, "flex", "flex-wrap", "gap-4", "text-sm", "text-muted-color"], [1, "flex", "items-center", "gap-2"], [1, "w-full", "rounded-border", "shadow-sm", 2, "height", "380px"], [1, "inline-block", "rounded-full", 2, "width", ".75rem", "height", ".75rem"]], template: function AccountMap_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "div", 4);
      \u0275\u0275repeaterCreate(5, AccountMap_For_6_Template, 3, 3, "span", 5, _forTrack1);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElement(7, "div", 6, 0);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Carte des interventions en cours (", ctx.requests().length, ")");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.priorityColors);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountMap, [{
    type: Component,
    args: [{
      selector: "app-account-map",
      template: `
        <div class="card z-1"><div class="mb-4 flex flex-wrap items-center justify-between gap-3"><div class="text-xl font-semibold">Carte des interventions en cours ({{ requests().length }})</div><div class="flex flex-wrap gap-4 text-sm text-muted-color">@for (entry of priorityColors; track entry[0]) {<span class="flex items-center gap-2"><span class="inline-block rounded-full" [style.background-color]="entry[1]" style="width:.75rem;height:.75rem"></span>{{ entry[0] }}</span>}</div></div><div #mapContainer class="w-full rounded-border shadow-sm" style="height:380px"></div></div>
    `
    }]
  }], () => [], { requests: [{ type: Input, args: [{ isSignal: true, alias: "requests", required: false }] }], container: [{ type: ViewChild, args: ["mapContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountMap, { className: "AccountMap", filePath: "src/app/auth/account/account-widgets.ts", lineNumber: 72 });
})();
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// src/app/auth/account/account.ts
var _forTrack02 = ($index, $item) => $item.id;
function Account_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Votre compte agent n'a pas de profil actif dans un institut. Un administrateur ou le responsable de votre institut doit vous y rattacher. ");
  }
}
function Account_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Vous n'\xEAtes responsable d'aucun institut actif. Un administrateur doit vous d\xE9signer comme responsable. ");
  }
}
function Account_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 1)(1, "div", 2);
    \u0275\u0275element(2, "i", 3);
    \u0275\u0275elementStart(3, "div")(4, "h2", 4);
    \u0275\u0275text(5, "Compte pas encore rattach\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 5);
    \u0275\u0275conditionalCreate(7, Account_Conditional_2_Conditional_7_Template, 1, 0)(8, Account_Conditional_2_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r0.auth.hasRole("agent") ? 7 : 8);
  }
}
function Account_Conditional_3_Conditional_0_Template(rf, ctx) {
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
function Account_Conditional_3_Conditional_4_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "article", 22)(2, "span", 23);
    \u0275\u0275text(3, "Demandes \xE0 traiter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "article", 25)(7, "span", 23);
    \u0275\u0275text(8, "Total attribu\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong", 24);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "article", 25)(12, "span", 23);
    \u0275\u0275text(13, "En cours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong", 24);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "article", 25)(17, "span", 23);
    \u0275\u0275text(18, "En attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong", 24);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "article", 25)(22, "span", 23);
    \u0275\u0275text(23, "R\xE9solues");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong", 24);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r2 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((s_r2.by_status["En cours"] || 0) + (s_r2.by_status["En attente"] || 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.total);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.by_status["En cours"] || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.by_status["En attente"] || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.by_status["R\xE9solu"] || 0);
  }
}
function Account_Conditional_3_Conditional_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "Chargement du tableau de bord\u2026");
    \u0275\u0275elementEnd();
  }
}
function Account_Conditional_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 17)(2, "h2", 18);
    \u0275\u0275text(3, "Tableau de bord de mes interventions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 19);
    \u0275\u0275text(5, "Voir mes interventions");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, Account_Conditional_3_Conditional_4_Conditional_6_Template, 26, 5, "div", 20)(7, Account_Conditional_3_Conditional_4_Conditional_7_Template, 2, 0, "p", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.stats()) ? 6 : ctx_r0.loading() ? 7 : -1, tmp_2_0);
  }
}
function Account_Conditional_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-account-stats", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("stats", ctx_r0.cards())("links", ctx_r0.statLinks());
  }
}
function Account_Conditional_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r3.total, " au total \xB7 ", s_r3.resolution_rate, " % r\xE9solues");
  }
}
function Account_Conditional_3_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 15)(1, "div")(2, "div", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 27);
    \u0275\u0275element(8, "p-tag", 28)(9, "p-tag", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r0.requestLink(request_r4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", request_r4.category, " \xB7 ", request_r4.location, " \xB7 ", \u0275\u0275pipeBind2(6, 9, request_r4.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275property("value", request_r4.priority)("severity", ctx_r0.prioritySeverity(request_r4.priority));
    \u0275\u0275advance();
    \u0275\u0275property("value", request_r4.status)("severity", ctx_r0.statusSeverity(request_r4.status));
  }
}
function Account_Conditional_3_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loading() ? "Chargement\u2026" : "Aucune demande pour le moment.");
  }
}
function Account_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Account_Conditional_3_Conditional_0_Template, 2, 1, "p", 6);
    \u0275\u0275elementStart(1, "div", 7)(2, "h2", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, Account_Conditional_3_Conditional_4_Template, 8, 1, "section", 8)(5, Account_Conditional_3_Conditional_5_Template, 1, 2, "app-account-stats", 9);
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275element(7, "app-account-map", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "section", 11)(9, "div", 12)(10, "h2", 13);
    \u0275\u0275text(11, "Derni\xE8res demandes");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, Account_Conditional_3_Conditional_12_Template, 2, 2, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, Account_Conditional_3_For_14_Template, 10, 12, "a", 15, _forTrack02, false, Account_Conditional_3_ForEmpty_15_Template, 2, 1, "p", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.error()) ? 0 : -1, tmp_1_0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.scopeLabel());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.auth.hasRole("agent") ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275property("requests", ctx_r0.mapRequests());
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_5_0 = ctx_r0.stats()) ? 12 : -1, tmp_5_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.recent());
  }
}
var RECENT_COUNT = 5;
var Account = class _Account {
  auth = inject(AuthService);
  requests = inject(CitizenRequestService);
  agents = inject(AgentService);
  instituts = inject(InstitutService);
  messages = inject(MessageService);
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  points = signal([], ...ngDevMode ? [{ debugName: "points" }] : []);
  recent = signal([], ...ngDevMode ? [{ debugName: "recent" }] : []);
  agent = signal(null, ...ngDevMode ? [{ debugName: "agent" }] : []);
  institut = signal(null, ...ngDevMode ? [{ debugName: "institut" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  savingStatus = signal(false, ...ngDevMode ? [{ debugName: "savingStatus" }] : []);
  cards = computed(() => toAccountStatCards(this.stats()), ...ngDevMode ? [{ debugName: "cards" }] : []);
  mapRequests = computed(() => toAccountMapRequests(this.points()), ...ngDevMode ? [{ debugName: "mapRequests" }] : []);
  statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
  statusSeverity = requestStatusSeverity;
  prioritySeverity = requestPrioritySeverity;
  statLinks = computed(() => {
    const target = this.auth.hasRole("citizen") ? "/home/my-requests" : this.auth.hasRole("agent") ? "/home/agent" : "/home/requests";
    return [target, target, target, target];
  }, ...ngDevMode ? [{ debugName: "statLinks" }] : []);
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
          { label: "Mes agents", icon: "pi pi-id-card", link: "/home/agents" }
        ];
      case "admin":
        return [
          { label: "Instituts", icon: "pi pi-building", link: "/home/instituts" },
          { label: "Demandes", icon: "pi pi-inbox", link: "/home/requests" }
        ];
      default:
        return [];
    }
  }, ...ngDevMode ? [{ debugName: "shortcuts" }] : []);
  ngOnInit() {
    this.live.watch(this.destroyRef, () => this.load(), () => !this.loading() && !this.savingStatus());
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
      points: this.requests.map({ status: "En cours" }),
      recent: this.requests.list({ page: 1, page_size: RECENT_COUNT, sort_by: "created_at", sort_order: "desc" }),
      agent: user?.agent_id ? this.agents.me().pipe(catchError(() => of(null))) : of(null),
      institut: user?.role === "manager" && user.institut_id ? this.instituts.get(user.institut_id).pipe(catchError(() => of(null))) : of(null)
    }).subscribe({
      next: ({ stats, points, recent, agent, institut }) => {
        this.stats.set(stats);
        this.points.set(points);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Account, selectors: [["app-account"]], features: [\u0275\u0275ProvidersFeature([MessageService])], decls: 4, vars: 1, consts: [[1, "grid", "grid-cols-12", "gap-6"], ["role", "status", 1, "card", "col-span-12", "mb-0"], [1, "flex", "items-start", "gap-3"], [1, "pi", "pi-info-circle", "mt-1", "text-orange-500"], [1, "m-0", "text-lg", "font-semibold"], [1, "mt-2", "mb-0", "text-muted-color"], ["role", "alert", 1, "col-span-12", "m-0", "text-red-600"], [1, "col-span-12"], ["aria-labelledby", "agent-dashboard-title", 1, "col-span-12"], [1, "contents", 3, "stats", "links"], [3, "requests"], ["aria-labelledby", "recent-title", 1, "card", "col-span-12", "mb-0"], [1, "mb-4", "flex", "items-center", "justify-between"], ["id", "recent-title", 1, "m-0", "text-xl", "font-semibold"], [1, "text-sm", "text-muted-color"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-surface", "py-3", "text-color", "no-underline", "hover:bg-emphasis", 3, "routerLink"], [1, "m-0", "text-muted-color"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "agent-dashboard-title", 1, "m-0", "text-xl", "font-semibold"], ["routerLink", "/home/agent", 1, "font-semibold", "text-primary"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2", "xl:grid-cols-5"], ["role", "status"], ["aria-live", "polite", 1, "card", "mb-0"], [1, "text-muted-color"], [1, "mt-2", "block", "text-3xl"], [1, "card", "mb-0"], [1, "font-medium"], [1, "flex", "gap-2"], [3, "value", "severity"]], template: function Account_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast");
      \u0275\u0275elementStart(1, "div", 0);
      \u0275\u0275conditionalCreate(2, Account_Conditional_2_Template, 9, 1, "section", 1)(3, Account_Conditional_3_Template, 16, 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.unattached() ? 2 : 3);
    }
  }, dependencies: [FormsModule, RouterLink, ButtonModule, SelectModule, TagModule, Tag, ToastModule, Toast, TooltipModule, AccountStats, AccountMap, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Account, [{
    type: Component,
    args: [{ selector: "app-account", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, SelectModule, TagModule, ToastModule, TooltipModule, AccountStats, AccountMap], providers: [MessageService], template: `<p-toast />

<div class="grid grid-cols-12 gap-6">
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
        @if (auth.hasRole('agent')) {
            <section class="col-span-12" aria-labelledby="agent-dashboard-title">
                <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 id="agent-dashboard-title" class="m-0 text-xl font-semibold">Tableau de bord de mes interventions</h2>
                    <a routerLink="/home/agent" class="font-semibold text-primary">Voir mes interventions</a>
                </div>
                @if (stats(); as s) {
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        <article class="card mb-0" aria-live="polite">
                            <span class="text-muted-color">Demandes \xE0 traiter</span>
                            <strong class="mt-2 block text-3xl">{{ (s.by_status['En cours'] || 0) + (s.by_status['En attente'] || 0) }}</strong>
                        </article>
                        <article class="card mb-0"><span class="text-muted-color">Total attribu\xE9</span><strong class="mt-2 block text-3xl">{{ s.total }}</strong></article>
                        <article class="card mb-0"><span class="text-muted-color">En cours</span><strong class="mt-2 block text-3xl">{{ s.by_status['En cours'] || 0 }}</strong></article>
                        <article class="card mb-0"><span class="text-muted-color">En attente</span><strong class="mt-2 block text-3xl">{{ s.by_status['En attente'] || 0 }}</strong></article>
                        <article class="card mb-0"><span class="text-muted-color">R\xE9solues</span><strong class="mt-2 block text-3xl">{{ s.by_status['R\xE9solu'] || 0 }}</strong></article>
                    </div>
                } @else if (loading()) {
                    <p role="status">Chargement du tableau de bord\u2026</p>
                }
            </section>
        } @else {
            <app-account-stats class="contents" [stats]="cards()" [links]="statLinks()" />
        }

        <div class="col-span-12">
            <app-account-map [requests]="mapRequests()" />
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Account, { className: "Account", filePath: "src/app/auth/account/account.ts", lineNumber: 43 });
})();
export {
  Account
};
//# sourceMappingURL=chunk-GJASFANJ.js.map
