import { createStore, combineReducers } from "redux";
import { TaskReducer } from "./reducer";
export const store = createStore(combineReducers({ tasks: TaskReducer }));
