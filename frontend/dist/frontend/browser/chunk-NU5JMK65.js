import {
  LayoutService
} from "./chunk-ZPDOWPDJ.js";
import {
  AuthService
} from "./chunk-BFXRYUZT.js";
import {
  DomSanitizer,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-O26HSNKS.js";
import {
  SelectButton,
  SelectButtonModule
} from "./chunk-WBYO2P7A.js";
import {
  Motion,
  MotionModule
} from "./chunk-JL6DBWWC.js";
import {
  Tooltip,
  TooltipModule,
  zindexutils
} from "./chunk-4SKMWIOF.js";
import {
  Badge,
  BadgeModule,
  Button,
  ButtonModule,
  Ripple
} from "./chunk-MVSMOWLB.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-SR5QZYJT.js";
import {
  ConnectedOverlayScrollHandler
} from "./chunk-WHXYSCHV.js";
import {
  Ae,
  BaseComponent,
  BaseStyle,
  Bind,
  BindModule,
  D,
  OverlayService,
  P,
  PARENT_INSTANCE,
  PrimeTemplate,
  R,
  S,
  SharedModule,
  Ve,
  W,
  Y,
  Yt,
  bt,
  c,
  j,
  s2 as s,
  ut,
  v,
  w2 as w,
  z
} from "./chunk-UHTXY4UO.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgStyle,
  NgTemplateOutlet,
  NgZone,
  Output,
  PLATFORM_ID,
  Pipe,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  __spreadValues,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  isPlatformBrowser,
  map,
  numberAttribute,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuerySignal
} from "./chunk-E5MYAYBP.js";

// src/app/auth/auth.guard.ts
var authGuard = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.validateSession().pipe(map((user) => {
    if (!user) {
      return router.createUrlTree(["/auth/login"], { queryParams: { returnUrl: state.url } });
    }
    let current = route;
    while (current) {
      const roles = current.data["roles"];
      if (roles && !roles.includes(user.role))
        return router.parseUrl(auth.homeUrl());
      current = current.parent;
    }
    return true;
  }));
};
var roleGuard = authGuard;
var publicSessionGuard = () => inject(AuthService).validateSession().pipe(map(() => true));
var guestGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.validateSession().pipe(map((user) => user ? router.parseUrl(auth.homeUrl()) : true));
};

// node_modules/@primeuix/themes/dist/aura/accordion/index.mjs
var o = { transitionDuration: "{transition.duration}" };
var r = { borderWidth: "0 0 1px 0", borderColor: "{content.border.color}" };
var t = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}", padding: "1.125rem", fontWeight: "600", borderRadius: "0", borderWidth: "0", borderColor: "{content.border.color}", background: "{content.background}", hoverBackground: "{content.background}", activeBackground: "{content.background}", activeHoverBackground: "{content.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, toggleIcon: { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}" }, first: { topBorderRadius: "{content.border.radius}", borderWidth: "0" }, last: { bottomBorderRadius: "{content.border.radius}", activeBottomBorderRadius: "0" } };
var e = { borderWidth: "0", borderColor: "{content.border.color}", background: "{content.background}", color: "{text.color}", padding: "0 1.125rem 1.125rem 1.125rem" };
var c2 = { root: o, panel: r, header: t, content: e };

// node_modules/@primeuix/themes/dist/aura/autocomplete/index.mjs
var o2 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r2 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var d = { padding: "{list.padding}", gap: "{list.gap}" };
var e2 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var l = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var i = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c3 = { borderRadius: "{border.radius.sm}" };
var f = { padding: "{list.option.padding}" };
var s2 = { light: { chip: { focusBackground: "{surface.200}", focusColor: "{surface.800}" }, dropdown: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", focusColor: "{surface.0}" }, dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" } } };
var a = { root: o2, overlay: r2, list: d, option: e2, optionGroup: l, dropdown: i, chip: c3, emptyMessage: f, colorScheme: s2 };

// node_modules/@primeuix/themes/dist/aura/avatar/index.mjs
var e3 = { width: "2rem", height: "2rem", fontSize: "1rem", background: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var r3 = { size: "1rem" };
var o3 = { borderColor: "{content.background}", offset: "-0.75rem" };
var t2 = { width: "3rem", height: "3rem", fontSize: "1.5rem", icon: { size: "1.5rem" }, group: { offset: "-1rem" } };
var i2 = { width: "4rem", height: "4rem", fontSize: "2rem", icon: { size: "2rem" }, group: { offset: "-1.5rem" } };
var n = { root: e3, icon: r3, group: o3, lg: t2, xl: i2 };

// node_modules/@primeuix/themes/dist/aura/badge/index.mjs
var r4 = { borderRadius: "{border.radius.md}", padding: "0 0.5rem", fontSize: "0.75rem", fontWeight: "700", minWidth: "1.5rem", height: "1.5rem" };
var o4 = { size: "0.5rem" };
var e4 = { fontSize: "0.625rem", minWidth: "1.25rem", height: "1.25rem" };
var c4 = { fontSize: "0.875rem", minWidth: "1.75rem", height: "1.75rem" };
var a2 = { fontSize: "1rem", minWidth: "2rem", height: "2rem" };
var n2 = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.500}", color: "{surface.0}" }, info: { background: "{sky.500}", color: "{surface.0}" }, warn: { background: "{orange.500}", color: "{surface.0}" }, danger: { background: "{red.500}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "{green.400}", color: "{green.950}" }, info: { background: "{sky.400}", color: "{sky.950}" }, warn: { background: "{orange.400}", color: "{orange.950}" }, danger: { background: "{red.400}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var d2 = { root: r4, dot: o4, sm: e4, lg: c4, xl: a2, colorScheme: n2 };

// node_modules/@primeuix/themes/dist/aura/base/index.mjs
var r5 = { borderRadius: { none: "0", xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337", 950: "#4c0519" }, slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" } };
var o5 = { transitionDuration: "0.2s", focusRing: { width: "1px", style: "solid", color: "{primary.color}", offset: "2px", shadow: "none" }, disabledOpacity: "0.6", iconSize: "1rem", anchorGutter: "2px", primary: { 50: "{emerald.50}", 100: "{emerald.100}", 200: "{emerald.200}", 300: "{emerald.300}", 400: "{emerald.400}", 500: "{emerald.500}", 600: "{emerald.600}", 700: "{emerald.700}", 800: "{emerald.800}", 900: "{emerald.900}", 950: "{emerald.950}" }, formField: { paddingX: "0.75rem", paddingY: "0.5rem", sm: { fontSize: "0.875rem", paddingX: "0.625rem", paddingY: "0.375rem" }, lg: { fontSize: "1.125rem", paddingX: "0.875rem", paddingY: "0.625rem" }, borderRadius: "{border.radius.md}", focusRing: { width: "0", style: "none", color: "transparent", offset: "0", shadow: "none" }, transitionDuration: "{transition.duration}" }, list: { padding: "0.25rem 0.25rem", gap: "2px", header: { padding: "0.5rem 1rem 0.25rem 1rem" }, option: { padding: "0.5rem 0.75rem", borderRadius: "{border.radius.sm}" }, optionGroup: { padding: "0.5rem 0.75rem", fontWeight: "600" } }, content: { borderRadius: "{border.radius.md}" }, mask: { transitionDuration: "0.3s" }, navigation: { list: { padding: "0.25rem 0.25rem", gap: "2px" }, item: { padding: "0.5rem 0.75rem", borderRadius: "{border.radius.sm}", gap: "0.5rem" }, submenuLabel: { padding: "0.5rem 0.75rem", fontWeight: "600" }, submenuIcon: { size: "0.875rem" } }, overlay: { select: { borderRadius: "{border.radius.md}", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, popover: { borderRadius: "{border.radius.md}", padding: "0.75rem", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, modal: { borderRadius: "{border.radius.xl}", padding: "1.25rem", shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }, navigation: { shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" } }, colorScheme: { light: { surface: { 0: "#ffffff", 50: "{slate.50}", 100: "{slate.100}", 200: "{slate.200}", 300: "{slate.300}", 400: "{slate.400}", 500: "{slate.500}", 600: "{slate.600}", 700: "{slate.700}", 800: "{slate.800}", 900: "{slate.900}", 950: "{slate.950}" }, primary: { color: "{primary.500}", contrastColor: "#ffffff", hoverColor: "{primary.600}", activeColor: "{primary.700}" }, highlight: { background: "{primary.50}", focusBackground: "{primary.100}", color: "{primary.700}", focusColor: "{primary.800}" }, mask: { background: "rgba(0,0,0,0.4)", color: "{surface.200}" }, formField: { background: "{surface.0}", disabledBackground: "{surface.200}", filledBackground: "{surface.50}", filledHoverBackground: "{surface.50}", filledFocusBackground: "{surface.50}", borderColor: "{surface.300}", hoverBorderColor: "{surface.400}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.400}", color: "{surface.700}", disabledColor: "{surface.500}", placeholderColor: "{surface.500}", invalidPlaceholderColor: "{red.600}", floatLabelColor: "{surface.500}", floatLabelFocusColor: "{primary.600}", floatLabelActiveColor: "{surface.500}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.400}", shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)" }, text: { color: "{surface.700}", hoverColor: "{surface.800}", mutedColor: "{surface.500}", hoverMutedColor: "{surface.600}" }, content: { background: "{surface.0}", hoverBackground: "{surface.100}", borderColor: "{surface.200}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, popover: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, modal: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.100}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}" } }, optionGroup: { background: "transparent", color: "{text.muted.color}" } }, navigation: { item: { focusBackground: "{surface.100}", activeBackground: "{surface.100}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } }, submenuLabel: { background: "transparent", color: "{text.muted.color}" }, submenuIcon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } } }, dark: { surface: { 0: "#ffffff", 50: "{zinc.50}", 100: "{zinc.100}", 200: "{zinc.200}", 300: "{zinc.300}", 400: "{zinc.400}", 500: "{zinc.500}", 600: "{zinc.600}", 700: "{zinc.700}", 800: "{zinc.800}", 900: "{zinc.900}", 950: "{zinc.950}" }, primary: { color: "{primary.400}", contrastColor: "{surface.900}", hoverColor: "{primary.300}", activeColor: "{primary.200}" }, highlight: { background: "color-mix(in srgb, {primary.400}, transparent 84%)", focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)", color: "rgba(255,255,255,.87)", focusColor: "rgba(255,255,255,.87)" }, mask: { background: "rgba(0,0,0,0.6)", color: "{surface.200}" }, formField: { background: "{surface.950}", disabledBackground: "{surface.700}", filledBackground: "{surface.800}", filledHoverBackground: "{surface.800}", filledFocusBackground: "{surface.800}", borderColor: "{surface.600}", hoverBorderColor: "{surface.500}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.300}", color: "{surface.0}", disabledColor: "{surface.400}", placeholderColor: "{surface.400}", invalidPlaceholderColor: "{red.400}", floatLabelColor: "{surface.400}", floatLabelFocusColor: "{primary.color}", floatLabelActiveColor: "{surface.400}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.400}", shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)" }, text: { color: "{surface.0}", hoverColor: "{surface.0}", mutedColor: "{surface.400}", hoverMutedColor: "{surface.300}" }, content: { background: "{surface.900}", hoverBackground: "{surface.800}", borderColor: "{surface.700}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, popover: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, modal: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.800}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}" } }, optionGroup: { background: "transparent", color: "{text.muted.color}" } }, navigation: { item: { focusBackground: "{surface.800}", activeBackground: "{surface.800}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } }, submenuLabel: { background: "transparent", color: "{text.muted.color}" }, submenuIcon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } } } } };
var e5 = { primitive: r5, semantic: o5 };

// node_modules/@primeuix/themes/dist/aura/blockui/index.mjs
var r6 = { borderRadius: "{content.border.radius}" };
var o6 = { root: r6 };

// node_modules/@primeuix/themes/dist/aura/breadcrumb/index.mjs
var o7 = { padding: "1rem", background: "{content.background}", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r7 = { color: "{text.muted.color}", hoverColor: "{text.color}", borderRadius: "{content.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", hoverColor: "{navigation.item.icon.focus.color}" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i3 = { color: "{navigation.item.icon.color}" };
var t3 = { root: o7, item: r7, separator: i3 };

// node_modules/@primeuix/themes/dist/aura/button/index.mjs
var r8 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", gap: "0.5rem", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", iconOnlyWidth: "2.5rem", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}", iconOnlyWidth: "2rem" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}", iconOnlyWidth: "3rem" }, label: { fontWeight: "500" }, raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" }, badgeSize: "1rem", transitionDuration: "{form.field.transition.duration}" };
var o8 = { light: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", borderColor: "{surface.100}", hoverBorderColor: "{surface.200}", activeBorderColor: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}", focusRing: { color: "{surface.600}", shadow: "none" } }, info: { background: "{sky.500}", hoverBackground: "{sky.600}", activeBackground: "{sky.700}", borderColor: "{sky.500}", hoverBorderColor: "{sky.600}", activeBorderColor: "{sky.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{sky.500}", shadow: "none" } }, success: { background: "{green.500}", hoverBackground: "{green.600}", activeBackground: "{green.700}", borderColor: "{green.500}", hoverBorderColor: "{green.600}", activeBorderColor: "{green.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{green.500}", shadow: "none" } }, warn: { background: "{orange.500}", hoverBackground: "{orange.600}", activeBackground: "{orange.700}", borderColor: "{orange.500}", hoverBorderColor: "{orange.600}", activeBorderColor: "{orange.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{orange.500}", shadow: "none" } }, help: { background: "{purple.500}", hoverBackground: "{purple.600}", activeBackground: "{purple.700}", borderColor: "{purple.500}", hoverBorderColor: "{purple.600}", activeBorderColor: "{purple.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{purple.500}", shadow: "none" } }, danger: { background: "{red.500}", hoverBackground: "{red.600}", activeBackground: "{red.700}", borderColor: "{red.500}", hoverBorderColor: "{red.600}", activeBorderColor: "{red.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{red.500}", shadow: "none" } }, contrast: { background: "{surface.950}", hoverBackground: "{surface.900}", activeBackground: "{surface.800}", borderColor: "{surface.950}", hoverBorderColor: "{surface.900}", activeBorderColor: "{surface.800}", color: "{surface.0}", hoverColor: "{surface.0}", activeColor: "{surface.0}", focusRing: { color: "{surface.950}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", borderColor: "{primary.200}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.500}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", borderColor: "{green.200}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", borderColor: "{sky.200}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", borderColor: "{orange.200}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", borderColor: "{purple.200}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", borderColor: "{red.200}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.700}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.700}" } }, text: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.500}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.700}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } }, dark: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", borderColor: "{surface.800}", hoverBorderColor: "{surface.700}", activeBorderColor: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}", focusRing: { color: "{surface.300}", shadow: "none" } }, info: { background: "{sky.400}", hoverBackground: "{sky.300}", activeBackground: "{sky.200}", borderColor: "{sky.400}", hoverBorderColor: "{sky.300}", activeBorderColor: "{sky.200}", color: "{sky.950}", hoverColor: "{sky.950}", activeColor: "{sky.950}", focusRing: { color: "{sky.400}", shadow: "none" } }, success: { background: "{green.400}", hoverBackground: "{green.300}", activeBackground: "{green.200}", borderColor: "{green.400}", hoverBorderColor: "{green.300}", activeBorderColor: "{green.200}", color: "{green.950}", hoverColor: "{green.950}", activeColor: "{green.950}", focusRing: { color: "{green.400}", shadow: "none" } }, warn: { background: "{orange.400}", hoverBackground: "{orange.300}", activeBackground: "{orange.200}", borderColor: "{orange.400}", hoverBorderColor: "{orange.300}", activeBorderColor: "{orange.200}", color: "{orange.950}", hoverColor: "{orange.950}", activeColor: "{orange.950}", focusRing: { color: "{orange.400}", shadow: "none" } }, help: { background: "{purple.400}", hoverBackground: "{purple.300}", activeBackground: "{purple.200}", borderColor: "{purple.400}", hoverBorderColor: "{purple.300}", activeBorderColor: "{purple.200}", color: "{purple.950}", hoverColor: "{purple.950}", activeColor: "{purple.950}", focusRing: { color: "{purple.400}", shadow: "none" } }, danger: { background: "{red.400}", hoverBackground: "{red.300}", activeBackground: "{red.200}", borderColor: "{red.400}", hoverBorderColor: "{red.300}", activeBorderColor: "{red.200}", color: "{red.950}", hoverColor: "{red.950}", activeColor: "{red.950}", focusRing: { color: "{red.400}", shadow: "none" } }, contrast: { background: "{surface.0}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{surface.0}", hoverBorderColor: "{surface.100}", activeBorderColor: "{surface.200}", color: "{surface.950}", hoverColor: "{surface.950}", activeColor: "{surface.950}", focusRing: { color: "{surface.0}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", borderColor: "{primary.700}", color: "{primary.color}" }, secondary: { hoverBackground: "rgba(255,255,255,0.04)", activeBackground: "rgba(255,255,255,0.16)", borderColor: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", borderColor: "{green.700}", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", borderColor: "{sky.700}", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", borderColor: "{orange.700}", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", borderColor: "{purple.700}", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", borderColor: "{red.700}", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.500}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.600}", color: "{surface.0}" } }, text: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } } };
var e6 = { root: r8, colorScheme: o8 };

// node_modules/@primeuix/themes/dist/aura/card/index.mjs
var o9 = { background: "{content.background}", borderRadius: "{border.radius.xl}", color: "{content.color}", shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" };
var r9 = { padding: "1.25rem", gap: "0.5rem" };
var t4 = { gap: "0.5rem" };
var e7 = { fontSize: "1.25rem", fontWeight: "500" };
var a3 = { color: "{text.muted.color}" };
var d3 = { root: o9, body: r9, caption: t4, title: e7, subtitle: a3 };

// node_modules/@primeuix/themes/dist/aura/carousel/index.mjs
var r10 = { transitionDuration: "{transition.duration}" };
var o10 = { gap: "0.25rem" };
var a4 = { padding: "1rem", gap: "0.5rem" };
var i4 = { width: "2rem", height: "0.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c5 = { light: { indicator: { background: "{surface.200}", hoverBackground: "{surface.300}", activeBackground: "{primary.color}" } }, dark: { indicator: { background: "{surface.700}", hoverBackground: "{surface.600}", activeBackground: "{primary.color}" } } };
var t5 = { root: r10, content: o10, indicatorList: a4, indicator: i4, colorScheme: c5 };

// node_modules/@primeuix/themes/dist/aura/cascadeselect/index.mjs
var o11 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r11 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d4 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l2 = { padding: "{list.padding}", gap: "{list.gap}", mobileIndent: "1rem" };
var e8 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", icon: { color: "{list.option.icon.color}", focusColor: "{list.option.icon.focus.color}", size: "0.875rem" } };
var i5 = { color: "{form.field.icon.color}" };
var f2 = { root: o11, dropdown: r11, overlay: d4, list: l2, option: e8, clearIcon: i5 };

// node_modules/@primeuix/themes/dist/aura/checkbox/index.mjs
var r12 = { borderRadius: "{border.radius.sm}", width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } };
var o12 = { size: "0.875rem", color: "{form.field.color}", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.75rem" }, lg: { size: "1rem" } };
var e9 = { root: r12, icon: o12 };

// node_modules/@primeuix/themes/dist/aura/chip/index.mjs
var o13 = { borderRadius: "16px", paddingX: "0.75rem", paddingY: "0.5rem", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r13 = { width: "2rem", height: "2rem" };
var e10 = { size: "1rem" };
var c6 = { size: "1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var i6 = { light: { root: { background: "{surface.100}", color: "{surface.800}" }, icon: { color: "{surface.800}" }, removeIcon: { color: "{surface.800}" } }, dark: { root: { background: "{surface.800}", color: "{surface.0}" }, icon: { color: "{surface.0}" }, removeIcon: { color: "{surface.0}" } } };
var s3 = { root: o13, image: r13, icon: e10, removeIcon: c6, colorScheme: i6 };

// node_modules/@primeuix/themes/dist/aura/colorpicker/index.mjs
var r14 = { transitionDuration: "{transition.duration}" };
var o14 = { width: "1.5rem", height: "1.5rem", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e11 = { shadow: "{overlay.popover.shadow}", borderRadius: "{overlay.popover.borderRadius}" };
var a5 = { light: { panel: { background: "{surface.800}", borderColor: "{surface.900}" }, handle: { color: "{surface.0}" } }, dark: { panel: { background: "{surface.900}", borderColor: "{surface.700}" }, handle: { color: "{surface.0}" } } };
var s4 = { root: r14, preview: o14, panel: e11, colorScheme: a5 };

// node_modules/@primeuix/themes/dist/aura/confirmdialog/index.mjs
var o15 = { size: "2rem", color: "{overlay.modal.color}" };
var e12 = { gap: "1rem" };
var r15 = { icon: o15, content: e12 };

// node_modules/@primeuix/themes/dist/aura/confirmpopup/index.mjs
var o16 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r16 = { padding: "{overlay.popover.padding}", gap: "1rem" };
var e13 = { size: "1.5rem", color: "{overlay.popover.color}" };
var p = { gap: "0.5rem", padding: "0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}" };
var a6 = { root: o16, content: r16, icon: e13, footer: p };

// node_modules/@primeuix/themes/dist/aura/contextmenu/index.mjs
var o17 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i7 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n3 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a7 = { mobileIndent: "1rem" };
var t6 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r17 = { borderColor: "{content.border.color}" };
var c7 = { root: o17, list: i7, item: n3, submenu: a7, submenuIcon: t6, separator: r17 };

// node_modules/@primeuix/themes/dist/aura/css/index.mjs
var t7 = "\n    li.p-autocomplete-option,\n    div.p-cascadeselect-option-content,\n    li.p-listbox-option,\n    li.p-multiselect-option,\n    li.p-select-option,\n    li.p-listbox-option,\n    div.p-tree-node-content,\n    li.p-datatable-filter-constraint,\n    .p-datatable .p-datatable-tbody > tr,\n    .p-treetable .p-treetable-tbody > tr,\n    div.p-menu-item-content,\n    div.p-tieredmenu-item-content,\n    div.p-contextmenu-item-content,\n    div.p-menubar-item-content,\n    div.p-megamenu-item-content,\n    div.p-panelmenu-header-content,\n    div.p-panelmenu-item-content,\n    th.p-datatable-header-cell,\n    th.p-treetable-header-cell,\n    thead.p-datatable-thead > tr > th,\n    .p-treetable thead.p-treetable-thead>tr>th {\n        transition: none;\n    }\n";

// node_modules/@primeuix/themes/dist/aura/datatable/index.mjs
var o18 = { transitionDuration: "{transition.duration}" };
var r18 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var e14 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{datatable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var d5 = { fontWeight: "600" };
var t8 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var l3 = { borderColor: "{datatable.border.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var c8 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var a8 = { fontWeight: "600" };
var n4 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var i8 = { color: "{primary.color}" };
var s5 = { width: "0.5rem" };
var g = { width: "1px", color: "{primary.color}" };
var u = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var b = { size: "2rem" };
var p2 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var m = { inlineGap: "0.5rem", overlaySelect: { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, overlayPopover: { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}", gap: "0.5rem" }, rule: { borderColor: "{content.border.color}" }, constraintList: { padding: "{list.padding}", gap: "{list.gap}" }, constraint: { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", separator: { borderColor: "{content.border.color}" }, padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" } };
var h = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var k = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var f3 = { light: { root: { borderColor: "{content.border.color}" }, row: { stripedBackground: "{surface.50}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, row: { stripedBackground: "{surface.950}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var css = "\n    .p-datatable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n";
var v2 = { root: o18, header: r18, headerCell: e14, columnTitle: d5, row: t8, bodyCell: l3, footerCell: c8, columnFooter: a8, footer: n4, dropPoint: i8, columnResizer: s5, resizeIndicator: g, sortIcon: u, loadingIcon: b, rowToggleButton: p2, filter: m, paginatorTop: h, paginatorBottom: k, colorScheme: f3, css };

// node_modules/@primeuix/themes/dist/aura/dataview/index.mjs
var o19 = { borderColor: "transparent", borderWidth: "0", borderRadius: "0", padding: "0" };
var r19 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", borderRadius: "0" };
var d6 = { background: "{content.background}", color: "{content.color}", borderColor: "transparent", borderWidth: "0", padding: "0", borderRadius: "0" };
var e15 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "1px 0 0 0", padding: "0.75rem 1rem", borderRadius: "0" };
var t9 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var n5 = { borderColor: "{content.border.color}", borderWidth: "1px 0 0 0" };
var c9 = { root: o19, header: r19, content: d6, footer: e15, paginatorTop: t9, paginatorBottom: n5 };

// node_modules/@primeuix/themes/dist/aura/datepicker/index.mjs
var o20 = { transitionDuration: "{transition.duration}" };
var r20 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}" };
var e16 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", padding: "0 0 0.5rem 0" };
var c10 = { gap: "0.5rem", fontWeight: "500" };
var d7 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var n6 = { color: "{form.field.icon.color}" };
var t10 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" };
var a9 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" };
var i9 = { borderColor: "{content.border.color}", gap: "{overlay.popover.padding}" };
var l4 = { margin: "0.5rem 0 0 0" };
var u2 = { padding: "0.25rem", fontWeight: "500", color: "{content.color}" };
var s6 = { hoverBackground: "{content.hover.background}", selectedBackground: "{primary.color}", rangeSelectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{primary.contrast.color}", rangeSelectedColor: "{highlight.color}", width: "2rem", height: "2rem", borderRadius: "50%", padding: "0.25rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var g2 = { margin: "0.5rem 0 0 0" };
var f4 = { padding: "0.375rem", borderRadius: "{content.border.radius}" };
var h2 = { margin: "0.5rem 0 0 0" };
var b2 = { padding: "0.375rem", borderRadius: "{content.border.radius}" };
var m2 = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}" };
var p3 = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}", gap: "0.5rem", buttonGap: "0.25rem" };
var v3 = { light: { dropdown: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" }, today: { background: "{surface.200}", color: "{surface.900}" } }, dark: { dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" }, today: { background: "{surface.700}", color: "{surface.0}" } } };
var k2 = { root: o20, panel: r20, header: e16, title: c10, dropdown: d7, inputIcon: n6, selectMonth: t10, selectYear: a9, group: i9, dayView: l4, weekDay: u2, date: s6, monthView: g2, month: f4, yearView: h2, year: b2, buttonbar: m2, timePicker: p3, colorScheme: v3 };

// node_modules/@primeuix/themes/dist/aura/dialog/index.mjs
var o21 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", borderRadius: "{overlay.modal.border.radius}", shadow: "{overlay.modal.shadow}" };
var a10 = { padding: "{overlay.modal.padding}", gap: "0.5rem" };
var d8 = { fontSize: "1.25rem", fontWeight: "600" };
var r21 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l5 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}", gap: "0.5rem" };
var e17 = { root: o21, header: a10, title: d8, content: r21, footer: l5 };

// node_modules/@primeuix/themes/dist/aura/divider/index.mjs
var r22 = { borderColor: "{content.border.color}" };
var o22 = { background: "{content.background}", color: "{text.color}" };
var n7 = { margin: "1rem 0", padding: "0 1rem", content: { padding: "0 0.5rem" } };
var e18 = { margin: "0 1rem", padding: "0.5rem 0", content: { padding: "0.5rem 0" } };
var t11 = { root: r22, content: o22, horizontal: n7, vertical: e18 };

// node_modules/@primeuix/themes/dist/aura/dock/index.mjs
var r23 = { background: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)", padding: "0.5rem", borderRadius: "{border.radius.xl}" };
var o23 = { borderRadius: "{content.border.radius}", padding: "0.5rem", size: "3rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var d9 = { root: r23, item: o23 };

// node_modules/@primeuix/themes/dist/aura/drawer/index.mjs
var o24 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", shadow: "{overlay.modal.shadow}" };
var a11 = { padding: "{overlay.modal.padding}" };
var d10 = { fontSize: "1.5rem", fontWeight: "600" };
var r24 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l6 = { padding: "{overlay.modal.padding}" };
var e19 = { root: o24, header: a11, title: d10, content: r24, footer: l6 };

// node_modules/@primeuix/themes/dist/aura/editor/index.mjs
var o25 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}" };
var r25 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var e20 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}", padding: "{list.padding}" };
var t12 = { focusBackground: "{list.option.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var d11 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var l7 = { toolbar: o25, toolbarItem: r25, overlay: e20, overlayOption: t12, content: d11 };

// node_modules/@primeuix/themes/dist/aura/fieldset/index.mjs
var o26 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", padding: "0 1.125rem 1.125rem 1.125rem", transitionDuration: "{transition.duration}" };
var r26 = { background: "{content.background}", hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", borderRadius: "{content.border.radius}", borderWidth: "1px", borderColor: "transparent", padding: "0.5rem 0.75rem", gap: "0.5rem", fontWeight: "600", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t13 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}" };
var n8 = { padding: "0" };
var e21 = { root: o26, legend: r26, toggleIcon: t13, content: n8 };

// node_modules/@primeuix/themes/dist/aura/fileupload/index.mjs
var r27 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var o27 = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderColor: "unset", borderWidth: "0", borderRadius: "0", gap: "0.5rem" };
var e22 = { highlightBorderColor: "{primary.color}", padding: "0 1.125rem 1.125rem 1.125rem", gap: "1rem" };
var t14 = { padding: "1rem", gap: "1rem", borderColor: "{content.border.color}", info: { gap: "0.5rem" } };
var a12 = { gap: "0.5rem" };
var n9 = { height: "0.25rem" };
var d12 = { gap: "0.5rem" };
var i10 = { root: r27, header: o27, content: e22, file: t14, fileList: a12, progressbar: n9, basic: d12 };

// node_modules/@primeuix/themes/dist/aura/floatlabel/index.mjs
var o28 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", activeColor: "{form.field.float.label.active.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", positionY: "{form.field.padding.y}", fontWeight: "500", active: { fontSize: "0.75rem", fontWeight: "400" } };
var i11 = { active: { top: "-1.25rem" } };
var r28 = { input: { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" }, active: { top: "{form.field.padding.y}" } };
var a13 = { borderRadius: "{border.radius.xs}", active: { background: "{form.field.background}", padding: "0 0.125rem" } };
var d13 = { root: o28, over: i11, in: r28, on: a13 };

// node_modules/@primeuix/themes/dist/aura/galleria/index.mjs
var o29 = { borderWidth: "1px", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var r29 = { background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.100}", hoverColor: "{surface.0}", size: "3rem", gutter: "0.5rem", prev: { borderRadius: "50%" }, next: { borderRadius: "50%" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e23 = { size: "1.5rem" };
var t15 = { background: "{content.background}", padding: "1rem 0.25rem" };
var c11 = { size: "2rem", borderRadius: "{content.border.radius}", gutter: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var n10 = { size: "1rem" };
var a14 = { background: "rgba(0, 0, 0, 0.5)", color: "{surface.100}", padding: "1rem" };
var s7 = { gap: "0.5rem", padding: "1rem" };
var u3 = { width: "1rem", height: "1rem", activeBackground: "{primary.color}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i12 = { background: "rgba(0, 0, 0, 0.5)" };
var d14 = { background: "rgba(255, 255, 255, 0.4)", hoverBackground: "rgba(255, 255, 255, 0.6)", activeBackground: "rgba(255, 255, 255, 0.9)" };
var g3 = { size: "3rem", gutter: "0.5rem", background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.50}", hoverColor: "{surface.0}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var f5 = { size: "1.5rem" };
var h3 = { light: { thumbnailNavButton: { hoverBackground: "{surface.100}", color: "{surface.600}", hoverColor: "{surface.700}" }, indicatorButton: { background: "{surface.200}", hoverBackground: "{surface.300}" } }, dark: { thumbnailNavButton: { hoverBackground: "{surface.700}", color: "{surface.400}", hoverColor: "{surface.0}" }, indicatorButton: { background: "{surface.700}", hoverBackground: "{surface.600}" } } };
var l8 = { root: o29, navButton: r29, navIcon: e23, thumbnailsContent: t15, thumbnailNavButton: c11, thumbnailNavButtonIcon: n10, caption: a14, indicatorList: s7, indicatorButton: u3, insetIndicatorList: i12, insetIndicatorButton: d14, closeButton: g3, closeButtonIcon: f5, colorScheme: h3 };

// node_modules/@primeuix/themes/dist/aura/iconfield/index.mjs
var o30 = { color: "{form.field.icon.color}" };
var r30 = { icon: o30 };

// node_modules/@primeuix/themes/dist/aura/iftalabel/index.mjs
var o31 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", top: "{form.field.padding.y}", fontSize: "0.75rem", fontWeight: "400" };
var l9 = { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" };
var i13 = { root: o31, input: l9 };

// node_modules/@primeuix/themes/dist/aura/image/index.mjs
var o32 = { transitionDuration: "{transition.duration}" };
var r31 = { icon: { size: "1.5rem" }, mask: { background: "{mask.background}", color: "{mask.color}" } };
var a15 = { position: { left: "auto", right: "1rem", top: "1rem", bottom: "auto" }, blur: "8px", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px", borderRadius: "30px", padding: ".5rem", gap: "0.5rem" };
var i14 = { hoverBackground: "rgba(255,255,255,0.1)", color: "{surface.50}", hoverColor: "{surface.0}", size: "3rem", iconSize: "1.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e24 = { root: o32, preview: r31, toolbar: a15, action: i14 };

// node_modules/@primeuix/themes/dist/aura/imagecompare/index.mjs
var o33 = { size: "15px", hoverSize: "30px", background: "rgba(255,255,255,0.3)", hoverBackground: "rgba(255,255,255,0.3)", borderColor: "unset", hoverBorderColor: "unset", borderWidth: "0", borderRadius: "50%", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "rgba(255,255,255,0.3)", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r32 = { handle: o33 };

// node_modules/@primeuix/themes/dist/aura/inlinemessage/index.mjs
var r33 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", gap: "0.5rem" };
var o34 = { fontWeight: "500" };
var e25 = { size: "1rem" };
var n11 = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)" }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)" }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)" }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)" }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)" }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)" } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)" }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)" }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)" }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)" }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)" }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)" } } };
var a16 = { root: r33, text: o34, icon: e25, colorScheme: n11 };

// node_modules/@primeuix/themes/dist/aura/inplace/index.mjs
var o35 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{transition.duration}" };
var r34 = { hoverBackground: "{content.hover.background}", hoverColor: "{content.hover.color}" };
var n12 = { root: o35, display: r34 };

// node_modules/@primeuix/themes/dist/aura/inputchips/index.mjs
var o36 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r35 = { borderRadius: "{border.radius.sm}" };
var d15 = { light: { chip: { focusBackground: "{surface.200}", color: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", color: "{surface.0}" } } };
var f6 = { root: o36, chip: r35, colorScheme: d15 };

// node_modules/@primeuix/themes/dist/aura/inputgroup/index.mjs
var r36 = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.icon.color}", borderRadius: "{form.field.border.radius}", padding: "0.5rem", minWidth: "2.5rem" };
var o37 = { addon: r36 };

// node_modules/@primeuix/themes/dist/aura/inputnumber/index.mjs
var r37 = { transitionDuration: "{transition.duration}" };
var o38 = { width: "2.5rem", borderRadius: "{form.field.border.radius}", verticalPadding: "{form.field.padding.y}" };
var e26 = { light: { button: { background: "transparent", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.400}", hoverColor: "{surface.500}", activeColor: "{surface.600}" } }, dark: { button: { background: "transparent", hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.400}", hoverColor: "{surface.300}", activeColor: "{surface.200}" } } };
var a17 = { root: r37, button: o38, colorScheme: e26 };

// node_modules/@primeuix/themes/dist/aura/inputotp/index.mjs
var r38 = { gap: "0.5rem" };
var t16 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" } };
var e27 = { root: r38, input: t16 };

// node_modules/@primeuix/themes/dist/aura/inputtext/index.mjs
var o39 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d16 = { root: o39 };

// node_modules/@primeuix/themes/dist/aura/knob/index.mjs
var o40 = { transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r39 = { background: "{primary.color}" };
var t17 = { background: "{content.border.color}" };
var n13 = { color: "{text.muted.color}" };
var c12 = { root: o40, value: r39, range: t17, text: n13 };

// node_modules/@primeuix/themes/dist/aura/listbox/index.mjs
var o41 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", borderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", shadow: "{form.field.shadow}", borderRadius: "{form.field.border.radius}", transitionDuration: "{form.field.transition.duration}" };
var r40 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var d17 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var i15 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var t18 = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" };
var e28 = { padding: "{list.option.padding}" };
var l10 = { light: { option: { stripedBackground: "{surface.50}" } }, dark: { option: { stripedBackground: "{surface.900}" } } };
var n14 = { root: o41, list: r40, option: d17, optionGroup: i15, checkmark: t18, emptyMessage: e28, colorScheme: l10 };

// node_modules/@primeuix/themes/dist/aura/megamenu/index.mjs
var o42 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", verticalOrientation: { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, horizontalOrientation: { padding: "0.5rem 0.75rem", gap: "0.5rem" }, transitionDuration: "{transition.duration}" };
var n15 = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" };
var i16 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a18 = { padding: "0", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", shadow: "{overlay.navigation.shadow}", gap: "0.5rem" };
var r41 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var t19 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var e29 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var c13 = { borderColor: "{content.border.color}" };
var d18 = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var g4 = { root: o42, baseItem: n15, item: i16, overlay: a18, submenu: r41, submenuLabel: t19, submenuIcon: e29, separator: c13, mobileButton: d18 };

// node_modules/@primeuix/themes/dist/aura/menu/index.mjs
var o43 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var n16 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var a19 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i17 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var t20 = { borderColor: "{content.border.color}" };
var r42 = { root: o43, list: n16, item: a19, submenuLabel: i17, separator: t20 };

// node_modules/@primeuix/themes/dist/aura/menubar/index.mjs
var o44 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.5rem 0.75rem", transitionDuration: "{transition.duration}" };
var i18 = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" };
var n17 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var r43 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", mobileIndent: "1rem", icon: { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" } };
var a20 = { borderColor: "{content.border.color}" };
var t21 = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e30 = { root: o44, baseItem: i18, item: n17, submenu: r43, separator: a20, mobileButton: t21 };

// node_modules/@primeuix/themes/dist/aura/message/index.mjs
var o45 = { borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" };
var r44 = { padding: "0.5rem 0.75rem", gap: "0.5rem", sm: { padding: "0.375rem 0.625rem" }, lg: { padding: "0.625rem 0.875rem" } };
var e31 = { fontSize: "1rem", fontWeight: "500", sm: { fontSize: "0.875rem" }, lg: { fontSize: "1.125rem" } };
var n18 = { size: "1.125rem", sm: { size: "1rem" }, lg: { size: "1.25rem" } };
var l11 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var s8 = { size: "1rem", sm: { size: "0.875rem" }, lg: { size: "1.125rem" } };
var c14 = { root: { borderWidth: "1px" } };
var a21 = { content: { padding: "0" } };
var d19 = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{blue.600}", shadow: "none" } }, outlined: { color: "{blue.600}", borderColor: "{blue.600}" }, simple: { color: "{blue.600}" } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{green.600}", shadow: "none" } }, outlined: { color: "{green.600}", borderColor: "{green.600}" }, simple: { color: "{green.600}" } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{yellow.600}", shadow: "none" } }, outlined: { color: "{yellow.600}", borderColor: "{yellow.600}" }, simple: { color: "{yellow.600}" } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{red.600}", shadow: "none" } }, outlined: { color: "{red.600}", borderColor: "{red.600}" }, simple: { color: "{red.600}" } }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.600}", shadow: "none" } }, outlined: { color: "{surface.500}", borderColor: "{surface.500}" }, simple: { color: "{surface.500}" } }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{surface.50}", shadow: "none" } }, outlined: { color: "{surface.950}", borderColor: "{surface.950}" }, simple: { color: "{surface.950}" } } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{blue.500}", shadow: "none" } }, outlined: { color: "{blue.500}", borderColor: "{blue.500}" }, simple: { color: "{blue.500}" } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{green.500}", shadow: "none" } }, outlined: { color: "{green.500}", borderColor: "{green.500}" }, simple: { color: "{green.500}" } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{yellow.500}", shadow: "none" } }, outlined: { color: "{yellow.500}", borderColor: "{yellow.500}" }, simple: { color: "{yellow.500}" } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{red.500}", shadow: "none" } }, outlined: { color: "{red.500}", borderColor: "{red.500}" }, simple: { color: "{red.500}" } }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.300}", shadow: "none" } }, outlined: { color: "{surface.400}", borderColor: "{surface.400}" }, simple: { color: "{surface.400}" } }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{surface.950}", shadow: "none" } }, outlined: { color: "{surface.0}", borderColor: "{surface.0}" }, simple: { color: "{surface.0}" } } } };
var u4 = { root: o45, content: r44, text: e31, icon: n18, closeButton: l11, closeIcon: s8, outlined: c14, simple: a21, colorScheme: d19 };

// node_modules/@primeuix/themes/dist/aura/metergroup/index.mjs
var e32 = { borderRadius: "{content.border.radius}", gap: "1rem" };
var r45 = { background: "{content.border.color}", size: "0.5rem" };
var a22 = { gap: "0.5rem" };
var o46 = { size: "0.5rem" };
var l12 = { size: "1rem" };
var t22 = { verticalGap: "0.5rem", horizontalGap: "1rem" };
var b3 = { root: e32, meters: r45, label: a22, labelMarker: o46, labelIcon: l12, labelList: t22 };

// node_modules/@primeuix/themes/dist/aura/multiselect/index.mjs
var o47 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d20 = { width: "2.5rem", color: "{form.field.icon.color}" };
var r46 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l13 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i19 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", gap: "0.5rem" };
var e33 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f7 = { color: "{form.field.icon.color}" };
var a23 = { borderRadius: "{border.radius.sm}" };
var c15 = { padding: "{list.option.padding}" };
var n19 = { root: o47, dropdown: d20, overlay: r46, list: l13, option: i19, optionGroup: e33, chip: a23, clearIcon: f7, emptyMessage: c15 };

// node_modules/@primeuix/themes/dist/aura/orderlist/index.mjs
var r47 = { gap: "1.125rem" };
var a24 = { gap: "0.5rem" };
var o48 = { root: r47, controls: a24 };

// node_modules/@primeuix/themes/dist/aura/organizationchart/index.mjs
var o49 = { gutter: "0.75rem", transitionDuration: "{transition.duration}" };
var r48 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{content.border.color}", color: "{content.color}", selectedColor: "{highlight.color}", hoverColor: "{content.hover.color}", padding: "0.75rem 1rem", toggleablePadding: "0.75rem 1rem 1.25rem 1rem", borderRadius: "{content.border.radius}" };
var e34 = { background: "{content.background}", hoverBackground: "{content.hover.background}", borderColor: "{content.border.color}", color: "{text.muted.color}", hoverColor: "{text.color}", size: "1.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t23 = { color: "{content.border.color}", borderRadius: "{content.border.radius}", height: "24px" };
var n20 = { root: o49, node: r48, nodeToggleButton: e34, connector: t23 };

// node_modules/@primeuix/themes/dist/aura/overlaybadge/index.mjs
var o50 = { outline: { width: "2px", color: "{content.background}" } };
var t24 = { root: o50 };

// node_modules/@primeuix/themes/dist/aura/paginator/index.mjs
var o51 = { padding: "0.5rem 1rem", gap: "0.25rem", borderRadius: "{content.border.radius}", background: "{content.background}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r49 = { background: "transparent", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}", width: "2.5rem", height: "2.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t25 = { color: "{text.muted.color}" };
var e35 = { maxWidth: "2.5rem" };
var n21 = { root: o51, navButton: r49, currentPageReport: t25, jumpToPageInput: e35 };

// node_modules/@primeuix/themes/dist/aura/panel/index.mjs
var r50 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var o52 = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderColor: "{content.border.color}", borderWidth: "0", borderRadius: "0" };
var e36 = { padding: "0.375rem 1.125rem" };
var d21 = { fontWeight: "600" };
var t26 = { padding: "0 1.125rem 1.125rem 1.125rem" };
var n22 = { padding: "0 1.125rem 1.125rem 1.125rem" };
var a25 = { root: r50, header: o52, toggleableHeader: e36, title: d21, content: t26, footer: n22 };

// node_modules/@primeuix/themes/dist/aura/panelmenu/index.mjs
var o53 = { gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r51 = { background: "{content.background}", borderColor: "{content.border.color}", borderWidth: "1px", color: "{content.color}", padding: "0.25rem 0.25rem", borderRadius: "{content.border.radius}", first: { borderWidth: "1px", topBorderRadius: "{content.border.radius}" }, last: { borderWidth: "1px", bottomBorderRadius: "{content.border.radius}" } };
var n23 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", gap: "0.5rem", padding: "{navigation.item.padding}", borderRadius: "{content.border.radius}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i20 = { indent: "1rem" };
var t27 = { color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}" };
var a26 = { root: o53, panel: r51, item: n23, submenu: i20, submenuIcon: t27 };

// node_modules/@primeuix/themes/dist/aura/password/index.mjs
var r52 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: ".75rem" };
var o54 = { color: "{form.field.icon.color}" };
var e37 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", padding: "{overlay.popover.padding}", shadow: "{overlay.popover.shadow}" };
var a27 = { gap: "0.5rem" };
var d22 = { light: { strength: { weakBackground: "{red.500}", mediumBackground: "{amber.500}", strongBackground: "{green.500}" } }, dark: { strength: { weakBackground: "{red.400}", mediumBackground: "{amber.400}", strongBackground: "{green.400}" } } };
var n24 = { meter: r52, icon: o54, overlay: e37, content: a27, colorScheme: d22 };

// node_modules/@primeuix/themes/dist/aura/picklist/index.mjs
var r53 = { gap: "1.125rem" };
var a28 = { gap: "0.5rem" };
var o55 = { root: r53, controls: a28 };

// node_modules/@primeuix/themes/dist/aura/popover/index.mjs
var o56 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r54 = { padding: "{overlay.popover.padding}" };
var e38 = { root: o56, content: r54 };

// node_modules/@primeuix/themes/dist/aura/progressbar/index.mjs
var r55 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: "1.25rem" };
var o57 = { background: "{primary.color}" };
var e39 = { color: "{primary.contrast.color}", fontSize: "0.75rem", fontWeight: "600" };
var t28 = { root: r55, value: o57, label: e39 };

// node_modules/@primeuix/themes/dist/aura/progressspinner/index.mjs
var o58 = { light: { root: { colorOne: "{red.500}", colorTwo: "{blue.500}", colorThree: "{green.500}", colorFour: "{yellow.500}" } }, dark: { root: { colorOne: "{red.400}", colorTwo: "{blue.400}", colorThree: "{green.400}", colorFour: "{yellow.400}" } } };
var r56 = { colorScheme: o58 };

// node_modules/@primeuix/themes/dist/aura/radiobutton/index.mjs
var o59 = { width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } };
var r57 = { size: "0.75rem", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.5rem" }, lg: { size: "1rem" } };
var e40 = { root: o59, icon: r57 };

// node_modules/@primeuix/themes/dist/aura/rating/index.mjs
var o60 = { gap: "0.25rem", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r58 = { size: "1rem", color: "{text.muted.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" };
var i21 = { root: o60, icon: r58 };

// node_modules/@primeuix/themes/dist/aura/ripple/index.mjs
var r59 = { light: { root: { background: "rgba(0,0,0,0.1)" } }, dark: { root: { background: "rgba(255,255,255,0.3)" } } };
var o61 = { colorScheme: r59 };

// node_modules/@primeuix/themes/dist/aura/scrollpanel/index.mjs
var r60 = { transitionDuration: "{transition.duration}" };
var o62 = { size: "9px", borderRadius: "{border.radius.sm}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var s9 = { light: { bar: { background: "{surface.100}" } }, dark: { bar: { background: "{surface.800}" } } };
var a29 = { root: r60, bar: o62, colorScheme: s9 };

// node_modules/@primeuix/themes/dist/aura/select/index.mjs
var o63 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r61 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d23 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l14 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i22 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var e41 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f8 = { color: "{form.field.icon.color}" };
var c16 = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" };
var a30 = { padding: "{list.option.padding}" };
var n25 = { root: o63, dropdown: r61, overlay: d23, list: l14, option: i22, optionGroup: e41, clearIcon: f8, checkmark: c16, emptyMessage: a30 };

// node_modules/@primeuix/themes/dist/aura/selectbutton/index.mjs
var r62 = { borderRadius: "{form.field.border.radius}" };
var o64 = { light: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } }, dark: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } } };
var d24 = { root: r62, colorScheme: o64 };

// node_modules/@primeuix/themes/dist/aura/skeleton/index.mjs
var r63 = { borderRadius: "{content.border.radius}" };
var a31 = { light: { root: { background: "{surface.200}", animationBackground: "rgba(255,255,255,0.4)" } }, dark: { root: { background: "rgba(255, 255, 255, 0.06)", animationBackground: "rgba(255, 255, 255, 0.04)" } } };
var o65 = { root: r63, colorScheme: a31 };

// node_modules/@primeuix/themes/dist/aura/slider/index.mjs
var o66 = { transitionDuration: "{transition.duration}" };
var r64 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", size: "3px" };
var n26 = { background: "{primary.color}" };
var t29 = { width: "20px", height: "20px", borderRadius: "50%", background: "{content.border.color}", hoverBackground: "{content.border.color}", content: { borderRadius: "50%", hoverBackground: "{content.background}", width: "16px", height: "16px", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e42 = { light: { handle: { content: { background: "{surface.0}" } } }, dark: { handle: { content: { background: "{surface.950}" } } } };
var a32 = { root: o66, track: r64, range: n26, handle: t29, colorScheme: e42 };

// node_modules/@primeuix/themes/dist/aura/speeddial/index.mjs
var t30 = { gap: "0.5rem", transitionDuration: "{transition.duration}" };
var a33 = { root: t30 };

// node_modules/@primeuix/themes/dist/aura/splitbutton/index.mjs
var r65 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" };
var d25 = { root: r65 };

// node_modules/@primeuix/themes/dist/aura/splitter/index.mjs
var o67 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r66 = { background: "{content.border.color}" };
var n27 = { size: "24px", background: "transparent", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t31 = { root: o67, gutter: r66, handle: n27 };

// node_modules/@primeuix/themes/dist/aura/stepper/index.mjs
var o68 = { transitionDuration: "{transition.duration}" };
var r67 = { background: "{content.border.color}", activeBackground: "{primary.color}", margin: "0 0 0 1.625rem", size: "2px" };
var e43 = { padding: "0.5rem", gap: "1rem" };
var t32 = { padding: "0", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var n28 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" };
var a34 = { background: "{content.background}", activeBackground: "{content.background}", borderColor: "{content.border.color}", activeBorderColor: "{content.border.color}", color: "{text.muted.color}", activeColor: "{primary.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" };
var c17 = { padding: "0.875rem 0.5rem 1.125rem 0.5rem" };
var d26 = { background: "{content.background}", color: "{content.color}", padding: "0", indent: "1rem" };
var i23 = { root: o68, separator: r67, step: e43, stepHeader: t32, stepTitle: n28, stepNumber: a34, steppanels: c17, steppanel: d26 };

// node_modules/@primeuix/themes/dist/aura/steps/index.mjs
var o69 = { transitionDuration: "{transition.duration}" };
var r68 = { background: "{content.border.color}" };
var t33 = { borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var e44 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" };
var n29 = { background: "{content.background}", activeBackground: "{content.background}", borderColor: "{content.border.color}", activeBorderColor: "{content.border.color}", color: "{text.muted.color}", activeColor: "{primary.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" };
var c18 = { root: o69, separator: r68, itemLink: t33, itemLabel: e44, itemNumber: n29 };

// node_modules/@primeuix/themes/dist/aura/tabmenu/index.mjs
var o70 = { transitionDuration: "{transition.duration}" };
var r69 = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" };
var t34 = { background: "transparent", hoverBackground: "transparent", activeBackground: "transparent", borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", hoverBorderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.125rem", fontWeight: "600", margin: "0 0 -1px 0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e45 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var c19 = { height: "1px", bottom: "-1px", background: "{primary.color}" };
var n30 = { root: o70, tablist: r69, item: t34, itemIcon: e45, activeBar: c19 };

// node_modules/@primeuix/themes/dist/aura/tabs/index.mjs
var o71 = { transitionDuration: "{transition.duration}" };
var r70 = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" };
var t35 = { background: "transparent", hoverBackground: "transparent", activeBackground: "transparent", borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", hoverBorderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.125rem", fontWeight: "600", margin: "0 0 -1px 0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var n31 = { background: "{content.background}", color: "{content.color}", padding: "0.875rem 1.125rem 1.125rem 1.125rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var c20 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", width: "2.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var e46 = { height: "1px", bottom: "-1px", background: "{primary.color}" };
var a35 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } };
var i24 = { root: o71, tablist: r70, tab: t35, tabpanel: n31, navButton: c20, activeBar: e46, colorScheme: a35 };

// node_modules/@primeuix/themes/dist/aura/tabview/index.mjs
var o72 = { transitionDuration: "{transition.duration}" };
var r71 = { background: "{content.background}", borderColor: "{content.border.color}" };
var t36 = { borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var n32 = { background: "{content.background}", color: "{content.color}" };
var a36 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}" };
var c21 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } };
var e47 = { root: o72, tabList: r71, tab: t36, tabPanel: n32, navButton: a36, colorScheme: c21 };

// node_modules/@primeuix/themes/dist/aura/tag/index.mjs
var r72 = { fontSize: "0.875rem", fontWeight: "700", padding: "0.25rem 0.5rem", gap: "0.25rem", borderRadius: "{content.border.radius}", roundedBorderRadius: "{border.radius.xl}" };
var o73 = { size: "0.75rem" };
var a37 = { light: { primary: { background: "{primary.100}", color: "{primary.700}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.100}", color: "{green.700}" }, info: { background: "{sky.100}", color: "{sky.700}" }, warn: { background: "{orange.100}", color: "{orange.700}" }, danger: { background: "{red.100}", color: "{red.700}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "color-mix(in srgb, {primary.500}, transparent 84%)", color: "{primary.300}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", color: "{green.300}" }, info: { background: "color-mix(in srgb, {sky.500}, transparent 84%)", color: "{sky.300}" }, warn: { background: "color-mix(in srgb, {orange.500}, transparent 84%)", color: "{orange.300}" }, danger: { background: "color-mix(in srgb, {red.500}, transparent 84%)", color: "{red.300}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var n33 = { root: r72, icon: o73, colorScheme: a37 };

// node_modules/@primeuix/themes/dist/aura/terminal/index.mjs
var r73 = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", height: "18rem", padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{form.field.border.radius}" };
var o74 = { gap: "0.25rem" };
var d27 = { margin: "2px 0" };
var e48 = { root: r73, prompt: o74, commandResponse: d27 };

// node_modules/@primeuix/themes/dist/aura/textarea/index.mjs
var o75 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d28 = { root: o75 };

// node_modules/@primeuix/themes/dist/aura/tieredmenu/index.mjs
var o76 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i25 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n34 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a38 = { mobileIndent: "1rem" };
var t37 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r74 = { borderColor: "{content.border.color}" };
var c22 = { root: o76, list: i25, item: n34, submenu: a38, submenuIcon: t37, separator: r74 };

// node_modules/@primeuix/themes/dist/aura/timeline/index.mjs
var e49 = { minHeight: "5rem" };
var r75 = { eventContent: { padding: "1rem 0" } };
var o77 = { eventContent: { padding: "0 1rem" } };
var n35 = { size: "1.125rem", borderRadius: "50%", borderWidth: "2px", background: "{content.background}", borderColor: "{content.border.color}", content: { borderRadius: "50%", size: "0.375rem", background: "{primary.color}", insetShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)" } };
var t38 = { color: "{content.border.color}", size: "2px" };
var d29 = { event: e49, horizontal: r75, vertical: o77, eventMarker: n35, eventConnector: t38 };

// node_modules/@primeuix/themes/dist/aura/toast/index.mjs
var o78 = { width: "25rem", borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" };
var r76 = { size: "1.125rem" };
var e50 = { padding: "{overlay.popover.padding}", gap: "0.5rem" };
var n36 = { gap: "0.5rem" };
var a39 = { fontWeight: "500", fontSize: "1rem" };
var s10 = { fontWeight: "500", fontSize: "0.875rem" };
var c23 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var l15 = { size: "1rem" };
var t39 = { light: { root: { blur: "1.5px" }, info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.200}", color: "{blue.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{blue.600}", shadow: "none" } } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.200}", color: "{green.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{green.600}", shadow: "none" } } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.200}", color: "{yellow.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{yellow.600}", shadow: "none" } } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.200}", color: "{red.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{red.600}", shadow: "none" } } }, secondary: { background: "{surface.100}", borderColor: "{surface.200}", color: "{surface.600}", detailColor: "{surface.700}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.600}", shadow: "none" } } }, contrast: { background: "{surface.900}", borderColor: "{surface.950}", color: "{surface.50}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{surface.50}", shadow: "none" } } } }, dark: { root: { blur: "10px" }, info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{blue.500}", shadow: "none" } } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{green.500}", shadow: "none" } } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{yellow.500}", shadow: "none" } } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{red.500}", shadow: "none" } } }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.300}", shadow: "none" } } }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", detailColor: "{surface.950}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{surface.950}", shadow: "none" } } } } };
var u5 = { root: o78, icon: r76, content: e50, text: n36, summary: a39, detail: s10, closeButton: c23, closeIcon: l15, colorScheme: t39 };

// node_modules/@primeuix/themes/dist/aura/togglebutton/index.mjs
var r77 = { padding: "0.25rem", borderRadius: "{content.border.radius}", gap: "0.5rem", fontWeight: "500", disabledBackground: "{form.field.disabled.background}", disabledBorderColor: "{form.field.disabled.background}", disabledColor: "{form.field.disabled.color}", invalidBorderColor: "{form.field.invalid.border.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", padding: "0.25rem" }, lg: { fontSize: "{form.field.lg.font.size}", padding: "0.25rem" } };
var o79 = { disabledColor: "{form.field.disabled.color}" };
var e51 = { padding: "0.25rem 0.75rem", borderRadius: "{content.border.radius}", checkedShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)", sm: { padding: "0.25rem 0.75rem" }, lg: { padding: "0.25rem 0.75rem" } };
var d30 = { light: { root: { background: "{surface.100}", checkedBackground: "{surface.100}", hoverBackground: "{surface.100}", borderColor: "{surface.100}", color: "{surface.500}", hoverColor: "{surface.700}", checkedColor: "{surface.900}", checkedBorderColor: "{surface.100}" }, content: { checkedBackground: "{surface.0}" }, icon: { color: "{surface.500}", hoverColor: "{surface.700}", checkedColor: "{surface.900}" } }, dark: { root: { background: "{surface.950}", checkedBackground: "{surface.950}", hoverBackground: "{surface.950}", borderColor: "{surface.950}", color: "{surface.400}", hoverColor: "{surface.300}", checkedColor: "{surface.0}", checkedBorderColor: "{surface.950}" }, content: { checkedBackground: "{surface.800}" }, icon: { color: "{surface.400}", hoverColor: "{surface.300}", checkedColor: "{surface.0}" } } };
var c24 = { root: r77, icon: o79, content: e51, colorScheme: d30 };

// node_modules/@primeuix/themes/dist/aura/toggleswitch/index.mjs
var r78 = { width: "2.5rem", height: "1.5rem", borderRadius: "30px", gap: "0.25rem", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, borderWidth: "1px", borderColor: "transparent", hoverBorderColor: "transparent", checkedBorderColor: "transparent", checkedHoverBorderColor: "transparent", invalidBorderColor: "{form.field.invalid.border.color}", transitionDuration: "{form.field.transition.duration}", slideDuration: "0.2s" };
var o80 = { borderRadius: "50%", size: "1rem" };
var e52 = { light: { root: { background: "{surface.300}", disabledBackground: "{form.field.disabled.background}", hoverBackground: "{surface.400}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.0}", disabledBackground: "{form.field.disabled.color}", hoverBackground: "{surface.0}", checkedBackground: "{surface.0}", checkedHoverBackground: "{surface.0}", color: "{text.muted.color}", hoverColor: "{text.color}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } }, dark: { root: { background: "{surface.700}", disabledBackground: "{surface.600}", hoverBackground: "{surface.600}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.400}", disabledBackground: "{surface.900}", hoverBackground: "{surface.300}", checkedBackground: "{surface.900}", checkedHoverBackground: "{surface.900}", color: "{surface.900}", hoverColor: "{surface.800}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } } };
var c25 = { root: r78, handle: o80, colorScheme: e52 };

// node_modules/@primeuix/themes/dist/aura/toolbar/index.mjs
var o81 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.75rem" };
var r79 = { root: o81 };

// node_modules/@primeuix/themes/dist/aura/tooltip/index.mjs
var r80 = { maxWidth: "12.5rem", gutter: "0.25rem", shadow: "{overlay.popover.shadow}", padding: "0.5rem 0.75rem", borderRadius: "{overlay.popover.border.radius}" };
var o82 = { light: { root: { background: "{surface.700}", color: "{surface.0}" } }, dark: { root: { background: "{surface.700}", color: "{surface.0}" } } };
var e53 = { root: r80, colorScheme: o82 };

// node_modules/@primeuix/themes/dist/aura/tree/index.mjs
var o83 = { background: "{content.background}", color: "{content.color}", padding: "1rem", gap: "2px", indent: "1rem", transitionDuration: "{transition.duration}" };
var r81 = { padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.color}", hoverColor: "{text.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, gap: "0.25rem" };
var e54 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}" };
var t40 = { borderRadius: "50%", size: "1.75rem", hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedHoverColor: "{primary.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var n37 = { size: "2rem" };
var c26 = { margin: "0 0 0.5rem 0" };
var css2 = "\n    .p-tree-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n";
var d31 = { root: o83, node: r81, nodeIcon: e54, nodeToggleButton: t40, loadingIcon: n37, filter: c26, css: css2 };

// node_modules/@primeuix/themes/dist/aura/treeselect/index.mjs
var o84 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r82 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d32 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l16 = { padding: "{list.padding}" };
var e55 = { padding: "{list.option.padding}" };
var i26 = { borderRadius: "{border.radius.sm}" };
var f9 = { color: "{form.field.icon.color}" };
var a40 = { root: o84, dropdown: r82, overlay: d32, tree: l16, emptyMessage: e55, chip: i26, clearIcon: f9 };

// node_modules/@primeuix/themes/dist/aura/treetable/index.mjs
var o85 = { transitionDuration: "{transition.duration}" };
var r83 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" };
var e56 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{treetable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var t41 = { fontWeight: "600" };
var c27 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var n38 = { borderColor: "{treetable.border.color}", padding: "0.75rem 1rem", gap: "0.5rem" };
var l17 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", padding: "0.75rem 1rem" };
var d33 = { fontWeight: "600" };
var a41 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" };
var i27 = { width: "0.5rem" };
var g5 = { width: "1px", color: "{primary.color}" };
var s11 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var u6 = { size: "2rem" };
var b4 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var h4 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var m3 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var f10 = { light: { root: { borderColor: "{content.border.color}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var css3 = "\n    .p-treetable-mask.p-overlay-mask {\n        --px-mask-background: light-dark(rgba(255,255,255,0.5),rgba(0,0,0,0.3));\n    }\n";
var k3 = { root: o85, header: r83, headerCell: e56, columnTitle: t41, row: c27, bodyCell: n38, footerCell: l17, columnFooter: d33, footer: a41, columnResizer: i27, resizeIndicator: g5, sortIcon: s11, loadingIcon: u6, nodeToggleButton: b4, paginatorTop: h4, paginatorBottom: m3, colorScheme: f10, css: css3 };

// node_modules/@primeuix/themes/dist/aura/virtualscroller/index.mjs
var o86 = { mask: { background: "{content.background}", color: "{text.muted.color}" }, icon: { size: "2rem" } };
var e57 = { loader: o86 };

// node_modules/@primeuix/themes/dist/aura/index.mjs
var r84 = Object.defineProperty;
var e58 = Object.defineProperties;
var m4 = Object.getOwnPropertyDescriptors;
var i28 = Object.getOwnPropertySymbols;
var t42 = Object.prototype.hasOwnProperty;
var a42 = Object.prototype.propertyIsEnumerable;
var o87 = (e173, m14, i90) => m14 in e173 ? r84(e173, m14, { enumerable: true, configurable: true, writable: true, value: i90 }) : e173[m14] = i90;
var Nr;
var Qr = (Nr = ((r253, e173) => {
  for (var m14 in e173 || (e173 = {})) t42.call(e173, m14) && o87(r253, m14, e173[m14]);
  if (i28) for (var m14 of i28(e173)) a42.call(e173, m14) && o87(r253, m14, e173[m14]);
  return r253;
})({}, e5), e58(Nr, m4({ components: { accordion: c2, autocomplete: a, avatar: n, badge: d2, blockui: o6, breadcrumb: t3, button: e6, card: d3, carousel: t5, cascadeselect: f2, checkbox: e9, chip: s3, colorpicker: s4, confirmdialog: r15, confirmpopup: a6, contextmenu: c7, datatable: v2, dataview: c9, datepicker: k2, dialog: e17, divider: t11, dock: d9, drawer: e19, editor: l7, fieldset: e21, fileupload: i10, floatlabel: d13, galleria: l8, iconfield: r30, iftalabel: i13, image: e24, imagecompare: r32, inlinemessage: a16, inplace: n12, inputchips: f6, inputgroup: o37, inputnumber: a17, inputotp: e27, inputtext: d16, knob: c12, listbox: n14, megamenu: g4, menu: r42, menubar: e30, message: u4, metergroup: b3, multiselect: n19, orderlist: o48, organizationchart: n20, overlaybadge: t24, paginator: n21, panel: a25, panelmenu: a26, password: n24, picklist: o55, popover: e38, progressbar: t28, progressspinner: r56, radiobutton: e40, rating: i21, ripple: o61, scrollpanel: a29, select: n25, selectbutton: d24, skeleton: o65, slider: a32, speeddial: a33, splitbutton: d25, splitter: t31, stepper: i23, steps: c18, tabmenu: n30, tabs: i24, tabview: e47, tag: n33, terminal: e48, textarea: d28, tieredmenu: c22, timeline: d29, toast: u5, togglebutton: c24, toggleswitch: c25, toolbar: r79, tooltip: e53, tree: d31, treeselect: a40, treetable: k3, virtualscroller: e57 }, css: t7 })));

// node_modules/primeng/fesm2022/primeng-styleclass.mjs
var StyleClass = class _StyleClass {
  el;
  renderer;
  zone;
  constructor(el, renderer, zone) {
    this.el = el;
    this.renderer = renderer;
    this.zone = zone;
  }
  /**
   * Selector to define the target element. Available selectors are '@next', '@prev', '@parent' and '@grandparent'.
   * @group Props
   */
  selector;
  /**
   * Style class to add when item begins to get displayed.
   * @group Props
   */
  enterFromClass;
  /**
   * Style class to add during enter animation.
   * @group Props
   */
  enterActiveClass;
  /**
   * Style class to add when item begins to get displayed.
   * @group Props
   */
  enterToClass;
  /**
   * Style class to add when item begins to get hidden.
   * @group Props
   */
  leaveFromClass;
  /**
   * Style class to add during leave animation.
   * @group Props
   */
  leaveActiveClass;
  /**
   * Style class to add when leave animation is completed.
   * @group Props
   */
  leaveToClass;
  /**
   * Whether to trigger leave animation when outside of the element is clicked.
   * @group Props
   */
  hideOnOutsideClick;
  /**
   * Adds or removes a class when no enter-leave animation is required.
   * @group Props
   */
  toggleClass;
  /**
   * Whether to trigger leave animation when escape key pressed.
   * @group Props
   */
  hideOnEscape;
  /**
   * Whether to trigger leave animation when the target element resized.
   * @group Props
   */
  hideOnResize;
  /**
   * Target element to listen resize. Valid values are "window", "document" or target element selector.
   * @group Props
   */
  resizeSelector;
  eventListener;
  documentClickListener;
  documentKeydownListener;
  windowResizeListener;
  resizeObserver;
  target;
  enterListener;
  leaveListener;
  animating;
  _enterClass;
  _leaveClass;
  _resizeTarget;
  clickListener() {
    this.target ||= j(this.selector, this.el.nativeElement);
    if (this.toggleClass) {
      this.toggle();
    } else {
      if (this.target?.offsetParent === null) this.enter();
      else this.leave();
    }
  }
  toggle() {
    if (R(this.target, this.toggleClass)) P(this.target, this.toggleClass);
    else W(this.target, this.toggleClass);
  }
  enter() {
    if (this.enterActiveClass) {
      if (!this.animating) {
        this.animating = true;
        if (this.enterActiveClass.includes("slidedown")) {
          this.target.style.height = "0px";
          P(this.target, this.enterFromClass || "hidden");
          this.target.style.maxHeight = this.target.scrollHeight + "px";
          W(this.target, this.enterFromClass || "hidden");
          this.target.style.height = "";
        }
        W(this.target, this.enterActiveClass);
        if (this.enterFromClass) {
          P(this.target, this.enterFromClass);
        }
        this.enterListener = this.renderer.listen(this.target, "animationend", () => {
          P(this.target, this.enterActiveClass);
          if (this.enterToClass) {
            W(this.target, this.enterToClass);
          }
          this.enterListener && this.enterListener();
          if (this.enterActiveClass?.includes("slidedown")) {
            this.target.style.maxHeight = "";
          }
          this.animating = false;
        });
      }
    } else {
      if (this.enterFromClass) {
        P(this.target, this.enterFromClass);
      }
      if (this.enterToClass) {
        W(this.target, this.enterToClass);
      }
    }
    if (this.hideOnOutsideClick) {
      this.bindDocumentClickListener();
    }
    if (this.hideOnEscape) {
      this.bindDocumentKeydownListener();
    }
    if (this.hideOnResize) {
      this.bindResizeListener();
    }
  }
  leave() {
    if (this.leaveActiveClass) {
      if (!this.animating) {
        this.animating = true;
        W(this.target, this.leaveActiveClass);
        if (this.leaveFromClass) {
          P(this.target, this.leaveFromClass);
        }
        this.leaveListener = this.renderer.listen(this.target, "animationend", () => {
          P(this.target, this.leaveActiveClass);
          if (this.leaveToClass) {
            W(this.target, this.leaveToClass);
          }
          this.leaveListener && this.leaveListener();
          this.animating = false;
        });
      }
    } else {
      if (this.leaveFromClass) {
        P(this.target, this.leaveFromClass);
      }
      if (this.leaveToClass) {
        W(this.target, this.leaveToClass);
      }
    }
    if (this.hideOnOutsideClick) {
      this.unbindDocumentClickListener();
    }
    if (this.hideOnEscape) {
      this.unbindDocumentKeydownListener();
    }
    if (this.hideOnResize) {
      this.unbindResizeListener();
    }
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(this.el.nativeElement.ownerDocument, "click", (event) => {
        if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue("position") === "static") this.unbindDocumentClickListener();
        else if (this.isOutsideClick(event)) this.leave();
      });
    }
  }
  bindDocumentKeydownListener() {
    if (!this.documentKeydownListener) {
      this.zone.runOutsideAngular(() => {
        this.documentKeydownListener = this.renderer.listen(this.el.nativeElement.ownerDocument, "keydown", (event) => {
          const {
            key,
            keyCode,
            which,
            type
          } = event;
          if (!this.isVisible() || getComputedStyle(this.target).getPropertyValue("position") === "static") this.unbindDocumentKeydownListener();
          if (this.isVisible() && key === "Escape" && keyCode === 27 && which === 27) this.leave();
        });
      });
    }
  }
  isVisible() {
    return this.target.offsetParent !== null;
  }
  isOutsideClick(event) {
    return !this.el.nativeElement.isSameNode(event.target) && !this.el.nativeElement.contains(event.target) && !this.target.contains(event.target);
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  unbindDocumentKeydownListener() {
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
      this.documentKeydownListener = null;
    }
  }
  bindResizeListener() {
    this._resizeTarget = j(this.resizeSelector);
    if (c(this._resizeTarget)) {
      this.bindElementResizeListener();
    } else {
      this.bindWindowResizeListener();
    }
  }
  unbindResizeListener() {
    this.unbindWindowResizeListener();
    this.unbindElementResizeListener();
  }
  bindWindowResizeListener() {
    if (!this.windowResizeListener) {
      this.zone.runOutsideAngular(() => {
        this.windowResizeListener = this.renderer.listen(window, "resize", () => {
          if (!this.isVisible()) {
            this.unbindWindowResizeListener();
          } else {
            this.leave();
          }
        });
      });
    }
  }
  unbindWindowResizeListener() {
    if (this.windowResizeListener) {
      this.windowResizeListener();
      this.windowResizeListener = null;
    }
  }
  bindElementResizeListener() {
    if (!this.resizeObserver && this._resizeTarget) {
      let isFirstResize = true;
      this.resizeObserver = new ResizeObserver(() => {
        if (isFirstResize) {
          isFirstResize = false;
          return;
        }
        if (this.isVisible()) {
          this.leave();
        }
      });
      this.resizeObserver.observe(this._resizeTarget);
    }
  }
  unbindElementResizeListener() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = void 0;
    }
  }
  ngOnDestroy() {
    this.target = null;
    this._resizeTarget = null;
    if (this.eventListener) {
      this.eventListener();
    }
    this.unbindDocumentClickListener();
    this.unbindDocumentKeydownListener();
    this.unbindResizeListener();
  }
  static \u0275fac = function StyleClass_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StyleClass)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(NgZone));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _StyleClass,
    selectors: [["", "pStyleClass", ""]],
    hostBindings: function StyleClass_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function StyleClass_click_HostBindingHandler() {
          return ctx.clickListener();
        });
      }
    },
    inputs: {
      selector: [0, "pStyleClass", "selector"],
      enterFromClass: "enterFromClass",
      enterActiveClass: "enterActiveClass",
      enterToClass: "enterToClass",
      leaveFromClass: "leaveFromClass",
      leaveActiveClass: "leaveActiveClass",
      leaveToClass: "leaveToClass",
      hideOnOutsideClick: [2, "hideOnOutsideClick", "hideOnOutsideClick", booleanAttribute],
      toggleClass: "toggleClass",
      hideOnEscape: [2, "hideOnEscape", "hideOnEscape", booleanAttribute],
      hideOnResize: [2, "hideOnResize", "hideOnResize", booleanAttribute],
      resizeSelector: "resizeSelector"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleClass, [{
    type: Directive,
    args: [{
      selector: "[pStyleClass]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }], {
    selector: [{
      type: Input,
      args: ["pStyleClass"]
    }],
    enterFromClass: [{
      type: Input
    }],
    enterActiveClass: [{
      type: Input
    }],
    enterToClass: [{
      type: Input
    }],
    leaveFromClass: [{
      type: Input
    }],
    leaveActiveClass: [{
      type: Input
    }],
    leaveToClass: [{
      type: Input
    }],
    hideOnOutsideClick: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    toggleClass: [{
      type: Input
    }],
    hideOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideOnResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    resizeSelector: [{
      type: Input
    }],
    clickListener: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var StyleClassModule = class _StyleClassModule {
  static \u0275fac = function StyleClassModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StyleClassModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _StyleClassModule,
    imports: [StyleClass],
    exports: [StyleClass]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleClassModule, [{
    type: NgModule,
    args: [{
      imports: [StyleClass],
      exports: [StyleClass]
    }]
  }], null, null);
})();

// node_modules/@primeuix/themes/dist/index.mjs
var a43 = (...t122) => Ve(...t122);
var s12 = (t122) => Ae(t122);

// node_modules/@primeuix/themes/dist/lara/accordion/index.mjs
var o88 = { transitionDuration: "{transition.duration}" };
var r85 = { borderWidth: "0", borderColor: "{content.border.color}" };
var e59 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}", padding: "1.125rem", fontWeight: "700", borderRadius: "0", borderWidth: "0 1px 1px 1px", borderColor: "{content.border.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" }, toggleIcon: { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}" }, first: { topBorderRadius: "{content.border.radius}", borderWidth: "1px" }, last: { bottomBorderRadius: "{content.border.radius}", activeBottomBorderRadius: "0" } };
var t43 = { borderWidth: "0 1px 1px 1px", borderColor: "{content.border.color}", background: "{content.background}", color: "{text.color}", padding: "1.125rem" };
var c28 = { light: { header: { background: "{surface.50}", hoverBackground: "{surface.100}", activeBackground: "{surface.50}", activeHoverBackground: "{surface.100}" } }, dark: { header: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.800}", activeHoverBackground: "{surface.700}" } } };
var d34 = { root: o88, panel: r85, header: e59, content: t43, colorScheme: c28 };

// node_modules/@primeuix/themes/dist/lara/autocomplete/index.mjs
var o89 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r86 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var d35 = { padding: "{list.padding}", gap: "{list.gap}" };
var e60 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var l18 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var i29 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var c29 = { borderRadius: "{border.radius.sm}" };
var f11 = { padding: "{list.option.padding}" };
var s13 = { light: { chip: { focusBackground: "{surface.200}", focusColor: "{surface.800}" }, dropdown: { background: "{surface.50}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", focusColor: "{surface.0}" }, dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" } } };
var a44 = { root: o89, overlay: r86, list: d35, option: e60, optionGroup: l18, dropdown: i29, chip: c29, emptyMessage: f11, colorScheme: s13 };

// node_modules/@primeuix/themes/dist/lara/avatar/index.mjs
var e61 = { width: "2rem", height: "2rem", fontSize: "1rem", background: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var r87 = { size: "1rem" };
var o90 = { borderColor: "{content.background}", offset: "-0.75rem" };
var t44 = { width: "3rem", height: "3rem", fontSize: "1.5rem", icon: { size: "1.5rem" }, group: { offset: "-1rem" } };
var i30 = { width: "4rem", height: "4rem", fontSize: "2rem", icon: { size: "2rem" }, group: { offset: "-1.5rem" } };
var n39 = { root: e61, icon: r87, group: o90, lg: t44, xl: i30 };

// node_modules/@primeuix/themes/dist/lara/badge/index.mjs
var r88 = { borderRadius: "{border.radius.md}", padding: "0 0.5rem", fontSize: "0.75rem", fontWeight: "700", minWidth: "1.5rem", height: "1.5rem" };
var o91 = { size: "0.5rem" };
var e62 = { fontSize: "0.625rem", minWidth: "1.25rem", height: "1.25rem" };
var c30 = { fontSize: "0.875rem", minWidth: "1.75rem", height: "1.75rem" };
var a45 = { fontSize: "1rem", minWidth: "2rem", height: "2rem" };
var n40 = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.500}", color: "{surface.0}" }, info: { background: "{sky.500}", color: "{surface.0}" }, warn: { background: "{orange.500}", color: "{surface.0}" }, danger: { background: "{red.500}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "{green.400}", color: "{green.950}" }, info: { background: "{sky.400}", color: "{sky.950}" }, warn: { background: "{orange.400}", color: "{orange.950}" }, danger: { background: "{red.400}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var d36 = { root: r88, dot: o91, sm: e62, lg: c30, xl: a45, colorScheme: n40 };

// node_modules/@primeuix/themes/dist/lara/base/index.mjs
var o92 = { borderRadius: { none: "0", xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337", 950: "#4c0519" }, slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" } };
var r89 = { transitionDuration: "0.2s", focusRing: { width: "0", style: "none", color: "transparent", offset: "0" }, disabledOpacity: "0.6", iconSize: "1rem", anchorGutter: "2px", primary: { 50: "{emerald.50}", 100: "{emerald.100}", 200: "{emerald.200}", 300: "{emerald.300}", 400: "{emerald.400}", 500: "{emerald.500}", 600: "{emerald.600}", 700: "{emerald.700}", 800: "{emerald.800}", 900: "{emerald.900}", 950: "{emerald.950}" }, formField: { paddingX: "0.75rem", paddingY: "0.625rem", sm: { fontSize: "0.875rem", paddingX: "0.625rem", paddingY: "0.5rem" }, lg: { fontSize: "1.125rem", paddingX: "0.875rem", paddingY: "0.75rem" }, borderRadius: "{border.radius.md}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{transition.duration}" }, list: { padding: "0.5rem 0", gap: "0", header: { padding: "0.625rem 1rem 0 1rem" }, option: { padding: "0.625rem 1rem", borderRadius: "0" }, optionGroup: { padding: "0.625rem 1rem", fontWeight: "600" } }, content: { borderRadius: "{border.radius.md}" }, mask: { transitionDuration: "0.3s" }, navigation: { list: { padding: "0.5rem 0", gap: "0" }, item: { padding: "0.625rem 1rem", borderRadius: "0", gap: "0.5rem" }, submenuLabel: { padding: "0.625rem 1rem", fontWeight: "600" }, submenuIcon: { size: "0.875rem" } }, overlay: { select: { borderRadius: "{border.radius.md}", shadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)" }, popover: { borderRadius: "{border.radius.md}", padding: "1rem", shadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }, modal: { borderRadius: "{border.radius.xl}", padding: "1.5rem", shadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }, navigation: { shadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)" } }, colorScheme: { light: { surface: { 0: "#ffffff", 50: "{slate.50}", 100: "{slate.100}", 200: "{slate.200}", 300: "{slate.300}", 400: "{slate.400}", 500: "{slate.500}", 600: "{slate.600}", 700: "{slate.700}", 800: "{slate.800}", 900: "{slate.900}", 950: "{slate.950}" }, primary: { color: "{primary.500}", contrastColor: "#ffffff", hoverColor: "{primary.600}", activeColor: "{primary.700}" }, highlight: { background: "{primary.50}", focusBackground: "{primary.100}", color: "{primary.700}", focusColor: "{primary.800}" }, focusRing: { shadow: "0 0 0 0.2rem {primary.200}" }, mask: { background: "rgba(0,0,0,0.4)", color: "{surface.200}" }, formField: { background: "{surface.0}", disabledBackground: "{surface.200}", filledBackground: "{surface.50}", filledHoverBackground: "{surface.50}", filledFocusBackground: "{surface.0}", borderColor: "{surface.300}", hoverBorderColor: "{primary.color}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.400}", color: "{surface.700}", disabledColor: "{surface.500}", placeholderColor: "{surface.500}", invalidPlaceholderColor: "{red.600}", floatLabelColor: "{surface.500}", floatLabelFocusColor: "{primary.600}", floatLabelActiveColor: "{surface.500}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.500}", shadow: "none" }, text: { color: "{surface.700}", hoverColor: "{surface.800}", mutedColor: "{surface.500}", hoverMutedColor: "{surface.600}" }, content: { background: "{surface.0}", hoverBackground: "{surface.100}", borderColor: "{surface.200}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, popover: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" }, modal: { background: "{surface.0}", borderColor: "{surface.200}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.100}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}" } }, optionGroup: { background: "transparent", color: "{text.color}" } }, navigation: { item: { focusBackground: "{surface.100}", activeBackground: "{surface.100}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } }, submenuLabel: { background: "transparent", color: "{text.color}" }, submenuIcon: { color: "{surface.400}", focusColor: "{surface.500}", activeColor: "{surface.500}" } } }, dark: { surface: { 0: "#ffffff", 50: "{zinc.50}", 100: "{zinc.100}", 200: "{zinc.200}", 300: "{zinc.300}", 400: "{zinc.400}", 500: "{zinc.500}", 600: "{zinc.600}", 700: "{zinc.700}", 800: "{zinc.800}", 900: "{zinc.900}", 950: "{zinc.950}" }, primary: { color: "{primary.400}", contrastColor: "{surface.900}", hoverColor: "{primary.300}", activeColor: "{primary.200}" }, highlight: { background: "color-mix(in srgb, {primary.400}, transparent 84%)", focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)", color: "rgba(255,255,255,.87)", focusColor: "rgba(255,255,255,.87)" }, focusRing: { shadow: "0 0 0 0.2rem color-mix(in srgb, {primary.color}, transparent 80%)" }, mask: { background: "rgba(0,0,0,0.6)", color: "{surface.200}" }, formField: { background: "{surface.950}", disabledBackground: "{surface.700}", filledBackground: "{surface.800}", filledHoverBackground: "{surface.800}", filledFocusBackground: "{surface.950}", borderColor: "{surface.600}", hoverBorderColor: "{primary.color}", focusBorderColor: "{primary.color}", invalidBorderColor: "{red.300}", color: "{surface.0}", disabledColor: "{surface.400}", placeholderColor: "{surface.400}", invalidPlaceholderColor: "{red.400}", floatLabelColor: "{surface.400}", floatLabelFocusColor: "{primary.color}", floatLabelActiveColor: "{surface.400}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.400}", shadow: "none" }, text: { color: "{surface.0}", hoverColor: "{surface.0}", mutedColor: "{surface.400}", hoverMutedColor: "{surface.300}" }, content: { background: "{surface.900}", hoverBackground: "{surface.800}", borderColor: "{surface.700}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, popover: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, modal: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.800}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}" } }, optionGroup: { background: "transparent", color: "{text.color}" } }, navigation: { item: { focusBackground: "{surface.800}", activeBackground: "{surface.800}", color: "{text.color}", focusColor: "{text.hover.color}", activeColor: "{text.hover.color}", icon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } }, submenuLabel: { background: "transparent", color: "{text.color}" }, submenuIcon: { color: "{surface.500}", focusColor: "{surface.400}", activeColor: "{surface.400}" } } } } };
var e63 = { primitive: o92, semantic: r89 };

// node_modules/@primeuix/themes/dist/lara/blockui/index.mjs
var r90 = { borderRadius: "{content.border.radius}" };
var o93 = { root: r90 };

// node_modules/@primeuix/themes/dist/lara/breadcrumb/index.mjs
var o94 = { padding: "1.25rem", background: "{content.background}", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r91 = { color: "{text.muted.color}", hoverColor: "{text.color}", borderRadius: "{content.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", hoverColor: "{navigation.item.icon.focus.color}" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i31 = { color: "{navigation.item.icon.color}" };
var t45 = { root: o94, item: r91, separator: i31 };

// node_modules/@primeuix/themes/dist/lara/button/index.mjs
var r92 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", gap: "0.5rem", paddingX: "1rem", paddingY: "{form.field.padding.y}", iconOnlyWidth: "2.75rem", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}", iconOnlyWidth: "2.25rem" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}", iconOnlyWidth: "3.25rem" }, label: { fontWeight: "600" }, raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", offset: "{form.field.focus.ring.offset}" }, badgeSize: "1rem", transitionDuration: "{form.field.transition.duration}" };
var o95 = { light: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {primary.200}" } }, secondary: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", borderColor: "{surface.100}", hoverBorderColor: "{surface.200}", activeBorderColor: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {surface.200}" } }, info: { background: "{sky.500}", hoverBackground: "{sky.600}", activeBackground: "{sky.700}", borderColor: "{sky.500}", hoverBorderColor: "{sky.600}", activeBorderColor: "{sky.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {sky.200}" } }, success: { background: "{green.500}", hoverBackground: "{green.600}", activeBackground: "{green.700}", borderColor: "{green.500}", hoverBorderColor: "{green.600}", activeBorderColor: "{green.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {green.200}" } }, warn: { background: "{orange.500}", hoverBackground: "{orange.600}", activeBackground: "{orange.700}", borderColor: "{orange.500}", hoverBorderColor: "{orange.600}", activeBorderColor: "{orange.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {orange.200}" } }, help: { background: "{purple.500}", hoverBackground: "{purple.600}", activeBackground: "{purple.700}", borderColor: "{purple.500}", hoverBorderColor: "{purple.600}", activeBorderColor: "{purple.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {purple.200}" } }, danger: { background: "{red.500}", hoverBackground: "{red.600}", activeBackground: "{red.700}", borderColor: "{red.500}", hoverBorderColor: "{red.600}", activeBorderColor: "{red.700}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {red.200}" } }, contrast: { background: "{surface.950}", hoverBackground: "{surface.900}", activeBackground: "{surface.800}", borderColor: "{surface.950}", hoverBorderColor: "{surface.900}", activeBorderColor: "{surface.800}", color: "{surface.0}", hoverColor: "{surface.0}", activeColor: "{surface.0}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem {surface.400}" } } }, outlined: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", borderColor: "{primary.200}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.500}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", borderColor: "{green.200}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", borderColor: "{sky.200}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", borderColor: "{orange.200}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", borderColor: "{purple.200}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", borderColor: "{red.200}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.700}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.200}", color: "{surface.700}" } }, text: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.100}", activeBackground: "{surface.200}", color: "{surface.600}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", color: "{green.500}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", color: "{orange.500}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", color: "{purple.500}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.700}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } }, dark: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {primary.color}, transparent 80%)" } }, secondary: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", borderColor: "{surface.800}", hoverBorderColor: "{surface.700}", activeBorderColor: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.300}, transparent 80%)" } }, info: { background: "{sky.400}", hoverBackground: "{sky.300}", activeBackground: "{sky.200}", borderColor: "{sky.400}", hoverBorderColor: "{sky.300}", activeBorderColor: "{sky.200}", color: "{sky.950}", hoverColor: "{sky.950}", activeColor: "{sky.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {sky.400}, transparent 80%)" } }, success: { background: "{green.400}", hoverBackground: "{green.300}", activeBackground: "{green.200}", borderColor: "{green.400}", hoverBorderColor: "{green.300}", activeBorderColor: "{green.200}", color: "{green.950}", hoverColor: "{green.950}", activeColor: "{green.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {green.400}, transparent 80%)" } }, warn: { background: "{orange.400}", hoverBackground: "{orange.300}", activeBackground: "{orange.200}", borderColor: "{orange.400}", hoverBorderColor: "{orange.300}", activeBorderColor: "{orange.200}", color: "{orange.950}", hoverColor: "{orange.950}", activeColor: "{orange.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {orange.400}, transparent 80%)" } }, help: { background: "{purple.400}", hoverBackground: "{purple.300}", activeBackground: "{purple.200}", borderColor: "{purple.400}", hoverBorderColor: "{purple.300}", activeBorderColor: "{purple.200}", color: "{purple.950}", hoverColor: "{purple.950}", activeColor: "{purple.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {purple.400}, transparent 80%)" } }, danger: { background: "{red.400}", hoverBackground: "{red.300}", activeBackground: "{red.200}", borderColor: "{red.400}", hoverBorderColor: "{red.300}", activeBorderColor: "{red.200}", color: "{red.950}", hoverColor: "{red.950}", activeColor: "{red.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {red.400}, transparent 80%)" } }, contrast: { background: "{surface.0}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{surface.0}", hoverBorderColor: "{surface.100}", activeBorderColor: "{surface.200}", color: "{surface.950}", hoverColor: "{surface.950}", activeColor: "{surface.950}", focusRing: { color: "transparent", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.0}, transparent 80%)" } } }, outlined: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", borderColor: "{primary.700}", color: "{primary.color}" }, secondary: { hoverBackground: "rgba(255,255,255,0.04)", activeBackground: "rgba(255,255,255,0.16)", borderColor: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", borderColor: "{green.700}", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", borderColor: "{sky.700}", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", borderColor: "{orange.700}", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {help.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {help.400}, transparent 84%)", borderColor: "{purple.700}", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {danger.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {danger.400}, transparent 84%)", borderColor: "{red.700}", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.500}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.600}", color: "{surface.0}" } }, text: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", color: "{green.400}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", color: "{sky.400}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", color: "{orange.400}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", color: "{purple.400}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", color: "{red.400}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } } };
var e64 = { root: r92, colorScheme: o95 };

// node_modules/@primeuix/themes/dist/lara/card/index.mjs
var o96 = { background: "{content.background}", borderRadius: "{border.radius.lg}", color: "{content.color}", shadow: "0 .125rem .25rem rgba(0,0,0,.075)" };
var r93 = { padding: "1.5rem", gap: "0.75rem" };
var e65 = { gap: "0.5rem" };
var t46 = { fontSize: "1.25rem", fontWeight: "700" };
var a46 = { color: "{text.muted.color}" };
var d37 = { root: o96, body: r93, caption: e65, title: t46, subtitle: a46 };

// node_modules/@primeuix/themes/dist/lara/carousel/index.mjs
var r94 = { transitionDuration: "{transition.duration}" };
var o97 = { gap: "0.25rem" };
var a47 = { padding: "1rem", gap: "0.5rem" };
var i32 = { width: "1rem", height: "1rem", borderRadius: "50", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c31 = { light: { indicator: { background: "{surface.200}", hoverBackground: "{surface.300}", activeBackground: "{primary.color}" } }, dark: { indicator: { background: "{surface.700}", hoverBackground: "{surface.600}", activeBackground: "{primary.color}" } } };
var t47 = { root: r94, content: o97, indicatorList: a47, indicator: i32, colorScheme: c31 };

// node_modules/@primeuix/themes/dist/lara/cascadeselect/index.mjs
var o98 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r95 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d38 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l19 = { padding: "{list.padding}", gap: "{list.gap}", mobileIndent: "1.25rem" };
var e66 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", icon: { color: "{list.option.icon.color}", focusColor: "{list.option.icon.focus.color}", size: "0.875rem" } };
var i33 = { color: "{form.field.icon.color}" };
var f12 = { root: o98, dropdown: r95, overlay: d38, list: l19, option: e66, clearIcon: i33 };

// node_modules/@primeuix/themes/dist/lara/checkbox/index.mjs
var o99 = { borderRadius: "{border.radius.sm}", width: "1.5rem", height: "1.5rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1.25rem", height: "1.25rem" }, lg: { width: "1.75rem", height: "1.75rem" } };
var r96 = { size: "1rem", color: "{form.field.color}", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.75rem" }, lg: { size: "1.25rem" } };
var e67 = { root: o99, icon: r96 };

// node_modules/@primeuix/themes/dist/lara/chip/index.mjs
var o100 = { borderRadius: "16px", paddingX: "0.875rem", paddingY: "0.625rem", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r97 = { width: "2rem", height: "2rem" };
var e68 = { size: "1rem" };
var c32 = { size: "1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i34 = { light: { root: { background: "{surface.100}", color: "{surface.800}" }, icon: { color: "{surface.800}" }, removeIcon: { color: "{surface.800}" } }, dark: { root: { background: "{surface.800}", color: "{surface.0}" }, icon: { color: "{surface.0}" }, removeIcon: { color: "{surface.0}" } } };
var s14 = { root: o100, image: r97, icon: e68, removeIcon: c32, colorScheme: i34 };

// node_modules/@primeuix/themes/dist/lara/colorpicker/index.mjs
var r98 = { transitionDuration: "{transition.duration}" };
var o101 = { width: "1.75rem", height: "1.75rem", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var e69 = { shadow: "{overlay.popover.shadow}", borderRadius: "{overlay.popover.borderRadius}" };
var a48 = { light: { panel: { background: "{surface.800}", borderColor: "{surface.900}" }, handle: { color: "{surface.0}" } }, dark: { panel: { background: "{surface.900}", borderColor: "{surface.700}" }, handle: { color: "{surface.0}" } } };
var d39 = { root: r98, preview: o101, panel: e69, colorScheme: a48 };

// node_modules/@primeuix/themes/dist/lara/confirmdialog/index.mjs
var o102 = { size: "2rem", color: "{overlay.modal.color}" };
var e70 = { gap: "1rem" };
var r99 = { icon: o102, content: e70 };

// node_modules/@primeuix/themes/dist/lara/confirmpopup/index.mjs
var o103 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r100 = { padding: "{overlay.popover.padding}", gap: "1rem" };
var e71 = { size: "1.5rem", color: "{overlay.popover.color}" };
var p4 = { gap: "0.5rem", padding: "0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}" };
var a49 = { root: o103, content: r100, icon: e71, footer: p4 };

// node_modules/@primeuix/themes/dist/lara/contextmenu/index.mjs
var o104 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i35 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n41 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a50 = { mobileIndent: "1.25rem" };
var t48 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r101 = { borderColor: "{content.border.color}" };
var c33 = { root: o104, list: i35, item: n41, submenu: a50, submenuIcon: t48, separator: r101 };

// node_modules/@primeuix/themes/dist/lara/datatable/index.mjs
var o105 = { transitionDuration: "{transition.duration}" };
var r102 = { borderColor: "{datatable.border.color}", borderWidth: "1px 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var e72 = { selectedBackground: "{highlight.background}", borderColor: "{datatable.border.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" }, sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var d40 = { fontWeight: "700" };
var l20 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var c34 = { borderColor: "{datatable.border.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var t49 = { borderColor: "{datatable.border.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var a51 = { fontWeight: "700" };
var n42 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var s15 = { color: "{primary.color}" };
var i36 = { width: "0.5rem" };
var g6 = { width: "1px", color: "{primary.color}" };
var u7 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var b5 = { size: "2rem" };
var p5 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var f13 = { inlineGap: "0.5rem", overlaySelect: { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, overlayPopover: { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}", gap: "0.5rem" }, rule: { borderColor: "{content.border.color}" }, constraintList: { padding: "{list.padding}", gap: "{list.gap}" }, constraint: { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", separator: { borderColor: "{content.border.color}" }, padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" } };
var h5 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var m5 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var v4 = { light: { root: { borderColor: "{content.border.color}" }, header: { background: "{surface.50}", color: "{text.color}" }, headerCell: { background: "{surface.50}", hoverBackground: "{surface.100}", color: "{text.color}" }, footer: { background: "{surface.50}", color: "{text.color}" }, footerCell: { background: "{surface.50}", color: "{text.color}" }, row: { stripedBackground: "{surface.50}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, header: { background: "{surface.800}", color: "{text.color}" }, headerCell: { background: "{surface.800}", hoverBackground: "{surface.700}", color: "{text.color}" }, footer: { background: "{surface.800}", color: "{text.color}" }, footerCell: { background: "{surface.800}", color: "{text.color}" }, row: { stripedBackground: "{surface.950}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var k4 = { root: o105, header: r102, headerCell: e72, columnTitle: d40, row: l20, bodyCell: c34, footerCell: t49, columnFooter: a51, footer: n42, dropPoint: s15, columnResizer: i36, resizeIndicator: g6, sortIcon: u7, loadingIcon: b5, rowToggleButton: p5, filter: f13, paginatorTop: h5, paginatorBottom: m5, colorScheme: v4 };

// node_modules/@primeuix/themes/dist/lara/dataview/index.mjs
var o106 = { borderColor: "{content.border.color}", borderWidth: "1px", borderRadius: "4px", padding: "0" };
var r103 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0", padding: "0.875rem 1.125rem", borderRadius: "5px 5px 0 0" };
var e73 = { background: "{content.background}", color: "{content.color}", borderColor: "transparent", borderWidth: "0", padding: "0", borderRadius: "5px" };
var d41 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "1px 0 0 0", padding: "0.875rem 1.125rem", borderRadius: "0 0 5px 5px" };
var t50 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var n43 = { borderColor: "{content.border.color}", borderWidth: "1px 0 0 0" };
var c35 = { light: { header: { background: "{surface.50}", color: "{text.color}" } }, dark: { header: { background: "{surface.800}", color: "{text.color}" } } };
var a52 = { root: o106, header: r103, content: e73, footer: d41, paginatorTop: t50, paginatorBottom: n43, colorScheme: c35 };

// node_modules/@primeuix/themes/dist/lara/datepicker/index.mjs
var o107 = { transitionDuration: "{transition.duration}" };
var r104 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}" };
var e74 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", padding: "0 0 0.75rem 0" };
var d42 = { gap: "0.5rem", fontWeight: "700" };
var c36 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var n44 = { color: "{form.field.icon.color}" };
var t51 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.375rem 0.625rem", borderRadius: "{content.border.radius}" };
var a53 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.375rem 0.625rem", borderRadius: "{content.border.radius}" };
var i37 = { borderColor: "{content.border.color}", gap: "{overlay.popover.padding}" };
var l21 = { margin: "0.75rem 0 0 0" };
var f14 = { padding: "0.375rem", fontWeight: "700", color: "{content.color}" };
var u8 = { hoverBackground: "{content.hover.background}", selectedBackground: "{primary.color}", rangeSelectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{primary.contrast.color}", rangeSelectedColor: "{highlight.color}", width: "2.5rem", height: "2.5rem", borderRadius: "50%", padding: "0.375rem", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var s16 = { margin: "0.75rem 0 0 0" };
var g7 = { padding: "0.5rem", borderRadius: "{content.border.radius}" };
var h6 = { margin: "0.75rem 0 0 0" };
var m6 = { padding: "0.5rem", borderRadius: "{content.border.radius}" };
var b6 = { padding: "0.75rem 0 0 0", borderColor: "{content.border.color}" };
var p6 = { padding: "0.75rem 0 0 0", borderColor: "{content.border.color}", gap: "0.5rem", buttonGap: "0.25rem" };
var v5 = { light: { dropdown: { background: "{surface.50}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" }, today: { background: "{surface.200}", color: "{surface.900}" } }, dark: { dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" }, today: { background: "{surface.700}", color: "{surface.0}" } } };
var k5 = { root: o107, panel: r104, header: e74, title: d42, dropdown: c36, inputIcon: n44, selectMonth: t51, selectYear: a53, group: i37, dayView: l21, weekDay: f14, date: u8, monthView: s16, month: g7, yearView: h6, year: m6, buttonbar: b6, timePicker: p6, colorScheme: v5 };

// node_modules/@primeuix/themes/dist/lara/dialog/index.mjs
var o108 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", borderRadius: "{overlay.modal.border.radius}", shadow: "{overlay.modal.shadow}" };
var a54 = { padding: "{overlay.modal.padding}", gap: "0.5rem" };
var d43 = { fontSize: "1.25rem", fontWeight: "600" };
var r105 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l22 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}", gap: "0.5rem" };
var e75 = { root: o108, header: a54, title: d43, content: r105, footer: l22 };

// node_modules/@primeuix/themes/dist/lara/divider/index.mjs
var r106 = { borderColor: "{content.border.color}" };
var o109 = { background: "{content.background}", color: "{text.color}" };
var n45 = { margin: "1.125rem 0", padding: "0 1.125rem", content: { padding: "0 0.625rem" } };
var e76 = { margin: "0 1.125rem", padding: "1.125rem 0", content: { padding: "0.625rem 0" } };
var t52 = { root: r106, content: o109, horizontal: n45, vertical: e76 };

// node_modules/@primeuix/themes/dist/lara/dock/index.mjs
var r107 = { background: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)", padding: "0.5rem", borderRadius: "{border.radius.lg}" };
var o110 = { borderRadius: "{content.border.radius}", padding: "0.5rem", size: "3rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var d44 = { root: r107, item: o110 };

// node_modules/@primeuix/themes/dist/lara/drawer/index.mjs
var o111 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", shadow: "{overlay.modal.shadow}" };
var a55 = { padding: "{overlay.modal.padding}" };
var d45 = { fontSize: "1.5rem", fontWeight: "600" };
var r108 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l23 = { padding: "{overlay.modal.padding}" };
var e77 = { root: o111, header: a55, title: d45, content: r108, footer: l23 };

// node_modules/@primeuix/themes/dist/lara/editor/index.mjs
var o112 = { borderColor: "{content.border.color}", borderRadius: "{content.border.radius}" };
var r109 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var e78 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}", padding: "{list.padding}" };
var l24 = { focusBackground: "{list.option.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var t53 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var c37 = { light: { toolbar: { background: "{surface.50}" } }, dark: { toolbar: { background: "{surface.800}" } } };
var d46 = { toolbar: o112, toolbarItem: r109, overlay: e78, overlayOption: l24, content: t53, colorScheme: c37 };

// node_modules/@primeuix/themes/dist/lara/fieldset/index.mjs
var o113 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", padding: "0.75rem 1.125rem 1.125rem 1.125rem", transitionDuration: "{transition.duration}" };
var r110 = { borderRadius: "{content.border.radius}", borderWidth: "1px", borderColor: "{content.border.color}", padding: "0.625rem 0.875rem", gap: "0.5rem", fontWeight: "700", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e79 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}" };
var t54 = { padding: "0" };
var c38 = { light: { legend: { background: "{surface.50}", hoverBackground: "{surface.100}", color: "{text.color}", hoverColor: "{text.hover.color}" } }, dark: { legend: { background: "{surface.800}", hoverBackground: "{surface.700}", color: "{text.color}", hoverColor: "{text.hover.color}" } } };
var n46 = { root: o113, legend: r110, toggleIcon: e79, content: t54, colorScheme: c38 };

// node_modules/@primeuix/themes/dist/lara/fileupload/index.mjs
var r111 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var o114 = { borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", padding: "1.125rem", borderRadius: "5px 5px 0 0", gap: "0.5rem" };
var e80 = { highlightBorderColor: "{primary.color}", padding: "1.125rem", gap: "1rem" };
var a56 = { padding: "1rem", gap: "1rem", borderColor: "{content.border.color}", info: { gap: "0.5rem" } };
var t55 = { gap: "0.5rem" };
var d47 = { height: "0.25rem" };
var n47 = { gap: "0.5rem" };
var c39 = { light: { header: { background: "{surface.50}", color: "{text.color}" } }, dark: { header: { background: "{surface.800}", color: "{text.color}" } } };
var i38 = { root: r111, header: o114, content: e80, file: a56, fileList: t55, progressbar: d47, basic: n47, colorScheme: c39 };

// node_modules/@primeuix/themes/dist/lara/floatlabel/index.mjs
var o115 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", activeColor: "{form.field.float.label.active.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", positionY: "{form.field.padding.y}", fontWeight: "500", active: { fontSize: "0.75rem", fontWeight: "400" } };
var i39 = { active: { top: "-1.375rem" } };
var r112 = { input: { paddingTop: "1.875rem", paddingBottom: "{form.field.padding.y}" }, active: { top: "{form.field.padding.y}" } };
var a57 = { borderRadius: "{border.radius.xs}", active: { background: "{form.field.background}", padding: "0 0.125rem" } };
var d48 = { root: o115, over: i39, in: r112, on: a57 };

// node_modules/@primeuix/themes/dist/lara/galleria/index.mjs
var o116 = { borderWidth: "1px", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var r113 = { background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.100}", hoverColor: "{surface.0}", size: "3rem", gutter: "0", prev: { borderRadius: "0 12px 12px 0" }, next: { borderRadius: "12px 0 0 12px" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e81 = { size: "1.5rem" };
var t56 = { padding: "1rem 0.25rem" };
var n48 = { size: "2rem", borderRadius: "{content.border.radius}", gutter: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var a58 = { size: "1rem" };
var c40 = { background: "rgba(0, 0, 0, 0.5)", color: "{surface.100}", padding: "1rem" };
var s17 = { gap: "0.5rem", padding: "1rem" };
var u9 = { width: "1rem", height: "1rem", activeBackground: "{primary.color}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i40 = { background: "rgba(0, 0, 0, 0.5)" };
var d49 = { background: "rgba(255, 255, 255, 0.4)", hoverBackground: "rgba(255, 255, 255, 0.6)", activeBackground: "rgba(255, 255, 255, 0.9)" };
var g8 = { size: "3rem", gutter: "0.5rem", background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.50}", hoverColor: "{surface.0}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var f15 = { size: "1.5rem" };
var h7 = { light: { thumbnailsContent: { background: "{surface.50}" }, thumbnailNavButton: { hoverBackground: "{surface.100}", color: "{surface.600}", hoverColor: "{surface.700}" }, indicatorButton: { background: "{surface.200}", hoverBackground: "{surface.300}" } }, dark: { thumbnailsContent: { background: "{surface.800}" }, thumbnailNavButton: { hoverBackground: "{surface.700}", color: "{surface.400}", hoverColor: "{surface.0}" }, indicatorButton: { background: "{surface.700}", hoverBackground: "{surface.600}" } } };
var l25 = { root: o116, navButton: r113, navIcon: e81, thumbnailsContent: t56, thumbnailNavButton: n48, thumbnailNavButtonIcon: a58, caption: c40, indicatorList: s17, indicatorButton: u9, insetIndicatorList: i40, insetIndicatorButton: d49, closeButton: g8, closeButtonIcon: f15, colorScheme: h7 };

// node_modules/@primeuix/themes/dist/lara/iconfield/index.mjs
var o117 = { color: "{form.field.icon.color}" };
var r114 = { icon: o117 };

// node_modules/@primeuix/themes/dist/lara/iftalabel/index.mjs
var o118 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", top: "{form.field.padding.y}", fontSize: "0.75rem", fontWeight: "400" };
var l26 = { paddingTop: "1.875rem", paddingBottom: "{form.field.padding.y}" };
var i41 = { root: o118, input: l26 };

// node_modules/@primeuix/themes/dist/lara/image/index.mjs
var o119 = { transitionDuration: "{transition.duration}" };
var r115 = { icon: { size: "1.5rem" }, mask: { background: "{mask.background}", color: "{mask.color}" } };
var a59 = { position: { left: "auto", right: "1rem", top: "1rem", bottom: "auto" }, blur: "8px", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px", borderRadius: "{content.border.radius}", padding: ".5rem", gap: "0.5rem" };
var e82 = { hoverBackground: "rgba(255,255,255,0.1)", color: "{surface.50}", hoverColor: "{surface.0}", size: "3rem", iconSize: "1.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i42 = { root: o119, preview: r115, toolbar: a59, action: e82 };

// node_modules/@primeuix/themes/dist/lara/imagecompare/index.mjs
var r116 = { size: "15px", hoverSize: "30px", background: "rgba(255,255,255,0.3)", hoverBackground: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.3)", hoverBorderColor: "rgba(255,255,255,0.3)", borderWidth: "3px", borderRadius: "50%", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "rgba(255,255,255,0.3)", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var o120 = { handle: r116 };

// node_modules/@primeuix/themes/dist/lara/inlinemessage/index.mjs
var r117 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", gap: "0.5rem" };
var o121 = { fontWeight: "500" };
var n49 = { size: "1.125rem" };
var e83 = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "color-mix(in srgb, {blue.50}, transparent 5%)", color: "{blue.600}", shadow: "none" }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "color-mix(in srgb, {green.50}, transparent 5%)", color: "{green.600}", shadow: "none" }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "color-mix(in srgb,{yellow.50}, transparent 5%)", color: "{yellow.600}", shadow: "none" }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "color-mix(in srgb, {red.50}, transparent 5%)", color: "{red.600}", shadow: "none" }, secondary: { background: "{surface.100}", borderColor: "{surface.100}", color: "{surface.600}", shadow: "none" }, contrast: { background: "{surface.900}", borderColor: "{surface.900}", color: "{surface.50}", shadow: "none" } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.500}, transparent 84%)", color: "{blue.500}", shadow: "none" }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.500}, transparent 84%)", color: "{green.500}", shadow: "none" }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.500}, transparent 84%)", color: "{yellow.500}", shadow: "none" }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.500}, transparent 84%)", color: "{red.500}", shadow: "none" }, secondary: { background: "{surface.800}", borderColor: "{surface.800}", color: "{surface.300}", shadow: "none" }, contrast: { background: "{surface.0}", borderColor: "{surface.0}", color: "{surface.950}", shadow: "none" } } };
var a60 = { root: r117, text: o121, icon: n49, colorScheme: e83 };

// node_modules/@primeuix/themes/dist/lara/inplace/index.mjs
var o122 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{transition.duration}" };
var r118 = { hoverBackground: "{content.hover.background}", hoverColor: "{content.hover.color}" };
var n50 = { root: o122, display: r118 };

// node_modules/@primeuix/themes/dist/lara/inputchips/index.mjs
var o123 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r119 = { borderRadius: "{border.radius.sm}" };
var d50 = { light: { chip: { focusBackground: "{surface.200}", color: "{surface.800}" } }, dark: { chip: { focusBackground: "{surface.700}", color: "{surface.0}" } } };
var f16 = { root: o123, chip: r119, colorScheme: d50 };

// node_modules/@primeuix/themes/dist/lara/inputgroup/index.mjs
var r120 = { borderRadius: "{form.field.border.radius}", padding: "0.625rem 0.5rem", minWidth: "2.75rem" };
var o124 = { light: { addon: { background: "{surface.50}", borderColor: "{form.field.border.color}", color: "{text.muted.color}" } }, dark: { addon: { background: "{surface.800}", borderColor: "{form.field.border.color}", color: "{text.muted.color}" } } };
var d51 = { addon: r120, colorScheme: o124 };

// node_modules/@primeuix/themes/dist/lara/inputnumber/index.mjs
var r121 = { transitionDuration: "{transition.duration}" };
var o125 = { width: "2.5rem", borderRadius: "{form.field.border.radius}", verticalPadding: "{form.field.padding.y}" };
var e84 = { light: { button: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" } }, dark: { button: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.500}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" } } };
var d52 = { root: r121, button: o125, colorScheme: e84 };

// node_modules/@primeuix/themes/dist/lara/inputotp/index.mjs
var r122 = { gap: "0.5rem" };
var t57 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" } };
var e85 = { root: r122, input: t57 };

// node_modules/@primeuix/themes/dist/lara/inputtext/index.mjs
var o126 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d53 = { root: o126 };

// node_modules/@primeuix/themes/dist/lara/knob/index.mjs
var o127 = { transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r123 = { background: "{primary.color}" };
var t58 = { background: "{content.border.color}" };
var n51 = { color: "{text.muted.color}" };
var c41 = { root: o127, value: r123, range: t58, text: n51 };

// node_modules/@primeuix/themes/dist/lara/listbox/index.mjs
var o128 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", borderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", shadow: "{form.field.shadow}", borderRadius: "{form.field.border.radius}", transitionDuration: "{form.field.transition.duration}" };
var r124 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var d54 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var i43 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var t59 = { color: "{list.option.color}", gutterStart: "-0.5rem", gutterEnd: "0.5rem" };
var e86 = { padding: "{list.option.padding}" };
var l27 = { light: { option: { stripedBackground: "{surface.50}" } }, dark: { option: { stripedBackground: "{surface.900}" } } };
var n52 = { root: o128, list: r124, option: d54, optionGroup: i43, checkmark: t59, emptyMessage: e86, colorScheme: l27 };

// node_modules/@primeuix/themes/dist/lara/megamenu/index.mjs
var o129 = { borderColor: "transparent", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", verticalOrientation: { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, horizontalOrientation: { padding: "0.75rem 1rem", gap: "0.5rem" }, transitionDuration: "{transition.duration}" };
var n53 = { borderRadius: "{content.border.radius}", padding: "0.75rem 1rem" };
var a61 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var i44 = { padding: "0", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", shadow: "{overlay.navigation.shadow}", gap: "0.5rem" };
var r125 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var t60 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var e87 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var c42 = { borderColor: "{content.border.color}" };
var d55 = { borderRadius: "50%", size: "2rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var g9 = { light: { root: { background: "{surface.50}" } }, dark: { root: { background: "{surface.800}" } } };
var u10 = { root: o129, baseItem: n53, item: a61, overlay: i44, submenu: r125, submenuLabel: t60, submenuIcon: e87, separator: c42, mobileButton: d55, colorScheme: g9 };

// node_modules/@primeuix/themes/dist/lara/menu/index.mjs
var o130 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var n54 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var a62 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i45 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var t61 = { borderColor: "{content.border.color}" };
var r126 = { root: o130, list: n54, item: a62, submenuLabel: i45, separator: t61 };

// node_modules/@primeuix/themes/dist/lara/menubar/index.mjs
var o131 = { borderColor: "transparent", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.75rem 1rem", transitionDuration: "{transition.duration}" };
var r127 = { borderRadius: "{content.border.radius}", padding: "0.75rem 1rem" };
var i46 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var n55 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", mobileIndent: "1.25rem", icon: { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" } };
var a63 = { borderColor: "{content.border.color}" };
var t62 = { borderRadius: "50%", size: "2rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e88 = { light: { root: { background: "{surface.50}" } }, dark: { root: { background: "{surface.800}" } } };
var c43 = { root: o131, baseItem: r127, item: i46, submenu: n55, separator: a63, mobileButton: t62, colorScheme: e88 };

// node_modules/@primeuix/themes/dist/lara/message/index.mjs
var o132 = { borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" };
var r128 = { padding: "0.75rem 1rem", gap: "0.5rem", sm: { padding: "0.5rem 0.625rem" }, lg: { padding: "0.75rem 0.875rem" } };
var e89 = { fontSize: "1rem", fontWeight: "500", sm: { fontSize: "0.875rem" }, lg: { fontSize: "1.125rem" } };
var n56 = { size: "1.25rem", sm: { size: "1rem" }, lg: { size: "1.5rem" } };
var l28 = { width: "2rem", height: "2rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var c44 = { size: "1rem", sm: { size: "0.875rem" }, lg: { size: "1.125rem" } };
var s18 = { root: { borderWidth: "1px" } };
var a64 = { content: { padding: "0" } };
var t63 = { light: { info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "transparent", color: "{blue.600}", shadow: "none", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {blue.200}" } }, outlined: { color: "{blue.600}", borderColor: "{blue.600}" }, simple: { color: "{blue.600}" } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "transparent", color: "{green.600}", shadow: "none", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {green.200}" } }, outlined: { color: "{green.600}", borderColor: "{green.600}" }, simple: { color: "{green.600}" } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "transparent", color: "{yellow.600}", shadow: "none", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {yellow.200}" } }, outlined: { color: "{yellow.600}", borderColor: "{yellow.600}" }, simple: { color: "{yellow.600}" } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "transparent", color: "{red.600}", shadow: "none", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {red.200}" } }, outlined: { color: "{red.600}", borderColor: "{red.600}" }, simple: { color: "{red.600}" } }, secondary: { background: "{surface.100}", borderColor: "transparent", color: "{surface.600}", shadow: "none", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {surface.200}" } }, outlined: { color: "{surface.500}", borderColor: "{surface.500}" }, simple: { color: "{surface.500}" } }, contrast: { background: "{surface.900}", borderColor: "transparent", color: "{surface.50}", shadow: "none", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {surface.400}" } }, outlined: { color: "{surface.900}", borderColor: "{surface.900}" }, simple: { color: "{surface.900}" } } }, dark: { info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "transparent", color: "{blue.500}", shadow: "none", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {blue.500}, transparent 80%)" } }, outlined: { color: "{blue.500}", borderColor: "{blue.500}" }, simple: { color: "{blue.500}" } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "transparent", color: "{green.500}", shadow: "none", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {green.500}, transparent 80%)" } }, outlined: { color: "{green.500}", borderColor: "{green.500}" }, simple: { color: "{green.500}" } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "transparent", color: "{yellow.500}", shadow: "none", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {yellow.500}, transparent 80%)" } }, outlined: { color: "{yellow.500}", borderColor: "{yellow.500}" }, simple: { color: "{yellow.500}" } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "transparent", color: "{red.500}", shadow: "none", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {red.500}, transparent 80%)" } }, outlined: { color: "{red.500}", borderColor: "{red.500}" }, simple: { color: "{red.500}" } }, secondary: { background: "{surface.800}", borderColor: "transparent", color: "{surface.300}", shadow: "none", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.300}, transparent 80%)" } }, outlined: { color: "{surface.400}", borderColor: "{surface.400}" }, simple: { color: "{surface.400}" } }, contrast: { background: "{surface.0}", borderColor: "transparent", color: "{surface.950}", shadow: "none", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.950}, transparent 80%)" } }, outlined: { color: "{surface.0}", borderColor: "{surface.0}" }, simple: { color: "{surface.0}" } } } };
var u11 = { root: o132, content: r128, text: e89, icon: n56, closeButton: l28, closeIcon: c44, outlined: s18, simple: a64, colorScheme: t63 };

// node_modules/@primeuix/themes/dist/lara/metergroup/index.mjs
var e90 = { borderRadius: "{content.border.radius}", gap: "1rem" };
var r129 = { background: "{content.border.color}", size: "0.625rem" };
var a65 = { gap: "0.5rem" };
var o133 = { size: "0.5rem" };
var l29 = { size: "1rem" };
var t64 = { verticalGap: "0.5rem", horizontalGap: "1rem" };
var b7 = { root: e90, meters: r129, label: a65, labelMarker: o133, labelIcon: l29, labelList: t64 };

// node_modules/@primeuix/themes/dist/lara/multiselect/index.mjs
var o134 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d56 = { width: "2.5rem", color: "{form.field.icon.color}" };
var r130 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l30 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i47 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", gap: "0.5rem" };
var e91 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f17 = { color: "{form.field.icon.color}" };
var a66 = { borderRadius: "{border.radius.sm}" };
var c45 = { padding: "{list.option.padding}" };
var n57 = { root: o134, dropdown: d56, overlay: r130, list: l30, option: i47, optionGroup: e91, chip: a66, clearIcon: f17, emptyMessage: c45 };

// node_modules/@primeuix/themes/dist/lara/orderlist/index.mjs
var r131 = { gap: "1.125rem" };
var a67 = { gap: "0.5rem" };
var o135 = { root: r131, controls: a67 };

// node_modules/@primeuix/themes/dist/lara/organizationchart/index.mjs
var o136 = { gutter: "0.75rem", transitionDuration: "{transition.duration}" };
var r132 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{content.border.color}", color: "{content.color}", selectedColor: "{highlight.color}", hoverColor: "{content.hover.color}", padding: "1rem 1.25rem", toggleablePadding: "1rem 1.25rem 1.5rem 1.25rem", borderRadius: "{content.border.radius}" };
var e92 = { background: "{content.background}", hoverBackground: "{content.hover.background}", borderColor: "{content.border.color}", color: "{text.muted.color}", hoverColor: "{text.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t65 = { color: "{content.border.color}", borderRadius: "{content.border.radius}", height: "24px" };
var n58 = { root: o136, node: r132, nodeToggleButton: e92, connector: t65 };

// node_modules/@primeuix/themes/dist/lara/overlaybadge/index.mjs
var o137 = { outline: { width: "2px", color: "{content.background}" } };
var t66 = { root: o137 };

// node_modules/@primeuix/themes/dist/lara/paginator/index.mjs
var o138 = { padding: "0.5rem 1rem", gap: "0.25rem", borderRadius: "{content.border.radius}", background: "{content.background}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r133 = { background: "transparent", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}", width: "2.5rem", height: "2.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t67 = { color: "{text.muted.color}" };
var e93 = { maxWidth: "2.5rem" };
var n59 = { root: o138, navButton: r133, currentPageReport: t67, jumpToPageInput: e93 };

// node_modules/@primeuix/themes/dist/lara/panel/index.mjs
var r134 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}" };
var o139 = { borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", padding: "1.125rem", borderRadius: "5px 5px 0 0" };
var e94 = { padding: "0.25rem 1.125rem" };
var d57 = { fontWeight: "700" };
var t68 = { padding: "1.125rem" };
var a68 = { padding: "1.125rem" };
var c46 = { light: { header: { background: "{surface.50}", color: "{text.color}" } }, dark: { header: { background: "{surface.800}", color: "{text.color}" } } };
var n60 = { root: r134, header: o139, toggleableHeader: e94, title: d57, content: t68, footer: a68, colorScheme: c46 };

// node_modules/@primeuix/themes/dist/lara/panelmenu/index.mjs
var o140 = { gap: "0", transitionDuration: "{transition.duration}" };
var r135 = { background: "{content.background}", borderColor: "{content.border.color}", borderWidth: "1px", color: "{content.color}", padding: "0.25rem 0.25rem", borderRadius: "0", first: { borderWidth: "1px 1px 0 1px", topBorderRadius: "{content.border.radius}" }, last: { borderWidth: "0 1px 1px 1px", bottomBorderRadius: "{content.border.radius}" } };
var n61 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", gap: "0.5rem", padding: "{navigation.item.padding}", borderRadius: "{content.border.radius}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i48 = { indent: "1rem" };
var t69 = { color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}" };
var a69 = { root: o140, panel: r135, item: n61, submenu: i48, submenuIcon: t69 };

// node_modules/@primeuix/themes/dist/lara/password/index.mjs
var r136 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: ".75rem" };
var o141 = { color: "{form.field.icon.color}" };
var e95 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", padding: "{overlay.popover.padding}", shadow: "{overlay.popover.shadow}" };
var a70 = { gap: "0.75rem" };
var d58 = { light: { strength: { weakBackground: "{red.500}", mediumBackground: "{amber.500}", strongBackground: "{green.500}" } }, dark: { strength: { weakBackground: "{red.400}", mediumBackground: "{amber.400}", strongBackground: "{green.400}" } } };
var n62 = { meter: r136, icon: o141, overlay: e95, content: a70, colorScheme: d58 };

// node_modules/@primeuix/themes/dist/lara/picklist/index.mjs
var r137 = { gap: "1.125rem" };
var a71 = { gap: "0.5rem" };
var o142 = { root: r137, controls: a71 };

// node_modules/@primeuix/themes/dist/lara/popover/index.mjs
var o143 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r138 = { padding: "{overlay.popover.padding}" };
var e96 = { root: o143, content: r138 };

// node_modules/@primeuix/themes/dist/lara/progressbar/index.mjs
var r139 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: "1.5rem" };
var o144 = { background: "{primary.color}" };
var e97 = { color: "{primary.contrast.color}", fontSize: "0.875rem", fontWeight: "600" };
var t70 = { root: r139, value: o144, label: e97 };

// node_modules/@primeuix/themes/dist/lara/progressspinner/index.mjs
var o145 = { light: { root: { colorOne: "{pink.500}", colorTwo: "{sky.500}", colorThree: "{emerald.500}", colorFour: "{amber.500}" } }, dark: { root: { colorOne: "{pink.400}", colorTwo: "{sky.400}", colorThree: "{emerald.400}", colorFour: "{amber.400}" } } };
var r140 = { colorScheme: o145 };

// node_modules/@primeuix/themes/dist/lara/radiobutton/index.mjs
var o146 = { width: "1.5rem", height: "1.5rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1.25rem", height: "1.25rem" }, lg: { width: "1.75rem", height: "1.75rem" } };
var r141 = { size: "1rem", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.75rem" }, lg: { size: "1.25rem" } };
var e98 = { root: o146, icon: r141 };

// node_modules/@primeuix/themes/dist/lara/rating/index.mjs
var o147 = { gap: "0.25rem", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r142 = { size: "1.25rem", color: "{text.muted.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" };
var i49 = { root: o147, icon: r142 };

// node_modules/@primeuix/themes/dist/lara/ripple/index.mjs
var r143 = { light: { root: { background: "rgba(0,0,0,0.1)" } }, dark: { root: { background: "rgba(255,255,255,0.3)" } } };
var o148 = { colorScheme: r143 };

// node_modules/@primeuix/themes/dist/lara/scrollpanel/index.mjs
var r144 = { transitionDuration: "{transition.duration}" };
var o149 = { size: "9px", borderRadius: "{border.radius.sm}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var s19 = { light: { bar: { background: "{surface.200}" } }, dark: { bar: { background: "{surface.700}" } } };
var a72 = { root: r144, bar: o149, colorScheme: s19 };

// node_modules/@primeuix/themes/dist/lara/select/index.mjs
var o150 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r145 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d59 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l31 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i50 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var e99 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f18 = { color: "{form.field.icon.color}" };
var c47 = { color: "{list.option.color}", gutterStart: "-0.5rem", gutterEnd: "0.5rem" };
var a73 = { padding: "{list.option.padding}" };
var n63 = { root: o150, dropdown: r145, overlay: d59, list: l31, option: i50, optionGroup: e99, clearIcon: f18, checkmark: c47, emptyMessage: a73 };

// node_modules/@primeuix/themes/dist/lara/selectbutton/index.mjs
var r146 = { borderRadius: "{form.field.border.radius}" };
var o151 = { light: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } }, dark: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } } };
var d60 = { root: r146, colorScheme: o151 };

// node_modules/@primeuix/themes/dist/lara/skeleton/index.mjs
var r147 = { borderRadius: "{content.border.radius}" };
var a74 = { light: { root: { background: "{surface.200}", animationBackground: "rgba(255,255,255,0.4)" } }, dark: { root: { background: "rgba(255, 255, 255, 0.06)", animationBackground: "rgba(255, 255, 255, 0.04)" } } };
var o152 = { root: r147, colorScheme: a74 };

// node_modules/@primeuix/themes/dist/lara/slider/index.mjs
var o153 = { transitionDuration: "{transition.duration}" };
var r148 = { background: "{content.border.color}", borderRadius: "{content.border.radius}", size: "3px" };
var e100 = { background: "{primary.color}" };
var n64 = { width: "16px", height: "16px", borderRadius: "50%", background: "{primary.color}", hoverBackground: "{primary.color}", content: { borderRadius: "50%", hoverBackground: "{primary.color}", width: "12px", height: "12px", shadow: "none" }, focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var d61 = { light: { handle: { content: { background: "{surface.0}" } } }, dark: { handle: { content: { background: "{surface.950}" } } } };
var a75 = { root: o153, track: r148, range: e100, handle: n64, colorScheme: d61 };

// node_modules/@primeuix/themes/dist/lara/speeddial/index.mjs
var t71 = { gap: "0.5rem", transitionDuration: "{transition.duration}" };
var a76 = { root: t71 };

// node_modules/@primeuix/themes/dist/lara/splitbutton/index.mjs
var r149 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" };
var d62 = { root: r149 };

// node_modules/@primeuix/themes/dist/lara/splitter/index.mjs
var o154 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r150 = { background: "{content.border.color}" };
var n65 = { size: "24px", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t72 = { light: { handle: { background: "{surface.400}" } }, dark: { handle: { background: "{surface.600}" } } };
var c48 = { root: o154, gutter: r150, handle: n65, colorScheme: t72 };

// node_modules/@primeuix/themes/dist/lara/stepper/index.mjs
var o155 = { transitionDuration: "{transition.duration}" };
var r151 = { background: "{content.border.color}", activeBackground: "{primary.color}", margin: "0 0 0 1.625rem", size: "2px" };
var e101 = { padding: "0.5rem", gap: "1rem" };
var t73 = { padding: "0", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var n66 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" };
var a77 = { background: "{content.background}", activeBackground: "{primary.color}", borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", activeColor: "{primary.contrast.color}", size: "2.25rem", fontSize: "1.125rem", fontWeight: "500", borderRadius: "50%", shadow: "none" };
var c49 = { padding: "0.875rem 0.5rem 1.125rem 0.5rem" };
var i51 = { background: "{content.background}", color: "{content.color}", padding: "0", indent: "1rem" };
var d63 = { root: o155, separator: r151, step: e101, stepHeader: t73, stepTitle: n66, stepNumber: a77, steppanels: c49, steppanel: i51 };

// node_modules/@primeuix/themes/dist/lara/steps/index.mjs
var o156 = { transitionDuration: "{transition.duration}" };
var r152 = { background: "{content.border.color}" };
var t74 = { borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var e102 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "500" };
var i52 = { background: "{content.background}", activeBackground: "{primary.color}", borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", activeColor: "{primary.contrast.color}", size: "2.25rem", fontSize: "1.125rem", fontWeight: "500", borderRadius: "50%", shadow: "none" };
var c50 = { root: o156, separator: r152, itemLink: t74, itemLabel: e102, itemNumber: i52 };

// node_modules/@primeuix/themes/dist/lara/tabmenu/index.mjs
var o157 = { transitionDuration: "{transition.duration}" };
var r153 = { borderWidth: "0", background: "{content.background}", borderColor: "{content.border.color}" };
var t75 = { borderWidth: "2px 0 0 0", borderColor: "transparent", hoverBorderColor: "transparent", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.25rem", fontWeight: "600", margin: "0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e103 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var a78 = { height: "0", bottom: "0", background: "transparent" };
var c51 = { light: { item: { background: "{surface.50}", hoverBackground: "{surface.100}", activeBackground: "{surface.0}" } }, dark: { item: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.900}" } } };
var i53 = { root: o157, tablist: r153, item: t75, itemIcon: e103, activeBar: a78, colorScheme: c51 };

// node_modules/@primeuix/themes/dist/lara/tabs/index.mjs
var o158 = { transitionDuration: "{transition.duration}" };
var r154 = { borderWidth: "0", background: "{content.background}", borderColor: "{content.border.color}" };
var t76 = { borderWidth: "2px 0 0 0", borderColor: "transparent", hoverBorderColor: "transparent", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}", padding: "1rem 1.25rem", fontWeight: "700", margin: "0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var n67 = { background: "{content.background}", color: "{content.color}", padding: "0.875rem 1.125rem 1.125rem 1.125rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var c52 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", width: "2.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var e104 = { height: "0", bottom: "0", background: "transparent" };
var a79 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" }, tab: { background: "{surface.50}", hoverBackground: "{surface.100}", activeBackground: "{surface.0}" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" }, tab: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.900}" } } };
var s20 = { root: o158, tablist: r154, tab: t76, tabpanel: n67, navButton: c52, activeBar: e104, colorScheme: a79 };

// node_modules/@primeuix/themes/dist/lara/tabview/index.mjs
var o159 = { transitionDuration: "{transition.duration}" };
var r155 = { background: "{content.background}", borderColor: "{content.border.color}" };
var t77 = { borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var n68 = { background: "{content.background}", color: "{content.color}" };
var a80 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}" };
var c53 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } };
var e105 = { root: o159, tabList: r155, tab: t77, tabPanel: n68, navButton: a80, colorScheme: c53 };

// node_modules/@primeuix/themes/dist/lara/tag/index.mjs
var r156 = { fontSize: "0.875rem", fontWeight: "700", padding: "0.25rem 0.5rem", gap: "0.25rem", borderRadius: "{content.border.radius}", roundedBorderRadius: "{border.radius.xl}" };
var o160 = { size: "0.75rem" };
var c54 = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.100}", color: "{surface.600}" }, success: { background: "{green.500}", color: "{surface.0}" }, info: { background: "{sky.500}", color: "{surface.0}" }, warn: { background: "{orange.500}", color: "{surface.0}" }, danger: { background: "{red.500}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.800}", color: "{surface.300}" }, success: { background: "{green.400}", color: "{green.950}" }, info: { background: "{sky.400}", color: "{sky.950}" }, warn: { background: "{orange.400}", color: "{orange.950}" }, danger: { background: "{red.400}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var a81 = { root: r156, icon: o160, colorScheme: c54 };

// node_modules/@primeuix/themes/dist/lara/terminal/index.mjs
var r157 = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", height: "18rem", padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{form.field.border.radius}" };
var o161 = { gap: "0.25rem" };
var d64 = { margin: "2px 0" };
var e106 = { root: r157, prompt: o161, commandResponse: d64 };

// node_modules/@primeuix/themes/dist/lara/textarea/index.mjs
var o162 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d65 = { root: o162 };

// node_modules/@primeuix/themes/dist/lara/tieredmenu/index.mjs
var o163 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i54 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n69 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a82 = { mobileIndent: "1.25rem" };
var t78 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r158 = { borderColor: "{content.border.color}" };
var c55 = { root: o163, list: i54, item: n69, submenu: a82, submenuIcon: t78, separator: r158 };

// node_modules/@primeuix/themes/dist/lara/timeline/index.mjs
var e107 = { minHeight: "5rem" };
var r159 = { eventContent: { padding: "1rem 0" } };
var n70 = { eventContent: { padding: "0 1rem" } };
var o164 = { size: "1.125rem", borderRadius: "50%", borderWidth: "2px", background: "{content.background}", borderColor: "{primary.color}", content: { borderRadius: "50%", size: "0.375rem", background: "transparent", insetShadow: "none" } };
var t79 = { color: "{content.border.color}", size: "2px" };
var a83 = { event: e107, horizontal: r159, vertical: n70, eventMarker: o164, eventConnector: t79 };

// node_modules/@primeuix/themes/dist/lara/toast/index.mjs
var o165 = { width: "25rem", borderRadius: "{content.border.radius}", borderWidth: "0 0 0 6px", transitionDuration: "{transition.duration}" };
var r160 = { size: "1.25rem" };
var e108 = { padding: "{overlay.popover.padding}", gap: "0.5rem" };
var a84 = { gap: "0.5rem" };
var s21 = { fontWeight: "500", fontSize: "1rem" };
var c56 = { fontWeight: "500", fontSize: "0.875rem" };
var n71 = { width: "2rem", height: "2rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var l32 = { size: "1rem" };
var u12 = { light: { root: { blur: "1.5px" }, info: { background: "color-mix(in srgb, {blue.50}, transparent 5%)", borderColor: "{blue.500}", color: "{blue.600}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{blue.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {blue.200}" } } }, success: { background: "color-mix(in srgb, {green.50}, transparent 5%)", borderColor: "{green.500}", color: "{green.600}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{green.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {green.200}" } } }, warn: { background: "color-mix(in srgb,{yellow.50}, transparent 5%)", borderColor: "{yellow.500}", color: "{yellow.600}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{yellow.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {yellow.200}" } } }, error: { background: "color-mix(in srgb, {red.50}, transparent 5%)", borderColor: "{red.500}", color: "{red.600}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{red.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {red.200}" } } }, secondary: { background: "{surface.100}", borderColor: "{surface.500}", color: "{surface.600}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {surface.200}" } } }, contrast: { background: "{surface.900}", borderColor: "{primary.color}", color: "{surface.50}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.800}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem {surface.400}" } } } }, dark: { root: { blur: "10px" }, info: { background: "color-mix(in srgb, {blue.500}, transparent 84%)", borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)", color: "{blue.500}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {blue.500}, transparent 80%)" } } }, success: { background: "color-mix(in srgb, {green.500}, transparent 84%)", borderColor: "color-mix(in srgb, {green.700}, transparent 64%)", color: "{green.500}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {green.500}, transparent 80%)" } } }, warn: { background: "color-mix(in srgb, {yellow.500}, transparent 84%)", borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)", color: "{yellow.500}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {yellow.500}, transparent 80%)" } } }, error: { background: "color-mix(in srgb, {red.500}, transparent 84%)", borderColor: "color-mix(in srgb, {red.700}, transparent 64%)", color: "{red.500}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "rgba(255, 255, 255, 0.05)", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {red.500}, transparent 80%)" } } }, secondary: { background: "{surface.800}", borderColor: "{surface.700}", color: "{surface.300}", detailColor: "{surface.0}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.300}, transparent 80%)" } } }, contrast: { background: "{surface.0}", borderColor: "{surface.100}", color: "{surface.950}", detailColor: "{surface.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.100}", focusRing: { color: "{focus.ring.color}", shadow: "0 0 0 0.2rem color-mix(in srgb, {surface.950}, transparent 80%)" } } } } };
var d66 = { root: o165, icon: r160, content: e108, text: a84, summary: s21, detail: c56, closeButton: n71, closeIcon: l32, colorScheme: u12 };

// node_modules/@primeuix/themes/dist/lara/togglebutton/index.mjs
var o166 = { padding: "0.625rem 1rem", borderRadius: "{content.border.radius}", gap: "0.5rem", fontWeight: "500", background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", hoverColor: "{form.field.color}", checkedBackground: "{highlight.background}", checkedColor: "{highlight.color}", checkedBorderColor: "{form.field.border.color}", disabledBackground: "{form.field.disabled.background}", disabledBorderColor: "{form.field.disabled.background}", disabledColor: "{form.field.disabled.color}", invalidBorderColor: "{form.field.invalid.border.color}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", padding: "0.5rem 0.75rem" }, lg: { fontSize: "{form.field.lg.font.size}", padding: "0.75rem 1.25rem" } };
var r161 = { color: "{text.muted.color}", hoverColor: "{text.muted.color}", checkedColor: "{highlight.color}", disabledColor: "{form.field.disabled.color}" };
var d67 = { checkedBackground: "transparent", checkedShadow: "none", padding: "0", borderRadius: "0", sm: { padding: "0" }, lg: { padding: "0" } };
var e109 = { light: { root: { hoverBackground: "{surface.100}" } }, dark: { root: { hoverBackground: "{surface.800}" } } };
var i55 = { root: o166, icon: r161, content: d67, colorScheme: e109 };

// node_modules/@primeuix/themes/dist/lara/toggleswitch/index.mjs
var r162 = { width: "3rem", height: "1.75rem", borderRadius: "30px", gap: "0.25rem", shadow: "{form.field.shadow}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, borderWidth: "1px", borderColor: "transparent", hoverBorderColor: "transparent", checkedBorderColor: "transparent", checkedHoverBorderColor: "transparent", invalidBorderColor: "{form.field.invalid.border.color}", transitionDuration: "{form.field.transition.duration}", slideDuration: "0.2s" };
var o167 = { borderRadius: "50%", size: "1.25rem" };
var e110 = { light: { root: { background: "{surface.300}", disabledBackground: "{form.field.disabled.background}", hoverBackground: "{surface.400}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.0}", disabledBackground: "{form.field.disabled.color}", hoverBackground: "{surface.0}", checkedBackground: "{surface.0}", checkedHoverBackground: "{surface.0}", color: "{text.muted.color}", hoverColor: "{text.color}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } }, dark: { root: { background: "{surface.700}", disabledBackground: "{surface.600}", hoverBackground: "{surface.600}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}" }, handle: { background: "{surface.400}", disabledBackground: "{surface.900}", hoverBackground: "{surface.300}", checkedBackground: "{surface.900}", checkedHoverBackground: "{surface.900}", color: "{surface.900}", hoverColor: "{surface.800}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.hover.color}" } } };
var c57 = { root: r162, handle: o167, colorScheme: e110 };

// node_modules/@primeuix/themes/dist/lara/toolbar/index.mjs
var o168 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.75rem" };
var r163 = { light: { root: { background: "{surface.50}", color: "{content.color}" } }, dark: { root: { background: "{surface.800}", color: "{content.color}" } } };
var c58 = { root: o168, colorScheme: r163 };

// node_modules/@primeuix/themes/dist/lara/tooltip/index.mjs
var r164 = { maxWidth: "12.5rem", gutter: "0.25rem", shadow: "{overlay.popover.shadow}", padding: "0.625rem 0.75rem", borderRadius: "{overlay.popover.border.radius}" };
var o169 = { light: { root: { background: "{surface.700}", color: "{surface.0}" } }, dark: { root: { background: "{surface.700}", color: "{surface.0}" } } };
var e111 = { root: r164, colorScheme: o169 };

// node_modules/@primeuix/themes/dist/lara/tree/index.mjs
var o170 = { background: "{content.background}", color: "{content.color}", padding: "1rem", gap: "2px", indent: "1rem", transitionDuration: "{transition.duration}" };
var r165 = { padding: "0.375rem 0.625rem", borderRadius: "{content.border.radius}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.color}", hoverColor: "{text.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" }, gap: "0.25rem" };
var e112 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}" };
var t80 = { borderRadius: "50%", size: "1.75rem", hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedHoverColor: "{primary.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c59 = { size: "2rem" };
var n72 = { margin: "0 0 0.5rem 0" };
var d68 = { root: o170, node: r165, nodeIcon: e112, nodeToggleButton: t80, loadingIcon: c59, filter: n72 };

// node_modules/@primeuix/themes/dist/lara/treeselect/index.mjs
var o171 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r166 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d69 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l33 = { padding: "{list.padding}" };
var e113 = { padding: "{list.option.padding}" };
var i56 = { borderRadius: "{border.radius.sm}" };
var f19 = { color: "{form.field.icon.color}" };
var a85 = { root: o171, dropdown: r166, overlay: d69, tree: l33, emptyMessage: e113, chip: i56, clearIcon: f19 };

// node_modules/@primeuix/themes/dist/lara/treetable/index.mjs
var o172 = { transitionDuration: "{transition.duration}" };
var r167 = { borderColor: "{treetable.border.color}", borderWidth: "1px 0 1px 0", padding: "0.75rem 1rem" };
var e114 = { selectedBackground: "{highlight.background}", borderColor: "{treetable.border.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var t81 = { fontWeight: "700" };
var c60 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{sr.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var l34 = { borderColor: "{treetable.border.color}", padding: "0.75rem 1rem", gap: "0.5rem" };
var d70 = { borderColor: "{treetable.border.color}", padding: "0.75rem 1rem" };
var n73 = { fontWeight: "700" };
var a86 = { borderColor: "{treetable.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" };
var i57 = { width: "0.5rem" };
var s22 = { width: "1px", color: "{primary.color}" };
var g10 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var u13 = { size: "2rem" };
var h8 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var f20 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var b8 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var m7 = { light: { root: { borderColor: "{content.border.color}" }, header: { background: "{surface.50}", color: "{text.color}" }, headerCell: { background: "{surface.50}", hoverBackground: "{surface.100}", color: "{text.color}" }, footer: { background: "{surface.50}", color: "{text.color}" }, footerCell: { background: "{surface.50}", color: "{text.color}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.800}" }, header: { background: "{surface.800}", color: "{text.color}" }, headerCell: { background: "{surface.800}", hoverBackground: "{surface.700}", color: "{text.color}" }, footer: { background: "{surface.800}", color: "{text.color}" }, footerCell: { background: "{surface.800}", color: "{text.color}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var C = { root: o172, header: r167, headerCell: e114, columnTitle: t81, row: c60, bodyCell: l34, footerCell: d70, columnFooter: n73, footer: a86, columnResizer: i57, resizeIndicator: s22, sortIcon: g10, loadingIcon: u13, nodeToggleButton: h8, paginatorTop: f20, paginatorBottom: b8, colorScheme: m7 };

// node_modules/@primeuix/themes/dist/lara/virtualscroller/index.mjs
var o173 = { mask: { background: "{content.background}", color: "{text.muted.color}" }, icon: { size: "2rem" } };
var e115 = { loader: o173 };

// node_modules/@primeuix/themes/dist/lara/index.mjs
var r168 = Object.defineProperty;
var e116 = Object.defineProperties;
var m8 = Object.getOwnPropertyDescriptors;
var i58 = Object.getOwnPropertySymbols;
var t82 = Object.prototype.hasOwnProperty;
var a87 = Object.prototype.propertyIsEnumerable;
var o174 = (e173, m14, i90) => m14 in e173 ? r168(e173, m14, { enumerable: true, configurable: true, writable: true, value: i90 }) : e173[m14] = i90;
var Nr2;
var Qr2 = (Nr2 = ((r253, e173) => {
  for (var m14 in e173 || (e173 = {})) t82.call(e173, m14) && o174(r253, m14, e173[m14]);
  if (i58) for (var m14 of i58(e173)) a87.call(e173, m14) && o174(r253, m14, e173[m14]);
  return r253;
})({}, e63), e116(Nr2, m8({ components: { accordion: d34, autocomplete: a44, avatar: n39, badge: d36, blockui: o93, breadcrumb: t45, button: e64, datepicker: k5, card: d37, carousel: t47, cascadeselect: f12, checkbox: e67, chip: s14, colorpicker: d39, confirmdialog: r99, confirmpopup: a49, contextmenu: c33, dataview: a52, datatable: k4, dialog: e75, divider: t52, dock: d44, drawer: e77, editor: d46, fieldset: n46, fileupload: i38, iftalabel: i41, floatlabel: d48, galleria: l25, iconfield: r114, image: i42, imagecompare: o120, inlinemessage: a60, inplace: n50, inputchips: f16, inputgroup: d51, inputnumber: d52, inputotp: e85, inputtext: d53, knob: c41, listbox: n52, megamenu: u10, menu: r126, menubar: c43, message: u11, metergroup: b7, multiselect: n57, orderlist: o135, organizationchart: n58, overlaybadge: t66, popover: e96, paginator: n59, password: n62, panel: n60, panelmenu: a69, picklist: o142, progressbar: t70, progressspinner: r140, radiobutton: e98, rating: i49, ripple: o148, scrollpanel: a72, select: n63, selectbutton: d60, skeleton: o152, slider: a75, speeddial: a76, splitter: c48, splitbutton: d62, stepper: d63, steps: c50, tabmenu: i53, tabs: s20, tabview: e105, textarea: d65, tieredmenu: c55, tag: a81, terminal: e106, timeline: a83, togglebutton: i55, toggleswitch: c57, tree: d68, treeselect: a85, treetable: C, toast: d66, toolbar: c58, tooltip: e111, virtualscroller: e115 } })));

// node_modules/@primeuix/themes/dist/nora/accordion/index.mjs
var o175 = { transitionDuration: "{transition.duration}" };
var r169 = { borderWidth: "0", borderColor: "{content.border.color}" };
var t83 = { color: "{text.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}", padding: "1.125rem", fontWeight: "700", borderRadius: "0", borderWidth: "0 1px 1px 1px", borderColor: "{content.border.color}", background: "{content.background}", hoverBackground: "{content.hover.background}", activeBackground: "{content.background}", activeHoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-2px", shadow: "{focus.ring.shadow}" }, toggleIcon: { color: "{text.color}", hoverColor: "{text.color}", activeColor: "{text.color}", activeHoverColor: "{text.color}" }, first: { topBorderRadius: "{content.border.radius}", borderWidth: "1px" }, last: { bottomBorderRadius: "{content.border.radius}", activeBottomBorderRadius: "0" } };
var e117 = { borderWidth: "0 1px 1px 1px", borderColor: "{content.border.color}", background: "{content.background}", color: "{text.color}", padding: "1.125rem" };
var c61 = { root: o175, panel: r169, header: t83, content: e117 };

// node_modules/@primeuix/themes/dist/nora/autocomplete/index.mjs
var o176 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r170 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var d71 = { padding: "{list.padding}", gap: "{list.gap}" };
var e118 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var l35 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var i59 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, background: "{form.field.background}", color: "{form.field.icon.color}", hoverColor: "{form.field.icon.color}", activeColor: "{form.field.icon.color}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c62 = { borderRadius: "{border.radius.xs}" };
var f21 = { padding: "{list.option.padding}" };
var s23 = { light: { chip: { focusBackground: "{surface.300}", focusColor: "{surface.900}" }, dropdown: { hoverBackground: "{surface.200}", activeBackground: "{surface.300}" } }, dark: { chip: { focusBackground: "{surface.600}", focusColor: "{surface.0}" }, dropdown: { hoverBackground: "{surface.700}", activeBackground: "{surface.600}" } } };
var a88 = { root: o176, overlay: r170, list: d71, option: e118, optionGroup: l35, dropdown: i59, chip: c62, emptyMessage: f21, colorScheme: s23 };

// node_modules/@primeuix/themes/dist/nora/avatar/index.mjs
var e119 = { width: "2rem", height: "2rem", fontSize: "1rem", background: "{content.hover.background}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var r171 = { size: "1rem" };
var o177 = { borderColor: "{content.background}", offset: "-0.75rem" };
var t84 = { width: "3rem", height: "3rem", fontSize: "1.5rem", icon: { size: "1.5rem" }, group: { offset: "-1rem" } };
var i60 = { width: "4rem", height: "4rem", fontSize: "2rem", icon: { size: "2rem" }, group: { offset: "-1.5rem" } };
var n74 = { root: e119, icon: r171, group: o177, lg: t84, xl: i60 };

// node_modules/@primeuix/themes/dist/nora/badge/index.mjs
var r172 = { borderRadius: "{border.radius.md}", padding: "0 0.5rem", fontSize: "0.75rem", fontWeight: "700", minWidth: "1.5rem", height: "1.5rem" };
var o178 = { size: "0.5rem" };
var e120 = { fontSize: "0.625rem", minWidth: "1.25rem", height: "1.25rem" };
var c63 = { fontSize: "0.875rem", minWidth: "1.75rem", height: "1.75rem" };
var a89 = { fontSize: "1rem", minWidth: "2rem", height: "2rem" };
var n75 = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.200}", color: "{surface.700}" }, success: { background: "{green.600}", color: "{surface.0}" }, info: { background: "{sky.600}", color: "{surface.0}" }, warn: { background: "{orange.600}", color: "{surface.0}" }, danger: { background: "{red.600}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.700}", color: "{surface.200}" }, success: { background: "{green.500}", color: "{green.950}" }, info: { background: "{sky.500}", color: "{sky.950}" }, warn: { background: "{orange.500}", color: "{orange.950}" }, danger: { background: "{red.500}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var d72 = { root: r172, dot: o178, sm: e120, lg: c63, xl: a89, colorScheme: n75 };

// node_modules/@primeuix/themes/dist/nora/base/index.mjs
var o179 = { borderRadius: { none: "0", xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "12px" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337", 950: "#4c0519" }, slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" } };
var r173 = { transitionDuration: "0s", focusRing: { width: "2px", style: "solid", color: "{primary.color}", offset: "2px", shadow: "none" }, disabledOpacity: "0.6", iconSize: "1rem", anchorGutter: "0", primary: { 50: "{emerald.50}", 100: "{emerald.100}", 200: "{emerald.200}", 300: "{emerald.300}", 400: "{emerald.400}", 500: "{emerald.500}", 600: "{emerald.600}", 700: "{emerald.700}", 800: "{emerald.800}", 900: "{emerald.900}", 950: "{emerald.950}" }, formField: { paddingX: "0.75rem", paddingY: "0.5rem", sm: { fontSize: "0.875rem", paddingX: "0.625rem", paddingY: "0.375rem" }, lg: { fontSize: "1.125rem", paddingX: "0.875rem", paddingY: "0.625rem" }, borderRadius: "{border.radius.xs}", focusRing: { width: "2px", style: "solid", color: "{primary.color}", offset: "-1px", shadow: "none" }, transitionDuration: "{transition.duration}" }, list: { padding: "0.125rem 0", gap: "0", header: { padding: "0.5rem 0.75rem 0.375rem 0.75rem" }, option: { padding: "0.5rem 0.75rem", borderRadius: "0" }, optionGroup: { padding: "0.5rem 0.75rem", fontWeight: "700" } }, content: { borderRadius: "{border.radius.xs}" }, mask: { transitionDuration: "0.3s" }, navigation: { list: { padding: "0.125rem 0", gap: "0" }, item: { padding: "0.5rem 0.75rem", borderRadius: "0", gap: "0.5rem" }, submenuLabel: { padding: "0.5rem 0.75rem", fontWeight: "700" }, submenuIcon: { size: "0.875rem" } }, overlay: { select: { borderRadius: "{border.radius.xs}", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, popover: { borderRadius: "{border.radius.xs}", padding: "0.75rem", shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" }, modal: { borderRadius: "{border.radius.xs}", padding: "1.25rem", shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }, navigation: { shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" } }, colorScheme: { light: { surface: { 0: "#ffffff", 50: "{slate.50}", 100: "{slate.100}", 200: "{slate.200}", 300: "{slate.300}", 400: "{slate.400}", 500: "{slate.500}", 600: "{slate.600}", 700: "{slate.700}", 800: "{slate.800}", 900: "{slate.900}", 950: "{slate.950}" }, primary: { color: "{primary.600}", contrastColor: "#ffffff", hoverColor: "{primary.700}", activeColor: "{primary.800}" }, highlight: { background: "{primary.600}", focusBackground: "{primary.700}", color: "#ffffff", focusColor: "#ffffff" }, mask: { background: "rgba(0,0,0,0.4)", color: "{surface.200}" }, formField: { background: "{surface.0}", disabledBackground: "{surface.300}", filledBackground: "{surface.100}", filledHoverBackground: "{surface.100}", filledFocusBackground: "{surface.100}", borderColor: "{surface.500}", hoverBorderColor: "{surface.500}", focusBorderColor: "{surface.500}", invalidBorderColor: "{red.500}", color: "{surface.900}", disabledColor: "{surface.600}", placeholderColor: "{surface.600}", invalidPlaceholderColor: "{red.600}", floatLabelColor: "{surface.600}", floatLabelFocusColor: "{primary.color}", floatLabelActiveColor: "{surface.600}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.900}", shadow: "none" }, text: { color: "{surface.900}", hoverColor: "{surface.950}", mutedColor: "{surface.600}", hoverMutedColor: "{surface.700}" }, content: { background: "{surface.0}", hoverBackground: "{surface.200}", borderColor: "{surface.400}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.0}", borderColor: "transparent", color: "{text.color}" }, popover: { background: "{surface.0}", borderColor: "transparent", color: "{text.color}" }, modal: { background: "{surface.0}", borderColor: "transparent", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.200}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{text.muted.color}", focusColor: "{text.hover.muted.color}" } }, optionGroup: { background: "transparent", color: "{text.color}" } }, navigation: { item: { focusBackground: "{primary.color}", activeBackground: "{surface.200}", color: "{text.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.hover.color}", icon: { color: "{text.muted.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.hover.muted.color}" } }, submenuLabel: { background: "transparent", color: "{text.color}" }, submenuIcon: { color: "{text.muted.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.hover.muted.color}" } } }, dark: { surface: { 0: "#ffffff", 50: "{zinc.50}", 100: "{zinc.100}", 200: "{zinc.200}", 300: "{zinc.300}", 400: "{zinc.400}", 500: "{zinc.500}", 600: "{zinc.600}", 700: "{zinc.700}", 800: "{zinc.800}", 900: "{zinc.900}", 950: "{zinc.950}" }, primary: { color: "{primary.500}", contrastColor: "{surface.950}", hoverColor: "{primary.400}", activeColor: "{primary.300}" }, highlight: { background: "{primary.500}", focusBackground: "{primary.400}", color: "{surface.950}", focusColor: "{surface.950}" }, mask: { background: "rgba(0,0,0,0.6)", color: "{surface.200}" }, formField: { background: "{surface.950}", disabledBackground: "{surface.700}", filledBackground: "{surface.800}", filledHoverBackground: "{surface.800}", filledFocusBackground: "{surface.800}", borderColor: "{surface.500}", hoverBorderColor: "{surface.500}", focusBorderColor: "{surface.500}", invalidBorderColor: "{red.400}", color: "{surface.0}", disabledColor: "{surface.400}", placeholderColor: "{surface.400}", invalidPlaceholderColor: "{red.400}", floatLabelColor: "{surface.400}", floatLabelFocusColor: "{primary.color}", floatLabelActiveColor: "{surface.400}", floatLabelInvalidColor: "{form.field.invalid.placeholder.color}", iconColor: "{surface.0}", shadow: "none" }, text: { color: "{surface.0}", hoverColor: "{surface.0}", mutedColor: "{surface.400}", hoverMutedColor: "{surface.300}" }, content: { background: "{surface.900}", hoverBackground: "{surface.700}", borderColor: "{surface.500}", color: "{text.color}", hoverColor: "{text.hover.color}" }, overlay: { select: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, popover: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" }, modal: { background: "{surface.900}", borderColor: "{surface.700}", color: "{text.color}" } }, list: { option: { focusBackground: "{surface.700}", selectedBackground: "{highlight.background}", selectedFocusBackground: "{highlight.focus.background}", color: "{text.color}", focusColor: "{text.hover.color}", selectedColor: "{highlight.color}", selectedFocusColor: "{highlight.focus.color}", icon: { color: "{text.muted.color}", focusColor: "{text.hover.muted.color}" } }, optionGroup: { background: "transparent", color: "{text.color}" } }, navigation: { item: { focusBackground: "{primary.color}", activeBackground: "{surface.700}", color: "{text.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.color}", icon: { color: "{text.muted.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.hover.muted.color}" } }, submenuLabel: { background: "transparent", color: "{text.color}" }, submenuIcon: { color: "{text.muted.color}", focusColor: "{primary.contrast.color}", activeColor: "{text.hover.muted.color}" } } } } };
var e121 = { primitive: o179, semantic: r173 };

// node_modules/@primeuix/themes/dist/nora/blockui/index.mjs
var r174 = { borderRadius: "{content.border.radius}" };
var o180 = { root: r174 };

// node_modules/@primeuix/themes/dist/nora/breadcrumb/index.mjs
var o181 = { padding: "1rem", background: "{content.background}", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r175 = { color: "{text.muted.color}", hoverColor: "{text.color}", borderRadius: "{content.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{text.muted.color}", hoverColor: "{text.color}" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t85 = { color: "{navigation.item.icon.color}" };
var i61 = { root: o181, item: r175, separator: t85 };

// node_modules/@primeuix/themes/dist/nora/button/index.mjs
var r176 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", gap: "0.5rem", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", iconOnlyWidth: "2.5rem", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}", iconOnlyWidth: "2rem" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}", iconOnlyWidth: "3rem" }, label: { fontWeight: "700" }, raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" }, badgeSize: "1rem", transitionDuration: "{form.field.transition.duration}" };
var o182 = { light: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.200}", hoverBackground: "{surface.300}", activeBackground: "{surface.400}", borderColor: "{surface.200}", hoverBorderColor: "{surface.300}", activeBorderColor: "{surface.400}", color: "{surface.700}", hoverColor: "{surface.800}", activeColor: "{surface.900}", focusRing: { color: "{surface.700}", shadow: "none" } }, info: { background: "{sky.600}", hoverBackground: "{sky.700}", activeBackground: "{sky.800}", borderColor: "{sky.600}", hoverBorderColor: "{sky.700}", activeBorderColor: "{sky.800}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{sky.600}", shadow: "none" } }, success: { background: "{green.600}", hoverBackground: "{green.700}", activeBackground: "{green.800}", borderColor: "{green.600}", hoverBorderColor: "{green.700}", activeBorderColor: "{green.800}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{green.600}", shadow: "none" } }, warn: { background: "{orange.600}", hoverBackground: "{orange.700}", activeBackground: "{orange.800}", borderColor: "{orange.600}", hoverBorderColor: "{orange.700}", activeBorderColor: "{orange.800}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{orange.600}", shadow: "none" } }, help: { background: "{purple.600}", hoverBackground: "{purple.700}", activeBackground: "{purple.800}", borderColor: "{purple.600}", hoverBorderColor: "{purple.700}", activeBorderColor: "{purple.800}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{purple.600}", shadow: "none" } }, danger: { background: "{red.600}", hoverBackground: "{red.700}", activeBackground: "{red.800}", borderColor: "{red.600}", hoverBorderColor: "{red.700}", activeBorderColor: "{red.800}", color: "#ffffff", hoverColor: "#ffffff", activeColor: "#ffffff", focusRing: { color: "{red.600}", shadow: "none" } }, contrast: { background: "{surface.950}", hoverBackground: "{surface.900}", activeBackground: "{surface.800}", borderColor: "{surface.950}", hoverBorderColor: "{surface.900}", activeBorderColor: "{surface.800}", color: "{surface.0}", hoverColor: "{surface.0}", activeColor: "{surface.0}", focusRing: { color: "{surface.950}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", borderColor: "{primary.color}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.600}", color: "{surface.600}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", borderColor: "{green.600}", color: "{green.600}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", borderColor: "{sky.600}", color: "{sky.600}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", borderColor: "{orange.600}", color: "{orange.600}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", borderColor: "{purple.600}", color: "{purple.600}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", borderColor: "{red.600}", color: "{red.600}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.950}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", borderColor: "{surface.900}", color: "{surface.900}" } }, text: { primary: { hoverBackground: "{primary.50}", activeBackground: "{primary.100}", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.600}" }, success: { hoverBackground: "{green.50}", activeBackground: "{green.100}", color: "{green.600}" }, info: { hoverBackground: "{sky.50}", activeBackground: "{sky.100}", color: "{sky.600}" }, warn: { hoverBackground: "{orange.50}", activeBackground: "{orange.100}", color: "{orange.600}" }, help: { hoverBackground: "{purple.50}", activeBackground: "{purple.100}", color: "{purple.600}" }, danger: { hoverBackground: "{red.50}", activeBackground: "{red.100}", color: "{red.600}" }, contrast: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.950}" }, plain: { hoverBackground: "{surface.50}", activeBackground: "{surface.100}", color: "{surface.900}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } }, dark: { root: { primary: { background: "{primary.color}", hoverBackground: "{primary.hover.color}", activeBackground: "{primary.active.color}", borderColor: "{primary.color}", hoverBorderColor: "{primary.hover.color}", activeBorderColor: "{primary.active.color}", color: "{primary.contrast.color}", hoverColor: "{primary.contrast.color}", activeColor: "{primary.contrast.color}", focusRing: { color: "{primary.color}", shadow: "none" } }, secondary: { background: "{surface.700}", hoverBackground: "{surface.600}", activeBackground: "{surface.500}", borderColor: "{surface.700}", hoverBorderColor: "{surface.600}", activeBorderColor: "{surface.500}", color: "{surface.200}", hoverColor: "{surface.100}", activeColor: "{surface.0}", focusRing: { color: "{surface.200}", shadow: "none" } }, info: { background: "{sky.500}", hoverBackground: "{sky.400}", activeBackground: "{sky.300}", borderColor: "{sky.500}", hoverBorderColor: "{sky.400}", activeBorderColor: "{sky.300}", color: "{sky.950}", hoverColor: "{sky.950}", activeColor: "{sky.950}", focusRing: { color: "{sky.500}", shadow: "none" } }, success: { background: "{green.500}", hoverBackground: "{green.400}", activeBackground: "{green.300}", borderColor: "{green.500}", hoverBorderColor: "{green.400}", activeBorderColor: "{green.300}", color: "{green.950}", hoverColor: "{green.950}", activeColor: "{green.950}", focusRing: { color: "{green.500}", shadow: "none" } }, warn: { background: "{orange.500}", hoverBackground: "{orange.400}", activeBackground: "{orange.300}", borderColor: "{orange.500}", hoverBorderColor: "{orange.400}", activeBorderColor: "{orange.300}", color: "{orange.950}", hoverColor: "{orange.950}", activeColor: "{orange.950}", focusRing: { color: "{orange.500}", shadow: "none" } }, help: { background: "{purple.500}", hoverBackground: "{purple.400}", activeBackground: "{purple.300}", borderColor: "{purple.500}", hoverBorderColor: "{purple.400}", activeBorderColor: "{purple.300}", color: "{purple.950}", hoverColor: "{purple.950}", activeColor: "{purple.950}", focusRing: { color: "{purple.500}", shadow: "none" } }, danger: { background: "{red.500}", hoverBackground: "{red.400}", activeBackground: "{red.300}", borderColor: "{red.500}", hoverBorderColor: "{red.400}", activeBorderColor: "{red.300}", color: "{red.950}", hoverColor: "{red.950}", activeColor: "{red.950}", focusRing: { color: "{red.500}", shadow: "none" } }, contrast: { background: "{surface.0}", hoverBackground: "{surface.100}", activeBackground: "{surface.200}", borderColor: "{surface.0}", hoverBorderColor: "{surface.100}", activeBorderColor: "{surface.200}", color: "{surface.950}", hoverColor: "{surface.950}", activeColor: "{surface.950}", focusRing: { color: "{surface.0}", shadow: "none" } } }, outlined: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", borderColor: "{primary.color}", color: "{primary.color}" }, secondary: { hoverBackground: "rgba(255,255,255,0.04)", activeBackground: "rgba(255,255,255,0.16)", borderColor: "{surface.400}", color: "{surface.400}" }, success: { hoverBackground: "{green.950}", activeBackground: "{green.900}", borderColor: "{green.500}", color: "{green.500}" }, info: { hoverBackground: "{sky.950}", activeBackground: "{sky.900}", borderColor: "{sky.500}", color: "{sky.500}" }, warn: { hoverBackground: "{orange.950}", activeBackground: "{orange.900}", borderColor: "{orange.500}", color: "{orange.500}" }, help: { hoverBackground: "{purple.950}", activeBackground: "{purple.900}", borderColor: "{purple.500}", color: "{purple.500}" }, danger: { hoverBackground: "{red.950}", activeBackground: "{red.900}", borderColor: "{red.500}", color: "{red.500}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.0}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", borderColor: "{surface.0}", color: "{surface.0}" } }, text: { primary: { hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)", activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)", color: "{primary.color}" }, secondary: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.400}" }, success: { hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)", color: "{green.500}" }, info: { hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)", color: "{sky.500}" }, warn: { hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)", color: "{orange.500}" }, help: { hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)", color: "{purple.500}" }, danger: { hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)", activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)", color: "{red.500}" }, contrast: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" }, plain: { hoverBackground: "{surface.800}", activeBackground: "{surface.700}", color: "{surface.0}" } }, link: { color: "{primary.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" } } };
var e122 = { root: r176, colorScheme: o182 };

// node_modules/@primeuix/themes/dist/nora/card/index.mjs
var o183 = { background: "{content.background}", borderRadius: "{border.radius.sm}", color: "{content.color}", shadow: "0 1px 4px 0 rgba(0, 0, 0, 0.1)" };
var r177 = { padding: "1.25rem", gap: "0.5rem" };
var t86 = { gap: "0.5rem" };
var e123 = { fontSize: "1.25rem", fontWeight: "500" };
var a90 = { color: "{text.muted.color}" };
var d73 = { root: o183, body: r177, caption: t86, title: e123, subtitle: a90 };

// node_modules/@primeuix/themes/dist/nora/carousel/index.mjs
var r178 = { transitionDuration: "{transition.duration}" };
var o184 = { gap: "0.25rem" };
var a91 = { padding: "1rem", gap: "0.5rem" };
var i62 = { width: "2rem", height: "0.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c64 = { light: { indicator: { background: "{surface.300}", hoverBackground: "{surface.400}", activeBackground: "{primary.color}" } }, dark: { indicator: { background: "{surface.600}", hoverBackground: "{surface.500}", activeBackground: "{primary.color}" } } };
var t87 = { root: r178, content: o184, indicatorList: a91, indicator: i62, colorScheme: c64 };

// node_modules/@primeuix/themes/dist/nora/cascadeselect/index.mjs
var o185 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r179 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d74 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l36 = { padding: "{list.padding}", gap: "{list.gap}", mobileIndent: "1rem" };
var e124 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", icon: { color: "{list.option.icon.color}", focusColor: "{list.option.icon.focus.color}", size: "0.875rem" } };
var i63 = { color: "{form.field.icon.color}" };
var f22 = { root: o185, dropdown: r179, overlay: d74, list: l36, option: e124, clearIcon: i63 };

// node_modules/@primeuix/themes/dist/nora/checkbox/index.mjs
var r180 = { borderRadius: "{border.radius.xs}", width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.hover.color}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.hover.color}", checkedFocusBorderColor: "{primary.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } };
var o186 = { size: "0.875rem", color: "{form.field.color}", checkedColor: "{primary.contrast.color}", checkedHoverColor: "{primary.contrast.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.75rem" }, lg: { size: "1rem" } };
var e125 = { root: r180, icon: o186 };

// node_modules/@primeuix/themes/dist/nora/chip/index.mjs
var o187 = { borderRadius: "16px", paddingX: "0.75rem", paddingY: "0.5rem", gap: "0.5rem", transitionDuration: "{transition.duration}" };
var r181 = { width: "2rem", height: "2rem" };
var e126 = { size: "1rem" };
var c65 = { size: "1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" } };
var i64 = { light: { root: { background: "{surface.200}", color: "{surface.900}" }, icon: { color: "{surface.900}" }, removeIcon: { color: "{surface.900}" } }, dark: { root: { background: "{surface.700}", color: "{surface.0}" }, icon: { color: "{surface.0}" }, removeIcon: { color: "{surface.0}" } } };
var s24 = { root: o187, image: r181, icon: e126, removeIcon: c65, colorScheme: i64 };

// node_modules/@primeuix/themes/dist/nora/colorpicker/index.mjs
var r182 = { transitionDuration: "{transition.duration}" };
var o188 = { width: "1.5rem", height: "1.5rem", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e127 = { shadow: "{overlay.popover.shadow}", borderRadius: "{overlay.popover.borderRadius}" };
var a92 = { light: { panel: { background: "{surface.800}", borderColor: "{surface.900}" }, handle: { color: "{surface.0}" } }, dark: { panel: { background: "{surface.900}", borderColor: "{surface.700}" }, handle: { color: "{surface.0}" } } };
var s25 = { root: r182, preview: o188, panel: e127, colorScheme: a92 };

// node_modules/@primeuix/themes/dist/nora/confirmdialog/index.mjs
var o189 = { size: "2rem", color: "{overlay.modal.color}" };
var e128 = { gap: "1rem" };
var r183 = { icon: o189, content: e128 };

// node_modules/@primeuix/themes/dist/nora/confirmpopup/index.mjs
var o190 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r184 = { padding: "{overlay.popover.padding}", gap: "1rem" };
var e129 = { size: "1.5rem", color: "{overlay.popover.color}" };
var p7 = { gap: "0.5rem", padding: "0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}" };
var a93 = { root: o190, content: r184, icon: e129, footer: p7 };

// node_modules/@primeuix/themes/dist/nora/contextmenu/index.mjs
var o191 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i65 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n76 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a94 = { mobileIndent: "1rem" };
var t88 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r185 = { borderColor: "{content.border.color}" };
var c66 = { root: o191, list: i65, item: n76, submenu: a94, submenuIcon: t88, separator: r185 };

// node_modules/@primeuix/themes/dist/nora/datatable/index.mjs
var o192 = { transitionDuration: "{transition.duration}" };
var r186 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "1px 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var e130 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{datatable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" }, sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var d75 = { fontWeight: "700" };
var t89 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var l37 = { borderColor: "{datatable.border.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var c67 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var n77 = { fontWeight: "700" };
var a95 = { background: "{content.background}", borderColor: "{datatable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", sm: { padding: "0.375rem 0.5rem" }, lg: { padding: "1rem 1.25rem" } };
var i66 = { color: "{primary.color}" };
var s26 = { width: "0.5rem" };
var g11 = { width: "1px", color: "{primary.color}" };
var u14 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var p8 = { size: "2rem" };
var b9 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var m9 = { inlineGap: "0.5rem", overlaySelect: { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" }, overlayPopover: { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}", gap: "0.5rem" }, rule: { borderColor: "{content.border.color}" }, constraintList: { padding: "{list.padding}", gap: "{list.gap}" }, constraint: { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", separator: { borderColor: "{content.border.color}" }, padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" } };
var h9 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var f23 = { borderColor: "{datatable.border.color}", borderWidth: "0 0 1px 0" };
var v6 = { light: { root: { borderColor: "{surface.300}" }, row: { stripedBackground: "{surface.50}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.600}" }, row: { stripedBackground: "{surface.950}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var k6 = { root: o192, header: r186, headerCell: e130, columnTitle: d75, row: t89, bodyCell: l37, footerCell: c67, columnFooter: n77, footer: a95, dropPoint: i66, columnResizer: s26, resizeIndicator: g11, sortIcon: u14, loadingIcon: p8, rowToggleButton: b9, filter: m9, paginatorTop: h9, paginatorBottom: f23, colorScheme: v6 };

// node_modules/@primeuix/themes/dist/nora/dataview/index.mjs
var o193 = { borderColor: "transparent", borderWidth: "0", borderRadius: "0", padding: "0" };
var r187 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", borderRadius: "0" };
var d76 = { background: "{content.background}", color: "{content.color}", borderColor: "transparent", borderWidth: "0", padding: "0", borderRadius: "0" };
var e131 = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "1px 0 0 0", padding: "0.75rem 1rem", borderRadius: "0" };
var t90 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var n78 = { borderColor: "{content.border.color}", borderWidth: "1px 0 0 0" };
var c68 = { root: o193, header: r187, content: d76, footer: e131, paginatorTop: t90, paginatorBottom: n78 };

// node_modules/@primeuix/themes/dist/nora/datepicker/index.mjs
var o194 = { transitionDuration: "{transition.duration}" };
var r188 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}" };
var e132 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", padding: "0 0 0.5rem 0" };
var d77 = { gap: "0.5rem", fontWeight: "500" };
var c69 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, background: "{form.field.background}", color: "{form.field.icon.color}", hoverColor: "{form.field.icon.color}", activeColor: "{form.field.icon.color}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var n79 = { color: "{form.field.icon.color}" };
var t91 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" };
var a96 = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" };
var i67 = { borderColor: "{content.border.color}", gap: "{overlay.popover.padding}" };
var l38 = { margin: "0.5rem 0 0 0" };
var g12 = { padding: "0.25rem", fontWeight: "500", color: "{content.color}" };
var u15 = { hoverBackground: "{content.hover.background}", selectedBackground: "{primary.color}", rangeSelectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{primary.contrast.color}", rangeSelectedColor: "{highlight.color}", width: "2rem", height: "2rem", borderRadius: "50%", padding: "0.25rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var s27 = { margin: "0.5rem 0 0 0" };
var f24 = { padding: "0.375rem", borderRadius: "{content.border.radius}" };
var h10 = { margin: "0.5rem 0 0 0" };
var b10 = { padding: "0.375rem", borderRadius: "{content.border.radius}" };
var m10 = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}" };
var p9 = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}", gap: "0.5rem", buttonGap: "0.25rem" };
var v7 = { light: { dropdown: { hoverBackground: "{surface.200}", activeBackground: "{surface.300}" }, today: { background: "{surface.200}", color: "{surface.900}" } }, dark: { dropdown: { hoverBackground: "{surface.700}", activeBackground: "{surface.600}" }, today: { background: "{surface.700}", color: "{surface.0}" } } };
var k7 = { root: o194, panel: r188, header: e132, title: d77, dropdown: c69, inputIcon: n79, selectMonth: t91, selectYear: a96, group: i67, dayView: l38, weekDay: g12, date: u15, monthView: s27, month: f24, yearView: h10, year: b10, buttonbar: m10, timePicker: p9, colorScheme: v7 };

// node_modules/@primeuix/themes/dist/nora/dialog/index.mjs
var o195 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", borderRadius: "{overlay.modal.border.radius}", shadow: "{overlay.modal.shadow}" };
var a97 = { padding: "{overlay.modal.padding}", gap: "0.5rem" };
var d78 = { fontSize: "1.25rem", fontWeight: "700" };
var r189 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l39 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}", gap: "0.5rem" };
var e133 = { root: o195, header: a97, title: d78, content: r189, footer: l39 };

// node_modules/@primeuix/themes/dist/nora/divider/index.mjs
var r190 = { borderColor: "{content.border.color}" };
var o196 = { background: "{content.background}", color: "{text.color}" };
var n80 = { margin: "1rem 0", padding: "0 1rem", content: { padding: "0 0.5rem" } };
var e134 = { margin: "0 1rem", padding: "0.5rem 0", content: { padding: "0.5rem 0" } };
var t92 = { root: r190, content: o196, horizontal: n80, vertical: e134 };

// node_modules/@primeuix/themes/dist/nora/dock/index.mjs
var r191 = { background: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)", padding: "0.5rem", borderRadius: "{border.radius.xl}" };
var o197 = { borderRadius: "{content.border.radius}", padding: "0.5rem", size: "3rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var d79 = { root: r191, item: o197 };

// node_modules/@primeuix/themes/dist/nora/drawer/index.mjs
var o198 = { background: "{overlay.modal.background}", borderColor: "{overlay.modal.border.color}", color: "{overlay.modal.color}", shadow: "{overlay.modal.shadow}" };
var a98 = { padding: "{overlay.modal.padding}" };
var d80 = { fontSize: "1.5rem", fontWeight: "700" };
var r192 = { padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}" };
var l40 = { padding: "{overlay.modal.padding}" };
var e135 = { root: o198, header: a98, title: d80, content: r192, footer: l40 };

// node_modules/@primeuix/themes/dist/nora/editor/index.mjs
var o199 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}" };
var r193 = { color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var e136 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}", padding: "{list.padding}" };
var t93 = { focusBackground: "{list.option.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var d81 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var l41 = { toolbar: o199, toolbarItem: r193, overlay: e136, overlayOption: t93, content: d81 };

// node_modules/@primeuix/themes/dist/nora/fieldset/index.mjs
var o200 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", padding: "0.75rem 1.125rem 1.125rem 1.125rem", transitionDuration: "{transition.duration}" };
var r194 = { background: "{content.background}", hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", borderRadius: "{content.border.radius}", borderWidth: "1px", borderColor: "{content.border.color}", padding: "0.5rem 0.75rem", gap: "0.5rem", fontWeight: "700", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e137 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}" };
var t94 = { padding: "0" };
var n81 = { root: o200, legend: r194, toggleIcon: e137, content: t94 };

// node_modules/@primeuix/themes/dist/nora/fileupload/index.mjs
var r195 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var o201 = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderColor: "unset", borderWidth: "0", borderRadius: "0", gap: "0.5rem" };
var e138 = { highlightBorderColor: "{primary.color}", padding: "0 1.125rem 1.125rem 1.125rem", gap: "1rem" };
var t95 = { padding: "1rem", gap: "1rem", borderColor: "{content.border.color}", info: { gap: "0.5rem" } };
var a99 = { gap: "0.5rem" };
var n82 = { height: "0.25rem" };
var d82 = { gap: "0.5rem" };
var i68 = { root: r195, header: o201, content: e138, file: t95, fileList: a99, progressbar: n82, basic: d82 };

// node_modules/@primeuix/themes/dist/nora/floatlabel/index.mjs
var o202 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", activeColor: "{form.field.float.label.active.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", positionY: "{form.field.padding.y}", fontWeight: "500", active: { fontSize: "0.75rem", fontWeight: "400" } };
var i69 = { active: { top: "-1.25rem" } };
var r196 = { input: { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" }, active: { top: "{form.field.padding.y}" } };
var a100 = { borderRadius: "{border.radius.xs}", active: { background: "{form.field.background}", padding: "0 0.125rem" } };
var d83 = { root: o202, over: i69, in: r196, on: a100 };

// node_modules/@primeuix/themes/dist/nora/galleria/index.mjs
var o203 = { borderWidth: "1px", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", transitionDuration: "{transition.duration}" };
var r197 = { background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.100}", hoverColor: "{surface.0}", size: "3rem", gutter: "0.5rem", prev: { borderRadius: "50%" }, next: { borderRadius: "50%" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t96 = { size: "1.5rem" };
var e139 = { background: "{content.background}", padding: "1rem 0.25rem" };
var c70 = { size: "2rem", borderRadius: "{content.border.radius}", gutter: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var n83 = { size: "1rem" };
var a101 = { background: "rgba(0, 0, 0, 0.5)", color: "{surface.100}", padding: "1rem" };
var s28 = { gap: "0.5rem", padding: "1rem" };
var u16 = { width: "1rem", height: "1rem", activeBackground: "{primary.color}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i70 = { background: "rgba(0, 0, 0, 0.5)" };
var d84 = { background: "rgba(255, 255, 255, 0.4)", hoverBackground: "rgba(255, 255, 255, 0.6)", activeBackground: "rgba(255, 255, 255, 0.9)" };
var g13 = { size: "3rem", gutter: "0.5rem", background: "rgba(255, 255, 255, 0.1)", hoverBackground: "rgba(255, 255, 255, 0.2)", color: "{surface.50}", hoverColor: "{surface.0}", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var f25 = { size: "1.5rem" };
var l42 = { light: { thumbnailNavButton: { hoverBackground: "{surface.200}", color: "{text.color}", hoverColor: "{text.hover.color}" }, indicatorButton: { background: "{surface.300}", hoverBackground: "{surface.400}" } }, dark: { thumbnailNavButton: { hoverBackground: "{surface.700}", color: "{surface.0}", hoverColor: "{surface.0}" }, indicatorButton: { background: "{surface.600}", hoverBackground: "{surface.500}" } } };
var h11 = { root: o203, navButton: r197, navIcon: t96, thumbnailsContent: e139, thumbnailNavButton: c70, thumbnailNavButtonIcon: n83, caption: a101, indicatorList: s28, indicatorButton: u16, insetIndicatorList: i70, insetIndicatorButton: d84, closeButton: g13, closeButtonIcon: f25, colorScheme: l42 };

// node_modules/@primeuix/themes/dist/nora/iconfield/index.mjs
var o204 = { color: "{form.field.icon.color}" };
var r198 = { icon: o204 };

// node_modules/@primeuix/themes/dist/nora/iftalabel/index.mjs
var o205 = { color: "{form.field.float.label.color}", focusColor: "{form.field.float.label.focus.color}", invalidColor: "{form.field.float.label.invalid.color}", transitionDuration: "0.2s", positionX: "{form.field.padding.x}", top: "{form.field.padding.y}", fontSize: "0.75rem", fontWeight: "400" };
var l43 = { paddingTop: "1.5rem", paddingBottom: "{form.field.padding.y}" };
var i71 = { root: o205, input: l43 };

// node_modules/@primeuix/themes/dist/nora/image/index.mjs
var o206 = { transitionDuration: "{transition.duration}" };
var r199 = { icon: { size: "1.5rem" }, mask: { background: "{mask.background}", color: "{mask.color}" } };
var a102 = { position: { left: "auto", right: "1rem", top: "1rem", bottom: "auto" }, blur: "8px", background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px", borderRadius: "{content.border.radius}", padding: ".5rem", gap: "0.5rem" };
var e140 = { hoverBackground: "rgba(255,255,255,0.1)", color: "{surface.50}", hoverColor: "{surface.0}", size: "3rem", iconSize: "1.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i72 = { root: o206, preview: r199, toolbar: a102, action: e140 };

// node_modules/@primeuix/themes/dist/nora/imagecompare/index.mjs
var r200 = { size: "15px", hoverSize: "30px", background: "rgba(255,255,255,0.3)", hoverBackground: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.3)", hoverBorderColor: "rgba(255,255,255,0.3)", borderWidth: "3px", borderRadius: "{content.border.radius}", transitionDuration: "0.2s", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "rgba(255,255,255,0.3)", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var o207 = { handle: r200 };

// node_modules/@primeuix/themes/dist/nora/inlinemessage/index.mjs
var o208 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", gap: "0.5rem" };
var r201 = { fontWeight: "700" };
var e141 = { size: "1rem" };
var d85 = { light: { info: { background: "{blue.800}", borderColor: "{blue.800}", color: "{blue.50}", shadow: "none" }, success: { background: "{green.800}", borderColor: "{green.800}", color: "{green.50}", shadow: "none" }, warn: { background: "{yellow.600}", borderColor: "{yellow.600}", color: "{yellow.50}", shadow: "none" }, error: { background: "{red.800}", borderColor: "{red.800}", color: "{red.50}", shadow: "none" }, secondary: { background: "{surface.200}", borderColor: "{surface.200}", color: "{surface.700}", shadow: "none" }, contrast: { background: "{surface.900}", borderColor: "{surface.900}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)" } }, dark: { info: { background: "{blue.200}", borderColor: "{blue.200}", color: "{blue.950}", shadow: "none" }, success: { background: "{green.200}", borderColor: "{green.200}", color: "{green.950}", shadow: "none" }, warn: { background: "{yellow.200}", borderColor: "{yellow.200}", color: "{yellow.950}", shadow: "none" }, error: { background: "{red.200}", borderColor: "{red.200}", color: "{red.950}", shadow: "none" }, secondary: { background: "{surface.700}", borderColor: "{surface.700}", color: "{surface.200}", shadow: "none" }, contrast: { background: "{surface.0}", borderColor: "{surface.0}", color: "{surface.950}", shadow: "none" } } };
var n84 = { root: o208, text: r201, icon: e141, colorScheme: d85 };

// node_modules/@primeuix/themes/dist/nora/inplace/index.mjs
var o209 = { padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{transition.duration}" };
var r202 = { hoverBackground: "{content.hover.background}", hoverColor: "{content.hover.color}" };
var n85 = { root: o209, display: r202 };

// node_modules/@primeuix/themes/dist/nora/inputchips/index.mjs
var o210 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}" };
var r203 = { borderRadius: "{border.radius.xs}" };
var d86 = { light: { chip: { focusBackground: "{surface.300}", color: "{surface.900}" } }, dark: { chip: { focusBackground: "{surface.600}", color: "{surface.0}" } } };
var f26 = { root: o210, chip: r203, colorScheme: d86 };

// node_modules/@primeuix/themes/dist/nora/inputgroup/index.mjs
var r204 = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.icon.color}", borderRadius: "{form.field.border.radius}", padding: "0.5rem", minWidth: "2.5rem" };
var o211 = { addon: r204 };

// node_modules/@primeuix/themes/dist/nora/inputnumber/index.mjs
var o212 = { transitionDuration: "{transition.duration}" };
var r205 = { background: "transparent", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", color: "{form.field.icon.color}", hoverColor: "{form.field.icon.color}", activeColor: "{form.field.icon.color}", width: "2.5rem", borderRadius: "{form.field.border.radius}", verticalPadding: "{form.field.padding.y}" };
var e142 = { light: { button: { hoverBackground: "{surface.200}", activeBackground: "{surface.300}" } }, dark: { button: { hoverBackground: "{surface.700}", activeBackground: "{surface.600}" } } };
var d87 = { root: o212, button: r205, colorScheme: e142 };

// node_modules/@primeuix/themes/dist/nora/inputotp/index.mjs
var r206 = { gap: "0.5rem" };
var t97 = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" } };
var e143 = { root: r206, input: t97 };

// node_modules/@primeuix/themes/dist/nora/inputtext/index.mjs
var o213 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d88 = { root: o213 };

// node_modules/@primeuix/themes/dist/nora/knob/index.mjs
var o214 = { transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r207 = { background: "{primary.color}" };
var t98 = { color: "{text.muted.color}" };
var a103 = { light: { range: { background: "{surface.300}" } }, dark: { range: { background: "{surface.600}" } } };
var c71 = { root: o214, value: r207, text: t98, colorScheme: a103 };

// node_modules/@primeuix/themes/dist/nora/listbox/index.mjs
var o215 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", borderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", shadow: "{form.field.shadow}", borderRadius: "{form.field.border.radius}", transitionDuration: "{form.field.transition.duration}" };
var r208 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var d89 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var i73 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var t99 = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" };
var e144 = { padding: "{list.option.padding}" };
var l44 = { light: { option: { stripedBackground: "{surface.100}" } }, dark: { option: { stripedBackground: "{surface.800}" } } };
var n86 = { root: o215, list: r208, option: d89, optionGroup: i73, checkmark: t99, emptyMessage: e144, colorScheme: l44 };

// node_modules/@primeuix/themes/dist/nora/megamenu/index.mjs
var o216 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", verticalOrientation: { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, horizontalOrientation: { padding: "0.5rem 0.75rem", gap: "0.5rem" }, transitionDuration: "{transition.duration}" };
var n87 = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" };
var i74 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a104 = { padding: "0", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", shadow: "{overlay.navigation.shadow}", gap: "0.5rem" };
var r209 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var t100 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var e145 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var c72 = { borderColor: "{content.border.color}" };
var d90 = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var g14 = { root: o216, baseItem: n87, item: i74, overlay: a104, submenu: r209, submenuLabel: t100, submenuIcon: e145, separator: c72, mobileButton: d90 };

// node_modules/@primeuix/themes/dist/nora/menu/index.mjs
var o217 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var n88 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var a105 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i75 = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" };
var t101 = { borderColor: "{content.border.color}" };
var r210 = { root: o217, list: n88, item: a105, submenuLabel: i75, separator: t101 };

// node_modules/@primeuix/themes/dist/nora/menubar/index.mjs
var o218 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.5rem 0.75rem", transitionDuration: "{transition.duration}" };
var i76 = { borderRadius: "{content.border.radius}", padding: "{navigation.item.padding}" };
var n89 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var r211 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}", background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", mobileIndent: "1rem", icon: { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" } };
var a106 = { borderColor: "{content.border.color}" };
var t102 = { borderRadius: "50%", size: "1.75rem", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", hoverBackground: "{content.hover.background}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e146 = { root: o218, baseItem: i76, item: n89, submenu: r211, separator: a106, mobileButton: t102 };

// node_modules/@primeuix/themes/dist/nora/message/index.mjs
var o219 = { borderRadius: "{content.border.radius}", borderWidth: "1px", transitionDuration: "{transition.duration}" };
var r212 = { padding: "0.5rem 0.75rem", gap: "0.5rem", sm: { padding: "0.375rem 0.625rem" }, lg: { padding: "0.625rem 0.875rem" } };
var e147 = { fontSize: "1rem", fontWeight: "700", sm: { fontSize: "0.875rem" }, lg: { fontSize: "1.125rem" } };
var l45 = { size: "1.125rem", sm: { size: "1rem" }, lg: { size: "1.25rem" } };
var n90 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var c73 = { size: "1rem", sm: { size: "0.875rem" }, lg: { size: "1.125rem" } };
var s29 = { root: { borderWidth: "1px" } };
var d91 = { content: { padding: "0" } };
var u17 = { light: { info: { background: "{blue.800}", borderColor: "{blue.800}", color: "{blue.50}", shadow: "none", closeButton: { hoverBackground: "{blue.600}", focusRing: { color: "{blue.50}", shadow: "none" } }, outlined: { color: "{blue.800}", borderColor: "{blue.800}" }, simple: { color: "{blue.800}" } }, success: { background: "{green.800}", borderColor: "{green.800}", color: "{green.50}", shadow: "none", closeButton: { hoverBackground: "{green.600}", focusRing: { color: "{green.50}", shadow: "none" } }, outlined: { color: "{green.800}", borderColor: "{green.800}" }, simple: { color: "{green.800}" } }, warn: { background: "{yellow.600}", borderColor: "{yellow.600}", color: "{yellow.50}", shadow: "none", closeButton: { hoverBackground: "{yellow.400}", focusRing: { color: "{yellow.50}", shadow: "none" } }, outlined: { color: "{yellow.600}", borderColor: "{yellow.600}" }, simple: { color: "{yellow.600}" } }, error: { background: "{red.800}", borderColor: "{red.800}", color: "{red.50}", shadow: "none", closeButton: { hoverBackground: "{red.600}", focusRing: { color: "{red.50}", shadow: "none" } }, outlined: { color: "{red.800}", borderColor: "{red.800}" }, simple: { color: "{red.800}" } }, secondary: { background: "{surface.200}", borderColor: "{surface.200}", color: "{surface.700}", shadow: "none", closeButton: { hoverBackground: "{surface.50}", focusRing: { color: "{surface.700}", shadow: "none" } }, outlined: { color: "{surface.600}", borderColor: "{surface.600}" }, simple: { color: "{surface.600}" } }, contrast: { background: "{surface.900}", borderColor: "{surface.900}", color: "{surface.50}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.50}", shadow: "none" } }, outlined: { color: "{surface.900}", borderColor: "{surface.900}" }, simple: { color: "{surface.900}" } } }, dark: { info: { background: "{blue.200}", borderColor: "{blue.200}", color: "{blue.950}", shadow: "none", closeButton: { hoverBackground: "{blue.50}", focusRing: { color: "{blue.950}", shadow: "none" } }, outlined: { color: "{blue.200}", borderColor: "{blue.200}" }, simple: { color: "{blue.200}" } }, success: { background: "{green.200}", borderColor: "{green.200}", color: "{green.950}", shadow: "none", closeButton: { hoverBackground: "{green.50}", focusRing: { color: "{green.950}", shadow: "none" } }, outlined: { color: "{green.200}", borderColor: "{green.200}" }, simple: { color: "{green.200}" } }, warn: { background: "{yellow.200}", borderColor: "{yellow.200}", color: "{yellow.950}", shadow: "none", closeButton: { hoverBackground: "{yellow.50}", focusRing: { color: "{yellow.950}", shadow: "none" } }, outlined: { color: "{yellow.200}", borderColor: "{yellow.200}" }, simple: { color: "{yellow.200}" } }, error: { background: "{red.200}", borderColor: "{red.200}", color: "{red.950}", shadow: "none", closeButton: { hoverBackground: "{red.50}", focusRing: { color: "{red.950}", shadow: "none" } }, outlined: { color: "{red.200}", borderColor: "{red.200}" }, simple: { color: "{red.200}" } }, secondary: { background: "{surface.700}", borderColor: "{surface.700}", color: "{surface.200}", shadow: "none", closeButton: { hoverBackground: "{surface.500}", focusRing: { color: "{surface.200}", shadow: "none" } }, outlined: { color: "{surface.400}", borderColor: "{surface.400}" }, simple: { color: "{surface.400}" } }, contrast: { background: "{surface.0}", borderColor: "{surface.0}", color: "{surface.950}", shadow: "none", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.950}", shadow: "none" } }, outlined: { color: "{surface.0}", borderColor: "{surface.0}" }, simple: { color: "{surface.0}" } } } };
var a107 = { root: o219, content: r212, text: e147, icon: l45, closeButton: n90, closeIcon: c73, outlined: s29, simple: d91, colorScheme: u17 };

// node_modules/@primeuix/themes/dist/nora/metergroup/index.mjs
var e148 = { borderRadius: "{content.border.radius}", gap: "1rem" };
var r213 = { size: "0.5rem" };
var a108 = { gap: "0.5rem" };
var l46 = { size: "0.5rem" };
var o220 = { size: "1rem" };
var s30 = { verticalGap: "0.5rem", horizontalGap: "1rem" };
var t103 = { light: { meters: { background: "{surface.300}" } }, dark: { meters: { background: "{surface.600}" } } };
var m11 = { root: e148, meters: r213, label: a108, labelMarker: l46, labelIcon: o220, labelList: s30, colorScheme: t103 };

// node_modules/@primeuix/themes/dist/nora/multiselect/index.mjs
var o221 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d92 = { width: "2.5rem", color: "{form.field.icon.color}" };
var r214 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l47 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i77 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}", gap: "0.5rem" };
var e149 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f27 = { color: "{form.field.icon.color}" };
var a109 = { borderRadius: "{border.radius.xs}" };
var c74 = { padding: "{list.option.padding}" };
var n91 = { root: o221, dropdown: d92, overlay: r214, list: l47, option: i77, optionGroup: e149, chip: a109, clearIcon: f27, emptyMessage: c74 };

// node_modules/@primeuix/themes/dist/nora/orderlist/index.mjs
var r215 = { gap: "1.125rem" };
var a110 = { gap: "0.5rem" };
var o222 = { root: r215, controls: a110 };

// node_modules/@primeuix/themes/dist/nora/organizationchart/index.mjs
var o223 = { gutter: "0.75rem", transitionDuration: "{transition.duration}" };
var r216 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{content.border.color}", color: "{content.color}", selectedColor: "{highlight.color}", hoverColor: "{content.hover.color}", padding: "0.75rem 1rem", toggleablePadding: "0.75rem 1rem 1.25rem 1rem", borderRadius: "{content.border.radius}" };
var e150 = { background: "{content.background}", hoverBackground: "{content.hover.background}", borderColor: "{content.border.color}", color: "{text.muted.color}", hoverColor: "{text.color}", size: "1.5rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t104 = { color: "{content.border.color}", borderRadius: "{content.border.radius}", height: "24px" };
var n92 = { root: o223, node: r216, nodeToggleButton: e150, connector: t104 };

// node_modules/@primeuix/themes/dist/nora/overlaybadge/index.mjs
var o224 = { outline: { width: "2px", color: "{content.background}" } };
var t105 = { root: o224 };

// node_modules/@primeuix/themes/dist/nora/paginator/index.mjs
var o225 = { padding: "0.5rem 1rem", gap: "0.25rem", borderRadius: "{content.border.radius}", background: "{content.background}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r217 = { background: "transparent", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}", width: "2.5rem", height: "2.5rem", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t106 = { color: "{text.muted.color}" };
var e151 = { maxWidth: "2.5rem" };
var n93 = { root: o225, navButton: r217, currentPageReport: t106, jumpToPageInput: e151 };

// node_modules/@primeuix/themes/dist/nora/panel/index.mjs
var r218 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}" };
var o226 = { background: "transparent", color: "{text.color}", padding: "1.125rem", borderWidth: "0 0 1px 0", borderColor: "{content.border.color}", borderRadius: "0" };
var e152 = { padding: "0.375rem 1.125rem" };
var d93 = { fontWeight: "700" };
var t107 = { padding: "1.125rem" };
var n94 = { padding: "0 1.125rem 1.125rem 1.125rem" };
var a111 = { root: r218, header: o226, toggleableHeader: e152, title: d93, content: t107, footer: n94 };

// node_modules/@primeuix/themes/dist/nora/panelmenu/index.mjs
var o227 = { gap: "0", transitionDuration: "{transition.duration}" };
var r219 = { background: "{content.background}", borderColor: "{content.border.color}", borderWidth: "1px", color: "{content.color}", padding: "0.25rem 0.25rem", borderRadius: "0", first: { borderWidth: "1px 1px 0 1px", topBorderRadius: "{content.border.radius}" }, last: { borderWidth: "0 1px 1px 1px", bottomBorderRadius: "{content.border.radius}" } };
var n95 = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", gap: "0.5rem", padding: "{navigation.item.padding}", borderRadius: "{content.border.radius}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } };
var i78 = { indent: "1rem" };
var t108 = { color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}" };
var a112 = { root: o227, panel: r219, item: n95, submenu: i78, submenuIcon: t108 };

// node_modules/@primeuix/themes/dist/nora/password/index.mjs
var r220 = { borderRadius: "{content.border.radius}", height: ".75rem" };
var o228 = { color: "{form.field.icon.color}" };
var e153 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", padding: "{overlay.popover.padding}", shadow: "{overlay.popover.shadow}" };
var a113 = { gap: "0.5rem" };
var d94 = { light: { meter: { background: "{surface.300}" }, strength: { weakBackground: "{red.600}", mediumBackground: "{yellow.600}", strongBackground: "{green.600}" } }, dark: { meter: { background: "{surface.600}" }, strength: { weakBackground: "{red.500}", mediumBackground: "{yellow.500}", strongBackground: "{green.500}" } } };
var n96 = { meter: r220, icon: o228, overlay: e153, content: a113, colorScheme: d94 };

// node_modules/@primeuix/themes/dist/nora/picklist/index.mjs
var r221 = { gap: "1.125rem" };
var a114 = { gap: "0.5rem" };
var o229 = { root: r221, controls: a114 };

// node_modules/@primeuix/themes/dist/nora/popover/index.mjs
var o230 = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", color: "{overlay.popover.color}", borderRadius: "{overlay.popover.border.radius}", shadow: "{overlay.popover.shadow}", gutter: "10px", arrowOffset: "1.25rem" };
var r222 = { padding: "{overlay.popover.padding}" };
var e154 = { root: o230, content: r222 };

// node_modules/@primeuix/themes/dist/nora/progressbar/index.mjs
var r223 = { borderRadius: "{content.border.radius}", height: "1.25rem" };
var o231 = { background: "{primary.color}" };
var a115 = { color: "{primary.contrast.color}", fontSize: "0.75rem", fontWeight: "700" };
var e155 = { light: { root: { background: "{surface.300}" } }, dark: { root: { background: "{surface.600}" } } };
var t109 = { root: r223, value: o231, label: a115, colorScheme: e155 };

// node_modules/@primeuix/themes/dist/nora/progressspinner/index.mjs
var o232 = { light: { root: { colorOne: "{red.500}", colorTwo: "{blue.500}", colorThree: "{green.500}", colorFour: "{yellow.500}" } }, dark: { root: { colorOne: "{red.400}", colorTwo: "{blue.400}", colorThree: "{green.400}", colorFour: "{yellow.400}" } } };
var r224 = { colorScheme: o232 };

// node_modules/@primeuix/themes/dist/nora/radiobutton/index.mjs
var o233 = { width: "1.25rem", height: "1.25rem", background: "{form.field.background}", checkedBackground: "{form.field.background}", checkedHoverBackground: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", checkedBorderColor: "{form.field.border.color}", checkedHoverBorderColor: "{form.field.hover.border.color}", checkedFocusBorderColor: "{form.field.focus.border.color}", checkedDisabledBorderColor: "{form.field.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { width: "1rem", height: "1rem" }, lg: { width: "1.5rem", height: "1.5rem" } };
var r225 = { size: "0.75rem", checkedColor: "{primary.color}", checkedHoverColor: "{primary.color}", disabledColor: "{form.field.disabled.color}", sm: { size: "0.5rem" }, lg: { size: "1rem" } };
var e156 = { root: o233, icon: r225 };

// node_modules/@primeuix/themes/dist/nora/rating/index.mjs
var o234 = { gap: "0.25rem", transitionDuration: "{transition.duration}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var r226 = { size: "1rem", color: "{text.muted.color}", hoverColor: "{primary.color}", activeColor: "{primary.color}" };
var i79 = { root: o234, icon: r226 };

// node_modules/@primeuix/themes/dist/nora/ripple/index.mjs
var r227 = { light: { root: { background: "rgba(0,0,0,0.1)" } }, dark: { root: { background: "rgba(255,255,255,0.4)" } } };
var o235 = { colorScheme: r227 };

// node_modules/@primeuix/themes/dist/nora/scrollpanel/index.mjs
var r228 = { transitionDuration: "{transition.duration}" };
var o236 = { size: "9px", borderRadius: "{border.radius.xs}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var s31 = { light: { bar: { background: "{surface.200}" } }, dark: { bar: { background: "{surface.700}" } } };
var a116 = { root: r228, bar: o236, colorScheme: s31 };

// node_modules/@primeuix/themes/dist/nora/select/index.mjs
var o237 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r229 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d95 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l48 = { padding: "{list.padding}", gap: "{list.gap}", header: { padding: "{list.header.padding}" } };
var i80 = { focusBackground: "{list.option.focus.background}", selectedBackground: "{list.option.selected.background}", selectedFocusBackground: "{list.option.selected.focus.background}", color: "{list.option.color}", focusColor: "{list.option.focus.color}", selectedColor: "{list.option.selected.color}", selectedFocusColor: "{list.option.selected.focus.color}", padding: "{list.option.padding}", borderRadius: "{list.option.border.radius}" };
var e157 = { background: "{list.option.group.background}", color: "{list.option.group.color}", fontWeight: "{list.option.group.font.weight}", padding: "{list.option.group.padding}" };
var f28 = { color: "{form.field.icon.color}" };
var c75 = { color: "{list.option.color}", gutterStart: "-0.375rem", gutterEnd: "0.375rem" };
var a117 = { padding: "{list.option.padding}" };
var n97 = { root: o237, dropdown: r229, overlay: d95, list: l48, option: i80, optionGroup: e157, clearIcon: f28, checkmark: c75, emptyMessage: a117 };

// node_modules/@primeuix/themes/dist/nora/selectbutton/index.mjs
var r230 = { borderRadius: "{form.field.border.radius}" };
var o238 = { light: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } }, dark: { root: { invalidBorderColor: "{form.field.invalid.border.color}" } } };
var d96 = { root: r230, colorScheme: o238 };

// node_modules/@primeuix/themes/dist/nora/skeleton/index.mjs
var r231 = { borderRadius: "{content.border.radius}" };
var a118 = { light: { root: { background: "{surface.300}", animationBackground: "rgba(255,255,255,0.4)" } }, dark: { root: { background: "rgba(255, 255, 255, 0.1)", animationBackground: "rgba(255, 255, 255, 0.04)" } } };
var o239 = { root: r231, colorScheme: a118 };

// node_modules/@primeuix/themes/dist/nora/slider/index.mjs
var r232 = { transitionDuration: "{transition.duration}" };
var o240 = { borderRadius: "{content.border.radius}", size: "3px" };
var a119 = { background: "{primary.color}" };
var c76 = { width: "16px", height: "16px", borderRadius: "50%", background: "{primary.color}", hoverBackground: "{primary.color}", content: { borderRadius: "50%", background: "{primary.color}", hoverBackground: "{primary.color}", width: "12px", height: "12px", shadow: "none" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var i81 = { light: { track: { background: "{surface.300}" } }, dark: { track: { background: "{surface.600}" } } };
var n98 = { root: r232, track: o240, range: a119, handle: c76, colorScheme: i81 };

// node_modules/@primeuix/themes/dist/nora/speeddial/index.mjs
var t110 = { gap: "0.5rem", transitionDuration: "{transition.duration}" };
var a120 = { root: t110 };

// node_modules/@primeuix/themes/dist/nora/splitbutton/index.mjs
var r233 = { borderRadius: "{form.field.border.radius}", roundedBorderRadius: "2rem", raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)" };
var d97 = { root: r233 };

// node_modules/@primeuix/themes/dist/nora/splitter/index.mjs
var o241 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", transitionDuration: "{transition.duration}" };
var r234 = { background: "{content.border.color}" };
var n99 = { size: "24px", background: "transparent", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var t111 = { root: o241, gutter: r234, handle: n99 };

// node_modules/@primeuix/themes/dist/nora/stepper/index.mjs
var o242 = { transitionDuration: "{transition.duration}" };
var r235 = { background: "{content.border.color}", activeBackground: "{primary.color}", margin: "0 0 0 1.625rem", size: "2px" };
var e158 = { padding: "0.5rem", gap: "1rem" };
var t112 = { padding: "0", borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var n100 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "700" };
var a121 = { background: "{content.background}", activeBackground: "{primary.color}", borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", activeColor: "{primary.contrast.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "none" };
var c77 = { padding: "0.875rem 0.5rem 1.125rem 0.5rem" };
var i82 = { background: "{content.background}", color: "{content.color}", padding: "0", indent: "1rem" };
var d98 = { root: o242, separator: r235, step: e158, stepHeader: t112, stepTitle: n100, stepNumber: a121, steppanels: c77, steppanel: i82 };

// node_modules/@primeuix/themes/dist/nora/steps/index.mjs
var o243 = { transitionDuration: "{transition.duration}" };
var r236 = { background: "{content.border.color}" };
var t113 = { borderRadius: "{content.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, gap: "0.5rem" };
var e159 = { color: "{text.muted.color}", activeColor: "{primary.color}", fontWeight: "700" };
var i83 = { background: "{content.background}", activeBackground: "{primary.color}", borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", activeColor: "{primary.contrast.color}", size: "2rem", fontSize: "1.143rem", fontWeight: "500", borderRadius: "50%", shadow: "none" };
var c78 = { root: o243, separator: r236, itemLink: t113, itemLabel: e159, itemNumber: i83 };

// node_modules/@primeuix/themes/dist/nora/tabmenu/index.mjs
var o244 = { transitionDuration: "{transition.duration}" };
var r237 = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" };
var t114 = { background: "{content.background}", hoverBackground: "{content.hover.background}", activeBackground: "{primary.color}", borderWidth: "0", borderColor: "transparent", hoverBorderColor: "transparent", activeBorderColor: "transparent", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.contrast.color}", padding: "1rem 1.25rem", fontWeight: "700", margin: "0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var e160 = { color: "{text.color}", hoverColor: "{text.color}", activeColor: "{primary.contrast.color}" };
var n101 = { height: "0", bottom: "0", background: "transparent" };
var a122 = { root: o244, tablist: r237, item: t114, itemIcon: e160, activeBar: n101 };

// node_modules/@primeuix/themes/dist/nora/tabs/index.mjs
var o245 = { transitionDuration: "{transition.duration}" };
var r238 = { borderWidth: "0 0 1px 0", background: "{content.background}", borderColor: "{content.border.color}" };
var t115 = { background: "{content.background}", hoverBackground: "{content.hover.background}", activeBackground: "{primary.color}", borderWidth: "0", borderColor: "transparent", hoverBorderColor: "transparent", activeBorderColor: "transparent", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.contrast.color}", padding: "1rem 1.25rem", fontWeight: "700", margin: "0", gap: "0.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-2px", shadow: "{focus.ring.shadow}" } };
var n102 = { background: "{content.background}", color: "{content.color}", padding: "0.875rem 1.125rem 1.125rem 1.125rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var c79 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", width: "2.5rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "inset {focus.ring.shadow}" } };
var e161 = { height: "0", bottom: "0", background: "transparent" };
var a123 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } };
var i84 = { root: o245, tablist: r238, tab: t115, tabpanel: n102, navButton: c79, activeBar: e161, colorScheme: a123 };

// node_modules/@primeuix/themes/dist/nora/tabview/index.mjs
var o246 = { transitionDuration: "{transition.duration}" };
var r239 = { background: "{content.background}", borderColor: "{content.border.color}" };
var t116 = { borderColor: "{content.border.color}", activeBorderColor: "{primary.color}", color: "{text.muted.color}", hoverColor: "{text.color}", activeColor: "{primary.color}" };
var n103 = { background: "{content.background}", color: "{content.color}" };
var a124 = { background: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}" };
var c80 = { light: { navButton: { shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)" } }, dark: { navButton: { shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)" } } };
var e162 = { root: o246, tabList: r239, tab: t116, tabPanel: n103, navButton: a124, colorScheme: c80 };

// node_modules/@primeuix/themes/dist/nora/tag/index.mjs
var r240 = { fontSize: "0.875rem", fontWeight: "700", padding: "0.25rem 0.5rem", gap: "0.25rem", borderRadius: "{content.border.radius}", roundedBorderRadius: "{border.radius.xl}" };
var o247 = { size: "0.75rem" };
var c81 = { light: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.200}", color: "{surface.700}" }, success: { background: "{green.600}", color: "{surface.0}" }, info: { background: "{sky.600}", color: "{surface.0}" }, warn: { background: "{orange.600}", color: "{surface.0}" }, danger: { background: "{red.600}", color: "{surface.0}" }, contrast: { background: "{surface.950}", color: "{surface.0}" } }, dark: { primary: { background: "{primary.color}", color: "{primary.contrast.color}" }, secondary: { background: "{surface.700}", color: "{surface.200}" }, success: { background: "{green.500}", color: "{green.950}" }, info: { background: "{sky.500}", color: "{sky.950}" }, warn: { background: "{orange.500}", color: "{orange.950}" }, danger: { background: "{red.500}", color: "{red.950}" }, contrast: { background: "{surface.0}", color: "{surface.950}" } } };
var a125 = { root: r240, icon: o247, colorScheme: c81 };

// node_modules/@primeuix/themes/dist/nora/terminal/index.mjs
var r241 = { background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", height: "18rem", padding: "{form.field.padding.y} {form.field.padding.x}", borderRadius: "{form.field.border.radius}" };
var o248 = { gap: "0.25rem" };
var d99 = { margin: "2px 0" };
var e163 = { root: r241, prompt: o248, commandResponse: d99 };

// node_modules/@primeuix/themes/dist/nora/textarea/index.mjs
var o249 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var d100 = { root: o249 };

// node_modules/@primeuix/themes/dist/nora/tieredmenu/index.mjs
var o250 = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" };
var i85 = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" };
var n104 = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } };
var a126 = { mobileIndent: "1rem" };
var t117 = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" };
var r242 = { borderColor: "{content.border.color}" };
var c82 = { root: o250, list: i85, item: n104, submenu: a126, submenuIcon: t117, separator: r242 };

// node_modules/@primeuix/themes/dist/nora/timeline/index.mjs
var e164 = { minHeight: "5rem" };
var r243 = { eventContent: { padding: "1rem 0" } };
var o251 = { eventContent: { padding: "0 1rem" } };
var n105 = { size: "1.125rem", borderRadius: "50%", borderWidth: "2px", background: "{primary.color}", borderColor: "{primary.color}", content: { borderRadius: "50%", size: "0.375rem", background: "transparent", insetShadow: "none" } };
var t118 = { color: "{content.border.color}", size: "2px" };
var a127 = { event: e164, horizontal: r243, vertical: o251, eventMarker: n105, eventConnector: t118 };

// node_modules/@primeuix/themes/dist/nora/toast/index.mjs
var o252 = { width: "25rem", borderRadius: "{content.border.radius}", borderWidth: "0 0 0 6px", transitionDuration: "{transition.duration}", blur: "0" };
var r244 = { size: "1.125rem" };
var e165 = { padding: "{overlay.popover.padding}", gap: "0.5rem" };
var a128 = { gap: "0.5rem" };
var l49 = { fontWeight: "700", fontSize: "1rem" };
var c83 = { fontWeight: "500", fontSize: "0.875rem" };
var n106 = { width: "1.75rem", height: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", offset: "{focus.ring.offset}" } };
var d101 = { size: "1rem" };
var s32 = { light: { info: { background: "{blue.800}", borderColor: "{blue.800}", color: "{blue.50}", detailColor: "{blue.50}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{blue.600}", focusRing: { color: "{blue.50}", shadow: "none" } } }, success: { background: "{green.800}", borderColor: "{green.800}", color: "{green.50}", detailColor: "{green.50}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{green.600}", focusRing: { color: "{green.50}", shadow: "none" } } }, warn: { background: "{yellow.600}", borderColor: "{yellow.600}", color: "{yellow.50}", detailColor: "{yellow.50}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{yellow.400}", focusRing: { color: "{yellow.50}", shadow: "none" } } }, error: { background: "{red.800}", borderColor: "{red.800}", color: "{red.50}", detailColor: "{red.50}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{red.600}", focusRing: { color: "{red.50}", shadow: "none" } } }, secondary: { background: "{surface.200}", borderColor: "{surface.200}", color: "{surface.700}", detailColor: "{surface.700}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.50}", focusRing: { color: "{surface.700}", shadow: "none" } } }, contrast: { background: "{surface.900}", borderColor: "{surface.900}", color: "{surface.50}", detailColor: "{surface.0}", shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)", closeButton: { hoverBackground: "{surface.700}", focusRing: { color: "{surface.50}", shadow: "none" } } } }, dark: { info: { background: "{blue.200}", borderColor: "{blue.200}", color: "{blue.950}", detailColor: "{blue.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{blue.50}", focusRing: { color: "{blue.950}", shadow: "none" } } }, success: { background: "{green.200}", borderColor: "{green.200}", color: "{green.950}", detailColor: "{green.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{green.50}", focusRing: { color: "{green.950}", shadow: "none" } } }, warn: { background: "{yellow.200}", borderColor: "{yellow.200}", color: "{yellow.950}", detailColor: "{yellow.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{yellow.50}", focusRing: { color: "{yellow.950}", shadow: "none" } } }, error: { background: "{red.200}", borderColor: "{red.200}", color: "{red.950}", detailColor: "{red.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{red.50}", focusRing: { color: "{red.950}", shadow: "none" } } }, secondary: { background: "{surface.700}", borderColor: "{surface.700}", color: "{surface.200}", detailColor: "{surface.200}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.500}", focusRing: { color: "{surface.200}", shadow: "none" } } }, contrast: { background: "{surface.0}", borderColor: "{surface.0}", color: "{surface.950}", detailColor: "{surface.950}", shadow: "{overlay.popover.shadow}", closeButton: { hoverBackground: "{surface.200}", focusRing: { color: "{surface.950}", shadow: "none" } } } } };
var u18 = { root: o252, icon: r244, content: e165, text: a128, summary: l49, detail: c83, closeButton: n106, closeIcon: d101, colorScheme: s32 };

// node_modules/@primeuix/themes/dist/nora/togglebutton/index.mjs
var o253 = { padding: "0.5rem 0.75rem", borderRadius: "{content.border.radius}", gap: "0.5rem", fontWeight: "500", background: "{form.field.background}", borderColor: "{form.field.border.color}", color: "{form.field.color}", hoverColor: "{form.field.color}", checkedBackground: "{highlight.background}", checkedColor: "{highlight.color}", checkedBorderColor: "{form.field.border.color}", disabledBackground: "{form.field.disabled.background}", disabledBorderColor: "{form.field.disabled.background}", disabledColor: "{form.field.disabled.color}", invalidBorderColor: "{form.field.invalid.border.color}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", padding: "0.375rem 0.625rem" }, lg: { fontSize: "{form.field.lg.font.size}", padding: "0.625rem 0.875rem" } };
var r245 = { color: "{text.muted.color}", hoverColor: "{text.muted.color}", checkedColor: "{highlight.color}", disabledColor: "{form.field.disabled.color}" };
var d102 = { checkedBackground: "transparent", checkedShadow: "none", padding: "0", borderRadius: "0", sm: { padding: "0" }, lg: { padding: "0" } };
var e166 = { light: { root: { hoverBackground: "{surface.200}" } }, dark: { root: { hoverBackground: "{surface.700}" } } };
var i86 = { root: o253, icon: r245, content: d102, colorScheme: e166 };

// node_modules/@primeuix/themes/dist/nora/toggleswitch/index.mjs
var r246 = { width: "2.5rem", height: "1.5rem", borderRadius: "30px", gap: "0.25rem", shadow: "{form.field.shadow}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" }, borderWidth: "1px", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", checkedBorderColor: "{primary.color}", checkedHoverBorderColor: "{primary.color}", invalidBorderColor: "{form.field.invalid.border.color}", background: "{form.field.background}", hoverBackground: "{form.field.background}", checkedBackground: "{primary.color}", checkedHoverBackground: "{primary.color}", transitionDuration: "{form.field.transition.duration}", slideDuration: "0.1s", disabledBackground: "{form.field.disabled.background}" };
var o254 = { borderRadius: "50%", size: "1rem", background: "{form.field.border.color}", hoverBackground: "{form.field.border.color}", checkedBackground: "{primary.contrast.color}", checkedHoverBackground: "{primary.contrast.color}", disabledBackground: "{form.field.disabled.color}", color: "{surface.0}", hoverColor: "{surface.0}", checkedColor: "{primary.color}", checkedHoverColor: "{primary.color}" };
var d103 = { root: r246, handle: o254 };

// node_modules/@primeuix/themes/dist/nora/toolbar/index.mjs
var o255 = { background: "{content.background}", borderColor: "{content.border.color}", borderRadius: "{content.border.radius}", color: "{content.color}", gap: "0.5rem", padding: "0.75rem" };
var r247 = { root: o255 };

// node_modules/@primeuix/themes/dist/nora/tooltip/index.mjs
var r248 = { maxWidth: "12.5rem", gutter: "0.25rem", shadow: "{overlay.popover.shadow}", padding: "0.5rem 0.75rem", borderRadius: "{overlay.popover.border.radius}" };
var o256 = { light: { root: { background: "{surface.900}", color: "{surface.0}" } }, dark: { root: { background: "{surface.0}", color: "{surface.900}" } } };
var e167 = { root: r248, colorScheme: o256 };

// node_modules/@primeuix/themes/dist/nora/tree/index.mjs
var o257 = { background: "{content.background}", color: "{content.color}", padding: "1rem", gap: "2px", indent: "1rem", transitionDuration: "{transition.duration}" };
var r249 = { padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{text.color}", hoverColor: "{text.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-2px", shadow: "{focus.ring.shadow}" }, gap: "0.25rem" };
var e168 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedColor: "{highlight.color}" };
var t119 = { borderRadius: "50%", size: "1.75rem", hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", selectedHoverColor: "{primary.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var c84 = { size: "2rem" };
var n107 = { margin: "0 0 0.5rem 0" };
var d104 = { root: o257, node: r249, nodeIcon: e168, nodeToggleButton: t119, loadingIcon: c84, filter: n107 };

// node_modules/@primeuix/themes/dist/nora/treeselect/index.mjs
var o258 = { background: "{form.field.background}", disabledBackground: "{form.field.disabled.background}", filledBackground: "{form.field.filled.background}", filledHoverBackground: "{form.field.filled.hover.background}", filledFocusBackground: "{form.field.filled.focus.background}", borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.hover.border.color}", focusBorderColor: "{form.field.focus.border.color}", invalidBorderColor: "{form.field.invalid.border.color}", color: "{form.field.color}", disabledColor: "{form.field.disabled.color}", placeholderColor: "{form.field.placeholder.color}", invalidPlaceholderColor: "{form.field.invalid.placeholder.color}", shadow: "{form.field.shadow}", paddingX: "{form.field.padding.x}", paddingY: "{form.field.padding.y}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{form.field.focus.ring.width}", style: "{form.field.focus.ring.style}", color: "{form.field.focus.ring.color}", offset: "{form.field.focus.ring.offset}", shadow: "{form.field.focus.ring.shadow}" }, transitionDuration: "{form.field.transition.duration}", sm: { fontSize: "{form.field.sm.font.size}", paddingX: "{form.field.sm.padding.x}", paddingY: "{form.field.sm.padding.y}" }, lg: { fontSize: "{form.field.lg.font.size}", paddingX: "{form.field.lg.padding.x}", paddingY: "{form.field.lg.padding.y}" } };
var r250 = { width: "2.5rem", color: "{form.field.icon.color}" };
var d105 = { background: "{overlay.select.background}", borderColor: "{overlay.select.border.color}", borderRadius: "{overlay.select.border.radius}", color: "{overlay.select.color}", shadow: "{overlay.select.shadow}" };
var l50 = { padding: "{list.padding}" };
var e169 = { padding: "{list.option.padding}" };
var i87 = { borderRadius: "{border.radius.sm}" };
var f29 = { color: "{form.field.icon.color}" };
var a129 = { root: o258, dropdown: r250, overlay: d105, tree: l50, emptyMessage: e169, chip: i87, clearIcon: f29 };

// node_modules/@primeuix/themes/dist/nora/treetable/index.mjs
var o259 = { transitionDuration: "{transition.duration}" };
var r251 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "1px 0 1px 0", padding: "0.75rem 1rem" };
var e170 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", borderColor: "{treetable.border.color}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", gap: "0.5rem", padding: "0.75rem 1rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var t120 = { fontWeight: "700" };
var c85 = { background: "{content.background}", hoverBackground: "{content.hover.background}", selectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{highlight.color}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "-1px", shadow: "{focus.ring.shadow}" } };
var n108 = { borderColor: "{treetable.border.color}", padding: "0.75rem 1rem", gap: "0.5rem" };
var d106 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", padding: "0.75rem 1rem" };
var l51 = { fontWeight: "700" };
var i88 = { background: "{content.background}", borderColor: "{treetable.border.color}", color: "{content.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem" };
var a130 = { width: "0.5rem" };
var g15 = { width: "1px", color: "{primary.color}" };
var s33 = { color: "{text.muted.color}", hoverColor: "{text.hover.muted.color}", size: "0.875rem" };
var u19 = { size: "2rem" };
var h12 = { hoverBackground: "{content.hover.background}", selectedHoverBackground: "{content.background}", color: "{text.muted.color}", hoverColor: "{text.color}", selectedHoverColor: "{primary.color}", size: "1.75rem", borderRadius: "50%", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } };
var b11 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var f30 = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" };
var m12 = { light: { root: { borderColor: "{surface.300}" }, bodyCell: { selectedBorderColor: "{primary.100}" } }, dark: { root: { borderColor: "{surface.600}" }, bodyCell: { selectedBorderColor: "{primary.900}" } } };
var k8 = { root: o259, header: r251, headerCell: e170, columnTitle: t120, row: c85, bodyCell: n108, footerCell: d106, columnFooter: l51, footer: i88, columnResizer: a130, resizeIndicator: g15, sortIcon: s33, loadingIcon: u19, nodeToggleButton: h12, paginatorTop: b11, paginatorBottom: f30, colorScheme: m12 };

// node_modules/@primeuix/themes/dist/nora/virtualscroller/index.mjs
var o260 = { mask: { background: "{content.background}", color: "{text.muted.color}" }, icon: { size: "2rem" } };
var e171 = { loader: o260 };

// node_modules/@primeuix/themes/dist/nora/index.mjs
var r252 = Object.defineProperty;
var e172 = Object.defineProperties;
var m13 = Object.getOwnPropertyDescriptors;
var o261 = Object.getOwnPropertySymbols;
var i89 = Object.prototype.hasOwnProperty;
var t121 = Object.prototype.propertyIsEnumerable;
var p10 = (e173, m14, o262) => m14 in e173 ? r252(e173, m14, { enumerable: true, configurable: true, writable: true, value: o262 }) : e173[m14] = o262;
var Nr3;
var Qr3 = (Nr3 = ((r253, e173) => {
  for (var m14 in e173 || (e173 = {})) i89.call(e173, m14) && p10(r253, m14, e173[m14]);
  if (o261) for (var m14 of o261(e173)) t121.call(e173, m14) && p10(r253, m14, e173[m14]);
  return r253;
})({}, e121), e172(Nr3, m13({ components: { accordion: c61, autocomplete: a88, avatar: n74, badge: d72, blockui: o180, breadcrumb: i61, button: e122, datepicker: k7, card: d73, carousel: t87, cascadeselect: f22, checkbox: e125, chip: s24, colorpicker: s25, confirmdialog: r183, confirmpopup: a93, contextmenu: c66, dataview: c68, datatable: k6, dialog: e133, divider: t92, dock: d79, drawer: e135, editor: l41, fieldset: n81, fileupload: i68, iftalabel: i71, floatlabel: d83, galleria: h11, iconfield: r198, image: i72, imagecompare: o207, inlinemessage: n84, inplace: n85, inputchips: f26, inputgroup: o211, inputnumber: d87, inputotp: e143, inputtext: d88, knob: c71, listbox: n86, megamenu: g14, menu: r210, menubar: e146, message: a107, metergroup: m11, multiselect: n91, orderlist: o222, organizationchart: n92, overlaybadge: t105, popover: e154, paginator: n93, password: n96, panel: a111, panelmenu: a112, picklist: o229, progressbar: t109, progressspinner: r224, radiobutton: e156, rating: i79, ripple: o235, scrollpanel: a116, select: n97, selectbutton: d96, skeleton: o239, slider: n98, speeddial: a120, splitter: t111, splitbutton: d97, stepper: d98, steps: c78, tabmenu: a122, tabs: i84, tabview: e162, textarea: d100, tieredmenu: c82, tag: a125, terminal: e163, timeline: a127, togglebutton: i86, toggleswitch: d103, tree: d104, treeselect: a129, treetable: k8, toast: u18, toolbar: r247, tooltip: e167, virtualscroller: e171 } })));

// src/app/layout/component/configurator/app.configurator.ts
var _c0 = (a0) => ({ "background-color": a0 });
var _c1 = (a0) => ({ "outline outline-primary": a0 });
var _forTrack0 = ($index, $item) => $item.name;
function AppConfigurator_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function AppConfigurator_For_17_Template_button_click_0_listener($event) {
      const primaryColor_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateColors($event, "primary", primaryColor_r2));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const primaryColor_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(\u0275\u0275pureFunction1(4, _c0, (primaryColor_r2 == null ? null : primaryColor_r2.name) === "noir" ? "var(--text-color)" : primaryColor_r2 == null ? null : primaryColor_r2.palette == null ? null : primaryColor_r2.palette["500"]));
    \u0275\u0275property("title", primaryColor_r2.name)("ngClass", \u0275\u0275pureFunction1(6, _c1, primaryColor_r2.name === ctx_r2.selectedPrimaryColor()));
  }
}
function AppConfigurator_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function AppConfigurator_For_23_Template_button_click_0_listener($event) {
      const surface_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateColors($event, "surface", surface_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const surface_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(\u0275\u0275pureFunction1(4, _c0, surface_r5 == null ? null : surface_r5.palette == null ? null : surface_r5.palette["500"]));
    \u0275\u0275property("title", surface_r5.name)("ngClass", \u0275\u0275pureFunction1(6, _c1, ctx_r2.selectedSurfaceColor() ? ctx_r2.selectedSurfaceColor() === surface_r5.name : ctx_r2.layoutService.layoutConfig().darkTheme ? surface_r5.name === "zinc" : surface_r5.name === "slate"));
  }
}
function AppConfigurator_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 7);
    \u0275\u0275text(2, "Menu Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-selectbutton", 16);
    \u0275\u0275listener("ngModelChange", function AppConfigurator_div_28_Template_p_selectbutton_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onMenuModeChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.menuMode())("options", ctx_r2.menuModeOptions)("allowEmpty", false);
  }
}
var presets = {
  Aura: Qr,
  Lara: Qr2,
  Nora: Qr3
};
var PRIMARY_COLOR_NAMES = ["emerald", "green", "lime", "orange", "amber", "yellow", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
var MENU_MODE_OPTIONS = [
  { label: "Static", value: "static" },
  { label: "Overlay", value: "overlay" }
];
var SURFACES = [
  {
    name: "slate",
    palette: {
      0: "#ffffff",
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617"
    }
  },
  {
    name: "gray",
    palette: {
      0: "#ffffff",
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712"
    }
  },
  {
    name: "zinc",
    palette: {
      0: "#ffffff",
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b"
    }
  },
  {
    name: "neutral",
    palette: {
      0: "#ffffff",
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a"
    }
  },
  {
    name: "stone",
    palette: {
      0: "#ffffff",
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
      950: "#0c0a09"
    }
  },
  {
    name: "soho",
    palette: {
      0: "#ffffff",
      50: "#ececec",
      100: "#dedfdf",
      200: "#c4c4c6",
      300: "#adaeb0",
      400: "#97979b",
      500: "#7f8084",
      600: "#6a6b70",
      700: "#55565b",
      800: "#3f4046",
      900: "#2c2c34",
      950: "#16161d"
    }
  },
  {
    name: "viva",
    palette: {
      0: "#ffffff",
      50: "#f3f3f3",
      100: "#e7e7e8",
      200: "#cfd0d0",
      300: "#b7b8b9",
      400: "#9fa1a1",
      500: "#87898a",
      600: "#6e7173",
      700: "#565a5b",
      800: "#3e4244",
      900: "#262b2c",
      950: "#0e1315"
    }
  },
  {
    name: "ocean",
    palette: {
      0: "#ffffff",
      50: "#fbfcfc",
      100: "#F7F9F8",
      200: "#EFF3F2",
      300: "#DADEDD",
      400: "#B1B7B6",
      500: "#828787",
      600: "#5F7274",
      700: "#415B61",
      800: "#29444E",
      900: "#183240",
      950: "#0c1920"
    }
  }
];
var AppConfigurator = class _AppConfigurator {
  router = inject(Router);
  layoutService = inject(LayoutService);
  platformId = inject(PLATFORM_ID);
  presets = Object.keys(presets);
  menuModeOptions = MENU_MODE_OPTIONS;
  surfaces = SURFACES;
  showMenuModeButton = signal(!this.router.url.includes("auth"), ...ngDevMode ? [{ debugName: "showMenuModeButton" }] : []);
  selectedPrimaryColor = computed(() => this.layoutService.layoutConfig().primary, ...ngDevMode ? [{ debugName: "selectedPrimaryColor" }] : []);
  selectedSurfaceColor = computed(() => this.layoutService.layoutConfig().surface, ...ngDevMode ? [{ debugName: "selectedSurfaceColor" }] : []);
  selectedPreset = computed(() => this.layoutService.layoutConfig().preset, ...ngDevMode ? [{ debugName: "selectedPreset" }] : []);
  menuMode = computed(() => this.layoutService.layoutConfig().menuMode, ...ngDevMode ? [{ debugName: "menuMode" }] : []);
  primaryColors = computed(() => {
    const presetPalette = presets[this.layoutService.layoutConfig().preset].primitive;
    const palettes = [{ name: "noir", palette: {} }];
    PRIMARY_COLOR_NAMES.forEach((color) => {
      palettes.push({
        name: color,
        palette: presetPalette?.[color]
      });
    });
    return palettes;
  }, ...ngDevMode ? [{ debugName: "primaryColors" }] : []);
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onPresetChange(this.layoutService.layoutConfig().preset);
    }
  }
  getPresetExt() {
    const color = this.primaryColors().find((c86) => c86.name === this.selectedPrimaryColor()) || {};
    const preset = this.layoutService.layoutConfig().preset;
    if (color.name === "noir") {
      return this.buildNoirPresetExt();
    }
    if (preset === "Nora") {
      return this.buildNoraPresetExt(color.palette);
    }
    return this.buildDefaultPresetExt(color.palette);
  }
  updateColors(event, type, color) {
    if (type === "primary") {
      this.updateLayoutConfig({ primary: color.name });
    } else if (type === "surface") {
      this.updateLayoutConfig({ surface: color.name });
    }
    this.applyTheme(type, color);
    event.stopPropagation();
  }
  applyTheme(type, color) {
    if (type === "primary") {
      a43(this.getPresetExt());
    } else if (type === "surface") {
      s12(color.palette);
    }
  }
  onPresetChange(event) {
    this.updateLayoutConfig({ preset: event });
    const preset = presets[event];
    const surfacePalette = this.surfaces.find((s34) => s34.name === this.selectedSurfaceColor())?.palette;
    w().preset(preset).preset(this.getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
  }
  onMenuModeChange(event) {
    this.updateLayoutConfig({ menuMode: event });
  }
  updateLayoutConfig(patch) {
    this.layoutService.layoutConfig.update((state) => __spreadValues(__spreadValues({}, state), patch));
  }
  /** "Noir" maps the primary scale onto the surface scale. */
  buildNoirPresetExt() {
    return {
      semantic: {
        primary: {
          50: "{surface.50}",
          100: "{surface.100}",
          200: "{surface.200}",
          300: "{surface.300}",
          400: "{surface.400}",
          500: "{surface.500}",
          600: "{surface.600}",
          700: "{surface.700}",
          800: "{surface.800}",
          900: "{surface.900}",
          950: "{surface.950}"
        },
        colorScheme: {
          light: {
            primary: {
              color: "{primary.950}",
              contrastColor: "#ffffff",
              hoverColor: "{primary.800}",
              activeColor: "{primary.700}"
            },
            highlight: {
              background: "{primary.950}",
              focusBackground: "{primary.700}",
              color: "#ffffff",
              focusColor: "#ffffff"
            }
          },
          dark: {
            primary: {
              color: "{primary.50}",
              contrastColor: "{primary.950}",
              hoverColor: "{primary.200}",
              activeColor: "{primary.300}"
            },
            highlight: {
              background: "{primary.50}",
              focusBackground: "{primary.300}",
              color: "{primary.950}",
              focusColor: "{primary.950}"
            }
          }
        }
      }
    };
  }
  buildNoraPresetExt(palette) {
    return {
      semantic: {
        primary: palette,
        colorScheme: {
          light: {
            primary: {
              color: "{primary.600}",
              contrastColor: "#ffffff",
              hoverColor: "{primary.700}",
              activeColor: "{primary.800}"
            },
            highlight: {
              background: "{primary.600}",
              focusBackground: "{primary.700}",
              color: "#ffffff",
              focusColor: "#ffffff"
            }
          },
          dark: {
            primary: {
              color: "{primary.500}",
              contrastColor: "{surface.900}",
              hoverColor: "{primary.400}",
              activeColor: "{primary.300}"
            },
            highlight: {
              background: "{primary.500}",
              focusBackground: "{primary.400}",
              color: "{surface.900}",
              focusColor: "{surface.900}"
            }
          }
        }
      }
    };
  }
  buildDefaultPresetExt(palette) {
    return {
      semantic: {
        primary: palette,
        colorScheme: {
          light: {
            primary: {
              color: "{primary.500}",
              contrastColor: "#ffffff",
              hoverColor: "{primary.600}",
              activeColor: "{primary.700}"
            },
            highlight: {
              background: "{primary.50}",
              focusBackground: "{primary.100}",
              color: "{primary.700}",
              focusColor: "{primary.800}"
            }
          },
          dark: {
            primary: {
              color: "{primary.400}",
              contrastColor: "{surface.900}",
              hoverColor: "{primary.300}",
              activeColor: "{primary.200}"
            },
            highlight: {
              background: "color-mix(in srgb, {primary.400}, transparent 84%)",
              focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
              color: "rgba(255,255,255,.87)",
              focusColor: "rgba(255,255,255,.87)"
            }
          }
        }
      }
    };
  }
  static \u0275fac = function AppConfigurator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppConfigurator)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppConfigurator, selectors: [["app-configurator"]], hostAttrs: [1, "hidden", "absolute", "top-13", "right-0", "w-72", "p-4", "bg-surface-0", "dark:bg-surface-900", "border", "border-surface", "rounded-border", "origin-top", "shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"], decls: 29, vars: 6, consts: [[1, "flex", "flex-col", "gap-4"], ["aria-labelledby", "high-contrast-label", 1, "flex", "flex-col", "gap-2"], ["id", "high-contrast-label", 1, "text-sm", "text-muted-color", "font-semibold"], ["type", "button", "role", "switch", 1, "high-contrast-toggle", "flex", "items-center", "justify-between", "gap-3", "rounded-border", "border", "border-surface", "p-3", "text-left", 3, "click"], [1, "block", "font-semibold"], [1, "block", "text-sm", "text-muted-color"], ["aria-hidden", "true", 1, "font-semibold"], [1, "text-sm", "text-muted-color", "font-semibold"], [1, "pt-2", "flex", "gap-2", "flex-wrap", "justify-start"], ["type", "button", 1, "cursor-pointer", "w-5", "h-5", "rounded-full", "flex", "shrink-0", "items-center", "justify-center", "outline-offset-1", "shadow", 3, "title", "ngClass", "style"], ["type", "button", 1, "cursor-pointer", "w-5", "h-5", "rounded-full", "flex", "shrink-0", "items-center", "justify-center", "p-0", "outline-offset-1", 3, "title", "ngClass", "style"], [1, "flex", "flex-col", "gap-2"], ["size", "small", 3, "ngModelChange", "options", "ngModel", "allowEmpty"], ["class", "flex flex-col gap-2", 4, "ngIf"], ["type", "button", 1, "cursor-pointer", "w-5", "h-5", "rounded-full", "flex", "shrink-0", "items-center", "justify-center", "outline-offset-1", "shadow", 3, "click", "title", "ngClass"], ["type", "button", 1, "cursor-pointer", "w-5", "h-5", "rounded-full", "flex", "shrink-0", "items-center", "justify-center", "p-0", "outline-offset-1", 3, "click", "title", "ngClass"], ["size", "small", 3, "ngModelChange", "ngModel", "options", "allowEmpty"]], template: function AppConfigurator_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "span", 2);
      \u0275\u0275text(3, "Affichage");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function AppConfigurator_Template_button_click_4_listener() {
        return ctx.layoutService.setHighContrast(!ctx.layoutService.highContrast());
      });
      \u0275\u0275elementStart(5, "span")(6, "span", 4);
      \u0275\u0275text(7, "Contraste renforc\xE9");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "Texte, contours et focus plus visibles");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div")(13, "span", 7);
      \u0275\u0275text(14, "Primary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 8);
      \u0275\u0275repeaterCreate(16, AppConfigurator_For_17_Template, 1, 8, "button", 9, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div")(19, "span", 7);
      \u0275\u0275text(20, "Surface");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 8);
      \u0275\u0275repeaterCreate(22, AppConfigurator_For_23_Template, 1, 8, "button", 10, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 11)(25, "span", 7);
      \u0275\u0275text(26, "Presets");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p-selectbutton", 12);
      \u0275\u0275listener("ngModelChange", function AppConfigurator_Template_p_selectbutton_ngModelChange_27_listener($event) {
        return ctx.onPresetChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(28, AppConfigurator_div_28_Template, 4, 3, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-checked", ctx.layoutService.highContrast());
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.layoutService.highContrast() ? "Activ\xE9" : "D\xE9sactiv\xE9");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.primaryColors());
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.surfaces);
      \u0275\u0275advance(5);
      \u0275\u0275property("options", ctx.presets)("ngModel", ctx.selectedPreset())("allowEmpty", false);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showMenuModeButton());
    }
  }, dependencies: [CommonModule, NgClass, NgIf, FormsModule, NgControlStatus, NgModel, SelectButtonModule, SelectButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppConfigurator, [{
    type: Component,
    args: [{ selector: "app-configurator", imports: [CommonModule, FormsModule, SelectButtonModule], host: {
      class: "hidden absolute top-13 right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
    }, template: `<div class="flex flex-col gap-4">
    <section class="flex flex-col gap-2" aria-labelledby="high-contrast-label">
        <span id="high-contrast-label" class="text-sm text-muted-color font-semibold">Affichage</span>
        <button
            type="button"
            class="high-contrast-toggle flex items-center justify-between gap-3 rounded-border border border-surface p-3 text-left"
            role="switch"
            [attr.aria-checked]="layoutService.highContrast()"
            (click)="layoutService.setHighContrast(!layoutService.highContrast())"
        >
            <span>
                <span class="block font-semibold">Contraste renforc\xE9</span>
                <span class="block text-sm text-muted-color">Texte, contours et focus plus visibles</span>
            </span>
            <span aria-hidden="true" class="font-semibold">{{ layoutService.highContrast() ? 'Activ\xE9' : 'D\xE9sactiv\xE9' }}</span>
        </button>
    </section>

    <!-- Primary color -->
    <div>
        <span class="text-sm text-muted-color font-semibold">Primary</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-start">
            @for (primaryColor of primaryColors(); track primaryColor.name) {
                <button
                    type="button"
                    [title]="primaryColor.name"
                    (click)="updateColors($event, 'primary', primaryColor)"
                    [ngClass]="{
                        'outline outline-primary': primaryColor.name === selectedPrimaryColor()
                    }"
                    class="cursor-pointer w-5 h-5 rounded-full flex shrink-0 items-center justify-center outline-offset-1 shadow"
                    [style]="{
                        'background-color': primaryColor?.name === 'noir' ? 'var(--text-color)' : primaryColor?.palette?.['500']
                    }"
                ></button>
            }
        </div>
    </div>

    <!-- Surface color -->
    <div>
        <span class="text-sm text-muted-color font-semibold">Surface</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-start">
            @for (surface of surfaces; track surface.name) {
                <button
                    type="button"
                    [title]="surface.name"
                    (click)="updateColors($event, 'surface', surface)"
                    class="cursor-pointer w-5 h-5 rounded-full flex shrink-0 items-center justify-center p-0 outline-offset-1"
                    [ngClass]="{
                        'outline outline-primary': selectedSurfaceColor() ? selectedSurfaceColor() === surface.name : layoutService.layoutConfig().darkTheme ? surface.name === 'zinc' : surface.name === 'slate'
                    }"
                    [style]="{
                        'background-color': surface?.palette?.['500']
                    }"
                ></button>
            }
        </div>
    </div>

    <!-- Theme preset -->
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Presets</span>
        <p-selectbutton [options]="presets" [ngModel]="selectedPreset()" (ngModelChange)="onPresetChange($event)" [allowEmpty]="false" size="small" />
    </div>

    <!-- Menu mode -->
    <div *ngIf="showMenuModeButton()" class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Menu Mode</span>
        <p-selectbutton [ngModel]="menuMode()" (ngModelChange)="onMenuModeChange($event)" [options]="menuModeOptions" [allowEmpty]="false" size="small" />
    </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppConfigurator, { className: "AppConfigurator", filePath: "src/app/layout/component/configurator/app.configurator.ts", lineNumber: 195 });
})();

// node_modules/@primeuix/styles/dist/menu/index.mjs
var style = "\n    .p-menu {\n        background: dt('menu.background');\n        color: dt('menu.color');\n        border: 1px solid dt('menu.border.color');\n        border-radius: dt('menu.border.radius');\n        min-width: 12.5rem;\n    }\n\n    .p-menu-list {\n        margin: 0;\n        padding: dt('menu.list.padding');\n        outline: 0 none;\n        list-style: none;\n        display: flex;\n        flex-direction: column;\n        gap: dt('menu.list.gap');\n    }\n\n    .p-menu-item-content {\n        transition:\n            background dt('menu.transition.duration'),\n            color dt('menu.transition.duration');\n        border-radius: dt('menu.item.border.radius');\n        color: dt('menu.item.color');\n        overflow: hidden;\n    }\n\n    .p-menu-item-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n        color: inherit;\n        padding: dt('menu.item.padding');\n        gap: dt('menu.item.gap');\n        user-select: none;\n        outline: 0 none;\n    }\n\n    .p-menu-item-label {\n        line-height: 1;\n    }\n\n    .p-menu-item-icon {\n        color: dt('menu.item.icon.color');\n    }\n\n    .p-menu-item.p-focus .p-menu-item-content {\n        color: dt('menu.item.focus.color');\n        background: dt('menu.item.focus.background');\n    }\n\n    .p-menu-item.p-focus .p-menu-item-icon {\n        color: dt('menu.item.icon.focus.color');\n    }\n\n    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {\n        color: dt('menu.item.focus.color');\n        background: dt('menu.item.focus.background');\n    }\n\n    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {\n        color: dt('menu.item.icon.focus.color');\n    }\n\n    .p-menu-overlay {\n        box-shadow: dt('menu.shadow');\n    }\n\n    .p-menu-submenu-label {\n        background: dt('menu.submenu.label.background');\n        padding: dt('menu.submenu.label.padding');\n        color: dt('menu.submenu.label.color');\n        font-weight: dt('menu.submenu.label.font.weight');\n    }\n\n    .p-menu-separator {\n        border-block-start: 1px solid dt('menu.separator.border.color');\n    }\n";

// node_modules/primeng/fesm2022/primeng-menu.mjs
var _c02 = ["pMenuItemContent", ""];
var _c12 = (a0) => ({
  $implicit: a0
});
var _c2 = () => ({
  exact: false
});
var _c3 = (a0) => ({
  item: a0
});
function MenuItemContent_ng_container_1_a_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function MenuItemContent_ng_container_1_a_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_1_ng_container_1_Template, 1, 0, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const itemContent_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.item == null ? null : ctx_r1.item.linkClass));
    \u0275\u0275property("ngStyle", ctx_r1.item == null ? null : ctx_r1.item.linkStyle)("target", ctx_r1.item.target)("pBind", ctx_r1.getPTOptions("itemLink"));
    \u0275\u0275attribute("title", ctx_r1.item.title)("href", ctx_r1.item.url || null, \u0275\u0275sanitizeUrl)("data-automationid", ctx_r1.item.automationId)("tabindex", -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemContent_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(11, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_container_1_a_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function MenuItemContent_ng_container_1_a_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 8);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_2_ng_container_1_Template, 1, 0, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const itemContent_r3 = \u0275\u0275reference(4);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.item == null ? null : ctx_r1.item.linkClass));
    \u0275\u0275property("routerLink", ctx_r1.item.routerLink)("queryParams", ctx_r1.item.queryParams)("routerLinkActiveOptions", ctx_r1.item.routerLinkActiveOptions || \u0275\u0275pureFunction0(19, _c2))("ngStyle", ctx_r1.item == null ? null : ctx_r1.item.linkStyle)("target", ctx_r1.item.target)("fragment", ctx_r1.item.fragment)("queryParamsHandling", ctx_r1.item.queryParamsHandling)("preserveFragment", ctx_r1.item.preserveFragment)("skipLocationChange", ctx_r1.item.skipLocationChange)("replaceUrl", ctx_r1.item.replaceUrl)("state", ctx_r1.item.state)("pBind", ctx_r1.getPTOptions("itemLink"));
    \u0275\u0275attribute("data-automationid", ctx_r1.item.automationId)("tabindex", -1)("title", ctx_r1.item.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", itemContent_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction1(20, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MenuItemContent_ng_container_1_a_1_Template, 2, 13, "a", 4)(2, MenuItemContent_ng_container_1_a_2_Template, 2, 22, "a", 5);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r1.item == null ? null : ctx_r1.item.routerLink));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.item == null ? null : ctx_r1.item.routerLink);
  }
}
function MenuItemContent_ng_container_2_1_ng_template_0_Template(rf, ctx) {
}
function MenuItemContent_ng_container_2_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MenuItemContent_ng_container_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MenuItemContent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MenuItemContent_ng_container_2_1_Template, 1, 0, null, 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.itemTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c12, ctx_r1.item));
  }
}
function MenuItemContent_ng_template_3_span_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemIcon", \u0275\u0275pureFunction1(5, _c3, ctx_r1.item)), ctx_r1.item.iconClass));
    \u0275\u0275property("pBind", ctx_r1.getPTOptions("itemIcon"))("ngStyle", ctx_r1.item.iconStyle);
    \u0275\u0275attribute("data-pc-section", "itemicon");
  }
}
function MenuItemContent_ng_template_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.item.labelClass));
    \u0275\u0275property("ngStyle", ctx_r1.item.labelStyle)("pBind", ctx_r1.getPTOptions("itemLabel"));
    \u0275\u0275attribute("data-pc-section", "itemlabel");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.item.label);
  }
}
function MenuItemContent_ng_template_3_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
    \u0275\u0275pipe(1, "safeHtml");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.item.labelClass));
    \u0275\u0275property("ngStyle", ctx_r1.item.labelStyle)("innerHTML", \u0275\u0275pipeBind1(1, 6, ctx_r1.item.label), \u0275\u0275sanitizeHtml)("pBind", ctx_r1.getPTOptions("itemLabel"));
    \u0275\u0275attribute("data-pc-section", "itemlabel");
  }
}
function MenuItemContent_ng_template_3_p_badge_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-badge", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("styleClass", ctx_r1.item.badgeStyleClass)("value", ctx_r1.item.badge)("pt", ctx_r1.getPTOptions("pcBadge"))("unstyled", ctx_r1.unstyled());
  }
}
function MenuItemContent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MenuItemContent_ng_template_3_span_0_Template, 1, 7, "span", 9)(1, MenuItemContent_ng_template_3_span_1_Template, 2, 6, "span", 10)(2, MenuItemContent_ng_template_3_ng_template_2_Template, 2, 8, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(4, MenuItemContent_ng_template_3_p_badge_4_Template, 1, 4, "p-badge", 11);
  }
  if (rf & 2) {
    const htmlLabel_r4 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r1.item.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.item.escape !== false)("ngIfElse", htmlLabel_r4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.item.badge);
  }
}
var _c4 = ["start"];
var _c5 = ["end"];
var _c6 = ["header"];
var _c7 = ["item"];
var _c8 = ["submenuheader"];
var _c9 = ["list"];
var _c10 = ["container"];
var _c11 = (a0, a1) => ({
  item: a0,
  id: a1
});
function Menu_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-motion", 5);
    \u0275\u0275listener("onBeforeEnter", function Menu_Conditional_0_Template_p_motion_onBeforeEnter_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayBeforeEnter($event));
    })("onAfterLeave", function Menu_Conditional_0_Template_p_motion_onAfterLeave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayAfterLeave());
    });
    \u0275\u0275template(1, Menu_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const sharedcontent_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("visible", ctx_r1.visible)("appear", ctx_r1.popup)("options", ctx_r1.computedMotionOptions());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", sharedcontent_r3);
  }
}
function Menu_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const sharedcontent_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", sharedcontent_r3);
  }
}
function Menu_ng_template_2_div_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, Menu_ng_template_2_div_2_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cx("start"));
    \u0275\u0275property("pBind", ctx_r1.ptm("start"));
    \u0275\u0275attribute("data-pc-section", "start");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.startTemplate ?? ctx_r1._startTemplate);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const submenu_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(submenu_r5.label);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 19);
    \u0275\u0275pipe(1, "safeHtml");
  }
  if (rf & 2) {
    const submenu_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(1, 1, submenu_r5.label), \u0275\u0275sanitizeHtml);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_span_1_Template, 2, 1, "span", 18)(2, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_ng_template_2_Template, 2, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const htmlSubmenuLabel_r6 = \u0275\u0275reference(3);
    const submenu_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", submenu_r5.escape !== false)("ngIfElse", htmlSubmenuLabel_r6);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_5_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 16);
    \u0275\u0275template(1, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_1_Template, 4, 2, "ng-container", 10)(2, Menu_ng_template_2_5_ng_template_0_li_1_ng_container_2_Template, 1, 0, "ng-container", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    const submenu_r5 = ctx_r6.$implicit;
    const i_r8 = ctx_r6.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.cx("submenuLabel"));
    \u0275\u0275property("pBind", ctx_r1.ptm("submenuLabel"))("tooltipOptions", submenu_r5.tooltipOptions)("pTooltipUnstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-automationid", submenu_r5.automationId)("id", ctx_r1.menuitemId(submenu_r5, ctx_r1.id, i_r8))("data-pc-section", "submenulabel");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.submenuHeaderTemplate && !ctx_r1._submenuHeaderTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.submenuHeaderTemplate ?? ctx_r1._submenuHeaderTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(11, _c12, submenu_r5));
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 21);
    \u0275\u0275listener("onMenuItemClick", function Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template_li_onMenuItemClick_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r9 = \u0275\u0275nextContext();
      const item_r11 = ctx_r9.$implicit;
      const j_r12 = ctx_r9.index;
      const i_r8 = \u0275\u0275nextContext().index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.itemClick($event, ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12)));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const item_r11 = ctx_r9.$implicit;
    const j_r12 = ctx_r9.index;
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleMap(item_r11.style);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("item", \u0275\u0275pureFunction2(17, _c11, item_r11, ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12))), item_r11 == null ? null : item_r11.styleClass));
    \u0275\u0275property("pMenuItemContent", item_r11)("itemTemplate", ctx_r1.itemTemplate ?? ctx_r1._itemTemplate)("idx", j_r12)("menuitemId", ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12))("tooltipOptions", item_r11.tooltipOptions)("pTooltipUnstyled", ctx_r1.unstyled())("unstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-pc-section", "menuitem")("aria-label", ctx_r1.label(item_r11.label))("data-p-focused", ctx_r1.isItemFocused(ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12)))("data-p-disabled", ctx_r1.disabled(item_r11.disabled))("aria-disabled", ctx_r1.disabled(item_r11.disabled))("id", ctx_r1.menuitemId(item_r11, ctx_r1.id, i_r8, j_r12));
  }
}
function Menu_ng_template_2_5_ng_template_0_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_ng_template_2_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_5_ng_template_0_ng_template_2_li_1_Template, 1, 20, "li", 20);
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const submenu_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngIf", item_r11.separator && (item_r11.visible !== false || submenu_r5.visible !== false));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r11.separator && item_r11.visible !== false && (item_r11.visible !== void 0 || submenu_r5.visible !== false));
  }
}
function Menu_ng_template_2_5_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_5_ng_template_0_li_1_Template, 3, 13, "li", 14)(2, Menu_ng_template_2_5_ng_template_0_ng_template_2_Template, 2, 2, "ng-template", 12);
  }
  if (rf & 2) {
    const submenu_r5 = ctx.$implicit;
    \u0275\u0275property("ngIf", submenu_r5.separator && submenu_r5.visible !== false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !submenu_r5.separator);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", submenu_r5.items);
  }
}
function Menu_ng_template_2_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_5_ng_template_0_Template, 3, 3, "ng-template", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngForOf", ctx_r1.model);
  }
}
function Menu_ng_template_2_6_ng_template_0_li_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r1.cx("separator"));
    \u0275\u0275property("pBind", ctx_r1.ptm("separator"));
    \u0275\u0275attribute("data-pc-section", "separator");
  }
}
function Menu_ng_template_2_6_ng_template_0_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 23);
    \u0275\u0275listener("onMenuItemClick", function Menu_ng_template_2_6_ng_template_0_li_1_Template_li_onMenuItemClick_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r13 = \u0275\u0275nextContext();
      const item_r15 = ctx_r13.$implicit;
      const i_r16 = ctx_r13.index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.itemClick($event, ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16)));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const item_r15 = ctx_r13.$implicit;
    const i_r16 = ctx_r13.index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("item", \u0275\u0275pureFunction2(16, _c11, item_r15, ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16))), item_r15 == null ? null : item_r15.styleClass));
    \u0275\u0275property("pMenuItemContent", item_r15)("itemTemplate", ctx_r1.itemTemplate ?? ctx_r1._itemTemplate)("idx", i_r16)("menuitemId", ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16))("ngStyle", item_r15.style)("tooltipOptions", item_r15.tooltipOptions)("unstyled", ctx_r1.unstyled())("pTooltipUnstyled", ctx_r1.unstyled());
    \u0275\u0275attribute("data-pc-section", "menuitem")("aria-label", ctx_r1.label(item_r15.label))("data-p-focused", ctx_r1.isItemFocused(ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16)))("data-p-disabled", ctx_r1.disabled(item_r15.disabled))("aria-disabled", ctx_r1.disabled(item_r15.disabled))("id", ctx_r1.menuitemId(item_r15, ctx_r1.id, i_r16));
  }
}
function Menu_ng_template_2_6_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_6_ng_template_0_li_0_Template, 1, 4, "li", 13)(1, Menu_ng_template_2_6_ng_template_0_li_1_Template, 1, 19, "li", 22);
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    \u0275\u0275property("ngIf", item_r15.separator && item_r15.visible !== false);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r15.separator && item_r15.visible !== false);
  }
}
function Menu_ng_template_2_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, Menu_ng_template_2_6_ng_template_0_Template, 2, 2, "ng-template", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngForOf", ctx_r1.model);
  }
}
function Menu_ng_template_2_div_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Menu_ng_template_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, Menu_ng_template_2_div_7_ng_container_1_Template, 1, 0, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r1.cx("end"));
    \u0275\u0275property("pBind", ctx_r1.ptm("end"));
    \u0275\u0275attribute("data-pc-section", "end");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.endTemplate ?? ctx_r1._endTemplate);
  }
}
function Menu_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7, 1);
    \u0275\u0275listener("click", function Menu_ng_template_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick($event));
    });
    \u0275\u0275template(2, Menu_ng_template_2_div_2_Template, 2, 5, "div", 8);
    \u0275\u0275elementStart(3, "ul", 9, 2);
    \u0275\u0275listener("focus", function Menu_ng_template_2_Template_ul_focus_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListFocus($event));
    })("blur", function Menu_ng_template_2_Template_ul_blur_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListBlur($event));
    })("keydown", function Menu_ng_template_2_Template_ul_keydown_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onListKeyDown($event));
    });
    \u0275\u0275template(5, Menu_ng_template_2_5_Template, 1, 1, null, 10)(6, Menu_ng_template_2_6_Template, 1, 1, null, 10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, Menu_ng_template_2_div_7_Template, 2, 5, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.sx("root"));
    \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1.styleClass));
    \u0275\u0275property("ngStyle", ctx_r1.style)("pBind", ctx_r1.ptm("root"));
    \u0275\u0275attribute("id", ctx_r1.id)("data-p", ctx_r1.dataP);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.startTemplate ?? ctx_r1._startTemplate);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.cx("list"));
    \u0275\u0275property("pBind", ctx_r1.ptm("list"));
    \u0275\u0275attribute("id", ctx_r1.id + "_list")("tabindex", ctx_r1.getTabIndexValue())("data-pc-section", "menu")("aria-activedescendant", ctx_r1.activedescendant())("aria-label", ctx_r1.ariaLabel)("aria-labelledBy", ctx_r1.ariaLabelledBy);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.hasSubMenu());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.hasSubMenu());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.endTemplate ?? ctx_r1._endTemplate);
  }
}
var inlineStyles = {
  root: ({
    instance
  }) => ({
    position: instance.popup ? "absolute" : "relative"
  })
};
var classes = {
  root: ({
    instance
  }) => ["p-menu p-component", {
    "p-menu-overlay": instance.popup
  }],
  start: "p-menu-start",
  list: "p-menu-list",
  submenuLabel: "p-menu-submenu-label",
  separator: "p-menu-separator",
  end: "p-menu-end",
  item: ({
    instance,
    item,
    id
  }) => ["p-menu-item", {
    "p-focus": instance.focusedOptionId() && id === instance.focusedOptionId(),
    "p-disabled": instance.disabled(item.disabled)
  }, item.styleClass],
  itemContent: "p-menu-item-content",
  itemLink: "p-menu-item-link",
  itemIcon: ({
    item
  }) => ["p-menu-item-icon", item.icon, item.iconClass],
  itemLabel: "p-menu-item-label"
};
var MenuStyle = class _MenuStyle extends BaseStyle {
  name = "menu";
  style = style;
  classes = classes;
  inlineStyles = inlineStyles;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MenuStyle_BaseFactory;
    return function MenuStyle_Factory(__ngFactoryType__) {
      return (\u0275MenuStyle_BaseFactory || (\u0275MenuStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MenuStyle)))(__ngFactoryType__ || _MenuStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MenuStyle,
    factory: _MenuStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuStyle, [{
    type: Injectable
  }], null, null);
})();
var MenuClasses;
(function(MenuClasses2) {
  MenuClasses2["root"] = "p-menu";
  MenuClasses2["start"] = "p-menu-start";
  MenuClasses2["list"] = "p-menu-list";
  MenuClasses2["submenuItem"] = "p-menu-submenu-item";
  MenuClasses2["separator"] = "p-menu-separator";
  MenuClasses2["end"] = "p-menu-end";
  MenuClasses2["item"] = "p-menu-item";
  MenuClasses2["itemContent"] = "p-menu-item-content";
  MenuClasses2["itemLink"] = "p-menu-item-link";
  MenuClasses2["itemIcon"] = "p-menu-item-icon";
  MenuClasses2["itemLabel"] = "p-menu-item-label";
})(MenuClasses || (MenuClasses = {}));
var MENU_INSTANCE = new InjectionToken("MENU_INSTANCE");
var SafeHtmlPipe = class _SafeHtmlPipe {
  platformId;
  sanitizer;
  constructor(platformId, sanitizer) {
    this.platformId = platformId;
    this.sanitizer = sanitizer;
  }
  transform(value) {
    if (!value || !isPlatformBrowser(this.platformId)) {
      return value;
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  static \u0275fac = function SafeHtmlPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SafeHtmlPipe)(\u0275\u0275directiveInject(PLATFORM_ID, 16), \u0275\u0275directiveInject(DomSanitizer, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({
    name: "safeHtml",
    type: _SafeHtmlPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SafeHtmlPipe, [{
    type: Pipe,
    args: [{
      name: "safeHtml",
      standalone: true
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: DomSanitizer
  }], null);
})();
var MenuItemContent = class _MenuItemContent extends BaseComponent {
  item;
  itemTemplate;
  menuitemId = input("", ...ngDevMode ? [{
    debugName: "menuitemId"
  }] : []);
  idx = input(0, ...ngDevMode ? [{
    debugName: "idx"
  }] : []);
  onMenuItemClick = new EventEmitter();
  menu;
  _componentStyle = inject(MenuStyle);
  hostName = "Menu";
  constructor(menu) {
    super();
    this.menu = menu;
  }
  onItemClick(event, item) {
    this.onMenuItemClick.emit({
      originalEvent: event,
      item
    });
  }
  getPTOptions(key) {
    return this.menu.getPTOptions(key, this.item, this.idx(), this.menuitemId());
  }
  static \u0275fac = function MenuItemContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuItemContent)(\u0275\u0275directiveInject(forwardRef(() => Menu)));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MenuItemContent,
    selectors: [["", "pMenuItemContent", ""]],
    inputs: {
      item: [0, "pMenuItemContent", "item"],
      itemTemplate: "itemTemplate",
      menuitemId: [1, "menuitemId"],
      idx: [1, "idx"]
    },
    outputs: {
      onMenuItemClick: "onMenuItemClick"
    },
    features: [\u0275\u0275ProvidersFeature([MenuStyle]), \u0275\u0275InheritDefinitionFeature],
    attrs: _c02,
    decls: 5,
    vars: 6,
    consts: [["itemContent", ""], ["htmlLabel", ""], [3, "click", "pBind"], [4, "ngIf"], ["pRipple", "", 3, "class", "ngStyle", "target", "pBind", 4, "ngIf"], ["routerLinkActive", "p-menu-item-link-active", "pRipple", "", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "class", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind", 4, "ngIf"], ["pRipple", "", 3, "ngStyle", "target", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["routerLinkActive", "p-menu-item-link-active", "pRipple", "", 3, "routerLink", "queryParams", "routerLinkActiveOptions", "ngStyle", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "pBind"], [3, "class", "pBind", "ngStyle", 4, "ngIf"], [3, "class", "ngStyle", "pBind", 4, "ngIf", "ngIfElse"], [3, "styleClass", "value", "pt", "unstyled", 4, "ngIf"], [3, "pBind", "ngStyle"], [3, "ngStyle", "pBind"], [3, "ngStyle", "innerHTML", "pBind"], [3, "styleClass", "value", "pt", "unstyled"]],
    template: function MenuItemContent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275listener("click", function MenuItemContent_Template_div_click_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onItemClick($event, ctx.item));
        });
        \u0275\u0275template(1, MenuItemContent_ng_container_1_Template, 3, 2, "ng-container", 3)(2, MenuItemContent_ng_container_2_Template, 2, 4, "ng-container", 3)(3, MenuItemContent_ng_template_3_Template, 5, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("itemContent"));
        \u0275\u0275property("pBind", ctx.getPTOptions("itemContent"));
        \u0275\u0275attribute("data-pc-section", "content");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.itemTemplate);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.itemTemplate);
      }
    },
    dependencies: [CommonModule, NgIf, NgTemplateOutlet, NgStyle, RouterModule, RouterLink, RouterLinkActive, Ripple, TooltipModule, Bind, BadgeModule, Badge, SharedModule, BindModule, SafeHtmlPipe],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemContent, [{
    type: Component,
    args: [{
      selector: "[pMenuItemContent]",
      standalone: true,
      imports: [CommonModule, RouterModule, Ripple, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule],
      template: ` <div [class]="cx('itemContent')" (click)="onItemClick($event, item)" [attr.data-pc-section]="'content'" [pBind]="getPTOptions('itemContent')">
        <ng-container *ngIf="!itemTemplate">
            <a
                *ngIf="!item?.routerLink"
                [attr.title]="item.title"
                [attr.href]="item.url || null"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [class]="cn(cx('itemLink'), item?.linkClass)"
                [ngStyle]="item?.linkStyle"
                [target]="item.target"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
            <a
                *ngIf="item?.routerLink"
                [routerLink]="item.routerLink"
                [attr.data-automationid]="item.automationId"
                [attr.tabindex]="-1"
                [attr.title]="item.title"
                [queryParams]="item.queryParams"
                routerLinkActive="p-menu-item-link-active"
                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                [class]="cn(cx('itemLink'), item?.linkClass)"
                [ngStyle]="item?.linkStyle"
                [target]="item.target"
                [fragment]="item.fragment"
                [queryParamsHandling]="item.queryParamsHandling"
                [preserveFragment]="item.preserveFragment"
                [skipLocationChange]="item.skipLocationChange"
                [replaceUrl]="item.replaceUrl"
                [state]="item.state"
                [pBind]="getPTOptions('itemLink')"
                pRipple
            >
                <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: item }"></ng-container>
            </a>
        </ng-container>

        <ng-container *ngIf="itemTemplate">
            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
        </ng-container>

        <ng-template #itemContent>
            <span [class]="cn(cx('itemIcon', { item }), item.iconClass)" [pBind]="getPTOptions('itemIcon')" *ngIf="item.icon" [ngStyle]="item.iconStyle" [attr.data-pc-section]="'itemicon'"></span>
            <span [class]="cn(cx('itemLabel'), item.labelClass)" [ngStyle]="item.labelStyle" [pBind]="getPTOptions('itemLabel')" [attr.data-pc-section]="'itemlabel'" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
            <ng-template #htmlLabel><span [class]="cn(cx('itemLabel'), item.labelClass)" [ngStyle]="item.labelStyle" [attr.data-pc-section]="'itemlabel'" [innerHTML]="item.label | safeHtml" [pBind]="getPTOptions('itemLabel')"></span></ng-template>
            <p-badge *ngIf="item.badge" [styleClass]="item.badgeStyleClass" [value]="item.badge" [pt]="getPTOptions('pcBadge')" [unstyled]="unstyled()" />
        </ng-template>
    </div>`,
      encapsulation: ViewEncapsulation.None,
      providers: [MenuStyle]
    }]
  }], () => [{
    type: Menu,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => Menu)]
    }]
  }], {
    item: [{
      type: Input,
      args: ["pMenuItemContent"]
    }],
    itemTemplate: [{
      type: Input
    }],
    menuitemId: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "menuitemId",
        required: false
      }]
    }],
    idx: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "idx",
        required: false
      }]
    }],
    onMenuItemClick: [{
      type: Output
    }]
  });
})();
var Menu = class _Menu extends BaseComponent {
  overlayService;
  /**
   * An array of menuitems.
   * @group Props
   */
  model;
  /**
   * Defines if menu would displayed as a popup.
   * @group Props
   */
  popup;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Whether to automatically manage layering.
   * @group Props
   */
  autoZIndex = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex = 0;
  /**
   * Transition options of the show animation.
   * @deprecated since v21.0.0, use `motionOptions` instead.
   * @group Props
   */
  showTransitionOptions = ".12s cubic-bezier(0, 0, 0.2, 1)";
  /**
   * Transition options of the hide animation.
   * @deprecated since v21.0.0, use `motionOptions` instead.
   * @group Props
   */
  hideTransitionOptions = ".1s linear";
  /**
   * Defines a string value that labels an interactive element.
   * @group Props
   */
  ariaLabel;
  /**
   * Identifier of the underlying input element.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Current id state as a string.
   * @group Props
   */
  id;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : []);
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(void 0, ...ngDevMode ? [{
    debugName: "motionOptions"
  }] : []);
  computedMotionOptions = computed(() => {
    return __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions());
  }, ...ngDevMode ? [{
    debugName: "computedMotionOptions"
  }] : []);
  /**
   * Callback to invoke when overlay menu is shown.
   * @group Emits
   */
  onShow = new EventEmitter();
  /**
   * Callback to invoke when overlay menu is hidden.
   * @group Emits
   */
  onHide = new EventEmitter();
  /**
   * Callback to invoke when the list loses focus.
   * @param {Event} event - blur event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when the list receives focus.
   * @param {Event} event - focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  listViewChild = viewChild("list", ...ngDevMode ? [{
    debugName: "listViewChild"
  }] : []);
  containerViewChild = viewChild("container", ...ngDevMode ? [{
    debugName: "containerViewChild"
  }] : []);
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : []);
  container;
  scrollHandler;
  documentClickListener;
  documentResizeListener;
  preventDocumentDefault;
  target;
  visible;
  focusedOptionId = computed(() => {
    return this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : null;
  }, ...ngDevMode ? [{
    debugName: "focusedOptionId"
  }] : []);
  focusedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "focusedOptionIndex"
  }] : []);
  selectedOptionIndex = signal(-1, ...ngDevMode ? [{
    debugName: "selectedOptionIndex"
  }] : []);
  focused = false;
  overlayVisible = false;
  $pcMenu = inject(MENU_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  _componentStyle = inject(MenuStyle);
  bindDirectiveInstance = inject(Bind, {
    self: true
  });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  constructor(overlayService) {
    super();
    this.overlayService = overlayService;
    this.id = this.id || s("pn_id_");
  }
  getPTOptions(key, item, index, id) {
    return this.ptm(key, {
      context: {
        item,
        index,
        focused: this.isItemFocused(id),
        disabled: this.disabled(item.disabled)
      }
    });
  }
  /**
   * Toggles the visibility of the popup menu.
   * @param {Event} event - Browser event.
   * @group Method
   */
  toggle(event) {
    if (this.visible) this.hide();
    else this.show(event);
    this.preventDocumentDefault = true;
  }
  /**
   * Displays the popup menu.
   * @param {Event} event - Browser event.
   * @group Method
   */
  show(event) {
    if (this.container && !this.overlayVisible) {
      this.container = void 0;
    }
    this.target = event.currentTarget;
    this.visible = true;
    this.preventDocumentDefault = true;
    this.overlayVisible = true;
    this.cd.markForCheck();
  }
  onInit() {
    if (!this.popup) {
      this.bindDocumentClickListener();
    }
  }
  /**
   * Defines template option for start.
   * @group Templates
   */
  startTemplate;
  _startTemplate;
  /**
   * Defines template option for end.
   * @group Templates
   */
  endTemplate;
  _endTemplate;
  /**
   * Defines template option for header.
   * @group Templates
   */
  headerTemplate;
  _headerTemplate;
  /**
   * Custom item template.
   * @param {MenuItemTemplateContext} context - item context.
   * @see {@link MenuItemTemplateContext}
   * @group Templates
   */
  itemTemplate;
  _itemTemplate;
  /**
   * Custom submenu header template.
   * @param {MenuSubmenuHeaderTemplateContext} context - submenu header context.
   * @see {@link MenuSubmenuHeaderTemplateContext}
   * @group Templates
   */
  submenuHeaderTemplate;
  _submenuHeaderTemplate;
  templates;
  onAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "start":
          this._startTemplate = item.template;
          break;
        case "end":
          this._endTemplate = item.template;
          break;
        case "item":
          this._itemTemplate = item.template;
          break;
        case "submenuheader":
          this._submenuHeaderTemplate = item.template;
          break;
        default:
          this._itemTemplate = item.template;
          break;
      }
    });
  }
  getTabIndexValue() {
    return this.tabindex !== void 0 ? this.tabindex.toString() : null;
  }
  onOverlayBeforeEnter(event) {
    this.container = event.element;
    if (this.container) {
      const nativeElementOuterWidth = v(this.containerViewChild()?.nativeElement);
      S(this.container, {
        width: nativeElementOuterWidth + "px"
      });
      S(this.container, {
        position: "absolute",
        top: "0"
      });
      this.appendOverlay();
      this.moveOnTop();
      this.$attrSelector && this.container?.setAttribute(this.$attrSelector, "");
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
      this.bindScrollListener();
      D(this.container, this.target);
      bt(this.listViewChild()?.nativeElement);
      this.onShow.emit({});
    }
  }
  onOverlayAfterLeave() {
    this.restoreOverlayAppend();
    this.onOverlayHide();
    this.onHide.emit({});
  }
  appendOverlay() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body") {
        ut(this.document.body, this.container);
      } else {
        ut(this.$appendTo(), this.container);
      }
    }
  }
  restoreOverlayAppend() {
    if (this.container && this.$appendTo() !== "self") {
      ut(this.el.nativeElement, this.container);
    }
  }
  moveOnTop() {
    if (this.autoZIndex) {
      zindexutils.set("menu", this.container, this.baseZIndex + this.config.zIndex.menu);
    }
  }
  /**
   * Hides the popup menu.
   * @group Method
   */
  hide() {
    this.visible = false;
    this.overlayVisible = false;
    this.cd.markForCheck();
  }
  onWindowResize() {
    if (this.visible && !Yt()) {
      this.hide();
    }
  }
  menuitemId(item, id, index, childIndex) {
    return item?.id ?? `${id}_${index}${childIndex !== void 0 ? "_" + childIndex : ""}`;
  }
  isItemFocused(id) {
    return this.focusedOptionId() === id;
  }
  label(label) {
    return typeof label === "function" ? label() : label;
  }
  disabled(disabled) {
    return typeof disabled === "function" ? disabled() : typeof disabled === "undefined" ? false : disabled;
  }
  activedescendant() {
    return this.focused ? this.focusedOptionId() : void 0;
  }
  onListFocus(event) {
    if (!this.focused) {
      this.focused = true;
      !this.popup && this.changeFocusedOptionIndex(0);
      this.onFocus.emit(event);
    }
  }
  onListBlur(event) {
    if (this.focused) {
      this.focused = false;
      this.changeFocusedOptionIndex(-1);
      this.selectedOptionIndex.set(-1);
      this.focusedOptionIndex.set(-1);
      this.onBlur.emit(event);
    }
  }
  onListKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "Enter":
        this.onEnterKey(event);
        break;
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      case "Space":
        this.onSpaceKey(event);
        break;
      case "Escape":
      case "Tab":
        if (this.popup) {
          bt(this.target);
          this.hide();
        }
        this.overlayVisible && this.hide();
        break;
      default:
        break;
    }
  }
  onArrowDownKey(event) {
    const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex());
    this.changeFocusedOptionIndex(optionIndex);
    event.preventDefault();
  }
  onArrowUpKey(event) {
    if (event.altKey && this.popup) {
      bt(this.target);
      this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex());
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    }
  }
  onHomeKey(event) {
    this.changeFocusedOptionIndex(0);
    event.preventDefault();
  }
  onEndKey(event) {
    this.changeFocusedOptionIndex(Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
    event.preventDefault();
  }
  onEnterKey(event) {
    const element = z(this.containerViewChild()?.nativeElement, `li[id="${`${this.focusedOptionIndex()}`}"]`);
    const anchorElement = element && (z(element, '[data-pc-section="itemlink"]') || z(element, "a,button"));
    this.popup && bt(this.target);
    anchorElement ? anchorElement.click() : element && element.click();
    event.preventDefault();
  }
  onSpaceKey(event) {
    this.onEnterKey(event);
  }
  findNextOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    const matchedOptionIndex = [...links].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
  }
  findPrevOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    const matchedOptionIndex = [...links].findIndex((link) => link.id === index);
    return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
  }
  changeFocusedOptionIndex(index) {
    const links = Y(this.containerViewChild()?.nativeElement, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
    if (links.length > 0) {
      let order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
      order > -1 && this.focusedOptionIndex.set(links[order].getAttribute("id"));
    }
  }
  itemClick(event, id) {
    const {
      originalEvent,
      item
    } = event;
    if (!this.focused) {
      this.focused = true;
      this.onFocus.emit();
    }
    if (item.disabled) {
      originalEvent.preventDefault();
      return;
    }
    if (!item.url && !item.routerLink) {
      originalEvent.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent,
        item
      });
    }
    if (this.popup) {
      this.hide();
    }
    if (!this.popup && this.focusedOptionIndex() !== id) {
      this.focusedOptionIndex.set(id);
    }
  }
  onOverlayClick(event) {
    if (this.popup) {
      this.overlayService.add({
        originalEvent: event,
        target: this.el.nativeElement
      });
    }
    this.preventDocumentDefault = true;
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener && isPlatformBrowser(this.platformId)) {
      const documentTarget = this.el ? this.el.nativeElement.ownerDocument : "document";
      this.documentClickListener = this.renderer.listen(documentTarget, "click", (event) => {
        const isOutsideContainer = this.containerViewChild()?.nativeElement && !this.containerViewChild()?.nativeElement.contains(event.target);
        const isOutsideTarget = !(this.target && (this.target === event.target || this.target.contains(event.target)));
        if (!this.popup && isOutsideContainer && isOutsideTarget) {
          this.onListBlur(event);
        }
        if (this.preventDocumentDefault && this.overlayVisible && isOutsideContainer && isOutsideTarget) {
          this.hide();
          this.preventDocumentDefault = false;
        }
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener && isPlatformBrowser(this.platformId)) {
      const window2 = this.document.defaultView;
      this.documentResizeListener = this.renderer.listen(window2, "resize", this.onWindowResize.bind(this));
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler && isPlatformBrowser(this.platformId)) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
        if (this.visible) {
          this.hide();
        }
      });
    }
    this.scrollHandler?.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
      this.scrollHandler = null;
    }
  }
  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.preventDocumentDefault = false;
    if (!this.cd.destroyed) {
      this.target = null;
    }
    if (this.container) {
      if (this.autoZIndex) {
        zindexutils.clear(this.container);
      }
      this.container = void 0;
    }
  }
  onDestroy() {
    if (this.popup) {
      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }
      if (this.container) {
        if (this.autoZIndex) {
          zindexutils.clear(this.container);
        }
        this.container = void 0;
      }
      this.restoreOverlayAppend();
      this.onOverlayHide();
    }
    if (!this.popup) {
      this.unbindDocumentClickListener();
    }
  }
  hasSubMenu() {
    return this.model?.some((item) => item.items) ?? false;
  }
  isItemHidden(item) {
    if (item.separator) {
      return item.visible === false || item.items && item.items.some((subitem) => subitem.visible !== false);
    }
    return item.visible === false;
  }
  get dataP() {
    return this.cn({
      popup: this.popup
    });
  }
  static \u0275fac = function Menu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Menu)(\u0275\u0275directiveInject(OverlayService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Menu,
    selectors: [["p-menu"]],
    contentQueries: function Menu_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c4, 4)(dirIndex, _c5, 4)(dirIndex, _c6, 4)(dirIndex, _c7, 4)(dirIndex, _c8, 4)(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.startTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.endTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.headerTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.itemTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.submenuHeaderTemplate = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Menu_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.listViewChild, _c9, 5)(ctx.containerViewChild, _c10, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance(2);
      }
    },
    inputs: {
      model: "model",
      popup: [2, "popup", "popup", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      autoZIndex: [2, "autoZIndex", "autoZIndex", booleanAttribute],
      baseZIndex: [2, "baseZIndex", "baseZIndex", numberAttribute],
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      ariaLabel: "ariaLabel",
      ariaLabelledBy: "ariaLabelledBy",
      id: "id",
      tabindex: [2, "tabindex", "tabindex", numberAttribute],
      appendTo: [1, "appendTo"],
      motionOptions: [1, "motionOptions"]
    },
    outputs: {
      onShow: "onShow",
      onHide: "onHide",
      onBlur: "onBlur",
      onFocus: "onFocus"
    },
    features: [\u0275\u0275ProvidersFeature([MenuStyle, {
      provide: MENU_INSTANCE,
      useExisting: _Menu
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Menu
    }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
    decls: 4,
    vars: 1,
    consts: [["sharedcontent", ""], ["container", ""], ["list", ""], ["htmlSubmenuLabel", ""], ["name", "p-anchored-overlay", 3, "visible", "appear", "options"], ["name", "p-anchored-overlay", 3, "onBeforeEnter", "onAfterLeave", "visible", "appear", "options"], [4, "ngTemplateOutlet"], [3, "click", "ngStyle", "pBind"], [3, "class", "pBind", 4, "ngIf"], ["role", "menu", 3, "focus", "blur", "keydown", "pBind"], [4, "ngIf"], [3, "pBind"], ["ngFor", "", 3, "ngForOf"], ["role", "separator", 3, "class", "pBind", 4, "ngIf"], ["pTooltip", "", "role", "none", 3, "class", "pBind", "tooltipOptions", "pTooltipUnstyled", 4, "ngIf"], ["role", "separator", 3, "pBind"], ["pTooltip", "", "role", "none", 3, "pBind", "tooltipOptions", "pTooltipUnstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngIf", "ngIfElse"], [3, "innerHTML"], ["pTooltip", "", "role", "menuitem", 3, "class", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "style", "tooltipOptions", "pTooltipUnstyled", "unstyled", "onMenuItemClick", 4, "ngIf"], ["pTooltip", "", "role", "menuitem", 3, "onMenuItemClick", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "tooltipOptions", "pTooltipUnstyled", "unstyled"], ["pTooltip", "", "role", "menuitem", 3, "class", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "ngStyle", "tooltipOptions", "unstyled", "pTooltipUnstyled", "onMenuItemClick", 4, "ngIf"], ["pTooltip", "", "role", "menuitem", 3, "onMenuItemClick", "pMenuItemContent", "itemTemplate", "idx", "menuitemId", "ngStyle", "tooltipOptions", "unstyled", "pTooltipUnstyled"]],
    template: function Menu_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Menu_Conditional_0_Template, 2, 4, "p-motion", 4)(1, Menu_Conditional_1_Template, 1, 1, "ng-container");
        \u0275\u0275template(2, Menu_ng_template_2_Template, 8, 21, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.popup ? 0 : 1);
      }
    },
    dependencies: [CommonModule, NgForOf, NgIf, NgTemplateOutlet, NgStyle, RouterModule, MenuItemContent, TooltipModule, Tooltip, Bind, BadgeModule, SharedModule, BindModule, MotionModule, Motion, SafeHtmlPipe],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Menu, [{
    type: Component,
    args: [{
      selector: "p-menu",
      standalone: true,
      imports: [CommonModule, RouterModule, MenuItemContent, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule, MotionModule],
      template: `
        @if (popup) {
            <p-motion [visible]="visible" [appear]="popup" name="p-anchored-overlay" [options]="computedMotionOptions()" (onBeforeEnter)="onOverlayBeforeEnter($event)" (onAfterLeave)="onOverlayAfterLeave()">
                <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
            </p-motion>
        } @else {
            <ng-container *ngTemplateOutlet="sharedcontent"></ng-container>
        }
        <ng-template #sharedcontent>
            <div #container [class]="cn(cx('root'), styleClass)" [style]="sx('root')" [ngStyle]="style" (click)="onOverlayClick($event)" [attr.id]="id" [pBind]="ptm('root')" [attr.data-p]="dataP">
                <div *ngIf="startTemplate ?? _startTemplate" [class]="cx('start')" [pBind]="ptm('start')" [attr.data-pc-section]="'start'">
                    <ng-container *ngTemplateOutlet="startTemplate ?? _startTemplate"></ng-container>
                </div>
                <ul
                    #list
                    [class]="cx('list')"
                    [pBind]="ptm('list')"
                    role="menu"
                    [attr.id]="id + '_list'"
                    [attr.tabindex]="getTabIndexValue()"
                    [attr.data-pc-section]="'menu'"
                    [attr.aria-activedescendant]="activedescendant()"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledBy]="ariaLabelledBy"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onListKeyDown($event)"
                >
                    <ng-template ngFor let-submenu let-i="index" [ngForOf]="model" *ngIf="hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="submenu.separator && submenu.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cx('submenuLabel')"
                            [pBind]="ptm('submenuLabel')"
                            [attr.data-automationid]="submenu.automationId"
                            *ngIf="!submenu.separator"
                            pTooltip
                            [tooltipOptions]="submenu.tooltipOptions"
                            [pTooltipUnstyled]="unstyled()"
                            role="none"
                            [attr.id]="menuitemId(submenu, id, i)"
                            [attr.data-pc-section]="'submenulabel'"
                        >
                            <ng-container *ngIf="!submenuHeaderTemplate && !_submenuHeaderTemplate">
                                <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{ submenu.label }}</span>
                                <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label | safeHtml"></span></ng-template>
                            </ng-container>
                            <ng-container *ngTemplateOutlet="submenuHeaderTemplate ?? _submenuHeaderTemplate; context: { $implicit: submenu }"></ng-container>
                        </li>
                        <ng-template ngFor let-item let-j="index" [ngForOf]="submenu.items">
                            <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && (item.visible !== false || submenu.visible !== false)" role="separator" [attr.data-pc-section]="'separator'"></li>
                            <li
                                [class]="cn(cx('item', { item, id: menuitemId(item, id, i, j) }), item?.styleClass)"
                                *ngIf="!item.separator && item.visible !== false && (item.visible !== undefined || submenu.visible !== false)"
                                [pMenuItemContent]="item"
                                [itemTemplate]="itemTemplate ?? _itemTemplate"
                                [idx]="j"
                                [menuitemId]="menuitemId(item, id, i, j)"
                                [style]="item.style"
                                (onMenuItemClick)="itemClick($event, menuitemId(item, id, i, j))"
                                pTooltip
                                [tooltipOptions]="item.tooltipOptions"
                                [pTooltipUnstyled]="unstyled()"
                                [unstyled]="unstyled()"
                                role="menuitem"
                                [attr.data-pc-section]="'menuitem'"
                                [attr.aria-label]="label(item.label)"
                                [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i, j))"
                                [attr.data-p-disabled]="disabled(item.disabled)"
                                [attr.aria-disabled]="disabled(item.disabled)"
                                [attr.id]="menuitemId(item, id, i, j)"
                            ></li>
                        </ng-template>
                    </ng-template>
                    <ng-template ngFor let-item let-i="index" [ngForOf]="model" *ngIf="!hasSubMenu()">
                        <li [class]="cx('separator')" [pBind]="ptm('separator')" *ngIf="item.separator && item.visible !== false" role="separator" [attr.data-pc-section]="'separator'"></li>
                        <li
                            [class]="cn(cx('item', { item, id: menuitemId(item, id, i) }), item?.styleClass)"
                            *ngIf="!item.separator && item.visible !== false"
                            [pMenuItemContent]="item"
                            [itemTemplate]="itemTemplate ?? _itemTemplate"
                            [idx]="i"
                            [menuitemId]="menuitemId(item, id, i)"
                            [ngStyle]="item.style"
                            (onMenuItemClick)="itemClick($event, menuitemId(item, id, i))"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                            [unstyled]="unstyled()"
                            [pTooltipUnstyled]="unstyled()"
                            role="menuitem"
                            [attr.data-pc-section]="'menuitem'"
                            [attr.aria-label]="label(item.label)"
                            [attr.data-p-focused]="isItemFocused(menuitemId(item, id, i))"
                            [attr.data-p-disabled]="disabled(item.disabled)"
                            [attr.aria-disabled]="disabled(item.disabled)"
                            [attr.id]="menuitemId(item, id, i)"
                        ></li>
                    </ng-template>
                </ul>
                <div *ngIf="endTemplate ?? _endTemplate" [class]="cx('end')" [pBind]="ptm('end')" [attr.data-pc-section]="'end'">
                    <ng-container *ngTemplateOutlet="endTemplate ?? _endTemplate"></ng-container>
                </div>
            </div>
        </ng-template>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MenuStyle, {
        provide: MENU_INSTANCE,
        useExisting: Menu
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Menu
      }],
      hostDirectives: [Bind]
    }]
  }], () => [{
    type: OverlayService
  }], {
    model: [{
      type: Input
    }],
    popup: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    baseZIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    tabindex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    motionOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "motionOptions",
        required: false
      }]
    }],
    onShow: [{
      type: Output
    }],
    onHide: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    listViewChild: [{
      type: ViewChild,
      args: ["list", {
        isSignal: true
      }]
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container", {
        isSignal: true
      }]
    }],
    startTemplate: [{
      type: ContentChild,
      args: ["start", {
        descendants: false
      }]
    }],
    endTemplate: [{
      type: ContentChild,
      args: ["end", {
        descendants: false
      }]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["item", {
        descendants: false
      }]
    }],
    submenuHeaderTemplate: [{
      type: ContentChild,
      args: ["submenuheader", {
        descendants: false
      }]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MenuModule = class _MenuModule {
  static \u0275fac = function MenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MenuModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MenuModule,
    imports: [Menu, SharedModule, SafeHtmlPipe],
    exports: [Menu, SharedModule, SafeHtmlPipe]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Menu, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuModule, [{
    type: NgModule,
    args: [{
      imports: [Menu, SharedModule, SafeHtmlPipe],
      exports: [Menu, SharedModule, SafeHtmlPipe]
    }]
  }], null, null);
})();

// src/app/layout/component/themeswitcher/app.themeswitcher.ts
function AppThemeSwitcher_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function AppThemeSwitcher_Conditional_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275nextContext();
      const menu_r2 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(menu_r2.toggle($event));
    });
    \u0275\u0275element(1, "i");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("pTooltip", "Th\xE8me : " + ctx_r2.current().label);
    \u0275\u0275attribute("aria-label", "Th\xE8me : " + ctx_r2.current().label);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.current().icon);
  }
}
function AppThemeSwitcher_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-button", 6);
    \u0275\u0275listener("onClick", function AppThemeSwitcher_Conditional_1_Template_p_button_onClick_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      \u0275\u0275nextContext();
      const menu_r2 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(menu_r2.toggle($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("rounded", true)("icon", ctx_r2.current().icon)("ariaLabel", "Th\xE8me : " + ctx_r2.current().label);
  }
}
function AppThemeSwitcher_ng_template_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 9);
  }
}
function AppThemeSwitcher_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "span", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, AppThemeSwitcher_ng_template_4_Conditional_4_Template, 1, 0, "i", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275classProp("font-semibold", item_r5.state == null ? null : item_r5.state.active);
    \u0275\u0275attribute("aria-checked", item_r5.state == null ? null : item_r5.state.active);
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.label);
    \u0275\u0275advance();
    \u0275\u0275conditional((item_r5.state == null ? null : item_r5.state.active) ? 4 : -1);
  }
}
var THEME_OPTIONS = [
  { mode: "light", label: "Clair", icon: "pi pi-sun" },
  { mode: "dark", label: "Sombre", icon: "pi pi-moon" },
  { mode: "system", label: "Syst\xE8me", icon: "pi pi-desktop" }
];
var AppThemeSwitcher = class _AppThemeSwitcher {
  layoutService = inject(LayoutService);
  /** `topbar` : bouton de la barre du haut ; `floating` : bouton rond des pages sans layout. */
  variant = input("topbar", ...ngDevMode ? [{ debugName: "variant" }] : []);
  current = computed(() => THEME_OPTIONS.find((option) => option.mode === this.layoutService.themeMode()) ?? THEME_OPTIONS[2], ...ngDevMode ? [{ debugName: "current" }] : []);
  items = computed(() => THEME_OPTIONS.map((option) => ({
    label: option.label,
    icon: option.icon,
    state: { active: option.mode === this.layoutService.themeMode() },
    command: () => this.layoutService.setThemeMode(option.mode)
  })), ...ngDevMode ? [{ debugName: "items" }] : []);
  static \u0275fac = function AppThemeSwitcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppThemeSwitcher)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppThemeSwitcher, selectors: [["app-theme-switcher"]], inputs: { variant: [1, "variant"] }, decls: 6, vars: 3, consts: [["menu", ""], ["item", ""], ["type", "button", "tooltipPosition", "bottom", "aria-haspopup", "true", 1, "layout-topbar-action", 3, "pTooltip"], ["type", "button", "severity", "secondary", 3, "rounded", "icon", "ariaLabel"], ["appendTo", "body", 3, "model", "popup"], ["type", "button", "tooltipPosition", "bottom", "aria-haspopup", "true", 1, "layout-topbar-action", 3, "click", "pTooltip"], ["type", "button", "severity", "secondary", 3, "onClick", "rounded", "icon", "ariaLabel"], ["role", "menuitemradio", 1, "p-menu-item-link", "flex", "items-center", "gap-2"], [1, "flex-1"], [1, "pi", "pi-check", "text-primary"]], template: function AppThemeSwitcher_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, AppThemeSwitcher_Conditional_0_Template, 2, 4, "button", 2)(1, AppThemeSwitcher_Conditional_1_Template, 1, 3, "p-button", 3);
      \u0275\u0275elementStart(2, "p-menu", 4, 0);
      \u0275\u0275template(4, AppThemeSwitcher_ng_template_4_Template, 5, 7, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.variant() === "topbar" ? 0 : 1);
      \u0275\u0275advance(2);
      \u0275\u0275property("model", ctx.items())("popup", true);
    }
  }, dependencies: [ButtonModule, Button, MenuModule, Menu, TooltipModule, Tooltip], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppThemeSwitcher, [{
    type: Component,
    args: [{ selector: "app-theme-switcher", imports: [ButtonModule, MenuModule, TooltipModule], template: `@if (variant() === 'topbar') {
    <button type="button" class="layout-topbar-action" [pTooltip]="'Th\xE8me : ' + current().label" tooltipPosition="bottom" aria-haspopup="true" [attr.aria-label]="'Th\xE8me : ' + current().label" (click)="menu.toggle($event)">
        <i [class]="current().icon"></i>
    </button>
} @else {
    <p-button type="button" [rounded]="true" [icon]="current().icon" severity="secondary" [ariaLabel]="'Th\xE8me : ' + current().label" (onClick)="menu.toggle($event)" />
}

<p-menu #menu [model]="items()" [popup]="true" appendTo="body">
    <ng-template #item let-item>
        <a class="p-menu-item-link flex items-center gap-2" [class.font-semibold]="item.state?.active" [attr.aria-checked]="item.state?.active" role="menuitemradio">
            <i [class]="item.icon"></i>
            <span class="flex-1">{{ item.label }}</span>
            @if (item.state?.active) {
                <i class="pi pi-check text-primary"></i>
            }
        </a>
    </ng-template>
</p-menu>
` }]
  }], null, { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppThemeSwitcher, { className: "AppThemeSwitcher", filePath: "src/app/layout/component/themeswitcher/app.themeswitcher.ts", lineNumber: 21 });
})();

// src/app/layout/component/floatingconfigurator/app.floatingconfigurator.ts
var _c03 = (a0) => ({ fixed: a0 });
var AppFloatingConfigurator = class _AppFloatingConfigurator {
  float = input(true, ...ngDevMode ? [{ debugName: "float" }] : []);
  static \u0275fac = function AppFloatingConfigurator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppFloatingConfigurator)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppFloatingConfigurator, selectors: [["app-floating-configurator"]], inputs: { float: [1, "float"] }, decls: 5, vars: 4, consts: [[1, "flex", "gap-4", "top-8", "right-8", 3, "ngClass"], ["variant", "floating"], [1, "relative"], ["icon", "pi pi-palette", "pStyleClass", "@next", "enterFromClass", "hidden", "enterActiveClass", "animate-scalein", "leaveToClass", "hidden", "leaveActiveClass", "animate-fadeout", "type", "button", "rounded", "", 3, "hideOnOutsideClick"]], template: function AppFloatingConfigurator_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-theme-switcher", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275element(3, "p-button", 3)(4, "app-configurator");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(2, _c03, ctx.float()));
      \u0275\u0275advance(3);
      \u0275\u0275property("hideOnOutsideClick", true);
    }
  }, dependencies: [CommonModule, NgClass, ButtonModule, Button, StyleClassModule, StyleClass, AppConfigurator, AppThemeSwitcher], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppFloatingConfigurator, [{
    type: Component,
    args: [{ selector: "app-floating-configurator", imports: [CommonModule, ButtonModule, StyleClassModule, AppConfigurator, AppThemeSwitcher], template: '<div class="flex gap-4 top-8 right-8" [ngClass]="{ fixed: float() }">\n    <!-- Clair / sombre / syst\xE8me -->\n    <app-theme-switcher variant="floating" />\n\n    <!-- Theme configurator -->\n    <div class="relative">\n        <p-button icon="pi pi-palette" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" type="button" rounded />\n        <app-configurator />\n    </div>\n</div>\n' }]
  }], null, { float: [{ type: Input, args: [{ isSignal: true, alias: "float", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppFloatingConfigurator, { className: "AppFloatingConfigurator", filePath: "src/app/layout/component/floatingconfigurator/app.floatingconfigurator.ts", lineNumber: 15 });
})();

export {
  Qr,
  authGuard,
  roleGuard,
  publicSessionGuard,
  guestGuard,
  Menu,
  MenuModule,
  StyleClass,
  StyleClassModule,
  AppConfigurator,
  AppThemeSwitcher,
  AppFloatingConfigurator
};
//# sourceMappingURL=chunk-NU5JMK65.js.map
