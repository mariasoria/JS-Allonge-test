// functions that return functions
describe('page 57. Partial Application', () => {
    it('Applying a single argument quickly and simply. You decide which argument you will use', () => {
        // It sends (as 2nd parameter) to fn the argument passed by the function which called this one
        const callFirst = (fn, larg) => function (...rest) {
            return fn.call(this, larg, ...rest); 
        }
        // It sends (as last parameter) to fn the argument passed by the function which called this one 
        const callLast = (fn, rarg) => function (...rest) {
            return fn.call(this, ...rest, rarg); 
        }
        const greet = (me, you) => `Hello, ${you}, my name is ${me}`;
        
        const heliosSaysHello = callFirst(greet, 'Helios');
        expect(heliosSaysHello('Eartha')).toBe('Hello, Eartha, my name is Helios');
        const sayHelloToCeline = callLast(greet, 'Celine');
        expect(sayHelloToCeline('Eartha')).toBe('Hello, Celine, my name is Eartha');

        const adamSaysHello = callFirst(greet, 'Adam');
        expect(adamSaysHello('Maria')).toBe('Hello, Maria, my name is Adam');
        const sayHelloToAdam = callLast(greet, 'Adam');
        expect(sayHelloToAdam('Maria')).toBe('Hello, Adam, my name is Maria');
    });
    it('Partial application with more than 1 argument', () => {
        const callLeft = (fn, ...args) => (...remainingArgs) => fn(...args, ...remainingArgs);
        const callRight = (fn, ...args) => (...remainingArgs) => fn(...remainingArgs, ...args);
        const greetings = (me, you) => `Hello, ${you}, my name is ${me}`;
        
        const mariaSaysHello = callLeft(greetings, 'Maria', 'Adam');
        expect(mariaSaysHello()).toBe('Hello, Adam, my name is Maria');
        
        const sayHelloToMaria = callRight(greetings, 'Adam', 'Maria');
        expect(sayHelloToMaria()).toBe('Hello, Maria, my name is Adam');
    });
});

// UNARY:  takes any function and turns it into a function taking exactly one argument.
// Its most common use case is to fix a problem
describe('page 59. UNARY', () => {
    it('Calling a function with one argument --> parseFloat', () => {
        // If you pass one argument in a function that needs only one argument, MAP will go
        // through every element in the array and will apply the function.
        expect(['1', '2', '3'].map(parseFloat)).toEqual(expect.arrayContaining([1, 2, 3]));
    });
    it('Calling a function with 3 arguments: element, index and array. parseInt', () => {
        // JavaScript’s map actually calls each function with three arguments: 
        // The element, the index of the element in the array, and the array itself
        [1, 2, 3].map(function (element, index, arr) { 
            console.log({
                element: element, 
                index: index, 
                arr: arr
            })
        });
        // If you pass in a function taking only one argument, when it actually needs more,
        // it simply ignores the additional arguments.
        // parseInt is defined as: parseInt(string[, radix]). Which means that:
        //  when you call parseInt with map, the index is interpreted as a radix.
        const arrayNan = [1, NaN, NaN];
        expect(['1', '2', '3'].map(parseInt)).toEqual(expect.arrayContaining(arrayNan));
        // We want to convert parseInt into a function taking only one argument.
        
        // With no decorator:
        ['1', '2', '3'].map((s) => parseInt(s))
        // With decorator:
        const unary = (fn) => fn.length === 1 ? fn : function (something) 
        {
            return fn.call(this, something) // calls parseInt with something = '1', then something = '2', and then something = '3'
        }
        // ['1', '2', '3'].map(unary(parseInt)) will get into the block {} 3 times
        expect(['1', '2', '3'].map(unary(parseInt))).toEqual(expect.arrayContaining([1,2,3]));
        // ['1', '2', '3'].map(unary(parseFloat)) won't get into the block
        expect(['1', '2', '3'].map(unary(parseFloat))).toEqual(expect.arrayContaining([1,2,3]));
    });
});

describe('page 61. TAP', () => {
    // It takes a value and returns a function that always returns the value, 
    // but if you pass it a function, it executes the function (for side-effects).
    it('TAP definition', () => {
        const tap = (value) => (fn) => ( typeof(fn) === 'function' && fn(value), value )
        tap('espresso')((it) => {
            expect(`Our drink is '${it}'`).toBe("Our drink is 'espresso'");
        });
        tap('Ola')((greeting) => {
            expect(`'${greeting}' k ase`).toBe("'Ola' k ase");
        });
        expect(tap('Nothing')()).toBe("Nothing");
    });
    it('TAP "uncurried" version', () => {
        // 2 definitions of CURRYING
        // CURRYING: when a function, instead of taking all arguments at one time, 
        // takes the first one and return a new function that takes the second one and 
        // returns a new function which takes the third one, and so forth, until all arguments have been fulfilled
        // CURRYING: translating a function of N arguments to a 'tree' of N nested functions, each taking one argument.
        const tap = (value, fn) => { 
            const curried = (fn) => ( typeof(fn) === 'function' && fn(value), value );
            // returns the value if there's no function.
            // otherwise returns the result of the function
            return fn === undefined ? curried : curried(fn);
        }
        tap('Maria', (greeting) => {
            expect(`Hello, my name is ${greeting}`).toBe('Hello, my name is Maria');
        });
        expect(tap('Maria', null)).toBe('Maria');
    });
    // tap can do more than just act as a debugging aid. 
    // It’s also useful for working with object and instance methods.
});

describe('page 63, MAYBE', () => {
    // It is used to check that the arguments passed into the function are not null.
    // It reduces the logic of checking for nothing to a function call.
    it('Function MAYBE', () => {
        const maybe = (fn) => function (...args) {
            if (args.length === 0) { 
                return;
            } else {
                for (let arg of args) { 
                    if (arg == null) 
                        return; 
                }
                return fn.apply(this, args);
            }
        }
        expect(maybe((a, b, c) => a + b + c)(1, 2, 3)).toBe(6);
        expect(maybe((a, b, c) => a + b + c)(1, null, 3)).toBe(undefined);
        expect(maybe((a, b, c) => a + b + c)(null)).toBe(undefined);
    });
});

describe('page 65. ONCE', () => {
    it('It assures that a function is called only once', () => {
        // You pass it a function, and you get a function back. 
        // That function will call your function once, 
        // and thereafter will return undefined whenever it is called
        const once = (fn) => { 
            let done = false;
            return function () {
                return done ? void 0 : ((done = true), fn.apply(this, arguments))
            } 
        }
        const askedOnBlindDate = once(() => "sure, why not?");
        expect(askedOnBlindDate()).toBe("sure, why not?");
        // the second time I call it, it will be undefined
        expect(askedOnBlindDate()).toBe(undefined);
    });
});

// VARIADIC FUNCTION: It is a function that is designed to accept a variable number of arguments.
describe('page 66. LEFT-VARIADIC FUNCTIONS', () => {
    it('page 66. Make a variadic function gathering arguments (useful for destructuring parameters)', () => {
        const abccc = (a, b, ...c) => { 
            console.log(a); 
            console.log(b); 
            console.log(c);
        };
        abccc(1, 2, 3, 4, 5);
        /*const aaabc = (...a, b, c) => { 
            console.log(a); 
            console.log(b); 
            console.log(c);
        };
        aaabc(1, 2, 3, 4, 5); */ // this throws an error, because ECMAScript 2015 only permits gathering 
        // parameters from the end (right side) of the parameter list. Not the beginning (left side).
        // SOLUTION: LEFT-VARIADIC FUNCTION
    });
    // LEFT-VARIADIC FUNCTION: have one or more fixed arguments, and the rest are gathered into the leftmost argument
    const leftVariadic = (fn) => {
        if (fn.length < 1) {
          return fn;
        } else {
            return function (...args) {
                const gathered = args.slice(0, args.length - fn.length + 1);
                const spread = args.slice(args.length - fn.length + 1);
                return fn.apply(
                    this, [gathered].concat(spread)
                );
            }
        }
    };
    it('page 68. LEFT-VARIADIC FUNCTION.', () => {  
        const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);
        // Gather all parameters except the last one, (those are the variable parameters), and then, takes the last one
        const outputExpected = [["why","hello","there","little"],"droid"];
        expect(butLastAndLast('why', 'hello', 'there', 'little', 'droid')).toEqual(expect.arrayContaining(outputExpected));

        const outputExpected2 = [["how","why"],"what"];
        expect(butLastAndLast("how","why","what")).toEqual(expect.arrayContaining(outputExpected2));
    });
    // DESTRUCTURING WHEN ASSIGNING VARIABLES
    it('right-variadic destructuring. It goes natural for JS', () => {
        const [first, ...butFirst] = ['why', 'hello', 'there', 'little', 'droid'];
        expect(first).toBe("why");
        
        const variableButFirst = ['hello', 'there', 'little', 'droid'];
        expect(butFirst).toEqual(expect.arrayContaining(variableButFirst));
    });
    // As with parameters, we can’t gather values from the left when destructuring an array.
    // So we have 2 options:
    it('1 - left-variadic destructuring. Using the leftVariadic decorator', () => {
        const [butLast, last] = leftVariadic((butLast, last) => 
            [butLast, last])(...['why', 'hello', 'there', 'little', 'droid']);
        
        const butLastDecorator = ['why', 'hello', 'there', 'little'];
        expect(butLast).toEqual(expect.arrayContaining(butLastDecorator));
        
        const lastDecorator = 'droid';
        expect(last).toBe(lastDecorator);
    });
    it('2 - left-variadic destructuring. Writing our own left-gathering function utility', () => {
        // the only thing is that we need to pass to leftGather the length of the expectedArray
        const leftGather = (outputArrayLength) => { return function (inputArray) {
            return [inputArray.slice(0, inputArray.length - outputArrayLength + 1)].concat(
                  inputArray.slice(inputArray.length - outputArrayLength + 1)
                )
            } };
            const [butLast2, last2] = leftGather(2)(['why', 'hello', 'there', 'little', 'droid']);
            
            const butLastDecorator2 = ['why', 'hello', 'there', 'little'];
            expect(butLast2).toEqual(expect.arrayContaining(butLastDecorator2));
            
            const lastDecorator2 = 'droid';
            expect(last2).toBe(lastDecorator2);
    });
});



/*describe('', () => {
    it('', () => {
        expect().toBe();
    });
});*/