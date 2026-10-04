import {
  Router
} from "./chunk-F3M422Q6.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-navigation.service.ts
var MunicipalNavigation = class _MunicipalNavigation {
  router = inject(Router);
  path(section = "") {
    const base = this.router.url.startsWith("/home/") ? "/home/municipal" : "/municipal";
    return section ? `${base}/${section}` : base;
  }
  static \u0275fac = function MunicipalNavigation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalNavigation)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MunicipalNavigation, factory: _MunicipalNavigation.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalNavigation, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  MunicipalNavigation
};
//# sourceMappingURL=chunk-TSU7FZ7T.js.map
