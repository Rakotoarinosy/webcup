import {
  Card,
  CardModule,
  MunicipalContentService
} from "./chunk-ZDL6O4T7.js";
import {
  Select,
  SelectModule
} from "./chunk-IHOQCUVC.js";
import "./chunk-UR4GPL7H.js";
import "./chunk-ZDG3GNHS.js";
import "./chunk-JL6DBWWC.js";
import "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import "./chunk-UHTXY4UO.js";
import {
  Component,
  DatePipe,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-E5MYAYBP.js";

// src/app/municipal/municipal-publications.ts
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalPublications_For_10_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const publication_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate(publication_r1.title);
  }
}
function MunicipalPublications_For_10_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const publication_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate2("", publication_r1.category, " \xB7 ", \u0275\u0275pipeBind2(1, 2, publication_r1.published_at, "longDate"));
  }
}
function MunicipalPublications_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-card");
    \u0275\u0275template(1, MunicipalPublications_For_10_ng_template_1_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(3, MunicipalPublications_For_10_ng_template_3_Template, 2, 5, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r1 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(publication_r1.summary);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(publication_r1.content);
  }
}
function MunicipalPublications_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune publication dans cette cat\xE9gorie.");
    \u0275\u0275elementEnd();
  }
}
var MunicipalPublications = class _MunicipalPublications {
  content = inject(MunicipalContentService);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  selectedCategory = signal(null, ...ngDevMode ? [{ debugName: "selectedCategory" }] : []);
  categories = computed(() => [...new Set(this.publications().map((item) => item.category))].map((label) => ({ label, value: label })), ...ngDevMode ? [{ debugName: "categories" }] : []);
  ngOnInit() {
    this.load();
  }
  load() {
    this.content.publications(this.selectedCategory() ?? void 0).subscribe({ next: (items) => this.publications.set(items) });
  }
  selectCategory(value) {
    this.selectedCategory.set(value);
    this.load();
  }
  static \u0275fac = function MunicipalPublications_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalPublications)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalPublications, selectors: [["app-municipal-publications"]], decls: 12, vars: 3, consts: [["title", ""], ["subtitle", ""], [1, "municipal-page"], [1, "eyebrow"], [1, "intro"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Toutes les cat\xE9gories", 3, "onChange", "options", "showClear"], [1, "publication-list"], [1, "content"]], template: function MunicipalPublications_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2)(1, "p", 3);
      \u0275\u0275text(2, "Vie municipale");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h1");
      \u0275\u0275text(4, "Publications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Annonces, changements de service et informations pratiques de votre ville.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p-select", 5);
      \u0275\u0275listener("onChange", function MunicipalPublications_Template_p_select_onChange_7_listener($event) {
        return ctx.selectCategory($event.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6);
      \u0275\u0275repeaterCreate(9, MunicipalPublications_For_10_Template, 9, 2, "p-card", null, _forTrack0, false, MunicipalPublications_ForEmpty_11_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("options", ctx.categories())("showClear", true);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.publications());
    }
  }, dependencies: [ButtonModule, CardModule, Card, SelectModule, Select, DatePipe], styles: ["\n\n.municipal-page[_ngcontent-%COMP%] {\n  max-width: 850px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\n.publication-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.content[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-publications.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalPublications, [{
    type: Component,
    args: [{ selector: "app-municipal-publications", imports: [DatePipe, ButtonModule, CardModule, SelectModule], template: `<section class="municipal-page"><p class="eyebrow">Vie municipale</p><h1>Publications</h1><p class="intro">Annonces, changements de service et informations pratiques de votre ville.</p><p-select [options]="categories()" optionLabel="label" optionValue="value" [showClear]="true" placeholder="Toutes les cat\xE9gories" (onChange)="selectCategory($event.value)"></p-select><div class="publication-list">@for (publication of publications(); track publication.id) { <p-card><ng-template #title>{{ publication.title }}</ng-template><ng-template #subtitle>{{ publication.category }} \xB7 {{ publication.published_at | date:'longDate' }}</ng-template><p>{{ publication.summary }}</p><p class="content">{{ publication.content }}</p></p-card> } @empty { <p>Aucune publication dans cette cat\xE9gorie.</p> }</div></section>
`, styles: ["/* src/app/municipal/municipal-publications.scss */\n.municipal-page {\n  max-width: 850px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\n.publication-list {\n  display: grid;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.content {\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-publications.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalPublications, { className: "MunicipalPublications", filePath: "src/app/municipal/municipal-publications.ts", lineNumber: 10 });
})();
export {
  MunicipalPublications
};
//# sourceMappingURL=chunk-HWTJKKGG.js.map
