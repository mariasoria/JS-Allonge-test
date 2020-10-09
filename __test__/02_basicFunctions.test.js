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
describe('Page 18. CALL BY VALUE', () => {
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
describe ('Page 19_end. CALL BY SHARING', () => {
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
// resources: https://www.youtube.com/watch?v=PJGzkoV4EE8
// PURE FUNCTIONS: functions containing NO free variables, but they can contain a closure. Given the same input, will always return the same output
// CLOSURE: function containing ONE or MORE free variables
// Free variables: a variable which is not bound within the function
describe ('Page 21. CLOSURES AND SCOPE', () => {
    it('Closure. Function within a function', () => {
        expect(((x) => (y) => x)(1)(2)).toBe(1);
    });
    it('Same function with no grandparents', () => {
        expect(((x,y,z) => x+y+z)(1,2,3)).toBe(6);
    });
    it('Closure (y) => (x)', () => {
        const x = 5;
        const littleClosure = (y) => x;
        expect(littleClosure(1)).toBe(5);
    });
    it('Closure (x) => (y) => x', () => {
        const x = 2;
        const anotherClosure = (x) => (y) => x;
        expect(anotherClosure(1)(3)).toBe(1);
    });
    it('Closure (x) => (y) => x', () => {
        const suma1 = (x, y, z) => x + y + z; // pure function
        const suma2 = (x) => (y) => (z) => x + y + z; // closure
        expect(suma1(1,2,3) === suma2(1)(2)(3)).toBe(true);
    });
});

// SHADOWY VARIABLES (when a variable has the same name as an ancestor environment's variable)
describe ('Page 24. SHADOWY VARIABLES', () => {
    it('First x is not considered because its child overwrites it with a new x', () => {
        const pureFunction = (x, y) => x+y
        // (x) below is a closure
        expect(((x) => pureFunction)(4)(3, 3)).toBe(6);
    });
    it('A bit more complicated', () => {
        // (x, y) = x+y is a pure function.
        // (x) is a closure.
        const complicatedCase = (x) => (x, y) => (w, z) => (w) => x + y + z;
        expect(complicatedCase(4)(3, 3)(7, 3)(1)).toBe(9);
    });
});


// Until now, we had Anonymous functions. Now we'll see the naming variables.
// 1 - Assigning directly to a name: PI
describe('Page 26-27. That constant coffee craving', () => {
    it('Function invocation naming arguments', () => {
        expect(
            ((PI) =>
                (diameter) => diameter * PI
            )(3.14159265)(2)
            ).toBe(6.2831853)
    });
    it('another try', () => {
        expect(((diameter) => ((PI) => diameter * PI)(3.14159265))(2)).toBe(6.2831853);
    });
    it('Same as the one above', () =>{
        const circle = ((diameter) => ((PI) => diameter * PI)(3.14159265));
        expect(circle(2) === 2 * 3.14159265).toBe(true);
    });
});
// 2 - Creating a variable with "const"
describe('Page 29. const', () => {
    it('Using const to define a variable. Less cost than a function invocation.', () => {
        expect(((diameter) => {
            const PI = 3.14159265;
            return diameter * PI })(2)
            ).toBe(6.2831853);
    }); 
});


// BLOCKS: things that can be put on the right side of an arrow function with {}
// Since we use blocks, we’ve placed a const statement inside it
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


// CONST and SCOPE
describe('Page 33. Const and lexical scope', () => {
    // We assign 3 to PI in the environment "((PI) => diameter_fn(2))", 
    // Afterwards we reassign it again but to 3.14159265 in the environment "((diameter) => diameter * PI)"
    it('Page 33. Closures way. Binding values to names with parameter invocations' , () => {
        expect(
            ((diameter_fn) =>((PI) => diameter_fn(2))(3))(
            ((PI) => (diameter) => diameter * PI))(3.14159265)).toBe(6.2831853);
    });
    // Binding values to names with const works just like binding values to names with parameter invocations, 
    // it uses lexical scope.
    it('page 34. "const" way. Binding values to names with const', () =>{
        expect (
            ((diameter_fn) => {
                const PI = 3; // This value is not even considered during the execution
                return diameter_fn(2) })(
            (() => {
                const PI = 3.14159265;
                return (diameter) => diameter * PI
            })())).toBe(6.2831853);
    });

    it('page 34. Same example but with a externalFunction as parameter', () =>{
        const externalFunction = (() => {
            const PI = 3.14159265;
            return (diameter) => diameter * PI
        })();
        
        expect (
            ((diameter_fn) => {
                const PI = 3; // This value is not even considered during the execution
                return diameter_fn(2)})(externalFunction)).toBe(6.2831853);
    });
    // Both cases:
    // They are looked up in the environment where they are declared.
});


// Are consts also from a shadowy planet?
describe('Page 34. SHADOWING WITH CONST ', () => {
    it('Our "diameter * PI" expression uses the binding for "PI" in the closest parent environment', () => {
        expect((
            ((PI) =>
                ((PI) => (diameter) => diameter * PI)(3.14159265))
            )(3)(2)).toBe(6.2831853);
    });
    // when we bind a variable using a parameter inside another binding, the inner binding shadows the outer binding. 
    // It has effect inside its own scope, but does not affect the binding in the enclosing scope.
    it('Page 35. The inner binding does not overwrite the outer binding', () => {
        expect(((PI) => {
            ((PI) => {})(3); // outer binding
          return (diameter) => diameter * PI; ///this shadows the outer PI binding
        })(3.14159265)(2)).toBe(6.2831853);
    });
    //  Names bound with const shadow enclosing bindings just like the previous one.
    it('Page 36. The inner binding does not overwrite the outer binding also with CONST.', () => {
        expect(((PI) => {
            ((diameter) => {
                const PI = 3.14159265;
                (() => { const PI = 3; })(); // It acts like an independent arrow function
                return diameter * PI; })(2).toBe(6.2831853);
        }));
    });
});


describe('Page 36. Using const inside an IF block', () => {
    it('Page 37. "if" defines a block scope. With the return inside, uses the value of PI from inside de IF', () => {
        const diam = (diameter) => { 
            const PI = 3;
            if (true) {
                const PI = 3.14159265;
                return diameter * PI; 
            }
        }
        expect((diam)(2)).toBe(6.2831853);
    });
    it('Page 37. "if" defines a block scope. With the return outside, uses the value of PI from outside de IF', () => {
        const diam = (diameter) => { 
            const PI = 3.14159265;
            if (true) {
                const PI = 3; }
            return diameter * PI;
        }
        expect((diam)(2)).toBe(6.2831853);
    });
    // we want to bind our names as close to where we need them as possible. 
    // This design rule is called the Principle of Least Privilege.
    // Being able to bind a name inside of a block means that if the name is only needed in the block, 
    // we are not “leaking” its binding to other parts of the code
});


describe('Page 38. REBINDING', () => {
    it('Javascript allows us to rebind new values to names bound with a parameter (ex. n = n - 2)', () => {
        const evenStevens = (n) => {
            if (n === 0) {
              return true;
            }
            else if (n == 1) {
              return false;
            }
            else {
              n = n - 2;
              return evenStevens(n);
            }
          }
        expect(evenStevens(42)).toBe(true);
        // JavaScript does not permit us to rebind a name that has been bound with const (ex. evenStevens)
        // if uncomment the code below, will throw and error.
        /*evenStevens = (n) => { 
            if (n === 0) {
                return true; 
            } else if (n == 1) { 
                return false;
            } else {
                return evenStevens(n - 2); 
            }
        }*/
    });
});


// This syntax binds an anonymous function to a name in an environment, 
// but the function itself remains anonymous:
// const repeat = (str) => str + str
describe('Page 39. NAMING FUNCTIONS', () => {
    // naming functions is very useful even if they don’t get a formal binding, 
    // because the tools display the function's name, and not its binding name

    // the name of the function is a property of the function
    it('Page 40. Placing a name between the function keyword and the argument list names the function', () => {
        const repeat = function repeat (str) { 
            return str + str;
        };
        expect(repeat("hello")).toBe("hellohello");
    });
    // binding name is a property of the environment
    it('Page 40. "double" is the name in the environment (binding name), but "repeat" is the function name', () => {
        const double = function repeat (str) { 
            return str + str;
        };
        // name is a property of the environment
        expect(double.name).toBe("repeat");
    });
    it('Page 41. The name "even" is bound to the function within the function’s body. Same declaration like the function in page 40 (top page)', () => {
        expect((function even (n) { 
            if (n === 0) {
                return true
            }
            else return !even(n - 1) 
        })(5)).toBe(false);
    });
    // If we execute "even" here. It will return: 
    // => "Can't find variable: even"
    // Because "even" is bound within the function itself, but not outside it.
});


describe('Page 42. FUNCTION DECLARATIONS', () => {
    // function fizzbuzz () { ...} <= Declares the function. Although we haven’t actually bound a function to the name fizzbuzz 
    // before we try to use it, JavaScript behaves as if we’d written
    // What Javascript does is to "hoist" (in execution) to the top of its enclosing scope the definition of the fizzbuzz
    // so even though it is declared after, it can be called before of its declaration.
    it('Although fizzbuzz() is declared later in the function, JavaScript behaves as if we’d written', () => {
        expect((function () {
            return fizzbuzz();
          
            function fizzbuzz () {
              return "Fizz" + "Buzz";
            }
        })()).toBe("FizzBuzz");
    });
});

describe('Page 43. FUNCTION DECLARATION CAVEATS', () => {
    // Function declarations are formally only supposed to be made at what we might call the “top level” of a function
    // This function will return: "TypeError: fizzbuzz is not a function"
    it('1st CAVEAT: Function declarations are not supposed to occur inside of blocks (in this case, inside if-else).', () => {
        /*expect((function (camelCase) { 
            return fizzbuzz();
            if (camelCase) { 
                function fizzbuzz () {
                    return "Fizz" + "Buzz"; 
                }
            } else {
                function fizzbuzz () { 
                    return "Fizz" + "Buzz";
                } 
            }
        })(true)).toBe("FizzBuzz");*/
    });
    it('2nd CAVEAT: A function declaration cannot exist inside of any expression, otherwise it’s a function expression', () => {
        // This a function declaration
        function trueDat () { 
            return true;
        }
        // But this is not (The parentheses make this an expression, not a function declaration):
        (function trueDat () { 
            return true }
        )
    });
});

/*describe('', () => {
    it('', () => {
        expect().toBe();
    });
});*/