import {
  AgoPipe,
  ArrivalPipe,
  STATUS_OPTIONS,
  TerraNovaStore,
  XpPipe,
  difficultyLabel,
  difficultySeverity,
  waveLabel
} from "./chunk-KHJ46OSZ.js";
import "./chunk-V7U3SW4H.js";
import {
  RouterOutlet
} from "./chunk-O26HSNKS.js";
import {
  Dialog,
  DialogModule
} from "./chunk-W24WFQPP.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
import {
  Select,
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
import {
  Tooltip,
  TooltipModule
} from "./chunk-4SKMWIOF.js";
import "./chunk-JGSODWB6.js";
import {
  Button,
  ButtonModule
} from "./chunk-MVSMOWLB.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-SR5QZYJT.js";
import "./chunk-WHXYSCHV.js";
import {
  MessageService
} from "./chunk-UHTXY4UO.js";
import "./chunk-K3YQDOX3.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
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
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E5MYAYBP.js";

// src/app/terra-nova/request-detail/tn-request-detail.ts
var _c0 = () => ({ width: "44rem" });
var _c1 = () => ({ "768px": "95vw" });
function TerraNovaRequestDetail_Conditional_1_ng_template_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 18);
  }
}
function TerraNovaRequestDetail_Conditional_1_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "p-tag", 17);
    \u0275\u0275conditionalCreate(4, TerraNovaRequestDetail_Conditional_1_ng_template_0_Conditional_4_Template, 1, 0, "p-tag", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r2.request_code);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.difficultyLabel(r_r2.difficulty_level, r_r2.difficulty))("severity", ctx_r2.difficultySeverity(r_r2.difficulty_level));
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r2.is_ai_request || r_r2.is_ai_related ? 4 : -1);
  }
}
function TerraNovaRequestDetail_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const r_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 ", r_r2.group_name, " ");
  }
}
function TerraNovaRequestDetail_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, TerraNovaRequestDetail_Conditional_1_ng_template_0_Template, 5, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "span", 4);
    \u0275\u0275element(5, "i", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6)(7, "span", 7);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 8);
    \u0275\u0275text(10);
    \u0275\u0275conditionalCreate(11, TerraNovaRequestDetail_Conditional_1_Conditional_11_Template, 1, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div")(13, "div", 9);
    \u0275\u0275text(14, "Message public");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "blockquote", 10);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 11)(18, "div")(19, "div", 12);
    \u0275\u0275text(20, "XP de base");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 13);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "xp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div")(25, "div", 12);
    \u0275\u0275text(26, "Bonus temps");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 13);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "xp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "div", 12);
    \u0275\u0275text(32, "XP total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 14);
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "xp");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "div", 12);
    \u0275\u0275text(38, "XP disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 13);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "xp");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(42, "div", 11)(43, "div")(44, "div", 12);
    \u0275\u0275text(45, "Vague");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span", 13);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div")(49, "div", 12);
    \u0275\u0275text(50, "Type d'arriv\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 13);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div")(54, "div", 12);
    \u0275\u0275text(55, "Temps d'arriv\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span", 13);
    \u0275\u0275text(57);
    \u0275\u0275pipe(58, "arrival");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div")(60, "div", 12);
    \u0275\u0275text(61, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "p-select", 15);
    \u0275\u0275listener("ngModelChange", function TerraNovaRequestDetail_Conditional_1_Template_p_select_ngModelChange_62_listener($event) {
      const r_r2 = \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setStatus(r_r2.request_code, $event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const r_r2 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(r_r2.requester_name || "Demandeur inconnu");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", r_r2.requester_type, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r2.group_name ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(r_r2.message_public);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 13, r_r2.xp_base));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 15, r_r2.xp_time_bonus, true));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(35, 18, r_r2.xp_total));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 20, r_r2.xp_available));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.waveLabel(r_r2));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(r_r2.arrival_type || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(58, 22, r_r2.arrival_time));
    \u0275\u0275advance(5);
    \u0275\u0275property("options", ctx_r2.statusOptions)("ngModel", r_r2.status);
  }
}
var TerraNovaRequestDetail = class _TerraNovaRequestDetail {
  store = inject(TerraNovaStore);
  statusOptions = STATUS_OPTIONS;
  difficultyLabel = difficultyLabel;
  difficultySeverity = difficultySeverity;
  waveLabel = waveLabel;
  onVisibleChange(visible) {
    if (!visible)
      this.store.closeDetail();
  }
  setStatus(code, status) {
    this.store.updateStatus(code, status);
  }
  static \u0275fac = function TerraNovaRequestDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaRequestDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerraNovaRequestDetail, selectors: [["app-terra-nova-request-detail"]], decls: 2, vars: 10, consts: [["header", ""], [3, "visibleChange", "visible", "modal", "dismissableMask", "draggable", "breakpoints"], [1, "flex", "flex-col", "gap-5"], [1, "flex", "items-center", "gap-3"], [1, "flex", "h-9", "w-9", "items-center", "justify-center", "rounded-full", "bg-emphasis"], [1, "pi", "pi-user"], [1, "flex", "flex-col"], [1, "font-semibold"], [1, "text-sm", "text-muted-color"], [1, "mb-2", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-muted-color"], [1, "m-0", "whitespace-pre-line", "rounded-r-lg", "border-l-4", "border-primary", "bg-emphasis", "px-4", "py-3", "leading-relaxed"], [1, "grid", "grid-cols-2", "gap-4", "md:grid-cols-4"], [1, "mb-1", "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-muted-color"], [1, "font-medium"], [1, "font-bold", "text-primary"], ["optionLabel", "label", "optionValue", "value", "size", "small", "appendTo", "body", "ariaLabel", "Statut", 3, "ngModelChange", "options", "ngModel"], [1, "font-mono", "text-xl", "font-bold"], [3, "value", "severity"], ["value", "IA", "severity", "contrast", "icon", "pi pi-sparkles"]], template: function TerraNovaRequestDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p-dialog", 1);
      \u0275\u0275listener("visibleChange", function TerraNovaRequestDetail_Template_p_dialog_visibleChange_0_listener($event) {
        return ctx.onVisibleChange($event);
      });
      \u0275\u0275conditionalCreate(1, TerraNovaRequestDetail_Conditional_1_Template, 63, 24);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(8, _c0));
      \u0275\u0275property("visible", !!ctx.store.selected())("modal", true)("dismissableMask", true)("draggable", false)("breakpoints", \u0275\u0275pureFunction0(9, _c1));
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.store.selected()) ? 1 : -1, tmp_6_0);
    }
  }, dependencies: [FormsModule, NgControlStatus, NgModel, DialogModule, Dialog, SelectModule, Select, TagModule, Tag, ArrivalPipe, XpPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaRequestDetail, [{
    type: Component,
    args: [{ selector: "app-terra-nova-request-detail", imports: [FormsModule, DialogModule, SelectModule, TagModule, ArrivalPipe, XpPipe], template: `<p-dialog [visible]="!!store.selected()" (visibleChange)="onVisibleChange($event)" [modal]="true" [dismissableMask]="true" [draggable]="false" [style]="{ width: '44rem' }" [breakpoints]="{ '768px': '95vw' }">
    @if (store.selected(); as r) {
        <ng-template #header>
            <div class="flex items-center gap-3">
                <span class="font-mono text-xl font-bold">{{ r.request_code }}</span>
                <p-tag [value]="difficultyLabel(r.difficulty_level, r.difficulty)" [severity]="difficultySeverity(r.difficulty_level)" />
                @if (r.is_ai_request || r.is_ai_related) {
                    <p-tag value="IA" severity="contrast" icon="pi pi-sparkles" />
                }
            </div>
        </ng-template>

        <div class="flex flex-col gap-5">
            <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-emphasis"><i class="pi pi-user"></i></span>
                <div class="flex flex-col">
                    <span class="font-semibold">{{ r.requester_name || 'Demandeur inconnu' }}</span>
                    <span class="text-sm text-muted-color"
                        >{{ r.requester_type }}
                        @if (r.group_name) {
                            \xB7 {{ r.group_name }}
                        }
                    </span>
                </div>
            </div>

            <div>
                <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-color">Message public</div>
                <blockquote class="m-0 whitespace-pre-line rounded-r-lg border-l-4 border-primary bg-emphasis px-4 py-3 leading-relaxed">{{ r.message_public }}</blockquote>
            </div>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">XP de base</div>
                    <span class="font-medium">{{ r.xp_base | xp }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">Bonus temps</div>
                    <span class="font-medium">{{ r.xp_time_bonus | xp: true }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">XP total</div>
                    <span class="font-bold text-primary">{{ r.xp_total | xp }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">XP disponible</div>
                    <span class="font-medium">{{ r.xp_available | xp }}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">Vague</div>
                    <span class="font-medium">{{ waveLabel(r) }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">Type d'arriv\xE9e</div>
                    <span class="font-medium">{{ r.arrival_type || '\u2014' }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">Temps d'arriv\xE9e</div>
                    <span class="font-medium">{{ r.arrival_time | arrival }}</span>
                </div>
                <div>
                    <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-color">Statut</div>
                    <p-select [options]="statusOptions" optionLabel="label" optionValue="value" [ngModel]="r.status" (ngModelChange)="setStatus(r.request_code, $event)" size="small" appendTo="body" ariaLabel="Statut" />
                </div>
            </div>
        </div>
    }
</p-dialog>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerraNovaRequestDetail, { className: "TerraNovaRequestDetail", filePath: "src/app/terra-nova/request-detail/tn-request-detail.ts", lineNumber: 16 });
})();

// src/app/terra-nova/terra-nova.ts
function TerraNova_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "API Terra Nova connect\xE9e");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "ago");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Derni\xE8re synchronisation : ", \u0275\u0275pipeBind2(4, 1, (tmp_1_0 = ctx_r0.store.session()) == null ? null : tmp_1_0.last_sync_success_at, ctx_r0.store.now()));
  }
}
function TerraNova_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "API Terra Nova : erreur de connexion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 11);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "ago");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Derni\xE8re synchronisation r\xE9ussie : ", \u0275\u0275pipeBind2(4, 1, (tmp_1_0 = ctx_r0.store.session()) == null ? null : tmp_1_0.last_sync_success_at, ctx_r0.store.now()));
  }
}
function TerraNova_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "Connexion\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 11);
    \u0275\u0275text(3, "Premi\xE8re synchronisation en cours");
    \u0275\u0275elementEnd();
  }
}
function TerraNova_Conditional_16_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1, "Nouvelle tentative automatique toutes les 10 s.");
    \u0275\u0275elementEnd();
  }
}
function TerraNova_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275elementStart(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, TerraNova_Conditional_16_Conditional_4_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("pi-lock", ctx_r0.store.forbidden())("pi-server", !ctx_r0.store.forbidden());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.store.forbidden() ? 4 : -1);
  }
}
function TerraNova_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
var TerraNova = class _TerraNova {
  store = inject(TerraNovaStore);
  /** ok | error | pending */
  apiState = computed(() => {
    const s = this.store.session();
    if (!s?.last_sync_attempt_at)
      return "pending";
    return s.api_ok ? "ok" : "error";
  }, ...ngDevMode ? [{ debugName: "apiState" }] : []);
  static \u0275fac = function TerraNova_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNova)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerraNova, selectors: [["app-terra-nova"]], features: [\u0275\u0275ProvidersFeature([TerraNovaStore, MessageService])], decls: 19, vars: 14, consts: [[1, "card", "mb-4!", "py-4!"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-4"], [1, "m-0", "text-xl!", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "items-center", "gap-4"], ["tooltipPosition", "bottom", 1, "flex", "items-center", "gap-3", 3, "pTooltip"], [1, "inline-block", "h-2.5", "w-2.5", "shrink-0", "rounded-full"], [1, "flex", "flex-col", "leading-tight"], ["label", "Synchroniser", "icon", "pi pi-refresh", "severity", "secondary", "size", "small", "pTooltip", "Interroger l'API Terra Nova maintenant", "tooltipPosition", "bottom", 3, "onClick", "outlined", "loading", "disabled"], [1, "card", "flex", "flex-col", "items-center", "gap-2", "py-10!", "text-center"], [1, "text-sm", "font-semibold"], [1, "text-xs", "text-muted-color"], [1, "pi", "text-3xl", "text-muted-color"], [1, "font-semibold"], [1, "text-sm", "text-muted-color"]], template: function TerraNova_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "p-toast");
      \u0275\u0275elementStart(1, "div", 0)(2, "div", 1)(3, "div")(4, "h1", 2);
      \u0275\u0275text(5, "Terra Nova \u2014 suivi des demandes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 3);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 4)(9, "div", 5);
      \u0275\u0275element(10, "span", 6);
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275conditionalCreate(12, TerraNova_Case_12_Template, 5, 4)(13, TerraNova_Case_13_Template, 5, 4)(14, TerraNova_Case_14_Template, 4, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "p-button", 8);
      \u0275\u0275listener("onClick", function TerraNova_Template_p_button_onClick_15_listener() {
        return ctx.store.syncNow();
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(16, TerraNova_Conditional_16_Template, 5, 6, "div", 9);
      \u0275\u0275conditionalCreate(17, TerraNova_Conditional_17_Template, 1, 0, "router-outlet");
      \u0275\u0275element(18, "app-terra-nova-request-detail");
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_5_0;
      let tmp_9_0;
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("Demandes publi\xE9es par l'API officielle, synchronis\xE9es automatiquement toutes les ", ((tmp_0_0 = ctx.store.overview()) == null ? null : tmp_0_0.sync_interval_seconds) ?? 30, " s.");
      \u0275\u0275advance(2);
      \u0275\u0275property("pTooltip", ((tmp_1_0 = ctx.store.session()) == null ? null : tmp_1_0.last_sync_error) ?? void 0);
      \u0275\u0275advance();
      \u0275\u0275classProp("bg-green-500", ctx.apiState() === "ok")("bg-red-500", ctx.apiState() === "error")("bg-amber-500", ctx.apiState() === "pending");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_5_0 = ctx.apiState()) === "ok" ? 12 : tmp_5_0 === "error" ? 13 : 14);
      \u0275\u0275advance(3);
      \u0275\u0275property("outlined", true)("loading", ctx.store.syncing())("disabled", ctx.store.forbidden());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_9_0 = ctx.store.loadError()) ? 16 : -1, tmp_9_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.store.forbidden() ? 17 : -1);
    }
  }, dependencies: [RouterOutlet, ButtonModule, Button, ToastModule, Toast, TooltipModule, Tooltip, TerraNovaRequestDetail, AgoPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNova, [{
    type: Component,
    args: [{ selector: "app-terra-nova", imports: [RouterOutlet, ButtonModule, ToastModule, TooltipModule, AgoPipe, TerraNovaRequestDetail], providers: [TerraNovaStore, MessageService], template: `<p-toast />

<div class="card mb-4! py-4!">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 class="m-0 text-xl! font-semibold">Terra Nova \u2014 suivi des demandes</h1>
            <p class="mt-1 mb-0 text-sm text-muted-color">Demandes publi\xE9es par l'API officielle, synchronis\xE9es automatiquement toutes les {{ store.overview()?.sync_interval_seconds ?? 30 }} s.</p>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex items-center gap-3" [pTooltip]="store.session()?.last_sync_error ?? undefined" tooltipPosition="bottom">
                <span class="inline-block h-2.5 w-2.5 shrink-0 rounded-full" [class.bg-green-500]="apiState() === 'ok'" [class.bg-red-500]="apiState() === 'error'" [class.bg-amber-500]="apiState() === 'pending'"></span>
                <div class="flex flex-col leading-tight">
                    @switch (apiState()) {
                        @case ('ok') {
                            <span class="text-sm font-semibold">API Terra Nova connect\xE9e</span>
                            <span class="text-xs text-muted-color">Derni\xE8re synchronisation : {{ store.session()?.last_sync_success_at | ago: store.now() }}</span>
                        }
                        @case ('error') {
                            <span class="text-sm font-semibold">API Terra Nova : erreur de connexion</span>
                            <span class="text-xs text-muted-color">Derni\xE8re synchronisation r\xE9ussie : {{ store.session()?.last_sync_success_at | ago: store.now() }}</span>
                        }
                        @default {
                            <span class="text-sm font-semibold">Connexion\u2026</span>
                            <span class="text-xs text-muted-color">Premi\xE8re synchronisation en cours</span>
                        }
                    }
                </div>
            </div>
            <p-button
                label="Synchroniser"
                icon="pi pi-refresh"
                severity="secondary"
                [outlined]="true"
                size="small"
                [loading]="store.syncing()"
                [disabled]="store.forbidden()"
                (onClick)="store.syncNow()"
                pTooltip="Interroger l'API Terra Nova maintenant"
                tooltipPosition="bottom"
            />
        </div>
    </div>
</div>

@if (store.loadError(); as error) {
    <div class="card flex flex-col items-center gap-2 py-10! text-center">
        <i class="pi text-3xl text-muted-color" [class.pi-lock]="store.forbidden()" [class.pi-server]="!store.forbidden()"></i>
        <span class="font-semibold">{{ error }}</span>
        @if (!store.forbidden()) {
            <span class="text-sm text-muted-color">Nouvelle tentative automatique toutes les 10 s.</span>
        }
    </div>
}

@if (!store.forbidden()) {
    <router-outlet />
}

<app-terra-nova-request-detail />
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerraNova, { className: "TerraNova", filePath: "src/app/terra-nova/terra-nova.ts", lineNumber: 21 });
})();

// src/app/terra-nova/terra-nova.routes.ts
var terra_nova_routes_default = [
  {
    path: "",
    component: TerraNova,
    children: [
      { path: "", data: { breadcrumb: "Tableau de bord" }, loadComponent: () => import("./chunk-GLZCZEPA.js").then((m) => m.TerraNovaDashboard) },
      { path: "demandes", data: { breadcrumb: "Demandes API" }, loadComponent: () => import("./chunk-5G5DTYHZ.js").then((m) => m.TerraNovaRequests) },
      { path: "notifications", data: { breadcrumb: "Notifications" }, loadComponent: () => import("./chunk-A3Q7F23K.js").then((m) => m.TerraNovaNotifications) },
      { path: "pipeline", data: { breadcrumb: "Pipeline" }, loadComponent: () => import("./chunk-LXWF2XCW.js").then((m) => m.TerraNovaPipeline) }
    ]
  }
];
export {
  terra_nova_routes_default as default
};
//# sourceMappingURL=chunk-XPU7HL44.js.map
