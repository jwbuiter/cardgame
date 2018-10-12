import { JOINED_GAME, USER_READY, LEFT_GAME } from "../constants/actionTypes";

export function joinedGame(message) {
  return {
    type: JOINED_GAME,
    payload: message
  };
}

export function userReady(message) {
  return {
    type: USER_READY,
    payload: message
  };
}

export function leftGame() {
  return {
    type: LEFT_GAME
  };
}
