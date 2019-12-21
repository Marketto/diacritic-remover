import { Component } from '@angular/core';
import DiacriticRemover from '@marketto/diacritic-remover';
const diacriticRemover = new DiacriticRemover();

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
