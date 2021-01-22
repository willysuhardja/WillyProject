import config from '../../../config';
import {store} from '../../../redux/store';
import {axiosClient, axiosIntance} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import {addScanItem, verifySku} from '../database/actions/scanItem';
import * as actionTypes from './constant';
import {getLocation} from './getters';

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
      body.append('type', 'scan');

      const verifyResponse = await axiosClient.post(
        '/soglobal/check_location/',
        body,
      );

      const locationData = verifyResponse.data.data[0];

      dispatch({
        type: actionTypes.VERIFICATION_SUCCESS,
        payload: locationData,
      });
      dispatch(
        setLocation({
          id: locationData.id,
          name: locationData.name,
        }),
      );

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

export const doGetProductIdentity = (barcode) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAIL_PENDING,
    });

    const goldRequest = axiosIntance.create({
      baseURL: config.goldURL,
    });

    const branch = getBranch(store.getState());

    try {
      const productResponse = await goldRequest.get(
        `/item/${branch.initial}/${barcode}`,
      );

      if (!productResponse.data[0].sku) {
        throw {
          message: `Product dengan barcode: ${barcode}\nTidak ditemukan`,
          response: productResponse,
        };
      }

      dispatch({
        type: actionTypes.GET_PRODUCT_DETAIL_SUCCESS,
        payload: productResponse.data[0],
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCT_DETAIL_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};

export const doVerifyScanItem = (barcode) => {
  return async (dispatch) => {
    const locationId = getLocation(store.getState()).id;

    try {
      await dispatch(doGetProductIdentity(barcode));
      await verifySku(locationId, barcode);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const doAddScanItem = (data) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_SCAN_ITEM_PENDING,
    });

    const locationId = getLocation(store.getState()).id;

    try {
      const scanData = {
        ...data,
        locationId,
      };

      const addAction = await addScanItem(scanData);

      dispatch({
        type: actionTypes.ADD_SCAN_ITEM_SUCCESS,
        payload: addAction,
      });

      return Promise.resolve(true);
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_SCAN_ITEM_FAILED,
        payload: error,
      });

      return Promise.reject(error);
    }
  };
};
