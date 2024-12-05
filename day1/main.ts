import { readFile, zip } from "@common/utils";
import os from "os";

// Read input
const input = await readFile(`${import.meta.dir}/input.txt`);

// Parse columns in the input into two sorted arrays (left_column, right_column)
const lines = input.trim().split(os.EOL);
const [left_column, right_column] = lines
    .map((line) => line.split(" ").map(Number))
    .reduce(
        ([left_column, right_column], [left, right]) => {
            left_column.push(left);
            right_column.push(right);
            return [left_column, right_column];
        },
        [[], []] as number[][],
    )
    .map((col) => col.sort((a, b) => a - b));

// Sum up the distances between every number pair
const total_distance = zip(left_column, right_column)
    .reduce(
        (sum, [left_num, right_num]) => sum + Math.abs(left_num - right_num),
        0,
    );
console.log(`Total distance is: ${total_distance}`);

// Calculate similarity (this time no functional programming)

// function to get the occurrence count of a number in an sorted array and the pointer to the number after the last occurrence of the number
// Hint: This can be used easily with filter and count but for training I want a moving pointer
function getOccurrences(
    start_index: number,
    vals: number[],
    num: number,
): [number, number] {
    let index = start_index;
    let group_num = -1;
    let group_start = start_index;
    let occurrences = 0;
    while (index < vals.length) {
        const compare_num = vals[index];
        if (num < compare_num) break;
        else if (num == compare_num) {
            occurrences++;
            // store first index of the number
            if (num != group_num) {
                group_num = num;
                group_start = index;
            }
        }
        index++;
    }
    return [occurrences, group_start];
}
// Create sum of each number in left_column multiplied by the number of occurences in right_column
const [similarity, _] = left_column.reduce(([similarity, index], num) => {
    const [occurrences, next_index] = getOccurrences(
        index,
        right_column,
        num,
    );
    const new_similarity = similarity + num * occurrences;
    return [new_similarity, next_index];
}, [0, 0]);
console.log(`Similarity score is: ${similarity}`);
