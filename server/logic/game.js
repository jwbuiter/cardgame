const uuid = require("uuid");
const rules = require("./rules/toepen/rules");
const stateMachine = require("./rules/toepen/stateMachine");

function makeGame(socket, options, respond) {
  const game = {
    name: options.gameName,
    isProtected: options.isProtected,
    id: uuid(),
    creator: null
  };
  const gamePassword = options.gamePassword;

  const players = [];
  const ready = {};
  let started = false;

  let gameState = {};

  console.log(
    `Game created: Game "${game.name}" created by "${options.username}"`
  );
  join(socket, { username: options.username, gamePassword }, respond);
  game.creator = players[0];

  return {
    game,
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

    const user = { username: options.username, id: uuid() };

    respond({
      success: true,
      game,
      user
    });

    socket.on("chatMessage", (message, respond) => {
      message.id = uuid();
      players.forEach(player => {
        player.socket.emit("chatMessage", message);
      });
    });

    socket.on("startGame", (message, respond) => {
      if (user !== game.creator) return;
      if (players.length < rules.minPlayers) return;
      if (!players.map(player => ready[player]).every(val => val)) return;

      startGame();
    });

    socket.on("ready", (message, respond) => {
      ready[user.id] = message.value;

      players.forEach(player => {
        player.socket.emit("ready", message);
      });
    });

    socket.on("gameAction", (message, respond) => {
      if (!started) return;

      gameState = stateMachine.nextState(gameState, message.action);
    });

    players.push({ socket, user });
    console.log(
      `Player joined: Player "${options.username}" joined game "${game.name}"`
    );
  }

  function startGame() {
    started = true;
    gameState = stateMachine.initialState;
    console.log(`Game Started: "${gameName}"`);

    players.forEach(player => {});
  }

  function canJoin() {
    return !started && players.length < rules.maxPlayers;
  }
}

module.exports = makeGame;
