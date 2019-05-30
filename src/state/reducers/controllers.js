import actionGenerator from "../../utils/actionGenerator";

const reducerName = "controllers";

export const controllersActions = {
  updateState: actionGenerator(reducerName, "updateState", ["self"]),
  writeToDevice: actionGenerator(reducerName, "writeToDevice"),
  fastWriteToDevice: actionGenerator(reducerName, "fastWriteToDevice", ["self"])
};

const initialState = {
  isWriting: false,
  savedPositions: 0,
  controllers: [
    {
      icon: require("../../images/button.png"),
      name: "BUTTONS",
      screen: "ButtonsScreen"
    },
    {
      icon: require("../../images/mixer.png"),
      name: "MIXER",
      screen: "MixerScreen"
    },
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case controllersActions.updateState.self:
      return { ...state, ...action.data };
    case controllersActions.writeToDevice.start:
      return { ...state, isWriting: true };
    case controllersActions.writeToDevice.success:
      return { ...state, isWriting: false };
    case controllersActions.writeToDevice.failure:
      return { ...state, isWriting: false };
    default:
      return state;
  }
}

export function updateState(data) {
  return { type: controllersActions.updateState.self, data };
}

export function writeToDevice(id, data) {
  return { type: controllersActions.writeToDevice.self, id, data };
}
export function fastWriteToDevice(id, data) {
  return { type: controllersActions.fastWriteToDevice.self, id, data };
}
export function writeToDeviceStart() {
  return { type: controllersActions.writeToDevice.start };
}
export function writeToDeviceSuccess() {
  return { type: controllersActions.writeToDevice.success };
}
export function writeToDeviceFailure() {
  return { type: controllersActions.writeToDevice.failure };
}
