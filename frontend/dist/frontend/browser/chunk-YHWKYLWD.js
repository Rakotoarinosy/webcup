import{a as ot}from"./chunk-YYPNGWSW.js";import{a as rt,c as at,h as st}from"./chunk-IPDA2CTR.js";import{d as je}from"./chunk-G5UVWIXB.js";import"./chunk-VAALEWS4.js";import{a as ze}from"./chunk-4EM66YZI.js";import{d as Pe,g as Be}from"./chunk-NYNRYIPU.js";import{a as lt,b as pt}from"./chunk-KMC2ZWLI.js";import{a as $e,c as Qe}from"./chunk-7TYMPLYT.js";import{d as Ce}from"./chunk-3CQMVRK6.js";import{i as it,j as nt}from"./chunk-AV3WR633.js";import"./chunk-DKFU476Y.js";import{b as te}from"./chunk-5257HUGG.js";import"./chunk-BU3GAUSR.js";import{A as tt,c as We,f as Ue,j as Ge,m as Ye,q as Je,r as Ze,s as Ke,v as Xe,y as et}from"./chunk-LYEHQONQ.js";import{X as He,ba as Oe,la as xe,ma as Q,sa as W,u as Le,ua as P,va as B,wa as b,xa as q}from"./chunk-LFVTDVFU.js";import{$ as u,$b as m,$c as Fe,Ab as r,Bb as w,Cc as X,Ec as ce,Fc as ue,Gc as ee,Hb as _e,Ib as D,K as Y,Kb as v,Lb as d,Mb as z,Nb as $,Ob as ve,Qb as Z,Rb as K,Sa as s,Sb as ne,Ub as oe,V as L,W as H,X as De,Xa as qe,Xb as be,Yb as Re,Z as V,Zb as M,_b as l,_c as ye,a as R,ac as re,ad as A,cc as Ve,dc as ae,ea as g,eb as T,ec as se,fa as f,fb as Ie,fc as le,ia as Te,ib as N,jb as k,jc as F,ka as we,kb as fe,kc as Ne,kd as Ae,lc as ke,nc as he,qa as _,qb as E,ra as ge,sc as pe,tb as y,ua as S,ub as x,uc as de,vb as J,wb as O,xb as j,yb as c,zb as o,zc as C}from"./chunk-RQ7BZEJF.js";var dt=`
    .p-steplist {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0;
        list-style-type: none;
        overflow-x: auto;
    }

    .p-step {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        gap: dt('stepper.step.gap');
        padding: dt('stepper.step.padding');
    }

    .p-step:last-of-type {
        flex: initial;
    }

    .p-step-header {
        border: 0 none;
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration');
        border-radius: dt('stepper.step.header.border.radius');
        outline-color: transparent;
        background: transparent;
        padding: dt('stepper.step.header.padding');
        gap: dt('stepper.step.header.gap');
    }

    .p-step-header:focus-visible {
        box-shadow: dt('stepper.step.header.focus.ring.shadow');
        outline: dt('stepper.step.header.focus.ring.width') dt('stepper.step.header.focus.ring.style') dt('stepper.step.header.focus.ring.color');
        outline-offset: dt('stepper.step.header.focus.ring.offset');
    }

    .p-stepper.p-stepper-readonly .p-step {
        cursor: auto;
    }

    .p-step-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        color: dt('stepper.step.title.color');
        font-weight: dt('stepper.step.title.font.weight');
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration');
    }

    .p-step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        color: dt('stepper.step.number.color');
        border: 2px solid dt('stepper.step.number.border.color');
        background: dt('stepper.step.number.background');
        min-width: dt('stepper.step.number.size');
        height: dt('stepper.step.number.size');
        line-height: dt('stepper.step.number.size');
        font-size: dt('stepper.step.number.font.size');
        z-index: 1;
        border-radius: dt('stepper.step.number.border.radius');
        position: relative;
        font-weight: dt('stepper.step.number.font.weight');
    }

    .p-step-number::after {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: dt('stepper.step.number.border.radius');
        box-shadow: dt('stepper.step.number.shadow');
    }

    .p-step-active .p-step-header {
        cursor: default;
    }

    .p-step-active .p-step-number {
        background: dt('stepper.step.number.active.background');
        border-color: dt('stepper.step.number.active.border.color');
        color: dt('stepper.step.number.active.color');
    }

    .p-step-active .p-step-title {
        color: dt('stepper.step.title.active.color');
    }

    .p-step:not(.p-disabled):focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: dt('focus.ring.offset');
    }

    .p-step:has(~ .p-step-active) .p-stepper-separator {
        background: dt('stepper.separator.active.background');
    }

    .p-stepper-separator {
        flex: 1 1 0;
        background: dt('stepper.separator.background');
        width: 100%;
        height: dt('stepper.separator.size');
        transition:
            background dt('stepper.transition.duration'),
            color dt('stepper.transition.duration'),
            border-color dt('stepper.transition.duration'),
            box-shadow dt('stepper.transition.duration'),
            outline-color dt('stepper.transition.duration');
    }

    .p-steppanels {
        padding: dt('stepper.steppanels.padding');
    }

    .p-steppanel {
        background: dt('stepper.steppanel.background');
        color: dt('stepper.steppanel.color');
    }

    .p-stepper:has(.p-stepitem) {
        display: flex;
        flex-direction: column;
    }

    .p-stepitem {
        display: flex;
        flex-direction: column;
        flex: initial;
    }

    .p-stepitem.p-stepitem-active {
        flex: 1 1 auto;
    }

    .p-stepitem .p-step {
        flex: initial;
    }
    
    .p-stepitem .p-steppanel {
        display: grid;
        grid-template-rows: 1fr;
    }

    .p-stepitem .p-steppanel-content-wrapper {
        display: flex;
        flex: 1 1 auto;
        min-height: 0;
    }
    .p-stepitem .p-steppanel-content {
        width: 100%;
        padding: dt('stepper.steppanel.padding');
        margin-inline-start: 1rem;
    }

    .p-stepitem .p-stepper-separator {
        flex: 0 0 auto;
        width: dt('stepper.separator.size');
        height: auto;
        margin: dt('stepper.separator.margin');
        position: relative;
        left: calc(-1 * dt('stepper.separator.size'));
    }

    .p-stepitem .p-stepper-separator:dir(rtl) {
        left: calc(-9 * dt('stepper.separator.size'));
    }

    .p-stepitem:has(~ .p-stepitem-active) .p-stepper-separator {
        background: dt('stepper.separator.active.background');
    }

    .p-stepitem:last-of-type .p-steppanel {
        padding-inline-start: dt('stepper.step.number.size');
    }
`;var U=["*"],St=["content"],Et=(t,a,e)=>({activateCallback:t,value:a,active:e});function It(t,a){t&1&&w(0,"p-stepper-separator")}function Rt(t,a){if(t&1){let e=D();o(0,"button",0),v("click",function(){g(e);let i=d();return f(i.onStepClick())}),o(1,"span",1),l(2),r(),o(3,"span",1),$(4),r()(),y(5,It,1,0,"p-stepper-separator")}if(t&2){let e=d();M(e.cx("header")),c("pBind",e.ptm("header"))("tabindex",e.isStepDisabled()?-1:void 0)("disabled",e.isStepDisabled()),E("id",e.id())("role","tab")("aria-controls",e.ariaControls()),s(),M(e.cx("number")),c("pBind",e.ptm("number")),s(),m(e.value()),s(),M(e.cx("title")),c("pBind",e.ptm("title")),s(2),x(e.isSeparatorVisible()?5:-1)}}function Vt(t,a){t&1&&_e(0)}function Nt(t,a){t&1&&w(0,"p-stepper-separator")}function kt(t,a){if(t&1&&(fe(0,Vt,1,0,"ng-container",2),y(1,Nt,1,0,"p-stepper-separator")),t&2){let e=d();c("ngTemplateOutlet",e.content||e._contentTemplate)("ngTemplateOutletContext",he(3,Et,e.onStepClick.bind(e),e.value(),e.active())),s(),x(e.isSeparatorVisible()?1:-1)}}function Ft(t,a){t&1&&w(0,"p-stepper-separator")}function At(t,a){t&1&&_e(0)}var Pt={root:({instance:t})=>["p-stepitem",{"p-stepitem-active":t.isActive()}]},ct=(()=>{class t extends W{name="stepitem";classes=Pt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Bt={root:"p-steplist"},ut=(()=>{class t extends W{name="steplist";classes=Bt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Lt={root:"p-steppanels"},mt=(()=>{class t extends W{name="steppanel";classes=Lt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Ht={root:({instance:t})=>["p-steppanel",{"p-steppanel-active":t.isVertical()&&t.active()}],contentWrapper:"p-steppanel-content-wrapper",content:"p-steppanel-content"},gt=(()=>{class t extends W{name="steppanel";classes=Ht;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var Ot=`
${dt}

.p-steppanel .p-motion {
    display: grid;
    grid-template-rows: 1fr;
}
`,jt={root:({instance:t})=>["p-stepper p-component",{"p-readonly":t.linear()}],separator:"p-stepper-separator"},me=(()=>{class t extends W{name="stepper";style=Ot;classes=jt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var zt={root:({instance:t})=>["p-step",{"p-step-active":t.active(),"p-disabled":t.isStepDisabled()}],header:"p-step-header",number:"p-step-number",title:"p-step-title"},ft=(()=>{class t extends W{name="step";classes=zt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275prov=H({token:t,factory:t.\u0275fac})}return t})();var _t=new V("STEPPER_INSTANCE"),vt=new V("STEPLIST_INSTANCE"),bt=new V("STEPITEM_INSTANCE"),ht=new V("STEP_INSTANCE"),yt=new V("STEPPANEL_INSTANCE"),xt=new V("STEPPANELS_INSTANCE"),Ct=new V("STEPPERSEPARATOR_INSTANCE"),ie=(()=>{class t extends B{$pcStepList=u(vt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});steps=ue(L(()=>I));_componentStyle=u(ut);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-step-list"]],contentQueries:function(n,i,p){n&1&&ne(p,i.steps,I,4),n&2&&oe()},hostVars:2,hostBindings:function(n,i){n&2&&M(i.cx("root"))},features:[F([ut,{provide:vt,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:1,vars:0,template:function(n,i){n&1&&(z(),$(0))},dependencies:[A,q],encapsulation:2,changeDetection:0})}return t})(),Me=(()=>{class t extends B{$pcStepperSeparator=u(Ct,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=u(me);static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-stepper-separator"]],hostVars:2,hostBindings:function(n,i){n&2&&M(i.cx("separator"))},features:[F([me,{provide:Ct,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:1,vars:0,template:function(n,i){n&1&&(z(),$(0))},dependencies:[A,q],encapsulation:2,changeDetection:0})}return t})(),Se=(()=>{class t extends B{$pcStepItem=u(bt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});_componentStyle=u(ct);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}pcStepper=u(L(()=>G));value=ee();isActive=C(()=>this.pcStepper.value()===this.value());step=ce(L(()=>I));stepPanel=ce(L(()=>Ee));constructor(){super(),ge(()=>{this.step().value.set(this.value())}),ge(()=>{this.stepPanel().value.set(this.value())})}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=T({type:t,selectors:[["p-step-item"]],contentQueries:function(n,i,p){n&1&&ne(p,i.step,I,5)(p,i.stepPanel,Ee,5),n&2&&oe(2)},hostVars:3,hostBindings:function(n,i){n&2&&(E("data-p-active",i.isActive()),M(i.cx("root")))},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[F([ct,{provide:bt,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:1,vars:0,template:function(n,i){n&1&&(z(),$(0))},dependencies:[A,q],encapsulation:2,changeDetection:0})}return t})(),I=(()=>{class t extends B{$pcStep=u(ht,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});pcStepper=u(L(()=>G));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=ee();disabled=X(!1,{transform:e=>Ce(e)});active=C(()=>this.pcStepper.isStepActive(this.value()));isStepDisabled=C(()=>!this.active()&&(this.pcStepper.linear()||this.disabled()));id=C(()=>`${this.pcStepper.id()}_step_${this.value()}`);ariaControls=C(()=>`${this.pcStepper.id()}_steppanel_${this.value()}`);isSeparatorVisible=C(()=>{if(this.pcStepper.stepList()){let e=this.pcStepper.stepList().steps(),n=e.indexOf(this),i=e.length;return n!==i-1}else return!1});content;templates;_contentTemplate;_componentStyle=u(ft);onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break}})}onStepClick(){this.pcStepper.updateValue(this.value())}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-step"]],contentQueries:function(n,i,p){if(n&1&&ve(p,St,4)(p,xe,4),n&2){let h;Z(h=K())&&(i.content=h.first),Z(h=K())&&(i.templates=h)}},hostVars:6,hostBindings:function(n,i){n&2&&(E("aria-current",i.active()?"step":void 0)("role","presentation")("data-p-active",i.active())("data-p-disabled",i.isStepDisabled()),M(i.cx("root")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[F([ft,{provide:ht,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:2,vars:1,consts:[["type","button",3,"click","pBind","tabindex","disabled"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&(z(),y(0,Rt,6,16)(1,kt,2,7)),n&2&&x(!i.content&&!i._contentTemplate?0:1)},dependencies:[A,ye,Me,Q,q,b],encapsulation:2,changeDetection:0})}return t})(),Ee=(()=>{class t extends B{$pcStepPanel=u(yt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});pcStepper=u(L(()=>G));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=ee(void 0);active=C(()=>this.pcStepper.value()===this.value());ariaControls=C(()=>`${this.pcStepper.id()}_step_${this.value()}`);id=C(()=>`${this.pcStepper.id()}_steppanel_${this.value()}`);isVertical=C(()=>this.pcStepper.stepItems().length>0);isSeparatorVisible=C(()=>{if(this.pcStepper.stepItems()){let e=this.pcStepper.stepItems().length,n=Le(this.pcStepper.el.nativeElement,'[data-pc-name="steppanel"]');return He(this.el.nativeElement,n)!==e-1}});computedMotionOptions=C(()=>R(R({},this.ptm("motion")),this.pcStepper.computedMotionOptions()));contentTemplate;templates;_contentTemplate;_componentStyle=u(gt);onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break}})}updateValue(e){this.pcStepper.updateValue(e)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-step-panel"]],contentQueries:function(n,i,p){if(n&1&&ve(p,St,5)(p,xe,4),n&2){let h;Z(h=K())&&(i.contentTemplate=h.first),Z(h=K())&&(i.templates=h)}},hostVars:7,hostBindings:function(n,i){n&2&&(E("role","tabpanel")("aria-controls",i.ariaControls())("id",i.id())("data-p-active",i.active())("data-pc-name","steppanel"),M(i.cx("root")))},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[F([gt,{provide:yt,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],decls:5,vars:16,consts:[["name","p-collapsible",3,"visible","disabled","options"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&(o(0,"p-motion",0)(1,"div",1),y(2,Ft,1,0,"p-stepper-separator"),o(3,"div",1),fe(4,At,1,0,"ng-container",2),r()()()),n&2&&(c("visible",i.active())("disabled",!i.isVertical())("options",i.computedMotionOptions()),s(),M(i.cx("contentWrapper")),c("pBind",i.ptm("contentWrapper")),s(),x(i.isSeparatorVisible()?2:-1),s(),M(i.cx("content")),c("pBind",i.ptm("content")),s(),c("ngTemplateOutlet",i.contentTemplate||i._contentTemplate)("ngTemplateOutletContext",he(12,Et,i.updateValue.bind(i),i.value(),i.active())))},dependencies:[A,ye,Me,Q,q,b,Qe,$e],encapsulation:2,changeDetection:0})}return t})(),$t=(()=>{class t extends B{$pcStepPanels=u(xt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});_componentStyle=u(mt);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-step-panels"]],hostVars:2,hostBindings:function(n,i){n&2&&M(i.cx("root"))},features:[F([mt,{provide:xt,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:1,vars:0,template:function(n,i){n&1&&(z(),$(0))},dependencies:[A,Q,q],encapsulation:2,changeDetection:0})}return t})(),G=(()=>{class t extends B{$pcStepper=u(_t,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(b,{self:!0});_componentStyle=u(me);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value=ee(void 0);linear=X(!1,{transform:e=>Ce(e)});transitionOptions=X("400ms cubic-bezier(0.86, 0, 0.07, 1)");motionOptions=X(void 0);computedMotionOptions=C(()=>R(R({},this.ptm("motion")),this.motionOptions()));id=_(Oe("pn_id_"));stepItems=ue(Se);steps=ue(I);stepList=ce(ie);updateValue(e){this.value.set(e)}isStepActive(e){return this.value()===e}static \u0275fac=(()=>{let e;return function(i){return(e||(e=S(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-stepper"]],contentQueries:function(n,i,p){n&1&&ne(p,i.stepItems,Se,4)(p,i.steps,I,4)(p,i.stepList,ie,5),n&2&&oe(3)},hostVars:4,hostBindings:function(n,i){n&2&&(E("role","tablist")("id",i.id()),M(i.cx("root")))},inputs:{value:[1,"value"],linear:[1,"linear"],transitionOptions:[1,"transitionOptions"],motionOptions:[1,"motionOptions"]},outputs:{value:"valueChange"},features:[F([me,{provide:_t,useExisting:t},{provide:P,useExisting:t}]),N([b]),k],ngContentSelectors:U,decls:1,vars:0,template:function(n,i){n&1&&(z(),$(0))},dependencies:[A,Q,q],encapsulation:2,changeDetection:0})}return t})(),Mt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=Ie({type:t});static \u0275inj=De({imports:[G,ie,$t,Ee,Se,I,Me,Q,q,Q,q]})}return t})();var Wt=()=>({width:"min(46rem, 96vw)"}),Ut=t=>["/home/my-requests",t],wt=(t,a)=>a.id;function Gt(t,a){t&1&&(o(0,"p",3),l(1,"Chargement de la demande\u2026"),r())}function Yt(t,a){t&1&&(o(0,"p",4),l(1),r()),t&2&&(s(),m(a))}function Jt(t,a){t&1&&(o(0,"p",3),l(1,"Chargement des \xE9tapes\u2026"),r())}function Zt(t,a){t&1&&(o(0,"p",4),l(1),r()),t&2&&(s(),re("L\u2019historique des \xE9tapes n\u2019a pas pu \xEAtre charg\xE9 : ",a))}function Kt(t,a){if(t&1&&(o(0,"li",9)(1,"h3",10),l(2),r(),o(3,"time",11),l(4),pe(5,"date"),r()()),t&2){let e=a.$implicit,n=d(4);s(2),m(n.eventLabel(e)),s(),E("datetime",e.created_at),s(),m(de(5,3,e.created_at,"dd/MM/yyyy \xE0 HH:mm"))}}function Xt(t,a){if(t&1&&(o(0,"ol",8),O(1,Kt,6,6,"li",9,wt),r()),t&2){let e=d(3);s(),j(e.statusHistory())}}function ei(t,a){t&1&&(o(0,"p"),l(1,"Aucune \xE9tape de traitement n\u2019est encore enregistr\xE9e."),r())}function ti(t,a){if(t&1&&(o(0,"h1",5),l(1),r(),o(2,"p"),l(3),r(),o(4,"dl")(5,"dt"),l(6,"R\xE9f\xE9rence"),r(),o(7,"dd"),l(8),r(),o(9,"dt"),l(10,"Statut actuel"),r(),o(11,"dd")(12,"strong"),l(13),r()(),o(14,"dt"),l(15,"Cr\xE9\xE9e le"),r(),o(16,"dd"),l(17),pe(18,"date"),r(),o(19,"dt"),l(20,"Lieu"),r(),o(21,"dd"),l(22),r()(),o(23,"section",6)(24,"h2",7),l(25,"\xC9tapes de traitement"),r(),y(26,Jt,2,0,"p",3)(27,Zt,2,1,"p",4)(28,Xt,3,0,"ol",8)(29,ei,2,0,"p"),r()),t&2){let e,n=a,i=d(2);s(),m(n.title),s(2),m(n.description),s(5),re("#",n.id.slice(0,8)),s(5),m(n.status),s(4),m(de(18,7,n.created_at,"dd/MM/yyyy \xE0 HH:mm")),s(5),m(n.location),s(4),x(i.historyLoading()?26:(e=i.historyError())?27:i.statusHistory().length?28:29,e)}}function ii(t,a){if(t&1&&(o(0,"section",0)(1,"a",1),w(2,"i",2),l(3," Retour \xE0 mes demandes "),r(),y(4,Gt,2,0,"p",3)(5,Yt,2,1,"p",4)(6,ti,30,10),r()),t&2){let e,n=d();s(4),x(n.loading()?4:(e=n.error())?5:(e=n.selectedRequest())?6:-1,e)}}function ni(t,a){if(t&1&&(o(0,"option",22),l(1),r()),t&2){let e=a.$implicit;c("ngValue",e),s(),m(e)}}function oi(t,a){if(t&1&&(o(0,"option",22),l(1),r()),t&2){let e=a.$implicit;c("ngValue",e),s(),m(e)}}function ri(t,a){t&1&&(o(0,"p",3),l(1,"Chargement de vos demandes\u2026"),r())}function ai(t,a){t&1&&(o(0,"p",4),l(1),r()),t&2&&(s(),m(a))}function si(t,a){if(t&1&&(o(0,"tr",41)(1,"td",54),l(2),pe(3,"date"),r(),o(4,"td",55),l(5),r(),o(6,"th",56)(7,"a",57),l(8),r(),o(9,"p",58),l(10),r()(),o(11,"td",54),l(12),r()()),t&2){let e=a.$implicit;s(2),m(de(3,6,e.created_at,"dd/MM/yyyy HH:mm")),s(3),m(e.category),s(2),c("routerLink",ke(9,Ut,e.id)),s(),m(e.title),s(2),m(e.description),s(2),m(e.status)}}function li(t,a){if(t&1){let e=D();o(0,"button",59),v("click",function(){let i=g(e).$implicit,p=d(3);return f(p.goToPage(i))}),l(1),r()}if(t&2){let e=a.$implicit,n=d(3);be("is-active",e===n.page()),c("disabled",n.loading()),E("aria-current",e===n.page()?"page":null)("aria-label","Page "+e),s(),m(e)}}function pi(t,a){if(t&1){let e=D();o(0,"div",38)(1,"table",39)(2,"caption",40),l(3,"Vos demandes, tri\xE9es par date de cr\xE9ation d\xE9croissante"),r(),o(4,"thead")(5,"tr",41)(6,"th",42),l(7,"Date"),r(),o(8,"th",42),l(9,"Type"),r(),o(10,"th",42),l(11,"Description"),r(),o(12,"th",42),l(13,"Statut"),r()()(),o(14,"tbody"),O(15,si,13,11,"tr",41,wt),r()()(),o(17,"nav",43)(18,"button",44),v("click",function(){g(e);let i=d(2);return f(i.goToPage(1))}),w(19,"i",45),r(),o(20,"button",46),v("click",function(){g(e);let i=d(2);return f(i.pageBy(-1))}),w(21,"i",47),r(),O(22,li,2,6,"button",48,J),o(24,"button",49),v("click",function(){g(e);let i=d(2);return f(i.pageBy(1))}),w(25,"i",50),r(),o(26,"button",51),v("click",function(){g(e);let i=d(2);return f(i.goToPage(i.pages()))}),w(27,"i",52),r(),o(28,"span",53),l(29),r()()}if(t&2){let e=d(2);s(15),j(e.requests()),s(3),c("disabled",e.page()<=1||e.loading()),s(2),c("disabled",e.page()<=1||e.loading()),s(2),j(e.pageNumbers()),s(2),c("disabled",e.page()>=e.pages()||e.loading()),s(2),c("disabled",e.page()>=e.pages()||e.loading()),s(3),Ve("Page ",e.page()," sur ",e.pages()," \xB7 ",e.total()," demande(s)")}}function di(t,a){t&1&&(o(0,"p"),l(1,"Vous n'avez pas encore envoy\xE9 de demande."),r())}function ci(t,a){t&1&&(o(0,"p",28),l(1),r()),t&2&&(s(),m(a))}function ui(t,a){if(t&1){let e=D();o(0,"label",64)(1,"input",65),v("ngModelChange",function(i){g(e);let p=d(3);return f(p.chooseCategory(i))}),r(),o(2,"span",66),l(3),r(),o(4,"span",67),l(5),r()()}if(t&2){let e=a.$implicit,n=d(3);be("border-primary",n.form.category===e)("bg-highlight",n.form.category===e),s(),c("value",e)("ngModel",n.form.category),s(2),m(e),s(2),m(n.categoryHints[e])}}function mi(t,a){if(t&1&&(o(0,"section",29)(1,"h3",60),l(2,"Quel est le probl\xE8me ?"),r(),o(3,"p",61),l(4,"Votre demande sera transmise automatiquement au service comp\xE9tent."),r(),o(5,"div",62),O(6,ui,6,8,"label",63,J),r()()),t&2){let e=d(2);s(5),E("aria-invalid",!!e.createError()&&!e.form.category)("aria-describedby",e.createError()?"create-error":null),s(),j(e.categories)}}function gi(t,a){if(t&1){let e=D();o(0,"section",30)(1,"h3",68),l(2,"D\xE9crivez votre demande"),r(),o(3,"p",69),l(4,"Tous les champs sont obligatoires."),r(),o(5,"div",70)(6,"label",71)(7,"span",19),l(8,"Titre"),r(),o(9,"input",72),le("ngModelChange",function(i){g(e);let p=d(2);return se(p.form.title,i)||(p.form.title=i),f(i)}),r()(),o(10,"label",71)(11,"span",19),l(12,"Description"),r(),o(13,"textarea",73),le("ngModelChange",function(i){g(e);let p=d(2);return se(p.form.description,i)||(p.form.description=i),f(i)}),r()(),o(14,"label",71)(15,"span",19),l(16,"Lieu"),r(),o(17,"input",74),le("ngModelChange",function(i){g(e);let p=d(2);return se(p.form.location,i)||(p.form.location=i),f(i)}),r()()()()}if(t&2){let e=d(2);s(9),ae("ngModel",e.form.title),E("aria-invalid",e.descriptionInvalid("title"))("aria-describedby",e.descriptionInvalid("title")?"create-error":null),s(4),ae("ngModel",e.form.description),E("aria-invalid",e.descriptionInvalid("description"))("aria-describedby",e.descriptionInvalid("description")?"create-error":null),s(4),ae("ngModel",e.form.location),E("aria-invalid",e.descriptionInvalid("location"))("aria-describedby",e.descriptionInvalid("location")?"create-error":null)}}function fi(t,a){if(t&1&&(o(0,"section",31)(1,"h3",75),l(2,"V\xE9rifiez votre demande"),r(),o(3,"dl",76)(4,"dt",77),l(5,"Titre"),r(),o(6,"dd",78),l(7),r(),o(8,"dt",77),l(9,"Type"),r(),o(10,"dd",78),l(11),r(),o(12,"dt",77),l(13,"Description"),r(),o(14,"dd",79),l(15),r(),o(16,"dt",77),l(17,"Lieu"),r(),o(18,"dd",78),l(19),r()(),o(20,"p",80),l(21,"La mairie fixera la priorit\xE9 et confiera votre demande \xE0 un agent du service comp\xE9tent."),r()()),t&2){let e=d(2);s(7),m(e.form.title),s(4),m(e.form.category),s(4),m(e.form.description),s(4),m(e.form.location)}}function _i(t,a){if(t&1){let e=D();o(0,"p-button",81),v("onClick",function(){g(e);let i=d(2);return f(i.previousCreationStep())}),r()}if(t&2){let e=d(2);c("outlined",!0)("disabled",e.submitting())}}function vi(t,a){if(t&1){let e=D();o(0,"p-button",82),v("onClick",function(){g(e);let i=d(2);return f(i.nextCreationStep())}),r()}}function bi(t,a){if(t&1){let e=D();o(0,"p-button",83),v("onClick",function(){g(e);let i=d(2);return f(i.submitCreation())}),r()}if(t&2){let e=d(2);c("loading",e.submitting())}}function hi(t,a){if(t&1){let e=D();o(0,"section",12)(1,"div")(2,"div",13)(3,"div")(4,"h1",14),l(5,"Toutes mes demandes"),r(),o(6,"p",15),l(7,"Recherchez, filtrez et consultez vos signalements."),r()(),o(8,"p-button",16),v("onClick",function(){g(e);let i=d();return f(i.openCreateDialog())}),r()(),o(9,"div",17)(10,"label",18)(11,"span",19),l(12,"Rechercher"),r(),o(13,"input",20),v("ngModelChange",function(i){g(e);let p=d();return f(p.searchChanged(i))}),r()(),o(14,"label")(15,"span",19),l(16,"Type"),r(),o(17,"select",21),v("ngModelChange",function(i){g(e);let p=d();return f(p.categoryChanged(i))}),o(18,"option",22),l(19,"Tous les types"),r(),O(20,ni,2,2,"option",22,J),r()(),o(22,"label")(23,"span",19),l(24,"Statut"),r(),o(25,"select",21),v("ngModelChange",function(i){g(e);let p=d();return f(p.filterChanged(i))}),o(26,"option",22),l(27,"Tous les statuts"),r(),O(28,oi,2,2,"option",22,J),r()()(),y(30,ri,2,0,"p",3)(31,ai,2,1,"p",4)(32,pi,30,7)(33,di,2,0,"p"),r()(),o(34,"p-dialog",23),v("visibleChange",function(i){g(e);let p=d();return f(p.createDialogVisible.set(i))})("onHide",function(){g(e);let i=d();return f(i.closeCreateDialog())}),o(35,"p",24),l(36,"D\xE9crivez votre besoin en trois \xE9tapes. Vous pourrez v\xE9rifier toutes les informations avant l\u2019envoi."),r(),o(37,"p",25),l(38),r(),o(39,"p-stepper",26)(40,"p-step-list")(41,"p-step",27),l(42,"Type"),r(),o(43,"p-step",27),l(44,"Description"),r(),o(45,"p-step",27),l(46,"Validation"),r()()(),y(47,ci,2,1,"p",28),y(48,mi,8,2,"section",29)(49,gi,18,9,"section",30)(50,fi,22,4,"section",31),o(51,"div",32)(52,"p-button",33),v("onClick",function(){g(e);let i=d();return f(i.closeCreateDialog())}),r(),o(53,"div",34),y(54,_i,1,2,"p-button",35),y(55,vi,1,0,"p-button",36)(56,bi,1,1,"p-button",37),r()()()}if(t&2){let e,n,i=d();s(13),c("ngModel",i.searchTerm()),s(4),c("ngModel",i.categoryFilter()),s(),c("ngValue",null),s(2),j(i.categories),s(5),c("ngModel",i.statusFilter()),s(),c("ngValue",null),s(2),j(i.statuses),s(2),x(i.loading()?30:(e=i.error())?31:i.requests().length?32:33,e),s(4),Re(Ne(23,Wt)),c("visible",i.createDialogVisible())("modal",!0)("draggable",!1),s(4),re("\xC9tape ",i.creationStep()," sur 3"),s(),c("value",i.creationStep())("linear",!0),s(2),c("value",1),s(2),c("value",2),s(2),c("value",3),s(2),x((n=i.createError())?47:-1,n),s(),x(i.creationStep()===1?48:i.creationStep()===2?49:50),s(4),c("text",!0)("disabled",i.submitting()),s(2),x(i.creationStep()>1?54:-1),s(),x(i.creationStep()<3?55:56)}}var yi=10,Dt={title:"",description:"",category:null,location:""},xi={"\xC9clairage public":"Lampadaire \xE9teint, \xE9clairage d\xE9faillant",Voirie:"Nid-de-poule, trottoir ab\xEEm\xE9, route inond\xE9e",Eau:"Fuite, coupure, borne-fontaine",D\u00E9chets:"Ordures non ramass\xE9es, d\xE9p\xF4t sauvage",S\u00E9curit\u00E9:"C\xE2ble \xE0 terre, mur dangereux, regard ouvert","Espaces verts":"Jardin public, arbres, aire de jeux",Autre:"Tout autre probl\xE8me"},Tt=class t{requestsApi=u(ot);auth=u(je);route=u(Pe);destroyRef=u(we);injector=u(Te);requests=_([]);total=_(0);page=_(1);pages=_(1);searchTerm=_("");categoryFilter=_(null);statusFilter=_(null);selectedRequest=_(null);statusHistory=_([]);historyLoading=_(!1);historyError=_(null);eventLabel=st;loading=_(!1);error=_(null);detailMode=_(!1);createDialogVisible=_(!1);creationStep=_(1);createError=_(null);submitting=_(!1);descriptionAttempted=_(!1);categories=[...rt];categoryHints=xi;statuses=[...at];form=R({},Dt);ngOnInit(){this.route.paramMap.pipe(ze(this.destroyRef)).subscribe(a=>{let e=a.get("id");this.detailMode.set(e!==null),e?this.loadDetail(e):(this.selectedRequest.set(null),this.load())})}load(a=this.page()){let e={page:a,page_size:yi,sort_by:"created_at",sort_order:"desc"},n=this.statusFilter();n&&(e.status=n);let i=this.categoryFilter();i&&(e.category=i);let p=this.searchTerm().trim();p&&(e.search=p),this.loading.set(!0),this.error.set(null),this.requestsApi.list(e).pipe(Y(()=>this.loading.set(!1))).subscribe({next:h=>{this.requests.set(h.items),this.total.set(h.total),this.page.set(h.page),this.pages.set(Math.max(1,h.total_pages))},error:h=>this.error.set(te(h))})}filterChanged(a){this.statusFilter.set(a),this.load(1)}categoryChanged(a){this.categoryFilter.set(a),this.load(1)}searchChanged(a){this.searchTerm.set(a),this.load(1)}pageBy(a){this.goToPage(this.page()+a)}goToPage(a){a<1||a>this.pages()||a===this.page()||this.loading()||this.load(a)}pageNumbers(){let a=this.pages(),e=Math.max(1,Math.min(this.page()-2,a-4));return Array.from({length:Math.min(5,a)},(n,i)=>e+i)}openCreateDialog(){this.creationStep.set(1),this.createError.set(null),this.descriptionAttempted.set(!1),this.form=R({},Dt),this.createDialogVisible.set(!0)}closeCreateDialog(){this.submitting()||this.createDialogVisible.set(!1)}chooseCategory(a){this.form.category=a,this.createError.set(null)}nextCreationStep(){if(this.creationStep()===1&&!this.form.category){this.createError.set("Choisissez le type de probl\xE8me : il d\xE9termine le service qui traitera votre demande."),this.focusAfterRender('input[name="request-type"]');return}if(this.creationStep()===2&&!this.isDescriptionStepValid()){this.descriptionAttempted.set(!0),this.createError.set("Renseignez le titre, la description et le lieu de la demande."),this.focusAfterRender('[aria-invalid="true"]');return}this.createError.set(null),this.creationStep.update(a=>Math.min(3,a+1)),this.focusStepHeading()}previousCreationStep(){this.createError.set(null),this.creationStep.update(a=>Math.max(1,a-1)),this.focusStepHeading()}descriptionInvalid(a){return this.descriptionAttempted()&&!this.form[a].trim()}focusStepHeading(){let a=["choose-type-title","description-step-title","review-step-title"];this.focusAfterRender("#"+a[this.creationStep()-1])}focusAfterRender(a){qe(()=>document.querySelector(`.p-dialog ${a}`)?.focus(),{injector:this.injector})}submitCreation(){let a=this.form.category;!this.auth.user()||!a||!this.isDescriptionStepValid()||this.submitting()||(this.submitting.set(!0),this.createError.set(null),this.requestsApi.submit({title:this.form.title.trim(),description:this.form.description.trim(),location:this.form.location.trim(),category:a}).pipe(Y(()=>this.submitting.set(!1))).subscribe({next:()=>{this.createDialogVisible.set(!1),this.load(1)},error:e=>this.createError.set(te(e))}))}loadDetail(a){this.loading.set(!0),this.error.set(null),this.statusHistory.set([]),this.historyLoading.set(!0),this.historyError.set(null),this.requestsApi.get(a).pipe(Y(()=>this.loading.set(!1))).subscribe({next:e=>this.selectedRequest.set(e),error:e=>{this.error.set(e instanceof Ae&&e.status===404?"Cette demande est introuvable.":te(e))}}),this.requestsApi.events(a).pipe(Y(()=>this.historyLoading.set(!1))).subscribe({next:e=>this.statusHistory.set(e),error:e=>this.historyError.set(te(e))})}isDescriptionStepValid(){return!!this.form.title.trim()&&!!this.form.description.trim()&&!!this.form.location.trim()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=T({type:t,selectors:[["app-my-requests"]],decls:2,vars:1,consts:[["aria-labelledby","request-detail-title",1,"card"],["routerLink","/home/my-requests",1,"mb-4","inline-flex","items-center","gap-2","text-primary","focus-visible:outline-2","focus-visible:outline-offset-2"],["aria-hidden","true",1,"pi","pi-arrow-left"],["role","status"],["role","alert",1,"text-red-600"],["id","request-detail-title"],["aria-labelledby","request-timeline-title",1,"mt-8"],["id","request-timeline-title",1,"text-lg","font-semibold"],["aria-label","\xC9tapes de votre demande, de la plus ancienne \xE0 la plus r\xE9cente",1,"space-y-4"],[1,"border-l-2","border-primary","pl-4"],[1,"m-0","font-semibold"],[1,"text-sm","text-muted-color"],["aria-labelledby","history-title",1,"card"],[1,"mb-4","flex","flex-wrap","items-center","justify-between","gap-3"],["id","history-title",1,"m-0","text-lg","font-semibold"],[1,"mb-0","mt-1","text-sm","text-muted-color"],["label","Ajouter une demande","icon","pi pi-plus",3,"onClick"],[1,"mb-4","grid","gap-3","md:grid-cols-3"],[1,"md:col-span-1"],[1,"mb-1","block","font-medium"],["id","request-search","type","search","placeholder","Mot-cl\xE9, description, lieu\u2026",1,"w-full","rounded","border","border-surface","bg-transparent","p-2",3,"ngModelChange","ngModel"],[1,"w-full","rounded","border","border-surface","bg-transparent","p-2",3,"ngModelChange","ngModel"],[3,"ngValue"],["header","Nouvelle demande",3,"visibleChange","onHide","visible","modal","draggable"],[1,"mt-0","text-muted-color"],["role","status",1,"sr-only"],["aria-label","\xC9tapes de cr\xE9ation de la demande",3,"value","linear"],[3,"value"],["id","create-error","role","alert",1,"mt-5","rounded-lg","border","border-red-300","bg-red-50","p-3","text-red-700","dark:border-red-800","dark:bg-red-950","dark:text-red-100"],["aria-labelledby","choose-type-title",1,"mt-5"],["aria-labelledby","description-step-title",1,"mt-5"],["aria-labelledby","review-step-title",1,"mt-5"],[1,"mt-7","flex","flex-wrap","justify-between","gap-3"],["label","Annuler","severity","secondary",3,"onClick","text","disabled"],[1,"flex","gap-2"],["label","Retour","severity","secondary",3,"outlined","disabled"],["label","Suivant","icon","pi pi-arrow-right","iconPos","right"],["label","Valider la demande","icon","pi pi-check",3,"loading"],[1,"overflow-x-auto"],[1,"app-data-table"],[1,"sr-only"],[1,"border-b","border-surface"],["scope","col",1,"p-3"],["aria-label","Pagination de mes demandes",1,"app-table-pagination"],["type","button","aria-label","Premi\xE8re page",1,"app-pagination-button",3,"click","disabled"],["aria-hidden","true",1,"pi","pi-angle-double-left"],["type","button","aria-label","Page pr\xE9c\xE9dente",1,"app-pagination-button",3,"click","disabled"],["aria-hidden","true",1,"pi","pi-angle-left"],["type","button",1,"app-pagination-button","app-pagination-page",3,"is-active","disabled"],["type","button","aria-label","Page suivante",1,"app-pagination-button",3,"click","disabled"],["aria-hidden","true",1,"pi","pi-angle-right"],["type","button","aria-label","Derni\xE8re page",1,"app-pagination-button",3,"click","disabled"],["aria-hidden","true",1,"pi","pi-angle-double-right"],["aria-live","polite",1,"sr-only"],[1,"whitespace-nowrap","p-3"],[1,"p-3"],["scope","row",1,"max-w-md","p-3","text-left","font-normal"],[1,"font-medium","text-primary","underline",3,"routerLink"],[1,"mb-0","mt-1","line-clamp-2","text-sm","text-muted-color"],["type","button",1,"app-pagination-button","app-pagination-page",3,"click","disabled"],["id","choose-type-title","tabindex","-1",1,"m-0","text-lg","font-semibold"],[1,"mt-2","text-sm","text-muted-color"],["role","radiogroup","aria-labelledby","choose-type-title","aria-required","true",1,"grid","gap-3","sm:grid-cols-2"],[1,"cursor-pointer","rounded-xl","border","p-4","transition-colors","has-[:focus-visible]:outline-2","has-[:focus-visible]:outline-offset-2","has-[:focus-visible]:outline-primary",3,"border-primary","bg-highlight"],[1,"cursor-pointer","rounded-xl","border","p-4","transition-colors","has-[:focus-visible]:outline-2","has-[:focus-visible]:outline-offset-2","has-[:focus-visible]:outline-primary"],["type","radio","name","request-type",1,"sr-only",3,"ngModelChange","value","ngModel"],[1,"block","font-semibold"],[1,"mt-1","block","text-sm","text-muted-color"],["id","description-step-title","tabindex","-1",1,"m-0","text-lg","font-semibold"],[1,"mb-0","mt-2","text-sm","text-muted-color"],[1,"mt-4","grid","gap-4","md:grid-cols-2"],[1,"md:col-span-2"],["id","request-title","name","request-title","required","","maxlength","255",1,"w-full","rounded","border","border-surface","bg-transparent","p-3",3,"ngModelChange","ngModel"],["id","request-description","name","request-description","required","","maxlength","10000","rows","5",1,"w-full","rounded","border","border-surface","bg-transparent","p-3",3,"ngModelChange","ngModel"],["id","request-location","name","request-location","required","","maxlength","500","autocomplete","street-address",1,"w-full","rounded","border","border-surface","bg-transparent","p-3",3,"ngModelChange","ngModel"],["id","review-step-title","tabindex","-1",1,"m-0","text-lg","font-semibold"],[1,"mt-4","grid","gap-x-6","gap-y-3","rounded-xl","bg-emphasis","p-4","sm:grid-cols-[9rem_1fr]"],[1,"font-medium"],[1,"m-0"],[1,"m-0","whitespace-pre-wrap"],[1,"mb-0","mt-3","text-sm","text-muted-color"],["label","Retour","severity","secondary",3,"onClick","outlined","disabled"],["label","Suivant","icon","pi pi-arrow-right","iconPos","right",3,"onClick"],["label","Valider la demande","icon","pi pi-check",3,"onClick","loading"]],template:function(e,n){e&1&&y(0,ii,7,1,"section",0)(1,hi,57,24),e&2&&x(n.detailMode()?0:1)},dependencies:[tt,Ze,Ke,We,Je,Ye,Ue,Xe,et,Ge,Be,nt,it,pt,lt,Mt,G,ie,I,Fe],encapsulation:2})};export{xi as CATEGORY_HINTS,Tt as MyRequests};
