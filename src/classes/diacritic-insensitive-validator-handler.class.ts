import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticInsensitiveValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): RegExp {
        super.diacriticTrap(target, char);
        return new RegExp(`[${char}${target.insensitiveMatcher[char] || ''}]`, 'ui');
    }
}

export default DiacriticInsensitiveValidatorHandler;