import {
  TerraNovaService
} from "./chunk-V7U3SW4H.js";
import {
  MessageService
} from "./chunk-UHTXY4UO.js";
import {
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  DestroyRef,
  HttpErrorResponse,
  Injectable,
  Pipe,
  __spreadProps,
  __spreadValues,
  computed,
  finalize,
  forkJoin,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵdefinePipe
} from "./chunk-E5MYAYBP.js";

// src/app/terra-nova/terra-nova.model.ts
var PIPELINE_STATUSES = ["todo", "in_progress", "validation", "done"];
var STATUS_OPTIONS = [
  { value: "todo", label: "\xC0 traiter", severity: "secondary", icon: "pi pi-inbox" },
  { value: "in_progress", label: "En cours", severity: "info", icon: "pi pi-spinner" },
  { value: "validation", label: "En validation", severity: "warn", icon: "pi pi-eye" },
  { value: "done", label: "Termin\xE9e", severity: "success", icon: "pi pi-check-circle" }
];
var DIFFICULTY_OPTIONS = [
  { value: 1, label: "Facile" },
  { value: 2, label: "Moyenne" },
  { value: 3, label: "Difficile" },
  { value: 4, label: "Expert" }
];
function statusMeta(status) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}
function difficultyLabel(level, fallback = "") {
  return DIFFICULTY_OPTIONS.find((d) => d.value === level)?.label ?? (fallback || "Inconnue");
}
function difficultySeverity(level) {
  return ["secondary", "success", "info", "warn", "danger"][level] ?? "secondary";
}
function waveLabel(request) {
  return request.is_initial ? "Initiale" : `Vague ${request.wave}`;
}
function arrivalMinutes(arrival) {
  if (!arrival)
    return 0;
  const [h = "0", m = "0"] = arrival.split(":");
  return (parseInt(h, 10) || 0) * 60 + (parseInt(m, 10) || 0);
}

// src/app/terra-nova/terra-nova.pipes.ts
var numberFormat = new Intl.NumberFormat("fr-FR");
var XpPipe = class _XpPipe {
  transform(value, sign = false) {
    const v = value ?? 0;
    return `${sign && v > 0 ? "+" : ""}${numberFormat.format(v)} XP`;
  }
  static \u0275fac = function XpPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XpPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "xp", type: _XpPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(XpPipe, [{
    type: Pipe,
    args: [{ name: "xp" }]
  }], null, null);
})();
var ArrivalPipe = class _ArrivalPipe {
  transform(value) {
    if (!value)
      return "Lancement";
    const [h = "0", m = "0"] = value.split(":");
    const minutes = parseInt(m, 10) || 0;
    return `H+${parseInt(h, 10) || 0}${minutes ? "h" + String(minutes).padStart(2, "0") : ""}`;
  }
  static \u0275fac = function ArrivalPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ArrivalPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "arrival", type: _ArrivalPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrivalPipe, [{
    type: Pipe,
    args: [{ name: "arrival" }]
  }], null, null);
})();
var AgoPipe = class _AgoPipe {
  transform(value, now) {
    if (!value)
      return "jamais";
    const seconds = Math.max(0, Math.round((now - new Date(value).getTime()) / 1e3));
    if (seconds < 5)
      return "\xE0 l'instant";
    if (seconds < 60)
      return `il y a ${seconds} s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
      return `il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return hours < 24 ? `il y a ${hours} h ${String(minutes % 60).padStart(2, "0")}` : `il y a ${Math.floor(hours / 24)} j`;
  }
  static \u0275fac = function AgoPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgoPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "ago", type: _AgoPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgoPipe, [{
    type: Pipe,
    args: [{ name: "ago" }]
  }], null, null);
})();
var CountdownPipe = class _CountdownPipe {
  transform(ms) {
    const total = Math.max(0, Math.floor((ms ?? 0) / 1e3));
    return [Math.floor(total / 3600), Math.floor(total % 3600 / 60), total % 60].map((n) => String(n).padStart(2, "0")).join(":");
  }
  static \u0275fac = function CountdownPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountdownPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "countdown", type: _CountdownPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownPipe, [{
    type: Pipe,
    args: [{ name: "countdown" }]
  }], null, null);
})();

// src/app/terra-nova/terra-nova.store.ts
var REFRESH_MS = 1e4;
var MAX_TOASTS = 5;
var TerraNovaStore = class _TerraNovaStore {
  api = inject(TerraNovaService);
  messages = inject(MessageService);
  requests = signal([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  overview = signal(null, ...ngDevMode ? [{ debugName: "overview" }] : []);
  notifications = signal([], ...ngDevMode ? [{ debugName: "notifications" }] : []);
  unreadCount = signal(0, ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  loaded = signal(false, ...ngDevMode ? [{ debugName: "loaded" }] : []);
  syncing = signal(false, ...ngDevMode ? [{ debugName: "syncing" }] : []);
  /** Erreur d'accès au backend (403 citoyen, backend arrêté…), null si tout va bien. */
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : []);
  forbidden = signal(false, ...ngDevMode ? [{ debugName: "forbidden" }] : []);
  /** Horloge locale (1 s) : comptes à rebours et « il y a X s » uniquement. */
  now = signal(Date.now(), ...ngDevMode ? [{ debugName: "now" }] : []);
  clockOffset = signal(0, ...ngDevMode ? [{ debugName: "clockOffset" }] : []);
  selectedCode = signal(null, ...ngDevMode ? [{ debugName: "selectedCode" }] : []);
  session = computed(() => this.overview()?.session ?? null, ...ngDevMode ? [{ debugName: "session" }] : []);
  byCode = computed(() => new Map(this.requests().map((r) => [r.request_code, r])), ...ngDevMode ? [{ debugName: "byCode" }] : []);
  selected = computed(() => {
    const code = this.selectedCode();
    return code ? this.byCode().get(code) ?? null : null;
  }, ...ngDevMode ? [{ debugName: "selected" }] : []);
  /** Une demande est « nouvelle » tant que sa notification d'arrivée n'est pas lue. */
  newCodes = computed(() => new Set(this.notifications().filter((n) => !n.is_read && n.kind === "new_request" && n.request_code).map((n) => n.request_code)), ...ngDevMode ? [{ debugName: "newCodes" }] : []);
  isActive = computed(() => {
    const s = this.session();
    return !!s && s.status !== "none" && s.is_running;
  }, ...ngDevMode ? [{ debugName: "isActive" }] : []);
  /** Temps restant avant la prochaine vague, pour l'affichage seulement. */
  msUntilNextWave = computed(() => {
    const s = this.session();
    if (!s?.next_wave_eta || s.next_wave_number <= 0)
      return null;
    return new Date(s.next_wave_eta).getTime() - (this.now() + this.clockOffset());
  }, ...ngDevMode ? [{ debugName: "msUntilNextWave" }] : []);
  stats = computed(() => {
    const list = this.requests();
    const xp = (items) => items.reduce((sum, r) => sum + r.xp_available, 0);
    const count = (status) => list.filter((r) => r.status === status).length;
    const done = list.filter((r) => r.status === "done");
    return {
      total: list.length,
      fresh: list.filter((r) => this.newCodes().has(r.request_code)).length,
      todo: count("todo"),
      inProgress: count("in_progress"),
      validation: count("validation"),
      done: done.length,
      donePercent: list.length ? Math.round(done.length / list.length * 100) : 0,
      xpAvailable: xp(list),
      xpDone: xp(done),
      byDifficulty: DIFFICULTY_OPTIONS.map((d) => {
        const items = list.filter((r) => r.difficulty_level === d.value);
        return __spreadProps(__spreadValues({}, d), { count: items.length, xp: xp(items) });
      })
    };
  }, ...ngDevMode ? [{ debugName: "stats" }] : []);
  /** Demandes non terminées à plus forte valeur. */
  priorities = computed(() => this.requests().filter((r) => r.status !== "done").sort((a, b) => b.xp_total - a.xp_total || b.difficulty_level - a.difficulty_level).slice(0, 6), ...ngDevMode ? [{ debugName: "priorities" }] : []);
  refreshing = false;
  seenKeys = null;
  constructor() {
    const clock = setInterval(() => this.now.set(Date.now()), 1e3);
    const poll = setInterval(() => this.refresh(), REFRESH_MS);
    inject(DestroyRef).onDestroy(() => {
      clearInterval(clock);
      clearInterval(poll);
    });
    this.refresh();
  }
  refresh() {
    if (this.refreshing)
      return;
    this.refreshing = true;
    forkJoin({ overview: this.api.session(), requests: this.api.list(), notifications: this.api.notifications() }).pipe(finalize(() => this.refreshing = false)).subscribe({
      next: ({ overview, requests, notifications }) => {
        this.overview.set(overview);
        this.clockOffset.set(new Date(overview.server_time).getTime() - Date.now());
        this.requests.set(requests);
        this.announce(notifications.items);
        this.notifications.set(notifications.items);
        this.unreadCount.set(notifications.unread_count);
        this.loaded.set(true);
        this.loadError.set(null);
        this.forbidden.set(false);
      },
      error: (error) => {
        this.forbidden.set(error instanceof HttpErrorResponse && error.status === 403);
        this.loadError.set(this.forbidden() ? "Espace r\xE9serv\xE9 au personnel municipal." : apiErrorMessage(error));
      }
    });
  }
  syncNow() {
    if (this.syncing())
      return;
    this.syncing.set(true);
    this.api.sync().pipe(finalize(() => this.syncing.set(false))).subscribe({
      next: (report) => {
        const n = report.new_codes.length;
        this.messages.add({ severity: "success", summary: "Synchronisation r\xE9ussie", detail: n ? `${n} nouvelle(s) demande(s)` : "Aucune nouvelle demande", life: 3e3 });
        this.refresh();
      },
      error: (error) => {
        this.messages.add({ severity: "error", summary: "Synchronisation \xE9chou\xE9e", detail: apiErrorMessage(error), life: 5e3 });
        this.refresh();
      }
    });
  }
  /** Changement de statut optimiste, annulé si le backend refuse. */
  updateStatus(code, status) {
    const previous = this.byCode().get(code)?.status;
    if (!previous || previous === status)
      return;
    this.patch(code, { status });
    this.api.updateStatus(code, status).subscribe({
      next: (updated) => {
        this.patch(code, updated);
        this.messages.add({ severity: "success", summary: code, detail: `Statut : ${statusMeta(status).label}`, life: 2e3 });
      },
      error: (error) => {
        this.patch(code, { status: previous });
        this.messages.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 4e3 });
      }
    });
  }
  openDetail(code) {
    this.selectedCode.set(code);
    const notification = this.notifications().find((n) => n.key === code && !n.is_read);
    if (notification)
      this.markRead(notification);
  }
  closeDetail() {
    this.selectedCode.set(null);
  }
  markRead(notification) {
    if (notification.is_read)
      return;
    this.setRead((n) => n.key === notification.key);
    this.api.markRead(notification.key).subscribe({ error: () => this.refresh() });
  }
  markAllRead() {
    this.setRead(() => true);
    this.api.markAllRead().subscribe({ error: () => this.refresh() });
  }
  setRead(match) {
    this.notifications.update((list) => list.map((n) => match(n) ? __spreadProps(__spreadValues({}, n), { is_read: true }) : n));
    this.unreadCount.set(this.notifications().filter((n) => !n.is_read).length);
  }
  patch(code, changes) {
    this.requests.update((list) => list.map((r) => r.request_code === code ? __spreadValues(__spreadValues({}, r), changes) : r));
  }
  /** Toast pour chaque notification apparue depuis le dernier rafraîchissement (pas au premier chargement). */
  announce(items) {
    if (this.seenKeys) {
      const fresh = items.filter((n) => !n.is_read && !this.seenKeys.has(n.key)).reverse();
      for (const n of fresh.slice(0, MAX_TOASTS)) {
        this.messages.add({ severity: n.kind === "new_wave" ? "info" : "success", summary: n.title, detail: n.message, life: 8e3 });
      }
      if (fresh.length > MAX_TOASTS) {
        this.messages.add({ severity: "info", summary: `+${fresh.length - MAX_TOASTS} autres notifications`, life: 8e3 });
      }
    }
    this.seenKeys = new Set(items.map((n) => n.key));
  }
  static \u0275fac = function TerraNovaStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TerraNovaStore, factory: _TerraNovaStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaStore, [{
    type: Injectable
  }], () => [], null);
})();

export {
  PIPELINE_STATUSES,
  STATUS_OPTIONS,
  DIFFICULTY_OPTIONS,
  statusMeta,
  difficultyLabel,
  difficultySeverity,
  waveLabel,
  arrivalMinutes,
  XpPipe,
  ArrivalPipe,
  AgoPipe,
  CountdownPipe,
  TerraNovaStore
};
//# sourceMappingURL=chunk-KHJ46OSZ.js.map
