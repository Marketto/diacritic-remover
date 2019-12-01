import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        let matcher = super.diacriticTrap(target, char);

        const diacritics = target.dictionary[char.toLowerCase()];
        if (diacritics) {
            matcher+= target.isUpperCase(matcher) ? diacritics.toUpperCase() : diacritics;
        }
        return matcher;
    }
}

export default DiacriticMatcherHandler;