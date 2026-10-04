import {
  PublicationReadService
} from "./chunk-2A6L4AZW.js";
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
  ActivatedRoute
} from "./chunk-F3M422Q6.js";
import {
  ConfirmDialog,
  ConfirmDialogModule
} from "./chunk-YTW5QXAE.js";
import {
  InputText,
  InputTextModule,
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
  Dialog,
  DialogModule
} from "./chunk-ZWCF3HLH.js";
import "./chunk-KLPUC4MO.js";
import "./chunk-NAF47H6O.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-U2WLW23Z.js";
import "./chunk-EF3HWUJ3.js";
import "./chunk-QS2LCQSO.js";
import {
  CheckboxControlValueAccessor,
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
  ConfirmationService,
  MessageService
} from "./chunk-YMMGU7DJ.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  __spreadProps,
  __spreadValues,
  computed,
  finalize,
  inject,
  setClassMetadata,
  signal,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-publications.ts
var _c0 = () => ({ width: "min(94vw, 50rem)" });
var _c1 = () => ({ width: "min(94vw, 44rem)" });
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalPublications_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function MunicipalPublications_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreate());
    });
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275text(2, " Vous g\xE9rez les publications de la mairie, y compris les brouillons.");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Actualisation des publications\u2026");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 29);
    \u0275\u0275listener("click", function MunicipalPublications_Conditional_13_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(3, "R\xE9essayer");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx, " ");
  }
}
function MunicipalPublications_For_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 32);
  }
  if (rf & 2) {
    const publication_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", publication_r5.image_url, \u0275\u0275sanitizeUrl)("alt", "");
  }
}
function MunicipalPublications_For_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275element(1, "i", 47);
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_For_16_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "Brouillon");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_For_16_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function MunicipalPublications_For_16_Conditional_25_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const publication_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.likePublication(publication_r5, $event));
    });
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2, " J\u2019aime");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const publication_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("publication-liked", ctx_r1.likedPublicationIds().has(publication_r5.id));
    \u0275\u0275attribute("aria-pressed", ctx_r1.likedPublicationIds().has(publication_r5.id))("aria-label", "Aimer la publication " + publication_r5.title);
    \u0275\u0275advance();
    \u0275\u0275classProp("pi-heart", !ctx_r1.likedPublicationIds().has(publication_r5.id))("pi-heart-fill", ctx_r1.likedPublicationIds().has(publication_r5.id));
  }
}
function MunicipalPublications_For_16_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "button", 50);
    \u0275\u0275listener("click", function MunicipalPublications_For_16_Conditional_26_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const publication_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEdit(publication_r5, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 51);
    \u0275\u0275listener("click", function MunicipalPublications_For_16_Conditional_26_Template_button_click_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const publication_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(publication_r5, $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("text", true);
  }
}
function MunicipalPublications_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 30)(1, "button", 31);
    \u0275\u0275listener("click", function MunicipalPublications_For_16_Template_button_click_1_listener() {
      const publication_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPublication(publication_r5));
    });
    \u0275\u0275conditionalCreate(2, MunicipalPublications_For_16_Conditional_2_Template, 1, 2, "img", 32)(3, MunicipalPublications_For_16_Conditional_3_Template, 2, 0, "span", 33);
    \u0275\u0275elementStart(4, "span", 34)(5, "span", 35)(6, "span", 36);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, MunicipalPublications_For_16_Conditional_8_Template, 2, 0, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 38);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 39)(13, "span");
    \u0275\u0275element(14, "i", 40);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275element(17, "i", 41);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "span", 42);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "span", 43);
    \u0275\u0275element(22, "i", 40);
    \u0275\u0275text(23, " Voir");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "footer", 44);
    \u0275\u0275conditionalCreate(25, MunicipalPublications_For_16_Conditional_25_Template, 3, 8, "button", 45);
    \u0275\u0275conditionalCreate(26, MunicipalPublications_For_16_Conditional_26_Template, 3, 2, "div", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("publication-draft", ctx_r1.canManage() && !publication_r5.is_published);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Voir la publication " + publication_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(publication_r5.image_url ? 2 : 3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(publication_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canManage() && !publication_r5.is_published ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Publication municipale \xB7 ", \u0275\u0275pipeBind2(11, 13, publication_r5.published_at, "d MMM y, HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", publication_r5.view_count ?? 0, " vue", (publication_r5.view_count ?? 0) > 1 ? "s" : "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", publication_r5.like_count ?? 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(publication_r5.summary);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.isCitizen() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canManage() ? 26 : -1);
  }
}
function MunicipalPublications_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucune publication dans cette cat\xE9gorie.");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 52);
  }
  if (rf & 2) {
    const publication_r8 = \u0275\u0275nextContext();
    \u0275\u0275property("src", publication_r8.image_url, \u0275\u0275sanitizeUrl)("alt", "");
  }
}
function MunicipalPublications_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275element(1, "i", 47);
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_19_Conditional_13_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275text(1, "Chargement des commentaires\u2026");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_19_Conditional_13_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 68)(1, "div", 69)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "time", 70);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 71);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comment_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(comment_r11.author_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 3, comment_r11.created_at, "d MMM y, HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(comment_r11.content);
  }
}
function MunicipalPublications_Conditional_19_Conditional_13_ForEmpty_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 72);
    \u0275\u0275text(1, "Soyez le premier \xE0 commenter cette publication.");
    \u0275\u0275elementEnd();
  }
}
function MunicipalPublications_Conditional_19_Conditional_13_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MunicipalPublications_Conditional_19_Conditional_13_ForEmpty_18_Conditional_0_Template, 2, 0, "p", 72);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!ctx_r1.commentsLoading() ? 0 : -1);
  }
}
function MunicipalPublications_Conditional_19_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "button", 48);
    \u0275\u0275listener("click", function MunicipalPublications_Conditional_19_Conditional_13_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      const publication_r8 = \u0275\u0275nextContext();
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.likePublication(publication_r8, $event));
    });
    \u0275\u0275element(2, "i", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "section", 60)(5, "h3", 61);
    \u0275\u0275text(6, "Commentaires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "form", 62);
    \u0275\u0275listener("ngSubmit", function MunicipalPublications_Conditional_19_Conditional_13_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r9);
      const comment_r10 = \u0275\u0275reference(11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.addComment(comment_r10.value);
      return \u0275\u0275resetView(comment_r10.value = "");
    });
    \u0275\u0275elementStart(8, "label", 63);
    \u0275\u0275text(9, "Ajouter un commentaire");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "textarea", 64, 0);
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275element(13, "button", 65);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(14, MunicipalPublications_Conditional_19_Conditional_13_Conditional_14_Template, 2, 0, "p", 66);
    \u0275\u0275elementStart(15, "div", 67);
    \u0275\u0275repeaterCreate(16, MunicipalPublications_Conditional_19_Conditional_13_For_17_Template, 9, 6, "article", 68, _forTrack0, false, MunicipalPublications_Conditional_19_Conditional_13_ForEmpty_18_Template, 1, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r8 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("publication-liked", ctx_r1.likedPublicationIds().has(publication_r8.id));
    \u0275\u0275attribute("aria-pressed", ctx_r1.likedPublicationIds().has(publication_r8.id));
    \u0275\u0275advance();
    \u0275\u0275classProp("pi-heart", !ctx_r1.likedPublicationIds().has(publication_r8.id))("pi-heart-fill", ctx_r1.likedPublicationIds().has(publication_r8.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" J\u2019aime (", publication_r8.like_count ?? 0, ")");
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.submittingComment());
    \u0275\u0275advance(3);
    \u0275\u0275property("loading", ctx_r1.submittingComment());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.commentsLoading() ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.comments());
  }
}
function MunicipalPublications_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 12);
    \u0275\u0275conditionalCreate(1, MunicipalPublications_Conditional_19_Conditional_1_Template, 1, 2, "img", 52)(2, MunicipalPublications_Conditional_19_Conditional_2_Template, 2, 0, "div", 53);
    \u0275\u0275elementStart(3, "div", 54)(4, "p", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 57);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 58);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, MunicipalPublications_Conditional_19_Conditional_13_Template, 19, 12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const publication_r8 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(publication_r8.image_url ? 1 : 2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(publication_r8.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(publication_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4("Publication municipale \xB7 ", \u0275\u0275pipeBind2(10, 9, publication_r8.published_at, "d MMM y, HH:mm"), " \xB7 ", publication_r8.view_count ?? 0, " vue", (publication_r8.view_count ?? 0) > 1 ? "s" : "", " \xB7 ", publication_r8.like_count ?? 0, " j\u2019aime");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(publication_r8.content);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isCitizen() ? 13 : -1);
  }
}
var emptyEditor = () => ({
  title: "",
  summary: "",
  content: "",
  category: "",
  published_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
  is_published: true,
  image_url: null
});
var MunicipalPublications = class _MunicipalPublications {
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  content = inject(MunicipalContentService);
  route = inject(ActivatedRoute);
  reads = inject(PublicationReadService);
  auth = inject(AuthService);
  confirmation = inject(ConfirmationService);
  messages = inject(MessageService);
  expandedPublication = signal(null, ...ngDevMode ? [{ debugName: "expandedPublication" }] : []);
  selectedPublication = signal(null, ...ngDevMode ? [{ debugName: "selectedPublication" }] : []);
  comments = signal([], ...ngDevMode ? [{ debugName: "comments" }] : []);
  commentsLoading = signal(false, ...ngDevMode ? [{ debugName: "commentsLoading" }] : []);
  submittingComment = signal(false, ...ngDevMode ? [{ debugName: "submittingComment" }] : []);
  likedPublicationIds = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "likedPublicationIds" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  publications = signal([], ...ngDevMode ? [{ debugName: "publications" }] : []);
  selectedCategory = signal(null, ...ngDevMode ? [{ debugName: "selectedCategory" }] : []);
  editorVisible = signal(false, ...ngDevMode ? [{ debugName: "editorVisible" }] : []);
  editingId = signal(null, ...ngDevMode ? [{ debugName: "editingId" }] : []);
  canManage = computed(() => this.auth.hasRole("admin", "agent", "manager"), ...ngDevMode ? [{ debugName: "canManage" }] : []);
  isCitizen = computed(() => this.auth.hasRole("citizen"), ...ngDevMode ? [{ debugName: "isCitizen" }] : []);
  categories = computed(() => [...new Set(this.publications().map((item) => item.category))].map((label) => ({ label, value: label })), ...ngDevMode ? [{ debugName: "categories" }] : []);
  visiblePublications = computed(() => this.publications().filter((item) => !this.selectedCategory() || item.category === this.selectedCategory()), ...ngDevMode ? [{ debugName: "visiblePublications" }] : []);
  editor = emptyEditor();
  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => this.expandedPublication.set(params.get("publication")));
    this.load();
    this.live.watch(this.destroyRef, () => this.load(), () => !this.loading());
  }
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.error.set(null);
    const request = this.canManage() ? this.content.managedPublications() : this.content.publications();
    request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: (items) => this.publications.set(items),
      error: () => this.error.set("Impossible de charger les publications. R\xE9essayez.")
    });
  }
  openPublication(publication) {
    this.expandedPublication.set(publication.id);
    this.selectedPublication.set(publication);
    this.reads.markRead(publication.id);
    this.content.viewPublication(publication.id).subscribe({
      next: (updated) => {
        this.replacePublication(updated);
        this.selectedPublication.set(updated);
      },
      error: () => void 0
    });
    if (this.isCitizen()) {
      this.loadComments(publication.id);
    }
  }
  closePublication() {
    this.selectedPublication.set(null);
    this.comments.set([]);
  }
  selectCategory(value) {
    this.selectedCategory.set(value);
  }
  openCreate() {
    this.editingId.set(null);
    this.editor = emptyEditor();
    this.editorVisible.set(true);
  }
  openEdit(publication, event) {
    event.stopPropagation();
    this.editingId.set(publication.id);
    this.editor = {
      title: publication.title,
      summary: publication.summary,
      content: publication.content,
      category: publication.category,
      published_at: this.toLocalDateTime(publication.published_at),
      is_published: publication.is_published ?? true,
      image_url: publication.image_url ?? null
    };
    this.editorVisible.set(true);
  }
  save() {
    const payload = __spreadProps(__spreadValues({}, this.editor), {
      title: this.editor.title.trim(),
      summary: this.editor.summary.trim(),
      content: this.editor.content.trim(),
      category: this.editor.category.trim(),
      published_at: new Date(this.editor.published_at).toISOString(),
      image_url: this.editor.image_url?.trim() || null
    });
    if (!payload.title || !payload.summary || !payload.content || !payload.category || Number.isNaN(Date.parse(payload.published_at))) {
      this.messages.add({ severity: "warn", summary: "Informations incompl\xE8tes", detail: "Renseignez tous les champs de la publication." });
      return;
    }
    this.saving.set(true);
    const publicationId = this.editingId();
    const request = publicationId ? this.content.updatePublication(publicationId, payload) : this.content.createPublication(payload);
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (publication) => {
        this.publications.update((items) => publicationId ? items.map((item) => item.id === publication.id ? publication : item) : [publication, ...items]);
        this.editorVisible.set(false);
        this.messages.add({ severity: "success", summary: publicationId ? "Publication modifi\xE9e" : "Publication cr\xE9\xE9e", detail: "Les informations ont \xE9t\xE9 enregistr\xE9es." });
      },
      error: () => this.messages.add({ severity: "error", summary: "Enregistrement impossible", detail: "Veuillez r\xE9essayer." })
    });
  }
  confirmDelete(publication, event) {
    event.stopPropagation();
    this.confirmation.confirm({
      message: `Supprimer d\xE9finitivement \xAB ${publication.title} \xBB ?`,
      header: "Supprimer la publication",
      acceptLabel: "Supprimer",
      rejectLabel: "Annuler",
      acceptButtonStyleClass: "p-button-danger",
      accept: () => {
        this.content.deletePublication(publication.id).subscribe({
          next: () => {
            this.publications.update((items) => items.filter((item) => item.id !== publication.id));
            this.messages.add({ severity: "success", summary: "Publication supprim\xE9e" });
          },
          error: () => this.messages.add({ severity: "error", summary: "Suppression impossible", detail: "Veuillez r\xE9essayer." })
        });
      }
    });
  }
  likePublication(publication, event) {
    event.stopPropagation();
    this.content.likePublication(publication.id).subscribe({
      next: (result) => {
        this.publications.update((items) => items.map((item) => item.id === publication.id ? __spreadProps(__spreadValues({}, item), { like_count: result.like_count }) : item));
        this.selectedPublication.update((item) => item?.id === publication.id ? __spreadProps(__spreadValues({}, item), { like_count: result.like_count }) : item);
        this.likedPublicationIds.update((ids) => {
          const next = new Set(ids);
          result.liked ? next.add(publication.id) : next.delete(publication.id);
          return next;
        });
      },
      error: () => this.messages.add({ severity: "error", summary: "Action impossible", detail: "Veuillez r\xE9essayer." })
    });
  }
  addComment(content) {
    const publication = this.selectedPublication();
    const trimmed = content.trim();
    if (!publication || !trimmed || this.submittingComment())
      return;
    this.submittingComment.set(true);
    this.content.addPublicationComment(publication.id, trimmed).pipe(finalize(() => this.submittingComment.set(false))).subscribe({
      next: (comment) => this.comments.update((items) => [comment, ...items]),
      error: () => this.messages.add({ severity: "error", summary: "Commentaire non envoy\xE9", detail: "Veuillez r\xE9essayer." })
    });
  }
  loadComments(publicationId) {
    this.commentsLoading.set(true);
    this.content.publicationComments(publicationId).pipe(finalize(() => this.commentsLoading.set(false))).subscribe({
      next: (comments) => this.comments.set(comments),
      error: () => this.messages.add({ severity: "warn", summary: "Commentaires indisponibles", detail: "Ils pourront \xEAtre recharg\xE9s plus tard." })
    });
  }
  replacePublication(publication) {
    this.publications.update((items) => items.map((item) => item.id === publication.id ? publication : item));
  }
  toLocalDateTime(value) {
    const date = new Date(value);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
  }
  static \u0275fac = function MunicipalPublications_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalPublications)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalPublications, selectors: [["app-municipal-publications"]], features: [\u0275\u0275ProvidersFeature([ConfirmationService, MessageService])], decls: 46, vars: 35, consts: [["comment", ""], [1, "municipal-page"], [1, "publication-header"], [1, "intro"], ["pButton", "", "type", "button", "icon", "pi pi-plus", "label", "Nouvelle publication"], [1, "management-note"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Toutes les cat\xE9gories", "ariaLabel", "Filtrer les publications par cat\xE9gorie", 1, "publication-filter", 3, "onChange", "options", "showClear"], ["role", "status"], ["role", "alert"], [1, "publication-list"], [1, "publication-card", 3, "publication-draft"], [3, "visibleChange", "visible", "modal", "draggable", "resizable", "showHeader", "dismissableMask"], [1, "overflow-hidden", "-m-4", "bg-surface-0", "dark:bg-surface-900"], [3, "visibleChange", "visible", "modal", "draggable", "resizable", "header"], [1, "publication-form", 3, "ngSubmit"], ["pInputText", "", "name", "title", "required", "", "minlength", "3", "maxlength", "255", 3, "ngModelChange", "ngModel"], ["pInputText", "", "name", "category", "required", "", "maxlength", "80", "placeholder", "Ex. Vie municipale", 3, "ngModelChange", "ngModel"], [1, "form-wide"], ["pTextarea", "", "name", "summary", "required", "", "rows", "3", "maxlength", "500", 3, "ngModelChange", "ngModel"], ["pTextarea", "", "name", "content", "required", "", "rows", "7", "maxlength", "10000", 3, "ngModelChange", "ngModel"], ["pInputText", "", "type", "url", "name", "imageUrl", "maxlength", "2048", "placeholder", "https://\u2026/image.jpg", 3, "ngModelChange", "ngModel"], ["pInputText", "", "type", "datetime-local", "name", "publishedAt", "required", "", 3, "ngModelChange", "ngModel"], [1, "published-field"], ["type", "checkbox", "name", "isPublished", 3, "ngModelChange", "ngModel"], [1, "form-actions", "form-wide"], ["pButton", "", "type", "button", "severity", "secondary", "label", "Annuler", 3, "click", "disabled"], ["pButton", "", "type", "submit", 3, "label", "loading"], ["pButton", "", "type", "button", "icon", "pi pi-plus", "label", "Nouvelle publication", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-shield"], ["type", "button", 3, "click"], [1, "publication-card"], ["type", "button", 1, "publication-summary", 3, "click"], [1, "publication-image", 3, "src", "alt"], [1, "publication-image", "publication-image-placeholder"], [1, "publication-details"], [1, "publication-title-row"], [1, "publication-title"], [1, "publication-status"], [1, "publication-meta"], [1, "publication-stats"], ["aria-hidden", "true", 1, "pi", "pi-eye"], ["aria-hidden", "true", 1, "pi", "pi-heart"], [1, "publication-excerpt"], [1, "publication-view"], [1, "publication-footer"], ["type", "button", 1, "publication-like", 3, "publication-liked"], ["aria-label", "Actions de gestion", 1, "publication-actions"], ["aria-hidden", "true", 1, "pi", "pi-megaphone"], ["type", "button", 1, "publication-like", 3, "click"], ["aria-hidden", "true", 1, "pi"], ["pButton", "", "type", "button", "severity", "secondary", "size", "small", "icon", "pi pi-pencil", "label", "Modifier", 3, "click", "text"], ["pButton", "", "type", "button", "severity", "danger", "size", "small", "icon", "pi pi-trash", "label", "Supprimer", 3, "click", "text"], [1, "block", "h-56", "w-full", "object-cover", "sm:h-72", 3, "src", "alt"], [1, "flex", "h-40", "items-center", "justify-center", "bg-primary-50", "text-4xl", "text-primary", "dark:bg-primary-950"], [1, "p-5", "sm:p-7"], [1, "m-0", "text-sm", "font-semibold", "text-primary"], [1, "mb-2", "mt-2", "text-2xl", "font-bold", "text-surface-900", "dark:text-surface-0"], [1, "mb-5", "text-sm", "text-surface-500"], [1, "m-0", "whitespace-pre-line", "leading-relaxed", "text-surface-700", "dark:text-surface-200"], [1, "mt-6", "border-t", "border-surface-200", "pt-4", "dark:border-surface-700"], ["aria-labelledby", "comments-heading", 1, "mt-5", "border-t", "border-surface-200", "pt-5", "dark:border-surface-700"], ["id", "comments-heading", 1, "m-0", "text-lg", "font-semibold"], [1, "mt-3", "flex", "flex-col", "gap-2", 3, "ngSubmit"], ["for", "publication-comment", 1, "sr-only"], ["id", "publication-comment", "pTextarea", "", "rows", "3", "maxlength", "1000", "placeholder", "Ajouter un commentaire", 1, "w-full", 3, "disabled"], ["pButton", "", "type", "submit", "label", "Publier le commentaire", 3, "loading"], ["role", "status", 1, "text-sm", "text-surface-500"], [1, "mt-4", "grid", "gap-3"], [1, "rounded-lg", "border", "border-surface-200", "p-3", "dark:border-surface-700"], [1, "flex", "flex-wrap", "items-baseline", "justify-between", "gap-2"], [1, "text-xs", "text-surface-500"], [1, "mb-0", "mt-2", "whitespace-pre-line", "text-sm"], [1, "text-sm", "text-surface-500"]], template: function MunicipalPublications_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1);
      \u0275\u0275element(1, "p-toast")(2, "p-confirmDialog");
      \u0275\u0275elementStart(3, "header", 2)(4, "div")(5, "h1");
      \u0275\u0275text(6, "Publications");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 3);
      \u0275\u0275text(8, "Annonces, changements de service et informations pratiques de votre ville.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, MunicipalPublications_Conditional_9_Template, 1, 0, "button", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, MunicipalPublications_Conditional_10_Template, 3, 0, "p", 5);
      \u0275\u0275elementStart(11, "p-select", 6);
      \u0275\u0275listener("onChange", function MunicipalPublications_Template_p_select_onChange_11_listener($event) {
        return ctx.selectCategory($event.value);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, MunicipalPublications_Conditional_12_Template, 2, 0, "p", 7);
      \u0275\u0275conditionalCreate(13, MunicipalPublications_Conditional_13_Template, 4, 1, "p", 8);
      \u0275\u0275elementStart(14, "div", 9);
      \u0275\u0275repeaterCreate(15, MunicipalPublications_For_16_Template, 27, 16, "article", 10, _forTrack0, false, MunicipalPublications_ForEmpty_17_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "p-dialog", 11);
      \u0275\u0275listener("visibleChange", function MunicipalPublications_Template_p_dialog_visibleChange_18_listener($event) {
        return !$event && ctx.closePublication();
      });
      \u0275\u0275conditionalCreate(19, MunicipalPublications_Conditional_19_Template, 14, 12, "article", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p-dialog", 13);
      \u0275\u0275listener("visibleChange", function MunicipalPublications_Template_p_dialog_visibleChange_20_listener($event) {
        return ctx.editorVisible.set($event);
      });
      \u0275\u0275elementStart(21, "form", 14);
      \u0275\u0275listener("ngSubmit", function MunicipalPublications_Template_form_ngSubmit_21_listener() {
        return ctx.save();
      });
      \u0275\u0275elementStart(22, "label");
      \u0275\u0275text(23, " Titre ");
      \u0275\u0275elementStart(24, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.title, $event) || (ctx.editor.title = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "label");
      \u0275\u0275text(26, " Cat\xE9gorie ");
      \u0275\u0275elementStart(27, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.category, $event) || (ctx.editor.category = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "label", 17);
      \u0275\u0275text(29, " R\xE9sum\xE9 ");
      \u0275\u0275elementStart(30, "textarea", 18);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_textarea_ngModelChange_30_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.summary, $event) || (ctx.editor.summary = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "label", 17);
      \u0275\u0275text(32, " Contenu ");
      \u0275\u0275elementStart(33, "textarea", 19);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_textarea_ngModelChange_33_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.content, $event) || (ctx.editor.content = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "label", 17);
      \u0275\u0275text(35, " Image de couverture (URL facultative) ");
      \u0275\u0275elementStart(36, "input", 20);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_input_ngModelChange_36_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.image_url, $event) || (ctx.editor.image_url = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "label");
      \u0275\u0275text(38, " Date de publication ");
      \u0275\u0275elementStart(39, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.published_at, $event) || (ctx.editor.published_at = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "label", 22)(41, "input", 23);
      \u0275\u0275twoWayListener("ngModelChange", function MunicipalPublications_Template_input_ngModelChange_41_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.editor.is_published, $event) || (ctx.editor.is_published = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275text(42, " Publier imm\xE9diatement ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 24)(44, "button", 25);
      \u0275\u0275listener("click", function MunicipalPublications_Template_button_click_44_listener() {
        return ctx.editorVisible.set(false);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "button", 26);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_14_0;
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.canManage() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canManage() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.categories())("showClear", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.error()) ? 13 : -1, tmp_5_0);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visiblePublications());
      \u0275\u0275advance(3);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(33, _c0));
      \u0275\u0275property("visible", ctx.selectedPublication() !== null)("modal", true)("draggable", false)("resizable", false)("showHeader", false)("dismissableMask", true);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_14_0 = ctx.selectedPublication()) ? 19 : -1, tmp_14_0);
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(34, _c1));
      \u0275\u0275property("visible", ctx.editorVisible())("modal", true)("draggable", false)("resizable", false)("header", ctx.editingId() ? "Modifier la publication" : "Nouvelle publication");
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.title);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.category);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.summary);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.content);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.image_url);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.published_at);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.editor.is_published);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance();
      \u0275\u0275property("label", ctx.editingId() ? "Enregistrer" : "Cr\xE9er la publication")("loading", ctx.saving());
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, NgModel, NgForm, ButtonModule, ButtonDirective, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, InputTextModule, InputText, SelectModule, Select, TextareaModule, Textarea, ToastModule, Toast, DatePipe], styles: ["\n\n.municipal-page[_ngcontent-%COMP%] {\n  max-width: 850px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\n.publication-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.publication-header[_ngcontent-%COMP%]   .intro[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.management-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: var(--p-text-muted-color);\n  margin: 0 0 1rem;\n}\n.management-note[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n}\n.publication-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.content[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n}\n.publication-card[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.6rem;\n  background: var(--surface-card);\n  overflow: hidden;\n  transition:\n    background-color 160ms ease,\n    border-color 160ms ease,\n    transform 160ms ease;\n}\n.publication-card[_ngcontent-%COMP%]:hover, \n.publication-card[_ngcontent-%COMP%]:focus-within {\n  background: var(--surface-hover);\n  border-color: var(--p-primary-color);\n  transform: translateY(-1px);\n}\n.publication-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2.75rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.8rem;\n  text-align: left;\n  width: 100%;\n  padding: 0.75rem;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  font: inherit;\n}\n.publication-summary[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: -3px;\n}\n.publication-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.publication-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.publication-details[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 0.25rem;\n}\n.publication-image[_ngcontent-%COMP%] {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.35rem;\n  object-fit: cover;\n}\n.publication-image-placeholder[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, var(--p-primary-color) 16%, var(--surface-card));\n  color: var(--p-primary-color);\n}\n.publication-status[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  background: var(--p-orange-100);\n  color: var(--p-orange-700);\n  font-size: 0.8rem;\n  font-weight: 700;\n  padding: 0.2rem 0.55rem;\n  white-space: nowrap;\n}\n.publication-draft[_ngcontent-%COMP%] {\n  border-style: dashed;\n}\n.publication-meta[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--p-text-muted-color);\n}\n.publication-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--p-text-muted-color);\n  font-size: 0.78rem;\n}\n.publication-stats[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.publication-excerpt[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 0.86rem;\n}\n.publication-view[_ngcontent-%COMP%], \n.publication-like[_ngcontent-%COMP%] {\n  border: 1px solid var(--surface-border);\n  border-radius: 0.35rem;\n  padding: 0.35rem 0.6rem;\n  background: transparent;\n  color: var(--p-text-color);\n  font: inherit;\n  font-size: 0.78rem;\n  white-space: nowrap;\n}\n.publication-like[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  cursor: pointer;\n}\n.publication-like[_ngcontent-%COMP%]:hover, \n.publication-like[_ngcontent-%COMP%]:focus-visible {\n  color: var(--p-primary-color);\n  border-color: var(--p-primary-color);\n}\n.publication-content[_ngcontent-%COMP%] {\n  padding: 0 1.5rem 1.5rem;\n  white-space: pre-line;\n  overflow-wrap: anywhere;\n}\n.publication-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--surface-border);\n  padding-top: 1rem;\n}\n.publication-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.55rem 0.75rem;\n  border-top: 1px solid var(--surface-border);\n}\n.publication-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.publication-form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n.publication-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  color: var(--p-text-color);\n  font-weight: 600;\n}\n.publication-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type=checkbox]), \n.publication-form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.published-field[_ngcontent-%COMP%] {\n  align-self: end;\n  display: flex !important;\n  align-items: center;\n  min-height: 2.5rem;\n  gap: 0.5rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n@media (max-width: 600px) {\n  .publication-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .publication-form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-wide[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n  .publication-actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .publication-footer[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .publication-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 2.75rem minmax(0, 1fr);\n    padding-top: 2.4rem;\n  }\n  .publication-view[_ngcontent-%COMP%] {\n    grid-column: 2;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=municipal-publications.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalPublications, [{
    type: Component,
    args: [{ selector: "app-municipal-publications", imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, InputTextModule, SelectModule, TextareaModule, ToastModule], providers: [ConfirmationService, MessageService], template: `<section class="municipal-page">
    <p-toast />
    <p-confirmDialog />
    <header class="publication-header">
        <div>
            <h1>Publications</h1>
            <p class="intro">Annonces, changements de service et informations pratiques de votre ville.</p>
        </div>
        @if (canManage()) {
            <button pButton type="button" icon="pi pi-plus" label="Nouvelle publication" (click)="openCreate()"></button>
        }
    </header>
    @if (canManage()) {
        <p class="management-note"><i class="pi pi-shield" aria-hidden="true"></i> Vous g\xE9rez les publications de la mairie, y compris les brouillons.</p>
    }
    <p-select class="publication-filter" [options]="categories()" optionLabel="label" optionValue="value" [showClear]="true" placeholder="Toutes les cat\xE9gories" ariaLabel="Filtrer les publications par cat\xE9gorie" (onChange)="selectCategory($event.value)"></p-select>
    @if (loading()) {
        <p role="status">Actualisation des publications\u2026</p>
    }
    @if (error(); as message) {
        <p role="alert">{{ message }} <button type="button" (click)="load()">R\xE9essayer</button></p>
    }
    <div class="publication-list">
        @for (publication of visiblePublications(); track publication.id) {
            <article class="publication-card" [class.publication-draft]="canManage() && !publication.is_published">
                <button type="button" class="publication-summary" (click)="openPublication(publication)" [attr.aria-label]="'Voir la publication ' + publication.title">
                    @if (publication.image_url) {
                        <img class="publication-image" [src]="publication.image_url" [alt]="''" />
                    } @else {
                        <span class="publication-image publication-image-placeholder"><i class="pi pi-megaphone" aria-hidden="true"></i></span>
                    }
                    <span class="publication-details">
                        <span class="publication-title-row">
                            <span class="publication-title">{{ publication.title }}</span>
                            @if (canManage() && !publication.is_published) { <span class="publication-status">Brouillon</span> }
                        </span>
                        <span class="publication-meta">Publication municipale \xB7 {{ publication.published_at | date: 'd MMM y, HH:mm' }}</span>
                        <span class="publication-stats"><span><i class="pi pi-eye" aria-hidden="true"></i> {{ publication.view_count ?? 0 }} vue{{ (publication.view_count ?? 0) > 1 ? 's' : '' }}</span><span><i class="pi pi-heart" aria-hidden="true"></i> {{ publication.like_count ?? 0 }}</span></span>
                        <span class="publication-excerpt">{{ publication.summary }}</span>
                    </span>
                    <span class="publication-view"><i class="pi pi-eye" aria-hidden="true"></i> Voir</span>
                </button>
                <footer class="publication-footer">
                    @if (isCitizen()) {
                        <button type="button" class="publication-like" [class.publication-liked]="likedPublicationIds().has(publication.id)" (click)="likePublication(publication, $event)" [attr.aria-pressed]="likedPublicationIds().has(publication.id)" [attr.aria-label]="'Aimer la publication ' + publication.title"><i class="pi" [class.pi-heart]="!likedPublicationIds().has(publication.id)" [class.pi-heart-fill]="likedPublicationIds().has(publication.id)" aria-hidden="true"></i> J\u2019aime</button>
                    }
                    @if (canManage()) {
                    <div class="publication-actions" aria-label="Actions de gestion">
                        <button pButton type="button" severity="secondary" [text]="true" size="small" icon="pi pi-pencil" label="Modifier" (click)="openEdit(publication, $event)"></button>
                        <button pButton type="button" severity="danger" [text]="true" size="small" icon="pi pi-trash" label="Supprimer" (click)="confirmDelete(publication, $event)"></button>
                    </div>
                    }
                </footer>
            </article>
        } @empty {
            <p>Aucune publication dans cette cat\xE9gorie.</p>
        }
    </div>
</section>

<p-dialog [visible]="selectedPublication() !== null" (visibleChange)="!$event && closePublication()" [modal]="true" [draggable]="false" [resizable]="false" [style]="{ width: 'min(94vw, 50rem)' }" [showHeader]="false" [dismissableMask]="true">
    @if (selectedPublication(); as publication) {
        <article class="overflow-hidden -m-4 bg-surface-0 dark:bg-surface-900">
            @if (publication.image_url) { <img class="block h-56 w-full object-cover sm:h-72" [src]="publication.image_url" [alt]="''" /> }
            @else { <div class="flex h-40 items-center justify-center bg-primary-50 text-4xl text-primary dark:bg-primary-950"><i class="pi pi-megaphone" aria-hidden="true"></i></div> }
            <div class="p-5 sm:p-7">
                <p class="m-0 text-sm font-semibold text-primary">{{ publication.category }}</p>
                <h2 class="mb-2 mt-2 text-2xl font-bold text-surface-900 dark:text-surface-0">{{ publication.title }}</h2>
                <p class="mb-5 text-sm text-surface-500">Publication municipale \xB7 {{ publication.published_at | date: 'd MMM y, HH:mm' }} \xB7 {{ publication.view_count ?? 0 }} vue{{ (publication.view_count ?? 0) > 1 ? 's' : '' }} \xB7 {{ publication.like_count ?? 0 }} j\u2019aime</p>
                <p class="m-0 whitespace-pre-line leading-relaxed text-surface-700 dark:text-surface-200">{{ publication.content }}</p>
                @if (isCitizen()) {
                    <div class="mt-6 border-t border-surface-200 pt-4 dark:border-surface-700"><button type="button" class="publication-like" [class.publication-liked]="likedPublicationIds().has(publication.id)" (click)="likePublication(publication, $event)" [attr.aria-pressed]="likedPublicationIds().has(publication.id)"><i class="pi" [class.pi-heart]="!likedPublicationIds().has(publication.id)" [class.pi-heart-fill]="likedPublicationIds().has(publication.id)" aria-hidden="true"></i> J\u2019aime ({{ publication.like_count ?? 0 }})</button></div>
                    <section class="mt-5 border-t border-surface-200 pt-5 dark:border-surface-700" aria-labelledby="comments-heading">
                        <h3 id="comments-heading" class="m-0 text-lg font-semibold">Commentaires</h3>
                        <form class="mt-3 flex flex-col gap-2" (ngSubmit)="addComment(comment.value); comment.value = ''">
                            <label class="sr-only" for="publication-comment">Ajouter un commentaire</label><textarea #comment id="publication-comment" pTextarea rows="3" maxlength="1000" placeholder="Ajouter un commentaire" class="w-full" [disabled]="submittingComment()"></textarea>
                            <div><button pButton type="submit" label="Publier le commentaire" [loading]="submittingComment()"></button></div>
                        </form>
                        @if (commentsLoading()) { <p class="text-sm text-surface-500" role="status">Chargement des commentaires\u2026</p> }
                        <div class="mt-4 grid gap-3">@for (comment of comments(); track comment.id) { <article class="rounded-lg border border-surface-200 p-3 dark:border-surface-700"><div class="flex flex-wrap items-baseline justify-between gap-2"><strong>{{ comment.author_name }}</strong><time class="text-xs text-surface-500">{{ comment.created_at | date: 'd MMM y, HH:mm' }}</time></div><p class="mb-0 mt-2 whitespace-pre-line text-sm">{{ comment.content }}</p></article> } @empty { @if (!commentsLoading()) { <p class="text-sm text-surface-500">Soyez le premier \xE0 commenter cette publication.</p> } }</div>
                    </section>
                }
            </div>
        </article>
    }
</p-dialog>

<p-dialog [visible]="editorVisible()" (visibleChange)="editorVisible.set($event)" [modal]="true" [draggable]="false" [resizable]="false" [style]="{ width: 'min(94vw, 44rem)' }" [header]="editingId() ? 'Modifier la publication' : 'Nouvelle publication'">
    <form class="publication-form" (ngSubmit)="save()">
        <label>
            Titre
            <input pInputText name="title" [(ngModel)]="editor.title" required minlength="3" maxlength="255" />
        </label>
        <label>
            Cat\xE9gorie
            <input pInputText name="category" [(ngModel)]="editor.category" required maxlength="80" placeholder="Ex. Vie municipale" />
        </label>
        <label class="form-wide">
            R\xE9sum\xE9
            <textarea pTextarea name="summary" [(ngModel)]="editor.summary" required rows="3" maxlength="500"></textarea>
        </label>
        <label class="form-wide">
            Contenu
            <textarea pTextarea name="content" [(ngModel)]="editor.content" required rows="7" maxlength="10000"></textarea>
        </label>
        <label class="form-wide">
            Image de couverture (URL facultative)
            <input pInputText type="url" name="imageUrl" [(ngModel)]="editor.image_url" maxlength="2048" placeholder="https://\u2026/image.jpg" />
        </label>
        <label>
            Date de publication
            <input pInputText type="datetime-local" name="publishedAt" [(ngModel)]="editor.published_at" required />
        </label>
        <label class="published-field">
            <input type="checkbox" name="isPublished" [(ngModel)]="editor.is_published" />
            Publier imm\xE9diatement
        </label>
        <div class="form-actions form-wide">
            <button pButton type="button" severity="secondary" label="Annuler" [disabled]="saving()" (click)="editorVisible.set(false)"></button>
            <button pButton type="submit" [label]="editingId() ? 'Enregistrer' : 'Cr\xE9er la publication'" [loading]="saving()"></button>
        </div>
    </form>
</p-dialog>
`, styles: ["/* src/app/municipal/municipal-publications.scss */\n.municipal-page {\n  max-width: 850px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro {\n  color: var(--p-text-muted-color);\n  margin-bottom: 1.5rem;\n}\n.publication-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.publication-header .intro {\n  margin-bottom: 0;\n}\n.management-note {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  color: var(--p-text-muted-color);\n  margin: 0 0 1rem;\n}\n.management-note i {\n  color: var(--p-primary-color);\n}\n.publication-list {\n  display: grid;\n  gap: 0.7rem;\n  margin-top: 1rem;\n}\n.content {\n  color: var(--p-text-muted-color);\n}\n.publication-card {\n  position: relative;\n  border: 1px solid var(--surface-border);\n  border-radius: 0.6rem;\n  background: var(--surface-card);\n  overflow: hidden;\n  transition:\n    background-color 160ms ease,\n    border-color 160ms ease,\n    transform 160ms ease;\n}\n.publication-card:hover,\n.publication-card:focus-within {\n  background: var(--surface-hover);\n  border-color: var(--p-primary-color);\n  transform: translateY(-1px);\n}\n.publication-summary {\n  display: grid;\n  grid-template-columns: 2.75rem minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 0.8rem;\n  text-align: left;\n  width: 100%;\n  padding: 0.75rem;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  font: inherit;\n}\n.publication-summary:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: -3px;\n}\n.publication-title {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.publication-title-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.publication-details {\n  display: grid;\n  min-width: 0;\n  gap: 0.25rem;\n}\n.publication-image {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.35rem;\n  object-fit: cover;\n}\n.publication-image-placeholder {\n  display: grid;\n  place-items: center;\n  background: color-mix(in srgb, var(--p-primary-color) 16%, var(--surface-card));\n  color: var(--p-primary-color);\n}\n.publication-status {\n  border-radius: 999px;\n  background: var(--p-orange-100);\n  color: var(--p-orange-700);\n  font-size: 0.8rem;\n  font-weight: 700;\n  padding: 0.2rem 0.55rem;\n  white-space: nowrap;\n}\n.publication-draft {\n  border-style: dashed;\n}\n.publication-meta {\n  font-size: 0.78rem;\n  color: var(--p-text-muted-color);\n}\n.publication-stats {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--p-text-muted-color);\n  font-size: 0.78rem;\n}\n.publication-stats span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.publication-excerpt {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 0.86rem;\n}\n.publication-view,\n.publication-like {\n  border: 1px solid var(--surface-border);\n  border-radius: 0.35rem;\n  padding: 0.35rem 0.6rem;\n  background: transparent;\n  color: var(--p-text-color);\n  font: inherit;\n  font-size: 0.78rem;\n  white-space: nowrap;\n}\n.publication-like {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  cursor: pointer;\n}\n.publication-like:hover,\n.publication-like:focus-visible {\n  color: var(--p-primary-color);\n  border-color: var(--p-primary-color);\n}\n.publication-content {\n  padding: 0 1.5rem 1.5rem;\n  white-space: pre-line;\n  overflow-wrap: anywhere;\n}\n.publication-content p {\n  border-top: 1px solid var(--surface-border);\n  padding-top: 1rem;\n}\n.publication-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.55rem 0.75rem;\n  border-top: 1px solid var(--surface-border);\n}\n.publication-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.publication-form {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n.publication-form label {\n  display: grid;\n  gap: 0.45rem;\n  color: var(--p-text-color);\n  font-weight: 600;\n}\n.publication-form input:not([type=checkbox]),\n.publication-form textarea {\n  width: 100%;\n}\n.form-wide {\n  grid-column: 1/-1;\n}\n.published-field {\n  align-self: end;\n  display: flex !important;\n  align-items: center;\n  min-height: 2.5rem;\n  gap: 0.5rem;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n@media (max-width: 600px) {\n  .publication-header {\n    flex-direction: column;\n  }\n  .publication-form {\n    grid-template-columns: 1fr;\n  }\n  .form-wide {\n    grid-column: auto;\n  }\n  .publication-actions {\n    justify-content: flex-start;\n  }\n  .publication-footer {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .publication-summary {\n    grid-template-columns: 2.75rem minmax(0, 1fr);\n    padding-top: 2.4rem;\n  }\n  .publication-view {\n    grid-column: 2;\n    justify-self: start;\n  }\n}\n/*# sourceMappingURL=municipal-publications.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalPublications, { className: "MunicipalPublications", filePath: "src/app/municipal/municipal-publications.ts", lineNumber: 40 });
})();
export {
  MunicipalPublications
};
//# sourceMappingURL=chunk-ILLNCO6Z.js.map
