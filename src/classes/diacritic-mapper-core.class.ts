import DiacriticSetInterface from '../interfaces/diacritic-set.interface';
import DiacriticValidatorSetInterface from '../interfaces/diacritic-validator-set.interface';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticInsensitiveMatcherHandler from './diacritic-insensitive-matcher-handler.class';
import DiacriticValidatorHandler from './diacritic-validator-handler.class';
import DiacriticInsensitiveValidatorHandler from './diacritic-insensitive-validator-handler.class';

class DiacriticMapperCore implements DiacriticMapperInterface {

    [key:string]: string|any;
    public matcher: DiacriticSetInterface;

    public insensitiveMatcher: DiacriticSetInterface;

    public validator: DiacriticValidatorSetInterface;

    public insensitiveValidator: DiacriticValidatorSetInterface;

    public constructor(dictionaries: DiacriticSetInterface[]) {
        const dictionary: DiacriticSetInterface = dictionaries.reduce((accumulator: DiacriticSetInterface, currentDict: DiacriticSetInterface) => {
            Object.entries(currentDict).forEach(([letter, diacritics]) => {
                if (letter in accumulator) {
                    const newDiacritics = diacritics.split('').filter(l => !accumulator[letter].includes(l)).join('');
                    accumulator[letter] += newDiacritics;
                } else {
                    accumulator[letter] = diacritics;
                }
            });
            return accumulator;
        }, {});

        this.matcher = Object.freeze(dictionary);
        this.insensitiveMatcher = new Proxy(this, new DiacriticInsensitiveMatcherHandler());
        this.validator = new Proxy(this, new DiacriticValidatorHandler());
        this.insensitiveValidator = new Proxy(this, new DiacriticInsensitiveValidatorHandler());
    }

    public matcherBy(regexp: RegExp): string {
        return Object.keys(this.matcher)
            .filter(key => regexp.test(key))
            .map(key => this.matcher[key] || '')
            .join('');
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