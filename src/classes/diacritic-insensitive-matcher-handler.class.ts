import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        const lowerCaseChar = super.diacriticTrap(target, char).toLowerCase();
        const insensitiveMatcher = new Set<string>([lowerCaseChar, lowerCaseChar.toUpperCase()]);
        const diacritics = target.dictionary[lowerCaseChar] || '';
        [...diacritics]
            .forEach(diacritic => {
                insensitiveMatcher.add(diacritic);
                insensitiveMatcher.add(diacritic.toUpperCase());
            });

        return [...insensitiveMatcher].sort().join('');
    }
}

export default DiacriticInsensitiveMatcherHandler;