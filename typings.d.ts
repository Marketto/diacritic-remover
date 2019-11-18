
import DiacriticSetInterface from './src/interfaces/diacritic-set.interface';
declare module '*.json' {
    const I18N_ALL: DiacriticSetInterface;
    export default I18N_ALL;
}