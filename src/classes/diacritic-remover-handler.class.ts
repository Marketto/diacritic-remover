import { isString } from "util";
import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        super.diacriticTrap(target, char);
        const upperCase: boolean = target.isUpperCase(char);
        const lowerCaseChar = char.toLowerCase();

        const [plainChar] = Object.entries(target.dictionary)
            .find(([, diacritics]) => isString(diacritics) && diacritics.includes(lowerCaseChar)) || [];
        if (upperCase && plainChar) {
            return plainChar.toUpperCase();
        }
        return isString(plainChar) ? plainChar : char;
    }
}

export default DiacriticRemoverHandler;
