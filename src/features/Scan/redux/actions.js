import config from '../../../config';
import {store} from '../../../redux/store';
import {axiosClient, axiosIntance} from '../../../utils/axios';
import {getProfile} from '../../AccoutManagement/redux/getters';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

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
      dispatch({
        type: actionTypes.VERIFICATION_SUCCESS,
        payload: verifyResponse,
      });
      dispatch(setLocation(location));

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
