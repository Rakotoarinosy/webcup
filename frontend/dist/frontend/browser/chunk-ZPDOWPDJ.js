import {
  Injectable,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-E5MYAYBP.js";

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
    document.startViewTransition(() => {
      this.toggleDarkMode(config);
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

export {
  LayoutService
};
//# sourceMappingURL=chunk-ZPDOWPDJ.js.map
