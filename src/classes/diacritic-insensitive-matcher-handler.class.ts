import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticInsensitiveMatcherHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        const lowerCaseChar = super.diacriticTrap(target, char).toLowerCase();
        const lowerCaseDiacritics = target.dictionary[lowerCaseChar] || "";

        const insensitiveMatcher = new Set<string>([
            lowerCaseChar,
            lowerCaseChar.toUpperCase(),
            ...lowerCaseDiacritics,
            ...lowerCaseDiacritics.toUpperCase(),
        ]);

        return [...insensitiveMatcher].sort().join("");
    }
}

export default DiacriticInsensitiveMatcherHandler;
