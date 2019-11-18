const fs = require('fs');
const path = require('path');

const SRC_I18N_PATH = path.join(__dirname, '../i18n');
const DEST_I18N_ALL = 'all.ts';
const DEST_I18N_PATH = path.join(__dirname, '../i18n', DEST_I18N_ALL);
const readAndParseToJson = jsonName => JSON.parse(fs.readFileSync(jsonName, {encoding: 'utf8'}));
const jsonWriter = fileName => i18nAll => fs.writeFileSync(fileName, `export default ${JSON.stringify(i18nAll)}`, { encoding:'utf8' });
const i18nMerge = i18nList => i18nList.reduce((accumulator, i18n) => {
    Object.entries(i18n).forEach(([l, diacritics]) => {
        if (accumulator[l]) {
            accumulator[l] += diacritics
                .split('')
                .filter(diacritic => !accumulator[l].includes(diacritic))
                .join('');
        } else {
            accumulator[l] = diacritics;
        }
    });
    return accumulator;
}, {});

const jsonNames = fs.readdirSync(SRC_I18N_PATH)
    .filter(file => path.extname(file).toLowerCase() === '.json' && file.toLowerCase() !== DEST_I18N_ALL)
    .map(fileName => path.join(SRC_I18N_PATH, fileName));

return Promise.all(jsonNames.map(readAndParseToJson))
    .then(i18nMerge)
    .then(jsonWriter(DEST_I18N_PATH));
