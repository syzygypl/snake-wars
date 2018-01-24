import Dimension from "./dimension";
import InitialSnakeConfiguration from "./initial-snake-configuration";
import InitialWallConfiguration from "./initial-wall-configuration";
import Point from "./point";

export enum Direction {
    Top = "N",
    Left = "W",
    Right = "E",
    Down = "S",
}

export enum MoveResult {
    Dead = "dead",
    Alive = "alive",
}

export enum Turn {
    Left = "L",
    Right = "R",
}

export enum BoardCell {
    Player = "player",
    Head = "head",
    Dead = "dead",
    Apple = "🍎",
}

export const INITIAL_SNAKES_DATA: InitialSnakeConfiguration[] = [
    new InitialSnakeConfiguration(new Point(15, 15), Direction.Left, 3),
    new InitialSnakeConfiguration(new Point(15, 45), Direction.Right, 3),
    new InitialSnakeConfiguration(new Point(45, 15), Direction.Left, 3),
    new InitialSnakeConfiguration(new Point(45, 45), Direction.Right, 3),
];

export const INITIAL_WALLS_DATA: InitialWallConfiguration[] = [
    new InitialWallConfiguration(new Point(-1, 0), Direction.Down, 60),
    new InitialWallConfiguration(new Point(0, -1), Direction.Right, 60),
    new InitialWallConfiguration(new Point(60, 0), Direction.Down, 60),
    new InitialWallConfiguration(new Point(0, 60), Direction.Right, 60),
];

export const TIMEOUT: number = 200;

export const SIZE: Dimension = new Dimension(59, 59);

export const SNAKES_DIR: string = "snakes";
export const INDEX_FILE: string = "index.js";
