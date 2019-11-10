import DiacriticSetInterface from './diacritic-set.interface';
import DiacriticValidatorSetInterface from './diacritic-validator-set.interface';

interface DiacriticMapperInterface {

    [key:string]: string|any;
    matcher: DiacriticSetInterface;
    insensitiveMatcher: DiacriticSetInterface;
    validator: DiacriticValidatorSetInterface;
    insensitiveValidator: DiacriticValidatorSetInterface;

    matcherBy(regexp: RegExp): string;

    replace(text: string): string;
}

export default DiacriticMapperInterface;