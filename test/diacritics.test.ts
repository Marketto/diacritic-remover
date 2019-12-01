import { expect } from 'chai';
import DiacriticRemover from '../src/diacritic-remover';

const diacriticRemover = new DiacriticRemover();

describe('Diacritic Remover Handler', () => {
    it ('Should return a for à', () => {
        expect(diacriticRemover.à).to.be.equal('a');
    });
    it ('Should return char for missing diacritics', () => {
        expect(diacriticRemover['3']).to.be.equal('3');
    });
    it('Should return empty string for \'', () => {
        expect(diacriticRemover['\'']).to.be.equal('');
    });
});

describe('Diacritic Matcher', () => {
    it ('Should return i diacritics for i, including i itself', () => {
        expect(diacriticRemover.matcher.i).to.include('ì');
        expect(diacriticRemover.matcher.i).to.include('i');
    });
    it('Should include m and c', () => {
        expect(diacriticRemover.matcher.m).to.include('m');
        expect(diacriticRemover.matcher.c).to.include('c');
    });
    it('Should return \'·ʰʼ׳ for empty string', () => {
        expect(diacriticRemover.matcher['']).to.be.equal('\'·ʰʼ׳');
    });
});

describe('Diacritic Insensitive Matcher', () => {
    it ('Should find deacritics', () => {
        const matchero = diacriticRemover.matcher.o;
        const matcherO = diacriticRemover.matcher.O;
        expect(matchero).not.to.be.undefined;
        expect(matcherO).not.to.be.undefined;
        expect(diacriticRemover.insensitiveMatcher.o)
            .to.equal([...matchero, ...matcherO].sort().join(''));
    });
    it('Should include char', () => {
        expect(diacriticRemover.insensitiveMatcher.m).to.include('m');
        expect(diacriticRemover.insensitiveMatcher.c).to.include('c');
    });
    it('Should return \'\'·ʰʼ׳\' for empty string', () => {
        expect(diacriticRemover.insensitiveMatcher['']).to.be.equal('\'·ʰʼ׳');
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
    it ('Should match a lowercase set of chars', () => {
        expect(diacriticRemover.matcherBy(/^[au]$/)).to.be.equal(diacriticRemover.matcher.a+diacriticRemover.matcher.u);
    });
    it ('Should match a uppercase set of chars', () => {
        expect(diacriticRemover.matcherBy(/^[OI]$/)).to.be.equal((diacriticRemover.matcher.i+diacriticRemover.matcher.o).toUpperCase());
    });
    it ('Should match insensitive set of chars', () => {
        const expectedLowerCaseValues = diacriticRemover.matcher.u+diacriticRemover.matcher.c;
        expect(diacriticRemover.matcherBy(/^[uC]$/i)).to.be.equal(expectedLowerCaseValues + expectedLowerCaseValues.toUpperCase());
    });
    it ('Should match missing values from dictionary', () => {
        expect(diacriticRemover.matcherBy(/^[75]/)).to.be.equal('');
    });
});

describe('Diacritic replace', () => {
    it ('Should replace diacritics from àççèß and return access', () => {
        expect(diacriticRemover.replace('àççèß')).to.be.equal('access');
    });
    it ('Should return chars not matching diacritics', () => {
        expect(diacriticRemover.replace('sz33k')).to.be.equal('sz33k');
    });
    it ('Should return "" for ""', () => {
        expect(diacriticRemover.replace('')).to.be.equal('');
    });
});

describe('Case utils', () => {
    it ('Should identify properly lowercase and uppercase chars', () => {
        expect(diacriticRemover.isLowerCase('a')).to.be.true;
        expect(diacriticRemover.isUpperCase('Z')).to.be.true;
        expect(diacriticRemover.isLowerCase('K')).to.be.false;
        expect(diacriticRemover.isUpperCase('z')).to.be.false;
    });
});