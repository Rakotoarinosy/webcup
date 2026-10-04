import {
  ROLE_LABELS,
  isChallenge
} from "./chunk-RD6WJK3U.js";
import {
  Router
} from "./chunk-F3M422Q6.js";
import {
  HttpClient,
  HttpErrorResponse,
  Injectable,
  Subject,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  effect,
  environment,
  finalize,
  inject,
  map,
  of,
  setClassMetadata,
  shareReplay,
  signal,
  switchMap,
  takeUntil,
  tap,
  throwError,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/layout/service/layout.service.ts
var THEME_STORAGE_KEY = "theme-mode";
var HIGH_CONTRAST_STORAGE_KEY = "high-contrast";
var DARK_QUERY = "(prefers-color-scheme: dark)";
function readStoredThemeMode() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  } catch {
    return "system";
  }
}
function readStoredHighContrast() {
  try {
    return localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}
function systemPrefersDark() {
  return typeof window.matchMedia === "function" && window.matchMedia(DARK_QUERY).matches;
}
function isDark(mode, systemDark) {
  return mode === "dark" || mode === "system" && systemDark;
}
var LayoutService = class _LayoutService {
  themeMode = signal(readStoredThemeMode(), ...ngDevMode ? [{ debugName: "themeMode" }] : []);
  highContrast = signal(readStoredHighContrast(), ...ngDevMode ? [{ debugName: "highContrast" }] : []);
  systemDark = signal(systemPrefersDark(), ...ngDevMode ? [{ debugName: "systemDark" }] : []);
  layoutConfig = signal({
    preset: "Aura",
    primary: "emerald",
    surface: null,
    darkTheme: isDark(this.themeMode(), this.systemDark()),
    menuMode: "static"
  }, ...ngDevMode ? [{ debugName: "layoutConfig" }] : []);
  layoutState = signal({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    mobileMenuActive: false,
    menuHoverActive: false,
    activePath: null
  }, ...ngDevMode ? [{ debugName: "layoutState" }] : []);
  theme = computed(() => this.layoutConfig().darkTheme ? "dark" : "light", ...ngDevMode ? [{ debugName: "theme" }] : []);
  isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive, ...ngDevMode ? [{ debugName: "isSidebarActive" }] : []);
  isDarkTheme = computed(() => this.layoutConfig().darkTheme, ...ngDevMode ? [{ debugName: "isDarkTheme" }] : []);
  getPrimary = computed(() => this.layoutConfig().primary, ...ngDevMode ? [{ debugName: "getPrimary" }] : []);
  getSurface = computed(() => this.layoutConfig().surface, ...ngDevMode ? [{ debugName: "getSurface" }] : []);
  isOverlay = computed(() => this.layoutConfig().menuMode === "overlay", ...ngDevMode ? [{ debugName: "isOverlay" }] : []);
  transitionComplete = signal(false, ...ngDevMode ? [{ debugName: "transitionComplete" }] : []);
  initialized = false;
  constructor() {
    this.toggleDarkMode();
    if (typeof window.matchMedia === "function") {
      window.matchMedia(DARK_QUERY).addEventListener("change", (event) => this.systemDark.set(event.matches));
    }
    effect(() => {
      const mode = this.themeMode();
      const darkTheme = isDark(mode, this.systemDark());
      if (untracked(() => this.layoutConfig().darkTheme) !== darkTheme) {
        this.layoutConfig.update((state) => __spreadProps(__spreadValues({}, state), { darkTheme }));
      }
      try {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch {
      }
    });
    effect(() => {
      const enabled = this.highContrast();
      document.documentElement.classList.toggle("app-high-contrast", enabled);
      try {
        localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(enabled));
      } catch {
      }
    });
    effect(() => {
      const config = this.layoutConfig();
      if (!this.initialized || !config) {
        this.initialized = true;
        return;
      }
      this.handleDarkModeTransition(config);
    });
  }
  handleDarkModeTransition(config) {
    const supportsViewTransition = "startViewTransition" in document;
    if (supportsViewTransition) {
      this.startViewTransition(config);
    } else {
      this.toggleDarkMode(config);
    }
  }
  startViewTransition(config) {
    const transition = document.startViewTransition(() => {
      this.toggleDarkMode(config);
    });
    void transition.ready.catch((error) => {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        throw error;
    });
  }
  toggleDarkMode(config) {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add("app-dark");
    } else {
      document.documentElement.classList.remove("app-dark");
    }
  }
  setThemeMode(mode) {
    this.themeMode.set(mode);
  }
  setHighContrast(enabled) {
    this.highContrast.set(enabled);
  }
  onMenuToggle() {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => __spreadProps(__spreadValues({}, prev), { overlayMenuActive: !this.layoutState().overlayMenuActive }));
    }
    if (this.isDesktop()) {
      this.layoutState.update((prev) => __spreadProps(__spreadValues({}, prev), { staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive }));
    } else {
      this.layoutState.update((prev) => __spreadProps(__spreadValues({}, prev), { mobileMenuActive: !this.layoutState().mobileMenuActive }));
    }
  }
  showConfigSidebar() {
    this.layoutState.update((prev) => __spreadProps(__spreadValues({}, prev), { configSidebarVisible: true }));
  }
  hideConfigSidebar() {
    this.layoutState.update((prev) => __spreadProps(__spreadValues({}, prev), { configSidebarVisible: false }));
  }
  isDesktop() {
    return window.innerWidth > 991;
  }
  isMobile() {
    return !this.isDesktop();
  }
  static \u0275fac = function LayoutService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LayoutService, factory: _LayoutService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/preferences/preferences.service.ts
var PreferencesService = class _PreferencesService {
  http = inject(HttpClient);
  layout = inject(LayoutService);
  baseUrl = `${environment.apiUrl}/preferences/me`;
  load() {
    return this.http.get(this.baseUrl).pipe(tap((value) => this.apply(value)));
  }
  save(value) {
    return this.http.put(this.baseUrl, value).pipe(tap((saved) => this.apply(saved)));
  }
  apply(value) {
    this.layout.setThemeMode(value.theme);
    document.documentElement.dataset["fontSize"] = value.font_size;
    document.documentElement.dataset["fontFamily"] = value.font_family;
  }
  static \u0275fac = function PreferencesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PreferencesService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PreferencesService, factory: _PreferencesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PreferencesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/challenge.store.ts
var ChallengeStore = class _ChallengeStore {
  state = signal(null, ...ngDevMode ? [{ debugName: "state" }] : []);
  challenge = computed(() => this.state()?.challenge ?? null, ...ngDevMode ? [{ debugName: "challenge" }] : []);
  /** Timestamp (ms) à partir duquel un nouveau code peut être demandé. */
  resendAt = computed(() => {
    const state = this.state();
    return state ? state.receivedAt + state.challenge.resend_after * 1e3 : 0;
  }, ...ngDevMode ? [{ debugName: "resendAt" }] : []);
  set(challenge) {
    this.state.set({ challenge, receivedAt: Date.now() });
  }
  clear() {
    this.state.set(null);
  }
  static \u0275fac = function ChallengeStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChallengeStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChallengeStore, factory: _ChallengeStore.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChallengeStore, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/auth.service.ts
var AUTH_URL = `${environment.apiUrl}/auth`;
var AuthService = class _AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  preferences = inject(PreferencesService);
  challenges = inject(ChallengeStore);
  token = signal(null, ...ngDevMode ? [{ debugName: "token" }] : []);
  sessionEnded = new Subject();
  sessionReplaced = new Subject();
  sessionChecked = false;
  sessionVersion = 0;
  profileInFlight = null;
  refreshInFlight = null;
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  isAuthenticated = computed(() => this.user() !== null && this.token() !== null, ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  roleLabel = computed(() => this.user() ? ROLE_LABELS[this.user().role] : "", ...ngDevMode ? [{ debugName: "roleLabel" }] : []);
  homeUrl = computed(() => "/home/account", ...ngDevMode ? [{ debugName: "homeUrl" }] : []);
  hasRole(...roles) {
    const user = this.user();
    return user !== null && roles.includes(user.role);
  }
  accessToken() {
    return this.token();
  }
  /** Installe une session reçue de l'API (login, code validé, profil ou mot de passe modifié). */
  acceptSession(response) {
    this.sessionVersion++;
    this.sessionReplaced.next();
    this.setSession(response);
    this.challenges.clear();
  }
  /**
   * `'authenticated'` : session ouverte.
   * `'verification-required'` : code de connexion requis, un code vient d'être envoyé (challenge dans le store).
   */
  login(identifier, password) {
    return this.http.post(`${AUTH_URL}/login`, { identifier, password }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), map((body) => {
      if (isChallenge(body)) {
        this.challenges.set(body);
        return "verification-required";
      }
      this.acceptSession(body);
      return "authenticated";
    }));
  }
  /** Crée le compte non confirmé et envoie le code. Pas de session avant la saisie du code. */
  register(name, contact, password) {
    return this.http.post(`${AUTH_URL}/register`, __spreadProps(__spreadValues({ name }, contact), { password }), { withCredentials: true }).pipe(takeUntil(this.sessionEnded), map((body) => {
      if (!isChallenge(body)) {
        throw new Error("VERIFICATION_REQUIRED");
      }
      this.challenges.set(body);
      return "verification-required";
    }));
  }
  verifyCode(challenge_id, code) {
    return this.http.post(`${AUTH_URL}/verify-code`, { challenge_id, code }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((response) => this.acceptSession(response)), map((response) => response.user));
  }
  resendCode(challenge_id) {
    return this.http.post(`${AUTH_URL}/resend-code`, { challenge_id }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded));
  }
  requestGoogleLogin(credential) {
    return this.http.post(`${AUTH_URL}/google`, { credential }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((challenge) => this.challenges.set(challenge)));
  }
  me() {
    if (!this.profileInFlight) {
      const version = this.sessionVersion;
      this.profileInFlight = this.http.get(`${AUTH_URL}/me`).pipe(takeUntil(this.sessionEnded), takeUntil(this.sessionReplaced), tap((user) => {
        if (version !== this.sessionVersion)
          throw new HttpErrorResponse({ status: 401, statusText: "Session changed" });
        this.user.set(user);
      }), finalize(() => this.profileInFlight = null), shareReplay({ bufferSize: 1, refCount: true }));
    }
    return this.profileInFlight;
  }
  /** Nouvel access token via le cookie. Les appels simultanés partagent la même requête. */
  refresh() {
    if (!this.refreshInFlight) {
      this.refreshInFlight = this.http.post(`${AUTH_URL}/refresh`, {}, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), takeUntil(this.sessionReplaced), tap((response) => this.setSession(response)), catchError((error) => {
        this.clearSession();
        return throwError(() => error);
      }), finalize(() => this.refreshInFlight = null), shareReplay(1));
    }
    return this.refreshInFlight;
  }
  /** `true` si l'utilisateur est (ou redevient) connecté, sans jamais lever d'erreur. */
  restoreSession() {
    if (this.isAuthenticated()) {
      return of(true);
    }
    if (this.sessionChecked) {
      return of(false);
    }
    return this.refresh().pipe(map(() => true), catchError(() => of(false)));
  }
  /** Refresh restores the cookie session; /me rechecks current account and role. */
  validateSession() {
    return this.restoreSession().pipe(switchMap((authenticated) => authenticated ? this.me() : of(null)), catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.clearSession();
      }
      return of(null);
    }));
  }
  updateProfile(name, email, current_password) {
    return this.http.patch(`${AUTH_URL}/me`, { name, email: email || null, current_password }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((response) => this.acceptSession(response)), map((response) => response.user));
  }
  changePassword(current_password, new_password) {
    return this.http.post(`${AUTH_URL}/change-password`, { current_password, new_password }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((response) => this.acceptSession(response)), map((response) => response.user));
  }
  deleteAccount(current_password) {
    return this.http.delete(`${AUTH_URL}/me`, { body: { current_password }, withCredentials: true }).pipe(tap(() => {
      this.sessionEnded.next();
      this.clearSession();
    }));
  }
  logout() {
    this.sessionEnded.next();
    this.challenges.clear();
    this.http.post(`${AUTH_URL}/logout`, {}, { withCredentials: true }).subscribe({ error: () => void 0 });
    this.clearSession();
    const overlays = document.querySelectorAll(".p-menu-overlay, .p-component-overlay");
    overlays.forEach((el) => el.remove());
    this.router.navigate(["/auth/login"]);
  }
  clearSession() {
    this.sessionChecked = true;
    this.sessionVersion++;
    this.token.set(null);
    this.user.set(null);
  }
  setSession(response) {
    this.sessionChecked = true;
    this.token.set(response.access_token);
    this.user.set(response.user);
    this.preferences.load().pipe(takeUntil(this.sessionEnded), takeUntil(this.sessionReplaced)).subscribe({ error: () => void 0 });
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  LayoutService,
  PreferencesService,
  ChallengeStore,
  AuthService
};
//# sourceMappingURL=chunk-IKQWXVMD.js.map
