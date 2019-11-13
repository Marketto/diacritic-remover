import DiacriticRemoverHandler from './diacritic-remover-handler.class';
import DiacriticSetInterface from '../interfaces/diacritic-set.interface';
import DiacriticMapperCore from './diacritic-mapper-core.class';


class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string|any;
    constructor(...dictionaries: DiacriticSetInterface[]) {
        super(dictionaries);
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}
export default DiacriticRemover;