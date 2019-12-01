import DiacriticRemoverHandler from './diacritic-remover-handler.class';
import DiacriticSetInterface from '../interfaces/diacritic-set.interface';
import DiacriticMapperCore from './diacritic-mapper-core.class';

import I18N_ALL from '../i18n/i18n-all.const';

class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string|any;
    constructor(...dictionaries: DiacriticSetInterface[]) {
        super(dictionaries.length ? dictionaries : [I18N_ALL as DiacriticSetInterface]);
        Object.defineProperty(this, 'dictionary', {
            enumerable: false,
            configurable: false
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}
export default DiacriticRemover;