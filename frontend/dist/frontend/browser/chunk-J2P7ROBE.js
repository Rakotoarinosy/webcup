import {
  CONCERN_STATUSES,
  DataConcernService,
  concernStatusSeverity,
  concernSteps
} from "./chunk-4ASZPPQ3.js";
import "./chunk-2ZKMMRNY.js";
import {
  Select,
  SelectModule
} from "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import "./chunk-OUQ4VYAJ.js";
import {
  Toast,
  ToastModule
} from "./chunk-BBCFJD72.js";
import "./chunk-VCWXY23E.js";
import "./chunk-5UENDHV5.js";
import {
  Tag,
  TagModule
} from "./chunk-EMZ2UMTV.js";
import {
  Dialog,
  DialogModule
} from "./chunk-ZWCF3HLH.js";
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
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
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-BX45OWY6.js";
import {
  MessageService
} from "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  finalize,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// src/app/data-privacy/data-concerns-admin.ts
var _c0 = () => ({ width: "40rem" });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function DataConcernsAdmin_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const concern_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 ", concern_r3.user_email, " ");
  }
}
function DataConcernsAdmin_For_15_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "time");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("datetime", step_r4.date);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 2, step_r4.date, "dd/MM/y HH:mm"));
  }
}
function DataConcernsAdmin_For_15_For_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "\xE0 venir");
    \u0275\u0275elementEnd();
  }
}
function DataConcernsAdmin_For_15_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, DataConcernsAdmin_For_15_For_12_Conditional_3_Template, 3, 5, "time")(4, DataConcernsAdmin_For_15_For_12_Conditional_4_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", step_r4.label, " :");
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r4.date ? 3 : 4);
  }
}
function DataConcernsAdmin_For_15_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "p", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const concern_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("R\xE9ponse de ", concern_r3.answered_by);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(concern_r3.response);
  }
}
function DataConcernsAdmin_For_15_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 36);
    \u0275\u0275listener("onClick", function DataConcernsAdmin_For_15_Conditional_14_Conditional_1_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r6);
      const concern_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.review(concern_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const concern_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("outlined", true)("loading", ctx_r1.busy() === concern_r3.id)("ariaLabel", "Prendre en charge " + concern_r3.reference);
  }
}
function DataConcernsAdmin_For_15_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275conditionalCreate(1, DataConcernsAdmin_For_15_Conditional_14_Conditional_1_Template, 1, 3, "p-button", 34);
    \u0275\u0275elementStart(2, "p-button", 35);
    \u0275\u0275listener("onClick", function DataConcernsAdmin_For_15_Conditional_14_Template_p_button_onClick_2_listener() {
      \u0275\u0275restoreView(_r5);
      const concern_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAnswer(concern_r3));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const concern_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(concern_r3.status === "Re\xE7u" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.busy() !== null)("ariaLabel", "R\xE9pondre \xE0 " + concern_r3.reference);
  }
}
function DataConcernsAdmin_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 11)(1, "div", 22)(2, "h2", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "p-tag", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 25);
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, DataConcernsAdmin_For_15_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 26);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ol", 27);
    \u0275\u0275repeaterCreate(11, DataConcernsAdmin_For_15_For_12_Template, 5, 2, "li", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, DataConcernsAdmin_For_15_Conditional_13_Template, 5, 2, "div", 28)(14, DataConcernsAdmin_For_15_Conditional_14_Template, 3, 3, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const concern_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-labelledby", "admin-concern-" + concern_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "admin-concern-" + concern_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", concern_r3.reference, " \xB7 ", concern_r3.topic);
    \u0275\u0275advance();
    \u0275\u0275property("value", concern_r3.status)("severity", ctx_r1.severity(concern_r3.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", concern_r3.user_name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(concern_r3.user_email ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(concern_r3.message);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Suivi du signalement " + concern_r3.reference);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.steps(concern_r3));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(concern_r3.response ? 13 : 14);
  }
}
function DataConcernsAdmin_ForEmpty_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1, "Aucun signalement pour ce statut.");
    \u0275\u0275elementEnd();
  }
}
function DataConcernsAdmin_ForEmpty_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DataConcernsAdmin_ForEmpty_16_Conditional_0_Template, 2, 0, "p", 37);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.loading() ? 0 : -1);
  }
}
function DataConcernsAdmin_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.answering.message);
  }
}
function DataConcernsAdmin_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " R\xE9digez une r\xE9ponse d\u2019au moins 10 caract\xE8res. ");
  }
}
var DataConcernsAdmin = class _DataConcernsAdmin {
  api = inject(DataConcernService);
  messages = inject(MessageService);
  statusOptions = [{ label: "Tous les statuts", value: null }, ...CONCERN_STATUSES.map((status) => ({ label: status, value: status }))];
  steps = concernSteps;
  severity = concernStatusSeverity;
  concerns = signal([], ...ngDevMode ? [{ debugName: "concerns" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  busy = signal(null, ...ngDevMode ? [{ debugName: "busy" }] : []);
  status = null;
  answering = null;
  answerVisible = false;
  response = "";
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.api.list(this.status).pipe(finalize(() => this.loading.set(false))).subscribe({ next: (items) => this.concerns.set(items), error: (error) => this.showError(error) });
  }
  review(concern) {
    this.busy.set(concern.id);
    this.api.review(concern.id).pipe(finalize(() => this.busy.set(null))).subscribe({
      next: (updated) => {
        this.replace(updated);
        this.messages.add({ severity: "success", summary: "Pris en charge", detail: `${updated.reference} est en cours d\u2019examen.`, life: 3e3 });
      },
      error: (error) => this.showError(error)
    });
  }
  openAnswer(concern) {
    this.answering = concern;
    this.response = "";
    this.answerVisible = true;
  }
  sendAnswer(form) {
    const concern = this.answering;
    if (form.invalid || !concern || this.busy()) {
      form.control.markAllAsTouched();
      return;
    }
    this.busy.set(concern.id);
    this.api.answer(concern.id, this.response.trim()).pipe(finalize(() => this.busy.set(null))).subscribe({
      next: (updated) => {
        this.replace(updated);
        this.answerVisible = false;
        this.messages.add({ severity: "success", summary: "R\xE9ponse envoy\xE9e", detail: `L\u2019habitant voit la r\xE9ponse \xE0 ${updated.reference}.`, life: 3e3 });
      },
      error: (error) => this.showError(error)
    });
  }
  replace(updated) {
    this.concerns.update((items) => items.map((item) => item.id === updated.id ? updated : item));
  }
  showError(error) {
    this.messages.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function DataConcernsAdmin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataConcernsAdmin)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DataConcernsAdmin, selectors: [["app-data-concerns-admin"]], features: [\u0275\u0275ProvidersFeature([MessageService])], decls: 32, vars: 17, consts: [["answerForm", "ngForm"], ["responseModel", "ngModel"], [1, "card"], [1, "flex", "flex-wrap", "items-end", "justify-between", "gap-4"], [1, "m-0", "text-2xl", "font-semibold"], [1, "mb-0", "mt-2", "text-muted-color"], [1, "flex", "items-end", "gap-2"], [1, "grid", "gap-1"], ["for", "concern-status-filter", 1, "text-sm", "font-semibold"], ["inputId", "concern-status-filter", "optionLabel", "label", "optionValue", "value", 3, "ngModelChange", "onChange", "options", "ngModel"], ["icon", "pi pi-refresh", "severity", "secondary", "ariaLabel", "Actualiser les signalements", 3, "onClick", "text", "loading"], [1, "mt-4", "rounded-lg", "border", "border-surface", "p-4"], [3, "visibleChange", "visible", "modal", "header"], ["novalidate", "", 1, "grid", "gap-3", 3, "ngSubmit"], [1, "m-0", "whitespace-pre-line", "text-muted-color"], ["for", "concern-response", 1, "font-semibold"], ["id", "concern-response", "name", "response", "required", "", "minlength", "10", "maxlength", "5000", "rows", "6", "aria-describedby", "concern-response-help concern-response-error", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["id", "concern-response-help", 1, "text-muted-color"], ["id", "concern-response-error", 1, "text-red-700", "dark:text-red-300"], [1, "flex", "justify-end", "gap-2"], ["label", "Annuler", "severity", "secondary", 3, "onClick", "text"], ["type", "submit", "label", "Envoyer la r\xE9ponse", "icon", "pi pi-send", 3, "loading"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "m-0", "text-lg", "font-semibold", 3, "id"], [3, "value", "severity"], [1, "mb-0", "mt-1", "text-sm", "text-muted-color"], [1, "whitespace-pre-line"], [1, "m-0", "flex", "list-none", "flex-wrap", "gap-4", "p-0", "text-sm"], [1, "mt-3", "rounded-lg", "bg-emphasis", "p-3"], [1, "mt-3", "flex", "flex-wrap", "gap-2"], [1, "font-semibold"], [1, "text-muted-color"], [1, "m-0", "font-semibold"], [1, "mb-0", "mt-1", "whitespace-pre-line"], ["label", "Prendre en charge", "icon", "pi pi-eye", "severity", "secondary", 3, "outlined", "loading", "ariaLabel"], ["label", "R\xE9pondre", "icon", "pi pi-reply", 3, "onClick", "disabled", "ariaLabel"], ["label", "Prendre en charge", "icon", "pi pi-eye", "severity", "secondary", 3, "onClick", "outlined", "loading", "ariaLabel"], [1, "mb-0", "mt-4", "text-muted-color"]], template: function DataConcernsAdmin_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast");
      \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "div")(4, "h1", 4);
      \u0275\u0275text(5, "Signalements sur les donn\xE9es");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7, "Questions et inqui\xE9tudes des habitants sur l\u2019usage de leurs donn\xE9es. Chaque \xE9tape est dat\xE9e et visible par l\u2019habitant.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "label", 8);
      \u0275\u0275text(11, "Statut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p-select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function DataConcernsAdmin_Template_p_select_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.status, $event) || (ctx.status = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("onChange", function DataConcernsAdmin_Template_p_select_onChange_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.load());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "p-button", 10);
      \u0275\u0275listener("onClick", function DataConcernsAdmin_Template_p_button_onClick_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.load());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275repeaterCreate(14, DataConcernsAdmin_For_15_Template, 15, 11, "article", 11, _forTrack0, false, DataConcernsAdmin_ForEmpty_16_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p-dialog", 12);
      \u0275\u0275twoWayListener("visibleChange", function DataConcernsAdmin_Template_p_dialog_visibleChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.answerVisible, $event) || (ctx.answerVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(18, "form", 13, 0);
      \u0275\u0275listener("ngSubmit", function DataConcernsAdmin_Template_form_ngSubmit_18_listener() {
        \u0275\u0275restoreView(_r1);
        const answerForm_r7 = \u0275\u0275reference(19);
        return \u0275\u0275resetView(ctx.sendAnswer(answerForm_r7));
      });
      \u0275\u0275conditionalCreate(20, DataConcernsAdmin_Conditional_20_Template, 2, 1, "p", 14);
      \u0275\u0275elementStart(21, "label", 15);
      \u0275\u0275text(22, "R\xE9ponse \xE0 l\u2019habitant *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "textarea", 16, 1);
      \u0275\u0275twoWayListener("ngModelChange", function DataConcernsAdmin_Template_textarea_ngModelChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.response, $event) || (ctx.response = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "small", 17);
      \u0275\u0275text(26, "La r\xE9ponse est d\xE9finitive : l\u2019habitant la lit telle quelle dans \xAB Mes donn\xE9es \xBB.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "small", 18);
      \u0275\u0275conditionalCreate(28, DataConcernsAdmin_Conditional_28_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 19)(30, "p-button", 20);
      \u0275\u0275listener("onClick", function DataConcernsAdmin_Template_p_button_onClick_30_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.answerVisible = false);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "p-button", 21);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const responseModel_r8 = \u0275\u0275reference(24);
      \u0275\u0275advance(12);
      \u0275\u0275property("options", ctx.statusOptions);
      \u0275\u0275twoWayProperty("ngModel", ctx.status);
      \u0275\u0275advance();
      \u0275\u0275property("text", true)("loading", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.concerns());
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(16, _c0));
      \u0275\u0275twoWayProperty("visible", ctx.answerVisible);
      \u0275\u0275property("modal", true)("header", "R\xE9pondre \xE0 " + ((ctx.answering == null ? null : ctx.answering.reference) ?? ""));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.answering ? 20 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.response);
      \u0275\u0275attribute("aria-invalid", responseModel_r8.invalid && responseModel_r8.touched);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(responseModel_r8.invalid && responseModel_r8.touched ? 28 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("text", true);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.busy() !== null);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm, ButtonModule, Button, DialogModule, Dialog, SelectModule, Select, TagModule, Tag, ToastModule, Toast, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataConcernsAdmin, [{
    type: Component,
    args: [{ selector: "app-data-concerns-admin", imports: [DatePipe, FormsModule, ButtonModule, DialogModule, SelectModule, TagModule, ToastModule], providers: [MessageService], template: `<p-toast />

<div class="card">
    <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
            <h1 class="m-0 text-2xl font-semibold">Signalements sur les donn\xE9es</h1>
            <p class="mb-0 mt-2 text-muted-color">Questions et inqui\xE9tudes des habitants sur l\u2019usage de leurs donn\xE9es. Chaque \xE9tape est dat\xE9e et visible par l\u2019habitant.</p>
        </div>
        <div class="flex items-end gap-2">
            <div class="grid gap-1">
                <label for="concern-status-filter" class="text-sm font-semibold">Statut</label>
                <p-select inputId="concern-status-filter" [options]="statusOptions" optionLabel="label" optionValue="value" [(ngModel)]="status" (onChange)="load()" />
            </div>
            <p-button icon="pi pi-refresh" severity="secondary" [text]="true" [loading]="loading()" ariaLabel="Actualiser les signalements" (onClick)="load()" />
        </div>
    </div>

    @for (concern of concerns(); track concern.id) {
        <article class="mt-4 rounded-lg border border-surface p-4" [attr.aria-labelledby]="'admin-concern-' + concern.id">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h2 [id]="'admin-concern-' + concern.id" class="m-0 text-lg font-semibold">{{ concern.reference }} \xB7 {{ concern.topic }}</h2>
                <p-tag [value]="concern.status" [severity]="severity(concern.status)" />
            </div>
            <p class="mb-0 mt-1 text-sm text-muted-color">{{ concern.user_name }} @if (concern.user_email) { \xB7 {{ concern.user_email }} }</p>
            <p class="whitespace-pre-line">{{ concern.message }}</p>
            <ol class="m-0 flex list-none flex-wrap gap-4 p-0 text-sm" [attr.aria-label]="'Suivi du signalement ' + concern.reference">
                @for (step of steps(concern); track step.label) {
                    <li>
                        <span class="font-semibold">{{ step.label }} :</span>
                        @if (step.date) {
                            <time [attr.datetime]="step.date">{{ step.date | date: 'dd/MM/y HH:mm' }}</time>
                        } @else {
                            <span class="text-muted-color">\xE0 venir</span>
                        }
                    </li>
                }
            </ol>
            @if (concern.response) {
                <div class="mt-3 rounded-lg bg-emphasis p-3">
                    <p class="m-0 font-semibold">R\xE9ponse de {{ concern.answered_by }}</p>
                    <p class="mb-0 mt-1 whitespace-pre-line">{{ concern.response }}</p>
                </div>
            } @else {
                <div class="mt-3 flex flex-wrap gap-2">
                    @if (concern.status === 'Re\xE7u') {
                        <p-button label="Prendre en charge" icon="pi pi-eye" severity="secondary" [outlined]="true" [loading]="busy() === concern.id" [ariaLabel]="'Prendre en charge ' + concern.reference" (onClick)="review(concern)" />
                    }
                    <p-button label="R\xE9pondre" icon="pi pi-reply" [disabled]="busy() !== null" [ariaLabel]="'R\xE9pondre \xE0 ' + concern.reference" (onClick)="openAnswer(concern)" />
                </div>
            }
        </article>
    } @empty {
        @if (!loading()) {
            <p class="mb-0 mt-4 text-muted-color">Aucun signalement pour ce statut.</p>
        }
    }
</div>

<p-dialog [(visible)]="answerVisible" [modal]="true" [style]="{ width: '40rem' }" [header]="'R\xE9pondre \xE0 ' + (answering?.reference ?? '')">
    <form #answerForm="ngForm" (ngSubmit)="sendAnswer(answerForm)" novalidate class="grid gap-3">
        @if (answering) {
            <p class="m-0 whitespace-pre-line text-muted-color">{{ answering.message }}</p>
        }
        <label for="concern-response" class="font-semibold">R\xE9ponse \xE0 l\u2019habitant *</label>
        <textarea
            id="concern-response"
            name="response"
            #responseModel="ngModel"
            [(ngModel)]="response"
            required
            minlength="10"
            maxlength="5000"
            rows="6"
            class="p-inputtext w-full"
            aria-describedby="concern-response-help concern-response-error"
            [attr.aria-invalid]="responseModel.invalid && responseModel.touched"
        ></textarea>
        <small id="concern-response-help" class="text-muted-color">La r\xE9ponse est d\xE9finitive : l\u2019habitant la lit telle quelle dans \xAB Mes donn\xE9es \xBB.</small>
        <small id="concern-response-error" class="text-red-700 dark:text-red-300">
            @if (responseModel.invalid && responseModel.touched) {
                R\xE9digez une r\xE9ponse d\u2019au moins 10 caract\xE8res.
            }
        </small>
        <div class="flex justify-end gap-2">
            <p-button label="Annuler" severity="secondary" [text]="true" (onClick)="answerVisible = false" />
            <p-button type="submit" label="Envoyer la r\xE9ponse" icon="pi pi-send" [loading]="busy() !== null" />
        </div>
    </form>
</p-dialog>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DataConcernsAdmin, { className: "DataConcernsAdmin", filePath: "src/app/data-privacy/data-concerns-admin.ts", lineNumber: 23 });
})();
export {
  DataConcernsAdmin
};
//# sourceMappingURL=chunk-J2P7ROBE.js.map
