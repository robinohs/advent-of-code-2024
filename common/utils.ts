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
