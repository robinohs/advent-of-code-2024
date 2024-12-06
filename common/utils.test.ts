import { expect, test } from "bun:test";
import { getFirstElement, isInteger, zip } from "./utils";

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

test("isNumber: char is not a number", () => {
    expect(isInteger("a")).toBeFalse();
});

test("isNumber: string is not a number", () => {
    expect(isInteger("abc")).toBeFalse();
});

test("isNumber: zero is a number", () => {
    expect(isInteger("0")).toBeTrue();
});

test("getMiddleValue: empty array", () => {
    expect([].getMiddleValue()).toBeUndefined();
});

test("getMiddleValue: one element", () => {
    expect([0].getMiddleValue()).toBe(0);
});

test("getMiddleValue: two element", () => {
    expect([0, 2].getMiddleValue()).toBeUndefined();
});

test("getMiddleValue: three element", () => {
    expect([0, 2, 5].getMiddleValue()).toBe(2);
});

test("swap: invalid indicies (x)", () => {
    const arr = [0, 2, 5];
    expect(() => arr.swap(-1, 2)).toThrowError();
});

test("swap: invalid indicies (y)", () => {
    const arr = [0, 2, 5];
    expect(() => arr.swap(0, 3)).toThrowError();
});

test("swap: three elements", () => {
    const arr = [0, 2, 5];
    arr.swap(0, 2);
    expect(arr).toEqual([5, 2, 0]);
});

test("swap: same element", () => {
    const arr = [0, 1];
    arr.swap(0, 0);
    expect(arr).toEqual([0, 1]);
});

test("move: invalid indicies (from)", () => {
    const arr = [0, 2, 5];
    expect(() => arr.move(-1, 2)).toThrowError();
});

test("move: invalid indicies (to)", () => {
    const arr = [0, 2, 5];
    expect(() => arr.move(0, 3)).toThrowError();
});

test("move: same element", () => {
    const arr = [0, 1];
    arr.move(0, 0);
    expect(arr).toEqual([0, 1]);
});

test("move: use as swap", () => {
    const arr = [0, 1];
    arr.move(0, 1);
    expect(arr).toEqual([1, 0]);
});

test("move: more elements", () => {
    const arr = [0, 1, 8, 9];
    arr.move(1, 3);
    expect(arr).toEqual([0, 8, 9, 1]);
});

test("sum: empty array", () => {
    expect([].sum()).toEqual(0);
});

test("sum: number array", () => {
    expect([5, 7, 3].sum()).toEqual(15);
});

test("inspect: no side effect", () => {
    const arr = [4, 3, 2];
    const other = arr.inspect(() => {
    });
    expect(other).toEqual([4, 3, 2]);
});
