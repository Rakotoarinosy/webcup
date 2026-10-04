import {
  AppFontSize
} from "./chunk-RII5OTZE.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-RD6WJK3U.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-F3M422Q6.js";
import "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import "./chunk-QS2LCQSO.js";
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-layout.ts
var _c0 = () => ({ exact: true });
function MunicipalLayout_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.auth.homeUrl());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.name, " \xB7 Mon espace");
  }
}
function MunicipalLayout_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 9);
    \u0275\u0275text(1, "Se connecter");
    \u0275\u0275elementEnd();
  }
}
var MunicipalLayout = class _MunicipalLayout {
  auth = inject(AuthService);
  /** Lien d'évitement : focus sur le contenu sans changer d'URL (la base href ferait recharger la page). */
  skipToContent(event) {
    event.preventDefault();
    const main = document.getElementById("main-content");
    main?.focus();
    main?.scrollIntoView();
  }
  static \u0275fac = function MunicipalLayout_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalLayout)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalLayout, selectors: [["app-municipal-layout"]], decls: 21, vars: 3, consts: [["href", "#main-content", 1, "skip-link", 3, "click"], [1, "header-row"], ["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "brand"], ["aria-label", "Services municipaux"], ["routerLink", "/municipal", "routerLinkActive", "active", "ariaCurrentWhenActive", "page", 3, "routerLinkActiveOptions"], ["routerLink", "/municipal/services", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], ["routerLink", "/municipal/publications", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], ["routerLink", "/municipal/contact", "routerLinkActive", "active", "ariaCurrentWhenActive", "page"], [1, "account", 3, "routerLink"], ["routerLink", "/auth/login", 1, "account"], [1, "header-row", 2, "justify-content", "flex-end", "margin-top", "0.5rem"], ["id", "main-content", "tabindex", "-1"]], template: function MunicipalLayout_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "a", 0);
      \u0275\u0275listener("click", function MunicipalLayout_Template_a_click_0_listener($event) {
        return ctx.skipToContent($event);
      });
      \u0275\u0275text(1, "Aller au contenu principal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "header")(3, "div", 1)(4, "a", 2);
      \u0275\u0275text(5, "Terra Nova");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "nav", 3)(7, "a", 4);
      \u0275\u0275text(8, "Accueil municipal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "a", 5);
      \u0275\u0275text(10, "Services");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 6);
      \u0275\u0275text(12, "Publications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 7);
      \u0275\u0275text(14, "Contacter la mairie");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(15, MunicipalLayout_Conditional_15_Template, 2, 2, "a", 8)(16, MunicipalLayout_Conditional_16_Template, 2, 0, "a", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 10);
      \u0275\u0275element(18, "app-font-size");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "main", 11);
      \u0275\u0275element(20, "router-outlet");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(2, _c0));
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_1_0 = ctx.auth.user()) ? 15 : 16, tmp_1_0);
    }
  }, dependencies: [RouterLink, RouterLinkActive, RouterOutlet, AppFontSize], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: var(--surface-ground);\n}\nheader[_ngcontent-%COMP%] {\n  padding: 1rem clamp(1rem, 4vw, 3rem);\n  border-bottom: 1px solid var(--surface-border);\n  background: var(--surface-card);\n}\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n  max-width: 1100px;\n  margin: auto;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--p-primary-color);\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  flex: 1;\n}\na[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.75rem;\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background: var(--p-primary-50);\n  color: var(--p-primary-700);\n}\na[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 3px;\n}\n.account[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 600;\n  overflow-wrap: anywhere;\n}\nmain[_ngcontent-%COMP%] {\n  padding-block: 1.5rem 3rem;\n}\n@media (max-width: 600px) {\n  nav[_ngcontent-%COMP%] {\n    order: 3;\n    flex-basis: 100%;\n  }\n  .account[_ngcontent-%COMP%] {\n    margin-left: auto;\n    max-width: 55%;\n  }\n}\n/*# sourceMappingURL=municipal-layout.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalLayout, [{
    type: Component,
    args: [{ selector: "app-municipal-layout", imports: [RouterLink, RouterLinkActive, RouterOutlet, AppFontSize], template: '<a class="skip-link" href="#main-content" (click)="skipToContent($event)">Aller au contenu principal</a>\n<header>\n    <div class="header-row">\n        <a class="brand" routerLink="/" aria-label="Terra Nova, accueil">Terra Nova</a>\n        <nav aria-label="Services municipaux">\n            <a routerLink="/municipal" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Accueil municipal</a>\n            <a routerLink="/municipal/services" routerLinkActive="active" ariaCurrentWhenActive="page">Services</a>\n            <a routerLink="/municipal/publications" routerLinkActive="active" ariaCurrentWhenActive="page">Publications</a>\n            <a routerLink="/municipal/contact" routerLinkActive="active" ariaCurrentWhenActive="page">Contacter la mairie</a>\n        </nav>\n        @if (auth.user(); as user) {\n            <a class="account" [routerLink]="auth.homeUrl()">{{ user.name }} \xB7 Mon espace</a>\n        } @else {\n            <a class="account" routerLink="/auth/login">Se connecter</a>\n        }\n    </div>\n    <div class="header-row" style="justify-content: flex-end; margin-top: 0.5rem"><app-font-size /></div>\n</header>\n<main id="main-content" tabindex="-1"><router-outlet /></main>\n', styles: ["/* angular:styles/component:scss;f0ab17336ad688725de70ccac055d9c525b8bb155ce1dfbe1d6c7a84120e05a3;/home/fehizoro/Documents/dev/webcup/frontend/src/app/municipal/municipal-layout.ts */\n:host {\n  display: block;\n  min-height: 100dvh;\n  background: var(--surface-ground);\n}\nheader {\n  padding: 1rem clamp(1rem, 4vw, 3rem);\n  border-bottom: 1px solid var(--surface-border);\n  background: var(--surface-card);\n}\n.header-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n  max-width: 1100px;\n  margin: auto;\n}\n.brand {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--p-primary-color);\n}\nnav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  flex: 1;\n}\na {\n  border-radius: 0.5rem;\n  padding: 0.65rem 0.75rem;\n}\nnav a:hover,\nnav a.active {\n  background: var(--p-primary-50);\n  color: var(--p-primary-700);\n}\na:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 3px;\n}\n.account {\n  color: var(--p-primary-color);\n  font-weight: 600;\n  overflow-wrap: anywhere;\n}\nmain {\n  padding-block: 1.5rem 3rem;\n}\n@media (max-width: 600px) {\n  nav {\n    order: 3;\n    flex-basis: 100%;\n  }\n  .account {\n    margin-left: auto;\n    max-width: 55%;\n  }\n}\n/*# sourceMappingURL=municipal-layout.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalLayout, { className: "MunicipalLayout", filePath: "src/app/municipal/municipal-layout.ts", lineNumber: 75 });
})();
export {
  MunicipalLayout
};
//# sourceMappingURL=chunk-U26NR6WZ.js.map
