import socketIOClient from "socket.io-client";

import { receiveMessage } from "./actions/chatActions";
import { joinedGame, userReady } from "./actions/gameActions";

const APIendPoint = "http://127.0.0.1:5000";

function api(store) {
  const socket = socketIOClient(APIendPoint);

  function createGame(options) {
    socket.emit("createGame", options, response => {
      if (response.success) {
        console.log(response);
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
    const message = { value, user: store.getState().game.user };
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

  return { createGame, joinGame, sendMessage, ready };
}

export default api;
