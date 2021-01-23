import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import * as actionTypes from './constant';
import {getProfile} from './getters';

export const setUserProfile = (profile) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_PROFILE,
      payload: profile,
    });
  };
};

export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PROFILE_PENDING,
      });

      // const response = await axiosClient.get('/auth/profile');

      // const profile = response.data.data;
      dispatch({
        type: actionTypes.PROFILE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_FAILED,
        error,
      });
    }
  };
};

export const doChangePassword = ({
  old_password,
  new_password,
  confirm_password,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_PENDING,
      });

      const userId = getProfile(store.getState()).id;

      if (new_password !== confirm_password) {
        throw {
          message: 'New Password tidak terverifikasi',
        };
      }

      const body = new FormData();

      body.append('password_old', old_password);
      body.append('password_new', new_password);

      const updateResponse = await axiosClient.put(
        `/user/password/${userId}`,
        body,
      );

      dispatch({
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        payload: updateResponse,
      });

      return Promise.resolve(updateResponse);
    } catch (error) {
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        payload: error,
      });
      const message = error?.response?.data?.status?.message || error.message;
      return Promise.reject({message});
    }
  };
};

export const doUpdateProfile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_PENDING,
      });

      // const body = new FormData();

      // body.append('name', data.name);
      // body.append('username', data.username);
      // body.append('email', data.email);
      // body.append('phone', data.phone);

      // if (data.image) {
      //   body.append('image', data.image);
      // }

      // const response = await axiosClient.put('/auth/profile', body);

      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        payload: true,
      });
      return Promise.resolve(true);
    } catch (error) {
      const message = error?.response?.data?.message;

      dispatch({
        type: actionTypes.UPDATE_PROFILE_FAILED,
        error,
      });
      return Promise.reject({message});
    }
  };
};
