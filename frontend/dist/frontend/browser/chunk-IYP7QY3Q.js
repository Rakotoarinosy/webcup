import {
  MunicipalNavigation
} from "./chunk-TSU7FZ7T.js";
import {
  MunicipalContentService
} from "./chunk-BJ7LH56I.js";
import {
  Textarea,
  TextareaModule
} from "./chunk-RP2MWOEV.js";
import {
  LiveDataService
} from "./chunk-EJ3WHEDK.js";
import "./chunk-R3AFDXWT.js";
import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import {
  takeUntilDestroyed
} from "./chunk-A73WFSNJ.js";
import "./chunk-RD6WJK3U.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-F3M422Q6.js";
import {
  InputText,
  InputTextModule,
  Select,
  SelectModule
} from "./chunk-MGHWURGQ.js";
import "./chunk-CXSKRW4Y.js";
import "./chunk-OUQ4VYAJ.js";
import "./chunk-5UENDHV5.js";
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
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
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  HttpErrorResponse,
  Injector,
  ViewChild,
  __spreadProps,
  __spreadValues,
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

// src/app/municipal/municipal-contact.ts
var _c0 = ["confirmation"];
var _c1 = ["sendError"];
var _c2 = ["nameInput"];
function MunicipalContact_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12, 0);
    \u0275\u0275element(2, "span", 14);
    \u0275\u0275elementStart(3, "h2", 15);
    \u0275\u0275text(4, "Votre message a bien \xE9t\xE9 envoy\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dl")(8, "dt");
    \u0275\u0275text(9, "Destinataire");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dt");
    \u0275\u0275text(13, "R\xE9f\xE9rence de votre message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd", 16);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dt");
    \u0275\u0275text(17, "Date d\u2019envoi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Conservez cette r\xE9f\xE9rence pour vos prochains \xE9changes avec la mairie.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 17)(24, "button", 18);
    \u0275\u0275listener("click", function MunicipalContact_Conditional_10_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.newMessage());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "a", 19);
    \u0275\u0275text(26, "Retour \xE0 l\u2019accueil municipal");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const saved_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(saved_r3.message);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.recipient());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(saved_r3.receipt_number);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 5, saved_r3.created_at, "dd/MM/yyyy \xE0 HH:mm"));
    \u0275\u0275advance(6);
    \u0275\u0275property("routerLink", ctx_r1.navigation.path());
  }
}
function MunicipalContact_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20, 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx);
  }
}
function MunicipalContact_Conditional_11_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Indiquez votre nom et pr\xE9nom (au moins 2 caract\xE8res). ");
  }
}
function MunicipalContact_Conditional_11_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Indiquez une adresse e-mail valide. ");
  }
}
function MunicipalContact_Conditional_11_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 49);
    \u0275\u0275listener("click", function MunicipalContact_Conditional_11_Conditional_35_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadServices());
    });
    \u0275\u0275text(3, "Actualiser la liste");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.servicesLoading());
  }
}
function MunicipalContact_Conditional_11_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Pr\xE9cisez l\u2019objet de votre message (au moins 3 caract\xE8res). ");
  }
}
function MunicipalContact_Conditional_11_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " D\xE9crivez votre demande en au moins 10 caract\xE8res. ");
  }
}
function MunicipalContact_Conditional_11_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Envoi en cours\u2026 ");
  }
}
function MunicipalContact_Conditional_11_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Une confirmation s\u2019affichera apr\xE8s l\u2019envoi. ");
  }
}
function MunicipalContact_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, MunicipalContact_Conditional_11_Conditional_1_Template, 3, 1, "p", 20);
    \u0275\u0275elementStart(2, "form", 21, 1);
    \u0275\u0275listener("ngSubmit", function MunicipalContact_Conditional_11_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r4);
      const contactForm_r5 = \u0275\u0275reference(3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.send(contactForm_r5));
    });
    \u0275\u0275elementStart(4, "p", 22);
    \u0275\u0275text(5, "Tous les champs sont obligatoires, sauf le service concern\xE9.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "fieldset", 23)(7, "legend", 24);
    \u0275\u0275text(8, "Votre message \xE0 la mairie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 25)(10, "div", 26)(11, "label", 27);
    \u0275\u0275text(12, "Nom et pr\xE9nom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 28, 2);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Conditional_11_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sender_name, $event) || (ctx_r1.form.sender_name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "small", 29);
    \u0275\u0275conditionalCreate(17, MunicipalContact_Conditional_11_Conditional_17_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 26)(19, "label", 30);
    \u0275\u0275text(20, "Adresse e-mail");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 31, 3);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Conditional_11_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.sender_email, $event) || (ctx_r1.form.sender_email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "small", 32);
    \u0275\u0275text(24, "Pour permettre \xE0 la mairie de vous r\xE9pondre.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small", 33);
    \u0275\u0275conditionalCreate(26, MunicipalContact_Conditional_11_Conditional_26_Template, 1, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 26)(28, "label", 34);
    \u0275\u0275text(29, "Service concern\xE9 ");
    \u0275\u0275elementStart(30, "span", 35);
    \u0275\u0275text(31, "(facultatif)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "p-select", 36);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Conditional_11_Template_p_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.service_id, $event) || (ctx_r1.form.service_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "small", 37);
    \u0275\u0275text(34, "Vous ne savez pas \xE0 qui \xE9crire ? Laissez ce champ vide.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, MunicipalContact_Conditional_11_Conditional_35_Template, 4, 2, "p", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 26)(37, "label", 39);
    \u0275\u0275text(38, "Objet de votre message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 40, 4);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Conditional_11_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.subject, $event) || (ctx_r1.form.subject = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "small", 41);
    \u0275\u0275conditionalCreate(42, MunicipalContact_Conditional_11_Conditional_42_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 26)(44, "label", 42);
    \u0275\u0275text(45, "Votre message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "textarea", 43, 5);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Conditional_11_Template_textarea_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.message, $event) || (ctx_r1.form.message = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "small", 44);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "small", 45);
    \u0275\u0275conditionalCreate(51, MunicipalContact_Conditional_11_Conditional_51_Template, 1, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 46);
    \u0275\u0275element(53, "button", 47);
    \u0275\u0275elementStart(54, "span", 48);
    \u0275\u0275conditionalCreate(55, MunicipalContact_Conditional_11_Conditional_55_Template, 1, 0)(56, MunicipalContact_Conditional_11_Conditional_56_Template, 1, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_21_0;
    const contactForm_r5 = \u0275\u0275reference(3);
    const nameModel_r7 = \u0275\u0275reference(15);
    const emailModel_r8 = \u0275\u0275reference(22);
    const subjectModel_r9 = \u0275\u0275reference(40);
    const messageModel_r10 = \u0275\u0275reference(47);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.error()) ? 1 : -1, tmp_7_0);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-busy", ctx_r1.sending());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.sending());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sender_name);
    \u0275\u0275attribute("aria-invalid", nameModel_r7.invalid && nameModel_r7.touched);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(nameModel_r7.invalid && nameModel_r7.touched ? 17 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.sender_email);
    \u0275\u0275attribute("aria-invalid", emailModel_r8.invalid && emailModel_r8.touched);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(emailModel_r8.invalid && emailModel_r8.touched ? 26 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.service_id);
    \u0275\u0275property("options", ctx_r1.services())("showClear", true)("disabled", ctx_r1.sending())("loading", ctx_r1.servicesLoading());
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_21_0 = ctx_r1.servicesError()) ? 35 : -1, tmp_21_0);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.subject);
    \u0275\u0275attribute("aria-invalid", subjectModel_r9.invalid && subjectModel_r9.touched);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(subjectModel_r9.invalid && subjectModel_r9.touched ? 42 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.message);
    \u0275\u0275attribute("aria-invalid", messageModel_r10.invalid && messageModel_r10.touched);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.form.message.length, " / 5 000 caract\xE8res \xB7 10 caract\xE8res minimum");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(messageModel_r10.invalid && messageModel_r10.touched ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("loading", ctx_r1.sending())("disabled", contactForm_r5.invalid || ctx_r1.sending());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.sending() ? 55 : 56);
  }
}
var MunicipalContact = class _MunicipalContact {
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  content = inject(MunicipalContentService);
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  navigation = inject(MunicipalNavigation);
  confirmation = viewChild("confirmation", ...ngDevMode ? [{ debugName: "confirmation" }] : []);
  sendError = viewChild("sendError", ...ngDevMode ? [{ debugName: "sendError" }] : []);
  nameInput = viewChild("nameInput", ...ngDevMode ? [{ debugName: "nameInput" }] : []);
  servicesLoading = signal(false, ...ngDevMode ? [{ debugName: "servicesLoading" }] : []);
  servicesError = signal(null, ...ngDevMode ? [{ debugName: "servicesError" }] : []);
  services = signal([], ...ngDevMode ? [{ debugName: "services" }] : []);
  receipt = signal(null, ...ngDevMode ? [{ debugName: "receipt" }] : []);
  recipient = signal("Services municipaux", ...ngDevMode ? [{ debugName: "recipient" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : []);
  form = { service_id: null, sender_name: "", sender_email: "", subject: "", message: "" };
  ngOnInit() {
    const user = this.auth.user();
    this.form.sender_name = user?.name ?? "";
    this.form.sender_email = user?.email ?? "";
    this.form.service_id = this.route.snapshot.queryParamMap.get("service");
    this.loadServices();
    this.live.watch(this.destroyRef, () => this.loadServices(), () => !this.sending() && !this.servicesLoading());
  }
  loadServices() {
    if (this.servicesLoading())
      return;
    this.servicesLoading.set(true);
    this.servicesError.set(null);
    this.content.services().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.servicesLoading.set(false))).subscribe({
      next: (items) => {
        this.services.set(items);
        if (this.form.service_id && !items.some((item) => item.id === this.form.service_id)) {
          this.form.service_id = null;
          this.servicesError.set("Ce service n\u2019est plus disponible. Vous pouvez envoyer votre message aux services municipaux ou choisir un autre service.");
        }
      },
      error: () => this.servicesError.set("La liste des services est indisponible. Vous pouvez quand m\xEAme envoyer votre message \xE0 la mairie.")
    });
  }
  send(form) {
    if (this.sending())
      return;
    for (const [name, minimum] of [
      ["sender_name", 2],
      ["subject", 3],
      ["message", 10]
    ]) {
      if (this.form[name].trim().length < minimum)
        form.controls[name]?.setErrors({ minlength: true });
    }
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    const payload = __spreadProps(__spreadValues({}, this.form), { sender_name: this.form.sender_name.trim(), sender_email: this.form.sender_email.trim(), subject: this.form.subject.trim(), message: this.form.message.trim() });
    this.recipient.set(this.services().find((service) => service.id === payload.service_id)?.name ?? "Services municipaux");
    this.sending.set(true);
    this.error.set(null);
    this.content.sendContact(payload).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.sending.set(false))).subscribe({
      next: (receipt) => {
        this.receipt.set(receipt);
        afterNextRender(() => this.confirmation()?.nativeElement.focus(), { injector: this.injector });
      },
      error: (error) => {
        this.error.set(error instanceof HttpErrorResponse && error.status === 404 ? "Ce service n\u2019est plus disponible. Choisissez un autre service ou laissez ce champ vide, puis r\xE9essayez." : "L\u2019envoi n\u2019a pas pu \xEAtre confirm\xE9. Vos informations sont conserv\xE9es. V\xE9rifiez votre connexion puis r\xE9essayez.");
        afterNextRender(() => this.sendError()?.nativeElement.focus(), { injector: this.injector });
      }
    });
  }
  newMessage() {
    this.receipt.set(null);
    this.error.set(null);
    this.form = __spreadProps(__spreadValues({}, this.form), { subject: "", message: "" });
    afterNextRender(() => this.nameInput()?.nativeElement.focus(), { injector: this.injector });
  }
  static \u0275fac = function MunicipalContact_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalContact)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalContact, selectors: [["app-municipal-contact"]], viewQuery: function MunicipalContact_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.confirmation, _c0, 5)(ctx.sendError, _c1, 5)(ctx.nameInput, _c2, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(3);
    }
  }, decls: 12, vars: 1, consts: [["confirmation", ""], ["contactForm", "ngForm"], ["nameInput", "", "nameModel", "ngModel"], ["emailModel", "ngModel"], ["subjectModel", "ngModel"], ["messageModel", "ngModel"], ["sendError", ""], [1, "contact-page"], [1, "page-heading"], ["aria-hidden", "true", 1, "heading-icon", "pi", "pi-envelope"], [1, "eyebrow"], [1, "intro"], ["role", "status", "aria-live", "polite", "tabindex", "-1", "aria-labelledby", "confirmation-title", 1, "confirmation"], [1, "contact-form-card"], ["aria-hidden", "true", 1, "pi", "pi-check-circle"], ["id", "confirmation-title"], [1, "receipt-number"], [1, "confirmation-actions"], ["pButton", "", "type", "button", "label", "Envoyer un autre message", "icon", "pi pi-plus", 3, "click"], [3, "routerLink"], ["role", "alert", "tabindex", "-1", 1, "send-error"], [3, "ngSubmit"], [1, "form-hint"], [3, "disabled"], [1, "sr-only"], [1, "form-grid"], [1, "field"], ["for", "contact-name"], ["pInputText", "", "id", "contact-name", "name", "sender_name", "autocomplete", "name", "required", "", "minlength", "2", "maxlength", "255", "aria-describedby", "name-error", 3, "ngModelChange", "ngModel"], ["id", "name-error", 1, "field-error"], ["for", "contact-email"], ["pInputText", "", "id", "contact-email", "type", "email", "name", "sender_email", "autocomplete", "email", "required", "", "email", "", "maxlength", "320", "aria-describedby", "email-help email-error", 3, "ngModelChange", "ngModel"], ["id", "email-help"], ["id", "email-error", 1, "field-error"], ["for", "contact-service"], [1, "optional"], ["inputId", "contact-service", "name", "service_id", "optionLabel", "name", "optionValue", "id", "placeholder", "Je ne sais pas / Services municipaux", "aria-describedby", "service-help", 3, "ngModelChange", "ngModel", "options", "showClear", "disabled", "loading"], ["id", "service-help"], ["role", "status", 1, "service-warning"], ["for", "contact-subject"], ["pInputText", "", "id", "contact-subject", "name", "subject", "placeholder", "Ex. : Aide pour une d\xE9marche", "required", "", "minlength", "3", "maxlength", "255", "aria-describedby", "subject-error", 3, "ngModelChange", "ngModel"], ["id", "subject-error", 1, "field-error"], ["for", "contact-message"], ["pTextarea", "", "id", "contact-message", "name", "message", "placeholder", "Expliquez votre question ou la difficult\xE9 rencontr\xE9e\u2026", "required", "", "minlength", "10", "maxlength", "5000", "rows", "6", "aria-describedby", "message-help message-error", 3, "ngModelChange", "ngModel"], ["id", "message-help"], ["id", "message-error", 1, "field-error"], [1, "form-actions"], ["pButton", "", "type", "submit", "label", "Envoyer mon message", "icon", "pi pi-send", 3, "loading", "disabled"], [1, "submit-hint"], ["type", "button", 1, "retry-link", 3, "click", "disabled"]], template: function MunicipalContact_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 7)(1, "div", 8);
      \u0275\u0275element(2, "span", 9);
      \u0275\u0275elementStart(3, "div")(4, "p", 10);
      \u0275\u0275text(5, "Nous sommes \xE0 votre \xE9coute");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1");
      \u0275\u0275text(7, "Contacter la mairie");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "p", 11);
      \u0275\u0275text(9, "Une question, une difficult\xE9 dans une d\xE9marche ? \xC9crivez-nous. Vous recevrez une confirmation avec une r\xE9f\xE9rence d\xE8s que votre message sera enregistr\xE9.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, MunicipalContact_Conditional_10_Template, 27, 8, "div", 12)(11, MunicipalContact_Conditional_11_Template, 57, 25, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(10);
      \u0275\u0275conditional((tmp_0_0 = ctx.receipt()) ? 10 : 11, tmp_0_0);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, EmailValidator, NgModel, NgForm, RouterLink, ButtonModule, ButtonDirective, InputTextModule, InputText, SelectModule, Select, TextareaModule, Textarea, DatePipe], styles: ["\n\n.contact-page[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: auto;\n  padding: 1rem;\n}\n.page-heading[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.heading-icon[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-size: 1.5rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0.4rem 0;\n  font-size: clamp(1.8rem, 4vw, 2.6rem);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  margin: 0;\n}\n.intro[_ngcontent-%COMP%], \n.form-hint[_ngcontent-%COMP%], \nsmall[_ngcontent-%COMP%], \n.submit-hint[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  line-height: 1.6;\n}\n.contact-form-card[_ngcontent-%COMP%], \n.confirmation[_ngcontent-%COMP%] {\n  padding: clamp(1rem, 4vw, 2rem);\n  border: 1px solid var(--surface-border);\n  border-radius: 1.25rem;\n  background: var(--surface-card);\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 1.2rem;\n  min-width: 0;\n}\n.form-grid[_ngcontent-%COMP%] {\n  align-items: start;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n.field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  min-width: 0;\n}\nlabel[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%], \np-select[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\nsmall[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.field-error[_ngcontent-%COMP%], \n.send-error[_ngcontent-%COMP%] {\n  color: var(--p-red-700);\n}\n.send-error[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid var(--p-red-200);\n  border-radius: 0.6rem;\n  background: var(--p-red-50);\n}\n.retry-link[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  background: transparent;\n  border: 0;\n  padding: 0.4rem 0;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.form-actions[_ngcontent-%COMP%], \n.confirmation-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.confirmation[_ngcontent-%COMP%] {\n  border-color: var(--p-primary-color);\n}\n.confirmation[_ngcontent-%COMP%]    > .pi[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-size: 2rem;\n}\n.confirmation[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 0.75rem;\n  background: var(--surface-ground);\n}\ndt[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  margin-top: 0.75rem;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  overflow-wrap: anywhere;\n  font-weight: 600;\n}\na[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  text-decoration: underline;\n}\n.confirmation[_ngcontent-%COMP%]:focus, \n.send-error[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 4px;\n}\n@media (max-width: 600px) {\n  .form-grid[_ngcontent-%COMP%] {\n    align-items: start;\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .form-actions[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.page-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1 1 16rem;\n}\nh1[_ngcontent-%COMP%], \n.form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.confirmation-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  max-width: 100%;\n  white-space: normal;\n}\n/*# sourceMappingURL=municipal-contact.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalContact, [{
    type: Component,
    args: [{ selector: "app-municipal-contact", imports: [DatePipe, FormsModule, RouterLink, ButtonModule, InputTextModule, SelectModule, TextareaModule], template: `<section class="contact-page">
    <div class="page-heading">
        <span class="heading-icon pi pi-envelope" aria-hidden="true"></span>
        <div>
            <p class="eyebrow">Nous sommes \xE0 votre \xE9coute</p>
            <h1>Contacter la mairie</h1>
        </div>
    </div>
    <p class="intro">Une question, une difficult\xE9 dans une d\xE9marche ? \xC9crivez-nous. Vous recevrez une confirmation avec une r\xE9f\xE9rence d\xE8s que votre message sera enregistr\xE9.</p>
    @if (receipt(); as saved) {
        <div #confirmation class="confirmation" role="status" aria-live="polite" tabindex="-1" aria-labelledby="confirmation-title">
            <span class="pi pi-check-circle" aria-hidden="true"></span>
            <h2 id="confirmation-title">Votre message a bien \xE9t\xE9 envoy\xE9</h2>
            <p>{{ saved.message }}</p>
            <dl>
                <dt>Destinataire</dt>
                <dd>{{ recipient() }}</dd>
                <dt>R\xE9f\xE9rence de votre message</dt>
                <dd class="receipt-number">{{ saved.receipt_number }}</dd>
                <dt>Date d\u2019envoi</dt>
                <dd>{{ saved.created_at | date: 'dd/MM/yyyy \xE0 HH:mm' }}</dd>
            </dl>
            <p>Conservez cette r\xE9f\xE9rence pour vos prochains \xE9changes avec la mairie.</p>
            <div class="confirmation-actions"><button pButton type="button" label="Envoyer un autre message" icon="pi pi-plus" (click)="newMessage()"></button><a [routerLink]="navigation.path()">Retour \xE0 l\u2019accueil municipal</a></div>
        </div>
    } @else {
        <div class="contact-form-card">
            @if (error(); as message) {
                <p #sendError role="alert" tabindex="-1" class="send-error">{{ message }}</p>
            }
            <form #contactForm="ngForm" (ngSubmit)="send(contactForm)" [attr.aria-busy]="sending()">
                <p class="form-hint">Tous les champs sont obligatoires, sauf le service concern\xE9.</p>
                <fieldset [disabled]="sending()">
                    <legend class="sr-only">Votre message \xE0 la mairie</legend>
                    <div class="form-grid">
                        <div class="field">
                            <label for="contact-name">Nom et pr\xE9nom</label
                            ><input
                                #nameInput
                                #nameModel="ngModel"
                                pInputText
                                id="contact-name"
                                name="sender_name"
                                [(ngModel)]="form.sender_name"
                                autocomplete="name"
                                required
                                minlength="2"
                                maxlength="255"
                                aria-describedby="name-error"
                                [attr.aria-invalid]="nameModel.invalid && nameModel.touched"
                            />
                            <small id="name-error" class="field-error">
                                @if (nameModel.invalid && nameModel.touched) {
                                    Indiquez votre nom et pr\xE9nom (au moins 2 caract\xE8res).
                                }
                            </small>
                        </div>
                        <div class="field">
                            <label for="contact-email">Adresse e-mail</label
                            ><input
                                #emailModel="ngModel"
                                pInputText
                                id="contact-email"
                                type="email"
                                name="sender_email"
                                [(ngModel)]="form.sender_email"
                                autocomplete="email"
                                required
                                email
                                maxlength="320"
                                aria-describedby="email-help email-error"
                                [attr.aria-invalid]="emailModel.invalid && emailModel.touched"
                            /><small id="email-help">Pour permettre \xE0 la mairie de vous r\xE9pondre.</small>
                            <small id="email-error" class="field-error">
                                @if (emailModel.invalid && emailModel.touched) {
                                    Indiquez une adresse e-mail valide.
                                }
                            </small>
                        </div>
                    </div>
                    <div class="field">
                        <label for="contact-service">Service concern\xE9 <span class="optional">(facultatif)</span></label
                        ><p-select
                            inputId="contact-service"
                            name="service_id"
                            [(ngModel)]="form.service_id"
                            [options]="services()"
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Je ne sais pas / Services municipaux"
                            [showClear]="true"
                            [disabled]="sending()"
                            [loading]="servicesLoading()"
                            aria-describedby="service-help"
                        ></p-select
                        ><small id="service-help">Vous ne savez pas \xE0 qui \xE9crire ? Laissez ce champ vide.</small>
                        @if (servicesError(); as message) {
                            <p class="service-warning" role="status">{{ message }} <button type="button" class="retry-link" (click)="loadServices()" [disabled]="servicesLoading()">Actualiser la liste</button></p>
                        }
                    </div>
                    <div class="field">
                        <label for="contact-subject">Objet de votre message</label
                        ><input
                            #subjectModel="ngModel"
                            pInputText
                            id="contact-subject"
                            name="subject"
                            [(ngModel)]="form.subject"
                            placeholder="Ex. : Aide pour une d\xE9marche"
                            required
                            minlength="3"
                            maxlength="255"
                            aria-describedby="subject-error"
                            [attr.aria-invalid]="subjectModel.invalid && subjectModel.touched"
                        /><small id="subject-error" class="field-error">
                            @if (subjectModel.invalid && subjectModel.touched) {
                                Pr\xE9cisez l\u2019objet de votre message (au moins 3 caract\xE8res).
                            }
                        </small>
                    </div>
                    <div class="field">
                        <label for="contact-message">Votre message</label
                        ><textarea
                            #messageModel="ngModel"
                            pTextarea
                            id="contact-message"
                            name="message"
                            [(ngModel)]="form.message"
                            placeholder="Expliquez votre question ou la difficult\xE9 rencontr\xE9e\u2026"
                            required
                            minlength="10"
                            maxlength="5000"
                            rows="6"
                            aria-describedby="message-help message-error"
                            [attr.aria-invalid]="messageModel.invalid && messageModel.touched"
                        ></textarea
                        ><small id="message-help">{{ form.message.length }} / 5 000 caract\xE8res \xB7 10 caract\xE8res minimum</small
                        ><small id="message-error" class="field-error">
                            @if (messageModel.invalid && messageModel.touched) {
                                D\xE9crivez votre demande en au moins 10 caract\xE8res.
                            }
                        </small>
                    </div>
                </fieldset>
                <div class="form-actions">
                    <button pButton type="submit" label="Envoyer mon message" icon="pi pi-send" [loading]="sending()" [disabled]="contactForm.invalid || sending()"></button
                    ><span class="submit-hint">
                        @if (sending()) {
                            Envoi en cours\u2026
                        } @else {
                            Une confirmation s\u2019affichera apr\xE8s l\u2019envoi.
                        }
                    </span>
                </div>
            </form>
        </div>
    }
</section>
`, styles: ["/* src/app/municipal/municipal-contact.scss */\n.contact-page {\n  max-width: 800px;\n  margin: auto;\n  padding: 1rem;\n}\n.page-heading {\n  flex-wrap: wrap;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.heading-icon {\n  color: var(--p-primary-color);\n  font-size: 1.5rem;\n}\nh1 {\n  margin: 0.4rem 0;\n  font-size: clamp(1.8rem, 4vw, 2.6rem);\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  margin: 0;\n}\n.intro,\n.form-hint,\nsmall,\n.submit-hint {\n  color: var(--p-text-muted-color);\n  line-height: 1.6;\n}\n.contact-form-card,\n.confirmation {\n  padding: clamp(1rem, 4vw, 2rem);\n  border: 1px solid var(--surface-border);\n  border-radius: 1.25rem;\n  background: var(--surface-card);\n}\nfieldset {\n  border: 0;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 1.2rem;\n  min-width: 0;\n}\n.form-grid {\n  align-items: start;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n.field {\n  display: grid;\n  gap: 0.45rem;\n  min-width: 0;\n}\nlabel {\n  font-weight: 600;\n}\ninput,\ntextarea,\np-select {\n  width: 100%;\n  min-width: 0;\n}\ntextarea {\n  resize: vertical;\n}\nsmall:empty {\n  display: none;\n}\n.field-error,\n.send-error {\n  color: var(--p-red-700);\n}\n.send-error {\n  padding: 1rem;\n  border: 1px solid var(--p-red-200);\n  border-radius: 0.6rem;\n  background: var(--p-red-50);\n}\n.retry-link {\n  color: var(--p-primary-color);\n  background: transparent;\n  border: 0;\n  padding: 0.4rem 0;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.form-actions,\n.confirmation-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.confirmation {\n  border-color: var(--p-primary-color);\n}\n.confirmation > .pi {\n  color: var(--p-primary-color);\n  font-size: 2rem;\n}\n.confirmation dl {\n  padding: 1rem;\n  border-radius: 0.75rem;\n  background: var(--surface-ground);\n}\ndt {\n  color: var(--p-text-muted-color);\n  margin-top: 0.75rem;\n}\ndd {\n  margin: 0.25rem 0 0;\n  overflow-wrap: anywhere;\n  font-weight: 600;\n}\na {\n  color: var(--p-primary-color);\n  text-decoration: underline;\n}\n.confirmation:focus,\n.send-error:focus {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 4px;\n}\n@media (max-width: 600px) {\n  .form-grid {\n    align-items: start;\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .form-actions > button {\n    width: 100%;\n  }\n}\n.page-heading > div {\n  min-width: 0;\n  flex: 1 1 16rem;\n}\nh1,\n.form-actions button,\n.confirmation-actions button {\n  max-width: 100%;\n  white-space: normal;\n}\n/*# sourceMappingURL=municipal-contact.css.map */\n"] }]
  }], null, { confirmation: [{ type: ViewChild, args: ["confirmation", { isSignal: true }] }], sendError: [{ type: ViewChild, args: ["sendError", { isSignal: true }] }], nameInput: [{ type: ViewChild, args: ["nameInput", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalContact, { className: "MunicipalContact", filePath: "src/app/municipal/municipal-contact.ts", lineNumber: 24 });
})();
export {
  MunicipalContact
};
//# sourceMappingURL=chunk-IYP7QY3Q.js.map
