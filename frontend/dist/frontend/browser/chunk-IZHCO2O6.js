import {
  Card,
  CardModule
} from "./chunk-ROQ7VFPT.js";
import {
  MunicipalNavigation
} from "./chunk-TSU7FZ7T.js";
import {
  MunicipalContentService
} from "./chunk-BJ7LH56I.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import "./chunk-IKQWXVMD.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  Router,
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import "./chunk-QS2LCQSO.js";
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  finalize,
  forkJoin,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-home.ts
var _c0 = (a0) => ({ publication: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalHome_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "Actualisation des informations\u2026");
    \u0275\u0275elementEnd();
  }
}
function MunicipalHome_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 11);
    \u0275\u0275listener("click", function MunicipalHome_Conditional_2_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(3, "R\xE9essayer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx, " ");
  }
}
function MunicipalHome_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MunicipalHome_For_15_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 15);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const service_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("pi " + service_r4.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", service_r4.name);
  }
}
function MunicipalHome_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function MunicipalHome_For_15_Template_button_click_0_listener() {
      const service_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startService(service_r4));
    });
    \u0275\u0275elementStart(1, "p-card");
    \u0275\u0275template(2, MunicipalHome_For_15_ng_template_2_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 13);
    \u0275\u0275text(9, "Contacter ce service ");
    \u0275\u0275element(10, "i", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const service_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.openingService() !== null);
    \u0275\u0275attribute("aria-label", "Contacter le service " + service_r4.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(service_r4.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r4.opening_hours);
  }
}
function MunicipalHome_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Les services les plus utilis\xE9s seront affich\xE9s d\xE8s que des d\xE9marches auront \xE9t\xE9 ouvertes.");
    \u0275\u0275elementEnd();
  }
}
function MunicipalHome_For_28_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const publication_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate(publication_r5.title);
  }
}
function MunicipalHome_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10)(1, "p-card");
    \u0275\u0275template(2, MunicipalHome_For_28_ng_template_2_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 13);
    \u0275\u0275text(10, "Lire la publication ");
    \u0275\u0275element(11, "i", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const publication_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r1.navigation.path("publications"))("queryParams", \u0275\u0275pureFunction1(9, _c0, publication_r5.id));
    \u0275\u0275attribute("aria-label", "Lire la publication : " + publication_r5.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(publication_r5.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", publication_r5.category, " \xB7 ", \u0275\u0275pipeBind2(8, 6, publication_r5.published_at, "longDate"));
  }
}
function MunicipalHome_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune publication pour le moment.");
    \u0275\u0275elementEnd();
  }
}
var MunicipalHome = class _MunicipalHome {
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  content = inject(MunicipalContentService);
  router = inject(Router);
  navigation = inject(MunicipalNavigation);
  openingService = signal(null, ...ngDevMode ? [{ debugName: "openingService" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : []);
  popularServices = signal([], ...ngDevMode ? [{ debugName: "popularServices" }] : []);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  startError = signal(null, ...ngDevMode ? [{ debugName: "startError" }] : []);
  ngOnInit() {
    this.load();
    this.live.watch(this.destroyRef, () => this.load(), () => !this.loading());
  }
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.loadError.set(null);
    forkJoin({ popular: this.content.popularServices(6), publications: this.content.publications() }).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: ({ popular, publications }) => {
        this.popularServices.set(popular.slice(0, 6));
        this.publications.set(publications.slice(0, 2));
      },
      error: () => this.loadError.set("Impossible de charger les informations municipales. R\xE9essayez.")
    });
  }
  startService(service) {
    if (this.openingService())
      return;
    this.openingService.set(service.id);
    this.startError.set(null);
    this.content.startService(service.id).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.openingService.set(null))).subscribe({
      next: () => void this.router.navigate([this.navigation.path("contact")], { queryParams: { service: service.id } }),
      error: () => this.startError.set("Impossible d\u2019ouvrir cette d\xE9marche. R\xE9essayez dans quelques instants.")
    });
  }
  static \u0275fac = function MunicipalHome_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalHome)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalHome, selectors: [["app-municipal-home"]], decls: 30, vars: 7, consts: [["title", ""], [1, "municipal-home"], ["role", "status"], ["role", "alert"], [1, "section-heading"], [1, "eyebrow"], [3, "routerLink"], [1, "cards"], ["type", "button", 1, "card-link", 3, "disabled"], [1, "cards", "publications"], [1, "card-link", 3, "routerLink", "queryParams"], ["type", "button", 3, "click"], ["type", "button", 1, "card-link", 3, "click", "disabled"], [1, "card-cta"], ["aria-hidden", "true", 1, "pi", "pi-arrow-right"], ["aria-hidden", "true"]], template: function MunicipalHome_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1);
      \u0275\u0275conditionalCreate(1, MunicipalHome_Conditional_1_Template, 2, 0, "p", 2);
      \u0275\u0275conditionalCreate(2, MunicipalHome_Conditional_2_Template, 4, 1, "p", 3);
      \u0275\u0275elementStart(3, "section")(4, "div", 4)(5, "div")(6, "p", 5);
      \u0275\u0275text(7, "Les plus demand\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h2");
      \u0275\u0275text(9, "Services les plus utilis\xE9s");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "a", 6);
      \u0275\u0275text(11, "Tous les services");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, MunicipalHome_Conditional_12_Template, 2, 1, "p", 3);
      \u0275\u0275elementStart(13, "div", 7);
      \u0275\u0275repeaterCreate(14, MunicipalHome_For_15_Template, 11, 4, "button", 8, _forTrack0, false, MunicipalHome_ForEmpty_16_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "section")(18, "div", 4)(19, "div")(20, "p", 5);
      \u0275\u0275text(21, "Actualit\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "h2");
      \u0275\u0275text(23, "Informations municipales");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "a", 6);
      \u0275\u0275text(25, "Toutes les publications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 9);
      \u0275\u0275repeaterCreate(27, MunicipalHome_For_28_Template, 12, 11, "a", 10, _forTrack0, false, MunicipalHome_ForEmpty_29_Template, 2, 0, "p");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_3_0;
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_1_0 = ctx.loadError()) ? 2 : -1, tmp_1_0);
      \u0275\u0275advance(8);
      \u0275\u0275property("routerLink", ctx.navigation.path("services"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_3_0 = ctx.startError()) ? 12 : -1, tmp_3_0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.popularServices());
      \u0275\u0275advance(10);
      \u0275\u0275property("routerLink", ctx.navigation.path("publications"));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.publications());
    }
  }, dependencies: [RouterLink, ButtonModule, CardModule, Card, DatePipe], styles: ["\n\n.municipal-home[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2.5rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--p-primary-400);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.78rem;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1rem;\n}\n.cards[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\n.cards[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n}\n.card-link[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  text-align: left;\n  color: inherit;\n  background: transparent;\n  border: 0;\n  padding: 0;\n  border-radius: 0.75rem;\n  cursor: pointer;\n  transition: transform 0.15s;\n}\n.card-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.card-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 4px;\n}\n.card-link[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: progress;\n}\n.card-cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--p-primary-color);\n  font-weight: 600;\n  margin-top: 1rem;\n}\n@media (prefers-reduced-motion: reduce) {\n  .card-link[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=municipal-home.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalHome, [{
    type: Component,
    args: [{ selector: "app-municipal-home", imports: [DatePipe, RouterLink, ButtonModule, CardModule], template: `<section class="municipal-home">
    @if (loading()) {
        <p role="status">Actualisation des informations\u2026</p>
    }
    @if (loadError(); as message) {
        <p role="alert">{{ message }} <button type="button" (click)="load()">R\xE9essayer</button></p>
    }

    <section>
        <div class="section-heading">
            <div>
                <p class="eyebrow">Les plus demand\xE9s</p>
                <h2>Services les plus utilis\xE9s</h2>
            </div>
            <a [routerLink]="navigation.path('services')">Tous les services</a>
        </div>
        @if (startError(); as message) {
            <p role="alert">{{ message }}</p>
        }
        <div class="cards">
            @for (service of popularServices(); track service.id) {
                <button type="button" class="card-link" [attr.aria-label]="'Contacter le service ' + service.name" [disabled]="openingService() !== null" (click)="startService(service)">
                    <p-card
                        ><ng-template #title><i [class]="'pi ' + service.icon" aria-hidden="true"></i> {{ service.name }}</ng-template>
                        <p>{{ service.description }}</p>
                        <small>{{ service.opening_hours }}</small
                        ><span class="card-cta">Contacter ce service <i class="pi pi-arrow-right" aria-hidden="true"></i></span
                    ></p-card>
                </button>
            } @empty {
                <p>Les services les plus utilis\xE9s seront affich\xE9s d\xE8s que des d\xE9marches auront \xE9t\xE9 ouvertes.</p>
            }
        </div>
    </section>

    <section>
        <div class="section-heading">
            <div>
                <p class="eyebrow">Actualit\xE9s</p>
                <h2>Informations municipales</h2>
            </div>
            <a [routerLink]="navigation.path('publications')">Toutes les publications</a>
        </div>
        <div class="cards publications">
            @for (publication of publications(); track publication.id) {
                <a class="card-link" [routerLink]="navigation.path('publications')" [queryParams]="{ publication: publication.id }" [attr.aria-label]="'Lire la publication : ' + publication.title">
                    <p-card
                        ><ng-template #title>{{ publication.title }}</ng-template>
                        <p>{{ publication.summary }}</p>
                        <small>{{ publication.category }} \xB7 {{ publication.published_at | date: 'longDate' }}</small>
                        <span class="card-cta">Lire la publication <i class="pi pi-arrow-right" aria-hidden="true"></i></span>
                    </p-card>
                </a>
            } @empty {
                <p>Aucune publication pour le moment.</p>
            }
        </div>
    </section>
</section>
`, styles: ["/* src/app/municipal/municipal-home.scss */\n.municipal-home {\n  display: grid;\n  gap: 2.5rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n}\n.eyebrow {\n  margin: 0;\n  color: var(--p-primary-400);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.78rem;\n}\n.section-heading {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n.section-heading h2 {\n  margin: 0.25rem 0 0;\n}\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1rem;\n}\n.cards i {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\n.cards small {\n  color: var(--p-text-muted-color);\n}\n.card-link {\n  display: block;\n  width: 100%;\n  height: 100%;\n  text-align: left;\n  color: inherit;\n  background: transparent;\n  border: 0;\n  padding: 0;\n  border-radius: 0.75rem;\n  cursor: pointer;\n  transition: transform 0.15s;\n}\n.card-link:hover {\n  transform: translateY(-2px);\n}\n.card-link:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 4px;\n}\n.card-link:disabled {\n  opacity: 0.65;\n  cursor: progress;\n}\n.card-cta {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--p-primary-color);\n  font-weight: 600;\n  margin-top: 1rem;\n}\n@media (prefers-reduced-motion: reduce) {\n  .card-link {\n    transition: none;\n  }\n}\n/*# sourceMappingURL=municipal-home.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalHome, { className: "MunicipalHome", filePath: "src/app/municipal/municipal-home.ts", lineNumber: 21 });
})();
export {
  MunicipalHome
};
//# sourceMappingURL=chunk-IZHCO2O6.js.map
