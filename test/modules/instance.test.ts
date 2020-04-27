
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Instance", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should have constructor equal to DiacriticRemover", () => {
            expect(diacriticRemover.constructor).to.be.equal(DiacriticRemover);
        });
        it ("Should return undefined for protected diacriticTrap", () => {
            expect(diacriticRemover.diacriticTrap).to.be.undefined;
        });
    });
};

export default test;
