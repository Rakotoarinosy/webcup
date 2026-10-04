import {
  CONCERN_TOPICS,
  DataConcernService,
  concernStatusSeverity,
  concernSteps
} from "./chunk-4ASZPPQ3.js";
import "./chunk-2ZKMMRNY.js";
import {
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  Tag,
  TagModule
} from "./chunk-EMZ2UMTV.js";
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
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BX45OWY6.js";
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  Injector,
  ViewChild,
  afterNextRender,
  finalize,
  inject,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
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
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// src/app/data-privacy/my-data.ts
var _c0 = ["confirmation"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function MyData_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20, 3)(2, "p", 40);
    \u0275\u0275text(3, "Votre signalement a bien \xE9t\xE9 re\xE7u.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 41);
    \u0275\u0275text(5, " R\xE9f\xE9rence ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, ". Vous pouvez suivre son traitement dans \xAB Mes signalements \xBB ci-dessous. ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.reference);
  }
}
function MyData_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MyData_For_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const topic_r3 = ctx.$implicit;
    \u0275\u0275property("value", topic_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(topic_r3);
  }
}
function MyData_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Choisissez le sujet de votre signalement. ");
  }
}
function MyData_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " D\xE9crivez votre inqui\xE9tude en au moins 10 caract\xE8res. ");
  }
}
function MyData_Conditional_101_Template(rf, ctx) {
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
function MyData_For_103_For_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 49);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "time");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", step_r5.label, " \u2014 ");
    \u0275\u0275advance();
    \u0275\u0275attribute("datetime", step_r5.date);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, step_r5.date, "d MMMM y \xE0 HH:mm"));
  }
}
function MyData_For_103_For_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 50);
    \u0275\u0275elementStart(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", step_r5.label, " \u2014 \xE0 venir");
  }
}
function MyData_For_103_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 47);
    \u0275\u0275conditionalCreate(1, MyData_For_103_For_11_Conditional_1_Template, 6, 6)(2, MyData_For_103_For_11_Conditional_2_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(step_r5.date ? 1 : 2);
  }
}
function MyData_For_103_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "p", 40);
    \u0275\u0275text(2, "R\xE9ponse de la mairie");
    \u0275\u0275elementStart(3, "span", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const concern_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" (", concern_r6.answered_by, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(concern_r6.response);
  }
}
function MyData_For_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 39)(1, "div", 35)(2, "h3", 42);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "p-tag", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 45);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "ol", 46);
    \u0275\u0275repeaterCreate(10, MyData_For_103_For_11_Template, 3, 1, "li", 47, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, MyData_For_103_Conditional_12_Template, 7, 2, "div", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const concern_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-labelledby", "concern-" + concern_r6.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "concern-" + concern_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", concern_r6.topic, " \xB7 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(concern_r6.reference);
    \u0275\u0275advance();
    \u0275\u0275property("value", concern_r6.status)("severity", ctx_r3.severity(concern_r6.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(concern_r6.message);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Suivi du signalement " + concern_r6.reference);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.steps(concern_r6));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(concern_r6.response ? 12 : -1);
  }
}
function MyData_ForEmpty_104_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1, "Vous n\u2019avez encore envoy\xE9 aucun signalement.");
    \u0275\u0275elementEnd();
  }
}
function MyData_ForEmpty_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MyData_ForEmpty_104_Conditional_0_Template, 2, 0, "p", 53);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r3.loading() ? 0 : -1);
  }
}
var MyData = class _MyData {
  api = inject(DataConcernService);
  injector = inject(Injector);
  confirmation = viewChild("confirmation", ...ngDevMode ? [{ debugName: "confirmation" }] : []);
  topics = CONCERN_TOPICS;
  steps = concernSteps;
  severity = concernStatusSeverity;
  concerns = signal([], ...ngDevMode ? [{ debugName: "concerns" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : []);
  sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : []);
  sendError = signal(null, ...ngDevMode ? [{ debugName: "sendError" }] : []);
  /** Signalement tout juste envoyé : sa référence est annoncée à l'habitant. */
  sent = signal(null, ...ngDevMode ? [{ debugName: "sent" }] : []);
  form = { topic: "", message: "" };
  submitted = false;
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading.set(true);
    this.loadError.set(null);
    this.api.mine().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (concerns) => this.concerns.set(concerns),
      error: (error) => this.loadError.set(apiErrorMessage(error))
    });
  }
  send(form) {
    this.submitted = true;
    const topic = this.form.topic;
    if (form.invalid || !topic || this.sending()) {
      form.control.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.sendError.set(null);
    this.api.submit({ topic, message: this.form.message.trim() }).pipe(finalize(() => this.sending.set(false))).subscribe({
      next: (concern) => {
        this.sent.set(concern);
        this.concerns.update((items) => [concern, ...items]);
        this.form = { topic: "", message: "" };
        this.submitted = false;
        form.resetForm(this.form);
        afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
      },
      error: (error) => this.sendError.set(apiErrorMessage(error))
    });
  }
  static \u0275fac = function MyData_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MyData)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MyData, selectors: [["app-my-data"]], viewQuery: function MyData_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.confirmation, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 105, vars: 14, consts: [["concernForm", "ngForm"], ["topicModel", "ngModel"], ["messageModel", "ngModel"], ["confirmation", ""], [1, "mx-auto", "grid", "max-w-[64rem]", "gap-6"], [1, "card", "mb-0"], [1, "mb-1", "font-semibold", "text-primary"], [1, "m-0", "text-3xl", "font-bold"], [1, "mb-0", "mt-3"], ["aria-labelledby", "usage-heading", 1, "card", "mb-0"], ["id", "usage-heading", 1, "mt-0", "text-xl", "font-semibold"], [1, "grid", "gap-3"], ["open", "", 1, "rounded-lg", "border", "border-surface", "p-4"], [1, "cursor-pointer", "font-semibold"], [1, "mb-0", "mt-3", "grid", "gap-2", "pl-5"], [1, "rounded-lg", "border", "border-surface", "p-4"], ["routerLink", "/home/profile", 1, "font-semibold", "text-primary", "underline"], ["aria-labelledby", "concern-heading", 1, "card", "mb-0"], ["id", "concern-heading", 1, "mt-0", "text-xl", "font-semibold"], [1, "mt-0", "text-muted-color"], ["tabindex", "-1", "role", "status", 1, "mb-4", "rounded-xl", "border", "border-green-300", "p-4"], ["role", "alert", 1, "rounded-xl", "border", "border-red-300", "p-4", "text-red-700", "dark:text-red-300"], ["novalidate", "", 1, "grid", "gap-4", 3, "ngSubmit"], [1, "grid", "gap-2"], ["for", "concern-topic", 1, "font-semibold"], ["id", "concern-topic", "name", "topic", "required", "", "aria-describedby", "concern-topic-error", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["id", "concern-topic-error", 1, "text-red-700", "dark:text-red-300"], ["for", "concern-message", 1, "font-semibold"], ["id", "concern-message", "name", "message", "required", "", "minlength", "10", "maxlength", "5000", "rows", "5", "aria-describedby", "concern-message-help concern-message-error", 1, "p-inputtext", "w-full", 3, "ngModelChange", "ngModel"], ["id", "concern-message-help", 1, "text-muted-color"], ["id", "concern-message-error", 1, "text-red-700", "dark:text-red-300"], ["type", "submit", "label", "Envoyer le signalement", "icon", "pi pi-send", 3, "loading"], ["aria-labelledby", "mine-heading", 1, "card", "mb-0"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], ["id", "mine-heading", 1, "m-0", "text-xl", "font-semibold"], ["icon", "pi pi-refresh", "severity", "secondary", "ariaLabel", "Actualiser mes signalements", 3, "onClick", "text", "loading"], ["role", "alert", 1, "text-red-700", "dark:text-red-300"], [1, "mt-4", "rounded-lg", "border", "border-surface", "p-4"], [1, "m-0", "font-semibold"], [1, "mb-0", "mt-1"], [1, "m-0", "text-lg", "font-semibold", 3, "id"], [1, "font-normal"], [3, "value", "severity"], [1, "whitespace-pre-line"], [1, "m-0", "grid", "list-none", "gap-2", "p-0"], [1, "flex", "items-center", "gap-2"], [1, "mt-4", "rounded-lg", "bg-emphasis", "p-4"], ["aria-hidden", "true", 1, "pi", "pi-check-circle", "text-green-600"], ["aria-hidden", "true", 1, "pi", "pi-circle", "text-muted-color"], [1, "text-muted-color"], [1, "mb-0", "mt-2", "whitespace-pre-line"], [1, "mb-0", "mt-3", "text-muted-color"]], template: function MyData_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 4)(1, "header", 5)(2, "p", 6);
      \u0275\u0275text(3, "Transparence");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 7);
      \u0275\u0275text(5, "Mes donn\xE9es");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 8);
      \u0275\u0275text(7, "Ce que Terra Nova enregistre sur vous, pourquoi, qui peut le voir, et comment nous faire part d\u2019une inqui\xE9tude.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 9)(9, "h2", 10);
      \u0275\u0275text(10, "Comment vos donn\xE9es sont utilis\xE9es");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 11)(12, "details", 12)(13, "summary", 13);
      \u0275\u0275text(14, "Ce que nous enregistrons");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "ul", 14)(16, "li")(17, "strong");
      \u0275\u0275text(18, "Votre compte :");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " nom, adresse email et mot de passe. Le mot de passe n\u2019est jamais conserv\xE9 en clair.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "li")(21, "strong");
      \u0275\u0275text(22, "Vos demandes :");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " titre, description, lieu indiqu\xE9 et, si vous la donnez, la position sur la carte.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "li")(25, "strong");
      \u0275\u0275text(26, "Le suivi de vos demandes :");
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " chaque \xE9tape (prise en charge, changement de statut) avec sa date.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "li")(29, "strong");
      \u0275\u0275text(30, "Vos pr\xE9f\xE9rences d\u2019affichage :");
      \u0275\u0275elementEnd();
      \u0275\u0275text(31, " th\xE8me, taille et police du texte.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "details", 15)(33, "summary", 13);
      \u0275\u0275text(34, "Pourquoi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p", 8);
      \u0275\u0275text(36, "Pour traiter vos demandes, vous tenir inform\xE9 de leur avancement et produire des chiffres d\u2019ensemble sur l\u2019activit\xE9 de la ville. Les chiffres publics ne contiennent ni nom ni demande individuelle.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "details", 15)(38, "summary", 13);
      \u0275\u0275text(39, "Qui peut les voir");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "ul", 14)(41, "li");
      \u0275\u0275text(42, "Le service de la mairie charg\xE9 du type de probl\xE8me signal\xE9, et l\u2019agent qui intervient.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "li");
      \u0275\u0275text(44, "Les administrateurs de la plateforme.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "li");
      \u0275\u0275text(46, " Pour aider au tri, un responsable peut demander une suggestion \xE0 un service d\u2019intelligence artificielle (Google Gemini). Seuls le titre, le lieu, la date et la description de la demande lui sont transmis, jamais votre nom ni votre email. Une personne valide toujours la suggestion. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "li");
      \u0275\u0275text(48, "Vos donn\xE9es ne sont ni vendues ni utilis\xE9es \xE0 des fins publicitaires.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(49, "details", 15)(50, "summary", 13);
      \u0275\u0275text(51, "Combien de temps");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "p", 8);
      \u0275\u0275text(53, "Tant que votre compte existe. Si vous supprimez votre compte, votre nom, votre email, votre mot de passe, vos sessions et vos pr\xE9f\xE9rences sont effac\xE9s. Vos demandes restent au dossier de la mairie, sans votre identit\xE9.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "details", 15)(55, "summary", 13);
      \u0275\u0275text(56, "Vos droits");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "ul", 14)(58, "li");
      \u0275\u0275text(59, "Modifier votre nom et votre email, ou supprimer votre compte : ");
      \u0275\u0275elementStart(60, "a", 16);
      \u0275\u0275text(61, "Mon profil");
      \u0275\u0275elementEnd();
      \u0275\u0275text(62, ".");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "li");
      \u0275\u0275text(64, "Poser une question ou signaler un probl\xE8me sur vos donn\xE9es : le formulaire ci-dessous. Chaque signalement re\xE7oit une r\xE9f\xE9rence et une r\xE9ponse \xE9crite de la mairie.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(65, "section", 17)(66, "h2", 18);
      \u0275\u0275text(67, "Signaler une inqui\xE9tude");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p", 19);
      \u0275\u0275text(69, "Les champs marqu\xE9s d\u2019un ast\xE9risque (*) sont obligatoires.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(70, MyData_Conditional_70_Template, 9, 1, "div", 20);
      \u0275\u0275conditionalCreate(71, MyData_Conditional_71_Template, 2, 1, "p", 21);
      \u0275\u0275elementStart(72, "form", 22, 0);
      \u0275\u0275listener("ngSubmit", function MyData_Template_form_ngSubmit_72_listener() {
        \u0275\u0275restoreView(_r1);
        const concernForm_r2 = \u0275\u0275reference(73);
        return \u0275\u0275resetView(ctx.send(concernForm_r2));
      });
      \u0275\u0275elementStart(74, "div", 23)(75, "label", 24);
      \u0275\u0275text(76, "Sujet *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "select", 25, 1);
      \u0275\u0275twoWayListener("ngModelChange", function MyData_Template_select_ngModelChange_77_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.topic, $event) || (ctx.form.topic = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(79, "option", 26);
      \u0275\u0275text(80, "Choisissez un sujet");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(81, MyData_For_82_Template, 2, 2, "option", 27, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "small", 28);
      \u0275\u0275conditionalCreate(84, MyData_Conditional_84_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div", 23)(86, "label", 29);
      \u0275\u0275text(87, "Votre message *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "textarea", 30, 2);
      \u0275\u0275twoWayListener("ngModelChange", function MyData_Template_textarea_ngModelChange_88_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.message, $event) || (ctx.form.message = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(90, "small", 31);
      \u0275\u0275text(91);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "small", 32);
      \u0275\u0275conditionalCreate(93, MyData_Conditional_93_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(94, "div");
      \u0275\u0275element(95, "p-button", 33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(96, "section", 34)(97, "div", 35)(98, "h2", 36);
      \u0275\u0275text(99, "Mes signalements");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(100, "p-button", 37);
      \u0275\u0275listener("onClick", function MyData_Template_p_button_onClick_100_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.load());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(101, MyData_Conditional_101_Template, 2, 1, "p", 38);
      \u0275\u0275repeaterCreate(102, MyData_For_103_Template, 13, 9, "article", 39, _forTrack0, false, MyData_ForEmpty_104_Template, 1, 1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_16_0;
      const topicModel_r7 = \u0275\u0275reference(78);
      const messageModel_r8 = \u0275\u0275reference(89);
      \u0275\u0275advance(70);
      \u0275\u0275conditional((tmp_3_0 = ctx.sent()) ? 70 : -1, tmp_3_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_4_0 = ctx.sendError()) ? 71 : -1, tmp_4_0);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.topic);
      \u0275\u0275attribute("aria-invalid", topicModel_r7.invalid && (topicModel_r7.touched || ctx.submitted));
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.topics);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(topicModel_r7.invalid && (topicModel_r7.touched || ctx.submitted) ? 84 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.message);
      \u0275\u0275attribute("aria-invalid", messageModel_r8.invalid && (messageModel_r8.touched || ctx.submitted));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.form.message.length, " / 5 000 caract\xE8res \xB7 10 caract\xE8res minimum. N\u2019indiquez pas de mot de passe.");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(messageModel_r8.invalid && (messageModel_r8.touched || ctx.submitted) ? 93 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("loading", ctx.sending());
      \u0275\u0275advance(5);
      \u0275\u0275property("text", true)("loading", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_16_0 = ctx.loadError()) ? 101 : -1, tmp_16_0);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.concerns());
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm, RouterLink, ButtonModule, Button, TagModule, Tag, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MyData, [{
    type: Component,
    args: [{ selector: "app-my-data", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, TagModule], template: `<div class="mx-auto grid max-w-[64rem] gap-6">
    <header class="card mb-0">
        <p class="mb-1 font-semibold text-primary">Transparence</p>
        <h1 class="m-0 text-3xl font-bold">Mes donn\xE9es</h1>
        <p class="mb-0 mt-3">Ce que Terra Nova enregistre sur vous, pourquoi, qui peut le voir, et comment nous faire part d\u2019une inqui\xE9tude.</p>
    </header>

    <section class="card mb-0" aria-labelledby="usage-heading">
        <h2 id="usage-heading" class="mt-0 text-xl font-semibold">Comment vos donn\xE9es sont utilis\xE9es</h2>
        <div class="grid gap-3">
            <details class="rounded-lg border border-surface p-4" open>
                <summary class="cursor-pointer font-semibold">Ce que nous enregistrons</summary>
                <ul class="mb-0 mt-3 grid gap-2 pl-5">
                    <li><strong>Votre compte :</strong> nom, adresse email et mot de passe. Le mot de passe n\u2019est jamais conserv\xE9 en clair.</li>
                    <li><strong>Vos demandes :</strong> titre, description, lieu indiqu\xE9 et, si vous la donnez, la position sur la carte.</li>
                    <li><strong>Le suivi de vos demandes :</strong> chaque \xE9tape (prise en charge, changement de statut) avec sa date.</li>
                    <li><strong>Vos pr\xE9f\xE9rences d\u2019affichage :</strong> th\xE8me, taille et police du texte.</li>
                </ul>
            </details>
            <details class="rounded-lg border border-surface p-4">
                <summary class="cursor-pointer font-semibold">Pourquoi</summary>
                <p class="mb-0 mt-3">Pour traiter vos demandes, vous tenir inform\xE9 de leur avancement et produire des chiffres d\u2019ensemble sur l\u2019activit\xE9 de la ville. Les chiffres publics ne contiennent ni nom ni demande individuelle.</p>
            </details>
            <details class="rounded-lg border border-surface p-4">
                <summary class="cursor-pointer font-semibold">Qui peut les voir</summary>
                <ul class="mb-0 mt-3 grid gap-2 pl-5">
                    <li>Le service de la mairie charg\xE9 du type de probl\xE8me signal\xE9, et l\u2019agent qui intervient.</li>
                    <li>Les administrateurs de la plateforme.</li>
                    <li>
                        Pour aider au tri, un responsable peut demander une suggestion \xE0 un service d\u2019intelligence artificielle (Google Gemini). Seuls le titre, le lieu, la date et la description de la demande lui sont transmis, jamais votre nom
                        ni votre email. Une personne valide toujours la suggestion.
                    </li>
                    <li>Vos donn\xE9es ne sont ni vendues ni utilis\xE9es \xE0 des fins publicitaires.</li>
                </ul>
            </details>
            <details class="rounded-lg border border-surface p-4">
                <summary class="cursor-pointer font-semibold">Combien de temps</summary>
                <p class="mb-0 mt-3">Tant que votre compte existe. Si vous supprimez votre compte, votre nom, votre email, votre mot de passe, vos sessions et vos pr\xE9f\xE9rences sont effac\xE9s. Vos demandes restent au dossier de la mairie, sans votre identit\xE9.</p>
            </details>
            <details class="rounded-lg border border-surface p-4">
                <summary class="cursor-pointer font-semibold">Vos droits</summary>
                <ul class="mb-0 mt-3 grid gap-2 pl-5">
                    <li>Modifier votre nom et votre email, ou supprimer votre compte : <a routerLink="/home/profile" class="font-semibold text-primary underline">Mon profil</a>.</li>
                    <li>Poser une question ou signaler un probl\xE8me sur vos donn\xE9es : le formulaire ci-dessous. Chaque signalement re\xE7oit une r\xE9f\xE9rence et une r\xE9ponse \xE9crite de la mairie.</li>
                </ul>
            </details>
        </div>
    </section>

    <section class="card mb-0" aria-labelledby="concern-heading">
        <h2 id="concern-heading" class="mt-0 text-xl font-semibold">Signaler une inqui\xE9tude</h2>
        <p class="mt-0 text-muted-color">Les champs marqu\xE9s d\u2019un ast\xE9risque (*) sont obligatoires.</p>

        @if (sent(); as concern) {
            <div #confirmation tabindex="-1" role="status" class="mb-4 rounded-xl border border-green-300 p-4">
                <p class="m-0 font-semibold">Votre signalement a bien \xE9t\xE9 re\xE7u.</p>
                <p class="mb-0 mt-1">
                    R\xE9f\xE9rence <strong>{{ concern.reference }}</strong>. Vous pouvez suivre son traitement dans \xAB Mes signalements \xBB ci-dessous.
                </p>
            </div>
        }
        @if (sendError(); as message) {
            <p role="alert" class="rounded-xl border border-red-300 p-4 text-red-700 dark:text-red-300">{{ message }}</p>
        }

        <form #concernForm="ngForm" (ngSubmit)="send(concernForm)" novalidate class="grid gap-4">
            <div class="grid gap-2">
                <label for="concern-topic" class="font-semibold">Sujet *</label>
                <select
                    id="concern-topic"
                    name="topic"
                    #topicModel="ngModel"
                    [(ngModel)]="form.topic"
                    required
                    class="p-inputtext w-full"
                    aria-describedby="concern-topic-error"
                    [attr.aria-invalid]="topicModel.invalid && (topicModel.touched || submitted)"
                >
                    <option value="" disabled>Choisissez un sujet</option>
                    @for (topic of topics; track topic) {
                        <option [value]="topic">{{ topic }}</option>
                    }
                </select>
                <small id="concern-topic-error" class="text-red-700 dark:text-red-300">
                    @if (topicModel.invalid && (topicModel.touched || submitted)) {
                        Choisissez le sujet de votre signalement.
                    }
                </small>
            </div>
            <div class="grid gap-2">
                <label for="concern-message" class="font-semibold">Votre message *</label>
                <textarea
                    id="concern-message"
                    name="message"
                    #messageModel="ngModel"
                    [(ngModel)]="form.message"
                    required
                    minlength="10"
                    maxlength="5000"
                    rows="5"
                    class="p-inputtext w-full"
                    aria-describedby="concern-message-help concern-message-error"
                    [attr.aria-invalid]="messageModel.invalid && (messageModel.touched || submitted)"
                ></textarea>
                <small id="concern-message-help" class="text-muted-color">{{ form.message.length }} / 5 000 caract\xE8res \xB7 10 caract\xE8res minimum. N\u2019indiquez pas de mot de passe.</small>
                <small id="concern-message-error" class="text-red-700 dark:text-red-300">
                    @if (messageModel.invalid && (messageModel.touched || submitted)) {
                        D\xE9crivez votre inqui\xE9tude en au moins 10 caract\xE8res.
                    }
                </small>
            </div>
            <div>
                <p-button type="submit" label="Envoyer le signalement" icon="pi pi-send" [loading]="sending()" />
            </div>
        </form>
    </section>

    <section class="card mb-0" aria-labelledby="mine-heading">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="mine-heading" class="m-0 text-xl font-semibold">Mes signalements</h2>
            <p-button icon="pi pi-refresh" severity="secondary" [text]="true" [loading]="loading()" ariaLabel="Actualiser mes signalements" (onClick)="load()" />
        </div>
        @if (loadError(); as message) {
            <p role="alert" class="text-red-700 dark:text-red-300">{{ message }}</p>
        }
        @for (concern of concerns(); track concern.id) {
            <article class="mt-4 rounded-lg border border-surface p-4" [attr.aria-labelledby]="'concern-' + concern.id">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <h3 [id]="'concern-' + concern.id" class="m-0 text-lg font-semibold">{{ concern.topic }} \xB7 <span class="font-normal">{{ concern.reference }}</span></h3>
                    <p-tag [value]="concern.status" [severity]="severity(concern.status)" />
                </div>
                <p class="whitespace-pre-line">{{ concern.message }}</p>
                <ol class="m-0 grid list-none gap-2 p-0" [attr.aria-label]="'Suivi du signalement ' + concern.reference">
                    @for (step of steps(concern); track step.label) {
                        <li class="flex items-center gap-2">
                            @if (step.date) {
                                <i class="pi pi-check-circle text-green-600" aria-hidden="true"></i>
                                <span>{{ step.label }} \u2014 <time [attr.datetime]="step.date">{{ step.date | date: 'd MMMM y \xE0 HH:mm' }}</time></span>
                            } @else {
                                <i class="pi pi-circle text-muted-color" aria-hidden="true"></i>
                                <span class="text-muted-color">{{ step.label }} \u2014 \xE0 venir</span>
                            }
                        </li>
                    }
                </ol>
                @if (concern.response) {
                    <div class="mt-4 rounded-lg bg-emphasis p-4">
                        <p class="m-0 font-semibold">R\xE9ponse de la mairie<span class="font-normal"> ({{ concern.answered_by }})</span></p>
                        <p class="mb-0 mt-2 whitespace-pre-line">{{ concern.response }}</p>
                    </div>
                }
            </article>
        } @empty {
            @if (!loading()) {
                <p class="mb-0 mt-3 text-muted-color">Vous n\u2019avez encore envoy\xE9 aucun signalement.</p>
            }
        }
    </section>
</div>
` }]
  }], null, { confirmation: [{ type: ViewChild, args: ["confirmation", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MyData, { className: "MyData", filePath: "src/app/data-privacy/my-data.ts", lineNumber: 27 });
})();
export {
  MyData
};
//# sourceMappingURL=chunk-DJAWVXF5.js.map
