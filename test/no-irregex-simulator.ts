
const root: any = (global || window);

const inject = () => {
    const originalRegExp = root.originalRegExp = RegExp;
    // tslint:disable-next-line: only-arrow-functions
    root.RegExp = function(input: string | RegExp, shim = "") {
        let source;
        let flags;
        if (input instanceof originalRegExp) {
            source = input.source;
            flags = input.flags + shim;
        } else {
            source = input;
            flags = shim;
        }

        if ((/\\[pP]\{[A-Z]\}/).test(source) && (/u/i).test(flags)) {
            throw new Error(`SyntaxError: invalid identity escape in regular expression - ${source} - ${flags}`);
        }

        if (new.target) {
            return new root.originalRegExp(source, flags);
        }
        return root.originalRegExp(source, flags);
    };
};

const restore = () => {
    if ("originalRegExp" in root) {
        root.RegExp = root.originalRegExp;
        delete root.originalRegExp;
    }
};

export {
    inject,
    restore,
};
