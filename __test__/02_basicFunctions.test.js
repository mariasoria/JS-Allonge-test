// THE FIRST SIP: BASIC FUNCTIONS

const {
    zeroFunction, 
    codeStatementImplicitReturn, 
    codeStatementWithoutReturning,
    codeStatementWithReturn, 
    emptyBlock, 
    sum
} = require ('../src/02_basicFunctions.js');
 

// VALUE TYPES share the same identity if they have the same contents. Reference types do not
describe('Page 8', () => {
    const testFunct = zeroFunction;
    it('Functions testing', () => {
        expect(zeroFunction).toEqual(testFunct);
    });
    it('function 0 === (() => 0) is false', () => {
        expect(zeroFunction === (() => 1)).toBe(false);
    });
    it('function 0 is 0', () => {
        expect((() => 0)()).toBe(0);
    });
});

describe('Page 9', () => {
    it('function 0 is 0', () => {
        expect((() => 1)()).toBe(1);
    }); 
    it('function "Hello, JavaScript" is Hello, JavaScript', () => {
        expect((() => "Hello, JavaScript")()).toBe("Hello, JavaScript");
    });
});

describe('Page 10', () => {
    it('Evaluates the argument on the right', () => {
        expect((() => (1 + 1, 2 + 2))()).toBe(4);
    });
});

describe('Page 11', () => {
    it('A block with no statements should be undefined', () => {
        expect((() => {})()).toBeUndefined();
    });
    it('A void function returns undefinded. No value it is still a value: undefined', () => {
        expect((() => {})() === undefined).toBe(true);
    });
});
// every undefined is identical to every other undefined

describe('Page 12', () => {
    it('void is always undefined', () => {
        expect(void 0).toBeUndefined();
        expect(void 1).toBeUndefined();
        expect(void (2+2)).toBeUndefined();
    });
});

// No return in the function but { } will make the function undefined
describe('Page 14', () => {
    it('A block of code returning undefined', () => {
        expect(codeStatementWithoutReturning()).toBeUndefined();
    });
    it('One code statement return the result into arrow func', () => {
        expect(codeStatementImplicitReturn()).toEqual(4);
    });
    it('A code statement with return in it', () => {
        expect(codeStatementWithReturn()).toEqual(2);
    });
    it('Function returns 0', () => {
        expect((() => { return 0 })()).toBe(0);
    });
});

describe('Page 15', () => {
    it('An empty block should be undefined', () => {
        expect(emptyBlock()).toBeUndefined();
    })
    it('A function, that returns a function, that returns true', () => {
        expect((() => () => true)()()).toBe(true);
    });
});

describe('Page 16', () => {
    it('Basic functions with arguments_1', () => {
        expect(((diameter) => diameter * 3.14159265)(2)).toEqual(6.2831853);
        expect(((diameter) => diameter * 3.14159265)(2)).toBeCloseTo(6.28);
    });
    it('Basic functions with arguments_2', () => {
        expect(((room, board) => room + board)(800, 150)).toBe(950);
    });
});

// CALL BY VALUE
// When you write some code that appears to apply a function to an expression or expressions, 
// JavaScript evaluates all of those expressions and applies the functions to the resulting value(s)
describe('Page 18', () => {
    // The expression 1 + 1 was evaluated first, resulting in 2. 
    // Then our circumference function was applied to 2.
    it('Call by value', () => {
        expect(((diameter) => diameter * 3.14159265)(1+1)).toEqual(6.2831853);
    });
});

// When JavaScript binds a value-type to a name, it makes a copy of the value and 
// places the copy in the environment.
describe('Page 19 - Variables and bindings', () => {
    it('Function with one argument', () => {
        expect(((x) => x)(2)).toBe(2);
    });
    it('Functions with multiple arguments', () => {
        expect(sum(1, 2)).toBe(3);
    }) ;
});

// CALL BY SHARING
// JavaScript does not place copies of reference values in any environment. 
// JavaScript places references to reference types in environments, and when the value needs to be used,
// JavaScript uses the reference to obtain the original
describe ('Page 19_end', () => {
    it('a function will not modify a primitive type passed as argument', () => {
        const number = 5;
        const times = n => {
          n = n * 2;
          return n;
        };
        const number2 = times(number);
        expect(number).toBe(5); // did not modify it
        expect(number2).toBe(10); // new one modified
      });
      it('a function will modify a reference passed as argument when modifying its attributes (like java)', () => {
        const original = {
          a: 10,
          b: 20
        };
  
        const times = n => {
          n.a = n.a * 2;
          n.b = n.b * 2;
          return n;
        };
  
        const modified = times(original);
        expect(original).toStrictEqual(modified);
      });
      it('a function will not modify a reference passed as argument if you create a new one', () => {
        const original = {
          a: 10,
          b: 20
        };
  
        const times = n => {
          n = {
            a: n.a * 2,
            b: n.b * 2
          };
          return n;
        };
  
        const modified = times(original);
        expect(original).not.toStrictEqual(modified); // compares two different references
        expect(original.a).toBe(10);
        expect(modified.a).toBe(20);
      });
});

// CLOSURES AND SCOPE
// PURE FUNCTIONS: functions containing NO free variables, but they can contain a closure
// CLOSURE: function containing ONE or MORE free variables
// Free variables: a variable which is not bound within the function
describe ('Page 21', () => {
    it('Function within a function', () => {
        expect(((x) => (y) => x)(1)(2)).toBe(1);
    });
    it('Same function with no grandparents', () => {
        expect(((x,y,z) => x+y+z)(1,2,3)).toBe(6);
    });
});

// SHADOWY VARIABLES (when a variable has the same name as an ancestor environment's variable)
describe ('Page 24', () => {
    it('First x is not considered because its child overwrites it with a new x', () => {
        expect(((x) => (x, y) => x+y)(4)(3, 3)).toBe(6);
    });
});


describe('Page 26-27. That constant coffee craving', () => {
    it('Function invocation naming arguments', () => {
        expect(
            ((PI) =>
                (diameter) => diameter * PI
            )(3.14159265)(2)
            ).toBe(6.2831853)
    });
    it('another try', () => {
        expect((
            (diameter) =>
                ((PI) => diameter * PI)(3.14159265))
            (2))
            .toBe(6.2831853);
    });
});

describe('Page 29. const', () => {
    it('Using const to define a variable. Less cost than a function invocation.', () => {
        expect(((diameter) => {
            const PI = 3.14159265;
            return diameter * PI })(2)
            ).toBe(6.2831853);
    }); 
});

// blocks: things that can be put on the right side of an arrow function with {}
describe('Page 31. Nested blocks', () => {
    it('Page 32. "If" statement with a block in the "else"', () => {
        expect(((n) => {
            const even = (x) => {
                if (x === 0) return true;
                else {
                    const odd = (y) => !even(y);
                    return odd(x - 1); 
                }
            }
            return even(n) })(2))
        .toBe(true);
        expect(((n) => {
            const even = (x) => {
                if (x === 0) return true;
                else {
                    const odd = (y) => !even(y);
                    return odd(x - 1); 
                }
            }
            return even(n) })(3))
        .toBe(false);
    });
});

