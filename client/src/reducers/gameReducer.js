import { JOINED_GAME, USER_READY, LEFT_GAME } from "../constants/actionTypes";

const initialState = {
  user: null,
  properties: null,
  ready: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOINED_GAME: {
      const { user, properties } = action.payload;

      return {
        ...state,
        user,
        properties
      };
    }
    case USER_READY: {
      const { user, value } = action.payload;

      return {
        ...state,
        ready: {
          ...state.ready,
          [user.id]: value
        }
      };
    }
    case LEFT_GAME:
      return initialState;
    default:
      return state;
  }
};
