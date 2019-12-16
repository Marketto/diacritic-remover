import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): RegExp {
        const cleanChar = super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()] || "";
        let charMatcher = "";
        let markerMatcher = "";
        if (cleanChar || diacritics) {
            charMatcher = `[${cleanChar}${diacritics}]`;
            markerMatcher = `(?:[${this.LOWERCASE_MARKER_MATCHER}${this.UPPERCASE_MARKER_MATCHER}]*)`;
            if (target.isUpperCase(cleanChar)) {
                charMatcher = charMatcher.toUpperCase();
            }
        }
        return new RegExp(`^${charMatcher}${markerMatcher}$`, "u");
    }
}

export default DiacriticValidatorHandler;
