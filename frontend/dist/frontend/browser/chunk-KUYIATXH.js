import {
  AuthService
} from "./chunk-BFXRYUZT.js";
import {
  takeUntilDestroyed
} from "./chunk-WC5DJJOI.js";
import "./chunk-OY2B3AGZ.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-O26HSNKS.js";
import {
  SelectModule
} from "./chunk-IHOQCUVC.js";
import "./chunk-UR4GPL7H.js";
import {
  Toast,
  ToastModule
} from "./chunk-PXE4FUQO.js";
import "./chunk-YTN6XZFY.js";
import "./chunk-ZDG3GNHS.js";
import "./chunk-JL6DBWWC.js";
import "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import {
  MessageService
} from "./chunk-UHTXY4UO.js";
import {
  CitizenRequestService
} from "./chunk-MURNZCDI.js";
import {
  REQUEST_CATEGORIES,
  REQUEST_STATUSES,
  eventLabel
} from "./chunk-ROYE6VN6.js";
import {
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  Injectable,
  __spreadValues,
  environment,
  finalize,
  forkJoin,
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
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E5MYAYBP.js";

// src/app/notifications/notification.service.ts
var NotificationService = class _NotificationService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/notifications`;
  list(limit = 20) {
    const params = new HttpParams().set("limit", limit);
    return this.http.get(this.baseUrl, { params });
  }
  markRead(key) {
    return this.http.post(`${this.baseUrl}/${encodeURIComponent(key)}/read`, {});
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/requests/my-requests.ts
var _c0 = (a0) => ["/home/my-requests", a0];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function MyRequests_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "h2", 7);
    \u0275\u0275text(2, "Votre demande a bien \xE9t\xE9 envoy\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 8);
    \u0275\u0275text(4, " R\xE9f\xE9rence ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " \xB7 envoy\xE9e le ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \xB7 statut actuel ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, ". Vous n\u2019avez pas besoin de la renvoyer. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r1 = ctx;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("#", request_r1.id.slice(0, 8));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 3, request_r1.created_at, "dd/MM/yyyy \xE0 HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(request_r1.status);
  }
}
function MyRequests_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Chargement de la demande\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_1_Conditional_7_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Chargement des \xE9tapes\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_7_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("L\u2019historique des \xE9tapes n\u2019a pas pu \xEAtre charg\xE9 : ", ctx);
  }
}
function MyRequests_Conditional_1_Conditional_7_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 13)(1, "h3", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "time", 15);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.eventLabel(step_r2));
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", step_r2.created_at);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, step_r2.created_at, "dd/MM/yyyy \xE0 HH:mm"));
  }
}
function MyRequests_Conditional_1_Conditional_7_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ol", 12);
    \u0275\u0275repeaterCreate(1, MyRequests_Conditional_1_Conditional_7_Conditional_28_For_2_Template, 6, 6, "li", 13, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.statusHistory());
  }
}
function MyRequests_Conditional_1_Conditional_7_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune \xE9tape de traitement n\u2019est encore enregistr\xE9e.");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 9);
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
    \u0275\u0275elementStart(23, "section", 10)(24, "h2", 11);
    \u0275\u0275text(25, "\xC9tapes de traitement");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, MyRequests_Conditional_1_Conditional_7_Conditional_26_Template, 2, 0, "p", 5)(27, MyRequests_Conditional_1_Conditional_7_Conditional_27_Template, 2, 1, "p", 6)(28, MyRequests_Conditional_1_Conditional_7_Conditional_28_Template, 3, 0, "ol", 12)(29, MyRequests_Conditional_1_Conditional_7_Conditional_29_Template, 2, 0, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const request_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r4.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", request_r4.id.slice(0, 8));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r4.status);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 7, request_r4.created_at, "dd/MM/yyyy \xE0 HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(request_r4.location);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.historyLoading() ? 26 : (tmp_9_0 = ctx_r2.historyError()) ? 27 : ctx_r2.statusHistory().length ? 28 : 29, tmp_9_0);
  }
}
function MyRequests_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0);
    \u0275\u0275conditionalCreate(1, MyRequests_Conditional_1_Conditional_1_Template, 15, 6, "div", 2);
    \u0275\u0275elementStart(2, "a", 3);
    \u0275\u0275element(3, "i", 4);
    \u0275\u0275text(4, " Retour \xE0 mes demandes ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, MyRequests_Conditional_1_Conditional_5_Template, 2, 0, "p", 5)(6, MyRequests_Conditional_1_Conditional_6_Template, 2, 1, "p", 6)(7, MyRequests_Conditional_1_Conditional_7_Template, 30, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.submitted() && ctx_r2.selectedRequest()) ? 1 : -1, tmp_1_0);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.loading() ? 5 : (tmp_2_0 = ctx_r2.error()) ? 6 : (tmp_2_0 = ctx_r2.selectedRequest()) ? 7 : -1, tmp_2_0);
  }
}
function MyRequests_Conditional_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_2_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 44)(1, "div")(2, "h3", 45);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 46);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 47);
    \u0275\u0275listener("click", function MyRequests_Conditional_2_Conditional_13_For_1_Template_button_click_6_listener() {
      const notification_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.markNotificationRead(notification_r7));
    });
    \u0275\u0275text(7, "Marquer comme lue");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notification_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notification_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notification_r7.message);
  }
}
function MyRequests_Conditional_2_Conditional_13_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 44)(1, "p", 48)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u2014 en attente d\u2019une action ou d\u2019informations de votre part.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 49);
    \u0275\u0275text(6, "Consulter la demande");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, request_r8.id));
  }
}
function MyRequests_Conditional_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MyRequests_Conditional_2_Conditional_13_For_1_Template, 8, 2, "article", 44, _forTrack1);
    \u0275\u0275repeaterCreate(2, MyRequests_Conditional_2_Conditional_13_For_3_Template, 7, 4, "article", 44, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.notifications());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.actionable());
  }
}
function MyRequests_Conditional_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "Aucun \xE9l\xE9ment ne n\xE9cessite votre attention pour le moment.");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_2_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r9 = ctx.$implicit;
    \u0275\u0275property("ngValue", category_r9);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r9);
  }
}
function MyRequests_Conditional_2_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_2_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", status_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r10);
  }
}
function MyRequests_Conditional_2_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Chargement de vos demandes\u2026");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_2_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyRequests_Conditional_2_Conditional_55_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 53)(1, "th", 58)(2, "a", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 59);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 59);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const request_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(8, _c0, request_r12.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(request_r12.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r12.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 5, request_r12.created_at, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(request_r12.location);
  }
}
function MyRequests_Conditional_2_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "table", 51)(2, "caption", 52);
    \u0275\u0275text(3, "Vos demandes, tri\xE9es par date de cr\xE9ation d\xE9croissante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "thead")(5, "tr", 53)(6, "th", 54);
    \u0275\u0275text(7, "Demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 54);
    \u0275\u0275text(9, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 54);
    \u0275\u0275text(11, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 54);
    \u0275\u0275text(13, "Lieu");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, MyRequests_Conditional_2_Conditional_55_For_16_Template, 11, 10, "tr", 53, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "nav", 55)(18, "button", 56);
    \u0275\u0275listener("click", function MyRequests_Conditional_2_Conditional_55_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.pageBy(-1));
    });
    \u0275\u0275text(19, "Pr\xE9c\xE9dent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 57);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 56);
    \u0275\u0275listener("click", function MyRequests_Conditional_2_Conditional_55_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.pageBy(1));
    });
    \u0275\u0275text(23, "Suivant");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.requests());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.page() <= 1 || ctx_r2.loading());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("Page ", ctx_r2.page(), " sur ", ctx_r2.pages(), " \xB7 ", ctx_r2.total(), " demande(s)");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.page() >= ctx_r2.pages() || ctx_r2.loading());
  }
}
function MyRequests_Conditional_2_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Vous n'avez pas encore envoy\xE9 de demande.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 60);
    \u0275\u0275text(3, "Envoyer ma premi\xE8re demande");
    \u0275\u0275elementEnd();
  }
}
function MyRequests_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 1)(1, "header", 16)(2, "div")(3, "h1", 17);
    \u0275\u0275text(4, "Mes demandes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6, "Retrouvez vos signalements et leur \xE9tat d\u2019avancement.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 19);
    \u0275\u0275listener("click", function MyRequests_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.load());
    });
    \u0275\u0275text(8, "Actualiser");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "section", 20)(10, "h2", 21);
    \u0275\u0275text(11, "\xC0 votre attention");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, MyRequests_Conditional_2_Conditional_12_Template, 2, 1, "p", 6)(13, MyRequests_Conditional_2_Conditional_13_Template, 4, 0)(14, MyRequests_Conditional_2_Conditional_14_Template, 2, 0, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "section", 23)(16, "h2", 24);
    \u0275\u0275text(17, "Envoyer une demande");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "form", 25);
    \u0275\u0275listener("ngSubmit", function MyRequests_Conditional_2_Template_form_ngSubmit_18_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.create());
    });
    \u0275\u0275elementStart(19, "div")(20, "label", 26);
    \u0275\u0275text(21, "Titre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_2_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.title, $event) || (ctx_r2.form.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "label", 28);
    \u0275\u0275text(25, "Cat\xE9gorie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 29);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_2_Template_select_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.category, $event) || (ctx_r2.form.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(27, MyRequests_Conditional_2_For_28_Template, 2, 2, "option", 30, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 31)(30, "label", 32);
    \u0275\u0275text(31, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "textarea", 33);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_2_Template_textarea_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.description, $event) || (ctx_r2.form.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "label", 34);
    \u0275\u0275text(35, "Lieu");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function MyRequests_Conditional_2_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.form.location, $event) || (ctx_r2.form.location = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 36)(38, "button", 37);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(40, MyRequests_Conditional_2_Conditional_40_Template, 2, 1, "p", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "section", 39)(42, "div", 40)(43, "h2", 41);
    \u0275\u0275text(44, "Historique");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "label", 42)(46, "span");
    \u0275\u0275text(47, "Filtrer par statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "select", 43);
    \u0275\u0275listener("ngModelChange", function MyRequests_Conditional_2_Template_select_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterChanged($event));
    });
    \u0275\u0275elementStart(49, "option", 30);
    \u0275\u0275text(50, "Tous les statuts");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(51, MyRequests_Conditional_2_For_52_Template, 2, 2, "option", 30, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(53, MyRequests_Conditional_2_Conditional_53_Template, 2, 0, "p", 5)(54, MyRequests_Conditional_2_Conditional_54_Template, 2, 1, "p", 6)(55, MyRequests_Conditional_2_Conditional_55_Template, 24, 5)(56, MyRequests_Conditional_2_Conditional_56_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_10_0;
    let tmp_14_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r2.loading());
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.attentionError()) ? 12 : ctx_r2.notifications().length || ctx_r2.actionable().length ? 13 : 14, tmp_2_0);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.category);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.categories);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.form.location);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.submitting() || !ctx_r2.form.title.trim() || !ctx_r2.form.description.trim() || !ctx_r2.form.location.trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.submitting() ? "Envoi en cours\u2026" : "Envoyer la demande", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_10_0 = ctx_r2.error()) ? 40 : -1, tmp_10_0);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngModel", ctx_r2.statusFilter());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.statuses);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.loading() ? 53 : (tmp_14_0 = ctx_r2.error()) ? 54 : ctx_r2.requests().length ? 55 : 56, tmp_14_0);
  }
}
var PAGE_SIZE = 10;
var EMPTY_FORM = { title: "", description: "", category: "Autre", location: "" };
var MyRequests = class _MyRequests {
  requestsApi = inject(CitizenRequestService);
  notificationsApi = inject(NotificationService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  messages = inject(MessageService);
  auth = inject(AuthService);
  requests = signal([], ...ngDevMode ? [{ debugName: "requests" }] : []);
  total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  pages = signal(1, ...ngDevMode ? [{ debugName: "pages" }] : []);
  statusFilter = signal(null, ...ngDevMode ? [{ debugName: "statusFilter" }] : []);
  selectedRequest = signal(null, ...ngDevMode ? [{ debugName: "selectedRequest" }] : []);
  statusHistory = signal([], ...ngDevMode ? [{ debugName: "statusHistory" }] : []);
  eventLabel = eventLabel;
  historyLoading = signal(false, ...ngDevMode ? [{ debugName: "historyLoading" }] : []);
  historyError = signal(null, ...ngDevMode ? [{ debugName: "historyError" }] : []);
  notifications = signal([], ...ngDevMode ? [{ debugName: "notifications" }] : []);
  actionable = signal([], ...ngDevMode ? [{ debugName: "actionable" }] : []);
  attentionError = signal(null, ...ngDevMode ? [{ debugName: "attentionError" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  submitted = signal(false, ...ngDevMode ? [{ debugName: "submitted" }] : []);
  detailMode = signal(false, ...ngDevMode ? [{ debugName: "detailMode" }] : []);
  categories = [...REQUEST_CATEGORIES];
  statuses = [...REQUEST_STATUSES];
  form = __spreadValues({}, EMPTY_FORM);
  announcedSubmissionId = null;
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get("id");
      this.detailMode.set(id !== null);
      this.submitted.set(false);
      if (id) {
        this.loadDetail(id);
      } else {
        this.selectedRequest.set(null);
        this.load();
        this.loadAttention();
      }
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.submitted.set(params.get("submitted") === "1");
      const request = this.selectedRequest();
      if (this.submitted() && request)
        this.announceSubmission(request);
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
  create() {
    if (this.submitting())
      return;
    if (!this.auth.user()) {
      this.error.set("Connectez-vous pour envoyer une demande.");
      return;
    }
    this.submitting.set(true);
    this.error.set(null);
    this.requestsApi.submit(__spreadValues({}, this.form)).pipe(finalize(() => this.submitting.set(false))).subscribe({
      next: (request) => {
        this.form = __spreadValues({}, EMPTY_FORM);
        void this.router.navigate(["/home/my-requests", request.id], { queryParams: { submitted: 1 } });
      },
      error: (error) => this.error.set(apiErrorMessage(error))
    });
  }
  pageBy(offset) {
    const next = this.page() + offset;
    if (next < 1 || next > this.pages() || this.loading())
      return;
    this.load(next);
  }
  markNotificationRead(notification) {
    this.notifications.update((items) => items.filter((item) => item.key !== notification.key));
    this.notificationsApi.markRead(notification.key).subscribe({
      error: (error) => this.attentionError.set(`La notification n\u2019a pas pu \xEAtre marqu\xE9e comme lue : ${apiErrorMessage(error)}`)
    });
  }
  loadDetail(id) {
    this.statusHistory.set([]);
    this.historyLoading.set(true);
    this.historyError.set(null);
    this.loading.set(true);
    this.error.set(null);
    this.requestsApi.get(id).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (request) => {
        this.selectedRequest.set(request);
        if (this.submitted())
          this.announceSubmission(request);
      },
      error: (error) => {
        this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? "Cette demande est introuvable." : apiErrorMessage(error));
      }
    });
    this.requestsApi.events(id).pipe(finalize(() => this.historyLoading.set(false))).subscribe({
      next: (history) => this.statusHistory.set(history),
      error: (error) => this.historyError.set(apiErrorMessage(error))
    });
  }
  loadAttention() {
    forkJoin({
      notifications: this.notificationsApi.list(),
      pending: this.requestsApi.list({
        page: 1,
        page_size: PAGE_SIZE,
        status: "En attente",
        sort_by: "created_at",
        sort_order: "desc"
      })
    }).subscribe({
      next: ({ notifications, pending }) => {
        this.notifications.set(notifications.items.filter((item) => !item.is_read));
        this.actionable.set(pending.items);
      },
      error: (error) => this.attentionError.set(`Les \xE9l\xE9ments \xE0 surveiller n\u2019ont pas pu \xEAtre charg\xE9s : ${apiErrorMessage(error)}`)
    });
  }
  announceSubmission(request) {
    if (this.announcedSubmissionId === request.id)
      return;
    this.announcedSubmissionId = request.id;
    this.messages.add({
      severity: "success",
      summary: "Demande envoy\xE9e",
      detail: `R\xE9f\xE9rence #${request.id.slice(0, 8)} \xB7 ${request.status}.`,
      life: 5e3
    });
  }
  static \u0275fac = function MyRequests_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyRequests)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyRequests, selectors: [["app-my-requests"]], features: [\u0275\u0275ProvidersFeature([MessageService])], decls: 3, vars: 1, consts: [["aria-labelledby", "request-detail-title", 1, "card"], ["aria-labelledby", "my-requests-title", 1, "card"], ["role", "status", 1, "mb-5", "rounded-lg", "border", "border-green-300", "bg-green-50", "p-4", "text-green-900", "dark:border-green-800", "dark:bg-green-950", "dark:text-green-100"], ["routerLink", "/home/my-requests", 1, "mb-4", "inline-flex", "items-center", "gap-2", "text-primary", "focus-visible:outline-2", "focus-visible:outline-offset-2"], ["aria-hidden", "true", 1, "pi", "pi-arrow-left"], ["role", "status"], ["role", "alert", 1, "text-red-600"], [1, "m-0", "text-lg", "font-semibold"], [1, "mb-0", "mt-2"], ["id", "request-detail-title"], ["aria-labelledby", "request-timeline-title", 1, "mt-8"], ["id", "request-timeline-title", 1, "text-lg", "font-semibold"], ["aria-label", "\xC9tapes de votre demande, de la plus ancienne \xE0 la plus r\xE9cente", 1, "space-y-4"], [1, "border-l-2", "border-primary", "pl-4"], [1, "m-0", "font-semibold"], [1, "text-sm", "text-muted-color"], [1, "mb-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "my-requests-title", 1, "m-0", "text-2xl", "font-semibold"], [1, "mb-0", "mt-2", "text-muted-color"], ["type", "button", 1, "rounded-lg", "border", "border-surface", "px-4", "py-2", "focus-visible:outline-2", "focus-visible:outline-offset-2", 3, "click", "disabled"], ["aria-labelledby", "attention-title", 1, "mb-8", "rounded-lg", "border", "border-surface", "p-4"], ["id", "attention-title", 1, "mt-0", "text-lg", "font-semibold"], [1, "mb-0", "text-muted-color"], ["aria-labelledby", "new-request-title", 1, "mb-8"], ["id", "new-request-title", 1, "text-lg", "font-semibold"], [1, "grid", "gap-4", "md:grid-cols-2", 3, "ngSubmit"], ["for", "request-title", 1, "mb-1", "block", "font-medium"], ["id", "request-title", "name", "title", "required", "", "maxlength", "255", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["for", "request-category", 1, "mb-1", "block", "font-medium"], ["id", "request-category", "name", "category", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [1, "md:col-span-2"], ["for", "request-description", 1, "mb-1", "block", "font-medium"], ["id", "request-description", "name", "description", "required", "", "maxlength", "10000", "rows", "4", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["for", "request-location", 1, "mb-1", "block", "font-medium"], ["id", "request-location", "name", "location", "required", "", "maxlength", "500", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], [1, "flex", "items-end"], ["type", "submit", 1, "rounded-lg", "bg-primary", "px-4", "py-3", "font-semibold", "text-white", "focus-visible:outline-2", "focus-visible:outline-offset-2", "disabled:opacity-60", 3, "disabled"], ["role", "alert", 1, "mt-3", "text-red-600"], ["aria-labelledby", "history-title"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "history-title", 1, "m-0", "text-lg", "font-semibold"], [1, "flex", "items-center", "gap-2"], ["aria-label", "Filtrer mes demandes par statut", 1, "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-surface", "py-3"], [1, "m-0", "text-base"], [1, "mb-0", "mt-1", "text-sm", "text-muted-color"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "text-sm", "focus-visible:outline-2", 3, "click"], [1, "m-0"], [1, "text-primary", "underline", 3, "routerLink"], [1, "overflow-x-auto"], [1, "w-full", "border-collapse", "text-left"], [1, "sr-only"], [1, "border-b", "border-surface"], ["scope", "col", 1, "p-3"], ["aria-label", "Pagination de mes demandes", 1, "mt-4", "flex", "items-center", "justify-between", "gap-3"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "focus-visible:outline-2", 3, "click", "disabled"], ["aria-live", "polite"], ["scope", "row", 1, "p-3", "font-medium"], [1, "p-3"], ["href", "#new-request-title", 1, "inline-flex", "rounded-lg", "bg-primary", "px-4", "py-2", "font-semibold", "text-white"]], template: function MyRequests_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast");
      \u0275\u0275conditionalCreate(1, MyRequests_Conditional_1_Template, 8, 2, "section", 0)(2, MyRequests_Conditional_2_Template, 57, 12, "section", 1);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.detailMode() ? 1 : 2);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterLink, ButtonModule, SelectModule, ToastModule, Toast, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MyRequests, [{
    type: Component,
    args: [{ selector: "app-my-requests", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, SelectModule, ToastModule], providers: [MessageService], template: `<p-toast />

@if (detailMode()) {
    <section class="card" aria-labelledby="request-detail-title">
        @if (submitted() && selectedRequest(); as request) {
            <div class="mb-5 rounded-lg border border-green-300 bg-green-50 p-4 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100" role="status">
                <h2 class="m-0 text-lg font-semibold">Votre demande a bien \xE9t\xE9 envoy\xE9e</h2>
                <p class="mb-0 mt-2">
                    R\xE9f\xE9rence <strong>#{{ request.id.slice(0, 8) }}</strong> \xB7 envoy\xE9e le
                    <strong>{{ request.created_at | date: 'dd/MM/yyyy \xE0 HH:mm' }}</strong> \xB7 statut actuel
                    <strong>{{ request.status }}</strong>. Vous n\u2019avez pas besoin de la renvoyer.
                </p>
            </div>
        }
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
    <section class="card" aria-labelledby="my-requests-title">
        <header class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
                <h1 id="my-requests-title" class="m-0 text-2xl font-semibold">Mes demandes</h1>
                <p class="mb-0 mt-2 text-muted-color">Retrouvez vos signalements et leur \xE9tat d\u2019avancement.</p>
            </div>
            <button type="button" class="rounded-lg border border-surface px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2" [disabled]="loading()" (click)="load()">Actualiser</button>
        </header>

        <section class="mb-8 rounded-lg border border-surface p-4" aria-labelledby="attention-title">
            <h2 id="attention-title" class="mt-0 text-lg font-semibold">\xC0 votre attention</h2>
            @if (attentionError(); as message) {
                <p role="alert" class="text-red-600">{{ message }}</p>
            } @else if (notifications().length || actionable().length) {
                @for (notification of notifications(); track notification.key) {
                    <article class="flex flex-wrap items-center justify-between gap-3 border-t border-surface py-3">
                        <div>
                            <h3 class="m-0 text-base">{{ notification.title }}</h3>
                            <p class="mb-0 mt-1 text-sm text-muted-color">{{ notification.message }}</p>
                        </div>
                        <button type="button" class="rounded border border-surface px-3 py-2 text-sm focus-visible:outline-2" (click)="markNotificationRead(notification)">Marquer comme lue</button>
                    </article>
                }
                @for (request of actionable(); track request.id) {
                    <article class="flex flex-wrap items-center justify-between gap-3 border-t border-surface py-3">
                        <p class="m-0"><strong>{{ request.title }}</strong> \u2014 en attente d\u2019une action ou d\u2019informations de votre part.</p>
                        <a class="text-primary underline" [routerLink]="['/home/my-requests', request.id]">Consulter la demande</a>
                    </article>
                }
            } @else {
                <p class="mb-0 text-muted-color">Aucun \xE9l\xE9ment ne n\xE9cessite votre attention pour le moment.</p>
            }
        </section>

        <section class="mb-8" aria-labelledby="new-request-title">
            <h2 id="new-request-title" class="text-lg font-semibold">Envoyer une demande</h2>
            <form class="grid gap-4 md:grid-cols-2" (ngSubmit)="create()">
                <div>
                    <label for="request-title" class="mb-1 block font-medium">Titre</label>
                    <input id="request-title" name="title" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.title" required maxlength="255" />
                </div>
                <div>
                    <label for="request-category" class="mb-1 block font-medium">Cat\xE9gorie</label>
                    <select id="request-category" name="category" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.category">
                        @for (category of categories; track category) { <option [ngValue]="category">{{ category }}</option> }
                    </select>
                </div>
                <div class="md:col-span-2">
                    <label for="request-description" class="mb-1 block font-medium">Description</label>
                    <textarea id="request-description" name="description" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.description" required maxlength="10000" rows="4"></textarea>
                </div>
                <div>
                    <label for="request-location" class="mb-1 block font-medium">Lieu</label>
                    <input id="request-location" name="location" class="w-full rounded border border-surface bg-transparent p-3" [(ngModel)]="form.location" required maxlength="500" />
                </div>
                <div class="flex items-end">
                    <button type="submit" class="rounded-lg bg-primary px-4 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60" [disabled]="submitting() || !form.title.trim() || !form.description.trim() || !form.location.trim()">
                        {{ submitting() ? 'Envoi en cours\u2026' : 'Envoyer la demande' }}
                    </button>
                </div>
            </form>
            @if (error(); as message) { <p class="mt-3 text-red-600" role="alert">{{ message }}</p> }
        </section>

        <section aria-labelledby="history-title">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 id="history-title" class="m-0 text-lg font-semibold">Historique</h2>
                <label class="flex items-center gap-2">
                    <span>Filtrer par statut</span>
                    <select class="rounded border border-surface bg-transparent p-2" aria-label="Filtrer mes demandes par statut" [ngModel]="statusFilter()" (ngModelChange)="filterChanged($event)">
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
                    <table class="w-full border-collapse text-left">
                        <caption class="sr-only">Vos demandes, tri\xE9es par date de cr\xE9ation d\xE9croissante</caption>
                        <thead><tr class="border-b border-surface"><th scope="col" class="p-3">Demande</th><th scope="col" class="p-3">Statut</th><th scope="col" class="p-3">Date</th><th scope="col" class="p-3">Lieu</th></tr></thead>
                        <tbody>
                            @for (request of requests(); track request.id) {
                                <tr class="border-b border-surface">
                                    <th scope="row" class="p-3 font-medium"><a class="text-primary underline" [routerLink]="['/home/my-requests', request.id]">{{ request.title }}</a></th>
                                    <td class="p-3">{{ request.status }}</td><td class="p-3">{{ request.created_at | date: 'dd/MM/yyyy HH:mm' }}</td><td class="p-3">{{ request.location }}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <nav class="mt-4 flex items-center justify-between gap-3" aria-label="Pagination de mes demandes">
                    <button type="button" class="rounded border border-surface px-3 py-2 focus-visible:outline-2" [disabled]="page() <= 1 || loading()" (click)="pageBy(-1)">Pr\xE9c\xE9dent</button>
                    <span aria-live="polite">Page {{ page() }} sur {{ pages() }} \xB7 {{ total() }} demande(s)</span>
                    <button type="button" class="rounded border border-surface px-3 py-2 focus-visible:outline-2" [disabled]="page() >= pages() || loading()" (click)="pageBy(1)">Suivant</button>
                </nav>
            } @else {
                <p>Vous n'avez pas encore envoy\xE9 de demande.</p>
                <a class="inline-flex rounded-lg bg-primary px-4 py-2 font-semibold text-white" href="#new-request-title">Envoyer ma premi\xE8re demande</a>
            }
        </section>
    </section>
}
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyRequests, { className: "MyRequests", filePath: "src/app/requests/my-requests.ts", lineNumber: 45 });
})();
export {
  MyRequests
};
//# sourceMappingURL=chunk-KUYIATXH.js.map
