/**
 * @marketto/diacritic-remover 1.0.1
 * Copyright (c) 2019, Marco Ricupero <marco.ricupero@gmail.com>
 * License: MIT
 * ============================================================
 * I18N_ALL use material from Wikipedia
 * Article: https://en.wikipedia.org/wiki/Diacritic
 * License: CC-BY-SA 3.0
 */
var DiacriticFilter=function(){"use strict";function e(e){return"string"==typeof e}class t{get(t,r,i){return e(r)&&1===r.length?this.diacriticTrap(t,r):Reflect.get(t,r,i)}has(t,r){return e(r)&&1===r.length||Reflect.has(t,r)}diacriticTrap(e,t){}}class r extends t{diacriticTrap(t,r){super.diacriticTrap(t,r);const i=t.isUpperCase(r),s=r.toLowerCase(),a=Object.keys(t.dictionary).find(r=>e(t.dictionary[r])&&t.dictionary[r].includes(s));return i&&a?a.toUpperCase():a||r}}class i extends t{diacriticTrap(e,t){super.diacriticTrap(e,t);const r=e.dictionary[t.toLowerCase()];return r?e.isUpperCase(t)?r.toUpperCase():r:t}}class s extends t{diacriticTrap(e,t){super.diacriticTrap(e,t);const r=e.dictionary[t.toLowerCase()];return r?r+r.toUpperCase():t}}class a extends t{diacriticTrap(e,t){super.diacriticTrap(e,t);const r=e.dictionary[t.toLowerCase()];let i="";return r&&(i=e.isUpperCase(t)?r.toUpperCase():r),new RegExp(`[${t}${i}]`,"u")}}class c extends t{diacriticTrap(e,t){return super.diacriticTrap(e,t),new RegExp(`[${t}${e.insensitiveMatcher[t]||""}]`,"ui")}}class n{constructor(t){const r=t.reduce((t,r)=>(Object.entries(r).forEach(([r,i])=>{if(e(i))if(r in t){const e=i.split("").filter(e=>!t[r].includes(e)).join("");t[r]+=e}else t[r]=i}),t),{});this.dictionary=Object.freeze(r),this.matcher=new Proxy(this,new i),this.insensitiveMatcher=new Proxy(this,new s),this.validator=new Proxy(this,new a),this.insensitiveValidator=new Proxy(this,new c)}matcherBy(e){return[...Object.keys(this.dictionary).filter(t=>e.test(t)).map(e=>this.dictionary[e]),...Object.keys(this.dictionary).filter(t=>e.test(t.toUpperCase())).map(e=>this.dictionary[e.toLowerCase()].toUpperCase())].join("")}replace(e){return e.replace(/./g,e=>this[e])}isUpperCase(e=""){return e.toUpperCase()===e}isLowerCase(e=""){return e.toLowerCase()===e}}var o={a:"áäâàåÄąāãă",e:"éèêëěÊęėēё",i:"íîïi̇řìįī",o:"óôöòøōõơ",u:"úûüùůŭųūư",y:"ýÿŷỳ",n:"ñňŋņń",l:"ḷŀłļĺľ",h:"ḥĥȟħ",c:"çčćĉĊ",g:"ğĝǧģĠġ",s:"şšŝṣșſś","у":"ў","и":"йѝ","е":"ё",d:"đďðḏ",z:"žŻźż",t:"ťțțṭ",w:"ẅŵẃẁ",ae:"æ",ss:"ß","α":"ά","ε":"έ","η":"ή","ι":"ίΐϊ","ο":"ό","υ":"ύΰϋ","ω":"ώ",j:"ĵ",oe:"œ","":"ʰ'ʼ·׳",ii:"î",k:"ķ","к":"ќ","г":"ѓґ",ij:"ĳ",r:"ŕ","і":"ї"};return class extends n{constructor(...e){return super(e.length?e:[o]),Object.defineProperty(this,"dictionary",{enumerable:!1,configurable:!1}),new Proxy(this,new r)}}}();
//# sourceMappingURL=diacritic-remover.bundle.js.map
