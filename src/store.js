import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import Reactotron from "reactotron-react-native";

import rootReducer from "./state/mainReducer";
import rootSaga from "./state/mainSaga";

import reactotronConfig from "../reactotronConfig";

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    reactotronConfig.createEnhancer()
  )
);
sagaMiddleware.run(rootSaga);

export default store;
