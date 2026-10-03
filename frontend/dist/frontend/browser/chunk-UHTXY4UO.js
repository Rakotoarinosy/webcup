import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  PLATFORM_ID,
  Renderer2,
  Subject,
  TemplateRef,
  __objRest,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  inject,
  input,
  isPlatformServer,
  makeEnvironmentProviders,
  provideAppInitializer,
  setClassMetadata,
  signal,
  untracked,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleMap
} from "./chunk-E5MYAYBP.js";

// node_modules/@primeuix/utils/dist/classnames/index.mjs
function f(...e) {
  if (e) {
    let t2 = [];
    for (let i3 = 0; i3 < e.length; i3++) {
      let n2 = e[i3];
      if (!n2) continue;
      let s4 = typeof n2;
      if (s4 === "string" || s4 === "number") t2.push(n2);
      else if (s4 === "object") {
        let c4 = Array.isArray(n2) ? [f(...n2)] : Object.entries(n2).map(([r, o]) => o ? r : void 0);
        t2 = c4.length ? t2.concat(c4.filter((r) => !!r)) : t2;
      }
    }
    return t2.join(" ").trim();
  }
}

// node_modules/@primeuix/utils/dist/dom/index.mjs
function R(t2, e) {
  return t2 ? t2.classList ? t2.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t2.className) : false;
}
function W(t2, e) {
  if (t2 && e) {
    let o = (n2) => {
      R(t2, n2) || (t2.classList ? t2.classList.add(n2) : t2.className += " " + n2);
    };
    [e].flat().filter(Boolean).forEach((n2) => n2.split(" ").forEach(o));
  }
}
function F() {
  return window.innerWidth - document.documentElement.offsetWidth;
}
function st(t2) {
  typeof t2 == "string" ? W(document.body, t2 || "p-overflow-hidden") : (t2 != null && t2.variableName && document.body.style.setProperty(t2.variableName, F() + "px"), W(document.body, (t2 == null ? void 0 : t2.className) || "p-overflow-hidden"));
}
function P(t2, e) {
  if (t2 && e) {
    let o = (n2) => {
      t2.classList ? t2.classList.remove(n2) : t2.className = t2.className.replace(new RegExp("(^|\\b)" + n2.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
    [e].flat().filter(Boolean).forEach((n2) => n2.split(" ").forEach(o));
  }
}
function dt(t2) {
  typeof t2 == "string" ? P(document.body, t2 || "p-overflow-hidden") : (t2 != null && t2.variableName && document.body.style.removeProperty(t2.variableName), P(document.body, (t2 == null ? void 0 : t2.className) || "p-overflow-hidden"));
}
function x(t2) {
  for (let e of document == null ? void 0 : document.styleSheets) try {
    for (let o of e == null ? void 0 : e.cssRules) for (let n2 of o == null ? void 0 : o.style) if (t2.test(n2)) return { name: n2, value: o.style.getPropertyValue(n2).trim() };
  } catch (o) {
  }
  return null;
}
function w(t2) {
  let e = { width: 0, height: 0 };
  if (t2) {
    let [o, n2] = [t2.style.visibility, t2.style.display], r = t2.getBoundingClientRect();
    t2.style.visibility = "hidden", t2.style.display = "block", e.width = r.width || t2.offsetWidth, e.height = r.height || t2.offsetHeight, t2.style.display = n2, t2.style.visibility = o;
  }
  return e;
}
function h() {
  let t2 = window, e = document, o = e.documentElement, n2 = e.getElementsByTagName("body")[0], r = t2.innerWidth || o.clientWidth || n2.clientWidth, i3 = t2.innerHeight || o.clientHeight || n2.clientHeight;
  return { width: r, height: i3 };
}
function E(t2) {
  return t2 ? Math.abs(t2.scrollLeft) : 0;
}
function k() {
  let t2 = document.documentElement;
  return (window.pageXOffset || E(t2)) - (t2.clientLeft || 0);
}
function $() {
  let t2 = document.documentElement;
  return (window.pageYOffset || t2.scrollTop) - (t2.clientTop || 0);
}
function V(t2) {
  return t2 ? getComputedStyle(t2).direction === "rtl" : false;
}
function D(t2, e, o = true) {
  var n2, r, i3, l3;
  if (t2) {
    let d3 = t2.offsetParent ? { width: t2.offsetWidth, height: t2.offsetHeight } : w(t2), s4 = d3.height, a2 = d3.width, u2 = e.offsetHeight, p3 = e.offsetWidth, f2 = e.getBoundingClientRect(), g2 = $(), it = k(), lt = h(), L, N3, ot = "top";
    f2.top + u2 + s4 > lt.height ? (L = f2.top + g2 - s4, ot = "bottom", L < 0 && (L = g2)) : L = u2 + f2.top + g2, f2.left + a2 > lt.width ? N3 = Math.max(0, f2.left + it + p3 - a2) : N3 = f2.left + it, V(t2) ? t2.style.insetInlineEnd = N3 + "px" : t2.style.insetInlineStart = N3 + "px", t2.style.top = L + "px", t2.style.transformOrigin = ot, o && (t2.style.marginTop = ot === "bottom" ? `calc(${(r = (n2 = x(/-anchor-gutter$/)) == null ? void 0 : n2.value) != null ? r : "2px"} * -1)` : (l3 = (i3 = x(/-anchor-gutter$/)) == null ? void 0 : i3.value) != null ? l3 : "");
  }
}
function S(t2, e) {
  t2 && (typeof e == "string" ? t2.style.cssText = e : Object.entries(e || {}).forEach(([o, n2]) => t2.style[o] = n2));
}
function v(t2, e) {
  if (t2 instanceof HTMLElement) {
    let o = t2.offsetWidth;
    if (e) {
      let n2 = getComputedStyle(t2);
      o += parseFloat(n2.marginLeft) + parseFloat(n2.marginRight);
    }
    return o;
  }
  return 0;
}
function I(t2, e, o = true, n2 = void 0) {
  var r;
  if (t2) {
    let i3 = t2.offsetParent ? { width: t2.offsetWidth, height: t2.offsetHeight } : w(t2), l3 = e.offsetHeight, d3 = e.getBoundingClientRect(), s4 = h(), a2, u2, p3 = n2 != null ? n2 : "top";
    if (!n2 && d3.top + l3 + i3.height > s4.height ? (a2 = -1 * i3.height, p3 = "bottom", d3.top + a2 < 0 && (a2 = -1 * d3.top)) : a2 = l3, i3.width > s4.width ? u2 = d3.left * -1 : d3.left + i3.width > s4.width ? u2 = (d3.left + i3.width - s4.width) * -1 : u2 = 0, t2.style.top = a2 + "px", t2.style.insetInlineStart = u2 + "px", t2.style.transformOrigin = p3, o) {
      let f2 = (r = x(/-anchor-gutter$/)) == null ? void 0 : r.value;
      t2.style.marginTop = p3 === "bottom" ? `calc(${f2 != null ? f2 : "2px"} * -1)` : f2 != null ? f2 : "";
    }
  }
}
function y(t2) {
  if (t2) {
    let e = t2.parentNode;
    return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
  }
  return null;
}
function T(t2) {
  return !!(t2 !== null && typeof t2 != "undefined" && t2.nodeName && y(t2));
}
function c(t2) {
  return typeof Element != "undefined" ? t2 instanceof Element : t2 !== null && typeof t2 == "object" && t2.nodeType === 1 && typeof t2.nodeName == "string";
}
function H(t2) {
  let e = t2;
  return t2 && typeof t2 == "object" && (Object.hasOwn(t2, "current") ? e = t2.current : Object.hasOwn(t2, "el") && (Object.hasOwn(t2.el, "nativeElement") ? e = t2.el.nativeElement : e = t2.el)), c(e) ? e : void 0;
}
function j(t2, e) {
  var o, n2, r;
  if (t2) switch (t2) {
    case "document":
      return document;
    case "window":
      return window;
    case "body":
      return document.body;
    case "@next":
      return e == null ? void 0 : e.nextElementSibling;
    case "@prev":
      return e == null ? void 0 : e.previousElementSibling;
    case "@first":
      return e == null ? void 0 : e.firstElementChild;
    case "@last":
      return e == null ? void 0 : e.lastElementChild;
    case "@child":
      return (o = e == null ? void 0 : e.children) == null ? void 0 : o[0];
    case "@parent":
      return e == null ? void 0 : e.parentElement;
    case "@grandparent":
      return (n2 = e == null ? void 0 : e.parentElement) == null ? void 0 : n2.parentElement;
    default: {
      if (typeof t2 == "string") {
        let s4 = t2.match(/^@child\[(\d+)]/);
        return s4 ? ((r = e == null ? void 0 : e.children) == null ? void 0 : r[parseInt(s4[1], 10)]) || null : document.querySelector(t2) || null;
      }
      let l3 = ((s4) => typeof s4 == "function" && "call" in s4 && "apply" in s4)(t2) ? t2() : t2, d3 = H(l3);
      return T(d3) ? d3 : (l3 == null ? void 0 : l3.nodeType) === 9 ? l3 : void 0;
    }
  }
}
function ut(t2, e) {
  let o = j(t2, e);
  if (o) o.appendChild(e);
  else throw new Error("Cannot append " + e + " to " + t2);
}
function A(t2, e = {}) {
  if (c(t2)) {
    let o = (n2, r) => {
      var l3, d3;
      let i3 = (l3 = t2 == null ? void 0 : t2.$attrs) != null && l3[n2] ? [(d3 = t2 == null ? void 0 : t2.$attrs) == null ? void 0 : d3[n2]] : [];
      return [r].flat().reduce((s4, a2) => {
        if (a2 != null) {
          let u2 = typeof a2;
          if (u2 === "string" || u2 === "number") s4.push(a2);
          else if (u2 === "object") {
            let p3 = Array.isArray(a2) ? o(n2, a2) : Object.entries(a2).map(([f2, g2]) => n2 === "style" && (g2 || g2 === 0) ? `${f2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${g2}` : g2 ? f2 : void 0);
            s4 = p3.length ? s4.concat(p3.filter((f2) => !!f2)) : s4;
          }
        }
        return s4;
      }, i3);
    };
    Object.entries(e).forEach(([n2, r]) => {
      if (r != null) {
        let i3 = n2.match(/^on(.+)/);
        i3 ? t2.addEventListener(i3[1].toLowerCase(), r) : n2 === "p-bind" || n2 === "pBind" ? A(t2, r) : (r = n2 === "class" ? [...new Set(o("class", r))].join(" ").trim() : n2 === "style" ? o("style", r).join(";").trim() : r, (t2.$attrs = t2.$attrs || {}) && (t2.$attrs[n2] = r), t2.setAttribute(n2, r));
      }
    });
  }
}
function U(t2, e = {}, ...o) {
  if (t2) {
    let n2 = document.createElement(t2);
    return A(n2, e), n2.append(...o), n2;
  }
}
function ht(t2, e) {
  if (t2) {
    t2.style.opacity = "0";
    let o = +/* @__PURE__ */ new Date(), n2 = "0", r = function() {
      n2 = `${+t2.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - o) / e}`, t2.style.opacity = n2, o = +/* @__PURE__ */ new Date(), +n2 < 1 && ("requestAnimationFrame" in window ? requestAnimationFrame(r) : setTimeout(r, 16));
    };
    r();
  }
}
function Y(t2, e) {
  return c(t2) ? Array.from(t2.querySelectorAll(e)) : [];
}
function z(t2, e) {
  return c(t2) ? t2.matches(e) ? t2 : t2.querySelector(e) : null;
}
function bt(t2, e) {
  t2 && document.activeElement !== t2 && t2.focus(e);
}
function Q(t2, e) {
  if (c(t2)) {
    let o = t2.getAttribute(e);
    return isNaN(o) ? o === "true" || o === "false" ? o === "true" : o : +o;
  }
}
function b(t2, e = "") {
  let o = Y(t2, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`), n2 = [];
  for (let r of o) getComputedStyle(r).display != "none" && getComputedStyle(r).visibility != "hidden" && n2.push(r);
  return n2;
}
function vt(t2, e) {
  let o = b(t2, e);
  return o.length > 0 ? o[0] : null;
}
function Tt(t2) {
  if (t2) {
    let e = t2.offsetHeight, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingTop) + parseFloat(o.paddingBottom) + parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth), e;
  }
  return 0;
}
function Ht(t2) {
  var e;
  if (t2) {
    let o = (e = y(t2)) == null ? void 0 : e.childNodes, n2 = 0;
    if (o) for (let r = 0; r < o.length; r++) {
      if (o[r] === t2) return n2;
      o[r].nodeType === 1 && n2++;
    }
  }
  return -1;
}
function Lt(t2, e) {
  let o = b(t2, e);
  return o.length > 0 ? o[o.length - 1] : null;
}
function K(t2) {
  if (t2) {
    let e = t2.getBoundingClientRect();
    return { top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0), left: e.left + (window.pageXOffset || E(document.documentElement) || E(document.body) || 0) };
  }
  return { top: "auto", left: "auto" };
}
function C(t2, e) {
  if (t2) {
    let o = t2.offsetHeight;
    if (e) {
      let n2 = getComputedStyle(t2);
      o += parseFloat(n2.marginTop) + parseFloat(n2.marginBottom);
    }
    return o;
  }
  return 0;
}
function Mt() {
  if (window.getSelection) return window.getSelection().toString();
  if (document.getSelection) return document.getSelection().toString();
}
function Rt(t2) {
  if (t2) {
    let e = t2.offsetWidth, o = getComputedStyle(t2);
    return e -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight) + parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e;
  }
  return 0;
}
function Dt(t2) {
  if (t2) {
    let e = t2.nodeName, o = t2.parentElement && t2.parentElement.nodeName;
    return e === "INPUT" || e === "TEXTAREA" || e === "BUTTON" || e === "A" || o === "INPUT" || o === "TEXTAREA" || o === "BUTTON" || o === "A" || !!t2.closest(".p-button, .p-checkbox, .p-radiobutton");
  }
  return false;
}
function et(t2) {
  return !!(t2 && t2.offsetParent != null);
}
function qt() {
  return typeof window == "undefined" || !window.matchMedia ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Yt() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function Qt() {
  return new Promise((t2) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(t2);
    });
  });
}
function Zt(t2) {
  var e;
  t2 && ("remove" in Element.prototype ? t2.remove() : (e = t2.parentNode) == null || e.removeChild(t2));
}
function Gt(t2, e) {
  let o = H(t2);
  if (o) o.removeChild(e);
  else throw new Error("Cannot remove " + e + " from " + t2);
}
function Kt(t2, e) {
  let o = getComputedStyle(t2).getPropertyValue("borderTopWidth"), n2 = o ? parseFloat(o) : 0, r = getComputedStyle(t2).getPropertyValue("paddingTop"), i3 = r ? parseFloat(r) : 0, l3 = t2.getBoundingClientRect(), s4 = e.getBoundingClientRect().top + document.body.scrollTop - (l3.top + document.body.scrollTop) - n2 - i3, a2 = t2.scrollTop, u2 = t2.clientHeight, p3 = C(e);
  s4 < 0 ? t2.scrollTop = a2 + s4 : s4 + p3 > u2 && (t2.scrollTop = a2 + s4 - u2 + p3);
}
function _t(t2, e = "", o) {
  c(t2) && o !== null && o !== void 0 && t2.setAttribute(e, o);
}
function te(t2, e, o = null, n2) {
  var r;
  e && ((r = t2 == null ? void 0 : t2.style) == null || r.setProperty(e, o, n2));
}

// node_modules/@primeuix/utils/dist/eventbus/index.mjs
function s() {
  let r = /* @__PURE__ */ new Map();
  return { on(e, t2) {
    let n2 = r.get(e);
    return n2 ? n2.push(t2) : n2 = [t2], r.set(e, n2), this;
  }, off(e, t2) {
    let n2 = r.get(e);
    return n2 && n2.splice(n2.indexOf(t2) >>> 0, 1), this;
  }, emit(e, t2) {
    let n2 = r.get(e);
    n2 && n2.forEach((i3) => {
      i3(t2);
    });
  }, clear() {
    r.clear();
  } };
}

// node_modules/@primeuix/utils/dist/mergeprops/index.mjs
var p = Object.defineProperty;
var i = Object.getOwnPropertySymbols;
var x2 = Object.prototype.hasOwnProperty;
var c2 = Object.prototype.propertyIsEnumerable;
var d = (t2, e, a2) => e in t2 ? p(t2, e, { enumerable: true, configurable: true, writable: true, value: a2 }) : t2[e] = a2;
var n = (t2, e) => {
  for (var a2 in e || (e = {})) x2.call(e, a2) && d(t2, a2, e[a2]);
  if (i) for (var a2 of i(e)) c2.call(e, a2) && d(t2, a2, e[a2]);
  return t2;
};
function u(...t2) {
  if (t2) {
    let e = [];
    for (let a2 = 0; a2 < t2.length; a2++) {
      let o = t2[a2];
      if (!o) continue;
      let r = typeof o;
      if (r === "string" || r === "number") e.push(o);
      else if (r === "object") {
        let s4 = Array.isArray(o) ? [u(...o)] : Object.entries(o).map(([f2, m2]) => m2 ? f2 : void 0);
        e = s4.length ? e.concat(s4.filter((f2) => !!f2)) : e;
      }
    }
    return e.join(" ").trim();
  }
}
function l(t2) {
  return typeof t2 == "function" && "call" in t2 && "apply" in t2;
}
function w2(...t2) {
  return t2 == null ? void 0 : t2.reduce((e, a2 = {}) => {
    for (let o in a2) {
      let r = a2[o];
      if (o === "style") e.style = n(n({}, e.style), a2.style);
      else if (o === "class" || o === "className") e[o] = u(e[o], a2[o]);
      else if (l(r)) {
        let s4 = e[o];
        e[o] = s4 ? (...f2) => {
          s4(...f2), r(...f2);
        } : r;
      } else e[o] = r;
    }
    return e;
  }, {});
}

// node_modules/@primeuix/utils/dist/object/index.mjs
var ie = Object.defineProperty;
var K2 = Object.getOwnPropertySymbols;
var se = Object.prototype.hasOwnProperty;
var ae = Object.prototype.propertyIsEnumerable;
var N = (e, t2, n2) => t2 in e ? ie(e, t2, { enumerable: true, configurable: true, writable: true, value: n2 }) : e[t2] = n2;
var d2 = (e, t2) => {
  for (var n2 in t2 || (t2 = {})) se.call(t2, n2) && N(e, n2, t2[n2]);
  if (K2) for (var n2 of K2(t2)) ae.call(t2, n2) && N(e, n2, t2[n2]);
  return e;
};
function l2(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0 || !(e instanceof Date) && typeof e == "object" && Object.keys(e).length === 0;
}
function b2(e, t2, n2 = /* @__PURE__ */ new WeakSet()) {
  if (e === t2) return true;
  if (!e || !t2 || typeof e != "object" || typeof t2 != "object" || n2.has(e) || n2.has(t2)) return false;
  n2.add(e).add(t2);
  let o = Array.isArray(e), r = Array.isArray(t2), u2, f2, T2;
  if (o && r) {
    if (f2 = e.length, f2 != t2.length) return false;
    for (u2 = f2; u2-- !== 0; ) if (!b2(e[u2], t2[u2], n2)) return false;
    return true;
  }
  if (o != r) return false;
  let S3 = e instanceof Date, A2 = t2 instanceof Date;
  if (S3 != A2) return false;
  if (S3 && A2) return e.getTime() == t2.getTime();
  let I2 = e instanceof RegExp, L = t2 instanceof RegExp;
  if (I2 != L) return false;
  if (I2 && L) return e.toString() == t2.toString();
  let R2 = Object.keys(e);
  if (f2 = R2.length, f2 !== Object.keys(t2).length) return false;
  for (u2 = f2; u2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t2, R2[u2])) return false;
  for (u2 = f2; u2-- !== 0; ) if (T2 = R2[u2], !b2(e[T2], t2[T2], n2)) return false;
  return true;
}
function y2(e, t2) {
  return b2(e, t2);
}
function c3(e) {
  return typeof e == "function" && "call" in e && "apply" in e;
}
function s2(e) {
  return !l2(e);
}
function p2(e, t2) {
  if (!e || !t2) return null;
  try {
    let n2 = e[t2];
    if (s2(n2)) return n2;
  } catch (n2) {
  }
  if (Object.keys(e).length) {
    if (c3(t2)) return t2(e);
    if (t2.indexOf(".") === -1) return e[t2];
    {
      let n2 = t2.split("."), o = e;
      for (let r = 0, u2 = n2.length; r < u2; ++r) {
        if (o == null) return null;
        o = o[n2[r]];
      }
      return o;
    }
  }
  return null;
}
function k2(e, t2, n2) {
  return n2 ? p2(e, n2) === p2(t2, n2) : y2(e, t2);
}
function q(e, t2) {
  if (e != null && t2 && t2.length) {
    for (let n2 of t2) if (k2(e, n2)) return true;
  }
  return false;
}
function i2(e, t2 = true) {
  return e instanceof Object && e.constructor === Object && (t2 || Object.keys(e).length !== 0);
}
function $2(e = {}, t2 = {}) {
  let n2 = d2({}, e);
  return Object.keys(t2).forEach((o) => {
    let r = o;
    i2(t2[r]) && r in e && i2(e[r]) ? n2[r] = $2(e[r], t2[r]) : n2[r] = t2[r];
  }), n2;
}
function w3(...e) {
  return e.reduce((t2, n2, o) => o === 0 ? n2 : $2(t2, n2), {});
}
function M(e, t2) {
  let n2 = -1;
  if (s2(e)) try {
    n2 = e.findLastIndex(t2);
  } catch (o) {
    n2 = e.lastIndexOf([...e].reverse().find(t2));
  }
  return n2;
}
function m(e, ...t2) {
  return c3(e) ? e(...t2) : e;
}
function a(e, t2 = true) {
  return typeof e == "string" && (t2 || e !== "");
}
function g(e) {
  return a(e) ? e.replace(/(-|_)/g, "").toLowerCase() : e;
}
function F2(e, t2 = "", n2 = {}) {
  let o = g(t2).split("."), r = o.shift();
  if (r) {
    if (i2(e)) {
      let u2 = Object.keys(e).find((f2) => g(f2) === r) || "";
      return F2(m(e[u2], n2), o.join("."), n2);
    }
    return;
  }
  return m(e, n2);
}
function C2(e, t2 = true) {
  return Array.isArray(e) && (t2 || e.length !== 0);
}
function O(e) {
  return e instanceof Date;
}
function z2(e) {
  return s2(e) && !isNaN(e);
}
function J(e = "") {
  return s2(e) && e.length === 1 && !!e.match(/\S| /);
}
function G(e, t2) {
  if (t2) {
    let n2 = t2.test(e);
    return t2.lastIndex = 0, n2;
  }
  return false;
}
function H2(...e) {
  return w3(...e);
}
function Y2(e) {
  return e && e.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":").trim();
}
function X(e) {
  if (e && /[\xC0-\xFF\u0100-\u017E]/.test(e)) {
    let n2 = { A: /[\xC0-\xC5\u0100\u0102\u0104]/g, AE: /[\xC6]/g, C: /[\xC7\u0106\u0108\u010A\u010C]/g, D: /[\xD0\u010E\u0110]/g, E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g, G: /[\u011C\u011E\u0120\u0122]/g, H: /[\u0124\u0126]/g, I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g, IJ: /[\u0132]/g, J: /[\u0134]/g, K: /[\u0136]/g, L: /[\u0139\u013B\u013D\u013F\u0141]/g, N: /[\xD1\u0143\u0145\u0147\u014A]/g, O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g, OE: /[\u0152]/g, R: /[\u0154\u0156\u0158]/g, S: /[\u015A\u015C\u015E\u0160]/g, T: /[\u0162\u0164\u0166]/g, U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g, W: /[\u0174]/g, Y: /[\xDD\u0176\u0178]/g, Z: /[\u0179\u017B\u017D]/g, a: /[\xE0-\xE5\u0101\u0103\u0105]/g, ae: /[\xE6]/g, c: /[\xE7\u0107\u0109\u010B\u010D]/g, d: /[\u010F\u0111]/g, e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g, g: /[\u011D\u011F\u0121\u0123]/g, i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g, ij: /[\u0133]/g, j: /[\u0135]/g, k: /[\u0137,\u0138]/g, l: /[\u013A\u013C\u013E\u0140\u0142]/g, n: /[\xF1\u0144\u0146\u0148\u014B]/g, p: /[\xFE]/g, o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g, oe: /[\u0153]/g, r: /[\u0155\u0157\u0159]/g, s: /[\u015B\u015D\u015F\u0161]/g, t: /[\u0163\u0165\u0167]/g, u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g, w: /[\u0175]/g, y: /[\xFD\xFF\u0177]/g, z: /[\u017A\u017C\u017E]/g };
    for (let o in n2) e = e.replace(n2[o], o);
  }
  return e;
}
function re(e) {
  return a(e) ? e.replace(/(_)/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() : e;
}
function oe(e) {
  return e === "auto" ? 0 : typeof e == "number" ? e : Number(e.replace(/[^\d.]/g, "").replace(",", ".")) * 1e3;
}

// node_modules/@primeuix/utils/dist/uuid/index.mjs
var t = {};
function s3(n2 = "pui_id_") {
  return Object.hasOwn(t, n2) || (t[n2] = 0), t[n2]++, `${n2}${t[n2]}`;
}

// node_modules/primeng/fesm2022/primeng-api.mjs
var _c0 = ["*"];
var ConfirmEventType;
(function(ConfirmEventType2) {
  ConfirmEventType2[ConfirmEventType2["ACCEPT"] = 0] = "ACCEPT";
  ConfirmEventType2[ConfirmEventType2["REJECT"] = 1] = "REJECT";
  ConfirmEventType2[ConfirmEventType2["CANCEL"] = 2] = "CANCEL";
})(ConfirmEventType || (ConfirmEventType = {}));
var ConfirmationService = class _ConfirmationService {
  requireConfirmationSource = new Subject();
  acceptConfirmationSource = new Subject();
  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept = this.acceptConfirmationSource.asObservable();
  /**
   * Callback to invoke on confirm.
   * @param {Confirmation} confirmation - Represents a confirmation dialog configuration.
   * @group Method
   */
  confirm(confirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }
  /**
   * Closes the dialog.
   * @group Method
   */
  close() {
    this.requireConfirmationSource.next(null);
    return this;
  }
  /**
   * Accepts the dialog.
   * @group Method
   */
  onAccept() {
    this.acceptConfirmationSource.next(null);
  }
  static \u0275fac = function ConfirmationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ConfirmationService,
    factory: _ConfirmationService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationService, [{
    type: Injectable
  }], null, null);
})();
var ContextMenuService = class _ContextMenuService {
  activeItemKeyChange = new Subject();
  activeItemKeyChange$ = this.activeItemKeyChange.asObservable();
  activeItemKey;
  changeKey(key) {
    this.activeItemKey = key;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
  reset() {
    this.activeItemKey = null;
    this.activeItemKeyChange.next(this.activeItemKey);
  }
  static \u0275fac = function ContextMenuService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContextMenuService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ContextMenuService,
    factory: _ContextMenuService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuService, [{
    type: Injectable
  }], null, null);
})();
var FilterMatchMode = class {
  static STARTS_WITH = "startsWith";
  static CONTAINS = "contains";
  static NOT_CONTAINS = "notContains";
  static ENDS_WITH = "endsWith";
  static EQUALS = "equals";
  static NOT_EQUALS = "notEquals";
  static IN = "in";
  static LESS_THAN = "lt";
  static LESS_THAN_OR_EQUAL_TO = "lte";
  static GREATER_THAN = "gt";
  static GREATER_THAN_OR_EQUAL_TO = "gte";
  static BETWEEN = "between";
  static IS = "is";
  static IS_NOT = "isNot";
  static BEFORE = "before";
  static AFTER = "after";
  static DATE_IS = "dateIs";
  static DATE_IS_NOT = "dateIsNot";
  static DATE_BEFORE = "dateBefore";
  static DATE_AFTER = "dateAfter";
};
var FilterOperator = class {
  static AND = "and";
  static OR = "or";
};
var FilterService = class _FilterService {
  filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    let filteredItems = [];
    if (value) {
      for (let item of value) {
        for (let field of fields) {
          let fieldValue = p2(item, field);
          if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  }
  filters = {
    startsWith: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      let filterValue = X(filter.toString()).toLocaleLowerCase(filterLocale);
      let stringValue = X(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
      else if (value == filter) return true;
      else return X(value.toString()).toLocaleLowerCase(filterLocale) == X(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null || typeof filter === "string" && filter.trim() === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
      else if (value == filter) return false;
      else return X(value.toString()).toLocaleLowerCase(filterLocale) != X(filter.toString()).toLocaleLowerCase(filterLocale);
    },
    in: (value, filter) => {
      if (filter === void 0 || filter === null || filter.length === 0) {
        return true;
      }
      for (let i3 = 0; i3 < filter.length; i3++) {
        if (k2(value, filter[i3])) {
          return true;
        }
      }
      return false;
    },
    between: (value, filter) => {
      if (filter == null || filter[0] == null || filter[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
      else return filter[0] <= value && value <= filter[1];
    },
    lt: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
      else return value < filter;
    },
    lte: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
      else return value <= filter;
    },
    gt: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
      else return value > filter;
    },
    gte: (value, filter, filterLocale) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
      else return value >= filter;
    },
    is: (value, filter, filterLocale) => {
      return this.filters.equals(value, filter, filterLocale);
    },
    isNot: (value, filter, filterLocale) => {
      return this.filters.notEquals(value, filter, filterLocale);
    },
    before: (value, filter, filterLocale) => {
      return this.filters.lt(value, filter, filterLocale);
    },
    after: (value, filter, filterLocale) => {
      return this.filters.gt(value, filter, filterLocale);
    },
    dateIs: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter.toDateString();
    },
    dateIsNot: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter.toDateString();
    },
    dateBefore: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter.getTime();
    },
    dateAfter: (value, filter) => {
      if (filter === void 0 || filter === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      value.setHours(0, 0, 0, 0);
      return value.getTime() > filter.getTime();
    }
  };
  register(rule, fn) {
    this.filters[rule] = fn;
  }
  static \u0275fac = function FilterService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _FilterService,
    factory: _FilterService.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var MessageService = class _MessageService {
  messageSource = new Subject();
  clearSource = new Subject();
  messageObserver = this.messageSource.asObservable();
  clearObserver = this.clearSource.asObservable();
  /**
   * Inserts single message.
   * @param {ToastMessageOptions} message - Message to be added.
   * @group Method
   */
  add(message) {
    if (message) {
      this.messageSource.next(message);
    }
  }
  /**
   * Inserts new messages.
   * @param {Message[]} messages - Messages to be added.
   * @group Method
   */
  addAll(messages) {
    if (messages && messages.length) {
      this.messageSource.next(messages);
    }
  }
  /**
   * Clears the message with the given key.
   * @param {string} key - Key of the message to be cleared.
   * @group Method
   */
  clear(key) {
    this.clearSource.next(key || null);
  }
  static \u0275fac = function MessageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MessageService,
    factory: _MessageService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], null, null);
})();
var OverlayService = class _OverlayService {
  clickSource = new Subject();
  clickObservable = this.clickSource.asObservable();
  add(event) {
    if (event) {
      this.clickSource.next(event);
    }
  }
  static \u0275fac = function OverlayService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayService,
    factory: _OverlayService.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var Header = class _Header {
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Header,
    selectors: [["p-header"]],
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Header_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{
      selector: "p-header",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var Footer = class _Footer {
  static \u0275fac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _Footer,
    selectors: [["p-footer"]],
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function Footer_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{
      selector: "p-footer",
      template: "<ng-content></ng-content>",
      standalone: false
    }]
  }], null, null);
})();
var PrimeTemplate = class _PrimeTemplate {
  template;
  type;
  name;
  constructor(template) {
    this.template = template;
  }
  getType() {
    return this.name;
  }
  static \u0275fac = function PrimeTemplate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrimeTemplate)(\u0275\u0275directiveInject(TemplateRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _PrimeTemplate,
    selectors: [["", "pTemplate", ""]],
    inputs: {
      type: "type",
      name: [0, "pTemplate", "name"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeTemplate, [{
    type: Directive,
    args: [{
      selector: "[pTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], {
    type: [{
      type: Input
    }],
    name: [{
      type: Input,
      args: ["pTemplate"]
    }]
  });
})();
var SharedModule = class _SharedModule {
  static \u0275fac = function SharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _SharedModule,
    declarations: [Header, Footer],
    imports: [CommonModule, PrimeTemplate],
    exports: [Header, Footer, PrimeTemplate]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, PrimeTemplate],
      exports: [Header, Footer, PrimeTemplate],
      declarations: [Header, Footer]
    }]
  }], null, null);
})();
var TranslationKeys = class {
  static STARTS_WITH = "startsWith";
  static CONTAINS = "contains";
  static NOT_CONTAINS = "notContains";
  static ENDS_WITH = "endsWith";
  static EQUALS = "equals";
  static NOT_EQUALS = "notEquals";
  static NO_FILTER = "noFilter";
  static LT = "lt";
  static LTE = "lte";
  static GT = "gt";
  static GTE = "gte";
  static IS = "is";
  static IS_NOT = "isNot";
  static BEFORE = "before";
  static AFTER = "after";
  static CLEAR = "clear";
  static APPLY = "apply";
  static MATCH_ALL = "matchAll";
  static MATCH_ANY = "matchAny";
  static ADD_RULE = "addRule";
  static REMOVE_RULE = "removeRule";
  static ACCEPT = "accept";
  static REJECT = "reject";
  static CHOOSE = "choose";
  static UPLOAD = "upload";
  static CANCEL = "cancel";
  static PENDING = "pending";
  static FILE_SIZE_TYPES = "fileSizeTypes";
  static DAY_NAMES = "dayNames";
  static DAY_NAMES_SHORT = "dayNamesShort";
  static DAY_NAMES_MIN = "dayNamesMin";
  static MONTH_NAMES = "monthNames";
  static MONTH_NAMES_SHORT = "monthNamesShort";
  static FIRST_DAY_OF_WEEK = "firstDayOfWeek";
  static TODAY = "today";
  static WEEK_HEADER = "weekHeader";
  static WEAK = "weak";
  static MEDIUM = "medium";
  static STRONG = "strong";
  static PASSWORD_PROMPT = "passwordPrompt";
  static EMPTY_MESSAGE = "emptyMessage";
  static EMPTY_FILTER_MESSAGE = "emptyFilterMessage";
  static SHOW_FILTER_MENU = "showFilterMenu";
  static HIDE_FILTER_MENU = "hideFilterMenu";
  static SELECTION_MESSAGE = "selectionMessage";
  static ARIA = "aria";
  static SELECT_COLOR = "selectColor";
  static BROWSE_FILES = "browseFiles";
};
var TreeDragDropService = class _TreeDragDropService {
  dragStartSource = new Subject();
  dragStopSource = new Subject();
  dragStart$ = this.dragStartSource.asObservable();
  dragStop$ = this.dragStopSource.asObservable();
  startDrag(event) {
    this.dragStartSource.next(event);
  }
  stopDrag(event) {
    this.dragStopSource.next(event);
  }
  static \u0275fac = function TreeDragDropService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TreeDragDropService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TreeDragDropService,
    factory: _TreeDragDropService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeDragDropService, [{
    type: Injectable
  }], null, null);
})();

// node_modules/@primeuix/styled/dist/index.mjs
var rt = Object.defineProperty;
var st2 = Object.defineProperties;
var nt = Object.getOwnPropertyDescriptors;
var F3 = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty;
var be = Object.prototype.propertyIsEnumerable;
var _e = (e, t2, r) => t2 in e ? rt(e, t2, { enumerable: true, configurable: true, writable: true, value: r }) : e[t2] = r;
var h2 = (e, t2) => {
  for (var r in t2 || (t2 = {})) xe.call(t2, r) && _e(e, r, t2[r]);
  if (F3) for (var r of F3(t2)) be.call(t2, r) && _e(e, r, t2[r]);
  return e;
};
var $3 = (e, t2) => st2(e, nt(t2));
var v2 = (e, t2) => {
  var r = {};
  for (var s4 in e) xe.call(e, s4) && t2.indexOf(s4) < 0 && (r[s4] = e[s4]);
  if (e != null && F3) for (var s4 of F3(e)) t2.indexOf(s4) < 0 && be.call(e, s4) && (r[s4] = e[s4]);
  return r;
};
var at = s();
var N2 = at;
var k3 = /{([^}]*)}/g;
var ne = /(\d+\s+[\+\-\*\/]\s+\d+)/g;
var ie2 = /var\([^)]+\)/g;
function oe2(e) {
  return a(e) ? e.replace(/[A-Z]/g, (t2, r) => r === 0 ? t2 : "." + t2.toLowerCase()).toLowerCase() : e;
}
function ve(e) {
  return i2(e) && e.hasOwnProperty("$value") && e.hasOwnProperty("$type") ? e.$value : e;
}
function dt2(e) {
  return e.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function Q2(e = "", t2 = "") {
  return dt2(`${a(e, false) && a(t2, false) ? `${e}-` : e}${t2}`);
}
function ae2(e = "", t2 = "") {
  return `--${Q2(e, t2)}`;
}
function ht2(e = "") {
  let t2 = (e.match(/{/g) || []).length, r = (e.match(/}/g) || []).length;
  return (t2 + r) % 2 !== 0;
}
function Y3(e, t2 = "", r = "", s4 = [], i3) {
  if (a(e)) {
    let a2 = e.trim();
    if (ht2(a2)) return;
    if (G(a2, k3)) {
      let n2 = a2.replaceAll(k3, (l3) => {
        let c4 = l3.replace(/{|}/g, "").split(".").filter((m2) => !s4.some((d3) => G(m2, d3)));
        return `var(${ae2(r, re(c4.join("-")))}${s2(i3) ? `, ${i3}` : ""})`;
      });
      return G(n2.replace(ie2, "0"), ne) ? `calc(${n2})` : n2;
    }
    return a2;
  } else if (z2(e)) return e;
}
function Re(e, t2, r) {
  a(t2, false) && e.push(`${t2}:${r};`);
}
function C3(e, t2) {
  return e ? `${e}{${t2}}` : "";
}
function le(e, t2) {
  if (e.indexOf("dt(") === -1) return e;
  function r(n2, l3) {
    let o = [], c4 = 0, m2 = "", d3 = null, u2 = 0;
    for (; c4 <= n2.length; ) {
      let g2 = n2[c4];
      if ((g2 === '"' || g2 === "'" || g2 === "`") && n2[c4 - 1] !== "\\" && (d3 = d3 === g2 ? null : g2), !d3 && (g2 === "(" && u2++, g2 === ")" && u2--, (g2 === "," || c4 === n2.length) && u2 === 0)) {
        let f2 = m2.trim();
        f2.startsWith("dt(") ? o.push(le(f2, l3)) : o.push(s4(f2)), m2 = "", c4++;
        continue;
      }
      g2 !== void 0 && (m2 += g2), c4++;
    }
    return o;
  }
  function s4(n2) {
    let l3 = n2[0];
    if ((l3 === '"' || l3 === "'" || l3 === "`") && n2[n2.length - 1] === l3) return n2.slice(1, -1);
    let o = Number(n2);
    return isNaN(o) ? n2 : o;
  }
  let i3 = [], a2 = [];
  for (let n2 = 0; n2 < e.length; n2++) if (e[n2] === "d" && e.slice(n2, n2 + 3) === "dt(") a2.push(n2), n2 += 2;
  else if (e[n2] === ")" && a2.length > 0) {
    let l3 = a2.pop();
    a2.length === 0 && i3.push([l3, n2]);
  }
  if (!i3.length) return e;
  for (let n2 = i3.length - 1; n2 >= 0; n2--) {
    let [l3, o] = i3[n2], c4 = e.slice(l3 + 3, o), m2 = r(c4, t2), d3 = t2(...m2);
    e = e.slice(0, l3) + d3 + e.slice(o + 1);
  }
  return e;
}
var rr = (e) => {
  var a2;
  let t2 = S2.getTheme(), r = ue(t2, e, void 0, "variable"), s4 = (a2 = r == null ? void 0 : r.match(/--[\w-]+/g)) == null ? void 0 : a2[0], i3 = ue(t2, e, void 0, "value");
  return { name: s4, variable: r, value: i3 };
};
var E2 = (...e) => ue(S2.getTheme(), ...e);
var ue = (e = {}, t2, r, s4) => {
  if (t2) {
    let { variable: i3, options: a2 } = S2.defaults || {}, { prefix: n2, transform: l3 } = (e == null ? void 0 : e.options) || a2 || {}, o = G(t2, k3) ? t2 : `{${t2}}`;
    return s4 === "value" || l2(s4) && l3 === "strict" ? S2.getTokenValue(t2) : Y3(o, void 0, n2, [i3.excludedKeyRegex], r);
  }
  return "";
};
function ar(e, ...t2) {
  if (e instanceof Array) {
    let r = e.reduce((s4, i3, a2) => {
      var n2;
      return s4 + i3 + ((n2 = m(t2[a2], { dt: E2 })) != null ? n2 : "");
    }, "");
    return le(r, E2);
  }
  return m(e, { dt: E2 });
}
var w4 = (e = {}) => {
  let { preset: t2, options: r } = e;
  return { preset(s4) {
    return t2 = t2 ? H2(t2, s4) : s4, this;
  }, options(s4) {
    return r = r ? h2(h2({}, r), s4) : s4, this;
  }, primaryPalette(s4) {
    let { semantic: i3 } = t2 || {};
    return t2 = $3(h2({}, t2), { semantic: $3(h2({}, i3), { primary: s4 }) }), this;
  }, surfacePalette(s4) {
    var o, c4;
    let { semantic: i3 } = t2 || {}, a2 = s4 && Object.hasOwn(s4, "light") ? s4.light : s4, n2 = s4 && Object.hasOwn(s4, "dark") ? s4.dark : s4, l3 = { colorScheme: { light: h2(h2({}, (o = i3 == null ? void 0 : i3.colorScheme) == null ? void 0 : o.light), !!a2 && { surface: a2 }), dark: h2(h2({}, (c4 = i3 == null ? void 0 : i3.colorScheme) == null ? void 0 : c4.dark), !!n2 && { surface: n2 }) } };
    return t2 = $3(h2({}, t2), { semantic: h2(h2({}, i3), l3) }), this;
  }, define({ useDefaultPreset: s4 = false, useDefaultOptions: i3 = false } = {}) {
    return { preset: s4 ? S2.getPreset() : t2, options: i3 ? S2.getOptions() : r };
  }, update({ mergePresets: s4 = true, mergeOptions: i3 = true } = {}) {
    let a2 = { preset: s4 ? H2(S2.getPreset(), t2) : t2, options: i3 ? h2(h2({}, S2.getOptions()), r) : r };
    return S2.setTheme(a2), a2;
  }, use(s4) {
    let i3 = this.define(s4);
    return S2.setTheme(i3), i3;
  } };
};
function de(e, t2 = {}) {
  let r = S2.defaults.variable, { prefix: s4 = r.prefix, selector: i3 = r.selector, excludedKeyRegex: a2 = r.excludedKeyRegex } = t2, n2 = [], l3 = [], o = [{ node: e, path: s4 }];
  for (; o.length; ) {
    let { node: m2, path: d3 } = o.pop();
    for (let u2 in m2) {
      let g2 = m2[u2], f2 = ve(g2), p3 = G(u2, a2) ? Q2(d3) : Q2(d3, re(u2));
      if (i2(f2)) o.push({ node: f2, path: p3 });
      else {
        let y3 = ae2(p3), R2 = Y3(f2, p3, s4, [a2]);
        Re(l3, y3, R2);
        let T2 = p3;
        s4 && T2.startsWith(s4 + "-") && (T2 = T2.slice(s4.length + 1)), n2.push(T2.replace(/-/g, "."));
      }
    }
  }
  let c4 = l3.join("");
  return { value: l3, tokens: n2, declarations: c4, css: C3(i3, c4) };
}
var b3 = { regex: { rules: { class: { pattern: /^\.([a-zA-Z][\w-]*)$/, resolve(e) {
  return { type: "class", selector: e, matched: this.pattern.test(e.trim()) };
} }, attr: { pattern: /^\[(.*)\]$/, resolve(e) {
  return { type: "attr", selector: `:root${e},:host${e}`, matched: this.pattern.test(e.trim()) };
} }, media: { pattern: /^@media (.*)$/, resolve(e) {
  return { type: "media", selector: e, matched: this.pattern.test(e.trim()) };
} }, system: { pattern: /^system$/, resolve(e) {
  return { type: "system", selector: "@media (prefers-color-scheme: dark)", matched: this.pattern.test(e.trim()) };
} }, custom: { resolve(e) {
  return { type: "custom", selector: e, matched: true };
} } }, resolve(e) {
  let t2 = Object.keys(this.rules).filter((r) => r !== "custom").map((r) => this.rules[r]);
  return [e].flat().map((r) => {
    var s4;
    return (s4 = t2.map((i3) => i3.resolve(r)).find((i3) => i3.matched)) != null ? s4 : this.rules.custom.resolve(r);
  });
} }, _toVariables(e, t2) {
  return de(e, { prefix: t2 == null ? void 0 : t2.prefix });
}, getCommon({ name: e = "", theme: t2 = {}, params: r, set: s4, defaults: i3 }) {
  var R2, T2, j2, O2, M2, z3, V2;
  let { preset: a2, options: n2 } = t2, l3, o, c4, m2, d3, u2, g2;
  if (s2(a2) && n2.transform !== "strict") {
    let { primitive: L, semantic: te2, extend: re2 } = a2, f2 = te2 || {}, { colorScheme: K3 } = f2, A2 = v2(f2, ["colorScheme"]), x3 = re2 || {}, { colorScheme: X2 } = x3, G2 = v2(x3, ["colorScheme"]), p3 = K3 || {}, { dark: U2 } = p3, B = v2(p3, ["dark"]), y3 = X2 || {}, { dark: I2 } = y3, H3 = v2(y3, ["dark"]), W2 = s2(L) ? this._toVariables({ primitive: L }, n2) : {}, q2 = s2(A2) ? this._toVariables({ semantic: A2 }, n2) : {}, Z = s2(B) ? this._toVariables({ light: B }, n2) : {}, pe = s2(U2) ? this._toVariables({ dark: U2 }, n2) : {}, fe = s2(G2) ? this._toVariables({ semantic: G2 }, n2) : {}, ye = s2(H3) ? this._toVariables({ light: H3 }, n2) : {}, Se = s2(I2) ? this._toVariables({ dark: I2 }, n2) : {}, [Me, ze] = [(R2 = W2.declarations) != null ? R2 : "", W2.tokens], [Ke, Xe] = [(T2 = q2.declarations) != null ? T2 : "", q2.tokens || []], [Ge, Ue] = [(j2 = Z.declarations) != null ? j2 : "", Z.tokens || []], [Be, Ie] = [(O2 = pe.declarations) != null ? O2 : "", pe.tokens || []], [He, We] = [(M2 = fe.declarations) != null ? M2 : "", fe.tokens || []], [qe, Ze] = [(z3 = ye.declarations) != null ? z3 : "", ye.tokens || []], [Fe, Je] = [(V2 = Se.declarations) != null ? V2 : "", Se.tokens || []];
    l3 = this.transformCSS(e, Me, "light", "variable", n2, s4, i3), o = ze;
    let Qe = this.transformCSS(e, `${Ke}${Ge}`, "light", "variable", n2, s4, i3), Ye = this.transformCSS(e, `${Be}`, "dark", "variable", n2, s4, i3);
    c4 = `${Qe}${Ye}`, m2 = [.../* @__PURE__ */ new Set([...Xe, ...Ue, ...Ie])];
    let et2 = this.transformCSS(e, `${He}${qe}color-scheme:light`, "light", "variable", n2, s4, i3), tt = this.transformCSS(e, `${Fe}color-scheme:dark`, "dark", "variable", n2, s4, i3);
    d3 = `${et2}${tt}`, u2 = [.../* @__PURE__ */ new Set([...We, ...Ze, ...Je])], g2 = m(a2.css, { dt: E2 });
  }
  return { primitive: { css: l3, tokens: o }, semantic: { css: c4, tokens: m2 }, global: { css: d3, tokens: u2 }, style: g2 };
}, getPreset({ name: e = "", preset: t2 = {}, options: r, params: s4, set: i3, defaults: a2, selector: n2 }) {
  var f2, x3, p3;
  let l3, o, c4;
  if (s2(t2) && r.transform !== "strict") {
    let y3 = e.replace("-directive", ""), m2 = t2, { colorScheme: R2, extend: T2, css: j2 } = m2, O2 = v2(m2, ["colorScheme", "extend", "css"]), d3 = T2 || {}, { colorScheme: M2 } = d3, z3 = v2(d3, ["colorScheme"]), u2 = R2 || {}, { dark: V2 } = u2, L = v2(u2, ["dark"]), g2 = M2 || {}, { dark: te2 } = g2, re2 = v2(g2, ["dark"]), K3 = s2(O2) ? this._toVariables({ [y3]: h2(h2({}, O2), z3) }, r) : {}, A2 = s2(L) ? this._toVariables({ [y3]: h2(h2({}, L), re2) }, r) : {}, X2 = s2(V2) ? this._toVariables({ [y3]: h2(h2({}, V2), te2) }, r) : {}, [G2, U2] = [(f2 = K3.declarations) != null ? f2 : "", K3.tokens || []], [B, I2] = [(x3 = A2.declarations) != null ? x3 : "", A2.tokens || []], [H3, W2] = [(p3 = X2.declarations) != null ? p3 : "", X2.tokens || []], q2 = this.transformCSS(y3, `${G2}${B}`, "light", "variable", r, i3, a2, n2), Z = this.transformCSS(y3, H3, "dark", "variable", r, i3, a2, n2);
    l3 = `${q2}${Z}`, o = [.../* @__PURE__ */ new Set([...U2, ...I2, ...W2])], c4 = m(j2, { dt: E2 });
  }
  return { css: l3, tokens: o, style: c4 };
}, getPresetC({ name: e = "", theme: t2 = {}, params: r, set: s4, defaults: i3 }) {
  var o;
  let { preset: a2, options: n2 } = t2, l3 = (o = a2 == null ? void 0 : a2.components) == null ? void 0 : o[e];
  return this.getPreset({ name: e, preset: l3, options: n2, params: r, set: s4, defaults: i3 });
}, getPresetD({ name: e = "", theme: t2 = {}, params: r, set: s4, defaults: i3 }) {
  var c4, m2;
  let a2 = e.replace("-directive", ""), { preset: n2, options: l3 } = t2, o = ((c4 = n2 == null ? void 0 : n2.components) == null ? void 0 : c4[a2]) || ((m2 = n2 == null ? void 0 : n2.directives) == null ? void 0 : m2[a2]);
  return this.getPreset({ name: a2, preset: o, options: l3, params: r, set: s4, defaults: i3 });
}, applyDarkColorScheme(e) {
  return !(e.darkModeSelector === "none" || e.darkModeSelector === false);
}, getColorSchemeOption(e, t2) {
  var r;
  return this.applyDarkColorScheme(e) ? this.regex.resolve(e.darkModeSelector === true ? t2.options.darkModeSelector : (r = e.darkModeSelector) != null ? r : t2.options.darkModeSelector) : [];
}, getLayerOrder(e, t2 = {}, r, s4) {
  let { cssLayer: i3 } = t2;
  return i3 ? `@layer ${m(i3.order || i3.name || "primeui", r)}` : "";
}, getCommonStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s4 = {}, set: i3, defaults: a2 }) {
  let n2 = this.getCommon({ name: e, theme: t2, params: r, set: i3, defaults: a2 }), l3 = Object.entries(s4).reduce((o, [c4, m2]) => o.push(`${c4}="${m2}"`) && o, []).join(" ");
  return Object.entries(n2 || {}).reduce((o, [c4, m2]) => {
    if (i2(m2) && Object.hasOwn(m2, "css")) {
      let d3 = Y2(m2.css), u2 = `${c4}-variables`;
      o.push(`<style type="text/css" data-primevue-style-id="${u2}" ${l3}>${d3}</style>`);
    }
    return o;
  }, []).join("");
}, getStyleSheet({ name: e = "", theme: t2 = {}, params: r, props: s4 = {}, set: i3, defaults: a2 }) {
  var c4;
  let n2 = { name: e, theme: t2, params: r, set: i3, defaults: a2 }, l3 = (c4 = e.includes("-directive") ? this.getPresetD(n2) : this.getPresetC(n2)) == null ? void 0 : c4.css, o = Object.entries(s4).reduce((m2, [d3, u2]) => m2.push(`${d3}="${u2}"`) && m2, []).join(" ");
  return l3 ? `<style type="text/css" data-primevue-style-id="${e}-variables" ${o}>${Y2(l3)}</style>` : "";
}, createTokens(e = {}, t2, r = "", s4 = "", i3 = {}) {
  let a2 = function(l3, o = {}, c4 = []) {
    if (c4.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), { colorScheme: l3, path: this.path, paths: o, value: void 0 };
    c4.push(this.path), o.name = this.path, o.binding || (o.binding = {});
    let m2 = this.value;
    if (typeof this.value == "string" && k3.test(this.value)) {
      let u2 = this.value.trim().replace(k3, (g2) => {
        var y3;
        let f2 = g2.slice(1, -1), x3 = this.tokens[f2];
        if (!x3) return console.warn(`Token not found for path: ${f2}`), "__UNRESOLVED__";
        let p3 = x3.computed(l3, o, c4);
        return Array.isArray(p3) && p3.length === 2 ? `light-dark(${p3[0].value},${p3[1].value})` : (y3 = p3 == null ? void 0 : p3.value) != null ? y3 : "__UNRESOLVED__";
      });
      m2 = ne.test(u2.replace(ie2, "0")) ? `calc(${u2})` : u2;
    }
    return l2(o.binding) && delete o.binding, c4.pop(), { colorScheme: l3, path: this.path, paths: o, value: m2.includes("__UNRESOLVED__") ? void 0 : m2 };
  }, n2 = (l3, o, c4) => {
    Object.entries(l3).forEach(([m2, d3]) => {
      let u2 = G(m2, t2.variable.excludedKeyRegex) ? o : o ? `${o}.${oe2(m2)}` : oe2(m2), g2 = c4 ? `${c4}.${m2}` : m2;
      i2(d3) ? n2(d3, u2, g2) : (i3[u2] || (i3[u2] = { paths: [], computed: (f2, x3 = {}, p3 = []) => {
        if (i3[u2].paths.length === 1) return i3[u2].paths[0].computed(i3[u2].paths[0].scheme, x3.binding, p3);
        if (f2 && f2 !== "none") for (let y3 = 0; y3 < i3[u2].paths.length; y3++) {
          let R2 = i3[u2].paths[y3];
          if (R2.scheme === f2) return R2.computed(f2, x3.binding, p3);
        }
        return i3[u2].paths.map((y3) => y3.computed(y3.scheme, x3[y3.scheme], p3));
      } }), i3[u2].paths.push({ path: g2, value: d3, scheme: g2.includes("colorScheme.light") ? "light" : g2.includes("colorScheme.dark") ? "dark" : "none", computed: a2, tokens: i3 }));
    });
  };
  return n2(e, r, s4), i3;
}, getTokenValue(e, t2, r) {
  var l3;
  let i3 = ((o) => o.split(".").filter((m2) => !G(m2.toLowerCase(), r.variable.excludedKeyRegex)).join("."))(t2), a2 = t2.includes("colorScheme.light") ? "light" : t2.includes("colorScheme.dark") ? "dark" : void 0, n2 = [(l3 = e[i3]) == null ? void 0 : l3.computed(a2)].flat().filter((o) => o);
  return n2.length === 1 ? n2[0].value : n2.reduce((o = {}, c4) => {
    let u2 = c4, { colorScheme: m2 } = u2, d3 = v2(u2, ["colorScheme"]);
    return o[m2] = d3, o;
  }, void 0);
}, getSelectorRule(e, t2, r, s4) {
  return r === "class" || r === "attr" ? C3(s2(t2) ? `${e}${t2},${e} ${t2}` : e, s4) : C3(e, C3(t2 != null ? t2 : ":root,:host", s4));
}, transformCSS(e, t2, r, s4, i3 = {}, a2, n2, l3) {
  if (s2(t2)) {
    let { cssLayer: o } = i3;
    if (s4 !== "style") {
      let c4 = this.getColorSchemeOption(i3, n2);
      t2 = r === "dark" ? c4.reduce((m2, { type: d3, selector: u2 }) => (s2(u2) && (m2 += u2.includes("[CSS]") ? u2.replace("[CSS]", t2) : this.getSelectorRule(u2, l3, d3, t2)), m2), "") : C3(l3 != null ? l3 : ":root,:host", t2);
    }
    if (o) {
      let c4 = { name: "primeui", order: "primeui" };
      i2(o) && (c4.name = m(o.name, { name: e, type: s4 })), s2(c4.name) && (t2 = C3(`@layer ${c4.name}`, t2), a2 == null || a2.layerNames(c4.name));
    }
    return t2;
  }
  return "";
} };
var S2 = { defaults: { variable: { prefix: "p", selector: ":root,:host", excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi }, options: { prefix: "p", darkModeSelector: "system", cssLayer: false } }, _theme: void 0, _layerNames: /* @__PURE__ */ new Set(), _loadedStyleNames: /* @__PURE__ */ new Set(), _loadingStyles: /* @__PURE__ */ new Set(), _tokens: {}, update(e = {}) {
  let { theme: t2 } = e;
  t2 && (this._theme = $3(h2({}, t2), { options: h2(h2({}, this.defaults.options), t2.options) }), this._tokens = b3.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
}, get theme() {
  return this._theme;
}, get preset() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.preset) || {};
}, get options() {
  var e;
  return ((e = this.theme) == null ? void 0 : e.options) || {};
}, get tokens() {
  return this._tokens;
}, getTheme() {
  return this.theme;
}, setTheme(e) {
  this.update({ theme: e }), N2.emit("theme:change", e);
}, getPreset() {
  return this.preset;
}, setPreset(e) {
  this._theme = $3(h2({}, this.theme), { preset: e }), this._tokens = b3.createTokens(e, this.defaults), this.clearLoadedStyleNames(), N2.emit("preset:change", e), N2.emit("theme:change", this.theme);
}, getOptions() {
  return this.options;
}, setOptions(e) {
  this._theme = $3(h2({}, this.theme), { options: e }), this.clearLoadedStyleNames(), N2.emit("options:change", e), N2.emit("theme:change", this.theme);
}, getLayerNames() {
  return [...this._layerNames];
}, setLayerNames(e) {
  this._layerNames.add(e);
}, getLoadedStyleNames() {
  return this._loadedStyleNames;
}, isStyleNameLoaded(e) {
  return this._loadedStyleNames.has(e);
}, setLoadedStyleName(e) {
  this._loadedStyleNames.add(e);
}, deleteLoadedStyleName(e) {
  this._loadedStyleNames.delete(e);
}, clearLoadedStyleNames() {
  this._loadedStyleNames.clear();
}, getTokenValue(e) {
  return b3.getTokenValue(this.tokens, e, this.defaults);
}, getCommon(e = "", t2) {
  return b3.getCommon({ name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getComponent(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b3.getPresetC(r);
}, getDirective(e = "", t2) {
  let r = { name: e, theme: this.theme, params: t2, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b3.getPresetD(r);
}, getCustomPreset(e = "", t2, r, s4) {
  let i3 = { name: e, preset: t2, options: this.options, selector: r, params: s4, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
  return b3.getPreset(i3);
}, getLayerOrderCSS(e = "") {
  return b3.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
}, transformCSS(e = "", t2, r = "style", s4) {
  return b3.transformCSS(e, t2, s4, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
}, getCommonStyleSheet(e = "", t2, r = {}) {
  return b3.getCommonStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, getStyleSheet(e, t2, r = {}) {
  return b3.getStyleSheet({ name: e, theme: this.theme, params: t2, props: r, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
}, onStyleMounted(e) {
  this._loadingStyles.add(e);
}, onStyleUpdated(e) {
  this._loadingStyles.add(e);
}, onStyleLoaded(e, { name: t2 }) {
  this._loadingStyles.size && (this._loadingStyles.delete(t2), N2.emit(`theme:${t2}:load`, e), !this._loadingStyles.size && N2.emit("theme:load"));
} };
function Ve(...e) {
  let t2 = w3(S2.getPreset(), ...e);
  return S2.setPreset(t2), t2;
}
function Ae(e) {
  return w4().surfacePalette(e).update().preset;
}

// node_modules/@primeuix/styles/dist/base/index.mjs
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: dt('icon.size');\n        height: dt('icon.size');\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-usestyle.mjs
var _id = 0;
var UseStyle = class _UseStyle {
  document = inject(DOCUMENT);
  use(css2, options = {}) {
    let isLoaded = false;
    let cssRef = css2;
    let styleRef = null;
    const {
      immediate = true,
      manual = false,
      name = `style_${++_id}`,
      id = void 0,
      media = void 0,
      nonce = void 0,
      first = false,
      props = {}
    } = options;
    if (!this.document) return;
    styleRef = this.document.querySelector(`style[data-primeng-style-id="${name}"]`) || id && this.document.getElementById(id) || this.document.createElement("style");
    if (styleRef) {
      if (!styleRef.isConnected) {
        cssRef = css2;
        const HEAD = this.document.head;
        _t(styleRef, "nonce", nonce);
        first && HEAD.firstChild ? HEAD.insertBefore(styleRef, HEAD.firstChild) : HEAD.appendChild(styleRef);
        A(styleRef, {
          type: "text/css",
          media,
          nonce,
          "data-primeng-style-id": name
        });
      }
      if (styleRef.textContent !== cssRef) {
        styleRef.textContent = cssRef;
      }
    }
    return {
      id,
      name,
      el: styleRef,
      css: cssRef
    };
  }
  static \u0275fac = function UseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UseStyle)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _UseStyle,
    factory: _UseStyle.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-base.mjs
var base = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded(name) {
    return this._loadedStyleNames.has(name);
  },
  setLoadedStyleName(name) {
    this._loadedStyleNames.add(name);
  },
  deleteLoadedStyleName(name) {
    this._loadedStyleNames.delete(name);
  },
  clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  }
};
var css = (
  /*css*/
  `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`
);
var BaseStyle = class _BaseStyle {
  name = "base";
  useStyle = inject(UseStyle);
  css = void 0;
  style = void 0;
  classes = {};
  inlineStyles = {};
  load = (style2, options = {}, transform = (cs) => cs) => {
    const computedStyle = transform(ar`${m(style2, {
      dt: E2
    })}`);
    return computedStyle ? this.useStyle.use(Y2(computedStyle), __spreadValues({
      name: this.name
    }, options)) : {};
  };
  loadCSS = (options = {}) => {
    return this.load(this.css, options);
  };
  loadStyle = (options = {}, style2 = "") => {
    return this.load(this.style, options, (computedStyle = "") => S2.transformCSS(options.name || this.name, `${computedStyle}${ar`${style2}`}`));
  };
  loadBaseCSS = (options = {}) => {
    return this.load(css, options);
  };
  loadBaseStyle = (options = {}, style$1 = "") => {
    return this.load(style, options, (computedStyle = "") => S2.transformCSS(options.name || this.name, `${computedStyle}${ar`${style$1}`}`));
  };
  getCommonTheme = (params) => {
    return S2.getCommon(this.name, params);
  };
  getComponentTheme = (params) => {
    return S2.getComponent(this.name, params);
  };
  getPresetTheme = (preset, selector, params) => {
    return S2.getCustomPreset(this.name, preset, selector, params);
  };
  getLayerOrderThemeCSS = () => {
    return S2.getLayerOrderCSS(this.name);
  };
  getStyleSheet = (extendedCSS = "", props = {}) => {
    if (this.css) {
      const _css = m(this.css, {
        dt: E2
      });
      const _style = Y2(ar`${_css}${extendedCSS}`);
      const _props = Object.entries(props).reduce((acc, [k4, v3]) => acc.push(`${k4}="${v3}"`) && acc, []).join(" ");
      return `<style type="text/css" data-primeng-style-id="${this.name}" ${_props}>${_style}</style>`;
    }
    return "";
  };
  getCommonThemeStyleSheet = (params, props = {}) => {
    return S2.getCommonStyleSheet(this.name, params, props);
  };
  getThemeStyleSheet = (params, props = {}) => {
    let css2 = [S2.getStyleSheet(this.name, params, props)];
    if (this.style) {
      const name = this.name === "base" ? "global-style" : `${this.name}-style`;
      const _css = ar`${m(this.style, {
        dt: E2
      })}`;
      const _style = Y2(S2.transformCSS(name, _css));
      const _props = Object.entries(props).reduce((acc, [k4, v3]) => acc.push(`${k4}="${v3}"`) && acc, []).join(" ");
      css2.push(`<style type="text/css" data-primeng-style-id="${name}" ${_props}>${_style}</style>`);
    }
    return css2.join("");
  };
  static \u0275fac = function BaseStyle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseStyle)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BaseStyle,
    factory: _BaseStyle.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-config.mjs
var ThemeProvider = class _ThemeProvider {
  // @todo define type for theme
  theme = signal(void 0, ...ngDevMode ? [{
    debugName: "theme"
  }] : []);
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : []);
  isThemeChanged = false;
  document = inject(DOCUMENT);
  baseStyle = inject(BaseStyle);
  constructor() {
    effect(() => {
      N2.on("theme:change", (newTheme) => {
        untracked(() => {
          this.isThemeChanged = true;
          this.theme.set(newTheme);
        });
      });
    });
    effect(() => {
      const themeValue = this.theme();
      if (this.document && themeValue) {
        if (!this.isThemeChanged) {
          this.onThemeChange(themeValue);
        }
        this.isThemeChanged = false;
      }
    });
  }
  ngOnDestroy() {
    S2.clearLoadedStyleNames();
    N2.clear();
  }
  onThemeChange(value) {
    S2.setTheme(value);
    if (this.document) {
      this.loadCommonTheme();
    }
  }
  loadCommonTheme() {
    if (this.theme() === "none") return;
    if (!S2.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style: style2
      } = this.baseStyle.getCommonTheme?.() || {};
      const styleOptions = {
        nonce: this.csp?.()?.nonce
      };
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, styleOptions));
      this.baseStyle.loadBaseStyle(__spreadValues({
        name: "global-style"
      }, styleOptions), style2);
      S2.setLoadedStyleName("common");
    }
  }
  setThemeConfig(config) {
    const {
      theme,
      csp
    } = config || {};
    if (theme) this.theme.set(theme);
    if (csp) this.csp.set(csp);
  }
  static \u0275fac = function ThemeProvider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeProvider)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ThemeProvider,
    factory: _ThemeProvider.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeProvider, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var PrimeNG = class _PrimeNG extends ThemeProvider {
  ripple = signal(false, ...ngDevMode ? [{
    debugName: "ripple"
  }] : []);
  platformId = inject(PLATFORM_ID);
  /**
   * @deprecated Since v20. Use `inputVariant` instead.
   */
  inputStyle = signal(null, ...ngDevMode ? [{
    debugName: "inputStyle"
  }] : []);
  inputVariant = signal(null, ...ngDevMode ? [{
    debugName: "inputVariant"
  }] : []);
  overlayAppendTo = signal("self", ...ngDevMode ? [{
    debugName: "overlayAppendTo"
  }] : []);
  overlayOptions = {};
  csp = signal({
    nonce: void 0
  }, ...ngDevMode ? [{
    debugName: "csp"
  }] : []);
  unstyled = signal(void 0, ...ngDevMode ? [{
    debugName: "unstyled"
  }] : []);
  pt = signal(void 0, ...ngDevMode ? [{
    debugName: "pt"
  }] : []);
  ptOptions = signal(void 0, ...ngDevMode ? [{
    debugName: "ptOptions"
  }] : []);
  filterMatchModeOptions = {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  };
  translation = {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    is: "Is",
    isNot: "Is not",
    before: "Before",
    after: "After",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    completed: "Completed",
    upload: "Upload",
    cancel: "Cancel",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    dateFormat: "mm/dd/yy",
    firstDayOfWeek: 0,
    today: "Today",
    weekHeader: "Wk",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyMessage: "No results found",
    searchMessage: "Search results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyFilterMessage: "No results found",
    fileChosenMessage: "Files",
    noFileChosenMessage: "No file chosen",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      previousPageLabel: "Previous Page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List",
      selectColor: "Select a color",
      removeLabel: "Remove",
      browseFiles: "Browse Files",
      maximizeLabel: "Maximize",
      minimizeLabel: "Minimize"
    }
  };
  zIndex = {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  };
  translationSource = new Subject();
  translationObserver = this.translationSource.asObservable();
  getTranslation(key) {
    return this.translation[key];
  }
  setTranslation(value) {
    this.translation = __spreadValues(__spreadValues({}, this.translation), value);
    this.translationSource.next(this.translation);
  }
  setConfig(config) {
    const {
      csp,
      ripple,
      inputStyle,
      inputVariant,
      theme,
      overlayOptions,
      translation,
      filterMatchModeOptions,
      overlayAppendTo,
      zIndex,
      ptOptions,
      pt,
      unstyled
    } = config || {};
    if (csp) this.csp.set(csp);
    if (overlayAppendTo) this.overlayAppendTo.set(overlayAppendTo);
    if (ripple) this.ripple.set(ripple);
    if (inputStyle) this.inputStyle.set(inputStyle);
    if (inputVariant) this.inputVariant.set(inputVariant);
    if (overlayOptions) this.overlayOptions = overlayOptions;
    if (translation) this.setTranslation(translation);
    if (filterMatchModeOptions) this.filterMatchModeOptions = filterMatchModeOptions;
    if (zIndex) this.zIndex = zIndex;
    if (pt) this.pt.set(pt);
    if (ptOptions) this.ptOptions.set(ptOptions);
    if (unstyled) this.unstyled.set(unstyled);
    if (theme) this.setThemeConfig({
      theme,
      csp
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PrimeNG_BaseFactory;
    return function PrimeNG_Factory(__ngFactoryType__) {
      return (\u0275PrimeNG_BaseFactory || (\u0275PrimeNG_BaseFactory = \u0275\u0275getInheritedFactory(_PrimeNG)))(__ngFactoryType__ || _PrimeNG);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _PrimeNG,
    factory: _PrimeNG.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeNG, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PRIME_NG_CONFIG = new InjectionToken("PRIME_NG_CONFIG");
function providePrimeNG(...features) {
  const providers = features?.map((feature) => ({
    provide: PRIME_NG_CONFIG,
    useValue: feature,
    multi: false
  }));
  const initializer = provideAppInitializer(() => {
    const PrimeNGConfig = inject(PrimeNG);
    features?.forEach((feature) => PrimeNGConfig.setConfig(feature));
    return;
  });
  return makeEnvironmentProviders([...providers, initializer]);
}

// node_modules/primeng/fesm2022/primeng-basecomponent.mjs
var BaseComponentStyle = class _BaseComponentStyle extends BaseStyle {
  name = "common";
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BaseComponentStyle_BaseFactory;
    return function BaseComponentStyle_Factory(__ngFactoryType__) {
      return (\u0275BaseComponentStyle_BaseFactory || (\u0275BaseComponentStyle_BaseFactory = \u0275\u0275getInheritedFactory(_BaseComponentStyle)))(__ngFactoryType__ || _BaseComponentStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BaseComponentStyle,
    factory: _BaseComponentStyle.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponentStyle, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var PARENT_INSTANCE = new InjectionToken("PARENT_INSTANCE");
var BaseComponent = class _BaseComponent {
  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  el = inject(ElementRef);
  injector = inject(Injector);
  cd = inject(ChangeDetectorRef);
  renderer = inject(Renderer2);
  config = inject(PrimeNG);
  $parentInstance = inject(PARENT_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  baseComponentStyle = inject(BaseComponentStyle);
  baseStyle = inject(BaseStyle);
  scopedStyleEl;
  parent = this.$params.parent;
  cn = f;
  _themeScopedListener;
  /******************** Inputs ********************/
  /**
   * Defines scoped design tokens of the component.
   * @defaultValue undefined
   * @group Props
   */
  dt = input(...ngDevMode ? [void 0, {
    debugName: "dt"
  }] : []);
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  unstyled = input(...ngDevMode ? [void 0, {
    debugName: "unstyled"
  }] : []);
  /**
   * Used to pass attributes to DOM elements inside the component.
   * @defaultValue undefined
   * @group Props
   */
  pt = input(...ngDevMode ? [void 0, {
    debugName: "pt"
  }] : []);
  /**
   * Used to configure passthrough(pt) options of the component.
   * @group Props
   * @defaultValue undefined
   */
  ptOptions = input(...ngDevMode ? [void 0, {
    debugName: "ptOptions"
  }] : []);
  /******************** Computed ********************/
  $attrSelector = s3("pc");
  get $name() {
    return this["componentName"] || this.constructor?.name?.replace(/^_/, "") || "UnknownComponent";
  }
  get $hostName() {
    return this["hostName"];
  }
  get $el() {
    return this.el?.nativeElement;
  }
  directivePT = signal(void 0, ...ngDevMode ? [{
    debugName: "directivePT"
  }] : []);
  directiveUnstyled = signal(void 0, ...ngDevMode ? [{
    debugName: "directiveUnstyled"
  }] : []);
  $unstyled = computed(() => {
    return this.unstyled() ?? this.directiveUnstyled() ?? this.config?.unstyled() ?? false;
  }, ...ngDevMode ? [{
    debugName: "$unstyled"
  }] : []);
  $pt = computed(() => {
    return m(this.pt() || this.directivePT(), this.$params);
  }, ...ngDevMode ? [{
    debugName: "$pt"
  }] : []);
  get $globalPT() {
    return this._getPT(this.config?.pt(), void 0, (value) => m(value, this.$params));
  }
  get $defaultPT() {
    return this._getPT(this.config?.pt(), void 0, (value) => this._getOptionValue(value, this.$hostName || this.$name, this.$params) || m(value, this.$params));
  }
  get $style() {
    return __spreadValues(__spreadValues({
      theme: void 0,
      css: void 0,
      classes: void 0,
      inlineStyles: void 0
    }, (this._getHostInstance(this) || {}).$style), this["_componentStyle"]);
  }
  get $styleOptions() {
    return {
      nonce: this.config?.csp().nonce
    };
  }
  get $params() {
    const parentInstance = this._getHostInstance(this) || this.$parentInstance;
    return {
      instance: this,
      parent: {
        instance: parentInstance
      }
    };
  }
  /******************** Lifecycle Hooks ********************/
  onInit() {
  }
  onChanges(changes) {
  }
  onDoCheck() {
  }
  onAfterContentInit() {
  }
  onAfterContentChecked() {
  }
  onAfterViewInit() {
  }
  onAfterViewChecked() {
  }
  onDestroy() {
  }
  /******************** Angular Lifecycle Hooks ********************/
  constructor() {
    effect((onCleanup) => {
      if (this.document && !isPlatformServer(this.platformId)) {
        N2.off("theme:change", this._themeScopedListener);
        if (this.dt()) {
          this._loadScopedThemeStyles(this.dt());
          this._themeScopedListener = () => this._loadScopedThemeStyles(this.dt());
          this._themeChangeListener(this._themeScopedListener);
        } else {
          this._unloadScopedThemeStyles();
        }
      }
      onCleanup(() => {
        N2.off("theme:change", this._themeScopedListener);
      });
    });
    effect((onCleanup) => {
      if (this.document && !isPlatformServer(this.platformId)) {
        N2.off("theme:change", this._loadCoreStyles);
        if (!this.$unstyled()) {
          this._loadCoreStyles();
          this._themeChangeListener(this._loadCoreStyles);
        }
      }
      onCleanup(() => {
        N2.off("theme:change", this._loadCoreStyles);
      });
    });
    this._hook("onBeforeInit");
  }
  /**
   * ⚠ Do not override ngOnInit!
   *
   * Use 'onInit()' in subclasses instead.
   */
  ngOnInit() {
    this._loadCoreStyles();
    this._loadStyles();
    this.onInit();
    this._hook("onInit");
  }
  /**
   * ⚠ Do not override ngOnChanges!
   *
   * Use 'onChanges(changes: SimpleChanges)' in subclasses instead.
   */
  ngOnChanges(changes) {
    this.onChanges(changes);
    this._hook("onChanges", changes);
  }
  /**
   * ⚠ Do not override ngDoCheck!
   *
   * Use 'onDoCheck()' in subclasses instead.
   */
  ngDoCheck() {
    this.onDoCheck();
    this._hook("onDoCheck");
  }
  /**
   * ⚠ Do not override ngAfterContentInit!
   *
   * Use 'onAfterContentInit()' in subclasses instead.
   */
  ngAfterContentInit() {
    this.onAfterContentInit();
    this._hook("onAfterContentInit");
  }
  /**
   * ⚠ Do not override ngAfterContentChecked!
   *
   * Use 'onAfterContentChecked()' in subclasses instead.
   */
  ngAfterContentChecked() {
    this.onAfterContentChecked();
    this._hook("onAfterContentChecked");
  }
  /**
   * ⚠ Do not override ngAfterViewInit!
   *
   * Use 'onAfterViewInit()' in subclasses instead.
   */
  ngAfterViewInit() {
    this.$el?.setAttribute(this.$attrSelector, "");
    this.onAfterViewInit();
    this._hook("onAfterViewInit");
  }
  /**
   * ⚠ Do not override ngAfterViewChecked!
   *
   * Use 'onAfterViewChecked()' in subclasses instead.
   */
  ngAfterViewChecked() {
    this.onAfterViewChecked();
    this._hook("onAfterViewChecked");
  }
  /**
   * ⚠ Do not override ngOnDestroy!
   *
   * Use 'onDestroy()' in subclasses instead.
   */
  ngOnDestroy() {
    this._removeThemeListeners();
    this._unloadScopedThemeStyles();
    this.onDestroy();
    this._hook("onDestroy");
  }
  /******************** Methods ********************/
  _mergeProps(fn, ...args) {
    return c3(fn) ? fn(...args) : w2(...args);
  }
  _getHostInstance(instance) {
    return instance ? this.$hostName ? this.$name === this.$hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : void 0;
  }
  _getPropValue(name) {
    return this[name] || this._getHostInstance(this)?.[name];
  }
  _getOptionValue(options, key = "", params = {}) {
    return F2(options, key, params);
  }
  _hook(hookName, ...args) {
    if (!this.$hostName) {
      const selfHook = this._usePT(this._getPT(this.$pt(), this.$name), this._getOptionValue, `hooks.${hookName}`);
      const defaultHook = this._useDefaultPT(this._getOptionValue, `hooks.${hookName}`);
      selfHook?.(...args);
      defaultHook?.(...args);
    }
  }
  /********** Load Styles **********/
  _load() {
    if (!base.isStyleNameLoaded("base")) {
      this.baseStyle.loadBaseCSS(this.$styleOptions);
      this._loadGlobalStyles();
      base.setLoadedStyleName("base");
    }
    this._loadThemeStyles();
  }
  _loadStyles() {
    this._load();
    this._themeChangeListener(() => this._load());
  }
  _loadGlobalStyles() {
    const globalCSS = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
    s2(globalCSS) && this.baseStyle.load(globalCSS, __spreadValues({
      name: "global"
    }, this.$styleOptions));
  }
  _loadCoreStyles() {
    if (!base.isStyleNameLoaded(this.$style?.name) && this.$style?.name) {
      this.baseComponentStyle.loadCSS(this.$styleOptions);
      this.$style.loadCSS(this.$styleOptions);
      base.setLoadedStyleName(this.$style.name);
    }
  }
  _loadThemeStyles() {
    if (this.$unstyled() || this.config?.theme() === "none") return;
    if (!S2.isStyleNameLoaded("common")) {
      const {
        primitive,
        semantic,
        global,
        style: style2
      } = this.$style?.getCommonTheme?.() || {};
      this.baseStyle.load(primitive?.css, __spreadValues({
        name: "primitive-variables"
      }, this.$styleOptions));
      this.baseStyle.load(semantic?.css, __spreadValues({
        name: "semantic-variables"
      }, this.$styleOptions));
      this.baseStyle.load(global?.css, __spreadValues({
        name: "global-variables"
      }, this.$styleOptions));
      this.baseStyle.loadBaseStyle(__spreadValues({
        name: "global-style"
      }, this.$styleOptions), style2);
      S2.setLoadedStyleName("common");
    }
    if (!S2.isStyleNameLoaded(this.$style?.name) && this.$style?.name) {
      const {
        css: css2,
        style: style2
      } = this.$style?.getComponentTheme?.() || {};
      this.$style?.load(css2, __spreadValues({
        name: `${this.$style?.name}-variables`
      }, this.$styleOptions));
      this.$style?.loadStyle(__spreadValues({
        name: `${this.$style?.name}-style`
      }, this.$styleOptions), style2);
      S2.setLoadedStyleName(this.$style?.name);
    }
    if (!S2.isStyleNameLoaded("layer-order")) {
      const layerOrder = this.$style?.getLayerOrderThemeCSS?.();
      this.baseStyle.load(layerOrder, __spreadValues({
        name: "layer-order",
        first: true
      }, this.$styleOptions));
      S2.setLoadedStyleName("layer-order");
    }
  }
  _loadScopedThemeStyles(preset) {
    const {
      css: css2
    } = this.$style?.getPresetTheme?.(preset, `[${this.$attrSelector}]`) || {};
    const scopedStyle = this.$style?.load(css2, __spreadValues({
      name: `${this.$attrSelector}-${this.$style?.name}`
    }, this.$styleOptions));
    this.scopedStyleEl = scopedStyle?.el;
  }
  _unloadScopedThemeStyles() {
    this.scopedStyleEl?.remove();
  }
  _themeChangeListener(callback = () => {
  }) {
    base.clearLoadedStyleNames();
    N2.on("theme:change", callback.bind(this));
  }
  _removeThemeListeners() {
    N2.off("theme:change", this._loadCoreStyles);
    N2.off("theme:change", this._load);
    N2.off("theme:change", this._themeScopedListener);
  }
  /********** Passthrough **********/
  _getPTValue(obj = {}, key = "", params = {}, searchInDefaultPT = true) {
    const searchOut = /./g.test(key) && !!params[key.split(".")[0]];
    const {
      mergeSections = true,
      mergeProps: useMergeProps = false
    } = this._getPropValue("ptOptions")?.() || this.config?.["ptOptions"]?.() || {};
    const global = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : void 0;
    const self = searchOut ? void 0 : this._usePT(this._getPT(obj, this.$hostName || this.$name), this._getPTClassValue, key, __spreadProps(__spreadValues({}, params), {
      global: global || {}
    }));
    const datasets = this._getPTDatasets(key);
    return mergeSections || !mergeSections && self ? useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : __spreadValues(__spreadValues(__spreadValues({}, global), self), datasets) : __spreadValues(__spreadValues({}, self), datasets);
  }
  _getPTDatasets(key = "") {
    const datasetPrefix = "data-pc-";
    const isExtended = key === "root" && s2(this.$pt()?.["data-pc-section"]);
    return key !== "transition" && __spreadProps(__spreadValues({}, key === "root" && __spreadProps(__spreadValues({
      [`${datasetPrefix}name`]: g(isExtended ? this.$pt()?.["data-pc-section"] : this.$name)
    }, isExtended && {
      [`${datasetPrefix}extend`]: g(this.$name)
    }), {
      [`${this.$attrSelector}`]: ""
      // @todo - use `data-pc-id: this.$attrSelector` instead.
    })), {
      [`${datasetPrefix}section`]: g(key.includes(".") ? key.split(".").at(-1) ?? "" : key)
    });
  }
  _getPTClassValue(options, key, params) {
    const value = this._getOptionValue(options, key, params);
    return a(value) || C2(value) ? {
      class: value
    } : value;
  }
  _getPT(pt, key = "", callback) {
    const getValue = (value, checkSameKey = false) => {
      const computedValue = callback ? callback(value) : value;
      const _key = g(key);
      const _cKey = g(this.$hostName || this.$name);
      return (checkSameKey ? _key !== _cKey ? computedValue?.[_key] : void 0 : computedValue?.[_key]) ?? computedValue;
    };
    return pt?.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt, true);
  }
  _usePT(pt, callback, key, params) {
    const fn = (value) => callback?.call(this, value, key, params);
    if (pt?.hasOwnProperty("_usept")) {
      const {
        mergeSections = true,
        mergeProps: useMergeProps = false
      } = pt["_usept"] || this.config?.["ptOptions"]() || {};
      const originalValue = fn(pt.originalValue);
      const value = fn(pt.value);
      if (originalValue === void 0 && value === void 0) return void 0;
      else if (a(value)) return value;
      else if (a(originalValue)) return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : __spreadValues(__spreadValues({}, originalValue), value) : value;
    }
    return fn(pt);
  }
  _useGlobalPT(callback, key, params) {
    return this._usePT(this.$globalPT, callback, key, params);
  }
  _useDefaultPT(callback, key, params) {
    return this._usePT(this.$defaultPT, callback, key, params);
  }
  /******************** Exposed API ********************/
  ptm(key = "", params = {}) {
    return this._getPTValue(this.$pt(), key, __spreadValues(__spreadValues({}, this.$params), params));
  }
  ptms(keys, params = {}) {
    return keys.reduce((acc, arg) => {
      acc = w2(acc, this.ptm(arg, params)) || {};
      return acc;
    }, {});
  }
  ptmo(obj = {}, key = "", params = {}) {
    return this._getPTValue(obj, key, __spreadValues({
      instance: this
    }, params), false);
  }
  cx(key, params = {}) {
    return !this.$unstyled() ? f(this._getOptionValue(this.$style.classes, key, __spreadValues(__spreadValues({}, this.$params), params))) : void 0;
  }
  sx(key = "", when = true, params = {}) {
    if (when) {
      const self = this._getOptionValue(this.$style.inlineStyles, key, __spreadValues(__spreadValues({}, this.$params), params));
      const base2 = this._getOptionValue(this.baseComponentStyle.inlineStyles, key, __spreadValues(__spreadValues({}, this.$params), params));
      return __spreadValues(__spreadValues({}, base2), self);
    }
    return void 0;
  }
  static \u0275fac = function BaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseComponent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseComponent,
    inputs: {
      dt: [1, "dt"],
      unstyled: [1, "unstyled"],
      pt: [1, "pt"],
      ptOptions: [1, "ptOptions"]
    },
    features: [\u0275\u0275ProvidersFeature([BaseComponentStyle, BaseStyle]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponent, [{
    type: Directive,
    args: [{
      standalone: true,
      providers: [BaseComponentStyle, BaseStyle]
    }]
  }], () => [], {
    dt: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "dt",
        required: false
      }]
    }],
    unstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "unstyled",
        required: false
      }]
    }],
    pt: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pt",
        required: false
      }]
    }],
    ptOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "ptOptions",
        required: false
      }]
    }]
  });
})();

// node_modules/primeng/fesm2022/primeng-bind.mjs
var Bind = class _Bind {
  el;
  renderer;
  /**
   * Dynamic attributes, properties, and event listeners to be applied to the host element.
   * @group Props
   */
  pBind = input(void 0, ...ngDevMode ? [{
    debugName: "pBind"
  }] : []);
  _attrs = signal(void 0, ...ngDevMode ? [{
    debugName: "_attrs"
  }] : []);
  attrs = computed(() => this._attrs() || this.pBind(), ...ngDevMode ? [{
    debugName: "attrs"
  }] : []);
  styles = computed(() => this.attrs()?.style, ...ngDevMode ? [{
    debugName: "styles"
  }] : []);
  classes = computed(() => f(this.attrs()?.class), ...ngDevMode ? [{
    debugName: "classes"
  }] : []);
  listeners = [];
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
    effect(() => {
      const _a = this.attrs() || {}, {
        style: style2,
        class: className
      } = _a, rest = __objRest(_a, [
        "style",
        "class"
      ]);
      for (const [key, value] of Object.entries(rest)) {
        if (key.startsWith("on") && typeof value === "function") {
          const eventName = key.slice(2).toLowerCase();
          if (!this.listeners.some((l3) => l3.eventName === eventName)) {
            const unlisten = this.renderer.listen(this.el.nativeElement, eventName, value);
            this.listeners.push({
              eventName,
              unlisten
            });
          }
        } else if (value === null || value === void 0) {
          this.renderer.removeAttribute(this.el.nativeElement, key);
        } else {
          this.renderer.setAttribute(this.el.nativeElement, key, value.toString());
          if (key in this.el.nativeElement) {
            this.el.nativeElement[key] = value;
          }
        }
      }
    });
  }
  ngOnDestroy() {
    this.clearListeners();
  }
  setAttrs(attrs) {
    if (!k2(this._attrs(), attrs)) {
      this._attrs.set(attrs);
    }
  }
  clearListeners() {
    this.listeners.forEach(({
      unlisten
    }) => unlisten());
    this.listeners = [];
  }
  static \u0275fac = function Bind_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Bind)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Bind,
    selectors: [["", "pBind", ""]],
    hostVars: 4,
    hostBindings: function Bind_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275styleMap(ctx.styles());
        \u0275\u0275classMap(ctx.classes());
      }
    },
    inputs: {
      pBind: [1, "pBind"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Bind, [{
    type: Directive,
    args: [{
      selector: "[pBind]",
      standalone: true,
      host: {
        "[style]": "styles()",
        "[class]": "classes()"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    pBind: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pBind",
        required: false
      }]
    }]
  });
})();
var BindModule = class _BindModule {
  static \u0275fac = function BindModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BindModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _BindModule,
    imports: [Bind],
    exports: [Bind]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BindModule, [{
    type: NgModule,
    args: [{
      imports: [Bind],
      exports: [Bind]
    }]
  }], null, null);
})();

export {
  f,
  R,
  W,
  st,
  P,
  dt,
  x,
  w,
  h,
  k,
  $,
  D,
  S,
  v,
  I,
  c,
  j,
  ut,
  U,
  ht,
  Y,
  z,
  bt,
  Q,
  b,
  vt,
  Tt,
  Ht,
  Lt,
  K,
  C,
  Mt,
  Rt,
  Dt,
  et,
  qt,
  Yt,
  Qt,
  Zt,
  Gt,
  Kt,
  _t,
  te,
  l2 as l,
  y2 as y,
  s2 as s,
  p2 as p,
  k2,
  q,
  M,
  C2,
  O,
  J,
  oe,
  s3 as s2,
  ConfirmEventType,
  ConfirmationService,
  FilterMatchMode,
  FilterOperator,
  FilterService,
  MessageService,
  OverlayService,
  Header,
  Footer,
  PrimeTemplate,
  SharedModule,
  TranslationKeys,
  rr,
  w4 as w2,
  Ve,
  Ae,
  BaseStyle,
  providePrimeNG,
  PARENT_INSTANCE,
  BaseComponent,
  Bind,
  BindModule
};
//# sourceMappingURL=chunk-UHTXY4UO.js.map
