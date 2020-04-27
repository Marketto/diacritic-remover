import IDiacriticMapper from "../interfaces/diacritic-mapper.interface";

abstract class DiacriticAbstractHandler implements ProxyHandler<IDiacriticMapper> {
    protected USE_VALIDATOR: boolean = false;

    private FALLBACK_MARKER_MATCHER: string = "̸̵̶̡̢̨̛͓̳̜̪̟̠̻̖̹̣̤̙͚̱͇̬͕̰͍̮͎̝͈̫͐̂̍̅̔͋͂͗̃̈̏̎̄̿͌̑̓̈́̇̆̕͘͜͝ͅ";
    private LOWERCASE_MARKER_MATCHER: string = "\\p{M}";
    private UPPERCASE_MARKER_MATCHER: string = "\\P{M}";

    private IS_MARKER_REPLACING_AVAILABLE = false;

    constructor() {
        try {
            this.IS_MARKER_REPLACING_AVAILABLE = !!(new RegExp(`(${this.LOWERCASE_MARKER_MATCHER})`, "gui"));
        } catch (err) {
            return;
        }
    }

    public get(target: IDiacriticMapper, prop: string, receiver: any): any {
        if (prop.length <= 1) {
            return this.USE_VALIDATOR ? this.diacriticValidatorTrap(target, prop) : this.diacriticTrap(target, prop);
        }
        return Reflect.get(target, prop, receiver);
    }

    protected diacriticTrap(target: IDiacriticMapper, char: string): string {
        return char.replace(this.diacriticValidatorTrap(target, char), "");
    }

    protected diacriticValidatorTrap(target: IDiacriticMapper, char: string): RegExp {
        return this.INSENSITIVE_MARKER_REGEXP;
    }

    protected get INSENSITIVE_MARKER_REGEXP(): RegExp {
        return new RegExp(this.IS_MARKER_REPLACING_AVAILABLE ?
            `(${this.LOWERCASE_MARKER_MATCHER})` :
            `([${this.FALLBACK_MARKER_MATCHER}]*)`, "gui");
    }

    protected get INSENSITIVE_MARKER_MATCHER(): string {
        return this.IS_MARKER_REPLACING_AVAILABLE ?
            `[${this.LOWERCASE_MARKER_MATCHER}${this.UPPERCASE_MARKER_MATCHER}]*` :
            `[${this.FALLBACK_MARKER_MATCHER}${this.FALLBACK_MARKER_MATCHER.toUpperCase()}]*`;
    }
}

export default DiacriticAbstractHandler;
