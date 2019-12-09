import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticAbstractHandler from "./diacritic-abstract-handler.class";

class DiacriticInsensitiveValidatorHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: IDiacriticMapper, char: string): RegExp {
        super.diacriticTrap(target, char);
        return new RegExp(`[${char}${target.insensitiveMatcher[char] || ""}]`, "ui");
    }
}

export default DiacriticInsensitiveValidatorHandler;
