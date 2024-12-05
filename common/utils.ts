export async function readFile(path: string): Promise<string> {
    const file = Bun.file(path);
    return await file.text();
}

export function zip<T, Z>(first: T[], second: Z[]): [T, Z][] {
    return first.map((val, index) => [val, second[index]]);
}
