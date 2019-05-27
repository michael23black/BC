import { all } from "redux-saga/effects";

import controllersSagas from "./sagas/controllers";
import connectionSagas from "./sagas/connection";

export default function* rootSaga() {
  yield all([...controllersSagas, ...connectionSagas]);
}