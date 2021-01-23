import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

export const doGetVerifications = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_VERIFICATION_LIST_PENDING,
    });

    const branch = getBranch(store.getState()).initial;

    try {
      const verificationListResponse = await axiosClient.get(
        `/verification/${branch}`,
      );

      dispatch({
        type: actionTypes.GET_VERIFICATION_LIST_SUCCESS,
        payload: verificationListResponse.data.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_VERIFICATION_LIST_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};

export const doCheckVerifications = (locationName) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_VERIFICATION_PENDING,
    });

    const branch = getBranch(store.getState()).initial;
    const userId = getProfile(store.getState()).id;

    const body = new FormData();

    body.append('user_id', userId);
    body.append('initial_store', branch);
    body.append('location', locationName);

    try {
      const checkVerificationResponse = await axiosClient.post(
        '/soglobal/check_verification/',
        body,
      );

      dispatch({
        type: actionTypes.CHECK_VERIFICATION_SUCCESS,
        payload: checkVerificationResponse.data.data,
      });

      return Promise.resolve(checkVerificationResponse.data.data.length);
    } catch (error) {
      dispatch({
        type: actionTypes.CHECK_VERIFICATION_FAILED,
        payload: error,
      });

      const message = error?.response?.data?.status?.message || error.message;

      return Promise.reject({message});
    }
  };
};

export const doVerification = (locationName, data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.VERIFICATION_PENDING,
    });

    const branch = getBranch(store.getState()).initial;
    const userId = getProfile(store.getState()).id;

    const body = new FormData();

    body.append('user_id', userId);
    body.append('initial_store', branch);
    body.append('location', locationName);
    body.append('items', JSON.stringify(data));

    try {
      const checkVerificationResponse = await axiosClient.post(
        '/soglobal/verification/',
        body,
      );

      dispatch({
        type: actionTypes.VERIFICATION_SUCCESS,
        payload: checkVerificationResponse.data.data,
      });

      return Promise.resolve(checkVerificationResponse.data.data.length);
    } catch (error) {
      dispatch({
        type: actionTypes.VERIFICATION_FAILED,
        payload: error,
      });

      const message = error?.response?.data?.status?.message || error.message;

      return Promise.reject({message});
    }
  };
};
