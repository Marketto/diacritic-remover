import { expect } from 'chai';
import DiacriticRemover from '../src/diacritic-remover';
import * as i18n_it from '../i18n/it.json';

describe('Diacritic Remover Handler', () => {
    const diacriticRemover = new DiacriticRemover(i18n_it);

    it ('Should remove deacritic lowercase', () => {
        expect(diacriticRemover.à).to.be.equal('a');
    });
    it ('Should remove deacritic uppercase', () => {
        expect(diacriticRemover.À).to.be.equal('A');
    });
});