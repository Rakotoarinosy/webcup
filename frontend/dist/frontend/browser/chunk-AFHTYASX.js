import {
  AppFloatingConfigurator,
  guestGuard
} from "./chunk-3MN2ITJI.js";
import "./chunk-RII5OTZE.js";
import {
  NAME_VALIDATORS,
  PASSWORD_VALIDATORS,
  normalizePhone,
  phoneValidator
} from "./chunk-QOFYXRXI.js";
import {
  AuthService,
  ChallengeStore
} from "./chunk-IKQWXVMD.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-F3M422Q6.js";
import "./chunk-SULZIKH5.js";
import {
  InputText,
  InputTextModule
} from "./chunk-MGHWURGQ.js";
import {
  BaseEditableHolder
} from "./chunk-CXSKRW4Y.js";
import "./chunk-OUQ4VYAJ.js";
import "./chunk-5UENDHV5.js";
import {
  MotionModule,
  TimesIcon
} from "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  AutoFocus,
  Button,
  ButtonModule,
  Ripple
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-BX45OWY6.js";
import {
  BaseComponent,
  BaseStyle,
  Bind,
  BindModule,
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
  DestroyRef,
  EventEmitter,
  HttpClient,
  HttpErrorResponse,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgTemplateOutlet,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  __spreadValues,
  afterNextRender,
  booleanAttribute,
  computed,
  environment,
  filter,
  finalize,
  firstValueFrom,
  forwardRef,
  inject,
  input,
  interval,
  output,
  setClassMetadata,
  signal,
  tap,
  throwError,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
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
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// src/app/auth/access/access.ts
var Access = class _Access {
  static \u0275fac = function Access_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Access)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Access, selectors: [["app-access"]], decls: 15, vars: 0, consts: [[1, "bg-surface-50", "dark:bg-surface-950", "flex", "items-center", "justify-center", "min-h-screen", "min-w-screen", "overflow-hidden"], [1, "flex", "flex-col", "items-center", "justify-center"], [2, "border-radius", "56px", "padding", "0.3rem", "background", "linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)"], [1, "w-full", "bg-surface-0", "dark:bg-surface-900", "py-20", "px-8", "sm:px-20", "flex", "flex-col", "items-center", 2, "border-radius", "53px"], [1, "gap-4", "flex", "flex-col", "items-center"], [1, "flex", "justify-center", "items-center", "border-2", "border-orange-500", "rounded-full", 2, "width", "3.2rem", "height", "3.2rem"], [1, "text-orange-500", "pi", "pi-fw", "pi-lock", "text-2xl!"], [1, "text-surface-900", "dark:text-surface-0", "font-bold", "text-4xl", "lg:text-5xl", "mb-2"], [1, "text-muted-color", "mb-8"], ["src", "https://primefaces.org/cdn/templates/sakai/auth/asset-access.svg", "alt", "Access denied", "width", "80%", 1, "mb-8"], [1, "col-span-12", "mt-8", "text-center"], ["label", "Mon espace", "routerLink", "/home/account", "severity", "warn"]], template: function Access_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-floating-configurator");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h1", 7);
      \u0275\u0275text(9, "Access Denied");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "You do not have the necessary permissions. Please contact admins.");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "img", 9);
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275element(14, "p-button", 11);
      \u0275\u0275elementEnd()()()()()();
    }
  }, dependencies: [ButtonModule, Button, RouterModule, RouterLink, AppFloatingConfigurator], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Access, [{
    type: Component,
    args: [{ selector: "app-access", imports: [ButtonModule, RouterModule, AppFloatingConfigurator], template: '<app-floating-configurator />\n\n<div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">\n    <div class="flex flex-col items-center justify-center">\n        <!-- Gradient border wrapper -->\n        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)">\n            <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">\n                <div class="gap-4 flex flex-col items-center">\n                    <!-- Icon -->\n                    <div class="flex justify-center items-center border-2 border-orange-500 rounded-full" style="width: 3.2rem; height: 3.2rem">\n                        <i class="text-orange-500 pi pi-fw pi-lock text-2xl!"></i>\n                    </div>\n\n                    <!-- Message -->\n                    <h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl mb-2">Access Denied</h1>\n                    <span class="text-muted-color mb-8">You do not have the necessary permissions. Please contact admins.</span>\n\n                    <img src="https://primefaces.org/cdn/templates/sakai/auth/asset-access.svg" alt="Access denied" class="mb-8" width="80%" />\n\n                    <div class="col-span-12 mt-8 text-center">\n                        <p-button label="Mon espace" routerLink="/home/account" severity="warn" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Access, { className: "Access", filePath: "src/app/auth/access/access.ts", lineNumber: 12 });
})();

// src/app/auth/error/error.ts
var Error2 = class _Error {
  static \u0275fac = function Error_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Error)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Error, selectors: [["app-error"]], decls: 15, vars: 0, consts: [[1, "bg-surface-50", "dark:bg-surface-950", "flex", "items-center", "justify-center", "min-h-screen", "min-w-screen", "overflow-hidden"], [1, "flex", "flex-col", "items-center", "justify-center"], [2, "border-radius", "56px", "padding", "0.3rem", "background", "linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)"], [1, "w-full", "bg-surface-0", "dark:bg-surface-900", "py-20", "px-8", "sm:px-20", "flex", "flex-col", "items-center", 2, "border-radius", "53px"], [1, "gap-4", "flex", "flex-col", "items-center"], [1, "flex", "justify-center", "items-center", "border-2", "border-pink-500", "rounded-full", 2, "height", "3.2rem", "width", "3.2rem"], [1, "pi", "pi-fw", "pi-exclamation-circle", "text-2xl!", "text-pink-500"], [1, "text-surface-900", "dark:text-surface-0", "font-bold", "text-5xl", "mb-2"], [1, "text-muted-color", "mb-8"], ["src", "https://primefaces.org/cdn/templates/sakai/auth/asset-error.svg", "alt", "Error", "width", "80%", 1, "mb-8"], [1, "col-span-12", "mt-8", "text-center"], ["label", "Mon espace", "routerLink", "/home/account", "severity", "danger"]], template: function Error_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-floating-configurator");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "h1", 7);
      \u0275\u0275text(9, "Error Occurred");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "Requested resource is not available.");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "img", 9);
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275element(14, "p-button", 11);
      \u0275\u0275elementEnd()()()()()();
    }
  }, dependencies: [ButtonModule, Button, RouterModule, RouterLink, AppFloatingConfigurator], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Error2, [{
    type: Component,
    args: [{ selector: "app-error", imports: [ButtonModule, RouterModule, AppFloatingConfigurator], template: '<app-floating-configurator />\n\n<div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">\n    <div class="flex flex-col items-center justify-center">\n        <!-- Gradient border wrapper -->\n        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">\n            <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">\n                <div class="gap-4 flex flex-col items-center">\n                    <!-- Icon -->\n                    <div class="flex justify-center items-center border-2 border-pink-500 rounded-full" style="height: 3.2rem; width: 3.2rem">\n                        <i class="pi pi-fw pi-exclamation-circle text-2xl! text-pink-500"></i>\n                    </div>\n\n                    <!-- Message -->\n                    <h1 class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-2">Error Occurred</h1>\n                    <span class="text-muted-color mb-8">Requested resource is not available.</span>\n\n                    <img src="https://primefaces.org/cdn/templates/sakai/auth/asset-error.svg" alt="Error" class="mb-8" width="80%" />\n\n                    <div class="col-span-12 mt-8 text-center">\n                        <p-button label="Mon espace" routerLink="/home/account" severity="danger" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Error2, { className: "Error", filePath: "src/app/auth/error/error.ts", lineNumber: 12 });
})();

// node_modules/@primeuix/styles/dist/message/index.mjs
var style = "\n    .p-message {\n        display: grid;\n        grid-template-rows: 1fr;\n        border-radius: dt('message.border.radius');\n        outline-width: dt('message.border.width');\n        outline-style: solid;\n    }\n\n    .p-message-content-wrapper {\n        min-height: 0;\n    }\n\n    .p-message-content {\n        display: flex;\n        align-items: center;\n        padding: dt('message.content.padding');\n        gap: dt('message.content.gap');\n    }\n\n    .p-message-icon {\n        flex-shrink: 0;\n    }\n\n    .p-message-close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        margin-inline-start: auto;\n        overflow: hidden;\n        position: relative;\n        width: dt('message.close.button.width');\n        height: dt('message.close.button.height');\n        border-radius: dt('message.close.button.border.radius');\n        background: transparent;\n        transition:\n            background dt('message.transition.duration'),\n            color dt('message.transition.duration'),\n            outline-color dt('message.transition.duration'),\n            box-shadow dt('message.transition.duration'),\n            opacity 0.3s;\n        outline-color: transparent;\n        color: inherit;\n        padding: 0;\n        border: none;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-message-close-icon {\n        font-size: dt('message.close.icon.size');\n        width: dt('message.close.icon.size');\n        height: dt('message.close.icon.size');\n    }\n\n    .p-message-close-button:focus-visible {\n        outline-width: dt('message.close.button.focus.ring.width');\n        outline-style: dt('message.close.button.focus.ring.style');\n        outline-offset: dt('message.close.button.focus.ring.offset');\n    }\n\n    .p-message-info {\n        background: dt('message.info.background');\n        outline-color: dt('message.info.border.color');\n        color: dt('message.info.color');\n        box-shadow: dt('message.info.shadow');\n    }\n\n    .p-message-info .p-message-close-button:focus-visible {\n        outline-color: dt('message.info.close.button.focus.ring.color');\n        box-shadow: dt('message.info.close.button.focus.ring.shadow');\n    }\n\n    .p-message-info .p-message-close-button:hover {\n        background: dt('message.info.close.button.hover.background');\n    }\n\n    .p-message-info.p-message-outlined {\n        color: dt('message.info.outlined.color');\n        outline-color: dt('message.info.outlined.border.color');\n    }\n\n    .p-message-info.p-message-simple {\n        color: dt('message.info.simple.color');\n    }\n\n    .p-message-success {\n        background: dt('message.success.background');\n        outline-color: dt('message.success.border.color');\n        color: dt('message.success.color');\n        box-shadow: dt('message.success.shadow');\n    }\n\n    .p-message-success .p-message-close-button:focus-visible {\n        outline-color: dt('message.success.close.button.focus.ring.color');\n        box-shadow: dt('message.success.close.button.focus.ring.shadow');\n    }\n\n    .p-message-success .p-message-close-button:hover {\n        background: dt('message.success.close.button.hover.background');\n    }\n\n    .p-message-success.p-message-outlined {\n        color: dt('message.success.outlined.color');\n        outline-color: dt('message.success.outlined.border.color');\n    }\n\n    .p-message-success.p-message-simple {\n        color: dt('message.success.simple.color');\n    }\n\n    .p-message-warn {\n        background: dt('message.warn.background');\n        outline-color: dt('message.warn.border.color');\n        color: dt('message.warn.color');\n        box-shadow: dt('message.warn.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:focus-visible {\n        outline-color: dt('message.warn.close.button.focus.ring.color');\n        box-shadow: dt('message.warn.close.button.focus.ring.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:hover {\n        background: dt('message.warn.close.button.hover.background');\n    }\n\n    .p-message-warn.p-message-outlined {\n        color: dt('message.warn.outlined.color');\n        outline-color: dt('message.warn.outlined.border.color');\n    }\n\n    .p-message-warn.p-message-simple {\n        color: dt('message.warn.simple.color');\n    }\n\n    .p-message-error {\n        background: dt('message.error.background');\n        outline-color: dt('message.error.border.color');\n        color: dt('message.error.color');\n        box-shadow: dt('message.error.shadow');\n    }\n\n    .p-message-error .p-message-close-button:focus-visible {\n        outline-color: dt('message.error.close.button.focus.ring.color');\n        box-shadow: dt('message.error.close.button.focus.ring.shadow');\n    }\n\n    .p-message-error .p-message-close-button:hover {\n        background: dt('message.error.close.button.hover.background');\n    }\n\n    .p-message-error.p-message-outlined {\n        color: dt('message.error.outlined.color');\n        outline-color: dt('message.error.outlined.border.color');\n    }\n\n    .p-message-error.p-message-simple {\n        color: dt('message.error.simple.color');\n    }\n\n    .p-message-secondary {\n        background: dt('message.secondary.background');\n        outline-color: dt('message.secondary.border.color');\n        color: dt('message.secondary.color');\n        box-shadow: dt('message.secondary.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:focus-visible {\n        outline-color: dt('message.secondary.close.button.focus.ring.color');\n        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:hover {\n        background: dt('message.secondary.close.button.hover.background');\n    }\n\n    .p-message-secondary.p-message-outlined {\n        color: dt('message.secondary.outlined.color');\n        outline-color: dt('message.secondary.outlined.border.color');\n    }\n\n    .p-message-secondary.p-message-simple {\n        color: dt('message.secondary.simple.color');\n    }\n\n    .p-message-contrast {\n        background: dt('message.contrast.background');\n        outline-color: dt('message.contrast.border.color');\n        color: dt('message.contrast.color');\n        box-shadow: dt('message.contrast.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:focus-visible {\n        outline-color: dt('message.contrast.close.button.focus.ring.color');\n        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:hover {\n        background: dt('message.contrast.close.button.hover.background');\n    }\n\n    .p-message-contrast.p-message-outlined {\n        color: dt('message.contrast.outlined.color');\n        outline-color: dt('message.contrast.outlined.border.color');\n    }\n\n    .p-message-contrast.p-message-simple {\n        color: dt('message.contrast.simple.color');\n    }\n\n    .p-message-text {\n        font-size: dt('message.text.font.size');\n        font-weight: dt('message.text.font.weight');\n    }\n\n    .p-message-icon {\n        font-size: dt('message.icon.size');\n        width: dt('message.icon.size');\n        height: dt('message.icon.size');\n    }\n\n    .p-message-sm .p-message-content {\n        padding: dt('message.content.sm.padding');\n    }\n\n    .p-message-sm .p-message-text {\n        font-size: dt('message.text.sm.font.size');\n    }\n\n    .p-message-sm .p-message-icon {\n        font-size: dt('message.icon.sm.size');\n        width: dt('message.icon.sm.size');\n        height: dt('message.icon.sm.size');\n    }\n\n    .p-message-sm .p-message-close-icon {\n        font-size: dt('message.close.icon.sm.size');\n        width: dt('message.close.icon.sm.size');\n        height: dt('message.close.icon.sm.size');\n    }\n\n    .p-message-lg .p-message-content {\n        padding: dt('message.content.lg.padding');\n    }\n\n    .p-message-lg .p-message-text {\n        font-size: dt('message.text.lg.font.size');\n    }\n\n    .p-message-lg .p-message-icon {\n        font-size: dt('message.icon.lg.size');\n        width: dt('message.icon.lg.size');\n        height: dt('message.icon.lg.size');\n    }\n\n    .p-message-lg .p-message-close-icon {\n        font-size: dt('message.close.icon.lg.size');\n        width: dt('message.close.icon.lg.size');\n        height: dt('message.close.icon.lg.size');\n    }\n\n    .p-message-outlined {\n        background: transparent;\n        outline-width: dt('message.outlined.border.width');\n    }\n\n    .p-message-simple {\n        background: transparent;\n        outline-color: transparent;\n        box-shadow: none;\n    }\n\n    .p-message-simple .p-message-content {\n        padding: dt('message.simple.content.padding');\n    }\n\n    .p-message-outlined .p-message-close-button:hover,\n    .p-message-simple .p-message-close-button:hover {\n        background: transparent;\n    }\n\n    .p-message-enter-active {\n        animation: p-animate-message-enter 0.3s ease-out forwards;\n        overflow: hidden;\n    }\n\n    .p-message-leave-active {\n        animation: p-animate-message-leave 0.15s ease-in forwards;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-message-enter {\n        from {\n            opacity: 0;\n            grid-template-rows: 0fr;\n        }\n        to {\n            opacity: 1;\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-message-leave {\n        from {\n            opacity: 1;\n            grid-template-rows: 1fr;\n        }\n        to {\n            opacity: 0;\n            margin: 0;\n            grid-template-rows: 0fr;\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-message.mjs
var _c0 = ["container"];
var _c1 = ["icon"];
var _c2 = ["closeicon"];
var _c3 = ["*"];
var _c4 = (a0) => ({
  closeCallback: a0
});
function Message_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Message_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Message_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconTemplate || ctx_r0._iconTemplate);
  }
}
function Message_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.icon));
    \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
function Message_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Message_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Message_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.containerTemplate || ctx_r0._containerTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c4, ctx_r0.closeCallback));
  }
}
function Message_Conditional_5_div_0_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("pBind", ctx_r0.ptm("text"))("ngClass", ctx_r0.cx("text"))("innerHTML", ctx_r0.text, \u0275\u0275sanitizeHtml);
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
function Message_Conditional_5_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, Message_Conditional_5_div_0_span_1_Template, 1, 4, "span", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.escape);
  }
}
function Message_Conditional_5_ng_template_1_span_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("pBind", ctx_r0.ptm("text"))("ngClass", ctx_r0.cx("text"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.text);
  }
}
function Message_Conditional_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Message_Conditional_5_ng_template_1_span_0_Template, 2, 4, "span", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngIf", ctx_r0.escape && ctx_r0.text);
  }
}
function Message_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Message_Conditional_5_div_0_Template, 2, 1, "div", 6)(1, Message_Conditional_5_ng_template_1_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "span", 7);
    \u0275\u0275projection(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const escapeOut_r2 = \u0275\u0275reference(2);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", !ctx_r0.escape)("ngIfElse", escapeOut_r2);
    \u0275\u0275advance(3);
    \u0275\u0275property("pBind", ctx_r0.ptm("text"))("ngClass", ctx_r0.cx("text"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
function Message_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("closeIcon"), ctx_r0.closeIcon));
    \u0275\u0275property("pBind", ctx_r0.ptm("closeIcon"))("ngClass", ctx_r0.closeIcon);
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
function Message_Conditional_6_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Message_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Message_Conditional_6_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate);
  }
}
function Message_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "svg", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.cx("closeIcon"));
    \u0275\u0275property("pBind", ctx_r0.ptm("closeIcon"));
    \u0275\u0275attribute("data-p", ctx_r0.dataP);
  }
}
function Message_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function Message_Conditional_6_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.close($event));
    });
    \u0275\u0275conditionalCreate(1, Message_Conditional_6_Conditional_1_Template, 1, 5, "i", 12);
    \u0275\u0275conditionalCreate(2, Message_Conditional_6_Conditional_2_Template, 1, 1, "ng-container");
    \u0275\u0275conditionalCreate(3, Message_Conditional_6_Conditional_3_Template, 1, 4, ":svg:svg", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.cx("closeButton"));
    \u0275\u0275property("pBind", ctx_r0.ptm("closeButton"));
    \u0275\u0275attribute("aria-label", ctx_r0.closeAriaLabel)("data-p", ctx_r0.dataP);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.closeIcon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.closeIconTemplate || ctx_r0._closeIconTemplate ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.closeIconTemplate && !ctx_r0._closeIconTemplate && !ctx_r0.closeIcon ? 3 : -1);
  }
}
var classes = {
  root: ({
    instance
  }) => ["p-message p-component p-message-" + instance.severity, instance.variant && "p-message-" + instance.variant, {
    "p-message-sm": instance.size === "small",
    "p-message-lg": instance.size === "large"
  }],
  contentWrapper: "p-message-content-wrapper",
  content: "p-message-content",
  icon: "p-message-icon",
  text: "p-message-text",
  closeButton: "p-message-close-button",
  closeIcon: "p-message-close-icon"
};
var MessageStyle = class _MessageStyle extends BaseStyle {
  name = "message";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MessageStyle_BaseFactory;
    return function MessageStyle_Factory(__ngFactoryType__) {
      return (\u0275MessageStyle_BaseFactory || (\u0275MessageStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MessageStyle)))(__ngFactoryType__ || _MessageStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MessageStyle,
    factory: _MessageStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageStyle, [{
    type: Injectable
  }], null, null);
})();
var MessageClasses;
(function(MessageClasses2) {
  MessageClasses2["root"] = "p-message";
  MessageClasses2["content"] = "p-message-content";
  MessageClasses2["icon"] = "p-message-icon";
  MessageClasses2["text"] = "p-message-text";
  MessageClasses2["closeButton"] = "p-message-close-button";
  MessageClasses2["closeIcon"] = "p-message-close-icon";
})(MessageClasses || (MessageClasses = {}));
var MESSAGE_INSTANCE = new InjectionToken("MESSAGE_INSTANCE");
var Message = class _Message extends BaseComponent {
  _componentStyle = inject(MessageStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  $pcMessage = inject(MESSAGE_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * Severity level of the message.
   * @defaultValue 'info'
   * @group Props
   */
  severity = "info";
  /**
   * Text content.
   * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
   * @group Props
   */
  text;
  /**
   * Whether displaying messages would be escaped or not.
   * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
   * @group Props
   */
  escape = true;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Whether the message can be closed manually using the close icon.
   * @group Props
   * @defaultValue false
   */
  closable = false;
  /**
   * Icon to display in the message.
   * @group Props
   * @defaultValue undefined
   */
  icon;
  /**
   * Icon to display in the message close button.
   * @group Props
   * @defaultValue undefined
   */
  closeIcon;
  /**
   * Delay in milliseconds to close the message automatically.
   * @defaultValue undefined
   */
  life;
  /**
   * Transition options of the show animation.
   * @defaultValue '300ms ease-out'
   * @group Props
   * @deprecated since v21.0.0, use `motionOptions` instead.
   */
  showTransitionOptions = "300ms ease-out";
  /**
   * Transition options of the hide animation.
   * @defaultValue '200ms cubic-bezier(0.86, 0, 0.07, 1)'
   * @group Props
   * @deprecated since v21.0.0, use `motionOptions` instead.
   */
  hideTransitionOptions = "200ms cubic-bezier(0.86, 0, 0.07, 1)";
  /**
   * Defines the size of the component.
   * @group Props
   */
  size;
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant;
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
  /**
   * Emits when the message is closed.
   * @param {{ originalEvent: Event }} event - The event object containing the original event.
   * @group Emits
   */
  onClose = new EventEmitter();
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  visible = signal(true, ...ngDevMode ? [{
    debugName: "visible"
  }] : []);
  /**
   * Custom template of the message container.
   * @param {MessageContainerTemplateContext} context - container context.
   * @see {@link MessageContainerTemplateContext}
   * @group Templates
   */
  containerTemplate;
  /**
   * Custom template of the message icon.
   * @group Templates
   */
  iconTemplate;
  /**
   * Custom template of the close icon.
   * @group Templates
   */
  closeIconTemplate;
  templates;
  _containerTemplate;
  _iconTemplate;
  _closeIconTemplate;
  closeCallback = (event) => {
    this.close(event);
  };
  onInit() {
    if (this.life) {
      setTimeout(() => {
        this.visible.set(false);
      }, this.life);
    }
  }
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "container":
          this._containerTemplate = item.template;
          break;
        case "icon":
          this._iconTemplate = item.template;
          break;
        case "closeicon":
          this._closeIconTemplate = item.template;
          break;
      }
    });
  }
  /**
   * Closes the message.
   * @param {Event} event - Browser event.
   * @group Method
   */
  close(event) {
    this.visible.set(false);
    this.onClose.emit({
      originalEvent: event
    });
  }
  get dataP() {
    return this.cn({
      outlined: this.variant === "outlined",
      simple: this.variant === "simple",
      [this.severity]: this.severity,
      [this.size]: this.size
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Message_BaseFactory;
    return function Message_Factory(__ngFactoryType__) {
      return (\u0275Message_BaseFactory || (\u0275Message_BaseFactory = \u0275\u0275getInheritedFactory(_Message)))(__ngFactoryType__ || _Message);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Message,
    selectors: [["p-message"]],
    contentQueries: function Message_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c0, 4)(dirIndex, _c1, 4)(dirIndex, _c2, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.containerTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.iconTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.closeIconTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    hostAttrs: ["role", "alert", "aria-live", "polite"],
    hostVars: 5,
    hostBindings: function Message_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275animateEnter(function Message_HostBindings_animateenter_cb() {
          return "p-message-enter-active";
        });
        \u0275\u0275animateLeave(function Message_HostBindings_animateleave_cb() {
          return "p-message-leave-active";
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("data-p", ctx.dataP);
        \u0275\u0275classMap(ctx.cn(ctx.cx("root"), ctx.styleClass));
        \u0275\u0275classProp("p-message-leave-active", !ctx.visible());
      }
    },
    inputs: {
      severity: "severity",
      text: "text",
      escape: [2, "escape", "escape", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      closable: [2, "closable", "closable", booleanAttribute],
      icon: "icon",
      closeIcon: "closeIcon",
      life: "life",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      size: "size",
      variant: "variant",
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onClose: "onClose"
    },
    features: [\u0275\u0275ProvidersFeature([MessageStyle, {
      provide: MESSAGE_INSTANCE,
      useExisting: _Message
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Message
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    ngContentSelectors: _c3,
    decls: 7,
    vars: 12,
    consts: [["escapeOut", ""], [3, "pBind"], [3, "pBind", "class"], ["pRipple", "", "type", "button", 3, "pBind", "class"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngIf", "ngIfElse"], [3, "pBind", "ngClass"], [3, "pBind", "ngClass", "innerHTML", 4, "ngIf"], [3, "pBind", "ngClass", "innerHTML"], [3, "pBind", "ngClass", 4, "ngIf"], ["pRipple", "", "type", "button", 3, "click", "pBind"], [3, "pBind", "class", "ngClass"], ["data-p-icon", "times", 3, "pBind", "class"], ["data-p-icon", "times", 3, "pBind"]],
    template: function Message_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 1);
        \u0275\u0275conditionalCreate(2, Message_Conditional_2_Template, 1, 1, "ng-container");
        \u0275\u0275conditionalCreate(3, Message_Conditional_3_Template, 1, 4, "i", 2);
        \u0275\u0275conditionalCreate(4, Message_Conditional_4_Template, 1, 4, "ng-container")(5, Message_Conditional_5_Template, 5, 5);
        \u0275\u0275conditionalCreate(6, Message_Conditional_6_Template, 4, 8, "button", 3);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("contentWrapper"));
        \u0275\u0275property("pBind", ctx.ptm("contentWrapper"));
        \u0275\u0275attribute("data-p", ctx.dataP);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.cx("content"));
        \u0275\u0275property("pBind", ctx.ptm("content"));
        \u0275\u0275attribute("data-p", ctx.dataP);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.iconTemplate || ctx._iconTemplate ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.icon ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.containerTemplate || ctx._containerTemplate ? 4 : 5);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.closable ? 6 : -1);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, TimesIcon, Ripple, SharedModule, Bind, MotionModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Message, [{
    type: Component,
    args: [{
      selector: "p-message",
      standalone: true,
      imports: [CommonModule, TimesIcon, Ripple, SharedModule, Bind, MotionModule],
      template: `
        <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')" [attr.data-p]="dataP">
            <div [pBind]="ptm('content')" [class]="cx('content')" [attr.data-p]="dataP">
                @if (iconTemplate || _iconTemplate) {
                    <ng-container *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-container>
                }
                @if (icon) {
                    <i [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon)" [attr.data-p]="dataP"></i>
                }

                @if (containerTemplate || _containerTemplate) {
                    <ng-container *ngTemplateOutlet="containerTemplate || _containerTemplate; context: { closeCallback: closeCallback }"></ng-container>
                } @else {
                    <div *ngIf="!escape; else escapeOut">
                        <span [pBind]="ptm('text')" *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text" [attr.data-p]="dataP"></span>
                    </div>

                    <ng-template #escapeOut>
                        <span [pBind]="ptm('text')" *ngIf="escape && text" [ngClass]="cx('text')" [attr.data-p]="dataP">{{ text }}</span>
                    </ng-template>

                    <span [pBind]="ptm('text')" [ngClass]="cx('text')" [attr.data-p]="dataP">
                        <ng-content></ng-content>
                    </span>
                }
                @if (closable) {
                    <button [pBind]="ptm('closeButton')" pRipple type="button" [class]="cx('closeButton')" (click)="close($event)" [attr.aria-label]="closeAriaLabel" [attr.data-p]="dataP">
                        @if (closeIcon) {
                            <i [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), closeIcon)" [ngClass]="closeIcon" [attr.data-p]="dataP"></i>
                        }
                        @if (closeIconTemplate || _closeIconTemplate) {
                            <ng-container *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-container>
                        }
                        @if (!closeIconTemplate && !_closeIconTemplate && !closeIcon) {
                            <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.data-p]="dataP" />
                        }
                    </button>
                }
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MessageStyle, {
        provide: MESSAGE_INSTANCE,
        useExisting: Message
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Message
      }],
      hostDirectives: [Bind],
      host: {
        "[attr.data-p]": "dataP",
        role: "alert",
        "aria-live": "polite",
        "[class]": 'cn(cx("root"), styleClass)',
        "[animate.enter]": '"p-message-enter-active"',
        "[animate.leave]": '"p-message-leave-active"',
        "[class.p-message-leave-active]": "!visible()"
      }
    }]
  }], null, {
    severity: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    closable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    icon: [{
      type: Input
    }],
    closeIcon: [{
      type: Input
    }],
    life: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    variant: [{
      type: Input
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    onClose: [{
      type: Output
    }],
    containerTemplate: [{
      type: ContentChild,
      args: ["container", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icon", {
        descendants: false
      }]
    }],
    closeIconTemplate: [{
      type: ContentChild,
      args: ["closeicon", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MessageModule = class _MessageModule {
  static \u0275fac = function MessageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MessageModule,
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Message, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [Message, SharedModule],
      exports: [Message, SharedModule]
    }]
  }], null, null);
})();

// src/app/auth/auth-errors.ts
var MESSAGES = {
  InvalidCredentialsError: "Identifiant ou mot de passe incorrect.",
  AccountLockedError: "Trop de tentatives. Patientez quelques minutes avant de r\xE9essayer.",
  UserAlreadyExistsError: "Cet email ou ce num\xE9ro est d\xE9j\xE0 utilis\xE9 par un autre compte.",
  UserConflictError: "Cet email ou ce num\xE9ro est d\xE9j\xE0 utilis\xE9 par un autre compte.",
  InvalidVerificationCodeError: "Code incorrect ou expir\xE9. V\xE9rifiez-le ou demandez-en un nouveau.",
  VerificationCodeLockedError: "Trop de codes incorrects. Demandez un nouveau code.",
  CodeResendLockedError: "Un code vient d\u2019\xEAtre envoy\xE9. Patientez un instant avant d\u2019en demander un autre.",
  EmailDeliveryUnavailableError: "L\u2019email n\u2019a pas pu \xEAtre envoy\xE9. R\xE9essayez dans quelques instants.",
  SmsDeliveryUnavailableError: "Le SMS n\u2019a pas pu \xEAtre envoy\xE9. R\xE9essayez dans quelques instants.",
  MissingContactError: "Ce compte n\u2019a pas ce moyen de contact. Utilisez l\u2019autre m\xE9thode de connexion.",
  InvalidGoogleTokenError: "La connexion Google a \xE9chou\xE9. R\xE9essayez.",
  GoogleSignInUnavailableError: "La connexion Google est momentan\xE9ment indisponible.",
  GoogleEmailNotVerifiedError: "L\u2019adresse email de ce compte Google n\u2019est pas v\xE9rifi\xE9e."
};
function authErrorMessage(error) {
  if (error instanceof HttpErrorResponse) {
    const known = MESSAGES[error.error?.error];
    if (known)
      return known;
  }
  return apiErrorMessage(error);
}

// src/app/auth/google-identity.service.ts
var GIS_SRC = "https://accounts.google.com/gsi/client";
var GoogleIdentityService = class _GoogleIdentityService {
  http = inject(HttpClient);
  zone = inject(NgZone);
  script = null;
  async renderButton(host, onCredential) {
    const config = await firstValueFrom(this.http.get(environment.apiUrl + "/auth/config"));
    const clientId = config.google_client_id;
    if (!clientId)
      throw new Error("GOOGLE_UNAVAILABLE");
    const gid = await this.load();
    gid.initialize({
      client_id: clientId,
      callback: (response) => this.zone.run(() => onCredential(response.credential))
    });
    gid.renderButton(host, { type: "standard", theme: "outline", size: "large", text: "continue_with", locale: "fr", width: host.clientWidth });
  }
  load() {
    this.script ??= new Promise((resolve, reject) => {
      const ready = window.google?.accounts.id;
      if (ready) {
        resolve(ready);
        return;
      }
      const tag = document.createElement("script");
      tag.src = GIS_SRC;
      tag.async = true;
      tag.onload = () => {
        const gid = window.google?.accounts.id;
        if (gid)
          resolve(gid);
        else
          reject(new Error("GIS_UNAVAILABLE"));
      };
      tag.onerror = () => {
        this.script = null;
        reject(new Error("GIS_UNAVAILABLE"));
      };
      document.head.appendChild(tag);
    });
    return this.script;
  }
  static \u0275fac = function GoogleIdentityService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleIdentityService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GoogleIdentityService, factory: _GoogleIdentityService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleIdentityService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/verification.service.ts
var VerificationService = class _VerificationService {
  auth = inject(AuthService);
  store = inject(ChallengeStore);
  verify(code) {
    const challenge = this.store.challenge();
    if (!challenge)
      return throwError(() => new Error("NO_CHALLENGE"));
    return this.auth.verifyCode(challenge.challenge_id, code).pipe(tap(() => this.store.clear()));
  }
  resend() {
    const challenge = this.store.challenge();
    if (!challenge)
      return throwError(() => new Error("NO_CHALLENGE"));
    return this.auth.resendCode(challenge.challenge_id).pipe(tap((next) => this.store.set(next)));
  }
  loginWithGoogle(credential) {
    return this.auth.requestGoogleLogin(credential);
  }
  static \u0275fac = function VerificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VerificationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VerificationService, factory: _VerificationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/auth/google-button/google-button.ts
var _c02 = ["host"];
function GoogleButton_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "button", 2);
    \u0275\u0275domElement(1, "i", 3);
    \u0275\u0275text(2, " Continuer avec Google ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "p", 4);
    \u0275\u0275text(4, "La connexion Google est momentan\xE9ment indisponible.");
    \u0275\u0275domElementEnd();
  }
}
var GoogleButton = class _GoogleButton {
  google = inject(GoogleIdentityService);
  verification = inject(VerificationService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  host = viewChild("host", ...ngDevMode ? [{ debugName: "host" }] : []);
  failed = output();
  unavailable = signal(false, ...ngDevMode ? [{ debugName: "unavailable" }] : []);
  ngAfterViewInit() {
    const host = this.host()?.nativeElement;
    if (!host)
      return;
    this.google.renderButton(host, (credential) => this.signIn(credential)).catch(() => this.unavailable.set(true));
  }
  signIn(credential) {
    this.verification.loginWithGoogle(credential).subscribe({
      next: () => this.router.navigate(["/auth/verify-code"], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get("returnUrl") } }),
      error: (error) => this.failed.emit(authErrorMessage(error))
    });
  }
  static \u0275fac = function GoogleButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GoogleButton)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GoogleButton, selectors: [["app-google-button"]], viewQuery: function GoogleButton_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.host, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, outputs: { failed: "failed" }, decls: 3, vars: 3, consts: [["host", ""], [1, "flex", "min-h-10", "w-full", "justify-center"], ["type", "button", "disabled", "", 1, "flex", "min-h-11", "w-full", "items-center", "justify-center", "gap-3", "rounded-xl", "border", "border-emerald-200", "px-4", "py-3", "opacity-60"], ["aria-hidden", "true", 1, "pi", "pi-google"], ["role", "status", 1, "mt-2", "text-center", "text-xs"]], template: function GoogleButton_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 1, 0);
      \u0275\u0275conditionalCreate(2, GoogleButton_Conditional_2_Template, 5, 0);
    }
    if (rf & 2) {
      \u0275\u0275classProp("hidden", ctx.unavailable());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.unavailable() ? 2 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GoogleButton, [{
    type: Component,
    args: [{
      selector: "app-google-button",
      template: `
        <div #host class="flex min-h-10 w-full justify-center" [class.hidden]="unavailable()"></div>
        @if (unavailable()) {
            <button type="button" disabled class="flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-emerald-200 px-4 py-3 opacity-60">
                <i class="pi pi-google" aria-hidden="true"></i> Continuer avec Google
            </button>
            <p class="mt-2 text-center text-xs" role="status">La connexion Google est momentan\xE9ment indisponible.</p>
        }
    `
    }]
  }], null, { host: [{ type: ViewChild, args: ["host", { isSignal: true }] }], failed: [{ type: Output, args: ["failed"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GoogleButton, { className: "GoogleButton", filePath: "src/app/auth/google-button/google-button.ts", lineNumber: 25 });
})();

// src/app/auth/return-url.ts
function safeReturnUrl(url) {
  return url && url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/auth") ? url : null;
}

// src/app/auth/login/login.ts
var _c03 = ["identifierInput"];
var _c12 = ["errorSummary"];
var _forTrack0 = ($index, $item) => $item.field;
function Login_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "Votre compte a \xE9t\xE9 supprim\xE9. Vous \xEAtes d\xE9connect\xE9 de votre espace personnel.");
    \u0275\u0275elementEnd();
  }
}
function Login_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-message", 28);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r1.errorMessage());
  }
}
function Login_Conditional_53_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 54);
    \u0275\u0275listener("click", function Login_Conditional_53_For_6_Template_a_click_1_listener($event) {
      const error_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.focusField($event, error_r4.field));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const error_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("href", "#" + error_r4.field, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r4.message);
  }
}
function Login_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29, 1)(2, "p", 52);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 53);
    \u0275\u0275repeaterCreate(5, Login_Conditional_53_For_6_Template, 3, 2, "li", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formErrors().length > 1 ? "Le formulaire contient " + ctx_r1.formErrors().length + " erreurs :" : "Le formulaire contient une erreur :");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.formErrors());
  }
}
function Login_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.identifierError(), " ");
  }
}
function Login_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Le mot de passe est obligatoire. ");
  }
}
var Login = class _Login {
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  injector = inject(Injector);
  identifierInput = viewChild("identifierInput", ...ngDevMode ? [{ debugName: "identifierInput" }] : []);
  errorSummary = viewChild("errorSummary", ...ngDevMode ? [{ debugName: "errorSummary" }] : []);
  /** Moyen de connexion choisi : le code de confirmation part par ce canal (email ou SMS). */
  method = signal("email", ...ngDevMode ? [{ debugName: "method" }] : []);
  identifierValidator = (control) => this.method() === "phone" ? phoneValidator(control) : Validators.email(control);
  loginForm = this.fb.nonNullable.group({
    identifier: ["", [Validators.required, this.identifierValidator]],
    password: ["", [Validators.required]]
  });
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  /** Passe à true au premier envoi refusé : affiche le récapitulatif des erreurs. */
  submitAttempted = signal(false, ...ngDevMode ? [{ debugName: "submitAttempted" }] : []);
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  accountDeleted = this.route.snapshot.queryParamMap.get("accountDeleted") === "1";
  ngAfterViewInit() {
    this.identifierInput()?.nativeElement.focus();
  }
  setMethod(method) {
    if (this.method() === method || this.loading())
      return;
    this.method.set(method);
    this.loginForm.controls.identifier.reset("");
    this.errorMessage.set(null);
    this.submitAttempted.set(false);
    afterNextRender(() => this.identifierInput()?.nativeElement.focus(), { injector: this.injector });
  }
  /** Classes de l'onglet Email / Téléphone selon qu'il est actif ou non. */
  tabClass(method) {
    const base = "rounded-lg px-3 py-2 text-sm font-semibold transition-colors";
    return this.method() === method ? `${base} bg-white text-emerald-700 shadow-sm dark:bg-emerald-700 dark:text-white` : `${base} text-emerald-950/60 hover:text-emerald-950 dark:text-emerald-50/65 dark:hover:text-emerald-50`;
  }
  submit() {
    if (this.loading())
      return;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.submitAttempted.set(true);
      afterNextRender(() => this.errorSummary()?.nativeElement.focus(), { injector: this.injector });
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { identifier, password } = this.loginForm.getRawValue();
    const value = this.method() === "phone" ? normalizePhone(identifier) ?? identifier.trim() : identifier.trim();
    this.loginForm.disable();
    this.auth.login(value, password).subscribe({
      next: (outcome) => outcome === "verification-required" ? (
        // Un code vient d'être envoyé (email ou SMS) : aucune session avant sa validation.
        this.router.navigate(["/auth/verify-code"], { queryParams: { returnUrl: this.route.snapshot.queryParamMap.get("returnUrl") } })
      ) : this.router.navigateByUrl(this.redirectUrl()),
      error: (error) => {
        this.loading.set(false);
        this.loginForm.enable();
        this.loginForm.patchValue({ password: "" });
        this.errorMessage.set(loginErrorMessage(error));
      }
    });
  }
  identifierError() {
    const phone = this.method() === "phone";
    if (this.loginForm.controls.identifier.hasError("required")) {
      return phone ? "Le num\xE9ro de t\xE9l\xE9phone est obligatoire." : "L\u2019email est obligatoire.";
    }
    return phone ? "Saisissez un num\xE9ro valide, par exemple 034 12 345 67 ou +261 34 12 345 67." : "Saisissez une adresse email valide.";
  }
  /** Erreurs du formulaire, dans l’ordre des champs, pour le récapitulatif. */
  formErrors() {
    const { identifier, password } = this.loginForm.controls;
    const errors = [];
    if (identifier.invalid)
      errors.push({ field: "identifier", message: this.identifierError() });
    if (password.invalid)
      errors.push({ field: "password", message: "Le mot de passe est obligatoire." });
    return errors;
  }
  /** Lien du récapitulatif : place le focus dans le champ concerné sans recharger la page. */
  focusField(event, id) {
    event.preventDefault();
    document.getElementById(id)?.focus();
  }
  /** Page demandée avant la connexion (?returnUrl=), limitée aux chemins internes. */
  redirectUrl() {
    return safeReturnUrl(this.route.snapshot.queryParamMap.get("returnUrl")) ?? this.auth.homeUrl();
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], viewQuery: function Login_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.identifierInput, _c03, 5)(ctx.errorSummary, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 93, vars: 30, consts: [["identifierInput", ""], ["errorSummary", ""], [1, "auth-display-settings", 3, "float"], [1, "grid", "min-h-dvh", "bg-white", "font-sans", "text-emerald-950", "dark:bg-emerald-950", "dark:text-emerald-50", "lg:grid-cols-[minmax(26rem,57.3%)_1fr]"], ["aria-label", "Terra Nova", 1, "relative", "isolate", "hidden", "overflow-hidden", "bg-[radial-gradient(circle_at_90%_8%,#17845b_0,transparent_31%),linear-gradient(145deg,#062c21_0%,#07533a_59%,#03271d_100%)]", "px-[clamp(2rem,7vw,8.5rem)]", "py-[clamp(2rem,4vw,4.8rem)]", "text-white", "lg:flex", "lg:flex-col"], [1, "pointer-events-none", "absolute", "-right-64", "-top-72", "-z-10", "h-[38rem]", "w-[52rem]", "rotate-[-17deg]", "rounded-[49%_51%_54%_46%/42%_45%_55%_58%]", "border", "border-emerald-200/25"], ["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "inline-flex", "w-fit", "items-center", "gap-3", "text-[1.4rem]", "font-bold", "tracking-[-.04em]"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-[.62rem]", "bg-emerald-500", "text-sm", "font-black", "leading-none", "-skew-y-6"], [1, "mt-[clamp(5rem,13vh,10rem)]", "max-w-xl"], [1, "m-0", "!text-white", "font-bold", "leading-[.99]", "tracking-[-.065em]"], [1, "!text-emerald-300"], [1, "mt-7", "max-w-lg", "text-[1.06rem]", "leading-7", "text-emerald-50/85"], [1, "mt-auto", "grid", "list-none", "gap-5", "pb-8", "pt-16"], [1, "flex", "items-center", "gap-4"], ["aria-hidden", "true", 1, "pi", "pi-users", "grid", "size-11", "place-items-center", "rounded-full", "border", "border-emerald-200/40", "text-emerald-100"], [1, "grid", "gap-0.5"], [1, "text-[.94rem]"], [1, "text-[.81rem]", "text-emerald-100/75"], ["aria-hidden", "true", 1, "pi", "pi-shield", "grid", "size-11", "place-items-center", "rounded-full", "border", "border-emerald-200/40", "text-emerald-100"], ["aria-hidden", "true", 1, "pi", "pi-chart-bar", "grid", "size-11", "place-items-center", "rounded-full", "border", "border-emerald-200/40", "text-emerald-100"], ["aria-labelledby", "login-title", 1, "grid", "place-items-center", "bg-white", "px-5", "py-8", "dark:bg-emerald-950", "sm:px-8"], [1, "w-full", "max-w-[27.5rem]", "rounded-2xl", "border", "border-transparent", "p-0", "sm:max-lg:border-emerald-100", "sm:max-lg:bg-white", "sm:max-lg:p-[clamp(1.6rem,6vw,3rem)]", "sm:max-lg:shadow-[0_18px_60px_rgba(19,74,50,.08)]", "dark:sm:max-lg:border-emerald-900", "dark:sm:max-lg:bg-emerald-900/40"], ["routerLink", "/", 1, "mb-14", "inline-flex", "w-fit", "items-center", "gap-3", "text-[1.4rem]", "font-bold", "tracking-[-.04em]", "lg:hidden"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-[.62rem]", "bg-emerald-500", "text-sm", "font-black", "leading-none", "text-white", "-skew-y-6"], [1, "mb-8"], ["id", "login-title", 1, "mb-2", "text-[2rem]", "font-bold", "leading-tight", "tracking-[-.045em]"], [1, "m-0", "leading-6", "text-emerald-950/60", "dark:text-emerald-50/65"], ["role", "status", 1, "mb-5", "rounded-xl", "border", "border-emerald-200", "bg-emerald-50", "p-4", "text-emerald-950"], ["severity", "error", "icon", "pi pi-exclamation-circle", "styleClass", "mb-5 block", "role", "alert", 3, "text"], ["id", "login-error-summary", "role", "alert", "tabindex", "-1", 1, "mb-5", "rounded-xl", "border", "border-red-300", "bg-red-50", "p-4", "text-sm", "text-red-800", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["novalidate", "", "aria-labelledby", "login-title", 1, "space-y-4", 3, "ngSubmit", "formGroup"], ["id", "login-required-hint", 1, "m-0", "text-sm", "text-emerald-950/60", "dark:text-emerald-50/65"], ["role", "group", "aria-label", "M\xE9thode de connexion", 1, "grid", "grid-cols-2", "gap-1", "rounded-xl", "bg-emerald-50", "p-1", "dark:bg-emerald-900/60"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-envelope", "mr-2"], ["aria-hidden", "true", 1, "pi", "pi-phone", "mr-2"], ["for", "identifier", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], [1, "relative", "block"], ["aria-hidden", "true", 1, "absolute", "left-4", "top-1/2", "z-10", "-translate-y-1/2", "text-emerald-950/45", "dark:text-emerald-50/50"], ["pInputText", "", "id", "identifier", "required", "", "aria-describedby", "identifier-error", "formControlName", "identifier", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pl-11", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "type", "invalid"], ["id", "identifier-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["for", "password", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], ["pInputText", "", "id", "password", "autocomplete", "current-password", "placeholder", "Votre mot de passe", "required", "", "aria-describedby", "password-error", "formControlName", "password", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pr-12", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "type", "invalid"], ["type", "button", "aria-label", "Afficher le mot de passe", "aria-controls", "password", 1, "absolute", "right-1.5", "top-1/2", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-lg", "text-emerald-950/60", "hover:bg-emerald-50", "dark:text-emerald-50/70", "dark:hover:bg-emerald-900", 3, "click"], ["aria-hidden", "true"], ["id", "password-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["type", "submit", "label", "Se connecter", "icon", "pi pi-arrow-right", "iconPos", "right", "styleClass", "mt-2 w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold shadow-[0_10px_22px_rgba(22,163,106,.22)] hover:bg-emerald-700", 3, "loading"], ["aria-hidden", "true", 1, "my-5", "flex", "items-center", "gap-3", "text-xs", "text-emerald-950/50", "dark:text-emerald-50/55"], [1, "h-px", "flex-1", "bg-emerald-200", "dark:bg-emerald-800"], [3, "failed"], [1, "mt-7", "flex", "justify-center", "gap-1.5", "text-sm", "text-emerald-950/60", "dark:text-emerald-50/65"], ["routerLink", "/auth/register", 1, "font-bold", "text-emerald-600", "hover:underline"], [1, "m-0", "font-semibold"], [1, "mb-0", "mt-2", "list-disc", "pl-5"], [1, "underline", 3, "click", "href"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-floating-configurator", 2);
      \u0275\u0275elementStart(1, "main", 3)(2, "section", 4);
      \u0275\u0275element(3, "div", 5);
      \u0275\u0275elementStart(4, "a", 6)(5, "span", 7);
      \u0275\u0275text(6, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 8)(10, "h1", 9);
      \u0275\u0275text(11, "Chaque demande");
      \u0275\u0275element(12, "br");
      \u0275\u0275elementStart(13, "span", 10);
      \u0275\u0275text(14, "compte.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "p", 11);
      \u0275\u0275text(16, "Terra Nova accompagne les collectivit\xE9s dans une gestion simple, s\xFBre et transparente des demandes citoyennes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "ul", 12)(18, "li", 13);
      \u0275\u0275element(19, "i", 14);
      \u0275\u0275elementStart(20, "span", 15)(21, "strong", 16);
      \u0275\u0275text(22, "Des citoyens mieux accompagn\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "small", 17);
      \u0275\u0275text(24, "Un suivi clair, au bon moment.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "li", 13);
      \u0275\u0275element(26, "i", 18);
      \u0275\u0275elementStart(27, "span", 15)(28, "strong", 16);
      \u0275\u0275text(29, "Des services plus efficaces");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "small", 17);
      \u0275\u0275text(31, "Des processus simples et fiables.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "li", 13);
      \u0275\u0275element(33, "i", 19);
      \u0275\u0275elementStart(34, "span", 15)(35, "strong", 16);
      \u0275\u0275text(36, "Une action plus transparente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "small", 17);
      \u0275\u0275text(38, "Une tra\xE7abilit\xE9 qui inspire confiance.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(39, "section", 20)(40, "div", 21)(41, "a", 22)(42, "span", 23);
      \u0275\u0275text(43, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span");
      \u0275\u0275text(45, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "header", 24)(47, "h1", 25);
      \u0275\u0275text(48, "Bon retour");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "p", 26);
      \u0275\u0275text(50, "Connectez-vous pour piloter les demandes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(51, Login_Conditional_51_Template, 2, 0, "p", 27);
      \u0275\u0275conditionalCreate(52, Login_Conditional_52_Template, 1, 1, "p-message", 28);
      \u0275\u0275conditionalCreate(53, Login_Conditional_53_Template, 7, 1, "div", 29);
      \u0275\u0275elementStart(54, "form", 30);
      \u0275\u0275listener("ngSubmit", function Login_Template_form_ngSubmit_54_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275elementStart(55, "p", 31);
      \u0275\u0275text(56, "Tous les champs sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 32)(58, "button", 33);
      \u0275\u0275listener("click", function Login_Template_button_click_58_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setMethod("email"));
      });
      \u0275\u0275element(59, "i", 34);
      \u0275\u0275text(60, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "button", 33);
      \u0275\u0275listener("click", function Login_Template_button_click_61_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setMethod("phone"));
      });
      \u0275\u0275element(62, "i", 35);
      \u0275\u0275text(63, "T\xE9l\xE9phone");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div")(65, "label", 36);
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "span", 37);
      \u0275\u0275element(68, "i", 38)(69, "input", 39, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "small", 40);
      \u0275\u0275conditionalCreate(72, Login_Conditional_72_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "div")(74, "label", 41);
      \u0275\u0275text(75, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "span", 37);
      \u0275\u0275element(77, "input", 42);
      \u0275\u0275elementStart(78, "button", 43);
      \u0275\u0275listener("click", function Login_Template_button_click_78_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.showPassword.set(!ctx.showPassword()));
      });
      \u0275\u0275element(79, "i", 44);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(80, "small", 45);
      \u0275\u0275conditionalCreate(81, Login_Conditional_81_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(82, "p-button", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "div", 47);
      \u0275\u0275element(84, "span", 48);
      \u0275\u0275text(85, "ou");
      \u0275\u0275element(86, "span", 48);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(87, "app-google-button", 49);
      \u0275\u0275listener("failed", function Login_Template_app_google_button_failed_87_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.errorMessage.set($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "div", 50)(89, "span");
      \u0275\u0275text(90, "Vous n\u2019avez pas de compte ?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "a", 51);
      \u0275\u0275text(92, "Cr\xE9er un compte");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("float", false);
      \u0275\u0275advance(51);
      \u0275\u0275conditional(ctx.accountDeleted ? 51 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 52 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.submitAttempted() && ctx.formErrors().length ? 53 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275attribute("aria-busy", ctx.loading());
      \u0275\u0275advance(4);
      \u0275\u0275classMap(ctx.tabClass("email"));
      \u0275\u0275attribute("aria-pressed", ctx.method() === "email");
      \u0275\u0275advance(3);
      \u0275\u0275classMap(ctx.tabClass("phone"));
      \u0275\u0275attribute("aria-pressed", ctx.method() === "phone");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.method() === "phone" ? "Num\xE9ro de t\xE9l\xE9phone" : "Adresse email");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.method() === "phone" ? "pi pi-phone" : "pi pi-envelope");
      \u0275\u0275advance();
      \u0275\u0275property("type", ctx.method() === "phone" ? "tel" : "email")("invalid", ctx.loginForm.controls.identifier.invalid && ctx.loginForm.controls.identifier.touched);
      \u0275\u0275attribute("inputmode", ctx.method() === "phone" ? "tel" : "email")("autocomplete", ctx.method() === "phone" ? "tel" : "username")("placeholder", ctx.method() === "phone" ? "034 12 345 67" : "vous@exemple.mg")("aria-invalid", ctx.loginForm.controls.identifier.invalid && ctx.loginForm.controls.identifier.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loginForm.controls.identifier.invalid && ctx.loginForm.controls.identifier.touched ? 72 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("invalid", ctx.loginForm.controls.password.invalid && ctx.loginForm.controls.password.touched);
      \u0275\u0275attribute("aria-invalid", ctx.loginForm.controls.password.invalid && ctx.loginForm.controls.password.touched);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.showPassword());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.showPassword() ? "pi pi-eye-slash" : "pi pi-eye");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loginForm.controls.password.invalid && ctx.loginForm.controls.password.touched ? 81 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.loading());
    }
  }, dependencies: [ButtonModule, Button, InputTextModule, InputText, MessageModule, Message, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, RouterModule, RouterLink, AppFloatingConfigurator, GoogleButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator, GoogleButton], template: `<app-floating-configurator [float]="false" class="auth-display-settings" />
<main class="grid min-h-dvh bg-white font-sans text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50 lg:grid-cols-[minmax(26rem,57.3%)_1fr]">
    <section
        class="relative isolate hidden overflow-hidden bg-[radial-gradient(circle_at_90%_8%,#17845b_0,transparent_31%),linear-gradient(145deg,#062c21_0%,#07533a_59%,#03271d_100%)] px-[clamp(2rem,7vw,8.5rem)] py-[clamp(2rem,4vw,4.8rem)] text-white lg:flex lg:flex-col"
        aria-label="Terra Nova"
    >
        <div class="pointer-events-none absolute -right-64 -top-72 -z-10 h-[38rem] w-[52rem] rotate-[-17deg] rounded-[49%_51%_54%_46%/42%_45%_55%_58%] border border-emerald-200/25"></div>
        <a class="inline-flex w-fit items-center gap-3 text-[1.4rem] font-bold tracking-[-.04em]" routerLink="/" aria-label="Terra Nova, accueil"
            ><span class="grid size-8 place-items-center rounded-[.62rem] bg-emerald-500 text-sm font-black leading-none -skew-y-6" aria-hidden="true">TN</span><span>Terra Nova</span></a
        >
        <div class="mt-[clamp(5rem,13vh,10rem)] max-w-xl">
            <h1 class="m-0 !text-white font-bold leading-[.99] tracking-[-.065em]">Chaque demande<br /><span class="!text-emerald-300">compte.</span></h1>
            <p class="mt-7 max-w-lg text-[1.06rem] leading-7 text-emerald-50/85">Terra Nova accompagne les collectivit\xE9s dans une gestion simple, s\xFBre et transparente des demandes citoyennes.</p>
        </div>
        <ul class="mt-auto grid list-none gap-5 pb-8 pt-16">
            <li class="flex items-center gap-4">
                <i aria-hidden="true" class="pi pi-users grid size-11 place-items-center rounded-full border border-emerald-200/40 text-emerald-100"></i
                ><span class="grid gap-0.5"><strong class="text-[.94rem]">Des citoyens mieux accompagn\xE9s</strong><small class="text-[.81rem] text-emerald-100/75">Un suivi clair, au bon moment.</small></span>
            </li>
            <li class="flex items-center gap-4">
                <i aria-hidden="true" class="pi pi-shield grid size-11 place-items-center rounded-full border border-emerald-200/40 text-emerald-100"></i
                ><span class="grid gap-0.5"><strong class="text-[.94rem]">Des services plus efficaces</strong><small class="text-[.81rem] text-emerald-100/75">Des processus simples et fiables.</small></span>
            </li>
            <li class="flex items-center gap-4">
                <i aria-hidden="true" class="pi pi-chart-bar grid size-11 place-items-center rounded-full border border-emerald-200/40 text-emerald-100"></i
                ><span class="grid gap-0.5"><strong class="text-[.94rem]">Une action plus transparente</strong><small class="text-[.81rem] text-emerald-100/75">Une tra\xE7abilit\xE9 qui inspire confiance.</small></span>
            </li>
        </ul>
    </section>
    <section class="grid place-items-center bg-white px-5 py-8 dark:bg-emerald-950 sm:px-8" aria-labelledby="login-title">
        <div
            class="w-full max-w-[27.5rem] rounded-2xl border border-transparent p-0 sm:max-lg:border-emerald-100 sm:max-lg:bg-white sm:max-lg:p-[clamp(1.6rem,6vw,3rem)] sm:max-lg:shadow-[0_18px_60px_rgba(19,74,50,.08)] dark:sm:max-lg:border-emerald-900 dark:sm:max-lg:bg-emerald-900/40"
        >
            <a class="mb-14 inline-flex w-fit items-center gap-3 text-[1.4rem] font-bold tracking-[-.04em] lg:hidden" routerLink="/"
                ><span class="grid size-8 place-items-center rounded-[.62rem] bg-emerald-500 text-sm font-black leading-none text-white -skew-y-6" aria-hidden="true">TN</span><span>Terra Nova</span></a
            >
            <header class="mb-8">
                <h1 id="login-title" class="mb-2 text-[2rem] font-bold leading-tight tracking-[-.045em]">Bon retour</h1>
                <p class="m-0 leading-6 text-emerald-950/60 dark:text-emerald-50/65">Connectez-vous pour piloter les demandes.</p>
            </header>
            @if (accountDeleted) {
                <p role="status" class="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">Votre compte a \xE9t\xE9 supprim\xE9. Vous \xEAtes d\xE9connect\xE9 de votre espace personnel.</p>
            }
            @if (errorMessage()) {
                <p-message severity="error" [text]="errorMessage()!" icon="pi pi-exclamation-circle" styleClass="mb-5 block" role="alert" />
            }
            @if (submitAttempted() && formErrors().length) {
                <div #errorSummary id="login-error-summary" role="alert" tabindex="-1" class="mb-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
                    <p class="m-0 font-semibold">{{ formErrors().length > 1 ? 'Le formulaire contient ' + formErrors().length + ' erreurs :' : 'Le formulaire contient une erreur :' }}</p>
                    <ul class="mb-0 mt-2 list-disc pl-5">
                        @for (error of formErrors(); track error.field) {
                            <li><a class="underline" [href]="'#' + error.field" (click)="focusField($event, error.field)">{{ error.message }}</a></li>
                        }
                    </ul>
                </div>
            }
            <form [formGroup]="loginForm" (ngSubmit)="submit()" novalidate class="space-y-4" aria-labelledby="login-title" [attr.aria-busy]="loading()">
                <p id="login-required-hint" class="m-0 text-sm text-emerald-950/60 dark:text-emerald-50/65">Tous les champs sont obligatoires.</p>
                <div role="group" aria-label="M\xE9thode de connexion" class="grid grid-cols-2 gap-1 rounded-xl bg-emerald-50 p-1 dark:bg-emerald-900/60">
                    <button type="button" [class]="tabClass('email')" [attr.aria-pressed]="method() === 'email'" (click)="setMethod('email')"><i class="pi pi-envelope mr-2" aria-hidden="true"></i>Email</button>
                    <button type="button" [class]="tabClass('phone')" [attr.aria-pressed]="method() === 'phone'" (click)="setMethod('phone')"><i class="pi pi-phone mr-2" aria-hidden="true"></i>T\xE9l\xE9phone</button>
                </div>
                <div>
                    <label for="identifier" class="mb-2 inline-block text-sm font-semibold">{{ method() === 'phone' ? 'Num\xE9ro de t\xE9l\xE9phone' : 'Adresse email' }}</label
                    ><span class="relative block"
                        ><i [class]="method() === 'phone' ? 'pi pi-phone' : 'pi pi-envelope'" class="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-emerald-950/45 dark:text-emerald-50/50" aria-hidden="true"></i
                        ><input
                            pInputText
                            #identifierInput
                            id="identifier"
                            [type]="method() === 'phone' ? 'tel' : 'email'"
                            [attr.inputmode]="method() === 'phone' ? 'tel' : 'email'"
                            [attr.autocomplete]="method() === 'phone' ? 'tel' : 'username'"
                            [attr.placeholder]="method() === 'phone' ? '034 12 345 67' : 'vous@exemple.mg'"
                            required
                            aria-describedby="identifier-error"
                            [attr.aria-invalid]="loginForm.controls.identifier.invalid && loginForm.controls.identifier.touched"
                            class="w-full rounded-xl border-emerald-200 py-3 !pl-11 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="identifier"
                            [invalid]="loginForm.controls.identifier.invalid && loginForm.controls.identifier.touched" /></span
                    ><small id="identifier-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (loginForm.controls.identifier.invalid && loginForm.controls.identifier.touched) {
                            {{ identifierError() }}
                        }
                    </small>
                </div>
                <div>
                    <label for="password" class="mb-2 inline-block text-sm font-semibold">Mot de passe</label
                    ><span class="relative block"
                        ><input
                            pInputText
                            id="password"
                            [type]="showPassword() ? 'text' : 'password'"
                            autocomplete="current-password"
                            placeholder="Votre mot de passe"
                            required
                            aria-describedby="password-error"
                            [attr.aria-invalid]="loginForm.controls.password.invalid && loginForm.controls.password.touched"
                            class="w-full rounded-xl border-emerald-200 py-3 !pr-12 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="password"
                            [invalid]="loginForm.controls.password.invalid && loginForm.controls.password.touched" /><button
                            type="button"
                            class="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-emerald-950/60 hover:bg-emerald-50 dark:text-emerald-50/70 dark:hover:bg-emerald-900"
                            aria-label="Afficher le mot de passe"
                            aria-controls="password"
                            [attr.aria-pressed]="showPassword()"
                            (click)="showPassword.set(!showPassword())"
                        >
                            <i [class]="showPassword() ? 'pi pi-eye-slash' : 'pi pi-eye'" aria-hidden="true"></i></button
                    ></span>
                    <small id="password-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (loginForm.controls.password.invalid && loginForm.controls.password.touched) {
                            Le mot de passe est obligatoire.
                        }
                    </small>
                </div>
                <p-button
                    type="submit"
                    label="Se connecter"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    styleClass="mt-2 w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold shadow-[0_10px_22px_rgba(22,163,106,.22)] hover:bg-emerald-700"
                    [loading]="loading()"
                />
            </form>
                <div class="my-5 flex items-center gap-3 text-xs text-emerald-950/50 dark:text-emerald-50/55" aria-hidden="true">
                    <span class="h-px flex-1 bg-emerald-200 dark:bg-emerald-800"></span>ou<span class="h-px flex-1 bg-emerald-200 dark:bg-emerald-800"></span>
                </div>
                <app-google-button (failed)="errorMessage.set($event)" />
            <div class="mt-7 flex justify-center gap-1.5 text-sm text-emerald-950/60 dark:text-emerald-50/65">
                <span>Vous n\u2019avez pas de compte ?</span><a routerLink="/auth/register" class="font-bold text-emerald-600 hover:underline">Cr\xE9er un compte</a>
            </div>
        </div>
    </section>
</main>` }]
  }], null, { identifierInput: [{ type: ViewChild, args: ["identifierInput", { isSignal: true }] }], errorSummary: [{ type: ViewChild, args: ["errorSummary", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/auth/login/login.ts", lineNumber: 22 });
})();
function loginErrorMessage(error) {
  if (!(error instanceof HttpErrorResponse)) {
    return "Erreur inattendue, veuillez r\xE9essayer.";
  }
  if (error.error?.error === "CodeResendLockedError") {
    return authErrorMessage(error);
  }
  switch (error.status) {
    case 401:
      return "Identifiant ou mot de passe incorrect.";
    case 403:
      return "Ce compte est d\xE9sactiv\xE9. Contactez un administrateur.";
    case 429:
      return "Trop de tentatives \xE9chou\xE9es : le compte est temporairement verrouill\xE9. R\xE9essayez dans quelques minutes.";
    case 422:
      return "V\xE9rifiez le format de votre email ou de votre num\xE9ro de t\xE9l\xE9phone.";
    default:
      return authErrorMessage(error);
  }
}

// src/app/auth/register/register.ts
var _c04 = ["nameInput"];
var _c13 = ["contactInput"];
var _c22 = ["errorSummary"];
var _forTrack02 = ($index, $item) => $item.field;
function Register_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-message", 26);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r1.errorMessage());
  }
}
function Register_Conditional_44_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 62);
    \u0275\u0275listener("click", function Register_Conditional_44_For_6_Template_a_click_1_listener($event) {
      const error_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.focusField($event, error_r4.field));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const error_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("href", "#" + error_r4.field, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(error_r4.message);
  }
}
function Register_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27, 2)(2, "p", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 61);
    \u0275\u0275repeaterCreate(5, Register_Conditional_44_For_6_Template, 3, 2, "li", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formErrors().length > 1 ? "Le formulaire contient " + ctx_r1.formErrors().length + " erreurs :" : "Le formulaire contient une erreur :");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.formErrors());
  }
}
function Register_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Saisissez un nom de 1 \xE0 255 caract\xE8res. ");
  }
}
function Register_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 42);
    \u0275\u0275text(1, "Format local (034 12 345 67) ou international (+261 34 12 345 67).");
    \u0275\u0275elementEnd();
  }
}
function Register_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.contactError(), " ");
  }
}
function Register_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.passwordError(), " ");
  }
}
function Register_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirmError(), " ");
  }
}
function passwordMatchValidator(control) {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}
var Register = class _Register {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  injector = inject(Injector);
  nameInput = viewChild("nameInput", ...ngDevMode ? [{ debugName: "nameInput" }] : []);
  contactInput = viewChild("contactInput", ...ngDevMode ? [{ debugName: "contactInput" }] : []);
  errorSummary = viewChild("errorSummary", ...ngDevMode ? [{ debugName: "errorSummary" }] : []);
  /** Moyen de contact choisi : le code de confirmation part par ce canal (email ou SMS). */
  method = signal("email", ...ngDevMode ? [{ debugName: "method" }] : []);
  contactValidator = (control) => this.method() === "phone" ? phoneValidator(control) : Validators.email(control);
  registerForm = this.fb.nonNullable.group({
    name: ["", NAME_VALIDATORS],
    contact: ["", [Validators.required, this.contactValidator]],
    password: ["", [Validators.required, ...PASSWORD_VALIDATORS]],
    confirmPassword: ["", [Validators.required]]
  }, { validators: passwordMatchValidator });
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  /** Passe à true au premier envoi refusé : affiche le récapitulatif des erreurs. */
  submitAttempted = signal(false, ...ngDevMode ? [{ debugName: "submitAttempted" }] : []);
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  showConfirm = signal(false, ...ngDevMode ? [{ debugName: "showConfirm" }] : []);
  ngAfterViewInit() {
    this.nameInput()?.nativeElement.focus();
  }
  setMethod(method) {
    if (this.method() === method || this.loading())
      return;
    this.method.set(method);
    this.registerForm.controls.contact.reset("");
    this.errorMessage.set(null);
    this.submitAttempted.set(false);
    afterNextRender(() => this.contactInput()?.nativeElement.focus(), { injector: this.injector });
  }
  /** Classes de l'onglet Email / Téléphone selon qu'il est actif ou non. */
  tabClass(method) {
    const base = "rounded-lg px-3 py-2 text-sm font-semibold transition-colors";
    return this.method() === method ? `${base} bg-white text-emerald-700 shadow-sm dark:bg-emerald-700 dark:text-white` : `${base} text-emerald-950/60 hover:text-emerald-950 dark:text-emerald-50/65 dark:hover:text-emerald-50`;
  }
  submit() {
    if (this.loading())
      return;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.submitAttempted.set(true);
      afterNextRender(() => this.errorSummary()?.nativeElement.focus(), { injector: this.injector });
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);
    const { name, contact, password } = this.registerForm.getRawValue();
    const target = this.method() === "phone" ? { phone: normalizePhone(contact) ?? contact.trim() } : { email: contact.trim() };
    this.registerForm.disable();
    this.auth.register(name.trim(), target, password).subscribe({
      // Compte créé mais non confirmé : un code vient d'être envoyé (email ou SMS), la session s'ouvre après sa saisie.
      next: () => {
        this.registerForm.patchValue({ password: "", confirmPassword: "" });
        this.router.navigate(["/auth/verify-code"], { queryParamsHandling: "preserve" });
      },
      error: (error) => {
        this.loading.set(false);
        this.registerForm.enable();
        this.registerForm.patchValue({ password: "", confirmPassword: "" });
        this.errorMessage.set(registerErrorMessage(error));
      }
    });
  }
  contactError() {
    const phone = this.method() === "phone";
    if (this.registerForm.controls.contact.hasError("required")) {
      return phone ? "Le num\xE9ro de t\xE9l\xE9phone est obligatoire." : "L\u2019email est obligatoire.";
    }
    return phone ? "Saisissez un num\xE9ro valide, par exemple 034 12 345 67 ou +261 34 12 345 67." : "Saisissez une adresse email valide.";
  }
  passwordError() {
    return this.registerForm.controls.password.hasError("required") ? "Le mot de passe est obligatoire." : "Le mot de passe doit contenir 10 \xE0 128 caract\xE8res, avec majuscule, minuscule et chiffre.";
  }
  confirmInvalid() {
    const confirm = this.registerForm.controls.confirmPassword;
    return (confirm.invalid || this.registerForm.hasError("passwordMismatch")) && confirm.touched;
  }
  confirmError() {
    return this.registerForm.controls.confirmPassword.hasError("required") ? "La confirmation est obligatoire." : "Les mots de passe ne correspondent pas.";
  }
  /** Erreurs du formulaire, dans l’ordre des champs, pour le récapitulatif. */
  formErrors() {
    const { name, contact, password, confirmPassword } = this.registerForm.controls;
    const errors = [];
    if (name.invalid)
      errors.push({ field: "name", message: "Saisissez un nom de 1 \xE0 255 caract\xE8res." });
    if (contact.invalid)
      errors.push({ field: "contact", message: this.contactError() });
    if (password.invalid)
      errors.push({ field: "password", message: this.passwordError() });
    if (confirmPassword.invalid || this.registerForm.hasError("passwordMismatch"))
      errors.push({ field: "confirmPassword", message: this.confirmError() });
    return errors;
  }
  /** Lien du récapitulatif : place le focus dans le champ concerné sans recharger la page. */
  focusField(event, id) {
    event.preventDefault();
    document.getElementById(id)?.focus();
  }
  static \u0275fac = function Register_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Register)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Register, selectors: [["app-register"]], viewQuery: function Register_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.nameInput, _c04, 5)(ctx.contactInput, _c13, 5)(ctx.errorSummary, _c22, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, decls: 105, vars: 42, consts: [["nameInput", ""], ["contactInput", ""], ["errorSummary", ""], [1, "auth-display-settings", 3, "float"], [1, "grid", "min-h-dvh", "bg-white", "font-sans", "text-emerald-950", "dark:bg-emerald-950", "dark:text-emerald-50", "lg:grid-cols-[minmax(26rem,57.3%)_1fr]"], ["aria-label", "Terra Nova", 1, "relative", "isolate", "hidden", "overflow-hidden", "bg-[radial-gradient(circle_at_90%_8%,#17845b_0,transparent_31%),linear-gradient(145deg,#062c21_0%,#07533a_59%,#03271d_100%)]", "px-[clamp(2rem,7vw,8.5rem)]", "py-[clamp(2rem,4vw,4.8rem)]", "text-white", "lg:flex", "lg:flex-col"], ["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "inline-flex", "w-fit", "items-center", "gap-3", "text-[1.4rem]", "font-bold", "tracking-[-.04em]"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-[.62rem]", "bg-emerald-500", "text-sm", "font-black", "leading-none", "-skew-y-6"], [1, "mt-[clamp(5rem,13vh,10rem)]", "max-w-xl"], [1, "m-0", "!text-[clamp(2.7rem,4.5vw,5rem)]", "!text-white", "font-bold", "leading-[.99]", "tracking-[-.065em]"], [1, "!text-emerald-300"], [1, "mt-7", "max-w-lg", "text-[1.06rem]", "leading-7", "text-emerald-50/85"], [1, "mt-auto", "grid", "list-none", "gap-5", "pb-8", "pt-16"], [1, "flex", "items-center", "gap-4"], ["aria-hidden", "true", 1, "pi", "pi-users", "grid", "size-11", "place-items-center", "rounded-full", "border", "border-emerald-200/40", "text-emerald-100"], [1, "grid", "gap-0.5"], [1, "text-[.94rem]"], [1, "text-[.81rem]", "text-emerald-100/75"], ["aria-hidden", "true", 1, "pi", "pi-shield", "grid", "size-11", "place-items-center", "rounded-full", "border", "border-emerald-200/40", "text-emerald-100"], ["aria-labelledby", "register-title", 1, "grid", "place-items-center", "bg-white", "px-5", "py-8", "dark:bg-emerald-950", "sm:px-8"], [1, "w-full", "max-w-[27.5rem]", "rounded-2xl", "border", "border-transparent", "p-0", "sm:max-lg:border-emerald-100", "sm:max-lg:bg-white", "sm:max-lg:p-[clamp(1.6rem,6vw,3rem)]", "sm:max-lg:shadow-[0_18px_60px_rgba(19,74,50,.08)]", "dark:sm:max-lg:border-emerald-900", "dark:sm:max-lg:bg-emerald-900/40"], ["routerLink", "/", 1, "mb-8", "inline-flex", "w-fit", "items-center", "gap-3", "text-[1.4rem]", "font-bold", "tracking-[-.04em]", "lg:hidden"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-[.62rem]", "bg-emerald-500", "text-sm", "font-black", "leading-none", "text-white", "-skew-y-6"], [1, "mb-6"], ["id", "register-title", 1, "mb-2", "text-[2rem]", "font-bold", "leading-tight", "tracking-[-.045em]"], [1, "m-0", "leading-6", "text-emerald-950/60", "dark:text-emerald-50/65"], ["severity", "error", "icon", "pi pi-exclamation-circle", "styleClass", "mb-4 block", "role", "alert", 3, "text"], ["id", "register-error-summary", "role", "alert", "tabindex", "-1", 1, "mb-4", "rounded-xl", "border", "border-red-300", "bg-red-50", "p-4", "text-sm", "text-red-800", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["novalidate", "", "aria-labelledby", "register-title", 1, "space-y-2", 3, "ngSubmit", "formGroup"], [1, "mb-3", "mt-0", "text-sm", "text-emerald-950/60", "dark:text-emerald-50/65"], ["for", "name", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], [1, "relative", "block"], ["aria-hidden", "true", 1, "pi", "pi-user", "absolute", "left-4", "top-1/2", "z-10", "-translate-y-1/2", "text-emerald-950/45", "dark:text-emerald-50/50"], ["pInputText", "", "id", "name", "type", "text", "autocomplete", "name", "placeholder", "Votre nom", "required", "", "maxlength", "255", "aria-describedby", "name-error", "formControlName", "name", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pl-11", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "invalid"], ["id", "name-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["role", "group", "aria-label", "M\xE9thode de confirmation", 1, "grid", "grid-cols-2", "gap-1", "rounded-xl", "bg-emerald-50", "p-1", "dark:bg-emerald-900/60"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-envelope", "mr-2"], ["aria-hidden", "true", 1, "pi", "pi-phone", "mr-2"], ["for", "contact", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], ["aria-hidden", "true", 1, "absolute", "left-4", "top-1/2", "z-10", "-translate-y-1/2", "text-emerald-950/45", "dark:text-emerald-50/50"], ["pInputText", "", "id", "contact", "required", "", "aria-describedby", "contact-help contact-error", "formControlName", "contact", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pl-11", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "type", "invalid"], ["id", "contact-help", 1, "block", "pt-1", "text-xs", "text-emerald-950/60", "dark:text-emerald-50/65"], ["id", "contact-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["for", "password", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], ["pInputText", "", "id", "password", "autocomplete", "new-password", "placeholder", "10 caract\xE8res minimum", "required", "", "aria-describedby", "password-help password-error", "formControlName", "password", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pr-12", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "type", "invalid"], ["type", "button", "aria-label", "Afficher le mot de passe", "aria-controls", "password", 1, "absolute", "right-1.5", "top-1/2", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-lg", "text-emerald-950/60", "hover:bg-emerald-50", "dark:text-emerald-50/70", "dark:hover:bg-emerald-900", 3, "click"], ["aria-hidden", "true"], ["id", "password-help", 1, "block", "pt-1", "text-xs", "text-emerald-950/60", "dark:text-emerald-50/65"], ["id", "password-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["for", "confirmPassword", 1, "mb-2", "inline-block", "text-sm", "font-semibold"], ["pInputText", "", "id", "confirmPassword", "autocomplete", "new-password", "placeholder", "R\xE9p\xE9tez votre mot de passe", "required", "", "aria-describedby", "confirmPassword-error", "formControlName", "confirmPassword", 1, "w-full", "rounded-xl", "border-emerald-200", "py-3", "!pr-12", "text-[.95rem]", "shadow-none", "focus:border-emerald-500", "focus:ring-4", "focus:ring-emerald-500/15", "dark:border-emerald-800", "dark:bg-emerald-950/60", "dark:text-emerald-50", 3, "type", "invalid"], ["type", "button", "aria-label", "Afficher la confirmation du mot de passe", "aria-controls", "confirmPassword", 1, "absolute", "right-1.5", "top-1/2", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-lg", "text-emerald-950/60", "hover:bg-emerald-50", "dark:text-emerald-50/70", "dark:hover:bg-emerald-900", 3, "click"], ["id", "confirmPassword-error", 1, "field-error", "block", "min-h-4", "pt-1", "text-xs", "text-red-600", "dark:text-red-300"], ["type", "submit", "label", "Cr\xE9er mon compte", "icon", "pi pi-arrow-right", "iconPos", "right", "styleClass", "mt-2 w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold shadow-[0_10px_22px_rgba(22,163,106,.22)] hover:bg-emerald-700", 3, "loading"], ["aria-hidden", "true", 1, "my-5", "flex", "items-center", "gap-3", "text-xs", "text-emerald-950/50", "dark:text-emerald-50/55"], [1, "h-px", "flex-1", "bg-emerald-200", "dark:bg-emerald-800"], [3, "failed"], [1, "mt-6", "flex", "justify-center", "gap-1.5", "text-sm", "text-emerald-950/60", "dark:text-emerald-50/65"], ["routerLink", "/auth/login", 1, "font-bold", "text-emerald-600", "hover:underline"], [1, "m-0", "font-semibold"], [1, "mb-0", "mt-2", "list-disc", "pl-5"], [1, "underline", 3, "click", "href"]], template: function Register_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "app-floating-configurator", 3);
      \u0275\u0275elementStart(1, "main", 4)(2, "section", 5)(3, "a", 6)(4, "span", 7);
      \u0275\u0275text(5, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 8)(9, "h1", 9);
      \u0275\u0275text(10, "Une gestion publique");
      \u0275\u0275element(11, "br");
      \u0275\u0275elementStart(12, "span", 10);
      \u0275\u0275text(13, "plus proche.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "p", 11);
      \u0275\u0275text(15, "Cr\xE9ez votre espace Terra Nova et donnez \xE0 chaque demande la suite qu\u2019elle m\xE9rite.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "ul", 12)(17, "li", 13);
      \u0275\u0275element(18, "i", 14);
      \u0275\u0275elementStart(19, "span", 15)(20, "strong", 16);
      \u0275\u0275text(21, "Des citoyens mieux accompagn\xE9s");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "small", 17);
      \u0275\u0275text(23, "Un suivi clair, au bon moment.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "li", 13);
      \u0275\u0275element(25, "i", 18);
      \u0275\u0275elementStart(26, "span", 15)(27, "strong", 16);
      \u0275\u0275text(28, "Vos donn\xE9es prot\xE9g\xE9es");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "small", 17);
      \u0275\u0275text(30, "Une plateforme con\xE7ue pour le service public.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(31, "section", 19)(32, "div", 20)(33, "a", 21)(34, "span", 22);
      \u0275\u0275text(35, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "span");
      \u0275\u0275text(37, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "header", 23)(39, "h1", 24);
      \u0275\u0275text(40, "Cr\xE9er votre compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "p", 25);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(43, Register_Conditional_43_Template, 1, 1, "p-message", 26);
      \u0275\u0275conditionalCreate(44, Register_Conditional_44_Template, 7, 1, "div", 27);
      \u0275\u0275elementStart(45, "form", 28);
      \u0275\u0275listener("ngSubmit", function Register_Template_form_ngSubmit_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275elementStart(46, "p", 29);
      \u0275\u0275text(47, "Tous les champs sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div")(49, "label", 30);
      \u0275\u0275text(50, "Nom complet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span", 31);
      \u0275\u0275element(52, "i", 32)(53, "input", 33, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "small", 34);
      \u0275\u0275conditionalCreate(56, Register_Conditional_56_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "div", 35)(58, "button", 36);
      \u0275\u0275listener("click", function Register_Template_button_click_58_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setMethod("email"));
      });
      \u0275\u0275element(59, "i", 37);
      \u0275\u0275text(60, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "button", 36);
      \u0275\u0275listener("click", function Register_Template_button_click_61_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setMethod("phone"));
      });
      \u0275\u0275element(62, "i", 38);
      \u0275\u0275text(63, "T\xE9l\xE9phone");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div")(65, "label", 39);
      \u0275\u0275text(66);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "span", 31);
      \u0275\u0275element(68, "i", 40)(69, "input", 41, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(71, Register_Conditional_71_Template, 2, 0, "small", 42);
      \u0275\u0275elementStart(72, "small", 43);
      \u0275\u0275conditionalCreate(73, Register_Conditional_73_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div")(75, "label", 44);
      \u0275\u0275text(76, "Mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "span", 31);
      \u0275\u0275element(78, "input", 45);
      \u0275\u0275elementStart(79, "button", 46);
      \u0275\u0275listener("click", function Register_Template_button_click_79_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.showPassword.set(!ctx.showPassword()));
      });
      \u0275\u0275element(80, "i", 47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "small", 48);
      \u0275\u0275text(82, "10 \xE0 128 caract\xE8res, avec au moins une majuscule, une minuscule et un chiffre.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "small", 49);
      \u0275\u0275conditionalCreate(84, Register_Conditional_84_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div")(86, "label", 50);
      \u0275\u0275text(87, "Confirmer le mot de passe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "span", 31);
      \u0275\u0275element(89, "input", 51);
      \u0275\u0275elementStart(90, "button", 52);
      \u0275\u0275listener("click", function Register_Template_button_click_90_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.showConfirm.set(!ctx.showConfirm()));
      });
      \u0275\u0275element(91, "i", 47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(92, "small", 53);
      \u0275\u0275conditionalCreate(93, Register_Conditional_93_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(94, "p-button", 54);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "div", 55);
      \u0275\u0275element(96, "span", 56);
      \u0275\u0275text(97, "ou");
      \u0275\u0275element(98, "span", 56);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "app-google-button", 57);
      \u0275\u0275listener("failed", function Register_Template_app_google_button_failed_99_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.errorMessage.set($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "div", 58)(101, "span");
      \u0275\u0275text(102, "Vous avez d\xE9j\xE0 un compte ?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "a", 59);
      \u0275\u0275text(104, "Se connecter");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("float", false);
      \u0275\u0275advance(42);
      \u0275\u0275textInterpolate1("Quelques informations suffisent pour commencer. Un code de confirmation sera envoy\xE9 ", ctx.method() === "phone" ? "par SMS \xE0 votre num\xE9ro de t\xE9l\xE9phone" : "\xE0 votre adresse email", ".");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.submitAttempted() && ctx.formErrors().length ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.registerForm);
      \u0275\u0275attribute("aria-busy", ctx.loading());
      \u0275\u0275advance(8);
      \u0275\u0275property("invalid", ctx.registerForm.controls.name.invalid && ctx.registerForm.controls.name.touched);
      \u0275\u0275attribute("aria-invalid", ctx.registerForm.controls.name.invalid && ctx.registerForm.controls.name.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.registerForm.controls.name.invalid && ctx.registerForm.controls.name.touched ? 56 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.tabClass("email"));
      \u0275\u0275attribute("aria-pressed", ctx.method() === "email");
      \u0275\u0275advance(3);
      \u0275\u0275classMap(ctx.tabClass("phone"));
      \u0275\u0275attribute("aria-pressed", ctx.method() === "phone");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.method() === "phone" ? "Num\xE9ro de t\xE9l\xE9phone" : "Adresse email");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.method() === "phone" ? "pi pi-phone" : "pi pi-envelope");
      \u0275\u0275advance();
      \u0275\u0275property("type", ctx.method() === "phone" ? "tel" : "email")("invalid", ctx.registerForm.controls.contact.invalid && ctx.registerForm.controls.contact.touched);
      \u0275\u0275attribute("inputmode", ctx.method() === "phone" ? "tel" : "email")("autocomplete", ctx.method() === "phone" ? "tel" : "email")("placeholder", ctx.method() === "phone" ? "034 12 345 67" : "vous@exemple.mg")("maxlength", ctx.method() === "phone" ? 32 : 320)("aria-invalid", ctx.registerForm.controls.contact.invalid && ctx.registerForm.controls.contact.touched);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.method() === "phone" ? 71 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.registerForm.controls.contact.invalid && ctx.registerForm.controls.contact.touched ? 73 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password")("invalid", ctx.registerForm.controls.password.invalid && ctx.registerForm.controls.password.touched);
      \u0275\u0275attribute("aria-invalid", ctx.registerForm.controls.password.invalid && ctx.registerForm.controls.password.touched);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.showPassword());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.showPassword() ? "pi pi-eye-slash" : "pi pi-eye");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.registerForm.controls.password.invalid && ctx.registerForm.controls.password.touched ? 84 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275property("type", ctx.showConfirm() ? "text" : "password")("invalid", ctx.confirmInvalid());
      \u0275\u0275attribute("aria-invalid", ctx.confirmInvalid());
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-pressed", ctx.showConfirm());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.showConfirm() ? "pi pi-eye-slash" : "pi pi-eye");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.confirmInvalid() ? 93 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.loading());
    }
  }, dependencies: [ButtonModule, Button, InputTextModule, InputText, MessageModule, Message, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, FormGroupDirective, FormControlName, RouterModule, RouterLink, AppFloatingConfigurator, GoogleButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Register, [{
    type: Component,
    args: [{ selector: "app-register", imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator, GoogleButton], template: `<app-floating-configurator [float]="false" class="auth-display-settings" />
<main class="grid min-h-dvh bg-white font-sans text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50 lg:grid-cols-[minmax(26rem,57.3%)_1fr]">
    <section
        class="relative isolate hidden overflow-hidden bg-[radial-gradient(circle_at_90%_8%,#17845b_0,transparent_31%),linear-gradient(145deg,#062c21_0%,#07533a_59%,#03271d_100%)] px-[clamp(2rem,7vw,8.5rem)] py-[clamp(2rem,4vw,4.8rem)] text-white lg:flex lg:flex-col"
        aria-label="Terra Nova"
    >
        <a class="inline-flex w-fit items-center gap-3 text-[1.4rem] font-bold tracking-[-.04em]" routerLink="/" aria-label="Terra Nova, accueil"
            ><span class="grid size-8 place-items-center rounded-[.62rem] bg-emerald-500 text-sm font-black leading-none -skew-y-6" aria-hidden="true">TN</span><span>Terra Nova</span></a
        >
        <div class="mt-[clamp(5rem,13vh,10rem)] max-w-xl">
            <h1 class="m-0 !text-[clamp(2.7rem,4.5vw,5rem)] !text-white font-bold leading-[.99] tracking-[-.065em]">Une gestion publique<br /><span class="!text-emerald-300">plus proche.</span></h1>
            <p class="mt-7 max-w-lg text-[1.06rem] leading-7 text-emerald-50/85">Cr\xE9ez votre espace Terra Nova et donnez \xE0 chaque demande la suite qu\u2019elle m\xE9rite.</p>
        </div>
        <ul class="mt-auto grid list-none gap-5 pb-8 pt-16">
            <li class="flex items-center gap-4">
                <i aria-hidden="true" class="pi pi-users grid size-11 place-items-center rounded-full border border-emerald-200/40 text-emerald-100"></i
                ><span class="grid gap-0.5"><strong class="text-[.94rem]">Des citoyens mieux accompagn\xE9s</strong><small class="text-[.81rem] text-emerald-100/75">Un suivi clair, au bon moment.</small></span>
            </li>
            <li class="flex items-center gap-4">
                <i aria-hidden="true" class="pi pi-shield grid size-11 place-items-center rounded-full border border-emerald-200/40 text-emerald-100"></i
                ><span class="grid gap-0.5"><strong class="text-[.94rem]">Vos donn\xE9es prot\xE9g\xE9es</strong><small class="text-[.81rem] text-emerald-100/75">Une plateforme con\xE7ue pour le service public.</small></span>
            </li>
        </ul>
    </section>
    <section class="grid place-items-center bg-white px-5 py-8 dark:bg-emerald-950 sm:px-8" aria-labelledby="register-title">
        <div
            class="w-full max-w-[27.5rem] rounded-2xl border border-transparent p-0 sm:max-lg:border-emerald-100 sm:max-lg:bg-white sm:max-lg:p-[clamp(1.6rem,6vw,3rem)] sm:max-lg:shadow-[0_18px_60px_rgba(19,74,50,.08)] dark:sm:max-lg:border-emerald-900 dark:sm:max-lg:bg-emerald-900/40"
        >
            <a class="mb-8 inline-flex w-fit items-center gap-3 text-[1.4rem] font-bold tracking-[-.04em] lg:hidden" routerLink="/"
                ><span class="grid size-8 place-items-center rounded-[.62rem] bg-emerald-500 text-sm font-black leading-none text-white -skew-y-6" aria-hidden="true">TN</span><span>Terra Nova</span></a
            >
            <header class="mb-6">
                <h1 id="register-title" class="mb-2 text-[2rem] font-bold leading-tight tracking-[-.045em]">Cr\xE9er votre compte</h1>
                <p class="m-0 leading-6 text-emerald-950/60 dark:text-emerald-50/65">Quelques informations suffisent pour commencer. Un code de confirmation sera envoy\xE9 {{ method() === 'phone' ? 'par SMS \xE0 votre num\xE9ro de t\xE9l\xE9phone' : '\xE0 votre adresse email' }}.</p>
            </header>
            @if (errorMessage()) {
                <p-message severity="error" [text]="errorMessage()!" icon="pi pi-exclamation-circle" styleClass="mb-4 block" role="alert" />
            }
            @if (submitAttempted() && formErrors().length) {
                <div #errorSummary id="register-error-summary" role="alert" tabindex="-1" class="mb-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
                    <p class="m-0 font-semibold">{{ formErrors().length > 1 ? 'Le formulaire contient ' + formErrors().length + ' erreurs :' : 'Le formulaire contient une erreur :' }}</p>
                    <ul class="mb-0 mt-2 list-disc pl-5">
                        @for (error of formErrors(); track error.field) {
                            <li><a class="underline" [href]="'#' + error.field" (click)="focusField($event, error.field)">{{ error.message }}</a></li>
                        }
                    </ul>
                </div>
            }
            <form [formGroup]="registerForm" (ngSubmit)="submit()" novalidate class="space-y-2" aria-labelledby="register-title" [attr.aria-busy]="loading()">
                <p class="mb-3 mt-0 text-sm text-emerald-950/60 dark:text-emerald-50/65">Tous les champs sont obligatoires.</p>
                <div>
                    <label for="name" class="mb-2 inline-block text-sm font-semibold">Nom complet</label
                    ><span class="relative block"
                        ><i class="pi pi-user absolute left-4 top-1/2 z-10 -translate-y-1/2 text-emerald-950/45 dark:text-emerald-50/50" aria-hidden="true"></i
                        ><input
                            pInputText
                            #nameInput
                            id="name"
                            type="text"
                            autocomplete="name"
                            placeholder="Votre nom"
                            required
                            maxlength="255"
                            aria-describedby="name-error"
                            [attr.aria-invalid]="registerForm.controls.name.invalid && registerForm.controls.name.touched"
                            class="w-full rounded-xl border-emerald-200 py-3 !pl-11 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="name"
                            [invalid]="registerForm.controls.name.invalid && registerForm.controls.name.touched" /></span
                    ><small id="name-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (registerForm.controls.name.invalid && registerForm.controls.name.touched) {
                            Saisissez un nom de 1 \xE0 255 caract\xE8res.
                        }
                    </small>
                </div>
                <div role="group" aria-label="M\xE9thode de confirmation" class="grid grid-cols-2 gap-1 rounded-xl bg-emerald-50 p-1 dark:bg-emerald-900/60">
                    <button type="button" [class]="tabClass('email')" [attr.aria-pressed]="method() === 'email'" (click)="setMethod('email')"><i class="pi pi-envelope mr-2" aria-hidden="true"></i>Email</button>
                    <button type="button" [class]="tabClass('phone')" [attr.aria-pressed]="method() === 'phone'" (click)="setMethod('phone')"><i class="pi pi-phone mr-2" aria-hidden="true"></i>T\xE9l\xE9phone</button>
                </div>
                <div>
                    <label for="contact" class="mb-2 inline-block text-sm font-semibold">{{ method() === 'phone' ? 'Num\xE9ro de t\xE9l\xE9phone' : 'Adresse email' }}</label
                    ><span class="relative block"
                        ><i [class]="method() === 'phone' ? 'pi pi-phone' : 'pi pi-envelope'" class="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-emerald-950/45 dark:text-emerald-50/50" aria-hidden="true"></i
                        ><input
                            pInputText
                            #contactInput
                            id="contact"
                            [type]="method() === 'phone' ? 'tel' : 'email'"
                            [attr.inputmode]="method() === 'phone' ? 'tel' : 'email'"
                            [attr.autocomplete]="method() === 'phone' ? 'tel' : 'email'"
                            [attr.placeholder]="method() === 'phone' ? '034 12 345 67' : 'vous@exemple.mg'"
                            [attr.maxlength]="method() === 'phone' ? 32 : 320"
                            required
                            aria-describedby="contact-help contact-error"
                            [attr.aria-invalid]="registerForm.controls.contact.invalid && registerForm.controls.contact.touched"
                            class="w-full rounded-xl border-emerald-200 py-3 !pl-11 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="contact"
                            [invalid]="registerForm.controls.contact.invalid && registerForm.controls.contact.touched" /></span
                    >@if (method() === 'phone') {
                        <small id="contact-help" class="block pt-1 text-xs text-emerald-950/60 dark:text-emerald-50/65">Format local (034 12 345 67) ou international (+261 34 12 345 67).</small>
                    }<small id="contact-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (registerForm.controls.contact.invalid && registerForm.controls.contact.touched) {
                            {{ contactError() }}
                        }
                    </small>
                </div>
                <div>
                    <label for="password" class="mb-2 inline-block text-sm font-semibold">Mot de passe</label
                    ><span class="relative block"
                        ><input
                            pInputText
                            id="password"
                            [type]="showPassword() ? 'text' : 'password'"
                            autocomplete="new-password"
                            placeholder="10 caract\xE8res minimum"
                            required
                            aria-describedby="password-help password-error"
                            [attr.aria-invalid]="registerForm.controls.password.invalid && registerForm.controls.password.touched"
                            class="w-full rounded-xl border-emerald-200 py-3 !pr-12 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="password"
                            [invalid]="registerForm.controls.password.invalid && registerForm.controls.password.touched" /><button
                            type="button"
                            class="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-emerald-950/60 hover:bg-emerald-50 dark:text-emerald-50/70 dark:hover:bg-emerald-900"
                            aria-label="Afficher le mot de passe"
                            aria-controls="password"
                            [attr.aria-pressed]="showPassword()"
                            (click)="showPassword.set(!showPassword())"
                        >
                            <i [class]="showPassword() ? 'pi pi-eye-slash' : 'pi pi-eye'" aria-hidden="true"></i></button
                    ></span>
                    <small id="password-help" class="block pt-1 text-xs text-emerald-950/60 dark:text-emerald-50/65">10 \xE0 128 caract\xE8res, avec au moins une majuscule, une minuscule et un chiffre.</small>
                    <small id="password-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (registerForm.controls.password.invalid && registerForm.controls.password.touched) {
                            {{ passwordError() }}
                        }
                    </small>
                </div>
                <div>
                    <label for="confirmPassword" class="mb-2 inline-block text-sm font-semibold">Confirmer le mot de passe</label
                    ><span class="relative block"
                        ><input
                            pInputText
                            id="confirmPassword"
                            [type]="showConfirm() ? 'text' : 'password'"
                            autocomplete="new-password"
                            placeholder="R\xE9p\xE9tez votre mot de passe"
                            required
                            aria-describedby="confirmPassword-error"
                            [attr.aria-invalid]="confirmInvalid()"
                            class="w-full rounded-xl border-emerald-200 py-3 !pr-12 text-[.95rem] shadow-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-50"
                            formControlName="confirmPassword"
                            [invalid]="confirmInvalid()" /><button
                            type="button"
                            class="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-emerald-950/60 hover:bg-emerald-50 dark:text-emerald-50/70 dark:hover:bg-emerald-900"
                            aria-label="Afficher la confirmation du mot de passe"
                            aria-controls="confirmPassword"
                            [attr.aria-pressed]="showConfirm()"
                            (click)="showConfirm.set(!showConfirm())"
                        >
                            <i [class]="showConfirm() ? 'pi pi-eye-slash' : 'pi pi-eye'" aria-hidden="true"></i></button
                    ></span>
                    <small id="confirmPassword-error" class="field-error block min-h-4 pt-1 text-xs text-red-600 dark:text-red-300">
                        @if (confirmInvalid()) {
                            {{ confirmError() }}
                        }
                    </small>
                </div>
                <p-button
                    type="submit"
                    label="Cr\xE9er mon compte"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    styleClass="mt-2 w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold shadow-[0_10px_22px_rgba(22,163,106,.22)] hover:bg-emerald-700"
                    [loading]="loading()"
                />
            </form>
                <div class="my-5 flex items-center gap-3 text-xs text-emerald-950/50 dark:text-emerald-50/55" aria-hidden="true">
                    <span class="h-px flex-1 bg-emerald-200 dark:bg-emerald-800"></span>ou<span class="h-px flex-1 bg-emerald-200 dark:bg-emerald-800"></span>
                </div>
                <app-google-button (failed)="errorMessage.set($event)" />
            <div class="mt-6 flex justify-center gap-1.5 text-sm text-emerald-950/60 dark:text-emerald-50/65"><span>Vous avez d\xE9j\xE0 un compte ?</span><a routerLink="/auth/login" class="font-bold text-emerald-600 hover:underline">Se connecter</a></div>
        </div>
    </section>
</main>` }]
  }], null, { nameInput: [{ type: ViewChild, args: ["nameInput", { isSignal: true }] }], contactInput: [{ type: ViewChild, args: ["contactInput", { isSignal: true }] }], errorSummary: [{ type: ViewChild, args: ["errorSummary", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Register, { className: "Register", filePath: "src/app/auth/register/register.ts", lineNumber: 30 });
})();
function registerErrorMessage(error) {
  if (!(error instanceof HttpErrorResponse)) {
    return "Erreur inattendue, veuillez r\xE9essayer.";
  }
  switch (error.status) {
    case 409:
      return "Cet email ou ce num\xE9ro est d\xE9j\xE0 utilis\xE9 par un autre compte.";
    case 422:
      return "V\xE9rifiez les informations saisies.";
    default:
      return authErrorMessage(error);
  }
}

// node_modules/@primeuix/styles/dist/inputotp/index.mjs
var style2 = "\n    .p-inputotp {\n        display: flex;\n        align-items: center;\n        gap: dt('inputotp.gap');\n    }\n\n    .p-inputotp-input {\n        text-align: center;\n        width: dt('inputotp.input.width');\n    }\n\n    .p-inputotp-input.p-inputtext-sm {\n        text-align: center;\n        width: dt('inputotp.input.sm.width');\n    }\n\n    .p-inputotp-input.p-inputtext-lg {\n        text-align: center;\n        width: dt('inputotp.input.lg.width');\n    }\n";

// node_modules/primeng/fesm2022/primeng-inputotp.mjs
var _c05 = ["input"];
var _c14 = (a0, a1, a2) => ({
  $implicit: a0,
  events: a1,
  index: a2
});
function InputOtp_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "input", 2);
    \u0275\u0275listener("input", function InputOtp_ng_container_0_ng_container_1_Template_input_input_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const i_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onInput($event, i_r2 - 1));
    })("focus", function InputOtp_ng_container_0_ng_container_1_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onInputFocus($event));
    })("blur", function InputOtp_ng_container_0_ng_container_1_Template_input_blur_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onInputBlur($event));
    })("paste", function InputOtp_ng_container_0_ng_container_1_Template_input_paste_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPaste($event));
    })("keydown", function InputOtp_ng_container_0_ng_container_1_Template_input_keydown_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onKeyDown($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const i_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.cn(ctx_r2.cx("pcInputText"), ctx_r2.styleClass));
    \u0275\u0275property("value", ctx_r2.getModelValue(i_r2))("pSize", ctx_r2.size())("variant", ctx_r2.$variant())("invalid", ctx_r2.invalid())("pAutoFocus", ctx_r2.getAutofocus(i_r2))("pt", ctx_r2.ptm("pcInputText"))("unstyled", ctx_r2.unstyled());
    \u0275\u0275attribute("maxlength", i_r2 === 1 ? ctx_r2.length : 1)("type", ctx_r2.inputType)("inputmode", ctx_r2.inputMode)("name", ctx_r2.name())("tabindex", ctx_r2.tabindex)("required", ctx_r2.required() ? "" : void 0)("readonly", ctx_r2.readonly ? "" : void 0)("disabled", ctx_r2.$disabled() ? "" : void 0);
  }
}
function InputOtp_ng_container_0_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function InputOtp_ng_container_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputOtp_ng_container_0_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const i_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r2.inputTemplate || ctx_r2._inputTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction3(2, _c14, ctx_r2.getToken(i_r2 - 1), ctx_r2.getTemplateEvents(i_r2 - 1), i_r2));
  }
}
function InputOtp_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, InputOtp_ng_container_0_ng_container_1_Template, 2, 17, "ng-container", 1)(2, InputOtp_ng_container_0_ng_container_2_Template, 2, 6, "ng-container", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.inputTemplate && !ctx_r2._inputTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.inputTemplate || ctx_r2._inputTemplate);
  }
}
var classes2 = {
  root: "p-inputotp p-component",
  pcInputText: "p-inputotp-input"
};
var InputOtpStyle = class _InputOtpStyle extends BaseStyle {
  name = "inputotp";
  style = style2;
  classes = classes2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputOtpStyle_BaseFactory;
    return function InputOtpStyle_Factory(__ngFactoryType__) {
      return (\u0275InputOtpStyle_BaseFactory || (\u0275InputOtpStyle_BaseFactory = \u0275\u0275getInheritedFactory(_InputOtpStyle)))(__ngFactoryType__ || _InputOtpStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _InputOtpStyle,
    factory: _InputOtpStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputOtpStyle, [{
    type: Injectable
  }], null, null);
})();
var InputOtpClasses;
(function(InputOtpClasses2) {
  InputOtpClasses2["root"] = "p-inputotp";
  InputOtpClasses2["pcInputText"] = "p-inputotp-input";
})(InputOtpClasses || (InputOtpClasses = {}));
var INPUTOTP_INSTANCE = new InjectionToken("INPUTOTP_INSTANCE");
var INPUT_OTP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputOtp),
  multi: true
};
var InputOtp = class _InputOtp extends BaseEditableHolder {
  _componentStyle = inject(InputOtpStyle);
  $pcInputOtp = inject(INPUTOTP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  /**
   * When present, it specifies that an input field is read-only.
   * @group Props
   */
  readonly;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = null;
  /**
   * Number of characters to initiate.
   * @group Props
   */
  length = 4;
  /**
   * Style class of the input element.
   * @group Props
   */
  styleClass;
  /**
   * Mask pattern.
   * @group Props
   */
  mask = false;
  /**
   * When present, it specifies that an input field is integer-only.
   * @group Props
   */
  integerOnly = false;
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus;
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(...ngDevMode ? [void 0, {
    debugName: "variant"
  }] : []);
  /**
   * Specifies the size of the component.
   * @defaultValue undefined
   * @group Props
   */
  size = input(...ngDevMode ? [void 0, {
    debugName: "size"
  }] : []);
  /**
   * Callback to invoke on value change.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when the component receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when the component loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Custom input template.
   * @param {InputOtpInputTemplateContext} context - Context of the template
   * @see {@link InputOtpInputTemplateContext}
   * @group Templates
   */
  inputTemplate;
  templates;
  _inputTemplate;
  tokens = [];
  value;
  $variant = computed(() => this.variant() || this.config.inputStyle() || this.config.inputVariant(), ...ngDevMode ? [{
    debugName: "$variant"
  }] : []);
  get inputMode() {
    return this.integerOnly ? "numeric" : "text";
  }
  get inputType() {
    return this.mask ? "password" : "text";
  }
  onAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "input":
          this._inputTemplate = item.template;
          break;
        default:
          this._inputTemplate = item.template;
          break;
      }
    });
  }
  getToken(index) {
    return this.tokens[index];
  }
  getTemplateEvents(index) {
    return {
      input: (event) => this.onInput(event, index),
      keydown: (event) => this.onKeyDown(event),
      focus: (event) => this.onFocus.emit(event),
      blur: (event) => this.onBlur.emit(event),
      paste: (event) => this.onPaste(event)
    };
  }
  onInput(event, index) {
    const value = event.target.value;
    if (index === 0 && value.length > 1) {
      this.handleOnPaste(value, event);
      event.stopPropagation();
      return;
    }
    this.tokens[index] = value;
    this.updateModel(event);
    if (event.inputType === "deleteContentBackward") {
      this.moveToPrev(event);
    } else if (event.inputType === "insertText" || event.inputType === "deleteContentForward") {
      this.moveToNext(event);
    }
  }
  updateModel(event) {
    const newValue = this.tokens.join("");
    this.writeModelValue(newValue);
    this.onModelChange(newValue);
    this.onChange.emit({
      originalEvent: event,
      value: newValue
    });
  }
  updateTokens() {
    if (this.value !== null && this.value !== void 0) {
      if (Array.isArray(this.value)) {
        this.tokens = [...this.value];
      } else {
        this.tokens = this.value.toString().split("");
      }
    } else {
      this.tokens = [];
    }
  }
  getModelValue(i) {
    return this.tokens[i - 1] || "";
  }
  getAutofocus(i) {
    if (i === 1) {
      return this.autofocus || false;
    }
    return false;
  }
  moveToPrev(event) {
    let prevInput = this.findPrevInput(event.target);
    if (prevInput) {
      prevInput.focus();
      prevInput.select();
    }
  }
  moveToNext(event) {
    let nextInput = this.findNextInput(event.target);
    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  }
  findNextInput(element) {
    let nextElement = element.nextElementSibling;
    if (!nextElement) return;
    return nextElement.nodeName === "INPUT" ? nextElement : this.findNextInput(nextElement);
  }
  findPrevInput(element) {
    let prevElement = element.previousElementSibling;
    if (!prevElement) return;
    return prevElement.nodeName === "INPUT" ? prevElement : this.findPrevInput(prevElement);
  }
  onInputFocus(event) {
    event.target.select();
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.onBlur.emit(event);
  }
  onKeyDown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    switch (event.key) {
      case "ArrowLeft":
        this.moveToPrev(event);
        event.preventDefault();
        break;
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        break;
      case "Backspace":
        if (event.target.value.length === 0) {
          this.moveToPrev(event);
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        this.moveToNext(event);
        event.preventDefault();
        break;
      default:
        const target = event.target;
        const hasSelection = target.selectionStart !== target.selectionEnd;
        const isAtMaxLength = this.tokens.join("").length >= this.length;
        const isValidKey = this.integerOnly ? /^[0-9]$/.test(event.key) : true;
        if (!isValidKey || isAtMaxLength && event.key !== "Delete" && !hasSelection) {
          event.preventDefault();
        }
        break;
    }
  }
  onPaste(event) {
    if (!this.$disabled() && !this.readonly) {
      let paste = event.clipboardData.getData("text");
      if (paste.length) {
        this.handleOnPaste(paste, event);
      }
      event.preventDefault();
    }
  }
  handleOnPaste(paste, event) {
    let pastedCode = paste.substring(0, this.length + 1);
    if (!this.integerOnly || !isNaN(pastedCode)) {
      this.tokens = pastedCode.split("");
      this.updateModel(event);
    }
  }
  getRange(n) {
    return Array.from({
      length: n
    }, (_, index) => index + 1);
  }
  trackByFn(index) {
    return index;
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    if (value) {
      if (Array.isArray(value) && value.length > 0) {
        this.value = value.slice(0, this.length);
      } else {
        this.value = value.toString().split("").slice(0, this.length);
      }
    } else {
      this.value = value;
    }
    setModelValue(this.value);
    this.updateTokens();
    this.cd.markForCheck();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputOtp_BaseFactory;
    return function InputOtp_Factory(__ngFactoryType__) {
      return (\u0275InputOtp_BaseFactory || (\u0275InputOtp_BaseFactory = \u0275\u0275getInheritedFactory(_InputOtp)))(__ngFactoryType__ || _InputOtp);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _InputOtp,
    selectors: [["p-inputOtp"], ["p-inputotp"], ["p-input-otp"]],
    contentQueries: function InputOtp_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c05, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 2,
    hostBindings: function InputOtp_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      readonly: [2, "readonly", "readonly", booleanAttribute],
      tabindex: "tabindex",
      length: "length",
      styleClass: "styleClass",
      mask: "mask",
      integerOnly: "integerOnly",
      autofocus: [2, "autofocus", "autofocus", booleanAttribute],
      variant: [1, "variant"],
      size: [1, "size"]
    },
    outputs: {
      onChange: "onChange",
      onFocus: "onFocus",
      onBlur: "onBlur"
    },
    features: [\u0275\u0275ProvidersFeature([INPUT_OTP_VALUE_ACCESSOR, InputOtpStyle, {
      provide: INPUTOTP_INSTANCE,
      useExisting: _InputOtp
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _InputOtp
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    decls: 1,
    vars: 2,
    consts: [[4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf"], ["type", "text", "pInputText", "", 3, "input", "focus", "blur", "paste", "keydown", "value", "pSize", "variant", "invalid", "pAutoFocus", "pt", "unstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function InputOtp_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InputOtp_ng_container_0_Template, 3, 2, "ng-container", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngForOf", ctx.getRange(ctx.length))("ngForTrackBy", ctx.trackByFn);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, InputText, AutoFocus, SharedModule, BindModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputOtp, [{
    type: Component,
    args: [{
      selector: "p-inputOtp, p-inputotp, p-input-otp",
      standalone: true,
      imports: [CommonModule, InputText, AutoFocus, SharedModule, BindModule],
      template: `
        <ng-container *ngFor="let i of getRange(length); trackBy: trackByFn">
            <ng-container *ngIf="!inputTemplate && !_inputTemplate">
                <input
                    type="text"
                    pInputText
                    [value]="getModelValue(i)"
                    [attr.maxlength]="i === 1 ? length : 1"
                    [attr.type]="inputType"
                    [class]="cn(cx('pcInputText'), styleClass)"
                    [pSize]="size()"
                    [variant]="$variant()"
                    [invalid]="invalid()"
                    [attr.inputmode]="inputMode"
                    [attr.name]="name()"
                    [attr.tabindex]="tabindex"
                    [attr.required]="required() ? '' : undefined"
                    [attr.readonly]="readonly ? '' : undefined"
                    [attr.disabled]="$disabled() ? '' : undefined"
                    (input)="onInput($event, i - 1)"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (paste)="onPaste($event)"
                    (keydown)="onKeyDown($event)"
                    [pAutoFocus]="getAutofocus(i)"
                    [pt]="ptm('pcInputText')"
                    [unstyled]="unstyled()"
                />
            </ng-container>
            <ng-container *ngIf="inputTemplate || _inputTemplate">
                <ng-container *ngTemplateOutlet="inputTemplate || _inputTemplate; context: { $implicit: getToken(i - 1), events: getTemplateEvents(i - 1), index: i }"> </ng-container>
            </ng-container>
        </ng-container>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [INPUT_OTP_VALUE_ACCESSOR, InputOtpStyle, {
        provide: INPUTOTP_INSTANCE,
        useExisting: InputOtp
      }, {
        provide: PARENT_INSTANCE,
        useExisting: InputOtp
      }],
      hostDirectives: [Bind],
      host: {
        "[class]": "cx('root')"
      }
    }]
  }], null, {
    readonly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabindex: [{
      type: Input
    }],
    length: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    mask: [{
      type: Input
    }],
    integerOnly: [{
      type: Input
    }],
    autofocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    variant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "variant",
        required: false
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    onChange: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    inputTemplate: [{
      type: ContentChild,
      args: ["input", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var InputOtpModule = class _InputOtpModule {
  static \u0275fac = function InputOtpModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputOtpModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _InputOtpModule,
    imports: [InputOtp, SharedModule],
    exports: [InputOtp, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [InputOtp, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputOtpModule, [{
    type: NgModule,
    args: [{
      imports: [InputOtp, SharedModule],
      exports: [InputOtp, SharedModule]
    }]
  }], null, null);
})();

// src/app/auth/verify-code/verify-code.ts
function VerifyCode_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-message", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r0.errorMessage());
  }
}
function VerifyCode_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-message", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r0.notice());
  }
}
function VerifyCode_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Renvoyer le code dans ", ctx_r0.secondsBeforeResend(), " s");
  }
}
function VerifyCode_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function VerifyCode_Conditional_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.resend());
    });
    \u0275\u0275text(1, "Renvoyer le code");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.resending() || ctx_r0.loading());
  }
}
var VerifyCode = class _VerifyCode {
  verification = inject(VerificationService);
  store = inject(ChallengeStore);
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  now = signal(Date.now(), ...ngDevMode ? [{ debugName: "now" }] : []);
  challenge = this.store.challenge;
  code = new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)] });
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  resending = signal(false, ...ngDevMode ? [{ debugName: "resending" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  notice = signal(null, ...ngDevMode ? [{ debugName: "notice" }] : []);
  secondsBeforeResend = computed(() => Math.max(0, Math.ceil((this.store.resendAt() - this.now()) / 1e3)), ...ngDevMode ? [{ debugName: "secondsBeforeResend" }] : []);
  expiresInMinutes = computed(() => Math.max(1, Math.round((this.challenge()?.expires_in ?? 0) / 60)), ...ngDevMode ? [{ debugName: "expiresInMinutes" }] : []);
  isSms = computed(() => this.challenge()?.channel === "sms", ...ngDevMode ? [{ debugName: "isSms" }] : []);
  title = computed(() => this.isSms() ? "V\xE9rifiez votre t\xE9l\xE9phone" : "V\xE9rifiez votre email", ...ngDevMode ? [{ debugName: "title" }] : []);
  /** Email, ou numéro masqué (+261•••••67) pour un SMS. */
  destination = computed(() => {
    const challenge = this.challenge();
    return challenge ? challenge.destination || challenge.email || "" : "";
  }, ...ngDevMode ? [{ debugName: "destination" }] : []);
  constructor() {
    if (!this.store.challenge()) {
      this.router.navigateByUrl(this.auth.isAuthenticated() ? this.auth.homeUrl() : "/auth/login");
    }
    interval(1e3).pipe(takeUntilDestroyed()).subscribe(() => this.now.set(Date.now()));
    this.code.valueChanges.pipe(filter(() => this.code.valid), takeUntilDestroyed()).subscribe(() => this.submit());
  }
  submit() {
    if (this.code.invalid || this.loading() || this.resending())
      return;
    this.loading.set(true);
    this.code.disable({ emitEvent: false });
    this.errorMessage.set(null);
    this.notice.set(null);
    this.verification.verify(this.code.value).pipe(finalize(() => {
      this.loading.set(false);
      this.code.enable({ emitEvent: false });
    }), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.router.navigateByUrl(this.target()),
      error: (error) => {
        this.code.reset("");
        this.errorMessage.set(authErrorMessage(error));
      }
    });
  }
  resend() {
    if (this.secondsBeforeResend() > 0 || this.resending() || this.loading())
      return;
    this.resending.set(true);
    this.code.disable({ emitEvent: false });
    this.errorMessage.set(null);
    this.notice.set(null);
    this.verification.resend().pipe(finalize(() => {
      this.resending.set(false);
      this.code.enable({ emitEvent: false });
    }), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.code.reset("");
        this.notice.set("Un nouveau code vient d\u2019\xEAtre envoy\xE9.");
      },
      error: (error) => this.errorMessage.set(authErrorMessage(error))
    });
  }
  target() {
    return safeReturnUrl(this.route.snapshot.queryParamMap.get("returnUrl")) ?? this.auth.homeUrl();
  }
  static \u0275fac = function VerifyCode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VerifyCode)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerifyCode, selectors: [["app-verify-code"]], decls: 26, vars: 13, consts: [[1, "auth-display-settings", 3, "float"], [1, "grid", "min-h-dvh", "place-items-center", "bg-white", "px-5", "py-8", "font-sans", "text-emerald-950", "dark:bg-emerald-950", "dark:text-emerald-50"], ["aria-labelledby", "verify-title", 1, "w-full", "max-w-[27.5rem]"], ["routerLink", "/", "aria-label", "Terra Nova, accueil", 1, "mb-8", "inline-flex", "w-fit", "items-center", "gap-3", "text-[1.4rem]", "font-bold", "tracking-[-.04em]"], ["aria-hidden", "true", 1, "grid", "size-8", "place-items-center", "rounded-[.62rem]", "bg-emerald-500", "text-sm", "font-black", "leading-none", "text-white", "-skew-y-6"], [1, "mb-6"], ["id", "verify-title", 1, "mb-2", "text-[2rem]", "font-bold", "leading-tight", "tracking-[-.045em]"], [1, "m-0", "leading-6", "text-emerald-950/60", "dark:text-emerald-50/65"], [1, "break-words"], ["severity", "error", "icon", "pi pi-exclamation-circle", "styleClass", "mb-4 block", "role", "alert", 3, "text"], ["severity", "success", "icon", "pi pi-check-circle", "styleClass", "mb-4 block", "role", "status", 3, "text"], ["novalidate", "", 1, "space-y-4", 3, "ngSubmit"], ["size", "large", 2, "flex-wrap", "wrap", 3, "formControl", "length", "integerOnly", "autofocus"], ["type", "submit", "label", "Valider", "icon", "pi pi-arrow-right", "iconPos", "right", "styleClass", "w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold hover:bg-emerald-700", 3, "loading", "disabled"], [1, "mt-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "text-sm", "text-emerald-950/60", "dark:text-emerald-50/65"], ["aria-live", "polite"], ["type", "button", 1, "font-bold", "text-emerald-600", "hover:underline", "disabled:opacity-60", 3, "disabled"], ["routerLink", "/auth/login", 1, "font-bold", "text-emerald-600", "hover:underline"], ["type", "button", 1, "font-bold", "text-emerald-600", "hover:underline", "disabled:opacity-60", 3, "click", "disabled"]], template: function VerifyCode_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-floating-configurator", 0);
      \u0275\u0275elementStart(1, "main", 1)(2, "section", 2)(3, "a", 3)(4, "span", 4);
      \u0275\u0275text(5, "TN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "Terra Nova");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "header", 5)(9, "h1", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p", 7);
      \u0275\u0275text(12, " Nous avons envoy\xE9 un code \xE0 6 chiffres \xE0 ");
      \u0275\u0275elementStart(13, "strong", 8);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, VerifyCode_Conditional_16_Template, 1, 1, "p-message", 9);
      \u0275\u0275conditionalCreate(17, VerifyCode_Conditional_17_Template, 1, 1, "p-message", 10);
      \u0275\u0275elementStart(18, "form", 11);
      \u0275\u0275listener("ngSubmit", function VerifyCode_Template_form_ngSubmit_18_listener() {
        return ctx.submit();
      });
      \u0275\u0275element(19, "p-inputotp", 12)(20, "p-button", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 14);
      \u0275\u0275conditionalCreate(22, VerifyCode_Conditional_22_Template, 2, 1, "span", 15)(23, VerifyCode_Conditional_23_Template, 2, 1, "button", 16);
      \u0275\u0275elementStart(24, "a", 17);
      \u0275\u0275text(25, "Retour \xE0 la connexion");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275property("float", false);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(((tmp_1_0 = ctx.challenge()) == null ? null : tmp_1_0.channel) === "sms" ? "V\xE9rifiez votre t\xE9l\xE9phone" : "V\xE9rifiez votre email");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(((tmp_2_0 = ctx.challenge()) == null ? null : tmp_2_0.destination) ?? ((tmp_2_0 = ctx.challenge()) == null ? null : tmp_2_0.email));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(". Il expire dans ", ctx.expiresInMinutes(), " minutes. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.notice() ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("formControl", ctx.code)("length", 6)("integerOnly", true)("autofocus", true);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.loading())("disabled", ctx.code.invalid || ctx.loading() || ctx.resending());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.secondsBeforeResend() > 0 ? 22 : 23);
    }
  }, dependencies: [ButtonModule, Button, InputOtpModule, InputOtp, MessageModule, Message, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, FormControlDirective, RouterModule, RouterLink, AppFloatingConfigurator], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerifyCode, [{
    type: Component,
    args: [{ selector: "app-verify-code", imports: [ButtonModule, InputOtpModule, MessageModule, ReactiveFormsModule, RouterModule, AppFloatingConfigurator], template: `<app-floating-configurator [float]="false" class="auth-display-settings" />
<main class="grid min-h-dvh place-items-center bg-white px-5 py-8 font-sans text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50">
    <section class="w-full max-w-[27.5rem]" aria-labelledby="verify-title">
        <a class="mb-8 inline-flex w-fit items-center gap-3 text-[1.4rem] font-bold tracking-[-.04em]" routerLink="/" aria-label="Terra Nova, accueil"
            ><span class="grid size-8 place-items-center rounded-[.62rem] bg-emerald-500 text-sm font-black leading-none text-white -skew-y-6" aria-hidden="true">TN</span><span>Terra Nova</span></a
        >
        <header class="mb-6">
            <h1 id="verify-title" class="mb-2 text-[2rem] font-bold leading-tight tracking-[-.045em]">{{ challenge()?.channel === 'sms' ? 'V\xE9rifiez votre t\xE9l\xE9phone' : 'V\xE9rifiez votre email' }}</h1>
            <p class="m-0 leading-6 text-emerald-950/60 dark:text-emerald-50/65">
                Nous avons envoy\xE9 un code \xE0 6 chiffres \xE0 <strong class="break-words">{{ challenge()?.destination ?? challenge()?.email }}</strong
                >. Il expire dans {{ expiresInMinutes() }} minutes.
            </p>
        </header>

        @if (errorMessage()) {
            <p-message severity="error" [text]="errorMessage()!" icon="pi pi-exclamation-circle" styleClass="mb-4 block" role="alert" />
        }
        @if (notice()) {
            <p-message severity="success" [text]="notice()!" icon="pi pi-check-circle" styleClass="mb-4 block" role="status" />
        }

        <form (ngSubmit)="submit()" novalidate class="space-y-4">
            <p-inputotp style="flex-wrap: wrap" [formControl]="code" [length]="6" [integerOnly]="true" size="large" [autofocus]="true" />
            <p-button
                type="submit"
                label="Valider"
                icon="pi pi-arrow-right"
                iconPos="right"
                styleClass="w-full rounded-xl border-0 bg-emerald-600 py-3 font-bold hover:bg-emerald-700"
                [loading]="loading()"
                [disabled]="code.invalid || loading() || resending()"
            />
        </form>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-emerald-950/60 dark:text-emerald-50/65">
            @if (secondsBeforeResend() > 0) {
                <span aria-live="polite">Renvoyer le code dans {{ secondsBeforeResend() }} s</span>
            } @else {
                <button type="button" class="font-bold text-emerald-600 hover:underline disabled:opacity-60" [disabled]="resending() || loading()" (click)="resend()">Renvoyer le code</button>
            }
            <a routerLink="/auth/login" class="font-bold text-emerald-600 hover:underline">Retour \xE0 la connexion</a>
        </div>
    </section>
</main>
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerifyCode, { className: "VerifyCode", filePath: "src/app/auth/verify-code/verify-code.ts", lineNumber: 22 });
})();

// src/app/auth/auth.routes.ts
var auth_routes_default = [
  { path: "access", component: Access },
  { path: "error", component: Error2 },
  { path: "login", component: Login, canActivate: [guestGuard] },
  { path: "register", component: Register, canActivate: [guestGuard] },
  // Le challenge est déjà protégé en mémoire par VerifyCode. Éviter guestGuard ici
  // empêche une tentative de refresh de session d'interrompre la redirection après /login.
  { path: "verify-code", component: VerifyCode }
];
export {
  auth_routes_default as default
};
//# sourceMappingURL=chunk-AFHTYASX.js.map
