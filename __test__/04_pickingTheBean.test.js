// Value types: value === value
describe('page 71. Value types', () => {
    it('True/false are value types', () => {
        // we can perform on boolean values, !, &&, and ||
        expect(true === true).toBe(true);
        expect(false === false).toBe(true);
        expect(true !== true).toBe(false);
        expect(false !== true).toBe(true);
        expect(true && true).toBe(true);
        expect(false || false).toBe(false);
        expect(false || true).toBe(true);
    });
});

describe('INTRO: Truthiness and the ternary operator', () => {
    it('page 72. Truthiness', () => {
        // Every other value in JavaScript is “truthy” except:
        // false, null, undefined, NaN, 0, and ''
        // FALSE
        const f = false;
        expect(f).not.toBeNull();
        expect(f).toBeDefined();
        expect(f).not.toBeUndefined();
        expect(f).not.toBeTruthy();
        expect(f).toBeFalsy();
        // NULL
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
        // UNDEFINED
        const u = undefined;
        expect(u).not.toBeNull();
        expect(u).not.toBeDefined();
        expect(u).toBeUndefined();
        expect(u).not.toBeTruthy();
        expect(u).toBeFalsy();
        // NaN
        const nan = NaN;
        expect(nan).not.toBeNull();
        expect(nan).toBeDefined();
        expect(nan).not.toBeUndefined();
        expect(nan).not.toBeTruthy();
        expect(nan).toBeFalsy();
        // ZERO
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
        // ' '
        const empty = '';
        expect(empty).not.toBeNull();
        expect(empty).toBeDefined();
        expect(empty).not.toBeUndefined();
        expect(empty).not.toBeTruthy();
        expect(empty).toBeFalsy();
    });
    it('page 72. Ternary operator', () => {
        // first ? second : third
        // checks if "first" is Truthy, if so, evaluates "second", otherwise evaluates "third"
        // E.g. true ? 'Hello' : 'Good bye'
        expect(true ? 'Hello' : 'Good bye').toBe('Hello');
        expect(0 ? 'Hello' : 'Good bye').toBe('Good bye');
        expect([1,2,3,4,5].length === 5 ? 'Pentatonic' : 'Quasimodal').toBe('Pentatonic');
    });
});

describe('Truthiness and operators', () => {
    it('page 73. ! changes the truthiness of the argument', () => {
        expect(5).toBeTruthy();
        expect(!5).not.toBeTruthy();
        expect(undefined).not.toBeTruthy();
        expect(!undefined).toBeTruthy();
    });
    it('page 73. !! makes true or false depending on if the argument is truthy or falsy, respectively.', () => {
        expect(!!5).toBe(true);
        expect(!!5).toBeTruthy();
        expect(!!undefined).toBe(false);
        expect(!!undefined).toBeFalsy();
    });
});

// The reason why truthiness matters is that the various logical operators 
// (as well as the if statement) actually operate on truthiness, not on boolean values.
describe('|| and && are control-flow operators', () => {
    // !, && and || do not necessarily evaluate to true or false
    it('page 74. && evaluates its left-hand expression', () => {
        // If left-hand expression is falsy, returns that value without evaluating its right-hand expression.
        // If left-hand expression is truthy, evaluates its right-hand expression and returns it
        expect(2 && 1).toBe(1);
        expect(null && undefined).toBeNull();
    });
    it('page 74. || evaluates its left-hand expression', () => {
        // If left-hand expression is truthy, returns that value without evaluating its right-hand expression.
        // If left-hand expression is falsy, evaluates its right-hand expression and returns it
        expect(2 || 1).toBe(2);
        expect(null || undefined).toBeUndefined();
    });
    it('page 74. Control flow operators.', () => {
        // Thanks to this control flow operators (||, &&), the expression on the left is always evaluated, 
        // and its value determines whether the expression on the right is evaluated or not.
        const even = (n) => 
            n === 0 || (n !== 1 && even(n - 2))
        expect(even(42)).toBeTruthy();
        expect(even(42)).toBe(true);
        expect(even(41)).toBeFalsy();
        expect(even(41)).toBe(false);
    });
});

describe('function parameters are eager', () => {
    // In contrast to the behaviour of || and &&, function parameters are always EAGERLY evaluated
    it('page 75. Maximum call stack size exceeded.', () => {
        /*const or = (a, b) => a || b;
        const and = (a, b) => a && b;
        const even = (n) => or(n === 0, and(n !== 1, even(n - 2)));
        expect(even(42)).toBe(true); */ // returns: Maximum call stack size exceeded.
        // because "or(n === 0, and(n !== 1, even(n - 2)))" is calling functions, and JavaScript always 
        // evaluates the expressions for parameters before passing the values to a function to invoke. 
        // This leads to the infinite recursion we fear.
    });
    it('page 76. Solution: passing anonymous functions.', () => {
        // We pass functions that contain the expressions we want to evaluate, 
        // and now we can write our own functions that can delay evaluation.
        const or = (a, b) => a() || b()
        const and = (a, b) => a() && b()
        const even = (n) => or(() => n === 0, () => and(() => n !== 1, () => even(n - 2)))
        expect(even(7)).toBe(false);
    });
});