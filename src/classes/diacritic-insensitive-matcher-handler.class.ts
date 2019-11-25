import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()];
        return diacritics ? (
            diacritics + diacritics.toUpperCase()
        ) : char;
    }
}

export default DiacriticInsensitiveMatcherHandler;