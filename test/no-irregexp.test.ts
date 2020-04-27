// tslint:disable: no-unused-expression
import * as noIrregexSimulator from "./no-irregex-simulator";

import caseInsensitiveMatcherTest from "./modules/case-insensitive-matcher.test";
import caseInsensitiveValidatorTest from "./modules/case-insensitive-validator.test";
import caseSensitiveMatcherTest from "./modules/case-sensitive-matcher.test";
import caseSensitiveValidatorTest from "./modules/case-sensitive-validator.test";
import handlerTest from "./modules/handler.test";
import matcherByTest from "./modules/matcher-by.test";
import replaceTest from "./modules/replace.test";

describe("No IrRegExp Engine", function() {
    this.beforeEach(() => noIrregexSimulator.inject());
    this.afterEach(() => noIrregexSimulator.restore());
    caseInsensitiveMatcherTest();
    caseInsensitiveValidatorTest();
    caseSensitiveMatcherTest();
    caseSensitiveValidatorTest();
    handlerTest();
    matcherByTest();
    replaceTest();
});
