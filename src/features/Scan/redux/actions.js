import * as actionTypes from './constant';

export const setStartTime = (time) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_START_TIME,
      payload: time,
    });
  };
};

export const setEndDuration = (duration) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_END_DURATION,
      payload: duration,
    });
  };
};

export const setLocation = (location) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOCATION,
      payload: location,
    });
  };
};

export const doVerifyLocation = (location) => {
  return async (dispatch) => {
    dispatch(setLocation(location));

    return Promise.resolve(true);
  };
};