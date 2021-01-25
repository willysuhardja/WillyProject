import config from '../../../config';
import {store} from '../../../redux/store';
import {axiosClient, axiosIntance} from '../../../utils/axios';
import {getBranch} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

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

      dispatch(doGetProductIdentification(productResponse.data[0].till_code));

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

export const doGetProductIdentification = (tillCode) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCT_IDENTIFICATION_PENDING,
    });
    const branch = getBranch(store.getState());

    try {
      const identityResponse = await axiosClient.get(
        `/item_identify/${branch.initial}/${tillCode}`,
      );
      dispatch({
        type: actionTypes.GET_PRODUCT_IDENTIFICATION_SUCCESS,
        payload: identityResponse.data.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRODUCT_IDENTIFICATION_FAILED,
        payload: error,
      });
    }
  };
};
