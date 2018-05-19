import Server = SocketIO.Server;
import Board from "../board/board";
import Snake from "../snake/snake";

export default class Player {
    private nextMove: string = undefined;

    constructor(private name: string, private socket: Server, private snake: Snake) {
        this.socket.on("move", (move: string) => this.nextMove = move);
    }

    public move(board: Board, timeout: number): Promise<any> {
        this.nextMove = undefined;
        this.socket.emit('move', board.mapToArray());

        return new Promise(resolve => setTimeout(() => resolve(this.nextMove), timeout));
    }

    public getName(): string {
        return this.name;
    }

    public getSnake(): Snake {
        return this.snake;
    }
}
