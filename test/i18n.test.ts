import { expect } from "chai";
import i18n_es from "../dictionaries/i18n/es.json";
import i18n_it from "../dictionaries/i18n/it.json";
import i18n_ru from "../dictionaries/i18n/ru.json";
import DiacriticRemover from "../src/classes/diacritic-remover.class";

describe("[i18n] Diacritic Remover Handler", () => {
    const diacriticRemover = new DiacriticRemover(i18n_it);

    it ("Should remove deacritic lowercase", () => {
        expect(diacriticRemover.à).to.be.equal("a");
    });
    it ("Should remove deacritic uppercase", () => {
        expect(diacriticRemover.À).to.be.equal("A");
    });
});

describe("[i18n] Multiple dictionaries", () => {
    const diacriticRemover = new DiacriticRemover(i18n_it, i18n_es, i18n_ru);

    it ("Should remove both it, es and ru deacritics", () => {
        expect(diacriticRemover.à).to.be.equal("a");
        expect(diacriticRemover.ё).to.be.equal("е");
        expect(diacriticRemover.ý).to.be.equal("y");
    });
    it("Should not duplicate diacritics in merged dictionary", () => {
        expect(diacriticRemover.matcher.e).to.be.equal("eèéê");
    });
});

describe("[i18n] Diacritic Validator", () => {
    const diacriticRemover = new DiacriticRemover(i18n_es);

    it("Should validate '' only for ''", () => {
        const validator = diacriticRemover.validator[""];
        expect(validator).to.be.a("RegExp");
        expect(validator.test("")).to.be.true;
        expect(validator.test("a")).to.be.false;
        expect(validator.test("4")).to.be.false;
        expect(validator.test("'")).to.be.false;
    });
});

describe("[i18n] Diacritic Insensitive Validator", () => {
    const diacriticRemover = new DiacriticRemover(i18n_ru);

    it("Should validate '' only for ''", () => {
        const insensitiveValidator = diacriticRemover.insensitiveValidator[""];
        expect(insensitiveValidator).to.be.a("RegExp");
        expect(insensitiveValidator.test("")).to.be.true;
        expect(insensitiveValidator.test("a")).to.be.false;
        expect(insensitiveValidator.test("4")).to.be.false;
        expect(insensitiveValidator.test("'")).to.be.false;
    });
});
