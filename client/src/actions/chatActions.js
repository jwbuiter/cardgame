import { RECEIVED_MESSAGE } from "../constants/actionTypes";

export function receiveMessage(message) {
  return {
    type: RECEIVED_MESSAGE,
    payload: message
  };
}
