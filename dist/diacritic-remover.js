/**
 * @marketto/diacritic-remover 1.0.5
 * Copyright (c) 2019, Marco Ricupero <marco.ricupero@gmail.com>
 * License: MIT
 * ===========================================
 * Latin diacritic json file use material from Wikitionary article "Latin script"
 * Source: https://en.wiktionary.org/wiki/Appendix:Latin_script
 * License: CC-BY-SA 3.0
 * ===========================================
 * These diacritic i18n json files use material from Wikipedia article "Diacritic"
 * Source: https://en.wikipedia.org/wiki/Diacritic
 * License: CC-BY-SA 3.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class DiacriticAbstractHandler {
    constructor() {
        this.LOWERCASE_MARKER_MATCHER = "\\p{M}";
        this.UPPERCASE_MARKER_MATCHER = "\\P{M}";
        this.MARKER_REGEXP = new RegExp(`(${this.LOWERCASE_MARKER_MATCHER})`, "gui");
    }
    get(target, prop, receiver) {
        if (prop.length <= 1) {
            return this.diacriticTrap(target, prop);
        }
        return Reflect.get(target, prop, receiver);
    }
    diacriticTrap(target, char) {
        return char.replace(this.MARKER_REGEXP, "");
    }
}

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    diacriticTrap(target, char) {
        const lowerCaseChar = super.diacriticTrap(target, char).toLowerCase();
        const lowerCaseDiacritics = target.dictionary[lowerCaseChar] || "";
        const insensitiveMatcher = new Set([
            lowerCaseChar,
            lowerCaseChar.toUpperCase(),
            ...lowerCaseDiacritics,
            ...lowerCaseDiacritics.toUpperCase(),
        ]);
        return [...insensitiveMatcher].sort().join("");
    }
}

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    diacriticTrap(target, char) {
        const cleanChar = super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()] || "";
        let charMatcher = "";
        let markerMatcher = "";
        if (cleanChar || diacritics) {
            charMatcher = `[${cleanChar}${diacritics}]`;
            markerMatcher = `(?:[${this.LOWERCASE_MARKER_MATCHER}${this.UPPERCASE_MARKER_MATCHER}]*)`;
            if (target.isUpperCase(cleanChar)) {
                charMatcher = charMatcher.toUpperCase();
            }
        }
        return new RegExp(`^${charMatcher}${markerMatcher}$`, "u");
    }
}

class DiacriticInsensitiveValidatorHandler extends DiacriticValidatorHandler {
    diacriticTrap(target, char) {
        const { source } = super.diacriticTrap(target, char);
        return new RegExp(source, "ui");
    }
}

class DiacriticMatcherHandler extends DiacriticAbstractHandler {
    diacriticTrap(target, char) {
        let matcher = super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()];
        if (diacritics) {
            matcher += target.isUpperCase(matcher) ? diacritics.toUpperCase() : diacritics;
        }
        return matcher;
    }
}

class DiacriticMapperCore {
    constructor(dictionary = {}) {
        this.dictionary = dictionary;
        this.matcher = new Proxy(this, new DiacriticMatcherHandler());
        this.insensitiveMatcher = new Proxy(this, new DiacriticInsensitiveMatcherHandler());
        this.validator = new Proxy(this, new DiacriticValidatorHandler());
        this.insensitiveValidator = new Proxy(this, new DiacriticInsensitiveValidatorHandler());
    }
    matcherBy(regexp) {
        const lowerCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key))
            .map(([char, value]) => char + value);
        const upperCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key.toUpperCase()))
            .map(([char, value]) => (char + value).toUpperCase());
        return [...lowerCase, ...upperCase].join("");
    }
    replace(text) {
        return text.replace(/./g, (char) => this[char]);
    }
    /**
     * Check if the given string is uppercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is uppercase
     * @memberof DiacriticMapperCore
     */
    isUpperCase(text = "") {
        return text.toLowerCase() !== text;
    }
    /**
     * Check if the given string is lowercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is lowercase
     * @memberof DiacriticMapperCore
     */
    isLowerCase(text = "") {
        return text.toUpperCase() !== text;
    }
}

// Copyright Joyent, Inc. and other Node contributors.

function isString(arg) {
  return typeof arg === 'string';
}

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    diacriticTrap(target, char) {
        const cleanChar = super.diacriticTrap(target, char);
        if (!cleanChar.trim() || cleanChar.length !== 1) {
            return cleanChar;
        }
        const lowerCaseChar = cleanChar.toLowerCase();
        const [plainChar] = Object.entries(target.dictionary)
            .find(([letter, diacritics]) => isString(diacritics) &&
            [letter, ...diacritics].includes(lowerCaseChar)) || [cleanChar];
        return target.isUpperCase(cleanChar) ?
            plainChar.toUpperCase() :
            plainChar;
    }
}

var i18nGlobal = {
	"": "ʰ'ʼ·׳"
};

var LATIN_DICT = {
	a: "àáâãäåāăąǎǟǡǻȁȃȧɐɑɒᴀᶏḁạảấầẩẫậắằẳẵặⱥａ",
	ae: "æǣǽᴁᴂᴭᵆ",
	b: "ƀƃɓʙᵬᶀḃḅḇｂ",
	c: "cçćĉċčƈȼɕ̄ᴄḉｃ",
	d: "dðþďđƌȡɖɗ̦ᴅᵭᶁᶑḋḍḏḑḓｄ",
	db: "ȸ",
	dz: "ǆǳ",
	e: "èéêëēĕėęěǝȅȇȩɇəɛᴇᶒḕḗḙḛḝẹẻẽếềểễệⱸｅ",
	eo: "ᴔ",
	f: "fƒᵮᶂḟꜰﬀｆ",
	g: "ĝğġģǥǧǵȝɠɢᶃḡｇ",
	h: "hĥħȟɦʜʰ̱ḣḥḧḩḫẖⱨｈ",
	i: "iìíîïĩīĭįıǐȉȋɨɩɪ̇ᵻᶖḭḯỉịｉ",
	ij: "ĳ",
	j: "jĵǰȷɉɟʄʝ̌ᴊｊ",
	k: "ķƙǩᴋᶄḱḳḵⱪꝁｋ",
	l: "lĺļľŀłƚȴɫɬɭʟᶅḷḹḻḽⱡｌ",
	lj: "ǉ",
	m: "ɱᴍᵯᶆḿṁṃｍ",
	n: "nñńņňƞǹȵɲɳɴᵰᶇṅṇṉṋｎ",
	nj: "ŋǌ̈",
	o: "òóôõöøōŏőơǒǫǭǿȍȏȫȭȯȱɔɵᴏṍṏṑṓọỏốồổỗộớờởỡợⱺｏ",
	oe: "œ",
	p: "pƥƿ̃ᴘᵱᵽᶈṕṗｐ",
	q: "ƣɋʠｑ",
	qp: "ȹ",
	r: "ŕŗřȑȓɍɼɽɾʀᵲᵳᶉṙṛṝṟꝛｒ",
	s: "sśŝşšſșȿʂʃ̩ᵴᶊṡṣṥṧṩẛꜱｓ",
	ss: "ß",
	t: "tţťŧƫƭțȶʈᴛᵵṫṭṯṱẗⱦｔ",
	u: "ùúûüũūŭůűųưǔǖǘǚǜȕȗʉʊᴜᵾṳṵṷṹṻụủứừửữựｕ",
	ue: "ᵫ",
	uo: "ȣ",
	ut: "ᶙ",
	v: "ʋʌᴠᶌṽṿⱱⱴｖ",
	w: "ŵᴡẁẃẅẇẉẘⱳｗ",
	x: "ᶍẋẍｘ",
	y: "ýÿŷƴȳɏʏẏẙỳỵỷỹｙ",
	z: "zźżžƶƹȥɀʐʑʒᴢᵶᶎẑẓẕⱬｚ"
};

class DiacriticRemover extends DiacriticMapperCore {
    constructor(...dictionaries) {
        super();
        const mergedDictionaries = Object.freeze((dictionaries.length ? dictionaries : [LATIN_DICT, i18nGlobal])
            .reduce((dictMerge, currentDict) => [...dictMerge, ...Object.entries(currentDict)], [])
            .reduce((accumulator, [letter, diacritics]) => {
            let targetSet = accumulator.find(([targetLetter]) => targetLetter === letter);
            if (!targetSet) {
                targetSet = [letter, []];
                accumulator.push(targetSet);
            }
            targetSet[1] = [...targetSet[1], ...diacritics];
            return accumulator;
        }, [])
            .reduce((accumulator, [letter, diacritics]) => (Object.assign(Object.assign({}, accumulator), { [letter]: [...(new Set(diacritics))].sort().join("") })), {}));
        Object.defineProperty(this, "dictionary", {
            configurable: false,
            enumerable: false,
            value: mergedDictionaries,
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}

exports.DiacriticRemover = DiacriticRemover;
exports.default = DiacriticRemover;
