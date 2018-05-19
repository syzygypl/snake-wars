import Snake from "../snake/snake";
import Player from "./player";

export default class PlayersCollection {
    private currentIndex: number = 0;

    constructor(private players: Player[]) {
        this.decreaseIndex();
    }

    public popPlayerByName(playerName: string): Player {
        const index: number = this.players.findIndex((currentPlayer: Player) => {
            if (currentPlayer.getName() === playerName) {
                return true;
            }
        });

        if (index === -1) {
            throw new Error("No such player here");
        }

        const player: Player = this.players.splice(index, 1).shift();
        this.reindexArray();

        console.log(this.currentIndex);
        if (index <= this.currentIndex) {
            this.decreaseIndex();
        }
        console.log(this.currentIndex);

        return player;
    }

    public get(index: number): Player {
        return this.players[index];
    }

    public next(): Player {
        this.increaseIndex();
        return this.players[this.currentIndex];
    }

    public getSnakes(): Snake[] {
        return this.players.map((player: Player) => {
            return player.getSnake();
        });
    }

    public getLength(): number {
        return this.players.length;
    }

    private increaseIndex(): void {
        this.currentIndex++;
        if (this.currentIndex === this.players.length) {
            this.currentIndex = 0;
        }
    }

    private decreaseIndex(): void {
        this.currentIndex--;
        if (this.currentIndex === -1) {
            this.currentIndex = this.players.length - 1;
        }
    }

    private reindexArray(): void {
        let counter: number = 0;
        this.players.forEach((player: Player, index: number, array: Player[]): void => {
            array[counter] = player;
            counter++;
        });
        console.log(this.players);
    }
}
