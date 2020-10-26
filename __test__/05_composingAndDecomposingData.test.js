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
    it('page 86. ', () => {
    });
    it('page 88. Linear recursion', () => {
    });
    it('page 90. Mapping', () => {
    });
    it('page 91. Folding', () => {
    });
});

/*
describe('', () => {
    it('', () => {
    });
});*/