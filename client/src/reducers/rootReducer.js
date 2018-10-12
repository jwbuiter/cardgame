import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import chatReducer from "./chatReducer";

export default combineReducers({ game: gameReducer, chat: chatReducer });
