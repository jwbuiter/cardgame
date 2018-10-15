import socketIOClient from "socket.io-client";
import axios from "axios";

import { receivedMessage } from "./actions/chatActions";
import {
  joinedGame,
  leaveGame,
  leftGame,
  startGame,
  playerReady,
  gameState
} from "./actions/gameActions";

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

  function leave() {
    const self = store.getState().game.user.id;
    socket.emit("action", leaveGame(self));
  }

  function ready(value) {
    socket.emit("action", playerReady(value));
  }

  function start() {
    socket.emit("action", startGame());
  }

  function kick(player) {
    socket.emit("action", leaveGame(player));
  }

  function sendChatMessage(content) {
    const message = { sender: store.getState().game.user, content };
    socket.emit("chatMessage", message);
  }

  socket.on("chatMessage", message => {
    store.dispatch(receivedMessage(message));
  });

  socket.on("state", state => {
    store.dispatch(gameState(state));
  });

  store.on("kick", () => {
    store.dispatch(leftGame());
  });

  return {
    getGames,
    createGame,
    joinGame,
    leave,
    start,
    kick,
    ready,
    sendChatMessage
  };
}

export default api;
