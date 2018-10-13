import {
  JOINED_GAME,
  PLAYER_READY,
  PLAYER_JOINED,
  LEFT_GAME
} from "../constants/actionTypes";

export function joinedGame(message) {
  return {
    type: JOINED_GAME,
    payload: message
  };
}

export function userReady(message) {
  return {
    type: PLAYER_READY,
    payload: message
  };
}

export function leftGame() {
  return {
    type: LEFT_GAME
  };
}

export function playerJoined(message) {
  return {
    type: PLAYER_JOINED,
    payload: message
  };
}
