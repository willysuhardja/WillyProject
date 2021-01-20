import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

export const setStartTime = (time) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_START_TIME,
      payload: time,
    });
  };
};

export const setEndTime = (time) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_END_TIME,
      payload: time,
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

export const doCancelCount = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CANCEL_COUNT,
    });
  };
};

export const doVerifyLocation = (location) => {
  return async (dispatch) => {
    const user = getProfile(store.getState());
    const branch = getBranch(store.getState());

    dispatch({
      type: actionTypes.VERIFICATION_PENDING,
    });
    try {
      const body = new FormData();

      body.append('initial_store', branch.initial);
      body.append('location', location);
      body.append('user_id', user.id);
      body.append('type', 'count');

      const verifyResponse = await axiosClient.post(
        '/soglobal/check_location/',
        body,
      );
      dispatch({
        type: actionTypes.VERIFICATION_SUCCESS,
      });
      dispatch(setLocation(location));

      return Promise.resolve(verifyResponse);
    } catch (error) {
      dispatch({
        type: actionTypes.VERIFICATION_FAILED,
      });
      const message = error?.response?.data?.status?.message || 'Unknow Error';
      return Promise.reject({message});
    }
  };
};
