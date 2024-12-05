import { getFirstElement, readLines } from "@common/utils";

type Order = "asc" | "dsc" | "eq" | "unset";

function getOrder(num1: number, num2: number): [Order, number] {
    const diff = Math.abs(num1 - num2);
    let order: Order = "eq";
    if (num1 < num2) {
        order = "asc";
    }
    if (num1 > num2) {
        order = "dsc";
    }
    return [order, diff];
}

function validateLine(line: number[], allowed_diff: number = 3): boolean {
    let work_line = [...line];
    // get first number
    let old_num = getFirstElement(work_line);
    work_line.shift();
    let required_order = "unset";
    for (const new_num of work_line) {
        let [order, diff] = getOrder(old_num, new_num);
        if (required_order === "unset") {
            if (order === "eq") {
                return false;
            }
            required_order = order;
        }
        if (order !== required_order || diff > allowed_diff) {
            return false;
        }
        old_num = new_num;
    }
    return true;
}

// const input_path = `${import.meta.dir}/test.txt`;
const input_path = `${import.meta.dir}/input.txt`;

const safeLines = (await readLines(input_path))
    .map((line) => line.split(" ").map(Number))
    .map((line) => {
        if (validateLine(line)) return true;
        // bruteforce solutions
        for (const index of [...Array(line.length).keys()]) {
            const tmp_line = [...line];
            tmp_line.splice(index, 1);
            if (validateLine(tmp_line)) return true;
        }
        return false;
    })
    .filter((res) => res)
    .length;

console.log(`Number of safe lines is: ${safeLines}`);
