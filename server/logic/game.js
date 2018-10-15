const uuid = require("uuid");
const rules = require("./rules/toepen/rules");
const stateMachine = require("./rules/toepen/stateMachine");

function makeGame(socket, options, respond) {
  const game = {
    name: options.gameName,
    isProtected: options.isProtected,
    id: uuid(),
    players: [],
    started: false
  };
  const players = game.players;
  const sockets = {};

  const gamePassword = options.gamePassword;

  let gameState = {};

  console.log(
    "Game created:",
    `Game "${game.name}" created by "${options.username}"`
  );
  join(socket, { username: options.username, gamePassword }, respond);

  return {
    ...game,
    canJoin,
    join
  };

  function join(socket, options, respond) {
    if (game.isProtected && options.gamePassword !== gamePassword) {
      respond({
        success: false,
        reason: "Password is incorrect"
      });
      return;
    }

    const user = { username: options.username, id: uuid(), ready: false };

    broadCast("playerJoined", user);

    players.push(user);
    sockets[user.id] = socket;

    console.log(
      "Player joined:",
      `Player "${user.username}" joined game "${game.name}"`
    );

    respond({
      success: true,
      game,
      players,
      user
    });

    socket.on("chatMessage", message => {
      message.id = uuid();

      broadCast("chatMessage", message);
    });

    socket.on("startGame", () => {
      if (user.id !== players[0].id) return;
      if (players.length < rules.minPlayers) return;
      if (!players.every(player => player.ready)) return;

      startGame();
    });

    socket.on("ready", message => {
      user.ready = message.value;

      broadCast("ready", message);
    });

    socket.on("gameAction", message => {
      if (!game.started) return;

      gameState = stateMachine.nextState(gameState, message.action);
    });

    socket.on("leave", () => {
      leave(user.id);

      broadCast("playerLeft", user.id);
    });
  }

  function leave(id) {
    sockets[id].close();
  }

  function broadCast(type, message) {
    players.forEach(player => {
      sockets[player.id].emit(type, message);
    });
  }

  function startGame() {
    game.started = true;
    gameState = stateMachine.initialState;
    console.log("Game Started:", `"${gameName}"`);

    players.forEach(player => {});
  }

  function canJoin() {
    return !game.started && players.length < rules.maxPlayers;
  }
}

module.exports = makeGame;
