// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth, { type AuthState } from "modules/Auth/store/reducer";
import todo from "modules/Todo/reducer";

export type ApplicationState = {
  auth: AuthState
};

export default (history: History) =>
  combineReducers({
    auth,
    todo,
    router: connectRouter(history)
  });
