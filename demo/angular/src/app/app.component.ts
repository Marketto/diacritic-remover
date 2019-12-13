import { Component } from '@angular/core';
import DiacriticRemover from '@marketto/diacritic-remover';
const LATIN_DICT = require('@marketto/diacritic-remover/dictionaries/latin.json');
const i18nGlobal = require('@marketto/diacritic-remover/dictionaries/i18n/global.json');
const diacriticRemover = new DiacriticRemover(LATIN_DICT, i18nGlobal);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public diacriticText = '';
  public get cleanText(): string {
    return diacriticRemover.replace(this.diacriticText) || ' ';
  }
}
