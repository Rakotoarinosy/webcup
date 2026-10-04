import {
  RealtimeService
} from "./chunk-R3AFDXWT.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import {
  Injectable,
  Subject,
  debounceTime,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/shared/live-data.service.ts
var LiveDataService = class _LiveDataService {
  changes = new Subject();
  realtime = inject(RealtimeService, { optional: true });
  constructor() {
    this.realtime?.changes$.subscribe(() => this.notifyChange());
  }
  watch(destroyRef, refresh, ready = () => true) {
    this.changes.pipe(debounceTime(50), takeUntilDestroyed(destroyRef)).subscribe(() => {
      if (ready())
        refresh();
    });
  }
  notifyChange() {
    this.changes.next();
  }
  static \u0275fac = function LiveDataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LiveDataService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LiveDataService, factory: _LiveDataService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveDataService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  LiveDataService
};
//# sourceMappingURL=chunk-EJ3WHEDK.js.map
