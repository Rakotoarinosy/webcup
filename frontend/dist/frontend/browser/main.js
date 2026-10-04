import {
  AppConfigurator,
  AppFloatingConfigurator,
  Qr,
  StyleClass,
  StyleClassModule,
  authGuard,
  publicSessionGuard,
  roleGuard
} from "./chunk-3MN2ITJI.js";
import "./chunk-RII5OTZE.js";
import {
  PublicationReadService
} from "./chunk-2A6L4AZW.js";
import {
  MunicipalContentService
} from "./chunk-BJ7LH56I.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import {
  RealtimeService
} from "./chunk-R3AFDXWT.js";
import {
  AuthService,
  LayoutService
} from "./chunk-IKQWXVMD.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  DomSanitizer,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling
} from "./chunk-F3M422Q6.js";
import "./chunk-SULZIKH5.js";
import "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import {
  Tooltip,
  TooltipModule
} from "./chunk-OUQ4VYAJ.js";
import "./chunk-5UENDHV5.js";
import {
  Motion,
  MotionModule
} from "./chunk-KLPUC4MO.js";
import {
  zindexutils
} from "./chunk-NAF47H6O.js";
import {
  Badge,
  BadgeModule,
  Button,
  ButtonDirective,
  ButtonModule,
  Ripple,
  RippleModule
} from "./chunk-U2WLW23Z.js";
import {
  ConnectedOverlayScrollHandler
} from "./chunk-EF3HWUJ3.js";
import "./chunk-QS2LCQSO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BX45OWY6.js";
import {
  BaseComponent,
  BaseStyle,
  Bind,
  BindModule,
  D,
  OverlayService,
  PARENT_INSTANCE,
  PrimeTemplate,
  S,
  SharedModule,
  Y,
  Yt,
  bt,
  providePrimeNG,
  s2 as s,
  ut,
  v,
  z
} from "./chunk-YMMGU7DJ.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DatePipe,
  DestroyRef,
  EMPTY,
  ElementRef,
  EventEmitter,
  HostListener,
  HttpClient,
  HttpErrorResponse,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  LOCALE_ID,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgStyle,
  NgTemplateOutlet,
  Output,
  PLATFORM_ID,
  Pipe,
  Subject,
  ViewChild,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  catchError,
  computed,
  effect,
  environment,
  exhaustMap,
  filter,
  finalize,
  forkJoin,
  forwardRef,
  inject,
  input,
  isPlatformBrowser,
  numberAttribute,
  provideAppInitializer,
  provideHttpClient,
  provideZonelessChangeDetection,
  registerLocaleData,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  takeUntil,
  throwError,
  viewChild,
  withFetch,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// node_modules/@angular/common/locales/fr.js
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v2 = val.toString().replace(/^[^.]*\.?/, "").length, e = parseInt(val.toString().replace(/^[^e]*(e([-+]?\d+))?/, "$2")) || 0;
  if (i === 0 || i === 1)
    return 1;
  if (e === 0 && (!(i === 0) && (i % 1e6 === 0 && v2 === 0)) || !(e >= 0 && e <= 5))
    return 4;
  return 5;
}
var fr_default = ["fr", [["AM", "PM"]], u, [["D", "L", "M", "M", "J", "V", "S"], ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], ["di", "lu", "ma", "me", "je", "ve", "sa"]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["janv.", "f\xE9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\xFBt", "sept.", "oct.", "nov.", "d\xE9c."], ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"]], u, [["av. J.-C.", "ap. J.-C."], u, ["avant J\xE9sus-Christ", "apr\xE8s J\xE9sus-Christ"]], 1, [6, 0], ["dd/MM/y", "d MMM y", "d MMMM y", "EEEE d MMMM y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1} {0}", "{1}, {0}", u, u], [",", "\u202F", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0\xA0%", "#,##0.00\xA0\xA4", "#E0"], "EUR", "\u20AC", "euro", { "ARS": ["$AR", "$"], "AUD": ["$AU", "$"], "BEF": ["FB"], "BMD": ["$BM", "$"], "BND": ["$BN", "$"], "BYN": [u, "\u0440."], "BZD": ["$BZ", "$"], "CAD": ["$CA", "$"], "CLP": ["$CL", "$"], "CNY": [u, "\xA5"], "COP": ["$CO", "$"], "CYP": ["\xA3CY"], "EGP": [u, "\xA3E"], "FJD": ["$FJ", "$"], "FKP": ["\xA3FK", "\xA3"], "FRF": ["F"], "GBP": ["\xA3GB", "\xA3"], "GIP": ["\xA3GI", "\xA3"], "HKD": [u, "$"], "IEP": ["\xA3IE"], "ILP": ["\xA3IL"], "ITL": ["\u20A4IT"], "JPY": [u, "\xA5"], "KMF": [u, "FC"], "LBP": ["\xA3LB", "\xA3L"], "MTP": ["\xA3MT"], "MXN": ["$MX", "$"], "NAD": ["$NA", "$"], "NIO": [u, "$C"], "NZD": ["$NZ", "$"], "PHP": [u, "\u20B1"], "RHD": ["$RH"], "RON": [u, "L"], "RWF": [u, "FR"], "SBD": ["$SB", "$"], "SGD": ["$SG", "$"], "SRD": ["$SR", "$"], "TOP": [u, "$T"], "TTD": ["$TT", "$"], "TWD": [u, "NT$"], "USD": ["$US", "$"], "UYU": ["$UY", "$"], "WST": ["$WS"], "XCD": [u, "$"], "XPF": ["FCFP"], "ZMW": [u, "Kw"] }, "ltr", plural];

// src/app/auth/auth.interceptor.ts
var PUBLIC_AUTH_PATHS = ["config", "login", "refresh", "logout", "register", "google", "verify-code", "resend-code"];
function withToken(request, token) {
  return token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
}
var authInterceptor = (request, next) => {
  const api = new URL(environment.apiUrl, document.baseURI);
  const url = new URL(request.url, document.baseURI);
  const basePath = api.pathname.replace(/\/$/, "");
  if (url.origin !== api.origin || !(url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)) || PUBLIC_AUTH_PATHS.some((path) => url.pathname === `${basePath}/auth/${path}`))
    return next(request);
  const auth = inject(AuthService);
  const router = inject(Router);
  const sentToken = auth.accessToken();
  const failSession = (error) => {
    auth.clearSession();
    router.navigate(["/auth/login"], { queryParams: { returnUrl: router.url } });
    return throwError(() => error);
  };
  const retry = () => next(withToken(request, auth.accessToken())).pipe(catchError((error) => {
    return error instanceof HttpErrorResponse && error.status === 401 ? failSession(error) : throwError(() => error);
  }));
  return next(withToken(request, sentToken)).pipe(catchError((error) => {
    if (!(error instanceof HttpErrorResponse) || error.status !== 401)
      return throwError(() => error);
    if (auth.accessToken() && auth.accessToken() !== sentToken)
      return retry();
    return auth.refresh().pipe(catchError(() => failSession(error)), switchMap(retry));
  }));
};

// src/app/notifications/notification.service.ts
var NotificationService = class _NotificationService {
  http = inject(HttpClient);
  auth = inject(AuthService);
  realtime = inject(RealtimeService);
  baseUrl = `${environment.apiUrl}/notifications`;
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  unreadCount = signal(0, ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  recent = computed(() => this.items().slice(0, 8), ...ngDevMode ? [{ debugName: "recent" }] : []);
  constructor() {
    effect((onCleanup) => {
      if (!this.auth.isAuthenticated()) {
        this.items.set([]);
        this.unreadCount.set(0);
        return;
      }
      const subscription = this.realtime.changes$.pipe(startWith(null), exhaustMap(() => this.fetch().pipe(catchError(() => EMPTY)))).subscribe();
      onCleanup(() => subscription.unsubscribe());
    });
  }
  fetch() {
    return this.http.get(this.baseUrl).pipe(catchError((error) => {
      this.error.set("Impossible de charger les notifications.");
      throw error;
    }), switchMap((response) => {
      this.items.set(response.items);
      this.unreadCount.set(response.unread_count);
      this.error.set(null);
      return EMPTY;
    }));
  }
  markRead(key) {
    this.items.update((items) => items.map((item) => item.key === key ? __spreadProps(__spreadValues({}, item), { is_read: true }) : item));
    this.unreadCount.update((count) => Math.max(0, count - 1));
    return this.http.post(`${this.baseUrl}/${encodeURIComponent(key)}/read`, {});
  }
  markAllRead() {
    this.items.update((items) => items.map((item) => __spreadProps(__spreadValues({}, item), { is_read: true })));
    this.unreadCount.set(0);
    return this.http.post(`${this.baseUrl}/read-all`, {});
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/layout/component/menuitem/app.menuitem.ts
var _c0 = ["app-menuitem", ""];
var _c1 = () => ({ paths: "exact", queryParams: "ignored", matrixParams: "ignored", fragment: "ignored" });
var _forTrack0 = ($index, $item) => $item == null ? null : $item.label;
function AppMenuitem_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.item().label);
  }
}
function AppMenuitem_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", ctx_r0.item().badge + " \xE9l\xE9ments non lus");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.item().badge > 99 ? "99+" : ctx_r0.item().badge);
  }
}
function AppMenuitem_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 8);
  }
}
function AppMenuitem_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275listener("click", function AppMenuitem_Conditional_1_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.itemClick($event));
    });
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, AppMenuitem_Conditional_1_Conditional_4_Template, 2, 2, "span", 7);
    \u0275\u0275conditionalCreate(5, AppMenuitem_Conditional_1_Conditional_5_Template, 1, 0, "i", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.item().class);
    \u0275\u0275attribute("href", ctx_r0.item().url, \u0275\u0275sanitizeUrl)("target", ctx_r0.item().target);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.item().icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.item().label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.item().badge > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasChildren() ? 5 : -1);
  }
}
function AppMenuitem_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("aria-label", ctx_r0.item().badge + " \xE9l\xE9ments non lus");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.item().badge > 99 ? "99+" : ctx_r0.item().badge);
  }
}
function AppMenuitem_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 8);
  }
}
function AppMenuitem_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 9);
    \u0275\u0275listener("click", function AppMenuitem_Conditional_2_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.itemClick($event));
    });
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, AppMenuitem_Conditional_2_Conditional_4_Template, 2, 2, "span", 7);
    \u0275\u0275conditionalCreate(5, AppMenuitem_Conditional_2_Conditional_5_Template, 1, 0, "i", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.item().class)("routerLink", ctx_r0.item().routerLink)("routerLinkActiveOptions", ctx_r0.item().routerLinkActiveOptions || \u0275\u0275pureFunction0(15, _c1))("fragment", ctx_r0.item().fragment)("queryParamsHandling", ctx_r0.item().queryParamsHandling)("preserveFragment", ctx_r0.item().preserveFragment)("skipLocationChange", ctx_r0.item().skipLocationChange)("replaceUrl", ctx_r0.item().replaceUrl)("state", ctx_r0.item().state)("queryParams", ctx_r0.item().queryParams);
    \u0275\u0275attribute("target", ctx_r0.item().target);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.item().icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.item().label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.item().badge > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasChildren() ? 5 : -1);
  }
}
function AppMenuitem_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 11);
  }
  if (rf & 2) {
    const child_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(child_r5["badgeClass"]);
    \u0275\u0275property("item", child_r5)("parentPath", ctx_r0.fullPath())("root", false);
  }
}
function AppMenuitem_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275animateLeave(function AppMenuitem_Conditional_3_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView("p-submenu-leave");
    });
    \u0275\u0275animateEnter(function AppMenuitem_Conditional_3_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.initialized() ? "p-submenu-enter" : null);
    });
    \u0275\u0275repeaterCreate(1, AppMenuitem_Conditional_3_For_2_Template, 1, 5, "li", 10, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("layout-root-submenulist", ctx_r0.root());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.item().items);
  }
}
var AppMenuitem = class _AppMenuitem {
  layoutService = inject(LayoutService);
  router = inject(Router);
  item = input(null, ...ngDevMode ? [{ debugName: "item" }] : []);
  root = input(false, ...ngDevMode ? [{ debugName: "root" }] : []);
  parentPath = input(null, ...ngDevMode ? [{ debugName: "parentPath" }] : []);
  // Enables the submenu enter animation only after the first render.
  initialized = signal(false, ...ngDevMode ? [{ debugName: "initialized" }] : []);
  isVisible = computed(() => this.item()?.visible !== false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  hasChildren = computed(() => this.item()?.items && this.item()?.items.length > 0, ...ngDevMode ? [{ debugName: "hasChildren" }] : []);
  hasRouterLink = computed(() => !!this.item()?.routerLink, ...ngDevMode ? [{ debugName: "hasRouterLink" }] : []);
  fullPath = computed(() => {
    const itemPath = this.item()?.path;
    if (!itemPath)
      return this.parentPath();
    const parent = this.parentPath();
    if (parent && !itemPath.startsWith(parent)) {
      return parent + itemPath;
    }
    return itemPath;
  }, ...ngDevMode ? [{ debugName: "fullPath" }] : []);
  isActive = computed(() => {
    const activePath = this.layoutService.layoutState().activePath;
    if (this.item()?.path) {
      return activePath?.startsWith(this.fullPath() ?? "") ?? false;
    }
    return false;
  }, ...ngDevMode ? [{ debugName: "isActive" }] : []);
  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      if (this.item()?.routerLink) {
        this.updateActiveStateFromRoute();
      }
    });
  }
  ngOnInit() {
    if (this.item()?.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.initialized.set(true);
    });
  }
  updateActiveStateFromRoute() {
    const item = this.item();
    if (!item?.routerLink)
      return;
    const isRouteActive = this.router.isActive(item.routerLink[0], {
      paths: "exact",
      queryParams: "ignored",
      matrixParams: "ignored",
      fragment: "ignored"
    });
    if (isRouteActive) {
      const parentPath = this.parentPath();
      if (parentPath) {
        this.patchLayoutState({ activePath: parentPath });
      }
    }
  }
  itemClick(event) {
    const item = this.item();
    if (item?.disabled) {
      event.preventDefault();
      return;
    }
    if (item?.command) {
      item.command({ originalEvent: event, item });
    }
    if (this.hasChildren()) {
      this.toggleSubmenu();
    } else {
      this.closeMenus();
    }
  }
  toggleSubmenu() {
    if (this.isActive()) {
      this.patchLayoutState({ activePath: this.parentPath() });
    } else {
      this.patchLayoutState({ activePath: this.fullPath(), menuHoverActive: true });
    }
  }
  closeMenus() {
    this.patchLayoutState({
      overlayMenuActive: false,
      mobileMenuActive: false,
      menuHoverActive: false
    });
  }
  patchLayoutState(patch) {
    this.layoutService.layoutState.update((val) => __spreadValues(__spreadValues({}, val), patch));
  }
  static \u0275fac = function AppMenuitem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppMenuitem)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppMenuitem, selectors: [["", "app-menuitem", ""]], hostVars: 4, hostBindings: function AppMenuitem_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("active-menuitem", ctx.isActive())("layout-root-menuitem", ctx.root());
    }
  }, inputs: { item: [1, "item"], root: [1, "root"], parentPath: [1, "parentPath"] }, attrs: _c0, decls: 4, vars: 4, consts: [[1, "layout-menuitem-root-text"], ["tabindex", "0", "pRipple", "", 3, "ngClass"], ["routerLinkActive", "active-route", "tabindex", "0", "pRipple", "", 3, "ngClass", "routerLink", "routerLinkActiveOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "queryParams"], [3, "layout-root-submenulist"], ["tabindex", "0", "pRipple", "", 3, "click", "ngClass"], [1, "layout-menuitem-icon", 3, "ngClass"], [1, "layout-menuitem-text"], [1, "ml-auto", "rounded-full", "bg-primary", "px-2", "py-0.5", "text-xs", "font-semibold", "text-primary-contrast"], [1, "pi", "pi-fw", "pi-angle-down", "layout-submenu-toggler"], ["routerLinkActive", "active-route", "tabindex", "0", "pRipple", "", 3, "click", "ngClass", "routerLink", "routerLinkActiveOptions", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "queryParams"], ["app-menuitem", "", 3, "item", "parentPath", "root", "class"], ["app-menuitem", "", 3, "item", "parentPath", "root"]], template: function AppMenuitem_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, AppMenuitem_Conditional_0_Template, 2, 1, "div", 0);
      \u0275\u0275conditionalCreate(1, AppMenuitem_Conditional_1_Template, 6, 7, "a", 1);
      \u0275\u0275conditionalCreate(2, AppMenuitem_Conditional_2_Template, 6, 16, "a", 2);
      \u0275\u0275conditionalCreate(3, AppMenuitem_Conditional_3_Template, 3, 2, "ul", 3);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.root() && ctx.isVisible() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((!ctx.hasRouterLink() || ctx.hasChildren()) && ctx.isVisible() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasRouterLink() && !ctx.hasChildren() && ctx.isVisible() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasChildren() && ctx.isVisible() && (ctx.root() || ctx.isActive()) ? 3 : -1);
    }
  }, dependencies: [_AppMenuitem, CommonModule, NgClass, RouterModule, RouterLink, RouterLinkActive, RippleModule, Ripple], styles: ["\n\n.p-submenu-enter[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_p-animate-submenu-expand 450ms cubic-bezier(0.86, 0, 0.07, 1) forwards;\n}\n.p-submenu-leave[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_p-animate-submenu-collapse 450ms cubic-bezier(0.86, 0, 0.07, 1) forwards;\n}\n@keyframes _ngcontent-%COMP%_p-animate-submenu-expand {\n  from {\n    max-height: 0;\n    overflow: hidden;\n  }\n  to {\n    max-height: 1000px;\n    overflow: visible;\n  }\n}\n@keyframes _ngcontent-%COMP%_p-animate-submenu-collapse {\n  from {\n    max-height: 1000px;\n    overflow: hidden;\n  }\n  to {\n    max-height: 0;\n    overflow: hidden;\n  }\n}\n/*# sourceMappingURL=app.menuitem.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppMenuitem, [{
    type: Component,
    args: [{ selector: "[app-menuitem]", imports: [CommonModule, RouterModule, RippleModule], host: {
      "[class.active-menuitem]": "isActive()",
      "[class.layout-root-menuitem]": "root()"
    }, template: `<!-- Root section label -->
@if (root() && isVisible()) {
    <div class="layout-menuitem-root-text">{{ item().label }}</div>
}

<!-- Plain link / submenu toggle -->
@if ((!hasRouterLink() || hasChildren()) && isVisible()) {
    <a [attr.href]="item().url" (click)="itemClick($event)" [ngClass]="item().class" [attr.target]="item().target" tabindex="0" pRipple>
        <i [ngClass]="item().icon" class="layout-menuitem-icon"></i>
        <span class="layout-menuitem-text">{{ item().label }}</span>
        @if (item().badge > 0) { <span class="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-contrast" [attr.aria-label]="item().badge + ' \xE9l\xE9ments non lus'">{{ item().badge > 99 ? '99+' : item().badge }}</span> }
        @if (hasChildren()) {
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        }
    </a>
}

<!-- Router link -->
@if (hasRouterLink() && !hasChildren() && isVisible()) {
    <a
        (click)="itemClick($event)"
        [ngClass]="item().class"
        [routerLink]="item().routerLink"
        routerLinkActive="active-route"
        [routerLinkActiveOptions]="item().routerLinkActiveOptions || { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
        [fragment]="item().fragment"
        [queryParamsHandling]="item().queryParamsHandling"
        [preserveFragment]="item().preserveFragment"
        [skipLocationChange]="item().skipLocationChange"
        [replaceUrl]="item().replaceUrl"
        [state]="item().state"
        [queryParams]="item().queryParams"
        [attr.target]="item().target"
        tabindex="0"
        pRipple
    >
        <i [ngClass]="item().icon" class="layout-menuitem-icon"></i>
        <span class="layout-menuitem-text">{{ item().label }}</span>
        @if (item().badge > 0) { <span class="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-contrast" [attr.aria-label]="item().badge + ' \xE9l\xE9ments non lus'">{{ item().badge > 99 ? '99+' : item().badge }}</span> }
        @if (hasChildren()) {
            <i class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        }
    </a>
}

<!-- Submenu -->
@if (hasChildren() && isVisible() && (root() || isActive())) {
    <ul [animate.enter]="initialized() ? 'p-submenu-enter' : null" [animate.leave]="'p-submenu-leave'" [class.layout-root-submenulist]="root()">
        @for (child of item().items; track child?.label) {
            <li app-menuitem [item]="child" [parentPath]="fullPath()" [root]="false" [class]="child['badgeClass']"></li>
        }
    </ul>
}
`, styles: ["/* src/app/layout/component/menuitem/app.menuitem.scss */\n.p-submenu-enter {\n  animation: p-animate-submenu-expand 450ms cubic-bezier(0.86, 0, 0.07, 1) forwards;\n}\n.p-submenu-leave {\n  animation: p-animate-submenu-collapse 450ms cubic-bezier(0.86, 0, 0.07, 1) forwards;\n}\n@keyframes p-animate-submenu-expand {\n  from {\n    max-height: 0;\n    overflow: hidden;\n  }\n  to {\n    max-height: 1000px;\n    overflow: visible;\n  }\n}\n@keyframes p-animate-submenu-collapse {\n  from {\n    max-height: 1000px;\n    overflow: hidden;\n  }\n  to {\n    max-height: 0;\n    overflow: hidden;\n  }\n}\n/*# sourceMappingURL=app.menuitem.css.map */\n"] }]
  }], () => [], { item: [{ type: Input, args: [{ isSignal: true, alias: "item", required: false }] }], root: [{ type: Input, args: [{ isSignal: true, alias: "root", required: false }] }], parentPath: [{ type: Input, args: [{ isSignal: true, alias: "parentPath", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppMenuitem, { className: "AppMenuitem", filePath: "src/app/layout/component/menuitem/app.menuitem.ts", lineNumber: 21 });
})();

// src/app/layout/component/menu/app.menu.ts
var _forTrack02 = ($index, $item) => $item.label;
function AppMenu_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 1);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("item", item_r1)("root", true);
  }
}
function AppMenu_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 2);
  }
}
function AppMenu_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AppMenu_For_2_Conditional_0_Template, 1, 2, "li", 1)(1, AppMenu_For_2_Conditional_1_Template, 1, 0, "li", 2);
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275conditional(!item_r1.separator ? 0 : 1);
  }
}
var AppMenu = class _AppMenu {
  auth = inject(AuthService);
  notifications = inject(NotificationService);
  publications = inject(PublicationReadService);
  model = computed(() => {
    const items = [{ label: "Mon espace", icon: "pi pi-fw pi-user", routerLink: ["/home/account"] }];
    if (this.auth.hasRole("agent")) {
      items.push({ label: "Mes interventions", icon: "pi pi-fw pi-inbox", routerLink: ["/home/agent"] }, { label: "Comptes citoyens", icon: "pi pi-fw pi-users", routerLink: ["/home/users"] });
    }
    if (this.auth.hasRole("citizen")) {
      items.push({ label: "Mes demandes", icon: "pi pi-fw pi-list", routerLink: ["/home/my-requests"], badge: this.notificationBadge() });
    }
    if (this.auth.hasRole("manager", "admin")) {
      items.push({ label: "Demandes citoyennes", icon: "pi pi-fw pi-inbox", routerLink: ["/home/requests"], badge: this.notificationBadge() });
    }
    if (this.auth.hasRole("admin")) {
      items.push({
        label: "Utilisateurs",
        icon: "pi pi-fw pi-users",
        path: "/home/accounts",
        items: [
          { label: "Citoyens", icon: "pi pi-fw pi-user", routerLink: ["/home/accounts/citizens"] },
          { label: "Agents", icon: "pi pi-fw pi-wrench", routerLink: ["/home/accounts/agents"] },
          { label: "Managers", icon: "pi pi-fw pi-briefcase", routerLink: ["/home/accounts/managers"] },
          { label: "Administrateurs", icon: "pi pi-fw pi-shield", routerLink: ["/home/accounts/admins"] }
        ]
      }, { label: "Instituts", icon: "pi pi-fw pi-building", routerLink: ["/home/instituts"] }, { label: "Signalements donn\xE9es", icon: "pi pi-fw pi-shield", routerLink: ["/home/data-concerns"] });
    } else if (this.auth.hasRole("manager")) {
      items.push({ label: "Comptes citoyens", icon: "pi pi-fw pi-users", routerLink: ["/home/users"] });
    }
    if (this.auth.hasRole("agent", "manager", "admin")) {
      items.push({ label: "Journal", icon: "pi pi-fw pi-history", routerLink: ["/home/journal"] });
    }
    const groups = [{ label: "Terra Nova", items }];
    groups.push({
      label: "La mairie",
      items: [
        { label: "Accueil municipal", icon: "pi pi-fw pi-building", routerLink: ["/home/municipal"], routerLinkActiveOptions: { exact: true } },
        { label: "Services municipaux", icon: "pi pi-fw pi-map-marker", routerLink: ["/home/municipal/services"] },
        { label: "Publications", icon: "pi pi-fw pi-megaphone", routerLink: ["/home/municipal/publications"], badge: this.publicationBadge() },
        { label: "Contacter la mairie", icon: "pi pi-fw pi-envelope", routerLink: ["/home/municipal/contact"] }
      ]
    });
    if (this.auth.hasRole("agent", "manager", "admin")) {
      groups.push({
        label: "API Terra Nova",
        items: [
          { label: "Tableau de bord", icon: "pi pi-fw pi-chart-line", routerLink: ["/home/terra-nova"], routerLinkActiveOptions: { exact: true } },
          { label: "Demandes API", icon: "pi pi-fw pi-list", routerLink: ["/home/terra-nova/demandes"] },
          { label: "Notifications", icon: "pi pi-fw pi-bell", routerLink: ["/home/terra-nova/notifications"] },
          { label: "Pipeline", icon: "pi pi-fw pi-objects-column", routerLink: ["/home/terra-nova/pipeline"] }
        ]
      });
    }
    return groups;
  }, ...ngDevMode ? [{ debugName: "model" }] : []);
  notificationBadge() {
    const count = this.notifications.unreadCount();
    return count ? count > 99 ? "99+" : String(count) : void 0;
  }
  publicationBadge() {
    const count = this.publications.unreadCount();
    return count ? count > 99 ? "99+" : String(count) : void 0;
  }
  static \u0275fac = function AppMenu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppMenu)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppMenu, selectors: [["app-menu"]], decls: 3, vars: 0, consts: [[1, "layout-menu"], ["app-menuitem", "", 3, "item", "root"], [1, "menu-separator"]], template: function AppMenu_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "ul", 0);
      \u0275\u0275repeaterCreate(1, AppMenu_For_2_Template, 2, 1, null, null, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.model());
    }
  }, dependencies: [CommonModule, AppMenuitem, RouterModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppMenu, [{
    type: Component,
    args: [{ selector: "app-menu", imports: [CommonModule, AppMenuitem, RouterModule], template: '<ul class="layout-menu">\n    @for (item of model(); track item.label) {\n        @if (!item.separator) {\n            <li app-menuitem [item]="item" [root]="true"></li>\n        } @else {\n            <li class="menu-separator"></li>\n        }\n    }\n</ul>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppMenu, { className: "AppMenu", filePath: "src/app/layout/component/menu/app.menu.ts", lineNumber: 17 });
})();

// src/app/layout/component/sidebar/app.sidebar.ts
var CLOSED_MENU_STATE = {
  overlayMenuActive: false,
  mobileMenuActive: false,
  menuHoverActive: false
};
var AppSidebar = class _AppSidebar {
  layoutService = inject(LayoutService);
  router = inject(Router);
  el = inject(ElementRef);
  outsideClickListener = null;
  destroy$ = new Subject();
  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      const isMenuOpen = this.layoutService.isDesktop() ? state.overlayMenuActive : state.mobileMenuActive;
      if (isMenuOpen) {
        this.bindOutsideClickListener();
      } else {
        this.unbindOutsideClickListener();
      }
    });
  }
  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe((event) => {
      const navEvent = event;
      this.onRouteChange(navEvent.urlAfterRedirects);
    });
    this.onRouteChange(this.router.url);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.unbindOutsideClickListener();
  }
  onRouteChange(path) {
    this.layoutService.layoutState.update((val) => __spreadValues(__spreadProps(__spreadValues({}, val), {
      activePath: path
    }), CLOSED_MENU_STATE));
  }
  bindOutsideClickListener() {
    if (!this.outsideClickListener) {
      this.outsideClickListener = (event) => {
        if (this.isOutsideClicked(event)) {
          this.layoutService.layoutState.update((val) => __spreadValues(__spreadValues({}, val), CLOSED_MENU_STATE));
        }
      };
      document.addEventListener("click", this.outsideClickListener);
    }
  }
  unbindOutsideClickListener() {
    if (this.outsideClickListener) {
      document.removeEventListener("click", this.outsideClickListener);
      this.outsideClickListener = null;
    }
  }
  isOutsideClicked(event) {
    const topbarButtonEl = document.querySelector(".topbar-start > button");
    const sidebarEl = this.el.nativeElement;
    return !(sidebarEl?.isSameNode(event.target) || sidebarEl?.contains(event.target) || topbarButtonEl?.isSameNode(event.target) || topbarButtonEl?.contains(event.target));
  }
  static \u0275fac = function AppSidebar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppSidebar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppSidebar, selectors: [["app-sidebar"]], decls: 2, vars: 0, consts: [[1, "layout-sidebar"]], template: function AppSidebar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-menu");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [AppMenu, RouterModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppSidebar, [{
    type: Component,
    args: [{ selector: "app-sidebar", imports: [AppMenu, RouterModule], template: '<div class="layout-sidebar">\n    <app-menu></app-menu>\n</div>\n' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppSidebar, { className: "AppSidebar", filePath: "src/app/layout/component/sidebar/app.sidebar.ts", lineNumber: 21 });
})();

// node_modules/@primeuix/styles/dist/menu/index.mjs
var style = "\n    .p-menu {\n        background: dt('menu.background');\n        color: dt('menu.color');\n        border: 1px solid dt('menu.border.color');\n        border-radius: dt('menu.border.radius');\n        min-width: 12.5rem;\n    }\n\n    .p-menu-list {\n        margin: 0;\n        padding: dt('menu.list.padding');\n        outline: 0 none;\n        list-style: none;\n        display: flex;\n        flex-direction: column;\n        gap: dt('menu.list.gap');\n    }\n\n    .p-menu-item-content {\n        transition:\n            background dt('menu.transition.duration'),\n            color dt('menu.transition.duration');\n        border-radius: dt('menu.item.border.radius');\n        color: dt('menu.item.color');\n        overflow: hidden;\n    }\n\n    .p-menu-item-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n        color: inherit;\n        padding: dt('menu.item.padding');\n        gap: dt('menu.item.gap');\n        user-select: none;\n        outline: 0 none;\n    }\n\n    .p-menu-item-label {\n        line-height: 1;\n    }\n\n    .p-menu-item-icon {\n        color: dt('menu.item.icon.color');\n    }\n\n    .p-menu-item.p-focus .p-menu-item-content {\n        color: dt('menu.item.focus.color');\n        background: dt('menu.item.focus.background');\n    }\n\n    .p-menu-item.p-focus .p-menu-item-icon {\n        color: dt('menu.item.icon.focus.color');\n    }\n\n    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {\n        color: dt('menu.item.focus.color');\n        background: dt('menu.item.focus.background');\n    }\n\n    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {\n        color: dt('menu.item.icon.focus.color');\n    }\n\n    .p-menu-overlay {\n        box-shadow: dt('menu.shadow');\n    }\n\n    .p-menu-submenu-label {\n        background: dt('menu.submenu.label.background');\n        padding: dt('menu.submenu.label.padding');\n        color: dt('menu.submenu.label.color');\n        font-weight: dt('menu.submenu.label.font.weight');\n    }\n\n    .p-menu-separator {\n        border-block-start: 1px solid dt('menu.separator.border.color');\n    }\n";

// node_modules/primeng/fesm2022/primeng-menu.mjs
var _c02 = ["pMenuItemContent", ""];
var _c12 = (a0) => ({
  $implicit: a0
});
var _c2 = () => ({
  exact: false
});
var _c3 = (a0) => ({
  item: a0
});
function MenuItemContent_ng_container_1_a_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function MenuItemContent_ng_container_1_a_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_1_ng_container_1_Template, 1, 0, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const itemContent_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.item == null ? null : ctx_r1.item.linkClass));
    \u0275\u0275property("ngStyle", ctx_r1.item == null ? null : ctx_r1.item.linkStyle)("target", ctx_r1.item.target)("pBind", ctx_r1.getPTOptions("itemLink"));
    \u0275\u0275attribute("title", ctx_r1.item.title)("href", ctx_r1.item.url || null, \u0275\u0275sanitizeUrl)("data-automationid", ctx_r1.item.automationId)("tabindex", -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemContent_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(11, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_container_1_a_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function MenuItemContent_ng_container_1_a_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_2_ng_container_1_Template, 1, 0, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const itemContent_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.item == null ? null : ctx_r1.item.linkClass));
    \u0275\u0275property("routerLink", ctx_r1.item.routerLink)("queryParams", ctx_r1.item.queryParams)("routerLinkActiveOptions", ctx_r1.item.routerLinkActiveOptions || \u0275\u0275pureFunction0(19, _c2))("ngStyle", ctx_r1.item == null ? null : ctx_r1.item.linkStyle)("target", ctx_r1.item.target)("fragment", ctx_r1.item.fragment)("queryParamsHandling", ctx_r1.item.queryParamsHandling)("preserveFragment", ctx_r1.item.preserveFragment)("skipLocationChange", ctx_r1.item.skipLocationChange)("replaceUrl", ctx_r1.item.replaceUrl)("state", ctx_r1.item.state)("pBind", ctx_r1.getPTOptions("itemLink"));
    \u0275\u0275attribute("data-automationid", ctx_r1.item.automationId)("tabindex", -1)("title", ctx_r1.item.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemContent_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(20, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_1_Template, 2, 13, "a", 4)(2, MenuItemContent_ng_container_1_a_2_Template, 2, 22, "a", 5);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r1.item == null ? null : ctx_r1.item.routerLink));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.item == null ? null : ctx_r1.item.routerLink);
  }
}
function MenuItemContent_ng_container_2_1_ng_template_0_Template(rf, ctx) {
}
function MenuItemContent_ng_container_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MenuItemContent_ng_container_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MenuItemContent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MenuItemContent_ng_container_2_1_Template, 1, 0, null, 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.itemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_template_3_span_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemIcon", \u0275\u0275pureFunction1(5, _c3, ctx_r1.item)), ctx_r1.item.iconClass));
    \u0275\u0275property("pBind", ctx_r1.getPTOptions("itemIcon"))("ngStyle", ctx_r1.item.iconStyle);
    \u0275\u0275attribute("data-pc-section", "itemicon");
  }
}
function MenuItemContent_ng_template_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.item.labelClass));
    \u0275\u0275property("ngStyle", ctx_r1.item.labelStyle)("pBind", ctx_r1.getPTOptions("itemLabel"));
    \u0275\u0275attribute("data-pc-section", "itemlabel");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.item.label);
  }
}
function MenuItemContent_ng_template_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
    \u0275\u0275pipe(1, "safeHtml");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.item.labelClass));
    \u0275\u0275property("ngStyle", ctx_r1.item.labelStyle)("innerHTML", \u0275\u0275pipeBind1(1, 6, ctx_r1.item.label), \u0275\u0275sanitizeHtml)("pBind", ctx_r1.getPTOptions("itemLabel"));
    \u0275\u0275attribute("data-pc-section", "itemlabel");
  }
}
function MenuItemContent_ng_template_3_p_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-badge", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("styleClass", ctx_r1.item.badgeStyleClass)("value", ctx_r1.item.badge)("pt", ctx_r1.getPTOptions("pcBadge"))("unstyled", ctx_r1.unstyled());
  }
}
function MenuItemContent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MenuItemContent_ng_template_3_span_0_Template, 1, 7, "span", 9)(1, MenuItemContent_ng_template_3_span_1_Template, 2, 6, "span", 10)(2, MenuItemContent_ng_template_3_ng_template_2_Template, 2, 8, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(4, MenuItemContent_ng_template_3_p_badge_4_Template, 1, 4, "p-badge", 11);
  }
  if (rf & 2) {
    const htmlLabel_r4 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r1.item.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.item.escape !== false)("ngIfElse", htmlLabel_r4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.item.badge);
  }
}
var _c4 = ["start"];
var _c5 = ["end"];
var _c6 = ["header"];
var _c7 = ["item"];
var _c8 = ["submenuheader"];
var _c9 = ["list"];
var _c10 = ["container"];
var _c11 = (a0, a1) => ({
  item: a0,
  id: a1
});
function Menu_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-motion", 5);
    \u0275\u0275listener("onBeforeEnter", function Menu_Conditional_0_Template_p_motion_onBeforeEnter_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayBeforeEnter($event));
    })("onAfterLeave", function Menu_Conditional_0_Template_p_motion_onAfterLeave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayAfterLeave());
    });
    \u0275\u0275template(1, Menu_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const sharedcontent_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("visible", ctx_r1.visible)("appear", ctx_r1.popup)("options", ctx_r1.computedMotionOptions());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", sharedcontent_r3);
  }
}
function Menu_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const sharedcontent_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", sharedcontent_r3);
  }
}
function Menu_ng_template_2_div_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, Menu_ng_template_2_div_2_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cx("start"));
    \u0275\u0275property("pBind", ctx_r1.ptm("start"));
    \u0275\u0275attribute("data-pc-section", "start");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.startTemplate ?? ctx_r1._startTemplate);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const submenu_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(submenu_r5.label);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
    \u0275\u0275pipe(1, "safeHtml");
  }
  if (rf & 2) {
    const submenu_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(1, 1, submenu_r5.label), \u0275\u0275sanitizeHtml);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_span_1_Template, 2, 1, "span", 18)(2, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_ng_template_2_Template, 2, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const htmlSubmenuLabel_r6 = \u0275\u0275reference(3);
    const submenu_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", submenu_r5.escape !== false)("ngIfElse", htmlSubmenuLabel_r6);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 16);
    \u0275\u0275template(1, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_Template, 4, 2, "ng-container", 10)(2, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_2_Template, 1, 0, "ng-container", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    const submenu_r5 = ctx_r6.$implicit;
    const i_r8 = ctx_r6.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.cx("submenuLabel"));
    \u0275\u0275property("pBind", ctx_r1.ptm("submenuLabel"))("tooltipOptions", submenu_r5.tooltipOptions)("pTooltipUnstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-automationid", submenu_r5.automationId)("id", ctx_r1.menuitemId(submenu_r5, ctx_r1.id, i_r8))("data-pc-section", "submenulabel");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submenuHeaderTemplate && !ctx_r1._submenuHeaderTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.submenuHeaderTemplate ?? ctx_r1._submenuHeaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(11, _c12, submenu_r5));
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 21);
    \u0275\u0275listener("onMenuItemClick", function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template_li_onMenuItemClick_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r9 = \u0275\u0275nextContext();
      const item_r11 = ctx_r9.$implicit;
      const j_r12 = ctx_r9.index;
      const i_r8 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.itemClick($event, ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12)));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const item_r11 = ctx_r9.$implicit;
    const j_r12 = ctx_r9.index;
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleMap(item_r11.style);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("item", \u0275\u0275pureFunction2(17, _c11, item_r11, ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12))), item_r11 == null ? null : item_r11.styleClass));
    \u0275\u0275property("pMenuItemContent", item_r11)("itemTemplate", ctx_r1.itemTemplate ?? ctx_r1._itemTemplate)("idx", j_r12)("menuitemId", ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12))("tooltipOptions", item_r11.tooltipOptions)("pTooltipUnstyled", ctx_r1.unstyled())("unstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-pc-section", "menuitem")("aria-label", ctx_r1.label(item_r11.label))("data-p-focused", ctx_r1.isItemFocused(ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12)))("data-p-disabled", ctx_r1.disabled(item_r11.disabled))("aria-disabled", ctx_r1.disabled(item_r11.disabled))("id", ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12));
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_ng_template_2_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template, 1, 20, "li", 20);
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const submenu_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngIf", item_r11.separator && (item_r11.visible !== false || submenu_r5.visible !== false));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r11.separator && item_r11.visible !== false && (item_r11.visible !== void 0 || submenu_r5.visible !== false));
  }
}
function Menu_ng_template_2_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_5_ng_template_0_li_1_Template, 3, 13, "li", 14)(2, Menu_ng_template_2_5_ng_template_0_ng_template_2_Template, 2, 2, "ng-template", 12);
  }
  if (rf & 2) {
    const submenu_r5 = ctx.$implicit;
    \u0275\u0275property("ngIf", submenu_r5.separator && submenu_r5.visible !== false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !submenu_r5.separator);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", submenu_r5.items);
  }
}
function Menu_ng_template_2_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_Template, 3, 3, "ng-template", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngForOf", ctx_r1.model);
  }
}
function Menu_ng_template_2_6_ng_template_0_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_6_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 23);
    \u0275\u0275listener("onMenuItemClick", function Menu_ng_template_2_6_ng_template_0_li_1_Template_li_onMenuItemClick_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r13 = \u0275\u0275nextContext();
      const item_r15 = ctx_r13.$implicit;
      const i_r16 = ctx_r13.index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.itemClick($event, ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16)));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const item_r15 = ctx_r13.$implicit;
    const i_r16 = ctx_r13.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("item", \u0275\u0275pureFunction2(16, _c11, item_r15, ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16))), item_r15 == null ? null : item_r15.styleClass));
    \u0275\u0275property("pMenuItemContent", item_r15)("itemTemplate", ctx_r1.itemTemplate ?? ctx_r1._itemTemplate)("idx", i_r16)("menuitemId", ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16))("ngStyle", item_r15.style)("tooltipOptions", item_r15.tooltipOptions)("unstyled", ctx_r1.unstyled())("pTooltipUnstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-pc-section", "menuitem")("aria-label", ctx_r1.label(item_r15.label))("data-p-focused", ctx_r1.isItemFocused(ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16)))("data-p-disabled", ctx_r1.disabled(item_r15.disabled))("aria-disabled", ctx_r1.disabled(item_r15.disabled))("id", ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16));
  }
}
function Menu_ng_template_2_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_6_ng_template_0_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_6_ng_template_0_li_1_Template, 1, 19, "li", 22);
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275property("ngIf", item_r15.separator && item_r15.visible !== false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r15.separator && item_r15.visible !== false);
  }
}
function Menu_ng_template_2_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_6_ng_template_0_Template, 2, 2, "ng-template", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngForOf", ctx_r1.model);
  }
}
function Menu_ng_template_2_div_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, Menu_ng_template_2_div_7_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cx("end"));
    \u0275\u0275property("pBind", ctx_r1.ptm("end"));
    \u0275\u0275attribute("data-pc-section", "end");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.endTemplate ?? ctx_r1._endTemplate);
  }
}
function Menu_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7, 1);
    \u0275\u0275listener("click", function Menu_ng_template_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick($event));
    });
    \u0275\u0275template(2, Menu_ng_template_2_div_2_Template, 2, 5, "div", 8);
    \u0275\u0275elementStart(3, "ul", 9, 2);
    \u0275\u0275listener("focus", function Menu_ng_template_2_Template_ul_focus_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListFocus($event));
    })("blur", function Menu_ng_template_2_Template_ul_blur_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListBlur($event));
    })("keydown", function Menu_ng_template_2_Template_ul_keydown_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListKeyDown($event));
    });
    \u0275\u0275template(5, Menu_ng_template_2_5_Template, 1, 1, null, 10)(6, Menu_ng_template_2_6_Template, 1, 1, null, 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, Menu_ng_template_2_div_7_Template, 2, 5, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.sx("root"));
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass));
    \u0275\u0275property("ngStyle", ctx_r1.style)("pBind", ctx_r1.ptm("root"));
    \u0275\u0275attribute("id", ctx_r1.id)("data-p", ctx_r1.dataP);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.startTemplate ?? ctx_r1._startTemplate);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.cx("list"));
    \u0275\u0275property("pBind", ctx_r1.ptm("list"));
    \u0275\u0275attribute("id", ctx_r1.id + "_list")("tabindex", ctx_r1.getTabIndexValue())("data-pc-section", "menu")("aria-activedescendant", ctx_r1.activedescendant())("aria-label", ctx_r1.ariaLabel)("aria-labelledBy", ctx_r1.ariaLabelledBy);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.hasSubMenu());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.hasSubMenu());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.endTemplate ?? ctx_r1._endTemplate);
  }
}
var inlineStyles = {
  root: ({
    instance
  }) => ({
    position: instance.popup ? "absolute" : "relative"
  })
};
var classes = {
  root: ({
    instance
  }) => ["p-menu p-component", {
    "p-menu-overlay": instance.popup
  }],
  start: "p-menu-start",
  list: "p-menu-list",
  submenuLabel: "p-menu-submenu-label",
  separator: "p-menu-separator",
  end: "p-menu-end",
  item: ({
    instance,
    item,
    id
  }) => ["p-menu-item", {
    "p-focus": instance.focusedOptionId() && id === instance.focusedOptionId(),
    "p-disabled": instance.disabled(item.disabled)
  }, item.styleClass],
  itemContent: "p-menu-item-content",
  itemLink: "p-menu-item-link",
  itemIcon: ({
    item
  }) => ["p-menu-item-icon", item.icon, item.iconClass],
  itemLabel: "p-menu-item-label"
};
var MenuStyle = class _MenuStyle extends BaseStyle {
  name = "menu";
  style = style;
  classes = classes;
  inlineStyles = inlineStyles;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MenuStyle_BaseFactory;
    return function MenuStyle_Factory(__ngFactoryType__) {
      return (\u0275MenuStyle_BaseFactory || (\u0275MenuStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MenuStyle)))(__ngFactoryType__ || _MenuStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MenuStyle,
    factory: _MenuStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuStyle, [{
    type: Injectable
  }], null, null);
})();
var MenuClasses;
(function(MenuClasses2) {
  MenuClasses2["root"] = "p-menu";
  MenuClasses2["start"] = "p-menu-start";
  MenuClasses2["list"] = "p-menu-list";
  MenuClasses2["submenuItem"] = "p-menu-submenu-item";
  MenuClasses2["separator"] = "p-menu-separator";
  MenuClasses2["end"] = "p-menu-end";
  MenuClasses2["item"] = "p-menu-item";
  MenuClasses2["itemContent"] = "p-menu-item-content";
  MenuClasses2["itemLink"] = "p-menu-item-link";
  MenuClasses2["itemIcon"] = "p-menu-item-icon";
  MenuClasses2["itemLabel"] = "p-menu-item-label";
})(MenuClasses || (MenuClasses = {}));
var MENU_INSTANCE = new InjectionToken("MENU_INSTANCE");
var SafeHtmlPipe = class _SafeHtmlPipe {
  platformId;
  sanitizer;
  constructor(platformId, sanitizer) {
    this.platformId = platformId;
    this.sanitizer = sanitizer;
  }
  transform(value) {
    if (!value || !isPlatformBrowser(this.platformId)) {
      return value;
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  static \u0275fac = function SafeHtmlPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SafeHtmlPipe)(\u0275\u0275directiveInject(PLATFORM_ID, 16), \u0275\u0275directiveInject(DomSanitizer, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "safeHtml",
    type: _SafeHtmlPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SafeHtmlPipe, [{
    type: Pipe,
    args: [{
      name: "safeHtml",
      standalone: true
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: DomSanitizer
  }], null);
})();
var MenuItemContent = class _MenuItemContent extends BaseComponent {
  item;
  itemTemplate;
  menuitemId = input("", ...ngDevMode ? [{
    debugName: "menuitemId"
  }] : []);
  idx = input(0, ...ngDevMode ? [{
    debugName: "idx"
  }] : []);
  onMenuItemClick = new EventEmitter();
  menu;
  _componentStyle = inject(MenuStyle);
  hostName = "Menu";
  constructor(menu) {
    super();
    this.menu = menu;
  }
  onItemClick(event, item) {
    this.onMenuItemClick.emit({
      originalEvent: event,
      item
    });
  }
  getPTOptions(key) {
    return this.menu.getPTOptions(key, this.item, this.idx(), this.menuitemId());
  }
  static \u0275fac = function MenuItemContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuItemContent)(\u0275\u0275directiveInject(forwardRef(() => Menu)));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MenuItemContent,
    selectors: [["", "pMenuItemContent", ""]],
    inputs: {
      item: [0, "pMenuItemContent", "item"],
      itemTemplate: "itemTemplate",
      menuitemId: [1, "menuitemId"],
      idx: [1, "idx"]
    },
    outputs: {
      onMenuItemClick: "onMenuItemClick"
    },
    features: [\u0275\u0275ProvidersFeature([MenuStyle]), \u0275\u0275InheritDefinitionFeature],
    attrs: _c02,
    decls: 5,
    vars: 6,
    consts: [["itemContent", ""], ["htmlLabel", ""], [3, "click", "pBind"], [4, "ngIf"], ["pRipple", "", 3, "class", "ngStyle", "target", "pBind", 4, "ngIf"], ["routerLinkActive", "p-menu-item-link-active", "pRipple", "", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "class", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind", 4, "ngIf"], ["pRipple", "", 3, "ngStyle", "target", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["routerLinkActive", "p-menu-item-link-active", "pRipple", "", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind"], [3, "class", "pBind", "ngStyle", 4, "ngIf"], [3, "class", "ngStyle", "pBind", 4, "ngIf", "ngIfElse"], [3, "styleClass", "value", "pt", "unstyled", 4, "ngIf"], [3, "pBind", "ngStyle"], [3, "ngStyle", "pBind"], [3, "ngStyle", "innerHTML", "pBind"], [3, "styleClass", "value", "pt", "unstyled"]],
    template: function MenuItemContent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275listener("click", function MenuItemContent_Template_div_click_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onItemClick($event, ctx.item));
        });
        \u0275\u0275template(1, MenuItemContent_ng_container_1_Template, 3, 2, "ng-container", 3)(2, MenuItemContent_ng_container_2_Template, 2, 4, "ng-container", 3)(3, MenuItemContent_ng_template_3_Template, 5, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("itemContent"));
        \u0275\u0275property("pBind", ctx.getPTOptions("itemContent"));
        \u0275\u0275attribute("data-pc-section", "content");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.itemTemplate);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.itemTemplate);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, RouterLinkActive, Ripple, TooltipModule, Bind, BadgeModule, Badge, SharedModule, BindModule, SafeHtmlPipe],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemContent, [{
    type: Component,
    args: [{
      selector: "[pMenuItemContent]",
      standalone: true,
      imports: [CommonModule, RouterModule, Ripple, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule],
      template: ` <div [class]="cx('itemContent')" (click)="onItemClick($event, item)" [attr.data-pc-section]="'content'" [pBind]="getPTOptions('itemContent')">
        <ng-container *ngIf="!itemTemplate">
            <a
                *ngIf="!item?.routerLink"
                [attr.title]="item.title"
                [attr.href]="item.url || null"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [class]="cn(cx('itemLink'), item?.linkClass)"
                [ngStyle]="item?.linkStyle"
                [target]="item.target"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
            <a
                *ngIf="item?.routerLink"
                [routerLink]="item.routerLink"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [attr.title]="item.title"
                [queryParams]="item.queryParams"
                routerLinkActive="p-menu-item-link-active"
                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                [class]="cn(cx('itemLink'), item?.linkClass)"
                [ngStyle]="item?.linkStyle"
                [target]="item.target"
                [fragment]="item.fragment"
                [queryParamsHandling]="item.queryParamsHandling"
                [preserveFragment]="item.preserveFragment"
                [skipLocationChange]="item.skipLocationChange"
                [replaceUrl]="item.replaceUrl"
                [state]="item.state"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
        </ng-container>

        <ng-container *ngIf="itemTemplate">
            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
        </ng-container>

        <ng-template #itemContent>
            <span [class]="cn(cx('itemIcon', { item }), item.iconClass)" [pBind]="getPTOptions('itemIcon')" *ngIf="item.icon" [ngStyle]="item.iconStyle" [attr.data-pc-section]="'itemicon'"></span>
            <span [class]="cn(cx('itemLabel'), item.labelClass)" [ngStyle]="item.labelStyle" [pBind]="getPTOptions('itemLabel')" [attr.data-pc-section]="'itemlabel'" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
            <ng-template #htmlLabel><span [class]="cn(cx('itemLabel'), item.labelClass)" [ngStyle]="item.labelStyle" [attr.data-pc-section]="'itemlabel'" [innerHTML]="item.label | safeHtml" [pBind]="getPTOptions('itemLabel')"></span></ng-template>
            <p-badge *ngIf="item.badge" [styleClass]="item.badgeStyleClass" [value]="item.badge" [pt]="getPTOptions('pcBadge')" [unstyled]="unstyled()" />
        </ng-template>
    </div>`,
      encapsulation: ViewEncapsulation.None,
      providers: [MenuStyle]
    }]
  }], () => [{
    type: Menu,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => Menu)]
    }]
  }], {
    item: [{
      type: Input,
      args: ["pMenuItemContent"]
    }],
    itemTemplate: [{
      type: Input
    }],
    menuitemId: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "menuitemId",
        required: false
      }]
    }],
    idx: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "idx",
        required: false
      }]
    }],
    onMenuItemClick: [{
      type: Output
    }]
  });
})();
var Menu = class _Menu extends BaseComponent {
  overlayService;
  /**
   * An array of menuitems.
   * @group Props
   */
  model;
  /**
   * Defines if menu would displayed as a popup.
   * @group Props
   */
  popup;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Whether to automatically manage layering.
   * @group Props
   */
  autoZIndex = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Transition options of the show animation.
   * @deprecated since v21.0.0, use `motionOptions` instead.
   * @group Props
   */
  showTransitionOptions = ".12s cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Transition options of the hide animation.
   * @deprecated since v21.0.0, use `motionOptions` instead.
   * @group Props
   */
  hideTransitionOptions = ".1s linear";
  /**
   * Defines a string value that labels an interactive element.
   * @group Props
   */
  ariaLabel;
  /**
   * Identifier of the underlying input element.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Current id state as a string.
   * @group Props
   */
  id;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * Callback to invoke when overlay menu is shown.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when overlay menu is hidden.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when the list loses focus.
   * @param {Event} event - blur event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when the list receives focus.
   * @param {Event} event - focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  listViewChild = viewChild("list", ...ngDevMode ? [{
    debugName: "listViewChild"
  }] : []);
  containerViewChild = viewChild("container", ...ngDevMode ? [{
    debugName: "containerViewChild"
  }] : []);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  container;
  scrollHandler;
  documentClickListener;
  documentResizeListener;
  preventDocumentDefault;
  target;
  visible;
  focusedOptionId = computed(() => {
    return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
  }, ...ngDevMode ? [{
    debugName: "focusedOptionId"
  }] : []);
  focusedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "focusedOptionIndex"
  }] : []);
  selectedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "selectedOptionIndex"
  }] : []);
  focused = false;
  overlayVisible = false;
  $pcMenu = inject(MENU_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  _componentStyle = inject(MenuStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  constructor(overlayService) {
    super();
    this.overlayService = overlayService;
    this.id = this.id || s("pn_id_");
  }
  getPTOptions(key, item, index, id) {
    return this.ptm(key, {
      context: {
        item,
        index,
        focused: this.isItemFocused(id),
        disabled: this.disabled(item.disabled)
      }
    });
  }
  /**
   * Toggles the visibility of the popup menu.
   * @param {Event} event - Browser event.
   * @group Method
   */
  toggle(event) {
    if (this.visible) this.hide();
    else this.show(event);
    this.preventDocumentDefault = true;
  }
  /**
   * Displays the popup menu.
   * @param {Event} event - Browser event.
   * @group Method
   */
  show(event) {
    if (this.container && !this.overlayVisible) {
      this.container = void 0;
    }
    this.target = event.currentTarget;
    this.visible = true;
    this.preventDocumentDefault = true;
    this.overlayVisible = true;
    this.cd.markForCheck();
  }
  onInit() {
    if (!this.popup) {
      this.bindDocumentClickListener();
    }
  }
  /**
   * Defines template option for start.
   * @group Templates
   */
  startTemplate;
  _startTemplate;
  /**
   * Defines template option for end.
   * @group Templates
   */
  endTemplate;
  _endTemplate;
  /**
   * Defines template option for header.
   * @group Templates
   */
  headerTemplate;
  _headerTemplate;
  /**
   * Custom item template.
   * @param {MenuItemTemplateContext} context - item context.
   * @see {@link MenuItemTemplateContext}
   * @group Templates
   */
  itemTemplate;
  _itemTemplate;
  /**
   * Custom submenu header template.
   * @param {MenuSubmenuHeaderTemplateContext} context - submenu header context.
   * @see {@link MenuSubmenuHeaderTemplateContext}
   * @group Templates
   */
  submenuHeaderTemplate;
  _submenuHeaderTemplate;
  templates;
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "start":
          this._startTemplate = item.template;
          break;
        case "end":
          this._endTemplate = item.template;
          break;
        case "item":
          this._itemTemplate = item.template;
          break;
        case "submenuheader":
          this._submenuHeaderTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  getTabIndexValue() {
    return this.tabindex !== void 0 ? this.tabindex.toString() : null;
  }
  onOverlayBeforeEnter(event) {
    this.container = event.element;
    if (this.container) {
      const nativeElementOuterWidth = v(this.containerViewChild()?.nativeElement);
      S(this.container, {
        width: nativeElementOuterWidth + "px"
      });
      S(this.container, {
        position: "absolute",
        top: "0"
      });
      this.appendOverlay();
      this.moveOnTop();
      this.$attrSelector && this.container?.setAttribute(this.$attrSelector, "");
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
      this.bindScrollListener();
      D(this.container, this.target);
      bt(this.listViewChild()?.nativeElement);
      this.onShow.emit({});
    }
  }
  onOverlayAfterLeave() {
    this.restoreOverlayAppend();
    this.onOverlayHide();
    this.onHide.emit({});
  }
  appendOverlay() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body") {
        ut(this.document.body, this.container);
      } else {
        ut(this.$appendTo(), this.container);
      }
    }
  }
  restoreOverlayAppend() {
    if (this.container && this.$appendTo() !== "self") {
      ut(this.el.nativeElement, this.container);
    }
  }
  moveOnTop() {
    if (this.autoZIndex) {
      zindexutils.set("menu", this.container, this.baseZIndex + this.config.zIndex.menu);
    }
  }
  /**
   * Hides the popup menu.
   * @group Method
   */
  hide() {
    this.visible = false;
    this.overlayVisible = false;
    this.cd.markForCheck();
  }
  onWindowResize() {
    if (this.visible && !Yt()) {
      this.hide();
    }
  }
  menuitemId(item, id, index, childIndex) {
    return item?.id ?? `${id}_${index}${childIndex !== void 0 ? "_" + childIndex : ""}`;
  }
  isItemFocused(id) {
    return this.focusedOptionId() === id;
  }
  label(label) {
    return typeof label === "function" ? label() : label;
  }
  disabled(disabled) {
    return typeof disabled === "function" ? disabled() : typeof disabled === "undefined" ? false : disabled;
  }
  activedescendant() {
    return this.focused ? this.focusedOptionId() : void 0;
  }
  onListFocus(event) {
    if (!this.focused) {
      this.focused = true;
      !this.popup && this.changeFocusedOptionIndex(0);
      this.onFocus.emit(event);
    }
  }
  onListBlur(event) {
    if (this.focused) {
      this.focused = false;
      this.changeFocusedOptionIndex(-1);
      this.selectedOptionIndex.set(-1);
      this.focusedOptionIndex.set(-1);
      this.onBlur.emit(event);
    }
  }
  onListKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Enter":
        this.onEnterKey(event);
        break;
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      case "Space":
        this.onSpaceKey(event);
        break;
      case "Escape":
      case "Tab":
        if (this.popup) {
          bt(this.target);
          this.hide();
        }
        this.overlayVisible && this.hide();
        break;
      default:
        break;
    }
  }
  onArrowDownKey(event) {
    const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());
    this.changeFocusedOptionIndex(optionIndex);
    event.preventDefault();
  }
  onArrowUpKey(event) {
    if (event.altKey && this.popup) {
      bt(this.target);
      this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    }
  }
  onHomeKey(event) {
    this.changeFocusedOptionIndex(0);
    event.preventDefault();
  }
  onEndKey(event) {
    this.changeFocusedOptionIndex(Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    event.preventDefault();
  }
  onEnterKey(event) {
    const element = z(this.containerViewChild()?.nativeElement, `li[id="${`${this.focusedOptionIndex()}`}"]`);
    const anchorElement = element && (z(element, '[data-pc-section="itemlink"]') || z(element, "a,button"));
    this.popup && bt(this.target);
    anchorElement ? anchorElement.click() : element && element.click();
    event.preventDefault();
  }
  onSpaceKey(event) {
    this.onEnterKey(event);
  }
  findNextOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    const matchedOptionIndex = [...links].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  }
  findPrevOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    const matchedOptionIndex = [...links].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  }
  changeFocusedOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    if (links.length > 0) {
      let order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
      order > -1 && this.focusedOptionIndex.set(links[order].getAttribute("id"));
    }
  }
  itemClick(event, id) {
    const {
      originalEvent,
      item
    } = event;
    if (!this.focused) {
      this.focused = true;
      this.onFocus.emit();
    }
    if (item.disabled) {
      originalEvent.preventDefault();
      return;
    }
    if (!item.url && !item.routerLink) {
      originalEvent.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent,
        item
      });
    }
    if (this.popup) {
      this.hide();
    }
    if (!this.popup && this.focusedOptionIndex() !== id) {
      this.focusedOptionIndex.set(id);
    }
  }
  onOverlayClick(event) {
    if (this.popup) {
      this.overlayService.add({
        originalEvent: event,
        target: this.el.nativeElement
      });
    }
    this.preventDocumentDefault = true;
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener && isPlatformBrowser(this.platformId)) {
      const documentTarget = this.el ? this.el.nativeElement.ownerDocument : "document";
      this.documentClickListener = this.renderer.listen(documentTarget, "click", (event) => {
        const isOutsideContainer = this.containerViewChild()?.nativeElement && !this.containerViewChild()?.nativeElement.contains(event.target);
        const isOutsideTarget = !(this.target && (this.target === event.target || this.target.contains(event.target)));
        if (!this.popup && isOutsideContainer && isOutsideTarget) {
          this.onListBlur(event);
        }
        if (this.preventDocumentDefault && this.overlayVisible && isOutsideContainer && isOutsideTarget) {
          this.hide();
          this.preventDocumentDefault = false;
        }
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener && isPlatformBrowser(this.platformId)) {
      const window = this.document.defaultView;
      this.documentResizeListener = this.renderer.listen(window, "resize", this.onWindowResize.bind(this));
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler && isPlatformBrowser(this.platformId)) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
        if (this.visible) {
          this.hide();
        }
      });
    }
    this.scrollHandler?.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
      this.scrollHandler = null;
    }
  }
  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.preventDocumentDefault = false;
    if (!this.cd.destroyed) {
      this.target = null;
    }
    if (this.container) {
      if (this.autoZIndex) {
        zindexutils.clear(this.container);
      }
      this.container = void 0;
    }
  }
  onDestroy() {
    if (this.popup) {
      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }
      if (this.container) {
        if (this.autoZIndex) {
          zindexutils.clear(this.container);
        }
        this.container = void 0;
      }
      this.restoreOverlayAppend();
      this.onOverlayHide();
    }
    if (!this.popup) {
      this.unbindDocumentClickListener();
    }
  }
  hasSubMenu() {
    return this.model?.some((item) => item.items) ?? false;
  }
  isItemHidden(item) {
    if (item.separator) {
      return item.visible === false || item.items && item.items.some((subitem) => subitem.visible !== false);
    }
    return item.visible === false;
  }
  get dataP() {
    return this.cn({
      popup: this.popup
    });
  }
  static \u0275fac = function Menu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Menu)(\u0275\u0275directiveInject(OverlayService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Menu,
    selectors: [["p-menu"]],
    contentQueries: function Menu_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.startTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.endTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.headerTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.itemTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.submenuHeaderTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Menu_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.listViewChild, _c9, 5)(ctx.containerViewChild, _c10, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance(2);
      }
    },
    inputs: {
      model: "model",
      popup: [2, "popup", "popup", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      id: "id",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onShow: "onShow",
      onHide: "onHide",
      onBlur: "onBlur",
      onFocus: "onFocus"
    },
    features: [\u0275\u0275ProvidersFeature([MenuStyle, {
      provide: MENU_INSTANCE,
      useExisting: _Menu
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Menu
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    decls: 4,
    vars: 1,
    consts: [["sharedcontent", ""], ["container", ""], ["list", ""], ["htmlSubmenuLabel", ""], ["name", "p-anchored-overlay", 3, "visible", "appear", "options"], ["name", "p-anchored-overlay", 3, "onBeforeEnter", "onAfterLeave", "visible", "appear", "options"], [4, "ngTemplateOutlet"], [3, "click", "ngStyle", "pBind"], [3, "class", "pBind", 4, "ngIf"], ["role", "menu", 3, "focus", "blur", "keydown", "pBind"], [4, "ngIf"], [3, "pBind"], ["ngFor", "", 3, "ngForOf"], ["role", "separator", 3, "class", "pBind", 4, "ngIf"], ["pTooltip", "", "role", "none", 3, "class", "pBind", "tooltipOptions", "pTooltipUnstyled", 4, "ngIf"], ["role", "separator", 3, "pBind"], ["pTooltip", "", "role", "none", 3, "pBind", "tooltipOptions", "pTooltipUnstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngIf", "ngIfElse"], [3, "innerHTML"], ["pTooltip", "", "role", "menuitem", 3, "class", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "style", "tooltipOptions", "pTooltipUnstyled", "unstyled", "onMenuItemClick", 4, "ngIf"], ["pTooltip", "", "role", "menuitem", 3, "onMenuItemClick", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "tooltipOptions", "pTooltipUnstyled", "unstyled"], ["pTooltip", "", "role", "menuitem", 3, "class", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "ngStyle", "tooltipOptions", "unstyled", "pTooltipUnstyled", "onMenuItemClick", 4, "ngIf"], ["pTooltip", "", "role", "menuitem", 3, "onMenuItemClick", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "ngStyle", "tooltipOptions", "unstyled", "pTooltipUnstyled"]],
    template: function Menu_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Menu_Conditional_0_Template, 2, 4, "p-motion", 4)(1, Menu_Conditional_1_Template, 1, 1, "ng-container");
        \u0275\u0275template(2, Menu_ng_template_2_Template, 8, 21, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.popup ? 0 : 1);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, RouterModule, MenuItemContent, TooltipModule, Tooltip, Bind, BadgeModule, SharedModule, BindModule, MotionModule, Motion, SafeHtmlPipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Menu, [{
    type: Component,
    args: [{
      selector: "p-menu",
      standalone: true,
      imports: [CommonModule, RouterModule, MenuItemContent, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule, MotionModule],
      template: `
        @if (popup) {
            <p-motion [visible]="visible" [appear]="popup" name="p-anchored-overlay" [options]="computedMotionOptions()" (onBeforeEnter)="onOverlayBeforeEnter($event)" (onAfterLeave)="onOverlayAfterLeave()">
                <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
            </p-motion>
        } @else {
            <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
        }
        <ng-template #sharedcontent>
            <div #container [class]="cn(cx('root'), styleClass)" [style]="sx('root')" [ngStyle]="style" (click)="onOverlayClick($event)" [attr.id]="id" [pBind]="ptm('root')" [attr.data-p]="dataP">
                <div *ngIf="startTemplate ?? _startTemplate" [class]="cx('start')" [pBind]="ptm('start')" [attr.data-pc-section]="'start'">
                    <ng-container *ngTemplateOutlet="startTemplate ?? _startTemplate"></ng-container>
                </div>
                <ul
                    #list
                    [class]="cx('list')"
                    [pBind]="ptm('list')"
                    role="menu"
                    [attr.id]="id + '_list'"
                    [attr.tabindex]="getTabIndexValue()"
                    [attr.data-pc-section]="'menu'"
                    [attr.aria-activedescendant]="activedescendant()"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledBy]="ariaLabelledBy"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                >
                    <ng-template ngFor let-submenu let-i="index" [ngForOf]="model" *ngIf="hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="submenu.separator && submenu.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cx('submenuLabel')"
                            [pBind]="ptm('submenuLabel')"
                            [attr.data-automationid]="submenu.automationId"
                            *ngIf="!submenu.separator"
                            pTooltip
                            [tooltipOptions]="submenu.tooltipOptions"
                            [pTooltipUnstyled]="unstyled()"
                            role="none"
                            [attr.id]="menuitemId(submenu, id, i)"
                            [attr.data-pc-section]="'submenulabel'"
                        >
                            <ng-container *ngIf="!submenuHeaderTemplate && !_submenuHeaderTemplate">
                                <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{ submenu.label }}</span>
                                <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label | safeHtml"></span></ng-template>
                            </ng-container>
                            <ng-container *ngTemplateOutlet="submenuHeaderTemplate ?? _submenuHeaderTemplate; context: { $implicit: submenu }"></ng-container>
                        </li>
                        <ng-template ngFor let-item let-j="index" [ngForOf]="submenu.items">
                            <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && (item.visible !== false || submenu.visible !== false)" role="separator" [attr.data-pc-section]="'separator'"></li>
                            <li
                                [class]="cn(cx('item', { item, id: menuitemId(item, id, i, j) }), item?.styleClass)"
                                *ngIf="!item.separator && item.visible !== false && (item.visible !== undefined || submenu.visible !== false)"
                                [pMenuItemContent]="item"
                                [itemTemplate]="itemTemplate ?? _itemTemplate"
                                [idx]="j"
                                [menuitemId]="menuitemId(item, id, i, j)"
                                [style]="item.style"
                                (onMenuItemClick)="itemClick($event, menuitemId(item, id, i, j))"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [pTooltipUnstyled]="unstyled()"
                                [unstyled]="unstyled()"
                                role="menuitem"
                                [attr.data-pc-section]="'menuitem'"
                                [attr.aria-label]="label(item.label)"
                                [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i, j))"
                                [attr.data-p-disabled]="disabled(item.disabled)"
                                [attr.aria-disabled]="disabled(item.disabled)"
                                [attr.id]="menuitemId(item, id, i, j)"
                            ></li>
                        </ng-template>
                    </ng-template>
                    <ng-template ngFor let-item let-i="index" [ngForOf]="model" *ngIf="!hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && item.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cn(cx('item', { item, id: menuitemId(item, id, i) }), item?.styleClass)"
                            *ngIf="!item.separator && item.visible !== false"
                            [pMenuItemContent]="item"
                            [itemTemplate]="itemTemplate ?? _itemTemplate"
                            [idx]="i"
                            [menuitemId]="menuitemId(item, id, i)"
                            [ngStyle]="item.style"
                            (onMenuItemClick)="itemClick($event, menuitemId(item, id, i))"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                            [unstyled]="unstyled()"
                            [pTooltipUnstyled]="unstyled()"
                            role="menuitem"
                            [attr.data-pc-section]="'menuitem'"
                            [attr.aria-label]="label(item.label)"
                            [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i))"
                            [attr.data-p-disabled]="disabled(item.disabled)"
                            [attr.aria-disabled]="disabled(item.disabled)"
                            [attr.id]="menuitemId(item, id, i)"
                        ></li>
                    </ng-template>
                </ul>
                <div *ngIf="endTemplate ?? _endTemplate" [class]="cx('end')" [pBind]="ptm('end')" [attr.data-pc-section]="'end'">
                    <ng-container *ngTemplateOutlet="endTemplate ?? _endTemplate"></ng-container>
                </div>
            </div>
        </ng-template>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MenuStyle, {
        provide: MENU_INSTANCE,
        useExisting: Menu
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Menu
      }],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: OverlayService
  }], {
    model: [{
      type: Input
    }],
    popup: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    listViewChild: [{
      type: ViewChild,
      args: ["list", {
        isSignal: true
      }]
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container", {
        isSignal: true
      }]
    }],
    startTemplate: [{
      type: ContentChild,
      args: ["start", {
        descendants: false
      }]
    }],
    endTemplate: [{
      type: ContentChild,
      args: ["end", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    submenuHeaderTemplate: [{
      type: ContentChild,
      args: ["submenuheader", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MenuModule = class _MenuModule {
  static \u0275fac = function MenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MenuModule,
    imports: [Menu, SharedModule, SafeHtmlPipe],
    exports: [Menu, SharedModule, SafeHtmlPipe]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Menu, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuModule, [{
    type: NgModule,
    args: [{
      imports: [Menu, SharedModule, SafeHtmlPipe],
      exports: [Menu, SharedModule, SafeHtmlPipe]
    }]
  }], null, null);
})();

// src/app/layout/service/overlay-coordinator.service.ts
var OverlayCoordinatorService = class _OverlayCoordinatorService {
  active = signal(null, ...ngDevMode ? [{ debugName: "active" }] : []);
  open(overlay) {
    this.active.set(overlay);
  }
  close(overlay) {
    if (!overlay || this.active() === overlay)
      this.active.set(null);
  }
  static \u0275fac = function OverlayCoordinatorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayCoordinatorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OverlayCoordinatorService, factory: _OverlayCoordinatorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayCoordinatorService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/layout/component/topbar/widget/notifications/notifications.ts
var _c03 = ["notificationMenu"];
var _forTrack03 = ($index, $item) => $item.key;
function Notifications_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-badge", 4);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", ctx_r1.unreadCount() > 9 ? "9+" : ctx_r1.unreadCount().toString());
  }
}
function Notifications_Conditional_0_Conditional_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function Notifications_Conditional_0_Conditional_7_Conditional_4_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.markAllAsRead($event));
    });
    \u0275\u0275text(1, " Tout marquer comme lu ");
    \u0275\u0275elementEnd();
  }
}
function Notifications_Conditional_0_Conditional_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function Notifications_Conditional_0_Conditional_7_For_8_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function Notifications_Conditional_0_Conditional_7_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function Notifications_Conditional_0_Conditional_7_For_8_Template_button_click_0_listener() {
      const notification_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.open(notification_r6));
    });
    \u0275\u0275elementStart(1, "span", 16);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 17)(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, Notifications_Conditional_0_Conditional_7_For_8_Conditional_11_Template, 1, 0, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r6 = ctx.$implicit;
    \u0275\u0275classProp("bg-highlight", !notification_r6.is_read);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(notification_r6.typeLabel === "Publication" ? "pi pi-megaphone text-amber-500" : "pi pi-inbox text-blue-500");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notification_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r6.message);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", notification_r6.typeLabel, " \xB7 ", \u0275\u0275pipeBind2(10, 9, notification_r6.created_at, "dd/MM HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!notification_r6.is_read ? 11 : -1);
  }
}
function Notifications_Conditional_0_Conditional_7_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " Aucune notification ");
    \u0275\u0275elementEnd();
  }
}
function Notifications_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3, "Notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Notifications_Conditional_0_Conditional_7_Conditional_4_Template, 2, 0, "button", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, Notifications_Conditional_0_Conditional_7_Conditional_5_Template, 2, 1, "p", 9);
    \u0275\u0275elementStart(6, "div", 10);
    \u0275\u0275repeaterCreate(7, Notifications_Conditional_0_Conditional_7_For_8_Template, 12, 12, "button", 11, _forTrack03, false, Notifications_Conditional_0_Conditional_7_ForEmpty_9_Template, 2, 0, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 13);
    \u0275\u0275listener("click", function Notifications_Conditional_0_Conditional_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAll());
    });
    \u0275\u0275text(11, " Voir toutes les notifications ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.unreadCount() > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.error()) ? 5 : -1, tmp_4_0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.allNotifications());
  }
}
function Notifications_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1, 0)(2, "button", 2);
    \u0275\u0275listener("click", function Notifications_Conditional_0_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePanel($event));
    });
    \u0275\u0275element(3, "i", 3);
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Notifications");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, Notifications_Conditional_0_Conditional_6_Template, 1, 1, "p-badge", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, Notifications_Conditional_0_Conditional_7_Template, 12, 3, "div", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-expanded", ctx_r1.showPanel());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.unreadCount() > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showPanel() ? 7 : -1);
  }
}
var Notifications = class _Notifications {
  auth = inject(AuthService);
  api = inject(NotificationService);
  publications = inject(PublicationReadService);
  router = inject(Router);
  overlays = inject(OverlayCoordinatorService);
  showPanel = signal(false, ...ngDevMode ? [{ debugName: "showPanel" }] : []);
  notificationMenu = viewChild("notificationMenu", ...ngDevMode ? [{ debugName: "notificationMenu" }] : []);
  canView = this.auth.isAuthenticated;
  unreadCount = computed(() => this.api.unreadCount() + this.publications.unreadCount(), ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  allNotifications = computed(() => [
    ...this.api.recent().map((notification) => __spreadProps(__spreadValues({}, notification), { typeLabel: "Demande" })),
    ...this.publications.notificationItems().map((notification) => __spreadProps(__spreadValues({}, notification), { typeLabel: "Publication" }))
  ].sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at)).slice(0, 12), ...ngDevMode ? [{ debugName: "allNotifications" }] : []);
  error = this.api.error;
  constructor() {
    effect(() => this.showPanel.set(this.overlays.active() === "notifications"));
  }
  togglePanel(event) {
    event.stopPropagation();
    this.overlays.active() === "notifications" ? this.overlays.close("notifications") : this.overlays.open("notifications");
  }
  closeOnOutsidePointerDown(event) {
    if (this.showPanel() && !this.notificationMenu()?.nativeElement.contains(event.target))
      this.overlays.close("notifications");
  }
  open(notification) {
    this.overlays.close("notifications");
    if ("publicationId" in notification) {
      if (!notification.is_read)
        this.publications.markRead(notification.publicationId);
      void this.router.navigate(["/home/municipal/publications"], { queryParams: { publication: notification.publicationId } });
      return;
    }
    if (!notification.is_read) {
      this.api.markRead(notification.key).pipe(catchError(() => EMPTY)).subscribe();
    }
    const role = this.auth.user()?.role;
    void this.router.navigate(role === "citizen" ? ["/home/my-requests", notification.request_id] : role === "agent" ? ["/home/agent"] : ["/home/requests"]);
  }
  markAllAsRead(event) {
    event.stopPropagation();
    if (!this.unreadCount())
      return;
    this.publications.notificationItems().filter((item) => !item.is_read).forEach((item) => this.publications.markRead(item.publicationId));
    this.api.markAllRead().pipe(catchError(() => EMPTY)).subscribe();
  }
  openAll() {
    this.overlays.close("notifications");
    const role = this.auth.user()?.role;
    void this.router.navigate(role === "citizen" ? ["/home/my-requests"] : role === "agent" ? ["/home/agent"] : ["/home/requests"]);
  }
  static \u0275fac = function Notifications_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Notifications)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Notifications, selectors: [["app-notifications"]], viewQuery: function Notifications_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.notificationMenu, _c03, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function Notifications_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("pointerdown", function Notifications_pointerdown_HostBindingHandler($event) {
        return ctx.closeOnOutsidePointerDown($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 1, vars: 1, consts: [["notificationMenu", ""], [1, "relative", "inline-block"], ["type", "button", "aria-label", "Notifications", 1, "layout-topbar-action", "relative", 3, "click"], [1, "pi", "pi-bell"], ["severity", "danger", "styleClass", "absolute top-[-2px] right-[-2px] !flex !h-6 !w-6 !min-w-6 !items-center !justify-center !rounded-full !px-1 !py-0 text-[9px]", 3, "value"], [1, "absolute", "right-0", "top-[calc(100%+0.5rem)]", "z-50", "w-80", "overflow-hidden", "rounded-xl", "border", "border-surface-200", "bg-surface-0", "shadow-xl", "dark:border-surface-700", "dark:bg-surface-900"], [1, "flex", "items-center", "justify-between", "border-b", "border-surface-200", "bg-surface-50", "px-4", "py-3", "dark:border-surface-700", "dark:bg-surface-800"], [1, "text-sm", "font-semibold", "text-surface-900", "dark:text-surface-0"], ["type", "button", 1, "text-xs", "font-medium", "text-primary", "hover:underline"], ["role", "alert", 1, "m-0", "px-4", "py-3", "text-sm", "text-red-500"], [1, "max-h-80", "divide-y", "divide-surface-100", "overflow-y-auto", "dark:divide-surface-800"], ["type", "button", 1, "flex", "w-full", "cursor-pointer", "items-start", "gap-3", "border-0", "p-3", "text-left", "transition-colors", "hover:bg-surface-50", "dark:hover:bg-surface-800", 3, "bg-highlight"], [1, "p-6", "text-center", "text-sm", "text-muted-color"], ["type", "button", 1, "w-full", "border-0", "border-t", "border-surface-200", "bg-transparent", "px-4", "py-3", "text-sm", "font-medium", "text-primary", "hover:bg-surface-50", "dark:border-surface-700", "dark:hover:bg-surface-800", 3, "click"], ["type", "button", 1, "text-xs", "font-medium", "text-primary", "hover:underline", 3, "click"], ["type", "button", 1, "flex", "w-full", "cursor-pointer", "items-start", "gap-3", "border-0", "p-3", "text-left", "transition-colors", "hover:bg-surface-50", "dark:hover:bg-surface-800", 3, "click"], [1, "flex", "h-8", "w-8", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-emphasis"], [1, "min-w-0", "flex-1"], [1, "block", "truncate", "text-sm", "font-medium", "text-surface-900", "dark:text-surface-0"], [1, "mt-0.5", "block", "text-xs", "text-muted-color"], [1, "mt-1", "block", "text-xs", "text-muted-color"], ["aria-label", "Non lue", 1, "mt-3", "h-2", "w-2", "shrink-0", "rounded-full", "bg-primary"]], template: function Notifications_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, Notifications_Conditional_0_Template, 8, 3, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.canView() ? 0 : -1);
    }
  }, dependencies: [CommonModule, BadgeModule, Badge, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Notifications, [{
    type: Component,
    args: [{ selector: "app-notifications", imports: [CommonModule, DatePipe, BadgeModule], template: `@if (canView()) {
    <div #notificationMenu class="relative inline-block">
        <button
            type="button"
            class="layout-topbar-action relative"
            aria-label="Notifications"
            [attr.aria-expanded]="showPanel()"
            (click)="togglePanel($event)"
        >
            <i class="pi pi-bell"></i>
            <span>Notifications</span>
            @if (unreadCount() > 0) {
                <p-badge
                    [value]="unreadCount() > 9 ? '9+' : unreadCount().toString()"
                    severity="danger"
                    styleClass="absolute top-[-2px] right-[-2px] !flex !h-6 !w-6 !min-w-6 !items-center !justify-center !rounded-full !px-1 !py-0 text-[9px]"
                />
            }
        </button>

        @if (showPanel()) {
            <div class="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-80 overflow-hidden rounded-xl border border-surface-200 bg-surface-0 shadow-xl dark:border-surface-700 dark:bg-surface-900">
                <div class="flex items-center justify-between border-b border-surface-200 bg-surface-50 px-4 py-3 dark:border-surface-700 dark:bg-surface-800">
                    <span class="text-sm font-semibold text-surface-900 dark:text-surface-0">Notifications</span>
                    @if (unreadCount() > 0) {
                        <button type="button" class="text-xs font-medium text-primary hover:underline" (click)="markAllAsRead($event)">
                            Tout marquer comme lu
                        </button>
                    }
                </div>

                @if (error(); as message) {
                    <p class="m-0 px-4 py-3 text-sm text-red-500" role="alert">{{ message }}</p>
                }

                <div class="max-h-80 divide-y divide-surface-100 overflow-y-auto dark:divide-surface-800">
                    @for (notification of allNotifications(); track notification.key) {
                        <button
                            type="button"
                            class="flex w-full cursor-pointer items-start gap-3 border-0 p-3 text-left transition-colors hover:bg-surface-50 dark:hover:bg-surface-800"
                            [class.bg-highlight]="!notification.is_read"
                            (click)="open(notification)"
                        >
                            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emphasis">
                                <i [class]="notification.typeLabel === 'Publication' ? 'pi pi-megaphone text-amber-500' : 'pi pi-inbox text-blue-500'"></i>
                            </span>

                            <span class="min-w-0 flex-1">
                                <span class="block truncate text-sm font-medium text-surface-900 dark:text-surface-0">{{ notification.title }}</span>
                                <span class="mt-0.5 block text-xs text-muted-color">{{ notification.message }}</span>
                                <span class="mt-1 block text-xs text-muted-color">{{ notification.typeLabel }} \xB7 {{ notification.created_at | date: 'dd/MM HH:mm' }}</span>
                            </span>

                            @if (!notification.is_read) {
                                <span class="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Non lue"></span>
                            }
                        </button>
                    } @empty {
                        <div class="p-6 text-center text-sm text-muted-color">
                            Aucune notification
                        </div>
                    }
                </div>

                <button type="button" class="w-full border-0 border-t border-surface-200 bg-transparent px-4 py-3 text-sm font-medium text-primary hover:bg-surface-50 dark:border-surface-700 dark:hover:bg-surface-800" (click)="openAll()">
                    Voir toutes les notifications
                </button>
            </div>
        }
    </div>
}
` }]
  }], () => [], { notificationMenu: [{ type: ViewChild, args: ["notificationMenu", { isSignal: true }] }], closeOnOutsidePointerDown: [{
    type: HostListener,
    args: ["document:pointerdown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Notifications, { className: "Notifications", filePath: "src/app/layout/component/topbar/widget/notifications/notifications.ts", lineNumber: 21 });
})();

// src/app/layout/component/topbar/app.topbar.ts
var _c04 = ["menu"];
var _c13 = ["configMenu"];
var _c22 = ["globalSearch"];
var _forTrack04 = ($index, $item) => $item.url;
function AppTopbar_Conditional_18_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("mousedown", function AppTopbar_Conditional_18_For_2_Template_button_mousedown_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.preventDefault());
    })("click", function AppTopbar_Conditional_18_For_2_Template_button_click_0_listener() {
      const suggestion_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectSuggestion(suggestion_r5));
    });
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275elementStart(2, "span")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const suggestion_r5 = ctx.$implicit;
    const \u0275$index_34_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-active", \u0275$index_34_r6 === ctx_r2.activeSuggestion());
    \u0275\u0275property("id", "search-suggestion-" + \u0275$index_34_r6);
    \u0275\u0275attribute("aria-selected", \u0275$index_34_r6 === ctx_r2.activeSuggestion());
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", suggestion_r5.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(suggestion_r5.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(suggestion_r5.detail);
  }
}
function AppTopbar_Conditional_18_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Aucun r\xE9sultat accessible pour \xAB ", ctx_r2.searchQuery(), " \xBB.");
  }
}
function AppTopbar_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, AppTopbar_Conditional_18_For_2_Template, 7, 7, "button", 29, _forTrack04, false, AppTopbar_Conditional_18_ForEmpty_3_Template, 2, 1, "p", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.searchSuggestions());
  }
}
function AppTopbar_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16)(1, "strong", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Connect\xE9 \xB7 ", ctx_r2.roleLabel());
  }
}
var SEARCH_SUGGESTIONS = [
  { label: "Mon espace", detail: "Votre tableau personnel", icon: "pi-home", url: "/home/account" },
  { label: "Mon profil", detail: "Informations de votre compte", icon: "pi-id-card", url: "/home/profile" },
  { label: "Mes donn\xE9es", detail: "Pr\xE9f\xE9rences et donn\xE9es personnelles", icon: "pi-lock", url: "/home/my-data" },
  { label: "Services municipaux", detail: "Trouver un service de la mairie", icon: "pi-map-marker", url: "/home/municipal/services" },
  { label: "Publications", detail: "Actualit\xE9s et informations municipales", icon: "pi-megaphone", url: "/home/municipal/publications" },
  { label: "Contacter la mairie", detail: "Envoyer un message aux services", icon: "pi-envelope", url: "/home/municipal/contact" },
  { label: "Mes demandes", detail: "Suivre vos demandes", icon: "pi-list", url: "/home/my-requests", roles: ["citizen"] },
  { label: "Mes interventions", detail: "Demandes \xE0 traiter", icon: "pi-inbox", url: "/home/agent", roles: ["agent"] },
  { label: "Demandes citoyennes", detail: "G\xE9rer les demandes", icon: "pi-inbox", url: "/home/requests", roles: ["manager", "admin"] },
  { label: "Utilisateurs", detail: "G\xE9rer les comptes", icon: "pi-users", url: "/home/accounts", roles: ["admin"] },
  { label: "Instituts", detail: "G\xE9rer les instituts", icon: "pi-building", url: "/home/instituts", roles: ["admin"] },
  { label: "Journal", detail: "Consulter le journal d\u2019activit\xE9", icon: "pi-history", url: "/home/journal", roles: ["agent", "manager", "admin"] },
  { label: "Terra Nova", detail: "Espace de suivi Terra Nova", icon: "pi-chart-line", url: "/home/terra-nova", roles: ["agent", "manager", "admin"] }
];
var AppTopbar = class _AppTopbar {
  layoutService = inject(LayoutService);
  auth = inject(AuthService);
  router = inject(Router);
  overlays = inject(OverlayCoordinatorService);
  // Référence vers le menu popup PrimeNG pour pouvoir le fermer explicitement
  userMenu = viewChild("menu", ...ngDevMode ? [{ debugName: "userMenu" }] : []);
  configMenu = viewChild("configMenu", ...ngDevMode ? [{ debugName: "configMenu" }] : []);
  configVisible = signal(false, ...ngDevMode ? [{ debugName: "configVisible" }] : []);
  searchInput = viewChild("globalSearch", ...ngDevMode ? [{ debugName: "searchInput" }] : []);
  searchQuery = signal("", ...ngDevMode ? [{ debugName: "searchQuery" }] : []);
  searchOpen = signal(false, ...ngDevMode ? [{ debugName: "searchOpen" }] : []);
  activeSuggestion = signal(-1, ...ngDevMode ? [{ debugName: "activeSuggestion" }] : []);
  user = this.auth.user;
  /** État ouvert/fermé du menu latéral, exposé via aria-expanded sur le bouton « Menu principal ». */
  menuExpanded = computed(() => {
    const state = this.layoutService.layoutState();
    if (this.layoutService.isOverlay())
      return state.overlayMenuActive;
    return this.layoutService.isDesktop() ? !state.staticMenuDesktopInactive : state.mobileMenuActive;
  }, ...ngDevMode ? [{ debugName: "menuExpanded" }] : []);
  roleLabel = this.auth.roleLabel;
  searchSuggestions = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase("fr-FR");
    if (!query)
      return [];
    return SEARCH_SUGGESTIONS.filter((item) => {
      const allowed = !item.roles || this.auth.hasRole(...item.roles);
      return allowed && `${item.label} ${item.detail}`.toLocaleLowerCase("fr-FR").includes(query);
    }).slice(0, 7);
  }, ...ngDevMode ? [{ debugName: "searchSuggestions" }] : []);
  toggleConfigurator(event) {
    event.stopPropagation();
    this.overlays.active() === "config" ? this.overlays.close("config") : this.overlays.open("config");
  }
  toggleAccount(event) {
    event.stopPropagation();
    if (this.overlays.active() === "account") {
      this.userMenu()?.hide();
      this.overlays.close("account");
    } else {
      this.overlays.open("account");
      this.userMenu()?.show(event);
    }
  }
  /** Même point de départ vertical que le configurateur (sans modifier son axe horizontal). */
  alignAccountMenu() {
    requestAnimationFrame(() => {
      const popup = this.userMenu()?.container;
      if (popup)
        popup.style.top = "3.75rem";
    });
  }
  constructor() {
    effect(() => {
      const isConfigOpen = this.overlays.active() === "config";
      this.configVisible.set(isConfigOpen);
      if (this.overlays.active() !== "account")
        this.userMenu()?.hide();
    });
  }
  closeConfiguratorOnOutsideClick(event) {
    if (this.configVisible() && !this.configMenu()?.nativeElement.contains(event.target))
      this.overlays.close("config");
  }
  closeConfiguratorOnOutsidePointerDown(event) {
    if (this.configVisible() && !this.configMenu()?.nativeElement.contains(event.target))
      this.overlays.close("config");
  }
  closeConfiguratorOnEscape() {
    if (this.searchOpen()) {
      this.closeSearch();
      return;
    }
    this.overlays.close();
  }
  focusSearchShortcut(event) {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
      return;
    event.preventDefault();
    this.searchOpen.set(true);
    requestAnimationFrame(() => this.searchInput()?.nativeElement.focus());
  }
  updateSearch(value) {
    this.searchQuery.set(value);
    this.searchOpen.set(true);
    this.activeSuggestion.set(-1);
  }
  onSearchKeydown(event) {
    const suggestions = this.searchSuggestions();
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      this.activeSuggestion.update((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      this.activeSuggestion.update((index) => index <= 0 ? suggestions.length - 1 : index - 1);
    } else if (event.key === "Enter" && suggestions.length) {
      event.preventDefault();
      this.selectSuggestion(suggestions[this.activeSuggestion() < 0 ? 0 : this.activeSuggestion()]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      this.closeSearch();
      this.searchInput()?.nativeElement.blur();
    }
  }
  selectSuggestion(suggestion) {
    this.closeSearch();
    this.router.navigateByUrl(suggestion.url);
  }
  onSearchFocusOut() {
    setTimeout(() => {
      const search = this.searchInput()?.nativeElement.closest(".topbar-search");
      if (!search?.contains(document.activeElement))
        this.closeSearch();
    });
  }
  closeSearch() {
    this.searchOpen.set(false);
    this.activeSuggestion.set(-1);
  }
  // Menu utilisateur : identité (non cliquable) puis déconnexion.
  items = computed(() => {
    const user = this.user();
    return [
      {
        label: user?.name ?? "Utilisateur",
        items: [
          { label: "Mon profil", icon: "pi pi-id-card", routerLink: ["/home/profile"] },
          { label: "Mes donn\xE9es", icon: "pi pi-lock", routerLink: ["/home/my-data"] },
          { separator: true },
          {
            label: "D\xE9connexion",
            icon: "pi pi-sign-out",
            command: () => {
              this.userMenu()?.hide();
              this.auth.logout();
            }
          }
        ]
      }
    ];
  }, ...ngDevMode ? [{ debugName: "items" }] : []);
  static \u0275fac = function AppTopbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppTopbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppTopbar, selectors: [["app-topbar"]], viewQuery: function AppTopbar_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.userMenu, _c04, 5)(ctx.configMenu, _c13, 5)(ctx.searchInput, _c22, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, hostBindings: function AppTopbar_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function AppTopbar_click_HostBindingHandler($event) {
        return ctx.closeConfiguratorOnOutsideClick($event);
      }, \u0275\u0275resolveDocument)("pointerdown", function AppTopbar_pointerdown_HostBindingHandler($event) {
        return ctx.closeConfiguratorOnOutsidePointerDown($event);
      }, \u0275\u0275resolveDocument)("keydown.escape", function AppTopbar_keydown_escape_HostBindingHandler() {
        return ctx.closeConfiguratorOnEscape();
      }, \u0275\u0275resolveDocument)("keydown", function AppTopbar_keydown_HostBindingHandler($event) {
        return ctx.focusSearchShortcut($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 37, vars: 12, consts: [["globalSearch", ""], ["configMenu", ""], ["menu", ""], [1, "layout-topbar"], [1, "layout-topbar-logo-container"], ["type", "button", "aria-label", "Menu principal", 1, "layout-menu-button", "layout-topbar-action", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-bars"], ["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "layout-topbar-logo"], ["aria-hidden", "true", 1, "grid", "size-9", "place-items-center", "rounded-xl", "bg-primary", "text-sm", "font-bold", "text-white"], [1, "layout-topbar-actions"], [1, "topbar-search", 3, "focusout"], ["aria-hidden", "true", 1, "pi", "pi-search", "topbar-search-icon"], ["for", "global-search", 1, "sr-only"], ["id", "global-search", "type", "search", "role", "combobox", "autocomplete", "off", "placeholder", "Rechercher", "aria-autocomplete", "list", "aria-controls", "global-search-suggestions", "aria-activedescendant", "activeSuggestion() >= 0 ? 'search-suggestion-' + activeSuggestion() : null", 3, "focus", "input", "keydown", "value"], ["aria-label", "Raccourci clavier Contr\xF4le K", 1, "topbar-search-shortcut"], ["id", "global-search-suggestions", "role", "listbox", "aria-label", "Suggestions de recherche", 1, "topbar-search-suggestions"], ["routerLink", "/home/account", "data-testid", "session-identity", 1, "mr-3", "grid", "max-w-40", "gap-0.5", "text-sm"], [1, "layout-config-menu"], [1, "relative"], ["type", "button", "aria-label", "Affichage et taille du texte", 1, "layout-topbar-action", "layout-topbar-action-highlight", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-palette"], [3, "visible"], ["type", "button", "aria-label", "Plus d\u2019actions", "pStyleClass", "@next", "enterFromClass", "hidden", "enterActiveClass", "animate-scalein", "leaveToClass", "hidden", "leaveActiveClass", "animate-fadeout", 1, "layout-topbar-menu-button", "layout-topbar-action", 3, "hideOnOutsideClick"], ["aria-hidden", "true", 1, "pi", "pi-ellipsis-v"], [1, "layout-topbar-menu", "hidden", "lg:block"], [1, "layout-topbar-menu-content"], ["type", "button", "aria-haspopup", "menu", 1, "layout-topbar-action", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-user"], ["appendTo", "body", "styleClass", "topbar-account-menu", 3, "onShow", "onHide", "model", "popup"], ["type", "button", "role", "option", 3, "id", "is-active"], ["role", "status"], ["type", "button", "role", "option", 3, "mousedown", "click", "id"], ["aria-hidden", "true", 1, "pi", 3, "ngClass"], [1, "truncate"], [1, "text-xs", "text-muted-color"]], template: function AppTopbar_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "header", 3)(1, "div", 4)(2, "button", 5);
      \u0275\u0275listener("click", function AppTopbar_Template_button_click_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.layoutService.onMenuToggle());
      });
      \u0275\u0275element(3, "i", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "a", 7)(5, "span", 8);
      \u0275\u0275text(6, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Terra Nova");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 9)(10, "div", 10);
      \u0275\u0275listener("focusout", function AppTopbar_Template_div_focusout_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchFocusOut());
      });
      \u0275\u0275element(11, "i", 11);
      \u0275\u0275elementStart(12, "label", 12);
      \u0275\u0275text(13, "Rechercher une page ou un service");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "input", 13, 0);
      \u0275\u0275listener("focus", function AppTopbar_Template_input_focus_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchOpen.set(true));
      })("input", function AppTopbar_Template_input_input_14_listener() {
        \u0275\u0275restoreView(_r1);
        const globalSearch_r2 = \u0275\u0275reference(15);
        return \u0275\u0275resetView(ctx.updateSearch(globalSearch_r2.value));
      })("keydown", function AppTopbar_Template_input_keydown_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchKeydown($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "kbd", 14);
      \u0275\u0275text(17, "Ctrl K");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, AppTopbar_Conditional_18_Template, 4, 1, "div", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(19, AppTopbar_Conditional_19_Template, 5, 2, "a", 16);
      \u0275\u0275elementStart(20, "div", 17)(21, "div", 18, 1)(23, "button", 19);
      \u0275\u0275listener("click", function AppTopbar_Template_button_click_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleConfigurator($event));
      });
      \u0275\u0275element(24, "i", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-configurator", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "button", 22);
      \u0275\u0275element(27, "i", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 24)(29, "div", 25);
      \u0275\u0275element(30, "app-notifications");
      \u0275\u0275elementStart(31, "button", 26);
      \u0275\u0275listener("click", function AppTopbar_Template_button_click_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleAccount($event));
      });
      \u0275\u0275element(32, "i", 27);
      \u0275\u0275elementStart(33, "span");
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "p-menu", 28, 2);
      \u0275\u0275listener("onShow", function AppTopbar_Template_p_menu_onShow_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.alignAccountMenu());
      })("onHide", function AppTopbar_Template_p_menu_onHide_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.overlays.close("account"));
      });
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_7_0;
      let tmp_11_0;
      let tmp_12_0;
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.menuExpanded());
      \u0275\u0275advance(12);
      \u0275\u0275property("value", ctx.searchQuery());
      \u0275\u0275attribute("aria-expanded", ctx.searchOpen() && ctx.searchSuggestions().length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.searchOpen() && ctx.searchQuery() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = ctx.user()) ? 19 : -1, tmp_7_0);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-expanded", ctx.configVisible());
      \u0275\u0275advance(2);
      \u0275\u0275property("visible", ctx.configVisible());
      \u0275\u0275advance();
      \u0275\u0275property("hideOnOutsideClick", true);
      \u0275\u0275advance(5);
      \u0275\u0275attribute("aria-label", "Compte : " + (((tmp_11_0 = ctx.user()) == null ? null : tmp_11_0.name) ?? ""));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(((tmp_12_0 = ctx.user()) == null ? null : tmp_12_0.name) ?? "Compte");
      \u0275\u0275advance();
      \u0275\u0275property("model", ctx.items())("popup", true);
    }
  }, dependencies: [RouterModule, RouterLink, CommonModule, NgClass, StyleClassModule, StyleClass, AppConfigurator, MenuModule, Menu, Notifications], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppTopbar, [{
    type: Component,
    args: [{ selector: "app-topbar", imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule, Notifications], template: `<header class="layout-topbar">
    <!-- Menu toggle & logo -->
    <div class="layout-topbar-logo-container">
        <button type="button" class="layout-menu-button layout-topbar-action" aria-label="Menu principal" [attr.aria-expanded]="menuExpanded()" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars" aria-hidden="true"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/" aria-label="Terra Nova, accueil">
            <span class="grid size-9 place-items-center rounded-xl bg-primary text-sm font-bold text-white" aria-hidden="true">TN</span>
            <span>Terra Nova</span>
        </a>
    </div>

    <!-- Actions -->
    <div class="layout-topbar-actions">
        <div class="topbar-search" (focusout)="onSearchFocusOut()">
            <i class="pi pi-search topbar-search-icon" aria-hidden="true"></i>
            <label class="sr-only" for="global-search">Rechercher une page ou un service</label>
            <input
                #globalSearch
                id="global-search"
                type="search"
                role="combobox"
                autocomplete="off"
                placeholder="Rechercher"
                [value]="searchQuery()"
                [attr.aria-expanded]="searchOpen() && searchSuggestions().length > 0"
                aria-autocomplete="list"
                aria-controls="global-search-suggestions"
                aria-activedescendant="activeSuggestion() >= 0 ? 'search-suggestion-' + activeSuggestion() : null"
                (focus)="searchOpen.set(true)"
                (input)="updateSearch(globalSearch.value)"
                (keydown)="onSearchKeydown($event)"
            />
            <kbd class="topbar-search-shortcut" aria-label="Raccourci clavier Contr\xF4le K">Ctrl K</kbd>
            @if (searchOpen() && searchQuery()) {
                <div id="global-search-suggestions" class="topbar-search-suggestions" role="listbox" aria-label="Suggestions de recherche">
                    @for (suggestion of searchSuggestions(); track suggestion.url; let index = $index) {
                        <button type="button" [id]="'search-suggestion-' + index" role="option" [attr.aria-selected]="index === activeSuggestion()" [class.is-active]="index === activeSuggestion()" (mousedown)="$event.preventDefault()" (click)="selectSuggestion(suggestion)">
                            <i class="pi" [ngClass]="suggestion.icon" aria-hidden="true"></i><span><strong>{{ suggestion.label }}</strong><small>{{ suggestion.detail }}</small></span>
                        </button>
                    } @empty {
                        <p role="status">Aucun r\xE9sultat accessible pour \xAB {{ searchQuery() }} \xBB.</p>
                    }
                </div>
            }
        </div>
        @if (user(); as profile) {
            <a routerLink="/home/account" class="mr-3 grid max-w-40 gap-0.5 text-sm" data-testid="session-identity">
                <strong class="truncate">{{ profile.name }}</strong>
                <span class="text-xs text-muted-color">Connect\xE9 \xB7 {{ roleLabel() }}</span>
            </a>
        }
        <!-- Theme settings -->
        <div class="layout-config-menu">
            <div #configMenu class="relative">
                <button type="button" aria-label="Affichage et taille du texte" class="layout-topbar-action layout-topbar-action-highlight" [attr.aria-expanded]="configVisible()" (click)="toggleConfigurator($event)">
                    <i class="pi pi-palette" aria-hidden="true"></i>
                </button>
                <app-configurator [visible]="configVisible()" />
            </div>
        </div>

        <!-- Mobile menu toggle -->
        <button type="button" class="layout-topbar-menu-button layout-topbar-action" aria-label="Plus d\u2019actions" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
            <i class="pi pi-ellipsis-v" aria-hidden="true"></i>
        </button>

        <!-- Topbar menu -->
        <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
                <app-notifications />

                <button type="button" class="layout-topbar-action" [attr.aria-label]="'Compte : ' + (user()?.name ?? '')" aria-haspopup="menu" (click)="toggleAccount($event)">
                    <i class="pi pi-user" aria-hidden="true"></i>
                    <span>{{ user()?.name ?? 'Compte' }}</span>
                </button>
                <p-menu #menu [model]="items()" [popup]="true" appendTo="body" styleClass="topbar-account-menu" (onShow)="alignAccountMenu()" (onHide)="overlays.close('account')" />
            </div>
        </div>
    </div>
</header>
` }]
  }], () => [], { userMenu: [{ type: ViewChild, args: ["menu", { isSignal: true }] }], configMenu: [{ type: ViewChild, args: ["configMenu", { isSignal: true }] }], searchInput: [{ type: ViewChild, args: ["globalSearch", { isSignal: true }] }], closeConfiguratorOnOutsideClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }], closeConfiguratorOnOutsidePointerDown: [{
    type: HostListener,
    args: ["document:pointerdown", ["$event"]]
  }], closeConfiguratorOnEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }], focusSearchShortcut: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppTopbar, { className: "AppTopbar", filePath: "src/app/layout/component/topbar/app.topbar.ts", lineNumber: 39 });
})();

// src/app/layout/component/breadcrumb/breadcrumb.ts
var _forTrack05 = ($index, $item) => $item.url;
function BreadcrumbComponent_Conditional_0_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function BreadcrumbComponent_Conditional_0_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "i", 5);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r1.url);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function BreadcrumbComponent_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 2);
    \u0275\u0275conditionalCreate(1, BreadcrumbComponent_Conditional_0_For_3_Conditional_1_Template, 2, 1, "span", 3)(2, BreadcrumbComponent_Conditional_0_For_3_Conditional_2_Template, 3, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_6_r2 = ctx.$index;
    const \u0275$count_6_r3 = ctx.$count;
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_6_r2 === \u0275$count_6_r3 - 1 ? 1 : 2);
  }
}
function BreadcrumbComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 0)(1, "ol", 1);
    \u0275\u0275repeaterCreate(2, BreadcrumbComponent_Conditional_0_For_3_Template, 3, 1, "li", 2, _forTrack05);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.items());
  }
}
var BreadcrumbComponent = class _BreadcrumbComponent {
  router = inject(Router);
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : []);
  previous = computed(() => this.items().at(-2) ?? null, ...ngDevMode ? [{ debugName: "previous" }] : []);
  constructor() {
    this.update();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.update());
  }
  update() {
    const items = [];
    let url = "";
    let route = this.router.routerState.snapshot.root;
    while (route) {
      const segment = route.url.map((part) => part.path).join("/");
      if (segment)
        url += `/${segment}`;
      const label = route.data["breadcrumb"];
      const currentUrl = url || "/";
      if (label && !items.some((item) => item.label === label && item.url === currentUrl)) {
        items.push({ label, url: currentUrl });
      }
      route = route.firstChild;
    }
    this.items.set(items);
  }
  static \u0275fac = function BreadcrumbComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BreadcrumbComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BreadcrumbComponent, selectors: [["app-breadcrumb"]], decls: 1, vars: 1, consts: [["aria-label", "Fil d\u2019Ariane", 1, "mb-5", "flex", "items-center", "justify-between", "gap-4"], [1, "m-0", "flex", "list-none", "flex-wrap", "items-center", "gap-2", "p-0", "text-sm"], [1, "flex", "items-center", "gap-2"], ["aria-current", "page", 1, "font-medium", "text-color"], [1, "rounded-sm", "text-primary", "underline-offset-4", "hover:underline", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-primary", 3, "routerLink"], ["aria-hidden", "true", 1, "pi", "pi-angle-right", "text-xs", "text-muted-color"]], template: function BreadcrumbComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, BreadcrumbComponent_Conditional_0_Template, 4, 0, "nav", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.items().length ? 0 : -1);
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbComponent, [{
    type: Component,
    args: [{ selector: "app-breadcrumb", imports: [RouterLink], template: '@if (items().length) {\n    <nav class="mb-5 flex items-center justify-between gap-4" aria-label="Fil d\u2019Ariane">\n        <ol class="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm">\n            @for (item of items(); track item.url; let last = $last) {\n                <li class="flex items-center gap-2">\n                    @if (last) {\n                        <span class="font-medium text-color" aria-current="page">{{ item.label }}</span>\n                    } @else {\n                        <a class="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" [routerLink]="item.url">{{ item.label }}</a>\n                        <i class="pi pi-angle-right text-xs text-muted-color" aria-hidden="true"></i>\n                    }\n                </li>\n            }\n        </ol>\n    </nav>\n}\n' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BreadcrumbComponent, { className: "BreadcrumbComponent", filePath: "src/app/layout/component/breadcrumb/breadcrumb.ts", lineNumber: 15 });
})();

// src/app/layout/component/layout/app.layout.ts
var AppLayout = class _AppLayout {
  layoutService = inject(LayoutService);
  containerClass = computed(() => {
    const config = this.layoutService.layoutConfig();
    const state = this.layoutService.layoutState();
    return {
      "layout-overlay": config.menuMode === "overlay",
      "layout-static": config.menuMode === "static",
      "layout-static-inactive": state.staticMenuDesktopInactive && config.menuMode === "static",
      "layout-overlay-active": state.overlayMenuActive,
      "layout-mobile-active": state.mobileMenuActive
    };
  }, ...ngDevMode ? [{ debugName: "containerClass" }] : []);
  /**
   * Le lien d’évitement déplace le focus sur le contenu principal sans passer par le routeur
   * (un simple « #main-content » serait résolu par rapport au <base href> et rechargerait la page).
   */
  skipToContent(event) {
    event.preventDefault();
    const main = document.getElementById("main-content");
    main?.focus();
    main?.scrollIntoView({ block: "start" });
  }
  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      if (state.mobileMenuActive) {
        document.body.classList.add("blocked-scroll");
      } else {
        document.body.classList.remove("blocked-scroll");
      }
    });
  }
  static \u0275fac = function AppLayout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppLayout)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppLayout, selectors: [["app-layout"]], decls: 10, vars: 1, consts: [[1, "layout-wrapper", 3, "ngClass"], ["href", "#main-content", 1, "skip-link", 3, "click"], [1, "layout-main-container"], ["id", "main-content", "tabindex", "-1", 1, "layout-main"], [1, "layout-mask"]], template: function AppLayout_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275listener("click", function AppLayout_Template_a_click_1_listener($event) {
        return ctx.skipToContent($event);
      });
      \u0275\u0275text(2, "Aller au contenu principal");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-topbar")(4, "app-sidebar");
      \u0275\u0275elementStart(5, "div", 2)(6, "main", 3);
      \u0275\u0275element(7, "app-breadcrumb")(8, "router-outlet");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", ctx.containerClass());
    }
  }, dependencies: [CommonModule, NgClass, AppTopbar, AppSidebar, RouterModule, RouterOutlet, BreadcrumbComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppLayout, [{
    type: Component,
    args: [{ selector: "app-layout", imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, BreadcrumbComponent], template: '<div class="layout-wrapper" [ngClass]="containerClass()">\n    <!-- Lien d\u2019\xE9vitement : premier \xE9l\xE9ment focalisable de la page (RGAA 12.7) -->\n    <a class="skip-link" href="#main-content" (click)="skipToContent($event)">Aller au contenu principal</a>\n    <app-topbar></app-topbar>\n    <app-sidebar></app-sidebar>\n\n    <!-- Main content -->\n    <div class="layout-main-container">\n        <main id="main-content" class="layout-main" tabindex="-1">\n            <app-breadcrumb />\n            <router-outlet></router-outlet>\n        </main>\n    </div>\n\n    <div class="layout-mask"></div>\n</div>\n' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppLayout, { className: "AppLayout", filePath: "src/app/layout/component/layout/app.layout.ts", lineNumber: 16 });
})();

// src/app/pages/landing/components/topbarwidget/topbarwidget.component.ts
var _forTrack06 = ($index, $item) => $item.fragment;
function TopbarWidget_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 2)(1, "strong", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "small");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Connect\xE9 \xB7 ", ctx_r0.auth.roleLabel());
  }
}
function TopbarWidget_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275listener("click", function TopbarWidget_For_10_Template_a_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.router.navigate(["/"], { fragment: item_r3.fragment }));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function TopbarWidget_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Connect\xE9 : ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 13);
    \u0275\u0275text(6, "Mon espace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 14);
    \u0275\u0275listener("click", function TopbarWidget_Conditional_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.auth.logout());
    });
    \u0275\u0275text(8, "D\xE9connexion");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xB7 ", ctx_r0.auth.roleLabel());
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", ctx_r0.auth.homeUrl());
  }
}
function TopbarWidget_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 15);
    \u0275\u0275text(1, "Se connecter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 16);
    \u0275\u0275text(3, "Cr\xE9er un compte ");
    \u0275\u0275element(4, "i", 17);
    \u0275\u0275elementEnd();
  }
}
var TopbarWidget = class _TopbarWidget {
  router = inject(Router);
  auth = inject(AuthService);
  navItems = [
    { label: "Solution", fragment: "solution" },
    { label: "Fonctionnement", fragment: "process" },
    { label: "S\xE9curit\xE9", fragment: "securite" }
  ];
  static \u0275fac = function TopbarWidget_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopbarWidget)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopbarWidget, selectors: [["topbar-widget"]], decls: 17, vars: 6, consts: [["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "flex", "items-center", "gap-2.5", "text-2xl", "font-bold", "tracking-tight", "text-emerald-950", "dark:text-white"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-xl", "bg-emerald-600", "text-sm", "font-black", "text-white"], ["routerLink", "/home/account", 1, "ml-auto", "mr-3", "grid", "max-w-36", "gap-0.5", "text-sm", "font-semibold", "text-emerald-700", "dark:text-emerald-100", "lg:hidden"], ["pButton", "", "pRipple", "", "type", "button", "icon", "pi pi-bars", "severity", "secondary", "pStyleClass", "@next", "enterFromClass", "hidden", "leaveToClass", "hidden", "aria-label", "Ouvrir le menu", 1, "lg:hidden!", 3, "text", "rounded", "hideOnOutsideClick"], [1, "absolute", "left-0", "top-full", "z-20", "hidden", "w-full", "rounded-xl", "border", "border-emerald-100", "bg-white", "px-6", "py-5", "shadow-xl", "dark:border-emerald-800", "dark:bg-emerald-900", "lg:static", "lg:flex", "lg:w-auto", "lg:items-center", "lg:gap-7", "lg:border-0", "lg:bg-transparent", "lg:p-0", "lg:shadow-none"], ["aria-label", "Navigation principale", 1, "grid", "gap-1", "lg:flex", "lg:items-center", "lg:gap-8"], ["pRipple", "", 1, "cursor-pointer", "rounded-lg", "px-3", "py-2", "text-sm", "font-semibold", "text-emerald-950/70", "transition", "hover:bg-emerald-50", "hover:text-emerald-700", "dark:text-emerald-50/75", "dark:hover:bg-emerald-800/60", "dark:hover:text-emerald-100"], ["routerLink", "/municipal/contact", 1, "rounded-lg", "px-3", "py-2", "text-sm", "font-semibold", "text-emerald-950", "hover:text-emerald-700", "dark:text-emerald-50"], [1, "mt-4", "flex", "flex-wrap", "items-center", "gap-3", "border-t", "border-emerald-100", "pt-4", "lg:mt-0", "lg:flex-nowrap", "lg:border-0", "lg:pt-0"], [3, "float"], [1, "truncate"], ["pRipple", "", 1, "cursor-pointer", "rounded-lg", "px-3", "py-2", "text-sm", "font-semibold", "text-emerald-950/70", "transition", "hover:bg-emerald-50", "hover:text-emerald-700", "dark:text-emerald-50/75", "dark:hover:bg-emerald-800/60", "dark:hover:text-emerald-100", 3, "click"], ["data-testid", "session-identity", 1, "text-sm", "text-emerald-950", "dark:text-emerald-50"], [1, "rounded-xl", "bg-emerald-600", "px-4", "py-2.5", "text-sm", "font-bold", "text-white", 3, "routerLink"], ["type", "button", 1, "rounded-lg", "px-3", "py-2", "text-sm", "font-semibold", "text-emerald-950", "dark:text-emerald-50", 3, "click"], ["routerLink", "/auth/login", 1, "rounded-lg", "px-3", "py-2", "text-sm", "font-semibold", "text-emerald-950", "hover:text-emerald-600", "dark:text-emerald-50"], ["routerLink", "/auth/register", 1, "rounded-xl", "bg-emerald-600", "px-4", "py-2.5", "text-sm", "font-bold", "text-white", "shadow-lg", "shadow-emerald-600/20", "transition", "hover:bg-emerald-700"], [1, "pi", "pi-arrow-right", "ml-1", "text-xs"]], template: function TopbarWidget_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "a", 0)(1, "span", 1);
      \u0275\u0275text(2, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "span");
      \u0275\u0275text(4, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, TopbarWidget_Conditional_5_Template, 5, 2, "a", 2);
      \u0275\u0275element(6, "button", 3);
      \u0275\u0275elementStart(7, "div", 4)(8, "nav", 5);
      \u0275\u0275repeaterCreate(9, TopbarWidget_For_10_Template, 2, 1, "a", 6, _forTrack06);
      \u0275\u0275elementStart(11, "a", 7);
      \u0275\u0275text(12, "Contacter la mairie");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8);
      \u0275\u0275conditionalCreate(14, TopbarWidget_Conditional_14_Template, 9, 3)(15, TopbarWidget_Conditional_15_Template, 5, 0);
      \u0275\u0275element(16, "app-floating-configurator", 9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_5_0;
      \u0275\u0275advance(5);
      \u0275\u0275conditional((tmp_0_0 = ctx.auth.user()) ? 5 : -1, tmp_0_0);
      \u0275\u0275advance();
      \u0275\u0275property("text", true)("rounded", true)("hideOnOutsideClick", true);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.navItems);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((tmp_5_0 = ctx.auth.user()) ? 14 : 15, tmp_5_0);
      \u0275\u0275advance(2);
      \u0275\u0275property("float", false);
    }
  }, dependencies: [RouterModule, RouterLink, StyleClassModule, StyleClass, ButtonModule, ButtonDirective, RippleModule, Ripple, AppFloatingConfigurator], styles: ["\n\n[_nghost-%COMP%] {\n  flex-wrap: wrap;\n  gap: 1rem;\n  min-width: 0;\n}\n[_nghost-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  max-width: 100%;\n  flex-wrap: wrap;\n}\nnav[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\nnav[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  flex-wrap: wrap !important;\n}\n/*# sourceMappingURL=topbarwidget.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopbarWidget, [{
    type: Component,
    args: [{ selector: "topbar-widget", imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, AppFloatingConfigurator], template: `<a routerLink="/" class="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-emerald-950 dark:text-white" aria-label="Terra Nova, accueil">
    <span class="grid size-8 place-items-center rounded-xl bg-emerald-600 text-sm font-black text-white" aria-hidden="true">TN</span><span>Terra Nova</span>
</a>

@if (auth.user(); as user) {
    <a routerLink="/home/account" class="ml-auto mr-3 grid max-w-36 gap-0.5 text-sm font-semibold text-emerald-700 dark:text-emerald-100 lg:hidden">
        <strong class="truncate">{{ user.name }}</strong>
        <small>Connect\xE9 \xB7 {{ auth.roleLabel() }}</small>
    </a>
}

<button
    pButton
    pRipple
    type="button"
    icon="pi pi-bars"
    [text]="true"
    severity="secondary"
    [rounded]="true"
    class="lg:hidden!"
    pStyleClass="@next"
    enterFromClass="hidden"
    leaveToClass="hidden"
    [hideOnOutsideClick]="true"
    aria-label="Ouvrir le menu"
></button>

<div
    class="absolute left-0 top-full z-20 hidden w-full rounded-xl border border-emerald-100 bg-white px-6 py-5 shadow-xl dark:border-emerald-800 dark:bg-emerald-900 lg:static lg:flex lg:w-auto lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
>
    <nav class="grid gap-1 lg:flex lg:items-center lg:gap-8" aria-label="Navigation principale">
        @for (item of navItems; track item.fragment) {
            <a
                (click)="router.navigate(['/'], { fragment: item.fragment })"
                pRipple
                class="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-emerald-950/70 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-50/75 dark:hover:bg-emerald-800/60 dark:hover:text-emerald-100"
                >{{ item.label }}</a
            >
        }
        <a routerLink="/municipal/contact" class="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-950 hover:text-emerald-700 dark:text-emerald-50">Contacter la mairie</a>
    </nav>
    <div class="mt-4 flex flex-wrap items-center gap-3 border-t border-emerald-100 pt-4 lg:mt-0 lg:flex-nowrap lg:border-0 lg:pt-0">
        @if (auth.user(); as user) {
            <span class="text-sm text-emerald-950 dark:text-emerald-50" data-testid="session-identity"
                >Connect\xE9 : <strong>{{ user.name }}</strong> \xB7 {{ auth.roleLabel() }}</span
            >
            <a [routerLink]="auth.homeUrl()" class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white">Mon espace</a>
            <button type="button" (click)="auth.logout()" class="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-950 dark:text-emerald-50">D\xE9connexion</button>
        } @else {
            <a routerLink="/auth/login" class="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-950 hover:text-emerald-600 dark:text-emerald-50">Se connecter</a>
            <a routerLink="/auth/register" class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">Cr\xE9er un compte <i class="pi pi-arrow-right ml-1 text-xs"></i></a>
        }
        <app-floating-configurator [float]="false" />
    </div>
</div>
`, styles: ["/* src/app/pages/landing/components/topbarwidget/topbarwidget.component.scss */\n:host {\n  flex-wrap: wrap;\n  gap: 1rem;\n  min-width: 0;\n}\n:host > div {\n  min-width: 0;\n  max-width: 100%;\n  flex-wrap: wrap;\n}\nnav {\n  flex-wrap: wrap;\n}\nnav + div {\n  flex-wrap: wrap !important;\n}\n/*# sourceMappingURL=topbarwidget.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopbarWidget, { className: "TopbarWidget", filePath: "src/app/pages/landing/components/topbarwidget/topbarwidget.component.ts", lineNumber: 15 });
})();

// src/app/pages/landing/landing.ts
var _c05 = () => ["Le citoyen signale une demande", "L\u2019\xE9quipe intervient", "Le service est rendu"];
var _c14 = (a0) => ({ publication: a0 });
var _forTrack07 = ($index, $item) => $item.id;
function Landing_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function Landing_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "strong", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Services disponibles");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 46)(7, "strong", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Informations r\xE9centes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 46)(12, "strong", 47);
    \u0275\u0275text(13, "24 h");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Mise \xE0 jour des actualit\xE9s");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 46)(17, "strong", 47);
    \u0275\u0275text(18, "En ligne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Plateforme municipale");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "p", 48);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.services().length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.publications().length);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Actualis\xE9 \xE0 ", \u0275\u0275pipeBind2(23, 3, ctx_r0.updatedAt(), "HH:mm:ss"), " \xB7 mise \xE0 jour automatique");
  }
}
function Landing_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Chargement de l'activit\xE9 municipale\u2026");
    \u0275\u0275elementEnd();
  }
}
function Landing_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22)(1, "article", 49)(2, "p", 50);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const publication_r2 = ctx.$implicit;
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(9, _c14, publication_r2.id));
    \u0275\u0275attribute("aria-label", "Lire la publication : " + publication_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", publication_r2.category, " \xB7 ", \u0275\u0275pipeBind2(4, 6, publication_r2.published_at, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(publication_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(publication_r2.summary);
  }
}
function Landing_ForEmpty_35_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune publication pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function Landing_ForEmpty_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Landing_ForEmpty_35_Conditional_0_Template, 2, 0, "p");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.loading() && !ctx_r0.error() ? 0 : -1);
  }
}
function Landing_For_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article")(1, "b", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 54);
    \u0275\u0275text(6, "Une information claire, suivie par la bonne personne, au bon moment.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    const \u0275$index_174_r4 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_174_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r3);
  }
}
var Landing = class _Landing {
  auth = inject(AuthService);
  content = inject(MunicipalContentService);
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  services = signal([], ...ngDevMode ? [{ debugName: "services" }] : []);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  updatedAt = signal(null, ...ngDevMode ? [{ debugName: "updatedAt" }] : []);
  year = (/* @__PURE__ */ new Date()).getFullYear();
  ngOnInit() {
    this.load();
    this.live.watch(this.destroyRef, () => this.load(), () => !this.loading());
  }
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.error.set(null);
    forkJoin({ services: this.content.services(), publications: this.content.publications() }).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: ({ services, publications }) => {
        this.services.set(services);
        this.publications.set(publications.slice(0, 3));
        this.updatedAt.set(/* @__PURE__ */ new Date());
      },
      error: () => this.error.set("Les informations municipales ne sont pas disponibles pour le moment. R\xE9essayez dans quelques instants.")
    });
  }
  static \u0275fac = function Landing_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Landing)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Landing, selectors: [["app-landing"]], decls: 86, vars: 11, consts: [[1, "min-h-dvh", "bg-white", "text-emerald-950", "dark:bg-emerald-950", "dark:text-emerald-50"], [1, "relative", "mx-auto", "flex", "max-w-7xl", "items-center", "justify-between", "px-6", "py-5", "lg:px-10"], [1, "mx-auto", "grid", "max-w-7xl", "items-center", "gap-14", "px-6", "pb-24", "pt-14", "lg:grid-cols-2", "lg:px-10", "lg:py-24"], [1, "m-0", "max-w-xl", "!text-5xl", "font-bold", "leading-[.98]", "tracking-[-.06em]", "text-emerald-950", "dark:!text-white", "md:!text-7xl"], [1, "mt-7", "max-w-xl", "text-lg", "leading-8", "text-emerald-950/65", "dark:text-emerald-50/70"], [1, "mt-9", "flex", "flex-wrap", "gap-5"], [1, "rounded-xl", "bg-emerald-600", "px-6", "py-3.5", "font-bold", "text-white", "shadow-xl", "shadow-emerald-600/20", 3, "routerLink"], [1, "pi", "pi-arrow-right", "ml-2"], ["href", "#process", 1, "py-3.5", "font-semibold", "text-emerald-700", "dark:text-emerald-300"], ["aria-labelledby", "commune-activity-title", 1, "rounded-2xl", "border", "border-emerald-100", "bg-emerald-50", "p-6", "shadow-2xl", "shadow-emerald-950/10", "dark:border-emerald-800", "dark:bg-emerald-900"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "m-0", "text-sm", "text-emerald-700", "dark:text-emerald-300"], ["id", "commune-activity-title", 1, "m-0", "!text-2xl", "font-bold", "dark:!text-white"], ["type", "button", "aria-label", "Actualiser les informations municipales", 1, "rounded-xl", "border", "border-emerald-200", "px-3", "py-2", "disabled:opacity-50", "dark:border-emerald-700", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-refresh"], ["role", "alert", 1, "text-red-700", "dark:text-red-300"], ["role", "status", 1, "my-6"], ["aria-labelledby", "public-news-title", 1, "mx-auto", "max-w-7xl", "px-6", "pb-20", "lg:px-10"], [1, "mb-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "public-news-title", 1, "m-0", "!text-3xl", "font-bold"], ["routerLink", "/municipal/publications", 1, "font-semibold", "text-emerald-700", "dark:text-emerald-300"], [1, "grid", "gap-6", "md:grid-cols-3"], ["routerLink", "/municipal/publications", 1, "block", 3, "queryParams"], ["id", "solution", 1, "border-y", "border-emerald-100", "bg-emerald-50/70", "py-24", "dark:border-emerald-900", "dark:bg-emerald-900/30"], [1, "mx-auto", "max-w-7xl", "px-6", "lg:px-10"], [1, "text-sm", "font-bold", "uppercase", "tracking-[.14em]", "text-emerald-600"], [1, "m-0", "max-w-2xl", "!text-4xl", "font-bold", "leading-tight", "tracking-[-.045em]", "dark:!text-white"], [1, "mt-14", "grid", "gap-10", "md:grid-cols-3"], [1, "pi", "pi-database", "mb-5", "grid", "size-12", "place-items-center", "rounded-full", "bg-white", "text-xl", "text-emerald-600"], [1, "m-0", "!text-xl", "font-bold", "dark:!text-white"], [1, "text-emerald-950/65", "dark:text-emerald-50/70"], [1, "pi", "pi-sort-amount-down", "mb-5", "grid", "size-12", "place-items-center", "rounded-full", "bg-white", "text-xl", "text-emerald-600"], [1, "pi", "pi-eye", "mb-5", "grid", "size-12", "place-items-center", "rounded-full", "bg-white", "text-xl", "text-emerald-600"], ["id", "process", 1, "bg-emerald-950", "py-24", "text-white"], [1, "text-sm", "font-bold", "uppercase", "tracking-[.14em]", "text-emerald-300"], [1, "m-0", "max-w-2xl", "!text-4xl", "font-bold", "leading-tight", "!text-white"], [1, "mt-14", "grid", "gap-8", "md:grid-cols-3"], ["id", "securite", 1, "mx-auto", "max-w-4xl", "px-6", "py-24", "text-center"], [1, "m-0", "!text-4xl", "font-bold", "leading-tight", "dark:!text-white"], [1, "mt-5", "text-lg", "text-emerald-950/65", "dark:text-emerald-50/70"], [1, "mt-8", "inline-block", "rounded-xl", "bg-emerald-600", "px-6", "py-3.5", "font-bold", "text-white", "shadow-xl", "shadow-emerald-600/20", 3, "routerLink"], [1, "border-t", "border-emerald-100", "px-6", "py-8", "dark:border-emerald-900"], [1, "mx-auto", "flex", "max-w-7xl", "flex-col", "justify-between", "gap-4", "text-sm", "text-emerald-950/55", "dark:text-emerald-50/55", "sm:flex-row"], [1, "text-emerald-950", "dark:text-white"], ["routerLink", "/municipal/contact"], [1, "my-6", "grid", "grid-cols-1", "gap-3", "sm:grid-cols-2"], [1, "rounded-xl", "bg-white", "p-4", "dark:bg-emerald-950"], [1, "block", "text-3xl"], [1, "mb-0", "text-sm", "text-emerald-700", "dark:text-emerald-300"], [1, "rounded-2xl", "border", "border-emerald-100", "p-6", "dark:border-emerald-800"], [1, "text-sm", "text-emerald-700", "dark:text-emerald-300"], [1, "!text-xl", "font-semibold"], [1, "mb-5", "grid", "size-10", "place-items-center", "rounded-full", "bg-emerald-500"], [1, "m-0", "!text-xl", "font-bold", "!text-white"], [1, "text-emerald-100/70"]], template: function Landing_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0);
      \u0275\u0275element(1, "topbar-widget", 1);
      \u0275\u0275elementStart(2, "section", 2)(3, "div")(4, "h1", 3);
      \u0275\u0275text(5, "Chaque demande m\xE9rite une r\xE9ponse.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, " Terra Nova aide les collectivit\xE9s \xE0 centraliser, traiter et suivre les demandes des citoyens, pour des services publics plus r\xE9actifs et plus proches du terrain. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "a", 6);
      \u0275\u0275text(10);
      \u0275\u0275element(11, "i", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "a", 8);
      \u0275\u0275text(13, "D\xE9couvrir le fonctionnement");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "section", 9)(15, "div", 10)(16, "div")(17, "p", 11);
      \u0275\u0275text(18, "Dans votre commune");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "h2", 12);
      \u0275\u0275text(20, "L'activit\xE9 en direct");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 13);
      \u0275\u0275listener("click", function Landing_Template_button_click_21_listener() {
        return ctx.load();
      });
      \u0275\u0275element(22, "i", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, Landing_Conditional_23_Template, 2, 1, "p", 15);
      \u0275\u0275conditionalCreate(24, Landing_Conditional_24_Template, 24, 6)(25, Landing_Conditional_25_Template, 2, 0, "p", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "section", 17)(27, "div", 18)(28, "h2", 19);
      \u0275\u0275text(29, "Les informations de votre mairie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "a", 20);
      \u0275\u0275text(31, "Toutes les publications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 21);
      \u0275\u0275repeaterCreate(33, Landing_For_34_Template, 9, 11, "a", 22, _forTrack07, false, Landing_ForEmpty_35_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "section", 23)(37, "div", 24)(38, "p", 25);
      \u0275\u0275text(39, "Pour les collectivit\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "h2", 26);
      \u0275\u0275text(41, "Une gestion plus simple pour des services plus efficaces.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "div", 27)(43, "article");
      \u0275\u0275element(44, "i", 28);
      \u0275\u0275elementStart(45, "h3", 29);
      \u0275\u0275text(46, "Centraliser");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p", 30);
      \u0275\u0275text(48, "Toutes les demandes citoyennes, au m\xEAme endroit.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "article");
      \u0275\u0275element(50, "i", 31);
      \u0275\u0275elementStart(51, "h3", 29);
      \u0275\u0275text(52, "Prioriser");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "p", 30);
      \u0275\u0275text(54, "Identifier rapidement les demandes urgentes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "article");
      \u0275\u0275element(56, "i", 32);
      \u0275\u0275elementStart(57, "h3", 29);
      \u0275\u0275text(58, "Suivre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "p", 30);
      \u0275\u0275text(60, "Une visibilit\xE9 partag\xE9e jusqu\u2019\xE0 la r\xE9solution.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(61, "section", 33)(62, "div", 24)(63, "p", 34);
      \u0275\u0275text(64, "Du signalement au service rendu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "h2", 35);
      \u0275\u0275text(66, "Un processus clair, du citoyen \xE0 l\u2019action.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 36);
      \u0275\u0275repeaterCreate(68, Landing_For_69_Template, 7, 2, "article", null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(70, "section", 37)(71, "h2", 38);
      \u0275\u0275text(72, "Pr\xEAt \xE0 simplifier la gestion des demandes citoyennes ?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "p", 39);
      \u0275\u0275text(74, "Des services publics plus r\xE9actifs, plus transparents et plus proches des citoyens.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "a", 40);
      \u0275\u0275text(76);
      \u0275\u0275element(77, "i", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "footer", 41)(79, "div", 42)(80, "b", 43);
      \u0275\u0275text(81, "Terra Nova");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span");
      \u0275\u0275text(83);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(84, "a", 44);
      \u0275\u0275text(85, "Contacter la mairie");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_4_0;
      \u0275\u0275advance(9);
      \u0275\u0275property("routerLink", ctx.auth.isAuthenticated() ? ctx.auth.homeUrl() : "/auth/login");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.auth.isAuthenticated() ? "Retrouver mon espace" : "Acc\xE9der \xE0 Terra Nova", " ");
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-busy", ctx.loading());
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_4_0 = ctx.error()) ? 23 : -1, tmp_4_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() ? 24 : ctx.loading() ? 25 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.publications());
      \u0275\u0275advance(35);
      \u0275\u0275repeater(\u0275\u0275pureFunction0(10, _c05));
      \u0275\u0275advance(7);
      \u0275\u0275property("routerLink", ctx.auth.isAuthenticated() ? ctx.auth.homeUrl() : "/auth/register");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.auth.isAuthenticated() ? "Retrouver mon espace" : "Cr\xE9er un compte", " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.year, " Terra Nova \xB7 Une gestion publique plus proche.");
    }
  }, dependencies: [RouterModule, RouterLink, TopbarWidget, DatePipe], styles: ["\n\nmain[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\nmain[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n/*# sourceMappingURL=landing.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Landing, [{
    type: Component,
    args: [{ selector: "app-landing", imports: [DatePipe, RouterModule, TopbarWidget], template: `<main class="min-h-dvh bg-white text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50">
    <topbar-widget class="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10" />
    <section class="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-14 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div>
            <h1 class="m-0 max-w-xl !text-5xl font-bold leading-[.98] tracking-[-.06em] text-emerald-950 dark:!text-white md:!text-7xl">Chaque demande m\xE9rite une r\xE9ponse.</h1>
            <p class="mt-7 max-w-xl text-lg leading-8 text-emerald-950/65 dark:text-emerald-50/70">
                Terra Nova aide les collectivit\xE9s \xE0 centraliser, traiter et suivre les demandes des citoyens, pour des services publics plus r\xE9actifs et plus proches du terrain.
            </p>
            <div class="mt-9 flex flex-wrap gap-5">
                <a [routerLink]="auth.isAuthenticated() ? auth.homeUrl() : '/auth/login'" class="rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20"
                    >{{ auth.isAuthenticated() ? 'Retrouver mon espace' : 'Acc\xE9der \xE0 Terra Nova' }} <i class="pi pi-arrow-right ml-2"></i></a
                ><a href="#process" class="py-3.5 font-semibold text-emerald-700 dark:text-emerald-300">D\xE9couvrir le fonctionnement</a>
            </div>
        </div>
        <section class="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 dark:border-emerald-800 dark:bg-emerald-900" aria-labelledby="commune-activity-title" [attr.aria-busy]="loading()">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p class="m-0 text-sm text-emerald-700 dark:text-emerald-300">Dans votre commune</p>
                    <h2 id="commune-activity-title" class="m-0 !text-2xl font-bold dark:!text-white">L'activit\xE9 en direct</h2>
                </div>
                <button type="button" (click)="load()" [disabled]="loading()" aria-label="Actualiser les informations municipales" class="rounded-xl border border-emerald-200 px-3 py-2 disabled:opacity-50 dark:border-emerald-700">
                    <i class="pi pi-refresh" aria-hidden="true"></i>
                </button>
            </div>
            @if (error(); as message) {
                <p role="alert" class="text-red-700 dark:text-red-300">{{ message }}</p>
            }
            @if (!loading()) {
                <div class="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div class="rounded-xl bg-white p-4 dark:bg-emerald-950">
                        <strong class="block text-3xl">{{ services().length }}</strong><span>Services disponibles</span>
                    </div>
                    <div class="rounded-xl bg-white p-4 dark:bg-emerald-950">
                        <strong class="block text-3xl">{{ publications().length }}</strong><span>Informations r\xE9centes</span>
                    </div>
                    <div class="rounded-xl bg-white p-4 dark:bg-emerald-950">
                        <strong class="block text-3xl">24 h</strong><span>Mise \xE0 jour des actualit\xE9s</span>
                    </div>
                    <div class="rounded-xl bg-white p-4 dark:bg-emerald-950">
                        <strong class="block text-3xl">En ligne</strong><span>Plateforme municipale</span>
                    </div>
                </div>
                <p class="mb-0 text-sm text-emerald-700 dark:text-emerald-300">Actualis\xE9 \xE0 {{ updatedAt() | date: 'HH:mm:ss' }} \xB7 mise \xE0 jour automatique</p>
            } @else if (loading()) {
                <p role="status" class="my-6">Chargement de l'activit\xE9 municipale\u2026</p>
            }
        </section>
    </section>
    <section class="mx-auto max-w-7xl px-6 pb-20 lg:px-10" aria-labelledby="public-news-title">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 id="public-news-title" class="m-0 !text-3xl font-bold">Les informations de votre mairie</h2>
            <a routerLink="/municipal/publications" class="font-semibold text-emerald-700 dark:text-emerald-300">Toutes les publications</a>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
            @for (publication of publications(); track publication.id) {
                <a class="block" routerLink="/municipal/publications" [queryParams]="{ publication: publication.id }" [attr.aria-label]="'Lire la publication : ' + publication.title"
                    ><article class="rounded-2xl border border-emerald-100 p-6 dark:border-emerald-800">
                        <p class="text-sm text-emerald-700 dark:text-emerald-300">{{ publication.category }} \xB7 {{ publication.published_at | date: 'dd/MM/yyyy' }}</p>
                        <h3 class="!text-xl font-semibold">{{ publication.title }}</h3>
                        <p>{{ publication.summary }}</p>
                    </article></a
                >
            } @empty {
                @if (!loading() && !error()) {
                    <p>Aucune publication pour le moment.</p>
                }
            }
        </div>
    </section>
    <section id="solution" class="border-y border-emerald-100 bg-emerald-50/70 py-24 dark:border-emerald-900 dark:bg-emerald-900/30">
        <div class="mx-auto max-w-7xl px-6 lg:px-10">
            <p class="text-sm font-bold uppercase tracking-[.14em] text-emerald-600">Pour les collectivit\xE9s</p>
            <h2 class="m-0 max-w-2xl !text-4xl font-bold leading-tight tracking-[-.045em] dark:!text-white">Une gestion plus simple pour des services plus efficaces.</h2>
            <div class="mt-14 grid gap-10 md:grid-cols-3">
                <article>
                    <i class="pi pi-database mb-5 grid size-12 place-items-center rounded-full bg-white text-xl text-emerald-600"></i>
                    <h3 class="m-0 !text-xl font-bold dark:!text-white">Centraliser</h3>
                    <p class="text-emerald-950/65 dark:text-emerald-50/70">Toutes les demandes citoyennes, au m\xEAme endroit.</p>
                </article>
                <article>
                    <i class="pi pi-sort-amount-down mb-5 grid size-12 place-items-center rounded-full bg-white text-xl text-emerald-600"></i>
                    <h3 class="m-0 !text-xl font-bold dark:!text-white">Prioriser</h3>
                    <p class="text-emerald-950/65 dark:text-emerald-50/70">Identifier rapidement les demandes urgentes.</p>
                </article>
                <article>
                    <i class="pi pi-eye mb-5 grid size-12 place-items-center rounded-full bg-white text-xl text-emerald-600"></i>
                    <h3 class="m-0 !text-xl font-bold dark:!text-white">Suivre</h3>
                    <p class="text-emerald-950/65 dark:text-emerald-50/70">Une visibilit\xE9 partag\xE9e jusqu\u2019\xE0 la r\xE9solution.</p>
                </article>
            </div>
        </div>
    </section>
    <section id="process" class="bg-emerald-950 py-24 text-white">
        <div class="mx-auto max-w-7xl px-6 lg:px-10">
            <p class="text-sm font-bold uppercase tracking-[.14em] text-emerald-300">Du signalement au service rendu</p>
            <h2 class="m-0 max-w-2xl !text-4xl font-bold leading-tight !text-white">Un processus clair, du citoyen \xE0 l\u2019action.</h2>
            <div class="mt-14 grid gap-8 md:grid-cols-3">
                @for (step of ['Le citoyen signale une demande', 'L\u2019\xE9quipe intervient', 'Le service est rendu']; track step; let i = $index) {
                    <article>
                        <b class="mb-5 grid size-10 place-items-center rounded-full bg-emerald-500">{{ i + 1 }}</b>
                        <h3 class="m-0 !text-xl font-bold !text-white">{{ step }}</h3>
                        <p class="text-emerald-100/70">Une information claire, suivie par la bonne personne, au bon moment.</p>
                    </article>
                }
            </div>
        </div>
    </section>
    <section id="securite" class="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 class="m-0 !text-4xl font-bold leading-tight dark:!text-white">Pr\xEAt \xE0 simplifier la gestion des demandes citoyennes ?</h2>
        <p class="mt-5 text-lg text-emerald-950/65 dark:text-emerald-50/70">Des services publics plus r\xE9actifs, plus transparents et plus proches des citoyens.</p>
        <a [routerLink]="auth.isAuthenticated() ? auth.homeUrl() : '/auth/register'" class="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20"
            >{{ auth.isAuthenticated() ? 'Retrouver mon espace' : 'Cr\xE9er un compte' }} <i class="pi pi-arrow-right ml-2"></i
        ></a>
    </section>
    <footer class="border-t border-emerald-100 px-6 py-8 dark:border-emerald-900">
        <div class="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-emerald-950/55 dark:text-emerald-50/55 sm:flex-row">
            <b class="text-emerald-950 dark:text-white">Terra Nova</b><span>\xA9 {{ year }} Terra Nova \xB7 Une gestion publique plus proche.</span><a routerLink="/municipal/contact">Contacter la mairie</a>
        </div>
    </footer>
</main>
`, styles: ["/* src/app/pages/landing/landing.scss */\nmain {\n  overflow-wrap: anywhere;\n}\nmain section > div {\n  min-width: 0;\n}\n/*# sourceMappingURL=landing.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Landing, { className: "Landing", filePath: "src/app/pages/landing/landing.ts", lineNumber: 13 });
})();

// src/app/pages/notfound/notfound.ts
var Notfound = class _Notfound {
  static \u0275fac = function Notfound_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Notfound)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Notfound, selectors: [["app-notfound"]], decls: 42, vars: 0, consts: [[1, "flex", "items-center", "justify-center", "min-h-screen", "overflow-hidden"], [1, "flex", "flex-col", "items-center", "justify-center"], ["width", "54", "height", "40", "viewBox", "0 0 54 40", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "mb-8", "w-32", "shrink-0"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z", "fill", "var(--primary-color)"], ["id", "mask0_1413_1551", "maskUnits", "userSpaceOnUse", "x", "0", "y", "8", "width", "54", "height", "11", 2, "mask-type", "alpha"], ["d", "M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z", "fill", "var(--primary-color)"], ["mask", "url(#mask0_1413_1551)"], ["d", "M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z", "fill", "var(--primary-color)"], [2, "border-radius", "56px", "padding", "0.3rem", "background", "linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)"], [1, "w-full", "bg-surface-0", "dark:bg-surface-900", "py-20", "px-8", "sm:px-20", "flex", "flex-col", "items-center", 2, "border-radius", "53px"], [1, "text-primary", "font-bold", "text-3xl"], [1, "text-surface-900", "dark:text-surface-0", "font-bold", "text-3xl", "lg:text-5xl", "mb-2"], [1, "text-surface-600", "dark:text-surface-200", "mb-8"], ["routerLink", "/", 1, "w-full", "flex", "items-center", "py-8", "border-surface-300", "dark:border-surface-500", "border-b"], [1, "flex", "justify-center", "items-center", "border-2", "border-primary", "text-primary", "rounded-border", 2, "height", "3.5rem", "width", "3.5rem"], [1, "pi", "pi-fw", "pi-table", "text-2xl!"], [1, "ml-6", "flex", "flex-col"], [1, "text-surface-900", "dark:text-surface-0", "lg:text-xl", "font-medium", "mb-0", "block"], [1, "text-surface-600", "dark:text-surface-200", "lg:text-xl"], [1, "pi", "pi-fw", "pi-question-circle", "text-2xl!"], [1, "text-surface-900", "dark:text-surface-0", "lg:text-xl", "font-medium", "mb-0"], ["routerLink", "/", 1, "w-full", "flex", "items-center", "mb-8", "py-8", "border-surface-300", "dark:border-surface-500", "border-b"], [1, "pi", "pi-fw", "pi-unlock", "text-2xl!"], ["label", "Mon espace", "routerLink", "/home/account"]], template: function Notfound_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-floating-configurator");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 2);
      \u0275\u0275element(4, "path", 3);
      \u0275\u0275elementStart(5, "mask", 4);
      \u0275\u0275element(6, "path", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "g", 6);
      \u0275\u0275element(8, "path", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "span", 10);
      \u0275\u0275text(12, "404");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "h1", 11);
      \u0275\u0275text(14, "Not Found");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275text(16, "Requested resource is not available.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "a", 13)(18, "span", 14);
      \u0275\u0275element(19, "i", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 16)(21, "span", 17);
      \u0275\u0275text(22, "Frequently Asked Questions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 18);
      \u0275\u0275text(24, "Ultricies mi quis hendrerit dolor.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "a", 13)(26, "span", 14);
      \u0275\u0275element(27, "i", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 16)(29, "span", 20);
      \u0275\u0275text(30, "Solution Center");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span", 18);
      \u0275\u0275text(32, "Phasellus faucibus scelerisque eleifend.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "a", 21)(34, "span", 14);
      \u0275\u0275element(35, "i", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "span", 16)(37, "span", 20);
      \u0275\u0275text(38, "Permission Manager");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "span", 18);
      \u0275\u0275text(40, "Accumsan in nisl nisi scelerisque");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(41, "p-button", 23);
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [RouterModule, RouterLink, AppFloatingConfigurator, ButtonModule, Button], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Notfound, [{
    type: Component,
    args: [{ selector: "app-notfound", imports: [RouterModule, AppFloatingConfigurator, ButtonModule], template: '<app-floating-configurator />\n\n<div class="flex items-center justify-center min-h-screen overflow-hidden">\n    <div class="flex flex-col items-center justify-center">\n        <!-- Logo -->\n        <svg width="54" height="40" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-32 shrink-0">\n            <path\n                fill-rule="evenodd"\n                clip-rule="evenodd"\n                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"\n                fill="var(--primary-color)"\n            />\n            <mask id="mask0_1413_1551" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">\n                <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="var(--primary-color)" />\n            </mask>\n            <g mask="url(#mask0_1413_1551)">\n                <path\n                    d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z"\n                    fill="var(--primary-color)"\n                />\n            </g>\n        </svg>\n\n        <!-- Gradient border wrapper -->\n        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">\n            <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">\n                <!-- Message -->\n                <span class="text-primary font-bold text-3xl">404</span>\n                <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>\n                <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>\n\n                <!-- Help link: FAQ -->\n                <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">\n                    <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">\n                        <i class="pi pi-fw pi-table text-2xl!"></i>\n                    </span>\n                    <span class="ml-6 flex flex-col">\n                        <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Frequently Asked Questions</span>\n                        <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Ultricies mi quis hendrerit dolor.</span>\n                    </span>\n                </a>\n\n                <!-- Help link: Solution Center -->\n                <a routerLink="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">\n                    <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">\n                        <i class="pi pi-fw pi-question-circle text-2xl!"></i>\n                    </span>\n                    <span class="ml-6 flex flex-col">\n                        <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Solution Center</span>\n                        <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Phasellus faucibus scelerisque eleifend.</span>\n                    </span>\n                </a>\n\n                <!-- Help link: Permission Manager -->\n                <a routerLink="/" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">\n                    <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">\n                        <i class="pi pi-fw pi-unlock text-2xl!"></i>\n                    </span>\n                    <span class="ml-6 flex flex-col">\n                        <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Permission Manager</span>\n                        <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Accumsan in nisl nisi scelerisque</span>\n                    </span>\n                </a>\n\n                <p-button label="Mon espace" routerLink="/home/account" />\n            </div>\n        </div>\n    </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Notfound, { className: "Notfound", filePath: "src/app/pages/notfound/notfound.ts", lineNumber: 12 });
})();

// src/app.routes.ts
var appRoutes = [
  {
    path: "home",
    component: AppLayout,
    data: { breadcrumb: "Espace personnel" },
    canActivateChild: [authGuard],
    children: [
      { path: "account", data: { breadcrumb: "Mon espace" }, loadComponent: () => import("./chunk-GJASFANJ.js").then((m) => m.Account) },
      { path: "profile", data: { breadcrumb: "Mon profil" }, loadComponent: () => import("./chunk-DOKS55VR.js").then((m) => m.Profile) },
      { path: "my-data", data: { breadcrumb: "Mes donn\xE9es" }, loadComponent: () => import("./chunk-DJAWVXF5.js").then((m) => m.MyData) },
      { path: "", redirectTo: "account", pathMatch: "full" },
      {
        path: "my-requests",
        canActivate: [roleGuard],
        data: { breadcrumb: "Mes demandes", roles: ["citizen"] },
        children: [
          { path: "", loadComponent: () => import("./chunk-UA7XBSHN.js").then((m) => m.MyRequests) },
          { path: ":id", data: { breadcrumb: "D\xE9tail" }, loadComponent: () => import("./chunk-UA7XBSHN.js").then((m) => m.MyRequests) }
        ]
      },
      { path: "users", data: { breadcrumb: "Comptes citoyens", roles: ["agent", "manager", "admin"] }, loadComponent: () => import("./chunk-FLQIFYCS.js").then((m) => m.Users) },
      { path: "requests", data: { breadcrumb: "Demandes citoyennes", roles: ["manager", "admin"] }, loadComponent: () => import("./chunk-AB6Z4B7U.js").then((m) => m.Requests) },
      {
        path: "accounts",
        data: { breadcrumb: "Utilisateurs", roles: ["admin"] },
        // Une liste par rôle : chaque entrée du menu « Utilisateurs » a sa propre route.
        children: [
          { path: "", redirectTo: "citizens", pathMatch: "full" },
          { path: "citizens", data: { breadcrumb: "Citoyens", role: "citizen" }, loadComponent: () => import("./chunk-SSCRAFEX.js").then((m) => m.Accounts) },
          { path: "agents", data: { breadcrumb: "Agents", role: "agent" }, loadComponent: () => import("./chunk-SSCRAFEX.js").then((m) => m.Accounts) },
          { path: "managers", data: { breadcrumb: "Managers", role: "manager" }, loadComponent: () => import("./chunk-SSCRAFEX.js").then((m) => m.Accounts) },
          { path: "admins", data: { breadcrumb: "Administrateurs", role: "admin" }, loadComponent: () => import("./chunk-SSCRAFEX.js").then((m) => m.Accounts) }
        ]
      },
      { path: "data-concerns", data: { breadcrumb: "Signalements sur les donn\xE9es", roles: ["admin"] }, loadComponent: () => import("./chunk-J2P7ROBE.js").then((m) => m.DataConcernsAdmin) },
      { path: "instituts", data: { breadcrumb: "Instituts", roles: ["admin"] }, loadComponent: () => import("./chunk-ZZUT2WAR.js").then((m) => m.Instituts) },
      { path: "journal", data: { breadcrumb: "Journal", roles: ["agent", "manager", "admin"] }, loadComponent: () => import("./chunk-2C4JUWMR.js").then((m) => m.Journal) },
      { path: "agent", data: { breadcrumb: "Mes interventions", roles: ["agent"] }, loadComponent: () => import("./chunk-SGEXET3Z.js").then((m) => m.AgentWorkspace) },
      { path: "agents", data: { breadcrumb: "Agents", roles: ["manager", "admin"] }, loadComponent: () => import("./chunk-22KUDMFL.js").then((m) => m.Agents) },
      { path: "municipal", data: { breadcrumb: "Accueil municipal" }, loadComponent: () => import("./chunk-IZHCO2O6.js").then((m) => m.MunicipalHome) },
      { path: "municipal/services", data: { breadcrumb: "Services municipaux" }, loadComponent: () => import("./chunk-ZJZAWXE3.js").then((m) => m.MunicipalServices) },
      { path: "municipal/publications", data: { breadcrumb: "Publications" }, loadComponent: () => import("./chunk-ILLNCO6Z.js").then((m) => m.MunicipalPublications) },
      { path: "municipal/contact", data: { breadcrumb: "Contacter la mairie" }, loadComponent: () => import("./chunk-IYP7QY3Q.js").then((m) => m.MunicipalContact) },
      { path: "terra-nova", data: { breadcrumb: "API Terra Nova", roles: ["agent", "manager", "admin"] }, loadChildren: () => import("./chunk-BE7DQOMG.js") }
    ]
  },
  {
    path: "municipal",
    canActivate: [publicSessionGuard],
    loadComponent: () => import("./chunk-U26NR6WZ.js").then((m) => m.MunicipalLayout),
    children: [
      { path: "", loadComponent: () => import("./chunk-IZHCO2O6.js").then((m) => m.MunicipalHome) },
      { path: "services", loadComponent: () => import("./chunk-ZJZAWXE3.js").then((m) => m.MunicipalServices) },
      { path: "publications", loadComponent: () => import("./chunk-ILLNCO6Z.js").then((m) => m.MunicipalPublications) },
      { path: "contact", loadComponent: () => import("./chunk-IYP7QY3Q.js").then((m) => m.MunicipalContact) }
    ]
  },
  { path: "", component: Landing, canActivate: [publicSessionGuard] },
  { path: "notfound", component: Notfound },
  { path: "auth", loadChildren: () => import("./chunk-AFHTYASX.js") },
  { path: "**", redirectTo: "/notfound" }
];

// src/app.config.ts
registerLocaleData(fr_default);
var appConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    provideAppInitializer(() => inject(AuthService).restoreSession()),
    provideAppInitializer(() => {
      inject(RealtimeService);
    }),
    provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: "enabled", scrollPositionRestoration: "enabled" }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideZonelessChangeDetection(),
    providePrimeNG({ theme: { preset: Qr, options: { darkModeSelector: ".app-dark" } } })
  ]
};

// src/app/shared/virtual-assistant/virtual-assistant-widget.ts
var _c06 = ["messageLog"];
var _c15 = () => ["/municipal/services"];
var _c23 = (a0) => ({ search: a0 });
var _forTrack08 = ($index, $item) => $item.id;
function VirtualAssistantWidget_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 33);
    \u0275\u0275text(2, "\u2733");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Bonjour ! Comment puis-je vous aider ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Je vous accompagne pour d\xE9couvrir les services et les d\xE9marches sur Terra Nova.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 34)(8, "button", 35);
    \u0275\u0275listener("click", function VirtualAssistantWidget_Conditional_0_Conditional_16_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startSuggestedMessage("Comment signaler un probl\xE8me dans mon quartier ?"));
    });
    \u0275\u0275text(9, "Signaler un probl\xE8me ");
    \u0275\u0275element(10, "i", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 35);
    \u0275\u0275listener("click", function VirtualAssistantWidget_Conditional_0_Conditional_16_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startSuggestedMessage("Comment trouver les services de ma mairie ?"));
    });
    \u0275\u0275text(12, "Trouver un service municipal ");
    \u0275\u0275element(13, "i", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 35);
    \u0275\u0275listener("click", function VirtualAssistantWidget_Conditional_0_Conditional_16_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startSuggestedMessage("Comment suivre mes demandes ?"));
    });
    \u0275\u0275text(15, "Suivre une demande ");
    \u0275\u0275element(16, "i", 36);
    \u0275\u0275elementEnd()()();
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r4);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 47);
    \u0275\u0275repeaterCreate(1, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_10_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("as-checklist", message_r5.content.format === "checklist");
    \u0275\u0275advance();
    \u0275\u0275repeater(message_r5.content.steps);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_11_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const note_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(note_r6);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 44);
    \u0275\u0275repeaterCreate(1, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_11_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(message_r5.content.notes);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_For_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const service_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r7.address);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 49)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_For_4_Conditional_7_Template, 3, 1, "span", 51);
    \u0275\u0275elementStart(8, "span", 51);
    \u0275\u0275element(9, "i", 52);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 51);
    \u0275\u0275element(12, "i", 53);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 54);
    \u0275\u0275text(15, " Voir ce service ");
    \u0275\u0275element(16, "i", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r7.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r7.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(service_r7.address ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(service_r7.opening_hours);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(service_r7.contact_details);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(8, _c15))("queryParams", \u0275\u0275pureFunction1(9, _c23, service_r7.name));
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span", 48);
    \u0275\u0275text(2, "Services municipaux pertinents");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_For_4_Template, 17, 11, "article", 49, _forTrack08);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275repeater(message_r5.content.recommended_services);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(message_r5.content.follow_up);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "article", 40)(3, "div", 41)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 38);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_10_Template, 3, 2, "ol", 43);
    \u0275\u0275conditionalCreate(11, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_11_Template, 3, 0, "ul", 44);
    \u0275\u0275conditionalCreate(12, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_12_Template, 5, 0, "div", 45);
    \u0275\u0275conditionalCreate(13, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Conditional_13_Template, 2, 1, "p", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(message_r5.content.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatLabel(message_r5.content.format));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(message_r5.content.message);
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r5.content.steps.length ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r5.content.notes.length ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r5.content.recommended_services.length ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r5.content.follow_up ? 13 : -1);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(message_r5.content);
  }
}
function VirtualAssistantWidget_Conditional_0_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275conditionalCreate(1, VirtualAssistantWidget_Conditional_0_For_18_Conditional_1_Template, 14, 7)(2, VirtualAssistantWidget_Conditional_0_For_18_Conditional_2_Template, 2, 1, "p", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r5 = ctx.$implicit;
    \u0275\u0275classProp("from-user", message_r5.role === "user");
    \u0275\u0275advance();
    \u0275\u0275conditional(message_r5.role === "assistant" ? 1 : 2);
  }
}
function VirtualAssistantWidget_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 39);
    \u0275\u0275element(2, "i", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 56);
    \u0275\u0275element(4, "span")(5, "span")(6, "span");
    \u0275\u0275elementEnd()();
  }
}
function VirtualAssistantWidget_Conditional_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function VirtualAssistantWidget_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 1)(1, "header", 5)(2, "span", 6);
    \u0275\u0275element(3, "i", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "h2", 9);
    \u0275\u0275text(6, "Terra Nova");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275element(8, "span", 10);
    \u0275\u0275text(9, "Votre assistante virtuelle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 11);
    \u0275\u0275listener("click", function VirtualAssistantWidget_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearConversation());
    });
    \u0275\u0275element(11, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 13);
    \u0275\u0275listener("click", function VirtualAssistantWidget_Conditional_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle());
    });
    \u0275\u0275element(13, "i", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15, 0);
    \u0275\u0275conditionalCreate(16, VirtualAssistantWidget_Conditional_0_Conditional_16_Template, 17, 0, "div", 16);
    \u0275\u0275repeaterCreate(17, VirtualAssistantWidget_Conditional_0_For_18_Template, 3, 3, "div", 17, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(19, VirtualAssistantWidget_Conditional_0_Conditional_19_Template, 7, 0, "div", 18);
    \u0275\u0275conditionalCreate(20, VirtualAssistantWidget_Conditional_0_Conditional_20_Template, 2, 1, "p", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "form", 20);
    \u0275\u0275listener("ngSubmit", function VirtualAssistantWidget_Conditional_0_Template_form_ngSubmit_21_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendMessage());
    });
    \u0275\u0275elementStart(22, "label", 21)(23, "span");
    \u0275\u0275text(24, "Format de r\xE9ponse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 22);
    \u0275\u0275twoWayListener("ngModelChange", function VirtualAssistantWidget_Conditional_0_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.responsePreference, $event) || (ctx_r1.responsePreference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(26, "option", 23);
    \u0275\u0275text(27, "Automatique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 24);
    \u0275\u0275text(29, "R\xE9ponse concise");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 25);
    \u0275\u0275text(31, "\xC9tapes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 26);
    \u0275\u0275text(33, "Checklist");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 27)(35, "label", 28);
    \u0275\u0275text(36, "Votre message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "textarea", 29);
    \u0275\u0275twoWayListener("ngModelChange", function VirtualAssistantWidget_Conditional_0_Template_textarea_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.draft, $event) || (ctx_r1.draft = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function VirtualAssistantWidget_Conditional_0_Template_textarea_keydown_enter_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEnter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 30);
    \u0275\u0275element(39, "i", 31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "p", 32);
    \u0275\u0275text(41, "Assistant IA \xB7 Ne partagez aucun mot de passe ni code confidentiel.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx_r1.messages().length === 0 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.messages());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isSending() ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 20 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.responsePreference);
    \u0275\u0275property("disabled", ctx_r1.isSending());
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.draft);
    \u0275\u0275property("disabled", ctx_r1.isSending());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.draft.trim() || ctx_r1.isSending() || ctx_r1.draft.length > 1200);
  }
}
function VirtualAssistantWidget_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "Besoin d\u2019aide ?");
    \u0275\u0275elementEnd();
  }
}
var VirtualAssistantWidget = class _VirtualAssistantWidget {
  http = inject(HttpClient);
  messagesElement = viewChild("messageLog", ...ngDevMode ? [{ debugName: "messagesElement" }] : []);
  isOpen = signal(false, ...ngDevMode ? [{ debugName: "isOpen" }] : []);
  messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : []);
  isSending = signal(false, ...ngDevMode ? [{ debugName: "isSending" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  responsePreference = "auto";
  draft = "";
  toggle() {
    this.isOpen.update((open) => !open);
    if (this.isOpen())
      this.scrollToBottom();
  }
  startSuggestedMessage(message) {
    this.draft = message;
    this.sendMessage();
  }
  sendMessage() {
    const message = this.draft.trim();
    if (!message || this.isSending() || message.length > 1200)
      return;
    const history = this.messages().slice(-8).map(({ role, content }) => ({
      role,
      content: role === "assistant" ? this.toHistoryText(content) : content
    }));
    this.messages.update((messages) => [...messages, { role: "user", content: message }]);
    this.draft = "";
    this.errorMessage.set("");
    this.isSending.set(true);
    this.scrollToBottom();
    this.http.post(`${environment.apiUrl}/assistant/chat`, {
      message,
      history,
      response_preference: this.responsePreference
    }).subscribe({
      next: ({ response }) => {
        this.messages.update((messages) => [...messages, { role: "assistant", content: response }]);
        this.isSending.set(false);
        this.scrollToBottom();
      },
      error: (error) => {
        this.errorMessage.set(error.status === 503 ? "L'assistante est momentan\xE9ment indisponible. R\xE9essayez plus tard." : "Impossible d'obtenir une r\xE9ponse. V\xE9rifiez votre connexion et r\xE9essayez.");
        this.isSending.set(false);
        this.scrollToBottom();
      }
    });
  }
  clearConversation() {
    this.messages.set([]);
    this.errorMessage.set("");
  }
  formatLabel(format) {
    return { concise: "R\xE9ponse concise", steps: "\xC9tapes", checklist: "Checklist" }[format];
  }
  toHistoryText(reply) {
    return [
      `[${reply.format}] ${reply.title}`,
      reply.message,
      ...reply.steps,
      ...reply.notes,
      ...reply.recommended_services.map((service) => service.name),
      reply.follow_up
    ].filter(Boolean).join("\n").slice(0, 1200);
  }
  onEnter(event) {
    if (!(event instanceof KeyboardEvent))
      return;
    if (!event.shiftKey && !event.isComposing) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  closeOnEscape() {
    this.isOpen.set(false);
  }
  scrollToBottom() {
    requestAnimationFrame(() => {
      const element = this.messagesElement()?.nativeElement;
      if (element)
        element.scrollTop = element.scrollHeight;
    });
  }
  static \u0275fac = function VirtualAssistantWidget_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VirtualAssistantWidget)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VirtualAssistantWidget, selectors: [["app-virtual-assistant-widget"]], viewQuery: function VirtualAssistantWidget_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.messagesElement, _c06, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function VirtualAssistantWidget_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function VirtualAssistantWidget_keydown_escape_HostBindingHandler() {
        return ctx.closeOnEscape();
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 4, vars: 8, consts: [["messageLog", ""], ["role", "dialog", "aria-labelledby", "assistant-title", "aria-modal", "false", 1, "assistant-panel"], ["type", "button", 1, "assistant-launcher", 3, "click"], ["aria-hidden", "true"], [1, "launcher-label"], [1, "assistant-header"], ["aria-hidden", "true", 1, "assistant-avatar"], [1, "pi", "pi-sparkles"], [1, "assistant-identity"], ["id", "assistant-title"], [1, "online-dot"], ["type", "button", "aria-label", "Nouvelle conversation", "title", "Nouvelle conversation", 1, "icon-button", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-refresh"], ["type", "button", "aria-label", "Fermer l\u2019assistante", "title", "Fermer", 1, "icon-button", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-times"], ["role", "log", "aria-live", "polite", "aria-relevant", "additions text", "aria-label", "Conversation avec l\u2019assistante", 1, "assistant-messages"], [1, "welcome-message"], [1, "message-row", 3, "from-user"], ["aria-label", "L\u2019assistante r\xE9dige sa r\xE9ponse", 1, "message-row"], ["role", "alert", 1, "error-message"], [3, "ngSubmit"], [1, "format-picker"], ["name", "responsePreference", 3, "ngModelChange", "ngModel", "disabled"], ["value", "auto"], ["value", "concise"], ["value", "steps"], ["value", "checklist"], [1, "composer"], ["for", "assistant-input", 1, "sr-only"], ["id", "assistant-input", "name", "message", "placeholder", "Posez votre question\u2026", "rows", "1", "maxlength", "1200", "aria-describedby", "assistant-disclaimer", 3, "ngModelChange", "keydown.enter", "ngModel", "disabled"], ["type", "submit", "aria-label", "Envoyer le message", 1, "send-button", 3, "disabled"], ["aria-hidden", "true", 1, "pi", "pi-arrow-up"], ["id", "assistant-disclaimer", 1, "disclaimer"], ["aria-hidden", "true", 1, "welcome-sparkle"], ["aria-label", "Suggestions", 1, "suggestions"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-arrow-up-right"], [1, "message-row"], [1, "message-bubble"], ["aria-hidden", "true", 1, "message-avatar"], [1, "reply-card"], [1, "reply-heading"], [1, "reply-format"], [1, "reply-steps", 3, "as-checklist"], [1, "reply-notes"], [1, "service-recommendations"], [1, "reply-follow-up"], [1, "reply-steps"], [1, "service-recommendations-title"], [1, "service-recommendation"], [1, "service-category"], [1, "service-detail"], ["aria-hidden", "true", 1, "pi", "pi-clock"], ["aria-hidden", "true", 1, "pi", "pi-phone"], [1, "service-link", 3, "routerLink", "queryParams"], ["aria-hidden", "true", 1, "pi", "pi-map-marker"], ["aria-hidden", "true", 1, "typing-indicator"]], template: function VirtualAssistantWidget_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, VirtualAssistantWidget_Conditional_0_Template, 42, 8, "section", 1);
      \u0275\u0275elementStart(1, "button", 2);
      \u0275\u0275listener("click", function VirtualAssistantWidget_Template_button_click_1_listener() {
        return ctx.toggle();
      });
      \u0275\u0275element(2, "i", 3);
      \u0275\u0275conditionalCreate(3, VirtualAssistantWidget_Conditional_3_Template, 2, 0, "span", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isOpen() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("is-open", ctx.isOpen());
      \u0275\u0275attribute("aria-expanded", ctx.isOpen())("aria-label", ctx.isOpen() ? "Fermer l\u2019assistante Terra Nova" : "Parler \xE0 l\u2019assistante Terra Nova");
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.isOpen() ? "pi pi-times" : "pi pi-comments");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isOpen() ? 3 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --assistant-primary: #087f74;\n  --assistant-ink: #17332e;\n  --assistant-muted: #71817c;\n  --assistant-line: #e8eeeb;\n  --assistant-paper: #ffffff;\n  font-family: var(--font-family, inherit);\n}\n.assistant-launcher[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1102;\n  inset-inline-end: clamp(1rem, 3vw, 2rem);\n  inset-block-end: clamp(1rem, 3vw, 2rem);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  min-width: 3.6rem;\n  height: 3.6rem;\n  padding-inline: 1rem;\n  border: 0;\n  border-radius: 999px;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #0a9282,\n      #08756b);\n  box-shadow: 0 5px 14px rgba(16, 58, 48, 0.2509803922), 0 1px 3px rgba(16, 58, 48, 0.1019607843);\n  cursor: pointer;\n  transition:\n    transform 180ms ease,\n    box-shadow 180ms ease,\n    background 180ms ease;\n}\n.assistant-launcher[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(16, 58, 48, 0.2705882353), 0 1px 3px rgba(16, 58, 48, 0.1254901961);\n}\n.assistant-launcher[_ngcontent-%COMP%]:focus-visible, \n.assistant-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #e8b85b;\n  outline-offset: 3px;\n}\n.assistant-launcher[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.launcher-label[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 650;\n}\n.assistant-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1101;\n  inset-inline-end: clamp(1rem, 3vw, 2rem);\n  inset-block-end: calc(clamp(1rem, 3vw, 2rem) + 4.45rem);\n  display: flex;\n  flex-direction: column;\n  width: min(390px, 100vw - 2rem);\n  height: min(560px, 100dvh - 8rem);\n  min-height: 350px;\n  overflow: hidden;\n  border: 1px solid #e6ece8;\n  border-radius: 1.1rem;\n  color: var(--assistant-ink);\n  background: var(--assistant-paper);\n  box-shadow: 0 16px 60px rgba(24, 61, 48, 0.1490196078), 0 3px 12px rgba(24, 61, 48, 0.0823529412);\n  animation: _ngcontent-%COMP%_assistant-appear 180ms ease-out;\n}\n.assistant-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  min-height: 72px;\n  padding: 0.8rem 0.9rem;\n  border-bottom: 1px solid var(--assistant-line);\n  background:\n    linear-gradient(\n      115deg,\n      #f1faf7,\n      #f8fbf7);\n}\n.assistant-avatar[_ngcontent-%COMP%], \n.message-avatar[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2.45rem;\n  height: 2.45rem;\n  border-radius: 50%;\n  color: var(--assistant-primary);\n  background: #e2f3eb;\n}\n.assistant-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n}\n.assistant-identity[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.assistant-identity[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.18rem;\n  font-size: 0.94rem;\n  font-weight: 720;\n}\n.assistant-identity[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  margin: 0;\n  color: var(--assistant-muted);\n  font-size: 0.72rem;\n}\n.online-dot[_ngcontent-%COMP%] {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #25a878;\n  box-shadow: 0 0 0 3px rgba(37, 168, 120, 0.1058823529);\n}\n.icon-button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border: 0;\n  border-radius: 0.5rem;\n  color: #71817c;\n  background: transparent;\n  cursor: pointer;\n}\n.icon-button[_ngcontent-%COMP%]:hover {\n  color: var(--assistant-primary);\n  background: #eaf3ef;\n}\n.assistant-messages[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 0.85rem;\n  overflow: auto;\n  padding: 1.1rem 0.95rem;\n  overscroll-behavior: contain;\n  scrollbar-color: #d5e1db transparent;\n  scrollbar-width: thin;\n}\n.welcome-message[_ngcontent-%COMP%] {\n  padding-top: 0.45rem;\n}\n.welcome-sparkle[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 2.8rem;\n  height: 2.8rem;\n  margin-bottom: 1rem;\n  border-radius: 0.85rem;\n  color: #118576;\n  background: #ecf7f1;\n  font-size: 1.3rem;\n}\n.welcome-message[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.45rem;\n  color: var(--assistant-ink);\n  font-size: 1.03rem;\n  line-height: 1.45;\n}\n.welcome-message[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--assistant-muted);\n  font-size: 0.8rem;\n  line-height: 1.55;\n}\n.suggestions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n}\n.suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.66rem 0.75rem;\n  border: 1px solid #e6eeea;\n  border-radius: 0.65rem;\n  color: #314842;\n  background: #fff;\n  font: inherit;\n  font-size: 0.76rem;\n  text-align: start;\n  cursor: pointer;\n  transition: border-color 150ms, background 150ms;\n}\n.suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: #a4d3c1;\n  background: #f5faf7;\n}\n.suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.72rem;\n}\n.message-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.5rem;\n  animation: _ngcontent-%COMP%_assistant-appear 150ms ease-out;\n}\n.message-row[_ngcontent-%COMP%]   .message-avatar[_ngcontent-%COMP%] {\n  width: 1.75rem;\n  height: 1.75rem;\n}\n.message-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.reply-card[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  max-width: 85%;\n}\n.reply-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.4rem 0.6rem;\n  margin: 0 0 0.4rem;\n  color: #30463f;\n  font-size: 0.77rem;\n}\n.reply-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 680;\n}\n.reply-format[_ngcontent-%COMP%] {\n  padding: 0.18rem 0.45rem;\n  border-radius: 999px;\n  color: var(--assistant-primary);\n  background: #eaf5ef;\n  font-size: 0.64rem;\n  font-weight: 620;\n}\n.reply-card[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%] {\n  max-width: none;\n}\n.reply-steps[_ngcontent-%COMP%], \n.reply-notes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.42rem;\n  margin: 0.55rem 0 0;\n  padding-inline-start: 1.35rem;\n  color: #445750;\n  font-size: 0.77rem;\n  line-height: 1.55;\n}\n.reply-steps.as-checklist[_ngcontent-%COMP%] {\n  padding-inline-start: 0;\n  list-style: none;\n}\n.reply-steps.as-checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n}\n.reply-steps.as-checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2610";\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.95rem;\n}\n.reply-notes[_ngcontent-%COMP%] {\n  color: #71817c;\n  font-size: 0.73rem;\n}\n.service-recommendations[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  margin-top: 0.7rem;\n}\n.service-recommendations-title[_ngcontent-%COMP%] {\n  color: #425b52;\n  font-size: 0.7rem;\n  font-weight: 650;\n}\n.service-recommendation[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.32rem;\n  padding: 0.65rem;\n  border: 1px solid #e4eee8;\n  border-radius: 0.7rem;\n  background: #fbfdfb;\n}\n.service-category[_ngcontent-%COMP%] {\n  color: var(--assistant-primary);\n  font-size: 0.63rem;\n  font-weight: 650;\n  text-transform: uppercase;\n  letter-spacing: 0.035em;\n}\n.service-recommendation[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  color: #283e37;\n  font-size: 0.78rem;\n}\n.service-recommendation[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #65766f;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.service-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.4rem;\n  color: #71817c;\n  font-size: 0.66rem;\n  line-height: 1.4;\n  overflow-wrap: anywhere;\n}\n.service-detail[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.65rem;\n}\n.service-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  gap: 0.35rem;\n  margin-top: 0.12rem;\n  padding: 0.35rem 0.55rem;\n  border-radius: 0.45rem;\n  color: var(--assistant-primary);\n  background: #eaf5ef;\n  font-size: 0.7rem;\n  font-weight: 650;\n  text-decoration: none;\n}\n.service-link[_ngcontent-%COMP%]:hover {\n  background: #dff0e7;\n}\n.reply-follow-up[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0;\n  color: var(--assistant-primary);\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n.message-bubble[_ngcontent-%COMP%] {\n  max-width: 83%;\n  margin: 0;\n  padding: 0.68rem 0.83rem;\n  border-radius: 0.9rem 0.9rem 0.9rem 0.25rem;\n  color: #30413b;\n  background: #f2f5f3;\n  font-size: 0.8rem;\n  line-height: 1.6;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n.message-row.from-user[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n}\n.from-user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%] {\n  border-radius: 0.9rem 0.9rem 0.25rem 0.9rem;\n  color: #fff;\n  background: var(--assistant-primary);\n}\n.typing-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n  padding: 0.8rem;\n  border-radius: 0.8rem;\n  background: #f2f5f3;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 0.35rem;\n  height: 0.35rem;\n  border-radius: 50%;\n  background: #8baba0;\n  animation: _ngcontent-%COMP%_typing-bounce 900ms ease-in-out infinite alternate;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 180ms;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 360ms;\n}\n.error-message[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid #f0dddd;\n  border-radius: 0.65rem;\n  color: #963f3f;\n  background: #fff7f6;\n  font-size: 0.75rem;\n  line-height: 1.5;\n}\n.composer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.55rem;\n  margin: 0 0.8rem;\n  padding: 0.55rem 0.6rem 0.55rem 0.85rem;\n  border: 1px solid #e1e9e4;\n  border-radius: 0.8rem;\n  background: #fff;\n  transition: border-color 150ms, box-shadow 150ms;\n}\n.assistant-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin: 0 0.8rem;\n}\n.assistant-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .composer[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.format-picker[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #74817b;\n  font-size: 0.69rem;\n}\n.format-picker[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  max-width: 64%;\n  padding: 0.35rem 1.7rem 0.35rem 0.55rem;\n  border: 1px solid #e1e9e4;\n  border-radius: 0.5rem;\n  color: #36534a;\n  background-color: #fff;\n  font: inherit;\n  font-size: 0.7rem;\n  cursor: pointer;\n}\n.format-picker[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #087f74;\n  outline-offset: 2px;\n}\n.composer[_ngcontent-%COMP%]:focus-within {\n  border-color: #80b9a7;\n  box-shadow: 0 0 0 3px rgba(18, 132, 117, 0.0745098039);\n}\n.composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  max-height: 100px;\n  resize: none;\n  border: 0;\n  outline: 0;\n  color: #283e37;\n  background: transparent;\n  font: inherit;\n  font-size: 0.8rem;\n  line-height: 1.5;\n}\n.composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder {\n  color: #97a39e;\n}\n.composer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus-visible {\n  outline: none;\n}\n.send-button[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border: 0;\n  border-radius: 0.6rem;\n  color: #fff;\n  background: var(--assistant-primary);\n  cursor: pointer;\n  transition: background 150ms;\n}\n.send-button[_ngcontent-%COMP%]:disabled {\n  color: #a5b0ab;\n  background: #eef1ef;\n  cursor: not-allowed;\n}\n.disclaimer[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.55rem 1rem 0.75rem;\n  color: #909c96;\n  font-size: 0.63rem;\n  text-align: center;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n@keyframes _ngcontent-%COMP%_assistant-appear {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_typing-bounce {\n  to {\n    transform: translateY(-4px);\n    opacity: 0.55;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], \n   *[_ngcontent-%COMP%]::before, \n   *[_ngcontent-%COMP%]::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    scroll-behavior: auto !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n@media (max-width: 480px) {\n  .assistant-panel[_ngcontent-%COMP%] {\n    inset-inline-end: 0.65rem;\n    inset-block-end: calc(env(safe-area-inset-bottom, 0px) + 5rem);\n    width: calc(100vw - 1.3rem);\n    height: min(580px, 100dvh - 6.5rem);\n    max-height: calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 6rem);\n  }\n  .assistant-launcher[_ngcontent-%COMP%] {\n    inset-inline-end: 1rem;\n    inset-block-end: calc(env(safe-area-inset-bottom, 0px) + 1rem);\n  }\n}\n/*# sourceMappingURL=virtual-assistant-widget.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualAssistantWidget, [{
    type: Component,
    args: [{ selector: "app-virtual-assistant-widget", standalone: true, imports: [CommonModule, FormsModule, RouterLink], template: `@if (isOpen()) {
    <section class="assistant-panel" role="dialog" aria-labelledby="assistant-title" aria-modal="false">
        <header class="assistant-header">
            <span class="assistant-avatar" aria-hidden="true"><i class="pi pi-sparkles"></i></span>
            <div class="assistant-identity">
                <h2 id="assistant-title">Terra Nova</h2>
                <p><span class="online-dot"></span>Votre assistante virtuelle</p>
            </div>
            <button class="icon-button" type="button" aria-label="Nouvelle conversation" title="Nouvelle conversation" (click)="clearConversation()">
                <i class="pi pi-refresh" aria-hidden="true"></i>
            </button>
            <button class="icon-button" type="button" aria-label="Fermer l\u2019assistante" title="Fermer" (click)="toggle()">
                <i class="pi pi-times" aria-hidden="true"></i>
            </button>
        </header>

        <div #messageLog class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation avec l\u2019assistante">
            @if (messages().length === 0) {
                <div class="welcome-message">
                    <span class="welcome-sparkle" aria-hidden="true">\u2733</span>
                    <h3>Bonjour ! Comment puis-je vous aider ?</h3>
                    <p>Je vous accompagne pour d\xE9couvrir les services et les d\xE9marches sur Terra Nova.</p>
                    <div class="suggestions" aria-label="Suggestions">
                        <button type="button" (click)="startSuggestedMessage('Comment signaler un probl\xE8me dans mon quartier ?')">Signaler un probl\xE8me <i class="pi pi-arrow-up-right" aria-hidden="true"></i></button>
                        <button type="button" (click)="startSuggestedMessage('Comment trouver les services de ma mairie ?')">Trouver un service municipal <i class="pi pi-arrow-up-right" aria-hidden="true"></i></button>
                        <button type="button" (click)="startSuggestedMessage('Comment suivre mes demandes ?')">Suivre une demande <i class="pi pi-arrow-up-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            }

            @for (message of messages(); track $index) {
                <div class="message-row" [class.from-user]="message.role === 'user'">
                    @if (message.role === 'assistant') {
                        <span class="message-avatar" aria-hidden="true"><i class="pi pi-sparkles"></i></span>
                        <article class="reply-card">
                            <div class="reply-heading">
                                <strong>{{ message.content.title }}</strong>
                                <span class="reply-format">{{ formatLabel(message.content.format) }}</span>
                            </div>
                            <p class="message-bubble">{{ message.content.message }}</p>
                            @if (message.content.steps.length) {
                                <ol class="reply-steps" [class.as-checklist]="message.content.format === 'checklist'">
                                    @for (step of message.content.steps; track $index) {
                                        <li>{{ step }}</li>
                                    }
                                </ol>
                            }
                            @if (message.content.notes.length) {
                                <ul class="reply-notes">
                                    @for (note of message.content.notes; track $index) { <li>{{ note }}</li> }
                                </ul>
                            }
                            @if (message.content.recommended_services.length) {
                                <div class="service-recommendations">
                                    <span class="service-recommendations-title">Services municipaux pertinents</span>
                                    @for (service of message.content.recommended_services; track service.id) {
                                        <article class="service-recommendation">
                                            <span class="service-category">{{ service.category }}</span>
                                            <strong>{{ service.name }}</strong>
                                            <p>{{ service.description }}</p>
                                            @if (service.address) {
                                                <span class="service-detail"><i class="pi pi-map-marker" aria-hidden="true"></i>{{ service.address }}</span>
                                            }
                                            <span class="service-detail"><i class="pi pi-clock" aria-hidden="true"></i>{{ service.opening_hours }}</span>
                                            <span class="service-detail"><i class="pi pi-phone" aria-hidden="true"></i>{{ service.contact_details }}</span>
                                            <a class="service-link" [routerLink]="['/municipal/services']" [queryParams]="{ search: service.name }">
                                                Voir ce service <i class="pi pi-arrow-up-right" aria-hidden="true"></i>
                                            </a>
                                        </article>
                                    }
                                </div>
                            }
                            @if (message.content.follow_up) {
                                <p class="reply-follow-up">{{ message.content.follow_up }}</p>
                            }
                        </article>
                    } @else {
                        <p class="message-bubble">{{ message.content }}</p>
                    }
                </div>
            }

            @if (isSending()) {
                <div class="message-row" aria-label="L\u2019assistante r\xE9dige sa r\xE9ponse">
                    <span class="message-avatar" aria-hidden="true"><i class="pi pi-sparkles"></i></span>
                    <div class="typing-indicator" aria-hidden="true"><span></span><span></span><span></span></div>
                </div>
            }

            @if (errorMessage()) {
                <p class="error-message" role="alert">{{ errorMessage() }}</p>
            }
        </div>

        <form (ngSubmit)="sendMessage()">
            <label class="format-picker">
                <span>Format de r\xE9ponse</span>
                <select name="responsePreference" [(ngModel)]="responsePreference" [disabled]="isSending()">
                    <option value="auto">Automatique</option>
                    <option value="concise">R\xE9ponse concise</option>
                    <option value="steps">\xC9tapes</option>
                    <option value="checklist">Checklist</option>
                </select>
            </label>
            <div class="composer">
                <label class="sr-only" for="assistant-input">Votre message</label>
                <textarea
                    id="assistant-input"
                    name="message"
                    [(ngModel)]="draft"
                    (keydown.enter)="onEnter($event)"
                    placeholder="Posez votre question\u2026"
                    rows="1"
                    maxlength="1200"
                    [disabled]="isSending()"
                    aria-describedby="assistant-disclaimer"
                ></textarea>
                <button class="send-button" type="submit" aria-label="Envoyer le message" [disabled]="!draft.trim() || isSending() || draft.length > 1200">
                    <i class="pi pi-arrow-up" aria-hidden="true"></i>
                </button>
            </div>
        </form>
        <p id="assistant-disclaimer" class="disclaimer">Assistant IA \xB7 Ne partagez aucun mot de passe ni code confidentiel.</p>
    </section>
}

<button
    class="assistant-launcher"
    type="button"
    [class.is-open]="isOpen()"
    [attr.aria-expanded]="isOpen()"
    [attr.aria-label]="isOpen() ? 'Fermer l\u2019assistante Terra Nova' : 'Parler \xE0 l\u2019assistante Terra Nova'"
    (click)="toggle()"
>
    <i [class]="isOpen() ? 'pi pi-times' : 'pi pi-comments'" aria-hidden="true"></i>
    @if (!isOpen()) { <span class="launcher-label">Besoin d\u2019aide ?</span> }
</button>
`, styles: ['@charset "UTF-8";\n\n/* src/app/shared/virtual-assistant/virtual-assistant-widget.scss */\n:host {\n  --assistant-primary: #087f74;\n  --assistant-ink: #17332e;\n  --assistant-muted: #71817c;\n  --assistant-line: #e8eeeb;\n  --assistant-paper: #ffffff;\n  font-family: var(--font-family, inherit);\n}\n.assistant-launcher {\n  position: fixed;\n  z-index: 1102;\n  inset-inline-end: clamp(1rem, 3vw, 2rem);\n  inset-block-end: clamp(1rem, 3vw, 2rem);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n  min-width: 3.6rem;\n  height: 3.6rem;\n  padding-inline: 1rem;\n  border: 0;\n  border-radius: 999px;\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #0a9282,\n      #08756b);\n  box-shadow: 0 5px 14px rgba(16, 58, 48, 0.2509803922), 0 1px 3px rgba(16, 58, 48, 0.1019607843);\n  cursor: pointer;\n  transition:\n    transform 180ms ease,\n    box-shadow 180ms ease,\n    background 180ms ease;\n}\n.assistant-launcher:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(16, 58, 48, 0.2705882353), 0 1px 3px rgba(16, 58, 48, 0.1254901961);\n}\n.assistant-launcher:focus-visible,\n.assistant-panel button:focus-visible,\n.composer textarea:focus-visible {\n  outline: 3px solid #e8b85b;\n  outline-offset: 3px;\n}\n.assistant-launcher > i {\n  font-size: 1.2rem;\n}\n.launcher-label {\n  font-size: 0.88rem;\n  font-weight: 650;\n}\n.assistant-panel {\n  position: fixed;\n  z-index: 1101;\n  inset-inline-end: clamp(1rem, 3vw, 2rem);\n  inset-block-end: calc(clamp(1rem, 3vw, 2rem) + 4.45rem);\n  display: flex;\n  flex-direction: column;\n  width: min(390px, 100vw - 2rem);\n  height: min(560px, 100dvh - 8rem);\n  min-height: 350px;\n  overflow: hidden;\n  border: 1px solid #e6ece8;\n  border-radius: 1.1rem;\n  color: var(--assistant-ink);\n  background: var(--assistant-paper);\n  box-shadow: 0 16px 60px rgba(24, 61, 48, 0.1490196078), 0 3px 12px rgba(24, 61, 48, 0.0823529412);\n  animation: assistant-appear 180ms ease-out;\n}\n.assistant-header {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  min-height: 72px;\n  padding: 0.8rem 0.9rem;\n  border-bottom: 1px solid var(--assistant-line);\n  background:\n    linear-gradient(\n      115deg,\n      #f1faf7,\n      #f8fbf7);\n}\n.assistant-avatar,\n.message-avatar {\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2.45rem;\n  height: 2.45rem;\n  border-radius: 50%;\n  color: var(--assistant-primary);\n  background: #e2f3eb;\n}\n.assistant-avatar i {\n  font-size: 1.05rem;\n}\n.assistant-identity {\n  flex: 1;\n}\n.assistant-identity h2 {\n  margin: 0 0 0.18rem;\n  font-size: 0.94rem;\n  font-weight: 720;\n}\n.assistant-identity p {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  margin: 0;\n  color: var(--assistant-muted);\n  font-size: 0.72rem;\n}\n.online-dot {\n  width: 0.45rem;\n  height: 0.45rem;\n  border-radius: 50%;\n  background: #25a878;\n  box-shadow: 0 0 0 3px rgba(37, 168, 120, 0.1058823529);\n}\n.icon-button {\n  display: grid;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border: 0;\n  border-radius: 0.5rem;\n  color: #71817c;\n  background: transparent;\n  cursor: pointer;\n}\n.icon-button:hover {\n  color: var(--assistant-primary);\n  background: #eaf3ef;\n}\n.assistant-messages {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 0.85rem;\n  overflow: auto;\n  padding: 1.1rem 0.95rem;\n  overscroll-behavior: contain;\n  scrollbar-color: #d5e1db transparent;\n  scrollbar-width: thin;\n}\n.welcome-message {\n  padding-top: 0.45rem;\n}\n.welcome-sparkle {\n  display: grid;\n  place-items: center;\n  width: 2.8rem;\n  height: 2.8rem;\n  margin-bottom: 1rem;\n  border-radius: 0.85rem;\n  color: #118576;\n  background: #ecf7f1;\n  font-size: 1.3rem;\n}\n.welcome-message h3 {\n  margin: 0 0 0.45rem;\n  color: var(--assistant-ink);\n  font-size: 1.03rem;\n  line-height: 1.45;\n}\n.welcome-message > p {\n  margin: 0;\n  color: var(--assistant-muted);\n  font-size: 0.8rem;\n  line-height: 1.55;\n}\n.suggestions {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n}\n.suggestions button {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.66rem 0.75rem;\n  border: 1px solid #e6eeea;\n  border-radius: 0.65rem;\n  color: #314842;\n  background: #fff;\n  font: inherit;\n  font-size: 0.76rem;\n  text-align: start;\n  cursor: pointer;\n  transition: border-color 150ms, background 150ms;\n}\n.suggestions button:hover {\n  border-color: #a4d3c1;\n  background: #f5faf7;\n}\n.suggestions button i {\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.72rem;\n}\n.message-row {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.5rem;\n  animation: assistant-appear 150ms ease-out;\n}\n.message-row .message-avatar {\n  width: 1.75rem;\n  height: 1.75rem;\n}\n.message-avatar i {\n  font-size: 0.75rem;\n}\n.reply-card {\n  flex: 1;\n  min-width: 0;\n  max-width: 85%;\n}\n.reply-heading {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.4rem 0.6rem;\n  margin: 0 0 0.4rem;\n  color: #30463f;\n  font-size: 0.77rem;\n}\n.reply-heading strong {\n  font-weight: 680;\n}\n.reply-format {\n  padding: 0.18rem 0.45rem;\n  border-radius: 999px;\n  color: var(--assistant-primary);\n  background: #eaf5ef;\n  font-size: 0.64rem;\n  font-weight: 620;\n}\n.reply-card .message-bubble {\n  max-width: none;\n}\n.reply-steps,\n.reply-notes {\n  display: flex;\n  flex-direction: column;\n  gap: 0.42rem;\n  margin: 0.55rem 0 0;\n  padding-inline-start: 1.35rem;\n  color: #445750;\n  font-size: 0.77rem;\n  line-height: 1.55;\n}\n.reply-steps.as-checklist {\n  padding-inline-start: 0;\n  list-style: none;\n}\n.reply-steps.as-checklist li {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n}\n.reply-steps.as-checklist li::before {\n  content: "\\2610";\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.95rem;\n}\n.reply-notes {\n  color: #71817c;\n  font-size: 0.73rem;\n}\n.service-recommendations {\n  display: grid;\n  gap: 0.45rem;\n  margin-top: 0.7rem;\n}\n.service-recommendations-title {\n  color: #425b52;\n  font-size: 0.7rem;\n  font-weight: 650;\n}\n.service-recommendation {\n  display: grid;\n  gap: 0.32rem;\n  padding: 0.65rem;\n  border: 1px solid #e4eee8;\n  border-radius: 0.7rem;\n  background: #fbfdfb;\n}\n.service-category {\n  color: var(--assistant-primary);\n  font-size: 0.63rem;\n  font-weight: 650;\n  text-transform: uppercase;\n  letter-spacing: 0.035em;\n}\n.service-recommendation > strong {\n  color: #283e37;\n  font-size: 0.78rem;\n}\n.service-recommendation > p {\n  margin: 0;\n  color: #65766f;\n  font-size: 0.7rem;\n  line-height: 1.45;\n}\n.service-detail {\n  display: flex;\n  align-items: baseline;\n  gap: 0.4rem;\n  color: #71817c;\n  font-size: 0.66rem;\n  line-height: 1.4;\n  overflow-wrap: anywhere;\n}\n.service-detail i {\n  flex: 0 0 auto;\n  color: var(--assistant-primary);\n  font-size: 0.65rem;\n}\n.service-link {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  gap: 0.35rem;\n  margin-top: 0.12rem;\n  padding: 0.35rem 0.55rem;\n  border-radius: 0.45rem;\n  color: var(--assistant-primary);\n  background: #eaf5ef;\n  font-size: 0.7rem;\n  font-weight: 650;\n  text-decoration: none;\n}\n.service-link:hover {\n  background: #dff0e7;\n}\n.reply-follow-up {\n  margin: 0.55rem 0 0;\n  color: var(--assistant-primary);\n  font-size: 0.76rem;\n  line-height: 1.5;\n}\n.message-bubble {\n  max-width: 83%;\n  margin: 0;\n  padding: 0.68rem 0.83rem;\n  border-radius: 0.9rem 0.9rem 0.9rem 0.25rem;\n  color: #30413b;\n  background: #f2f5f3;\n  font-size: 0.8rem;\n  line-height: 1.6;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n.message-row.from-user {\n  justify-content: flex-end;\n}\n.from-user .message-bubble {\n  border-radius: 0.9rem 0.9rem 0.25rem 0.9rem;\n  color: #fff;\n  background: var(--assistant-primary);\n}\n.typing-indicator {\n  display: flex;\n  align-items: center;\n  gap: 0.28rem;\n  padding: 0.8rem;\n  border-radius: 0.8rem;\n  background: #f2f5f3;\n}\n.typing-indicator span {\n  width: 0.35rem;\n  height: 0.35rem;\n  border-radius: 50%;\n  background: #8baba0;\n  animation: typing-bounce 900ms ease-in-out infinite alternate;\n}\n.typing-indicator span:nth-child(2) {\n  animation-delay: 180ms;\n}\n.typing-indicator span:nth-child(3) {\n  animation-delay: 360ms;\n}\n.error-message {\n  margin: 0;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid #f0dddd;\n  border-radius: 0.65rem;\n  color: #963f3f;\n  background: #fff7f6;\n  font-size: 0.75rem;\n  line-height: 1.5;\n}\n.composer {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.55rem;\n  margin: 0 0.8rem;\n  padding: 0.55rem 0.6rem 0.55rem 0.85rem;\n  border: 1px solid #e1e9e4;\n  border-radius: 0.8rem;\n  background: #fff;\n  transition: border-color 150ms, box-shadow 150ms;\n}\n.assistant-panel form {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin: 0 0.8rem;\n}\n.assistant-panel form .composer {\n  margin: 0;\n}\n.format-picker {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #74817b;\n  font-size: 0.69rem;\n}\n.format-picker select {\n  max-width: 64%;\n  padding: 0.35rem 1.7rem 0.35rem 0.55rem;\n  border: 1px solid #e1e9e4;\n  border-radius: 0.5rem;\n  color: #36534a;\n  background-color: #fff;\n  font: inherit;\n  font-size: 0.7rem;\n  cursor: pointer;\n}\n.format-picker select:focus-visible {\n  outline: 2px solid #087f74;\n  outline-offset: 2px;\n}\n.composer:focus-within {\n  border-color: #80b9a7;\n  box-shadow: 0 0 0 3px rgba(18, 132, 117, 0.0745098039);\n}\n.composer textarea {\n  flex: 1;\n  min-width: 0;\n  max-height: 100px;\n  resize: none;\n  border: 0;\n  outline: 0;\n  color: #283e37;\n  background: transparent;\n  font: inherit;\n  font-size: 0.8rem;\n  line-height: 1.5;\n}\n.composer textarea::placeholder {\n  color: #97a39e;\n}\n.composer textarea:focus-visible {\n  outline: none;\n}\n.send-button {\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 2rem;\n  height: 2rem;\n  border: 0;\n  border-radius: 0.6rem;\n  color: #fff;\n  background: var(--assistant-primary);\n  cursor: pointer;\n  transition: background 150ms;\n}\n.send-button:disabled {\n  color: #a5b0ab;\n  background: #eef1ef;\n  cursor: not-allowed;\n}\n.disclaimer {\n  margin: 0;\n  padding: 0.55rem 1rem 0.75rem;\n  color: #909c96;\n  font-size: 0.63rem;\n  text-align: center;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  clip-path: inset(50%);\n}\n@keyframes assistant-appear {\n  from {\n    opacity: 0;\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes typing-bounce {\n  to {\n    transform: translateY(-4px);\n    opacity: 0.55;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    scroll-behavior: auto !important;\n    transition-duration: 0.01ms !important;\n  }\n}\n@media (max-width: 480px) {\n  .assistant-panel {\n    inset-inline-end: 0.65rem;\n    inset-block-end: calc(env(safe-area-inset-bottom, 0px) + 5rem);\n    width: calc(100vw - 1.3rem);\n    height: min(580px, 100dvh - 6.5rem);\n    max-height: calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 6rem);\n  }\n  .assistant-launcher {\n    inset-inline-end: 1rem;\n    inset-block-end: calc(env(safe-area-inset-bottom, 0px) + 1rem);\n  }\n}\n/*# sourceMappingURL=virtual-assistant-widget.css.map */\n'] }]
  }], null, { messagesElement: [{ type: ViewChild, args: ["messageLog", { isSignal: true }] }], closeOnEscape: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VirtualAssistantWidget, { className: "VirtualAssistantWidget", filePath: "src/app/shared/virtual-assistant/virtual-assistant-widget.ts", lineNumber: 46 });
})();

// src/app.component.ts
var AppComponent = class _AppComponent {
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet")(1, "app-virtual-assistant-widget");
    }
  }, dependencies: [RouterModule, RouterOutlet, VirtualAssistantWidget], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterModule, VirtualAssistantWidget],
      template: `<router-outlet></router-outlet><app-virtual-assistant-widget />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app.component.ts", lineNumber: 11 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/common/locales/fr.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.dev/license
   *)
*/
//# sourceMappingURL=main.js.map
