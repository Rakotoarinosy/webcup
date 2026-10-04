import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/instituts/institut.service.ts
var InstitutService = class _InstitutService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/instituts`;
  list(activeOnly = false) {
    return this.http.get(this.baseUrl, { params: { active_only: activeOnly } });
  }
  get(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  create(payload) {
    return this.http.post(this.baseUrl, payload);
  }
  update(id, payload) {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }
  setManager(id, managerId) {
    return this.http.put(`${this.baseUrl}/${id}/manager`, { manager_id: managerId });
  }
  static \u0275fac = function InstitutService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InstitutService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InstitutService, factory: _InstitutService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InstitutService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  InstitutService
};
//# sourceMappingURL=chunk-KQXKYOP3.js.map
