
// tslint:disable: no-unused-expression
import { expect } from "chai";
import i18n_global from "../dictionaries/i18n/global.json";
import LATIN_DICT from "../dictionaries/latin.json";
import DiacriticRemover from "../src/diacritic-remover";

const diacriticRemover = new DiacriticRemover(LATIN_DICT, i18n_global);

describe("Diacritic Dictionary Handler", () => {
    it ("Should contain empty string", () => {
        expect(diacriticRemover.dictionary[""]).to.be.equal("'·ʰʼ׳");
    });
});

describe("Diacritic Remover Handler", () => {
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

describe("Diacritic Matcher", () => {
    it ("Should return i diacritics for i, including i itself", () => {
        expect(diacriticRemover.matcher.i).to.include("ì");
        expect(diacriticRemover.matcher.i).to.include("i");
    });
    it("Should include m and c", () => {
        expect(diacriticRemover.matcher.m).to.include("m");
        expect(diacriticRemover.matcher.c).to.include("c");
    });
    it("Should return \'·ʰʼ׳ for empty string", () => {
        expect(diacriticRemover.matcher[""]).to.be.equal("\'·ʰʼ׳");
    });
});

describe("Diacritic Insensitive Matcher", () => {
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
        expect(diacriticRemover.insensitiveMatcher.c).to.include("c");
    });
    it("Should return \'\'·ʰʼ׳\' for empty string", () => {
        expect(diacriticRemover.insensitiveMatcher[""]).to.be.equal("\'·ʰʼ׳");
    });
});

describe("Diacritic Validator", () => {
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
    it ("Should validate j with j", () => {
        expect(diacriticRemover.validator.j).to.be.a("RegExp");
        expect(diacriticRemover.validator.j.test("j")).to.be.true;
    });
    it("Should validate t with markers", () => {
        expect(diacriticRemover.validator.t).to.be.a("RegExp");
        expect(diacriticRemover.validator.t.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.false;
        expect(diacriticRemover.validator.T.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
    });
});

describe("Diacritic Insensitive Validator", () => {
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

    it("Should validate t and T with markers", () => {
        expect(diacriticRemover.validator.t).to.be.a("RegExp");
        expect(diacriticRemover.insensitiveValidator.t.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
        expect(diacriticRemover.insensitiveValidator.T.test("T̸̡̢͓̳̜̪̟̳̠̻̖͐̂̍̅̔̂͋͂͐")).to.be.true;
    });

    it ("Should validate 3 with 3", () => {
        expect(diacriticRemover.insensitiveValidator[3]).to.be.a("RegExp");
        expect(diacriticRemover.insensitiveValidator[3].test("3")).to.be.true;
    });
});

describe("Diacritic matcherBy", () => {
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

describe("Diacritic replace", () => {
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

describe("Case utils", () => {
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