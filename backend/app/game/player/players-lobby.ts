import Server = SocketIO.Server;
import InitialSnakeConfiguration from "../snake/initial-snake-configuration";
import Player from "./player";
import PlayerFactory from "./player-factory";
import PlayersCollection from "./players-collection";

export default class PlayersLobby {
    private players: Player[] = [];

    constructor(private playerFactory: PlayerFactory,
                private initialSnakeConfigurations: InitialSnakeConfiguration[]) {
    }

    get isFull() {
        return this.initialSnakeConfigurations.length === 0;
    }

    public add(name: string, socket: Server) {
        const configuration: InitialSnakeConfiguration  = this.initialSnakeConfigurations.shift();

        if (!configuration) {
            throw new Error(`I refuse to let any more snakes to the game! Don't ask me why ;-(`);
        }

        this.players.push(this.playerFactory.create(
            this.players.length,
            name,
            socket,
            configuration
        ));
    }

    public resolve(): PlayersCollection {
        return new PlayersCollection(this.players);
    }
}
