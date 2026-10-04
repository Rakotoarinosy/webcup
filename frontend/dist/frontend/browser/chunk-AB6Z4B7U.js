import {
  Textarea,
  TextareaModule
} from "./chunk-RP2MWOEV.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import {
  CitizenRequestService
} from "./chunk-QNPZAXSG.js";
import {
  REQUEST_CATEGORIES,
  REQUEST_PRIORITIES,
  REQUEST_STATUSES,
  STATUS_TRANSITIONS,
  eventLabel,
  isOpen,
  requestPrioritySeverity,
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
  FormsModule,
  MaxLengthValidator,
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
  HttpErrorResponse,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// src/app/requests/requests.ts
var _c0 = () => ({ width: "28rem" });
var _c1 = () => [10, 20, 50];
var _c2 = () => ({ "min-width": "92rem" });
var _c3 = () => ({ width: "min(48rem, 95vw)" });
var _c4 = () => ({ width: "min(32rem, 95vw)" });
var _c5 = () => ({ width: "min(42rem, 95vw)" });
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.target;
function Requests_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h1", 62);
    \u0275\u0275text(2, "Demandes citoyennes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 63);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.auth.hasRole("admin") ? "Toutes les demandes de la plateforme." : "Les demandes re\xE7ues par votre institut.");
  }
}
function Requests_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 64)(1, "p-button", 65);
    \u0275\u0275listener("onClick", function Requests_ng_template_6_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRequests());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p-button", 66);
    \u0275\u0275listener("onClick", function Requests_ng_template_6_Template_p_button_onClick_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSubmit());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("outlined", true)("loading", ctx_r1.loading());
  }
}
function Requests_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 67);
    \u0275\u0275text(2, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th", 68);
    \u0275\u0275text(4, "Titre ");
    \u0275\u0275element(5, "p-sortIcon", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 70);
    \u0275\u0275text(7, "Cat\xE9gorie ");
    \u0275\u0275element(8, "p-sortIcon", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 72);
    \u0275\u0275text(10, "Priorit\xE9 ");
    \u0275\u0275element(11, "p-sortIcon", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 74);
    \u0275\u0275text(13, "Statut ");
    \u0275\u0275element(14, "p-sortIcon", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 76);
    \u0275\u0275text(16, "Citoyen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 77);
    \u0275\u0275text(18, "Cr\xE9\xE9e le ");
    \u0275\u0275element(19, "p-sortIcon", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 79);
    \u0275\u0275text(21, "Localisation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 76);
    \u0275\u0275text(23, "Institut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 76);
    \u0275\u0275text(25, "Agent assign\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 80);
    \u0275\u0275text(27, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function Requests_ng_template_20_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 88);
    \u0275\u0275listener("onClick", function Requests_ng_template_20_Conditional_27_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r6);
      const request_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAssign(request_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "p-button", 89);
    \u0275\u0275listener("onClick", function Requests_ng_template_20_Conditional_27_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r6);
      const request_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEdit(request_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Attribuer \xE0 un agent la demande \xAB " + request_r5.title + " \xBB");
    \u0275\u0275advance();
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Modifier la demande \xAB " + request_r5.title + " \xBB");
  }
}
function Requests_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 82);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275element(9, "p-tag", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275element(11, "p-tag", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td")(24, "div", 84)(25, "p-button", 85);
    \u0275\u0275listener("onClick", function Requests_ng_template_20_Template_p_button_onClick_25_listener() {
      const request_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDetails(request_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p-button", 86);
    \u0275\u0275listener("onClick", function Requests_ng_template_20_Template_p_button_onClick_26_listener() {
      const request_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.analyze(request_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(27, Requests_ng_template_20_Conditional_27_Template, 2, 6);
    \u0275\u0275elementStart(28, "p-button", 87);
    \u0275\u0275listener("onClick", function Requests_ng_template_20_Template_p_button_onClick_28_listener() {
      const request_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(request_r5));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const request_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("title", request_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r5.id.slice(0, 8));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r5.category);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", request_r5.priority)("severity", ctx_r1.prioritySeverity(request_r5.priority));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", request_r5.status)("severity", ctx_r1.statusSeverity(request_r5.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.userName(request_r5.citizen_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 23, request_r5.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r5.location);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.institutName(request_r5.institut_id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.agentName(request_r5.assigned_agent_id));
    \u0275\u0275advance(3);
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Consulter la demande \xAB " + request_r5.title + " \xBB");
    \u0275\u0275advance();
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Analyser avec l\u2019IA la demande \xAB " + request_r5.title + " \xBB");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isOpen(request_r5.status) ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("rounded", true)("text", true)("ariaLabel", "Supprimer la demande \xAB " + request_r5.title + " \xBB");
  }
}
function Requests_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 90);
    \u0275\u0275text(2, "Aucune demande ne correspond aux crit\xE8res.");
    \u0275\u0275elementEnd()();
  }
}
function Requests_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "Le formulaire contient des erreurs : corrigez les champs signal\xE9s.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Le titre est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Choisissez une cat\xE9gorie.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "La description est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Choisissez le citoyen concern\xE9.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "La localisation est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_ng_template_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function Requests_ng_template_80_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 92);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", ctx_r1.saving());
  }
}
function Requests_Conditional_83_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 35);
    \u0275\u0275text(1, "Le formulaire contient des erreurs : corrigez les champs signal\xE9s.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Le titre est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "La description est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 102);
    \u0275\u0275text(1, "La demande partira \xE0 l'institut de cette cat\xE9gorie ; l'agent actuel sera retir\xE9.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Choisissez une cat\xE9gorie.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "Choisissez une priorit\xE9.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "La localisation est obligatoire.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 93, 13);
    \u0275\u0275listener("ngSubmit", function Requests_Conditional_83_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r9);
      const editFormRef_r10 = \u0275\u0275reference(1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveEdit(editFormRef_r10));
    });
    \u0275\u0275elementStart(2, "p", 33);
    \u0275\u0275text(3, "Les champs marqu\xE9s d\u2019un ast\xE9risque (");
    \u0275\u0275elementStart(4, "span", 34);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, ") sont obligatoires.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, Requests_Conditional_83_Conditional_7_Template, 2, 0, "p", 35);
    \u0275\u0275elementStart(8, "div", 44)(9, "label", 94);
    \u0275\u0275text(10, "Titre ");
    \u0275\u0275elementStart(11, "span", 37);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "input", 95, 14);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_83_Template_input_ngModelChange_13_listener($event) {
      const values_r11 = \u0275\u0275restoreView(_r9);
      \u0275\u0275twoWayBindingSet(values_r11.title, $event) || (values_r11.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "small", 96);
    \u0275\u0275conditionalCreate(16, Requests_Conditional_83_Conditional_16_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 44)(18, "label", 97);
    \u0275\u0275text(19, "Description ");
    \u0275\u0275elementStart(20, "span", 37);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "textarea", 98, 15);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_83_Template_textarea_ngModelChange_22_listener($event) {
      const values_r11 = \u0275\u0275restoreView(_r9);
      \u0275\u0275twoWayBindingSet(values_r11.description, $event) || (values_r11.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "small", 99);
    \u0275\u0275conditionalCreate(25, Requests_Conditional_83_Conditional_25_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "label", 100);
    \u0275\u0275text(28, "Cat\xE9gorie ");
    \u0275\u0275elementStart(29, "span", 37);
    \u0275\u0275text(30, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "p-select", 101, 16);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_83_Template_p_select_ngModelChange_31_listener($event) {
      const values_r11 = \u0275\u0275restoreView(_r9);
      \u0275\u0275twoWayBindingSet(values_r11.category, $event) || (values_r11.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(33, Requests_Conditional_83_Conditional_33_Template, 2, 0, "small", 102);
    \u0275\u0275elementStart(34, "small", 103);
    \u0275\u0275conditionalCreate(35, Requests_Conditional_83_Conditional_35_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "label", 104);
    \u0275\u0275text(38, "Priorit\xE9 ");
    \u0275\u0275elementStart(39, "span", 37);
    \u0275\u0275text(40, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "p-select", 105, 17);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_83_Template_p_select_ngModelChange_41_listener($event) {
      const values_r11 = \u0275\u0275restoreView(_r9);
      \u0275\u0275twoWayBindingSet(values_r11.priority, $event) || (values_r11.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "small", 106);
    \u0275\u0275conditionalCreate(44, Requests_Conditional_83_Conditional_44_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 44)(46, "label", 107);
    \u0275\u0275text(47, "Localisation ");
    \u0275\u0275elementStart(48, "span", 37);
    \u0275\u0275text(49, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "input", 108, 18);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_83_Template_input_ngModelChange_50_listener($event) {
      const values_r11 = \u0275\u0275restoreView(_r9);
      \u0275\u0275twoWayBindingSet(values_r11.location, $event) || (values_r11.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "small", 109);
    \u0275\u0275conditionalCreate(53, Requests_Conditional_83_Conditional_53_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const values_r11 = ctx;
    const editFormRef_r10 = \u0275\u0275reference(1);
    const editTitle_r12 = \u0275\u0275reference(14);
    const editDescription_r13 = \u0275\u0275reference(23);
    const editCategory_r14 = \u0275\u0275reference(32);
    const editPriority_r15 = \u0275\u0275reference(42);
    const editLocation_r16 = \u0275\u0275reference(51);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(editFormRef_r10.submitted && editFormRef_r10.invalid ? 7 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", values_r11.title);
    \u0275\u0275attribute("aria-invalid", editTitle_r12.invalid && editTitle_r12.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(editTitle_r12.invalid && editTitle_r12.touched ? 16 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", values_r11.description);
    \u0275\u0275attribute("aria-invalid", editDescription_r13.invalid && editDescription_r13.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(editDescription_r13.invalid && editDescription_r13.touched ? 25 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", values_r11.category);
    \u0275\u0275property("options", ctx_r1.categories)("invalid", !!editCategory_r14.invalid && !!editCategory_r14.touched);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editedRequest && values_r11.category !== ctx_r1.editedRequest.category ? 33 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(editCategory_r14.invalid && editCategory_r14.touched ? 35 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", values_r11.priority);
    \u0275\u0275property("options", ctx_r1.priorities)("invalid", !!editPriority_r15.invalid && !!editPriority_r15.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(editPriority_r15.invalid && editPriority_r15.touched ? 44 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", values_r11.location);
    \u0275\u0275attribute("aria-invalid", editLocation_r16.invalid && editLocation_r16.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(editLocation_r16.invalid && editLocation_r16.touched ? 53 : -1);
  }
}
function Requests_ng_template_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 91);
    \u0275\u0275listener("click", function Requests_ng_template_84_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 110);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", ctx_r1.saving());
  }
}
function Requests_Conditional_87_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 118);
    \u0275\u0275element(1, "i", 119);
    \u0275\u0275text(2, "La demande passera \xAB En cours \xBB.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 112)(3, "div")(4, "label", 113);
    \u0275\u0275text(5, "Agent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p-select", 114);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_87_Template_p_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignAgentId, $event) || (ctx_r1.assignAgentId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "label", 115);
    \u0275\u0275text(9, "Intervention pr\xE9vue le ");
    \u0275\u0275elementStart(10, "span", 116);
    \u0275\u0275text(11, "(facultatif)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "input", 117);
    \u0275\u0275twoWayListener("ngModelChange", function Requests_Conditional_87_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.assignScheduledAt, $event) || (ctx_r1.assignScheduledAt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, Requests_Conditional_87_Conditional_13_Template, 3, 0, "small", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r19 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\xAB ", request_r19.title, " \xBB \xB7 ", ctx_r1.institutName(request_r19.institut_id));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignAgentId);
    \u0275\u0275property("options", ctx_r1.agentOptions(request_r19));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.assignScheduledAt);
    \u0275\u0275advance();
    \u0275\u0275conditional(request_r19.status !== "En cours" ? 13 : -1);
  }
}
function Requests_ng_template_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 120);
    \u0275\u0275listener("onClick", function Requests_ng_template_88_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.assignDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "p-button", 121);
    \u0275\u0275listener("onClick", function Requests_ng_template_88_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveAssign());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", !ctx_r1.assignAgentId || ctx_r1.saving());
  }
}
function Requests_Conditional_91_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 132)(1, "span", 82);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 123);
    \u0275\u0275text(4);
    \u0275\u0275elementStart(5, "time");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const event_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.eventLabel(event_r21));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xB7 ", event_r21.actor_name ?? "Syst\xE8me", " \xB7 ");
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", event_r21.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 4, event_r21.created_at, "dd/MM/yyyy HH:mm"));
  }
}
function Requests_Conditional_91_ForEmpty_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 133);
    \u0275\u0275text(1, "Chargement de l'historique\u2026");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 122)(1, "div")(2, "dt", 123);
    \u0275\u0275text(3, "R\xE9f\xE9rence");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd", 124);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "dt", 123);
    \u0275\u0275text(8, "Date de cr\xE9ation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd", 125);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 126)(13, "dt", 123);
    \u0275\u0275text(14, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dd", 127);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 126)(18, "dt", 123);
    \u0275\u0275text(19, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd", 128);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "dt", 123);
    \u0275\u0275text(24, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd", 125);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div")(28, "dt", 123);
    \u0275\u0275text(29, "Institut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dd", 125);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "dt", 123);
    \u0275\u0275text(34, "Priorit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "dd", 125);
    \u0275\u0275element(36, "p-tag", 83);
    \u0275\u0275elementStart(37, "span", 129);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div")(40, "dt", 123);
    \u0275\u0275text(41, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "dd", 125);
    \u0275\u0275element(43, "p-tag", 83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div")(45, "dt", 123);
    \u0275\u0275text(46, "Citoyen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "dd", 125);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div")(50, "dt", 123);
    \u0275\u0275text(51, "Agent assign\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "dd", 125);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 126)(55, "dt", 123);
    \u0275\u0275text(56, "Localisation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "dd", 125);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "h3", 130);
    \u0275\u0275text(60, "Historique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "ol", 131);
    \u0275\u0275repeaterCreate(62, Requests_Conditional_91_For_63_Template, 8, 7, "li", 132, _forTrack0, false, Requests_Conditional_91_ForEmpty_64_Template, 2, 0, "li", 133);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r22 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", request_r22.id.slice(0, 8));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 15, request_r22.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(request_r22.title);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r22.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r22.category);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.institutName(request_r22.institut_id));
    \u0275\u0275advance(5);
    \u0275\u0275property("value", request_r22.priority)("severity", ctx_r1.prioritySeverity(request_r22.priority));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("score ", request_r22.priority_score, "/100");
    \u0275\u0275advance(5);
    \u0275\u0275property("value", request_r22.status)("severity", ctx_r1.statusSeverity(request_r22.status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.userName(request_r22.citizen_id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.agentName(request_r22.assigned_agent_id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r22.location);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.timeline());
  }
}
function Requests_ng_template_92_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 138);
    \u0275\u0275listener("onClick", function Requests_ng_template_92_Conditional_0_Conditional_2_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r25);
      const request_r24 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openAssign(request_r24));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("outlined", true);
  }
}
function Requests_ng_template_92_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 139);
    \u0275\u0275listener("onClick", function Requests_ng_template_92_Conditional_0_For_4_Template_p_button_onClick_0_listener() {
      const action_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const request_r24 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changeStatus(request_r24, action_r27.target));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r27 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("label", action_r27.label)("severity", action_r27.danger ? "danger" : "primary")("outlined", action_r27.danger)("loading", ctx_r1.saving());
  }
}
function Requests_ng_template_92_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 134)(1, "p-button", 135);
    \u0275\u0275listener("onClick", function Requests_ng_template_92_Conditional_0_Template_p_button_onClick_1_listener() {
      const request_r24 = \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.analyze(request_r24));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, Requests_ng_template_92_Conditional_0_Conditional_2_Template, 1, 1, "p-button", 136);
    \u0275\u0275repeaterCreate(3, Requests_ng_template_92_Conditional_0_For_4_Template, 1, 4, "p-button", 137, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r24 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isOpen(request_r24.status) ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.statusActions(request_r24));
  }
}
function Requests_ng_template_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, Requests_ng_template_92_Conditional_0_Template, 5, 2, "div", 134);
  }
  if (rf & 2) {
    let tmp_19_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_19_0 = ctx_r1.selectedRequest()) ? 0 : -1, tmp_19_0);
  }
}
function Requests_ng_template_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 140);
    \u0275\u0275element(1, "i", 141);
    \u0275\u0275text(2, "Analyse IA de la demande");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const analysisDialog_r28 = \u0275\u0275reference(95);
    \u0275\u0275property("id", analysisDialog_r28.ariaLabelledBy);
  }
}
function Requests_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xAB ", ctx.title, " \xBB");
  }
}
function Requests_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "i", 142);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Analyse en cours\u2026");
    \u0275\u0275elementEnd()();
  }
}
function Requests_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275element(1, "i", 143);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.analysisError());
  }
}
function Requests_Conditional_101_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 145);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(actuellement : ", ctx_r1.analyzedRequest.category, ")");
  }
}
function Requests_Conditional_101_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 129);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(actuellement : ", ctx_r1.analyzedRequest.priority, ")");
  }
}
function Requests_Conditional_101_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 147);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 118);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const agent_r29 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(agent_r29.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" \u2014 ", agent_r29.institut_name, " \xB7 ", agent_r29.interventions, " intervention(s)");
  }
}
function Requests_Conditional_101_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 118);
    \u0275\u0275text(1, "Aucun agent adapt\xE9 parmi les agents actifs de l'institut.");
    \u0275\u0275elementEnd();
  }
}
function Requests_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 144)(1, "div")(2, "dt", 123);
    \u0275\u0275text(3, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "dd", 127);
    \u0275\u0275text(5);
    \u0275\u0275conditionalCreate(6, Requests_Conditional_101_Conditional_6_Template, 2, 1, "span", 145);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "dt", 123);
    \u0275\u0275text(9, "Priorit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd", 125);
    \u0275\u0275element(11, "p-tag", 83);
    \u0275\u0275conditionalCreate(12, Requests_Conditional_101_Conditional_12_Template, 2, 1, "span", 129);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 126)(14, "dt", 123);
    \u0275\u0275text(15, "R\xE9sum\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd", 125);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 126)(19, "dt", 123);
    \u0275\u0275text(20, "Agent recommand\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd", 125);
    \u0275\u0275conditionalCreate(22, Requests_Conditional_101_Conditional_22_Template, 4, 3)(23, Requests_Conditional_101_Conditional_23_Template, 2, 0, "span", 118);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 126)(25, "dt", 123);
    \u0275\u0275text(26, "Raison");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "dd", 128);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "p", 146);
    \u0275\u0275element(30, "i", 119);
    \u0275\u0275text(31, "Suggestion g\xE9n\xE9r\xE9e par IA : v\xE9rifiez-la avant de l'appliquer.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    const result_r30 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", result_r30.category, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.analyzedRequest && ctx_r1.analyzedRequest.category !== result_r30.category ? 6 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", result_r30.priority)("severity", ctx_r1.prioritySeverity(result_r30.priority));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.analyzedRequest && ctx_r1.analyzedRequest.priority !== result_r30.priority ? 12 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(result_r30.summary);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_26_0 = result_r30.recommended_agent) ? 22 : 23, tmp_26_0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(result_r30.reason);
  }
}
function Requests_ng_template_102_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 151);
    \u0275\u0275listener("onClick", function Requests_ng_template_102_Conditional_1_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r32);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.analyze(ctx_r1.analyzedRequest));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("outlined", true);
  }
}
function Requests_ng_template_102_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 152);
    \u0275\u0275listener("onClick", function Requests_ng_template_102_Conditional_2_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.applyAnalysis());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("loading", ctx_r1.applyingAnalysis());
  }
}
function Requests_ng_template_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 148);
    \u0275\u0275listener("onClick", function Requests_ng_template_102_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r31);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.analysisDialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(1, Requests_ng_template_102_Conditional_1_Template, 1, 1, "p-button", 149);
    \u0275\u0275conditionalCreate(2, Requests_ng_template_102_Conditional_2_Template, 1, 1, "p-button", 150);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.analysisError() && ctx_r1.analyzedRequest ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.analysis() ? 2 : -1);
  }
}
var EMPTY_SUBMIT = { title: "", description: "", category: "Autre", location: "", citizen_id: "" };
var SORT_FIELDS = ["created_at", "title", "category", "priority", "status"];
var STATUS_ACTION_LABELS = {
  Nouveau: "Nouveau",
  "En cours": "Prendre en charge",
  "En attente": "Mettre en attente",
  R\u00E9solu: "Marquer r\xE9solue",
  Rejet\u00E9: "Rejeter"
};
var Requests = class _Requests {
  requestService = inject(CitizenRequestService);
  userService = inject(UserService);
  agentService = inject(AgentService);
  institutService = inject(InstitutService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  destroyRef = inject(DestroyRef);
  live = inject(LiveDataService);
  requestQueries = new Subject();
  searchChanges = new Subject();
  auth = inject(AuthService);
  requests = signal([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  userNames = computed(() => new Map(this.users().map((user) => [user.id, user.name])), ...ngDevMode ? [{ debugName: "userNames" }] : []);
  userOptions = computed(() => this.users().map((user) => ({ label: `${user.name} (${user.email})`, value: user.id })), ...ngDevMode ? [{ debugName: "userOptions" }] : []);
  agents = signal([], ...ngDevMode ? [{ debugName: "agents" }] : []);
  agentNames = computed(() => new Map(this.agents().map((agent) => [agent.id, agent.name])), ...ngDevMode ? [{ debugName: "agentNames" }] : []);
  instituts = signal([], ...ngDevMode ? [{ debugName: "instituts" }] : []);
  institutNames = computed(() => new Map(this.instituts().map((institut) => [institut.id, institut.name])), ...ngDevMode ? [{ debugName: "institutNames" }] : []);
  total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  categories = [...REQUEST_CATEGORIES];
  priorities = [...REQUEST_PRIORITIES];
  statuses = [...REQUEST_STATUSES];
  statusSeverity = requestStatusSeverity;
  prioritySeverity = requestPrioritySeverity;
  eventLabel = eventLabel;
  isOpen = isOpen;
  first = 0;
  pageSize = 10;
  sortBy = "created_at";
  sortOrder = "desc";
  searchText = "";
  categoryFilter = null;
  priorityFilter = null;
  statusFilter = null;
  submitDialogVisible = false;
  submitForm = __spreadValues({}, EMPTY_SUBMIT);
  editDialogVisible = false;
  editedRequest = null;
  editForm = null;
  detailsDialogVisible = false;
  selectedRequest = signal(null, ...ngDevMode ? [{ debugName: "selectedRequest" }] : []);
  timeline = signal([], ...ngDevMode ? [{ debugName: "timeline" }] : []);
  assignDialogVisible = false;
  assignedRequest = null;
  assignAgentId = null;
  assignScheduledAt = "";
  // Analyse IA : suggestion affichée dans une fenêtre, appliquée seulement sur validation.
  analysisDialogVisible = false;
  analyzedRequest = null;
  analysis = signal(null, ...ngDevMode ? [{ debugName: "analysis" }] : []);
  analysisError = signal(null, ...ngDevMode ? [{ debugName: "analysisError" }] : []);
  analyzing = signal(false, ...ngDevMode ? [{ debugName: "analyzing" }] : []);
  applyingAnalysis = signal(false, ...ngDevMode ? [{ debugName: "applyingAnalysis" }] : []);
  constructor() {
    this.requestQueries.pipe(switchMap((query) => {
      this.loading.set(true);
      return this.requestService.list(query).pipe(tap((page) => {
        this.requests.set(page.items);
        this.total.set(page.total);
      }), catchError((error) => {
        this.showError(error);
        return EMPTY;
      }), finalize(() => this.loading.set(false)));
    }), takeUntilDestroyed(this.destroyRef)).subscribe();
    this.searchChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.resetAndLoad());
  }
  ngOnInit() {
    this.live.watch(this.destroyRef, () => this.loadRequests(), () => !this.loading() && !this.saving() && !this.submitDialogVisible && !this.editDialogVisible && !this.detailsDialogVisible && !this.assignDialogVisible && !this.analysisDialogVisible);
    this.userService.list().subscribe({ next: (users) => this.users.set(users), error: (error) => this.showError(error) });
    this.agentService.list().subscribe({ next: (agents) => this.agents.set(agents), error: (error) => this.showError(error) });
    this.institutService.list().subscribe({ next: (instituts) => this.instituts.set(instituts), error: (error) => this.showError(error) });
  }
  // ─── Liste ──────────────────────────────────────────────────────
  onLazyLoad(event) {
    this.first = event.first ?? this.first;
    this.pageSize = event.rows ?? this.pageSize;
    if (typeof event.sortField === "string" && SORT_FIELDS.includes(event.sortField)) {
      this.sortBy = event.sortField;
    }
    if (event.sortOrder === 1 || event.sortOrder === -1) {
      this.sortOrder = event.sortOrder === 1 ? "asc" : "desc";
    }
    this.loadRequests();
  }
  onSearchChange(value) {
    this.searchText = value;
    this.searchChanges.next(value);
  }
  applyFilters() {
    this.resetAndLoad();
  }
  clearFilters() {
    this.searchText = "";
    this.categoryFilter = null;
    this.priorityFilter = null;
    this.statusFilter = null;
    this.resetAndLoad();
  }
  loadRequests() {
    this.requestQueries.next({
      page: Math.floor(this.first / this.pageSize) + 1,
      page_size: this.pageSize,
      search: this.searchText.trim() || void 0,
      category: this.categoryFilter ?? void 0,
      priority: this.priorityFilter ?? void 0,
      status: this.statusFilter ?? void 0,
      sort_by: this.sortBy,
      sort_order: this.sortOrder
    });
  }
  // ─── Création pour un citoyen ───────────────────────────────────
  openSubmit() {
    this.submitForm = __spreadValues({}, EMPTY_SUBMIT);
    this.submitDialogVisible = true;
  }
  submit(form) {
    if (form.invalid || this.saving()) {
      form.control.markAllAsTouched();
      return;
    }
    const payload = __spreadProps(__spreadValues({}, this.submitForm), {
      title: this.submitForm.title.trim(),
      description: this.submitForm.description.trim(),
      location: this.submitForm.location.trim()
    });
    this.run(this.requestService.submit(payload), "Demande enregistr\xE9e", () => this.submitDialogVisible = false);
  }
  // ─── Modification du contenu ────────────────────────────────────
  openEdit(request) {
    this.editedRequest = request;
    this.editForm = { title: request.title, description: request.description, location: request.location, category: request.category, priority: request.priority };
    this.editDialogVisible = true;
  }
  saveEdit(form) {
    const request = this.editedRequest;
    const values = this.editForm;
    if (!request || !values || form.invalid || this.saving()) {
      form.control.markAllAsTouched();
      return;
    }
    const changes = {};
    if (values.title.trim() !== request.title)
      changes.title = values.title.trim();
    if (values.description.trim() !== request.description)
      changes.description = values.description.trim();
    if (values.location.trim() !== request.location)
      changes.location = values.location.trim();
    if (values.category !== request.category)
      changes.category = values.category;
    if (values.priority !== request.priority)
      changes.priority = values.priority;
    const rerouted = changes.category !== void 0;
    this.run(this.requestService.edit(request.id, changes), rerouted ? "Demande modifi\xE9e et transmise \xE0 l'institut de la nouvelle cat\xE9gorie" : "Demande modifi\xE9e", () => this.editDialogVisible = false);
  }
  // ─── Détail, historique et cycle de vie ─────────────────────────
  openDetails(request) {
    this.selectedRequest.set(request);
    this.timeline.set([]);
    this.detailsDialogVisible = true;
    this.requestService.events(request.id).subscribe({
      next: (events) => this.timeline.set(events),
      error: (error) => this.showError(error)
    });
  }
  statusActions(request) {
    return STATUS_TRANSITIONS[request.status].map((target) => ({ target, label: STATUS_ACTION_LABELS[target], danger: target === "Rejet\xE9" }));
  }
  changeStatus(request, target) {
    const apply = () => this.run(this.requestService.changeStatus(request.id, target), `Statut : ${target}`, (updated) => {
      if (this.detailsDialogVisible)
        this.openDetails(updated);
    });
    if (target === "Rejet\xE9") {
      this.confirmationService.confirm({
        message: `Rejeter la demande \xAB ${request.title} \xBB ? Ce statut est d\xE9finitif.`,
        header: "Rejeter la demande",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Rejeter",
        rejectLabel: "Annuler",
        acceptButtonProps: { severity: "danger" },
        rejectButtonProps: { severity: "secondary", outlined: true },
        accept: apply
      });
      return;
    }
    apply();
  }
  // ─── Attribution ────────────────────────────────────────────────
  /** Agents actifs de l'institut de la demande (tous les actifs pour une demande sans institut). */
  agentOptions(request) {
    return this.agents().filter((agent) => agent.is_active && (!request?.institut_id || agent.institut_id === request.institut_id)).map((agent) => ({ label: `${agent.name} \u2014 ${agent.institut_name}`, value: agent.id }));
  }
  openAssign(request) {
    this.assignedRequest = request;
    this.assignAgentId = request.assigned_agent_id;
    this.assignScheduledAt = request.scheduled_at ? request.scheduled_at.slice(0, 16) : "";
    this.detailsDialogVisible = false;
    this.assignDialogVisible = true;
  }
  saveAssign() {
    const request = this.assignedRequest;
    if (!request || !this.assignAgentId || this.saving())
      return;
    const payload = { agent_id: this.assignAgentId, scheduled_at: this.assignScheduledAt ? new Date(this.assignScheduledAt).toISOString() : null };
    this.run(this.requestService.assign(request.id, payload), "Demande attribu\xE9e", () => this.assignDialogVisible = false);
  }
  // ─── Analyse IA ─────────────────────────────────────────────────
  analyze(request) {
    this.analyzedRequest = request;
    this.analysis.set(null);
    this.analysisError.set(null);
    this.detailsDialogVisible = false;
    this.analysisDialogVisible = true;
    this.analyzing.set(true);
    this.requestService.analyze(request.id).pipe(finalize(() => this.analyzing.set(false))).subscribe({
      next: (analysis) => this.analysis.set(analysis),
      error: (error) => this.analysisError.set(analysisErrorMessage(error))
    });
  }
  /** Applique catégorie et priorité suggérées, puis attribue l'agent recommandé si la demande est ouverte. */
  applyAnalysis() {
    const request = this.analyzedRequest;
    const analysis = this.analysis();
    if (!request || !analysis || this.applyingAnalysis())
      return;
    const changes = {};
    if (analysis.category !== request.category)
      changes.category = analysis.category;
    if (analysis.priority !== request.priority)
      changes.priority = analysis.priority;
    const agent = analysis.recommended_agent;
    this.applyingAnalysis.set(true);
    this.requestService.edit(request.id, changes).pipe(switchMap((updated) => agent && isOpen(updated.status) ? this.requestService.assign(updated.id, { agent_id: agent.id }) : of(updated)), finalize(() => this.applyingAnalysis.set(false))).subscribe({
      next: () => {
        this.analysisDialogVisible = false;
        this.showSuccess("Suggestions de l'IA appliqu\xE9es");
        this.loadRequests();
      },
      error: (error) => this.showError(error)
    });
  }
  // ─── Suppression ────────────────────────────────────────────────
  confirmDelete(request) {
    this.confirmationService.confirm({
      message: `Supprimer la demande \xAB ${request.title} \xBB ?`,
      header: "Confirmer la suppression",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Supprimer",
      rejectLabel: "Annuler",
      acceptButtonProps: { severity: "danger" },
      rejectButtonProps: { severity: "secondary", outlined: true },
      accept: () => this.requestService.delete(request.id).subscribe({
        next: () => {
          if (this.requests().length === 1 && this.first > 0) {
            this.first = Math.max(0, this.first - this.pageSize);
          }
          this.showSuccess("Demande supprim\xE9e");
          this.loadRequests();
        },
        error: (error) => this.showError(error)
      })
    });
  }
  // ─── Affichage ──────────────────────────────────────────────────
  userName(id) {
    return this.userNames().get(id) ?? id.slice(0, 8);
  }
  agentName(id) {
    return id === null ? "Non assign\xE9" : this.agentNames().get(id) ?? "Agent inconnu";
  }
  institutName(id) {
    return id === null ? "Administration" : this.institutNames().get(id) ?? "\u2014";
  }
  run(action, success, done) {
    this.saving.set(true);
    action.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (updated) => {
        done(updated);
        this.showSuccess(success);
        this.loadRequests();
      },
      error: (error) => this.showError(error)
    });
  }
  resetAndLoad() {
    this.first = 0;
    this.loadRequests();
  }
  showSuccess(detail) {
    this.messageService.add({ severity: "success", summary: "Succ\xE8s", detail, life: 3e3 });
  }
  showError(error) {
    this.messageService.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function Requests_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Requests)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Requests, selectors: [["app-requests"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 104, vars: 78, consts: [["start", ""], ["end", ""], ["header", ""], ["body", ""], ["emptymessage", ""], ["submitFormRef", "ngForm"], ["submitTitle", "ngModel"], ["submitCategory", "ngModel"], ["submitDescription", "ngModel"], ["submitCitizen", "ngModel"], ["submitLocation", "ngModel"], ["footer", ""], ["analysisDialog", ""], ["editFormRef", "ngForm"], ["editTitle", "ngModel"], ["editDescription", "ngModel"], ["editCategory", "ngModel"], ["editPriority", "ngModel"], ["editLocation", "ngModel"], [1, "card"], ["styleClass", "mb-5"], [1, "mb-5", "grid", "grid-cols-1", "gap-3", "md:grid-cols-2", "xl:grid-cols-4"], ["styleClass", "pi pi-search", "aria-hidden", "true"], ["pInputText", "", "type", "search", "aria-label", "Rechercher une demande", "placeholder", "Rechercher...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["placeholder", "Toutes les cat\xE9gories", "ariaLabel", "Filtrer par cat\xE9gorie", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["placeholder", "Tous les statuts", "ariaLabel", "Filtrer par statut", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], ["placeholder", "Toutes les priorit\xE9s", "ariaLabel", "Filtrer par priorit\xE9", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "showClear"], [1, "mb-4", "flex", "justify-end"], ["label", "R\xE9initialiser les filtres", "icon", "pi pi-filter-slash", "severity", "secondary", 3, "onClick", "text"], ["role", "region", "aria-label", "Liste des demandes citoyennes", "dataKey", "id", "currentPageReportTemplate", "Affichage {first} \xE0 {last} sur {totalRecords} demandes", 3, "onLazyLoad", "value", "lazy", "paginator", "first", "rows", "rowsPerPageOptions", "totalRecords", "loading", "sortField", "sortOrder", "tableStyle", "rowHover", "showCurrentPageReport"], ["header", "Saisir une demande pour un citoyen", 3, "visibleChange", "visible", "modal"], [1, "mt-0", "text-sm", "text-muted-color"], ["id", "submitForm", "novalidate", "", 1, "grid", "grid-cols-1", "gap-4", "md:grid-cols-2", 3, "ngSubmit"], [1, "m-0", "text-sm", "text-muted-color", "md:col-span-2"], ["aria-hidden", "true"], ["role", "alert", 1, "m-0", "rounded-border", "border", "border-red-300", "bg-red-50", "p-3", "text-sm", "text-red-700", "md:col-span-2", "dark:border-red-800", "dark:bg-red-950", "dark:text-red-100"], ["for", "submit-title", 1, "mb-2", "block", "font-semibold"], ["aria-hidden", "true", 1, "text-red-600"], ["pInputText", "", "id", "submit-title", "name", "title", "required", "", "maxlength", "255", "aria-describedby", "submit-title-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "submit-title-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], [1, "block", "pt-1"], ["for", "submit-category", "id", "submit-category-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "submit-category", "name", "category", "required", "", "ariaLabelledBy", "submit-category-label submit-category-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "invalid"], ["id", "submit-category-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], [1, "md:col-span-2"], ["for", "submit-description", 1, "mb-2", "block", "font-semibold"], ["pTextarea", "", "id", "submit-description", "name", "description", "required", "", "maxlength", "10000", "rows", "4", "aria-describedby", "submit-description-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "submit-description-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "submit-citizen", "id", "submit-citizen-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "submit-citizen", "name", "citizen_id", "optionLabel", "label", "optionValue", "value", "ariaFilterLabel", "Rechercher un citoyen", "placeholder", "S\xE9lectionner un citoyen", "required", "", "ariaLabelledBy", "submit-citizen-label submit-citizen-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "filter", "invalid"], ["id", "submit-citizen-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "submit-location", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "submit-location", "name", "location", "required", "", "maxlength", "500", "aria-describedby", "submit-location-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "submit-location-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["header", "Modifier la demande", 3, "visibleChange", "visible", "modal"], ["id", "editForm", "novalidate", "", 1, "grid", "grid-cols-1", "gap-4", "md:grid-cols-2"], ["header", "Attribuer la demande", 3, "visibleChange", "visible", "modal"], ["header", "D\xE9tail de la demande", 3, "visibleChange", "visible", "modal"], ["header", "Analyse IA de la demande", 3, "visibleChange", "visible", "modal"], [1, "mt-0", "mb-5", "text-muted-color"], ["role", "status", "aria-live", "polite", 1, "flex", "flex-col", "items-center", "gap-3", "py-10", "text-muted-color"], ["role", "alert", 1, "flex", "items-start", "gap-3", "rounded-border", "bg-red-50", "p-4", "text-red-700", "dark:bg-red-400/10", "dark:text-red-300"], [1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "gap-2"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], ["label", "Saisir pour un citoyen", "icon", "pi pi-plus", 3, "onClick"], [2, "min-width", "6rem"], ["pSortableColumn", "title", 2, "min-width", "14rem"], ["field", "title"], ["pSortableColumn", "category", 2, "min-width", "11rem"], ["field", "category"], ["pSortableColumn", "priority", 2, "min-width", "8rem"], ["field", "priority"], ["pSortableColumn", "status", 2, "min-width", "9rem"], ["field", "status"], [2, "min-width", "10rem"], ["pSortableColumn", "created_at", 2, "min-width", "10rem"], ["field", "created_at"], [2, "min-width", "12rem"], [2, "width", "13rem"], [1, "font-mono", "text-xs", 3, "title"], [1, "font-medium"], [3, "value", "severity"], [1, "flex", "gap-1"], ["icon", "pi pi-eye", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-sparkles", "severity", "help", "pTooltip", "Analyser la demande", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-trash", "severity", "danger", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-user-plus", "pTooltip", "Attribuer", "tooltipPosition", "top", 3, "onClick", "rounded", "text", "ariaLabel"], ["icon", "pi pi-pencil", 3, "onClick", "rounded", "text", "ariaLabel"], ["colspan", "11", 1, "py-8", "text-center", "text-muted-color"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "submitForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"], ["id", "editForm", "novalidate", "", 1, "grid", "grid-cols-1", "gap-4", "md:grid-cols-2", 3, "ngSubmit"], ["for", "edit-title", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "edit-title", "name", "title", "required", "", "maxlength", "255", "aria-describedby", "edit-title-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "edit-title-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "edit-description", 1, "mb-2", "block", "font-semibold"], ["pTextarea", "", "id", "edit-description", "name", "description", "required", "", "maxlength", "10000", "rows", "4", "aria-describedby", "edit-description-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "edit-description-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "edit-category", "id", "edit-category-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "edit-category", "name", "category", "required", "", "ariaLabelledBy", "edit-category-label edit-category-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "invalid"], ["role", "status", 1, "mt-1", "block", "text-orange-600"], ["id", "edit-category-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "edit-priority", "id", "edit-priority-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "edit-priority", "name", "priority", "required", "", "ariaLabelledBy", "edit-priority-label edit-priority-error", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "invalid"], ["id", "edit-priority-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["for", "edit-location", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "edit-location", "name", "location", "required", "", "maxlength", "500", "aria-describedby", "edit-location-error", 1, "w-full", 3, "ngModelChange", "ngModel"], ["id", "edit-location-error", 1, "field-error", "block", "text-sm", "text-red-600", "dark:text-red-300"], ["pButton", "", "type", "submit", "form", "editForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"], [1, "mt-0", "text-muted-color"], [1, "grid", "gap-4"], ["for", "assign-agent", "id", "assign-agent-label", 1, "mb-2", "block", "font-semibold"], ["inputId", "assign-agent", "ariaLabelledBy", "assign-agent-label", "optionLabel", "label", "optionValue", "value", "placeholder", "Choisir un agent actif de l'institut", "emptyMessage", "Aucun agent actif dans cet institut", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], ["for", "assign-date", 1, "mb-2", "block", "font-semibold"], [1, "font-normal", "text-muted-color"], ["pInputText", "", "id", "assign-date", "type", "datetime-local", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-info-circle", "mr-1"], ["label", "Annuler", "severity", "secondary", 3, "onClick", "text"], ["label", "Attribuer", "icon", "pi pi-check", 3, "onClick", "loading", "disabled"], [1, "grid", "grid-cols-1", "gap-4", "sm:grid-cols-2"], [1, "text-sm", "text-muted-color"], [1, "mt-1", "font-mono", "text-sm"], [1, "mt-1"], [1, "sm:col-span-2"], [1, "mt-1", "font-semibold"], [1, "mt-1", "whitespace-pre-wrap"], [1, "ml-2", "text-sm", "text-muted-color"], [1, "mt-6", "mb-3", "text-base", "font-semibold"], ["aria-label", "Historique de la demande, du plus ancien au plus r\xE9cent", 1, "m-0", "list-none", "p-0"], [1, "border-l-2", "border-primary", "py-1", "pl-4"], ["role", "status", 1, "text-muted-color"], [1, "flex", "w-full", "flex-wrap", "justify-end", "gap-2"], ["label", "Analyser", "icon", "pi pi-sparkles", "severity", "help", 3, "onClick", "text"], ["label", "Attribuer", "icon", "pi pi-user-plus", "severity", "secondary", 3, "outlined"], [3, "label", "severity", "outlined", "loading"], ["label", "Attribuer", "icon", "pi pi-user-plus", "severity", "secondary", 3, "onClick", "outlined"], [3, "onClick", "label", "severity", "outlined", "loading"], [1, "flex", "items-center", "gap-2", "font-semibold", "text-xl", 3, "id"], ["aria-hidden", "true", 1, "pi", "pi-sparkles", "text-purple-500"], ["aria-hidden", "true", 1, "pi", "pi-spin", "pi-spinner", "text-3xl"], ["aria-hidden", "true", 1, "pi", "pi-exclamation-triangle", "mt-1"], [1, "grid", "grid-cols-1", "gap-5", "sm:grid-cols-2"], [1, "ml-1", "text-sm", "font-normal", "text-muted-color"], [1, "mt-5", "mb-0", "text-xs", "text-muted-color"], [1, "font-semibold"], ["label", "Fermer", "severity", "secondary", 3, "onClick", "text"], ["label", "R\xE9essayer", "icon", "pi pi-refresh", "severity", "secondary", 3, "outlined"], ["label", "Appliquer les suggestions", "icon", "pi pi-check", 3, "loading"], ["label", "R\xE9essayer", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined"], ["label", "Appliquer les suggestions", "icon", "pi pi-check", 3, "onClick", "loading"]], template: function Requests_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "div", 19)(3, "p-toolbar", 20);
      \u0275\u0275template(4, Requests_ng_template_4_Template, 5, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, Requests_ng_template_6_Template, 3, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 21)(9, "p-iconfield");
      \u0275\u0275element(10, "p-inputicon", 22);
      \u0275\u0275elementStart(11, "input", 23);
      \u0275\u0275listener("ngModelChange", function Requests_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "p-select", 24);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_p_select_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.categoryFilter, $event) || (ctx.categoryFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Requests_Template_p_select_ngModelChange_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p-select", 25);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_p_select_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Requests_Template_p_select_ngModelChange_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p-select", 26);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_p_select_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.priorityFilter, $event) || (ctx.priorityFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Requests_Template_p_select_ngModelChange_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 27)(16, "p-button", 28);
      \u0275\u0275listener("onClick", function Requests_Template_p_button_onClick_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearFilters());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "p-table", 29);
      \u0275\u0275listener("onLazyLoad", function Requests_Template_p_table_onLazyLoad_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onLazyLoad($event));
      });
      \u0275\u0275template(18, Requests_ng_template_18_Template, 28, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(20, Requests_ng_template_20_Template, 29, 26, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(22, Requests_ng_template_22_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "p-dialog", 30);
      \u0275\u0275twoWayListener("visibleChange", function Requests_Template_p_dialog_visibleChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitDialogVisible, $event) || (ctx.submitDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(25, "p", 31);
      \u0275\u0275text(26, "Le statut, la priorit\xE9 et l'institut destinataire sont fix\xE9s automatiquement.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "form", 32, 5);
      \u0275\u0275listener("ngSubmit", function Requests_Template_form_ngSubmit_27_listener() {
        \u0275\u0275restoreView(_r1);
        const submitFormRef_r7 = \u0275\u0275reference(28);
        return \u0275\u0275resetView(ctx.submit(submitFormRef_r7));
      });
      \u0275\u0275elementStart(29, "p", 33);
      \u0275\u0275text(30, "Les champs marqu\xE9s d\u2019un ast\xE9risque (");
      \u0275\u0275elementStart(31, "span", 34);
      \u0275\u0275text(32, "*");
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, ") sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, Requests_Conditional_34_Template, 2, 0, "p", 35);
      \u0275\u0275elementStart(35, "div")(36, "label", 36);
      \u0275\u0275text(37, "Titre ");
      \u0275\u0275elementStart(38, "span", 37);
      \u0275\u0275text(39, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "input", 38, 6);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_input_ngModelChange_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitForm.title, $event) || (ctx.submitForm.title = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "small", 39);
      \u0275\u0275conditionalCreate(43, Requests_Conditional_43_Template, 2, 0, "span", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div")(45, "label", 41);
      \u0275\u0275text(46, "Cat\xE9gorie ");
      \u0275\u0275elementStart(47, "span", 37);
      \u0275\u0275text(48, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "p-select", 42, 7);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_p_select_ngModelChange_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitForm.category, $event) || (ctx.submitForm.category = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "small", 43);
      \u0275\u0275conditionalCreate(52, Requests_Conditional_52_Template, 2, 0, "span", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 44)(54, "label", 45);
      \u0275\u0275text(55, "Description ");
      \u0275\u0275elementStart(56, "span", 37);
      \u0275\u0275text(57, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "textarea", 46, 8);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_textarea_ngModelChange_58_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitForm.description, $event) || (ctx.submitForm.description = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "small", 47);
      \u0275\u0275conditionalCreate(61, Requests_Conditional_61_Template, 2, 0, "span", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div")(63, "label", 48);
      \u0275\u0275text(64, "Citoyen ");
      \u0275\u0275elementStart(65, "span", 37);
      \u0275\u0275text(66, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "p-select", 49, 9);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_p_select_ngModelChange_67_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitForm.citizen_id, $event) || (ctx.submitForm.citizen_id = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "small", 50);
      \u0275\u0275conditionalCreate(70, Requests_Conditional_70_Template, 2, 0, "span", 40);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "div")(72, "label", 51);
      \u0275\u0275text(73, "Localisation ");
      \u0275\u0275elementStart(74, "span", 37);
      \u0275\u0275text(75, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "input", 52, 10);
      \u0275\u0275twoWayListener("ngModelChange", function Requests_Template_input_ngModelChange_76_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.submitForm.location, $event) || (ctx.submitForm.location = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "small", 53);
      \u0275\u0275conditionalCreate(79, Requests_Conditional_79_Template, 2, 0, "span", 40);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(80, Requests_ng_template_80_Template, 2, 3, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "p-dialog", 54);
      \u0275\u0275twoWayListener("visibleChange", function Requests_Template_p_dialog_visibleChange_82_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.editDialogVisible, $event) || (ctx.editDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275conditionalCreate(83, Requests_Conditional_83_Template, 54, 19, "form", 55);
      \u0275\u0275template(84, Requests_ng_template_84_Template, 2, 3, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "p-dialog", 56);
      \u0275\u0275twoWayListener("visibleChange", function Requests_Template_p_dialog_visibleChange_86_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.assignDialogVisible, $event) || (ctx.assignDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275conditionalCreate(87, Requests_Conditional_87_Template, 14, 6);
      \u0275\u0275template(88, Requests_ng_template_88_Template, 2, 3, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "p-dialog", 57);
      \u0275\u0275twoWayListener("visibleChange", function Requests_Template_p_dialog_visibleChange_90_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.detailsDialogVisible, $event) || (ctx.detailsDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275conditionalCreate(91, Requests_Conditional_91_Template, 65, 18);
      \u0275\u0275template(92, Requests_ng_template_92_Template, 1, 1, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "p-dialog", 58, 12);
      \u0275\u0275twoWayListener("visibleChange", function Requests_Template_p_dialog_visibleChange_94_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.analysisDialogVisible, $event) || (ctx.analysisDialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275template(96, Requests_ng_template_96_Template, 3, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(98, Requests_Conditional_98_Template, 2, 1, "p", 59);
      \u0275\u0275conditionalCreate(99, Requests_Conditional_99_Template, 4, 0, "div", 60)(100, Requests_Conditional_100_Template, 4, 1, "div", 61)(101, Requests_Conditional_101_Template, 32, 8);
      \u0275\u0275template(102, Requests_ng_template_102_Template, 3, 3, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_68_0;
      let tmp_72_0;
      let tmp_76_0;
      let tmp_80_0;
      let tmp_81_0;
      const submitFormRef_r7 = \u0275\u0275reference(28);
      const submitTitle_r34 = \u0275\u0275reference(41);
      const submitCategory_r35 = \u0275\u0275reference(50);
      const submitDescription_r36 = \u0275\u0275reference(59);
      const submitCitizen_r37 = \u0275\u0275reference(68);
      const submitLocation_r38 = \u0275\u0275reference(77);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(70, _c0));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.searchText);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.categories);
      \u0275\u0275twoWayProperty("ngModel", ctx.categoryFilter);
      \u0275\u0275property("showClear", true);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.statuses);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275property("showClear", true);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.priorities);
      \u0275\u0275twoWayProperty("ngModel", ctx.priorityFilter);
      \u0275\u0275property("showClear", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("text", true);
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.requests())("lazy", true)("paginator", true)("first", ctx.first)("rows", ctx.pageSize)("rowsPerPageOptions", \u0275\u0275pureFunction0(71, _c1))("totalRecords", ctx.total())("loading", ctx.loading())("sortField", ctx.sortBy)("sortOrder", ctx.sortOrder === "asc" ? 1 : -1)("tableStyle", \u0275\u0275pureFunction0(72, _c2))("rowHover", true)("showCurrentPageReport", true);
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(73, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.submitDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance(10);
      \u0275\u0275conditional(submitFormRef_r7.submitted && submitFormRef_r7.invalid ? 34 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.submitForm.title);
      \u0275\u0275attribute("aria-invalid", submitTitle_r34.invalid && submitTitle_r34.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(submitTitle_r34.invalid && submitTitle_r34.touched ? 43 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.submitForm.category);
      \u0275\u0275property("options", ctx.categories)("invalid", !!submitCategory_r35.invalid && !!submitCategory_r35.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(submitCategory_r35.invalid && submitCategory_r35.touched ? 52 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.submitForm.description);
      \u0275\u0275attribute("aria-invalid", submitDescription_r36.invalid && submitDescription_r36.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(submitDescription_r36.invalid && submitDescription_r36.touched ? 61 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.submitForm.citizen_id);
      \u0275\u0275property("options", ctx.userOptions())("filter", true)("invalid", !!submitCitizen_r37.invalid && !!submitCitizen_r37.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(submitCitizen_r37.invalid && submitCitizen_r37.touched ? 70 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.submitForm.location);
      \u0275\u0275attribute("aria-invalid", submitLocation_r38.invalid && submitLocation_r38.touched);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(submitLocation_r38.invalid && submitLocation_r38.touched ? 79 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(74, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.editDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_68_0 = ctx.editForm) ? 83 : -1, tmp_68_0);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(75, _c4));
      \u0275\u0275twoWayProperty("visible", ctx.assignDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_72_0 = ctx.assignedRequest) ? 87 : -1, tmp_72_0);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(76, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.detailsDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_76_0 = ctx.selectedRequest()) ? 91 : -1, tmp_76_0);
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(77, _c5));
      \u0275\u0275twoWayProperty("visible", ctx.analysisDialogVisible);
      \u0275\u0275property("modal", true);
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_80_0 = ctx.analyzedRequest) ? 98 : -1, tmp_80_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.analyzing() ? 99 : ctx.analysisError() ? 100 : (tmp_81_0 = ctx.analysis()) ? 101 : -1, tmp_81_0);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, IconFieldModule, IconField, InputIconModule, InputIcon, InputTextModule, InputText, SelectModule, Select, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, TextareaModule, Textarea, ToastModule, Toast, ToolbarModule, Toolbar, TooltipModule, Tooltip, DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=requests.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Requests, [{
    type: Component,
    args: [{ selector: "app-requests", imports: [
      DatePipe,
      FormsModule,
      ButtonModule,
      ConfirmDialogModule,
      DialogModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule,
      SelectModule,
      TableModule,
      TagModule,
      TextareaModule,
      ToastModule,
      ToolbarModule,
      TooltipModule
    ], providers: [MessageService, ConfirmationService], template: `<p-toast />
<p-confirmdialog [style]="{ width: '28rem' }" />

<div class="card">
    <p-toolbar styleClass="mb-5">
        <ng-template #start>
            <div>
                <h1 class="m-0 text-xl font-semibold">Demandes citoyennes</h1>
                <p class="mt-1 mb-0 text-sm text-muted-color">{{ auth.hasRole('admin') ? 'Toutes les demandes de la plateforme.' : 'Les demandes re\xE7ues par votre institut.' }}</p>
            </div>
        </ng-template>
        <ng-template #end>
            <div class="flex gap-2">
                <p-button label="Actualiser" icon="pi pi-refresh" severity="secondary" [outlined]="true" [loading]="loading()" (onClick)="loadRequests()" />
                <p-button label="Saisir pour un citoyen" icon="pi pi-plus" (onClick)="openSubmit()" />
            </div>
        </ng-template>
    </p-toolbar>

    <div class="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <p-iconfield>
            <p-inputicon styleClass="pi pi-search" aria-hidden="true" />
            <input
                pInputText
                type="search"
                class="w-full"
                aria-label="Rechercher une demande"
                placeholder="Rechercher..."
                [ngModel]="searchText"
                (ngModelChange)="onSearchChange($event)"
            />
        </p-iconfield>

        <p-select
            [options]="categories"
            [(ngModel)]="categoryFilter"
            (ngModelChange)="applyFilters()"
            [showClear]="true"
            placeholder="Toutes les cat\xE9gories"
            ariaLabel="Filtrer par cat\xE9gorie"
            class="w-full"
        />
        <p-select
            [options]="statuses"
            [(ngModel)]="statusFilter"
            (ngModelChange)="applyFilters()"
            [showClear]="true"
            placeholder="Tous les statuts"
            ariaLabel="Filtrer par statut"
            class="w-full"
        />
        <p-select
            [options]="priorities"
            [(ngModel)]="priorityFilter"
            (ngModelChange)="applyFilters()"
            [showClear]="true"
            placeholder="Toutes les priorit\xE9s"
            ariaLabel="Filtrer par priorit\xE9"
            class="w-full"
        />
    </div>
    <div class="mb-4 flex justify-end">
        <p-button label="R\xE9initialiser les filtres" icon="pi pi-filter-slash" severity="secondary" [text]="true" (onClick)="clearFilters()" />
    </div>

    <p-table
        role="region"
        aria-label="Liste des demandes citoyennes"
        [value]="requests()"
        [lazy]="true"
        [paginator]="true"
        [first]="first"
        [rows]="pageSize"
        [rowsPerPageOptions]="[10, 20, 50]"
        [totalRecords]="total()"
        [loading]="loading()"
        [sortField]="sortBy"
        [sortOrder]="sortOrder === 'asc' ? 1 : -1"
        [tableStyle]="{ 'min-width': '92rem' }"
        [rowHover]="true"
        dataKey="id"
        currentPageReportTemplate="Affichage {first} \xE0 {last} sur {totalRecords} demandes"
        [showCurrentPageReport]="true"
        (onLazyLoad)="onLazyLoad($event)"
    >
        <ng-template #header>
            <tr>
                <th style="min-width: 6rem">ID</th>
                <th pSortableColumn="title" style="min-width: 14rem">Titre <p-sortIcon field="title" /></th>
                <th pSortableColumn="category" style="min-width: 11rem">Cat\xE9gorie <p-sortIcon field="category" /></th>
                <th pSortableColumn="priority" style="min-width: 8rem">Priorit\xE9 <p-sortIcon field="priority" /></th>
                <th pSortableColumn="status" style="min-width: 9rem">Statut <p-sortIcon field="status" /></th>
                <th style="min-width: 10rem">Citoyen</th>
                <th pSortableColumn="created_at" style="min-width: 10rem">Cr\xE9\xE9e le <p-sortIcon field="created_at" /></th>
                <th style="min-width: 12rem">Localisation</th>
                <th style="min-width: 10rem">Institut</th>
                <th style="min-width: 10rem">Agent assign\xE9</th>
                <th style="width: 13rem">Actions</th>
            </tr>
        </ng-template>

        <ng-template #body let-request>
            <tr>
                <td><span class="font-mono text-xs" [title]="request.id">{{ request.id.slice(0, 8) }}</span></td>
                <td class="font-medium">{{ request.title }}</td>
                <td>{{ request.category }}</td>
                <td><p-tag [value]="request.priority" [severity]="prioritySeverity(request.priority)" /></td>
                <td><p-tag [value]="request.status" [severity]="statusSeverity(request.status)" /></td>
                <td>{{ userName(request.citizen_id) }}</td>
                <td>{{ request.created_at | date: 'dd/MM/yyyy HH:mm' }}</td>
                <td>{{ request.location }}</td>
                <td>{{ institutName(request.institut_id) }}</td>
                <td>{{ agentName(request.assigned_agent_id) }}</td>
                <td>
                    <div class="flex gap-1">
                        <p-button icon="pi pi-eye" [rounded]="true" [text]="true" [ariaLabel]="'Consulter la demande \xAB ' + request.title + ' \xBB'" (onClick)="openDetails(request)" />
                        <p-button icon="pi pi-sparkles" severity="help" [rounded]="true" [text]="true" [ariaLabel]="'Analyser avec l\u2019IA la demande \xAB ' + request.title + ' \xBB'" pTooltip="Analyser la demande" tooltipPosition="top" (onClick)="analyze(request)" />
                        @if (isOpen(request.status)) {
                            <p-button icon="pi pi-user-plus" [rounded]="true" [text]="true" [ariaLabel]="'Attribuer \xE0 un agent la demande \xAB ' + request.title + ' \xBB'" pTooltip="Attribuer" tooltipPosition="top" (onClick)="openAssign(request)" />
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" [ariaLabel]="'Modifier la demande \xAB ' + request.title + ' \xBB'" (onClick)="openEdit(request)" />
                        }
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [text]="true" [ariaLabel]="'Supprimer la demande \xAB ' + request.title + ' \xBB'" (onClick)="confirmDelete(request)" />
                    </div>
                </td>
            </tr>
        </ng-template>

        <ng-template #emptymessage>
            <tr>
                <td colspan="11" class="py-8 text-center text-muted-color">Aucune demande ne correspond aux crit\xE8res.</td>
            </tr>
        </ng-template>
    </p-table>
</div>

<p-dialog [(visible)]="submitDialogVisible" header="Saisir une demande pour un citoyen" [modal]="true" [style]="{ width: 'min(48rem, 95vw)' }">
    <p class="mt-0 text-sm text-muted-color">Le statut, la priorit\xE9 et l'institut destinataire sont fix\xE9s automatiquement.</p>
    <form #submitFormRef="ngForm" id="submitForm" class="grid grid-cols-1 gap-4 md:grid-cols-2" novalidate (ngSubmit)="submit(submitFormRef)">
        <p class="m-0 text-sm text-muted-color md:col-span-2">Les champs marqu\xE9s d\u2019un ast\xE9risque (<span aria-hidden="true">*</span>) sont obligatoires.</p>
        @if (submitFormRef.submitted && submitFormRef.invalid) {
            <p role="alert" class="m-0 rounded-border border border-red-300 bg-red-50 p-3 text-sm text-red-700 md:col-span-2 dark:border-red-800 dark:bg-red-950 dark:text-red-100">Le formulaire contient des erreurs : corrigez les champs signal\xE9s.</p>
        }
        <div>
            <label for="submit-title" class="mb-2 block font-semibold">Titre <span class="text-red-600" aria-hidden="true">*</span></label>
            <input pInputText #submitTitle="ngModel" id="submit-title" name="title" [(ngModel)]="submitForm.title" required maxlength="255" aria-describedby="submit-title-error" [attr.aria-invalid]="submitTitle.invalid && submitTitle.touched" class="w-full" />
            <small id="submit-title-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (submitTitle.invalid && submitTitle.touched) {
                    <span class="block pt-1">Le titre est obligatoire.</span>
                }
            </small>
        </div>
        <div>
            <label for="submit-category" id="submit-category-label" class="mb-2 block font-semibold">Cat\xE9gorie <span class="text-red-600" aria-hidden="true">*</span></label>
            <p-select #submitCategory="ngModel" inputId="submit-category" name="category" [(ngModel)]="submitForm.category" [options]="categories" required ariaLabelledBy="submit-category-label submit-category-error" [invalid]="!!submitCategory.invalid && !!submitCategory.touched" class="w-full" />
            <small id="submit-category-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (submitCategory.invalid && submitCategory.touched) {
                    <span class="block pt-1">Choisissez une cat\xE9gorie.</span>
                }
            </small>
        </div>
        <div class="md:col-span-2">
            <label for="submit-description" class="mb-2 block font-semibold">Description <span class="text-red-600" aria-hidden="true">*</span></label>
            <textarea pTextarea #submitDescription="ngModel" id="submit-description" name="description" [(ngModel)]="submitForm.description" required maxlength="10000" rows="4" aria-describedby="submit-description-error" [attr.aria-invalid]="submitDescription.invalid && submitDescription.touched" class="w-full"></textarea>
            <small id="submit-description-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (submitDescription.invalid && submitDescription.touched) {
                    <span class="block pt-1">La description est obligatoire.</span>
                }
            </small>
        </div>
        <div>
            <label for="submit-citizen" id="submit-citizen-label" class="mb-2 block font-semibold">Citoyen <span class="text-red-600" aria-hidden="true">*</span></label>
            <p-select #submitCitizen="ngModel" inputId="submit-citizen" name="citizen_id" [(ngModel)]="submitForm.citizen_id" [options]="userOptions()" optionLabel="label" optionValue="value" [filter]="true" ariaFilterLabel="Rechercher un citoyen" placeholder="S\xE9lectionner un citoyen" required ariaLabelledBy="submit-citizen-label submit-citizen-error" [invalid]="!!submitCitizen.invalid && !!submitCitizen.touched" class="w-full" />
            <small id="submit-citizen-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (submitCitizen.invalid && submitCitizen.touched) {
                    <span class="block pt-1">Choisissez le citoyen concern\xE9.</span>
                }
            </small>
        </div>
        <div>
            <label for="submit-location" class="mb-2 block font-semibold">Localisation <span class="text-red-600" aria-hidden="true">*</span></label>
            <input pInputText #submitLocation="ngModel" id="submit-location" name="location" [(ngModel)]="submitForm.location" required maxlength="500" aria-describedby="submit-location-error" [attr.aria-invalid]="submitLocation.invalid && submitLocation.touched" class="w-full" />
            <small id="submit-location-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                @if (submitLocation.invalid && submitLocation.touched) {
                    <span class="block pt-1">La localisation est obligatoire.</span>
                }
            </small>
        </div>
    </form>
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="submitDialogVisible = false"></button>
        <button pButton type="submit" form="submitForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="saving()"></button>
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="editDialogVisible" header="Modifier la demande" [modal]="true" [style]="{ width: 'min(48rem, 95vw)' }">
    @if (editForm; as values) {
        <form #editFormRef="ngForm" id="editForm" class="grid grid-cols-1 gap-4 md:grid-cols-2" novalidate (ngSubmit)="saveEdit(editFormRef)">
            <p class="m-0 text-sm text-muted-color md:col-span-2">Les champs marqu\xE9s d\u2019un ast\xE9risque (<span aria-hidden="true">*</span>) sont obligatoires.</p>
            @if (editFormRef.submitted && editFormRef.invalid) {
                <p role="alert" class="m-0 rounded-border border border-red-300 bg-red-50 p-3 text-sm text-red-700 md:col-span-2 dark:border-red-800 dark:bg-red-950 dark:text-red-100">Le formulaire contient des erreurs : corrigez les champs signal\xE9s.</p>
            }
            <div class="md:col-span-2">
                <label for="edit-title" class="mb-2 block font-semibold">Titre <span class="text-red-600" aria-hidden="true">*</span></label>
                <input pInputText #editTitle="ngModel" id="edit-title" name="title" [(ngModel)]="values.title" required maxlength="255" aria-describedby="edit-title-error" [attr.aria-invalid]="editTitle.invalid && editTitle.touched" class="w-full" />
                <small id="edit-title-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (editTitle.invalid && editTitle.touched) {
                        <span class="block pt-1">Le titre est obligatoire.</span>
                    }
                </small>
            </div>
            <div class="md:col-span-2">
                <label for="edit-description" class="mb-2 block font-semibold">Description <span class="text-red-600" aria-hidden="true">*</span></label>
                <textarea pTextarea #editDescription="ngModel" id="edit-description" name="description" [(ngModel)]="values.description" required maxlength="10000" rows="4" aria-describedby="edit-description-error" [attr.aria-invalid]="editDescription.invalid && editDescription.touched" class="w-full"></textarea>
                <small id="edit-description-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (editDescription.invalid && editDescription.touched) {
                        <span class="block pt-1">La description est obligatoire.</span>
                    }
                </small>
            </div>
            <div>
                <label for="edit-category" id="edit-category-label" class="mb-2 block font-semibold">Cat\xE9gorie <span class="text-red-600" aria-hidden="true">*</span></label>
                <p-select #editCategory="ngModel" inputId="edit-category" name="category" [(ngModel)]="values.category" [options]="categories" required ariaLabelledBy="edit-category-label edit-category-error" [invalid]="!!editCategory.invalid && !!editCategory.touched" class="w-full" />
                @if (editedRequest && values.category !== editedRequest.category) {
                    <small class="mt-1 block text-orange-600" role="status">La demande partira \xE0 l'institut de cette cat\xE9gorie ; l'agent actuel sera retir\xE9.</small>
                }
                <small id="edit-category-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (editCategory.invalid && editCategory.touched) {
                        <span class="block pt-1">Choisissez une cat\xE9gorie.</span>
                    }
                </small>
            </div>
            <div>
                <label for="edit-priority" id="edit-priority-label" class="mb-2 block font-semibold">Priorit\xE9 <span class="text-red-600" aria-hidden="true">*</span></label>
                <p-select #editPriority="ngModel" inputId="edit-priority" name="priority" [(ngModel)]="values.priority" [options]="priorities" required ariaLabelledBy="edit-priority-label edit-priority-error" [invalid]="!!editPriority.invalid && !!editPriority.touched" class="w-full" />
                <small id="edit-priority-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (editPriority.invalid && editPriority.touched) {
                        <span class="block pt-1">Choisissez une priorit\xE9.</span>
                    }
                </small>
            </div>
            <div class="md:col-span-2">
                <label for="edit-location" class="mb-2 block font-semibold">Localisation <span class="text-red-600" aria-hidden="true">*</span></label>
                <input pInputText #editLocation="ngModel" id="edit-location" name="location" [(ngModel)]="values.location" required maxlength="500" aria-describedby="edit-location-error" [attr.aria-invalid]="editLocation.invalid && editLocation.touched" class="w-full" />
                <small id="edit-location-error" class="field-error block text-sm text-red-600 dark:text-red-300">
                    @if (editLocation.invalid && editLocation.touched) {
                        <span class="block pt-1">La localisation est obligatoire.</span>
                    }
                </small>
            </div>
        </form>
    }
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="editDialogVisible = false"></button>
        <button pButton type="submit" form="editForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="saving()"></button>
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="assignDialogVisible" header="Attribuer la demande" [modal]="true" [style]="{ width: 'min(32rem, 95vw)' }">
    @if (assignedRequest; as request) {
        <p class="mt-0 text-muted-color">\xAB {{ request.title }} \xBB \xB7 {{ institutName(request.institut_id) }}</p>
        <div class="grid gap-4">
            <div>
                <label for="assign-agent" id="assign-agent-label" class="mb-2 block font-semibold">Agent</label>
                <p-select inputId="assign-agent" ariaLabelledBy="assign-agent-label" [(ngModel)]="assignAgentId" [options]="agentOptions(request)" optionLabel="label" optionValue="value" placeholder="Choisir un agent actif de l'institut" emptyMessage="Aucun agent actif dans cet institut" class="w-full" appendTo="body" />
            </div>
            <div>
                <label for="assign-date" class="mb-2 block font-semibold">Intervention pr\xE9vue le <span class="font-normal text-muted-color">(facultatif)</span></label>
                <input pInputText id="assign-date" type="datetime-local" [(ngModel)]="assignScheduledAt" class="w-full" />
            </div>
            @if (request.status !== 'En cours') {
                <small class="text-muted-color"><i class="pi pi-info-circle mr-1" aria-hidden="true"></i>La demande passera \xAB En cours \xBB.</small>
            }
        </div>
    }
    <ng-template #footer>
        <p-button label="Annuler" severity="secondary" [text]="true" (onClick)="assignDialogVisible = false" />
        <p-button label="Attribuer" icon="pi pi-check" [loading]="saving()" [disabled]="!assignAgentId || saving()" (onClick)="saveAssign()" />
    </ng-template>
</p-dialog>

<p-dialog [(visible)]="detailsDialogVisible" header="D\xE9tail de la demande" [modal]="true" [style]="{ width: 'min(48rem, 95vw)' }">
    @if (selectedRequest(); as request) {
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><dt class="text-sm text-muted-color">R\xE9f\xE9rence</dt><dd class="mt-1 font-mono text-sm">#{{ request.id.slice(0, 8) }}</dd></div>
            <div><dt class="text-sm text-muted-color">Date de cr\xE9ation</dt><dd class="mt-1">{{ request.created_at | date: 'dd/MM/yyyy HH:mm' }}</dd></div>
            <div class="sm:col-span-2"><dt class="text-sm text-muted-color">Titre</dt><dd class="mt-1 font-semibold">{{ request.title }}</dd></div>
            <div class="sm:col-span-2"><dt class="text-sm text-muted-color">Description</dt><dd class="mt-1 whitespace-pre-wrap">{{ request.description }}</dd></div>
            <div><dt class="text-sm text-muted-color">Cat\xE9gorie</dt><dd class="mt-1">{{ request.category }}</dd></div>
            <div><dt class="text-sm text-muted-color">Institut</dt><dd class="mt-1">{{ institutName(request.institut_id) }}</dd></div>
            <div><dt class="text-sm text-muted-color">Priorit\xE9</dt><dd class="mt-1"><p-tag [value]="request.priority" [severity]="prioritySeverity(request.priority)" /> <span class="ml-2 text-sm text-muted-color">score {{ request.priority_score }}/100</span></dd></div>
            <div><dt class="text-sm text-muted-color">Statut</dt><dd class="mt-1"><p-tag [value]="request.status" [severity]="statusSeverity(request.status)" /></dd></div>
            <div><dt class="text-sm text-muted-color">Citoyen</dt><dd class="mt-1">{{ userName(request.citizen_id) }}</dd></div>
            <div><dt class="text-sm text-muted-color">Agent assign\xE9</dt><dd class="mt-1">{{ agentName(request.assigned_agent_id) }}</dd></div>
            <div class="sm:col-span-2"><dt class="text-sm text-muted-color">Localisation</dt><dd class="mt-1">{{ request.location }}</dd></div>
        </dl>

        <h3 class="mt-6 mb-3 text-base font-semibold">Historique</h3>
        <ol class="m-0 list-none p-0" aria-label="Historique de la demande, du plus ancien au plus r\xE9cent">
            @for (event of timeline(); track event.id) {
                <li class="border-l-2 border-primary py-1 pl-4">
                    <span class="font-medium">{{ eventLabel(event) }}</span>
                    <span class="text-sm text-muted-color"> \xB7 {{ event.actor_name ?? 'Syst\xE8me' }} \xB7 <time [attr.datetime]="event.created_at">{{ event.created_at | date: 'dd/MM/yyyy HH:mm' }}</time></span>
                </li>
            } @empty {
                <li class="text-muted-color" role="status">Chargement de l'historique\u2026</li>
            }
        </ol>
    }
    <ng-template #footer>
        @if (selectedRequest(); as request) {
            <div class="flex w-full flex-wrap justify-end gap-2">
                <p-button label="Analyser" icon="pi pi-sparkles" severity="help" [text]="true" (onClick)="analyze(request)" />
                @if (isOpen(request.status)) {
                    <p-button label="Attribuer" icon="pi pi-user-plus" severity="secondary" [outlined]="true" (onClick)="openAssign(request)" />
                }
                @for (action of statusActions(request); track action.target) {
                    <p-button [label]="action.label" [severity]="action.danger ? 'danger' : 'primary'" [outlined]="action.danger" [loading]="saving()" (onClick)="changeStatus(request, action.target)" />
                }
            </div>
        }
    </ng-template>
</p-dialog>

<p-dialog #analysisDialog [(visible)]="analysisDialogVisible" header="Analyse IA de la demande" [modal]="true" [style]="{ width: 'min(42rem, 95vw)' }">
    <ng-template #header>
        <div [id]="analysisDialog.ariaLabelledBy" class="flex items-center gap-2 font-semibold text-xl"><i class="pi pi-sparkles text-purple-500" aria-hidden="true"></i>Analyse IA de la demande</div>
    </ng-template>

    @if (analyzedRequest; as request) {
        <p class="mt-0 mb-5 text-muted-color">\xAB {{ request.title }} \xBB</p>
    }

    @if (analyzing()) {
        <div class="flex flex-col items-center gap-3 py-10 text-muted-color" role="status" aria-live="polite">
            <i class="pi pi-spin pi-spinner text-3xl" aria-hidden="true"></i>
            <span>Analyse en cours\u2026</span>
        </div>
    } @else if (analysisError()) {
        <div class="flex items-start gap-3 rounded-border bg-red-50 p-4 text-red-700 dark:bg-red-400/10 dark:text-red-300" role="alert">
            <i class="pi pi-exclamation-triangle mt-1" aria-hidden="true"></i>
            <span>{{ analysisError() }}</span>
        </div>
    } @else if (analysis(); as result) {
        <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
                <dt class="text-sm text-muted-color">Cat\xE9gorie</dt>
                <dd class="mt-1 font-semibold">
                    {{ result.category }}
                    @if (analyzedRequest && analyzedRequest.category !== result.category) {
                        <span class="ml-1 text-sm font-normal text-muted-color">(actuellement : {{ analyzedRequest.category }})</span>
                    }
                </dd>
            </div>
            <div>
                <dt class="text-sm text-muted-color">Priorit\xE9</dt>
                <dd class="mt-1">
                    <p-tag [value]="result.priority" [severity]="prioritySeverity(result.priority)" />
                    @if (analyzedRequest && analyzedRequest.priority !== result.priority) {
                        <span class="ml-2 text-sm text-muted-color">(actuellement : {{ analyzedRequest.priority }})</span>
                    }
                </dd>
            </div>
            <div class="sm:col-span-2">
                <dt class="text-sm text-muted-color">R\xE9sum\xE9</dt>
                <dd class="mt-1">{{ result.summary }}</dd>
            </div>
            <div class="sm:col-span-2">
                <dt class="text-sm text-muted-color">Agent recommand\xE9</dt>
                <dd class="mt-1">
                    @if (result.recommended_agent; as agent) {
                        <span class="font-semibold">{{ agent.name }}</span>
                        <span class="text-muted-color"> \u2014 {{ agent.institut_name }} \xB7 {{ agent.interventions }} intervention(s)</span>
                    } @else {
                        <span class="text-muted-color">Aucun agent adapt\xE9 parmi les agents actifs de l'institut.</span>
                    }
                </dd>
            </div>
            <div class="sm:col-span-2">
                <dt class="text-sm text-muted-color">Raison</dt>
                <dd class="mt-1 whitespace-pre-wrap">{{ result.reason }}</dd>
            </div>
        </dl>
        <p class="mt-5 mb-0 text-xs text-muted-color"><i class="pi pi-info-circle mr-1" aria-hidden="true"></i>Suggestion g\xE9n\xE9r\xE9e par IA : v\xE9rifiez-la avant de l'appliquer.</p>
    }

    <ng-template #footer>
        <p-button label="Fermer" severity="secondary" [text]="true" (onClick)="analysisDialogVisible = false" />
        @if (analysisError() && analyzedRequest) {
            <p-button label="R\xE9essayer" icon="pi pi-refresh" severity="secondary" [outlined]="true" (onClick)="analyze(analyzedRequest)" />
        }
        @if (analysis()) {
            <p-button label="Appliquer les suggestions" icon="pi pi-check" [loading]="applyingAnalysis()" (onClick)="applyAnalysis()" />
        }
    </ng-template>
</p-dialog>
`, styles: ["/* src/app/requests/requests.scss */\n:host {\n  display: block;\n}\n/*# sourceMappingURL=requests.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Requests, { className: "Requests", filePath: "src/app/requests/requests.ts", lineNumber: 108 });
})();
function analysisErrorMessage(error) {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 503 && String(error.error?.detail ?? "").includes("GEMINI_API_KEY")) {
      return "L'IA n'est pas configur\xE9e : ajoutez GEMINI_API_KEY dans le .env du backend.";
    }
    if (error.status === 503) {
      return "L'IA est momentan\xE9ment indisponible. R\xE9essayez dans quelques instants.";
    }
    if (error.status === 403) {
      return "L'analyse IA est r\xE9serv\xE9e au responsable de l'institut de la demande.";
    }
  }
  return apiErrorMessage(error);
}
export {
  Requests
};
//# sourceMappingURL=chunk-AB6Z4B7U.js.map
