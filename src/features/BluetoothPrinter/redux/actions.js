import * as actionTypes from './constant';

export const setBluetoothAlreadyPairedList = (list) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_BLUETOOTH_ALREADY_PAIRED_LIST,
      payload: list,
    });
  };
};

export const setBluetoothFoundedList = (list) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_BLUETOOTH_FOUNDED_LIST,
      payload: list,
    });
  };
};

export const setBluetoothPaired = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_BLUETOOTH_PAIRED,
      payload: data,
    });
  };
};

export const setBluetoothEnabled = (enabled) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_BLUETOOTH_ENABLED,
      payload: enabled,
    });
  };
};
