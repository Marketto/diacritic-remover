/**
 * @marketto/diacritic-remover 1.0.3
 * Copyright (c) 2019, Marco Ricupero <marco.ricupero@gmail.com>
 * License: MIT
 * ============================================================
 * I18N_ALL use material from Wikipedia
 * Article: https://en.wikipedia.org/wiki/Diacritic
 * License: CC-BY-SA 3.0
 */
function e(e){return"string"==typeof e}class t{get(t,r,i){return e(r)&&r.length<=1?this.diacriticTrap(t,r):Reflect.get(t,r,i)}diacriticTrap(e,t){return t}}class r extends t{diacriticTrap(t,r){super.diacriticTrap(t,r);const i=t.isUpperCase(r),s=r.toLowerCase(),[a]=Object.entries(t.dictionary).find(([,t])=>e(t)&&t.includes(s))||[];return i&&a?a.toUpperCase():e(a)?a:r}}class i extends t{diacriticTrap(e,t){let r=super.diacriticTrap(e,t);const i=e.dictionary[t.toLowerCase()];return i&&(r+=e.isUpperCase(r)?i.toUpperCase():i),r}}class s extends t{diacriticTrap(e,t){const r=super.diacriticTrap(e,t).toLowerCase(),i=new Set([r,r.toUpperCase()]);return[...e.dictionary[r]||""].forEach(e=>{i.add(e),i.add(e.toUpperCase())}),[...i].sort().join("")}}class a extends t{diacriticTrap(e,t){super.diacriticTrap(e,t);const r=e.dictionary[t.toLowerCase()];let i="";return r&&(i=e.isUpperCase(t)?r.toUpperCase():r),new RegExp(`[${t}${i}]`,"u")}}class n extends t{diacriticTrap(e,t){return super.diacriticTrap(e,t),new RegExp(`[${t}${e.insensitiveMatcher[t]||""}]`,"ui")}}class c{constructor(e){const t=e.reduce((e,t)=>Object.entries(t).reduce((e,[t,r])=>Object.assign(Object.assign({},e),{[t]:(e[t]||"")+r}),e),{});Object.entries(t).forEach(([e,r])=>{t[e]=[...new Set([...r])].sort().join("")}),this.dictionary=Object.freeze(t),this.matcher=new Proxy(this,new i),this.insensitiveMatcher=new Proxy(this,new s),this.validator=new Proxy(this,new a),this.insensitiveValidator=new Proxy(this,new n)}matcherBy(e){return[...Object.entries(this.dictionary).filter(([t,r])=>r&&e.test(t)).map(([e,t])=>e+t),...Object.entries(this.dictionary).filter(([t,r])=>r&&e.test(t.toUpperCase())).map(([e,t])=>(e+t).toUpperCase())].join("")}replace(e){return e.replace(/./g,e=>this[e])}isUpperCase(e=""){return e.toUpperCase()===e}isLowerCase(e=""){return e.toLowerCase()===e}}var o={a:"áäâàåÄąāãă",e:"éèêëěÊęėēё",i:"íîïi̇řìįī",o:"óôöòøōõơ",u:"úûüùůŭųūư",y:"ýÿŷỳ",n:"ñňŋņń",l:"ḷŀłļĺľ",h:"ḥĥȟħ",c:"çčćĉĊ",g:"ğĝǧģĠġ",s:"şšŝṣșſś","у":"ў","и":"йѝ","е":"ё",d:"đďðḏ",z:"žŻźż",t:"ťțțṭ",w:"ẅŵẃẁ",ae:"æ",ss:"ß","α":"ά","ε":"έ","η":"ή","ι":"ίΐϊ","ο":"ό","υ":"ύΰϋ","ω":"ώ",j:"ĵ",oe:"œ","":"ʰ'ʼ·׳",ii:"î",k:"ķ","к":"ќ","г":"ѓґ",ij:"ĳ",r:"ŕ","і":"ї"};export default class extends c{constructor(...e){return super(e.length?e:[o]),Object.defineProperty(this,"dictionary",{enumerable:!1,configurable:!1}),new Proxy(this,new r)}}
//# sourceMappingURL=diacritic-remover.es.js.map
