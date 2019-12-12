import { isString, isUndefined } from "util";
import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import IDiacriticSet from "../interfaces/diacritic-set.interface";
import IDiacriticValidatorSet from "../interfaces/diacritic-validator-set.interface";
import DiacriticInsensitiveMatcherHandler from "./diacritic-insensitive-matcher-handler.class";
import DiacriticInsensitiveValidatorHandler from "./diacritic-insensitive-validator-handler.class";
import DiacriticMatcherHandler from "./diacritic-matcher-handler.class";
import DiacriticValidatorHandler from "./diacritic-validator-handler.class";

class DiacriticMapperCore implements IDiacriticMapper {

    [key: string]: any;

    public dictionary: IDiacriticSet;
    public matcher: IDiacriticSet;

    public insensitiveMatcher: IDiacriticSet;

    public validator: IDiacriticValidatorSet;

    public insensitiveValidator: IDiacriticValidatorSet;

    public constructor(dictionaries: IDiacriticSet[]) {
        const dictionary = dictionaries
            .reduce((
                dictMerge: IDiacriticSet,
                currentDict: IDiacriticSet,
            ) => Object.entries(currentDict)
                .reduce((accumulator: IDiacriticSet, [letter, diacritics]) => {
                    return {
                        ...accumulator,
                        [letter]: (accumulator[letter] || "") + diacritics,
                    };
                }, dictMerge),
            {});

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

    public matcherBy(regexp: RegExp): string {
        const lowerCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key))
            .map(([char , value]) => char + value);

        const upperCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key.toUpperCase()))
            .map(([char , value]) => (char + value).toUpperCase());

        return [...lowerCase, ...upperCase].join("");
    }

    public replace(text: string): string {
        return text.replace(/./g, (char: string) => this[char]);
    }

    /**
     * Check if the given string is uppercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is uppercase
     * @memberof DiacriticMapperCore
     */
    public isUpperCase(text: string = ""): boolean {
        return text.toLowerCase() !== text;
    }

    /**
     * Check if the given string is lowercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is lowercase
     * @memberof DiacriticMapperCore
     */
    public isLowerCase(text: string = ""): boolean {
        return text.toUpperCase() !== text;
    }
}

export default DiacriticMapperCore;
