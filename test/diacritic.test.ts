import caseInsensitiveMatcherTest from "./modules/case-insensitive-matcher.test";
import caseInsensitiveValidatorTest from "./modules/case-insensitive-validator.test";
import caseSensitiveMatcherTest from "./modules/case-sensitive-matcher.test";
import caseSensitiveValidatorTest from "./modules/case-sensitive-validator.test";
import caseUtilsTest from "./modules/case-utils.test";
import dictionaryHandlerTest from "./modules/dictionary-handler.test";
import handlerTest from "./modules/handler.test";
import instanceTest from "./modules/instance.test";
import matcherByTest from "./modules/matcher-by.test";
import replaceTest from "./modules/replace.test";

describe("DiacriticRemover", () => {
    caseInsensitiveMatcherTest();
    caseInsensitiveValidatorTest();
    caseSensitiveMatcherTest();
    caseSensitiveValidatorTest();
    caseUtilsTest();
    dictionaryHandlerTest();
    handlerTest();
    instanceTest();
    matcherByTest();
    replaceTest();
});
