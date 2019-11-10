import { expect } from 'chai';
import DiacriticRemover from '../src/diacritic-remover';
import * as dictionary from '../i18n/all.json';

const diacriticRemover = new DiacriticRemover(dictionary);

describe('Diacritic Remover Handler', () => {
    it ('Should remove deacritic', () => {
        expect(diacriticRemover.à).to.be.equal('a');
    });
    it ('Should return char for missing diacritics', () => {
        expect(diacriticRemover['3']).to.be.equal('3');
    });
});

describe('Diacritic Matcher', () => {
    it ('Should find deacritics', () => {
        expect(diacriticRemover.matcher.i).not.to.be.undefined;
        expect(diacriticRemover.matcher.i).to.include('ì');
    });
});

describe('Diacritic Insensitive Matcher', () => {
    it ('Should find deacritics', () => {
        const matcherO = diacriticRemover.matcher.o + diacriticRemover.matcher.O;
        expect(diacriticRemover.insensitiveMatcher.o).to.be.equal(matcherO);
    });
});

describe('Diacritic Validator', () => {
    it ('Should validate à with a', () => {
        expect(diacriticRemover.validator.a).to.be.a('RegExp');
        expect(diacriticRemover.validator.a.test('à')).to.be.true;
    });
    it ('Should validate c with c', () => {
        expect(diacriticRemover.validator.c).to.be.a('RegExp');
        expect(diacriticRemover.validator.c.test('c')).to.be.true;
    });
});

describe('Diacritic Insensitive Validator', () => {
    it ('Should validate à and À with a or A', () => {
        expect(diacriticRemover.insensitiveValidator.a).to.be.a('RegExp');
        expect(diacriticRemover.insensitiveValidator.a.test('à')).to.be.true;
        expect(diacriticRemover.insensitiveValidator.a.test('À')).to.be.true;

        expect(diacriticRemover.insensitiveValidator.A).to.be.a('RegExp');
        expect(diacriticRemover.insensitiveValidator.A.test('à')).to.be.true;
        expect(diacriticRemover.insensitiveValidator.A.test('À')).to.be.true;
    });
    it ('Should validate c and C with c or C', () => {
        expect(diacriticRemover.insensitiveValidator.c).to.be.a('RegExp');
        expect(diacriticRemover.insensitiveValidator.c.test('c')).to.be.true;
        expect(diacriticRemover.insensitiveValidator.c.test('C')).to.be.true;
        expect(diacriticRemover.insensitiveValidator.C).to.be.a('RegExp');
        expect(diacriticRemover.insensitiveValidator.C.test('c')).to.be.true;
        expect(diacriticRemover.insensitiveValidator.C.test('C')).to.be.true;
    });
});

describe('Diacritic matcherBy', () => {
    it ('Should match a single char', () => {
        expect(diacriticRemover.matcherBy(/^e$/)).to.be.equal(diacriticRemover.matcher.e);
    });
    it ('Should match a set of chars', () => {
        expect(diacriticRemover.matcherBy(/^[au]$/)).to.be.equal(diacriticRemover.matcher.a+diacriticRemover.matcher.u);
    });
});


describe('Diacritic replace', () => {
    it ('Should replace diacritics from àççèß and return access', () => {
        expect(diacriticRemover.replace('àççèß')).to.be.equal('access');
    });
});