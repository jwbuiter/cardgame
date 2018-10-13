import {
  JOINED_GAME,
  PLAYER_READY,
  PLAYER_JOINED,
  LEFT_GAME,
  STARTED_GAME
} from "../constants/actionTypes";

const initialState = {
  id: null,
  user: null,
  started: false,
  players: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOINED_GAME: {
      const { user, players, game } = action.payload;

      const { started, id } = game;

      return {
        ...state,
        user,
        players,
        id,
        started
      };
    }
    case PLAYER_READY: {
      const { player, value } = action.payload;

      return {
        ...state,
        players: state.players.map(element => {
          if (element.id !== player.id) return element;

          return {
            ...element,
            ready: value
          };
        })
      };
    }
    case PLAYER_JOINED: {
      const player = action.payload;

      return {
        ...state,
        players: [...state.players, player]
      };
    }
    case LEFT_GAME:
      return initialState;
    case STARTED_GAME:
      return {
        ...state,
        started: true
      };
    default:
      return state;
  }
};
