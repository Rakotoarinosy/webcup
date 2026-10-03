import{a as At}from"./chunk-DKFU476Y.js";import{a as Lt}from"./chunk-BU3GAUSR.js";import{A as lt,D as St,E as Et,G as ut,M as Nt,R,T as Mt,ba as ct,c as V,e as A,la as Ft,ma as w,n as wt,s as tt,sa as S,ua as B,v as L,va as h,wa as l,xa as zt}from"./chunk-LFVTDVFU.js";import{$ as i,$b as K,Aa as mt,Ab as et,Bb as O,Cb as ot,Cc as a,Db as it,Eb as rt,Ec as st,Fb as q,Gb as Z,Hb as vt,Jb as yt,Jc as s,Kb as kt,Kc as Pt,Lb as m,Mb as W,Nb as X,Ob as xt,Qb as j,Rb as $,Sa as p,Sb as Ct,Ub as It,W as P,Wb as Bt,X as _,Xb as Y,Yc as _t,Z as x,Zb as k,Zc as Tt,_b as J,_c as Dt,ad as M,eb as T,fb as D,fd as z,ga as Q,gb as C,ib as I,ja as gt,jb as g,jc as v,kb as N,ma as G,mc as dt,na as ht,qb as y,ra as f,ua as b,wa as ft,yb as d,zb as nt,zc as at}from"./chunk-RQ7BZEJF.js";var Ut=(()=>{class n extends h{autofocus=!1;focused=!1;platformId=i(mt);document=i(gt);host=i(ft);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){z(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=At.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275dir=C({type:n,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[g]})}return n})();var Ot=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var rn=`
    ${Ot}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,dn={root:({instance:n})=>{let r=typeof n.value=="function"?n.value():n.value,t=typeof n.size=="function"?n.size():n.size,o=typeof n.badgeSize=="function"?n.badgeSize():n.badgeSize,e=typeof n.severity=="function"?n.severity():n.severity;return["p-badge p-component",{"p-badge-circle":Mt(r)&&String(r).length===1,"p-badge-dot":R(r),"p-badge-sm":t==="small"||o==="small","p-badge-lg":t==="large"||o==="large","p-badge-xl":t==="xlarge"||o==="xlarge","p-badge-info":e==="info","p-badge-success":e==="success","p-badge-warn":e==="warn","p-badge-danger":e==="danger","p-badge-secondary":e==="secondary","p-badge-contrast":e==="contrast"}]}},jt=(()=>{class n extends S{name="badge";style=rn;classes=dn;static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var $t=new x("BADGE_INSTANCE");var bt=(()=>{class n extends h{$pcBadge=i($t,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=a();badgeSize=a();size=a();severity=a();value=a();badgeDisabled=a(!1,{transform:s});_componentStyle=i(jt);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275cmp=T({type:n,selectors:[["p-badge"]],hostVars:5,hostBindings:function(o,e){o&2&&(y("data-p",e.dataP),k(e.cn(e.cx("root"),e.styleClass())),Bt("display",e.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[v([jt,{provide:$t,useExisting:n},{provide:B,useExisting:n}]),I([l]),g],decls:1,vars:1,template:function(o,e){o&1&&J(0),o&2&&K(e.value())},dependencies:[M,w,zt],encapsulation:2,changeDetection:0})}return n})(),Rt=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=D({type:n});static \u0275inj=_({imports:[bt,w,w]})}return n})();var sn=["*"],ln={root:"p-fluid"},Ht=(()=>{class n extends S{name="fluid";classes=ln;static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Qt=new x("FLUID_INSTANCE"),pt=(()=>{class n extends h{$pcFluid=i(Qt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=i(Ht);static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275cmp=T({type:n,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(o,e){o&2&&k(e.cx("root"))},features:[v([Ht,{provide:Qt,useExisting:n},{provide:B,useExisting:n}]),I([l]),g],ngContentSelectors:sn,decls:1,vars:0,template:function(o,e){o&1&&(W(),X(0))},dependencies:[M],encapsulation:2,changeDetection:0})}return n})();var un=["data-p-icon","spinner"],Gt=(()=>{class n extends Lt{pathId;onInit(){this.pathId="url(#"+ct()+")"}static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275cmp=T({type:n,selectors:[["","data-p-icon","spinner"]],features:[g],attrs:un,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(o,e){o&1&&(Q(),ot(0,"g"),rt(1,"path",0),it(),ot(2,"defs")(3,"clipPath",1),rt(4,"rect",2),it()()),o&2&&(y("clip-path",e.pathId),p(3),yt("id",e.pathId))},encapsulation:2})}return n})();var qt=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var cn=`
    ${qt}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,bn={root:"p-ink"},Zt=(()=>{class n extends S{name="ripple";style=cn;classes=bn;static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Wt=(()=>{class n extends h{zone=i(ht);_componentStyle=i(Zt);animationListener;mouseDownListener;timeout;constructor(){super(),f(()=>{z(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let o=this.getInk();if(!o||this.document.defaultView?.getComputedStyle(o,null).display==="none")return;if(!this.$unstyled()&&A(o,"p-ink-active"),o.setAttribute("data-p-ink-active","false"),!lt(o)&&!ut(o)){let F=Math.max(wt(this.el.nativeElement),Et(this.el.nativeElement));o.style.height=F+"px",o.style.width=F+"px"}let e=St(this.el.nativeElement),u=t.pageX-e.left+this.document.body.scrollTop-ut(o)/2,c=t.pageY-e.top+this.document.body.scrollLeft-lt(o)/2;this.renderer.setStyle(o,"top",c+"px"),this.renderer.setStyle(o,"left",u+"px"),!this.$unstyled()&&V(o,"p-ink-active"),o.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let F=this.getInk();F&&(!this.$unstyled()&&A(F,"p-ink-active"),F.setAttribute("data-p-ink-active","false"))},401)}getInk(){let t=this.el.nativeElement.children;for(let o=0;o<t.length;o++)if(typeof t[o].className=="string"&&t[o].className.indexOf("p-ink")!==-1)return t[o];return null}resetInk(){let t=this.getInk();t&&(!this.$unstyled()&&A(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"))}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&A(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"data-p-ink","true"),this.renderer.setAttribute(t,"data-p-ink-active","false"),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Nt(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(o){return new(o||n)};static \u0275dir=C({type:n,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[v([Zt]),g]})}return n})(),De=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=D({type:n});static \u0275inj=_({})}return n})();var Xt=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\0A0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var pn=["content"],gn=["loadingicon"],hn=["icon"],fn=["*"],on=(n,r)=>({class:n,pt:r});function mn(n,r){n&1&&vt(0)}function vn(n,r){if(n&1&&O(0,"span",7),n&2){let t=m(3);k(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon))),d("pBind",t.ptm("loadingIcon")),y("aria-hidden",!0)}}function yn(n,r){if(n&1&&(Q(),O(0,"svg",8)),n&2){let t=m(3);k(t.cn(t.cx("loadingIcon"),t.cx("spinnerIcon"))),d("pBind",t.ptm("loadingIcon"))("spin",!0),y("aria-hidden",!0)}}function kn(n,r){if(n&1&&(q(0),N(1,vn,1,4,"span",3)(2,yn,1,5,"svg",6),Z()),n&2){let t=m(2);p(),d("ngIf",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon)),p(),d("ngIf",!(t.loadingIcon||t.buttonProps!=null&&t.buttonProps.loadingIcon))}}function xn(n,r){}function Cn(n,r){if(n&1&&N(0,xn,0,0,"ng-template",9),n&2){let t=m(2);d("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function In(n,r){if(n&1&&(q(0),N(1,kn,3,2,"ng-container",2)(2,Cn,1,1,null,5),Z()),n&2){let t=m();p(),d("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),p(),d("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",dt(3,on,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function Bn(n,r){if(n&1&&O(0,"span",7),n&2){let t=m(2);k(t.cn(t.cx("icon"),t.icon||(t.buttonProps==null?null:t.buttonProps.icon))),d("pBind",t.ptm("icon")),y("data-p",t.dataIconP)}}function Pn(n,r){}function _n(n,r){if(n&1&&N(0,Pn,0,0,"ng-template",9),n&2){let t=m(2);d("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function Tn(n,r){if(n&1&&(q(0),N(1,Bn,1,4,"span",3)(2,_n,1,1,null,5),Z()),n&2){let t=m();p(),d("ngIf",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!t.iconTemplate&&!t._iconTemplate),p(),d("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",dt(3,on,t.cx("icon"),t.ptm("icon")))}}function Dn(n,r){if(n&1&&(nt(0,"span",7),J(1),et()),n&2){let t=m();k(t.cx("label")),d("pBind",t.ptm("label")),y("aria-hidden",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!(t.label||t.buttonProps!=null&&t.buttonProps.label))("data-p",t.dataLabelP),p(),K(t.label||(t.buttonProps==null?null:t.buttonProps.label))}}function wn(n,r){if(n&1&&O(0,"p-badge",10),n&2){let t=m();d("value",t.badge||(t.buttonProps==null?null:t.buttonProps.badge))("severity",t.badgeSeverity||(t.buttonProps==null?null:t.buttonProps.badgeSeverity))("pt",t.ptm("pcBadge"))("unstyled",t.unstyled())}}var Sn={root:({instance:n})=>["p-button p-component",{"p-button-icon-only":n.hasIcon&&!n.label&&!n.buttonProps?.label&&!n.badge,"p-button-vertical":(n.iconPos==="top"||n.iconPos==="bottom")&&n.label,"p-button-loading":n.loading||n.buttonProps?.loading,"p-button-link":n.link||n.buttonProps?.link,[`p-button-${n.severity||n.buttonProps?.severity}`]:n.severity||n.buttonProps?.severity,"p-button-raised":n.raised||n.buttonProps?.raised,"p-button-rounded":n.rounded||n.buttonProps?.rounded,"p-button-text":n.text||n.variant==="text"||n.buttonProps?.text||n.buttonProps?.variant==="text","p-button-outlined":n.outlined||n.variant==="outlined"||n.buttonProps?.outlined||n.buttonProps?.variant==="outlined","p-button-sm":n.size==="small"||n.buttonProps?.size==="small","p-button-lg":n.size==="large"||n.buttonProps?.size==="large","p-button-plain":n.plain||n.buttonProps?.plain,"p-button-fluid":n.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:n})=>["p-button-icon",{[`p-button-icon-${n.iconPos||n.buttonProps?.iconPos}`]:n.label||n.buttonProps?.label,"p-button-icon-left":(n.iconPos==="left"||n.buttonProps?.iconPos==="left")&&n.label||n.buttonProps?.label,"p-button-icon-right":(n.iconPos==="right"||n.buttonProps?.iconPos==="right")&&n.label||n.buttonProps?.label,"p-button-icon-top":(n.iconPos==="top"||n.buttonProps?.iconPos==="top")&&n.label||n.buttonProps?.label,"p-button-icon-bottom":(n.iconPos==="bottom"||n.buttonProps?.iconPos==="bottom")&&n.label||n.buttonProps?.label},n.icon,n.buttonProps?.icon],spinnerIcon:({instance:n})=>Object.entries(n.cx("icon")).filter(([,r])=>!!r).reduce((r,[t])=>r+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},U=(()=>{class n extends S{name="button";style=Xt;classes=Sn;static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275prov=P({token:n,factory:n.\u0275fac})}return n})();var Yt=new x("BUTTON_INSTANCE"),Jt=new x("BUTTON_DIRECTIVE_INSTANCE"),Kt=new x("BUTTON_LABEL_INSTANCE"),tn=new x("BUTTON_ICON_INSTANCE"),E={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},nn=(()=>{class n extends h{ptButtonLabel=a();pButtonLabelPT=a();pButtonLabelUnstyled=a();$pcButtonLabel=i(Kt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});constructor(){super(),f(()=>{let t=this.ptButtonLabel()||this.pButtonLabelPT();t&&this.directivePT.set(t)}),f(()=>{this.pButtonLabelUnstyled()&&this.directiveUnstyled.set(this.pButtonLabelUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||n)};static \u0275dir=C({type:n,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(o,e){o&2&&Y("p-button-label",!e.$unstyled()&&!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"],pButtonLabelPT:[1,"pButtonLabelPT"],pButtonLabelUnstyled:[1,"pButtonLabelUnstyled"]},features:[v([U,{provide:Kt,useExisting:n},{provide:B,useExisting:n}]),I([l]),g]})}return n})(),en=(()=>{class n extends h{ptButtonIcon=a();pButtonIconPT=a();pButtonUnstyled=a();$pcButtonIcon=i(tn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});constructor(){super(),f(()=>{let t=this.ptButtonIcon()||this.pButtonIconPT();t&&this.directivePT.set(t)}),f(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||n)};static \u0275dir=C({type:n,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(o,e){o&2&&Y("p-button-icon",!e.$unstyled()&&!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"],pButtonIconPT:[1,"pButtonIconPT"],pButtonUnstyled:[1,"pButtonUnstyled"]},features:[v([U,{provide:tn,useExisting:n},{provide:B,useExisting:n}]),I([l]),g]})}return n})(),no=(()=>{class n extends h{$pcButtonDirective=i(Jt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});_componentStyle=i(U);ptButtonDirective=a();pButtonPT=a();pButtonUnstyled=a();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),f(()=>{let t=this.ptButtonDirective()||this.pButtonPT();t&&this.directivePT.set(t)}),f(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())}),f(()=>{let t=this.$unstyled();this.initialized&&t&&this.setStyleClass()})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=a(void 0,{transform:s});iconSignal=st(en);labelSignal=st(nn);isIconOnly=at(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(E);pcFluid=i(pt,{optional:!0,host:!0,skipSelf:!0});isTextButton=at(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(t){this._label=t,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(t){this._icon=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(t){this._loading=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([o,e])=>this[`_${o}`]!==e&&(this[`_${o}`]=e))}get severity(){return this._severity}set severity(t){this._severity=t,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;onAfterViewInit(){!this.$unstyled()&&V(this.htmlElement,this.getStyleClass().join(" ")),z(this.platformId)&&(this.createIcon(),this.createLabel(),this.initialized=!0)}getStyleClass(){let t=[E.button,E.component];return this.icon&&!this.label&&R(this.htmlElement.textContent)&&t.push(E.iconOnly),this.loading&&(t.push(E.disabled,E.loading),!this.icon&&this.label&&t.push(E.labelOnly),this.icon&&!this.label&&!R(this.htmlElement.textContent)&&t.push(E.iconOnly)),this.text&&t.push("p-button-text"),this.severity&&t.push(`p-button-${this.severity}`),this.plain&&t.push("p-button-plain"),this.raised&&t.push("p-button-raised"),this.size&&t.push(`p-button-${this.size}`),this.outlined&&t.push("p-button-outlined"),this.rounded&&t.push("p-button-rounded"),this.size==="small"&&t.push("p-button-sm"),this.size==="large"&&t.push("p-button-lg"),this.hasFluid&&t.push("p-button-fluid"),this.$unstyled()?[]:t}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let t=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...t)}removeExistingSeverityClass(){let t=["success","info","warn","danger","help","primary","secondary","contrast"],o=this.htmlElement.classList.value.split(" ").find(e=>t.some(u=>e===`p-button-${u}`));o&&this.htmlElement.classList.remove(o)}createLabel(){if(!L(this.htmlElement,'[data-pc-section="buttonlabel"]')&&this.label){let o=tt("span",{class:this.cx("label"),"p-bind":this.ptm("buttonlabel"),"aria-hidden":this.icon&&!this.label?"true":null});o.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(o)}}createIcon(){if(!L(this.htmlElement,'[data-pc-section="buttonicon"]')&&(this.icon||this.loading)){let o=this.label&&!this.$unstyled()?"p-button-icon-"+this.iconPos:null,e=!this.$unstyled()&&this.getIconClass(),u=tt("span",{class:this.cn(this.cx("icon"),o,e),"aria-hidden":"true","p-bind":this.ptm("buttonicon")});!this.loadingIcon&&this.loading&&(u.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(u,this.htmlElement.firstChild)}}updateLabel(){let t=L(this.htmlElement,'[data-pc-section="buttonlabel"]');if(!this.label){t&&this.htmlElement.removeChild(t);return}t?t.textContent=this.label:this.createLabel()}updateIcon(){let t=L(this.htmlElement,'[data-pc-section="buttonicon"]'),o=L(this.htmlElement,'[data-pc-section="buttonlabel"]');this.loading&&!this.loadingIcon&&t?t.innerHTML=this.spinnerIcon:t?.innerHTML&&(t.innerHTML=""),t&&!this.$unstyled()?this.iconPos?t.className="p-button-icon "+(o?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():t.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(o){return new(o||n)};static \u0275dir=C({type:n,selectors:[["","pButton",""]],contentQueries:function(o,e,u){o&1&&Ct(u,e.iconSignal,en,5)(u,e.labelSignal,nn,5),o&2&&It(2)},hostVars:4,hostBindings:function(o,e){o&2&&Y("p-button-icon-only",!e.$unstyled()&&e.isIconOnly())("p-button-text",!e.$unstyled()&&e.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],pButtonPT:[1,"pButtonPT"],pButtonUnstyled:[1,"pButtonUnstyled"],hostName:"hostName",text:[2,"text","text",s],plain:[2,"plain","plain",s],raised:[2,"raised","raised",s],size:"size",outlined:[2,"outlined","outlined",s],rounded:[2,"rounded","rounded",s],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[v([U,{provide:Jt,useExisting:n},{provide:B,useExisting:n}]),I([l]),g]})}return n})(),En=(()=>{class n extends h{hostName="";$pcButton=i(Yt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});_componentStyle=i(U);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=a(void 0,{transform:s});onClick=new G;onFocus=new G;onBlur=new G;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=i(pt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let t;return function(e){return(t||(t=b(n)))(e||n)}})();static \u0275cmp=T({type:n,selectors:[["p-button"]],contentQueries:function(o,e,u){if(o&1&&xt(u,pn,5)(u,gn,5)(u,hn,5)(u,Ft,4),o&2){let c;j(c=$())&&(e.contentTemplate=c.first),j(c=$())&&(e.loadingIconTemplate=c.first),j(c=$())&&(e.iconTemplate=c.first),j(c=$())&&(e.templates=c)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",s],raised:[2,"raised","raised",s],rounded:[2,"rounded","rounded",s],text:[2,"text","text",s],plain:[2,"plain","plain",s],outlined:[2,"outlined","outlined",s],link:[2,"link","link",s],tabindex:[2,"tabindex","tabindex",Pt],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",s],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",s],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[v([U,{provide:Yt,useExisting:n},{provide:B,useExisting:n}]),I([l]),g],ngContentSelectors:fn,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(o,e){o&1&&(W(),nt(0,"button",0),kt("click",function(c){return e.onClick.emit(c)})("focus",function(c){return e.onFocus.emit(c)})("blur",function(c){return e.onBlur.emit(c)}),X(1),N(2,mn,1,0,"ng-container",1)(3,In,3,6,"ng-container",2)(4,Tn,3,6,"ng-container",2)(5,Dn,2,6,"span",3)(6,wn,1,4,"p-badge",4),et()),o&2&&(k(e.cn(e.cx("root"),e.styleClass,e.buttonProps==null?null:e.buttonProps.styleClass)),d("ngStyle",e.style||(e.buttonProps==null?null:e.buttonProps.style))("disabled",e.disabled||e.loading||(e.buttonProps==null?null:e.buttonProps.disabled))("pAutoFocus",e.autofocus||(e.buttonProps==null?null:e.buttonProps.autofocus))("pBind",e.ptm("root")),y("type",e.type||(e.buttonProps==null?null:e.buttonProps.type))("aria-label",e.ariaLabel||(e.buttonProps==null?null:e.buttonProps.ariaLabel))("tabindex",e.tabindex||(e.buttonProps==null?null:e.buttonProps.tabindex))("data-p",e.dataP)("data-p-disabled",e.disabled||e.loading||(e.buttonProps==null?null:e.buttonProps.disabled))("data-p-severity",e.severity||(e.buttonProps==null?null:e.buttonProps.severity)),p(2),d("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),p(),d("ngIf",e.loading||(e.buttonProps==null?null:e.buttonProps.loading)),p(),d("ngIf",!(e.loading||e.buttonProps!=null&&e.buttonProps.loading)),p(),d("ngIf",!e.contentTemplate&&!e._contentTemplate&&(e.label||(e.buttonProps==null?null:e.buttonProps.label))),p(),d("ngIf",!e.contentTemplate&&!e._contentTemplate&&(e.badge||(e.buttonProps==null?null:e.buttonProps.badge))))},dependencies:[M,_t,Dt,Tt,Wt,Ut,Gt,Rt,bt,w,l],encapsulation:2,changeDetection:0})}return n})(),eo=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=D({type:n});static \u0275inj=_({imports:[M,En,w,w]})}return n})();export{Wt as a,De as b,bt as c,Rt as d,Ut as e,pt as f,Gt as g,no as h,En as i,eo as j};
