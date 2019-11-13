import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import { isString } from 'util';

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
        const upperCase: boolean = target.isUpperCase(char);
        const lowerCaseChar = char.toLowerCase();

        const plainChar = Object.keys(target.matcher)
            .find(c => isString(target.matcher[c]) && target.matcher[c].includes(lowerCaseChar));
        if (upperCase && plainChar) {
            return plainChar.toUpperCase();
        }
        return plainChar || char;
    }
}

export default DiacriticRemoverHandler;