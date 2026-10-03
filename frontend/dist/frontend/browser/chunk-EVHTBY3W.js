import {
  Message,
  MessageModule
} from "./chunk-P3WXNFIH.js";
import {
  Card,
  CardModule,
  MunicipalContentService
} from "./chunk-ZDL6O4T7.js";
import {
  ActivatedRoute
} from "./chunk-O26HSNKS.js";
import {
  Textarea,
  TextareaModule
} from "./chunk-QPJC6RD6.js";
import {
  Select,
  SelectModule
} from "./chunk-IHOQCUVC.js";
import {
  InputText,
  InputTextModule
} from "./chunk-UR4GPL7H.js";
import "./chunk-ZDG3GNHS.js";
import "./chunk-JL6DBWWC.js";
import "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  DefaultValueAccessor,
  EmailValidator,
  FormsModule,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import "./chunk-UHTXY4UO.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E5MYAYBP.js";

// src/app/municipal/municipal-contact.ts
function MunicipalContact_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-message", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ".");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const receipt_r2 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", receipt_r2.message, " R\xE9f\xE9rence : ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(receipt_r2.receipt_number);
  }
}
function MunicipalContact_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-message", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
var MunicipalContact = class _MunicipalContact {
  content = inject(MunicipalContentService);
  route = inject(ActivatedRoute);
  services = signal([], ...ngDevMode ? [{ debugName: "services" }] : []);
  receipt = signal(null, ...ngDevMode ? [{ debugName: "receipt" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  sending = signal(false, ...ngDevMode ? [{ debugName: "sending" }] : []);
  form = { service_id: null, sender_name: "", sender_email: "", subject: "", message: "" };
  ngOnInit() {
    this.form.service_id = this.route.snapshot.queryParamMap.get("service");
    this.content.services().subscribe({ next: (items) => this.services.set(items) });
  }
  send(form) {
    if (form.invalid) {
      return;
    }
    this.sending.set(true);
    this.error.set(null);
    this.content.sendContact(this.form).subscribe({
      next: (receipt) => {
        this.receipt.set(receipt);
        this.sending.set(false);
        form.resetForm({ service_id: null });
      },
      error: () => {
        this.error.set("L'envoi a \xE9chou\xE9. Veuillez r\xE9essayer.");
        this.sending.set(false);
      }
    });
  }
  static \u0275fac = function MunicipalContact_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalContact)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalContact, selectors: [["app-municipal-contact"]], decls: 31, vars: 11, consts: [["contactForm", "ngForm"], [1, "contact-page"], [1, "eyebrow"], [1, "intro"], ["severity", "success"], ["severity", "error"], [3, "ngSubmit"], [1, "form-grid"], ["for", "name"], ["pInputText", "", "id", "name", "name", "sender_name", "required", "", "minlength", "2", 3, "ngModelChange", "ngModel"], ["for", "email"], ["pInputText", "", "id", "email", "type", "email", "name", "sender_email", "required", "", "email", "", 3, "ngModelChange", "ngModel"], ["for", "service"], ["inputId", "service", "name", "service_id", "optionLabel", "name", "optionValue", "id", "placeholder", "Choisir un service", 3, "ngModelChange", "ngModel", "options", "showClear"], ["for", "subject"], ["pInputText", "", "id", "subject", "name", "subject", "required", "", "minlength", "3", 3, "ngModelChange", "ngModel"], ["for", "message"], ["pTextarea", "", "id", "message", "name", "message", "required", "", "minlength", "10", "rows", "7", 3, "ngModelChange", "ngModel"], ["pButton", "", "type", "submit", "label", "Envoyer le message", "icon", "pi pi-send", 3, "loading", "disabled"]], template: function MunicipalContact_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "section", 1)(1, "p", 2);
      \u0275\u0275text(2, "Nous contacter");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h1");
      \u0275\u0275text(4, "\xC9crivez aux services municipaux");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Votre message est transmis \xE0 l'\xE9quipe concern\xE9e. Un accus\xE9 de r\xE9ception vous sera remis imm\xE9diatement.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, MunicipalContact_Conditional_7_Template, 5, 2, "p-message", 4);
      \u0275\u0275conditionalCreate(8, MunicipalContact_Conditional_8_Template, 2, 1, "p-message", 5);
      \u0275\u0275elementStart(9, "p-card")(10, "form", 6, 0);
      \u0275\u0275listener("ngSubmit", function MunicipalContact_Template_form_ngSubmit_10_listener() {
        \u0275\u0275restoreView(_r1);
        const contactForm_r3 = \u0275\u0275reference(11);
        return \u0275\u0275resetView(ctx.send(contactForm_r3));
      });
      \u0275\u0275elementStart(12, "div", 7)(13, "div")(14, "label", 8);
      \u0275\u0275text(15, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.sender_name, $event) || (ctx.form.sender_name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div")(18, "label", 10);
      \u0275\u0275text(19, "E-mail");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.sender_email, $event) || (ctx.form.sender_email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "label", 12);
      \u0275\u0275text(22, "Service concern\xE9 (facultatif)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p-select", 13);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Template_p_select_ngModelChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.service_id, $event) || (ctx.form.service_id = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "label", 14);
      \u0275\u0275text(25, "Objet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Template_input_ngModelChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.subject, $event) || (ctx.form.subject = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "label", 16);
      \u0275\u0275text(28, "Message");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "textarea", 17);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalContact_Template_textarea_ngModelChange_29_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.message, $event) || (ctx.form.message = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "button", 18);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      const contactForm_r3 = \u0275\u0275reference(11);
      \u0275\u0275advance(7);
      \u0275\u0275conditional((tmp_1_0 = ctx.receipt()) ? 7 : -1, tmp_1_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.error()) ? 8 : -1, tmp_2_0);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.sender_name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.sender_email);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.service_id);
      \u0275\u0275property("options", ctx.services())("showClear", true);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.subject);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.message);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.sending())("disabled", contactForm_r3.invalid);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, EmailValidator, NgModel, NgForm, ButtonModule, ButtonDirective, CardModule, Card, InputTextModule, InputText, MessageModule, Message, SelectModule, Select, TextareaModule, Textarea], styles: ["\n\n.contact-page[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\np-message[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 1rem;\n}\nform[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.75rem;\n}\n.form-grid[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n}\nlabel[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\ninput[_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  width: 100%;\n}\nbutton[_ngcontent-%COMP%] {\n  justify-self: start;\n  margin-top: 0.5rem;\n}\n@media (max-width: 600px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=municipal-contact.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalContact, [{
    type: Component,
    args: [{ selector: "app-municipal-contact", imports: [FormsModule, ButtonModule, CardModule, InputTextModule, MessageModule, SelectModule, TextareaModule], template: `<section class="contact-page"><p class="eyebrow">Nous contacter</p><h1>\xC9crivez aux services municipaux</h1><p class="intro">Votre message est transmis \xE0 l'\xE9quipe concern\xE9e. Un accus\xE9 de r\xE9ception vous sera remis imm\xE9diatement.</p>@if (receipt(); as receipt) { <p-message severity="success">{{ receipt.message }} R\xE9f\xE9rence : <strong>{{ receipt.receipt_number }}</strong>.</p-message> } @if (error(); as error) { <p-message severity="error">{{ error }}</p-message> }<p-card><form #contactForm="ngForm" (ngSubmit)="send(contactForm)"><div class="form-grid"><div><label for="name">Nom</label><input pInputText id="name" name="sender_name" [(ngModel)]="form.sender_name" required minlength="2"></div><div><label for="email">E-mail</label><input pInputText id="email" type="email" name="sender_email" [(ngModel)]="form.sender_email" required email></div></div><label for="service">Service concern\xE9 (facultatif)</label><p-select inputId="service" name="service_id" [(ngModel)]="form.service_id" [options]="services()" optionLabel="name" optionValue="id" placeholder="Choisir un service" [showClear]="true"></p-select><label for="subject">Objet</label><input pInputText id="subject" name="subject" [(ngModel)]="form.subject" required minlength="3"><label for="message">Message</label><textarea pTextarea id="message" name="message" [(ngModel)]="form.message" required minlength="10" rows="7"></textarea><button pButton type="submit" label="Envoyer le message" icon="pi pi-send" [loading]="sending()" [disabled]="contactForm.invalid"></button></form></p-card></section>
`, styles: ["/* src/app/municipal/municipal-contact.scss */\n.contact-page {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\np-message {\n  display: block;\n  margin-bottom: 1rem;\n}\nform {\n  display: grid;\n  gap: 0.75rem;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.75rem;\n}\n.form-grid > div {\n  display: grid;\n  gap: 0.4rem;\n}\nlabel {\n  font-weight: 600;\n}\ninput,\ntextarea {\n  width: 100%;\n}\nbutton {\n  justify-self: start;\n  margin-top: 0.5rem;\n}\n@media (max-width: 600px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=municipal-contact.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalContact, { className: "MunicipalContact", filePath: "src/app/municipal/municipal-contact.ts", lineNumber: 14 });
})();
export {
  MunicipalContact
};
//# sourceMappingURL=chunk-EVHTBY3W.js.map
