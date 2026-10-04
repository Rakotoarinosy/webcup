import {
  CitizenRequestService
} from "./chunk-QNPZAXSG.js";
import {
  REQUEST_CATEGORIES,
  REQUEST_STATUSES,
  eventLabel
} from "./chunk-KJD3IBMG.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  Dialog,
  DialogModule
} from "./chunk-ZWCF3HLH.js";
import {
  Motion,
  MotionModule
} from "./chunk-KLPUC4MO.js";
import {
  transformToBoolean
} from "./chunk-NAF47H6O.js";
import {
  Button,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RadioControlValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BX45OWY6.js";
import {
  BaseComponent,
  BaseStyle,
  Bind,
  BindModule,
  PARENT_INSTANCE,
  PrimeTemplate,
  SharedModule,
  Y,
  h2 as h,
  s2 as s
} from "./chunk-YMMGU7DJ.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DatePipe,
  DestroyRef,
  HttpErrorResponse,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgTemplateOutlet,
  Output,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  computed,
  contentChild,
  contentChildren,
  effect,
  finalize,
  forwardRef,
  inject,
  input,
  model,
  setClassMetadata,
  signal,
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
  ɵɵcontentQuerySignal,
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
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// node_modules/@primeuix/styles/dist/stepper/index.mjs
var style = "\n    .p-steplist {\n        position: relative;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        overflow-x: auto;\n    }\n\n    .p-step {\n        position: relative;\n        display: flex;\n        flex: 1 1 auto;\n        align-items: center;\n        gap: dt('stepper.step.gap');\n        padding: dt('stepper.step.padding');\n    }\n\n    .p-step:last-of-type {\n        flex: initial;\n    }\n\n    .p-step-header {\n        border: 0 none;\n        display: inline-flex;\n        align-items: center;\n        text-decoration: none;\n        cursor: pointer;\n        transition:\n            background dt('stepper.transition.duration'),\n            color dt('stepper.transition.duration'),\n            border-color dt('stepper.transition.duration'),\n            outline-color dt('stepper.transition.duration'),\n            box-shadow dt('stepper.transition.duration');\n        border-radius: dt('stepper.step.header.border.radius');\n        outline-color: transparent;\n        background: transparent;\n        padding: dt('stepper.step.header.padding');\n        gap: dt('stepper.step.header.gap');\n    }\n\n    .p-step-header:focus-visible {\n        box-shadow: dt('stepper.step.header.focus.ring.shadow');\n        outline: dt('stepper.step.header.focus.ring.width') dt('stepper.step.header.focus.ring.style') dt('stepper.step.header.focus.ring.color');\n        outline-offset: dt('stepper.step.header.focus.ring.offset');\n    }\n\n    .p-stepper.p-stepper-readonly .p-step {\n        cursor: auto;\n    }\n\n    .p-step-title {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        max-width: 100%;\n        color: dt('stepper.step.title.color');\n        font-weight: dt('stepper.step.title.font.weight');\n        transition:\n            background dt('stepper.transition.duration'),\n            color dt('stepper.transition.duration'),\n            border-color dt('stepper.transition.duration'),\n            box-shadow dt('stepper.transition.duration'),\n            outline-color dt('stepper.transition.duration');\n    }\n\n    .p-step-number {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        color: dt('stepper.step.number.color');\n        border: 2px solid dt('stepper.step.number.border.color');\n        background: dt('stepper.step.number.background');\n        min-width: dt('stepper.step.number.size');\n        height: dt('stepper.step.number.size');\n        line-height: dt('stepper.step.number.size');\n        font-size: dt('stepper.step.number.font.size');\n        z-index: 1;\n        border-radius: dt('stepper.step.number.border.radius');\n        position: relative;\n        font-weight: dt('stepper.step.number.font.weight');\n    }\n\n    .p-step-number::after {\n        content: ' ';\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        border-radius: dt('stepper.step.number.border.radius');\n        box-shadow: dt('stepper.step.number.shadow');\n    }\n\n    .p-step-active .p-step-header {\n        cursor: default;\n    }\n\n    .p-step-active .p-step-number {\n        background: dt('stepper.step.number.active.background');\n        border-color: dt('stepper.step.number.active.border.color');\n        color: dt('stepper.step.number.active.color');\n    }\n\n    .p-step-active .p-step-title {\n        color: dt('stepper.step.title.active.color');\n    }\n\n    .p-step:not(.p-disabled):focus-visible {\n        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');\n        outline-offset: dt('focus.ring.offset');\n    }\n\n    .p-step:has(~ .p-step-active) .p-stepper-separator {\n        background: dt('stepper.separator.active.background');\n    }\n\n    .p-stepper-separator {\n        flex: 1 1 0;\n        background: dt('stepper.separator.background');\n        width: 100%;\n        height: dt('stepper.separator.size');\n        transition:\n            background dt('stepper.transition.duration'),\n            color dt('stepper.transition.duration'),\n            border-color dt('stepper.transition.duration'),\n            box-shadow dt('stepper.transition.duration'),\n            outline-color dt('stepper.transition.duration');\n    }\n\n    .p-steppanels {\n        padding: dt('stepper.steppanels.padding');\n    }\n\n    .p-steppanel {\n        background: dt('stepper.steppanel.background');\n        color: dt('stepper.steppanel.color');\n    }\n\n    .p-stepper:has(.p-stepitem) {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-stepitem {\n        display: flex;\n        flex-direction: column;\n        flex: initial;\n    }\n\n    .p-stepitem.p-stepitem-active {\n        flex: 1 1 auto;\n    }\n\n    .p-stepitem .p-step {\n        flex: initial;\n    }\n    \n    .p-stepitem .p-steppanel {\n        display: grid;\n        grid-template-rows: 1fr;\n    }\n\n    .p-stepitem .p-steppanel-content-wrapper {\n        display: flex;\n        flex: 1 1 auto;\n        min-height: 0;\n    }\n    .p-stepitem .p-steppanel-content {\n        width: 100%;\n        padding: dt('stepper.steppanel.padding');\n        margin-inline-start: 1rem;\n    }\n\n    .p-stepitem .p-stepper-separator {\n        flex: 0 0 auto;\n        width: dt('stepper.separator.size');\n        height: auto;\n        margin: dt('stepper.separator.margin');\n        position: relative;\n        left: calc(-1 * dt('stepper.separator.size'));\n    }\n\n    .p-stepitem .p-stepper-separator:dir(rtl) {\n        left: calc(-9 * dt('stepper.separator.size'));\n    }\n\n    .p-stepitem:has(~ .p-stepitem-active) .p-stepper-separator {\n        background: dt('stepper.separator.active.background');\n    }\n\n    .p-stepitem:last-of-type .p-steppanel {\n        padding-inline-start: dt('stepper.step.number.size');\n    }\n";

// node_modules/primeng/fesm2022/primeng-stepper.mjs
var _c0 = ["*"];
var _c1 = ["content"];
var _c2 = (a0, a1, a2) => ({
  activateCallback: a0,
  value: a1,
  active: a2
});
function Step_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-stepper-separator");
  }
}
function Step_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 0);
    \u0275\u0275listener("click", function Step_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onStepClick());
    });
    \u0275\u0275elementStart(1, "span", 1);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 1);
    \u0275\u0275projection(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, Step_Conditional_0_Conditional_5_Template, 1, 0, "p-stepper-separator");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.cx("header"));
    \u0275\u0275property("pBind", ctx_r1.ptm("header"))("tabindex", ctx_r1.isStepDisabled() ? -1 : void 0)("disabled", ctx_r1.isStepDisabled());
    \u0275\u0275attribute("id", ctx_r1.id())("role", "tab")("aria-controls", ctx_r1.ariaControls());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.cx("number"));
    \u0275\u0275property("pBind", ctx_r1.ptm("number"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.value());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.cx("title"));
    \u0275\u0275property("pBind", ctx_r1.ptm("title"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isSeparatorVisible() ? 5 : -1);
  }
}
function Step_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Step_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-stepper-separator");
  }
}
function Step_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Step_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 2);
    \u0275\u0275conditionalCreate(1, Step_Conditional_1_Conditional_1_Template, 1, 0, "p-stepper-separator");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.content || ctx_r1._contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction3(3, _c2, ctx_r1.onStepClick.bind(ctx_r1), ctx_r1.value(), ctx_r1.active()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSeparatorVisible() ? 1 : -1);
  }
}
function StepPanel_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-stepper-separator");
  }
}
function StepPanel_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
var classes$5 = {
  root: ({
    instance
  }) => ["p-stepitem", {
    "p-stepitem-active": instance.isActive()
  }]
};
var StepItemStyle = class _StepItemStyle extends BaseStyle {
  name = "stepitem";
  classes = classes$5;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepItemStyle_BaseFactory;
    return function StepItemStyle_Factory(__ngFactoryType__) {
      return (\u0275StepItemStyle_BaseFactory || (\u0275StepItemStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepItemStyle)))(__ngFactoryType__ || _StepItemStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepItemStyle,
    factory: _StepItemStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepItemStyle, [{
    type: Injectable
  }], null, null);
})();
var StepItemClasses;
(function(StepItemClasses2) {
  StepItemClasses2["root"] = "p-stepitem";
})(StepItemClasses || (StepItemClasses = {}));
var classes$4 = {
  root: "p-steplist"
};
var StepListStyle = class _StepListStyle extends BaseStyle {
  name = "steplist";
  classes = classes$4;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepListStyle_BaseFactory;
    return function StepListStyle_Factory(__ngFactoryType__) {
      return (\u0275StepListStyle_BaseFactory || (\u0275StepListStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepListStyle)))(__ngFactoryType__ || _StepListStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepListStyle,
    factory: _StepListStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepListStyle, [{
    type: Injectable
  }], null, null);
})();
var StepListClasses;
(function(StepListClasses2) {
  StepListClasses2["root"] = "p-stepitem";
})(StepListClasses || (StepListClasses = {}));
var classes$3 = {
  root: "p-steppanels"
};
var StepPanelsStyle = class _StepPanelsStyle extends BaseStyle {
  name = "steppanel";
  classes = classes$3;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepPanelsStyle_BaseFactory;
    return function StepPanelsStyle_Factory(__ngFactoryType__) {
      return (\u0275StepPanelsStyle_BaseFactory || (\u0275StepPanelsStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepPanelsStyle)))(__ngFactoryType__ || _StepPanelsStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepPanelsStyle,
    factory: _StepPanelsStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepPanelsStyle, [{
    type: Injectable
  }], null, null);
})();
var StepPanelsClasses;
(function(StepPanelsClasses2) {
  StepPanelsClasses2["root"] = "p-steppanels";
})(StepPanelsClasses || (StepPanelsClasses = {}));
var classes$2 = {
  root: ({
    instance
  }) => ["p-steppanel", {
    "p-steppanel-active": instance.isVertical() && instance.active()
  }],
  contentWrapper: "p-steppanel-content-wrapper",
  content: "p-steppanel-content"
};
var StepPanelStyle = class _StepPanelStyle extends BaseStyle {
  name = "steppanel";
  classes = classes$2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepPanelStyle_BaseFactory;
    return function StepPanelStyle_Factory(__ngFactoryType__) {
      return (\u0275StepPanelStyle_BaseFactory || (\u0275StepPanelStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepPanelStyle)))(__ngFactoryType__ || _StepPanelStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepPanelStyle,
    factory: _StepPanelStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepPanelStyle, [{
    type: Injectable
  }], null, null);
})();
var StepPanelClasses;
(function(StepPanelClasses2) {
  StepPanelClasses2["root"] = "p-steppanel";
  StepPanelClasses2["contentWrapper"] = "p-steppanel-content-wrapper";
  StepPanelClasses2["content"] = "p-steppanel-content";
})(StepPanelClasses || (StepPanelClasses = {}));
var style2 = (
  /*css*/
  `
${style}

.p-steppanel .p-motion {
    display: grid;
    grid-template-rows: 1fr;
}
`
);
var classes$1 = {
  root: ({
    instance
  }) => ["p-stepper p-component", {
    "p-readonly": instance.linear()
  }],
  separator: "p-stepper-separator"
};
var StepperStyle = class _StepperStyle extends BaseStyle {
  name = "stepper";
  style = style2;
  classes = classes$1;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepperStyle_BaseFactory;
    return function StepperStyle_Factory(__ngFactoryType__) {
      return (\u0275StepperStyle_BaseFactory || (\u0275StepperStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepperStyle)))(__ngFactoryType__ || _StepperStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepperStyle,
    factory: _StepperStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperStyle, [{
    type: Injectable
  }], null, null);
})();
var StepperClasses;
(function(StepperClasses2) {
  StepperClasses2["root"] = "p-stepper";
  StepperClasses2["separator"] = "p-stepper-separator";
})(StepperClasses || (StepperClasses = {}));
var classes = {
  root: ({
    instance
  }) => ["p-step", {
    "p-step-active": instance.active(),
    "p-disabled": instance.isStepDisabled()
  }],
  header: "p-step-header",
  number: "p-step-number",
  title: "p-step-title"
};
var StepStyle = class _StepStyle extends BaseStyle {
  name = "step";
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepStyle_BaseFactory;
    return function StepStyle_Factory(__ngFactoryType__) {
      return (\u0275StepStyle_BaseFactory || (\u0275StepStyle_BaseFactory = \u0275\u0275getInheritedFactory(_StepStyle)))(__ngFactoryType__ || _StepStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _StepStyle,
    factory: _StepStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepStyle, [{
    type: Injectable
  }], null, null);
})();
var StepClasses;
(function(StepClasses2) {
  StepClasses2["root"] = "p-step";
  StepClasses2["header"] = "p-step-header";
  StepClasses2["number"] = "p-step-number";
  StepClasses2["title"] = "p-step-title";
})(StepClasses || (StepClasses = {}));
var STEPPER_INSTANCE = new InjectionToken("STEPPER_INSTANCE");
var STEPLIST_INSTANCE = new InjectionToken("STEPLIST_INSTANCE");
var STEPITEM_INSTANCE = new InjectionToken("STEPITEM_INSTANCE");
var STEP_INSTANCE = new InjectionToken("STEP_INSTANCE");
var STEPPANEL_INSTANCE = new InjectionToken("STEPPANEL_INSTANCE");
var STEPPANELS_INSTANCE = new InjectionToken("STEPPANELS_INSTANCE");
var STEPPERSEPARATOR_INSTANCE = new InjectionToken("STEPPERSEPARATOR_INSTANCE");
var StepList = class _StepList extends BaseComponent {
  $pcStepList = inject(STEPLIST_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  steps = contentChildren(forwardRef(() => Step), ...ngDevMode ? [{
    debugName: "steps"
  }] : []);
  _componentStyle = inject(StepListStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepList_BaseFactory;
    return function StepList_Factory(__ngFactoryType__) {
      return (\u0275StepList_BaseFactory || (\u0275StepList_BaseFactory = \u0275\u0275getInheritedFactory(_StepList)))(__ngFactoryType__ || _StepList);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _StepList,
    selectors: [["p-step-list"]],
    contentQueries: function StepList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx.steps, Step, 4);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
      }
    },
    hostVars: 2,
    hostBindings: function StepList_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    features: [\u0275\u0275ProvidersFeature([StepListStyle, {
      provide: STEPLIST_INSTANCE,
      useExisting: _StepList
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _StepList
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function StepList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepList, [{
    type: Component,
    args: [{
      selector: "p-step-list",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")'
      },
      providers: [StepListStyle, {
        provide: STEPLIST_INSTANCE,
        useExisting: StepList
      }, {
        provide: PARENT_INSTANCE,
        useExisting: StepList
      }],
      hostDirectives: [Bind]
    }]
  }], null, {
    steps: [{
      type: ContentChildren,
      args: [forwardRef(() => Step), {
        isSignal: true
      }]
    }]
  });
})();
var StepperSeparator = class _StepperSeparator extends BaseComponent {
  $pcStepperSeparator = inject(STEPPERSEPARATOR_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  _componentStyle = inject(StepperStyle);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepperSeparator_BaseFactory;
    return function StepperSeparator_Factory(__ngFactoryType__) {
      return (\u0275StepperSeparator_BaseFactory || (\u0275StepperSeparator_BaseFactory = \u0275\u0275getInheritedFactory(_StepperSeparator)))(__ngFactoryType__ || _StepperSeparator);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _StepperSeparator,
    selectors: [["p-stepper-separator"]],
    hostVars: 2,
    hostBindings: function StepperSeparator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("separator"));
      }
    },
    features: [\u0275\u0275ProvidersFeature([StepperStyle, {
      provide: STEPPERSEPARATOR_INSTANCE,
      useExisting: _StepperSeparator
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _StepperSeparator
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function StepperSeparator_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperSeparator, [{
    type: Component,
    args: [{
      selector: "p-stepper-separator",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("separator")'
      },
      providers: [StepperStyle, {
        provide: STEPPERSEPARATOR_INSTANCE,
        useExisting: StepperSeparator
      }, {
        provide: PARENT_INSTANCE,
        useExisting: StepperSeparator
      }],
      hostDirectives: [Bind]
    }]
  }], null, null);
})();
var StepItem = class _StepItem extends BaseComponent {
  $pcStepItem = inject(STEPITEM_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  _componentStyle = inject(StepItemStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  pcStepper = inject(forwardRef(() => Stepper));
  /**
   * Value of step.
   * @type {<number | undefined>}
   * @defaultValue undefined
   * @group Props
   */
  value = model(...ngDevMode ? [void 0, {
    debugName: "value"
  }] : []);
  isActive = computed(() => this.pcStepper.value() === this.value(), ...ngDevMode ? [{
    debugName: "isActive"
  }] : []);
  step = contentChild(forwardRef(() => Step), ...ngDevMode ? [{
    debugName: "step"
  }] : []);
  stepPanel = contentChild(forwardRef(() => StepPanel), ...ngDevMode ? [{
    debugName: "stepPanel"
  }] : []);
  constructor() {
    super();
    effect(() => {
      this.step().value.set(this.value());
    });
    effect(() => {
      this.stepPanel().value.set(this.value());
    });
  }
  static \u0275fac = function StepItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepItem)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _StepItem,
    selectors: [["p-step-item"]],
    contentQueries: function StepItem_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx.step, Step, 5)(dirIndex, ctx.stepPanel, StepPanel, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance(2);
      }
    },
    hostVars: 3,
    hostBindings: function StepItem_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("data-p-active", ctx.isActive());
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [\u0275\u0275ProvidersFeature([StepItemStyle, {
      provide: STEPITEM_INSTANCE,
      useExisting: _StepItem
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _StepItem
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function StepItem_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    dependencies: [CommonModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepItem, [{
    type: Component,
    args: [{
      selector: "p-step-item",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")',
        "[attr.data-p-active]": "isActive()"
      },
      providers: [StepItemStyle, {
        provide: STEPITEM_INSTANCE,
        useExisting: StepItem
      }, {
        provide: PARENT_INSTANCE,
        useExisting: StepItem
      }],
      hostDirectives: [Bind]
    }]
  }], () => [], {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    step: [{
      type: ContentChild,
      args: [forwardRef(() => Step), {
        isSignal: true
      }]
    }],
    stepPanel: [{
      type: ContentChild,
      args: [forwardRef(() => StepPanel), {
        isSignal: true
      }]
    }]
  });
})();
var Step = class _Step extends BaseComponent {
  $pcStep = inject(STEP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  pcStepper = inject(forwardRef(() => Stepper));
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Active value of stepper.
   * @type {number}
   * @defaultValue undefined
   * @group Props
   */
  value = model(...ngDevMode ? [void 0, {
    debugName: "value"
  }] : []);
  /**
   * Whether the step is disabled.
   * @type {boolean}
   * @defaultValue false
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disabled"
  } : {}), {
    transform: (v) => transformToBoolean(v)
  }));
  active = computed(() => this.pcStepper.isStepActive(this.value()), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  isStepDisabled = computed(() => !this.active() && (this.pcStepper.linear() || this.disabled()), ...ngDevMode ? [{
    debugName: "isStepDisabled"
  }] : []);
  id = computed(() => `${this.pcStepper.id()}_step_${this.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  ariaControls = computed(() => `${this.pcStepper.id()}_steppanel_${this.value()}`, ...ngDevMode ? [{
    debugName: "ariaControls"
  }] : []);
  isSeparatorVisible = computed(() => {
    if (this.pcStepper.stepList()) {
      const steps = this.pcStepper.stepList().steps();
      const index = steps.indexOf(this);
      const stepLen = steps.length;
      return index !== stepLen - 1;
    } else {
      return false;
    }
  }, ...ngDevMode ? [{
    debugName: "isSeparatorVisible"
  }] : []);
  /**
   * Content template.
   * @type {TemplateRef<StepContentTemplateContext>}
   * @group Templates
   */
  content;
  templates;
  _contentTemplate;
  _componentStyle = inject(StepStyle);
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  onStepClick() {
    this.pcStepper.updateValue(this.value());
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Step_BaseFactory;
    return function Step_Factory(__ngFactoryType__) {
      return (\u0275Step_BaseFactory || (\u0275Step_BaseFactory = \u0275\u0275getInheritedFactory(_Step)))(__ngFactoryType__ || _Step);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Step,
    selectors: [["p-step"]],
    contentQueries: function Step_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c1, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 6,
    hostBindings: function Step_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-current", ctx.active() ? "step" : void 0)("role", "presentation")("data-p-active", ctx.active())("data-p-disabled", ctx.isStepDisabled());
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"],
      disabled: [1, "disabled"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [\u0275\u0275ProvidersFeature([StepStyle, {
      provide: STEP_INSTANCE,
      useExisting: _Step
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Step
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 1,
    consts: [["type", "button", 3, "click", "pBind", "tabindex", "disabled"], [3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function Step_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275conditionalCreate(0, Step_Conditional_0_Template, 6, 16)(1, Step_Conditional_1_Template, 2, 7);
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.content && !ctx._contentTemplate ? 0 : 1);
      }
    },
    dependencies: [CommonModule, NgTemplateOutlet, StepperSeparator, SharedModule, BindModule, Bind],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Step, [{
    type: Component,
    args: [{
      selector: "p-step",
      standalone: true,
      imports: [CommonModule, StepperSeparator, SharedModule, BindModule],
      template: `
        @if (!content && !_contentTemplate) {
            <button
                [attr.id]="id()"
                [class]="cx('header')"
                [pBind]="ptm('header')"
                [attr.role]="'tab'"
                [tabindex]="isStepDisabled() ? -1 : undefined"
                [attr.aria-controls]="ariaControls()"
                [disabled]="isStepDisabled()"
                (click)="onStepClick()"
                type="button"
            >
                <span [class]="cx('number')" [pBind]="ptm('number')">{{ value() }}</span>
                <span [class]="cx('title')" [pBind]="ptm('title')">
                    <ng-content></ng-content>
                </span>
            </button>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        } @else {
            <ng-container *ngTemplateOutlet="content || _contentTemplate; context: { activateCallback: onStepClick.bind(this), value: value(), active: active() }"></ng-container>
            @if (isSeparatorVisible()) {
                <p-stepper-separator />
            }
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")',
        "[attr.aria-current]": 'active() ? "step" : undefined',
        "[attr.role]": '"presentation"',
        "[attr.data-p-active]": "active()",
        "[attr.data-p-disabled]": "isStepDisabled()"
      },
      providers: [StepStyle, {
        provide: STEP_INSTANCE,
        useExisting: Step
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Step
      }],
      hostDirectives: [Bind]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    disabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    content: [{
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
var StepPanel = class _StepPanel extends BaseComponent {
  $pcStepPanel = inject(STEPPANEL_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  pcStepper = inject(forwardRef(() => Stepper));
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Active value of stepper.
   * @type {number}
   * @defaultValue undefined
   * @group Props
   */
  value = model(void 0, ...ngDevMode ? [{
    debugName: "value"
  }] : []);
  active = computed(() => this.pcStepper.value() === this.value(), ...ngDevMode ? [{
    debugName: "active"
  }] : []);
  ariaControls = computed(() => `${this.pcStepper.id()}_step_${this.value()}`, ...ngDevMode ? [{
    debugName: "ariaControls"
  }] : []);
  id = computed(() => `${this.pcStepper.id()}_steppanel_${this.value()}`, ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  isVertical = computed(() => this.pcStepper.stepItems().length > 0, ...ngDevMode ? [{
    debugName: "isVertical"
  }] : []);
  isSeparatorVisible = computed(() => {
    if (this.pcStepper.stepItems()) {
      const stepLen = this.pcStepper.stepItems().length;
      const stepPanelElements = Y(this.pcStepper.el.nativeElement, '[data-pc-name="steppanel"]');
      const index = h(this.el.nativeElement, stepPanelElements);
      return index !== stepLen - 1;
    }
  }, ...ngDevMode ? [{
    debugName: "isSeparatorVisible"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.pcStepper.computedMotionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * Content template.
   * @param {StepPanelContentTemplateContext} context - Context of the template
   * @see {@link StepPanelContentTemplateContext}
   * @group Templates
   */
  contentTemplate;
  templates;
  _contentTemplate;
  _componentStyle = inject(StepPanelStyle);
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "content":
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  updateValue(value) {
    this.pcStepper.updateValue(value);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepPanel_BaseFactory;
    return function StepPanel_Factory(__ngFactoryType__) {
      return (\u0275StepPanel_BaseFactory || (\u0275StepPanel_BaseFactory = \u0275\u0275getInheritedFactory(_StepPanel)))(__ngFactoryType__ || _StepPanel);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _StepPanel,
    selectors: [["p-step-panel"]],
    contentQueries: function StepPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c1, 5)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 7,
    hostBindings: function StepPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("role", "tabpanel")("aria-controls", ctx.ariaControls())("id", ctx.id())("data-p-active", ctx.active())("data-pc-name", "steppanel");
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [\u0275\u0275ProvidersFeature([StepPanelStyle, {
      provide: STEPPANEL_INSTANCE,
      useExisting: _StepPanel
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _StepPanel
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    decls: 5,
    vars: 16,
    consts: [["name", "p-collapsible", 3, "visible", "disabled", "options"], [3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function StepPanel_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "p-motion", 0)(1, "div", 1);
        \u0275\u0275conditionalCreate(2, StepPanel_Conditional_2_Template, 1, 0, "p-stepper-separator");
        \u0275\u0275elementStart(3, "div", 1);
        \u0275\u0275template(4, StepPanel_ng_container_4_Template, 1, 0, "ng-container", 2);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275property("visible", ctx.active())("disabled", !ctx.isVertical())("options", ctx.computedMotionOptions());
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.cx("contentWrapper"));
        \u0275\u0275property("pBind", ctx.ptm("contentWrapper"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isSeparatorVisible() ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.cx("content"));
        \u0275\u0275property("pBind", ctx.ptm("content"));
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx.contentTemplate || ctx._contentTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction3(12, _c2, ctx.updateValue.bind(ctx), ctx.value(), ctx.active()));
      }
    },
    dependencies: [CommonModule, NgTemplateOutlet, StepperSeparator, SharedModule, BindModule, Bind, MotionModule, Motion],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepPanel, [{
    type: Component,
    args: [{
      selector: "p-step-panel",
      standalone: true,
      imports: [CommonModule, StepperSeparator, SharedModule, BindModule, MotionModule],
      template: `
        <p-motion [visible]="active()" name="p-collapsible" [disabled]="!isVertical()" [options]="computedMotionOptions()">
            <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                @if (isSeparatorVisible()) {
                    <p-stepper-separator />
                }
                <div [class]="cx('content')" [pBind]="ptm('content')">
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate; context: { activateCallback: updateValue.bind(this), value: value(), active: active() }"></ng-container>
                </div>
            </div>
        </p-motion>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")',
        "[attr.role]": '"tabpanel"',
        "[attr.aria-controls]": "ariaControls()",
        "[attr.id]": "id()",
        "[attr.data-p-active]": "active()",
        "[attr.data-pc-name]": '"steppanel"'
      },
      providers: [StepPanelStyle, {
        provide: STEPPANEL_INSTANCE,
        useExisting: StepPanel
      }, {
        provide: PARENT_INSTANCE,
        useExisting: StepPanel
      }],
      hostDirectives: [Bind]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var StepPanels = class _StepPanels extends BaseComponent {
  $pcStepPanels = inject(STEPPANELS_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  _componentStyle = inject(StepPanelsStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275StepPanels_BaseFactory;
    return function StepPanels_Factory(__ngFactoryType__) {
      return (\u0275StepPanels_BaseFactory || (\u0275StepPanels_BaseFactory = \u0275\u0275getInheritedFactory(_StepPanels)))(__ngFactoryType__ || _StepPanels);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _StepPanels,
    selectors: [["p-step-panels"]],
    hostVars: 2,
    hostBindings: function StepPanels_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    features: [\u0275\u0275ProvidersFeature([StepPanelsStyle, {
      provide: STEPPANELS_INSTANCE,
      useExisting: _StepPanels
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _StepPanels
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function StepPanels_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepPanels, [{
    type: Component,
    args: [{
      selector: "p-step-panels",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": 'cx("root")'
      },
      providers: [StepPanelsStyle, {
        provide: STEPPANELS_INSTANCE,
        useExisting: StepPanels
      }, {
        provide: PARENT_INSTANCE,
        useExisting: StepPanels
      }],
      hostDirectives: [Bind]
    }]
  }], null, null);
})();
var Stepper = class _Stepper extends BaseComponent {
  $pcStepper = inject(STEPPER_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  _componentStyle = inject(StepperStyle);
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * A model that can hold a numeric value or be undefined.
   * @defaultValue undefined
   * @type {ModelSignal<number | undefined>}
   * @group Props
   */
  value = model(void 0, ...ngDevMode ? [{
    debugName: "value"
  }] : []);
  /**
   * A boolean variable that captures user input.
   * @defaultValue false
   * @type {InputSignalWithTransform<any, boolean >}
   * @group Props
   */
  linear = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "linear"
  } : {}), {
    transform: (v) => transformToBoolean(v)
  }));
  /**
   * Transition options of the animation.
   * @defaultValue 400ms cubic-bezier(0.86, 0, 0.07, 1)
   * @type {InputSignal<string >}
   * @group Props
   * @deprecated since v21.0.0, use `motionOptions` instead.
   */
  transitionOptions = input("400ms cubic-bezier(0.86, 0, 0.07, 1)", ...ngDevMode ? [{
    debugName: "transitionOptions"
  }] : []);
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  id = signal(s("pn_id_"), ...ngDevMode ? [{
    debugName: "id"
  }] : []);
  stepItems = contentChildren(StepItem, ...ngDevMode ? [{
    debugName: "stepItems"
  }] : []);
  steps = contentChildren(Step, ...ngDevMode ? [{
    debugName: "steps"
  }] : []);
  stepList = contentChild(StepList, ...ngDevMode ? [{
    debugName: "stepList"
  }] : []);
  updateValue(value) {
    this.value.set(value);
  }
  isStepActive(value) {
    return this.value() === value;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Stepper_BaseFactory;
    return function Stepper_Factory(__ngFactoryType__) {
      return (\u0275Stepper_BaseFactory || (\u0275Stepper_BaseFactory = \u0275\u0275getInheritedFactory(_Stepper)))(__ngFactoryType__ || _Stepper);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Stepper,
    selectors: [["p-stepper"]],
    contentQueries: function Stepper_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx.stepItems, StepItem, 4)(dirIndex, ctx.steps, Step, 4)(dirIndex, ctx.stepList, StepList, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance(3);
      }
    },
    hostVars: 4,
    hostBindings: function Stepper_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("role", "tablist")("id", ctx.id());
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      value: [1, "value"],
      linear: [1, "linear"],
      transitionOptions: [1, "transitionOptions"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      value: "valueChange"
    },
    features: [\u0275\u0275ProvidersFeature([StepperStyle, {
      provide: STEPPER_INSTANCE,
      useExisting: _Stepper
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Stepper
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Stepper_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    dependencies: [CommonModule, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Stepper, [{
    type: Component,
    args: [{
      selector: "p-stepper",
      standalone: true,
      imports: [CommonModule, SharedModule, BindModule],
      template: ` <ng-content></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [StepperStyle, {
        provide: STEPPER_INSTANCE,
        useExisting: Stepper
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Stepper
      }],
      host: {
        "[class]": 'cx("root")',
        "[attr.role]": '"tablist"',
        "[attr.id]": "id()"
      },
      hostDirectives: [Bind]
    }]
  }], null, {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: Output,
      args: ["valueChange"]
    }],
    linear: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "linear",
        required: false
      }]
    }],
    transitionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "transitionOptions",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    stepItems: [{
      type: ContentChildren,
      args: [forwardRef(() => StepItem), {
        isSignal: true
      }]
    }],
    steps: [{
      type: ContentChildren,
      args: [forwardRef(() => Step), {
        isSignal: true
      }]
    }],
    stepList: [{
      type: ContentChild,
      args: [forwardRef(() => StepList), {
        isSignal: true
      }]
    }]
  });
})();
var StepperModule = class _StepperModule {
  static \u0275fac = function StepperModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _StepperModule,
    imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule],
    exports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule, SharedModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperModule, [{
    type: NgModule,
    args: [{
      imports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule],
      exports: [Stepper, StepList, StepPanels, StepPanel, StepItem, Step, StepperSeparator, SharedModule, BindModule]
    }]
  }], null, null);
})();

// src/app/requests/my-requests.ts
var _c02 = () => ({ width: "min(46rem, 96vw)" });
var _c12 = (a0) => ["/home/my-requests", a0];
var _forTrack0 = ($index, $item) => $item.id;
function MyRequests_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Chargement de la demande\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_0_Conditional_6_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Chargement des \xE9tapes\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_0_Conditional_6_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("L\u2019historique des \xE9tapes n\u2019a pas pu \xEAtre charg\xE9 : ", ctx);
  }
}
function MyRequests_Conditional_0_Conditional_6_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 9)(1, "h3", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "time", 11);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.eventLabel(step_r1));
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", step_r1.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, step_r1.created_at, "dd/MM/yyyy \xE0 HH:mm"));
  }
}
function MyRequests_Conditional_0_Conditional_6_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 8);
    \u0275\u0275repeaterCreate(1, MyRequests_Conditional_0_Conditional_6_Conditional_28_For_2_Template, 6, 6, "li", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.statusHistory());
  }
}
function MyRequests_Conditional_0_Conditional_6_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune \xE9tape de traitement n\u2019est encore enregistr\xE9e.");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dl")(5, "dt");
    \u0275\u0275text(6, "R\xE9f\xE9rence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dd");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dt");
    \u0275\u0275text(10, "Statut actuel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd")(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "dt");
    \u0275\u0275text(15, "Cr\xE9\xE9e le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dt");
    \u0275\u0275text(20, "Lieu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "section", 6)(24, "h2", 7);
    \u0275\u0275text(25, "\xC9tapes de traitement");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, MyRequests_Conditional_0_Conditional_6_Conditional_26_Template, 2, 0, "p", 3)(27, MyRequests_Conditional_0_Conditional_6_Conditional_27_Template, 2, 1, "p", 4)(28, MyRequests_Conditional_0_Conditional_6_Conditional_28_Template, 3, 0, "ol", 8)(29, MyRequests_Conditional_0_Conditional_6_Conditional_29_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const request_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r3.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", request_r3.id.slice(0, 8));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r3.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 7, request_r3.created_at, "dd/MM/yyyy \xE0 HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r3.location);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.historyLoading() ? 26 : (tmp_9_0 = ctx_r1.historyError()) ? 27 : ctx_r1.statusHistory().length ? 28 : 29, tmp_9_0);
  }
}
function MyRequests_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "a", 1);
    \u0275\u0275element(2, "i", 2);
    \u0275\u0275text(3, " Retour \xE0 mes demandes ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, MyRequests_Conditional_0_Conditional_4_Template, 2, 0, "p", 3)(5, MyRequests_Conditional_0_Conditional_5_Template, 2, 1, "p", 4)(6, MyRequests_Conditional_0_Conditional_6_Template, 30, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.loading() ? 4 : (tmp_1_0 = ctx_r1.error()) ? 5 : (tmp_1_0 = ctx_r1.selectedRequest()) ? 6 : -1, tmp_1_0);
  }
}
function MyRequests_Conditional_1_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", category_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r5);
  }
}
function MyRequests_Conditional_1_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r6 = ctx.$implicit;
    \u0275\u0275property("ngValue", status_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r6);
  }
}
function MyRequests_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Chargement de vos demandes\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_1_Conditional_32_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 54);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 56)(7, "a", 57);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 58);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 54);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 6, request_r8.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r8.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c12, request_r8.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r8.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r8.status);
  }
}
function MyRequests_Conditional_1_Conditional_32_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function MyRequests_Conditional_1_Conditional_32_For_23_Template_button_click_0_listener() {
      const pageNumber_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToPage(pageNumber_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageNumber_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("is-active", pageNumber_r10 === ctx_r1.page());
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275attribute("aria-current", pageNumber_r10 === ctx_r1.page() ? "page" : null)("aria-label", "Page " + pageNumber_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pageNumber_r10);
  }
}
function MyRequests_Conditional_1_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "table", 39)(2, "caption", 40);
    \u0275\u0275text(3, "Vos demandes, tri\xE9es par date de cr\xE9ation d\xE9croissante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "thead")(5, "tr", 41)(6, "th", 42);
    \u0275\u0275text(7, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 42);
    \u0275\u0275text(9, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 42);
    \u0275\u0275text(11, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 42);
    \u0275\u0275text(13, "Statut");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, MyRequests_Conditional_1_Conditional_32_For_16_Template, 13, 11, "tr", 41, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "nav", 43)(18, "button", 44);
    \u0275\u0275listener("click", function MyRequests_Conditional_1_Conditional_32_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275element(19, "i", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 46);
    \u0275\u0275listener("click", function MyRequests_Conditional_1_Conditional_32_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pageBy(-1));
    });
    \u0275\u0275element(21, "i", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, MyRequests_Conditional_1_Conditional_32_For_23_Template, 2, 6, "button", 48, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(24, "button", 49);
    \u0275\u0275listener("click", function MyRequests_Conditional_1_Conditional_32_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.pageBy(1));
    });
    \u0275\u0275element(25, "i", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 51);
    \u0275\u0275listener("click", function MyRequests_Conditional_1_Conditional_32_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.pages()));
    });
    \u0275\u0275element(27, "i", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 53);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r1.requests());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.page() <= 1 || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() <= 1 || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.pageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() >= ctx_r1.pages() || ctx_r1.loading());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.page() >= ctx_r1.pages() || ctx_r1.loading());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("Page ", ctx_r1.page(), " sur ", ctx_r1.pages(), " \xB7 ", ctx_r1.total(), " demande(s)");
  }
}
function MyRequests_Conditional_1_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Vous n'avez pas encore envoy\xE9 de demande.");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_1_Conditional_48_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 64)(1, "input", 65);
    \u0275\u0275listener("ngModelChange", function MyRequests_Conditional_1_Conditional_48_For_7_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.chooseCategory($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 66);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 67);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-primary", ctx_r1.form.category === category_r12)("bg-highlight", ctx_r1.form.category === category_r12);
    \u0275\u0275advance();
    \u0275\u0275property("value", category_r12)("ngModel", ctx_r1.form.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.categoryHints[category_r12]);
  }
}
function MyRequests_Conditional_1_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 29)(1, "h3", 60);
    \u0275\u0275text(2, "Quel est le probl\xE8me ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 61);
    \u0275\u0275text(4, "Votre demande sera transmise automatiquement au service comp\xE9tent.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 62);
    \u0275\u0275repeaterCreate(6, MyRequests_Conditional_1_Conditional_48_For_7_Template, 6, 8, "label", 63, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.createError() && !ctx_r1.form.category)("aria-describedby", ctx_r1.createError() ? "create-error" : null);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.categories);
  }
}
function MyRequests_Conditional_1_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 30)(1, "h3", 68);
    \u0275\u0275text(2, "D\xE9crivez votre demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 69);
    \u0275\u0275text(4, "Tous les champs sont obligatoires.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 70)(6, "label", 71)(7, "span", 19);
    \u0275\u0275text(8, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_1_Conditional_49_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.title, $event) || (ctx_r1.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "label", 71)(11, "span", 19);
    \u0275\u0275text(12, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "textarea", 73);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_1_Conditional_49_Template_textarea_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.description, $event) || (ctx_r1.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "label", 71)(15, "span", 19);
    \u0275\u0275text(16, "Lieu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_1_Conditional_49_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.form.location, $event) || (ctx_r1.form.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.title);
    \u0275\u0275attribute("aria-invalid", ctx_r1.descriptionInvalid("title"))("aria-describedby", ctx_r1.descriptionInvalid("title") ? "create-error" : null);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.description);
    \u0275\u0275attribute("aria-invalid", ctx_r1.descriptionInvalid("description"))("aria-describedby", ctx_r1.descriptionInvalid("description") ? "create-error" : null);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.location);
    \u0275\u0275attribute("aria-invalid", ctx_r1.descriptionInvalid("location"))("aria-describedby", ctx_r1.descriptionInvalid("location") ? "create-error" : null);
  }
}
function MyRequests_Conditional_1_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 31)(1, "h3", 75);
    \u0275\u0275text(2, "V\xE9rifiez votre demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dl", 76)(4, "dt", 77);
    \u0275\u0275text(5, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dd", 78);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "dt", 77);
    \u0275\u0275text(9, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd", 78);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dt", 77);
    \u0275\u0275text(13, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 79);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dt", 77);
    \u0275\u0275text(17, "Lieu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd", 78);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "p", 80);
    \u0275\u0275text(21, "La mairie fixera la priorit\xE9 et confiera votre demande \xE0 un agent du service comp\xE9tent.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.form.category);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.form.description);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.form.location);
  }
}
function MyRequests_Conditional_1_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 81);
    \u0275\u0275listener("onClick", function MyRequests_Conditional_1_Conditional_54_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previousCreationStep());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("outlined", true)("disabled", ctx_r1.submitting());
  }
}
function MyRequests_Conditional_1_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 82);
    \u0275\u0275listener("onClick", function MyRequests_Conditional_1_Conditional_55_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextCreationStep());
    });
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 83);
    \u0275\u0275listener("onClick", function MyRequests_Conditional_1_Conditional_56_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitCreation());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("loading", ctx_r1.submitting());
  }
}
function MyRequests_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 12)(1, "div")(2, "div", 13)(3, "div")(4, "h1", 14);
    \u0275\u0275text(5, "Toutes mes demandes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 15);
    \u0275\u0275text(7, "Recherchez, filtrez et consultez vos signalements.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p-button", 16);
    \u0275\u0275listener("onClick", function MyRequests_Conditional_1_Template_p_button_onClick_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateDialog());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "label", 18)(11, "span", 19);
    \u0275\u0275text(12, "Rechercher");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 20);
    \u0275\u0275listener("ngModelChange", function MyRequests_Conditional_1_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchChanged($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "label")(15, "span", 19);
    \u0275\u0275text(16, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 21);
    \u0275\u0275listener("ngModelChange", function MyRequests_Conditional_1_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.categoryChanged($event));
    });
    \u0275\u0275elementStart(18, "option", 22);
    \u0275\u0275text(19, "Tous les types");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(20, MyRequests_Conditional_1_For_21_Template, 2, 2, "option", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label")(23, "span", 19);
    \u0275\u0275text(24, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 21);
    \u0275\u0275listener("ngModelChange", function MyRequests_Conditional_1_Template_select_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.filterChanged($event));
    });
    \u0275\u0275elementStart(26, "option", 22);
    \u0275\u0275text(27, "Tous les statuts");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(28, MyRequests_Conditional_1_For_29_Template, 2, 2, "option", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(30, MyRequests_Conditional_1_Conditional_30_Template, 2, 0, "p", 3)(31, MyRequests_Conditional_1_Conditional_31_Template, 2, 1, "p", 4)(32, MyRequests_Conditional_1_Conditional_32_Template, 30, 7)(33, MyRequests_Conditional_1_Conditional_33_Template, 2, 0, "p");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "p-dialog", 23);
    \u0275\u0275listener("visibleChange", function MyRequests_Conditional_1_Template_p_dialog_visibleChange_34_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createDialogVisible.set($event));
    })("onHide", function MyRequests_Conditional_1_Template_p_dialog_onHide_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCreateDialog());
    });
    \u0275\u0275elementStart(35, "p", 24);
    \u0275\u0275text(36, "D\xE9crivez votre besoin en trois \xE9tapes. Vous pourrez v\xE9rifier toutes les informations avant l\u2019envoi.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 25);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p-stepper", 26)(40, "p-step-list")(41, "p-step", 27);
    \u0275\u0275text(42, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p-step", 27);
    \u0275\u0275text(44, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p-step", 27);
    \u0275\u0275text(46, "Validation");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(47, MyRequests_Conditional_1_Conditional_47_Template, 2, 1, "p", 28);
    \u0275\u0275conditionalCreate(48, MyRequests_Conditional_1_Conditional_48_Template, 8, 2, "section", 29)(49, MyRequests_Conditional_1_Conditional_49_Template, 18, 9, "section", 30)(50, MyRequests_Conditional_1_Conditional_50_Template, 22, 4, "section", 31);
    \u0275\u0275elementStart(51, "div", 32)(52, "p-button", 33);
    \u0275\u0275listener("onClick", function MyRequests_Conditional_1_Template_p_button_onClick_52_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCreateDialog());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 34);
    \u0275\u0275conditionalCreate(54, MyRequests_Conditional_1_Conditional_54_Template, 1, 2, "p-button", 35);
    \u0275\u0275conditionalCreate(55, MyRequests_Conditional_1_Conditional_55_Template, 1, 0, "p-button", 36)(56, MyRequests_Conditional_1_Conditional_56_Template, 1, 1, "p-button", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_19_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngModel", ctx_r1.searchTerm());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.categoryFilter());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.categories);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.statusFilter());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.statuses);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loading() ? 30 : (tmp_8_0 = ctx_r1.error()) ? 31 : ctx_r1.requests().length ? 32 : 33, tmp_8_0);
    \u0275\u0275advance(4);
    \u0275\u0275styleMap(\u0275\u0275pureFunction0(23, _c02));
    \u0275\u0275property("visible", ctx_r1.createDialogVisible())("modal", true)("draggable", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\xC9tape ", ctx_r1.creationStep(), " sur 3");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.creationStep())("linear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_19_0 = ctx_r1.createError()) ? 47 : -1, tmp_19_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.creationStep() === 1 ? 48 : ctx_r1.creationStep() === 2 ? 49 : 50);
    \u0275\u0275advance(4);
    \u0275\u0275property("text", true)("disabled", ctx_r1.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.creationStep() > 1 ? 54 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.creationStep() < 3 ? 55 : 56);
  }
}
var PAGE_SIZE = 10;
var EMPTY_FORM = { title: "", description: "", category: null, location: "" };
var CATEGORY_HINTS = {
  "\xC9clairage public": "Lampadaire \xE9teint, \xE9clairage d\xE9faillant",
  Voirie: "Nid-de-poule, trottoir ab\xEEm\xE9, route inond\xE9e",
  Eau: "Fuite, coupure, borne-fontaine",
  D\u00E9chets: "Ordures non ramass\xE9es, d\xE9p\xF4t sauvage",
  S\u00E9curit\u00E9: "C\xE2ble \xE0 terre, mur dangereux, regard ouvert",
  "Espaces verts": "Jardin public, arbres, aire de jeux",
  Autre: "Tout autre probl\xE8me"
};
var MyRequests = class _MyRequests {
  requestsApi = inject(CitizenRequestService);
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  requests = signal([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  pages = signal(1, ...ngDevMode ? [{ debugName: "pages" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  categoryFilter = signal(null, ...ngDevMode ? [{ debugName: "categoryFilter" }] : []);
  statusFilter = signal(null, ...ngDevMode ? [{ debugName: "statusFilter" }] : []);
  selectedRequest = signal(null, ...ngDevMode ? [{ debugName: "selectedRequest" }] : []);
  statusHistory = signal([], ...ngDevMode ? [{ debugName: "statusHistory" }] : []);
  historyLoading = signal(false, ...ngDevMode ? [{ debugName: "historyLoading" }] : []);
  historyError = signal(null, ...ngDevMode ? [{ debugName: "historyError" }] : []);
  eventLabel = eventLabel;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  detailMode = signal(false, ...ngDevMode ? [{ debugName: "detailMode" }] : []);
  createDialogVisible = signal(false, ...ngDevMode ? [{ debugName: "createDialogVisible" }] : []);
  creationStep = signal(1, ...ngDevMode ? [{ debugName: "creationStep" }] : []);
  createError = signal(null, ...ngDevMode ? [{ debugName: "createError" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  /** Passe à true quand l’étape « Description » a été validée avec des champs vides. */
  descriptionAttempted = signal(false, ...ngDevMode ? [{ debugName: "descriptionAttempted" }] : []);
  categories = [...REQUEST_CATEGORIES];
  categoryHints = CATEGORY_HINTS;
  statuses = [...REQUEST_STATUSES];
  form = __spreadValues({}, EMPTY_FORM);
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get("id");
      this.detailMode.set(id !== null);
      if (id) {
        this.loadDetail(id);
      } else {
        this.selectedRequest.set(null);
        this.load();
      }
    });
  }
  load(page = this.page()) {
    const query = {
      page,
      page_size: PAGE_SIZE,
      sort_by: "created_at",
      sort_order: "desc"
    };
    const status = this.statusFilter();
    if (status)
      query.status = status;
    const category = this.categoryFilter();
    if (category)
      query.category = category;
    const search = this.searchTerm().trim();
    if (search)
      query.search = search;
    this.loading.set(true);
    this.error.set(null);
    this.requestsApi.list(query).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (result) => {
        this.requests.set(result.items);
        this.total.set(result.total);
        this.page.set(result.page);
        this.pages.set(Math.max(1, result.total_pages));
      },
      error: (error) => this.error.set(apiErrorMessage(error))
    });
  }
  filterChanged(status) {
    this.statusFilter.set(status);
    this.load(1);
  }
  categoryChanged(category) {
    this.categoryFilter.set(category);
    this.load(1);
  }
  searchChanged(search) {
    this.searchTerm.set(search);
    this.load(1);
  }
  pageBy(offset) {
    this.goToPage(this.page() + offset);
  }
  goToPage(page) {
    if (page < 1 || page > this.pages() || page === this.page() || this.loading())
      return;
    this.load(page);
  }
  pageNumbers() {
    const total = this.pages();
    const first = Math.max(1, Math.min(this.page() - 2, total - 4));
    return Array.from({ length: Math.min(5, total) }, (_, index) => first + index);
  }
  openCreateDialog() {
    this.creationStep.set(1);
    this.createError.set(null);
    this.descriptionAttempted.set(false);
    this.form = __spreadValues({}, EMPTY_FORM);
    this.createDialogVisible.set(true);
  }
  closeCreateDialog() {
    if (!this.submitting())
      this.createDialogVisible.set(false);
  }
  chooseCategory(category) {
    this.form.category = category;
    this.createError.set(null);
  }
  nextCreationStep() {
    if (this.creationStep() === 1 && !this.form.category) {
      this.createError.set("Choisissez le type de probl\xE8me : il d\xE9termine le service qui traitera votre demande.");
      this.focusAfterRender('input[name="request-type"]');
      return;
    }
    if (this.creationStep() === 2 && !this.isDescriptionStepValid()) {
      this.descriptionAttempted.set(true);
      this.createError.set("Renseignez le titre, la description et le lieu de la demande.");
      this.focusAfterRender('[aria-invalid="true"]');
      return;
    }
    this.createError.set(null);
    this.creationStep.update((step) => Math.min(3, step + 1));
    this.focusStepHeading();
  }
  previousCreationStep() {
    this.createError.set(null);
    this.creationStep.update((step) => Math.max(1, step - 1));
    this.focusStepHeading();
  }
  /** Champ obligatoire de l’étape 2 laissé vide après une tentative de passage à l’étape suivante. */
  descriptionInvalid(field) {
    return this.descriptionAttempted() && !this.form[field].trim();
  }
  /** Après un changement d’étape, le focus va sur le titre de la nouvelle étape pour l’annoncer. */
  focusStepHeading() {
    const headings = ["choose-type-title", "description-step-title", "review-step-title"];
    this.focusAfterRender("#" + headings[this.creationStep() - 1]);
  }
  focusAfterRender(selector) {
    afterNextRender(() => document.querySelector(`.p-dialog ${selector}`)?.focus(), { injector: this.injector });
  }
  submitCreation() {
    const category = this.form.category;
    if (!this.auth.user() || !category || !this.isDescriptionStepValid() || this.submitting())
      return;
    this.submitting.set(true);
    this.createError.set(null);
    this.requestsApi.submit({
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      location: this.form.location.trim(),
      category
    }).pipe(finalize(() => this.submitting.set(false))).subscribe({
      next: () => {
        this.createDialogVisible.set(false);
        this.load(1);
      },
      error: (error) => this.createError.set(apiErrorMessage(error))
    });
  }
  loadDetail(id) {
    this.loading.set(true);
    this.error.set(null);
    this.statusHistory.set([]);
    this.historyLoading.set(true);
    this.historyError.set(null);
    this.requestsApi.get(id).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (request) => this.selectedRequest.set(request),
      error: (error) => {
        this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? "Cette demande est introuvable." : apiErrorMessage(error));
      }
    });
    this.requestsApi.events(id).pipe(finalize(() => this.historyLoading.set(false))).subscribe({
      next: (events) => this.statusHistory.set(events),
      error: (error) => this.historyError.set(apiErrorMessage(error))
    });
  }
  isDescriptionStepValid() {
    return !!this.form.title.trim() && !!this.form.description.trim() && !!this.form.location.trim();
  }
  static \u0275fac = function MyRequests_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyRequests)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyRequests, selectors: [["app-my-requests"]], decls: 2, vars: 1, consts: [["aria-labelledby", "request-detail-title", 1, "card"], ["routerLink", "/home/my-requests", 1, "mb-4", "inline-flex", "items-center", "gap-2", "text-primary", "focus-visible:outline-2", "focus-visible:outline-offset-2"], ["aria-hidden", "true", 1, "pi", "pi-arrow-left"], ["role", "status"], ["role", "alert", 1, "text-red-600"], ["id", "request-detail-title"], ["aria-labelledby", "request-timeline-title", 1, "mt-8"], ["id", "request-timeline-title", 1, "text-lg", "font-semibold"], ["aria-label", "\xC9tapes de votre demande, de la plus ancienne \xE0 la plus r\xE9cente", 1, "space-y-4"], [1, "border-l-2", "border-primary", "pl-4"], [1, "m-0", "font-semibold"], [1, "text-sm", "text-muted-color"], ["aria-labelledby", "history-title", 1, "card"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "history-title", 1, "m-0", "text-lg", "font-semibold"], [1, "mb-0", "mt-1", "text-sm", "text-muted-color"], ["label", "Ajouter une demande", "icon", "pi pi-plus", 3, "onClick"], [1, "mb-4", "grid", "gap-3", "md:grid-cols-3"], [1, "md:col-span-1"], [1, "mb-1", "block", "font-medium"], ["id", "request-search", "type", "search", "placeholder", "Mot-cl\xE9, description, lieu\u2026", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel"], [1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["header", "Nouvelle demande", 3, "visibleChange", "onHide", "visible", "modal", "draggable"], [1, "mt-0", "text-muted-color"], ["role", "status", 1, "sr-only"], ["aria-label", "\xC9tapes de cr\xE9ation de la demande", 3, "value", "linear"], [3, "value"], ["id", "create-error", "role", "alert", 1, "mt-5", "rounded-lg", "border", "border-red-300", "bg-red-50", "p-3", "text-red-700", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["aria-labelledby", "choose-type-title", 1, "mt-5"], ["aria-labelledby", "description-step-title", 1, "mt-5"], ["aria-labelledby", "review-step-title", 1, "mt-5"], [1, "mt-7", "flex", "flex-wrap", "justify-between", "gap-3"], ["label", "Annuler", "severity", "secondary", 3, "onClick", "text", "disabled"], [1, "flex", "gap-2"], ["label", "Retour", "severity", "secondary", 3, "outlined", "disabled"], ["label", "Suivant", "icon", "pi pi-arrow-right", "iconPos", "right"], ["label", "Valider la demande", "icon", "pi pi-check", 3, "loading"], [1, "overflow-x-auto"], [1, "app-data-table"], [1, "sr-only"], [1, "border-b", "border-surface"], ["scope", "col", 1, "p-3"], ["aria-label", "Pagination de mes demandes", 1, "app-table-pagination"], ["type", "button", "aria-label", "Premi\xE8re page", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-double-left"], ["type", "button", "aria-label", "Page pr\xE9c\xE9dente", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-left"], ["type", "button", 1, "app-pagination-button", "app-pagination-page", 3, "is-active", "disabled"], ["type", "button", "aria-label", "Page suivante", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-right"], ["type", "button", "aria-label", "Derni\xE8re page", 1, "app-pagination-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-angle-double-right"], ["aria-live", "polite", 1, "sr-only"], [1, "whitespace-nowrap", "p-3"], [1, "p-3"], ["scope", "row", 1, "max-w-md", "p-3", "text-left", "font-normal"], [1, "font-medium", "text-primary", "underline", 3, "routerLink"], [1, "mb-0", "mt-1", "line-clamp-2", "text-sm", "text-muted-color"], ["type", "button", 1, "app-pagination-button", "app-pagination-page", 3, "click", "disabled"], ["id", "choose-type-title", "tabindex", "-1", 1, "m-0", "text-lg", "font-semibold"], [1, "mt-2", "text-sm", "text-muted-color"], ["role", "radiogroup", "aria-labelledby", "choose-type-title", "aria-required", "true", 1, "grid", "gap-3", "sm:grid-cols-2"], [1, "cursor-pointer", "rounded-xl", "border", "p-4", "transition-colors", "has-[:focus-visible]:outline-2", "has-[:focus-visible]:outline-offset-2", "has-[:focus-visible]:outline-primary", 3, "border-primary", "bg-highlight"], [1, "cursor-pointer", "rounded-xl", "border", "p-4", "transition-colors", "has-[:focus-visible]:outline-2", "has-[:focus-visible]:outline-offset-2", "has-[:focus-visible]:outline-primary"], ["type", "radio", "name", "request-type", 1, "sr-only", 3, "ngModelChange", "value", "ngModel"], [1, "block", "font-semibold"], [1, "mt-1", "block", "text-sm", "text-muted-color"], ["id", "description-step-title", "tabindex", "-1", 1, "m-0", "text-lg", "font-semibold"], [1, "mb-0", "mt-2", "text-sm", "text-muted-color"], [1, "mt-4", "grid", "gap-4", "md:grid-cols-2"], [1, "md:col-span-2"], ["id", "request-title", "name", "request-title", "required", "", "maxlength", "255", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["id", "request-description", "name", "request-description", "required", "", "maxlength", "10000", "rows", "5", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["id", "request-location", "name", "request-location", "required", "", "maxlength", "500", "autocomplete", "street-address", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["id", "review-step-title", "tabindex", "-1", 1, "m-0", "text-lg", "font-semibold"], [1, "mt-4", "grid", "gap-x-6", "gap-y-3", "rounded-xl", "bg-emphasis", "p-4", "sm:grid-cols-[9rem_1fr]"], [1, "font-medium"], [1, "m-0"], [1, "m-0", "whitespace-pre-wrap"], [1, "mb-0", "mt-3", "text-sm", "text-muted-color"], ["label", "Retour", "severity", "secondary", 3, "onClick", "outlined", "disabled"], ["label", "Suivant", "icon", "pi pi-arrow-right", "iconPos", "right", 3, "onClick"], ["label", "Valider la demande", "icon", "pi pi-check", 3, "onClick", "loading"]], template: function MyRequests_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, MyRequests_Conditional_0_Template, 7, 1, "section", 0)(1, MyRequests_Conditional_1_Template, 57, 24);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.detailMode() ? 0 : 1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, RequiredValidator, MaxLengthValidator, NgModel, RouterLink, ButtonModule, Button, DialogModule, Dialog, StepperModule, Stepper, StepList, Step, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MyRequests, [{
    type: Component,
    args: [{ selector: "app-my-requests", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, DialogModule, StepperModule], template: `@if (detailMode()) {
    <section class="card" aria-labelledby="request-detail-title">
        <a routerLink="/home/my-requests" class="mb-4 inline-flex items-center gap-2 text-primary focus-visible:outline-2 focus-visible:outline-offset-2">
            <i class="pi pi-arrow-left" aria-hidden="true"></i> Retour \xE0 mes demandes
        </a>
        @if (loading()) {
            <p role="status">Chargement de la demande\u2026</p>
        } @else if (error(); as message) {
            <p role="alert" class="text-red-600">{{ message }}</p>
        } @else if (selectedRequest(); as request) {
            <h1 id="request-detail-title">{{ request.title }}</h1>
            <p>{{ request.description }}</p>
            <dl>
                <dt>R\xE9f\xE9rence</dt><dd>#{{ request.id.slice(0, 8) }}</dd>
                <dt>Statut actuel</dt><dd><strong>{{ request.status }}</strong></dd>
                <dt>Cr\xE9\xE9e le</dt><dd>{{ request.created_at | date: 'dd/MM/yyyy \xE0 HH:mm' }}</dd>
                <dt>Lieu</dt><dd>{{ request.location }}</dd>
            </dl>
            <section aria-labelledby="request-timeline-title" class="mt-8">
                <h2 id="request-timeline-title" class="text-lg font-semibold">\xC9tapes de traitement</h2>
                @if (historyLoading()) {
                    <p role="status">Chargement des \xE9tapes\u2026</p>
                } @else if (historyError(); as message) {
                    <p role="alert" class="text-red-600">L\u2019historique des \xE9tapes n\u2019a pas pu \xEAtre charg\xE9 : {{ message }}</p>
                } @else if (statusHistory().length) {
                    <ol aria-label="\xC9tapes de votre demande, de la plus ancienne \xE0 la plus r\xE9cente" class="space-y-4">
                        @for (step of statusHistory(); track step.id) {
                            <li class="border-l-2 border-primary pl-4">
                                <h3 class="m-0 font-semibold">{{ eventLabel(step) }}</h3>
                                <time class="text-sm text-muted-color" [attr.datetime]="step.created_at">{{ step.created_at | date: 'dd/MM/yyyy \xE0 HH:mm' }}</time>
                            </li>
                        }
                    </ol>
                } @else {
                    <p>Aucune \xE9tape de traitement n\u2019est encore enregistr\xE9e.</p>
                }
            </section>
        }
    </section>
} @else {
    <section class="card" aria-labelledby="history-title">
        <div>
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div><h1 id="history-title" class="m-0 text-lg font-semibold">Toutes mes demandes</h1><p class="mb-0 mt-1 text-sm text-muted-color">Recherchez, filtrez et consultez vos signalements.</p></div>
                <p-button label="Ajouter une demande" icon="pi pi-plus" (onClick)="openCreateDialog()" />
            </div>
            <div class="mb-4 grid gap-3 md:grid-cols-3">
                <label class="md:col-span-1">
                    <span class="mb-1 block font-medium">Rechercher</span>
                    <input id="request-search" type="search" class="w-full rounded border border-surface bg-transparent p-2" placeholder="Mot-cl\xE9, description, lieu\u2026" [ngModel]="searchTerm()" (ngModelChange)="searchChanged($event)" />
                </label>
                <label>
                    <span class="mb-1 block font-medium">Type</span>
                    <select class="w-full rounded border border-surface bg-transparent p-2" [ngModel]="categoryFilter()" (ngModelChange)="categoryChanged($event)">
                        <option [ngValue]="null">Tous les types</option>
                        @for (category of categories; track category) { <option [ngValue]="category">{{ category }}</option> }
                    </select>
                </label>
                <label>
                    <span class="mb-1 block font-medium">Statut</span>
                    <select class="w-full rounded border border-surface bg-transparent p-2" [ngModel]="statusFilter()" (ngModelChange)="filterChanged($event)">
                        <option [ngValue]="null">Tous les statuts</option>
                        @for (status of statuses; track status) { <option [ngValue]="status">{{ status }}</option> }
                    </select>
                </label>
            </div>
            @if (loading()) {
                <p role="status">Chargement de vos demandes\u2026</p>
            } @else if (error(); as message) {
                <p role="alert" class="text-red-600">{{ message }}</p>
            } @else if (requests().length) {
                <div class="overflow-x-auto">
                    <table class="app-data-table">
                        <caption class="sr-only">Vos demandes, tri\xE9es par date de cr\xE9ation d\xE9croissante</caption>
                        <thead><tr class="border-b border-surface"><th scope="col" class="p-3">Date</th><th scope="col" class="p-3">Type</th><th scope="col" class="p-3">Description</th><th scope="col" class="p-3">Statut</th></tr></thead>
                        <tbody>
                            @for (request of requests(); track request.id) {
                                <tr class="border-b border-surface">
                                    <td class="whitespace-nowrap p-3">{{ request.created_at | date: 'dd/MM/yyyy HH:mm' }}</td>
                                    <td class="p-3">{{ request.category }}</td>
                                    <th scope="row" class="max-w-md p-3 text-left font-normal"><a class="font-medium text-primary underline" [routerLink]="['/home/my-requests', request.id]">{{ request.title }}</a><p class="mb-0 mt-1 line-clamp-2 text-sm text-muted-color">{{ request.description }}</p></th>
                                    <td class="whitespace-nowrap p-3">{{ request.status }}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <nav class="app-table-pagination" aria-label="Pagination de mes demandes">
                    <button type="button" class="app-pagination-button" aria-label="Premi\xE8re page" [disabled]="page() <= 1 || loading()" (click)="goToPage(1)"><i class="pi pi-angle-double-left" aria-hidden="true"></i></button>
                    <button type="button" class="app-pagination-button" aria-label="Page pr\xE9c\xE9dente" [disabled]="page() <= 1 || loading()" (click)="pageBy(-1)"><i class="pi pi-angle-left" aria-hidden="true"></i></button>
                    @for (pageNumber of pageNumbers(); track pageNumber) {
                        <button type="button" class="app-pagination-button app-pagination-page" [class.is-active]="pageNumber === page()" [attr.aria-current]="pageNumber === page() ? 'page' : null" [attr.aria-label]="'Page ' + pageNumber" [disabled]="loading()" (click)="goToPage(pageNumber)">{{ pageNumber }}</button>
                    }
                    <button type="button" class="app-pagination-button" aria-label="Page suivante" [disabled]="page() >= pages() || loading()" (click)="pageBy(1)"><i class="pi pi-angle-right" aria-hidden="true"></i></button>
                    <button type="button" class="app-pagination-button" aria-label="Derni\xE8re page" [disabled]="page() >= pages() || loading()" (click)="goToPage(pages())"><i class="pi pi-angle-double-right" aria-hidden="true"></i></button>
                    <span class="sr-only" aria-live="polite">Page {{ page() }} sur {{ pages() }} \xB7 {{ total() }} demande(s)</span>
                </nav>
            } @else {
                <p>Vous n'avez pas encore envoy\xE9 de demande.</p>
            }
        </div>
    </section>

    <p-dialog [visible]="createDialogVisible()" (visibleChange)="createDialogVisible.set($event)" header="Nouvelle demande" [modal]="true" [draggable]="false" [style]="{ width: 'min(46rem, 96vw)' }" (onHide)="closeCreateDialog()">
        <p class="mt-0 text-muted-color">D\xE9crivez votre besoin en trois \xE9tapes. Vous pourrez v\xE9rifier toutes les informations avant l\u2019envoi.</p>
        <p class="sr-only" role="status">\xC9tape {{ creationStep() }} sur 3</p>
        <p-stepper [value]="creationStep()" [linear]="true" aria-label="\xC9tapes de cr\xE9ation de la demande">
            <p-step-list>
                <p-step [value]="1">Type</p-step>
                <p-step [value]="2">Description</p-step>
                <p-step [value]="3">Validation</p-step>
            </p-step-list>
        </p-stepper>

        @if (createError(); as message) { <p id="create-error" class="mt-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-100" role="alert">{{ message }}</p> }

        @if (creationStep() === 1) {
            <section class="mt-5" aria-labelledby="choose-type-title">
                <h3 id="choose-type-title" class="m-0 text-lg font-semibold" tabindex="-1">Quel est le probl\xE8me ?</h3>
                <p class="mt-2 text-sm text-muted-color">Votre demande sera transmise automatiquement au service comp\xE9tent.</p>
                <div class="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="choose-type-title" aria-required="true" [attr.aria-invalid]="!!createError() && !form.category" [attr.aria-describedby]="createError() ? 'create-error' : null">
                    @for (category of categories; track category) {
                        <label class="cursor-pointer rounded-xl border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary" [class.border-primary]="form.category === category" [class.bg-highlight]="form.category === category">
                            <input type="radio" name="request-type" class="sr-only" [value]="category" [ngModel]="form.category" (ngModelChange)="chooseCategory($event)" />
                            <span class="block font-semibold">{{ category }}</span>
                            <span class="mt-1 block text-sm text-muted-color">{{ categoryHints[category] }}</span>
                        </label>
                    }
                </div>
            </section>
        } @else if (creationStep() === 2) {
            <section class="mt-5" aria-labelledby="description-step-title">
                <h3 id="description-step-title" class="m-0 text-lg font-semibold" tabindex="-1">D\xE9crivez votre demande</h3>
                <p class="mb-0 mt-2 text-sm text-muted-color">Tous les champs sont obligatoires.</p>
                <div class="mt-4 grid gap-4 md:grid-cols-2">
                    <label class="md:col-span-2"><span class="mb-1 block font-medium">Titre</span><input id="request-title" name="request-title" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.title" required maxlength="255" [attr.aria-invalid]="descriptionInvalid('title')" [attr.aria-describedby]="descriptionInvalid('title') ? 'create-error' : null" /></label>
                    <label class="md:col-span-2"><span class="mb-1 block font-medium">Description</span><textarea id="request-description" name="request-description" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.description" required maxlength="10000" rows="5" [attr.aria-invalid]="descriptionInvalid('description')" [attr.aria-describedby]="descriptionInvalid('description') ? 'create-error' : null"></textarea></label>
                    <label class="md:col-span-2"><span class="mb-1 block font-medium">Lieu</span><input id="request-location" name="request-location" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.location" required maxlength="500" autocomplete="street-address" [attr.aria-invalid]="descriptionInvalid('location')" [attr.aria-describedby]="descriptionInvalid('location') ? 'create-error' : null" /></label>
                </div>
            </section>
        } @else {
            <section class="mt-5" aria-labelledby="review-step-title">
                <h3 id="review-step-title" class="m-0 text-lg font-semibold" tabindex="-1">V\xE9rifiez votre demande</h3>
                <dl class="mt-4 grid gap-x-6 gap-y-3 rounded-xl bg-emphasis p-4 sm:grid-cols-[9rem_1fr]">
                    <dt class="font-medium">Titre</dt><dd class="m-0">{{ form.title }}</dd>
                    <dt class="font-medium">Type</dt><dd class="m-0">{{ form.category }}</dd>
                    <dt class="font-medium">Description</dt><dd class="m-0 whitespace-pre-wrap">{{ form.description }}</dd>
                    <dt class="font-medium">Lieu</dt><dd class="m-0">{{ form.location }}</dd>
                </dl>
                <p class="mb-0 mt-3 text-sm text-muted-color">La mairie fixera la priorit\xE9 et confiera votre demande \xE0 un agent du service comp\xE9tent.</p>
            </section>
        }

        <div class="mt-7 flex flex-wrap justify-between gap-3">
            <p-button label="Annuler" severity="secondary" [text]="true" [disabled]="submitting()" (onClick)="closeCreateDialog()" />
            <div class="flex gap-2">
                @if (creationStep() > 1) { <p-button label="Retour" severity="secondary" [outlined]="true" [disabled]="submitting()" (onClick)="previousCreationStep()" /> }
                @if (creationStep() < 3) { <p-button label="Suivant" icon="pi pi-arrow-right" iconPos="right" (onClick)="nextCreationStep()" /> } @else { <p-button label="Valider la demande" icon="pi pi-check" [loading]="submitting()" (onClick)="submitCreation()" /> }
            </div>
        </div>
    </p-dialog>
}` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyRequests, { className: "MyRequests", filePath: "src/app/requests/my-requests.ts", lineNumber: 54 });
})();
export {
  CATEGORY_HINTS,
  MyRequests
};
//# sourceMappingURL=chunk-UA7XBSHN.js.map
