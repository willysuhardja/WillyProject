import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
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
