import { isInteger } from "@common/utils";
import type { Symbol } from "./tokens";

class Lexer {
    private pos = 0;
    private symbols: Symbol[] = [];

    constructor(private input: string) {}

    public tokenize(): Symbol[] {
        while (!this.isExhausted()) {
            if (this.peek(3) === "mul") {
                if (!this.get_mul()) continue;
                if (!this.get_open_bracket()) continue;
                if (!this.get_number()) continue;
                if (!this.get_comma()) continue;
                if (!this.get_number()) continue;
                if (!this.get_closing_bracket()) continue;
            } else if (this.peek(7) === "don't()") {
                if (!this.get_dont()) continue;
            } else if (this.peek(4) === "do()") {
                if (!this.get_do()) continue;
            } else {
                this.consume();
            }
        }
        return this.symbols;
    }

    private get_do(): boolean {
        if (!this.consume("d")) return false;
        if (!this.consume("o")) return false;
        if (!this.consume("(")) return false;
        if (!this.consume(")")) return false;
        this.symbols.push({
            type: "keyword",
            val: "do()",
        });
        return true;
    }

    private get_dont(): boolean {
        if (!this.consume("d")) return false;
        if (!this.consume("o")) return false;
        if (!this.consume("n")) return false;
        if (!this.consume("'")) return false;
        if (!this.consume("t")) return false;
        if (!this.consume("(")) return false;
        if (!this.consume(")")) return false;
        this.symbols.push({
            type: "keyword",
            val: "don't()",
        });
        return true;
    }

    private get_mul(): boolean {
        if (!this.consume("m")) return false;
        if (!this.consume("u")) return false;
        if (!this.consume("l")) return false;
        this.symbols.push({
            type: "keyword",
            val: "mul",
        });
        return true;
    }

    private get_open_bracket(): boolean {
        if (!this.consume("(")) return false;
        this.symbols.push({
            type: "char",
            val: "(",
        });
        return true;
    }

    private get_closing_bracket(): boolean {
        if (!this.consume(")")) return false;
        this.symbols.push({
            type: "char",
            val: ")",
        });
        return true;
    }

    private get_comma(): boolean {
        if (!this.consume(",")) return false;
        this.symbols.push({
            type: "char",
            val: ",",
        });
        return true;
    }

    private get_number(): boolean {
        let num = "";
        while (!this.isExhausted()) {
            const token = this.currentToken();
            if (isInteger(token)) {
                num += token;
                this.pos++;
            } else {
                break;
            }
        }
        if (num.length === 0) return false;
        this.symbols.push({
            type: "num",
            val: Number.parseInt(num),
        });
        return true;
    }

    private consume(expected?: string): boolean {
        if (expected && this.currentToken() !== expected) {
            this.pos++;
            return false;
        }
        this.pos++;
        return true;
    }

    private currentToken(): string {
        return this.input.charAt(this.pos);
    }

    private isExhausted(): boolean {
        return this.pos >= this.input.length;
    }

    private peek(length: number): string | null {
        if (this.pos + length >= this.input.length) {
            return null;
        }
        return this.input.slice(this.pos, this.pos + length);
    }
}

export default Lexer;
