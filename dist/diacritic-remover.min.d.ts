type DiacriticRemover_$0 = DiacriticRemover;
interface IDiacriticSet {
    [key: string]: string;
}
interface IDiacriticValidatorSet {
    [key: string]: RegExp;
}
interface IDiacriticMapper {
    [key: string]: string | any;
    dictionary: IDiacriticSet;
    matcher: IDiacriticSet;
    insensitiveMatcher: IDiacriticSet;
    validator: IDiacriticValidatorSet;
    insensitiveValidator: IDiacriticValidatorSet;
    matcherBy(regexp: RegExp): string;
    replace(text: string): string;
    isUpperCase(text: string): boolean;
    isLowerCase(text: string): boolean;
}
declare class DiacriticMapperCore implements IDiacriticMapper {
    [key: string]: string | any;
    dictionary: IDiacriticSet;
    matcher: IDiacriticSet;
    insensitiveMatcher: IDiacriticSet;
    validator: IDiacriticValidatorSet;
    insensitiveValidator: IDiacriticValidatorSet;
    constructor(dictionaries: IDiacriticSet[]);
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
    constructor(...dictionaries: IDiacriticSet[]);
}
export { DiacriticRemover_$0 as DiacriticRemover };
