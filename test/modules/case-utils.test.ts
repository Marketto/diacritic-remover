
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Case utils", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should identify properly lowerCase chars", () => {
            expect(diacriticRemover.isLowerCase("a")).to.be.true;
            expect(diacriticRemover.isLowerCase("K")).to.be.false;
        });
        it ("Should not identify non-letter chars as lowerCase", () => {
            expect(diacriticRemover.isLowerCase("3")).to.be.false;
            expect(diacriticRemover.isLowerCase()).to.be.false;
        });
        it ("Should identify properly upperCase chars", () => {
            expect(diacriticRemover.isUpperCase("Z")).to.be.true;
            expect(diacriticRemover.isUpperCase("z")).to.be.false;
        });
        it ("Should not identify non-letter chars as upperCase", () => {
            expect(diacriticRemover.isUpperCase("3")).to.be.false;
            expect(diacriticRemover.isUpperCase()).to.be.false;
        });
    });
};

export default test;