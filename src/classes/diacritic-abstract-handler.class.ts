import { isString } from "util";
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

abstract class DiacriticAbstractHandler implements ProxyHandler<DiacriticMapperInterface> {
    get(target: DiacriticMapperInterface, prop: PropertyKey, receiver: any): any {
        if (isString(prop) && prop.length <= 1) {
            return this.diacriticTrap(target, prop);
        }
        return Reflect.get(target, prop, receiver);
    }

    protected diacriticTrap(target: DiacriticMapperInterface, char: string): any {
        return char;
    }
}

export default DiacriticAbstractHandler;