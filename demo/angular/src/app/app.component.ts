import { Component } from '@angular/core';
import DiacriticRemover from '@marketto/diacritic-remover';
import LATIN_DICT from '@marketto/diacritic-remover/dictionaries/latin.json';
import i18nGlobal from '@marketto/diacritic-remover/dictionaries/i18n/global.json';
const diacriticRemover = new DiacriticRemover(LATIN_DICT, i18nGlobal);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private diacriticTextValue = '';
  private cleanTextValue = '';
  public get diacriticText(): string {
    return this.diacriticTextValue;
  }
  public set diacriticText(text: string) {
    this.diacriticTextValue = text;
    this.cleanTextValue = diacriticRemover.replace(text);
  }
  public get cleanText(): string {
    return this.cleanTextValue || ' ';
  }
}
