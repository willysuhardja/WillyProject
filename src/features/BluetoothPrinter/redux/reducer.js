import {
  SET_BLUETOOTH_ENABLED,
  SET_BLUETOOTH_PAIRED,
  SET_BLUETOOTH_ALREADY_PAIRED_LIST,
  SET_BLUETOOTH_FOUNDED_LIST,
} from './constant';
import {initialState} from './state';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLUETOOTH_ENABLED:
      return {
        ...state,
        isBluetoothEnabled: action.payload,
      };
    case SET_BLUETOOTH_PAIRED:
      return {
        ...state,
        pairedDevices: action.payload,
      };
    case SET_BLUETOOTH_ALREADY_PAIRED_LIST:
      return {
        ...state,
        alreadyPairedList: action.payload,
      };
    case SET_BLUETOOTH_FOUNDED_LIST:
      return {
        ...state,
        foundedList: action.payload,
      };
    default:
      return state;
  }
};

const bluetoothReducer = reducer;
export default bluetoothReducer;
