import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-E5MYAYBP.js";

// src/app/terra-nova/terra-nova.service.ts
var TerraNovaService = class _TerraNovaService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/terra-requests`;
  list() {
    return this.http.get(this.baseUrl);
  }
  /** Lit la session ; le backend resynchronise au passage si ses données ont vieilli. */
  session() {
    return this.http.get(`${this.baseUrl}/session`);
  }
  sync() {
    return this.http.post(`${this.baseUrl}/sync`, {});
  }
  updateStatus(code, status) {
    return this.http.patch(`${this.baseUrl}/${encodeURIComponent(code)}/status`, { status });
  }
  notifications() {
    return this.http.get(`${this.baseUrl}/notifications`);
  }
  markRead(key) {
    return this.http.post(`${this.baseUrl}/notifications/${encodeURIComponent(key)}/read`, {});
  }
  markAllRead() {
    return this.http.post(`${this.baseUrl}/notifications/read-all`, {});
  }
  static \u0275fac = function TerraNovaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TerraNovaService, factory: _TerraNovaService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  TerraNovaService
};
//# sourceMappingURL=chunk-V7U3SW4H.js.map
