import {
  CONCERN_STATUS_VALUES,
  CONCERN_TOPIC_VALUES
} from "./chunk-2ZKMMRNY.js";
import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/data-privacy/data-concern.model.ts
var CONCERN_TOPICS = CONCERN_TOPIC_VALUES;
var CONCERN_STATUSES = CONCERN_STATUS_VALUES;
function concernSteps(concern) {
  return [
    { label: "Signalement re\xE7u", date: concern.created_at },
    { label: "Examen par la mairie", date: concern.reviewed_at },
    { label: "R\xE9ponse envoy\xE9e", date: concern.answered_at }
  ];
}
function concernStatusSeverity(status) {
  return status === "R\xE9pondu" ? "success" : status === "Re\xE7u" ? "info" : "warn";
}

// src/app/data-privacy/data-concern.service.ts
var DataConcernService = class _DataConcernService {
  http = inject(HttpClient);
  url = `${environment.apiUrl}/data-concerns`;
  submit(payload) {
    return this.http.post(this.url, payload);
  }
  mine() {
    return this.http.get(`${this.url}/mine`);
  }
  list(status = null) {
    return this.http.get(this.url, { params: status ? { status } : {} });
  }
  review(id) {
    return this.http.post(`${this.url}/${id}/review`, {});
  }
  answer(id, response) {
    return this.http.post(`${this.url}/${id}/answer`, { response });
  }
  static \u0275fac = function DataConcernService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataConcernService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DataConcernService, factory: _DataConcernService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataConcernService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  CONCERN_TOPICS,
  CONCERN_STATUSES,
  concernSteps,
  concernStatusSeverity,
  DataConcernService
};
//# sourceMappingURL=chunk-4ASZPPQ3.js.map
