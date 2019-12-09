const fs = require("fs");
const path = require("path");

const SRC_I18N_PATH = path.join(__dirname, "../i18n");
const DEST_I18N_ALL = "i18n-all.const.ts";
const DEST_I18N_PATH = path.join(__dirname, "../src/i18n", DEST_I18N_ALL);
const RW_FILE_OPTIONS = { encoding: "utf8" };
const readAndParseToJson = async jsonName => JSON.parse(fs.readFileSync(jsonName, RW_FILE_OPTIONS));
const readBanner = async () => fs.readFileSync(path.join(SRC_I18N_PATH, "banner"), RW_FILE_OPTIONS);
const jsonWriter = fileName => async i18nAll => fs.writeFileSync(fileName, i18nAll, RW_FILE_OPTIONS);
const i18nMerge = async i18nList => {
    const dictionary = i18nList.reduce((accumulator, i18n) => {
        Object.entries(i18n).forEach(([l, diacritics]) => {
            if (accumulator[l]) {
                accumulator[l] += diacritics
                    .split("")
                    .filter(diacritic => !accumulator[l].includes(diacritic))
                    .join("");
            } else {
                accumulator[l] = diacritics;
            }
        });
        return accumulator;
    }, {});

    return Object.keys(dictionary)
        .sort()
        .reduce((accumulator, l) => ({
            ...accumulator,
            [l]: dictionary[l]
        }), {});
};

const jsonNames = async () => fs.readdirSync(SRC_I18N_PATH)
    .filter(file => path.extname(file).toLowerCase() === ".json" && file.toLowerCase() !== DEST_I18N_ALL)
    .map(fileName => path.join(SRC_I18N_PATH, fileName));

return Promise.all([
    readBanner(),
    jsonNames()
        .then(files => Promise.all(files.map(readAndParseToJson)))
        .then(i18nMerge)
        .then(i18nAll => `export default ${JSON.stringify(i18nAll, null, 4)};`)
])
.then(([banner, i18nTs]) => [banner, i18nTs].join("\n"))
.then(jsonWriter(DEST_I18N_PATH));
