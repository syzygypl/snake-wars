import Point from "./point";

export default class Dimension {
    constructor(private width: number, private height: number) {
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public pointIsOutOfBounds(point: Point): boolean {
        return point.getX() < 0 || point.getX() > this.getWidth() ||
            point.getY() < 0 || point.getY() > this.getHeight();
    }
}
