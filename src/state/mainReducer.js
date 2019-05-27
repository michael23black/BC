import { combineReducers } from "redux";

import controllerReducer from "./reducers/controllers";
import connectionReducer from "./reducers/connection";

const rootReducer = combineReducers({
  controllers: controllerReducer,
  connection: connectionReducer
});

export default rootReducer;
