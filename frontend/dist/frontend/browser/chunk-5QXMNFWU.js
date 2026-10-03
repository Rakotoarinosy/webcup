import {
  HttpClient,
  HttpParams,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-E5MYAYBP.js";

// src/app/agents/agent.service.ts
var AgentService = class _AgentService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/agents`;
  list(query = {}) {
    let params = new HttpParams();
    if (query.search) {
      params = params.set("search", query.search);
    }
    if (query.institut_id) {
      params = params.set("institut_id", query.institut_id);
    }
    if (query.status) {
      params = params.set("status", query.status);
    }
    if (query.is_active !== void 0) {
      params = params.set("is_active", query.is_active);
    }
    return this.http.get(this.baseUrl, { params });
  }
  get(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  /** Profil de l'agent connecté. */
  me() {
    return this.http.get(`${this.baseUrl}/me`);
  }
  create(payload) {
    return this.http.post(this.baseUrl, payload);
  }
  setStatus(id, status) {
    return this.http.patch(`${this.baseUrl}/${id}/status`, { status });
  }
  move(id, institutId) {
    return this.http.post(`${this.baseUrl}/${id}/move`, { institut_id: institutId });
  }
  deactivate(id) {
    return this.http.post(`${this.baseUrl}/${id}/deactivate`, {});
  }
  activate(id) {
    return this.http.post(`${this.baseUrl}/${id}/activate`, {});
  }
  interventions(id) {
    return this.http.get(`${this.baseUrl}/${id}/interventions`);
  }
  static \u0275fac = function AgentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AgentService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AgentService, factory: _AgentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AgentService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AgentService
};
//# sourceMappingURL=chunk-5QXMNFWU.js.map
