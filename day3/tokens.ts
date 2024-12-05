export type Keywords = "mul" | "don't()" | "do()";
export type Chars = "(" | "," | ")";
export type Char = {
    "type": "char";
    "val": Chars;
};
export type Keyword = {
    "type": "keyword";
    "val": Keywords;
};
export type NumberSymbol = {
    "type": "num";
    "val": number;
};
export type Symbol = Keyword | Char | NumberSymbol;
