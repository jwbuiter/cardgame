import socketIOClient from "socket.io-client";
import axios from "axios";

import { receiveMessage } from "./actions/chatActions";
import { joinedGame, playerJoined, userReady } from "./actions/gameActions";

const APIendPoint = "http://127.0.0.1:5000";

function api(store) {
  const socket = socketIOClient(APIendPoint);

  async function getGames() {
    return (await axios.get(APIendPoint + "/games")).data;
  }

  function createGame(options) {
    socket.emit("createGame", options, response => {
      if (response.success) {
        store.dispatch(joinedGame(response));
      }
    });
  }

  function joinGame(options) {
    socket.emit("joinGame", options, response => {
      if (response.success) {
        store.dispatch(joinedGame(response));
      }
    });
  }

  function ready(value) {
    const message = { value, player: store.getState().game.user };
    socket.emit("ready", message, response => {});
  }

  function sendMessage(content) {
    const message = { sender: store.getState().game.user, content };
    socket.emit("chatMessage", message, response => {});
  }

  socket.on("chatMessage", message => {
    store.dispatch(receiveMessage(message));
  });

  socket.on("ready", message => {
    store.dispatch(userReady(message));
  });

  socket.on("playerJoined", message => {
    store.dispatch(playerJoined(message));
  });

  return {
    getGames,
    createGame,
    joinGame,
    leaveGame,
    startGame,
    kickPlayer,
    sendMessage,
    ready
  };
}

export default api;
