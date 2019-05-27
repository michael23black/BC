import BluetoothSerial from "react-native-bluetooth-serial-next";

export function writeToDevice(id, data) {
  return BluetoothSerial.write(data, id).then(response => {
    return response;
  });
}
