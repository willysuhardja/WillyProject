import {axiosClient} from '../../../utils/axios';
import * as actionTypes from './constant';

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
        payload: {
          id: null,
          username: 'aden',
          email: 'aden@gmail.com',
          phone: '+62893221373',
          is_password_changed: false,
          role: {
            name: 'Penghitung',
          },
          name: 'Aden Trisna Daud Kurnia',
          image_url:
            'https://avatars2.githubusercontent.com/u/43471574?s=460&u=6f72e81025657ae498ec8377acae6768bf648387&v=4',
        },
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_FAILED,
        error,
      });
    }
  };
};

export const doChangePassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_PENDING,
      });

      // const body = data;

      // const response = await axiosClient.post('/auth/change-password', body);

      // const profile = response.data.data;
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        payload: true,
      });
      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error,
      });
      return Promise.reject(error);
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
