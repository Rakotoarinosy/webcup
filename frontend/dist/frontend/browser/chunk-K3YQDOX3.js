import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-E5MYAYBP.js";

// src/app/users/user.service.ts
var UserService = class _UserService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/users`;
  list(search) {
    let params = new HttpParams();
    if (search?.trim())
      params = params.set("search", search.trim());
    return this.http.get(this.baseUrl, { params });
  }
  get(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  update(id, payload) {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }
  /** Tous les comptes, filtrables par rôle et par nom / email (admin). */
  listAccounts(role, search) {
    let params = new HttpParams();
    if (role)
      params = params.set("role", role);
    if (search?.trim())
      params = params.set("search", search.trim());
    return this.http.get(`${this.baseUrl}/manage`, { params });
  }
  /** Modification complète d'un compte par l'admin : rôle, activation, mot de passe. */
  updateAccount(id, payload) {
    return this.http.patch(`${this.baseUrl}/manage/${id}`, payload);
  }
  /** Création d'un compte avec un rôle (admin). */
  createAccount(payload) {
    return this.http.post(this.baseUrl, payload);
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
function apiErrorMessage(error) {
  if (!(error instanceof HttpErrorResponse)) {
    return "Erreur inattendue";
  }
  if (error.status === 0) {
    return "API injoignable : le backend est-il lanc\xE9 (make dev dans backend/) ?";
  }
  const detail = error.error?.detail;
  if (typeof detail === "string") {
    return detail;
  }
  if (Array.isArray(detail)) {
    return detail.map((item) => `${item.loc?.at(-1) ?? ""} : ${item.msg}`).join("\n");
  }
  return `Erreur ${error.status}`;
}

export {
  UserService,
  apiErrorMessage
};
//# sourceMappingURL=chunk-K3YQDOX3.js.map
