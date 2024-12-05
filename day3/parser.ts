import type { Statement } from "./statements";
import type {
    Char,
    Chars,
    Keyword,
    Keywords,
    NumberSymbol,
    Symbol,
} from "./tokens";

// converts symbols to statements
class Parser {
    private pos = 0;

    constructor(private symbols: Symbol[]) {}

    public parse(): Statement[] {
        let statements: Statement[] = [];
        while (!this.isExhausted()) {
            const symbol = this.currentSymbol();
            if (symbol.type === "keyword") {
                // parse multiplication
                if (symbol.val === "mul") {
                    if (!this.consume_keyword("mul")) continue;
                    if (!this.consume_char("(")) continue;
                    const first_num = this.consume_number();
                    if (!first_num) continue;
                    if (!this.consume_char(",")) continue;
                    const second_num = this.consume_number();
                    if (!second_num) continue;
                    if (!this.consume_char(")")) continue;
                    statements.push({
                        "type": "expression",
                        "val": {
                            type: "mul",
                            first: {
                                "type": "expression",
                                val: {
                                    type: "num",
                                    val: first_num.val,
                                },
                            },
                            second: {
                                "type": "expression",
                                val: {
                                    type: "num",
                                    val: second_num.val,
                                },
                            },
                        },
                    });
                } // parse do
                else if (symbol.val === "do()") {
                    if (!this.consume_keyword("do()")) continue;
                    statements.push({
                        type: "enable",
                        val: true,
                    });
                } // parse dont
                else if (symbol.val === "don't()") {
                    if (!this.consume_keyword("don't()")) continue;
                    statements.push({
                        type: "enable",
                        val: false,
                    });
                }
            } else {
                this.consume();
            }
        }
        return statements;
    }

    private consume_number(): NumberSymbol | null {
        const symbol = this.currentSymbol();
        if (symbol.type === "num") {
            this.pos++;
            return symbol;
        }
        return null;
    }

    private consume_keyword(val: Keywords): Keyword | null {
        const symbol = this.currentSymbol();
        if (symbol.type === "keyword" && symbol.val === val) {
            this.pos++;
            return symbol;
        }
        return null;
    }

    private consume_char(val: Chars): Char | null {
        const symbol = this.currentSymbol();
        if (symbol.type === "char" && symbol.val === val) {
            this.pos++;
            return symbol;
        }
        return null;
    }

    private consume() {
        this.pos++;
    }

    private currentSymbol(): Symbol {
        const symbol = this.symbols.at(this.pos);
        if (!symbol) {
            throw new Error(`No symbol at ${this.pos}`);
        }
        return symbol;
    }

    private isExhausted(): boolean {
        return this.pos >= this.symbols.length;
    }
}

export default Parser;
