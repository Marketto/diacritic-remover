import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        return [char.toLowerCase(), char.toUpperCase()]
            .map(l => target.matcher[l] || '')
            .join('')
            || char;
    }
}

export default DiacriticInsensitiveMatcherHandler;