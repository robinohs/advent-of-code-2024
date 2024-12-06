import os from "os";

export async function readFile(path: string): Promise<string> {
    const file = Bun.file(path);
    return await file.text();
}

export async function readLines(path: string): Promise<string[]> {
    return readFile(path).then((val) => val.trim().split(os.EOL));
}

export function getFirstElement<T>(arr: T[]): T {
    const val = [...arr].shift();
    if (!val) {
        throw new Error(
            "Validation: At least one element needs to be in the array",
        );
    }
    return val;
}

export function zip<T, Z>(first: T[], second: Z[]): [T, Z][] {
    return first.map((val, index) => [val, second[index]]);
}

export function isInteger(str: string): boolean {
    return Number.isInteger(Number(str));
}

Array.prototype.getMiddleValue = function <T>(): T | undefined {
    if (this.length === 0 || this.length % 2 !== 1) return undefined;
    return this[Math.floor(this.length / 2)];
};

Array.prototype.swap = function (x: number, y: number) {
    if (x < 0 || x >= this.length || y < 0 || y >= this.length) {
        throw Error("First and second number must be valid indicies");
    }
    const temp = this[x];
    this[x] = this[y];
    this[y] = temp;
};

Array.prototype.move = function (from: number, to: number) {
    if (from < 0 || from >= this.length || to < 0 || to >= this.length) {
        throw Error("First and second number must be valid indicies");
    }
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Array.prototype.sum = function (): number {
    return this.reduce((bat, val) => bat + val, 0);
};

Array.prototype.inspect = function <T>(cb: (val: Readonly<T>) => void): T[] {
    return this.map((val: T) => {
        cb(val);
        return val;
    });
};
