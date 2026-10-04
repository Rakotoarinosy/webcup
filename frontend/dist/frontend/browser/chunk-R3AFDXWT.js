import {
  AuthService
} from "./chunk-IKQWXVMD.js";
import {
  Injectable,
  Subject,
  effect,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TSUH44O7.js";

// src/app/shared/realtime.service.ts
var RealtimeService = class _RealtimeService {
  auth = inject(AuthService, { optional: true });
  socket = null;
  reconnectTimer = null;
  shouldConnect = false;
  changesSubject = new Subject();
  changes$ = this.changesSubject.asObservable();
  constructor() {
    effect((onCleanup) => {
      const token = this.auth?.accessToken();
      const connected = this.auth?.isAuthenticated() ?? false;
      this.disconnect();
      if (!connected || !token || typeof WebSocket === "undefined")
        return;
      this.shouldConnect = true;
      this.open(token);
      onCleanup(() => this.disconnect());
    });
  }
  open(token) {
    if (!this.shouldConnect || this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING)
      return;
    const url = this.websocketUrl(token);
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => this.handleMessage(event.data);
    this.socket.onclose = () => this.scheduleReconnect(token);
    this.socket.onerror = () => this.socket?.close();
  }
  disconnect() {
    this.shouldConnect = false;
    if (this.reconnectTimer)
      clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    this.socket?.close();
    this.socket = null;
  }
  scheduleReconnect(token) {
    if (!this.shouldConnect || this.reconnectTimer)
      return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.open(token);
    }, 2e3);
  }
  handleMessage(data) {
    if (typeof data !== "string")
      return;
    try {
      const message = JSON.parse(data);
      if (message.type === "data.changed")
        this.changesSubject.next(message);
    } catch {
    }
  }
  websocketUrl(token) {
    const url = environment.realtimeUrl ? new URL(environment.realtimeUrl, window.location.origin) : new URL(environment.apiUrl, window.location.origin);
    if (!environment.realtimeUrl) {
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
      url.pathname = `${url.pathname.replace(/\/$/, "")}/realtime`;
    }
    url.searchParams.set("token", token);
    return url.toString();
  }
  static \u0275fac = function RealtimeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RealtimeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RealtimeService, factory: _RealtimeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RealtimeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  RealtimeService
};
//# sourceMappingURL=chunk-R3AFDXWT.js.map
