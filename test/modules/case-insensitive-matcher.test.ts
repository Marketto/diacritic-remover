
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Case Insensitive Matcher", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should find deacritics", () => {
            const matchero = diacriticRemover.matcher.o;
            const matcherO = diacriticRemover.matcher.O;
            expect(matchero).not.to.be.undefined;
            expect(matcherO).not.to.be.undefined;
            expect(diacriticRemover.insensitiveMatcher.o)
                .to.equal(Array.from(new Set([...matchero, ...matcherO])).sort().join(""));
        });
        it("Should include char", () => {
            expect(diacriticRemover.insensitiveMatcher.m).to.include("m");
            expect(diacriticRemover.insensitiveMatcher.m).to.include("M");
            expect(diacriticRemover.insensitiveMatcher.c).to.include("c");
        });
        it("Should include 3 for 3", () => {
            expect(diacriticRemover.insensitiveMatcher[3]).to.include("3");
        });
        it("Should return \'\'·ʰʼ׳\' for empty string", () => {
            expect(diacriticRemover.insensitiveMatcher[""]).to.be.equal("\'·ʰʼ׳");
        });
    });
};

export default test;
