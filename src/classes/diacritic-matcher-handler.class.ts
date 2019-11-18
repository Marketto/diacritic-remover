import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        const diacritics = target.dictionary[char.toLowerCase()];
        if (diacritics) {
            return target.isUpperCase(char) ? diacritics.toUpperCase() : diacritics;
        }
        return char;
    }
}

export default DiacriticMatcherHandler;