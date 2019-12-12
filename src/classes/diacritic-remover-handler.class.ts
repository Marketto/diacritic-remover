import { isString } from "util";
import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        super.diacriticTrap(target, char);
        if (!char.trim() || char.length !== 1) {
            return char;
        }
        const lowerCaseChar = char.toLowerCase();

        const [plainChar] = Object.entries(target.dictionary)
            .find(([letter, diacritics]) => isString(diacritics) &&
                [letter, ...diacritics].includes(lowerCaseChar)) || [char];

        return target.isUpperCase(char) ?
            plainChar.toUpperCase() :
            plainChar;
    }
}

export default DiacriticRemoverHandler;
