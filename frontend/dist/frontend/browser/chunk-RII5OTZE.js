import {
  Button,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import {
  Component,
  DOCUMENT,
  Injectable,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-TSUH44O7.js";

// src/app/layout/service/font-scale.service.ts
var FONT_SCALE_STORAGE_KEY = "font-scale";
var FONT_SCALE_STEPS = [1, 1.15, 1.3, 1.5, 2];
var FontScaleService = class _FontScaleService {
  document = inject(DOCUMENT);
  scale = signal(this.readStoredScale(), ...ngDevMode ? [{ debugName: "scale" }] : []);
  canIncrease = computed(() => this.scale() < FONT_SCALE_STEPS[FONT_SCALE_STEPS.length - 1], ...ngDevMode ? [{ debugName: "canIncrease" }] : []);
  canDecrease = computed(() => this.scale() > FONT_SCALE_STEPS[0], ...ngDevMode ? [{ debugName: "canDecrease" }] : []);
  constructor() {
    effect(() => {
      const scale = this.scale();
      this.document.documentElement.style.setProperty("--font-scale", String(scale));
      this.document.documentElement.dataset["fontScale"] = String(scale);
      try {
        this.document.defaultView?.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(scale));
      } catch {
      }
    });
  }
  increase() {
    this.move(1);
  }
  decrease() {
    this.move(-1);
  }
  reset() {
    this.scale.set(1);
  }
  move(delta) {
    const next = FONT_SCALE_STEPS[FONT_SCALE_STEPS.indexOf(this.scale()) + delta];
    if (next !== void 0)
      this.scale.set(next);
  }
  readStoredScale() {
    try {
      const stored = Number(this.document.defaultView?.localStorage.getItem(FONT_SCALE_STORAGE_KEY));
      return FONT_SCALE_STEPS.find((step) => step === stored) ?? 1;
    } catch {
      return 1;
    }
  }
  static \u0275fac = function FontScaleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FontScaleService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FontScaleService, factory: _FontScaleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FontScaleService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/layout/component/fontsize/app.fontsize.ts
var AppFontSize = class _AppFontSize {
  fontScale = inject(FontScaleService);
  percent = computed(() => `${Math.round(this.fontScale.scale() * 100)} %`, ...ngDevMode ? [{ debugName: "percent" }] : []);
  static \u0275fac = function AppFontSize_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppFontSize)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppFontSize, selectors: [["app-font-size"]], decls: 6, vars: 4, consts: [["role", "group", "aria-label", "Taille du texte", 1, "flex", "flex-wrap", "items-center", "gap-1"], ["type", "button", "label", "A\u2212", "size", "small", "severity", "secondary", "outlined", "", "ariaLabel", "R\xE9duire la taille du texte", 3, "onClick", "disabled"], ["type", "button", "size", "small", "severity", "secondary", "text", "", "ariaLabel", "Remettre la taille du texte \xE0 100 %", 3, "onClick", "label"], ["type", "button", "label", "A+", "size", "small", "severity", "secondary", "outlined", "", "ariaLabel", "Agrandir la taille du texte", 3, "onClick", "disabled"], ["aria-live", "polite", "aria-atomic", "true", 1, "sr-only"]], template: function AppFontSize_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "p-button", 1);
      \u0275\u0275listener("onClick", function AppFontSize_Template_p_button_onClick_1_listener() {
        return ctx.fontScale.decrease();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "p-button", 2);
      \u0275\u0275listener("onClick", function AppFontSize_Template_p_button_onClick_2_listener() {
        return ctx.fontScale.reset();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p-button", 3);
      \u0275\u0275listener("onClick", function AppFontSize_Template_p_button_onClick_3_listener() {
        return ctx.fontScale.increase();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "span", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.fontScale.canDecrease());
      \u0275\u0275advance();
      \u0275\u0275property("label", ctx.percent());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.fontScale.canIncrease());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Taille du texte : ", ctx.percent());
    }
  }, dependencies: [ButtonModule, Button], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppFontSize, [{
    type: Component,
    args: [{ selector: "app-font-size", imports: [ButtonModule], template: '<div class="flex flex-wrap items-center gap-1" role="group" aria-label="Taille du texte">\n    <p-button type="button" label="A\u2212" size="small" severity="secondary" outlined ariaLabel="R\xE9duire la taille du texte" [disabled]="!fontScale.canDecrease()" (onClick)="fontScale.decrease()" />\n    <p-button type="button" [label]="percent()" size="small" severity="secondary" text ariaLabel="Remettre la taille du texte \xE0 100 %" (onClick)="fontScale.reset()" />\n    <p-button type="button" label="A+" size="small" severity="secondary" outlined ariaLabel="Agrandir la taille du texte" [disabled]="!fontScale.canIncrease()" (onClick)="fontScale.increase()" />\n</div>\n<span class="sr-only" aria-live="polite" aria-atomic="true">Taille du texte : {{ percent() }}</span>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppFontSize, { className: "AppFontSize", filePath: "src/app/layout/component/fontsize/app.fontsize.ts", lineNumber: 10 });
})();

export {
  AppFontSize
};
//# sourceMappingURL=chunk-RII5OTZE.js.map
