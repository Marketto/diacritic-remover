# diacritic-remover

[![NPM Version](https://img.shields.io/npm/v/@marketto/diacritic-remover.svg)](https://www.npmjs.com/package/@marketto/diacritic-remover)
[![NPM Downloads](https://img.shields.io/npm/dm/@marketto/diacritic-remover.svg)](https://www.npmjs.com/package/@marketto/diacritic-remover)
[![Dependency status](https://david-dm.org/Marketto/diacritic-remover.svg)](https://david-dm.org/Marketto/diacritic-remover)
[![Dev dependency status](https://david-dm.org/Marketto/diacritic-remover/dev-status.svg)](https://david-dm.org/Marketto/diacritic-remover?type=dev)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Marketto_diacritic-remover&metric=alert_status)](https://sonarcloud.io/dashboard/index/Marketto_diacritic-remover)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Marketto_diacritic-remover&metric=coverage)](https://sonarcloud.io/dashboard/index/Marketto_diacritic-remover)
[![Maintainability](https://sonarcloud.io/api/project_badges/measure?project=Marketto_diacritic-remover&metric=sqale_rating)](https://sonarcloud.io/dashboard/index/Marketto_diacritic-remover)
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=Marketto_diacritic-remover&metric=reliability_rating)](https://sonarcloud.io/dashboard/index/Marketto_diacritic-remover)
![Build Status](http://ci.marketto.it/buildStatus/icon?job=diacritic-remover)
[![LICENSE](https://img.shields.io/badge/licese-MIT-gold.svg)](https://github.com/Marketto/diacritic-remover/blob/master/LICENSE)
[![Blog](https://img.shields.io/badge/blog-marketto-blue.svg)](http://blog.marketto.it)
[![Buy me a coffee](https://img.shields.io/badge/Ko--fi-donate-blueviolet)](https://ko-fi.com/marketto)

Typescript library to handle and remove diacritics from strings

## [CHANGELOG](CHANGELOG.md)

## INSTALLATION
### NPM
```{r, engine='bash', global_install}
npm i -s @marketto/diacritic-remover
```
### YARN
```{r, engine='bash', global_install}
yarn add @marketto/diacritic-remover
```

### NodeJs
```javascript
const DiacriticRemover = require('@marketto/diacritic-remover');
const diacriticRemover = new DiacriticRemover();
```
### ES6
```javascript
import DiacriticRemover from '@marketto/diacritic-remover';
const diacriticRemover = new DiacriticRemover();
```
### TypeScript
```typescript
import DiacriticRemover from '@marketto/diacritic-remover';
const diacriticRemover = new DiacriticRemover();
```
### Script
```html
<script src="https://unpkg.com/browse/@marketto/diacritic-remover/dist/diacritic-remover.bundle.min.js"></script>
<script>
    const diacriticRemover = new DiacriticRemover(...dictionaries)
</script>
```

## L10N
### NodeJs
```javascript
const DiacriticRemover = require('@marketto/diacritic-remover');
const i18n_global = require('@marketto/diacritic-remover/dictionaries/i18n/global.json');
const i18n_it = require('@marketto/diacritic-remover/dictionaries/i18n/it.json');
const diacriticRemover = new DiacriticRemover(i18n_it);
```
### ES6
```javascript
import DiacriticRemover from '@marketto/diacritic-remover';
import i18n_global from '@marketto/diacritic-remover/dictionaries/i18n/global.json';
import i18n_it from '@marketto/diacritic-remover/dictionaries/i18n/it.json';
const diacriticRemover = new DiacriticRemover(i18n_it);
```
### TypeScript
```typescript
import DiacriticRemover from '@marketto/diacritic-remover';
import i18n_global from '@marketto/diacritic-remover/dictionaries/i18n/global.json';
import i18n_it from '@marketto/diacritic-remover/dictionaries/i18n/it.json';
const diacriticRemover = new DiacriticRemover(i18n_it);
```
### Script
```html
<script src="https://unpkg.com/browse/@marketto/diacritic-remover/dist/diacritic-remover.bundle.min.js"></script>
<script>
    Promise.all([
        fetch("https://unpkg.com/browse/@marketto/diacritic-remover/dictionaries/i18n/it.json")
        fetch("https://unpkg.com/browse/@marketto/diacritic-remover/dictionaries/i18n/global.json")
    ])
        .then(responses => responses.map(response => response.json()))
        .then(dictionaries => new DiacriticRemover(...dictionaries));
</script>
```

## DEMO
* [Angular](https://github.com/Marketto/diacritic-remover/tree/master/demo/angular)
* [Express](https://github.com/Marketto/diacritic-remover/tree/master/demo/express)
* [jQuery](https://github.com/Marketto/diacritic-remover/tree/master/demo/jquery)
* [React](https://github.com/Marketto/diacritic-remover/tree/master/demo/react)
* [Svelte](https://github.com/Marketto/diacritic-remover/tree/master/demo/svelte)
* [Vue](https://github.com/Marketto/diacritic-remover/tree/master/demo/vue)

## USAGE

### Replace string diacritics
```javascript
diacriticRemover.replace('àçcèß'); //access
```

### Char diacritic remover
```javascript
diacriticRemover.à; //a
```

### Char diacritic map
```javascript
diacriticRemover.matcher.i; //íîïi̇řìįīi
```

### Char diacritic matcher (RegExp)
```javascript
diacriticRemover.validator.a.test('à'); //true
diacriticRemover.validator.a.test('A'); //true
diacriticRemover.validator.e.test('à'); //false
```

### Char diacritic case insensitive matcher(RegExp)
```javascript
diacriticRemover.insensitiveValidator.a.test('à'); //true
diacriticRemover.insensitiveValidator.a.test('À'); //true
diacriticRemover.insensitiveValidator.A.test('à'); //true
diacriticRemover.insensitiveValidator.A.test('À'); //true
```

### Get diacritics by RegExp
```javascript
diacriticRemover.matcherBy(/^[au]$/); //áäâàåÄąāãăúûüùůŭųūư
```

## LICENSE
[MIT License](LICENSE)

## DIACRITIC ASSETS LICENSE AND AUTHOR

### [Latin Diacritic Dictionary](dictionaries/README.MD)
Latin diacritic json file use material from Wikitionary article [Latin script](https://en.wiktionary.org/wiki/Appendix:Latin_script),
which is released under the [Creative Commons Attribution-Share-Alike License 3.0 (CC-BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/)

### [I18N Diacritic Dictionaries](dictionaries/i18n/README.MD)
These diacritic i18n json files use material from Wikipedia article [Diacritic](https://en.wikipedia.org/wiki/Diacritic),
which is released under the [Creative Commons Attribution-Share-Alike License 3.0 (CC-BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/)

## AUTHOR
[Marco Ricupero](mailto:marco.ricupero@gmail.com)
