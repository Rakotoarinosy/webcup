import {
  AGENT_STATUSES,
  AGENT_STATUS_LABELS
} from "./chunk-T6CAQ4OU.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import {
  requestStatusSeverity
} from "./chunk-KJD3IBMG.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import "./chunk-2ZKMMRNY.js";
import {
  Toolbar,
  ToolbarModule
} from "./chunk-4W5P7JTM.js";
import {
  AgentService
} from "./chunk-4C575W2K.js";
import {
  InstitutService
} from "./chunk-KQXKYOP3.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import "./chunk-F3M422Q6.js";
import {
  SortIcon,
  SortableColumn,
  Table,
  TableModule
} from "./chunk-GD36EOZK.js";
import {
  ConfirmDialog,
  ConfirmDialogModule
} from "./chunk-YTW5QXAE.js";
import "./chunk-SULZIKH5.js";
import {
  IconField,
  IconFieldModule,
  InputIcon,
  InputIconModule,
  InputText,
  InputTextModule,
  Select,
  SelectModule
} from "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import {
  Tooltip,
  TooltipModule
} from "./chunk-OUQ4VYAJ.js";
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
  ButtonDirective,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import {
  UserService,
  apiErrorMessage
} from "./chunk-4NHVROSD.js";
import "./chunk-QS2LCQSO.js";
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
} from "./chunk-BX45OWY6.js";
import {
  ConfirmationService,
  MessageService
} from "./chunk-YMMGU7DJ.js";
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
  ɵɵattribute,
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
} from "./chunk-TSUH44O7.js";

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
    \u0275\u0275elementStart(0, "div")(1, "h1", 42);
    \u0275\u0275text(2, "Gestion des agents");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 43);
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
    \u0275\u0275elementStart(0, "p-button", 47);
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
    \u0275\u0275elementStart(0, "div", 44)(1, "p-button", 45);
    \u0275\u0275listener("onClick", function Agents_ng_template_6_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAgents());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, Agents_ng_template_6_Conditional_2_Template, 1, 0, "p-button", 46);
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
    \u0275\u0275elementStart(0, "p-select", 48);
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
    \u0275\u0275elementStart(0, "tr")(1, "th", 49);
    \u0275\u0275text(2, "Agent ");
    \u0275\u0275element(3, "p-sortIcon", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "th", 51);
    \u0275\u0275text(5, "Institut ");
    \u0275\u0275element(6, "p-sortIcon", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 53);
    \u0275\u0275text(8, "Statut ");
    \u0275\u0275element(9, "p-sortIcon", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 55);
    \u0275\u0275text(11, "Interventions ");
    \u0275\u0275element(12, "p-sortIcon", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 57);
    \u0275\u0275text(14, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Agents_ng_template_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-select", 67);
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
    \u0275\u0275element(0, "p-tag", 61);
  }
}
function Agents_ng_template_20_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 68);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_16_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r9);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openMove(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agent_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Changer d\u2019institut : " + agent_r8.name);
  }
}
function Agents_ng_template_20_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 69);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_17_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r10);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDeactivate(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agent_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "D\xE9sactiver l\u2019agent " + agent_r8.name);
  }
}
function Agents_ng_template_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 70);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Conditional_18_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r11);
      const agent_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleActivation(agent_r8));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agent_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "R\xE9activer l\u2019agent " + agent_r8.name);
  }
}
function Agents_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275conditionalCreate(9, Agents_ng_template_20_Conditional_9_Template, 1, 3, "p-select", 60)(10, Agents_ng_template_20_Conditional_10_Template, 1, 0, "p-tag", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 62)(15, "p-button", 63);
    \u0275\u0275listener("onClick", function Agents_ng_template_20_Template_p_button_onClick_15_listener() {
      const agent_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openInterventions(agent_r8));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, Agents_ng_template_20_Conditional_16_Template, 1, 3, "p-button", 64);
    \u0275\u0275conditionalCreate(17, Agents_ng_template_20_Conditional_17_Template, 1, 3, "p-button", 65)(18, Agents_ng_template_20_Conditional_18_Template, 1, 3, "p-button", 66);
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
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Voir les interventions de " + agent_r8.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.auth.hasRole("admin") ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(agent_r8.is_active ? 17 : 18);
  }
}
function Agents_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 71);
    \u0275\u0275text(2, "Aucun agent ne correspond aux crit\xE8res.");
    \u0275\u0275elementEnd()();
  }
}
function Agents_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, "Le formulaire contient des erreurs : corrigez les champs signal\xE9s.");
    \u0275\u0275elementEnd();
  }
}
function Agents_Conditional_37_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Choisissez un compte agent.");
    \u0275\u0275elementEnd();
  }
}
function Agents_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 72);
    \u0275\u0275text(2, "Compte agent ");
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p-select", 73, 8);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_37_Template_p_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.user_id, $event) || (ctx_r1.form.user_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 74);
    \u0275\u0275conditionalCreate(8, Agents_Conditional_37_Conditional_8_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const accountModel_r14 = \u0275\u0275reference(6);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.user_id);
    \u0275\u0275property("options", ctx_r1.accountOptions())("filter", true)("invalid", !!accountModel_r14.invalid && !!accountModel_r14.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(accountModel_r14.invalid && accountModel_r14.touched ? 8 : -1);
  }
}
function Agents_Conditional_38_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Le nom est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Agents_Conditional_38_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const emailModel_r16 = \u0275\u0275reference(15);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(emailModel_r16.hasError("required") ? "L\u2019email est obligatoire." : "Saisissez une adresse email valide.");
  }
}
function Agents_Conditional_38_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const passwordModel_r17 = \u0275\u0275reference(24);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(passwordModel_r17.hasError("required") ? "Le mot de passe initial est obligatoire." : "Le mot de passe doit contenir au moins 10 caract\xE8res.");
  }
}
function Agents_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 75);
    \u0275\u0275text(2, "Nom ");
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 76, 9);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_38_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.name, $event) || (ctx_r1.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 77);
    \u0275\u0275conditionalCreate(8, Agents_Conditional_38_Conditional_8_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "label", 78);
    \u0275\u0275text(11, "Email ");
    \u0275\u0275elementStart(12, "span", 31);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "input", 79, 10);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_38_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.email, $event) || (ctx_r1.form.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "small", 80);
    \u0275\u0275conditionalCreate(17, Agents_Conditional_38_Conditional_17_Template, 2, 1, "span", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "label", 81);
    \u0275\u0275text(20, "Mot de passe initial ");
    \u0275\u0275elementStart(21, "span", 31);
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 82, 11);
    \u0275\u0275twoWayListener("ngModelChange", function Agents_Conditional_38_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.password, $event) || (ctx_r1.form.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small", 83);
    \u0275\u0275text(26, "10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "small", 84);
    \u0275\u0275conditionalCreate(28, Agents_Conditional_38_Conditional_28_Template, 2, 1, "span", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nameModel_r18 = \u0275\u0275reference(6);
    const emailModel_r16 = \u0275\u0275reference(15);
    const passwordModel_r17 = \u0275\u0275reference(24);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.name);
    \u0275\u0275attribute("aria-invalid", nameModel_r18.invalid && nameModel_r18.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(nameModel_r18.invalid && nameModel_r18.touched ? 8 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.email);
    \u0275\u0275attribute("aria-invalid", emailModel_r16.invalid && emailModel_r16.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(emailModel_r16.invalid && emailModel_r16.touched ? 17 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.password);
    \u0275\u0275attribute("aria-invalid", passwordModel_r17.invalid && passwordModel_r17.touched);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(passwordModel_r17.invalid && passwordModel_r17.touched ? 28 : -1);
  }
}
function Agents_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Choisissez l\u2019institut de rattachement.");
    \u0275\u0275elementEnd();
  }
}
function Agents_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function Agents_ng_template_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.formDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 86);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", ctx_r1.saving());
  }
}
function Agents_ng_template_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 87);
    \u0275\u0275listener("onClick", function Agents_ng_template_62_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.moveDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "p-button", 88);
    \u0275\u0275listener("onClick", function Agents_ng_template_62_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r20);
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
function Agents_ng_template_66_Template(rf, ctx) {
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
function Agents_ng_template_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 58);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275element(9, "p-tag", 89);
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
    const request_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r21.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r21.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r21.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", request_r21.status)("severity", ctx_r1.requestStatusSeverity(request_r21.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 7, request_r21.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r21.resolved_at ? \u0275\u0275pipeBind2(15, 10, request_r21.resolved_at, "dd/MM/yyyy HH:mm") : "\u2014");
  }
}
function Agents_ng_template_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 71);
    \u0275\u0275text(2, "Aucune intervention attribu\xE9e \xE0 cet agent.");
    \u0275\u0275elementEnd()();
  }
}
var EMPTY_FORM = { mode: "existing", user_id: null, name: "", email: "", password: "", institut_id: null, status: "available" };
var Agents = class _Agents {
  live = inject(LiveDataService);
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
    this.live.watch(this.destroyRef, () => {
      this.loadAgents();
    }, () => !this.loading() && !this.saving() && !this.formDialogVisible && !this.interventionsDialogVisible);
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Agents, selectors: [["app-agents"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 72, vars: 57, consts: [["start", ""], ["end", ""], ["header", ""], ["body", ""], ["emptymessage", ""], ["agentForm", "ngForm"], ["institutModel", "ngModel"], ["footer", ""], ["accountModel", "ngModel"], ["nameModel", "ngModel"], ["emailModel", "ngModel"], ["passwordModel", "ngModel"], [1, "card"], ["styleClass", "mb-5"], [1, "mb-5", "grid", "grid-cols-1", "gap-3", "md:grid-cols-2", "xl:grid-cols-4"], ["styleClass", "pi pi-search", "aria-hidden", "true"], ["pInputText", "", "type", "search", "aria-label", "Rechercher un agent", "placeholder", "Nom ou email...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les instituts", "ariaLabel", "Filtrer par institut", 1, "w-full", 3, "options", "ngModel", "showClear"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les statuts", "ariaLabel", "Filtrer par statut", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["optionLabel", "label", "optionValue", "value", "ariaLabel", "Filtrer par activation", 1, "w-full", 3, "ngModelChange", "options", "ngModel"], [1, "mb-4", "flex", "justify-end"], ["label", "R\xE9initialiser les filtres", "icon", "pi pi-filter-slash", "severity", "secondary", 3, "onClick", "text"], ["role", "region", "aria-label", "Liste des agents", "dataKey", "id", "currentPageReportTemplate", "Affichage {first} \xE0 {last} sur {totalRecords} agents", 3, "value", "loading", "paginator", "rows", "rowsPerPageOptions", "tableStyle", "rowHover", "showCurrentPageReport"], ["header", "Ajouter un agent", 3, "visibleChange", "visible", "modal"], ["id", "agentForm", "novalidate", "", 1, "grid", "grid-cols-1", "gap-4", 3, "ngSubmit"], [1, "m-0", "text-sm", "text-muted-color"], ["aria-hidden", "true"], ["role", "alert", 1, "m-0", "rounded-border", "border", "border-red-300", "bg-red-50", "p-3", "text-sm", "text-red-700", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["id", "agent-mode-label", 1, "mb-2", "block", "font-semibold"], ["name", "mode", "optionLabel", "label", "optionValue", "value", "ariaLabelledBy", "agent-mode-label", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], ["for", "agent-institut", "id", "agent-institut-label", 1, "mb-2", "block", "font-semibold"], ["aria-hidden", "true", 1, "text-red-600"], ["inputId", "agent-institut", "name", "institut_id", "optionLabel", "label", "optionValue", "value", "placeholder", "Institut de rattachement", "required", "", "ariaLabelledBy", "agent-institut-label agent-institut-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "invalid"], ["id", "agent-institut-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], [1, "block", "pt-1"], ["for", "agent-status", "id", "agent-status-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "agent-status", "name", "status", "optionLabel", "label", "optionValue", "value", "required", "", "ariaLabelledBy", "agent-status-label", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], [3, "visibleChange", "visible", "header", "modal"], ["for", "move-institut", "id", "move-institut-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "move-institut", "ariaLabelledBy", "move-institut-label move-institut-help", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], ["id", "move-institut-help", 1, "mb-0", "text-sm", "text-muted-color"], ["role", "region", 3, "value", "loading", "paginator", "rows", "tableStyle"], [1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "gap-2"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], ["label", "Ajouter un agent", "icon", "pi pi-plus"], ["label", "Ajouter un agent", "icon", "pi pi-plus", 3, "onClick"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Tous les instituts", "ariaLabel", "Filtrer par institut", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["pSortableColumn", "name", 2, "min-width", "14rem"], ["field", "name"], ["pSortableColumn", "institut_name", 2, "min-width", "10rem"], ["field", "institut_name"], ["pSortableColumn", "status", 2, "min-width", "10rem"], ["field", "status"], ["pSortableColumn", "interventions", 2, "min-width", "9rem"], ["field", "interventions"], [2, "width", "10rem"], [1, "font-medium"], [1, "text-sm", "text-muted-color"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", 3, "options", "ngModel", "ariaLabel"], ["value", "D\xE9sactiv\xE9", "severity", "danger"], [1, "flex", "gap-1"], ["icon", "pi pi-list", "pTooltip", "Voir ses interventions", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-arrow-right-arrow-left", "pTooltip", "Changer d'institut", "tooltipPosition", "top", 3, "rounded", "text", "ariaLabel"], ["icon", "pi pi-ban", "severity", "danger", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "rounded", "text", "ariaLabel"], ["icon", "pi pi-replay", "severity", "success", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "rounded", "text", "ariaLabel"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "ariaLabel"], ["icon", "pi pi-arrow-right-arrow-left", "pTooltip", "Changer d'institut", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-ban", "severity", "danger", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-replay", "severity", "success", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["colspan", "5", 1, "py-8", "text-center", "text-muted-color"], ["for", "agent-account", "id", "agent-account-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "agent-account", "name", "user_id", "optionLabel", "label", "optionValue", "value", "ariaFilterLabel", "Rechercher un compte agent", "placeholder", "Compte \xAB agent \xBB sans profil", "emptyMessage", "Tous les comptes agents ont d\xE9j\xE0 un profil", "required", "", "ariaLabelledBy", "agent-account-label agent-account-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "filter", "invalid"], ["id", "agent-account-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "agent-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-name", "name", "name", "required", "", "maxlength", "255", "autocomplete", "off", "aria-describedby", "agent-name-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "agent-name-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "agent-email", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-email", "name", "email", "type", "email", "required", "", "email", "", "maxlength", "320", "autocomplete", "off", "aria-describedby", "agent-email-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "agent-email-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "agent-password", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "agent-password", "name", "password", "type", "password", "required", "", "minlength", "10", "autocomplete", "new-password", "aria-describedby", "agent-password-help agent-password-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "agent-password-help", 1, "mt-1", "block", "text-muted-color"], ["id", "agent-password-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "agentForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"], ["label", "Annuler", "severity", "secondary", 3, "onClick", "text"], ["label", "D\xE9placer", "icon", "pi pi-check", 3, "onClick", "disabled"], [3, "value", "severity"]], template: function Agents_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "div", 12)(3, "p-toolbar", 13);
      \u0275\u0275template(4, Agents_ng_template_4_Template, 5, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, Agents_ng_template_6_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 14)(9, "p-iconfield");
      \u0275\u0275element(10, "p-inputicon", 15);
      \u0275\u0275elementStart(11, "input", 16);
      \u0275\u0275listener("ngModelChange", function Agents_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, Agents_Conditional_12_Template, 1, 3, "p-select", 17);
      \u0275\u0275elementStart(13, "p-select", 18);
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
      \u0275\u0275elementStart(14, "p-select", 19);
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
      \u0275\u0275elementStart(15, "div", 20)(16, "p-button", 21);
      \u0275\u0275listener("onClick", function Agents_Template_p_button_onClick_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearFilters());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "p-table", 22);
      \u0275\u0275template(18, Agents_ng_template_18_Template, 15, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(20, Agents_ng_template_20_Template, 19, 12, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(22, Agents_ng_template_22_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "p-dialog", 23);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.formDialogVisible, $event) || (ctx.formDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(25, "form", 24, 5);
      \u0275\u0275listener("ngSubmit", function Agents_Template_form_ngSubmit_25_listener() {
        \u0275\u0275restoreView(_r1);
        const agentForm_r12 = \u0275\u0275reference(26);
        return \u0275\u0275resetView(ctx.save(agentForm_r12));
      });
      \u0275\u0275elementStart(27, "p", 25);
      \u0275\u0275text(28, "Les champs marqu\xE9s d\u2019un ast\xE9risque (");
      \u0275\u0275elementStart(29, "span", 26);
      \u0275\u0275text(30, "*");
      \u0275\u0275elementEnd();
      \u0275\u0275text(31, ") sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(32, Agents_Conditional_32_Template, 2, 0, "p", 27);
      \u0275\u0275elementStart(33, "div")(34, "span", 28);
      \u0275\u0275text(35, "Compte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "p-select", 29);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.mode, $event) || (ctx.form.mode = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(37, Agents_Conditional_37_Template, 9, 5, "div")(38, Agents_Conditional_38_Template, 29, 9);
      \u0275\u0275elementStart(39, "div")(40, "label", 30);
      \u0275\u0275text(41, "Institut ");
      \u0275\u0275elementStart(42, "span", 31);
      \u0275\u0275text(43, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "p-select", 32, 6);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_44_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.institut_id, $event) || (ctx.form.institut_id = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "small", 33);
      \u0275\u0275conditionalCreate(47, Agents_Conditional_47_Template, 2, 0, "span", 34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div")(49, "label", 35);
      \u0275\u0275text(50, "Disponibilit\xE9 ");
      \u0275\u0275elementStart(51, "span", 31);
      \u0275\u0275text(52, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "p-select", 36);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.status, $event) || (ctx.form.status = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(54, Agents_ng_template_54_Template, 2, 3, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p-dialog", 37);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.moveDialogVisible, $event) || (ctx.moveDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(57, "label", 38);
      \u0275\u0275text(58, "Nouvel institut");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "p-select", 39);
      \u0275\u0275twoWayListener("ngModelChange", function Agents_Template_p_select_ngModelChange_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.moveInstitutId, $event) || (ctx.moveInstitutId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "p", 40);
      \u0275\u0275text(61, "Ses demandes en cours restent attribu\xE9es ; les nouvelles viendront du nouvel institut.");
      \u0275\u0275elementEnd();
      \u0275\u0275template(62, Agents_ng_template_62_Template, 2, 2, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "p-dialog", 37);
      \u0275\u0275twoWayListener("visibleChange", function Agents_Template_p_dialog_visibleChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.interventionsDialogVisible, $event) || (ctx.interventionsDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(65, "p-table", 41);
      \u0275\u0275template(66, Agents_ng_template_66_Template, 11, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(68, Agents_ng_template_68_Template, 16, 13, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(70, Agents_ng_template_70_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const agentForm_r12 = \u0275\u0275reference(26);
      const institutModel_r22 = \u0275\u0275reference(45);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(50, _c0));
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
      \u0275\u0275property("value", ctx.agents())("loading", ctx.loading())("paginator", true)("rows", 10)("rowsPerPageOptions", \u0275\u0275pureFunction0(51, _c1))("tableStyle", \u0275\u0275pureFunction0(52, _c2))("rowHover", true)("showCurrentPageReport", true);
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(53, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.formDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(agentForm_r12.submitted && agentForm_r12.invalid ? 32 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.mode);
      \u0275\u0275property("options", ctx.modeOptions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.form.mode === "existing" ? 37 : 38);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.institut_id);
      \u0275\u0275property("options", ctx.institutOptions())("invalid", !!institutModel_r22.invalid && !!institutModel_r22.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(institutModel_r22.invalid && institutModel_r22.touched ? 47 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.status);
      \u0275\u0275property("options", ctx.statusOptions);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(54, _c4));
      \u0275\u0275twoWayProperty("visible", ctx.moveDialogVisible);
      \u0275\u0275property("header", "Changer d'institut \u2014 " + ((ctx.movedAgent == null ? null : ctx.movedAgent.name) ?? ""))("modal", true);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.moveInstitutId);
      \u0275\u0275property("options", ctx.institutOptions());
      \u0275\u0275advance(5);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(55, _c5));
      \u0275\u0275twoWayProperty("visible", ctx.interventionsDialogVisible);
      \u0275\u0275property("header", "Interventions \u2014 " + ((ctx.selectedAgent == null ? null : ctx.selectedAgent.name) ?? ""))("modal", true);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.interventions())("loading", ctx.interventionsLoading())("paginator", ctx.interventions().length > 10)("rows", 10)("tableStyle", \u0275\u0275pureFunction0(56, _c6));
      \u0275\u0275attribute("aria-label", "Interventions de " + ((ctx.selectedAgent == null ? null : ctx.selectedAgent.name) ?? "l\u2019agent"));
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
            <p-inputicon styleClass="pi pi-search" aria-hidden="true" />
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
        role="region"
        aria-label="Liste des agents"
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
                        <p-button icon="pi pi-list" [rounded]="true" [text]="true" [ariaLabel]="'Voir les interventions de ' + agent.name" pTooltip="Voir ses interventions" tooltipPosition="top" (onClick)="openInterventions(agent)" />
                        @if (auth.hasRole('admin')) {
                            <p-button icon="pi pi-arrow-right-arrow-left" [rounded]="true" [text]="true" [ariaLabel]="'Changer d\u2019institut : ' + agent.name" pTooltip="Changer d'institut" tooltipPosition="top" (onClick)="openMove(agent)" />
                        }
                        @if (agent.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" [ariaLabel]="'D\xE9sactiver l\u2019agent ' + agent.name" pTooltip="D\xE9sactiver" tooltipPosition="top" (onClick)="confirmDeactivate(agent)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" [ariaLabel]="'R\xE9activer l\u2019agent ' + agent.name" pTooltip="R\xE9activer" tooltipPosition="top" (onClick)="toggleActivation(agent)" />
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
    <form #agentForm="ngForm" id="agentForm" class="grid grid-cols-1 gap-4" novalidate (ngSubmit)="save(agentForm)">
        <p class="m-0 text-sm text-muted-color">Les champs marqu\xE9s d\u2019un ast\xE9risque (<span aria-hidden="true">*</span>) sont obligatoires.</p>
        @if (agentForm.submitted && agentForm.invalid) {
            <p role="alert" class="m-0 rounded-border border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-100">Le formulaire contient des erreurs : corrigez les champs signal\xE9s.</p>
        }
        <div>
            <span id="agent-mode-label" class="mb-2 block font-semibold">Compte</span>
            <p-select name="mode" [(ngModel)]="form.mode" [options]="modeOptions" optionLabel="label" optionValue="value" ariaLabelledBy="agent-mode-label" class="w-full" />
        </div>
        @if (form.mode === 'existing') {
            <div>
                <label for="agent-account" id="agent-account-label" class="mb-2 block font-semibold">Compte agent <span class="text-red-600" aria-hidden="true">*</span></label>
                <p-select
                    #accountModel="ngModel"
                    inputId="agent-account"
                    name="user_id"
                    [(ngModel)]="form.user_id"
                    [options]="accountOptions()"
                    optionLabel="label"
                    optionValue="value"
                    [filter]="true"
                    ariaFilterLabel="Rechercher un compte agent"
                    placeholder="Compte \xAB agent \xBB sans profil"
                    emptyMessage="Tous les comptes agents ont d\xE9j\xE0 un profil"
                    required
                    ariaLabelledBy="agent-account-label agent-account-error"
                    [invalid]="!!accountModel.invalid && !!accountModel.touched"
                    class="w-full"
                />
                <small id="agent-account-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (accountModel.invalid && accountModel.touched) {
                        <span class="block pt-1">Choisissez un compte agent.</span>
                    }
                </small>
            </div>
        } @else {
            <div>
                <label for="agent-name" class="mb-2 block font-semibold">Nom <span class="text-red-600" aria-hidden="true">*</span></label>
                <input
                    pInputText
                    #nameModel="ngModel"
                    id="agent-name"
                    name="name"
                    [(ngModel)]="form.name"
                    required
                    maxlength="255"
                    autocomplete="off"
                    aria-describedby="agent-name-error"
                    [attr.aria-invalid]="nameModel.invalid && nameModel.touched"
                    class="w-full"
                />
                <small id="agent-name-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (nameModel.invalid && nameModel.touched) {
                        <span class="block pt-1">Le nom est obligatoire.</span>
                    }
                </small>
            </div>
            <div>
                <label for="agent-email" class="mb-2 block font-semibold">Email <span class="text-red-600" aria-hidden="true">*</span></label>
                <input
                    pInputText
                    #emailModel="ngModel"
                    id="agent-email"
                    name="email"
                    type="email"
                    [(ngModel)]="form.email"
                    required
                    email
                    maxlength="320"
                    autocomplete="off"
                    aria-describedby="agent-email-error"
                    [attr.aria-invalid]="emailModel.invalid && emailModel.touched"
                    class="w-full"
                />
                <small id="agent-email-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (emailModel.invalid && emailModel.touched) {
                        <span class="block pt-1">{{ emailModel.hasError('required') ? 'L\u2019email est obligatoire.' : 'Saisissez une adresse email valide.' }}</span>
                    }
                </small>
            </div>
            <div>
                <label for="agent-password" class="mb-2 block font-semibold">Mot de passe initial <span class="text-red-600" aria-hidden="true">*</span></label>
                <input
                    pInputText
                    #passwordModel="ngModel"
                    id="agent-password"
                    name="password"
                    type="password"
                    [(ngModel)]="form.password"
                    required
                    minlength="10"
                    autocomplete="new-password"
                    aria-describedby="agent-password-help agent-password-error"
                    [attr.aria-invalid]="passwordModel.invalid && passwordModel.touched"
                    class="w-full"
                />
                <small id="agent-password-help" class="mt-1 block text-muted-color">10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre.</small>
                <small id="agent-password-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (passwordModel.invalid && passwordModel.touched) {
                        <span class="block pt-1">{{ passwordModel.hasError('required') ? 'Le mot de passe initial est obligatoire.' : 'Le mot de passe doit contenir au moins 10 caract\xE8res.' }}</span>
                    }
                </small>
            </div>
        }
        <div>
            <label for="agent-institut" id="agent-institut-label" class="mb-2 block font-semibold">Institut <span class="text-red-600" aria-hidden="true">*</span></label>
            <p-select
                #institutModel="ngModel"
                inputId="agent-institut"
                name="institut_id"
                [(ngModel)]="form.institut_id"
                [options]="institutOptions()"
                optionLabel="label"
                optionValue="value"
                placeholder="Institut de rattachement"
                required
                ariaLabelledBy="agent-institut-label agent-institut-error"
                [invalid]="!!institutModel.invalid && !!institutModel.touched"
                class="w-full"
            />
            <small id="agent-institut-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (institutModel.invalid && institutModel.touched) {
                    <span class="block pt-1">Choisissez l\u2019institut de rattachement.</span>
                }
            </small>
        </div>
        <div>
            <label for="agent-status" id="agent-status-label" class="mb-2 block font-semibold">Disponibilit\xE9 <span class="text-red-600" aria-hidden="true">*</span></label>
            <p-select inputId="agent-status" name="status" [(ngModel)]="form.status" [options]="statusOptions" optionLabel="label" optionValue="value" required ariaLabelledBy="agent-status-label" class="w-full" />
        </div>
    </form>

    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="formDialogVisible = false"></button>
        <button pButton type="submit" form="agentForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="saving()"></button>
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="moveDialogVisible" [header]="'Changer d\\'institut \u2014 ' + (movedAgent?.name ?? '')" [modal]="true" [style]="{ width: 'min(28rem, 95vw)' }">
    <label for="move-institut" id="move-institut-label" class="mb-2 block font-semibold">Nouvel institut</label>
    <p-select inputId="move-institut" ariaLabelledBy="move-institut-label move-institut-help" [(ngModel)]="moveInstitutId" [options]="institutOptions()" optionLabel="label" optionValue="value" class="w-full" appendTo="body" />
    <p id="move-institut-help" class="mb-0 text-sm text-muted-color">Ses demandes en cours restent attribu\xE9es ; les nouvelles viendront du nouvel institut.</p>
    <ng-template #footer>
        <p-button label="Annuler" severity="secondary" [text]="true" (onClick)="moveDialogVisible = false" />
        <p-button label="D\xE9placer" icon="pi pi-check" [disabled]="!moveInstitutId || moveInstitutId === movedAgent?.institut_id" (onClick)="saveMove()" />
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="interventionsDialogVisible" [header]="'Interventions \u2014 ' + (selectedAgent?.name ?? '')" [modal]="true" [style]="{ width: 'min(56rem, 95vw)' }">
    <p-table role="region" [attr.aria-label]="'Interventions de ' + (selectedAgent?.name ?? 'l\u2019agent')" [value]="interventions()" [loading]="interventionsLoading()" [paginator]="interventions().length > 10" [rows]="10" [tableStyle]="{ 'min-width': '44rem' }">
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Agents, { className: "Agents", filePath: "src/app/agents/agents.ts", lineNumber: 53 });
})();
export {
  Agents
};
//# sourceMappingURL=chunk-22KUDMFL.js.map
