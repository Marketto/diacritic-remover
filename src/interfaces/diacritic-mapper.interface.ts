import DiacriticSetInterface from './diacritic-set.interface';
import DiacriticValidatorSetInterface from './diacritic-validator-set.interface';

interface DiacriticMapperInterface {

    [key:string]: string|any;
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

export default DiacriticMapperInterface;