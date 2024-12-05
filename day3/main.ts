import { readFile } from "@common/utils";
import Lexer from "./lexer";
import type { Expressions } from "./statements";
import Parser from "./parser";

// read input
const input_path = `${import.meta.dir}/input.txt`;
const input = await readFile(input_path);

// parse
function evaluate(expression: Expressions): number {
    switch (expression.type) {
        case "mul":
            return evaluate(expression.first.val) *
                evaluate(expression.second.val);
        case "num":
            return expression.val;
    }
}

const lexer = new Lexer(input);
const tokens = lexer.tokenize();
const parser = new Parser(tokens);
const statements = parser.parse();

// evaluate statements
let sum = 0;
let enabled = true;
for (const statement of statements) {
    if (statement.type === "expression") {
        const expression = statement.val;
        if (enabled) {
            sum += evaluate(expression);
        }
        continue;
    } else if (statement.type === "enable") {
        enabled = statement.val;
        continue;
    }
    throw new Error(`Unhandled statement ${statement}`);
}
console.log(`Overall sum is: ${sum}`);
