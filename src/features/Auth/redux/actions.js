import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {setUserProfile} from '../../AccoutManagement/redux/actions';
import {getProfile} from '../../AccoutManagement/redux/getters';
import * as actionTypes from './constant';

export const setUserToken = (token) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SET_USER_TOKEN,
      payload: token,
    });
  };
};

export const setBranch = (branch) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SET_BRANCH,
      payload: branch,
    });
  };
};

export const doLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const body = new FormData();

      body.append('username', username);
      body.append('password', password);

      dispatch({
        type: actionTypes.LOGIN_PENDING,
      });

      const loginResponse = await axiosClient.post('/user/auth/login', body);

      const user = loginResponse.data.user;

      dispatch(setUserProfile(user));

      await dispatch(doGetToken(user.id, password));

      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: true,
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
        error,
      });

      return Promise.reject(error.response);
    }
  };
};

export const doGetToken = (userId, password) => {
  return async (dispatch) => {
    try {
      const body = new FormData();

      body.append('user_id', userId);
      body.append('password', password);
      body.append('username_jwt', 'sails');
      body.append('password_jwt', 'sails123');

      const tokenResponse = await axiosClient.post('/token/request', body);

      const token = tokenResponse.data.data.token;

      dispatch(setUserToken(token));

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error.response);
    }
  };
};

export const doGetBranches = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GET_BRANCHES_PENDING,
      });

      const user = getProfile(store.getState());

      const params = {user_id: user.id};

      const branchResponse = await axiosClient.get('/store', {params});

      const responseData = branchResponse.data.data;

      dispatch({
        type: actionTypes.GET_BRANCHES_SUCCESS,
        payload: responseData,
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.GET_BRANCHES_FAILED,
        error,
      });

      return Promise.reject(error.response);
    }
  };
};
