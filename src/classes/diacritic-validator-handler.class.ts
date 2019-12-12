import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): RegExp {
        const cleanChar = super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()] || cleanChar;
        if (!cleanChar && !diacritics) {
            return this.MARKER_REGEXP;
        }
        let matchingDiacritics;
        let markerMatcher;
        if (target.isUpperCase(cleanChar)) {
            matchingDiacritics = diacritics.toUpperCase();
            markerMatcher = this.UPPERCASE_MARKER_MATCHER;
        } else {
            matchingDiacritics = diacritics;
            markerMatcher = this.LOWERCASE_MARKER_MATCHER;
        }
        return new RegExp(`[${cleanChar}${matchingDiacritics}](?:${markerMatcher})*`, "u");
    }
}

export default DiacriticValidatorHandler;
