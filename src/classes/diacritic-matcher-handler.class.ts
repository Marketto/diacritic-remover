import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        let matcher = super.diacriticTrap(target, char);

        const diacritics = target.dictionary[char.toLowerCase()];
        if (diacritics) {
            matcher += target.isUpperCase(matcher) ? diacritics.toUpperCase() : diacritics;
        }
        return matcher;
    }
}

export default DiacriticMatcherHandler;
