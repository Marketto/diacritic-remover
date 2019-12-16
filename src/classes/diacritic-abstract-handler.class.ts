import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";

abstract class DiacriticAbstractHandler implements ProxyHandler<IDiacriticMapper> {
    protected LOWERCASE_MARKER_MATCHER: string = "\\p{M}";
    protected UPPERCASE_MARKER_MATCHER: string = "\\P{M}";
    protected MARKER_REGEXP: RegExp = new RegExp(`(${this.LOWERCASE_MARKER_MATCHER})`, "gui");

    public get(target: IDiacriticMapper, prop: string, receiver: any): any {
      if (prop.length <= 1) {
        return this.diacriticTrap(target, prop);
      }
      return Reflect.get(target, prop, receiver);
    }

    protected diacriticTrap(target: IDiacriticMapper, char: string): any {
        return char.replace(this.MARKER_REGEXP, "");
    }
}

export default DiacriticAbstractHandler;
