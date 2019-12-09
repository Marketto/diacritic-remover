/**
 * @marketto/diacritic-remover 1.0.5
 * Copyright (c) 2019, Marco Ricupero <marco.ricupero@gmail.com>
 * License: MIT
 * ============================================================
 * I18N_ALL use material from Wikipedia
 * Article: https://en.wikipedia.org/wiki/Diacritic
 * License: CC-BY-SA 3.0
 */
var DiacriticRemover = (function () {
  'use strict';

  // Copyright Joyent, Inc. and other Node contributors.

  function isString(arg) {
    return typeof arg === 'string';
  }

  class DiacriticAbstractHandler {
      get(target, prop, receiver) {
          if (isString(prop) && prop.length <= 1) {
              return this.diacriticTrap(target, prop);
          }
          return Reflect.get(target, prop, receiver);
      }
      diacriticTrap(target, char) {
          return char;
      }
  }

  class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
      diacriticTrap(target, char) {
          const lowerCaseChar = super.diacriticTrap(target, char).toLowerCase();
          const insensitiveMatcher = new Set([lowerCaseChar, lowerCaseChar.toUpperCase()]);
          const diacritics = target.dictionary[lowerCaseChar] || "";
          [...diacritics]
              .forEach((diacritic) => {
              insensitiveMatcher.add(diacritic);
              insensitiveMatcher.add(diacritic.toUpperCase());
          });
          return [...insensitiveMatcher].sort().join("");
      }
  }

  class DiacriticValidatorHandler extends DiacriticAbstractHandler {
      diacriticTrap(target, char) {
          super.diacriticTrap(target, char);
          const diacritics = target.dictionary[char.toLowerCase()] || char;
          const matchingDiacritics = target.isUpperCase(char) ? diacritics.toUpperCase() : diacritics;
          return new RegExp(`[${char}${matchingDiacritics}]`, "u");
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
              .reduce((accumulator, [letter, diacritics]) => (Object.assign(Object.assign({}, accumulator), { [letter]: (accumulator[letter] || "") + diacritics })), dictMerge), {});
          Object.entries(dictionary)
              .forEach(([letter, diacritics]) => {
              dictionary[letter] = [...(new Set([...diacritics]))].sort().join("");
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
          super.diacriticTrap(target, char);
          const upperCase = target.isUpperCase(char);
          const lowerCaseChar = char.toLowerCase();
          const [plainChar] = Object.entries(target.dictionary)
              .find(([, diacritics]) => isString(diacritics) && diacritics.includes(lowerCaseChar)) || [];
          if (upperCase && plainChar) {
              return plainChar.toUpperCase();
          }
          return isString(plainChar) ? plainChar : char;
      }
  }

  /**
   * i18n jsons and i18n-all.ts use material from Wikipedia
   * Article: https://en.wikipedia.org/wiki/Diacritic
   * License: CC-BY-SA 3.0
   */
  var I18N_ALL = {
      "": "ʰ'ʼ·׳",
      "a": "áäâàåÄąāãă",
      "ae": "æ",
      "c": "çčćĉĊ",
      "d": "đďðḏ",
      "e": "éèêëěÊęėēё",
      "g": "ğĝǧģĠġ",
      "h": "ḥĥȟħ",
      "i": "íîïi̇řìįī",
      "ii": "î",
      "ij": "ĳ",
      "j": "ĵ",
      "k": "ķ",
      "l": "ḷŀłļĺľ",
      "n": "ñňŋņń",
      "o": "óôöòøōõơ",
      "oe": "œ",
      "r": "ŕ",
      "s": "şšŝṣșſś",
      "ss": "ß",
      "t": "ťțțṭ",
      "u": "úûüùůŭųūư",
      "w": "ẅŵẃẁ",
      "y": "ýÿŷỳ",
      "z": "žŻźż",
      "α": "ά",
      "ε": "έ",
      "η": "ή",
      "ι": "ίΐϊ",
      "ο": "ό",
      "υ": "ύΰϋ",
      "ω": "ώ",
      "г": "ѓґ",
      "е": "ё",
      "и": "йѝ",
      "к": "ќ",
      "у": "ў",
      "і": "ї",
  };

  class DiacriticRemover extends DiacriticMapperCore {
      constructor(...dictionaries) {
          super(dictionaries.length ? dictionaries : [I18N_ALL]);
          Object.defineProperty(this, "dictionary", {
              configurable: false,
              enumerable: false,
          });
          return new Proxy(this, new DiacriticRemoverHandler());
      }
  }

  return DiacriticRemover;

}());
//# sourceMappingURL=diacritic-remover.bundle.js.map
