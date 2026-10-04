import {
  MunicipalContentService
} from "./chunk-BJ7LH56I.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/municipal/publication-read.service.ts
var PublicationReadService = class _PublicationReadService {
  auth = inject(AuthService);
  content = inject(MunicipalContentService);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  seenIds = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "seenIds" }] : []);
  unreadCount = computed(() => this.publications().filter((publication) => !this.seenIds().has(publication.id)).length, ...ngDevMode ? [{ debugName: "unreadCount" }] : []);
  notificationItems = computed(() => this.publications().map((publication) => ({
    key: `publication:${publication.id}`,
    publicationId: publication.id,
    title: publication.title,
    message: publication.summary,
    created_at: publication.published_at,
    is_read: this.seenIds().has(publication.id)
  })).sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at)), ...ngDevMode ? [{ debugName: "notificationItems" }] : []);
  constructor() {
    this.restore();
    this.refresh();
  }
  refresh() {
    this.content.publications().subscribe({ next: (items) => this.publications.set(items), error: () => void 0 });
  }
  markRead(id) {
    const next = new Set(this.seenIds());
    next.add(id);
    this.seenIds.set(next);
    try {
      localStorage.setItem(this.key(), JSON.stringify([...next]));
    } catch {
    }
  }
  restore() {
    try {
      const value = JSON.parse(localStorage.getItem(this.key()) ?? "[]");
      this.seenIds.set(new Set(Array.isArray(value) ? value : []));
    } catch {
      this.seenIds.set(/* @__PURE__ */ new Set());
    }
  }
  key() {
    return `municipal-publications-read:${this.auth.user()?.id ?? "anonymous"}`;
  }
  static \u0275fac = function PublicationReadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PublicationReadService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicationReadService, factory: _PublicationReadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicationReadService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  PublicationReadService
};
//# sourceMappingURL=chunk-2A6L4AZW.js.map
