
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Case Sensitive Matcher", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should return i diacritics for i, including i itself", () => {
            expect(diacriticRemover.matcher.i).to.include("ì");
            expect(diacriticRemover.matcher.i).to.include("i");
            expect(diacriticRemover.matcher.i).to.not.include("I");
        });
        it("Should include m and c", () => {
            expect(diacriticRemover.matcher.m).to.include("m");
            expect(diacriticRemover.matcher.c).to.include("c");
        });
        it("Should include 3 for 3", () => {
            expect(diacriticRemover.matcher[3]).to.include("3");
        });
        it("Should return \'·ʰʼ׳ for empty string", () => {
            expect(diacriticRemover.matcher[""]).to.be.equal("\'·ʰʼ׳");
        });
    });
};

export default test;
