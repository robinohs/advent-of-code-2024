export type Multiplication = {
    "type": "mul";
    "first": Expression;
    "second": Expression;
};
export type Number = {
    "type": "num";
    "val": number;
};
export type Enable = {
    "type": "enable";
    "val": boolean;
};
export type Expressions = Multiplication | Number;
export type Expression = {
    "type": "expression";
    "val": Expressions;
};
export type Statement = Expression | Enable;
