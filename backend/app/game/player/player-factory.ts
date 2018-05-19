import Server = SocketIO.Server;
import InitialSnakeConfiguration from "../snake/initial-snake-configuration";
import Snake from "../snake/snake";
import SnakeFactory from "../snake/snake-factory";
import Player from "./player";

export default class PlayerFactory {

    constructor(private snakeFactory: SnakeFactory) {
    }

    public create(index: number,
                  name: string,
                  socket: Server,
                  snakeConfiguration: InitialSnakeConfiguration): Player {

        const snake: Snake = this.snakeFactory.create(index, snakeConfiguration);

        return new Player(name, socket, snake);
    }
}
