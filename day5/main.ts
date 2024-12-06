import { readFile } from "@common/utils";
import os from "os";

// read input
const input_path = `${import.meta.dir}/input.txt`;
const input = await readFile(input_path);
const [rawPageRules, rawPageUpdates] = input.trim().split(os.EOL + os.EOL, 2);

type Rule = {
    first: number;
    second: number;
};

function parseRules(input: string): Rule[] {
    const pairs: Rule[] = input
        .split(os.EOL)
        .map((l) => l.split("|", 2).map(Number))
        .map((p) => ({
            first: p[0],
            second: p[1],
        }));
    return pairs;
}

type Update = number[];

function parseUpdates(input: string): Update[] {
    const updates = input
        .split(os.EOL)
        .map((l) => l.split(",").map(Number));
    return updates;
}

function validateRule(rule: Rule, update: Update): boolean {
    // if not both numbers are in update, rule is fulfilled
    const first = update.indexOf(rule.first);
    const second = update.indexOf(rule.second);
    if (first === -1 || second === -1) return true;
    if (first < second) return true;
    return false;
}

const pageRules = parseRules(rawPageRules);
const pageUpdates = parseUpdates(rawPageUpdates);
const validRuleMiddleSum = pageUpdates
    .filter((update) => pageRules.every((rule) => validateRule(rule, update)))
    .map((v) => v.getMiddleValue())
    .filter((v) => v !== undefined)
    .sum();
console.log(`Sum of the middle value of valid rules is: ${validRuleMiddleSum}`);

function applyRule(rule: Rule, update: Update): Update {
    // if not both numbers are in update, rule is fulfilled
    const updt = [...update];
    const first = updt.indexOf(rule.first);
    const second = updt.indexOf(rule.second);
    if (first === -1 || second === -1) return updt;
    if (first < second) return updt;
    updt.move(second, first);
    return updt;
}

const fixedUpdatesMiddleSum = pageUpdates
    .map((u) => [...u]) // copy
    .filter((update) => pageRules.some((rule) => !validateRule(rule, update))) // filter for invalid rules
    .map((u) => pageRules.reduce((update, rule) => applyRule(rule, update), u)) // apply all rules
    .map((v) => v.getMiddleValue()) // get middle value
    .filter((v) => v !== undefined) // only defined values
    .sum(); // sim values

console.log(
    `Sum of the middle value of repaired invalid rules is: ${fixedUpdatesMiddleSum}`,
);
