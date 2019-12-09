import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): RegExp {
        super.diacriticTrap(target, char);
        const diacritics = target.dictionary[char.toLowerCase()] || char;
        const matchingDiacritics = target.isUpperCase(char) ? diacritics.toUpperCase() : diacritics;
        return new RegExp(`[${char}${matchingDiacritics}]`, "u");
    }
}

export default DiacriticValidatorHandler;
