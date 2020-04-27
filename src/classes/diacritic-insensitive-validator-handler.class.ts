import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";
import DiacriticValidatorHandler from "./diacritic-validator-handler.class";

class DiacriticInsensitiveValidatorHandler extends DiacriticValidatorHandler {
    protected diacriticValidatorTrap(target: IDiacriticMapper, char: string): RegExp {
        const { source } = super.diacriticValidatorTrap(target, char);
        return new RegExp(source, "ui");
    }
}

export default DiacriticInsensitiveValidatorHandler;
