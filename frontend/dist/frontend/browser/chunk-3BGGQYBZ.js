import {
  HttpClient,
  Injectable,
  __spreadValues,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/journal/journal.model.ts
var ACTIVITY_TYPES = [
  { value: "created", label: "Demande enregistr\xE9e" },
  { value: "assigned", label: "Attribution \xE0 un agent" },
  { value: "status_changed", label: "Changement de statut" },
  { value: "resolved", label: "Demande r\xE9solue" },
  { value: "rejected", label: "Demande rejet\xE9e" },
  { value: "priority_changed", label: "Changement de priorit\xE9" },
  { value: "updated", label: "Demande modifi\xE9e" }
];
var AUDIT_LABELS = {
  account_created: "Compte cr\xE9\xE9",
  account_updated: "Compte modifi\xE9",
  account_role_changed: "R\xF4le modifi\xE9",
  account_password_reset: "Mot de passe r\xE9initialis\xE9",
  account_deactivated: "Compte d\xE9sactiv\xE9",
  account_reactivated: "Compte r\xE9activ\xE9",
  account_deleted: "Compte supprim\xE9",
  institut_created: "Institut cr\xE9\xE9",
  institut_updated: "Institut modifi\xE9",
  institut_manager_changed: "Responsable d\u2019institut chang\xE9",
  agent_created: "Profil agent cr\xE9\xE9",
  agent_moved: "Agent chang\xE9 d\u2019institut",
  agent_activated: "Agent r\xE9activ\xE9",
  agent_deactivated: "Agent d\xE9sactiv\xE9",
  agent_status_changed: "Disponibilit\xE9 de l\u2019agent modifi\xE9e",
  data_concern_reviewed: "Signalement sur les donn\xE9es pris en charge",
  data_concern_answered: "R\xE9ponse \xE0 un signalement sur les donn\xE9es"
};
var FIELD_LABELS = {
  name: "nom",
  email: "email",
  role: "r\xF4le",
  description: "description",
  categories: "cat\xE9gories",
  is_active: "actif",
  manager: "responsable",
  institut: "institut",
  status: "disponibilit\xE9"
};
function auditDetails(entry) {
  return Object.entries(entry.details).map(([field, value]) => {
    const label = FIELD_LABELS[field] ?? field;
    if (value && typeof value === "object" && "from" in value && "to" in value) {
      const change = value;
      return `${label} : ${show(change.from)} \u2192 ${show(change.to)}`;
    }
    return `${label} : ${show(value)}`;
  }).join(" ; ");
}
function show(value) {
  if (value === null || value === void 0 || value === "")
    return "\u2014";
  if (Array.isArray(value))
    return value.join(", ");
  if (typeof value === "boolean")
    return value ? "oui" : "non";
  return String(value);
}
function dayBounds(filters) {
  const bounds = {};
  if (filters.since)
    bounds.since = (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).toISOString();
  if (filters.until) {
    const end = /* @__PURE__ */ new Date(`${filters.until}T00:00:00`);
    end.setDate(end.getDate() + 1);
    bounds.until = end.toISOString();
  }
  return bounds;
}
function toCsv(header, rows) {
  const cell = (value) => `"${value.replace(/"/g, '""')}"`;
  return "\uFEFF" + [header, ...rows].map((row) => row.map(cell).join(";")).join("\r\n");
}

// src/app/journal/journal.service.ts
var PAGE_SIZE = 20;
var JournalService = class _JournalService {
  http = inject(HttpClient);
  activity(filters, pageSize = PAGE_SIZE) {
    return this.http.get(`${environment.apiUrl}/requests/activity`, { params: this.params(filters, "type", pageSize) });
  }
  audit(filters, pageSize = PAGE_SIZE) {
    return this.http.get(`${environment.apiUrl}/audit`, { params: this.params(filters, "action", pageSize) });
  }
  params(filters, typeParam, pageSize) {
    const params = __spreadValues({ page: filters.page, page_size: pageSize }, dayBounds(filters));
    if (filters.type)
      params[typeParam] = filters.type;
    if (filters.search.trim())
      params["search"] = filters.search.trim();
    return params;
  }
  static \u0275fac = function JournalService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _JournalService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _JournalService, factory: _JournalService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JournalService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ACTIVITY_TYPES,
  AUDIT_LABELS,
  auditDetails,
  toCsv,
  JournalService
};
//# sourceMappingURL=chunk-3BGGQYBZ.js.map
