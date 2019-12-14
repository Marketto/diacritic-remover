/**
 * @marketto/diacritic-remover 1.0.5
 * Copyright (c) 2019, Marco Ricupero <marco.ricupero@gmail.com>
 * License: MIT
 */
// Copyright Joyent, Inc. and other Node contributors.

function isString(arg) {
  return typeof arg === 'string';
}

class DiacriticAbstractHandler {
    constructor() {
        this.LOWERCASE_MARKER_MATCHER = "\\p{Mark}";
        this.UPPERCASE_MARKER_MATCHER = "\\P{Mark}";
        this.MARKER_REGEXP = new RegExp(`(${this.LOWERCASE_MARKER_MATCHER})`, "gui");
    }
    get(target, prop, receiver) {
        if (isString(prop)) {
            const strProp = prop;
            if (strProp.length <= 1) {
                return this.diacriticTrap(target, strProp);
            }
        }
        return Reflect.get(target, prop, receiver) || Reflect.get(this, prop);
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
        const diacritics = target.dictionary[char.toLowerCase()] || cleanChar;
        if (!cleanChar && !diacritics) {
            return this.MARKER_REGEXP;
        }
        let matchingDiacritics;
        let markerMatcher;
        if (target.isUpperCase(cleanChar)) {
            matchingDiacritics = diacritics.toUpperCase();
            markerMatcher = this.UPPERCASE_MARKER_MATCHER;
        }
        else {
            matchingDiacritics = diacritics;
            markerMatcher = this.LOWERCASE_MARKER_MATCHER;
        }
        return new RegExp(`[${cleanChar}${matchingDiacritics}](?:${markerMatcher})*`, "u");
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
    constructor(dictionaries) {
        const dictionary = dictionaries
            .reduce((dictMerge, currentDict) => Object.entries(currentDict)
            .reduce((accumulator, [letter, diacritics]) => {
            return {
                ...accumulator,
                [letter]: (accumulator[letter] || "") + diacritics,
            };
        }, dictMerge), {});
        Object.entries(dictionary)
            .forEach(([letter, diacritics]) => {
            if (isString(diacritics)) {
                dictionary[letter] = [...(new Set([...diacritics]))].sort().join("");
            }
        });
        this.dictionary = Object.freeze(dictionary);
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

class DiacriticRemover extends DiacriticMapperCore {
    constructor(...dictionaries) {
        super(dictionaries);
        Object.defineProperty(this, "dictionary", {
            configurable: false,
            enumerable: false,
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}

export default DiacriticRemover;
//# sourceMappingURL=diacritic-remover.mjs.map
