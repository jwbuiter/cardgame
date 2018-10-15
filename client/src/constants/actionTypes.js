const { stringMapFromArray } = require("./util");

const actionTypes = ["GAME_JOIN", "GAME_STATE", "GAME_LEAVE", "CHAT_MESSAGE"];

module.exports = stringMapFromArray(actionTypes);
