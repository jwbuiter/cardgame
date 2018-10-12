import { RECEIVED_MESSAGE } from "../constants/actionTypes";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    }
    default:
      return state;
  }
};
