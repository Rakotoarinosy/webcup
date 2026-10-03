import {
  Card,
  CardModule,
  MunicipalContentService
} from "./chunk-ZDL6O4T7.js";
import {
  AuthService
} from "./chunk-BFXRYUZT.js";
import "./chunk-OY2B3AGZ.js";
import {
  Router
} from "./chunk-O26HSNKS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-SR5QZYJT.js";
import "./chunk-UHTXY4UO.js";
import {
  Component,
  computed,
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
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E5MYAYBP.js";

// src/app/municipal/municipal-services.ts
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalServices_Conditional_13_Template(rf, ctx) {
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
function MunicipalServices_For_16_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 13);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const service_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("pi " + service_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", service_r2.name);
  }
}
function MunicipalServices_For_16_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 14)(2, "input", 15);
    \u0275\u0275listener("change", function MunicipalServices_For_16_Conditional_16_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const service_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFeaturedChange(service_r2, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Mettre en avant");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "label", 14)(6, "span");
    \u0275\u0275text(7, "Ordre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 16, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 17);
    \u0275\u0275listener("click", function MunicipalServices_For_16_Conditional_16_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const orderInput_r5 = \u0275\u0275reference(9);
      const service_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateFeatured(service_r2, service_r2.is_featured, +orderInput_r5.value));
    });
    \u0275\u0275text(11, "Enregistrer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", service_r2.is_featured)("disabled", ctx_r2.saving() === service_r2.id);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", service_r2.display_order)("disabled", ctx_r2.saving() === service_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.saving() === service_r2.id);
  }
}
function MunicipalServices_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-card");
    \u0275\u0275template(1, MunicipalServices_For_16_ng_template_1_Template, 2, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dl")(6, "dt");
    \u0275\u0275text(7, "Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dd");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dt");
    \u0275\u0275text(11, "Horaires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dd");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 11);
    \u0275\u0275listener("click", function MunicipalServices_For_16_Template_button_click_14_listener() {
      const service_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startService(service_r2));
    });
    \u0275\u0275text(15, "Commencer une d\xE9marche aupr\xE8s de ce service");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, MunicipalServices_For_16_Conditional_16_Template, 12, 5, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const service_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(service_r2.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(service_r2.contact_details);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(service_r2.opening_hours);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.auth.hasRole("manager", "admin") ? 16 : -1);
  }
}
function MunicipalServices_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucun service ne correspond \xE0 votre recherche.");
    \u0275\u0275elementEnd();
  }
}
var MunicipalServices = class _MunicipalServices {
  content = inject(MunicipalContentService);
  router = inject(Router);
  auth = inject(AuthService);
  services = signal([], ...ngDevMode ? [{ debugName: "services" }] : []);
  search = signal("", ...ngDevMode ? [{ debugName: "search" }] : []);
  saving = signal(null, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  visibleServices = computed(() => {
    const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
    const query = normalize(this.search().trim());
    const items = [...this.services()];
    items.sort((a, b) => Number(normalize(b.category).includes("sant")) - Number(normalize(a.category).includes("sant")) || a.display_order - b.display_order);
    return query ? items.filter((service) => normalize(`${service.name} ${service.category ?? ""} ${service.description}`).includes(query)) : items;
  }, ...ngDevMode ? [{ debugName: "visibleServices" }] : []);
  ngOnInit() {
    this.content.services().subscribe({ next: (items) => this.services.set(items) });
  }
  onFeaturedChange(service, event) {
    const input = event.target;
    if (input instanceof HTMLInputElement)
      this.updateFeatured(service, input.checked);
  }
  updateFeatured(service, isFeatured, displayOrder = service.display_order) {
    if (this.saving())
      return;
    this.saving.set(service.id);
    this.error.set(null);
    this.content.updateFeaturedService(service.id, isFeatured, displayOrder).subscribe({
      next: (updated) => {
        this.services.update((items) => items.map((item) => item.id === updated.id ? updated : item));
        this.saving.set(null);
      },
      error: () => {
        this.error.set("Impossible de modifier la mise en avant. V\xE9rifiez vos droits puis r\xE9essayez.");
        this.saving.set(null);
      }
    });
  }
  startService(service) {
    this.error.set(null);
    this.content.startService(service.id).subscribe({
      next: () => void this.router.navigate(["/home/municipal/contact"], { queryParams: { service: service.id } }),
      error: () => this.error.set("Impossible d\u2019ouvrir cette d\xE9marche. R\xE9essayez dans quelques instants.")
    });
  }
  static \u0275fac = function MunicipalServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalServices)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalServices, selectors: [["app-municipal-services"]], decls: 18, vars: 4, consts: [["title", ""], ["orderInput", ""], [1, "municipal-page"], [1, "eyebrow"], [1, "intro"], ["role", "search", "aria-label", "Rechercher un service municipal", 1, "mb-5"], ["for", "service-search", 1, "mb-2", "block", "font-semibold"], ["id", "service-search", "type", "search", "name", "service-search", "aria-label", "Nom ou cat\xE9gorie du service", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["aria-live", "polite", 1, "sr-only"], ["role", "alert", 1, "mb-4", "text-red-600"], [1, "service-grid"], ["type", "button", 1, "inline-flex", "rounded-lg", "border", "border-surface", "px-3", "py-2", "text-primary", "underline", "focus-visible:outline-2", "focus-visible:outline-offset-2", 3, "click"], [1, "mt-4", "flex", "flex-wrap", "items-end", "gap-3", "border-t", "border-surface", "pt-3"], ["aria-hidden", "true"], [1, "flex", "items-center", "gap-2"], ["type", "checkbox", 3, "change", "checked", "disabled"], ["type", "number", "min", "0", 1, "w-20", "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "value", "disabled"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "focus-visible:outline-2", 3, "click", "disabled"]], template: function MunicipalServices_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 2)(1, "p", 3);
      \u0275\u0275text(2, "Informations utiles");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h1");
      \u0275\u0275text(4, "Services municipaux");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Trouvez le bon interlocuteur, ses horaires et les informations pratiques pour vos d\xE9marches.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "form", 5)(8, "label", 6);
      \u0275\u0275text(9, "Rechercher par nom ou cat\xE9gorie");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 7);
      \u0275\u0275listener("ngModelChange", function MunicipalServices_Template_input_ngModelChange_10_listener($event) {
        return ctx.search.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "p", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, MunicipalServices_Conditional_13_Template, 2, 1, "p", 9);
      \u0275\u0275elementStart(14, "div", 10);
      \u0275\u0275repeaterCreate(15, MunicipalServices_For_16_Template, 17, 4, "p-card", null, _forTrack0, false, MunicipalServices_ForEmpty_17_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.search());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.visibleServices().length, " service(s) trouv\xE9(s).");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.error()) ? 13 : -1, tmp_2_0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleServices());
    }
  }, dependencies: [CardModule, Card, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], styles: ["\n\n.municipal-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  max-width: 650px;\n}\n.service-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1rem;\n  margin-top: 2rem;\n}\ni[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\ndl[_ngcontent-%COMP%] {\n  margin: 1.5rem 0 0;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-top: 0.75rem;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0.15rem 0;\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-services.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalServices, [{
    type: Component,
    args: [{ selector: "app-municipal-services", imports: [CardModule, FormsModule], template: `<section class="municipal-page">
    <p class="eyebrow">Informations utiles</p>
    <h1>Services municipaux</h1>
    <p class="intro">Trouvez le bon interlocuteur, ses horaires et les informations pratiques pour vos d\xE9marches.</p>

    <form role="search" aria-label="Rechercher un service municipal" class="mb-5">
        <label for="service-search" class="mb-2 block font-semibold">Rechercher par nom ou cat\xE9gorie</label>
        <input id="service-search" type="search" class="w-full rounded border border-surface bg-transparent p-3" [ngModel]="search()" (ngModelChange)="search.set($event)" name="service-search" aria-label="Nom ou cat\xE9gorie du service" />
    </form>
    <p class="sr-only" aria-live="polite">{{ visibleServices().length }} service(s) trouv\xE9(s).</p>

    @if (error(); as message) { <p role="alert" class="mb-4 text-red-600">{{ message }}</p> }

    <div class="service-grid">
        @for (service of visibleServices(); track service.id) {
            <p-card>
                <ng-template #title><i [class]="'pi ' + service.icon" aria-hidden="true"></i> {{ service.name }}</ng-template>
                <p>{{ service.description }}</p>
                <dl><dt>Contact</dt><dd>{{ service.contact_details }}</dd><dt>Horaires</dt><dd>{{ service.opening_hours }}</dd></dl>
                <button type="button" class="inline-flex rounded-lg border border-surface px-3 py-2 text-primary underline focus-visible:outline-2 focus-visible:outline-offset-2" (click)="startService(service)">Commencer une d\xE9marche aupr\xE8s de ce service</button>

                @if (auth.hasRole('manager', 'admin')) {
                    <div class="mt-4 flex flex-wrap items-end gap-3 border-t border-surface pt-3">
                        <label class="flex items-center gap-2">
                            <input type="checkbox" [checked]="service.is_featured" [disabled]="saving() === service.id" (change)="onFeaturedChange(service, $event)" />
                            <span>Mettre en avant</span>
                        </label>
                        <label class="flex items-center gap-2">
                            <span>Ordre</span>
                            <input #orderInput type="number" min="0" class="w-20 rounded border border-surface bg-transparent p-2" [value]="service.display_order" [disabled]="saving() === service.id" />
                        </label>
                        <button type="button" class="rounded border border-surface px-3 py-2 focus-visible:outline-2" [disabled]="saving() === service.id" (click)="updateFeatured(service, service.is_featured, +orderInput.value)">Enregistrer</button>
                    </div>
                }
            </p-card>
        } @empty {
            <p>Aucun service ne correspond \xE0 votre recherche.</p>
        }
    </div>
</section>
`, styles: ["/* src/app/municipal/municipal-services.scss */\n.municipal-page {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro {\n  color: var(--p-text-muted-color);\n  max-width: 650px;\n}\n.service-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1rem;\n  margin-top: 2rem;\n}\ni {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\ndl {\n  margin: 1.5rem 0 0;\n}\ndt {\n  font-weight: 700;\n  margin-top: 0.75rem;\n}\ndd {\n  margin: 0.15rem 0;\n  color: var(--p-text-muted-color);\n}\n/*# sourceMappingURL=municipal-services.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalServices, { className: "MunicipalServices", filePath: "src/app/municipal/municipal-services.ts", lineNumber: 10 });
})();
export {
  MunicipalServices
};
//# sourceMappingURL=chunk-SC4BL5HG.js.map
