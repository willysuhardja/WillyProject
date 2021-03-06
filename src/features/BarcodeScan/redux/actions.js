import config from '../../../config';
import {store} from '../../../redux/store';
import {axiosClient, axiosIntance} from '../../../utils/axios';
import {getBranch, getGoldApi} from '../../Auth/redux/getters';
import * as actionTypes from './constant';

export const doGetProductIdentity = (barcode) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAIL_PENDING,
    });

    const goldApi = getGoldApi(store.getState()) || config.goldURL;

    const goldRequest = axiosIntance.create({
      baseURL: goldApi,
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
