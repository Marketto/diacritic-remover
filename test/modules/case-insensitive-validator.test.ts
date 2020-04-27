
// tslint:disable: no-unused-expression
import { expect } from "chai";
import DiacriticRemover from "../../src/classes/diacritic-remover.class";

const test = () => {
    describe("Case Insensitive Validator", function() {
        let diacriticRemover: DiacriticRemover;
        this.beforeEach(() => diacriticRemover = new DiacriticRemover());

        it ("Should validate à and À with a or A", () => {
            expect(diacriticRemover.insensitiveValidator.a).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.a.test("à")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.a.test("À")).to.be.true;

            expect(diacriticRemover.insensitiveValidator.A).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.A.test("à")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.A.test("À")).to.be.true;
        });
        it ("Should validate c and C with c or C", () => {
            expect(diacriticRemover.insensitiveValidator.c).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.c.test("c")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.c.test("ç")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.c.test("C")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.c.test("Ç")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.c.test("z")).to.be.false;
            expect(diacriticRemover.insensitiveValidator.c.test("Z")).to.be.false;
            expect(diacriticRemover.insensitiveValidator.C).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.C.test("c")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.C.test("ç")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.C.test("C")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.C.test("Ç")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.c.test("z")).to.be.false;
            expect(diacriticRemover.insensitiveValidator.c.test("Z")).to.be.false;
        });
        it ("Should validate k and K with k or K", () => {
            expect(diacriticRemover.insensitiveValidator.k).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.k.test("k")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.k.test("K")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.K).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator.K.test("k")).to.be.true;
            expect(diacriticRemover.insensitiveValidator.K.test("K")).to.be.true;
        });

        it("Should validate t with t or T markers", () => {
            const insensitiveValidator = diacriticRemover.insensitiveValidator.t;
            expect(insensitiveValidator).to.be.a("RegExp");
            expect(insensitiveValidator.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
            expect(insensitiveValidator.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
        });

        it("Should validate T with t or T markers", () => {
            const insensitiveValidator = diacriticRemover.insensitiveValidator.T;
            expect(insensitiveValidator).to.be.a("RegExp");
            expect(insensitiveValidator.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
            expect(insensitiveValidator.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
        });

        it ("Should validate 3 with 3", () => {
            expect(diacriticRemover.insensitiveValidator[3]).to.be.a("RegExp");
            expect(diacriticRemover.insensitiveValidator[3].test("3")).to.be.true;
        });
    });
};

export default test;
