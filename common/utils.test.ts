import { expect, test } from "bun:test";
import { getFirstElement, zip } from "./utils";

test('zip [1, 4, 9] and ["b", "c", "d"]', () => {
    expect(zip([1, 4, 9], ["b", "c", "d"]))
        .toEqual([[1, "b"], [4, "c"], [9, "d"]]);
});

test('zip ["a", 4, 9] and ["b", "c", "d"]', () => {
    expect(zip(["a", 2, 2], ["b", 1, "d"]))
        .toEqual([["a", "b"], [2, 1], [2, "d"]]);
});

test("getFirstElement from []", () => {
    expect(() => getFirstElement([])).toThrowError();
});

test('getFirstElement from ["a", "b", 5]', () => {
    const first = getFirstElement(["a", "b", 5]);
    expect(first).toEqual("a");
});

test("getFirstElement has no side_effects", () => {
    const arr: (string | number)[] = ["a", "b", 5];
    getFirstElement(arr);
    expect(arr).toEqual(["a", "b", 5]);
});
