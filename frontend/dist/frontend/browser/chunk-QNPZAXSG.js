import {
  HttpClient,
  HttpParams,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/requests/request.service.ts
var CitizenRequestService = class _CitizenRequestService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/requests`;
  list(query) {
    let params = new HttpParams().set("page", query.page).set("page_size", query.page_size).set("sort_by", query.sort_by).set("sort_order", query.sort_order);
    if (query.search) {
      params = params.set("search", query.search);
    }
    if (query.category) {
      params = params.set("category", query.category);
    }
    if (query.priority) {
      params = params.set("priority", query.priority);
    }
    if (query.status) {
      params = params.set("status", query.status);
    }
    return this.http.get(this.baseUrl, { params });
  }
  get(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  events(id) {
    return this.http.get(`${this.baseUrl}/${id}/events`);
  }
  submit(payload) {
    return this.http.post(this.baseUrl, payload);
  }
  edit(id, payload) {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }
  changeStatus(id, status) {
    return this.http.post(`${this.baseUrl}/${id}/status`, { status });
  }
  assign(id, payload) {
    return this.http.post(`${this.baseUrl}/${id}/assign`, payload);
  }
  analyze(id) {
    return this.http.post(`${this.baseUrl}/${id}/analyze`, {});
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  map(filters = {}) {
    let params = new HttpParams().set("active_only", filters.activeOnly ?? true).set("limit", filters.limit ?? 500);
    if (filters.status) {
      params = params.set("status", filters.status);
    }
    if (filters.category) {
      params = params.set("category", filters.category);
    }
    return this.http.get(`${this.baseUrl}/map`, { params });
  }
  dashboard(days = 7) {
    return this.http.get(`${environment.apiUrl}/dashboard`, { params: { days } });
  }
  static \u0275fac = function CitizenRequestService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CitizenRequestService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CitizenRequestService, factory: _CitizenRequestService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CitizenRequestService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  CitizenRequestService
};
//# sourceMappingURL=chunk-QNPZAXSG.js.map
