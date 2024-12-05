import { expect, test } from "bun:test";
import { zip } from "./utils";

test('zip [1, 4, 9] and ["b", "c", "d"]', () => {
    expect(zip([1, 4, 9], ["b", "c", "d"]))
        .toEqual([[1, "b"], [4, "c"], [9, "d"]]);
});

test('zip ["a", 4, 9] and ["b", "c", "d"]', () => {
    expect(zip(["a", 2, 2], ["b", 1, "d"]))
        .toEqual([["a", "b"], [2, 1], [2, "d"]]);
});
