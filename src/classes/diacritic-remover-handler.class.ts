import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import { isString } from 'util';

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        super.diacriticTrap(target, char);
        const upperCase: boolean = target.isUpperCase(char);
        const lowerCaseChar = char.toLowerCase();

        const plainChar = Object.keys(target.dictionary)
            .find(c => isString(target.dictionary[c]) && target.dictionary[c].includes(lowerCaseChar));
        if (upperCase && plainChar) {
            return plainChar.toUpperCase();
        }
        return plainChar || char;
    }
}

export default DiacriticRemoverHandler;