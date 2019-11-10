import DiacriticSetInterface from '../interfaces/diacritic-set.interface';
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import { isString, isFunction, isObject, isUndefined } from 'util';
import DiacriticMapperCore from './diacritic-mapper-core.class';

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        return Object.keys(target.matcher)
            .find(c => isString(target.matcher[c]) && target.matcher[c].includes(char))
            || char;
    }
}

export default DiacriticRemoverHandler;