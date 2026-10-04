import {
  HttpClient,
  HttpParams,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-content.service.ts
var MunicipalContentService = class _MunicipalContentService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/municipal`;
  services() {
    return this.http.get(`${this.baseUrl}/services`);
  }
  featuredServices() {
    return this.http.get(`${this.baseUrl}/services/featured`);
  }
  popularServices(limit = 6) {
    const params = new HttpParams().set("limit", Math.min(Math.max(limit, 1), 6));
    return this.http.get(`${this.baseUrl}/services/popular`, { params });
  }
  updateServiceLocation(id, location) {
    return this.http.patch(`${this.baseUrl}/services/${encodeURIComponent(id)}/location`, location);
  }
  updateFeaturedService(id, isFeatured, displayOrder) {
    return this.http.patch(`${this.baseUrl}/services/${encodeURIComponent(id)}/featured`, {
      is_featured: isFeatured,
      display_order: displayOrder
    });
  }
  startService(id) {
    return this.http.post(`${this.baseUrl}/services/${encodeURIComponent(id)}/start`, {});
  }
  publications(category) {
    const params = category ? new HttpParams().set("category", category) : void 0;
    return this.http.get(`${this.baseUrl}/publications`, { params });
  }
  managedPublications() {
    return this.http.get(`${this.baseUrl}/publications/manage`);
  }
  createPublication(payload) {
    return this.http.post(`${this.baseUrl}/publications`, payload);
  }
  updatePublication(id, payload) {
    return this.http.patch(`${this.baseUrl}/publications/${encodeURIComponent(id)}`, payload);
  }
  deletePublication(id) {
    return this.http.delete(`${this.baseUrl}/publications/${encodeURIComponent(id)}`);
  }
  viewPublication(id) {
    return this.http.post(`${this.baseUrl}/publications/${encodeURIComponent(id)}/view`, {});
  }
  likePublication(id) {
    return this.http.post(`${this.baseUrl}/publications/${encodeURIComponent(id)}/like`, {});
  }
  publicationComments(id) {
    return this.http.get(`${this.baseUrl}/publications/${encodeURIComponent(id)}/comments`);
  }
  addPublicationComment(id, content) {
    return this.http.post(`${this.baseUrl}/publications/${encodeURIComponent(id)}/comments`, { content });
  }
  sendContact(payload) {
    return this.http.post(`${this.baseUrl}/contact`, payload);
  }
  static \u0275fac = function MunicipalContentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalContentService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MunicipalContentService, factory: _MunicipalContentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalContentService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  MunicipalContentService
};
//# sourceMappingURL=chunk-BJ7LH56I.js.map
