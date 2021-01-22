import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

export const doGetLocations = () => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_LOCATION_LIST_PENDING,
    });

    const branch = getBranch(store.getState()).initial;

    try {
      const locationListResponse = await axiosClient.get(`/location/${branch}`);

      dispatch({
        type: actionTypes.GET_LOCATION_LIST_SUCCESS,
        payload: locationListResponse.data.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LOCATION_LIST_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};
