import IDiacriticSet from "../interfaces/diacritic-set.interface";
import DiacriticMapperCore from "./diacritic-mapper-core.class";
import DiacriticRemoverHandler from "./diacritic-remover-handler.class";

class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string|any;
    constructor(...dictionaries: IDiacriticSet[]) {
        super(dictionaries);
        Object.defineProperty(this, "dictionary", {
            configurable: false,
            enumerable: false,
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}
export default DiacriticRemover;
