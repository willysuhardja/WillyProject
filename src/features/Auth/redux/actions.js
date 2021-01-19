import {axiosClient} from '../../../utils/axios';
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
      // const body = {
      //   username,
      //   password,
      // };

      dispatch({
        type: actionTypes.LOGIN_PENDING,
      });

      // const loginResponse = await axiosClient.post('/auth/login', body);

      // const responseData = loginResponse.data.data;

      dispatch(setUserToken('token'));

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

export const doGetBranches = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GET_BRANCHES_PENDING,
      });

      // const branchResponse = await axiosClient.get('/auth/stores');

      // const responseData = branchResponse.data.data;

      dispatch({
        type: actionTypes.GET_BRANCHES_SUCCESS,
        payload: [
          {
            name: 'Griya Antapani',
            slug: 'ATP',
          },
        ],
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
