import Server = SocketIO.Server;
import {Turn} from "./basic/turn";
import Board from "./board/board";
import {MoveResult} from "./board/move-result";
import Player from "./player/player";
import PlayerCollection from "./player/players-collection";
import Snake from "./snake/snake";

export default class Game {
    // Should be used for displaying results
    // noinspection JSMismatchedCollectionQueryUpdate
    private deadPlayers: Player[] = [];

    constructor(private board: Board,
                private alivePlayers: PlayerCollection,
                private timeout: number,
                private io: Server) {
    }

    public startGame(): void {
        console.log("start game");
        this.nextMove();
    }

    public endGame(): void {
        console.log("end game");
        if (this.alivePlayers.getLength() === 1) {
            console.log("We have a winner: " + this.alivePlayers.get(0).getName());
        } else if (this.alivePlayers.getLength() === 0) {
            throw new Error("No players");
        } else {
            console.log("Draw, candidates: "
                + this.alivePlayers.get(0).getName()
                + " and " + this.alivePlayers.get(0).getName());
        }
    }

    public nextMove(): void {
        if (this.alivePlayers.getLength() < 2) {
            this.endGame();
            return;
        }
        this.movePlayer();
    }

    public movePlayer(): void {
        const player: Player = this.alivePlayers.next();
        player.move(this.board, this.timeout)
            .then((move: string) => this.executeMove(move, player))
            .catch(() => this.executeMove(undefined, player));
    }

    public kill(player: Player): void {
        this.deadPlayers.push(this.alivePlayers.popPlayerByName(player.getName()));
    }

    private executeMove(move: string, player: Player): void {
        console.log(`player ${player.getName()} moves ${move}`);
        const snake: Snake = player.getSnake();

        if (move === Turn.Left) {
            snake.moveLeft();
        } else if (move === Turn.Right) {
            snake.moveRight();
        } else {
            snake.moveStraight();
        }

        if (this.board.getSnakeMoveResult(snake) === MoveResult.Dead) {
            this.kill(player);
        }

        this.io.emit("update", this.board.mapToArray());
        this.nextMove();
    }

}
