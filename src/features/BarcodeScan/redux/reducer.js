import * as actionTypes from './constant';
import {initialState} from './state';

export default function identificationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAIL_PENDING:
      return {
        ...state,
        productDetailLoading: true,
        productDetailSuccess: false,
        productDetailError: false,
      };
    case actionTypes.GET_PRODUCT_DETAIL_SUCCESS:
      const product = action.payload;

      const productDetail = {};
      Object.keys(product).forEach((key) => {
        if (key === 'selling_price' || key === 'avg_price') {
          productDetail[key] = product[key].replace(/ /gi, '');
        } else {
          productDetail[key] = product[key];
        }
      });

      return {
        ...state,
        productDetailLoading: false,
        productDetailSuccess: true,
        productDetailError: false,
        productDetail: productDetail,
      };
    case actionTypes.GET_PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        productDetailLoading: false,
        productDetailSuccess: false,
        productDetailError: true,
        productDetail: initialState.productDetail,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
