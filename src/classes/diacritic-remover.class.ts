import IDiacriticSet from "../interfaces/diacritic-set.interface";
import DiacriticMapperCore from "./diacritic-mapper-core.class";
import DiacriticRemoverHandler from "./diacritic-remover-handler.class";

import i18nGlobal from "../../dictionaries/i18n/global.json";
import LATIN_DICT from "../../dictionaries/latin.json";

class DiacriticRemover extends DiacriticMapperCore {
    [letter: string]: string|any;

    constructor(...dictionaries: IDiacriticSet[]) {
        super();
        const mergedDictionaries = Object.freeze(
            (dictionaries.length ? dictionaries : [LATIN_DICT, i18nGlobal])
            .reduce((
                    dictMerge: Array<[string, string]>,
                    currentDict: IDiacriticSet,
                ) => [...dictMerge, ...Object.entries(currentDict)],
                [] as Array<[string, string]>)
            .reduce((
                    accumulator: Array<[string, string[]]>,
                    [letter, diacritics],
                ) => {
                    let targetSet = accumulator.find(([ targetLetter ]) => targetLetter === letter);
                    if (!targetSet) {
                        targetSet = [letter, []];
                        accumulator.push(targetSet);
                    }
                    targetSet[1] = [...targetSet[1], ...diacritics];
                    return accumulator;
                },
                [] as Array<[string, string[]]>)
            .reduce((
                    accumulator: IDiacriticSet,
                    [letter, diacritics],
                ) => ({
                    ...accumulator,
                    [letter]: [...(new Set(diacritics))].sort().join(""),
                }), {}));
        Object.defineProperty(this, "dictionary", {
            configurable: false,
            enumerable: false,
            value: mergedDictionaries,
        });
        return new Proxy(this, new DiacriticRemoverHandler());
    }
}
export default DiacriticRemover;
