import { isString } from "util";
import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        const cleanChar = super.diacriticTrap(target, char);
        if (!cleanChar.trim() || cleanChar.length !== 1) {
            return cleanChar;
        }
        const lowerCaseChar = cleanChar.toLowerCase();

        const [plainChar] = Object.entries(target.dictionary)
            .find(([letter, diacritics]) => isString(diacritics) &&
                [letter, ...diacritics].includes(lowerCaseChar)) || [cleanChar];

        return target.isUpperCase(cleanChar) ?
            plainChar.toUpperCase() :
            plainChar;
    }
}

export default DiacriticRemoverHandler;
