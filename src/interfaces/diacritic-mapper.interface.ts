import IDiacriticSet from "./diacritic-set.interface";
import IDiacriticValidatorSet from "./diacritic-validator-set.interface";

interface IDiacriticMapper {

    [key: string]: any;
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

export default IDiacriticMapper;
