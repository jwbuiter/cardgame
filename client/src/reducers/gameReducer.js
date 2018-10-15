import { GAME_JOIN, GAME_STATE, GAME_LEFT } from "../constants/actionTypes";

const initialState = {
  id: null,
  user: null,
  state: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_JOIN: {
      const { user, game, state } = action.payload;

      const { id } = game;

      return {
        ...state,
        id,
        user,
        state
      };
    }
    case GAME_STATE: {
      return {
        ...state,
        state: action.payload
      };
    }
    case GAME_LEFT:
      return initialState;
    default:
      return state;
  }
};
