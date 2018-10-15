const { stringMapFromArray } = require("./util");

const actionTypes = [
  "GAME_START",
  "PLAYER_JOIN",
  "PLAYER_LEAVE",
  "PLAYER_KICK",
  "PLAYER_READY"
];

module.exports = stringMapFromArray(actionTypes);
