import { DirectionUtils } from "../game/basic/direction-utils";
import Point from "../game/basic/point";
import Board from "../game/board/board";
import Game from "../game/game";
import PlayerFactory from "../game/player/player-factory";
import PlayersCollection from "../game/player/players-collection";
import PlayersLobby from "../game/player/players-lobby";
import Snake from "../game/snake/snake";
import SnakeFactory from "../game/snake/snake-factory";
import Server = SocketIO.Server;
import InitialWallConfiguration from "../game/wall/initial-wall-configuration";
import Wall from "../game/wall/wall";
import { INITIAL_SNAKES_DATA, INITIAL_WALLS_DATA, SIZE, TIMEOUT } from "./configuration";

// used int index.js file
// noinspection JSUnusedGlobalSymbols
export default class EveryFuckingThingFactory {

    public createPlayersLobby(): PlayersLobby {

        const snakeFactory: SnakeFactory = new SnakeFactory();
        const playerFactory: PlayerFactory = new PlayerFactory(snakeFactory);

        return new PlayersLobby(playerFactory, INITIAL_SNAKES_DATA, SIZE, TIMEOUT);
    }

    public createGame(io: Server, players: PlayersCollection): Game {
        const snakes: Snake[] = players.getSnakes();

        return new Game(this.createBoard(snakes), players, TIMEOUT, io);
    }

    public createBoard(snakes: Snake[]): Board {
        return new Board(this.createWalls(), snakes, SIZE);
    }

    public createWalls(): Wall[] {
        return INITIAL_WALLS_DATA.map((configuration: InitialWallConfiguration) => {
            return this.createWall(configuration);
        });
    }

    public createWall(configuration: InitialWallConfiguration): Wall {
        const bounds: Point[] = [configuration.getStart()];

        for (let i: number = 0; i < configuration.getLength(); i++) {
            bounds.push(DirectionUtils.createMovedPointInDirection(
                configuration.getStart(), DirectionUtils.getOpposite(configuration.getDirection())
            ));
        }

        return new Wall(bounds);
    }

}
