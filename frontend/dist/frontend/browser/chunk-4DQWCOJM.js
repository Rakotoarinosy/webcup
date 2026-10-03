import {
  Card,
  CardModule,
  MunicipalContentService
} from "./chunk-ZDL6O4T7.js";
import {
  Router,
  RouterLink
} from "./chunk-O26HSNKS.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import "./chunk-WHXYSCHV.js";
import "./chunk-UHTXY4UO.js";
import {
  Component,
  DatePipe,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
} from "./chunk-E5MYAYBP.js";

// src/app/municipal/municipal-home.ts
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalHome_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MunicipalHome_For_23_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 15);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const service_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("pi " + service_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", service_r2.name);
  }
}
function MunicipalHome_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function MunicipalHome_For_23_Template_button_click_0_listener() {
      const service_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startService(service_r2));
    });
    \u0275\u0275elementStart(1, "p-card");
    \u0275\u0275template(2, MunicipalHome_For_23_ng_template_2_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const service_r2 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(service_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.opening_hours);
  }
}
function MunicipalHome_ForEmpty_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Les services les plus utilis\xE9s seront affich\xE9s d\xE8s que des d\xE9marches auront \xE9t\xE9 ouvertes.");
    \u0275\u0275elementEnd();
  }
}
function MunicipalHome_For_36_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const publication_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate(publication_r4.title);
  }
}
function MunicipalHome_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-card");
    \u0275\u0275template(1, MunicipalHome_For_36_ng_template_1_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(publication_r4.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", publication_r4.category, " \xB7 ", \u0275\u0275pipeBind2(7, 3, publication_r4.published_at, "longDate"));
  }
}
function MunicipalHome_ForEmpty_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune publication pour le moment.");
    \u0275\u0275elementEnd();
  }
}
var MunicipalHome = class _MunicipalHome {
  content = inject(MunicipalContentService);
  router = inject(Router);
  popularServices = signal([], ...ngDevMode ? [{ debugName: "popularServices" }] : []);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  startError = signal(null, ...ngDevMode ? [{ debugName: "startError" }] : []);
  ngOnInit() {
    this.content.popularServices(6).subscribe({ next: (items) => this.popularServices.set(items.slice(0, 6)) });
    this.content.publications().subscribe({ next: (items) => this.publications.set(items.slice(0, 2)) });
  }
  startService(service) {
    this.startError.set(null);
    this.content.startService(service.id).subscribe({
      next: () => void this.router.navigate(["/home/municipal/contact"], { queryParams: { service: service.id } }),
      error: () => this.startError.set("Impossible d\u2019ouvrir cette d\xE9marche. R\xE9essayez dans quelques instants.")
    });
  }
  static \u0275fac = function MunicipalHome_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalHome)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalHome, selectors: [["app-municipal-home"]], decls: 38, vars: 4, consts: [["title", ""], [1, "municipal-home"], [1, "hero"], [1, "eyebrow"], [1, "hero-actions"], ["pButton", "", "routerLink", "/home/requests", "label", "Signaler un probl\xE8me", "icon", "pi pi-send"], ["pButton", "", "routerLink", "/home/municipal/contact", "label", "Contacter la mairie", "icon", "pi pi-envelope", "severity", "secondary", 3, "outlined"], [1, "section-heading"], ["routerLink", "/home/municipal/services"], ["role", "alert"], [1, "cards"], ["type", "button", 1, "cursor-pointer", "border-0", "bg-transparent", "p-0", "text-left", "text-color", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-primary"], ["routerLink", "/home/municipal/publications"], [1, "cards", "publications"], ["type", "button", 1, "cursor-pointer", "border-0", "bg-transparent", "p-0", "text-left", "text-color", "focus-visible:outline-2", "focus-visible:outline-offset-2", "focus-visible:outline-primary", 3, "click"], ["aria-hidden", "true"]], template: function MunicipalHome_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "div", 2)(2, "p", 3);
      \u0275\u0275text(3, "Ville connect\xE9e");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1");
      \u0275\u0275text(5, "Vos d\xE9marches municipales, simplement.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Acc\xE9dez aux services utiles, consultez les informations de la ville ou contactez directement la bonne \xE9quipe.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 4);
      \u0275\u0275element(9, "a", 5)(10, "a", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "section")(12, "div", 7)(13, "div")(14, "p", 3);
      \u0275\u0275text(15, "Les plus demand\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "h2");
      \u0275\u0275text(17, "Services les plus utilis\xE9s");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "a", 8);
      \u0275\u0275text(19, "Tous les services");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(20, MunicipalHome_Conditional_20_Template, 2, 1, "p", 9);
      \u0275\u0275elementStart(21, "div", 10);
      \u0275\u0275repeaterCreate(22, MunicipalHome_For_23_Template, 8, 2, "button", 11, _forTrack0, false, MunicipalHome_ForEmpty_24_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "section")(26, "div", 7)(27, "div")(28, "p", 3);
      \u0275\u0275text(29, "Actualit\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "h2");
      \u0275\u0275text(31, "Informations municipales");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "a", 12);
      \u0275\u0275text(33, "Toutes les publications");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 13);
      \u0275\u0275repeaterCreate(35, MunicipalHome_For_36_Template, 8, 6, "p-card", null, _forTrack0, false, MunicipalHome_ForEmpty_37_Template, 2, 0, "p");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(10);
      \u0275\u0275property("outlined", true);
      \u0275\u0275advance(10);
      \u0275\u0275conditional((tmp_1_0 = ctx.startError()) ? 20 : -1, tmp_1_0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.popularServices());
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.publications());
    }
  }, dependencies: [RouterLink, ButtonModule, ButtonDirective, CardModule, Card, DatePipe], styles: ["\n\n.municipal-home[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2.5rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.hero[_ngcontent-%COMP%] {\n  padding: clamp(2rem, 6vw, 4.5rem);\n  border-radius: 1.5rem;\n  background:\n    linear-gradient(\n      120deg,\n      var(--p-primary-700),\n      var(--p-primary-500));\n  color: white;\n}\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(2rem, 5vw, 3.6rem);\n  max-width: 720px;\n  margin: 0.25rem 0 1rem;\n}\n.hero[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 640px;\n  font-size: 1.15rem;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--p-primary-400);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.78rem;\n}\n.hero[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n  color: #dbeafe;\n}\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1rem;\n}\n.cards[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\n.cards[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-home.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalHome, [{
    type: Component,
    args: [{ selector: "app-municipal-home", imports: [DatePipe, RouterLink, ButtonModule, CardModule], template: `<section class="municipal-home">
    <div class="hero">
        <p class="eyebrow">Ville connect\xE9e</p>
        <h1>Vos d\xE9marches municipales, simplement.</h1>
        <p>Acc\xE9dez aux services utiles, consultez les informations de la ville ou contactez directement la bonne \xE9quipe.</p>
        <div class="hero-actions">
            <a pButton routerLink="/home/requests" label="Signaler un probl\xE8me" icon="pi pi-send"></a>
            <a pButton routerLink="/home/municipal/contact" label="Contacter la mairie" icon="pi pi-envelope" severity="secondary" [outlined]="true"></a>
        </div>
    </div>

    <section>
        <div class="section-heading">
            <div>
                <p class="eyebrow">Les plus demand\xE9s</p>
                <h2>Services les plus utilis\xE9s</h2>
            </div>
            <a routerLink="/home/municipal/services">Tous les services</a>
        </div>
        @if (startError(); as message) {
            <p role="alert">{{ message }}</p>
        }
        <div class="cards">
            @for (service of popularServices(); track service.id) {
                <button type="button" class="cursor-pointer border-0 bg-transparent p-0 text-left text-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" (click)="startService(service)">
                    <p-card
                        ><ng-template #title><i [class]="'pi ' + service.icon" aria-hidden="true"></i> {{ service.name }}</ng-template>
                        <p>{{ service.description }}</p>
                        <small>{{ service.opening_hours }}</small></p-card
                    >
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
            <a routerLink="/home/municipal/publications">Toutes les publications</a>
        </div>
        <div class="cards publications">
            @for (publication of publications(); track publication.id) {
                <p-card
                    ><ng-template #title>{{ publication.title }}</ng-template>
                    <p>{{ publication.summary }}</p>
                    <small>{{ publication.category }} \xB7 {{ publication.published_at | date: 'longDate' }}</small></p-card
                >
            } @empty {
                <p>Aucune publication pour le moment.</p>
            }
        </div>
    </section>
</section>
`, styles: ["/* src/app/municipal/municipal-home.scss */\n.municipal-home {\n  display: grid;\n  gap: 2.5rem;\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.hero {\n  padding: clamp(2rem, 6vw, 4.5rem);\n  border-radius: 1.5rem;\n  background:\n    linear-gradient(\n      120deg,\n      var(--p-primary-700),\n      var(--p-primary-500));\n  color: white;\n}\n.hero h1 {\n  font-size: clamp(2rem, 5vw, 3.6rem);\n  max-width: 720px;\n  margin: 0.25rem 0 1rem;\n}\n.hero > p {\n  max-width: 640px;\n  font-size: 1.15rem;\n}\n.hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n}\n.eyebrow {\n  margin: 0;\n  color: var(--p-primary-400);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.78rem;\n}\n.hero .eyebrow {\n  color: #dbeafe;\n}\n.section-heading {\n  display: flex;\n  gap: 1rem;\n  align-items: end;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n.section-heading h2 {\n  margin: 0.25rem 0 0;\n}\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1rem;\n}\n.cards i {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\n.cards small {\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-home.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalHome, { className: "MunicipalHome", filePath: "src/app/municipal/municipal-home.ts", lineNumber: 17 });
})();
export {
  MunicipalHome
};
//# sourceMappingURL=chunk-4DQWCOJM.js.map
