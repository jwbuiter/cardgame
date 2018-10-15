import { CHAT_MESSAGE } from "../constants/actionTypes";

export function receivedMessage(message) {
  return {
    type: CHAT_MESSAGE,
    payload: message
  };
}
