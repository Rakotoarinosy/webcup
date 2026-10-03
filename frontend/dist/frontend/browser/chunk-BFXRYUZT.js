import {
  ROLE_LABELS
} from "./chunk-OY2B3AGZ.js";
import {
  Router
} from "./chunk-O26HSNKS.js";
import {
  HttpClient,
  HttpErrorResponse,
  Injectable,
  Subject,
  catchError,
  computed,
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
  ɵɵdefineInjectable
} from "./chunk-E5MYAYBP.js";

// src/app/auth/auth.service.ts
var AUTH_URL = `${environment.apiUrl}/auth`;
var AuthService = class _AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  token = signal(null, ...ngDevMode ? [{ debugName: "token" }] : []);
  sessionEnded = new Subject();
  sessionChecked = false;
  sessionVersion = 0;
  profileInFlight = null;
  refreshInFlight = null;
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  isAuthenticated = computed(() => this.user() !== null && this.token() !== null, ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  roleLabel = computed(() => this.user() ? ROLE_LABELS[this.user().role] : "", ...ngDevMode ? [{ debugName: "roleLabel" }] : []);
  homeUrl = computed(() => this.hasRole("admin", "manager") ? "/home/dashboard" : "/home/account", ...ngDevMode ? [{ debugName: "homeUrl" }] : []);
  hasRole(...roles) {
    const user = this.user();
    return user !== null && roles.includes(user.role);
  }
  accessToken() {
    return this.token();
  }
  login(email, password) {
    return this.http.post(`${AUTH_URL}/login`, { email, password }, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((response) => {
      this.sessionVersion++;
      this.setSession(response);
    }), map((response) => response.user));
  }
  register(name, email, password) {
    return this.http.post(`${AUTH_URL}/register`, { name, email, password }, { withCredentials: true }).pipe(switchMap(() => this.login(email, password)));
  }
  me() {
    if (!this.profileInFlight) {
      const version = this.sessionVersion;
      this.profileInFlight = this.http.get(`${AUTH_URL}/me`).pipe(tap((user) => {
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
      this.refreshInFlight = this.http.post(`${AUTH_URL}/refresh`, {}, { withCredentials: true }).pipe(takeUntil(this.sessionEnded), tap((response) => this.setSession(response)), catchError((error) => {
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
  logout() {
    this.sessionEnded.next();
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
  AuthService
};
//# sourceMappingURL=chunk-BFXRYUZT.js.map
