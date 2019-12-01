import { expect } from 'chai';
import DiacriticRemover from '../src/diacritic-remover';
import * as i18n_it from '../i18n/it.json';
import * as i18n_ru from '../i18n/ru.json';
import * as i18n_es from '../i18n/es.json';

describe('Diacritic Remover Handler', () => {
    const diacriticRemover = new DiacriticRemover(i18n_it);

    it ('Should remove deacritic lowercase', () => {
        expect(diacriticRemover.à).to.be.equal('a');
    });
    it ('Should remove deacritic uppercase', () => {
        expect(diacriticRemover.À).to.be.equal('A');
    });
});

describe('Multiple dictionaries', () => {
    const diacriticRemover = new DiacriticRemover(i18n_it, i18n_es, i18n_ru);

    it ('Should remove both it, es and ru deacritics', () => {
        expect(diacriticRemover.à).to.be.equal('a');
        expect(diacriticRemover.ё).to.be.equal('е');
        expect(diacriticRemover.ý).to.be.equal('y');
    });
    it('Should not duplicate diacritics in merged dictionary', () => {
        expect(diacriticRemover.matcher.e).to.be.equal("eèéê");
    });
});