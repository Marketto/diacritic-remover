import { isString } from "util";
import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";

abstract class DiacriticAbstractHandler implements ProxyHandler<IDiacriticMapper> {
    public get(target: IDiacriticMapper, prop: PropertyKey, receiver: any): any {
        if (isString(prop) && prop.length <= 1) {
            return this.diacriticTrap(target, prop);
        }
        return Reflect.get(target, prop, receiver);
    }

    protected diacriticTrap(target: IDiacriticMapper, char: string): any {
        return char;
    }
}

export default DiacriticAbstractHandler;
