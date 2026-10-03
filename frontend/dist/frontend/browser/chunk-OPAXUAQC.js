import{a as Se,b as Ee}from"./chunk-YAHHRN5Z.js";import{b as fe,d as xe,e as be,f as ge,i as _e,l as he,m as ye}from"./chunk-JRRBIAQ2.js";import{g as oe}from"./chunk-NYNRYIPU.js";import{a as ce,b as me}from"./chunk-2UIJCGHC.js";import{a as ue,b as ve}from"./chunk-YR6KHRHN.js";import"./chunk-3CQMVRK6.js";import"./chunk-DKFU476Y.js";import"./chunk-5257HUGG.js";import{la as se,ma as N,sa as le,ua as de,va as pe,wa as w}from"./chunk-LFVTDVFU.js";import{$ as _,$b as p,Ab as n,Bb as d,Hb as W,Ib as A,Jc as te,Kb as V,Kc as ne,Lb as c,Ob as X,Qb as q,Rb as L,Sa as r,W as O,Wb as S,X as $,Xb as K,Yb as R,Yc as ie,Z as Q,Zb as b,_b as a,_c as ae,ac as v,ad as re,bc as J,ea as P,eb as D,fa as B,fb as z,ib as U,jb as G,jc as Y,kb as F,kc as I,lc as Z,qb as T,sc as g,tb as f,tc as E,ua as M,ub as x,uc as ee,vb as H,wb as h,xb as y,yb as m,zb as i,zc as C}from"./chunk-RQ7BZEJF.js";var Te=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`;var Be=["content"],Me=t=>({$implicit:t});function Fe(t,s){if(t&1&&(i(0,"div"),a(1),n()),t&2){let e=c(2);S("display",e.value!=null&&e.value!==0?"flex":"none"),r(),J("",e.value,"",e.unit)}}function Ae(t,s){t&1&&W(0)}function Ve(t,s){if(t&1&&(i(0,"div",2)(1,"div",2),F(2,Fe,2,4,"div",3)(3,Ae,1,0,"ng-container",4),n()()),t&2){let e=c();b(e.cn(e.cx("value"),e.valueStyleClass)),S("width",e.value+"%")("display","flex")("background",e.color),m("pBind",e.ptm("value")),T("data-p",e.dataP),r(),b(e.cx("label")),m("pBind",e.ptm("label")),T("data-p",e.dataP),r(),m("ngIf",e.showValue&&!e.contentTemplate&&!e._contentTemplate),r(),m("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",Z(17,Me,e.value))}}function qe(t,s){if(t&1&&d(0,"div",2),t&2){let e=c();b(e.cn(e.cx("value"),e.valueStyleClass)),S("background",e.color),m("pBind",e.ptm("value")),T("data-p",e.dataP)}}var Le={root:({instance:t})=>["p-progressbar p-component",{"p-progressbar-determinate":t.mode=="determinate","p-progressbar-indeterminate":t.mode=="indeterminate"}],value:"p-progressbar-value",label:"p-progressbar-label"},Ce=(()=>{class t extends le{name="progressbar";style=Te;classes=Le;static \u0275fac=(()=>{let e;return function(l){return(e||(e=M(t)))(l||t)}})();static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var we=new Q("PROGRESSBAR_INSTANCE"),j=(()=>{class t extends pe{$pcProgressBar=_(we,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=_(w,{self:!0});value;showValue=!0;styleClass;valueStyleClass;unit="%";mode="determinate";color;contentTemplate;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=_(Ce);templates;_contentTemplate;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;default:this._contentTemplate=e.template}})}get dataP(){return this.cn({determinate:this.mode==="determinate",indeterminate:this.mode==="indeterminate"})}static \u0275fac=(()=>{let e;return function(l){return(e||(e=M(t)))(l||t)}})();static \u0275cmp=D({type:t,selectors:[["p-progressBar"],["p-progressbar"],["p-progress-bar"]],contentQueries:function(o,l,u){if(o&1&&X(u,Be,4)(u,se,4),o&2){let k;q(k=L())&&(l.contentTemplate=k.first),q(k=L())&&(l.templates=k)}},hostAttrs:["role","progressbar"],hostVars:7,hostBindings:function(o,l){o&2&&(T("aria-valuemin",0)("aria-valuenow",l.value)("aria-valuemax",100)("aria-level",l.value+l.unit)("data-p",l.dataP),b(l.cn(l.cx("root"),l.styleClass)))},inputs:{value:[2,"value","value",ne],showValue:[2,"showValue","showValue",te],styleClass:"styleClass",valueStyleClass:"valueStyleClass",unit:"unit",mode:"mode",color:"color"},features:[Y([Ce,{provide:we,useExisting:t},{provide:de,useExisting:t}]),U([w]),G],decls:2,vars:2,consts:[[3,"class","pBind","width","display","background",4,"ngIf"],[3,"class","pBind","background",4,"ngIf"],[3,"pBind"],[3,"display",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(o,l){o&1&&F(0,Ve,4,19,"div",0)(1,qe,1,6,"div",1),o&2&&(m("ngIf",l.mode==="determinate"),r(),m("ngIf",l.mode==="indeterminate"))},dependencies:[re,ie,ae,N,w],encapsulation:2,changeDetection:0})}return t})(),ke=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=z({type:t});static \u0275inj=$({imports:[j,N,N]})}return t})();var je=()=>({height:"8px"}),Oe=()=>({height:"4px"}),$e=()=>[1,2,3,4,5],De=(t,s)=>s.request_code,Ie=(t,s)=>s.value;function Qe(t,s){if(t&1&&(i(0,"span",27),a(1),n()),t&2){let e=c(2);r(),v("\xB7 ",e.elapsedLabel()," \xE9coul\xE9es")}}function ze(t,s){if(t&1&&(i(0,"div",25),d(1,"span",26),a(2),f(3,Qe,2,1,"span",27),n(),i(4,"div",28)(5,"div")(6,"div",29),a(7,"Vague actuelle"),n(),i(8,"div",30),a(9),n()(),i(10,"div")(11,"div",29),a(12,"Demandes disponibles"),n(),i(13,"div",30),a(14),n()(),i(15,"div")(16,"div",29),a(17,"Demandes initiales"),n(),i(18,"div",30),a(19),n()(),i(20,"div")(21,"div",29),a(22,"Demandes des vagues"),n(),i(23,"div",30),a(24),n()()()),t&2){let e=s,o=c();r(),K("bg-green-500",o.store.isActive())("bg-surface-400",!o.store.isActive()),r(),v(" ",o.store.isActive()?"Session active":e.status==="none"?"Aucune session active":"Session "+e.status," "),r(),x(e.elapsed_minutes>0?3:-1),r(6),v("#",e.current_wave),r(5),p(e.visible_requests_count),r(5),p(e.initial_requests_count),r(5),p(e.wave_requests_count)}}function Ue(t,s){t&1&&d(0,"p-skeleton",31)(1,"p-skeleton",32)}function Ge(t,s){if(t&1&&(i(0,"div",33),a(1),n(),i(2,"div",29),a(3,"Prochaine diffusion dans"),n(),i(4,"div",34),a(5),g(6,"countdown"),n()),t&2){let e,o=c();r(),v("Vague #",(e=o.store.session())==null?null:e.next_wave_number),r(4),p(E(6,2,o.store.msUntilNextWave()))}}function He(t,s){if(t&1&&(i(0,"div",33),a(1),n(),i(2,"div",29),a(3,"Diffusion imminente"),n(),i(4,"div",35),a(5,"00:00:00"),n(),d(6,"p-progressbar",36)),t&2){let e,o=c();r(),v("Vague #",(e=o.store.session())==null?null:e.next_wave_number),r(5),R(I(3,Oe))}}function We(t,s){t&1&&(i(0,"div",33),a(1,"Aucune vague planifi\xE9e"),n(),i(2,"div",29),a(3,"Toutes les vagues ont \xE9t\xE9 diffus\xE9es."),n())}function Xe(t,s){t&1&&(i(0,"div",33),a(1,"En attente"),n(),i(2,"div",29),a(3,"Le concours n'a pas encore d\xE9marr\xE9."),n())}function Ke(t,s){t&1&&d(0,"p-skeleton",37)(1,"p-skeleton",38)}function Je(t,s){t&1&&(i(0,"div",8),d(1,"p-skeleton",39),n())}function Ye(t,s){t&1&&h(0,Je,2,0,"div",8,H),t&2&&y(I(0,$e))}function Ze(t,s){if(t&1&&(i(0,"span",45),a(1),n()),t&2){let e=c(2);r(),v("+ ",e.store.stats().validation," en validation")}}function et(t,s){if(t&1&&(i(0,"a",40)(1,"span",29),a(2,"Demandes disponibles"),n(),i(3,"span",41),a(4),n()(),i(5,"a",42)(6,"span",29),a(7,"Nouvelles demandes"),n(),i(8,"span",43),a(9),n()(),i(10,"a",44)(11,"span",29),a(12,"En cours"),n(),i(13,"span",41),a(14),n(),f(15,Ze,2,1,"span",45),n(),i(16,"a",44)(17,"span",29),a(18,"Termin\xE9es"),n(),i(19,"span",41),a(20),n(),i(21,"span",45),a(22),n()(),i(23,"div",46)(24,"span",29),a(25,"XP disponibles"),n(),i(26,"span",41),a(27),g(28,"xp"),n(),i(29,"span",45),a(30),g(31,"xp"),n()()),t&2){let e=c();r(4),p(e.store.stats().total),r(5),p(e.store.stats().fresh),r(5),p(e.store.stats().inProgress),r(),x(e.store.stats().validation?15:-1),r(5),p(e.store.stats().done),r(2),v("",e.store.stats().donePercent," % des demandes"),r(5),p(E(28,8,e.store.stats().xpAvailable)),r(3),v("",E(31,10,e.store.stats().xpDone)," termin\xE9s")}}function tt(t,s){t&1&&(i(0,"a",11),a(1,"Tout voir"),n())}function nt(t,s){if(t&1){let e=A();i(0,"button",47),V("click",function(){let l=P(e).$implicit,u=c();return B(u.store.openDetail(l.request_code))}),d(1,"span",48),i(2,"span",49),a(3),n(),i(4,"span",50),a(5),n(),d(6,"p-tag",51),i(7,"span",52),a(8),g(9,"xp"),n()()}if(t&2){let e=s.$implicit,o=c();r(3),p(e.request_code),r(2),p(e.message_public),r(),m("value",o.difficultyLabel(e.difficulty_level,e.difficulty))("severity",o.difficultySeverity(e.difficulty_level)),r(2),p(ee(9,5,e.xp_total,!0))}}function it(t,s){t&1&&(i(0,"div",13),d(1,"i",53),i(2,"span"),a(3,"Aucune nouvelle demande non lue."),n()())}function at(t,s){if(t&1){let e=A();i(0,"button",47),V("click",function(){let l=P(e).$implicit,u=c();return B(u.store.openDetail(l.request_code))}),i(1,"span",49),a(2),n(),i(3,"span",50),a(4),n(),d(5,"p-tag",51),i(6,"span",52),a(7),g(8,"xp"),n()()}if(t&2){let e=s.$implicit,o=c();r(2),p(e.request_code),r(2),p(e.message_public),r(),m("value",o.statusMeta(e.status).label)("severity",o.statusMeta(e.status).severity),r(2),p(E(8,5,e.xp_total))}}function rt(t,s){t&1&&(i(0,"div",13),d(1,"i",55),i(2,"span"),a(3,"Aucune demande \xE0 traiter."),n()())}function ot(t,s){t&1&&d(0,"p-skeleton",54)}function st(t,s){if(t&1&&f(0,rt,4,0,"div",13)(1,ot,1,0,"p-skeleton",54),t&2){let e=c();x(e.store.loaded()?0:1)}}function lt(t,s){if(t&1&&(i(0,"div",17),d(1,"p-tag",56),i(2,"div",57),d(3,"div",58),n(),i(4,"span",59),a(5),n(),i(6,"span",60),a(7),g(8,"xp"),n()()),t&2){let e=s.$implicit,o=c();r(),m("value",e.label)("severity",o.difficultySeverity(e.value)),r(2),b(o.barColors[e.value]),S("width",e.count/o.maxDifficultyCount()*100,"%"),r(2),p(e.count),r(2),p(E(8,8,e.xp))}}function dt(t,s){if(t&1&&(i(0,"a",21),d(1,"p-tag",61),i(2,"span",41),a(3),n()()),t&2){let e=s.$implicit,o=c();r(),m("value",e.label)("severity",e.severity)("icon",e.icon),r(2),p(o.columnCount(e.value))}}var pt=["","bg-green-500","bg-sky-500","bg-orange-500","bg-red-500"],Ne=class t{store=_(ye);statuses=fe;difficultyLabel=be;difficultySeverity=ge;statusMeta=xe;barColors=pt;freshRequests=C(()=>{let s=this.store.newCodes();return this.store.requests().filter(e=>s.has(e.request_code)).sort((e,o)=>(o.first_seen_at??"").localeCompare(e.first_seen_at??"")||o.xp_total-e.xp_total).slice(0,6)});maxDifficultyCount=C(()=>Math.max(1,...this.store.stats().byDifficulty.map(s=>s.count)));elapsedLabel=C(()=>{let s=this.store.session()?.elapsed_minutes??0;return`${Math.floor(s/60)}h${String(s%60).padStart(2,"0")}`});countdownState=C(()=>{let s=this.store.session();if(!s?.last_sync_success_at)return"unknown";if(s.status==="none")return"inactive";if(s.next_wave_number<=0)return"finished";let e=this.store.msUntilNextWave();return e!==null&&e<=0?"imminent":"running"});columnCount(s){return this.store.requests().filter(e=>e.status===s).length}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=D({type:t,selectors:[["app-terra-nova-dashboard"]],decls:58,vars:12,consts:[[1,"mb-4","grid","grid-cols-1","gap-4","xl:grid-cols-5"],[1,"card","mb-0!","xl:col-span-3"],[1,"mb-4","text-xs","font-semibold","uppercase","tracking-wide","text-muted-color"],[1,"card","mb-0!","flex","flex-col","gap-1","xl:col-span-2"],[1,"mb-3","flex","items-center","justify-between","text-xs","font-semibold","uppercase","tracking-wide","text-muted-color"],["pTooltip","Affichage uniquement : la synchronisation avec l'API a lieu toutes les 30 s, ind\xE9pendamment de ce compte \xE0 rebours.","tooltipPosition","left",1,"pi","pi-info-circle","cursor-help"],[1,"mb-4","grid","grid-cols-2","gap-4","md:grid-cols-3","xl:grid-cols-5"],[1,"mb-4","grid","grid-cols-1","gap-4","xl:grid-cols-2"],[1,"card","mb-0!"],[1,"mb-3","flex","items-center","justify-between"],[1,"text-xs","font-semibold","uppercase","tracking-wide","text-muted-color"],["routerLink","notifications",1,"text-sm","text-primary"],["type","button",1,"flex","w-full","cursor-pointer","items-center","gap-3","rounded-md","border-0","bg-transparent","px-2","py-2.5","text-left","text-color","hover:bg-emphasis"],[1,"flex","flex-col","items-center","gap-2","py-8","text-muted-color"],["routerLink","demandes",1,"text-sm","text-primary"],[1,"grid","grid-cols-1","gap-4","xl:grid-cols-2"],[1,"flex","flex-col","gap-3"],[1,"grid","grid-cols-[5.5rem_1fr_2rem_6rem]","items-center","gap-3"],[1,"mb-4","flex","items-center","justify-between"],["routerLink","pipeline",1,"text-sm","text-primary"],[1,"mb-5","grid","grid-cols-2","gap-3","md:grid-cols-4"],["routerLink","pipeline",1,"flex","flex-col","items-start","gap-2","rounded-lg","border","border-surface","p-3","text-color","no-underline","hover:border-primary"],[1,"mb-1","flex","justify-between","text-sm"],[1,"text-muted-color"],[3,"value","showValue"],[1,"mb-5","flex","items-center","gap-2","font-semibold"],[1,"inline-block","h-2.5","w-2.5","rounded-full"],[1,"font-normal","text-muted-color"],[1,"grid","grid-cols-2","gap-4","md:grid-cols-4"],[1,"text-sm","text-muted-color"],[1,"text-3xl","font-bold"],["height","1.25rem","width","40%","styleClass","mb-4"],["height","3.5rem"],[1,"text-lg","font-semibold"],[1,"font-mono","text-4xl","font-bold","text-primary"],[1,"mb-2","font-mono","text-4xl","font-bold","text-amber-500"],["mode","indeterminate"],["height","1.25rem","width","50%","styleClass","mb-3"],["height","3rem"],["height","3.25rem"],["routerLink","demandes",1,"card","mb-0!","flex","flex-col","gap-1","border","border-transparent","text-color","no-underline","hover:border-primary"],[1,"text-2xl","font-bold"],["routerLink","notifications",1,"card","mb-0!","flex","flex-col","gap-1","border","border-transparent","text-color","no-underline","hover:border-primary"],[1,"text-2xl","font-bold","text-primary"],["routerLink","pipeline",1,"card","mb-0!","flex","flex-col","gap-1","border","border-transparent","text-color","no-underline","hover:border-primary"],[1,"text-xs","text-muted-color"],[1,"card","mb-0!","flex","flex-col","gap-1"],["type","button",1,"flex","w-full","cursor-pointer","items-center","gap-3","rounded-md","border-0","bg-transparent","px-2","py-2.5","text-left","text-color","hover:bg-emphasis",3,"click"],[1,"inline-block","h-2","w-2","shrink-0","rounded-full","bg-primary"],[1,"font-mono","font-semibold"],[1,"line-clamp-2","min-w-0","flex-1","text-sm","text-muted-color"],["styleClass","whitespace-nowrap",3,"value","severity"],[1,"w-20","shrink-0","text-right","font-semibold","whitespace-nowrap"],[1,"pi","pi-check-circle","text-2xl"],["height","12rem"],[1,"pi","pi-inbox","text-2xl"],[3,"value","severity"],[1,"h-2","overflow-hidden","rounded","bg-emphasis"],[1,"h-full","rounded","transition-all"],[1,"text-right","font-semibold"],[1,"text-right","text-sm","text-muted-color"],[3,"value","severity","icon"]],template:function(e,o){if(e&1&&(i(0,"div",0)(1,"div",1)(2,"div",2),a(3,"Session actuelle"),n(),f(4,ze,25,10)(5,Ue,2,0),n(),i(6,"div",3)(7,"div",4),a(8," Prochaine vague "),d(9,"i",5),n(),f(10,Ge,7,4)(11,He,7,4)(12,We,4,0)(13,Xe,4,0)(14,Ke,2,0),n()(),i(15,"div",6),f(16,Ye,2,1)(17,et,32,12),n(),i(18,"div",7)(19,"div",8)(20,"div",9)(21,"span",10),a(22,"Nouvelles demandes"),n(),f(23,tt,2,0,"a",11),n(),h(24,nt,10,8,"button",12,De,!1,it,4,0,"div",13),n(),i(27,"div",8)(28,"div",9)(29,"span",10),a(30,"Priorit\xE9s \xB7 plus forte valeur"),n(),i(31,"a",14),a(32,"Toutes les demandes"),n()(),h(33,at,9,7,"button",12,De,!1,st,2,1),n()(),i(36,"div",15)(37,"div",8)(38,"div",2),a(39,"R\xE9partition par difficult\xE9"),n(),i(40,"div",16),h(41,lt,9,10,"div",17,Ie),n()(),i(43,"div",8)(44,"div",18)(45,"span",10),a(46,"Pipeline"),n(),i(47,"a",19),a(48,"Ouvrir le Kanban"),n()(),i(49,"div",20),h(50,dt,4,4,"a",21,Ie),n(),i(52,"div",22)(53,"span",23),a(54,"Progression"),n(),i(55,"span"),a(56),n()(),d(57,"p-progressbar",24),n()()),e&2){let l,u;r(4),x((l=((l=o.store.session())==null?null:l.last_sync_success_at)&&o.store.session())?4:5,l),r(6),x((u=o.countdownState())==="running"?10:u==="imminent"?11:u==="finished"?12:u==="inactive"?13:14),r(6),x(o.store.loaded()?17:16),r(7),x(o.store.unreadCount()?23:-1),r(),y(o.freshRequests()),r(9),y(o.store.priorities()),r(8),y(o.store.stats().byDifficulty),r(9),y(o.statuses),r(6),v("",o.store.stats().donePercent," %"),r(),R(I(11,je)),m("value",o.store.stats().donePercent)("showValue",!1)}},dependencies:[oe,ke,j,Ee,Se,ve,ue,me,ce,he,_e],encapsulation:2})};export{Ne as TerraNovaDashboard};
