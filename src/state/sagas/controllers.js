import { select, call, put, takeLatest } from "redux-saga/effects";

import {
  controllersActions,
  updateState,
  writeToDeviceStart,
  writeToDeviceSuccess,
  writeToDeviceFailure
} from "../reducers/controllers";
import { writeToDevice as writeToDeviceApi } from "../api/controllers";

const getSavedPositions = state => state.controllers.savedPositions;

function* writeToDeviceSaga({ id, data }) {
  try {
    yield put(writeToDeviceStart());
    yield call(writeToDeviceApi, id, data);
    if (data === "SAVE") {
      const savedPositions = yield select(getSavedPositions);
      yield put(updateState({ savedPositions: savedPositions + 1 }));
    } else if (data === "RESET" || data === "INITIAL") {
      yield put(updateState({ savedPositions: 0 }));
    }
    yield put(writeToDeviceSuccess());
  } catch (error) {
    yield put(writeToDeviceFailure());
  }
}

export default [
  takeLatest(controllersActions.writeToDevice.self, writeToDeviceSaga)
];
