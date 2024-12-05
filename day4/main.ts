import { readLines } from "@common/utils";

// read input
const input_path = `${import.meta.dir}/input.txt`;
const map = (await readLines(input_path))
    .map((l) => [...l])
    .map((l) => l.map((c) => c.toLowerCase()));

const width = map[0].length;
const height = map.length;

const Directions = [
    "top-left",
    "top",
    "top-right",
    "right",
    "bot-right",
    "bot",
    "bot-left",
    "left",
] as const;
type Direction = typeof Directions[keyof typeof Directions.values];

function getChar(x: number, y: number): string {
    if (x >= 0 && x < width) {
        if (y >= 0 && x < height) {
            return map[x][y];
        }
    }
    return "";
}

function getChars(
    start_x: number,
    start_y: number,
    dir: Direction,
    count: number = 4,
): string {
    let x = start_x;
    let y = start_y;
    let string = "";
    for (const _ of Array(count).keys()) {
        string += getChar(x, y);
        if (dir === "top-left") {
            x -= 1;
            y -= 1;
        } else if (dir === "top") {
            y -= 1;
        } else if (dir === "top-right") {
            x += 1;
            y -= 1;
        } else if (dir === "right") {
            x += 1;
        } else if (dir === "bot-right") {
            x += 1;
            y += 1;
        } else if (dir === "bot") {
            y += 1;
        } else if (dir === "bot-left") {
            x -= 1;
            y += 1;
        } else if (dir === "left") {
            x -= 1;
        }
    }
    return string;
}

// Task 1
let task_1_count = 0;
for (const x of Array(width).keys()) {
    for (const y of Array(height).keys()) {
        for (const dir of Directions) {
            if (getChars(x, y, dir) === "xmas") {
                task_1_count++;
            }
        }
    }
}
console.log(`Task1: 'xmas' count is: ${task_1_count}`);

// Task 2
let task_2_count = 0;
for (const x of Array(width).keys()) {
    for (const y of Array(height).keys()) {
        if (getChar(x, y) !== "a") continue;
        const top_left = getChars(x, y, "top-left", 2).at(1);
        const bot_right = getChars(x, y, "bot-right", 2).at(1);
        const top_right = getChars(x, y, "top-right", 2).at(1);
        const bot_left = getChars(x, y, "bot-left", 2).at(1);
        if (!top_left || !bot_right || !top_right || !bot_left) continue;
        const first = top_left + "a" + bot_right;
        const second = top_right + "a" + bot_left;
        if (
            (first === "mas" || first === "sam") &&
            (second === "mas" || second === "sam")
        ) {
            task_2_count++;
        }
    }
}
console.log(`Task2: 'x-mas' count is: ${task_2_count}`);
