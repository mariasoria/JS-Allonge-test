// VALUE (primitive) TYPES:
// number, symbol, boolean, null, undefined and string

// REFERENCE TYPES:
// array, functions

describe('Prelude: Values and Expressions over Coffee', () => {
    it('2 is not "2"', () => {
        expect(2 === '2').toBe(false);
    }); 
    it('true is !== "true"', () => {
        expect(true !== 'true').toBe(true);
    });
    it('true === false is false', () => {
        expect(true === false).toBe(false);
    });
    it('"two" === "five" is false', () => {
        expect('two' === 'five').toBe(false);
    });
    // value types
    it('Evaluating an expression, it is identical to another value of the same type with the same “content".', () => {
        expect((2 + 2 === 4) === (2 !== 5)).toBe(true);
    });
    // reference types
    it('Arrays are generated unique and not identical to any other', () => {
        expect([2-1, 2, 2+1] === [1,2,3]).toBe(false);
    })
});

