
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Case Sensitive Validator", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should validate à and a with a", () => {
            expect(diacriticRemover.validator.a).to.be.a("RegExp");
            expect(diacriticRemover.validator.a.test("à")).to.be.true;
            expect(diacriticRemover.validator.a.test("a")).to.be.true;
        });
        it ("Should validate Ì and I with I", () => {
            expect(diacriticRemover.validator.I).to.be.a("RegExp");
            expect(diacriticRemover.validator.I.test("Ì")).to.be.true;
            expect(diacriticRemover.validator.I.test("I")).to.be.true;
        });
        it ("Should not validate Ì and I with i", () => {
            expect(diacriticRemover.validator.i).to.be.a("RegExp");
            expect(diacriticRemover.validator.i.test("Ì")).to.be.false;
            expect(diacriticRemover.validator.i.test("I")).to.be.false;
        });
        it ("Should not validate a and à with A", () => {
            expect(diacriticRemover.validator.A).to.be.a("RegExp");
            expect(diacriticRemover.validator.A.test("à")).to.be.false;
            expect(diacriticRemover.validator.A.test("a")).to.be.false;
        });
        it ("Should validate c and ç with c", () => {
            expect(diacriticRemover.validator.c).to.be.a("RegExp");
            expect(diacriticRemover.validator.c.test("c")).to.be.true;
            expect(diacriticRemover.validator.c.test("ç")).to.be.true;
        });
        it ("Should validate 7 with 7", () => {
            expect(diacriticRemover.validator[7]).to.be.a("RegExp");
            expect(diacriticRemover.validator[7].test("7")).to.be.true;
        });
        it ("Should validate j with j but not J", () => {
            expect(diacriticRemover.validator.j).to.be.a("RegExp");
            expect(diacriticRemover.validator.j.test("j")).to.be.true;
        });
        it("Should validate t with t+markers but not T+markers", () => {
            expect(diacriticRemover.validator.t).to.be.a("RegExp");
            expect(diacriticRemover.validator.t.test("t̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
            expect(diacriticRemover.validator.t.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.false;

            expect(diacriticRemover.validator.T).to.be.a("RegExp");
            expect(diacriticRemover.validator.T.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
            expect(diacriticRemover.validator.T.test("t̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.false;
        });
    });
};

export default test;
