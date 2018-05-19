import Server = SocketIO.Server;
import InitialSnakeConfiguration from "../snake/initial-snake-configuration";
import Dimension from "../basic/dimension";
import Player from "./player";
import PlayerFactory from "./player-factory";
import PlayersCollection from "./players-collection";

export default class PlayersLobby {
    private players: Player[] = [];

    constructor(private playerFactory: PlayerFactory,
                private initialSnakeConfigurations: InitialSnakeConfiguration[],
                private boardSize: Dimension,
                private timeout: number) {
    }

    get isFull() {
        return this.initialSnakeConfigurations.length === 0;
    }

    public add(name: string, socket: Server):object {
        const configuration: InitialSnakeConfiguration  = this.initialSnakeConfigurations.shift();

        if (!configuration) {
            throw new Error(`I refuse to let any more snakes to the game! Don't ask me why ;-(`);
        }

        const index = this.players.length;

        this.players.push(this.playerFactory.create(
            index,
            name,
            socket,
            configuration
        ));

        return {
            board: this.boardSize,
            start: configuration,
            timeout: this.timeout,
            type: "snake",
            you: index,
        };
    }

    public resolve(): PlayersCollection {
        return new PlayersCollection(this.players);
    }
}
