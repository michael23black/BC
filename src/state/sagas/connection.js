import { select, call, put, takeLatest } from "redux-saga/effects";

import {
  connectionActions,
  updateState,
  scanDevicesStart,
  scanDevicesSuccess,
  scanDevicesFailure,
  connectDeviceStart,
  connectDeviceSuccess,
  connectDeviceFailure
} from "../reducers/connection";
import {
  scanPairedDevices as scanPairedDevicesApi,
  scanUnpairedDevices as scanUnpairedDevicesApi,
  connectDevice as connectDeviceApi
} from "../api/connection";

const getDevicesList = state => state.connection.devices;

function* scanDevicesSaga() {
  try {
    yield put(scanDevicesStart());
    const pairedDevices = yield call(scanPairedDevicesApi);
    const unpairedDevices = yield call(scanUnpairedDevicesApi);
    const devices = [...pairedDevices, ...unpairedDevices];
    yield put(updateState({ devices }));
    yield put(scanDevicesSuccess());
  } catch (error) {
    yield put(scanDevicesFailure());
  }
}
// TODO: сделать обнуление предыдущих подключений
function* connectDeviceSaga({ id }) {
  try {
    yield put(connectDeviceStart());
    yield call(connectDeviceApi, id);
    let devices = yield select(getDevicesList);
    devices = devices.map(device => ({
      ...device,
      connected: id === device.id
    }));
    yield put(updateState({ device: id, devices }));
    yield put(connectDeviceSuccess());
  } catch (error) {
    yield put(connectDeviceFailure());
  }
}

export default [
  takeLatest(connectionActions.scanDevices.self, scanDevicesSaga),
  takeLatest(connectionActions.connectDevice.self, connectDeviceSaga)
];
