import {
  Skeleton,
  SkeletonModule
} from "./chunk-KN2LDVQG.js";
import {
  AgoPipe,
  TerraNovaStore,
  XpPipe,
  difficultyLabel,
  difficultySeverity
} from "./chunk-KHJ46OSZ.js";
import "./chunk-V7U3SW4H.js";
import {
  SelectButton,
  SelectButtonModule
} from "./chunk-WBYO2P7A.js";
import {
  Tag,
  TagModule
} from "./chunk-BBVTDSXM.js";
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
import "./chunk-UHTXY4UO.js";
import "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdeclareLet,
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
  ɵɵreadContextLet,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E5MYAYBP.js";

// src/app/terra-nova/notifications/tn-notifications.ts
var _c0 = () => [1, 2, 3, 4];
var _forTrack0 = ($index, $item) => $item.key;
function TerraNovaNotifications_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r0.store.unreadCount() + " non lue(s)")("rounded", true);
  }
}
function TerraNovaNotifications_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "Tout est lu");
    \u0275\u0275elementEnd();
  }
}
function TerraNovaNotifications_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-skeleton", 9);
  }
}
function TerraNovaNotifications_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TerraNovaNotifications_Conditional_10_For_1_Template, 1, 0, "p-skeleton", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r3.request_code);
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 23)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "xp");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "p-tag", 24);
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const r_r4 = \u0275\u0275readContextLet(0);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r4.message_public);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 5, r_r4.xp_total, true));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", "Difficult\xE9 : " + ctx_r0.difficultyLabel(r_r4.difficulty_level, r_r4.difficulty))("severity", ctx_r0.difficultySeverity(r_r4.difficulty_level));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r4.requester_name);
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(n_r3.message);
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 26);
    \u0275\u0275listener("onClick", function TerraNovaNotifications_Conditional_11_For_1_Conditional_20_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r5);
      const n_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.store.markRead(n_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("text", true);
  }
}
function TerraNovaNotifications_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "div", 12)(2, "span", 13);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 14);
    \u0275\u0275listener("click", function TerraNovaNotifications_Conditional_11_For_1_Template_button_click_4_listener() {
      const n_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.open(n_r3));
    });
    \u0275\u0275elementStart(5, "span", 15)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, TerraNovaNotifications_Conditional_11_For_1_Conditional_8_Template, 2, 1, "span", 16);
    \u0275\u0275conditionalCreate(9, TerraNovaNotifications_Conditional_11_For_1_Conditional_9_Template, 1, 0, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, TerraNovaNotifications_Conditional_11_For_1_Conditional_10_Template, 9, 8)(11, TerraNovaNotifications_Conditional_11_For_1_Conditional_11_Template, 2, 1, "span", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 18)(13, "span", 19);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 20);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "ago");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, TerraNovaNotifications_Conditional_11_For_1_Conditional_20_Template, 1, 1, "p-button", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const n_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    const r_r6 = \u0275\u0275storeLet(n_r3.request_code ? ctx_r0.store.byCode().get(n_r3.request_code) : void 0);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-highlight", !n_r3.is_read);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(n_r3.kind === "new_wave" ? "pi pi-megaphone text-amber-500" : "pi pi-inbox text-primary");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(n_r3.kind === "new_request" ? "Nouvelle demande" : n_r3.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r3.request_code ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!n_r3.is_read ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(r_r6 ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", \u0275\u0275pipeBind2(14, 13, n_r3.created_at, "dd/MM/yyyy HH:mm:ss"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 16, n_r3.created_at, "dd/MM HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 19, n_r3.created_at, ctx_r0.store.now()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!n_r3.is_read ? 20 : -1);
  }
}
function TerraNovaNotifications_Conditional_11_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 27);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 28);
    \u0275\u0275text(5, "Les nouvelles demandes appara\xEEtront ici d\xE8s leur diffusion par l'API.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.filter() === "unread" ? "Aucune notification non lue." : "Aucune notification pour le moment.");
  }
}
function TerraNovaNotifications_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, TerraNovaNotifications_Conditional_11_For_1_Template, 21, 22, "div", 10, _forTrack0, false, TerraNovaNotifications_Conditional_11_ForEmpty_2_Template, 6, 1, "div", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.visible());
  }
}
var TerraNovaNotifications = class _TerraNovaNotifications {
  store = inject(TerraNovaStore);
  difficultyLabel = difficultyLabel;
  difficultySeverity = difficultySeverity;
  filter = signal("all", ...ngDevMode ? [{ debugName: "filter" }] : []);
  filterOptions = [
    { value: "all", label: "Toutes" },
    { value: "unread", label: "Non lues" }
  ];
  visible = computed(() => this.filter() === "unread" ? this.store.notifications().filter((n) => !n.is_read) : this.store.notifications(), ...ngDevMode ? [{ debugName: "visible" }] : []);
  open(notification) {
    this.store.markRead(notification);
    if (notification.request_code)
      this.store.openDetail(notification.request_code);
  }
  static \u0275fac = function TerraNovaNotifications_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerraNovaNotifications)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerraNovaNotifications, selectors: [["app-terra-nova-notifications"]], decls: 12, vars: 7, consts: [[1, "card"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-3"], [1, "m-0", "text-lg!", "font-semibold"], ["severity", "danger", 3, "value", "rounded"], [1, "text-sm", "text-muted-color"], [1, "flex", "flex-wrap", "gap-2"], ["optionLabel", "label", "optionValue", "value", "size", "small", 3, "ngModelChange", "options", "allowEmpty", "ngModel"], ["label", "Tout marquer comme lu", "icon", "pi pi-check-square", "size", "small", 3, "onClick", "outlined", "disabled"], ["height", "4.5rem", "styleClass", "mb-2"], [1, "grid", "grid-cols-[auto_1fr_auto]", "items-start", "gap-4", "rounded-lg", "border-b", "border-surface", "px-3", "py-4", "last:border-b-0", 3, "bg-highlight"], [1, "flex", "flex-col", "items-center", "gap-2", "py-10", "text-center", "text-muted-color"], [1, "grid", "grid-cols-[auto_1fr_auto]", "items-start", "gap-4", "rounded-lg", "border-b", "border-surface", "px-3", "py-4", "last:border-b-0"], [1, "flex", "h-9", "w-9", "items-center", "justify-center", "rounded-lg", "bg-emphasis"], ["type", "button", 1, "flex", "min-w-0", "cursor-pointer", "flex-col", "gap-1.5", "border-0", "bg-transparent", "p-0", "text-left", "text-color", 3, "click"], [1, "flex", "items-center", "gap-2"], [1, "font-mono", "font-semibold", "text-primary"], [1, "inline-block", "h-2", "w-2", "rounded-full", "bg-primary"], [1, "flex", "flex-col", "items-end", "gap-1", "text-sm", "whitespace-nowrap"], [3, "title"], [1, "text-xs", "text-muted-color"], ["label", "Marquer comme lu", "icon", "pi pi-check", "size", "small", 3, "text"], [1, "line-clamp-2", "text-sm", "text-muted-color"], [1, "flex", "flex-wrap", "items-center", "gap-3", "text-sm"], [3, "value", "severity"], [1, "text-muted-color"], ["label", "Marquer comme lu", "icon", "pi pi-check", "size", "small", 3, "onClick", "text"], [1, "pi", "pi-bell-slash", "text-2xl"], [1, "text-sm"]], template: function TerraNovaNotifications_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Notifications");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, TerraNovaNotifications_Conditional_5_Template, 1, 2, "p-tag", 4)(6, TerraNovaNotifications_Conditional_6_Template, 2, 0, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6)(8, "p-selectbutton", 7);
      \u0275\u0275listener("ngModelChange", function TerraNovaNotifications_Template_p_selectbutton_ngModelChange_8_listener($event) {
        return ctx.filter.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p-button", 8);
      \u0275\u0275listener("onClick", function TerraNovaNotifications_Template_p_button_onClick_9_listener() {
        return ctx.store.markAllRead();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(10, TerraNovaNotifications_Conditional_10_Template, 2, 1)(11, TerraNovaNotifications_Conditional_11_Template, 3, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.store.unreadCount() ? 5 : 6);
      \u0275\u0275advance(3);
      \u0275\u0275property("options", ctx.filterOptions)("allowEmpty", false)("ngModel", ctx.filter());
      \u0275\u0275advance();
      \u0275\u0275property("outlined", true)("disabled", !ctx.store.unreadCount());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.store.loaded() ? 10 : 11);
    }
  }, dependencies: [FormsModule, NgControlStatus, NgModel, ButtonModule, Button, SelectButtonModule, SelectButton, SkeletonModule, Skeleton, TagModule, Tag, DatePipe, AgoPipe, XpPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerraNovaNotifications, [{
    type: Component,
    args: [{ selector: "app-terra-nova-notifications", imports: [DatePipe, FormsModule, ButtonModule, SelectButtonModule, SkeletonModule, TagModule, AgoPipe, XpPipe], template: `<div class="card">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
            <h2 class="m-0 text-lg! font-semibold">Notifications</h2>
            @if (store.unreadCount()) {
                <p-tag [value]="store.unreadCount() + ' non lue(s)'" severity="danger" [rounded]="true" />
            } @else {
                <span class="text-sm text-muted-color">Tout est lu</span>
            }
        </div>
        <div class="flex flex-wrap gap-2">
            <p-selectbutton [options]="filterOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" [ngModel]="filter()" (ngModelChange)="filter.set($event)" size="small" />
            <p-button label="Tout marquer comme lu" icon="pi pi-check-square" size="small" [outlined]="true" [disabled]="!store.unreadCount()" (onClick)="store.markAllRead()" />
        </div>
    </div>

    @if (!store.loaded()) {
        @for (i of [1, 2, 3, 4]; track i) {
            <p-skeleton height="4.5rem" styleClass="mb-2" />
        }
    } @else {
        @for (n of visible(); track n.key) {
            @let r = n.request_code ? store.byCode().get(n.request_code) : undefined;
            <div class="grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-lg border-b border-surface px-3 py-4 last:border-b-0" [class.bg-highlight]="!n.is_read">
                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-emphasis">
                    <i [class]="n.kind === 'new_wave' ? 'pi pi-megaphone text-amber-500' : 'pi pi-inbox text-primary'"></i>
                </span>

                <button type="button" class="flex min-w-0 cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-0 text-left text-color" (click)="open(n)">
                    <span class="flex items-center gap-2">
                        <strong>{{ n.kind === 'new_request' ? 'Nouvelle demande' : n.title }}</strong>
                        @if (n.request_code) {
                            <span class="font-mono font-semibold text-primary">{{ n.request_code }}</span>
                        }
                        @if (!n.is_read) {
                            <span class="inline-block h-2 w-2 rounded-full bg-primary"></span>
                        }
                    </span>
                    @if (r) {
                        <span class="line-clamp-2 text-sm text-muted-color">{{ r.message_public }}</span>
                        <span class="flex flex-wrap items-center gap-3 text-sm">
                            <strong>{{ r.xp_total | xp: true }}</strong>
                            <p-tag [value]="'Difficult\xE9 : ' + difficultyLabel(r.difficulty_level, r.difficulty)" [severity]="difficultySeverity(r.difficulty_level)" />
                            <span class="text-muted-color">{{ r.requester_name }}</span>
                        </span>
                    } @else {
                        <span class="text-sm text-muted-color">{{ n.message }}</span>
                    }
                </button>

                <div class="flex flex-col items-end gap-1 text-sm whitespace-nowrap">
                    <span [title]="n.created_at | date: 'dd/MM/yyyy HH:mm:ss'">{{ n.created_at | date: 'dd/MM HH:mm:ss' }}</span>
                    <span class="text-xs text-muted-color">{{ n.created_at | ago: store.now() }}</span>
                    @if (!n.is_read) {
                        <p-button label="Marquer comme lu" icon="pi pi-check" size="small" [text]="true" (onClick)="store.markRead(n)" />
                    }
                </div>
            </div>
        } @empty {
            <div class="flex flex-col items-center gap-2 py-10 text-center text-muted-color">
                <i class="pi pi-bell-slash text-2xl"></i>
                <span>{{ filter() === 'unread' ? 'Aucune notification non lue.' : 'Aucune notification pour le moment.' }}</span>
                <span class="text-sm">Les nouvelles demandes appara\xEEtront ici d\xE8s leur diffusion par l'API.</span>
            </div>
        }
    }
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerraNovaNotifications, { className: "TerraNovaNotifications", filePath: "src/app/terra-nova/notifications/tn-notifications.ts", lineNumber: 18 });
})();
export {
  TerraNovaNotifications
};
//# sourceMappingURL=chunk-A3Q7F23K.js.map
