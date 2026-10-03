import {
  AGENT_STATUSES,
  AGENT_STATUS_LABELS
} from "./chunk-YOZFVDPL.js";
import {
  AuthService
} from "./chunk-BFXRYUZT.js";
import {
  AgentService
} from "./chunk-5QXMNFWU.js";
import {
  takeUntilDestroyed
} from "./chunk-WC5DJJOI.js";
import "./chunk-OY2B3AGZ.js";
import "./chunk-O26HSNKS.js";
import {
  Toolbar,
  ToolbarModule
} from "./chunk-SJ6BWTWE.js";
import {
  InstitutService
} from "./chunk-GY5LYIJF.js";
import {
  ConfirmDialog,
  ConfirmDialogModule
} from "./chunk-4ZINNOFN.js";
import {
  Dialog,
  DialogModule
} from "./chunk-W24WFQPP.js";
import {
  SortIcon,
  SortableColumn,
  Table,
  TableModule
} from "./chunk-URL4G3DB.js";
import "./chunk-WBYO2P7A.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
import {
  IconField,
  IconFieldModule,
  InputIcon,
  InputIconModule,
  Select,
  SelectModule
} from "./chunk-IHOQCUVC.js";
import {
  InputText,
  InputTextModule
} from "./chunk-UR4GPL7H.js";
import {
  Toast,
  ToastModule
} from "./chunk-PXE4FUQO.js";
import "./chunk-YTN6XZFY.js";
import "./chunk-ZDG3GNHS.js";
import "./chunk-JL6DBWWC.js";
import {
  Tooltip,
  TooltipModule
} from "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  Button,
  ButtonDirective,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  DefaultValueAccessor,
  EmailValidator,
  FormsModule,
  MaxLengthValidator,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import {
  ConfirmationService,
  MessageService
} from "./chunk-UHTXY4UO.js";
import {
  requestStatusSeverity
} from "./chunk-ROYE6VN6.js";
import {
  UserService,
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  EMPTY,
  Subject,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  debounceTime,
  distinctUntilChanged,
  finalize,
  inject,
  of,
  setClassMetadata,
  signal,
  switchMap,
  tap,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E5MYAYBP.js";

// src/app/agents/agents.ts
var _c0 = () => ({ width: "28rem" });
var _c1 = () => [10, 20, 50];
var _c2 = () => ({ "min-width": "52rem" });
var _c3 = () => ({ width: "min(36rem, 95vw)" });
var _c4 = () => ({ width: "min(28rem, 95vw)" });
var _c5 = () => ({ width: "min(56rem, 95vw)" });
var _c6 = () => ({ "min-width": "44rem" });
function Agents_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h1", 31);
    \u0275\u0275text(2, "Gestion des agents");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.auth.hasRole("admin") ? "\xC9quipes de terrain de tous les instituts." : "Les agents de votre institut.");
  }
}
function Agents_ng_template_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 36);
    \u0275\u0275listener("onClick", function Agents_ng_template_6_Conditional_2_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openNew());
    });
    \u0275\u0275elementEnd();
  }
}
function Agents_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "p-button", 34);
    \u0275\u0275listener("onClick", function Agents_ng_template_6_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAgents());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, Agents_ng_template_6_Conditional_2_Template, 1, 0, "p-button", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("outlined", true)("loading", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.auth.hasRole("admin") ? 2 : -1);
  }
}
function Agents_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-select", 37);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_12_Template_p_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.institutFilter, $event) || (ctx_r1.institutFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function Agents_Conditional_12_Template_p_select_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAgents());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("options", ctx_r1.institutOptions());
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.institutFilter);
    \u0275\u0275property("showClear", true);
  }
}
function Agents_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 38);
    \u0275\u0275text(2, "Agent ");
    \u0275\u0275element(3, "p-sortIcon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "th", 40);
    \u0275\u0275text(5, "Institut ");
    \u0275\u0275element(6, "p-sortIcon", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 42);
    \u0275\u0275text(8, "Statut ");
    \u0275\u0275element(9, "p-sortIcon", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 44);
    \u0275\u0275text(11, "Interventions ");
    \u0275\u0275element(12, "p-sortIcon", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 46);
    \u0275\u0275text(14, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Agents_ng_template_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-select", 56);
    \u0275\u0275listener("ngModelChange", function Agents_ng_template_20_Conditional_9_Template_p_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeStatus(agent_r8, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agent_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("options", ctx_r1.statusOptions)("ngModel", agent_r8.status)("ariaLabel", "Disponibilit\xE9 de " + agent_r8.name);
  }
}
function Agents_ng_template_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 50);
  }
}
function Agents_ng_template_20_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 57);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_16_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r9);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openMove(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Agents_ng_template_20_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 58);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_17_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r10);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDeactivate(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Agents_ng_template_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 59);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_18_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r11);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleActivation(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Agents_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275conditionalCreate(9, Agents_ng_template_20_Conditional_9_Template, 1, 3, "p-select", 49)(10, Agents_ng_template_20_Conditional_10_Template, 1, 0, "p-tag", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 51)(15, "p-button", 52);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Template_p_button_onClick_15_listener() {
      const agent_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openInterventions(agent_r8));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, Agents_ng_template_20_Conditional_16_Template, 1, 2, "p-button", 53);
    \u0275\u0275conditionalCreate(17, Agents_ng_template_20_Conditional_17_Template, 1, 2, "p-button", 54)(18, Agents_ng_template_20_Conditional_18_Template, 1, 2, "p-button", 55);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const agent_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("opacity-60", !agent_r8.is_active);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(agent_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(agent_r8.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(agent_r8.institut_name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(agent_r8.is_active ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(agent_r8.interventions);
    \u0275\u0275advance(3);
    \u0275\u0275property("rounded", true)("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.auth.hasRole("admin") ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(agent_r8.is_active ? 17 : 18);
  }
}
function Agents_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60);
    \u0275\u0275text(2, "Aucun agent ne correspond aux crit\xE8res.");
    \u0275\u0275elementEnd()();
  }
}
function Agents_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 61);
    \u0275\u0275text(2, "Compte agent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-select", 62);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_31_Template_p_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.user_id, $event) || (ctx_r1.form.user_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.user_id);
    \u0275\u0275property("options", ctx_r1.accountOptions())("filter", true);
  }
}
function Agents_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 63);
    \u0275\u0275text(2, "Nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 64);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_32_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div")(5, "label", 65);
    \u0275\u0275text(6, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_32_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.email, $event) || (ctx_r1.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div")(9, "label", 67);
    \u0275\u0275text(10, "Mot de passe initial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_32_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.password, $event) || (ctx_r1.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 69);
    \u0275\u0275text(13, "10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.password);
  }
}
function Agents_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function Agents_ng_template_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 71);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const agentForm_r12 = \u0275\u0275reference(26);
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", !agentForm_r12.valid || ctx_r1.saving());
  }
}
function Agents_ng_template_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 72);
    \u0275\u0275listener("onClick", function Agents_ng_template_49_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.moveDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "p-button", 73);
    \u0275\u0275listener("onClick", function Agents_ng_template_49_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveMove());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.moveInstitutId || ctx_r1.moveInstitutId === (ctx_r1.movedAgent == null ? null : ctx_r1.movedAgent.institut_id));
  }
}
function Agents_ng_template_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Cr\xE9\xE9e le");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "R\xE9solue le");
    \u0275\u0275elementEnd()();
  }
}
function Agents_ng_template_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275element(9, "p-tag", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r17.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r17.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r17.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", request_r17.status)("severity", ctx_r1.requestStatusSeverity(request_r17.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 7, request_r17.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r17.resolved_at ? \u0275\u0275pipeBind2(15, 10, request_r17.resolved_at, "dd/MM/yyyy HH:mm") : "\u2014");
  }
}
function Agents_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 60);
    \u0275\u0275text(2, "Aucune intervention attribu\xE9e \xE0 cet agent.");
    \u0275\u0275elementEnd()();
  }
}
var EMPTY_FORM = { mode: "existing", user_id: null, name: "", email: "", password: "", institut_id: null, status: "available" };
var Agents = class _Agents {
  agentService = inject(AgentService);
  institutService = inject(InstitutService);
  userService = inject(UserService);
  auth = inject(AuthService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  destroyRef = inject(DestroyRef);
  agentQueries = new Subject();
  searchChanges = new Subject();
  agents = signal([], ...ngDevMode ? [{ debugName: "agents" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  interventions = signal([], ...ngDevMode ? [{ debugName: "interventions" }] : []);
  interventionsLoading = signal(false, ...ngDevMode ? [{ debugName: "interventionsLoading" }] : []);
  instituts = signal([], ...ngDevMode ? [{ debugName: "instituts" }] : []);
  institutOptions = computed(() => this.instituts().filter((i) => i.is_active).map((i) => ({ label: i.name, value: i.id })), ...ngDevMode ? [{ debugName: "institutOptions" }] : []);
  /** Comptes « agent » sans profil : seuls candidats à un nouveau profil (admin). */
  agentAccounts = signal([], ...ngDevMode ? [{ debugName: "agentAccounts" }] : []);
  accountOptions = computed(() => {
    const linked = new Set(this.agents().map((agent) => agent.user_id));
    return this.agentAccounts().filter((user) => !linked.has(user.id)).map((user) => ({ label: `${user.name} (${user.email})`, value: user.id }));
  }, ...ngDevMode ? [{ debugName: "accountOptions" }] : []);
  modeOptions = [
    { label: "Compte existant", value: "existing" },
    { label: "Nouveau compte", value: "new" }
  ];
  statusOptions = AGENT_STATUSES.map((status) => ({ label: AGENT_STATUS_LABELS[status], value: status }));
  activityOptions = [
    { label: "Agents actifs", value: "active" },
    { label: "Agents d\xE9sactiv\xE9s", value: "inactive" },
    { label: "Tous les agents", value: "all" }
  ];
  requestStatusSeverity = requestStatusSeverity;
  searchText = "";
  institutFilter = null;
  statusFilter = null;
  activityFilter = "active";
  formDialogVisible = false;
  interventionsDialogVisible = false;
  moveDialogVisible = false;
  selectedAgent = null;
  movedAgent = null;
  moveInstitutId = null;
  form = __spreadValues({}, EMPTY_FORM);
  constructor() {
    this.agentQueries.pipe(switchMap((query) => {
      this.loading.set(true);
      return this.agentService.list(query).pipe(tap((agents) => this.agents.set(agents)), catchError((error) => {
        this.showError(error);
        return EMPTY;
      }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe();
    this.searchChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAgents());
  }
  ngOnInit() {
    this.loadAgents();
    this.institutService.list().subscribe({ next: (instituts) => this.instituts.set(instituts), error: (error) => this.showError(error) });
    if (this.auth.hasRole("admin")) {
      this.loadAccounts();
    }
  }
  loadAgents() {
    this.agentQueries.next({
      search: this.searchText.trim() || void 0,
      institut_id: this.institutFilter ?? void 0,
      status: this.statusFilter ?? void 0,
      is_active: this.activityFilter === "all" ? void 0 : this.activityFilter === "active"
    });
  }
  onSearchChange(value) {
    this.searchText = value;
    this.searchChanges.next(value);
  }
  clearFilters() {
    this.searchText = "";
    this.institutFilter = null;
    this.statusFilter = null;
    this.activityFilter = "active";
    this.loadAgents();
  }
  openNew() {
    this.form = __spreadProps(__spreadValues({}, EMPTY_FORM), { mode: this.accountOptions().length ? "existing" : "new" });
    this.formDialogVisible = true;
  }
  openInterventions(agent) {
    this.selectedAgent = agent;
    this.interventions.set([]);
    this.interventionsDialogVisible = true;
    this.interventionsLoading.set(true);
    this.agentService.interventions(agent.id).pipe(finalize(() => this.interventionsLoading.set(false))).subscribe({
      next: (requests) => this.interventions.set(requests),
      error: (error) => this.showError(error)
    });
  }
  save(form) {
    if (form.invalid || this.saving()) {
      form.control.markAllAsTouched();
      return;
    }
    const values = this.form;
    const account = values.mode === "new" ? this.userService.createAccount({ name: values.name.trim(), email: values.email.trim(), password: values.password, role: "agent" }).pipe(switchMap((user) => of(user.id))) : of(values.user_id);
    this.saving.set(true);
    account.pipe(switchMap((userId) => this.agentService.create({ user_id: userId ?? "", institut_id: values.institut_id, status: values.status })), finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.formDialogVisible = false;
        this.showSuccess("Agent ajout\xE9");
        this.loadAgents();
        this.loadAccounts();
      },
      error: (error) => this.showError(error)
    });
  }
  changeStatus(agent, status) {
    if (agent.status === status)
      return;
    this.agentService.setStatus(agent.id, status).subscribe({
      next: () => {
        this.showSuccess(`${agent.name} : ${AGENT_STATUS_LABELS[status]}`);
        this.loadAgents();
      },
      error: (error) => this.showError(error)
    });
  }
  openMove(agent) {
    this.movedAgent = agent;
    this.moveInstitutId = agent.institut_id;
    this.moveDialogVisible = true;
  }
  saveMove() {
    const agent = this.movedAgent;
    if (!agent || !this.moveInstitutId || this.moveInstitutId === agent.institut_id)
      return;
    this.agentService.move(agent.id, this.moveInstitutId).subscribe({
      next: (moved) => {
        this.moveDialogVisible = false;
        this.showSuccess(`${moved.name} rattach\xE9 \xE0 ${moved.institut_name}`);
        this.loadAgents();
      },
      error: (error) => this.showError(error)
    });
  }
  confirmDeactivate(agent) {
    this.confirmationService.confirm({
      message: `D\xE9sactiver ${agent.name} ? Il ne pourra plus recevoir de demandes, mais ses interventions sont conserv\xE9es.`,
      header: "D\xE9sactiver l'agent",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "D\xE9sactiver",
      rejectLabel: "Annuler",
      acceptButtonProps: { severity: "danger" },
      rejectButtonProps: { severity: "secondary", outlined: true },
      accept: () => this.toggleActivation(agent)
    });
  }
  toggleActivation(agent) {
    const request = agent.is_active ? this.agentService.deactivate(agent.id) : this.agentService.activate(agent.id);
    request.subscribe({
      next: () => {
        this.showSuccess(agent.is_active ? "Agent d\xE9sactiv\xE9" : "Agent r\xE9activ\xE9");
        this.loadAgents();
      },
      error: (error) => this.showError(error)
    });
  }
  statusLabel(status) {
    return AGENT_STATUS_LABELS[status];
  }
  statusSeverity(status) {
    switch (status) {
      case "available":
        return "success";
      case "in_intervention":
        return "info";
      case "unavailable":
        return "warn";
      case "offline":
        return "secondary";
    }
  }
  loadAccounts() {
    if (!this.auth.hasRole("admin"))
      return;
    this.userService.listAccounts("agent").subscribe({ next: (users) => this.agentAccounts.set(users), error: (error) => this.showError(error) });
  }
  showSuccess(detail) {
    this.messageService.add({ severity: "success", summary: "Succ\xE8s", detail, life: 3e3 });
  }
  showError(error) {
    this.messageService.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function Agents_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Agents)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Agents, selectors: [["app-agents"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 59, vars: 53, consts: [["start", ""], ["end", ""], ["header", ""], ["body", ""], ["emptymessage", ""], ["agentForm", "ngForm"], ["footer", ""], [1, "card"], ["styleClass", "mb-5"], [1, "mb-5", "grid", "grid-cols-1", "gap-3", "md:grid-cols-2", "xl:grid-cols-4"], ["styleClass", "pi pi-search"], ["pInputText", "", "type", "search", "aria-label", "Rechercher un agent", "placeholder", "Nom ou email...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les instituts", "ariaLabel", "Filtrer par institut", 1, "w-full", 3, "options", "ngModel", "showClear"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les statuts", "ariaLabel", "Filtrer par statut", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["optionLabel", "label", "optionValue", "value", "ariaLabel", "Filtrer par activation", 1, "w-full", 3, "ngModelChange", "options", "ngModel"], [1, "mb-4", "flex", "justify-end"], ["label", "R\xE9initialiser les filtres", "icon", "pi pi-filter-slash", "severity", "secondary", 3, "onClick", "text"], ["dataKey", "id", "currentPageReportTemplate", "Affichage {first} \xE0 {last} sur {totalRecords} agents", 3, "value", "loading", "paginator", "rows", "rowsPerPageOptions", "tableStyle", "rowHover", "showCurrentPageReport"], ["header", "Ajouter un agent", 3, "visibleChange", "visible", "modal"], ["id", "agentForm", 1, "grid", "grid-cols-1", "gap-4", 3, "ngSubmit"], [1, "mb-2", "block", "font-semibold"], ["name", "mode", "optionLabel", "label", "optionValue", "value", "ariaLabel", "Type de compte", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], ["for", "agent-institut", 1, "mb-2", "block", "font-semibold"], ["inputId", "agent-institut", "name", "institut_id", "optionLabel", "label", "optionValue", "value", "placeholder", "Institut de rattachement", "required", "", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], ["for", "agent-status", 1, "mb-2", "block", "font-semibold"], ["inputId", "agent-status", "name", "status", "optionLabel", "label", "optionValue", "value", "required", "", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], [3, "visibleChange", "visible", "header", "modal"], ["for", "move-institut", 1, "mb-2", "block", "font-semibold"], ["inputId", "move-institut", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], [1, "mb-0", "text-sm", "text-muted-color"], [3, "value", "loading", "paginator", "rows", "tableStyle"], [1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "gap-2"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], ["label", "Ajouter un agent", "icon", "pi pi-plus"], ["label", "Ajouter un agent", "icon", "pi pi-plus", 3, "onClick"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les instituts", "ariaLabel", "Filtrer par institut", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["pSortableColumn", "name", 2, "min-width", "14rem"], ["field", "name"], ["pSortableColumn", "institut_name", 2, "min-width", "10rem"], ["field", "institut_name"], ["pSortableColumn", "status", 2, "min-width", "10rem"], ["field", "status"], ["pSortableColumn", "interventions", 2, "min-width", "9rem"], ["field", "interventions"], [2, "width", "10rem"], [1, "font-medium"], [1, "text-sm", "text-muted-color"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", 3, "options", "ngModel", "ariaLabel"], ["value", "D\xE9sactiv\xE9", "severity", "danger"], [1, "flex", "gap-1"], ["icon", "pi pi-list", "ariaLabel", "Voir ses interventions", "pTooltip", "Voir ses interventions", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-arrow-right-arrow-left", "ariaLabel", "Changer d'institut", "pTooltip", "Changer d'institut", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver l'agent", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer l'agent", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "rounded", "text"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ariaLabel"], ["icon", "pi pi-arrow-right-arrow-left", "ariaLabel", "Changer d'institut", "pTooltip", "Changer d'institut", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver l'agent", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer l'agent", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["colspan", "5", 1, "py-8", "text-center", "text-muted-color"], ["for", "agent-account", 1, "mb-2", "block", "font-semibold"], ["inputId", "agent-account", "name", "user_id", "optionLabel", "label", "optionValue", "value", "placeholder", "Compte \xAB agent \xBB sans profil", "emptyMessage", "Tous les comptes agents ont d\xE9j\xE0 un profil", "required", "", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "filter"], ["for", "agent-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-name", "name", "name", "required", "", "maxlength", "255", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "agent-email", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-email", "name", "email", "type", "email", "required", "", "email", "", "maxlength", "320", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "agent-password", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-password", "name", "password", "type", "password", "required", "", "minlength", "10", "autocomplete", "new-password", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "mt-1", "block", "text-muted-color"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "agentForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"], ["label", "Annuler", "severity", "secondary", 3, "onClick", "text"], ["label", "D\xE9placer", "icon", "pi pi-check", 3, "onClick", "disabled"], [3, "value", "severity"]], template: function Agents_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "div", 7)(3, "p-toolbar", 8);
      \u0275\u0275template(4, Agents_ng_template_4_Template, 5, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, Agents_ng_template_6_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 9)(9, "p-iconfield");
      \u0275\u0275element(10, "p-inputicon", 10);
      \u0275\u0275elementStart(11, "input", 11);
      \u0275\u0275listener("ngModelChange", function Agents_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, Agents_Conditional_12_Template, 1, 3, "p-select", 12);
      \u0275\u0275elementStart(13, "p-select", 13);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Agents_Template_p_select_ngModelChange_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadAgents());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p-select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.activityFilter, $event) || (ctx.activityFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Agents_Template_p_select_ngModelChange_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadAgents());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 15)(16, "p-button", 16);
      \u0275\u0275listener("onClick", function Agents_Template_p_button_onClick_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearFilters());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "p-table", 17);
      \u0275\u0275template(18, Agents_ng_template_18_Template, 15, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(20, Agents_ng_template_20_Template, 19, 11, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(22, Agents_ng_template_22_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "p-dialog", 18);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formDialogVisible, $event) || (ctx.formDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(25, "form", 19, 5);
      \u0275\u0275listener("ngSubmit", function Agents_Template_form_ngSubmit_25_listener() {
        \u0275\u0275restoreView(_r1);
        const agentForm_r12 = \u0275\u0275reference(26);
        return \u0275\u0275resetView(ctx.save(agentForm_r12));
      });
      \u0275\u0275elementStart(27, "div")(28, "span", 20);
      \u0275\u0275text(29, "Compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p-select", 21);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.mode, $event) || (ctx.form.mode = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(31, Agents_Conditional_31_Template, 4, 3, "div")(32, Agents_Conditional_32_Template, 14, 3);
      \u0275\u0275elementStart(33, "div")(34, "label", 22);
      \u0275\u0275text(35, "Institut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p-select", 23);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.institut_id, $event) || (ctx.form.institut_id = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div")(38, "label", 24);
      \u0275\u0275text(39, "Disponibilit\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p-select", 25);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.status, $event) || (ctx.form.status = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(41, Agents_ng_template_41_Template, 2, 3, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p-dialog", 26);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_43_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.moveDialogVisible, $event) || (ctx.moveDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(44, "label", 27);
      \u0275\u0275text(45, "Nouvel institut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p-select", 28);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.moveInstitutId, $event) || (ctx.moveInstitutId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "p", 29);
      \u0275\u0275text(48, "Ses demandes en cours restent attribu\xE9es ; les nouvelles viendront du nouvel institut.");
      \u0275\u0275elementEnd();
      \u0275\u0275template(49, Agents_ng_template_49_Template, 2, 2, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "p-dialog", 26);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.interventionsDialogVisible, $event) || (ctx.interventionsDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(52, "p-table", 30);
      \u0275\u0275template(53, Agents_ng_template_53_Template, 11, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(55, Agents_ng_template_55_Template, 16, 13, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(57, Agents_ng_template_57_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(46, _c0));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.searchText);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.hasRole("admin") ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.statusOptions);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275property("showClear", true);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.activityOptions);
      \u0275\u0275twoWayProperty("ngModel", ctx.activityFilter);
      \u0275\u0275advance(2);
      \u0275\u0275property("text", true);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.agents())("loading", ctx.loading())("paginator", true)("rows", 10)("rowsPerPageOptions", \u0275\u0275pureFunction0(47, _c1))("tableStyle", \u0275\u0275pureFunction0(48, _c2))("rowHover", true)("showCurrentPageReport", true);
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(49, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.formDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.mode);
      \u0275\u0275property("options", ctx.modeOptions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.form.mode === "existing" ? 31 : 32);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.institut_id);
      \u0275\u0275property("options", ctx.institutOptions());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.status);
      \u0275\u0275property("options", ctx.statusOptions);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(50, _c4));
      \u0275\u0275twoWayProperty("visible", ctx.moveDialogVisible);
      \u0275\u0275property("header", "Changer d'institut \u2014 " + ((ctx.movedAgent == null ? null : ctx.movedAgent.name) ?? ""))("modal", true);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.moveInstitutId);
      \u0275\u0275property("options", ctx.institutOptions());
      \u0275\u0275advance(5);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(51, _c5));
      \u0275\u0275twoWayProperty("visible", ctx.interventionsDialogVisible);
      \u0275\u0275property("header", "Interventions \u2014 " + ((ctx.selectedAgent == null ? null : ctx.selectedAgent.name) ?? ""))("modal", true);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.interventions())("loading", ctx.interventionsLoading())("paginator", ctx.interventions().length > 10)("rows", 10)("tableStyle", \u0275\u0275pureFunction0(52, _c6));
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, EmailValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, IconFieldModule, IconField, InputIconModule, InputIcon, InputTextModule, InputText, SelectModule, Select, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, ToastModule, Toast, ToolbarModule, Toolbar, TooltipModule, Tooltip, DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=agents.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Agents, [{
    type: Component,
    args: [{ selector: "app-agents", imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, ToastModule, ToolbarModule, TooltipModule], providers: [MessageService, ConfirmationService], template: `<p-toast />
<p-confirmdialog [style]="{ width: '28rem' }" />

<div class="card">
    <p-toolbar styleClass="mb-5">
        <ng-template #start>
            <div>
                <h1 class="m-0 text-xl font-semibold">Gestion des agents</h1>
                <p class="mt-1 mb-0 text-sm text-muted-color">{{ auth.hasRole('admin') ? '\xC9quipes de terrain de tous les instituts.' : 'Les agents de votre institut.' }}</p>
            </div>
        </ng-template>
        <ng-template #end>
            <div class="flex gap-2">
                <p-button label="Actualiser" icon="pi pi-refresh" severity="secondary" [outlined]="true" [loading]="loading()" (onClick)="loadAgents()" />
                @if (auth.hasRole('admin')) {
                    <p-button label="Ajouter un agent" icon="pi pi-plus" (onClick)="openNew()" />
                }
            </div>
        </ng-template>
    </p-toolbar>

    <div class="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="search" class="w-full" aria-label="Rechercher un agent" placeholder="Nom ou email..." [ngModel]="searchText" (ngModelChange)="onSearchChange($event)" />
        </p-iconfield>
        @if (auth.hasRole('admin')) {
            <p-select [options]="institutOptions()" optionLabel="label" optionValue="value" [(ngModel)]="institutFilter" (ngModelChange)="loadAgents()" [showClear]="true" placeholder="Tous les instituts" ariaLabel="Filtrer par institut" class="w-full" />
        }
        <p-select [options]="statusOptions" [(ngModel)]="statusFilter" (ngModelChange)="loadAgents()" optionLabel="label" optionValue="value" [showClear]="true" placeholder="Tous les statuts" ariaLabel="Filtrer par statut" class="w-full" />
        <p-select [options]="activityOptions" [(ngModel)]="activityFilter" (ngModelChange)="loadAgents()" optionLabel="label" optionValue="value" ariaLabel="Filtrer par activation" class="w-full" />
    </div>
    <div class="mb-4 flex justify-end">
        <p-button label="R\xE9initialiser les filtres" icon="pi pi-filter-slash" severity="secondary" [text]="true" (onClick)="clearFilters()" />
    </div>

    <p-table
        [value]="agents()"
        [loading]="loading()"
        [paginator]="true"
        [rows]="10"
        [rowsPerPageOptions]="[10, 20, 50]"
        [tableStyle]="{ 'min-width': '52rem' }"
        [rowHover]="true"
        dataKey="id"
        currentPageReportTemplate="Affichage {first} \xE0 {last} sur {totalRecords} agents"
        [showCurrentPageReport]="true"
    >
        <ng-template #header>
            <tr>
                <th pSortableColumn="name" style="min-width: 14rem">Agent <p-sortIcon field="name" /></th>
                <th pSortableColumn="institut_name" style="min-width: 10rem">Institut <p-sortIcon field="institut_name" /></th>
                <th pSortableColumn="status" style="min-width: 10rem">Statut <p-sortIcon field="status" /></th>
                <th pSortableColumn="interventions" style="min-width: 9rem">Interventions <p-sortIcon field="interventions" /></th>
                <th style="width: 10rem">Actions</th>
            </tr>
        </ng-template>

        <ng-template #body let-agent>
            <tr [class.opacity-60]="!agent.is_active">
                <td>
                    <div class="font-medium">{{ agent.name }}</div>
                    <div class="text-sm text-muted-color">{{ agent.email }}</div>
                </td>
                <td>{{ agent.institut_name }}</td>
                <td>
                    @if (agent.is_active) {
                        <p-select [options]="statusOptions" optionLabel="label" optionValue="value" [ngModel]="agent.status" (ngModelChange)="changeStatus(agent, $event)" [ariaLabel]="'Disponibilit\xE9 de ' + agent.name" size="small" appendTo="body" />
                    } @else {
                        <p-tag value="D\xE9sactiv\xE9" severity="danger" />
                    }
                </td>
                <td>{{ agent.interventions }}</td>
                <td>
                    <div class="flex gap-1">
                        <p-button icon="pi pi-list" [rounded]="true" [text]="true" ariaLabel="Voir ses interventions" pTooltip="Voir ses interventions" tooltipPosition="top" (onClick)="openInterventions(agent)" />
                        @if (auth.hasRole('admin')) {
                            <p-button icon="pi pi-arrow-right-arrow-left" [rounded]="true" [text]="true" ariaLabel="Changer d'institut" pTooltip="Changer d'institut" tooltipPosition="top" (onClick)="openMove(agent)" />
                        }
                        @if (agent.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" ariaLabel="D\xE9sactiver l'agent" pTooltip="D\xE9sactiver" tooltipPosition="top" (onClick)="confirmDeactivate(agent)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" ariaLabel="R\xE9activer l'agent" pTooltip="R\xE9activer" tooltipPosition="top" (onClick)="toggleActivation(agent)" />
                        }
                    </div>
                </td>
            </tr>
        </ng-template>

        <ng-template #emptymessage>
            <tr>
                <td colspan="5" class="py-8 text-center text-muted-color">Aucun agent ne correspond aux crit\xE8res.</td>
            </tr>
        </ng-template>
    </p-table>
</div>

<p-dialog [(visible)]="formDialogVisible" header="Ajouter un agent" [modal]="true" [style]="{ width: 'min(36rem, 95vw)' }">
    <form #agentForm="ngForm" id="agentForm" class="grid grid-cols-1 gap-4" (ngSubmit)="save(agentForm)">
        <div>
            <span class="mb-2 block font-semibold">Compte</span>
            <p-select name="mode" [(ngModel)]="form.mode" [options]="modeOptions" optionLabel="label" optionValue="value" ariaLabel="Type de compte" class="w-full" />
        </div>
        @if (form.mode === 'existing') {
            <div>
                <label for="agent-account" class="mb-2 block font-semibold">Compte agent</label>
                <p-select inputId="agent-account" name="user_id" [(ngModel)]="form.user_id" [options]="accountOptions()" optionLabel="label" optionValue="value" [filter]="true" placeholder="Compte \xAB agent \xBB sans profil" emptyMessage="Tous les comptes agents ont d\xE9j\xE0 un profil" required class="w-full" />
            </div>
        } @else {
            <div>
                <label for="agent-name" class="mb-2 block font-semibold">Nom</label>
                <input pInputText id="agent-name" name="name" [(ngModel)]="form.name" required maxlength="255" class="w-full" />
            </div>
            <div>
                <label for="agent-email" class="mb-2 block font-semibold">Email</label>
                <input pInputText id="agent-email" name="email" type="email" [(ngModel)]="form.email" required email maxlength="320" class="w-full" />
            </div>
            <div>
                <label for="agent-password" class="mb-2 block font-semibold">Mot de passe initial</label>
                <input pInputText id="agent-password" name="password" type="password" [(ngModel)]="form.password" required minlength="10" autocomplete="new-password" class="w-full" />
                <small class="mt-1 block text-muted-color">10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre.</small>
            </div>
        }
        <div>
            <label for="agent-institut" class="mb-2 block font-semibold">Institut</label>
            <p-select inputId="agent-institut" name="institut_id" [(ngModel)]="form.institut_id" [options]="institutOptions()" optionLabel="label" optionValue="value" placeholder="Institut de rattachement" required class="w-full" />
        </div>
        <div>
            <label for="agent-status" class="mb-2 block font-semibold">Disponibilit\xE9</label>
            <p-select inputId="agent-status" name="status" [(ngModel)]="form.status" [options]="statusOptions" optionLabel="label" optionValue="value" required class="w-full" />
        </div>
    </form>

    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="formDialogVisible = false"></button>
        <button pButton type="submit" form="agentForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="!agentForm.valid || saving()"></button>
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="moveDialogVisible" [header]="'Changer d\\'institut \u2014 ' + (movedAgent?.name ?? '')" [modal]="true" [style]="{ width: 'min(28rem, 95vw)' }">
    <label for="move-institut" class="mb-2 block font-semibold">Nouvel institut</label>
    <p-select inputId="move-institut" [(ngModel)]="moveInstitutId" [options]="institutOptions()" optionLabel="label" optionValue="value" class="w-full" appendTo="body" />
    <p class="mb-0 text-sm text-muted-color">Ses demandes en cours restent attribu\xE9es ; les nouvelles viendront du nouvel institut.</p>
    <ng-template #footer>
        <p-button label="Annuler" severity="secondary" [text]="true" (onClick)="moveDialogVisible = false" />
        <p-button label="D\xE9placer" icon="pi pi-check" [disabled]="!moveInstitutId || moveInstitutId === movedAgent?.institut_id" (onClick)="saveMove()" />
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="interventionsDialogVisible" [header]="'Interventions \u2014 ' + (selectedAgent?.name ?? '')" [modal]="true" [style]="{ width: 'min(56rem, 95vw)' }">
    <p-table [value]="interventions()" [loading]="interventionsLoading()" [paginator]="interventions().length > 10" [rows]="10" [tableStyle]="{ 'min-width': '44rem' }">
        <ng-template #header>
            <tr>
                <th>Demande</th>
                <th>Cat\xE9gorie</th>
                <th>Statut</th>
                <th>Cr\xE9\xE9e le</th>
                <th>R\xE9solue le</th>
            </tr>
        </ng-template>
        <ng-template #body let-request>
            <tr>
                <td>
                    <div class="font-medium">{{ request.title }}</div>
                    <div class="text-sm text-muted-color">{{ request.location }}</div>
                </td>
                <td>{{ request.category }}</td>
                <td><p-tag [value]="request.status" [severity]="requestStatusSeverity(request.status)" /></td>
                <td>{{ request.created_at | date: 'dd/MM/yyyy HH:mm' }}</td>
                <td>{{ request.resolved_at ? (request.resolved_at | date: 'dd/MM/yyyy HH:mm') : '\u2014' }}</td>
            </tr>
        </ng-template>
        <ng-template #emptymessage>
            <tr>
                <td colspan="5" class="py-8 text-center text-muted-color">Aucune intervention attribu\xE9e \xE0 cet agent.</td>
            </tr>
        </ng-template>
    </p-table>
</p-dialog>
`, styles: ["/* src/app/agents/agents.scss */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=agents.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Agents, { className: "Agents", filePath: "src/app/agents/agents.ts", lineNumber: 52 });
})();
export {
  Agents
};
//# sourceMappingURL=chunk-P2G7BZ4F.js.map
