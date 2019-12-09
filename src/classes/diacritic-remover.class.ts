import IDiacriticSet from "../interfaces/diacritic-set.interface";
import DiacriticMapperCore from "./diacritic-mapper-core.class";
import DiacriticRemoverHandler from "./diacritic-remover-handler.class";

import I18N_ALL from "../i18n/i18n-all.const";

class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string|any;
    constructor(...dictionaries: IDiacriticSet[]) {
        super(dictionaries.length ? dictionaries : [I18N_ALL as IDiacriticSet]);
        Object.defineProperty(this, "dictionary", {
            configurable: false,
            enumerable: false,
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}
export default DiacriticRemover;
