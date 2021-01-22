import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getBranch} from '../../Auth/redux/getters';
import {updateQtyBatch} from '../../Scan/database/actions/scanItem';
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

export const doGetLocationDetail = (locationName) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_LOCATION_DETAILS_PENDING,
    });

    const branch = getBranch(store.getState()).initial;

    try {
      const locationDetailsResponse = await axiosClient.get(
        `/location/${branch}/${locationName}`,
      );

      dispatch({
        type: actionTypes.GET_LOCATION_DETAILS_SUCCESS,
        payload: locationDetailsResponse.data.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LOCATION_DETAILS_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};

export const doUpdateQtyBatch = (locationId, data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ITEM_QTY_PENDING,
    });

    try {
      const updateAction = await updateQtyBatch(locationId, data);

      dispatch({
        type: actionTypes.UPDATE_ITEM_QTY_SUCCESS,
        payload: updateAction,
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ITEM_QTY_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};
