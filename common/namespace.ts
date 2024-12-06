declare global {
    interface Array<T> {
        getMiddleValue(): T | undefined;
        swap(a: number, b: number): void;
        move(from: number, to: number): void;
        inspect(cb: (val: Readonly<T>) => void): T[];
        sum(this: Array<number>): number;
    }
}
