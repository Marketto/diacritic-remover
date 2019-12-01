import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        let insensitiveMatcher = super.diacriticTrap(target, char);
        if (!insensitiveMatcher) {
            return '';
        }

        const diacritics = target.dictionary[char.toLowerCase()];
        insensitiveMatcher += diacritics || '';
        return insensitiveMatcher.toLowerCase() + insensitiveMatcher.toUpperCase();
    }
}

export default DiacriticInsensitiveMatcherHandler;