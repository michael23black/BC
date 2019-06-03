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
  checkLocationPermissions as checkLocationPermissionsApi,
  requestLocationPermissions as requestLocationPermissionsApi,
  scanPairedDevices as scanPairedDevicesApi,
  scanUnpairedDevices as scanUnpairedDevicesApi,
  connectDevice as connectDeviceApi,
  disconnectDevice as disconnectDeviceApi,
  disconnectAll as disconnectAllApi
} from "../api/connection";

const getDevicesList = state => state.connection.devices;

function* scanDevicesSaga() {
  try {
    yield put(scanDevicesStart());
    yield call(disconnectAllApi);
    const pairedDevices = yield call(scanPairedDevicesApi);
    const permissionsStatus = yield call(checkLocationPermissionsApi);
    let permissionsResponse = "denied";
    if (!permissionsStatus) {
      permissionsResponse = yield call(requestLocationPermissionsApi);
    }
    let unpairedDevices = [];
    if (permissionsResponse === "granted" || permissionsStatus) {
      unpairedDevices = yield call(scanUnpairedDevicesApi);
    }
    const devices = [...pairedDevices, ...unpairedDevices];
    yield put(updateState({ devices }));
    yield put(scanDevicesSuccess());
  } catch (error) {
    yield put(scanDevicesFailure());
  }
}

function* connectDeviceSaga({ id, callback = () => null }) {
  try {
    callback(true);
    yield put(connectDeviceStart());
    let devices = yield select(getDevicesList);
    const deviceConnectStatus = devices.find(device => device.id === id)
      .connected;
    if (deviceConnectStatus) {
      yield call(disconnectDeviceApi, id);
    } else {
      yield call(connectDeviceApi, id);
    }
    devices = devices.map(device => ({
      ...device,
      connected: id === device.id && !deviceConnectStatus
    }));
    yield put(updateState({ device: id, devices }));
    yield put(connectDeviceSuccess());
    callback(false);
  } catch (error) {
    yield put(connectDeviceFailure());
    callback(false);
  }
}

export default [
  takeLatest(connectionActions.scanDevices.self, scanDevicesSaga),
  takeLatest(connectionActions.connectDevice.self, connectDeviceSaga)
];
