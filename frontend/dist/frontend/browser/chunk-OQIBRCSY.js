import{a as Lt}from"./chunk-RGUKNNVQ.js";import{Aa as S,E as ut,Ha as P,J as Et,Ja as T,K as Mt,Ka as h,La as l,M as ct,Ma as At,V as Nt,_ as G,a as Tt,ba as Ft,c as Q,e as j,o as St,pa as bt,w as tt,z as U,za as zt}from"./chunk-D4UDBKZU.js";import{$b as m,Ab as et,Bb as ot,Cb as V,Db as it,Eb as rt,Ec as st,Fb as dt,Gb as W,Hb as X,Hc as s,Ib as vt,Jc as lt,Kb as yt,Lb as kt,Nb as y,Ob as z,Pb as A,Pc as d,Qa as g,Qb as xt,Qc as Pt,Sb as H,Tb as R,U as k,Ub as Ct,V as x,Wb as It,X as _,Yb as Bt,Z as i,Zb as Y,ac as J,bc as K,cb as C,cd as _t,db as I,ea as q,eb as w,fd as wt,gb as D,gd as Dt,ha as gt,hb as b,ib as M,ka as Z,kd as N,la as ht,mc as f,od as L,pa as v,pb as B,pc as at,sa as u,ua as ft,ya as mt,zb as a}from"./chunk-DB5HWNAR.js";var jt=(()=>{class t extends h{autofocus=!1;focused=!1;platformId=i(mt);document=i(gt);host=i(ft);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){L(this.platformId)&&this.autofocus&&setTimeout(()=>{let n=Lt.getFocusableElements(this.host?.nativeElement);n.length===0&&this.host.nativeElement.focus(),n.length>0&&n[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275dir=w({type:t,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[b]})}return t})(),Hn=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=I({type:t});static \u0275inj=x({})}return t})();var Ut=`
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
`;var an=`
    ${Ut}

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
`,sn={root:({instance:t})=>{let r=typeof t.value=="function"?t.value():t.value,n=typeof t.size=="function"?t.size():t.size,o=typeof t.badgeSize=="function"?t.badgeSize():t.badgeSize,e=typeof t.severity=="function"?t.severity():t.severity;return["p-badge p-component",{"p-badge-circle":Ft(r)&&String(r).length===1,"p-badge-dot":G(r),"p-badge-sm":n==="small"||o==="small","p-badge-lg":n==="large"||o==="large","p-badge-xl":n==="xlarge"||o==="xlarge","p-badge-info":e==="info","p-badge-success":e==="success","p-badge-warn":e==="warn","p-badge-danger":e==="danger","p-badge-secondary":e==="secondary","p-badge-contrast":e==="contrast"}]}},Ot=(()=>{class t extends P{name="badge";style=an;classes=sn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var $t=new _("BADGE_INSTANCE");var pt=(()=>{class t extends h{$pcBadge=i($t,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=s();badgeSize=s();size=s();severity=s();value=s();badgeDisabled=s(!1,{transform:d});_componentStyle=i(Ot);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275cmp=C({type:t,selectors:[["p-badge"]],hostVars:5,hostBindings:function(o,e){o&2&&(B("data-p",e.dataP),m(e.cn(e.cx("root"),e.styleClass())),Bt("display",e.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[f([Ot,{provide:$t,useExisting:t},{provide:T,useExisting:t}]),D([l]),b],decls:1,vars:1,template:function(o,e){o&1&&J(0),o&2&&K(e.value())},dependencies:[N,S,At],encapsulation:2,changeDetection:0})}return t})(),Ht=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=I({type:t});static \u0275inj=x({imports:[pt,S,S]})}return t})();var un=["*"],cn={root:"p-fluid"},Rt=(()=>{class t extends P{name="fluid";classes=cn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Qt=new _("FLUID_INSTANCE"),nt=(()=>{class t extends h{$pcFluid=i(Qt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=i(Rt);static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275cmp=C({type:t,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(o,e){o&2&&m(e.cx("root"))},features:[f([Rt,{provide:Qt,useExisting:t},{provide:T,useExisting:t}]),D([l]),b],ngContentSelectors:un,decls:1,vars:0,template:function(o,e){o&1&&(z(),A(0))},dependencies:[N],encapsulation:2,changeDetection:0})}return t})(),ve=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=I({type:t});static \u0275inj=x({imports:[nt]})}return t})();var bn=["*"],pn=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,Gt=(()=>{class t extends P{name="baseicon";css=pn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var qt=(()=>{class t extends h{spin=!1;_componentStyle=i(Gt);getClassNames(){return Tt("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275cmp=C({type:t,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(o,e){o&2&&m(e.getClassNames())},inputs:{spin:[2,"spin","spin",d]},features:[f([Gt]),b],ngContentSelectors:bn,decls:1,vars:0,template:function(o,e){o&1&&(z(),A(0))},encapsulation:2,changeDetection:0})}return t})();var gn=["data-p-icon","spinner"],Zt=(()=>{class t extends qt{pathId;onInit(){this.pathId="url(#"+bt()+")"}static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275cmp=C({type:t,selectors:[["","data-p-icon","spinner"]],features:[b],attrs:gn,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(o,e){o&1&&(q(),it(0,"g"),dt(1,"path",0),rt(),it(2,"defs")(3,"clipPath",1),dt(4,"rect",2),rt()()),o&2&&(B("clip-path",e.pathId),g(3),yt("id",e.pathId))},encapsulation:2})}return t})();var Wt=`
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
`;var hn=`
    ${Wt}

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
`,fn={root:"p-ink"},Xt=(()=>{class t extends P{name="ripple";style=hn;classes=fn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Yt=(()=>{class t extends h{zone=i(ht);_componentStyle=i(Xt);animationListener;mouseDownListener;timeout;constructor(){super(),v(()=>{L(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(n){let o=this.getInk();if(!o||this.document.defaultView?.getComputedStyle(o,null).display==="none")return;if(!this.$unstyled()&&j(o,"p-ink-active"),o.setAttribute("data-p-ink-active","false"),!ut(o)&&!ct(o)){let F=Math.max(St(this.el.nativeElement),Mt(this.el.nativeElement));o.style.height=F+"px",o.style.width=F+"px"}let e=Et(this.el.nativeElement),c=n.pageX-e.left+this.document.body.scrollTop-ct(o)/2,p=n.pageY-e.top+this.document.body.scrollLeft-ut(o)/2;this.renderer.setStyle(o,"top",p+"px"),this.renderer.setStyle(o,"left",c+"px"),!this.$unstyled()&&Q(o,"p-ink-active"),o.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let F=this.getInk();F&&(!this.$unstyled()&&j(F,"p-ink-active"),F.setAttribute("data-p-ink-active","false"))},401)}getInk(){let n=this.el.nativeElement.children;for(let o=0;o<n.length;o++)if(typeof n[o].className=="string"&&n[o].className.indexOf("p-ink")!==-1)return n[o];return null}resetInk(){let n=this.getInk();n&&(!this.$unstyled()&&j(n,"p-ink-active"),n.setAttribute("data-p-ink-active","false"))}onAnimationEnd(n){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&j(n.currentTarget,"p-ink-active"),n.currentTarget.setAttribute("data-p-ink-active","false")}create(){let n=this.renderer.createElement("span");this.renderer.addClass(n,"p-ink"),this.renderer.appendChild(this.el.nativeElement,n),this.renderer.setAttribute(n,"data-p-ink","true"),this.renderer.setAttribute(n,"data-p-ink-active","false"),this.renderer.setAttribute(n,"aria-hidden","true"),this.renderer.setAttribute(n,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(n,"animationend",this.onAnimationEnd.bind(this)))}remove(){let n=this.getInk();n&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Nt(n))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(o){return new(o||t)};static \u0275dir=w({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[f([Xt]),b]})}return t})(),Re=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=I({type:t});static \u0275inj=x({})}return t})();var Jt=`
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
`;var mn=["content"],vn=["loadingicon"],yn=["icon"],kn=["*"],dn=(t,r)=>({class:t,pt:r});function xn(t,r){t&1&&vt(0)}function Cn(t,r){if(t&1&&V(0,"span",7),t&2){let n=y(3);m(n.cn(n.cx("loadingIcon"),"pi-spin",n.loadingIcon||(n.buttonProps==null?null:n.buttonProps.loadingIcon))),a("pBind",n.ptm("loadingIcon")),B("aria-hidden",!0)}}function In(t,r){if(t&1&&(q(),V(0,"svg",8)),t&2){let n=y(3);m(n.cn(n.cx("loadingIcon"),n.cx("spinnerIcon"))),a("pBind",n.ptm("loadingIcon"))("spin",!0),B("aria-hidden",!0)}}function Bn(t,r){if(t&1&&(W(0),M(1,Cn,1,4,"span",3)(2,In,1,5,"svg",6),X()),t&2){let n=y(2);g(),a("ngIf",n.loadingIcon||(n.buttonProps==null?null:n.buttonProps.loadingIcon)),g(),a("ngIf",!(n.loadingIcon||n.buttonProps!=null&&n.buttonProps.loadingIcon))}}function Pn(t,r){}function _n(t,r){if(t&1&&M(0,Pn,0,0,"ng-template",9),t&2){let n=y(2);a("ngIf",n.loadingIconTemplate||n._loadingIconTemplate)}}function wn(t,r){if(t&1&&(W(0),M(1,Bn,3,2,"ng-container",2)(2,_n,1,1,null,5),X()),t&2){let n=y();g(),a("ngIf",!n.loadingIconTemplate&&!n._loadingIconTemplate),g(),a("ngTemplateOutlet",n.loadingIconTemplate||n._loadingIconTemplate)("ngTemplateOutletContext",at(3,dn,n.cx("loadingIcon"),n.ptm("loadingIcon")))}}function Dn(t,r){if(t&1&&V(0,"span",7),t&2){let n=y(2);m(n.cn(n.cx("icon"),n.icon||(n.buttonProps==null?null:n.buttonProps.icon))),a("pBind",n.ptm("icon")),B("data-p",n.dataIconP)}}function Tn(t,r){}function Sn(t,r){if(t&1&&M(0,Tn,0,0,"ng-template",9),t&2){let n=y(2);a("ngIf",!n.icon&&(n.iconTemplate||n._iconTemplate))}}function En(t,r){if(t&1&&(W(0),M(1,Dn,1,4,"span",3)(2,Sn,1,1,null,5),X()),t&2){let n=y();g(),a("ngIf",(n.icon||(n.buttonProps==null?null:n.buttonProps.icon))&&!n.iconTemplate&&!n._iconTemplate),g(),a("ngTemplateOutlet",n.iconTemplate||n._iconTemplate)("ngTemplateOutletContext",at(3,dn,n.cx("icon"),n.ptm("icon")))}}function Mn(t,r){if(t&1&&(et(0,"span",7),J(1),ot()),t&2){let n=y();m(n.cx("label")),a("pBind",n.ptm("label")),B("aria-hidden",(n.icon||(n.buttonProps==null?null:n.buttonProps.icon))&&!(n.label||n.buttonProps!=null&&n.buttonProps.label))("data-p",n.dataLabelP),g(),K(n.label||(n.buttonProps==null?null:n.buttonProps.label))}}function Nn(t,r){if(t&1&&V(0,"p-badge",10),t&2){let n=y();a("value",n.badge||(n.buttonProps==null?null:n.buttonProps.badge))("severity",n.badgeSeverity||(n.buttonProps==null?null:n.buttonProps.badgeSeverity))("pt",n.ptm("pcBadge"))("unstyled",n.unstyled())}}var Fn={root:({instance:t})=>["p-button p-component",{"p-button-icon-only":t.hasIcon&&!t.label&&!t.buttonProps?.label&&!t.badge,"p-button-vertical":(t.iconPos==="top"||t.iconPos==="bottom")&&t.label,"p-button-loading":t.loading||t.buttonProps?.loading,"p-button-link":t.link||t.buttonProps?.link,[`p-button-${t.severity||t.buttonProps?.severity}`]:t.severity||t.buttonProps?.severity,"p-button-raised":t.raised||t.buttonProps?.raised,"p-button-rounded":t.rounded||t.buttonProps?.rounded,"p-button-text":t.text||t.variant==="text"||t.buttonProps?.text||t.buttonProps?.variant==="text","p-button-outlined":t.outlined||t.variant==="outlined"||t.buttonProps?.outlined||t.buttonProps?.variant==="outlined","p-button-sm":t.size==="small"||t.buttonProps?.size==="small","p-button-lg":t.size==="large"||t.buttonProps?.size==="large","p-button-plain":t.plain||t.buttonProps?.plain,"p-button-fluid":t.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:t})=>["p-button-icon",{[`p-button-icon-${t.iconPos||t.buttonProps?.iconPos}`]:t.label||t.buttonProps?.label,"p-button-icon-left":(t.iconPos==="left"||t.buttonProps?.iconPos==="left")&&t.label||t.buttonProps?.label,"p-button-icon-right":(t.iconPos==="right"||t.buttonProps?.iconPos==="right")&&t.label||t.buttonProps?.label,"p-button-icon-top":(t.iconPos==="top"||t.buttonProps?.iconPos==="top")&&t.label||t.buttonProps?.label,"p-button-icon-bottom":(t.iconPos==="bottom"||t.buttonProps?.iconPos==="bottom")&&t.label||t.buttonProps?.label},t.icon,t.buttonProps?.icon],spinnerIcon:({instance:t})=>Object.entries(t.cx("icon")).filter(([,r])=>!!r).reduce((r,[n])=>r+` ${n}`,"p-button-loading-icon"),label:"p-button-label"},$=(()=>{class t extends P{name="button";style=Jt;classes=Fn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Kt=new _("BUTTON_INSTANCE"),tn=new _("BUTTON_DIRECTIVE_INSTANCE"),nn=new _("BUTTON_LABEL_INSTANCE"),en=new _("BUTTON_ICON_INSTANCE"),E={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},on=(()=>{class t extends h{ptButtonLabel=s();pButtonLabelPT=s();pButtonLabelUnstyled=s();$pcButtonLabel=i(nn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});constructor(){super(),v(()=>{let n=this.ptButtonLabel()||this.pButtonLabelPT();n&&this.directivePT.set(n)}),v(()=>{this.pButtonLabelUnstyled()&&this.directiveUnstyled.set(this.pButtonLabelUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||t)};static \u0275dir=w({type:t,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(o,e){o&2&&Y("p-button-label",!e.$unstyled()&&!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"],pButtonLabelPT:[1,"pButtonLabelPT"],pButtonLabelUnstyled:[1,"pButtonLabelUnstyled"]},features:[f([$,{provide:nn,useExisting:t},{provide:T,useExisting:t}]),D([l]),b]})}return t})(),rn=(()=>{class t extends h{ptButtonIcon=s();pButtonIconPT=s();pButtonUnstyled=s();$pcButtonIcon=i(en,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});constructor(){super(),v(()=>{let n=this.ptButtonIcon()||this.pButtonIconPT();n&&this.directivePT.set(n)}),v(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||t)};static \u0275dir=w({type:t,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(o,e){o&2&&Y("p-button-icon",!e.$unstyled()&&!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"],pButtonIconPT:[1,"pButtonIconPT"],pButtonUnstyled:[1,"pButtonUnstyled"]},features:[f([$,{provide:en,useExisting:t},{provide:T,useExisting:t}]),D([l]),b]})}return t})(),vo=(()=>{class t extends h{$pcButtonDirective=i(tn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});_componentStyle=i($);ptButtonDirective=s();pButtonPT=s();pButtonUnstyled=s();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),v(()=>{let n=this.ptButtonDirective()||this.pButtonPT();n&&this.directivePT.set(n)}),v(()=>{this.pButtonUnstyled()&&this.directiveUnstyled.set(this.pButtonUnstyled())}),v(()=>{let n=this.$unstyled();this.initialized&&n&&this.setStyleClass()})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=s(void 0,{transform:d});iconSignal=lt(rn);labelSignal=lt(on);isIconOnly=st(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(E);pcFluid=i(nt,{optional:!0,host:!0,skipSelf:!0});isTextButton=st(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(n){this._label=n,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(n){this._icon=n,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(n){this._loading=n,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(n){this._buttonProps=n,n&&typeof n=="object"&&Object.entries(n).forEach(([o,e])=>this[`_${o}`]!==e&&(this[`_${o}`]=e))}get severity(){return this._severity}set severity(n){this._severity=n,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
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
    </svg>`;onAfterViewInit(){!this.$unstyled()&&Q(this.htmlElement,this.getStyleClass().join(" ")),L(this.platformId)&&(this.createIcon(),this.createLabel(),this.initialized=!0)}getStyleClass(){let n=[E.button,E.component];return this.icon&&!this.label&&G(this.htmlElement.textContent)&&n.push(E.iconOnly),this.loading&&(n.push(E.disabled,E.loading),!this.icon&&this.label&&n.push(E.labelOnly),this.icon&&!this.label&&!G(this.htmlElement.textContent)&&n.push(E.iconOnly)),this.text&&n.push("p-button-text"),this.severity&&n.push(`p-button-${this.severity}`),this.plain&&n.push("p-button-plain"),this.raised&&n.push("p-button-raised"),this.size&&n.push(`p-button-${this.size}`),this.outlined&&n.push("p-button-outlined"),this.rounded&&n.push("p-button-rounded"),this.size==="small"&&n.push("p-button-sm"),this.size==="large"&&n.push("p-button-lg"),this.hasFluid&&n.push("p-button-fluid"),this.$unstyled()?[]:n}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let n=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...n)}removeExistingSeverityClass(){let n=["success","info","warn","danger","help","primary","secondary","contrast"],o=this.htmlElement.classList.value.split(" ").find(e=>n.some(c=>e===`p-button-${c}`));o&&this.htmlElement.classList.remove(o)}createLabel(){if(!U(this.htmlElement,'[data-pc-section="buttonlabel"]')&&this.label){let o=tt("span",{class:this.cx("label"),"p-bind":this.ptm("buttonlabel"),"aria-hidden":this.icon&&!this.label?"true":null});o.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(o)}}createIcon(){if(!U(this.htmlElement,'[data-pc-section="buttonicon"]')&&(this.icon||this.loading)){let o=this.label&&!this.$unstyled()?"p-button-icon-"+this.iconPos:null,e=!this.$unstyled()&&this.getIconClass(),c=tt("span",{class:this.cn(this.cx("icon"),o,e),"aria-hidden":"true","p-bind":this.ptm("buttonicon")});!this.loadingIcon&&this.loading&&(c.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(c,this.htmlElement.firstChild)}}updateLabel(){let n=U(this.htmlElement,'[data-pc-section="buttonlabel"]');if(!this.label){n&&this.htmlElement.removeChild(n);return}n?n.textContent=this.label:this.createLabel()}updateIcon(){let n=U(this.htmlElement,'[data-pc-section="buttonicon"]'),o=U(this.htmlElement,'[data-pc-section="buttonlabel"]');this.loading&&!this.loadingIcon&&n?n.innerHTML=this.spinnerIcon:n?.innerHTML&&(n.innerHTML=""),n&&!this.$unstyled()?this.iconPos?n.className="p-button-icon "+(o?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():n.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(o){return new(o||t)};static \u0275dir=w({type:t,selectors:[["","pButton",""]],contentQueries:function(o,e,c){o&1&&Ct(c,e.iconSignal,rn,5)(c,e.labelSignal,on,5),o&2&&It(2)},hostVars:4,hostBindings:function(o,e){o&2&&Y("p-button-icon-only",!e.$unstyled()&&e.isIconOnly())("p-button-text",!e.$unstyled()&&e.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],pButtonPT:[1,"pButtonPT"],pButtonUnstyled:[1,"pButtonUnstyled"],hostName:"hostName",text:[2,"text","text",d],plain:[2,"plain","plain",d],raised:[2,"raised","raised",d],size:"size",outlined:[2,"outlined","outlined",d],rounded:[2,"rounded","rounded",d],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[f([$,{provide:tn,useExisting:t},{provide:T,useExisting:t}]),D([l]),b]})}return t})(),zn=(()=>{class t extends h{hostName="";$pcButton=i(Kt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(l,{self:!0});_componentStyle=i($);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=s(void 0,{transform:d});onClick=new Z;onFocus=new Z;onBlur=new Z;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=i(nt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(n=>{switch(n.getType()){case"content":this._contentTemplate=n.template;break;case"icon":this._iconTemplate=n.template;break;case"loadingicon":this._loadingIconTemplate=n.template;break;default:this._contentTemplate=n.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=u(t)))(e||t)}})();static \u0275cmp=C({type:t,selectors:[["p-button"]],contentQueries:function(o,e,c){if(o&1&&xt(c,mn,5)(c,vn,5)(c,yn,5)(c,zt,4),o&2){let p;H(p=R())&&(e.contentTemplate=p.first),H(p=R())&&(e.loadingIconTemplate=p.first),H(p=R())&&(e.iconTemplate=p.first),H(p=R())&&(e.templates=p)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",d],raised:[2,"raised","raised",d],rounded:[2,"rounded","rounded",d],text:[2,"text","text",d],plain:[2,"plain","plain",d],outlined:[2,"outlined","outlined",d],link:[2,"link","link",d],tabindex:[2,"tabindex","tabindex",Pt],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",d],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",d],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[f([$,{provide:Kt,useExisting:t},{provide:T,useExisting:t}]),D([l]),b],ngContentSelectors:kn,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(o,e){o&1&&(z(),et(0,"button",0),kt("click",function(p){return e.onClick.emit(p)})("focus",function(p){return e.onFocus.emit(p)})("blur",function(p){return e.onBlur.emit(p)}),A(1),M(2,xn,1,0,"ng-container",1)(3,wn,3,6,"ng-container",2)(4,En,3,6,"ng-container",2)(5,Mn,2,6,"span",3)(6,Nn,1,4,"p-badge",4),ot()),o&2&&(m(e.cn(e.cx("root"),e.styleClass,e.buttonProps==null?null:e.buttonProps.styleClass)),a("ngStyle",e.style||(e.buttonProps==null?null:e.buttonProps.style))("disabled",e.disabled||e.loading||(e.buttonProps==null?null:e.buttonProps.disabled))("pAutoFocus",e.autofocus||(e.buttonProps==null?null:e.buttonProps.autofocus))("pBind",e.ptm("root")),B("type",e.type||(e.buttonProps==null?null:e.buttonProps.type))("aria-label",e.ariaLabel||(e.buttonProps==null?null:e.buttonProps.ariaLabel))("tabindex",e.tabindex||(e.buttonProps==null?null:e.buttonProps.tabindex))("data-p",e.dataP)("data-p-disabled",e.disabled||e.loading||(e.buttonProps==null?null:e.buttonProps.disabled))("data-p-severity",e.severity||(e.buttonProps==null?null:e.buttonProps.severity)),g(2),a("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),g(),a("ngIf",e.loading||(e.buttonProps==null?null:e.buttonProps.loading)),g(),a("ngIf",!(e.loading||e.buttonProps!=null&&e.buttonProps.loading)),g(),a("ngIf",!e.contentTemplate&&!e._contentTemplate&&(e.label||(e.buttonProps==null?null:e.buttonProps.label))),g(),a("ngIf",!e.contentTemplate&&!e._contentTemplate&&(e.badge||(e.buttonProps==null?null:e.buttonProps.badge))))},dependencies:[N,_t,Dt,wt,Yt,jt,Zt,Ht,pt,S,l],encapsulation:2,changeDetection:0})}return t})(),yo=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=I({type:t});static \u0275inj=x({imports:[N,zn,S,S]})}return t})();export{Yt as a,Re as b,pt as c,Ht as d,jt as e,Hn as f,nt as g,ve as h,qt as i,Zt as j,rn as k,vo as l,zn as m,yo as n};
