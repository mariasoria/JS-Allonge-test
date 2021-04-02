// COMPOSING AND DECOMPOSING DATA
describe('Arrays and destructuring arguments', () => {
    // COMPOSING: Putting an array together.
    it('page 78. Array literals. [ ] ', () => {
        const emptyArray = [];
        expect(emptyArray).toStrictEqual([]);
        expect([2, 3, 4]).toStrictEqual([2,3,4]);
        expect([ 2, 3, 2+2]).toStrictEqual([2,3,4]);
        const wrap = (something) => [something]; // same as => { return [something]};
        expect(wrap("lunch")).toStrictEqual(["lunch"]);
    });
    // Array literals are expressions, and arrays are reference types.
    it('When we evaluate an array literal, we create a new (distinct) array with the same elements', () => {
        expect([2 + 2] === [2 + 2]).toBe(false);
        expect([2 + 2] == [2 + 2]).toBe(false);
        const array_of_one = () => [1];
        expect(array_of_one() === array_of_one()).toBe(false);
        expect(array_of_one() == array_of_one()).toBe(false);
    });
    // DECOMPOSING: Opposite of putting an array together (create it): extract elements
    // 1st option to extract elements from arrays
    it('page 79. Element references using [index]', () => {
        const oneTwoThree = ["one", "two", "three"];
        expect(oneTwoThree[0]).toEqual("one");
        expect(oneTwoThree[1]).toEqual("two");
        expect(oneTwoThree[2]).toEqual("three");
        // arrays store references to the things you put in them
        const x = [];
        const a = [x]; // x declared above is in a
        expect(a[0] === x).toBe(true);
    });
    // 2nd option to extract elements from arrays
    it('page 80. Destructuring arrays', () => {
        // wrapping using a block
        // statement like: on the left is a name to be bound (value),
        // and on the right is an array literal (a template for constructing an array)
        const wrap = (something) => { 
            const wrapped = [something];
            return wrapped; 
        }
        expect(wrap("package")).toStrictEqual(["package"]);
        // unwrapping would be like destructuring
        // we can reverse the statement: place the template on the left and a value on the right
        const unwrap = (wrappedelse) => {
            const [somethingelse] = wrappedelse;
            return somethingelse;
        }
        expect(unwrap(["present"])).toStrictEqual("present");
        // destructuring with more that one element
        const surname = (name) => { 
            const [first, last] = name;
            return last; 
        }
        expect(surname(["Reginald", "Braithwaite"])).toBe("Braithwaite");
        // destructuring can nest as well
        const description = (nameAndOccupation) => {
            const [[first, last], occupation] = nameAndOccupation;
            return `${first} is a ${occupation}`; 
        }
        expect(description([["Reginald", "Braithwaite"], "programmer"])).toStrictEqual("Reginald is a programmer");
    });
    it('page 81. Gathering: to extract arrays from arrays with ... (destructuring with ...)', () => {
        // GATHERING: using ... to destructure
        const [car, ...cdr] = [1, 2, 3, 4, 5];
        expect(car).toBe(1);
        expect(cdr).toStrictEqual([2, 3, 4, 5]);
        // SPREADING (reverse of gathering): using ... in a literal to insert elements
        const oneTwoThree = ["one", "two", "three"];
        expect(["zero", ...oneTwoThree]).toStrictEqual(["zero","one","two","three"]);
    });
    it('page 82. Destructuring is not a pattern matching', () => {
        // When destructuring  if JS can't assign something, binds it as "undefined"
        const [what] = [];
        expect(what).toBeUndefined();
        const [which, how, who] = ["duck feet", "tiger tail"];
        expect(who).toBeUndefined();
    });
    it('page 83. Destructuring to return several things at once', () => {
        const description = (nameAndOccupation) => {
            if(nameAndOccupation.length > 2) {
                return ["", "occupation missing"];
            }
            else {
                const [[first, last], occupation] = nameAndOccupation;
                return [`${first} is a ${occupation}`, "ok"];
            }
        }
        const [reg, status] = description([["Reginald", "Braithwaite"], "programmer"]);
        expect(reg).toEqual("Reginald is a programmer");
        expect(status).toEqual("ok");
        
        const [name, occupation] = description("Maria");
        expect(name).toBe("");
        expect(occupation).toBe("occupation missing");
    });
    it('page 84. Destructuring parameters using gathering', () => {
        const numbers = (...nums) => nums; 
        expect(numbers(1, 2, 3, 4, 5)).toStrictEqual([1,2,3,4,5]);
        const headAndTail = (head, ...tail) => [head, tail];
        expect(headAndTail(1, 2, 3, 4, 5)).toStrictEqual([1,[2,3,4,5]]);
    });
});

describe('Self-similarity.', () => {
    // Defining a list describing rules for building lists:
    // 1st - Empty
    // 2nd - It is an element concatenated with a list
    it('page 86. Compose lists', () => {
        expect([]).toStrictEqual([]);
        expect(["baz", ...[]]).toStrictEqual(["baz"]);
        expect(["baz", ...["baz"]]).toStrictEqual(["baz", "baz"]);
        expect(["baz", ...["bar", "baz"]]).toStrictEqual(["baz", "bar", "baz"]);
    });
    // Same rules to decompose lists
    it('page 87. Decompose lists', () => {
        const [first1, ...rest1] = [];
        expect(first1).toBeUndefined();
        expect(rest1).toStrictEqual([]);

        const [first2, ...rest2] = ["foo"];
        expect(first2).toEqual("foo");
        expect(rest2).toStrictEqual([]);

        const [first3, ...rest3] = ["foo", "bar"];
        expect(first3).toEqual("foo");
        expect(rest3).toStrictEqual(["bar"]);

        const [first4, ...rest4] = ["foo", "bar", "baz"];
        expect(first4).toEqual("foo");
        expect(rest4).toStrictEqual(["bar", "baz"]);

        const isEmpty = ([first, ...rest]) => first === undefined;
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty([undefined])).toBeTruthy();
        expect(isEmpty([0])).toBeFalsy();
        expect(isEmpty([[]])).toBeFalsy();
        expect(isEmpty([0,1])).toBeFalsy();
    });
    it('Re-defining "length" decomposing list with RECURSIVITY', () => {
        // It is recursive because our definition of a list is recursive, and if a list is self-similar, 
        // it is natural to create an algorithm that is also self-similar
        const length = ([first, ...rest]) => first === undefined
            ? 0
            : 1 + length(rest);
        expect(length([])).toBe(0);
        expect(length([0])).toBe(1);
        expect(length([1, 2])).toBe(2);
        expect(length(["foo", "bar", "baz"])).toBe(3);
    });
    it('page 89. Linear recursion: divide and conquer', () => {
        // flatten an array: return an array of elements that aren’t arrays from an array of arrays
        const flatten = ([first, ...rest]) => {
            if(first === undefined) return [];
            else if(!Array.isArray(first)){
                return [first, ...flatten(rest)];
            }
            else {
                return [...flatten(first), ...flatten(rest)];
            }
        }
        expect(flatten([[0], 1, 2])).toStrictEqual([0, 1, 2]);
        expect(flatten(["foo",[3, 4, []]])).toStrictEqual(["foo", 3, 4]);
    });
    it('page 90. Mapping: applying a function to every element of an array', () => {
        // e.g. square each number in a list
        const squareAll = ([first, ...rest]) => first === undefined 
            ? [] 
            : [first * first, ...squareAll(rest)];
        expect(squareAll([1, 2, 3, 4, 5])).toStrictEqual([1,4,9,16,25]);
        // e.g. "Truthify" all elements in a list
        const truthyAll = ([first, ...rest]) => first === undefined 
            ? [] 
            : [!!first, ...truthyAll(rest)];
        expect(truthyAll([null, true, 25, false, "foo"])).toStrictEqual([false,true,true,false,true]);
        // Making a mapping (template) function
        const mapWith = (fn, [first, ...rest]) =>  first === undefined 
            ? [] 
            : [fn(first), ...mapWith(fn, rest)];
        expect(mapWith((x) => x + x, [1, 2, 3, 4, 5])).toStrictEqual([2, 4, 6, 8, 10]);
        expect(mapWith((x)=>!!x, [null, true, 25, false, "foo"])).toStrictEqual([false, true, true, false, true]);
    });    
    it('page 91. Folding', () => {
        // rewrite our mapWith function using folding to sum squares of the elements in an array.
        // terminal value: specifies the value in the terminal case (last case). 
        // In the next example, the terminal case would be an empty list, 
        // so its value needs to be 0 in order to add it to the result.
        const foldWith = (fn, terminalValue, [first, ...rest]) => first === undefined
            ? terminalValue
            : fn(first, foldWith(fn, terminalValue, rest));
        expect(foldWith((x, rest) => x*x + rest, 0, [1, 2, 3, 4, 5])).toBe(55);
        // Using foldWith to calculate the square of the elements of an array
        const squareAll = (array) => 
            foldWith((first, rest) => [first * first, ...rest], [], array);
        expect(squareAll([1, 2, 3, 4, 5])).toStrictEqual([1,4,9,16,25]);
        // Write mapWith using foldWith
        const mapWith = (fn, array) => foldWith((first, rest) => [fn(first), ...rest], [], array);
        const squareAllFold = (array) => mapWith((x) => x * x, array);
        expect(squareAllFold([1, 2, 3, 4, 5])).toStrictEqual([1,4,9,16,25]);
        // Rewriting function LENGTH as a fold
        const length = (array) => foldWith((first, rest) => 1 + rest, 0, array);
        expect(length([1, 2, 3, 4, 5])).toBe(5);
    });
});


// TAILS CALLS happens when using mapping/folding. What happens is that if the array used is too big, 
// the system will need a lot of memory and an overflow will happen.
describe('Tail Calls', () => {
    // SOLUTIONS
    it('page 96. TCO: tail-call optimization', () => {
        // A “tail-call” occurs when a function’s last act is to invoke another function, 
        // and then return whatever the other function returns.
        // In that case, JavaScript optimizes away the function call overhead and stack space.
    });
    it('page 97, Converting non-tail-calls to tail-calls', () => {
        // NON-TAIL-CALL
        const lengthNoNTail = ([first, ...rest]) => first === undefined
            ? 0
            : 1 + lengthNoNTail(rest);
        // TAIL-CALL
        const lengthDelaysWork = ([first, ...rest], numberToBeAdded) => first === undefined
            ? numberToBeAdded
            : lengthDelaysWork(rest, 1 + numberToBeAdded)
        const length = (n) => lengthDelaysWork(n, 0);
        expect(length(["foo", "bar", "baz"])).toBe(3);
        // PARTIAL APPLICATION
        const callLast = (fn, ...args) => (...remainingArgs) =>
            fn(...remainingArgs, ...args);
        const lengthPartialApplication = callLast(lengthDelaysWork, 0);
        expect(lengthPartialApplication(["foo", "bar", "baz"])).toBe(3);
        // mapWith + TailCall
        const mapWithDelaysWork = (fn, [first, ...rest], prepend) => first === undefined
            ? prepend
            : mapWithDelaysWork(fn, rest, [...prepend, fn(first)]);
        const mapWith = callLast(mapWithDelaysWork, []); 
        expect(mapWith((x) => x * x, [1, 2, 3, 4, 5])).toStrictEqual([1,4,9,16,25]);
    });
    it('page 98. Factorials', () => {
        // Traditional way (Non tail-call)
        const factorial = (n) => n == 1
        ? n
        : n * factorial(n - 1);
        expect(factorial(5)).toBe(120);
        // Tail-Call
        const factorialWithDelayedWork = (n, work) => n === 1
            ? work
            : factorialWithDelayedWork(n - 1, n * work);
        const factorialTailCall = (n) => factorialWithDelayedWork(n, 1);
        expect(factorialTailCall(5)).toBe(120);
        // Partial application
        const callLast = (fn, ...args) => (...remainingArgs) =>
            fn(...remainingArgs, ...args);
        const factorialPartialApp = callLast(factorialWithDelayedWork, 1);
        expect(factorialPartialApp(5)).toBe(120);
    });
    it('page 100. Default arguments', () => {
        // We want to write something like factorial(6), and have JavaScript automatically 
        // know that we really mean factorial(6, 1). But when it calls itself, it will call 
        // factorial(5, 6) and that will not mean factorial(5, 1). Solution?
        // Set a default parameter so we don't need to add it everytime
        const factorial = (n, work = 1) => n === 1
            ? work
            : factorial(n - 1, n * work);
            expect(factorial(6))
 //=> 720
    });
});



describe('Garbage, garbage everywhere', () => {
    it('', () => {
    });
});



describe('Plain old Javascript objects', () => {
    it('', () => {
    });
});


describe('Mutation', () => {
    it('', () => {
    });
});


/*
describe('', () => {
    it('', () => {
    });
});*/