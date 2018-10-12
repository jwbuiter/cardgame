const express = require("express");
const gamesRoute = express.Router();
const Joi = require("joi");

const makeGame = require("../logic/game");

const games = {};

const createGameSchema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  gameName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  isProtected: Joi.bool(),
  gamePassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .when("isProtected", { is: false, then: Joi.allow("") })
};

const joinGameSchema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  gameId: Joi.string()
    .guid()
    .required(),
  gamePassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .allow("")
};

function gamesHandler(io) {
  io.on("connection", socket => {
    console.log("A user connected.");

    socket.on("createGame", (options, respond) => {
      const validation = Joi.validate(options, createGameSchema);
      if (validation.error) {
        respond({
          success: false,
          reason: validation.error
        });
        return;
      }
      const game = makeGame(socket, options, respond);
      games[game.gameId] = game;
    });

    socket.on("joinGame", (options, respond) => {
      const validation = Joi.validate(options, joinGameSchema);
      if (validation.error) {
        respond({
          success: false,
          reason: validation.error
        });
      }

      const game = games[options.gameId];
      if (!game) {
        respond({
          success: false,
          reason: "Game does not exist."
        });
      }

      if (!game.canJoin()) {
        respond({
          success: false,
          reason: "Game cannot be joined."
        });
      }

      game.join(socket, options, respond);
    });
  });
}

gamesRoute.get("/", (req, res) => {
  res.send(
    Object.keys(games).map(key => {
      const { name, isProtected, creator, id } = games[key].gameOptions;
      return {
        name,
        isProtected,
        creator,
        id
      };
    })
  );
});

module.exports = { gamesRoute, gamesHandler };
