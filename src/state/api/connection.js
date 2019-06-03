import BluetoothSerial from "react-native-bluetooth-serial-next";
import { PermissionsAndroid } from "react-native";

export function scanPairedDevices() {
  return BluetoothSerial.list().then(response => {
    return response.map(device => ({
      ...device,
      paired: true,
      connected: false
    }));
  });
}
export function checkLocationPermissions() {
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ).then(response => {
    return response;
  });
}
export function requestLocationPermissions() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ).then(response => {
    return response;
  });
}
export function scanUnpairedDevices() {
  return BluetoothSerial.discoverUnpairedDevices().then(response => {
    return response.map(device => ({
      ...device,
      paired: false,
      connected: false
    }));
  });
}
export function pairDevice(id) {
  return BluetoothSerial.pairDevice(id).then(response => {
    return response;
  });
}
export function connectDevice(id) {
  return BluetoothSerial.connect(id).then(response => {
    return response;
  });
}
export function disconnectDevice(id) {
  return BluetoothSerial.disconnect(id).then(response => {
    return response;
  });
}
export function disconnectAll() {
  return BluetoothSerial.disconnectAll().then(response => {
    return response;
  });
}
