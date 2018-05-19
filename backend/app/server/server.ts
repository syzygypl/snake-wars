import * as Express from "express";
import * as Http from "http";
import * as SocketIO from "socket.io";

const app: Express.Application = Express();
const server: Http.Server = Http.createServer(app);
const socket: SocketIO.Server = SocketIO(server);
const port = process.env.PORT || 3001;

app.use(Express.static(`${process.cwd()}/../frontend/build`));

socket.on("connection", (socketInput: SocketIO.Socket) => {
    console.log("a user connected", socketInput.id);

    socketInput.on("disconnect", () => {
        console.log("user disconnected", socketInput.id);
    });
});

server.listen(port, () => {
    console.log("listening on *:" + port);
});

// used in index.js - shuold be refactored to be used inside TypeScript application
// noinspection JSUnusedGlobalSymbols
export default socket;
