// FLOATING
describe ('Rich aroma: Basic numbers', () => {
    it('A float number equals to 1', () => {
        expect(1.0).toBe(1);
    });
    it('A float number equals to 3', () => {
        expect(1.0+1.0+1.0).toBe(3);
    });
    /*
    A computer’s internal representation for a floating point number is binary, 
    while our literal number was in base ten. This makes no meaningful difference 
    for integers, but it does for fractions, because some fractions base 10 
    do not have exact representations base 2.
    */
    it('A float number with decimals is different', () => {
        expect(0.1+0.1+0.1).toBe(0.30000000000000004);
    });
    /*
    operators have the same order of precedence as when we do it manually
    */
    it('Operations in expressions 1', () => {
        expect(2*5+1).toBe(11);
    });
    it('Operations in expressions 2', () => {
        expect(1 + 2*5).toBe(11);
    });
});

