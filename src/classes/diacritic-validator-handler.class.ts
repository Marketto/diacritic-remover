import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): RegExp {
        return new RegExp(`[${char}${target.matcher[char] || ''}]`, 'u');
    }
}

export default DiacriticValidatorHandler;