
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Diacritic replace", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should replace diacritics from àççèß and return access", () => {
            expect(diacriticRemover.replace("àççèß")).to.be.equal("access");
        });
        it ("Should return chars not matching diacritics", () => {
            expect(diacriticRemover.replace("sz33k")).to.be.equal("sz33k");
        });
        it ("Should return 'access control' for 'àççèß control'", () => {
            expect(diacriticRemover.replace("àççèß control")).to.be.equal("access control");
        });
        it ("Should return '' for ''", () => {
            expect(diacriticRemover.replace("")).to.be.equal("");
        });
        it ("Should cleanup markers", () => {
            expect(diacriticRemover.replace("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐e̸̢̹̣̤̙͚̱͓̖̹̻̣͇͗͂̃̈͝s̸̢̡̬͕͕̰̖͍̮̪̬̍̏̎̕͘ͅt̸̢̛̠̟̄̿ o̵̮͌̑k̶̨̖͓͎̝͈̰̹̫͚͓̠̜̓̈́̇̆̑͜ͅ")).to.be.equal("Test ok");
        });
        it ("Should handle special chars", () => {
            expect(diacriticRemover.replace("[0]")).to.be.equal("[0]");
            expect(diacriticRemover.replace("[A]")).to.be.equal("[A]");
            expect(diacriticRemover.replace("[é]")).to.be.equal("[e]");
        });
    });
};

export default test;
