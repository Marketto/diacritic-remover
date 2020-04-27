
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Handler", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should return a for à", () => {
            expect(diacriticRemover.à).to.be.equal("a");
        });
        it ("Should return char for missing diacritics", () => {
            expect(diacriticRemover["3"]).to.be.equal("3");
        });
        it("Should return empty string for \'", () => {
            const [target] = Object.entries(diacriticRemover.dictionary)
                .find(([k, v]) => v.includes("'")) || [];
            expect(target).to.be.equal("");
            expect(diacriticRemover["'"]).to.be.equal("");
        });
        it("Should return un-mapped chars", () => {
            expect(diacriticRemover._).to.be.equal("_");
            expect(diacriticRemover["@"]).to.be.equal("@");
            expect(diacriticRemover[" "]).to.be.equal(" ");
            expect(diacriticRemover["]"]).to.be.equal("]");
        });
    });
};

export default test;
