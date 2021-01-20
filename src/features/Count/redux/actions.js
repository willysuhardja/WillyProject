import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';
import {getLocation, getStartTime, getEndTime, getDuration} from './getters';

import moment from 'moment';

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

export const doReset = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET,
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
        payload: verifyResponse,
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

export const doSubmitCount = () => {
  return async (dispatch) => {
    const user = getProfile(store.getState());
    const branch = getBranch(store.getState());
    const location = getLocation(store.getState());
    const startTime = getStartTime(store.getState());
    const endTime = getEndTime(store.getState());
    const duration = getDuration(store.getState());

    dispatch({
      type: actionTypes.SUBMIT_COUNT_PENDING,
    });
    try {
      const body = new FormData();

      body.append('user_id', user.id);
      body.append('initial_store', branch.initial);
      body.append('location', location);
      body.append('start_at', moment(startTime).format('YYYY-MM-DD HH:mm:ss'));
      body.append('end_at', moment(endTime).format('YYYY-MM-DD HH:mm:ss'));
      body.append('duration', duration);

      const submitResponse = await axiosClient.post('/soglobal_counter/', body);
      dispatch({
        type: actionTypes.SUBMIT_COUNT_SUCCESS,
        payload: submitResponse,
      });
      dispatch(doReset());

      const message =
        submitResponse.data.status.message || 'berhasil submit scan';

      return Promise.resolve(message);
    } catch (error) {
      dispatch({
        type: actionTypes.SUBMIT_COUNT_FAILED,
      });
      const message = error?.response?.data?.status?.message || 'Unknow Error';
      return Promise.reject({message});
    }
  };
};
