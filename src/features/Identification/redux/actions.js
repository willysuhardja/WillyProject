import {store} from '../../../redux/store';
import {axiosClient} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import {
  clearScanItems,
  getScannedList,
  updateQtyBatch,
} from '../../Scan/database/actions/scanItem';
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

export const doUploadLocation = (locationId, locationName) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_LOCATION_PENDING,
    });

    const user = getProfile(store.getState());
    const branch = getBranch(store.getState());

    try {
      const scanItems = await getScannedList(locationId);

      const formatedScanItems = scanItems.map((scanItem) => {
        return {
          sku: scanItem.tillCode,
          skudesc: scanItem.skuDesc,
          qty_1: scanItem.qty1,
          qty_2: scanItem.qty2,
          scan_order: scanItem.scanOrder,
          timestamp: scanItem.timestamp,
        };
      });

      const body = new FormData();

      body.append('user_id', user.id);
      body.append('initial_store', branch.initial);
      body.append('location', locationName);
      body.append('scanner', 1);
      body.append('items', JSON.stringify(formatedScanItems));

      const uploadResponse = await axiosClient.post('/soglobal', body);

      const clearLocalScanItems = await clearScanItems(locationId);

      dispatch({
        type: actionTypes.UPLOAD_LOCATION_SUCCESS,
        payload: {
          response: uploadResponse,
          delete: clearLocalScanItems,
        },
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.UPLOAD_LOCATION_FAILED,
        payload: error,
      });

      const message = error?.response?.data?.status?.message || error.message;

      return Promise.reject({message});
    }
  };
};
