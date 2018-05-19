const Factory = require("./dist/application/every-fucking-thing-factory").default;
const io = require("./dist/server/server").default;

const factory = new Factory();
const lobby = factory.createPlayersLobby();

io.on("connection", socket => {
  socket.on("hello", function (name) {
    if (lobby.isFull) {
      console.log("client emited hello on a full lobby");
      return socket.emit("full");
    }

    console.log("new player registered: " + name);

    socket.emit("init", lobby.add(name, socket));

    if (lobby.isFull) {
      console.log("game starts");
      const game = factory.createGame(io, lobby.resolve());
      game.startGame();

    }
  });
});

