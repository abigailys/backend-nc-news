const { createLookupObject } = require("../db/seeds/seedUtils.js")

describe("seedUtils: createLookupObject()", () => {
    test("returns an empty object when passed an empty array", () => {
        expect(createLookupObject([], "name", "age")).toEqual({});
    });

    test("returns an object with a single key-value pair, when passed an array containing one object", () => {
        expect(createLookupObject([{ name: "Rufus", age: 10 }], "name", "age")).toEqual({ "Rufus": 10 });
    });

    test("returns an object with multiple key-value pairs, when passed an array containing multiple objects", () => {
        const testObjectsArray = [{ animal: "dinosaur", count: 18 }, { animal: "meow", count: 198 }, { animal: "elephant", count: 25 }];
        expect(createLookupObject(testObjectsArray, "animal", "count")).toEqual({ "dinosaur": 18, "meow": 198, "elephant": 25 });
    });

    test("does not mutate the original array", () => {
        const testObjectsArray = [{ animal: "dinosaur", count: 18 }, { animal: "meow", count: 198 }, { animal: "elephant", count: 25 }];
        createLookupObject(testObjectsArray, "animal", "count");
        expect(testObjectsArray).toEqual([{ animal: "dinosaur", count: 18 }, { animal: "meow", count: 198 }, { animal: "elephant", count: 25 }]);
    });
})