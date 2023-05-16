(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const c of u.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function r(l){if(l.ep)return;l.ep=!0;const u=n(l);fetch(l.href,u)}})();function y(){}function ot(e){return!!e&&(typeof e=="object"||typeof e=="function")&&typeof e.then=="function"}function Ye(e){return e()}function je(){return Object.create(null)}function x(e){e.forEach(Ye)}function Ge(e){return typeof e=="function"}function be(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ct(e){return Object.keys(e).length===0}function at(e,...t){if(e==null)return y;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function me(e,t,n){e.$$.on_destroy.push(at(t,n))}function Fe(e,t,n){return e.set(n),t}function s(e,t){e.appendChild(t)}function z(e,t,n){e.insertBefore(t,n||null)}function R(e){e.parentNode&&e.parentNode.removeChild(e)}function we(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function _(e){return document.createElement(e)}function P(e){return document.createTextNode(e)}function w(){return P(" ")}function He(){return P("")}function v(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function k(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ut(e){let t;return{p(...n){t=n,t.forEach(r=>e.push(r))},r(){t.forEach(n=>e.splice(e.indexOf(n),1))}}}function it(e){return Array.from(e.childNodes)}function ue(e,t){t=""+t,e.data!==t&&(e.data=t)}function W(e,t,n,r){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}let ie;function D(e){ie=e}function st(){if(!ie)throw new Error("Function called outside component initialization");return ie}function De(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(r=>r.call(this,t))}const le=[],xe=[];let oe=[];const Re=[],ft=Promise.resolve();let $e=!1;function dt(){$e||($e=!0,ft.then(Ee))}function Ce(e){oe.push(e)}const ye=new Set;let ne=0;function Ee(){if(ne!==0)return;const e=ie;do{try{for(;ne<le.length;){const t=le[ne];ne++,D(t),ht(t.$$)}}catch(t){throw le.length=0,ne=0,t}for(D(null),le.length=0,ne=0;xe.length;)xe.pop()();for(let t=0;t<oe.length;t+=1){const n=oe[t];ye.has(n)||(ye.add(n),n())}oe.length=0}while(le.length);for(;Re.length;)Re.pop()();$e=!1,ye.clear(),D(e)}function ht(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Ce)}}function _t(e){const t=[],n=[];oe.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),oe=t}const ge=new Set;let Y;function Ve(){Y={r:0,c:[],p:Y}}function Qe(){Y.r||x(Y.c),Y=Y.p}function ce(e,t){e&&e.i&&(ge.delete(e),e.i(t))}function se(e,t,n,r){if(e&&e.o){if(ge.has(e))return;ge.add(e),Y.c.push(()=>{ge.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function Xe(e,t){const n=t.token={};function r(l,u,c,a){if(t.token!==n)return;t.resolved=a;let i=t.ctx;c!==void 0&&(i=i.slice(),i[c]=a);const o=l&&(t.current=l)(i);let m=!1;t.block&&(t.blocks?t.blocks.forEach((b,g)=>{g!==u&&b&&(Ve(),se(b,1,1,()=>{t.blocks[g]===b&&(t.blocks[g]=null)}),Qe())}):t.block.d(1),o.c(),ce(o,1),o.m(t.mount(),t.anchor),m=!0),t.block=o,t.blocks&&(t.blocks[u]=o),m&&Ee()}if(ot(e)){const l=st();if(e.then(u=>{D(l),r(t.then,1,t.value,u),D(null)},u=>{if(D(l),r(t.catch,2,t.error,u),D(null),!t.hasCatch)throw u}),t.current!==t.pending)return r(t.pending,0),!0}else{if(t.current!==t.then)return r(t.then,1,t.value,e),!0;t.resolved=e}}function mt(e,t,n){const r=t.slice(),{resolved:l}=e;e.current===e.then&&(r[e.value]=l),e.current===e.catch&&(r[e.error]=l),e.block.p(r,n)}function Ze(e){e&&e.c()}function Te(e,t,n,r){const{fragment:l,after_update:u}=e.$$;l&&l.m(t,n),r||Ce(()=>{const c=e.$$.on_mount.map(Ye).filter(Ge);e.$$.on_destroy?e.$$.on_destroy.push(...c):x(c),e.$$.on_mount=[]}),u.forEach(Ce)}function Ne(e,t){const n=e.$$;n.fragment!==null&&(_t(n.after_update),x(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(e,t){e.$$.dirty[0]===-1&&(le.push(e),dt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Oe(e,t,n,r,l,u,c,a=[-1]){const i=ie;D(e);const o=e.$$={fragment:null,ctx:[],props:u,update:y,not_equal:l,bound:je(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(i?i.$$.context:[])),callbacks:je(),dirty:a,skip_bound:!1,root:t.target||i.$$.root};c&&c(o.root);let m=!1;if(o.ctx=n?n(e,t.props||{},(b,g,...$)=>{const p=$.length?$[0]:g;return o.ctx&&l(o.ctx[b],o.ctx[b]=p)&&(!o.skip_bound&&o.bound[b]&&o.bound[b](p),m&&gt(e,b)),g}):[],o.update(),m=!0,x(o.before_update),o.fragment=r?r(o.ctx):!1,t.target){if(t.hydrate){const b=it(t.target);o.fragment&&o.fragment.l(b),b.forEach(R)}else o.fragment&&o.fragment.c();t.intro&&ce(e.$$.fragment),Te(e,t.target,t.anchor,t.customElement),Ee()}D(i)}class Ae{$destroy(){Ne(this,1),this.$destroy=y}$on(t,n){if(!Ge(n))return y;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(t){this.$$set&&!ct(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const re=[];function ve(e,t=y){let n;const r=new Set;function l(a){if(be(e,a)&&(e=a,n)){const i=!re.length;for(const o of r)o[1](),re.push(o,e);if(i){for(let o=0;o<re.length;o+=2)re[o][0](re[o+1]);re.length=0}}}function u(a){l(a(e))}function c(a,i=y){const o=[a,i];return r.add(o),r.size===1&&(n=t(l)||y),a(e),()=>{r.delete(o),r.size===0&&n&&(n(),n=null)}}return{set:l,update:u,subscribe:c}}class Ie{constructor(t,n,r){this.command=t,this.target=n,this.value=r}}var Se=typeof chrome.tabs<"u";const et=ve(),J=ve([]),tt=ve();var pe=function(e){},nt=function(e){},rt=function(){};async function Be(){if(Se)return await chrome.tabs.query({lastFocusedWindow:!1}).then(e=>e);console.log("No Chrome for you")}function lt(e){if(Se){chrome.scripting.executeScript({target:{tabId:e,allFrames:!1},files:["activateListener.js"]}),chrome.scripting.executeScript({target:{tabId:e,allFrames:!1},files:["appianElements.js"]});return}console.log("No Chrome for you")}function pt(){if(Se)return chrome.runtime.onConnect.addListener(function(e){console.log("Connected to port ",e.name);var t=e.name=="find-text-channel",n=e.name=="test-channel",r=e.name=="input-channel",l=e.name=="click-channel",u=e.name=="key-channel",c=e.name=="clear-log-channel";n&&(pe=function(a){a.target==""||a.target==null||a.target==null||e.postMessage(a.target.trim())}),c&&(rt=function(){e.postMessage("a")}),t&&(nt=function(a){e.postMessage(a),e.onMessage.addListener(i=>{tt.set(i)})}),(l||r||u)&&e.onMessage.addListener(function(a){var i=new Ie(a.command,a.target,a.value);J.update(o=>[...o,i]),window.scrollTo(0,document.body.scrollHeight)})}),!0;console.log("No Chrome for you")}function bt(e){const t=new Blob([Le(e)],{type:"application/json"});return URL.createObjectURL(t)}function Le(e){return JSON.stringify(e.map(t=>({command:t.command,target:t.target,value:t.value})))}function Ue(e,t,n){const r=e.slice();return r[31]=t[n],r}function qe(e,t,n){const r=e.slice();return r[34]=t[n],r[35]=t,r[36]=n,r}function Je(e){let t,n,r=e[34].command+"",l,u,c,a,i,o,m,b,g,$,p,O,A;function S(...C){return e[13](e[34],e[35],e[36],...C)}function G(...C){return e[14](e[34],e[35],e[36],...C)}function E(){return e[15](e[36])}function K(){return e[16](e[34])}function j(){return e[17](e[34])}return{c(){t=_("div"),n=_("div"),l=P(r),u=w(),c=_("textarea"),i=w(),o=_("textarea"),b=w(),g=_("button"),g.textContent="X",$=w(),p=_("button"),p.textContent="//",W(c,"width","40%"),c.value=a=e[34].target,W(o,"width","40%"),o.value=m=e[34].value,W(g,"background-color","red"),k(g,"title","DELETE"),W(p,"background-color","green"),k(p,"title","COPY JSON LIST"),k(t,"class","command svelte-1a0x7ga")},m(C,F){z(C,t,F),s(t,n),s(n,l),s(t,u),s(t,c),s(t,i),s(t,o),s(t,b),s(t,g),s(t,$),s(t,p),O||(A=[v(c,"change",S),v(o,"change",G),v(g,"click",E),v(p,"click",K),v(t,"mouseenter",j)],O=!0)},p(C,F){e=C,F[0]&1&&r!==(r=e[34].command+"")&&ue(l,r),F[0]&1&&a!==(a=e[34].target)&&(c.value=a),F[0]&1&&m!==(m=e[34].value)&&(o.value=m)},d(C){C&&R(t),O=!1,x(A)}}}function ze(e){let t,n,r=e[31]+"",l,u,c,a;return u=ut(e[24][0]),{c(){t=_("label"),n=_("input"),l=P(r),k(n,"type","radio"),k(n,"name",e[31]),n.__value=e[31],n.value=n.__value,u.p(n)},m(i,o){z(i,t,o),s(t,n),n.checked=n.__value===e[3].command,s(t,l),c||(a=v(n,"change",e[23]),c=!0)},p(i,o){o[0]&8&&(n.checked=n.__value===i[3].command)},d(i){i&&R(t),u.r(),c=!1,a()}}}function vt(e){let t,n,r,l,u,c,a,i,o,m,b,g,$,p,O,A,S,G,E,K,j,C,F,X,H,fe,V,de,Q,Z,he,B,U,d,M,L,q,_e,ke,Pe,ee=e[0],T=[];for(let f=0;f<ee.length;f+=1)T[f]=Je(qe(e,ee,f));let te=e[11],N=[];for(let f=0;f<te.length;f+=1)N[f]=ze(Ue(e,te,f));return{c(){t=_("div"),n=_("button"),r=P("TAB ID "),l=P(e[5]),u=w();for(let f=0;f<T.length;f+=1)T[f].c();c=w(),a=_("div"),i=_("textarea"),o=w(),m=_("button"),m.textContent="FIND",b=w(),g=_("div"),$=P(e[6]),O=w(),A=_("div"),S=_("textarea"),G=w(),E=_("div");for(let f=0;f<N.length;f+=1)N[f].c();K=w(),j=_("textarea"),F=w(),X=_("textarea"),fe=w(),V=_("button"),V.textContent="INSERT COMMAND",de=w(),Q=_("div"),Z=_("button"),Z.textContent="CLEAR LOGS",he=w(),B=_("div"),U=_("a"),d=_("button"),d.textContent="DOWNLOAD",M=w(),L=_("button"),L.textContent="//",q=w(),_e=_("button"),_e.textContent="BACK TO MAIN MENU",W(i,"width","70%"),k(i,"placeholder","Type the inner text of the element and press FIND"),i.value=e[1],g.hidden=p=e[6]==null,k(a,"class","find-text svelte-1a0x7ga"),W(S,"width","70%"),k(S,"placeholder","Type the xpath and mouse over it to test the element presence"),S.value=e[2],k(A,"class","find-text svelte-1a0x7ga"),k(j,"placeholder","XPath"),j.value=C=e[3].target,k(X,"placeholder","Value"),X.value=H=e[3].value,k(E,"class","find-text svelte-1a0x7ga"),k(Q,"class","download"),k(U,"href",e[4]),k(U,"download","asrt.json"),W(L,"background-color","green"),k(L,"title","COPY JSON LIST"),k(B,"class","download"),k(t,"class","recording svelte-1a0x7ga")},m(f,I){z(f,t,I),s(t,n),s(n,r),s(n,l),s(t,u);for(let h=0;h<T.length;h+=1)T[h]&&T[h].m(t,null);s(t,c),s(t,a),s(a,i),s(a,o),s(a,m),s(a,b),s(a,g),s(g,$),s(t,O),s(t,A),s(A,S),s(t,G),s(t,E);for(let h=0;h<N.length;h+=1)N[h]&&N[h].m(E,null);s(E,K),s(E,j),s(E,F),s(E,X),s(E,fe),s(E,V),s(t,de),s(t,Q),s(Q,Z),s(t,he),s(t,B),s(B,U),s(U,d),s(B,M),s(B,L),s(t,q),s(t,_e),ke||(Pe=[v(n,"click",e[12]),v(i,"change",e[18]),v(m,"click",e[19]),v(g,"mouseenter",e[20]),v(S,"mouseenter",e[21]),v(S,"change",e[22]),v(j,"change",e[25]),v(X,"change",e[26]),v(V,"click",e[27]),v(Z,"click",e[28]),v(L,"click",e[29]),v(_e,"click",e[30])],ke=!0)},p(f,I){if(I[0]&32&&ue(l,f[5]),I[0]&769){ee=f[0];let h;for(h=0;h<ee.length;h+=1){const ae=qe(f,ee,h);T[h]?T[h].p(ae,I):(T[h]=Je(ae),T[h].c(),T[h].m(t,c))}for(;h<T.length;h+=1)T[h].d(1);T.length=ee.length}if(I[0]&2&&(i.value=f[1]),I[0]&64&&ue($,f[6]),I[0]&64&&p!==(p=f[6]==null)&&(g.hidden=p),I[0]&4&&(S.value=f[2]),I[0]&2056){te=f[11];let h;for(h=0;h<te.length;h+=1){const ae=Ue(f,te,h);N[h]?N[h].p(ae,I):(N[h]=ze(ae),N[h].c(),N[h].m(E,K))}for(;h<N.length;h+=1)N[h].d(1);N.length=te.length}I[0]&8&&C!==(C=f[3].target)&&(j.value=C),I[0]&8&&H!==(H=f[3].value)&&(X.value=H),I[0]&16&&k(U,"href",f[4])},i:y,o:y,d(f){f&&R(t),we(T,f),we(N,f),ke=!1,x(Pe)}}}function kt(e,t,n){let r,l,u,c;me(e,J,d=>n(0,l=d)),me(e,et,d=>n(5,u=d)),me(e,tt,d=>n(6,c=d));function a(d){Me.set(d)}function i(d){J.update(M=>M.filter((L,q)=>q!=d))}function o(d,M){J.update(L=>(L[d]=M,L))}function m(d){J.update(M=>[...M,d])}var b=["click","type","key","open"],g="",$="",p=new Ie("","","");const O=[[]],A=()=>{lt(u)},S=(d,M,L,q)=>{Fe(J,M[L].target=q.target.value,l),o(L,d)},G=(d,M,L,q)=>{Fe(J,M[L].value=q.target.value,l),o(L,d)},E=d=>{i(d)},K=d=>{navigator.clipboard.writeText(Le([d]))},j=d=>{pe(d)},C=d=>{n(1,g=d.target.value)},F=()=>{nt(g)},X=()=>{pe({target:c})},H=()=>{pe({target:$})},fe=d=>{n(2,$=d.target.value)};function V(){p.command=this.__value,n(3,p)}const de=d=>{n(3,p.target=d.target.value,p)},Q=d=>{n(3,p.value=d.target.value,p)},Z=()=>{m(p)},he=()=>{rt()},B=()=>{navigator.clipboard.writeText(Le(l))},U=()=>{a(1)};return e.$$.update=()=>{e.$$.dirty[0]&1&&n(4,r=bt(l))},[l,g,$,p,r,u,c,a,i,o,m,b,A,S,G,E,K,j,C,F,X,H,fe,V,O,de,Q,Z,he,B,U]}class yt extends Ae{constructor(t){super(),Oe(this,t,kt,vt,be,{},null,[-1,-1])}}function Ke(e,t,n){const r=e.slice();return r[7]=t[n],r}function wt(e){return{c:y,m:y,p:y,d:y}}function $t(e){let t,n=e[6],r=[];for(let l=0;l<n.length;l+=1)r[l]=We(Ke(e,n,l));return{c(){for(let l=0;l<r.length;l+=1)r[l].c();t=He()},m(l,u){for(let c=0;c<r.length;c+=1)r[c]&&r[c].m(l,u);z(l,t,u)},p(l,u){if(u&5){n=l[6];let c;for(c=0;c<n.length;c+=1){const a=Ke(l,n,c);r[c]?r[c].p(a,u):(r[c]=We(a),r[c].c(),r[c].m(t.parentNode,t))}for(;c<r.length;c+=1)r[c].d(1);r.length=n.length}},d(l){we(r,l),l&&R(t)}}}function We(e){let t,n,r,l=e[7].id+"",u,c,a,i,o=e[7].url+"",m,b,g,$;function p(){return e[5](e[7])}return{c(){t=_("div"),n=_("button"),r=P("ID "),u=P(l),c=w(),a=_("div"),i=P("URL "),m=P(o),b=w(),k(t,"class","tab svelte-1ey5y95")},m(O,A){z(O,t,A),s(t,n),s(n,r),s(n,u),s(t,c),s(t,a),s(a,i),s(a,m),s(t,b),g||($=[v(n,"keydown",e[4]),v(n,"click",p)],g=!0)},p(O,A){e=O,A&1&&l!==(l=e[7].id+"")&&ue(u,l),A&1&&o!==(o=e[7].url+"")&&ue(m,o)},d(O){O&&R(t),g=!1,x($)}}}function Ct(e){let t;return{c(){t=_("div"),t.textContent="Fetching tabs"},m(n,r){z(n,t,r)},p:y,d(n){n&&R(t)}}}function Lt(e){let t,n,r,l,u,c,a={ctx:e,current:null,token:null,hasCatch:!1,pending:Ct,then:$t,catch:wt,value:6};return Xe(l=e[0],a),{c(){t=_("main"),n=_("button"),n.textContent="RELOAD TABS",r=w(),a.block.c(),k(t,"class","svelte-1ey5y95")},m(i,o){z(i,t,o),s(t,n),s(t,r),a.block.m(t,a.anchor=null),a.mount=()=>t,a.anchor=null,u||(c=[v(n,"click",e[1]),v(t,"keydown",e[3])],u=!0)},p(i,[o]){e=i,a.ctx=e,o&1&&l!==(l=e[0])&&Xe(l,a)||mt(a,e,o)},i:y,o:y,d(i){i&&R(t),a.block.d(),a.token=null,a=null,u=!1,x(c)}}}function Et(e,t,n){var r=Be();pt();function l(){n(0,r=Be())}function u(o){var m=new Ie("open","",o);J.set([m])}function c(o){De.call(this,e,o)}function a(o){De.call(this,e,o)}return[r,l,u,c,a,o=>{lt(o.id),u(o.url),Me.set(2),et.set(o.id)}]}class Tt extends Ae{constructor(t){super(),Oe(this,t,Et,Lt,be,{})}}function Nt(e){return{c:y,m:y,i:y,o:y,d:y}}function Ot(e){let t,n;return t=new yt({}),{c(){Ze(t.$$.fragment)},m(r,l){Te(t,r,l),n=!0},i(r){n||(ce(t.$$.fragment,r),n=!0)},o(r){se(t.$$.fragment,r),n=!1},d(r){Ne(t,r)}}}function At(e){let t,n;return t=new Tt({}),{c(){Ze(t.$$.fragment)},m(r,l){Te(t,r,l),n=!0},i(r){n||(ce(t.$$.fragment,r),n=!0)},o(r){se(t.$$.fragment,r),n=!1},d(r){Ne(t,r)}}}function It(e){let t,n,r,l;const u=[At,Ot,Nt],c=[];function a(i,o){return i[0]==1?0:i[0]==2?1:2}return t=a(e),n=c[t]=u[t](e),{c(){n.c(),r=He()},m(i,o){c[t].m(i,o),z(i,r,o),l=!0},p(i,[o]){let m=t;t=a(i),t!==m&&(Ve(),se(c[m],1,1,()=>{c[m]=null}),Qe(),n=c[t],n||(n=c[t]=u[t](i),n.c()),ce(n,1),n.m(r.parentNode,r))},i(i){l||(ce(n),l=!0)},o(i){se(n),l=!1},d(i){c[t].d(i),i&&R(r)}}}function St(e,t,n){let r;return me(e,Me,l=>n(0,r=l)),[r]}class Mt extends Ae{constructor(t){super(),Oe(this,t,St,It,be,{})}}const Me=ve(1);new Mt({target:document.getElementById("app")});
