import { delay, readFile } from "@common/utils";
import os from "os";

type Obstacle = {
    type: "obstacle";
    x: number;
    y: number;
};

type Field = {
    type: "field";
    x: number;
    y: number;
    was_walked: boolean;
};

type Position = {
    x: number;
    y: number;
};

export type FieldType = Obstacle | Field;

class Map {
    public map: FieldType[][];

    constructor(rawMap: string) {
        this.map = this.parseMap(rawMap);
    }

    public getWidth() {
        if (this.map.length > 0) return this.map[0].length;
        else return 0;
    }

    public getHeight() {
        return this.map.length;
    }

    public isOnMap(pos: Position) {
        return (pos.x >= 0 && pos.x < this.getWidth() &&
            pos.y >= 0 && pos.y < this.getHeight());
    }

    public isWalkable(pos: Position) {
        if (!this.isOnMap(pos)) return true;
        const field = this.map[pos.y][pos.x];
        if (field.type === "obstacle") return false;
        if (field.type === "field") return true;
        throw Error(`Unexpected field type: ${field}.`);
    }

    public mark(pos: Position) {
        if (!this.isOnMap(pos)) return;
        const field = this.map[pos.y][pos.x];
        if (field.type === "obstacle") return;
        else if (field.type === "field") {
            this.map[pos.y][pos.x] = {
                ...field,
                was_walked: true,
            };
        } else {
            throw Error(`Unexpected field type: ${field}.`);
        }
    }

    public getVisitedPositions(): number {
        let visited = 0;
        for (const y of Array(this.getHeight()).keys()) {
            for (const x of Array(this.getWidth()).keys()) {
                const field = this.map[y][x];
                if (field.type === "field" && field.was_walked) {
                    visited++;
                }
            }
        }
        return visited;
    }

    public drawMap(guards: Guard[]) {
        // create map
        const chars: string[][] = [];
        for (const y of Array(this.getHeight()).keys()) {
            chars.push([]);
            for (const x of Array(this.getWidth()).keys()) {
                const field = this.map[y][x];
                if (field === undefined) {
                    console.log(x, this.getWidth(), y, this.getHeight(), "is udnefined");
                }
                if (field.type === "field") {
                    if (field.was_walked === true) chars[y].push("X");
                    else chars[y].push(".");
                } else if (field.type === "obstacle") {
                    chars[y].push("#");
                }
            }
        }
        // add guards
        guards.map(
            (g): [number, number, FacingDirection] => {
                const pos = g.getPosition();
                return [pos.x, pos.y, g.getFacing()];
            },
        ).forEach(([x, y, facing]) => {
            if (!this.isOnMap(guard.getPosition())) return;
            if (facing === "up") {
                chars[y][x] = "^";
            } else if (facing === "right") {
                chars[y][x] = ">";
            } else if (facing === "down") {
                chars[y][x] = "v";
            } else if (facing === "left") {
                chars[y][x] = "<";
            }
        });
        // draw
        chars.forEach((l) => {
            console.log(l.join(""));
        });
    }

    private parseMap(rawMap: string): FieldType[][] {
        return rawMap
            .split(os.EOL)
            .map((l, y) =>
                l.split("").map((c, x): FieldType => {
                    if (
                        c === "." || c === "^" || c === ">" || c === "v" ||
                        c === "<"
                    ) {
                        return {
                            type: "field",
                            x,
                            y,
                            was_walked: false,
                        };
                    } else if (c === "#") {
                        return {
                            type: "obstacle",
                            x,
                            y,
                        };
                    } else {
                        throw Error("Unexpected field");
                    }
                })
            );
    }
}

type FacingDirection = "up" | "right" | "down" | "left";

class Guard {
    private position: Position;
    private facing: FacingDirection;

    constructor(x: number, y: number, facing: FacingDirection) {
        this.position = {
            x,
            y,
        };
        this.facing = facing;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getFacing(): FacingDirection {
        return this.facing;
    }

    public isOnMap(map: Map) {
        return map.isOnMap(this.position);
    }

    public move(map: Map) {
        let x_change = 0;
        let y_change = 0;
        if (this.facing === "up") y_change -= 1;
        else if (this.facing === "right") x_change += 1;
        else if (this.facing === "down") y_change += 1;
        else if (this.facing === "left") x_change -= 1;

        const new_pos: Position = {
            x: this.position.x + x_change,
            y: this.position.y + y_change,
        };

        if (map.isWalkable(new_pos)) {
            map.mark(new_pos);
            this.position = new_pos;
        } else {
            if (this.facing === "up") this.facing = "right";
            else if (this.facing === "right") this.facing = "down";
            else if (this.facing === "down") this.facing = "left";
            else if (this.facing === "left") this.facing = "up";
        }
    }

    static findGuards(rawMap: string): Guard[] {
        const chars = rawMap
            .split(os.EOL)
            .map((l) => l.split(""));
        const guards: Guard[] = [];
        for (const x of Array(chars[0].length).keys()) {
            for (const y of Array(chars.length).keys()) {
                const c = chars[y][x];
                if (c === "^") {
                    guards.push(new Guard(x, y, "up"));
                } else if (c === ">") {
                    guards.push(new Guard(x, y, "right"));
                } else if (c === "v") {
                    guards.push(new Guard(x, y, "down"));
                } else if (c === "<") {
                    guards.push(new Guard(x, y, "left"));
                }
            }
        }
        return guards;
    }
}

// read input
const input_path = `${import.meta.dir}/input.txt`;
const input = await readFile(input_path);

const map = new Map(input);
const guard = Guard.findGuards(input)[0];
console.clear();
// map.drawMap([guard]);
// await delay(1000);

map.mark(guard.getPosition());

while (guard.isOnMap(map)) {
    guard.move(map);
    // const pos = guard.getPosition();
    // const facing = guard.getFacing();
    // console.log(`X: ${pos.x}; Y: ${pos.y}; Facing: ${facing}`);
    console.clear();
    // map.drawMap([guard]);
    // await delay(50);
}

console.log(
    `Guard visited ${map.getVisitedPositions()} unique positions`,
);
