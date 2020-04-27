
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Matcher By", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should match a single char", () => {
            expect(diacriticRemover.matcherBy(/^e$/)).to.be.equal(diacriticRemover.matcher.e);
        });
        it ("Should match a lowercase set of chars", () => {
            expect(diacriticRemover.matcherBy(/^[au]$/)).to.be
                .equal(diacriticRemover.matcher.a + diacriticRemover.matcher.u);
        });
        it ("Should match a uppercase set of chars", () => {
            expect(diacriticRemover.matcherBy(/^[OI]$/)).to.be
                .equal((diacriticRemover.matcher.i + diacriticRemover.matcher.o).toUpperCase());
        });
        it ("Should match insensitive set of chars", () => {
            const expectedLowerCaseValues = diacriticRemover.matcher.c + diacriticRemover.matcher.u;
            expect(diacriticRemover.matcherBy(/^[uC]$/i)).to.be
                .equal(expectedLowerCaseValues + expectedLowerCaseValues.toUpperCase());
        });
        it ("Should match missing values from dictionary", () => {
            expect(diacriticRemover.matcherBy(/^[75]/)).to.be.equal("");
        });
    });
};

export default test;
