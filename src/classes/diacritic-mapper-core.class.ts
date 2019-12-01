import DiacriticSetInterface from '../interfaces/diacritic-set.interface';
import DiacriticValidatorSetInterface from '../interfaces/diacritic-validator-set.interface';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticMatcherHandler from './diacritic-matcher-handler.class';
import DiacriticInsensitiveMatcherHandler from './diacritic-insensitive-matcher-handler.class';
import DiacriticValidatorHandler from './diacritic-validator-handler.class';
import DiacriticInsensitiveValidatorHandler from './diacritic-insensitive-validator-handler.class';
import { isString } from 'util';

class DiacriticMapperCore implements DiacriticMapperInterface {

    [key:string]: string|any;

    public dictionary: DiacriticSetInterface;
    public matcher: DiacriticSetInterface;

    public insensitiveMatcher: DiacriticSetInterface;

    public validator: DiacriticValidatorSetInterface;

    public insensitiveValidator: DiacriticValidatorSetInterface;

    public constructor(dictionaries: DiacriticSetInterface[]) {
        const dictionary = dictionaries.reduce((accumulator: DiacriticSetInterface, currentDict: DiacriticSetInterface) => {
            Object.entries(currentDict).forEach(([letter, diacritics]) => {
                if (isString(diacritics)){
                    if (letter in accumulator) {
                        const newDiacritics = diacritics.split('').filter(l => !accumulator[letter].includes(l)).join('');
                        accumulator[letter] += newDiacritics;
                    } else {
                        accumulator[letter] = diacritics;
                    }
                }
            });
            return accumulator;
        }, {});

        this.dictionary = Object.freeze(dictionary);
        this.matcher = new Proxy(this, new DiacriticMatcherHandler());
        this.insensitiveMatcher = new Proxy(this, new DiacriticInsensitiveMatcherHandler());
        this.validator = new Proxy(this, new DiacriticValidatorHandler());
        this.insensitiveValidator = new Proxy(this, new DiacriticInsensitiveValidatorHandler());
    }

    public matcherBy(regexp: RegExp): string {
        const lowerCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key))
            .map(([char ,value]) => char + value);

        const upperCase = Object.entries(this.dictionary)
            .filter(([key, value]) => value && regexp.test(key.toUpperCase()))
            .map(([char ,value]) => (char + value).toUpperCase());

        return [...lowerCase, ...upperCase].join('');
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
    public isUpperCase(text: string = ''): boolean {
        return text.toUpperCase() === text;
    }

    /**
     * Check if the given string is lowercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is lowercase
     * @memberof DiacriticMapperCore
     */
    public isLowerCase(text: string = ''): boolean {
        return text.toLowerCase() === text;
    }
}

export default DiacriticMapperCore;