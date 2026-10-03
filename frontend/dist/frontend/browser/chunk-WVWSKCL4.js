import {
  AgentService
} from "./chunk-5QXMNFWU.js";
import {
  takeUntilDestroyed
} from "./chunk-WC5DJJOI.js";
import {
  ROLE_LABELS
} from "./chunk-OY2B3AGZ.js";
import {
  ActivatedRoute
} from "./chunk-O26HSNKS.js";
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
  UserService,
  apiErrorMessage
} from "./chunk-K3YQDOX3.js";
import {
  Component,
  DatePipe,
  DestroyRef,
  Subject,
  __spreadProps,
  __spreadValues,
  computed,
  concat,
  debounceTime,
  finalize,
  forkJoin,
  inject,
  last,
  of,
  setClassMetadata,
  signal,
  switchMap,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-E5MYAYBP.js";

// src/app/users/accounts.ts
var _c0 = () => ({ width: "min(30rem, 95vw)" });
var _c1 = () => [10, 20, 50];
var _c2 = () => ({ "min-width": "60rem" });
var _c3 = () => ({ width: "min(34rem, 95vw)" });
function Accounts_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "h1", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.page().title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.page().description);
  }
}
function Accounts_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "p-button", 30);
    \u0275\u0275listener("onClick", function Accounts_ng_template_6_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p-button", 31);
    \u0275\u0275listener("onClick", function Accounts_ng_template_6_Template_p_button_onClick_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openNew());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("outlined", true)("loading", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r1.page().create);
  }
}
function Accounts_ng_template_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.role() === "manager" ? "Institut dirig\xE9" : "Institut");
  }
}
function Accounts_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th", 32);
    \u0275\u0275text(2, "Compte ");
    \u0275\u0275element(3, "p-sortIcon", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, Accounts_ng_template_15_Conditional_4_Template, 2, 1, "th", 34);
    \u0275\u0275elementStart(5, "th", 35);
    \u0275\u0275text(6, "\xC9tat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 36);
    \u0275\u0275text(8, "Cr\xE9\xE9 le ");
    \u0275\u0275element(9, "p-sortIcon", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 38);
    \u0275\u0275text(11, "Actions");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.showAttachment() ? 4 : -1);
  }
}
function Accounts_ng_template_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-orange-600", ctx_r1.attachment(user_r5) === "Aucun institut" || ctx_r1.attachment(user_r5) === "Sans profil agent");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.attachment(user_r5));
  }
}
function Accounts_ng_template_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 47);
    \u0275\u0275listener("onClick", function Accounts_ng_template_17_Conditional_15_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r6);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmActivation(user_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Accounts_ng_template_17_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 48);
    \u0275\u0275listener("onClick", function Accounts_ng_template_17_Conditional_16_Template_p_button_onClick_0_listener() {
      \u0275\u0275restoreView(_r7);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmActivation(user_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("rounded", true)("text", true);
  }
}
function Accounts_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, Accounts_ng_template_17_Conditional_6_Template, 2, 3, "td", 41);
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275element(8, "p-tag", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "div", 43)(14, "p-button", 44);
    \u0275\u0275listener("onClick", function Accounts_ng_template_17_Template_p_button_onClick_14_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEdit(user_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, Accounts_ng_template_17_Conditional_15_Template, 1, 2, "p-button", 45)(16, Accounts_ng_template_17_Conditional_16_Template, 1, 2, "p-button", 46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("opacity-60", !user_r5.is_active);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showAttachment() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", user_r5.is_active ? "Actif" : "D\xE9sactiv\xE9")("severity", user_r5.is_active ? "success" : "danger");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 11, user_r5.created_at, "dd/MM/yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275property("rounded", true)("text", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r5.is_active ? 15 : 16);
  }
}
function Accounts_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.showAttachment() ? 5 : 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.page().empty);
  }
}
function Accounts_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.edited.role === "manager" ? "Son institut se retrouvera sans responsable." : "Son profil agent sera d\xE9sactiv\xE9.", " ");
  }
}
function Accounts_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-select", 51);
    \u0275\u0275twoWayListener("ngModelChange", function Accounts_Conditional_37_Template_p_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.form.institut_id, $event) || (ctx_r1.form.institut_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.form.role === "manager" ? "Institut dirig\xE9" : "Institut de rattachement");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.form.institut_id);
    \u0275\u0275property("options", ctx_r1.institutOptions())("showClear", ctx_r1.form.role === "manager")("required", ctx_r1.form.role === "agent")("placeholder", ctx_r1.form.role === "manager" ? "Aucun institut" : "Choisir un institut")("emptyMessage", ctx_r1.form.role === "manager" ? "Tous les instituts actifs ont d\xE9j\xE0 un responsable" : "Aucun institut actif");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.form.role === "manager" ? "Un responsable ne dirige qu\u2019un seul institut." : "L\u2019agent ne recevra que les demandes de cet institut.", " ");
  }
}
function Accounts_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "(laisser vide pour ne pas changer)");
    \u0275\u0275elementEnd();
  }
}
function Accounts_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function Accounts_ng_template_45_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dialogVisible = false);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(1, "button", 53);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const accountForm_r8 = \u0275\u0275reference(23);
    \u0275\u0275property("text", true);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx_r1.saving())("disabled", !accountForm_r8.valid || ctx_r1.saving());
  }
}
var EMPTY_FORM = { name: "", email: "", role: "citizen", password: "", institut_id: null };
var ROLE_PAGES = {
  citizen: {
    title: "Citoyens",
    description: "Comptes des habitants qui envoient des demandes.",
    create: "Nouveau citoyen",
    empty: "Aucun citoyen ne correspond aux crit\xE8res."
  },
  agent: {
    title: "Agents",
    description: "Comptes des agents de terrain et institut de rattachement.",
    create: "Nouvel agent",
    empty: "Aucun agent ne correspond aux crit\xE8res."
  },
  manager: {
    title: "Managers",
    description: "Responsables d\u2019institut : chacun dirige un seul institut.",
    create: "Nouveau manager",
    empty: "Aucun manager ne correspond aux crit\xE8res."
  },
  admin: {
    title: "Administrateurs",
    description: "Comptes qui administrent toute la plateforme.",
    create: "Nouvel administrateur",
    empty: "Aucun administrateur ne correspond aux crit\xE8res."
  }
};
var Accounts = class _Accounts {
  users = inject(UserService);
  agents = inject(AgentService);
  instituts = inject(InstitutService);
  messages = inject(MessageService);
  confirmation = inject(ConfirmationService);
  searches = new Subject();
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  /** Rôle de la liste affichée, fixé par la route. */
  role = signal("citizen", ...ngDevMode ? [{ debugName: "role" }] : []);
  page = computed(() => ROLE_PAGES[this.role()], ...ngDevMode ? [{ debugName: "page" }] : []);
  /** Le rattachement à un institut n'a de sens que pour les agents et les managers. */
  showAttachment = computed(() => this.role() === "agent" || this.role() === "manager", ...ngDevMode ? [{ debugName: "showAttachment" }] : []);
  accounts = signal([], ...ngDevMode ? [{ debugName: "accounts" }] : []);
  institutList = signal([], ...ngDevMode ? [{ debugName: "institutList" }] : []);
  agentProfiles = signal([], ...ngDevMode ? [{ debugName: "agentProfiles" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  roleOptions = Object.keys(ROLE_LABELS).map((role) => ({ label: ROLE_LABELS[role], value: role }));
  /** user_id → profil agent ; manager_id → institut dirigé. */
  profileByUser = computed(() => new Map(this.agentProfiles().map((agent) => [agent.user_id, agent])), ...ngDevMode ? [{ debugName: "profileByUser" }] : []);
  institutByManager = computed(() => new Map(this.institutList().filter((i) => i.manager_id).map((i) => [i.manager_id, i])), ...ngDevMode ? [{ debugName: "institutByManager" }] : []);
  searchText = "";
  dialogVisible = false;
  edited = null;
  form = __spreadValues({}, EMPTY_FORM);
  constructor() {
    this.searches.pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAccounts());
  }
  ngOnInit() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.role.set(data["role"] ?? "citizen");
      this.searchText = "";
      this.dialogVisible = false;
      this.load();
    });
  }
  load() {
    this.loading.set(true);
    forkJoin({
      accounts: this.users.listAccounts(this.role(), this.searchText),
      instituts: this.instituts.list(),
      agents: this.agents.list()
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: ({ accounts, instituts, agents }) => {
        this.accounts.set(accounts);
        this.institutList.set(instituts);
        this.agentProfiles.set(agents);
      },
      error: (error) => this.showError(error)
    });
  }
  loadAccounts() {
    this.loading.set(true);
    this.users.listAccounts(this.role(), this.searchText).pipe(finalize(() => this.loading.set(false))).subscribe({ next: (accounts) => this.accounts.set(accounts), error: (error) => this.showError(error) });
  }
  onSearchChange(value) {
    this.searchText = value;
    this.searches.next();
  }
  /** Ce à quoi le compte est rattaché, pour la colonne du tableau. */
  attachment(user) {
    if (user.role === "manager") {
      return this.institutByManager().get(user.id)?.name ?? "Aucun institut";
    }
    if (user.role === "agent") {
      const profile = this.profileByUser().get(user.id);
      if (!profile)
        return "Sans profil agent";
      return profile.is_active ? profile.institut_name : `${profile.institut_name} (profil d\xE9sactiv\xE9)`;
    }
    return "\u2014";
  }
  /** Manager : instituts actifs sans responsable (ou le sien). Agent : tous les instituts actifs. */
  institutOptions() {
    const own = this.edited?.id;
    return this.institutList().filter((i) => i.is_active && (this.form.role !== "manager" || !i.manager_id || i.manager_id === own)).map((i) => ({ label: i.name, value: i.id }));
  }
  needsInstitut() {
    return this.form.role === "manager" || this.form.role === "agent";
  }
  openNew() {
    this.edited = null;
    this.form = __spreadProps(__spreadValues({}, EMPTY_FORM), { role: this.role() });
    this.dialogVisible = true;
  }
  openEdit(user) {
    this.edited = user;
    this.form = { name: user.name, email: user.email, role: user.role, password: "", institut_id: this.currentInstitut(user) };
    this.dialogVisible = true;
  }
  save(form) {
    if (form.invalid || this.saving()) {
      form.control.markAllAsTouched();
      return;
    }
    const values = this.form;
    const edited = this.edited;
    const account$ = edited ? this.users.updateAccount(edited.id, this.changes(edited, values)) : this.users.createAccount({ name: values.name.trim(), email: values.email.trim(), password: values.password, role: values.role });
    this.saving.set(true);
    account$.pipe(
      // Le compte d'abord (le rôle conditionne le rattachement), puis l'institut.
      switchMap((user) => this.attach(user, values.institut_id)),
      finalize(() => this.saving.set(false))
    ).subscribe({
      next: () => {
        this.dialogVisible = false;
        this.showSuccess(edited ? "Compte modifi\xE9" : "Compte cr\xE9\xE9");
        this.load();
      },
      error: (error) => {
        this.showError(error);
        this.load();
      }
    });
  }
  confirmActivation(user) {
    const action = user.is_active ? "D\xE9sactiver" : "R\xE9activer";
    const consequence = user.is_active && user.role === "manager" ? " Son institut se retrouvera sans responsable." : user.is_active && user.role === "agent" ? " Son profil agent sera d\xE9sactiv\xE9." : "";
    this.confirmation.confirm({
      header: `${action} le compte`,
      message: `${action} le compte de ${user.name} ?${consequence}`,
      icon: "pi pi-exclamation-triangle",
      acceptLabel: action,
      rejectLabel: "Annuler",
      acceptButtonProps: { severity: user.is_active ? "danger" : "success" },
      rejectButtonProps: { severity: "secondary", outlined: true },
      accept: () => this.users.updateAccount(user.id, { is_active: !user.is_active }).subscribe({
        next: () => {
          this.showSuccess(user.is_active ? "Compte d\xE9sactiv\xE9" : "Compte r\xE9activ\xE9");
          this.load();
        },
        error: (error) => this.showError(error)
      })
    });
  }
  currentInstitut(user) {
    if (user.role === "manager")
      return this.institutByManager().get(user.id)?.id ?? null;
    if (user.role === "agent")
      return this.profileByUser().get(user.id)?.institut_id ?? null;
    return null;
  }
  changes(user, values) {
    const changes = {};
    if (values.name.trim() !== user.name)
      changes.name = values.name.trim();
    if (values.email.trim() !== user.email)
      changes.email = values.email.trim();
    if (values.role !== user.role)
      changes.role = values.role;
    if (values.password)
      changes.password = values.password;
    return changes;
  }
  /** Rattachement après enregistrement du compte, en étapes successives. */
  attach(user, institutId) {
    const steps = [];
    if (user.role === "manager") {
      const current = this.institutByManager().get(user.id);
      if (current?.id !== institutId) {
        if (current)
          steps.push(this.instituts.setManager(current.id, null));
        if (institutId)
          steps.push(this.instituts.setManager(institutId, user.id));
      }
    }
    if (user.role === "agent" && institutId) {
      const profile = this.profileByUser().get(user.id);
      if (!profile) {
        steps.push(this.agents.create({ user_id: user.id, institut_id: institutId, status: "available" }));
      } else {
        if (profile.institut_id !== institutId)
          steps.push(this.agents.move(profile.id, institutId));
        if (!profile.is_active)
          steps.push(this.agents.activate(profile.id));
      }
    }
    return steps.length ? concat(...steps).pipe(last()) : of(null);
  }
  showSuccess(detail) {
    this.messages.add({ severity: "success", summary: "Succ\xE8s", detail, life: 3e3 });
  }
  showError(error) {
    this.messages.add({ severity: "error", summary: "Erreur", detail: apiErrorMessage(error), life: 5e3 });
  }
  static \u0275fac = function Accounts_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Accounts)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Accounts, selectors: [["app-accounts"]], features: [\u0275\u0275ProvidersFeature([MessageService, ConfirmationService])], decls: 47, vars: 31, consts: [["start", ""], ["end", ""], ["header", ""], ["body", ""], ["emptymessage", ""], ["accountForm", "ngForm"], ["footer", ""], [1, "card"], ["styleClass", "mb-5"], [1, "mb-5", "grid", "grid-cols-1", "gap-3", "md:grid-cols-2", "xl:grid-cols-3"], ["styleClass", "pi pi-search"], ["pInputText", "", "type", "search", "aria-label", "Rechercher un compte par nom ou email", "placeholder", "Nom ou email...", 1, "w-full", 3, "ngModelChange", "ngModel"], ["aria-live", "polite", 1, "self-center", "text-sm", "text-muted-color"], ["dataKey", "id", "currentPageReportTemplate", "Affichage {first} \xE0 {last} sur {totalRecords} comptes", 3, "value", "loading", "paginator", "rows", "rowsPerPageOptions", "rowHover", "tableStyle", "showCurrentPageReport"], [3, "visibleChange", "visible", "header", "modal"], ["id", "accountForm", 1, "grid", "grid-cols-1", "gap-4", 3, "ngSubmit"], ["for", "account-name", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "account-name", "name", "name", "required", "", "maxlength", "255", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "account-email", 1, "mb-2", "block", "font-semibold"], ["pInputText", "", "id", "account-email", "name", "email", "type", "email", "required", "", "email", "", "maxlength", "320", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "account-role", 1, "mb-2", "block", "font-semibold"], ["inputId", "account-role", "name", "role", "optionLabel", "label", "optionValue", "value", "required", "", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options"], [1, "mt-1", "block", "text-orange-600"], ["for", "account-password", 1, "mb-2", "block", "font-semibold"], [1, "font-normal", "text-muted-color"], ["pInputText", "", "id", "account-password", "name", "password", "type", "password", "autocomplete", "new-password", "minlength", "10", 1, "w-full", 3, "ngModelChange", "ngModel", "required"], [1, "mt-1", "block", "text-muted-color"], [1, "m-0", "text-xl", "font-semibold"], [1, "mt-1", "mb-0", "text-sm", "text-muted-color"], [1, "flex", "gap-2"], ["label", "Actualiser", "icon", "pi pi-refresh", "severity", "secondary", 3, "onClick", "outlined", "loading"], ["icon", "pi pi-plus", 3, "onClick", "label"], ["pSortableColumn", "name", 2, "min-width", "14rem"], ["field", "name"], [2, "min-width", "12rem"], [2, "min-width", "8rem"], ["pSortableColumn", "created_at", 2, "min-width", "9rem"], ["field", "created_at"], [2, "width", "8rem"], [1, "font-medium"], [1, "text-sm", "text-muted-color"], [3, "text-orange-600"], [3, "value", "severity"], [1, "flex", "gap-1"], ["icon", "pi pi-pencil", "ariaLabel", "Modifier le compte", "pTooltip", "Modifier", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver le compte", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer le compte", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "rounded", "text"], ["icon", "pi pi-ban", "severity", "danger", "ariaLabel", "D\xE9sactiver le compte", "pTooltip", "D\xE9sactiver", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], ["icon", "pi pi-replay", "severity", "success", "ariaLabel", "R\xE9activer le compte", "pTooltip", "R\xE9activer", "tooltipPosition", "top", 3, "onClick", "rounded", "text"], [1, "py-8", "text-center", "text-muted-color"], ["for", "account-institut", 1, "mb-2", "block", "font-semibold"], ["inputId", "account-institut", "name", "institut_id", "optionLabel", "label", "optionValue", "value", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "options", "showClear", "required", "placeholder", "emptyMessage"], ["pButton", "", "type", "button", "label", "Annuler", "icon", "pi pi-times", 3, "click", "text"], ["pButton", "", "type", "submit", "form", "accountForm", "label", "Enregistrer", "icon", "pi pi-check", 3, "loading", "disabled"]], template: function Accounts_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275element(0, "p-toast")(1, "p-confirmdialog");
      \u0275\u0275elementStart(2, "div", 7)(3, "p-toolbar", 8);
      \u0275\u0275template(4, Accounts_ng_template_4_Template, 5, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, Accounts_ng_template_6_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 9)(9, "p-iconfield");
      \u0275\u0275element(10, "p-inputicon", 10);
      \u0275\u0275elementStart(11, "input", 11);
      \u0275\u0275listener("ngModelChange", function Accounts_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "span", 12);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "p-table", 13);
      \u0275\u0275template(15, Accounts_ng_template_15_Template, 12, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(17, Accounts_ng_template_17_Template, 17, 14, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(19, Accounts_ng_template_19_Template, 3, 2, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "p-dialog", 14);
      \u0275\u0275twoWayListener("visibleChange", function Accounts_Template_p_dialog_visibleChange_21_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.dialogVisible, $event) || (ctx.dialogVisible = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(22, "form", 15, 5);
      \u0275\u0275listener("ngSubmit", function Accounts_Template_form_ngSubmit_22_listener() {
        \u0275\u0275restoreView(_r1);
        const accountForm_r8 = \u0275\u0275reference(23);
        return \u0275\u0275resetView(ctx.save(accountForm_r8));
      });
      \u0275\u0275elementStart(24, "div")(25, "label", 16);
      \u0275\u0275text(26, "Nom");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function Accounts_Template_input_ngModelChange_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div")(29, "label", 18);
      \u0275\u0275text(30, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 19);
      \u0275\u0275twoWayListener("ngModelChange", function Accounts_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.email, $event) || (ctx.form.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div")(33, "label", 20);
      \u0275\u0275text(34, "R\xF4le");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p-select", 21);
      \u0275\u0275twoWayListener("ngModelChange", function Accounts_Template_p_select_ngModelChange_35_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.role, $event) || (ctx.form.role = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("ngModelChange", function Accounts_Template_p_select_ngModelChange_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.form.institut_id = null);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(36, Accounts_Conditional_36_Template, 2, 1, "small", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(37, Accounts_Conditional_37_Template, 6, 8, "div");
      \u0275\u0275elementStart(38, "div")(39, "label", 23);
      \u0275\u0275text(40);
      \u0275\u0275conditionalCreate(41, Accounts_Conditional_41_Template, 2, 0, "span", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function Accounts_Template_input_ngModelChange_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.password, $event) || (ctx.form.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "small", 26);
      \u0275\u0275text(44, "10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre. Toute modification sensible d\xE9connecte le compte.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(45, Accounts_ng_template_45_Template, 2, 3, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(27, _c0));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.searchText);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.accounts().length, " compte(s)");
      \u0275\u0275advance();
      \u0275\u0275property("value", ctx.accounts())("loading", ctx.loading())("paginator", true)("rows", 10)("rowsPerPageOptions", \u0275\u0275pureFunction0(28, _c1))("rowHover", true)("tableStyle", \u0275\u0275pureFunction0(29, _c2))("showCurrentPageReport", true);
      \u0275\u0275advance(7);
      \u0275\u0275styleMap(\u0275\u0275pureFunction0(30, _c3));
      \u0275\u0275twoWayProperty("visible", ctx.dialogVisible);
      \u0275\u0275property("header", ctx.edited ? "Modifier le compte" : ctx.page().create)("modal", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.role);
      \u0275\u0275property("options", ctx.roleOptions);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.edited && ctx.edited.role !== ctx.form.role && (ctx.edited.role === "manager" || ctx.edited.role === "agent") ? 36 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.needsInstitut() ? 37 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.edited ? "Nouveau mot de passe" : "Mot de passe initial", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.edited ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.form.password);
      \u0275\u0275property("required", !ctx.edited);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, EmailValidator, NgModel, NgForm, ButtonModule, ButtonDirective, Button, ConfirmDialogModule, ConfirmDialog, DialogModule, Dialog, IconFieldModule, IconField, InputIconModule, InputIcon, InputTextModule, InputText, SelectModule, Select, TableModule, Table, SortableColumn, SortIcon, TagModule, Tag, ToastModule, Toast, ToolbarModule, Toolbar, TooltipModule, Tooltip, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Accounts, [{
    type: Component,
    args: [{ selector: "app-accounts", imports: [DatePipe, FormsModule, ButtonModule, ConfirmDialogModule, DialogModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule, ToastModule, ToolbarModule, TooltipModule], providers: [MessageService, ConfirmationService], template: `<p-toast />
<p-confirmdialog [style]="{ width: 'min(30rem, 95vw)' }" />

<div class="card">
    <p-toolbar styleClass="mb-5">
        <ng-template #start>
            <div>
                <h1 class="m-0 text-xl font-semibold">{{ page().title }}</h1>
                <p class="mt-1 mb-0 text-sm text-muted-color">{{ page().description }}</p>
            </div>
        </ng-template>
        <ng-template #end>
            <div class="flex gap-2">
                <p-button label="Actualiser" icon="pi pi-refresh" severity="secondary" [outlined]="true" [loading]="loading()" (onClick)="load()" />
                <p-button [label]="page().create" icon="pi pi-plus" (onClick)="openNew()" />
            </div>
        </ng-template>
    </p-toolbar>

    <div class="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="search" class="w-full" aria-label="Rechercher un compte par nom ou email" placeholder="Nom ou email..." [ngModel]="searchText" (ngModelChange)="onSearchChange($event)" />
        </p-iconfield>
        <span class="self-center text-sm text-muted-color" aria-live="polite">{{ accounts().length }} compte(s)</span>
    </div>

    <p-table [value]="accounts()" [loading]="loading()" [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10, 20, 50]" [rowHover]="true" dataKey="id" [tableStyle]="{ 'min-width': '60rem' }" currentPageReportTemplate="Affichage {first} \xE0 {last} sur {totalRecords} comptes" [showCurrentPageReport]="true">
        <ng-template #header>
            <tr>
                <th pSortableColumn="name" style="min-width: 14rem">Compte <p-sortIcon field="name" /></th>
                @if (showAttachment()) {
                    <th style="min-width: 12rem">{{ role() === 'manager' ? 'Institut dirig\xE9' : 'Institut' }}</th>
                }
                <th style="min-width: 8rem">\xC9tat</th>
                <th pSortableColumn="created_at" style="min-width: 9rem">Cr\xE9\xE9 le <p-sortIcon field="created_at" /></th>
                <th style="width: 8rem">Actions</th>
            </tr>
        </ng-template>
        <ng-template #body let-user>
            <tr [class.opacity-60]="!user.is_active">
                <td>
                    <div class="font-medium">{{ user.name }}</div>
                    <div class="text-sm text-muted-color">{{ user.email }}</div>
                </td>
                @if (showAttachment()) {
                    <td [class.text-orange-600]="attachment(user) === 'Aucun institut' || attachment(user) === 'Sans profil agent'">{{ attachment(user) }}</td>
                }
                <td><p-tag [value]="user.is_active ? 'Actif' : 'D\xE9sactiv\xE9'" [severity]="user.is_active ? 'success' : 'danger'" /></td>
                <td>{{ user.created_at | date: 'dd/MM/yyyy' }}</td>
                <td>
                    <div class="flex gap-1">
                        <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" ariaLabel="Modifier le compte" pTooltip="Modifier" tooltipPosition="top" (onClick)="openEdit(user)" />
                        @if (user.is_active) {
                            <p-button icon="pi pi-ban" severity="danger" [rounded]="true" [text]="true" ariaLabel="D\xE9sactiver le compte" pTooltip="D\xE9sactiver" tooltipPosition="top" (onClick)="confirmActivation(user)" />
                        } @else {
                            <p-button icon="pi pi-replay" severity="success" [rounded]="true" [text]="true" ariaLabel="R\xE9activer le compte" pTooltip="R\xE9activer" tooltipPosition="top" (onClick)="confirmActivation(user)" />
                        }
                    </div>
                </td>
            </tr>
        </ng-template>
        <ng-template #emptymessage>
            <tr>
                <td [attr.colspan]="showAttachment() ? 5 : 4" class="py-8 text-center text-muted-color">{{ page().empty }}</td>
            </tr>
        </ng-template>
    </p-table>
</div>

<p-dialog [(visible)]="dialogVisible" [header]="edited ? 'Modifier le compte' : page().create" [modal]="true" [style]="{ width: 'min(34rem, 95vw)' }">
    <form #accountForm="ngForm" id="accountForm" class="grid grid-cols-1 gap-4" (ngSubmit)="save(accountForm)">
        <div>
            <label for="account-name" class="mb-2 block font-semibold">Nom</label>
            <input pInputText id="account-name" name="name" [(ngModel)]="form.name" required maxlength="255" class="w-full" />
        </div>
        <div>
            <label for="account-email" class="mb-2 block font-semibold">Email</label>
            <input pInputText id="account-email" name="email" type="email" [(ngModel)]="form.email" required email maxlength="320" class="w-full" />
        </div>
        <div>
            <label for="account-role" class="mb-2 block font-semibold">R\xF4le</label>
            <p-select inputId="account-role" name="role" [(ngModel)]="form.role" (ngModelChange)="form.institut_id = null" [options]="roleOptions" optionLabel="label" optionValue="value" required class="w-full" appendTo="body" />
            @if (edited && edited.role !== form.role && (edited.role === 'manager' || edited.role === 'agent')) {
                <small class="mt-1 block text-orange-600">
                    {{ edited.role === 'manager' ? 'Son institut se retrouvera sans responsable.' : 'Son profil agent sera d\xE9sactiv\xE9.' }}
                </small>
            }
        </div>
        @if (needsInstitut()) {
            <div>
                <label for="account-institut" class="mb-2 block font-semibold">{{ form.role === 'manager' ? 'Institut dirig\xE9' : 'Institut de rattachement' }}</label>
                <p-select
                    inputId="account-institut"
                    name="institut_id"
                    [(ngModel)]="form.institut_id"
                    [options]="institutOptions()"
                    optionLabel="label"
                    optionValue="value"
                    [showClear]="form.role === 'manager'"
                    [required]="form.role === 'agent'"
                    [placeholder]="form.role === 'manager' ? 'Aucun institut' : 'Choisir un institut'"
                    [emptyMessage]="form.role === 'manager' ? 'Tous les instituts actifs ont d\xE9j\xE0 un responsable' : 'Aucun institut actif'"
                    class="w-full"
                    appendTo="body"
                />
                <small class="mt-1 block text-muted-color">
                    {{ form.role === 'manager' ? 'Un responsable ne dirige qu\u2019un seul institut.' : 'L\u2019agent ne recevra que les demandes de cet institut.' }}
                </small>
            </div>
        }
        <div>
            <label for="account-password" class="mb-2 block font-semibold">
                {{ edited ? 'Nouveau mot de passe' : 'Mot de passe initial' }}
                @if (edited) { <span class="font-normal text-muted-color">(laisser vide pour ne pas changer)</span> }
            </label>
            <input pInputText id="account-password" name="password" type="password" autocomplete="new-password" [(ngModel)]="form.password" [required]="!edited" minlength="10" class="w-full" />
            <small class="mt-1 block text-muted-color">10 caract\xE8res minimum, avec une minuscule, une majuscule et un chiffre. Toute modification sensible d\xE9connecte le compte.</small>
        </div>
    </form>
    <ng-template #footer>
        <button pButton type="button" label="Annuler" icon="pi pi-times" [text]="true" (click)="dialogVisible = false"></button>
        <button pButton type="submit" form="accountForm" label="Enregistrer" icon="pi pi-check" [loading]="saving()" [disabled]="!accountForm.valid || saving()"></button>
    </ng-template>
</p-dialog>
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Accounts, { className: "Accounts", filePath: "src/app/users/accounts.ts", lineNumber: 79 });
})();
export {
  Accounts
};
//# sourceMappingURL=chunk-WVWSKCL4.js.map
