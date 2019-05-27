import actionGenerator from "../../utils/actionGenerator";

const reducerName = "connection";

export const connectionActions = {
  updateState: actionGenerator(reducerName, "updateState", ["self"]),
  scanDevices: actionGenerator(reducerName, "scanDevices"),
  connectDevice: actionGenerator(reducerName, "connectDevice")
};

const initialState = {
  isScanning: false,
  isConnecting: false,
  device: null,
  devices: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case connectionActions.updateState.self:
      return { ...state, ...action.data };
    case connectionActions.scanDevices.start:
      return { ...state, isScanning: true };
    case connectionActions.scanDevices.success:
      return { ...state, isScanning: false };
    case connectionActions.scanDevices.failure:
      return { ...state, isScanning: false };
    case connectionActions.connectDevice.start:
      return { ...state, isConnecting: true };
    case connectionActions.connectDevice.success:
      return { ...state, isConnecting: false };
    case connectionActions.connectDevice.failure:
      return { ...state, isConnecting: false };
    default:
      return state;
  }
}

export function updateState(data) {
  return { type: connectionActions.updateState.self, data };
}

export function scanDevices() {
  return { type: connectionActions.scanDevices.self };
}
export function scanDevicesStart() {
  return { type: connectionActions.scanDevices.start };
}
export function scanDevicesSuccess() {
  return { type: connectionActions.scanDevices.success };
}
export function scanDevicesFailure() {
  return { type: connectionActions.scanDevices.failure };
}

export function connectDevice(id) {
  return { type: connectionActions.connectDevice.self, id };
}
export function connectDeviceStart() {
  return { type: connectionActions.connectDevice.start };
}
export function connectDeviceSuccess() {
  return { type: connectionActions.connectDevice.success };
}
export function connectDeviceFailure() {
  return { type: connectionActions.connectDevice.failure };
}
