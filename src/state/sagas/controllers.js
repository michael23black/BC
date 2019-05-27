import { select, call, put, takeLatest } from "redux-saga/effects";

import {
  controllersActions,
  writeToDeviceStart,
  writeToDeviceSuccess,
  writeToDeviceFailure
} from "../reducers/controllers";
import { writeToDevice as writeToDeviceApi } from "../api/controllers";

function* writeToDeviceSaga({ id, data }) {
  try {
    yield put(writeToDeviceStart());
    yield call(writeToDeviceApi, id, data);
    yield put(writeToDeviceSuccess());
  } catch (error) {
    yield put(writeToDeviceFailure());
  }
}

export default [
  takeLatest(controllersActions.writeToDevice.self, writeToDeviceSaga)
];
