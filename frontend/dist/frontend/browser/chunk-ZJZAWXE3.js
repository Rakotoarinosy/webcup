import {
  Card,
  CardModule
} from "./chunk-ROQ7VFPT.js";
import {
  MunicipalNavigation
} from "./chunk-TSU7FZ7T.js";
import {
  MunicipalContentService
} from "./chunk-BJ7LH56I.js";
import {
  require_leaflet_src
} from "./chunk-YPF3MTRK.js";
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
  Router
} from "./chunk-F3M422Q6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-BX45OWY6.js";
import "./chunk-YMMGU7DJ.js";
import {
  Component,
  DestroyRef,
  Input,
  ViewChild,
  __toESM,
  computed,
  effect,
  finalize,
  forwardRef,
  inject,
  input,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuerySignal
} from "./chunk-TSUH44O7.js";

// src/app/municipal/municipal-content.model.ts
function isLocated(service) {
  return service.latitude !== null && service.longitude !== null;
}
function directionsUrl(service) {
  return `https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`;
}
function distanceKm(from, to) {
  const rad = (deg) => deg * Math.PI / 180;
  const dLat = rad(to.latitude - from.latitude);
  const dLon = rad(to.longitude - from.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.latitude)) * Math.cos(rad(to.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1e3)} m` : `${km.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} km`;
}

// src/app/municipal/services-map.ts
var L = __toESM(require_leaflet_src());
var _c0 = ["mapContainer"];
var DEFAULT_CENTER = [-18.9068, 47.5244];
var ServicesMap = class _ServicesMap {
  services = input([], ...ngDevMode ? [{ debugName: "services" }] : []);
  position = input(null, ...ngDevMode ? [{ debugName: "position" }] : []);
  container = viewChild.required("mapContainer");
  ready = signal(false, ...ngDevMode ? [{ debugName: "ready" }] : []);
  map;
  layer = L.layerGroup();
  markers = new globalThis.Map();
  constructor() {
    effect(() => {
      const services = this.services();
      const position = this.position();
      if (this.ready())
        this.render(services, position);
    });
  }
  ngAfterViewInit() {
    this.map = L.map(this.container().nativeElement).setView(DEFAULT_CENTER, 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "\xA9 OpenStreetMap contributors" }).addTo(this.map);
    this.layer.addTo(this.map);
    this.ready.set(true);
  }
  ngOnDestroy() {
    this.map?.remove();
    this.map = void 0;
  }
  /** Centre la carte sur un service et ouvre sa fiche (bouton « Voir sur la carte »). */
  focus(serviceId) {
    const marker2 = this.markers.get(serviceId);
    if (!marker2 || !this.map)
      return;
    this.map.setView(marker2.getLatLng(), 17, { animate: false });
    marker2.openPopup();
  }
  render(services, position) {
    this.layer.clearLayers();
    this.markers.clear();
    const points = [];
    for (const service of services) {
      const icon = L.divIcon({
        className: "service-marker",
        html: `<div style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#124f70;color:#fff;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"><i class="pi ${escapeHtml(service.icon)}"></i></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      const popup = `
                <div style="min-width:200px">
                    <strong style="font-size:14px">${escapeHtml(service.name)}</strong>
                    <div style="margin-top:4px">${escapeHtml(service.address ?? "")}</div>
                    <div style="margin-top:2px">${escapeHtml(service.opening_hours)}</div>
                    <a style="display:inline-block;margin-top:6px;font-weight:600" href="${directionsUrl(service)}" target="_blank" rel="noopener">Itin\xE9raire</a>
                </div>`;
      const marker2 = L.marker([service.latitude, service.longitude], { icon, title: service.name, alt: service.name }).bindPopup(popup).addTo(this.layer);
      this.markers.set(service.id, marker2);
      points.push([service.latitude, service.longitude]);
    }
    if (position) {
      L.circleMarker([position.latitude, position.longitude], { radius: 8, color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }).bindTooltip("Vous \xEAtes ici").addTo(this.layer);
      points.push([position.latitude, position.longitude]);
    }
    if (points.length) {
      this.map?.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 16, animate: false });
    }
  }
  static \u0275fac = function ServicesMap_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ServicesMap)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServicesMap, selectors: [["app-services-map"]], viewQuery: function ServicesMap_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.container, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { services: [1, "services"], position: [1, "position"] }, decls: 2, vars: 0, consts: [["mapContainer", ""], ["role", "region", "aria-label", "Carte des lieux d\u2019accueil des services municipaux", 1, "services-map"]], template: function ServicesMap_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 1, 0);
    }
  }, styles: ["\n\n.services-map[_ngcontent-%COMP%] {\n  height: 360px;\n  border-radius: 0.75rem;\n  z-index: 0;\n}\n/*# sourceMappingURL=services-map.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServicesMap, [{
    type: Component,
    args: [{ selector: "app-services-map", template: `<div #mapContainer class="services-map" role="region" aria-label="Carte des lieux d\u2019accueil des services municipaux"></div>`, styles: ["/* angular:styles/component:scss;c6a550f38afe158b56a3a3e68fd9a7b15582460f900a8ca108fb83dd53519e12;/home/fehizoro/Documents/dev/webcup/frontend/src/app/municipal/services-map.ts */\n.services-map {\n  height: 360px;\n  border-radius: 0.75rem;\n  z-index: 0;\n}\n/*# sourceMappingURL=services-map.css.map */\n"] }]
  }], () => [], { services: [{ type: Input, args: [{ isSignal: true, alias: "services", required: false }] }], position: [{ type: Input, args: [{ isSignal: true, alias: "position", required: false }] }], container: [{ type: ViewChild, args: ["mapContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServicesMap, { className: "ServicesMap", filePath: "src/app/municipal/services-map.ts", lineNumber: 24 });
})();
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// src/app/municipal/municipal-services.ts
var _c02 = ["mapSection"];
var _forTrack0 = ($index, $item) => $item.id;
function MunicipalServices_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Actualisation des services\u2026");
    \u0275\u0275elementEnd();
  }
}
function MunicipalServices_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MunicipalServices_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MunicipalServices_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 15, 0)(2, "h2", 18);
    \u0275\u0275text(3, "O\xF9 nous trouver");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-services-map", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("services", ctx_r0.locatedServices())("position", ctx_r0.position());
  }
}
function MunicipalServices_For_21_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const service_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("id", "service-" + service_r3.id);
    \u0275\u0275advance();
    \u0275\u0275classMap("pi " + service_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", service_r3.name);
  }
}
function MunicipalServices_For_21_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 \xE0 ", ctx);
  }
}
function MunicipalServices_For_21_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275conditionalCreate(1, MunicipalServices_For_21_Conditional_10_Conditional_1_Template, 2, 1, "span", 27);
  }
  if (rf & 2) {
    let tmp_13_0;
    const service_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", service_r3.address, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = ctx_r0.distance(service_r3)) ? 1 : -1, tmp_13_0);
  }
}
function MunicipalServices_For_21_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1, "Lieu d\u2019accueil non renseign\xE9");
    \u0275\u0275elementEnd();
  }
}
function MunicipalServices_For_21_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2, " Itin\xE9raire");
    \u0275\u0275elementStart(3, "span", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 30);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const service_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showOnMap(service_r3));
    });
    \u0275\u0275element(6, "i", 31);
    \u0275\u0275text(7, " Voir sur la carte");
    \u0275\u0275elementStart(8, "span", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ctx_r0.directionsUrl(service_r3), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" vers ", service_r3.name, " (nouvel onglet)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" : ", service_r3.name);
  }
}
function MunicipalServices_For_21_Conditional_27_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_27_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const service_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.editLocation(service_r3));
    });
    \u0275\u0275text(1, " Modifier le lieu d\u2019accueil");
    \u0275\u0275elementStart(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" de ", service_r3.name);
  }
}
function MunicipalServices_For_21_Conditional_27_Conditional_19_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_27_Conditional_19_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const service_r3 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveLocation(service_r3, true));
    });
    \u0275\u0275text(1, "Retirer le lieu");
    \u0275\u0275elementEnd();
  }
}
function MunicipalServices_For_21_Conditional_27_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "fieldset", 38)(1, "legend", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 41)(4, "span");
    \u0275\u0275text(5, "Adresse *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalServices_For_21_Conditional_27_Conditional_19_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.locationForm.address, $event) || (ctx_r0.locationForm.address = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 43)(8, "label", 41)(9, "span");
    \u0275\u0275text(10, "Latitude *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalServices_For_21_Conditional_27_Conditional_19_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.locationForm.latitude, $event) || (ctx_r0.locationForm.latitude = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "label", 41)(13, "span");
    \u0275\u0275text(14, "Longitude *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function MunicipalServices_For_21_Conditional_27_Conditional_19_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.locationForm.longitude, $event) || (ctx_r0.locationForm.longitude = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "p", 46);
    \u0275\u0275text(17, "Astuce : sur openstreetmap.org, clic droit sur le lieu puis \xAB Afficher l\u2019adresse \xBB donne les coordonn\xE9es.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 47)(19, "button", 48);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_27_Conditional_19_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r8);
      const service_r3 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.saveLocation(service_r3));
    });
    \u0275\u0275text(20, "Enregistrer le lieu");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, MunicipalServices_For_21_Conditional_27_Conditional_19_Conditional_21_Template, 2, 0, "button", 49);
    \u0275\u0275elementStart(22, "button", 50);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_27_Conditional_19_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.editingLocation.set(null));
    });
    \u0275\u0275text(23, "Annuler");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const service_r3 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.saving() === service_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lieu d\u2019accueil de ", service_r3.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.locationForm.address);
    \u0275\u0275property("name", "address-" + service_r3.id);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.locationForm.latitude);
    \u0275\u0275property("name", "latitude-" + service_r3.id);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.locationForm.longitude);
    \u0275\u0275property("name", "longitude-" + service_r3.id);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(service_r3.address ? 21 : -1);
  }
}
function MunicipalServices_For_21_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "label", 33)(2, "input", 34);
    \u0275\u0275listener("change", function MunicipalServices_For_21_Conditional_27_Template_input_change_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const service_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFeaturedChange(service_r3, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Mettre en avant");
    \u0275\u0275elementStart(5, "span", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "label", 33)(8, "span");
    \u0275\u0275text(9, "Ordre");
    \u0275\u0275elementStart(10, "span", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "input", 35, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 36);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Conditional_27_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r5);
      const orderInput_r6 = \u0275\u0275reference(13);
      const service_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.updateFeatured(service_r3, service_r3.is_featured, +orderInput_r6.value));
    });
    \u0275\u0275text(15, " Enregistrer");
    \u0275\u0275elementStart(16, "span", 23);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, MunicipalServices_For_21_Conditional_27_Conditional_18_Template, 4, 1, "button", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, MunicipalServices_For_21_Conditional_27_Conditional_19_Template, 24, 9, "fieldset", 38);
  }
  if (rf & 2) {
    const service_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", service_r3.is_featured)("disabled", ctx_r0.saving() === service_r3.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", service_r3.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" de ", service_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("value", service_r3.display_order)("disabled", ctx_r0.saving() === service_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving() === service_r3.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" la mise en avant de ", service_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.editingLocation() !== service_r3.id ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.editingLocation() === service_r3.id ? 19 : -1);
  }
}
function MunicipalServices_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 17)(1, "p-card");
    \u0275\u0275template(2, MunicipalServices_For_21_ng_template_2_Template, 3, 4, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "dl")(7, "dt");
    \u0275\u0275text(8, "Adresse");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dd");
    \u0275\u0275conditionalCreate(10, MunicipalServices_For_21_Conditional_10_Template, 2, 2)(11, MunicipalServices_For_21_Conditional_11_Template, 2, 0, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "dt");
    \u0275\u0275text(13, "Horaires");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "dd");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dt");
    \u0275\u0275text(17, "Contact");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dd");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 21);
    \u0275\u0275conditionalCreate(21, MunicipalServices_For_21_Conditional_21_Template, 10, 3);
    \u0275\u0275elementStart(22, "button", 22);
    \u0275\u0275listener("click", function MunicipalServices_For_21_Template_button_click_22_listener() {
      const service_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.startService(service_r3));
    });
    \u0275\u0275text(23, " Contacter ce service");
    \u0275\u0275elementStart(24, "span", 23);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "i", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, MunicipalServices_For_21_Conditional_27_Template, 20, 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-labelledby", "service-" + service_r3.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(service_r3.description);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(service_r3.address ? 10 : 11);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(service_r3.opening_hours);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(service_r3.contact_details);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isLocated(service_r3) ? 21 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.openingService() !== null);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" : ", service_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.auth.hasRole("manager", "admin") ? 27 : -1);
  }
}
function MunicipalServices_ForEmpty_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "Aucun service ne correspond \xE0 votre recherche.");
    \u0275\u0275elementEnd();
  }
}
var MunicipalServices = class _MunicipalServices {
  live = inject(LiveDataService);
  destroyRef = inject(DestroyRef);
  content = inject(MunicipalContentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  navigation = inject(MunicipalNavigation);
  openingService = signal(null, ...ngDevMode ? [{ debugName: "openingService" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  services = signal([], ...ngDevMode ? [{ debugName: "services" }] : []);
  search = signal("", ...ngDevMode ? [{ debugName: "search" }] : []);
  saving = signal(null, ...ngDevMode ? [{ debugName: "saving" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  /** Position de l'habitant, uniquement dans le navigateur : elle n'est jamais envoyée au serveur. */
  position = signal(null, ...ngDevMode ? [{ debugName: "position" }] : []);
  locating = signal(false, ...ngDevMode ? [{ debugName: "locating" }] : []);
  locateMessage = signal(null, ...ngDevMode ? [{ debugName: "locateMessage" }] : []);
  editingLocation = signal(null, ...ngDevMode ? [{ debugName: "editingLocation" }] : []);
  directionsUrl = directionsUrl;
  isLocated = isLocated;
  locationForm = { address: "", latitude: null, longitude: null };
  map = viewChild(ServicesMap, ...ngDevMode ? [{ debugName: "map" }] : []);
  mapSection = viewChild("mapSection", ...ngDevMode ? [{ debugName: "mapSection" }] : []);
  locatedServices = computed(() => this.visibleServices().filter(isLocated), ...ngDevMode ? [{ debugName: "locatedServices" }] : []);
  visibleServices = computed(() => {
    const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
    const query = normalize(this.search().trim());
    const items = [...this.services()];
    items.sort((a, b) => Number(normalize(b.category).includes("sant")) - Number(normalize(a.category).includes("sant")) || a.display_order - b.display_order);
    const position = this.position();
    if (position) {
      const distance = (service) => isLocated(service) ? distanceKm(position, service) : Number.POSITIVE_INFINITY;
      items.sort((a, b) => distance(a) - distance(b));
    }
    return query ? items.filter((service) => normalize(`${service.name} ${service.category ?? ""} ${service.description} ${service.address ?? ""}`).includes(query)) : items;
  }, ...ngDevMode ? [{ debugName: "visibleServices" }] : []);
  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const search = params.get("search");
      if (search !== null)
        this.search.set(search);
    });
    this.load();
    this.live.watch(this.destroyRef, () => this.load(), () => !this.loading() && !this.saving());
  }
  load() {
    if (this.loading())
      return;
    this.loading.set(true);
    this.error.set(null);
    this.content.services().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: (items) => this.services.set(items),
      error: () => this.error.set("Impossible de charger les services. R\xE9essayez.")
    });
  }
  distance(service) {
    const position = this.position();
    return position && isLocated(service) ? formatDistance(distanceKm(position, service)) : null;
  }
  locateMe() {
    if (!("geolocation" in navigator)) {
      this.locateMessage.set("Votre navigateur ne permet pas de vous localiser. Recherchez le service par son nom ou son adresse.");
      return;
    }
    this.locating.set(true);
    this.locateMessage.set(null);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.position.set({ latitude: coords.latitude, longitude: coords.longitude });
      this.locating.set(false);
      this.locateMessage.set("Services class\xE9s du plus proche au plus \xE9loign\xE9 de vous.");
    }, () => {
      this.locating.set(false);
      this.locateMessage.set("Position indisponible ou refus\xE9e. Recherchez le service par son nom ou son adresse.");
    }, { timeout: 1e4, maximumAge: 3e5 });
  }
  showOnMap(service) {
    this.mapSection()?.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    this.map()?.focus(service.id);
  }
  editLocation(service) {
    this.editingLocation.set(service.id);
    this.locationForm = { address: service.address ?? "", latitude: service.latitude, longitude: service.longitude };
  }
  saveLocation(service, clear = false) {
    if (this.saving())
      return;
    const form = this.locationForm;
    const location = clear ? { address: null, latitude: null, longitude: null } : { address: form.address.trim(), latitude: form.latitude, longitude: form.longitude };
    if (!clear && (!location.address || location.latitude === null || location.longitude === null)) {
      this.error.set(`Renseignez l\u2019adresse, la latitude et la longitude de \xAB ${service.name} \xBB.`);
      return;
    }
    this.saving.set(service.id);
    this.error.set(null);
    this.content.updateServiceLocation(service.id, location).pipe(finalize(() => this.saving.set(null))).subscribe({
      next: (updated) => {
        this.services.update((items) => items.map((item) => item.id === updated.id ? updated : item));
        this.editingLocation.set(null);
      },
      error: () => this.error.set(`Impossible d\u2019enregistrer le lieu d\u2019accueil de \xAB ${service.name} \xBB. V\xE9rifiez les coordonn\xE9es puis r\xE9essayez.`)
    });
  }
  onFeaturedChange(service, event) {
    const input2 = event.target;
    if (input2 instanceof HTMLInputElement)
      this.updateFeatured(service, input2.checked);
  }
  updateFeatured(service, isFeatured, displayOrder = service.display_order) {
    if (this.saving())
      return;
    this.saving.set(service.id);
    this.error.set(null);
    this.content.updateFeaturedService(service.id, isFeatured, displayOrder).subscribe({
      next: (updated) => {
        this.services.update((items) => items.map((item) => item.id === updated.id ? updated : item));
        this.saving.set(null);
      },
      error: () => {
        this.error.set("Impossible de modifier la mise en avant. V\xE9rifiez vos droits puis r\xE9essayez.");
        this.saving.set(null);
      }
    });
  }
  startService(service) {
    if (this.openingService())
      return;
    this.openingService.set(service.id);
    this.error.set(null);
    this.content.startService(service.id).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.openingService.set(null))).subscribe({
      next: () => void this.router.navigate([this.navigation.path("contact")], { queryParams: { service: service.id } }),
      error: () => this.error.set("Impossible d\u2019ouvrir cette d\xE9marche. R\xE9essayez dans quelques instants.")
    });
  }
  static \u0275fac = function MunicipalServices_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MunicipalServices)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MunicipalServices, selectors: [["app-municipal-services"]], viewQuery: function MunicipalServices_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.map, ServicesMap, 5)(ctx.mapSection, _c02, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  }, decls: 23, vars: 9, consts: [["mapSection", ""], ["title", ""], ["orderInput", ""], ["role", "status"], [1, "municipal-page"], [1, "intro"], [1, "mb-5", "flex", "flex-wrap", "items-end", "gap-3"], ["role", "search", "aria-label", "Rechercher un service municipal", 1, "min-w-[16rem]", "flex-1"], ["for", "service-search", 1, "mb-2", "block", "font-semibold"], ["id", "service-search", "type", "search", "name", "service-search", 1, "w-full", "rounded", "border", "border-surface", "bg-transparent", "p-3", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "locate-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", "pi-compass"], ["aria-live", "polite", 1, "sr-only"], ["role", "status", 1, "mb-4"], ["role", "alert", 1, "mb-4", "text-red-600"], ["aria-labelledby", "map-heading", 1, "mb-6"], [1, "service-grid"], [1, "service-card"], ["id", "map-heading", 1, "mb-3", "text-xl", "font-semibold"], [3, "services", "position"], [1, "text-muted-color"], [1, "card-actions"], ["type", "button", 1, "card-action", 3, "click", "disabled"], [1, "sr-only"], ["aria-hidden", "true", 1, "pi", "pi-arrow-right"], [3, "id"], ["aria-hidden", "true"], [1, "distance"], ["target", "_blank", "rel", "noopener", 1, "card-action", 3, "href"], ["aria-hidden", "true", 1, "pi", "pi-directions"], ["type", "button", 1, "card-action", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-map-marker"], [1, "service-admin", "mt-4", "flex", "flex-wrap", "items-end", "gap-3", "border-t", "border-surface", "pt-3"], [1, "flex", "items-center", "gap-2"], ["type", "checkbox", 3, "change", "checked", "disabled"], ["type", "number", "min", "0", 1, "w-20", "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "value", "disabled"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "focus-visible:outline-2", 3, "click", "disabled"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "focus-visible:outline-2"], [1, "location-form", "mt-3", "grid", "gap-3", "rounded", "border", "border-surface", "p-3", 3, "disabled"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", "focus-visible:outline-2", 3, "click"], [1, "px-1", "font-semibold"], [1, "grid", "gap-1"], ["type", "text", "maxlength", "255", "required", "", 1, "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel", "name"], [1, "grid", "grid-cols-2", "gap-3"], ["type", "number", "step", "0.000001", "min", "-90", "max", "90", "required", "", 1, "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "step", "0.000001", "min", "-180", "max", "180", "required", "", 1, "rounded", "border", "border-surface", "bg-transparent", "p-2", 3, "ngModelChange", "ngModel", "name"], [1, "m-0", "text-sm", "text-muted-color"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded", "bg-primary", "px-3", "py-2", "text-primary-contrast", 3, "click"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2"], ["type", "button", 1, "rounded", "px-3", "py-2", 3, "click"], ["type", "button", 1, "rounded", "border", "border-surface", "px-3", "py-2", 3, "click"]], template: function MunicipalServices_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, MunicipalServices_Conditional_0_Template, 2, 0, "p", 3);
      \u0275\u0275elementStart(1, "section", 4)(2, "h1");
      \u0275\u0275text(3, "Services municipaux");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 5);
      \u0275\u0275text(5, "Trouvez le bon interlocuteur, o\xF9 il vous accueille, ses horaires, et comment vous y rendre.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "form", 7)(8, "label", 8);
      \u0275\u0275text(9, "Rechercher par nom, cat\xE9gorie ou adresse");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 9);
      \u0275\u0275listener("ngModelChange", function MunicipalServices_Template_input_ngModelChange_10_listener($event) {
        return ctx.search.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 10);
      \u0275\u0275listener("click", function MunicipalServices_Template_button_click_11_listener() {
        return ctx.locateMe();
      });
      \u0275\u0275element(12, "i", 11);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "p", 12);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, MunicipalServices_Conditional_16_Template, 2, 1, "p", 13);
      \u0275\u0275conditionalCreate(17, MunicipalServices_Conditional_17_Template, 2, 1, "p", 14);
      \u0275\u0275conditionalCreate(18, MunicipalServices_Conditional_18_Template, 5, 2, "section", 15);
      \u0275\u0275elementStart(19, "div", 16);
      \u0275\u0275repeaterCreate(20, MunicipalServices_For_21_Template, 28, 9, "article", 17, _forTrack0, false, MunicipalServices_ForEmpty_22_Template, 2, 0, "p");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275conditional(ctx.loading() ? 0 : -1);
      \u0275\u0275advance(10);
      \u0275\u0275property("ngModel", ctx.search());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.locating());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.locating() ? "Localisation\u2026" : "Services pr\xE8s de moi", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.visibleServices().length, " service(s) trouv\xE9(s).");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_5_0 = ctx.locateMessage()) ? 16 : -1, tmp_5_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_6_0 = ctx.error()) ? 17 : -1, tmp_6_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.locatedServices().length ? 18 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleServices());
    }
  }, dependencies: [CardModule, Card, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm, ServicesMap], styles: ["\n\n.municipal-page[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro[_ngcontent-%COMP%] {\n  color: var(--p-text-muted-color);\n  max-width: 650px;\n}\n.service-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1rem;\n  margin-top: 2rem;\n}\ni[_ngcontent-%COMP%] {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\ndl[_ngcontent-%COMP%] {\n  margin: 1.5rem 0 0;\n}\ndt[_ngcontent-%COMP%] {\n  font-weight: 700;\n  margin-top: 0.75rem;\n}\ndd[_ngcontent-%COMP%] {\n  margin: 0.15rem 0;\n  color: var(--p-text-muted-color);\n}\n.service-card[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n  border-radius: 0.75rem;\n}\n.service-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 0 1px var(--p-primary-color);\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1.25rem;\n  padding-top: 1rem;\n}\n.card-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: var(--p-primary-color);\n  font: inherit;\n  font-weight: 600;\n  border: 0;\n  background: transparent;\n  padding: 0.25rem 0;\n  text-align: left;\n  text-decoration: none;\n  cursor: pointer;\n}\n.card-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 3px;\n  border-radius: 0.25rem;\n}\n.card-action[_ngcontent-%COMP%]:disabled {\n  cursor: progress;\n  opacity: 0.65;\n}\n.distance[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--p-text-color);\n}\n.locate-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 3rem;\n  padding: 0.6rem 1rem;\n  border: 2px solid var(--p-primary-color);\n  border-radius: 0.5rem;\n  color: var(--p-primary-color);\n  background: transparent;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n}\n.locate-button[_ngcontent-%COMP%]:disabled {\n  cursor: progress;\n  opacity: 0.65;\n}\n.service-admin[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 600px) {\n  .service-grid[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=municipal-services.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MunicipalServices, [{
    type: Component,
    args: [{ selector: "app-municipal-services", imports: [CardModule, FormsModule, ServicesMap], template: `@if (loading()) {
    <p role="status">Actualisation des services\u2026</p>
}
<section class="municipal-page">
    <h1>Services municipaux</h1>
    <p class="intro">Trouvez le bon interlocuteur, o\xF9 il vous accueille, ses horaires, et comment vous y rendre.</p>

    <div class="mb-5 flex flex-wrap items-end gap-3">
        <form role="search" aria-label="Rechercher un service municipal" class="min-w-[16rem] flex-1">
            <label for="service-search" class="mb-2 block font-semibold">Rechercher par nom, cat\xE9gorie ou adresse</label>
            <input id="service-search" type="search" class="w-full rounded border border-surface bg-transparent p-3" [ngModel]="search()" (ngModelChange)="search.set($event)" name="service-search" />
        </form>
        <button type="button" class="locate-button" [disabled]="locating()" (click)="locateMe()">
            <i class="pi pi-compass" aria-hidden="true"></i> {{ locating() ? 'Localisation\u2026' : 'Services pr\xE8s de moi' }}
        </button>
    </div>
    <p class="sr-only" aria-live="polite">{{ visibleServices().length }} service(s) trouv\xE9(s).</p>
    @if (locateMessage(); as message) {
        <p role="status" class="mb-4">{{ message }}</p>
    }

    @if (error(); as message) {
        <p role="alert" class="mb-4 text-red-600">{{ message }}</p>
    }

    @if (locatedServices().length) {
        <section #mapSection class="mb-6" aria-labelledby="map-heading">
            <h2 id="map-heading" class="mb-3 text-xl font-semibold">O\xF9 nous trouver</h2>
            <app-services-map [services]="locatedServices()" [position]="position()" />
        </section>
    }

    <div class="service-grid">
        @for (service of visibleServices(); track service.id) {
            <article class="service-card" [attr.aria-labelledby]="'service-' + service.id">
                <p-card>
                    <ng-template #title
                        ><span [id]="'service-' + service.id"><i [class]="'pi ' + service.icon" aria-hidden="true"></i> {{ service.name }}</span></ng-template
                    >
                    <p>{{ service.description }}</p>
                    <dl>
                        <dt>Adresse</dt>
                        <dd>
                            @if (service.address) {
                                {{ service.address }}
                                @if (distance(service); as away) {
                                    <span class="distance">\xB7 \xE0 {{ away }}</span>
                                }
                            } @else {
                                <span class="text-muted-color">Lieu d\u2019accueil non renseign\xE9</span>
                            }
                        </dd>
                        <dt>Horaires</dt>
                        <dd>{{ service.opening_hours }}</dd>
                        <dt>Contact</dt>
                        <dd>{{ service.contact_details }}</dd>
                    </dl>
                    <div class="card-actions">
                        @if (isLocated(service)) {
                            <a class="card-action" [href]="directionsUrl(service)" target="_blank" rel="noopener">
                                <i class="pi pi-directions" aria-hidden="true"></i> Itin\xE9raire<span class="sr-only"> vers {{ service.name }} (nouvel onglet)</span>
                            </a>
                            <button type="button" class="card-action" (click)="showOnMap(service)">
                                <i class="pi pi-map-marker" aria-hidden="true"></i> Voir sur la carte<span class="sr-only"> : {{ service.name }}</span>
                            </button>
                        }
                        <button type="button" class="card-action" [disabled]="openingService() !== null" (click)="startService(service)">
                            Contacter ce service<span class="sr-only"> : {{ service.name }}</span> <i class="pi pi-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>

                    @if (auth.hasRole('manager', 'admin')) {
                        <div class="service-admin mt-4 flex flex-wrap items-end gap-3 border-t border-surface pt-3">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" [checked]="service.is_featured" [disabled]="saving() === service.id" (change)="onFeaturedChange(service, $event)" />
                                <span>Mettre en avant<span class="sr-only"> {{ service.name }}</span></span>
                            </label>
                            <label class="flex items-center gap-2">
                                <span>Ordre<span class="sr-only"> de {{ service.name }}</span></span>
                                <input #orderInput type="number" min="0" class="w-20 rounded border border-surface bg-transparent p-2" [value]="service.display_order" [disabled]="saving() === service.id" />
                            </label>
                            <button type="button" class="rounded border border-surface px-3 py-2 focus-visible:outline-2" [disabled]="saving() === service.id" (click)="updateFeatured(service, service.is_featured, +orderInput.value)">
                                Enregistrer<span class="sr-only"> la mise en avant de {{ service.name }}</span>
                            </button>
                            @if (editingLocation() !== service.id) {
                                <button type="button" class="rounded border border-surface px-3 py-2 focus-visible:outline-2" (click)="editLocation(service)">
                                    Modifier le lieu d\u2019accueil<span class="sr-only"> de {{ service.name }}</span>
                                </button>
                            }
                        </div>
                        @if (editingLocation() === service.id) {
                            <fieldset class="location-form mt-3 grid gap-3 rounded border border-surface p-3" [disabled]="saving() === service.id">
                                <legend class="px-1 font-semibold">Lieu d\u2019accueil de {{ service.name }}</legend>
                                <label class="grid gap-1">
                                    <span>Adresse *</span>
                                    <input type="text" class="rounded border border-surface bg-transparent p-2" maxlength="255" required [(ngModel)]="locationForm.address" [name]="'address-' + service.id" />
                                </label>
                                <div class="grid grid-cols-2 gap-3">
                                    <label class="grid gap-1">
                                        <span>Latitude *</span>
                                        <input type="number" step="0.000001" min="-90" max="90" class="rounded border border-surface bg-transparent p-2" required [(ngModel)]="locationForm.latitude" [name]="'latitude-' + service.id" />
                                    </label>
                                    <label class="grid gap-1">
                                        <span>Longitude *</span>
                                        <input type="number" step="0.000001" min="-180" max="180" class="rounded border border-surface bg-transparent p-2" required [(ngModel)]="locationForm.longitude" [name]="'longitude-' + service.id" />
                                    </label>
                                </div>
                                <p class="m-0 text-sm text-muted-color">Astuce : sur openstreetmap.org, clic droit sur le lieu puis \xAB Afficher l\u2019adresse \xBB donne les coordonn\xE9es.</p>
                                <div class="flex flex-wrap gap-2">
                                    <button type="button" class="rounded bg-primary px-3 py-2 text-primary-contrast" (click)="saveLocation(service)">Enregistrer le lieu</button>
                                    @if (service.address) {
                                        <button type="button" class="rounded border border-surface px-3 py-2" (click)="saveLocation(service, true)">Retirer le lieu</button>
                                    }
                                    <button type="button" class="rounded px-3 py-2" (click)="editingLocation.set(null)">Annuler</button>
                                </div>
                            </fieldset>
                        }
                    }
                </p-card>
            </article>
        } @empty {
            <p>Aucun service ne correspond \xE0 votre recherche.</p>
        }
    </div>
</section>
`, styles: ["/* src/app/municipal/municipal-services.scss */\n.municipal-page {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 1rem;\n}\n.eyebrow {\n  color: var(--p-primary-color);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n.intro {\n  color: var(--p-text-muted-color);\n  max-width: 650px;\n}\n.service-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1rem;\n  margin-top: 2rem;\n}\ni {\n  color: var(--p-primary-color);\n  margin-right: 0.5rem;\n}\ndl {\n  margin: 1.5rem 0 0;\n}\ndt {\n  font-weight: 700;\n  margin-top: 0.75rem;\n}\ndd {\n  margin: 0.15rem 0;\n  color: var(--p-text-muted-color);\n}\n.service-card {\n  position: relative;\n  min-width: 0;\n  border-radius: 0.75rem;\n}\n.service-card:hover {\n  box-shadow: 0 0 0 1px var(--p-primary-color);\n}\n.card-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1.25rem;\n  padding-top: 1rem;\n}\n.card-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: var(--p-primary-color);\n  font: inherit;\n  font-weight: 600;\n  border: 0;\n  background: transparent;\n  padding: 0.25rem 0;\n  text-align: left;\n  text-decoration: none;\n  cursor: pointer;\n}\n.card-action:focus-visible {\n  outline: 2px solid var(--p-primary-color);\n  outline-offset: 3px;\n  border-radius: 0.25rem;\n}\n.card-action:disabled {\n  cursor: progress;\n  opacity: 0.65;\n}\n.distance {\n  font-weight: 600;\n  color: var(--p-text-color);\n}\n.locate-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 3rem;\n  padding: 0.6rem 1rem;\n  border: 2px solid var(--p-primary-color);\n  border-radius: 0.5rem;\n  color: var(--p-primary-color);\n  background: transparent;\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n}\n.locate-button:disabled {\n  cursor: progress;\n  opacity: 0.65;\n}\n.service-admin {\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 600px) {\n  .service-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n/*# sourceMappingURL=municipal-services.css.map */\n"] }]
  }], null, { map: [{ type: ViewChild, args: [forwardRef(() => ServicesMap), { isSignal: true }] }], mapSection: [{ type: ViewChild, args: ["mapSection", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MunicipalServices, { className: "MunicipalServices", filePath: "src/app/municipal/municipal-services.ts", lineNumber: 26 });
})();
export {
  MunicipalServices
};
//# sourceMappingURL=chunk-ZJZAWXE3.js.map
