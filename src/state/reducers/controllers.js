import actionGenerator from "../../utils/actionGenerator";

const reducerName = "controllers";

export const controllersActions = {
  writeToDevice: actionGenerator(reducerName, "writeToDevice")
};

const initialState = {
  isWriting: false,
  controllers: [
    {
      icon: require("../../images/joystick.png"),
      name: "JOYSTICK",
      screen: "JoystickScreen"
    },
    {
      icon: require("../../images/mixer.png"),
      name: "MIXER",
      screen: "MixerScreen"
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

export function writeToDevice(id, data    ) {
  return { type: controllersActions.writeToDevice.self, id, data};
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
