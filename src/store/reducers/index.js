import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { user } from "./modules/user";
import { articles } from "./modules/articles";
import { global } from "./modules/global";

const rootReducer = history =>
  combineReducers({
    user,
    articles,
    global,
    router: connectRouter(history)
  });

export default rootReducer;
