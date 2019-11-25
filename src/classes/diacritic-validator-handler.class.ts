import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): RegExp {
        super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()];
        let matchingDiacritics = '';
        if (diacritics) {
            matchingDiacritics = target.isUpperCase(char) ? diacritics.toUpperCase() : diacritics;
        }
        return new RegExp(`[${char}${matchingDiacritics}]`, 'u');
    }
}

export default DiacriticValidatorHandler;