type DiacriticRemover_$0 = DiacriticRemover;
interface DiacriticSetInterface {
    [key: string]: string;
}
interface DiacriticValidatorSetInterface {
    [key: string]: RegExp;
}
interface DiacriticMapperInterface {
    [key: string]: string | any;
    dictionary: DiacriticSetInterface;
    matcher: DiacriticSetInterface;
    insensitiveMatcher: DiacriticSetInterface;
    validator: DiacriticValidatorSetInterface;
    insensitiveValidator: DiacriticValidatorSetInterface;
    matcherBy(regexp: RegExp): string;
    replace(text: string): string;
    isUpperCase(text: string): boolean;
    isLowerCase(text: string): boolean;
}
declare class DiacriticMapperCore implements DiacriticMapperInterface {
    [key: string]: string | any;
    dictionary: DiacriticSetInterface;
    matcher: DiacriticSetInterface;
    insensitiveMatcher: DiacriticSetInterface;
    validator: DiacriticValidatorSetInterface;
    insensitiveValidator: DiacriticValidatorSetInterface;
    constructor(dictionaries: DiacriticSetInterface[]);
    matcherBy(regexp: RegExp): string;
    replace(text: string): string;
    /**
     * Check if the given string is uppercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is uppercase
     * @memberof DiacriticMapperCore
     */
    isUpperCase(text?: string): boolean;
    /**
     * Check if the given string is lowercase
     *
     * @param {string} [text=''] string to check
     * @returns {boolean} true if text is lowercase
     * @memberof DiacriticMapperCore
     */
    isLowerCase(text?: string): boolean;
}
declare class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string | any;
    constructor(...dictionaries: DiacriticSetInterface[]);
}
export { DiacriticRemover_$0 as DiacriticRemover };
