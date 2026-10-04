import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

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
    return "Connexion au serveur impossible. R\xE9essayez dans quelques instants.";
  }
  const messages = {
    UserAlreadyExistsError: "Cette adresse email est d\xE9j\xE0 utilis\xE9e.",
    UserNotFoundError: "Ce compte n\u2019existe plus. Rechargez la liste.",
    UserConflictError: "Cette adresse email ou cette fiche agent est d\xE9j\xE0 utilis\xE9e, ou la fiche agent n\u2019existe plus.",
    LastAdminError: "Le dernier administrateur actif ne peut pas \xEAtre supprim\xE9, d\xE9sactiv\xE9 ou changer de profil."
  };
  const message = messages[error.error?.error];
  if (message)
    return message;
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
//# sourceMappingURL=chunk-4NHVROSD.js.map
