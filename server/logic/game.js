const uuid = require("uuid");
const rules = require("./rules/toepen/rules");
const stateMachine = require("./rules/toepen/stateMachine");

function makeGame(socket, options, respond) {
  const game = {
    name: options.gameName,
    isProtected: options.isProtected,
    id: uuid(),
    players: [],
    started: false,
    creatorId: null
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
  game.creatorId = players[0].id;

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

    players.forEach(player => sockets[player.id].emit("playerJoined", user));

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

    socket.on("chatMessage", (message, respond) => {
      message.id = uuid();
      players.forEach(player => {
        sockets[player.id].emit("chatMessage", message);
      });
    });

    socket.on("startGame", (message, respond) => {
      if (user.id !== game.creatorId) return;
      if (players.length < rules.minPlayers) return;
      if (!players.every(player => player.ready)) return;

      startGame();
    });

    socket.on("ready", (message, respond) => {
      user.ready = message.value;

      players.forEach(player => {
        sockets[player.id].emit("ready", message);
      });
    });

    socket.on("gameAction", (message, respond) => {
      if (!game.started) return;

      gameState = stateMachine.nextState(gameState, message.action);
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
