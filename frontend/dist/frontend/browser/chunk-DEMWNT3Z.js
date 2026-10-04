import {
  Skeleton,
  SkeletonModule
} from "./chunk-Q3S55ZAF.js";
import {
  CountdownPipe,
  STATUS_OPTIONS,
  TerraNovaStore,
  XpPipe,
  difficultyLabel,
  difficultySeverity,
  statusMeta
} from "./chunk-YECFL32V.js";
import "./chunk-R3AFDXWT.js";
import "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import "./chunk-RD6WJK3U.js";
import {
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  Tooltip,
  TooltipModule
} from "./chunk-OUQ4VYAJ.js";
import {
  Tag,
  TagModule
} from "./chunk-EMZ2UMTV.js";
import "./chunk-NAF47H6O.js";
import "./chunk-EF3HWUJ3.js";
import "./chunk-4NHVROSD.js";
import {
  BaseComponent,
  BaseStyle,
  Bind,
  PARENT_INSTANCE,
  PrimeTemplate,
  SharedModule
} from "./chunk-YMMGU7DJ.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  Injectable,
  InjectionToken,
  Input,
  NgIf,
  NgModule,
  NgTemplateOutlet,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-TSUH44O7.js";

// node_modules/@primeuix/styles/dist/progressbar/index.mjs
var style = "\n    .p-progressbar {\n        display: block;\n        position: relative;\n        overflow: hidden;\n        height: dt('progressbar.height');\n        background: dt('progressbar.background');\n        border-radius: dt('progressbar.border.radius');\n    }\n\n    .p-progressbar-value {\n        margin: 0;\n        background: dt('progressbar.value.background');\n    }\n\n    .p-progressbar-label {\n        color: dt('progressbar.label.color');\n        font-size: dt('progressbar.label.font.size');\n        font-weight: dt('progressbar.label.font.weight');\n    }\n\n    .p-progressbar-determinate .p-progressbar-value {\n        height: 100%;\n        width: 0%;\n        position: absolute;\n        display: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        transition: width 1s ease-in-out;\n    }\n\n    .p-progressbar-determinate .p-progressbar-label {\n        display: inline-flex;\n    }\n\n    .p-progressbar-indeterminate .p-progressbar-value::before {\n        content: '';\n        position: absolute;\n        background: inherit;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n        inset-block-end: 0;\n        will-change: inset-inline-start, inset-inline-end;\n        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    }\n\n    .p-progressbar-indeterminate .p-progressbar-value::after {\n        content: '';\n        position: absolute;\n        background: inherit;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n        inset-block-end: 0;\n        will-change: inset-inline-start, inset-inline-end;\n        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n        animation-delay: 1.15s;\n    }\n\n    @keyframes p-progressbar-indeterminate-anim {\n        0% {\n            inset-inline-start: -35%;\n            inset-inline-end: 100%;\n        }\n        60% {\n            inset-inline-start: 100%;\n            inset-inline-end: -90%;\n        }\n        100% {\n            inset-inline-start: 100%;\n            inset-inline-end: -90%;\n        }\n    }\n    @-webkit-keyframes p-progressbar-indeterminate-anim {\n        0% {\n            inset-inline-start: -35%;\n            inset-inline-end: 100%;\n        }\n        60% {\n            inset-inline-start: 100%;\n            inset-inline-end: -90%;\n        }\n        100% {\n            inset-inline-start: 100%;\n            inset-inline-end: -90%;\n        }\n    }\n\n    @keyframes p-progressbar-indeterminate-anim-short {\n        0% {\n            inset-inline-start: -200%;\n            inset-inline-end: 100%;\n        }\n        60% {\n            inset-inline-start: 107%;\n            inset-inline-end: -8%;\n        }\n        100% {\n            inset-inline-start: 107%;\n            inset-inline-end: -8%;\n        }\n    }\n    @-webkit-keyframes p-progressbar-indeterminate-anim-short {\n        0% {\n            inset-inline-start: -200%;\n            inset-inline-end: 100%;\n        }\n        60% {\n            inset-inline-start: 107%;\n            inset-inline-end: -8%;\n        }\n        100% {\n            inset-inline-start: 107%;\n            inset-inline-end: -8%;\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-progressbar.mjs
var _c0 = ["content"];
var _c1 = (a0) => ({
  $implicit: a0
});
function ProgressBar_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("display", ctx_r0.value != null && ctx_r0.value !== 0 ? "flex" : "none");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.value, "", ctx_r0.unit);
  }
}
function ProgressBar_div_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function ProgressBar_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 2);
    \u0275\u0275template(2, ProgressBar_div_0_div_2_Template, 2, 4, "div", 3)(3, ProgressBar_div_0_ng_container_3_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("value"), ctx_r0.valueStyleClass));
    \u0275\u0275styleProp("width", ctx_r0.value + "%")("display", "flex")("background", ctx_r0.color);
    \u0275\u0275property("pBind", ctx_r0.ptm("value"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.cx("label"));
    \u0275\u0275property("pBind", ctx_r0.ptm("label"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.showValue && !ctx_r0.contentTemplate && !ctx_r0._contentTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.contentTemplate || ctx_r0._contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(17, _c1, ctx_r0.value));
  }
}
function ProgressBar_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("value"), ctx_r0.valueStyleClass));
    \u0275\u0275styleProp("background", ctx_r0.color);
    \u0275\u0275property("pBind", ctx_r0.ptm("value"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-progressbar p-component", {
    "p-progressbar-determinate": instance.mode == "determinate",
    "p-progressbar-indeterminate": instance.mode == "indeterminate"
  }],
  value: "p-progressbar-value",
  label: "p-progressbar-label"
};
var ProgressBarStyle = class _ProgressBarStyle extends BaseStyle {
  name = "progressbar";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ProgressBarStyle_BaseFactory;
    return function ProgressBarStyle_Factory(__ngFactoryType__) {
      return (\u0275ProgressBarStyle_BaseFactory || (\u0275ProgressBarStyle_BaseFactory = \u0275\u0275getInheritedFactory(_ProgressBarStyle)))(__ngFactoryType__ || _ProgressBarStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ProgressBarStyle,
    factory: _ProgressBarStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarStyle, [{
    type: Injectable
  }], null, null);
})();
var ProgressBarClasses;
(function(ProgressBarClasses2) {
  ProgressBarClasses2["root"] = "p-progressbar";
  ProgressBarClasses2["value"] = "p-progressbar-value";
  ProgressBarClasses2["label"] = "p-progressbar-label";
})(ProgressBarClasses || (ProgressBarClasses = {}));
var PROGRESSBAR_INSTANCE = new InjectionToken("PROGRESSBAR_INSTANCE");
var ProgressBar = class _ProgressBar extends BaseComponent {
  $pcProgressBar = inject(PROGRESSBAR_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  /**
   * Current value of the progress.
   * @group Props
   */
  value;
  /**
   * Whether to display the progress bar value.
   * @group Props
   */
  showValue = true;
  /**
   * Style class of the element.
   * @deprecated since v20.0.0, use `class` instead.
   * @group Props
   */
  styleClass;
  /**
   * Style class of the value element.
   * @group Props
   */
  valueStyleClass;
  /**
   * Unit sign appended to the value.
   * @group Props
   */
  unit = "%";
  /**
   * Defines the mode of the progress
   * @defaultValue 'determinate'
   * @group Props
   */
  mode = "determinate";
  /**
   * Color for the background of the progress.
   * @group Props
   */
  color;
  /**
   * Template of the content.
   * @param {ProgressBarContentTemplateContext} context - content context.
   * @see {@link ProgressBarContentTemplateContext}
   * @group Templates
   */
  contentTemplate;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  _componentStyle = inject(ProgressBarStyle);
  templates;
  _contentTemplate;
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
      }
    });
  }
  get dataP() {
    return this.cn({
      determinate: this.mode === "determinate",
      indeterminate: this.mode === "indeterminate"
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ProgressBar_BaseFactory;
    return function ProgressBar_Factory(__ngFactoryType__) {
      return (\u0275ProgressBar_BaseFactory || (\u0275ProgressBar_BaseFactory = \u0275\u0275getInheritedFactory(_ProgressBar)))(__ngFactoryType__ || _ProgressBar);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _ProgressBar,
    selectors: [["p-progressBar"], ["p-progressbar"], ["p-progress-bar"]],
    contentQueries: function ProgressBar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c0, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    hostAttrs: ["role", "progressbar"],
    hostVars: 7,
    hostBindings: function ProgressBar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuemin", 0)("aria-valuenow", ctx.value)("aria-valuemax", 100)("aria-level", ctx.value + ctx.unit)("data-p", ctx.dataP);
        \u0275\u0275classMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
      }
    },
    inputs: {
      value: [2, "value", "value", numberAttribute],
      showValue: [2, "showValue", "showValue", booleanAttribute],
      styleClass: "styleClass",
      valueStyleClass: "valueStyleClass",
      unit: "unit",
      mode: "mode",
      color: "color"
    },
    features: [\u0275\u0275ProvidersFeature([ProgressBarStyle, {
      provide: PROGRESSBAR_INSTANCE,
      useExisting: _ProgressBar
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _ProgressBar
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    decls: 2,
    vars: 2,
    consts: [[3, "class", "pBind", "width", "display", "background", 4, "ngIf"], [3, "class", "pBind", "background", 4, "ngIf"], [3, "pBind"], [3, "display", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function ProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProgressBar_div_0_Template, 4, 19, "div", 0)(1, ProgressBar_div_1_Template, 1, 6, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.mode === "determinate");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mode === "indeterminate");
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, SharedModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBar, [{
    type: Component,
    args: [{
      selector: "p-progressBar, p-progressbar, p-progress-bar",
      standalone: true,
      imports: [CommonModule, SharedModule, Bind],
      template: `
        <div *ngIf="mode === 'determinate'" [class]="cn(cx('value'), valueStyleClass)" [pBind]="ptm('value')" [style.width]="value + '%'" [style.display]="'flex'" [style.background]="color" [attr.data-p]="dataP">
            <div [class]="cx('label')" [pBind]="ptm('label')" [attr.data-p]="dataP">
                <div *ngIf="showValue && !contentTemplate && !_contentTemplate" [style.display]="value != null && value !== 0 ? 'flex' : 'none'">{{ value }}{{ unit }}</div>
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { $implicit: value }"></ng-container>
            </div>
        </div>
        <div *ngIf="mode === 'indeterminate'" [class]="cn(cx('value'), valueStyleClass)" [pBind]="ptm('value')" [style.background]="color" [attr.data-p]="dataP"></div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ProgressBarStyle, {
        provide: PROGRESSBAR_INSTANCE,
        useExisting: ProgressBar
      }, {
        provide: PARENT_INSTANCE,
        useExisting: ProgressBar
      }],
      host: {
        role: "progressbar",
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuenow]": "value",
        "[attr.aria-valuemax]": "100",
        "[attr.aria-level]": "value + unit",
        "[class]": "cn(cx('root'), styleClass)",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    showValue: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    styleClass: [{
      type: Input
    }],
    valueStyleClass: [{
      type: Input
    }],
    unit: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var ProgressBarModule = class _ProgressBarModule {
  static \u0275fac = function ProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgressBarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ProgressBarModule,
    imports: [ProgressBar, SharedModule],
    exports: [ProgressBar, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [ProgressBar, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [ProgressBar, SharedModule],
      exports: [ProgressBar, SharedModule]
    }]
  }], null, null);
})();

// src/app/terra-nova/dashboard/tn-dashboard.ts
var _c02 = () => ({ height: "8px" });
var _c12 = () => ({ height: "4px" });
var _c2 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.request_code;
var _forTrack1 = ($index, $item) => $item.value;
function TerraNovaDashboard_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", ctx_r0.elapsedLabel(), " \xE9coul\xE9es");
  }
}
function TerraNovaDashboard_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, TerraNovaDashboard_Conditional_4_Conditional_3_Template, 2, 1, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 28)(5, "div")(6, "div", 29);
    \u0275\u0275text(7, "Vague actuelle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 30);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "div", 29);
    \u0275\u0275text(12, "Demandes disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 30);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div")(16, "div", 29);
    \u0275\u0275text(17, "Demandes initiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 30);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "div", 29);
    \u0275\u0275text(22, "Demandes des vagues");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 30);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r2 = ctx;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-green-500", ctx_r0.store.isActive())("bg-surface-400", !ctx_r0.store.isActive());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.store.isActive() ? "Session active" : s_r2.status === "none" ? "Aucune session active" : "Session " + s_r2.status, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(s_r2.elapsed_minutes > 0 ? 3 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("#", s_r2.current_wave);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.visible_requests_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.initial_requests_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r2.wave_requests_count);
  }
}
function TerraNovaDashboard_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-skeleton", 31)(1, "p-skeleton", 32);
  }
}
function TerraNovaDashboard_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 29);
    \u0275\u0275text(3, "Prochaine diffusion dans");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 34);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "countdown");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Vague #", (tmp_1_0 = ctx_r0.store.session()) == null ? null : tmp_1_0.next_wave_number);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 2, ctx_r0.store.msUntilNextWave()));
  }
}
function TerraNovaDashboard_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 29);
    \u0275\u0275text(3, "Diffusion imminente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35);
    \u0275\u0275text(5, "00:00:00");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "p-progressbar", 36);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Vague #", (tmp_1_0 = ctx_r0.store.session()) == null ? null : tmp_1_0.next_wave_number);
    \u0275\u0275advance(5);
    \u0275\u0275styleMap(\u0275\u0275pureFunction0(3, _c12));
  }
}
function TerraNovaDashboard_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "Aucune vague planifi\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 29);
    \u0275\u0275text(3, "Toutes les vagues ont \xE9t\xE9 diffus\xE9es.");
    \u0275\u0275elementEnd();
  }
}
function TerraNovaDashboard_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "En attente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 29);
    \u0275\u0275text(3, "Le concours n'a pas encore d\xE9marr\xE9.");
    \u0275\u0275elementEnd();
  }
}
function TerraNovaDashboard_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-skeleton", 37)(1, "p-skeleton", 38);
  }
}
function TerraNovaDashboard_Conditional_16_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "p-skeleton", 39);
    \u0275\u0275elementEnd();
  }
}
function TerraNovaDashboard_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TerraNovaDashboard_Conditional_16_For_1_Template, 2, 0, "div", 8, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function TerraNovaDashboard_Conditional_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+ ", ctx_r0.store.stats().validation, " en validation");
  }
}
function TerraNovaDashboard_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 40)(1, "span", 29);
    \u0275\u0275text(2, "Demandes disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 42)(6, "span", 29);
    \u0275\u0275text(7, "Nouvelles demandes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 44)(11, "span", 29);
    \u0275\u0275text(12, "En cours");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 41);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, TerraNovaDashboard_Conditional_17_Conditional_15_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "a", 44)(17, "span", 29);
    \u0275\u0275text(18, "Termin\xE9es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 41);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 45);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 46)(24, "span", 29);
    \u0275\u0275text(25, "XP disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 41);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "xp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 45);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "xp");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.store.stats().total);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.store.stats().fresh);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.store.stats().inProgress);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.store.stats().validation ? 15 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.store.stats().done);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.store.stats().donePercent, " % des demandes");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 8, ctx_r0.store.stats().xpAvailable));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(31, 10, ctx_r0.store.stats().xpDone), " termin\xE9s");
  }
}
function TerraNovaDashboard_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 11);
    \u0275\u0275text(1, "Tout voir");
    \u0275\u0275elementEnd();
  }
}
function TerraNovaDashboard_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function TerraNovaDashboard_For_25_Template_button_click_0_listener() {
      const r_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.store.openDetail(r_r4.request_code));
    });
    \u0275\u0275element(1, "span", 48);
    \u0275\u0275elementStart(2, "span", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 50);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "p-tag", 51);
    \u0275\u0275elementStart(7, "span", 52);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "xp");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r4.request_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.message_public);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.difficultyLabel(r_r4.difficulty_level, r_r4.difficulty))("severity", ctx_r0.difficultySeverity(r_r4.difficulty_level));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 5, r_r4.xp_total, true));
  }
}
function TerraNovaDashboard_ForEmpty_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Aucune nouvelle demande non lue.");
    \u0275\u0275elementEnd()();
  }
}
function TerraNovaDashboard_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function TerraNovaDashboard_For_34_Template_button_click_0_listener() {
      const r_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.store.openDetail(r_r6.request_code));
    });
    \u0275\u0275elementStart(1, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "p-tag", 51);
    \u0275\u0275elementStart(6, "span", 52);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "xp");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.request_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r6.message_public);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.statusMeta(r_r6.status).label)("severity", ctx_r0.statusMeta(r_r6.status).severity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 5, r_r6.xp_total));
  }
}
function TerraNovaDashboard_ForEmpty_35_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Aucune demande \xE0 traiter.");
    \u0275\u0275elementEnd()();
  }
}
function TerraNovaDashboard_ForEmpty_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-skeleton", 54);
  }
}
function TerraNovaDashboard_ForEmpty_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, TerraNovaDashboard_ForEmpty_35_Conditional_0_Template, 4, 0, "div", 13)(1, TerraNovaDashboard_ForEmpty_35_Conditional_1_Template, 1, 0, "p-skeleton", 54);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.store.loaded() ? 0 : 1);
  }
}
function TerraNovaDashboard_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "p-tag", 56);
    \u0275\u0275elementStart(2, "div", 57);
    \u0275\u0275element(3, "div", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 60);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "xp");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", d_r7.label)("severity", ctx_r0.difficultySeverity(d_r7.value));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.barColors[d_r7.value]);
    \u0275\u0275styleProp("width", d_r7.count / ctx_r0.maxDifficultyCount() * 100, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r7.count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 8, d_r7.xp));
  }
}
function TerraNovaDashboard_For_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 21);
    \u0275\u0275element(1, "p-tag", 61);
    \u0275\u0275elementStart(2, "span", 41);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", s_r8.label)("severity", s_r8.severity)("icon", s_r8.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.columnCount(s_r8.value));
  }
}
var BAR_COLORS = ["", "bg-green-500", "bg-sky-500", "bg-orange-500", "bg-red-500"];
var TerraNovaDashboard = class _TerraNovaDashboard {
  store = inject(TerraNovaStore);
  statuses = STATUS_OPTIONS;
  difficultyLabel = difficultyLabel;
  difficultySeverity = difficultySeverity;
  statusMeta = statusMeta;
  barColors = BAR_COLORS;
  freshRequests = computed(() => {
    const codes = this.store.newCodes();
    return this.store.requests().filter((r) => codes.has(r.request_code)).sort((a, b) => (b.first_seen_at ?? "").localeCompare(a.first_seen_at ?? "") || b.xp_total - a.xp_total).slice(0, 6);
  }, ...ngDevMode ? [{ debugName: "freshRequests" }] : []);
  maxDifficultyCount = computed(() => Math.max(1, ...this.store.stats().byDifficulty.map((d) => d.count)), ...ngDevMode ? [{ debugName: "maxDifficultyCount" }] : []);
  elapsedLabel = computed(() => {
    const minutes = this.store.session()?.elapsed_minutes ?? 0;
    return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}`;
  }, ...ngDevMode ? [{ debugName: "elapsedLabel" }] : []);
  countdownState = computed(() => {
    const s = this.store.session();
    if (!s?.last_sync_success_at)
      return "unknown";
    if (s.status === "none")
      return "inactive";
    if (s.next_wave_number <= 0)
      return "finished";
    const ms = this.store.msUntilNextWave();
    return ms !== null && ms <= 0 ? "imminent" : "running";
  }, ...ngDevMode ? [{ debugName: "countdownState" }] : []);
  columnCount(status) {
    return this.store.requests().filter((r) => r.status === status).length;
  }
  static \u0275fac = function TerraNovaDashboard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaDashboard)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerraNovaDashboard, selectors: [["app-terra-nova-dashboard"]], decls: 58, vars: 12, consts: [[1, "mb-4", "grid", "grid-cols-1", "gap-4", "xl:grid-cols-5"], [1, "card", "mb-0!", "xl:col-span-3"], [1, "mb-4", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-muted-color"], [1, "card", "mb-0!", "flex", "flex-col", "gap-1", "xl:col-span-2"], [1, "mb-3", "flex", "items-center", "justify-between", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-muted-color"], ["pTooltip", "Affichage uniquement : la synchronisation avec l'API a lieu toutes les 30 s, ind\xE9pendamment de ce compte \xE0 rebours.", "tooltipPosition", "left", 1, "pi", "pi-info-circle", "cursor-help"], [1, "mb-4", "grid", "grid-cols-2", "gap-4", "md:grid-cols-3", "xl:grid-cols-5"], [1, "mb-4", "grid", "grid-cols-1", "gap-4", "xl:grid-cols-2"], [1, "card", "mb-0!"], [1, "mb-3", "flex", "items-center", "justify-between"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-muted-color"], ["routerLink", "notifications", 1, "text-sm", "text-primary"], ["type", "button", 1, "flex", "w-full", "cursor-pointer", "items-center", "gap-3", "rounded-md", "border-0", "bg-transparent", "px-2", "py-2.5", "text-left", "text-color", "hover:bg-emphasis"], [1, "flex", "flex-col", "items-center", "gap-2", "py-8", "text-muted-color"], ["routerLink", "demandes", 1, "text-sm", "text-primary"], [1, "grid", "grid-cols-1", "gap-4", "xl:grid-cols-2"], [1, "flex", "flex-col", "gap-3"], [1, "grid", "grid-cols-[5.5rem_1fr_2rem_6rem]", "items-center", "gap-3"], [1, "mb-4", "flex", "items-center", "justify-between"], ["routerLink", "pipeline", 1, "text-sm", "text-primary"], [1, "mb-5", "grid", "grid-cols-2", "gap-3", "md:grid-cols-4"], ["routerLink", "pipeline", 1, "flex", "flex-col", "items-start", "gap-2", "rounded-lg", "border", "border-surface", "p-3", "text-color", "no-underline", "hover:border-primary"], [1, "mb-1", "flex", "justify-between", "text-sm"], [1, "text-muted-color"], [3, "value", "showValue"], [1, "mb-5", "flex", "items-center", "gap-2", "font-semibold"], [1, "inline-block", "h-2.5", "w-2.5", "rounded-full"], [1, "font-normal", "text-muted-color"], [1, "grid", "grid-cols-2", "gap-4", "md:grid-cols-4"], [1, "text-sm", "text-muted-color"], [1, "text-3xl", "font-bold"], ["height", "1.25rem", "width", "40%", "styleClass", "mb-4"], ["height", "3.5rem"], [1, "text-lg", "font-semibold"], [1, "font-mono", "text-4xl", "font-bold", "text-primary"], [1, "mb-2", "font-mono", "text-4xl", "font-bold", "text-amber-500"], ["mode", "indeterminate"], ["height", "1.25rem", "width", "50%", "styleClass", "mb-3"], ["height", "3rem"], ["height", "3.25rem"], ["routerLink", "demandes", 1, "card", "mb-0!", "flex", "flex-col", "gap-1", "border", "border-transparent", "text-color", "no-underline", "hover:border-primary"], [1, "text-2xl", "font-bold"], ["routerLink", "notifications", 1, "card", "mb-0!", "flex", "flex-col", "gap-1", "border", "border-transparent", "text-color", "no-underline", "hover:border-primary"], [1, "text-2xl", "font-bold", "text-primary"], ["routerLink", "pipeline", 1, "card", "mb-0!", "flex", "flex-col", "gap-1", "border", "border-transparent", "text-color", "no-underline", "hover:border-primary"], [1, "text-xs", "text-muted-color"], [1, "card", "mb-0!", "flex", "flex-col", "gap-1"], ["type", "button", 1, "flex", "w-full", "cursor-pointer", "items-center", "gap-3", "rounded-md", "border-0", "bg-transparent", "px-2", "py-2.5", "text-left", "text-color", "hover:bg-emphasis", 3, "click"], [1, "inline-block", "h-2", "w-2", "shrink-0", "rounded-full", "bg-primary"], [1, "font-mono", "font-semibold"], [1, "line-clamp-2", "min-w-0", "flex-1", "text-sm", "text-muted-color"], ["styleClass", "whitespace-nowrap", 3, "value", "severity"], [1, "w-20", "shrink-0", "text-right", "font-semibold", "whitespace-nowrap"], [1, "pi", "pi-check-circle", "text-2xl"], ["height", "12rem"], [1, "pi", "pi-inbox", "text-2xl"], [3, "value", "severity"], [1, "h-2", "overflow-hidden", "rounded", "bg-emphasis"], [1, "h-full", "rounded", "transition-all"], [1, "text-right", "font-semibold"], [1, "text-right", "text-sm", "text-muted-color"], [3, "value", "severity", "icon"]], template: function TerraNovaDashboard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Session actuelle");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, TerraNovaDashboard_Conditional_4_Template, 25, 10)(5, TerraNovaDashboard_Conditional_5_Template, 2, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "div", 4);
      \u0275\u0275text(8, " Prochaine vague ");
      \u0275\u0275element(9, "i", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, TerraNovaDashboard_Case_10_Template, 7, 4)(11, TerraNovaDashboard_Case_11_Template, 7, 4)(12, TerraNovaDashboard_Case_12_Template, 4, 0)(13, TerraNovaDashboard_Case_13_Template, 4, 0)(14, TerraNovaDashboard_Case_14_Template, 2, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 6);
      \u0275\u0275conditionalCreate(16, TerraNovaDashboard_Conditional_16_Template, 2, 1)(17, TerraNovaDashboard_Conditional_17_Template, 32, 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 7)(19, "div", 8)(20, "div", 9)(21, "span", 10);
      \u0275\u0275text(22, "Nouvelles demandes");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(23, TerraNovaDashboard_Conditional_23_Template, 2, 0, "a", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(24, TerraNovaDashboard_For_25_Template, 10, 8, "button", 12, _forTrack0, false, TerraNovaDashboard_ForEmpty_26_Template, 4, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 8)(28, "div", 9)(29, "span", 10);
      \u0275\u0275text(30, "Priorit\xE9s \xB7 plus forte valeur");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "a", 14);
      \u0275\u0275text(32, "Toutes les demandes");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(33, TerraNovaDashboard_For_34_Template, 9, 7, "button", 12, _forTrack0, false, TerraNovaDashboard_ForEmpty_35_Template, 2, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 15)(37, "div", 8)(38, "div", 2);
      \u0275\u0275text(39, "R\xE9partition par difficult\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 16);
      \u0275\u0275repeaterCreate(41, TerraNovaDashboard_For_42_Template, 9, 10, "div", 17, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 8)(44, "div", 18)(45, "span", 10);
      \u0275\u0275text(46, "Pipeline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "a", 19);
      \u0275\u0275text(48, "Ouvrir le Kanban");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 20);
      \u0275\u0275repeaterCreate(50, TerraNovaDashboard_For_51_Template, 4, 4, "a", 21, _forTrack1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div", 22)(53, "span", 23);
      \u0275\u0275text(54, "Progression");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "span");
      \u0275\u0275text(56);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(57, "p-progressbar", 24);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_0_0 = ((tmp_0_0 = ctx.store.session()) == null ? null : tmp_0_0.last_sync_success_at) && ctx.store.session()) ? 4 : 5, tmp_0_0);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_1_0 = ctx.countdownState()) === "running" ? 10 : tmp_1_0 === "imminent" ? 11 : tmp_1_0 === "finished" ? 12 : tmp_1_0 === "inactive" ? 13 : 14);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.store.loaded() ? 16 : 17);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.store.unreadCount() ? 23 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.freshRequests());
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.store.priorities());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.store.stats().byDifficulty);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.statuses);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("", ctx.store.stats().donePercent, " %");
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(11, _c02));
      \u0275\u0275property("value", ctx.store.stats().donePercent)("showValue", false);
    }
  }, dependencies: [RouterLink, ProgressBarModule, ProgressBar, SkeletonModule, Skeleton, TagModule, Tag, TooltipModule, Tooltip, CountdownPipe, XpPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaDashboard, [{
    type: Component,
    args: [{ selector: "app-terra-nova-dashboard", imports: [RouterLink, ProgressBarModule, SkeletonModule, TagModule, TooltipModule, CountdownPipe, XpPipe], template: `<!-- 1. Session -->
<div class="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-5">
    <div class="card mb-0! xl:col-span-3">
        <div class="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-color">Session actuelle</div>
        @if (store.session()?.last_sync_success_at && store.session(); as s) {
            <div class="mb-5 flex items-center gap-2 font-semibold">
                <span class="inline-block h-2.5 w-2.5 rounded-full" [class.bg-green-500]="store.isActive()" [class.bg-surface-400]="!store.isActive()"></span>
                {{ store.isActive() ? 'Session active' : s.status === 'none' ? 'Aucune session active' : 'Session ' + s.status }}
                @if (s.elapsed_minutes > 0) {
                    <span class="font-normal text-muted-color">\xB7 {{ elapsedLabel() }} \xE9coul\xE9es</span>
                }
            </div>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                    <div class="text-sm text-muted-color">Vague actuelle</div>
                    <div class="text-3xl font-bold">#{{ s.current_wave }}</div>
                </div>
                <div>
                    <div class="text-sm text-muted-color">Demandes disponibles</div>
                    <div class="text-3xl font-bold">{{ s.visible_requests_count }}</div>
                </div>
                <div>
                    <div class="text-sm text-muted-color">Demandes initiales</div>
                    <div class="text-3xl font-bold">{{ s.initial_requests_count }}</div>
                </div>
                <div>
                    <div class="text-sm text-muted-color">Demandes des vagues</div>
                    <div class="text-3xl font-bold">{{ s.wave_requests_count }}</div>
                </div>
            </div>
        } @else {
            <p-skeleton height="1.25rem" width="40%" styleClass="mb-4" />
            <p-skeleton height="3.5rem" />
        }
    </div>

    <div class="card mb-0! flex flex-col gap-1 xl:col-span-2">
        <div class="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-color">
            Prochaine vague
            <i class="pi pi-info-circle cursor-help" pTooltip="Affichage uniquement : la synchronisation avec l'API a lieu toutes les 30 s, ind\xE9pendamment de ce compte \xE0 rebours." tooltipPosition="left"></i>
        </div>
        @switch (countdownState()) {
            @case ('running') {
                <div class="text-lg font-semibold">Vague #{{ store.session()?.next_wave_number }}</div>
                <div class="text-sm text-muted-color">Prochaine diffusion dans</div>
                <div class="font-mono text-4xl font-bold text-primary">{{ store.msUntilNextWave() | countdown }}</div>
            }
            @case ('imminent') {
                <div class="text-lg font-semibold">Vague #{{ store.session()?.next_wave_number }}</div>
                <div class="text-sm text-muted-color">Diffusion imminente</div>
                <div class="mb-2 font-mono text-4xl font-bold text-amber-500">00:00:00</div>
                <p-progressbar mode="indeterminate" [style]="{ height: '4px' }" />
            }
            @case ('finished') {
                <div class="text-lg font-semibold">Aucune vague planifi\xE9e</div>
                <div class="text-sm text-muted-color">Toutes les vagues ont \xE9t\xE9 diffus\xE9es.</div>
            }
            @case ('inactive') {
                <div class="text-lg font-semibold">En attente</div>
                <div class="text-sm text-muted-color">Le concours n'a pas encore d\xE9marr\xE9.</div>
            }
            @default {
                <p-skeleton height="1.25rem" width="50%" styleClass="mb-3" />
                <p-skeleton height="3rem" />
            }
        }
    </div>
</div>

<!-- Statistiques -->
<div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
    @if (!store.loaded()) {
        @for (i of [1, 2, 3, 4, 5]; track i) {
            <div class="card mb-0!"><p-skeleton height="3.25rem" /></div>
        }
    } @else {
        <a routerLink="demandes" class="card mb-0! flex flex-col gap-1 border border-transparent text-color no-underline hover:border-primary">
            <span class="text-sm text-muted-color">Demandes disponibles</span>
            <span class="text-2xl font-bold">{{ store.stats().total }}</span>
        </a>
        <a routerLink="notifications" class="card mb-0! flex flex-col gap-1 border border-transparent text-color no-underline hover:border-primary">
            <span class="text-sm text-muted-color">Nouvelles demandes</span>
            <span class="text-2xl font-bold text-primary">{{ store.stats().fresh }}</span>
        </a>
        <a routerLink="pipeline" class="card mb-0! flex flex-col gap-1 border border-transparent text-color no-underline hover:border-primary">
            <span class="text-sm text-muted-color">En cours</span>
            <span class="text-2xl font-bold">{{ store.stats().inProgress }}</span>
            @if (store.stats().validation) {
                <span class="text-xs text-muted-color">+ {{ store.stats().validation }} en validation</span>
            }
        </a>
        <a routerLink="pipeline" class="card mb-0! flex flex-col gap-1 border border-transparent text-color no-underline hover:border-primary">
            <span class="text-sm text-muted-color">Termin\xE9es</span>
            <span class="text-2xl font-bold">{{ store.stats().done }}</span>
            <span class="text-xs text-muted-color">{{ store.stats().donePercent }} % des demandes</span>
        </a>
        <div class="card mb-0! flex flex-col gap-1">
            <span class="text-sm text-muted-color">XP disponibles</span>
            <span class="text-2xl font-bold">{{ store.stats().xpAvailable | xp }}</span>
            <span class="text-xs text-muted-color">{{ store.stats().xpDone | xp }} termin\xE9s</span>
        </div>
    }
</div>

<div class="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
    <!-- 2. Nouvelles demandes -->
    <div class="card mb-0!">
        <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wide text-muted-color">Nouvelles demandes</span>
            @if (store.unreadCount()) {
                <a routerLink="notifications" class="text-sm text-primary">Tout voir</a>
            }
        </div>
        @for (r of freshRequests(); track r.request_code) {
            <button type="button" class="flex w-full cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent px-2 py-2.5 text-left text-color hover:bg-emphasis" (click)="store.openDetail(r.request_code)">
                <span class="inline-block h-2 w-2 shrink-0 rounded-full bg-primary"></span>
                <span class="font-mono font-semibold">{{ r.request_code }}</span>
                <span class="line-clamp-2 min-w-0 flex-1 text-sm text-muted-color">{{ r.message_public }}</span>
                <p-tag [value]="difficultyLabel(r.difficulty_level, r.difficulty)" [severity]="difficultySeverity(r.difficulty_level)" styleClass="whitespace-nowrap" />
                <span class="w-20 shrink-0 text-right font-semibold whitespace-nowrap">{{ r.xp_total | xp: true }}</span>
            </button>
        } @empty {
            <div class="flex flex-col items-center gap-2 py-8 text-muted-color">
                <i class="pi pi-check-circle text-2xl"></i>
                <span>Aucune nouvelle demande non lue.</span>
            </div>
        }
    </div>

    <!-- 3. Priorit\xE9s -->
    <div class="card mb-0!">
        <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wide text-muted-color">Priorit\xE9s \xB7 plus forte valeur</span>
            <a routerLink="demandes" class="text-sm text-primary">Toutes les demandes</a>
        </div>
        @for (r of store.priorities(); track r.request_code) {
            <button type="button" class="flex w-full cursor-pointer items-center gap-3 rounded-md border-0 bg-transparent px-2 py-2.5 text-left text-color hover:bg-emphasis" (click)="store.openDetail(r.request_code)">
                <span class="font-mono font-semibold">{{ r.request_code }}</span>
                <span class="line-clamp-2 min-w-0 flex-1 text-sm text-muted-color">{{ r.message_public }}</span>
                <p-tag [value]="statusMeta(r.status).label" [severity]="statusMeta(r.status).severity" styleClass="whitespace-nowrap" />
                <span class="w-20 shrink-0 text-right font-semibold whitespace-nowrap">{{ r.xp_total | xp }}</span>
            </button>
        } @empty {
            @if (store.loaded()) {
                <div class="flex flex-col items-center gap-2 py-8 text-muted-color">
                    <i class="pi pi-inbox text-2xl"></i>
                    <span>Aucune demande \xE0 traiter.</span>
                </div>
            } @else {
                <p-skeleton height="12rem" />
            }
        }
    </div>
</div>

<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
    <!-- Difficult\xE9 -->
    <div class="card mb-0!">
        <div class="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-color">R\xE9partition par difficult\xE9</div>
        <div class="flex flex-col gap-3">
            @for (d of store.stats().byDifficulty; track d.value) {
                <div class="grid grid-cols-[5.5rem_1fr_2rem_6rem] items-center gap-3">
                    <p-tag [value]="d.label" [severity]="difficultySeverity(d.value)" />
                    <div class="h-2 overflow-hidden rounded bg-emphasis">
                        <div class="h-full rounded transition-all" [class]="barColors[d.value]" [style.width.%]="(d.count / maxDifficultyCount()) * 100"></div>
                    </div>
                    <span class="text-right font-semibold">{{ d.count }}</span>
                    <span class="text-right text-sm text-muted-color">{{ d.xp | xp }}</span>
                </div>
            }
        </div>
    </div>

    <!-- 4. Pipeline -->
    <div class="card mb-0!">
        <div class="mb-4 flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wide text-muted-color">Pipeline</span>
            <a routerLink="pipeline" class="text-sm text-primary">Ouvrir le Kanban</a>
        </div>
        <div class="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            @for (s of statuses; track s.value) {
                <a routerLink="pipeline" class="flex flex-col items-start gap-2 rounded-lg border border-surface p-3 text-color no-underline hover:border-primary">
                    <p-tag [value]="s.label" [severity]="s.severity" [icon]="s.icon" />
                    <span class="text-2xl font-bold">{{ columnCount(s.value) }}</span>
                </a>
            }
        </div>
        <div class="mb-1 flex justify-between text-sm">
            <span class="text-muted-color">Progression</span>
            <span>{{ store.stats().donePercent }} %</span>
        </div>
        <p-progressbar [value]="store.stats().donePercent" [showValue]="false" [style]="{ height: '8px' }" />
    </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerraNovaDashboard, { className: "TerraNovaDashboard", filePath: "src/app/terra-nova/dashboard/tn-dashboard.ts", lineNumber: 19 });
})();
export {
  TerraNovaDashboard
};
//# sourceMappingURL=chunk-DEMWNT3Z.js.map
