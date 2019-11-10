import { isString } from "util";
import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';

abstract class DiacriticAbstractHandler implements ProxyHandler<DiacriticMapperInterface> {
    get(target: DiacriticMapperInterface, prop: PropertyKey, receiver: any): any {
        if (isString(prop) && prop.length === 1) {
            return this.diacriticTrap(target, prop);
        }
        return Reflect.get(target, prop, receiver);
    }

    has(target: DiacriticMapperInterface, prop: PropertyKey): boolean {
        return (isString(prop) && prop.length === 1) || Reflect.has(target, prop);
    }

    protected diacriticTrap(target: DiacriticMapperInterface, char: string): any {
        return;
    }
}

export default DiacriticAbstractHandler;