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
const DiaCriticRemover = require('@marketto/diacritic-remover');
const diacriticRemover = new DiacriticRemover(); //It loads all diacritics by default
```
### ES6
```javascript
import DiaCriticRemover from '@marketto/diacritic-remover';
const diacriticRemover = new DiacriticRemover(); //It loads all diacritics by default
```
### TypeScript
```typescript
import DiaCriticRemover from '@marketto/diacritic-remover';
const diacriticRemover = new DiacriticRemover(); //It loads all diacritics by default
```
### Script
```html
<script src="https://unpkg.com/browse/@marketto/diacritic-remover/dist/diacritic-remover.bundle.min.js"></script>
<script>
    var diacriticRemover = new DiacriticRemover(); //It loads all diacritics by default
</script>
```

## L10N
### NodeJs
```javascript
const i18n_it = require('@marketto/diacritic-remover/i18n/it.json');
const diacriticRemover = new DiacriticRemover(i18n_it);
```
### ES6
```javascript
import * as i18n_it from '@marketto/diacritic-remover/i18n/it.json';
const diacriticRemover = new DiacriticRemover(i18n_it);
```
### TypeScript
```typescript
import * as i18n_it from '@marketto/diacritic-remover/i18n/it.json';
const diacriticRemover = new DiacriticRemover(i18n_it);
```

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

## DIACRITIC ASSET LICENSE AND AUTHOR
I18n diacritics jsons files, the i18n/i18n_all.const.ts file and the I18N_ALL const, inside dist files, use material from Wikipedia article [Diacritic](https://en.wikipedia.org/wiki/Diacritic), which is released under the [Creative Commons Attribution-Share-Alike License 3.0 (CC-BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/)

## AUTHOR
[Marco Ricupero](mailto:marco.ricupero@gmail.com)
