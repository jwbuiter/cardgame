import { GAME_JOIN, GAME_STATE, GAME_LEFT } from "../constants/actionTypes";
import {
  GAME_START,
  PLAYER_JOIN,
  PLAYER_LEAVE,
  PLAYER_READY
} from "../constants/serverActionTypes";

// REDUX ACTIONS
export function joinedGame(message) {
  return {
    type: GAME_JOIN,
    payload: message
  };
}

export function gameState(state) {
  return {
    type: GAME_STATE,
    payload: state
  };
}

export function leftGame() {
  return {
    type: GAME_LEFT
  };
}

// SERVER ACTIONS
export function startGame() {
  return {
    type: GAME_START
  };
}

export function leaveGame(player) {
  return {
    type: PLAYER_LEAVE,
    payload: player
  };
}

export function playerReady(value) {
  return {
    type: PLAYER_READY,
    payload: value
  };
}
