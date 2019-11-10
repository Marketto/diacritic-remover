import DiacriticSetInterface from './diacritic-set.interface';
import DiacriticValidatorSetInterface from './diacritic-validator-set.interface';

interface DiacriticMapperInterface {
    matcher: DiacriticSetInterface;
    insensitiveMatcher: DiacriticSetInterface;
    validator: DiacriticValidatorSetInterface;
    insensitiveValidator: DiacriticValidatorSetInterface;

    matcherBy(regexp: RegExp): string;

    [key:string]: string|any;
}

export default DiacriticMapperInterface;