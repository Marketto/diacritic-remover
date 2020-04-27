
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Dictionary Handler", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should contain empty string", () => {
            expect(diacriticRemover.dictionary[""]).to.be.equal("'·ʰʼ׳");
        });
    });
};

export default test;
