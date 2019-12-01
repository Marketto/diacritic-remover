import DiacriticMapperInterface from '../interfaces/diacritic-mapper.interface';
import DiacriticAbstractHandler from './diacritic-abstract-handler.class';
import { isString } from 'util';

class DiacriticRemoverHandler extends DiacriticAbstractHandler {
    protected diacriticTrap(target: DiacriticMapperInterface, char: string): string {
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